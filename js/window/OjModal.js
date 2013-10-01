OJ.importJs('oj.events.OjDragEvent');
OJ.importJs('oj.nav.OjFlowNavController');
OJ.importJs('oj.nav.OjNavStack');
OJ.importJs('oj.views.OjView');
OJ.importJs('oj.window.OjAlert');


'use strict';

OJ.extendClass(
	'OjModal', [OjAlert, OjINavController],
	{
    '_show_bar' : true,  '_show_close' : true,  '_show_underlay' : true,  '_show_buttons' : false,

    '_stack' : null, '_template' : 'oj.window.OjModal',


    '_constructor' : function(/*view, title*/){
      var args = arguments,
        ln = args.length;

      this._super(OjAlert, '_constructor', []);

      // setup controller stack relationship
      this.stack = this.container;

      this.bar.setStack(this.stack);
      this.setStack(this.stack);


      // default the show settings
      this.showBar(this._show_bar);

      this.showClose(this._show_close);

      this.showUnderlay(this._show_underlay);

      this.showButtons(this._show_buttons);

      // process arguments
      if(ln){
        this.addView(args[0]);

        if(ln > 1){
          this.setTitle(args[1]);
        }
      }

      if(OJ.isMobile()){
        this.bar.setCancelLabel('&#10006');
      }
    },

    '_destructor' : function(/*depth = 0*/){
      var args = arguments,
        depth = args.length ? args[0] : 0;

      this._unset('bar', depth);
      this._unset('stack', depth);

      this._stack = null;

      return this._super(OjAlert, '_destructor', arguments);
    },


    '_onDrag' : function(evt){
      this.pane.setX(this.pane.getX() + evt.getDeltaX());
      this.pane.setY(this.pane.getY() + evt.getDeltaY());
    },

    '_onStackChange' : function(evt){
      // todo: OjModal - rethink how to autosize the modal to content
//				if(!this.getPaneWidth()){
//					trace(evt.getView().getWidth());
//					this.setPaneWidth(evt.getView().getWidth());
//				}
//
//				if(!this.getPaneHeight()){
//					this.setPaneWidth(evt.getView().getWidth());
//				}
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
          this.removeCss(['no-buttons']);
        }
        else{
          this.addCss(['no-buttons']);
        }
      }

      return this._show_buttons;
    },

    'showClose' : function(){
      var args = arguments;

      if(args.length){
        this.bar.showCancel(args[0]);

        if(args[0]){
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
      this._super(OjAlert, 'setButtons', arguments);

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
  }
);