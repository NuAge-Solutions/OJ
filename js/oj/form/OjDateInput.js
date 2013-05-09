//OJ.importJs('oj.date.CalendarControl');
OJ.importJs('oj.form.OjTextInput');

OJ.importCss('oj.date.OjCalendarControl');


'use strict';

OJ.extendClass(
	OjTextInput, 'OjDateInput',
	{
		'_onFocusIn' : function(evt){
			this._super('OjDateInput', '_onFocusIn', arguments);

			//showCalendarControl(this.dom());

		}
	}
);