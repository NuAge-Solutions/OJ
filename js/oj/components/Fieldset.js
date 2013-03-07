OJ.importJs('oj.components.Component');

OJ.importCss('oj.components.Fieldset');


'use strict';

OJ.compileComponent(
	'OjFieldset',
	oj.components.Fieldset = function(){
		return new oj.components.Component(
			arguments, 'OjFieldset',
			{
				'_properties_' : {
					'collapsable' : false,
					'collapsed'   : false,
					'icon'        : null,
					'title'       : null
				},

				'_template' : 'oj.components.Fieldset',


				'_constructor' : function(/*title*/){
					this._super('OjFieldset', '_constructor', []);

					// process arguments
					var ln = arguments.length;

					if(ln){
						this.setTitle(arguments[0]);
					}
				},


				'_processDomSourceChild' : function(dom_elm, component){
					var tag = dom_elm.tagName;

					if(tag && tag.toLowerCase() == 'legend'){
						var ln = dom_elm.childNodes.length, child;

						for(; ln--;){
							child = dom_elm.childNodes[ln];

							if(OjElement.isTextNode(child)){
								this.setTitle(child.nodeValue);
							}
							else{
//								this.setIcon();
							}
						}

						return null;
					}

					return this._processChild(dom_elm, component);
				},


				'_redrawLegend' : function(){
					if(this._is_displayed){
						if(!this.title && this._title){
							this.legend.addChild(this.title = new OjLabel(this._title));
						}
						else if(this.title){
							this.title.setText(this._title);
						}

						if(!this.icon && this._icon){
							this.legend.addChild(this.icon = new OjImage(this._icon));
						}
						else if(this.icon){
							this.icon.setSource(this._icon);
						}

						return true;
					}

					return false;
				},


				'redraw' : function(){
					if(this._super('OjFieldset', 'redraw', arguments)){
						this._redrawLegend();

						return true;
					}
					return false;
				},


				'setIcon' : function(val){
					if(this._icon == val){
						return;
					}

					this._icon = val;

					this._redrawLegend();
				},

				'setTitle' : function(val){
					if(this._title == val){
						return;
					}

					this._title = val;

					this._redrawLegend();
				}
			}
		);
	},
	{
		'SUPPORTED_TAGS' : ['fieldset']
	}
);