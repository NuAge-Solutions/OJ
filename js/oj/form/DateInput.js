//OJ.importJs('oj.date.CalendarControl');
OJ.importJs('oj.form.TextInput');

OJ.importCss('oj.date.CalendarControl');


'use strict';

OJ.extendClass(
	OjTextInput, 'OjDateInput',
	{
		'_onFocusIn' : function(evt){
			this._s('OjDateInput', '_onFocusIn', arguments);

			//showCalendarControl(this.dom());

		}
	}
);