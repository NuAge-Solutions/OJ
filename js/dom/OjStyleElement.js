OJ.importJs('oj.dom.OjCssTranslate');


'use strict';

OJ.extendClass(
	OjElement, 'OjStyleElement',
	{
		'_props_' : {
			'id'    : null,
			'name'  : null,
			'owner' : null
		},

		'_alpha' : 1,  '_depth' : 0,

		'_origin' : '0px, 0px',  '_rotation' : 0,  '_translate' : '0px, 0px',

		'_h_align' : 'l', // OjStyleElement.LEFT
		'_v_align' : 't', // OjStyleElement.TOP


		'_compile_' : function(def){
			var cls = OjStyleElement;

			if(cls.STYLE_MODE == cls.STYLE_IE){
				this._getStyle = this._getStyleIe;
			}
			else if(cls.STYLE_MODE == cls.STYLE_BACKUP){
				this._getStyle = this._getStyleBackup;
			}

			// build functions for style getter and setters
			def._style_funcs_.call(this, 'margin', 'Margin');
			def._style_funcs_.call(this, 'padding', 'Padding');
		},

		'_style_funcs_' : function(style, u_style){
			var g = 'get',
				s = 'set',
				bottom = 'Bottom',
				left = 'Left',
				right = 'Right',
				top = 'Top';

			this[g + u_style] = function(/*side_index : top = 0, right = 1, bottom = 2, left = 3*/){
				return this._getStyler(style, arguments);
			};

			this[s + u_style] = function(val/* | top/bottom, right/left | top, right/left, bottom | top, right, bottom, left*/){
				this._setStyler(style, arguments);
			};

			this[g + u_style + bottom] = function(){
				return this[g + u_style](2);
			};

			this[s + u_style + bottom] = function(val){
				this[s + u_style](null, null, val, null);
			};

			this[g + u_style + left] = function(){
				return this[g + u_style](3);
			};

			this[s + u_style + left] = function(val){
				this[s + u_style](null, null, null, val);
			};

			this[g + u_style + right] = function(){
				return this[g + u_style](1);
			};

			this[s + u_style + right] = function(val){
				this[s + u_style](null, val, null, null);
			};

			this[g + u_style + top] = function(){
				return this[g + u_style](0);
			};

			this[s + u_style + top] = function(val){
				this[s + u_style](val, null, null, null);
			};
		},


		'_constructor' : function(/*source, context*/){
			// default the context and source
			var args = arguments,
				ln = args.length,
				source, context, tmp;

			if(ln && (source = args[0])){
				// set the context if any
				if(ln > 1){
					context = args[1];
				}

				// set the source
				// if dom element then we are done
				if(source && !source.nodeType){
					// if its the document or body do something special
					if(source === 'body' || source == document || source == document.body){
						source = document.body;
					}
					// if its a string then we need to make sure its html and handle it accordingly
					else if(isString(source)){
						source = source.trim();

						if(source.charAt(0) == '<' && source.slice(-1) == '>' && source.length >= 5){
							var tag = source.substr(0, 6).toLowerCase(),
								tag2 = tag.substr(0, 3);

							if(tag == '<thead' || tag == '<tbody' || tag == '<tfoot'){
								tmp = OjElement.elm('table');
							}
							else if(tag2 == '<tr'){
								tmp = OjElement.elm('tbody');
							}
							else if(tag2 == '<td' || tag2 == '<th'){
								tmp = OjElement.elm('tr')
							}
							else{
								tmp = OjElement.elm('div');
							}

							tmp.innerHTML = source;

							if(tmp.childNodes.length){
								tmp.removeChild(source = tmp.childNodes[0]);
							}
							else{
								source = null
							}
						}
						else{
							// todo: re-evaluate the use query, maybe just allow ids...
//							tmp = OJ.query(source);
						}
					}
				}
			}

			this._super('OjStyleElement', '_constructor', [source, context]);

			OjElement.register(this);

			this.setHAlign(this._h_align);
			this.setVAlign(this._v_align);
		},

		'_destructor' : function(/*depth = 0*/){
			var args = arguments,
				depth = args.length ? args[0] : 0,
				ln = this.numChildren();

			// remove the children
			for(; ln--;){
				OJ.destroy(this.getChildAt(ln), depth);
			}

			// release the vars
			this._owner = null;

			// continue on with the destruction
			return this._super('OjStyleElement', '_destructor', arguments);
		},


		'_processAttribute' : function(dom, attr, context){
			var setter, solo, target, lower,
				nm = attr.nodeName,
				val = attr.value;

			if(nm.substr(0, 3) == 'on-'){
				// todo: add support for multiple event listeners
				// todo? add support for nested event listener functions in templates
				setter = val.split('.');
				solo = setter.length == 1;
				target = context;

				if(!solo){
					switch(setter[0]){
						case 'this':
							target = this;
						break;

						case 'window':
							target = window;
						break;
					}
				}

				this.addEventListener(OJ.attributeToFunc(nm), target, solo ? setter[0] : setter[1]);

				return true;
			}
			else if(nm == 'id'){
				this.setId(val);
			}
			else if(nm == 'var'){
				if(!isEmpty(val) && context){
					(context[val] = this).addCss(val);

					this.setOwner(context);
				}

				return true;
			}
			else if(nm != 'class'){
				setter = OjStyleElement.attributeToSetter(nm);

				if(isFunction(this[setter])){
					if(val == ''){
						val = null;
					}
					else if(isNumeric(val)){
						val = parseFloat(val);
					}
					else if((lower = val.toLowerCase()) == 'true'){
						val = true;
					}
					else if(lower == 'false'){
						val = false;
					}

					this[setter](val);

					// if the nm is v-align or h-align we want to return false so that the attribute isn't destroyed
					return nm.indexOf('-align') == -1;
				}
			}

			return false;
		},

		'_processAttributes' : function(dom, context){
			var attrs = dom.attributes,
				ln = attrs.length,
				attr;

			// variable reference
			if((attr = dom.attributes['var']) && this._processAttribute(dom, attr, context)){
				dom.removeAttribute('var');
			}

			// class name
			dom.removeAttribute('class-name');

			// class path
			dom.removeAttribute('class-path');

			// process the other attributes
			for(; ln--;){
				attr = attrs[ln];

				if(this._processAttribute(dom, attr, context)){
					dom.removeAttribute(attr.nodeName);
				}
			}
		},

		'_processChildren' : function(dom, context){
			// make sure we have something to process
			if(!dom){
				return;
			}

			var children = dom.childNodes,
				ln = children.length;

			for(; ln--;){
				if(!this._processChild(children[ln], context) && children[ln]){
					dom.removeChild(children[ln]);
				}
			}
		},

		'_processChild' : function(dom, context){
			// make sure we have something to process
			if(!dom){
				return;
			}

			var tag = dom.tagName;

			if(!tag || OjElement.isTextNode(dom)){
				return isEmpty(dom.nodeValue) ? null : new OjTextElement(dom);
			}

			var child, cls_path,
				cls = dom.getAttribute('class-name');

			tag = tag.toLowerCase();

			// if this is a script or link tag ignore it
			if(tag == 'script' || tag == 'link'){
				return false;
			}

			// load the class if we need to
			if(!window[cls] && (cls_path = dom.getAttribute('class-path'))){
				OJ.importJs(cls_path);
			}

			// get the component tag class
			if(OjStyleElement.isComponentTag(tag)){
				cls = OjStyleElement.getTagComponent(tag);
			}

			// process the class
			if(cls){
				if(isFunction(cls)){
					child = cls(dom);
				}
				else{
					child = new window[cls]();
				}

				child._setDomSource(dom, context);
			}
			else{
				child = new OjStyleElement(dom, context);
			}

			return child;
		},

		'_setDom' : function(dom, context){
			// todo: re-evaluate the pre-render functionality of dom
			this._super('OjStyleElement', '_setDom', [dom]);

			// process the attributes
			this._processAttributes(dom, context);

			// process the children
			this._processChildren(dom, context);

			// setup the dom id if there isn't one already
			if(!this._id){
				this.setId(this._id_);
			}
		},

		'_setIsDisplayed' : function(displayed){
			var ln, child;

			if(this._is_displayed == displayed){
				return;
			}

			this._super('OjStyleElement', '_setIsDisplayed', arguments);

			for(ln = this.numChildren(); ln--;){
				if(child = this.getChildAt(ln)){
					child._setIsDisplayed(this._is_displayed);
				}
			}
		},


		// Child Management Functions
		'addChild' : function(child){
			return this.addChildAt(child, this.numChildren());
		},

		'addChildAt' : function(child, index){
			var dom = this._dom;

			if(!child || this.hasChild(child)){
				return child;
			}

			if(index >= this.numChildren()){
				dom.appendChild(child._dom);
			}
			else{
				dom.insertBefore(child._dom, dom.childNodes[index]);
			}

			// update the display state
			child._setIsDisplayed(this._is_displayed);

			return child;
		},

		'getChildAt' : function(index){
			return OjElement.element(this._dom.childNodes[index]);
		},

		'getChildren' : function(){
			var ary = [],
				ln = this.numChildren();

			for(; ln--;){
				ary.unshift(this.getChildAt(ln));
			}

			return ary;
		},

		'indexOfChild' : function(child){
			return Array.array(this._dom.childNodes).indexOf(child._dom);
		},

		'hasChild' : function(child){
			return child.parent() == this;
		},

		'numChildren' : function(){
			return this._dom.childNodes.length;
		},

		'moveChild' : function(child, index){
			if(this.hasChild(child)){
				this._dom.insertBefore(child._dom, this.getChildAt(index)._dom);

				return child;
			}

			// throw an error here
		},

		'removeAllChildren' : function(){
			var ln = this.numChildren(),
				ary = [];

			for(; ln--;){
				ary.unshift(this.removeChildAt(ln));
			}

			return ary;
		},

		'removeChild' : function(child){
			if(child){
				this._dom.removeChild(child._dom);

				child._setIsDisplayed(false);
			}

			return child;
		},

		'removeChildAt' : function(index){
			if(index < 0 || index >= this.numChildren()){
				return null;
			}

			return this.removeChild(this.getChildAt(index));
		},

		'removeChildren' : function(children){
			var ln = children.length;

			for(; ln--;){
				this.removeChild(children[ln]);
			}
		},

		'replaceChild' : function(target, replacement){
			return this.replaceChildAt(replacement, this.indexOfChild(target));
		},

		'replaceChildAt' : function(child, index){
			var rtrn;

			if(index >= this.numChildren()){
				this.addChild(child);
			}
			else{
				rtrn = this.removeChildAt(index);

				this.addChildAt(child, index);
			}

			return rtrn;
		},


		// misc functions
		'blur' : function(){
			if(isFunction(this._dom.blur)){
				this._dom.blur();
			}
		},

		'find' : function(query){
			if(isElement(query)){
				query = '#' + query.id();
			}

			return OJ.query(query, this._dom);
		},

		'focus' : function(){
			if(isFunction(this._dom.focus)){
				this._dom.focus();
			}
		},

		'hide' : function(){
			this.addCss(['hidden']);

			this.dispatchEvent(new OjEvent(OjEvent.HIDE));
		},

		'isVisible' : function(){
			return this._getStyle('display') != OjStyleElement.NONE &&
				this._getStyle('visibility') != 'hidden' &&
				this._alpha > 0 &&
				this.getWidth() > 0 && this.getHeight() > 0;
		},

		'show' : function(){
			this.removeCss(['hidden']);

			this.dispatchEvent(new OjEvent(OjEvent.SHOW));
		},


		// single style getter & setter functions
		'_getStyleBackup' : function(style){
			return this._proxy.style[style];
		},

		'_getStyleIe' : function(style){
			return this._proxy.currentStyle[style];
		},

		'_getStyle' : function(style){
			return document.defaultView.getComputedStyle(this._proxy, null)[style];
		},
		'_setStyle' : function(style, value){
			return this._proxy.style[style] = value;
		},


		'_getStyleNumber' : function(prop){
			var val = this._getStyle(prop);

			if(!val || val == OjStyleElement.NONE){
				return 0;
			}

			return parseFloat(val.replaceAll(['px', '%', 'pt', 'em'], ''));
		},

		'_setStyleNumber' : function(prop, val/*, unit*/){
			var args = arguments;

			this._setStyle(prop, val + (args.length > 2 ? args[2] : this._getStyleUnit(prop)));
		},

		// Bulk Style Getter & Setter Functions
		'_getStyler' : function(prop, args){
			var unit = prop == 'font' || prop  =='line' ? OJ.setting('fontUnit') : OJ.setting('dimUnit');

			if(!this['_' + prop]){
				this['_' + prop] = [
					this._getStyle(prop + 'Top').replaceAll(unit, ''),
					this._getStyle(prop + 'Right').replaceAll(unit, ''),
					this._getStyle(prop + 'Bottom').replaceAll(unit, ''),
					this._getStyle(prop + 'Left').replaceAll(unit, '')
				];
			}

			return args && args.length ? this['_' + prop][args[0]] : this['_' + prop];
		},

		'_setStyler' : function(prop, vals){
			var str = '',
				ln = vals.length,
				val = vals[0],
				unit = this._getStyleUnit(prop);

			this._getStyler(prop);

			// fill out the vals array so that there is always the 4 values
			if(ln == 1){
				vals = [val, val, val, val];
			}
			else if(ln == 2){
				vals = [val, vals[1], val, vals[1]];
			}
			else if(ln == 3){
				vals = [val, vals[1], vals[2], vals[1]];
			}

			// substitute current values for null values
			for(ln = 4; ln--;){
				val = vals[ln];

				if(isNull(val)){
					val = this['_' + prop][ln];
				}

				str = (ln ? ' ' : '') + val + unit + str;
			}

			this._setStyle(prop, str);
		},

		'_getStyleUnit' : function(prop){
			prop = prop.substr(0, 4);

			if(prop == 'font' || prop == 'line'){
				return OJ.setting('fontUnit');
			}

			return OJ.setting('dimUnit');
		},


		// Attribute Getter & Setter Functions
		'getAttr' : function(key){
			return this._proxy.getAttribute(key);
		},
		'setAttr' : function(key/*||attribute, value*/){
			if(arguments.length == 1){
				if(isEmpty(key.value)){
					this._proxy.removeAttribute(key.nodeName);
				}
				else{
					this._proxy.setAttribute(key.nodeName, key.value);
				}
			}
			else{
				if(isSet(arguments[1])){
					this._proxy.setAttribute(key, arguments[1]);
				}
				else{
					this._proxy.removeAttribute(key);
				}
			}
		},

		'setId' : function(val){
			if(this._id == val){
				return
			}

			this._dom.id = this._id = val;
		},

		'setName' : function(val){
			if(this._name == val){
				return;
			}

			this.setAttr('name', this._name = val);
		},

		// Content Getter & Setter Functions
		'getText' : function(){
			return this._dom.innerHTML;
		},
		'setText' : function(str){
			this.removeAllChildren();

			this._dom.innerHTML = str ? str.toString() : null;

			// we may want to process this html, just a thought
		},

		// Css Functions
		'_makeCssList' : function(args){
			if(isArray(args[0])){
				return args[0];
			}

			var ln = args.length,
				list = [];

			for(; ln--;){
				list = list.concat(args[ln].trim().split(' '));
			}

			return list;
		},

		'_processCssList' : function(args, action){
			var css = this.getCssList(),
				list = this._makeCssList(args),
				ln = list.length,
				cls, index;

			for(; ln--;){
				index = css.indexOf(cls = list[ln]);

				if(index == -1){
					switch(action){
						case 'has':
							return false;

						case 'add':
						case 'toggle':
							css.push(cls);
					}
				}
				else{
					switch(action){
						case 'remove':
						case 'toggle':
							css.splice(index, 1);
					}
				}
			}

			if(action == 'has'){
				return true;
			}

			return this.setCss(css);
		},

		'addCss' : function(css/*...css | array*/){
			return this._processCssList(arguments, 'add');
		},

		'getCss' : function(){
			return this._proxy.className.trim();
		},

		'getCssList' : function(){
			return this.getCss().split(' ');
		},

		'hasCss' : function(css/*...css | array*/){
			return this._processCssList(arguments, 'has');
		},

		'removeCss' : function(css/*... css | array*/){
			return this._processCssList(arguments, 'remove');
		},

		'setCss' : function(css){
			return this._proxy.className = (isArray(css) ? css.join(' ') : css).trim();
		},

		'toggleCss' : function(css/*...css | array*/){
			return this._processCssList(arguments, 'toggle');
		},

		// Focus Functions
		'hasFocus' : function(){
			return this._dom.hasFocus;
		},

		'hitTest' : function(elm){
			return this.hitTestRect(elm.getRect());
		},

		'hitTestRect' : function(rect){
			var r = this.getRect();

			return (rect.top >= r.top && rect.top <= r.bottom && rect.left >= r.left && rect.left <= r.right) ||
				(rect.top >= r.top && rect.top <= r.bottom && rect.right >= r.left && rect.right <= r.right) ||
				(rect.bottom >= r.top && rect.bottom <= r.bottom && rect.left >= r.left && rect.left <= r.right) ||
				(rect.bottom >= r.top && rect.bottom <= r.bottom && rect.right >= r.left && rect.right <= r.right);
		},

		'hitTestPoint' : function(x, y){
			var r = this.getRect();

			return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
		},

		'localPoint' : function(global_point){
			// todo: add localPoint functionality
		},

		'localX' : function(global_x){
			return global_x - this.getPageX();
		},

		'localY' : function(global_y){
			return global_y - this.getPageY();
		},




		// Dimensional Getter & Setter Functions
		// TODO:
		// 1) factor in border into sizing
		// 2) handle non-metric values such as auto and %
		'getInnerWidth' : function(){
			return this.getWidth() - this.getPaddingLeft() - this.getPaddingRight();
		},
		'setInnerWidth' : function(w){
			this._setStyleNumber('width', Math.round(w));
		},

		'getOuterWidth' : function(){
			return this.getWidth() + this.getMarginLeft() + Math.abs(this.getMarginRight());
		},
		'setOuterWidth' : function(w){
			this.setInnerWidth(w - this.getPaddingLeft() - this.getPaddingRight() - this.getMarginLeft() - Math.abs(this.getMarginRight()));
		},

		'getWidth' : function(){
			return this._proxy.offsetWidth || this._getStyleNumber('width');
		},
		'setWidth' : function(w/*, unit*/){
			var args = arguments;

			if(w == OjStyleElement.AUTO){
				this._setStyle('width', null);
			}
			else if(args.length > 1){
				this._setStyle('width', w + (isString(args[1]) ? args[1] : '%'));
			}
			else{
				this.setInnerWidth(w - this.getPaddingLeft() - this.getPaddingRight());
			}
		},

		'getMinWidth' : function(){
			return isNull(this._min_width) ? this._min_width = this._getStyleNumber('minWidth') : this._min_width;
		},
		'setMinWidth' : function(min){
			this._setStyleNumber('minWidth', this._min_width = min);
		},

		'getMaxWidth' : function(){
			return isNull(this._max_width) ? this._max_width = this._getStyleNumber('maxWidth') : this._max_width;
		},
		'setMaxWidth' : function(max){
			this._setStyleNumber('maxWidth', this._max_width = max);
		},

		'getInnerHeight' : function(){
			return this.getHeight() - this.getPaddingTop() - this.getPaddingBottom();
		},
		'setInnerHeight' : function(h){
			this._setStyleNumber('height', Math.round(h));
		},

		'getOuterHeight' : function(){
			return this.getHeight() + this.getMarginTop() + Math.abs(this.getMarginBottom());
		},
		'setOuterHeight' : function(h){
			this.setInnerHeight(h - this.getPaddingTop() - this.getPaddingBottom() - this.getMarginTop() - Math.abs(this.getMarginBottom()));
		},

		'getHeight' : function(){
			return this._proxy.offsetHeight || this._getStyleNumber('height');;
		},
		'setHeight' : function(h/*, unit*/){
			if(h == OjStyleElement.AUTO){
				this._setStyle('height', null);
			}
			else if(arguments.length > 1){
				this._setStyle('height', h + (isString(arguments[1]) ? arguments[1] : '%'));
			}
			else{
				this.setInnerHeight(h - this.getPaddingTop() - this.getPaddingBottom());
			}
		},

		'getMinHeight' : function(){
			return isNull(this._min_height) ? this._min_height = this._getStyleNumber('minHeight') : this._min_height;
		},
		'setMinHeight' : function(min){
			this._min_height = min;

			this._setStyleNumber('minHeight', min);
		},

		'getMaxHeight' : function(){
			return isNull(this._max_height) ? this._max_height = this._getStyleNumber('maxHeight') : this._max_height;
		},
		'setMaxHeight' : function(max){
			this._max_height = max;

			this._setStyleNumber('maxHeight', max);
		},

		'setPercentWidth' : function(w){
			this._setStyleNumber('width', w, '%');
		},
		'setPercentHeight' : function(h){
			this._setStyleNumber('height', h, '%');
		},


		// border size functions
//		'getBorderSize' : function(/*side_index : top = 0, right = 1, bottom = 2, left = 3*/){
//			return this._getStyler('border-size', arguments);
//		},
//		'setBorderSize' : function(size/* | top/bottom, right/left | top, right/left, bottom | top, right, bottom, left*/){
//			this._setStyler('border-size', arguments);
//		},
//
//		'getBorderSizeBottom' : function(){
//			return this.getMargin(2);
//		},
//		'setBorderSizeBottom' : function(margin){
//			this.setMargin(null, null, margin, null);
//		},
//
//		'getBorderSizeLeft' : function(){
//			return this.getMargin(3);
//		},
//		'setBorderSizeLeft' : function(margin){
//			this.setMargin(null, null, null, margin);
//		},
//
//		'getBorderSizeRight' : function(){
//			return this.getMargin(1);
//		},
//		'setBorderSizeRight' : function(margin){
//			this.setMargin(null, margin, null, null);
//		},
//
//		'getBorderSizeTop' : function(){
//			return this.getMargin(0);
//		},
//		'setBorderSizeTop' : function(margin){
//			this.setMargin(margin, null, null, null);
//		},


		// Style Getter & Setter Functions
		'getX' : function(){
			return this._proxy.offsetLeft;
		},
		'getPageX' : function(){
			if(this._dom.getBoundingClientRect){
				return this._dom.getBoundingClientRect().left;
			}

			// add backup solution
		},
		'setX' : function(val/*, unit=px*/){
			var args = arguments;

			this._setStyleNumber('left', val, args.length > 1 ? args[1] : OJ.setting('dimUnit'));
		},

		'getY' : function(){
			return this._proxy.offsetTop;
		},
		'getPageY' : function(){
			if(this._dom.getBoundingClientRect){
				return this._dom.getBoundingClientRect().top;
			}

			// add backup solution
		},
		'setY' : function(val/*, unit=px*/){
			var args = arguments;

			this._setStyleNumber('top', val, args.length > 1 ? args[1] : OJ.setting('dimUnit'));
		},

		'getAlpha' : function(){
			return this._alpha;
		},
		'setAlpha' : function(alpha){
			var old_alpha = this._alpha;


			if(old_alpha == alpha){
				return;
			}

			if((alpha = this._alpha = this._setStyle('opacity', alpha)) && old_alpha === 0){
				this.dispatchEvent(new OjEvent(OjEvent.SHOW));
			}
			else if(!alpha){
				this.dispatchEvent(new OjEvent(OjEvent.HIDE));
			}
		},

		'getBackgroundColor' : function(){
			return this._getStyle('background-color');
		},
		'setBackgroundColor' : function(color){
			this._setStyle('background-color', color);
		},

		'getDepth' : function(){
			return this._depth;
		},
		'setDepth' : function(depth){
			this._depth = this._setStyle('zIndex', depth);
		},

		'getOverflow' : function(){
			return this._overflow;
		},
		'setOverflow' : function(overflow){
			this._overflow = this._setStyle('overflow', overflow);
		},

		'getRect' : function(){
			return OJ.makeRect(this.getPageX(), this.getPageY(), this.getWidth(), this.getHeight());
		},
		'setRect' : function(rect){
			// add this later
		},

		'getScrollHeight' : function(){
			return this._proxy.scrollHeight;
		},
		'setScrollHeight' : function(val){
			this._proxy.scrollHeight = val;
		},

		'getScrollWidth' : function(){
			return this._proxy.scrollWidth;
		},
		'setScrollWidth' : function(val){
			this._proxy.scrollWidth = val;
		},

		'getScrollX' : function(){
			return this._proxy.scrollLeft;
		},

		'setScrollX' : function(val){
			this._proxy.scrollLeft = val;
		},

		'getScrollY' : function(){
			return this._proxy.scrollTop;
		},

		'setScrollY' : function(val){
			this._proxy.scrollTop = val;
		},


		// alignment getter & setters
		'_getAlign' : function(type, dflt){
			var align = this.getAttr(type + '-align');

			return align ? align : dflt;
		},

		'_setAlign' : function(type, val, dflt){
			if(val == dflt){
				val = null;
			}

			this.setAttr(type + '-align', this['_' + type + '_align'] = val);
		},

		'getHAlign' : function(){
			return this._getAlign('h', OjStyleElement.LEFT);
		},
		'setHAlign' : function(val){
			return this._setAlign('h', val, OjStyleElement.LEFT);
		},

		'getVAlign' : function(){
			return this._getAlign('v', OjStyleElement.TOP);
		},
		'setVAlign' : function(val){
			return this._setAlign('v', val, OjStyleElement.TOP);
		},


		// Transform Setter & Getters
		'_updateTransform' : function(){
			var rotate = this._rotation ? 'rotate(' + this._rotation + 'deg) ' : '',
				translate = this._translate ? this._translate.toString() : '',
				transform = rotate + (isEmpty(translate) ? '' : 'translate(' + translate + ')'),
				prefix = OJ.getCssPrefix();

			if(prefix == '-moz-'){
				this._setStyle('MozTransform', transform);
			}
			else{
				this._setStyle(prefix + 'transform', transform);
			}

			this._setStyle('transform', transform);
		},

		'getOrigin' : function(){
			return this._origin;
		},
		'setOrigin' : function(val){
			this._setStyle(OJ.getCssPrefix() + 'transform-origin', val);

			this._setStyle('transform-origin', this._origin = val);
		},

		'getRotation' : function(){
			return this._rotation;
		},
		'setRotation' : function(val){
			if(this._rotation == val){
				return ;
			}

			this._rotation = val;

			this._updateTransform();
		},

		'getTranslate' : function(){
			return this._translate;
		},
		'setTranslate' : function(val){
			if(val.isEqualTo(this._translate)){
				return ;
			}

			this._translate = val;

			this._updateTransform();
		}
	},
	{
		'COMPONENT_TAGS' : {},

		'STYLE_BACKUP'  : 'styleBackup',
		'STYLE_DEFAULT' : 'styleDefault',
		'STYLE_IE'      : 'styleIE',

		'STYLE_MODE' : (function(){
			var elm = OjElement.elm('div');

			if(elm.currentStyle){
				return 'styleIE';
			}

			if(!document.defaultView || !document.defaultView.getComputedStyle){
				return 'styleBackup';
			}

			return 'styleDefault';
		})(),

		'AUTO'    : 'auto',
		'BLOCK'   : 'block',
		'HIDDEN'  : 'hidden',
		'NONE'    : 'none',
		'SCROLL'  : 'scroll',
		'VISIBLE' : 'visible',

		'LEFT'   : 'l',
		'CENTER' : 'c',
		'RIGHT'  : 'r',

		'TOP'    : 't',
		'MIDDLE' : 'm',
		'BOTTOM' : 'b',


		'attributeToGetter' : function(attr){
			return 'get' + OJ.attributeToFunc(attr).ucFirst();
		},

		'attributeToSetter' : function(attr){
			return 'set' + OJ.attributeToFunc(attr).ucFirst();
		},

		'getTagComponent' : function(tag){
			return this.COMPONENT_TAGS[tag];
		},

		'isComponentTag' : function(tag){
			return isSet(this.COMPONENT_TAGS[tag]);
		},

		'registerComponentTag' : function(tag, component){
			this.COMPONENT_TAGS[tag] = component;

			if(OJ.getBrowser() == OJ.IE && OJ.getBrowserVersion().compareVersion('9.0.0') < 0){
				document.createElement(tag);
			}
		},

		'getStyle' : function(dom, style){
			if(this.STYLE_MODE == this.STYLE_IE){
				return dom.currentStyle[style];
			}

			if(this.STYLE_MODE == this.STYLE_BACKUP){
				return dom.style[style];
			}

			return document.defaultView.getComputedStyle(dom, null)[style];
		}
	}
);