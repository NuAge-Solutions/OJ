OJ.importCss('oj.components.Label');


'use strict';

OJ.extendComponent(
	OjComponent, 'OjLabel',
	{
		'_props_' : {
			'prefix' : null,
			'suffix' : null,
			'text'   : null
		},

		'_template' : '<label></label>',


		'_constructor' : function(){
			this._super('OjLabel', '_constructor', []);

			if(arguments.length){
				this.setText(arguments[0]);
			}
		},


		'_processDomSourceChild' : function(dom_elm, component){
			if(!isEmpty(dom_elm.nodeValue)){
				this.setText((this._text ? this._text : '') + dom_elm.nodeValue);

				return null;
			}

			return this._super('OjLabel', '_processDomSourceChild', arguments);
		},

		'_redrawText' : function(){
			this._dom.innerHTML = ((this._prefix ? this._prefix : '') +
				(this._text ? this._text : '') +
				(this._suffix ? this._suffix : '')).replaceAll('\n', '<br />');
		},


		'appendText' : function(str){
			if(str){
				return;
			}

			this.setText((this._text ? this._text : '') + str);
		},

		'prependText' : function(str){
			if(str){
				return;
			}

			this.setText(str + (this._text ? this._text : ''));
		},

		'redraw' : function(){
			if(this._super('OjLabel', 'redraw', arguments)){
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

		'setText' : function(val){
			if(this._text == val){
				return;
			}

			this._text = val ? val.toString() : null;

			this.redraw();
		}
	},
	{
		'_TAGS' : ['label']
	}
);