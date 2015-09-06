OJ.importJs('oj.components.OjComponent');
OJ.importJs('oj.fx.OjResize');

OJ.importCss('oj.components.OjFieldset');


// TODO: title property and title elm may be conflicting

OJ.extendComponent(
	'OjFieldset', [OjComponent],
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

		'_template' : 'oj.components.OjFieldset',


		'_constructor' : function(/*title*/){
			var args = arguments,
				ln = args.length;

			this._super(OjComponent, '_constructor', []);

			// remove the actuator
			this.actuator.addEventListener(OjUiEvent.PRESS, this, '_onActuatorClick');

			this.removeChild(this.actuator);

			// process arguments
			if(ln){
				this.title = args[0];
			}
		},


		'_processDomSourceChild' : function(dom_elm, component){
			var tag = dom_elm.tagName;

			if(tag && tag.toLowerCase() == 'legend'){
				var ln = dom_elm.childNodes.length, child;

				for(; ln--;){
					child = dom_elm.childNodes[ln];

					if(OjElement.isTextNode(child)){
						this.title = child.nodeValue;
					}
				}

				return null;
			}

			return this._processChild(dom_elm, component);
		},

		'_redrawActuator' : function(){
			if(this._is_displayed){
				if(this._collapsable){
					this.actuator.height = this.legend.height;

					if(this._isCollapsed){
						if(this._collapsedIcon || this._collapsedText){
							this.actuator.icon = this._collapsedIcon;
							this.actuator.text = this._collapsedText;

							this.insertChildAt(this.actuator, 1);
						}
						else{
							this.removeChild(this.actuator);
						}
					}
					else{
						if(this._expandedIcon || this._expandedText){
							this.actuator.icon = this._expandedIcon;
							this.actuator.text = this._expandedText;

							this.insertChildAt(this.actuator,  1);
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
					this.legend.appendChild(this.title = new OjLabel(this._title));
				}
				else if(this.title){
					this.title.text = this._title;
				}

				if(!this.icon && this._icon){
					this.legend.appendChild(this.icon = new OjImage(this._icon));
				}
				else if(this.icon){
					this.icon.source = this._icon;
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
			this.removeCss(['collapsed']);

			this.height = OjStyleElement.AUTO;

			OJ.destroy(evt);
		},


		'collapse' : function(){
			var tween;

			if(this._isCollapsed){
				return;
			}

			this.isCollapsed = true;

			tween = new OjResize(this, OjResize.HEIGHT, this.legend.height, 250, OjEasing.OUT);
			tween.start();

			this._redrawActuator();
		},

		'expand' : function(){
			var tween;

			if(!this._isCollapsed){
				return;
			}

			this.isCollapsed = false;

			tween = new OjResize(this, OjResize.HEIGHT, this.legend.height + this.container.height, 250, OjEasing.OUT);
			tween.addEventListener(OjTweenEvent.COMPLETE, this, '_onExpand');
			tween.start();

			this._redrawActuator();
		},

		'redraw' : function(){
			if(this._super(OjComponent, 'redraw', arguments)){
				this._redrawActuator();

				this._redrawLegend();

				return true;
			}

			return false;
		},


		'=collapsable' : function(val){
			if(this._collapsable == val){
				return;
			}

			this._collapsable = val;

			this._redrawActuator();
		},

		'=collapsedIcon' : function(val){
			if(this._collapsedIcon == val){
				return;
			}

			this._collapsedIcon = val;

			this._redrawActuator();
		},

		'=collapsedText' : function(val){
			if(this._collapsedText == val){
				return;
			}

			this._collapsedText = val;

			this._redrawActuator();
		},

		'=expandedIcon' : function(val){
			if(this._expandedIcon == val){
				return;
			}

			this._expandedIcon = val;

			this._redrawActuator();
		},

		'=expandedText' : function(val){
			if(this._expandedText == val){
				return;
			}

			this._expandedText = val;

			this._redrawActuator();
		},

		'=icon' : function(val){
			if(this._icon == val){
				return;
			}

			this._icon = val;

			this._redrawLegend();
		},

		'=isCollapsed' : function(val){
			if(this._isCollapsed == val){
				return;
			}

			if(this._isCollapsed = val){
				this.addCss('collapsed');

				this.dispatchEvent(new OjEvent(this._static.COLLAPSE));
			}
			else{
				this.removeCss('collapsed');

				this.dispatchEvent(new OjEvent(this._static.EXPAND));
			}
		},

		'=title' : function(val){
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