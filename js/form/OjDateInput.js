//OJ.importJs('oj.date.CalendarControl');
OJ.importJs('oj.form.OjTextInput');

OJ.importCss('oj.date.OjCalendarControl');


'use strict';

OJ.extendClass(
	'OjDateInput', [OjTextInput],
	{
		'_onFocusIn' : function(evt){
			this._super(OjTextInput, '_onFocusIn', arguments);

			//showCalendarControl(this.dom());

		}
	}
);