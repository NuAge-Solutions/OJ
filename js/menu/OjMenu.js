OJ.importJs('oj.components.OjComponent');

OJ.importCss('oj.menu.OjMenu');


'use strict';

OJ.extendClass(
	OjComponent, 'OjMenu',
	{
		'_props_' : {
			'content'     : null,
			'horzOffset'  : null,
			'positioning' : null,
			'parentMenu'  : null,
			'vertOffset'  : 0
		},


		'_constructor' : function(/*content, positioning, parent_menu*/){
			this._super('OjMenu', '_constructor', []);

			// process arguments
			var ln = arguments.length;

			if(ln){
				this.setContent(arguments[0]);

				if(ln > 1){
					this.setPositioning(arguments[1]);

					if(ln > 2){
						this.setParentMenu(arguments[2]);
					}
				}
			}

			if(!this._positioning){
				this.setPositioning([
					OjMenu.RIGHT_MIDDLE, OjMenu.RIGHT_TOP, OjMenu.RIGHT_BOTTOM,
					OjMenu.LEFT_MIDDLE, OjMenu.LEFT_TOP, OjMenu.LEFT_BOTTOM,
					OjMenu.BOTTOM_LEFT, OjMenu.BOTTOM_CENTER, OjMenu.BOTTOM_RIGHT,
					OjMenu.TOP_LEFT, OjMenu.TOP_CENTER, OjMenu.TOP_RIGHT
				]);
			}
		},

		'_destructor' : function(){
			this._content = null;

			return this._super('OjMenu', '_destructor', arguments);
		},


		'hasSubMenu' : function(menu){
			while(menu){
				if(menu.getParentMenu() == this){
					return;
				}

				menu = menu.getParentMenu();
			}

			return false;
		},

		'setContent' : function(content){
			if(this._content == content){
				return;
			}

//				if(content.is('OjForm')){
//					content.addEventListener(OjEvent.CANCEL, this, '_onClose');
//					content.addEventListener(OjEvent.SUBMIT, this, '_onClose');
//				}

			if(this._content){
//					this._content.removeEventListener(OjEvent.CANCEL, this, '_onClose');
//					this._content.removeEventListener(OjEvent.SUBMIT, this, '_onClose');

				this.replaceChild(this._content, this._content = content);
			}
			else{
				this.addChild(this._content = content);
			}
		}
	},
	{
		'TOP_LEFT'   : 'positionTopLeft',
		'TOP_CENTER' : 'positionTopCenter',
		'TOP_RIGHT'  : 'positionTopRight',

		'BOTTOM_LEFT'   : 'positionBottomLeft',
		'BOTTOM_CENTER' : 'positionBottomCenter',
		'BOTTOM_RIGHT'  : 'positionBottomRight',

		'LEFT_TOP'    : 'positionLeftTop',
		'LEFT_MIDDLE' : 'positionLeftMiddle',
		'LEFT_BOTTOM' : 'positionLeftBottom',

		'RIGHT_TOP'    : 'positionRightTop',
		'RIGHT_MIDDLE' : 'positionRightMiddle',
		'RIGHT_BOTTOM' : 'positionRightBottom'
	}
);