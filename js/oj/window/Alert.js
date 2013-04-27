OJ.importJs('oj.window.AlertEvent');
OJ.importJs('oj.window.Modal');
OJ.importJs('oj.components.Button');
OJ.importJs('oj.components.Label');

OJ.importCss('oj.window.Alert');


'use strict';

OJ.extendClass(
	OjComponent, 'OjAlert',
	{
		'_props_' : {
			'buttons'      : null,
			'content'      : null,
			'selfDestruct' : 0, // OjAlert.NONE
			'title'        : null
		},

		'_template' : 'oj.window.Alert',


		'_constructor' : function(/*title, content, buttons, cancel_label*/){
			this._super('OjAlert', '_constructor', []);

			// setup the display
			if(this.className() == 'OjAlert'){
				this.buttons.addChild(this.cancelBtn = new OjButton('Ok'));

				this.cancelBtn.addEventListener(OjMouseEvent.CLICK, this, '_onCancelClick');
			}

			// process the arguments
			var ln = arguments.length;

			if(ln){
				this.setTitle(arguments[0]);

				if(ln > 1){
					this.setContent(arguments[1]);

					if(ln > 2){
						this.setButtons(arguments[2]);

						if(ln > 3){
							this.cancelBtn.setLabel(arguments[3]);
						}
						else{
							this.cancelBtn.setLabel('Cancel');
						}
					}
				}
			}
		},

		'_destructor' : function(/*depth = 1*/){
			var args = arguments,
				depth = args.length ? args[0] : 0;

			if(!depth){
				// remove all the content so it doesn't get destroyed
				this.container.removeAllChildren();
			}

			return this._super('OjAlert', '_destructor', arguments);
		},


		'_onButtonClick' : function(evt){
			this.dispatchEvent(
				new OjAlertEvent(
					OjAlertEvent.BUTTON_CLICK,
					this.buttons.indexOfChild(evt.getCurrentTarget())
				)
			);

			WindowManager.hide(this);
		},

		'_onCancelClick' : function(evt){
			this.cancel();
		},


		'cancel' : function(){
			this.dispatchEvent(new OjEvent(OjEvent.CANCEL));

			WindowManager.hide(this);
		},

		'hideButtons' : function(){
			this.addClasses('no-buttons');

			this.buttons.hide();
		},

		'showButtons' : function(){
			this.removeClasses('no-buttons');

			this.buttons.show();
		},


		'getButtons' : function(){
			return this._buttons.clone();
		},
		'setButtons' : function(buttons){
			this._buttons = buttons ? buttons.clone() : [];

			var num_btns = this._buttons.length;
			var ln = this.buttons.numChildren() - 1;
			var diff = num_btns - ln, btn;

			if(diff > 0){
				while(diff > 0){
					this.buttons.addChildAt(btn = new OjButton(this._buttons[num_btns - (diff--)]), ln + 1);

					btn.addEventListener(OjMouseEvent.CLICK, this, '_onButtonClick');
				}
			}
			else if(diff < 0){
				while(diff++ < 0){
					OJ.destroy(this.buttons.getChildAt(--ln - 1));
				}
			}

			while(ln-- > 1){
				btn = this.buttons.getChildAt(ln);

				btn.setLabel(this._buttons[ln]);
			}
		},

		'getCancelLabel' : function(){
			return this.cancelBtn.getLabel();
		},
		'setCancelLabel' : function(label){
			return this.cancelBtn.setLabel(label);
		},

		'setContent' : function(content){
			if(this._content == content){
				return;
			}

			this.container.removeAllChildren();

			this._content = content;

			if(isString(content)){
				this.container.setText(content.replaceAll('\n', '<br />'));
			}
			else{
				this.container.addChild(content);
			}
		},

		'setTitle' : function(title){
			if(this._title == title){
				return;
			}

			this.bar.setText(this._title = title);
		},

		'getPaneHeight' : function(){
			return this.pane.getHeight();
		},
		'setPaneHeight' : function(val/*, unit*/){
			this.pane.setHeight.apply(this.pane, arguments);
		},

		'getPaneWidth' : function(){
			return this.pane.getWidth();
		},
		'setPaneWidth' : function(val/*, unit*/){
			this.pane.setWidth.apply(this.pane, arguments);
		}
	},
	{
		'NONE' : 0,
		'SHALLOW' : 1,
		'DEEP' : 2
	}
);