OJ.importJs('oj.renderers.OjLabelItemRenderer');
OJ.importJs('oj.events.OjUiEvent');

OJ.importCss('oj.form.OjOption');


OJ.extendClass(
	'OjOption', [OjItemRenderer],
	{
		'_props_' : {
			'dataRenderer' : null,
			'isSelected'   : false
		},

//		'_selector' : null,

		'_v_align' : OjStyleElement.MIDDLE,

		'_template' : 'oj.form.OjOption',


		'_constructor' : function(/*group|dataRenderer, data*/){
			// process the arguments
			var args = arguments,
				ln = args.length,
				renderer = OjLabelItemRenderer;

			if(ln > 1){
				var tmp = args[1];

				if(isString(tmp) || tmp.is('OjItemRenderer')){
					renderer = tmp;

					args[1] = null;
				}
			}

			this._super(OjItemRenderer, '_constructor', arguments);

			if(!this._selector){
				this.dataRenderer = renderer;

				this.addEventListener(OjUiEvent.PRESS, this, '_onClick');
			}
		},

		'_destructor' : function(){
			this._selector = this._dataRenderer = null;

			return this._super(OjItemRenderer, '_destructor', arguments);
		},


		'_processDomSourceChild' : function(dom_elm, component){
			if(!isEmpty(dom_elm.nodeValue)){
				this.data = (this._data ? this._data : '') + dom_elm.nodeValue;

				return null;
			}

			return this._super(OjItemRenderer, '_processDomSourceChild', arguments);
		},

		'_redrawData' : function(){
			if(this.option && this._super(OjItemRenderer, '_redrawData', arguments)){
				this.option.data = this._data;

				return true;
			}

			return false;
		},


		'_onClick' : function(evt){
			this.isSelected = !this.isSelected;
		},


		'=dataRenderer' : function(val){
			if(isString(val)){
				val = OJ.stringToClass(val);
			}

			if(this._dataRenderer == val){
				return;
			}

			this._unset('option');

			this._dataRenderer = val;

            this.option = new val(this._group, this._data)
            this.option.addCss('option');

			this.appendElm(this.option);
		},

		'=group' : function(group){
			if(this._group == group){
				return;
			}

			this._super(OjItemRenderer, '=group', arguments);

			var owner;

			if(this._group && (owner = this._group.owner) && owner.is(OjSelector)){
				this._selector = owner;

				this.dataRenderer = owner.item_renderer;

				this.removeEventListener(OjUiEvent.PRESS, this, '_onClick');
			}
			else{
				this._selector = null;

				this.dataRenderer = OjLabelItemRenderer;

				this.addEventListener(OjUiEvent.PRESS, this, '_onClick');
			}
		},

		'=isSelected' : function(val){
			if(this._isSelected == val){
				return;
			}

			if(this._isSelected = val){
				this.addCss('selected');

				this.input.dom.checked = true;
			}
			else{
				this.removeCss('selected');

				this.input.dom.checked = false;
			}

			this.dispatchEvent(new OjEvent(OjEvent.CHANGE));
		}
	}
);