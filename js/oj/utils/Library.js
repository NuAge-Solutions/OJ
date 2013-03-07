OJ.importJs('oj.events.Actionable');
OJ.importJs('oj.events.Event');
OJ.importJs('oj.events.ErrorEvent');
OJ.importJs('oj.events.IoErrorEvent');
OJ.importJs('oj.net.UrlRequest');
OJ.importJs('oj.net.UrlLoader');


'use strict';

OJ.compileClass(
	'OjLibrary',
	oj.utils.Library = function(){
		return new oj.events.Actionable(
			arguments, 'OjLibrary',
			{
				'_properties_' : {
					'assets' : null,
					'async'  : false
				},

				'_queue' : null,


				'_constructor' : function(/*assets*/){
					this._super('OjLibrary', '_constructor', []);

					this.setAssets(arguments.length ? arguments[0] : {});

					this._queue = {};
				},


				'_onSuccess' : function(evt){
					var loader_id = evt.getTarget().id(), queued = this._queue[loader_id];

					if(queued){
						this._assets[queued.asset] = evt.getTarget().getData();

						delete this._queue[loader_id];
					}

					OJ.destroy(evt.getTarget());
				},

				'_onFail' : function(evt){
					var loader_id = evt.getTarget().id(), queued = this._queue[loader_id];

					if(queued){
						this.dispatchEvent(new OjErrorEvent(OjErrorEvent.ERROR));

						delete this._queue[loader_id];
					}

					OJ.destroy(evt.getTarget());
				},


				'load' : function(asset/*, force*/){
					var asset_str = asset.toString(), force = arguments.length > 1 && arguments[1];

					if(!this.isLoaded(asset_str) || force){
						asset = new OjUrlRequest.urlRequest(asset);

						if(force){
							asset.getQueryParam('force', Date.time());
						}

						var loader = new OjUrlLoader(asset, this._async);

						this._queue[loader.id()] = {
							'loader'    : loader,
							'asset'     : asset_str
						};

						loader.addEventListener(OjEvent.COMPLETE, this, '_onSuccess');
						loader.addEventListener(OjIoErrorEvent.IO_ERROR, this, '_onFail');

						loader.load();
					}

					return this._assets[asset_str];
				},

				'isLoaded' : function(asset){
					return this._assets[asset.toString()] ? true : false;
				},


				'getAsset' : function(asset){
					return this._assets[asset.toString()];
				},
				'setAsset' : function(asset, value){
					asset = asset.toString();

					if(isNull(value)){
						return delete this._assets[asset];
					}

					this._assets[asset] = value;
				}
			}
		);
	}
);