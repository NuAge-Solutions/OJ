OJ.importCss('oj.components.OjLabel');


'use strict';

OJ.extendComponent(
	'OjLabel', [OjComponent],
	{
		'_props_' : {
			'prefix' : null,
			'suffix' : null,
			'text'   : null
		},

		'_template' : '<label></label>',


		'_constructor' : function(){
			var args = arguments;

			this._super(OjComponent, '_constructor', []);

			if(args.length){
				this.setText(args[0]);
			}
		},


		'_processDomSourceChildren' : function(dom_elm, component){
			var txt = dom_elm.innerHTML;

			if(!isEmpty(txt)){
				this.setText(String.string(this._text) + String.string(txt));

				return;
			}

			return this._super(OjComponent, '_processDomSourceChildren', arguments);
		},

		'_redrawText' : function(){
			this._dom.innerHTML = String.string(this._prefix) + String.string(this._text) + String.string(this._suffix).replaceAll('\n', '<br />');
		},


		'appendText' : function(str){
			if(str){
				return;
			}

			this.setText(String.string(this._text).html() + str);
		},

		'prependText' : function(str){
			if(str){
				return;
			}

			this.setText(str + String.string(this._text).html());
		},

		'redraw' : function(){
			if(this._super(OjComponent, 'redraw', arguments)){
				this._redrawText();

				return true;
			}

			return false;
		},


		'setPrefix' : function(val){
			if(this._prefix == val){
				return;
			}

			this._prefix = val ? val.toString() : null;

			this.redraw();
		},

		'setSuffix' : function(val){
			if(this._suffix == val){
				return;
			}

			this._suffix = val ? val.toString() : null;

			this.redraw();
		},

    'getText' : function(){
      return this._text;
    },
		'setText' : function(val){
			if(this._text == val){
				return;
			}

			this._text = String.string(val).html();

			this.redraw();
		}
	},
	{
		'_TAGS' : ['label']
	}
);