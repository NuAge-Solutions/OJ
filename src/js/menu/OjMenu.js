OJ.importJs('oj.components.OjComponent');

OJ.importCss('oj.menu.OjMenu');




OJ.extendClass(
    'OjMenu', [OjComponent],
    {
        '_props_' : {
            'content' : null,
            'horzOffset' : null,
            'positioning' : null,
            'parentMenu' : null,
            'vertOffset' : 0
        },


        '_constructor' : function(/*content, positioning, parent_menu*/){
            this._super(OjComponent, '_constructor', []);

            this._processArguments(arguments, {
                'content' : null,
                'positioning' : [
                    OjMenu.RIGHT_MIDDLE, OjMenu.RIGHT_TOP, OjMenu.RIGHT_BOTTOM,
                    OjMenu.LEFT_MIDDLE, OjMenu.LEFT_TOP, OjMenu.LEFT_BOTTOM,
                    OjMenu.BOTTOM_LEFT, OjMenu.BOTTOM_CENTER, OjMenu.BOTTOM_RIGHT,
                    OjMenu.TOP_LEFT, OjMenu.TOP_CENTER, OjMenu.TOP_RIGHT
                ],
                'parentMenu' : null
            });
        },

        '_destructor' : function(){
            this._content = null;

            return this._super(OjComponent, '_destructor', arguments);
        },


        'hasSubMenu' : function(menu){
            while(menu){
                if((menu = menu.parentMenu) == this){
                    return true;
                }
            }

            return false;
        },

        '=content' : function(content){
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
                this.appendChild(this._content = content);
            }
        }
    },
    {
        'TOP_LEFT' : 'positionTopLeft',
        'TOP_CENTER' : 'positionTopCenter',
        'TOP_RIGHT' : 'positionTopRight',

        'BOTTOM_LEFT' : 'positionBottomLeft',
        'BOTTOM_CENTER' : 'positionBottomCenter',
        'BOTTOM_RIGHT' : 'positionBottomRight',

        'LEFT_TOP' : 'positionLeftTop',
        'LEFT_MIDDLE' : 'positionLeftMiddle',
        'LEFT_BOTTOM' : 'positionLeftBottom',

        'RIGHT_TOP' : 'positionRightTop',
        'RIGHT_MIDDLE' : 'positionRightMiddle',
        'RIGHT_BOTTOM' : 'positionRightBottom'
    }
);