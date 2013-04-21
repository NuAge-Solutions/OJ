OJ.importJs('oj.nav.View');
OJ.importJs('oj.nav.Stack');
OJ.importJs('oj.events.DragEvent');
OJ.importJs('oj.window.Alert');
OJ.importJs('oj.nav.FlowNavController');


'use strict';

OJ.extendClass(
	OjAlert, 'OjModal',
	OJ.implementInterface(
		OjINavController,
		{
			'_show_bar' : true,  '_show_close' : true,  '_show_underlay' : true,  '_show_buttons' : false,

			'_stack' : null, '_template' : 'oj.window.Modal',


			'_constructor' : function(/*title, view*/){
				this._s('OjModal', '_constructor', []);

				// setup controller stack relationship
				this.bar.setStack(this.stack);
				this.setStack(this.stack);


				// default the show settings
				this.showBar(this._show_bar);

				this.showClose(this._show_close);

				this.showUnderlay(this._show_underlay);

				this.showButtons(this._show_buttons);

				// process arguments
				var ln = arguments.length;

				if(ln){
					if(ln > 1){
						this.addView(arguments[1]);
					}

					this.setTitle(arguments[0]);
				}
			},

			'_destructor' : function(){
				return this._s('OjModal', '_destructor', arguments);
			},


			'_onDrag' : function(evt){
				this.pane.setX(this.pane.getX() + evt.getDeltaX());
				this.pane.setY(this.pane.getY() + evt.getDeltaY());
			},


			'showBar' : function(){
				if(arguments.length){
					if(this._show_bar = arguments[0]){
						this.bar.show();

//						this.bar.addEventListener(OjDragEvent.DRAG, this, '_onDrag');
					}
					else{
						this.bar.hide();

//						this.bar.removeEventListener(OjDragEvent.DRAG, this, '_onDrag');
					}
				}

				return this._show_bar;
			},

			'showButtons' : function(){
				var args = arguments;

				if(args.length){
					if(this._show_buttons = args[0]){
						this.removeClasses('no-buttons');
					}
					else{
						this.addClasses('no-buttons');
					}
				}

				return this._show_buttons;
			},

			'showClose' : function(){
				if(arguments.length){
					this.bar.showCancel(arguments[0]);

					if(arguments[0]){
						this.bar.addEventListener(OjEvent.CANCEL, this, '_onCancelClick');
					}
					else{
						this.bar.removeEventListener(OjEvent.CANCEL, this, '_onCancelClick');
					}
				}

				return this.bar.showCancel();
			},

			'showUnderlay' : function(){
				if(arguments.length){
					if(this._show_underlay = arguments[0]){
						this.underlay.show();
					}
					else{
						this.underlay.hide();
					}
				}

				return this._show_underlay;
			},


			'setButtons' : function(val){
				this._s('OjModal', 'setButtons', arguments);

				if(this.buttons.numChildren()){
					this.buttons.show();
				}
				else{
					this.buttons.hide();
				}
			},

			'setTitle' : function(title){
				this.bar.setTitle(this._title = title);
			}
//			,
//
//			'setContent' : function(content){
//				if(this._content == content){
//					return;
//				}
//
//				if(content.is('OjForm')){
//					content.addEventListener(OjEvent.CANCEL, this, '_onCancelClick');
//					content.addEventListener(OjEvent.SUBMIT, this, '_onCancelClick');
//				}
//
//				if(this._content){
//					this._content.removeEventListener(OjEvent.CANCEL, this, '_onCancelClick');
//					this._content.removeEventListener(OjEvent.SUBMIT, this, '_onCancelClick');
//
//					this.container.replaceElm(this._content, this._content = content);
//				}
//				else{
//					this.container.addElm(this._content = content);
//				}
//			}
		}
	)
);