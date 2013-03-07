OJ.importJs('oj.events.Event');


'use strict';

OJ.compileClass(
	'OjStackEvent',
	oj.events.StackEvent = function(){
		return new oj.events.Event(
			arguments, 'OjStackEvent',
			{
				'_get_properties_' : {
					'index'    : null,
					'oldIndex' : null,
					'view'     : null
				},


				'_constructor' : function(type, view, index/*, old_index, bubbles = true, cancelable = false*/){
					var args = [type, true, false], ln = arguments.length;

					this._view = view;

					this._index = index;

					if(ln > 3){
						this._oldIndex = arguments[3];

						if(ln > 4){
							args[1] = arguments[4];

							if(ln > 5){
								args[2] = arguments[5];
							}
						}
					}

					this._super('OjStackEvent', '_constructor', args);
				}
			}
		);
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