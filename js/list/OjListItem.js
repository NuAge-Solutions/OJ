OJ.importJs('oj.components.OjItemRenderer');
OJ.importJs('oj.media.OjImage');


'use strict';

OJ.extendComponent(
	OjItemRenderer, 'OjListItem',
	{
		'_props_' : {
			'showAccessory' : false,
			'showIcon'      : false
		},

		'accessory' : null,  'content' : null,  'icon' : null,


		'_constructor' : function(/*data*/){
			this._super('OjListItem', '_constructor', []);

			this.addChild(this.accessory = new OjStyleElement('<div class="-accessory valign-middle"></div>'));
			this.addChild(this.icon = new OjImage());
			this.addChild(this.content = new OjStyleElement('<div class="-content valign-middle"></div>'));

			this.icon.addClasses('-icon');

			if(arguments.length){
				this.setData(arguments[0]);
			}
		},

		'_destructor' : function(/*depth = 0*/){
			if(this._data && this._data.is && this._data.is('OjActionable')){
				this._data.removeEventListener(OjEvent.CHANGE, this, '_onDataChange');
			}

			this._list = this._data = null;

			return this._super('OjListItem', '_destructor', arguments);
		},


		'_redrawAccessory' : function(){
			if(this._showAccessory){
				this.removeClasses('no-accessory');
			}
			else{
				this.addClasses('no-accessory');
			}
		},

		'_redrawData' : function(){
			this.content.setText(this._data);
		},

		'_redrawIcon' : function(){
			if(this._showIcon){
				this.removeClasses('no-icon');
			}
			else{
				this.addClasses('no-icon');
			}
		},


		'redraw' : function(){
			if(this._super('OjListItem', 'redraw', arguments)){
				this._redrawData();

				this._redrawAccessory();

				this._redrawIcon();

				return true;
			}

			return false;
		},


		'_onDataChange' : function(evt){
			this._redrawData();
		},


		'setData' : function(data){
			if(this._data && this._data.is && this._data.is('OjActionable')){
				this._data.removeEventListener(OjEvent.CHANGE, this, '_onDataChange');
			}

			this._data = data;

			if(this._data && this._data.is && this._data.is('OjActionable')){
				this._data.addEventListener(OjEvent.CHANGE, this, '_onDataChange');
			}

			this.redraw();
		},

		'setShowAccessory' : function(val){
			if(this._showAccessory == val){
				return;
			}

			this._showAccessory = val;

			this.redraw();
		},

		'setShowIcon' : function(val){
			if(this._showIcon == val){
				return;
			}

			this._showIcon = val;

			this.redraw();
		}
	},
	{
		'_TAGS' : ['listitem']
	}
);