OJ.importJs('oj.components.View');
OJ.importJs('oj.components.Stack');
OJ.importJs('oj.events.DragEvent');
OJ.importJs('oj.modal.Alert');
OJ.importJs('oj.nav.FlowNavController');


'use strict';

OJ.compileClass(
	'OjModal',
	oj.modal.Modal = function(){
		return new oj.modal.Alert(
			arguments, 'OjModal',
			{
				'_show_bar' : false,  '_show_close' : false,  '_show_underlay' : false,


				'_constructor' : function(/*title, content*/){
					this._super('OjModal', '_constructor', []);

					// setup the display
					var classes = this.container.getClasses();

					var container = new OjStack();
					container.addClasses.apply(container, classes);

					this.container.parent().replaceChild(this.container, this.container = container);

					var controller = new OjFlowNavController(this.container);
					controller.setCancelLabel('Close');
					controller.addClasses.apply(controller, this.bar.getClasses());

					this.bar.parent().replaceChild(this.bar, this.bar = controller);

					// process arguments
					var ln = arguments.length;

					if(ln){
						if(ln > 1){
							this.setContent(arguments[1]);
						}

						this.setTitle(arguments[0]);
					}

					this.showBar(true);

					this.showClose(true);

					if(!this.buttons.numChildren()){
						this.buttons.hide();
					}
				},

				'_destructor' : function(){
					this._content = null;

					return this._super('OjModal', '_destructor', arguments);
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


				'setTitle' : function(title){
					this.bar.setTitle(this._title = title);
				},

				'setContent' : function(content){
					if(this._content == content){
						return;
					}

					if(content.is('OjForm')){
						content.addEventListener(OjEvent.CANCEL, this, '_onCancelClick');
						content.addEventListener(OjEvent.SUBMIT, this, '_onCancelClick');
					}

					if(this._content){
						this._content.removeEventListener(OjEvent.CANCEL, this, '_onCancelClick');
						this._content.removeEventListener(OjEvent.SUBMIT, this, '_onCancelClick');

						this.container.replaceElm(this._content, this._content = content);
					}
					else{
						this.container.addElm(this._content = content);
					}
				}
			}
		);
	}
);