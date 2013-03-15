'use strict';

OJ.extendClass(
	OjElement, 'OjStyleElement',
	{
		'_props_' : {
			'id'   : null,
			'name' : null
		},

		'_classes' : null,

		'_min_width' : null,  '_max_width' : null,  '_min_height' : null,  '_max_height' : null,

		'_borderSize' : null,  '_margin' : null,  '_padding' : null, '_alpha' : 1,  '_depth' : 0,  '_overflow' : null,

		'_origin' : '0px 0px',  '_rotation' : 0,  '_translate' : '0px 0px',

		'_h_align' : null,  '_v_align' : null,


		'_compile_' : function(){
			var cls = OjStyleElement;

			if(cls.STYLE_MODE == cls.STYLE_IE){
				this._getStyle = this._getStyleIe;
			}
			else if(cls.STYLE_MODE == cls.STYLE_BACKUP){
				this._getStyle = this._getStyleBackup;
			}

			// build functions for style getter and setters
			// todo: implement StyleElement margin/padding/etc funcs
		},


		'_constructor' : function(/*source, context*/){
			// default the context and source
			var source, context,
				ln = arguments.length;

			if(ln && (source = arguments[0])){
				// set the context if any
				if(ln > 1){
					context = arguments[1];
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
						var tmp;

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

			this._s('OjStyleElement', '_constructor', [source, context]);
		},


		'_processAttributes' : function(context){
			var ln = this._dom.attributes.length,
				attr, val, setter;

			// reset the classes array
			this._classes = [];

			while(ln-- > 0){
				attr = this._dom.attributes[ln].nodeName;
				val = this._dom.attributes[ln].value;

				if(attr == 'var'){
					if(!isEmpty(val) && context){
						(context[val] = this).addClasses(val);
					}

					this._dom.removeAttribute(attr);
				}
				else if(attr == 'class-name' || attr == 'class-path' || attr == 'var'){
					this._dom.removeAttribute(attr);
				}
				else if(attr == 'class'){
					this._dom.removeAttribute('class');

					this.addClass(val);
				}
				else{
					setter = OjElement.attributeToSetter(attr);

					if(isFunction(this[setter])){
						this._dom.removeAttribute(attr);

						if(val == ''){
							val = null;
						}
						else if(isNumeric(val)){
							val = parseFloat(val);
						}

						this[setter](val);
					}
				}
			}
		},

		'_processChildren' : function(context){
			var children = this._dom.childNodes, ln = children.length, child;

			this._children = [];

			while(ln-- > 0){
				child = this._processChild(children[ln], context);

				if(child){
					child._setParent(this);

					this._children.unshift(child);
				}
				else if(isNull(child) && children[ln]){
					this._dom.removeChild(children[ln]);
				}
			}
		},

		'_processChild' : function(dom_elm, context){
			var tag = dom_elm.tagName;

			if(!tag || OjElement.isTextNode(dom_elm)){
				return isEmpty(dom_elm.nodeValue) ? null : new OjTextElement(dom_elm);
			}

			var child,
				var_val = dom_elm.getAttribute('var'),
				cls = dom_elm.getAttribute('class-name');

			tag = tag.toLowerCase();

			// if this is a script or link tag ignore it
			if(tag == 'script' || tag == 'link'){
				return false;
			}

			if(OjElement.isComponentTag(tag)){
				cls = OjElement.getTagComponent(tag);
			}

			if(cls){
				var cls_path = dom_elm.getAttribute('class-path');

				if(cls_path){
					OJ.importJs(cls_path);
				}

				if(isFunction(cls)){
					child = cls(dom_elm);
				}
				else{
					child = new window[cls]();
				}

				child._setDomSource(dom_elm, context);
			}
			else{
				child = new OjStyleElement(dom_elm, context);
			}

			return child;
		},

		'_setDom' : function(dom_elm, context){
			// todo: re-evaluate the pre-render functionality of dom

			this._s('OjStyleElement', '_setDom', arguments);

			// process the attributes
			this._processAttributes(context);

			// process the children
			this._processChildren(context);

			// setup the css classes
			this._classes = dom_elm.className.split(' ');

			// setup the alignment
			var h_align = this._getStyle('text-align');
			var v_align = this._getStyle('vertical-align');

			this.setHorzAlign(isEmpty(h_align) ? OjStyleElement.LEFT : h_align);
			this.setVertAlign(isEmpty(v_align) ? OjStyleElement.TOP : v_align);

			// setup the dom id if there isn't one already
			if(!this._id){
				this.setId(this._id_);
			}
		},

		'_setIsDisplayed' : function(displayed){
			if(this._is_displayed == displayed){
				return;
			}

			this._s('OjStyleElement', '_setIsDisplayed', arguments);

			var ln = this.numChildren();

			for(; ln--;){
				this.getChildAt(ln)._setIsDisplayed(this._is_displayed);
			}
		},


		// Child Management Functions
		'addChild' : function(child){
			return this.addChildAt(child, this.numChildren());
		},

		'addChildAt' : function(child, index){
			if(this.hasChild(child)){
				return child;
			}

			if(child._parent){
				child._parent.removeChild(child);
			}

			if(index >= this.numChildren()){
				index = this.numChildren();

				this._dom.appendChild(child._dom);
			}
			else{
				this._dom.insertBefore(child._dom, this._dom.childNodes[index]);
			}

			this._children.splice(index, 0, child)

			child._setParent(this);

			return child;
		},

		'getChildAt' : function(index){
			return this._children[index];
		},

		'getChildren' : function(){
			return this._children.clone()
		},

		'indexOfChild' : function(child){
			return this._children.indexOf(child);
		},

		'hasChild' : function(child){
			return child._parent == this;
		},

		'numChildren' : function(){
			return this._children.length;
		},

		'moveChild' : function(child, index){
			if(this.hasChild(child)){
				var orig_index = this.indexOfChild(child);

				this._children.splice(orig_index, 1);

				this._dom.removeChild(child._dom);

				this._dom.insertBefore(child._dom, this._children[index]._dom);

				this._children.splice(index, 0, child);

				return;
			}

			// throw an error here
		},

		'removeAllChildren' : function(){
			var ln = this._children.length, rtrn = [];

			while(ln-- > 0){
				rtrn.unshift(this.removeChildAt(ln));
			}

			return rtrn;
		},

		'removeChild' : function(child){
			return this.removeChildAt(this.indexOfChild(child));
		},

		'removeChildAt' : function(index){
			if(index < 0){
				return null;
			}

			var child = this._children.splice(index, 1)[0];;

			try{
				this._dom.removeChild(child._dom);

				child._setParent(null);
			}
			catch(e){}

			return child;
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
			this.addClasses('hidden');
		},

		'isVisible' : function(){
			return this._getStyle('display') != OjStyleElement.NONE && this._getStyle('visibility') != 'hidden' &&
				this._alpha > 0 && this.getWidth() > 0 && this.getHeight() > 0;
		},

		'show' : function(){
			this.removeClasses('hidden');
		},


		// single style getter & setter functions
		'_getStyleBackup' : function(style){
			return this._proxy.style[style];
		},

		'_getStyleIe' : function(style){
			return this._proxy.currentStyle[style];
		},

		'_getStyle' : function(style){
			return document.defaultView.getComputedStyle(this._proxy, null).getPropertyValue(style);
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
			var unit, p = prop.substr(0, 4);

			if(p == 'font' || p == 'line'){
				unit = OJ.setting('fontUnit');
			}
			else{
				unit = OJ.setting('dimUnit');
			}

			this._setStyle(prop, val + (arguments.length > 2 ? arguments[2] : unit));
		},

		// Bulk Style Getter & Setter Functions
		'_getStyler' : function(prop, args){
			if(!this['_' + prop]){
				var unit = prop == 'font' || prop  =='line' ? OJ.setting('fontUnit') : OJ.setting('dimUnit'),
					parts = this._getStyle(type).replaceAll(unit, '').split(' '),
					ln = parts.length;

				if(!ln){
					this['_' + type] = [0, 0, 0, 0];
				}
				else if(ln == 1){
					this['_' + type] = [parts[0], parts[0], parts[0], parts[0]];
				}
				else if(ln == 2){
					this['_' + type] = [parts[0], parts[1], parts[0], parts[1]];
				}
				else if(ln == 3){
					this['_' + type] = [parts[0], parts[1], parts[2], parts[1]];
				}
				else{
					this['_' + type] = [parts[0], parts[1], parts[2], parts[3]];
				}
			}
		},

		'_setStyler' : function(type, vals){
			var val, ln = vals.length;

			if(ln == 1){
				val = vals[0];

				vals = [val, val, val, val];
			}


			ln = 4

			for(; ln--;){
				val = vals[ln];

				if(isNull(val)){

				}
			}


			if(!ln){
				this['set' + type + 'Top'](0); this['set' + type + 'Left'](0);

				this._setStyleNumber(type + '-top', this._padding[0] = Math.max(0, padding));

				this['set' + type + 'Bottom'](0); this['set' + type + 'Right'](0);
			}
			else if(ln == 1){
				this['set' + type + 'Top'](vals[0]); this['set' + type + 'Left'](vals[0]);

				this['set' + type + 'Bottom'](vals[0]); this['set' + type + 'Right'](vals[0]);
			}
			else if(ln == 2){
				this['set' + type + 'Top'](vals[0]); this['set' + type + 'Left'](vals[1]);

				this['set' + type + 'Bottom'](vals[0]); this['set' + type + 'Right'](vals[1]);
			}
			else if(ln == 3){
				this['set' + type + 'Top'](vals[0]); this['set' + type + 'Left'](vals[1]);

				this['set' + type + 'Bottom'](vals[2]); this['set' + type + 'Right'](vals[1]);
			}
			else{
				this['set' + type + 'Top'](vals[0]); this['set' + type + 'Left'](vals[1]);

				this['set' + type + 'Bottom'](vals[2]); this['set' + type + 'Right'](vals[3]);
			}
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
		'addClass' : function(class_str){
			this.addClasses.apply(this, class_str.split(' '));
		},

		'addClasses' : function(classes/*... args*/){
			var ln = arguments.length;

			while(ln-- > 0){
				if(this._classes.indexOf(arguments[ln]) == -1){
					this._classes.push(arguments[ln]);

					this._proxy.className += ' ' + arguments[ln];
				}
			}

			this._proxy.className = this._proxy.className.trim();
		},

		'getClasses' : function(){
			return this._classes.clone();
		},

		'setClasses' : function(classes){
			this._classes = classes.clone();

			this._proxy.className = this._classes.join(' ');
		},

		'hasClass' : function(class_str){
			this.hasClasses.apply(this, class_str.split(' '));
		},

		'hasClasses' : function(classes/*... args*/){
			var ln = arguments.length;

			while(ln-- > 0){
				if(this._classes.indexOf(arguments[ln]) == -1){
					return false;
				}
			}

			return true;
		},

		'hitTest' : function(elm){
			return this.hitTestRect(elm.getRect());
		},

		'hitTestRect' : function(rect){
			var self = this.getRect();

			return (rect.top >= self.top && rect.top <= self.bottom && rect.left >= self.left && rect.left <= self.right) ||
				(rect.top >= self.top && rect.top <= self.bottom && rect.right >= self.left && rect.right <= self.right) ||
				(rect.bottom >= self.top && rect.bottom <= self.bottom && rect.left >= self.left && rect.left <= self.right) ||
				(rect.bottom >= self.top && rect.bottom <= self.bottom && rect.right >= self.left && rect.right <= self.right);
		},

		'hitTestPoint' : function(x, y){
			var self = this.getRect();

			return x >= self.left && x <= self.right && y >= self.top && y <= self.bottom;
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

		'removeClass' : function(class_str){
			this.removeClasses.apply(this, class_str.split(' '));
		},

		'removeClasses' : function(classes/*... args*/){
			var ln = arguments.length, index;

			while(ln-- > 0){
				if((index = this._classes.indexOf(arguments[ln])) != -1){
					this._classes.splice(index, 1);
				}
			}

			this._proxy.className = this._classes.join(' ');
		},

		'toggleClass' : function(class_str){
			this.toggleClasses.apply(this.class_str.slit(' '));
		},
		'toggleClasses' : function(classes/*... args*/){
			var ln = arguments.length, add = [], remove = [];

			while(ln-- > 0){
				if(this._classes.indexOf(arguments[ln]) == -1){
					add.push(arguments[ln]);
				}
				else{
					remove.push(arguments[ln]);
				}
			}

			if(add.length){
				this.addClasses(add);
			}

			if(remove.length){
				this.removeClasses(remove);
			}
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
			return this._proxy.offsetWidth;
		},
		'setWidth' : function(w/*, unit*/){
			if(w == OjStyleElement.AUTO){
				this._setStyle('width', null);
			}
			else if(arguments.length > 1){
				this._setStyle('width', w + (isString(arguments[1]) ? arguments[1] : '%'));
			}
			else{
				this.setInnerWidth(w - this.getPaddingLeft() - this.getPaddingRight());
			}
		},

		'getMinWidth' : function(){
			return isNull(this._min_width) ? this._min_width = this._getStyleNumber('min-width') : this._min_width;
		},
		'setMinWidth' : function(min){
			this._min_width = min;

			this._setStyleNumber('min-width', min);
		},

		'getMaxWidth' : function(){
			return isNull(this._max_width) ? this._max_width = this._getStyleNumber('max-width') : this._max_width;
		},
		'setMaxWidth' : function(max){
			this._max_width = max;

			this._setStyleNumber('max-width', max);
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
			return this._proxy.offsetHeight;
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
			return isNull(this._min_height) ? this._min_height = this._getStyleNumber('min-height') : this._min_height;
		},
		'setMinHeight' : function(min){
			this._min_height = min;

			this._setStyleNumber('min-height', min);
		},

		'getMaxHeight' : function(){
			return isNull(this._max_height) ? this._max_height = this._getStyleNumber('max-height') : this._max_height;
		},
		'setMaxHeight' : function(max){
			this._max_height = max;

			this._setStyleNumber('max-height', max);
		},

		'setPercentWidth' : function(w){
			this._setStyleNumber('width', w, '%');
		},
		'setPercentHeight' : function(h){
			this._setStyleNumber('height', h, '%');
		},


		// border size functions
		'getBorderSize' : function(/*side_index : top = 0, right = 1, bottom = 2, left = 3*/){
			return this._getStyler('border-size', arguments);
		},
		'setBorderSize' : function(size/* | top/bottom, right/left | top, right/left, bottom | top, right, bottom, left*/){
			this._setStyler('border-size', arguments);
		},

		'getBorderSizeBottom' : function(){
			return this.getMargin(2);
		},
		'setBorderSizeBottom' : function(margin){
			this.setMargin(null, null, margin, null);
		},

		'getBorderSizeLeft' : function(){
			return this.getMargin(3);
		},
		'setBorderSizeLeft' : function(margin){
			this.setMargin(null, null, null, margin);
		},

		'getBorderSizeRight' : function(){
			return this.getMargin(1);
		},
		'setBorderSizeRight' : function(margin){
			this.setMargin(null, margin, null, null);
		},

		'getBorderSizeTop' : function(){
			return this.getMargin(0);
		},
		'setBorderSizeTop' : function(margin){
			this.setMargin(margin, null, null, null);
		},


		// margin functions
		'getMargin' : function(/*side_index : top = 0, right = 1, bottom = 2, left = 3*/){
			return this._getStyler('margin', arguments);
		},
		'setMargin' : function(margin/* | top/bottom, right/left | top, right/left, bottom | top, right, bottom, left*/){
			this._setStyler('margin', arguments);
		},

		'getMarginBottom' : function(){
			return this.getMargin(2);
		},
		'setMarginBottom' : function(margin){
			this.setMargin(null, null, margin, null);
		},

		'getMarginLeft' : function(){
			return this.getMargin(3);
		},
		'setMarginLeft' : function(margin){
			this.setMargin(null, null, null, margin);
		},

		'getMarginRight' : function(){
			return this.getMargin(1);
		},
		'setMarginRight' : function(margin){
			this.setMargin(null, margin, null, null);
		},

		'getMarginTop' : function(){
			return this.getMargin(0);
		},
		'setMarginTop' : function(margin){
			this.setMargin(margin, null, null, null);
		},


		// padding functions
		'getPadding' : function(/*side_index : top = 0, right = 1, bottom = 2, left = 3*/){
			this._getStyler('padding');

			if(arguments){
				return this._margin[arguments[0]];
			}

			return this._margin.clone();
			this._getStyler('padding');

			return this._padding.clone();
		},
		'setPadding' : function(padding){
			this._getStyler('padding');

			if(arguments.length > 1 || !isArray(arguments[0])){
				padding = arguments;
			}

			this._setStyler('padding', padding);
		},

		'getPaddingTop' : function(){
			this._getStyler('padding');

			return this._padding[0];
		},
		'setPaddingTop' : function(padding){
			this._getStyler('padding');

			this._setStyleNumber('padding-top', this._padding[0] = Math.max(0, padding));
		},

		'getPaddingLeft' : function(){
			this._getStyler('padding');

			return this._padding[1];
		},
		'setPaddingLeft' : function(padding){
			this._getStyler('padding');

			this._setStyleNumber('padding-left', this._padding[1] = Math.max(0, padding));
		},

		'getPaddingBottom' : function(){
			this._getStyler('padding');

			return this._padding[2];
		},
		'setPaddingBottom' : function(padding){
			this._getStyler('padding');

			this._setStyleNumber('padding-bottom', this._padding[2] = Math.max(0, padding));
		},

		'getPaddingRight' : function(){
			this._getStyler('padding');

			return this._padding[3];
		},
		'setPaddingRight' : function(padding){
			this._getStyler('padding');

			this._setStyleNumber('padding-right', this._padding[3] = Math.max(0, padding));
		},


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
		'setX' : function(val){
			this._setStyleNumber('left', val);
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
		'setY' : function(val){
			this._setStyleNumber('top', val);
		},

		'getAlpha' : function(){
			return this._alpha;
		},
		'setAlpha' : function(alpha){
			this._alpha = this._setStyle('opacity', alpha);
		},

		'getDepth' : function(){
			return this._depth;
		},
		'setDepth' : function(depth){
			this._depth = this._setStyle('zIndex', depth);
		},

		'getHorzAlign' : function(){
			return this._h_align;
		},
		'setHorzAlign' : function(align){
			if(this._h_align == align){
				return;
			}

			if(this._h_align){
				this.removeClasses('halign-' + this._h_align);
			}

			if((this._h_align = align) == OjStyleElement.LEFT){
				return;
			}

			this.addClasses('halign-' + this._h_align);
		},

		'getRect' : function(){
			return OJ.makeRect(this.getPageX(), this.getPageY(), this.getWidth(), this.getHeight());
		},
		'setRect' : function(rect){
			// add this later
		},

		'getOverflow' : function(){
			return this._overflow;
		},
		'setOverflow' : function(overflow){
			this._overflow = this._setStyle('overflow', overflow);
		},

		'getVertAlign' : function(){
			return this._v_align;
		},
		'setVertAlign' : function(align){
			if(this._v_align == align){
				return;
			}

			if(this._v_align){
				this.removeClasses('valign-' + this._v_align);
			}

			if((this._v_align = align) == OjStyleElement.TOP){
				return;
			}

			this.addClasses('valign-' + this._v_align);
		},


		// Transform Setter & Getters
		'_updateTransform' : function(){
			var transform = 'rotate(' + this._rotation + 'deg) translate(' + this._translate + ')';

			var prefix = OJ.getCssPrefix();

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
			if(this._translate == val){
				return ;
			}

			this._translate = val;

			this._updateTransform();
		}
	},
	{
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

		'LEFT'   : 'left',
		'CENTER' : 'center',
		'RIGHT'  : 'right',

		'TOP'    : 'top',
		'MIDDLE' : 'middle',
		'BOTTOM' : 'bottom'
	}
);