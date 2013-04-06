OJ.importJs('oj.components.Component');

OJ.importCss('oj.nav.View');


'use strict';

OJ.extendComponent(
	OjComponent, 'OjView',
	{
		'_props_' : {
			'controller'  : null,
			'footer'      : null,
			'header'      : null,
			'shortTitle'  : null,
			'stack'       : null,
			'title'       : null
		},

		'_get_props_' : {
			'actionView' : null,
			'cancelView' : null,
			'titleView'  : null
		},

		'_elm_funcs' : null,  '_template' : 'oj.nav.View',


		'_constructor' : function(/*content, title, short_title*/){
			var ln = arguments.length,
				short_title = this._static('SHORT_TITLE'),
				title = this._static('TITLE');

			this._s('OjView', '_constructor', []);

			if(ln){
				this.setContent(arguments[0]);

				if(ln > 1){
					title = arguments[1];

					if(ln > 2){
						short_title = arguments[2];
					}
				}
			}

			this.setTitle(title);

			if(short_title){
				this.setShortTitle(short_title);
			}
		},

		'_destructor' : function(){
			this._actionView = OJ.destroy(this._actionView);
			this._cancelView = OJ.destroy(this._cancelView);

			return this._s('OjView', '_destructor', arguments);
		},


		// getter & Setter functions
		'getContent' : function(){
			return this.getElms();
		},
		'setContent' : function(content){
			this.removeAllElms();

			if(content){
				content = Array.array(content);

				var ln = content.length;

				for(;ln--;){
					this.addElmAt(content[ln], 0);
				}
			}
		},

		'setFooter' : function(val){
			if(this._footer = val){
				this.removeClasses('no-footer');

				if(!this.footer){
					this.footer = new OjStyleElement();
					this.footer.addClasses('footer');

					this.addChildAt(this.footer, 0);
				}

				this.footer.removeAllChildren();

				this.footer.addChild(val);
			}
			else{
				this._unset('footer');

				this.addClasses('no-footer');
			}
		},

		'setHeader' : function(val){
			if(this._header = val){
				this.removeClasses('no-header');

				if(!this.header){
					this.header = new OjStyleElement();
					this.header.addClasses('header');

					this.addChildAt(this.header, 0);
				}

				this.header.removeAllChildren();

				this.header.addChild(val);
			}
			else{
				this._unset('header');

				this.addClasses('no-header');
			}
		},

		'setTitle' : function(title){
			this._title = title;

			if(!this._shortTitle){
				this._shortTitle = title;
			}
		}
	},
	{
		'SHORT_TITLE' : null,
		'TITLE'       : null,

		'HORIZONTAL' : 'horizontal',
		'VERTICAL'   : 'vertical',
		'TOP'        : 'top',
		'BOTTOM'     : 'bottom',
		'LEFT'       : 'left',
		'RIGHT'      : 'right',

		'_TAGS' : ['view']
	}
);