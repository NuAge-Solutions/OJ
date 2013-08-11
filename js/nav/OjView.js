OJ.importJs('oj.components.OjComponent');
OJ.importJs('oj.components.OjOverlay');

OJ.importCss('oj.nav.OjView');


'use strict';

OJ.extendComponent(
	'OjView', [OjComponent],
	{
		'_props_' : {
			'controller'  : null,
			'footer'      : null,
			'header'      : null,
			'icon'        : null,
			'shortTitle'  : null,
			'stack'       : null,
			'title'       : null
		},

		'_get_props_' : {
			'actionView' : null,
			'cancelView' : null,
			'titleView'  : null
		},

//		'_elm_funcs' : null,  '_load_checkpoints' : null,  '_loading_icon' : null,
//
//		'_overlay' : null,  '_unload_checkpoints' : null,  '_unloading_icon' : null,

		'_loading_msg' : 'Loading',  '_template' : 'oj.nav.OjView',  '_loaded' : false,

		'_unloading_msg' : 'UnLoading',


		'_constructor' : function(/*content, title, short_title*/){
			this._super(OjComponent, '_constructor', []);

			// setup vars
			this._load_checkpoints = {};
			this._unload_checkpoints = {};

			// process arguments
			var args = arguments,
				ln = args.length,
				short_title = this._static.SHORT_TITLE,
				title = this._static.TITLE;

			if(ln){
				this.setContent(args[0]);

				if(ln > 1){
					title = args[1];

					if(ln > 2){
						short_title = args[2];
					}
				}
			}

			this.setTitle(title);

			if(short_title){
				this.setShortTitle(short_title);
			}
		},

		'_destructor' : function(){
			this.unload();

			this._unset('_actionView');
			this._unset('_cancelView');
			this._unset('_titleView');
			this._unset('_overlay');

			return this._super(OjComponent, '_destructor', arguments);
		},


		'_checkpointsCompleted' : function(checkpoints){
			var key;

			for(key in checkpoints){
				if(!checkpoints[key]){
					return false;
				}
			}

			return true;
		},

		'_hideOverlay' : function(){
			var overlay = this._overlay;

			if(overlay){
				overlay.addEventListener(OjEvent.HIDE, this, '_onOverlayHide');
				overlay.hide();
			}
		},

		'_load' : function(){
			this._loaded = true;

			this.removeCss(['loading']);

			this.redraw();

			this._hideOverlay();

			this.dispatchEvent(new OjEvent(OjView.LOAD));
		},

		'_loadCheckpoint' : function(/*checkpoint*/){
			var args = arguments;

			if(args.length){
				this._load_checkpoints[args[0]] = true;
			}

			if(this._checkpointsCompleted(this._load_checkpoints)){
				this._load();
			}
			else{
				this._showOverlay(this._loading_msg, this._loading_icon);
			}
		},

		'_resetCheckpoints' : function(checkpoints){
			var key;

			for(key in checkpoints){
				checkpoints[key] = false;
			}
		},

		'_showOverlay' : function(/*msg, icon*/){
			var args = arguments,
				ln = args.length,
				msg = ln ? args[0] : null,
				icon = ln > 1 ? args[1] : null,
				overlay = this._overlay;

			if(overlay){
				overlay.setMessage(msg);
				overlay.setIcon(icon);
			}
			else{
				overlay = this._overlay = new OjOverlay(msg, icon);
			}

			overlay.show(this);
		},

		'_unload' : function(){
			this._loaded = true;

			this._hideOverlay();

			// dispatch the event
			this.dispatchEvent(new OjEvent(OjView.UNLOAD));
		},

		'_unloadCheckpoint' : function(/*checkpoint*/){
			var args = arguments;

			if(args.length){
				this._unload_checkpoints[args[0]] = true;
			}

			if(this._checkpointsCompleted(this._unload_checkpoints)){
				this._unload();
			}
			else{
				this._showOverlay(this._unloading_msg, this._unloading_icon);
			}
		},


		'_onOverlayHide' : function(evt){
			this._unset('_overlay');
		},


		'load' : function(){
			this.addCss(['loading']);

			this._resetCheckpoints(this._load_checkpoints);

			this._loadCheckpoint();
		},

		'unload' : function(){
			this._resetCheckpoints(this._unload_checkpoints);

			this._unloadCheckpoint();
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

				for(; ln--;){
					this.addElmAt(content[ln], 0);
				}
			}
		},

		'setFooter' : function(val){
			if(this._footer = val){
				this.removeCss(['no-footer']);

				if(!this.footer){
					this.footer = new OjStyleElement();
					this.footer.addCss('footer');

					this.container.parent().addChildAt(this.footer, 0);
				}

				this.footer.removeAllChildren();

				this.footer.addChild(val);
			}
			else{
				this._unset('footer');

				this.addCss(['no-footer']);
			}
		},

		'setHeader' : function(val){
			if(this._header = val){
				this.removeCss(['no-header']);

				if(!this.header){
					this.header = new OjStyleElement();
					this.header.addCss(['header']);

					this.container.parent().addChildAt(this.header, 0);
				}

				this.header.removeAllChildren();

				this.header.addChild(val);
			}
			else{
				this._unset('header');

				this.addCss(['no-header']);
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

		'LOAD'   : 'onViewLoad',
		'UNLOAD' : 'onViewUnload',

		'_TAGS' : ['view']
	}
);