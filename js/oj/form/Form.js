OJ.importJs('oj.components.View');
OJ.importJs('oj.form.FormError');
OJ.importJs('oj.list.List');

OJ.importCss('oj.form.Form');


'use strict';

OJ.compileComponent(
	'OjForm',
	oj.form.Form = function(){
		return new oj.components.View(
			arguments, 'OjForm',
			{
				'__supportedTags' : function(){
					return ['form'];
				},


				'_template' : 'oj.form.Form',

				'header' : null,  'footer' : null,  'title' : null,  '_data' : null,  '_inputs' : null,  '_errors' : null,


				'_compile_' : function(){
					this.getLabel = this.getTitle;
					this.setLabel = this.setTitle;
				},


				'_constructor' : function(){
					this._data = {};

					this._inputs = {};

					this._errors = [];

					this._super('OjForm', '_constructor', arguments);

					this.errors.hide();

					this._processActions();
				},


				'_processActions' : function(){
					if(this.actions){
						var item, ln = this.actions.numChildren();

						while(ln-- > 0){
							item = this.actions.getChildAt(ln);

							if(item.is('OjButton')){
								item.addEventListener(OjMouseEvent.CLICK, this, '_onActionButtonClick');
							}
						}
					}
				},


				'_onActionButtonClick' : function(evt){
					var button = evt.getCurrentTarget();

					if(button.hasClasses('submit-button')){
						this._onSubmit(evt);
					}
					else if(button.hasClasses('cancel-button')){
						this._onCancel(evt);
					}
				},

				'_onSubmit' : function(evt){
					this.submit();
				},

				'_onCancel' : function(evt){
					this.dispatchEvent(new OjEvent(OjEvent.CANCEL));
				},


				'_updateInputs' : function(){
					// todo: remove dependency on sizzle find command
					var parent, inputs = this.find('.OjInput'), ln = inputs.length;

					this._inputs = {};

					while(ln-- > 0){
						parent = OjForm.parentForm(inputs[ln]);

						if(parent && parent == this){
							this._inputs[inputs[ln].id] = OJ.elm(inputs[ln]);
						}
					}
				},

				'_redraw' : function(){

				},

				'_reset' : function(){
					this._updateInputs();

					var key, input;

					for(key in this._inputs){
						input = this._inputs[key];

						input.setValue(this._data[input.getName()]);
					}
				},

				'_submit' : function(){

				},

				'_validate' : function(){
					this._updateInputs();

					var key, input, valid = true;

					for(key in this._inputs){
						input = this._inputs[key];

						if(!input.validate()){
							this._errors.push(
								{
									'input'     : input,
									'errors'    : input.getErrors()
								}
							);

							valid = false;
						}
					}

					return valid;
				},


				'redraw' : function(){
					if(this._super('OjForm', 'redraw', arguments)){
						this._redraw();

						return true;
					}

					return false;
				},

				'reset' : function(){
					this._reset();
				},

				'submit' : function(){
					// do some validation

					// then send some data
					this._submit();

					// then let the world know what you did
					this.dispatchEvent(new OjEvent(OjEvent.SUBMIT));
				},

				'validate' : function(){
					this._errors = [];

					var valid = this._validate();

					this.errors.getDataProvider().setSource(this._errors);

					if(valid){
						this.errors.hide();
					}
					else{
						this.errors.show();
					}

					return valid;
				},


				'_addElm' : function(elm, index){
					if(elm.is('OjInput')){
						this._inputs[elm.id()] = elm;
					}

					this._super('OjForm', '_addElm', arguments);
				},

				'_removeElm' : function(elm){
					delete this._inputs[elm.id()];

					this._super('OjForm', '_removeElm', arguments)
				},


				'getData' : function(){
					return this._data;
				},
				'setData' : function(data){
					this._data = data; this._reset();
				},

				'setError' : function(error){
					this.errors.getDataProvider().addItem(
						{
							'input'     : null,
							'errors'    : [error]
						}
					);

					this.errors.show();
				}
			}
		);
	},
	{
		'COMPLETE' : 'formComplete',

		'parentForm' : function(elm, top){
			elm = OJ.elm(elm);

			var parent, top = arguments.length > 1 ? arguments[0] : OJ;

			top = OJ.elm(top);

			while(elm && elm != top){
				parent = elm.parent();

				if(parent && parent.is('OjForm')){
					return parent;
				}

				elm = parent;
			}

			elm = top = parent = null;

			return null;
		}
	}
);