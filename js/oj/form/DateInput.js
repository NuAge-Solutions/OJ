//OJ.importJs('oj.date.CalendarControl');
OJ.importJs('oj.form.TextInput');

OJ.importCss('oj.date.CalendarControl');


'use strict';

OJ.compileClass(
	'OjDateInput',
	oj.form.DateInput = function(){
		return new oj.form.TextInput(
			arguments, 'OjDateInput',
			{
				'_onFocusIn' : function(evt){
					this._super('OjDateInput', '_onFocusIn', arguments);

					//showCalendarControl(this.dom());

				}
			}
		);
	}
);