OJ.importJs('oj.nav.View');

OJ.importCss('oj.nav.Iframe');


'use strict';

OJ.extendComponent(
	OjView, 'OjIframe',
	{
		'_source' : null,  '_interval' : null,  '_timeout' : 60,

		'_template' : '<iframe></iframe>',


		'_constructor' : function(/*source, target*/){
			this._super('OjIframe', '_constructor', []);

			var ln = arguments.length;

			if(ln){
				this.setSource(arguments[0]);

				if(ln > 1){
					this.setTarget(arguments[1]);
				}
			}

			this.setAttr('name', this.id());
		},


		'_onLoad' : function(){
			clearInterval(this._interval);

			this.dispatchEvent(new OjEvent(OjEvent.COMPLETE));
		},

		'_onTimeout' : function(){
			clearInterval(this._interval);

			this.dispatchEvent(new OjIoErrorEvent(OjIoErrorEvent.IO_ERROR));
		},


		'getTargetId' : function(){
			return this.id();
		},

		'getSource' : function(){
			return this._source;
		},
		'setSource' : function(source){
			var iframe = this.dom();

			this._source = source.toString();

			if(iframe.src){
				iframe.src = this._source;
			}
			else if(iframe.contentWindow !== null && iframe.contentWindow.location !== null){
//			    	    iframe.contentWindow.location.href = this._source;
			}
			else{
				this.setAttr('src', this._source);
			}

			if(!isEmpty(this._source)){
				clearInterval(this._interval);

				this._interval = setInterval(this._onTimeout.bind(this), this._timeout * 1000);

				var on_load_func = this._onLoad.bind(this);

				if(iframe.attachEvent){
					iframe.attachEvent('onload', on_load_func);
				}
				else{
					iframe.onload = on_load_func;
				}
			}
		}
	},
	{
		'_TAGS' : ['iframe']
	}
);