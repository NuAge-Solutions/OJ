OJ.importJs('oj.components.Component');
OJ.importJs('oj.fx.Resize');

OJ.importCss('oj.components.Fieldset');


'use strict';

OJ.extendComponent(
	OjComponent, 'OjFieldset',
	{
		'_props_' : {
			'collapsedIcon' : null,
			'collapsedText' : 'show',
			'collapsable'   : false,
			'expandedIcon'  : null,
			'expandedText'  : 'hide',
			'isCollapsed'   : false,
			'icon'          : null,
			'title'         : null
		},

		'_template' : 'oj.components.Fieldset',


		'_constructor' : function(/*title*/){
			this._super('OjFieldset', '_constructor', []);

			// remove the actuator
			this.actuator.addEventListener(OjMouseEvent.CLICK, this, '_onActuatorClick');

			this.removeChild(this.actuator);

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
				}

				return null;
			}

			return this._processChild(dom_elm, component);
		},

		'_redrawActuator' : function(){
			if(this._is_displayed){
				if(this._collapsable){
					this.actuator.setHeight(this.legend.getHeight());

					if(this._isCollapsed){
						if(this._collapsedIcon || this._collapsedText){
							this.actuator.setIcon(this._collapsedIcon);
							this.actuator.setText(this._collapsedText);

							this.addChildAt(this.actuator,  1);
						}
						else{
							this.removeChild(this.actuator);
						}
					}
					else{
						if(this._expandedIcon || this._expandedText){
							this.actuator.setIcon(this._expandedIcon);
							this.actuator.setText(this._expandedText);

							this.addChildAt(this.actuator,  1);
						}
						else{
							this.removeChild(this.actuator);
						}
					}
				}
				else{
					this.removeChild(this.actuator);
				}

				return true;
			}

			return false;
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


		'_onActuatorClick' : function(evt){
			if(this._isCollapsed){
				this.expand();
			}
			else{
				this.collapse();
			}
		},

		'_onExpand' : function(evt){
			this.removeClasses('collapsed');

			this.setHeight(OjStyleElement.AUTO);

			OJ.destroy(evt.getTarget());
		},


		'collapse' : function(){
			if(this._isCollapsed){
				return;
			}

			this.setIsCollapsed(true);

			var tween = new OjResize(this, OjResize.HEIGHT, this.legend.getHeight(), 250, OjEasing.OUT);
			tween.start();

			this._redrawActuator();
		},

		'expand' : function(){
			if(!this._isCollapsed){
				return;
			}

			this.setIsCollapsed(false);

			var tween = new OjResize(this, OjResize.HEIGHT, this.legend.getHeight() + this.container.getHeight(), 250, OjEasing.OUT);
			tween.addEventListener(OjTweenEvent.COMPLETE, this, '_onExpand');
			tween.start();

			this._redrawActuator();
		},

		'redraw' : function(){
			if(this._super('OjFieldset', 'redraw', arguments)){
				this._redrawActuator();

				this._redrawLegend();

				return true;
			}
			return false;
		},


		'setCollapsable' : function(val){
			if(this._collapsable == val){
				return;
			}

			this._collapsable = val;

			this._redrawActuator();
		},

		'setCollapsedIcon' : function(val){
			if(this._collapsedIcon == val){
				return;
			}

			this._collapsedIcon = val;

			this._redrawActuator();
		},

		'setCollapsedText' : function(val){
			if(this._collapsedText == val){
				return;
			}

			this._collapsedText = val;

			this._redrawActuator();
		},

		'setExpandedIcon' : function(val){
			if(this._expandedIcon == val){
				return;
			}

			this._expandedIcon = val;

			this._redrawActuator();
		},

		'setExpandedText' : function(val){
			if(this._expandedText == val){
				return;
			}

			this._expandedText = val;

			this._redrawActuator();
		},

		'setIcon' : function(val){
			if(this._icon == val){
				return;
			}

			this._icon = val;

			this._redrawLegend();
		},

		'setIsCollapsed' : function(val){
			if(this._isCollapsed == val){
				return;
			}

			if(this._isCollapsed = val){
				this.addClasses('collapsed');

				this.dispatchEvent(new OjEvent(this._static.COLLAPSE));
			}
			else{
				this.removeClasses('collapsed');

				this.dispatchEvent(new OjEvent(this._static.EXPAND));
			}
		},

		'setTitle' : function(val){
			if(this._title == val){
				return;
			}

			this._title = val;

			this._redrawLegend();
		}
	},
	{
		'_TAGS' : ['fieldset'],

		'COLLAPSE' : 'onCollapse',
		'EXPAND'   : 'onExpand'
	}
);