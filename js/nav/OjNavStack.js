OJ.importJs('oj.components.OjStack');


'use strict';

OJ.extendComponent(
	'OjNavStack', [OjStack],
	{
		'_props_' : {
			'controller' : null
		},


		'_destructor' : function(){
			// make sure to remove stack and controller references
			if(this._active){

			}

			if(this._prev_active){
				this._unload(this._prev_active);
			}

			// continue on
			this._super(OjStack, '_destructor', arguments);
		},


		'_addActiveElm' : function(elm){
			elm.setController(this._controller);
			elm.setStack(this);
			elm.load();

			this._super(OjStack, '_addActiveElm', arguments);
		},

		'_removeActiveElm' : function(elm){
			elm.unload();
			elm.setController(null);
			elm.setStack(null);

			this._super(OjStack, '_removeActiveElm', arguments)
		},


		'_onItemRemove' : function(evt){
			var item = evt.getItem(),
				index = evt.getIndex();

//				this._updateItemParent(index, null);

			this.dispatchEvent(new OjStackEvent(OjStackEvent.REMOVE, item, this._transition, index));

			if(this._active == item){
				var ln;

				if(this._current_index){
					this.setActiveIndex(this._current_index - 1);
				}
				else if(ln = this.numElms()){
					this.setActiveIndex(ln - 1);
				}
				else{
					this._unload(this._active);

					this._active = null;
					this._current_index = -1;
				}
			}
			else{
				if(this._prev_active == item){
					this._prev_active = null;
				}

				this._current_index = this.indexOfElm(this._active);
			}
		},

		'_onItemReplace' : function(evt){
			var item = evt.getItem(),
				index = evt.getIndex();

//				this._updateItemParent(item);
//				this._updateItemParent(evt.getOldItem(), null);

			this.dispatchEvent(new OjStackEvent(OjStackEvent.REPLACE, item, this._transition, index));

			if(this._activeIndex == index){
				// remove the old active
				this._removeActive();

				// add the new active
				this._addActive(this._active = item);
			}
		},


		'setController' : function(val){
			if(this._controller == val){
				return;
			}

			this._controller = val;

			// update the items in this stack with the latest
			if(this._active){
				this._active.setController(val);
			}
		}
	},
	{
		'_TAGS' : ['navstack']
	}
);