OJ.importJs('oj.renderers.OjItemRenderer');
OJ.importJs('oj.media.OjImage');


'use strict';

OJ.extendComponent(
	'OjListItem', [OjItemRenderer],
	{
		'_props_' : {
			'showAccessory' : false,
			'showIcon'      : false
		},

		'accessory' : null,  'content' : null,  'icon' : null,


		'_constructor' : function(/*group, data*/){
			this._super(OjItemRenderer, '_constructor', arguments);

      this.addChild(this.accessory = new OjStyleElement('<div class="accessory" valign="m"></div>'));
			this.addChild(this.icon = new OjImage());
			this.addChild(this.content = new OjStyleElement('<div class="content" valign="m"></div>'));

			this.icon.addCss('-icon');
		},

		'_destructor' : function(/*depth = 0*/){
			if(this._data && this._data.is && this._data.is('OjActionable')){
				this._data.removeEventListener(OjEvent.CHANGE, this, '_onDataChange');
			}

			this._list = this._data = null;

			return this._super(OjItemRenderer, '_destructor', arguments);
		},


		'_redrawAccessory' : function(){
			if(this._showAccessory){
				this.removeCss(['no-accessory']);
			}
			else{
				this.addCss(['no-accessory']);
			}
		},

		'_redrawData' : function(){
			this.content.setText(this._data);
		},

		'_redrawIcon' : function(){
			if(this._showIcon){
				this.removeCss(['no-icon']);
			}
			else{
				this.addCss(['no-icon']);
			}
		},


		'redraw' : function(){
			if(this._super(OjItemRenderer, 'redraw', arguments)){
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