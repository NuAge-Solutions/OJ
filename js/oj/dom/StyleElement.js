'use strict';

OJ.compileClass(
	'OjStyleElement',
	oj.dom.StyleElement = function(){
		return new oj.dom.Element(
			arguments, 'OjStyleElement',
			{
				'_properties_' : {
					'id'   : null,
					'name' : null
				},

				'_classes' : null,

				'_min_width' : null,  '_max_width' : null,  '_min_height' : null,  '_max_height' : null,

				'_borderSize' : null,  '_margin' : null,  '_padding' : null, '_alpha' : 1,  '_depth' : 0,  '_overflow' : null,

				'_origin' : '0px 0px',  '_rotation' : 0,  '_translate' : '0px 0px',

				'_h_align' : null,  '_v_align' : null,


				'_compile_' : function(){
					var elm = OjElement.elm('div');

					if(elm.currentStyle){
						this._getStyle = this._getStyleIe;
					}
					else if(!document.defaultView || !document.defaultView.getComputedStyle){
						this._getStyle = this._getStyleBackup;
					}
				},


				'_constructor' : function(/*source*/){
					this._super('OjStyleElement', '_constructor', arguments);

					this.setId(this._id_);
				},

				'_setDom' : function(dom_elm){
					this._super('OjStyleElement', '_setDom', arguments);

					this._classes = dom_elm.className.split(' ');

					var h_align = this._getStyle('text-align');
					var v_align = this._getStyle('vertical-align');

					this.setHorzAlign(isEmpty(h_align) ? OjStyleElement.LEFT : h_align);
					this.setVertAlign(isEmpty(v_align) ? OjStyleElement.TOP : v_align);
				},

//				'_setDomSource' : function(dom_elm){
//					var rtrn = this._super('OjComponent', '_setDomSource', arguments);
//
//					// add back all the children that have now been removed
//					var i = 0, ln = this.numChildren();
//
//					for(; i < ln; i++){
//						this._dom.appendChild(this.getChildAt(i)._dom);
//					}
//
//					return rtrn;
//				},

				'_setIsDisplayed' : function(displayed){
					if(this._is_displayed == displayed){
						return;
					}

					this._super('OjStyleElement', '_setIsDisplayed', arguments);

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
						rtrn.splice(0, 0, this.removeChildAt(ln));
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

				// display functions
				'blur' : function(){
					if(isFunction(this._dom.blur)){
						this._dom.blur();
					}
				},

				'focus' : function(){
					if(isFunction(this._dom.focus)){
						this._dom.focus();
					}
				},

				'show' : function(){
					this.removeClasses('hidden');
				},

				'hide' : function(){
					this.addClasses('hidden');
				},

				'isVisible' : function(){
					return this._getStyle('display') != OjStyleElement.NONE && this._getStyle('visibility') != 'hidden' &&
						this._alpha > 0 && this.getWidth() > 0 && this.getHeight() > 0;
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
				'_getStyler' : function(type){
					if(!this['_' + type]){
						var parts = this._getStyle(type).replaceAll('px', '').split(' '), ln = parts.length;

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
							this['_' + type] = [parts[0], parts[4], parts[2], parts[3]];
						}
					}
				},

				'_setStyler' : function(type, vals){
					var ln = vals.length;

					this['_' + type] = [0, 0, 0, 0];

					type = type.ucFirst();

					if(!ln){
						this['set' + type + 'Top'](0); this['set' + type + 'Left'](0);

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

					this.setAttr('id', this._id = val);
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


				'getBorderSize' : function(){
					this._getStyler('border-size'); return this._border.clone();
				},
				'setBorderSize' : function(size){
					this._getStyler('border-size');

					if(arguments.length > 1 || !isArray(arguments[0])){
						size = arguments;
					}

					this._setStyler('border-size', size);
				},

				'getBorderSizeTop' : function(){
					this._getStyler('border-size'); return this._borderSize[0];
				},
				'setBorderSizeTop' : function(size){
					this._getStyler('border-size'); this._setStyleNumber('border-top', this._borderSize[0] = size);
				},

				'getBorderSizeLeft' : function(){
					this._getStyler('border-size'); return this._borderSize[1];
				},
				'setBorderSizeLeft' : function(size){
					this._getStyler('border-size'); this._setStyleNumber('border-left', this._borderSize[1] = size);
				},

				'getBorderSizeBottom' : function(){
					this._getStyler('border-size'); return this._borderSize[2];
				},
				'setBorderSizeBottom' : function(size){
					this._getStyler('border-size'); this._setStyleNumber('border-bottom', this._borderSize[2] = size);
				},

				'getBorderSizeRight' : function(){
					this._getStyler('border-size'); return this._borderSize[3];
				},
				'setBorderSizeRight' : function(size){
					this._getStyler('border-size'); this._setStyleNumber('border-right', this._borderSize[3] = size);
				},


				'getMargin' : function(){
					this._getStyler('margin'); return this._margin.clone();
				},
				'setMargin' : function(margin){
					this._getStyler('margin');

					if(arguments.length > 1){
						margin = arguments;
					}

					this._setStyler('margin', margin);
				},

				'getMarginTop' : function(){
					this._getStyler('margin'); return this._margin[0];
				},
				'setMarginTop' : function(margin){
					this._getStyler('margin'); this._setStyleNumber('margin-top', this._margin[0] = margin);
				},

				'getMarginLeft' : function(){
					this._getStyler('margin'); return this._margin[1];
				},
				'setMarginLeft' : function(margin){
					this._getStyler('margin'); this._setStyleNumber('margin-left', this._margin[1] = margin);
				},

				'getMarginBottom' : function(){
					this._getStyler('margin'); return this._margin[2];
				},
				'setMarginBottom' : function(margin){
					this._getStyler('margin'); this._setStyleNumber('margin-bottom', this._margin[2] = margin);
				},

				'getMarginRight' : function(){
					this._getStyler('margin'); return this._margin[3];
				},
				'setMarginRight' : function(margin){
					this._getStyler('margin'); this._setStyleNumber('margin-right', this._margin[3] = margin);
				},


				'getPadding' : function(){
					this._getStyler('padding'); return this._padding.clone();
				},
				'setPadding' : function(padding){
					this._getStyler('padding');

					if(arguments.length > 1 || !isArray(arguments[0])){
						padding = arguments;
					}

					this._setStyler('padding', padding);
				},

				'getPaddingTop' : function(){
					this._getStyler('padding'); return this._padding[0];
				},
				'setPaddingTop' : function(padding){
					this._getStyler('padding'); this._setStyleNumber('padding-top', this._padding[0] = Math.max(0, padding));
				},

				'getPaddingLeft' : function(){
					this._getStyler('padding'); return this._padding[1];
				},
				'setPaddingLeft' : function(padding){
					this._getStyler('padding'); this._setStyleNumber('padding-left', this._padding[1] = Math.max(0, padding));
				},

				'getPaddingBottom' : function(){
					this._getStyler('padding'); return this._padding[2];
				},
				'setPaddingBottom' : function(padding){
					this._getStyler('padding'); this._setStyleNumber('padding-bottom', this._padding[2] = Math.max(0, padding));
				},

				'getPaddingRight' : function(){
					this._getStyler('padding'); return this._padding[3];
				},
				'setPaddingRight' : function(padding){
					this._getStyler('padding'); this._setStyleNumber('padding-right', this._padding[3] = Math.max(0, padding));
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
			}
		);
	},
	{
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