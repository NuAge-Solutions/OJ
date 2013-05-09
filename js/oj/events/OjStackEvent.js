OJ.importJs('oj.events.OjEvent');


'use strict';

OJ.extendClass(
	OjEvent, 'OjStackEvent',
	{
		'_get_props_' : {
			'index'      : null,
			'oldIndex'   : null,
			'transition' : null,
			'view'       : null
		},


		'_constructor' : function(type, view, transition, index/*, old_index, bubbles = false, cancelable = false*/){
			var args = [type, false, false], ln = arguments.length;

			this._view = view;

			this._transition = transition;

			this._index = index;

			if(ln > 4){
				this._oldIndex = arguments[4];

				if(ln > 5){
					args[1] = arguments[5];

					if(ln > 6){
						args[2] = arguments[6];
					}
				}
			}

			this._super('OjStackEvent', '_constructor', args);
		}
	},
	{
		'ACTIVE'          : 'onStackViewActive',
		'ADD'             : 'onStackViewAdd',
		'CHANGE'          : 'onStackChange',
		'CHANGE_COMPLETE' : 'onStackChangeComplete',
		'INACTIVE'        : 'onStackViewInactive',
		'MOVE'            : 'onStackViewMove',
		'REMOVE'          : 'onStackViewRemove',
		'REPLACE'         : 'onStackViewReplace'
	}
);