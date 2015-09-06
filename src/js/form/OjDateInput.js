OJ.importJs('oj.form.OjTextInput');




OJ.extendClass(
	'OjDateInput', [OjTextInput],
	{
		'_onFocusIn' : function(evt){
			this._super(OjTextInput, '_onFocusIn', arguments);

			//showCalendarControl(this.dom);

		}
	}
);