OJ.importJs('oj.events.TransformEvent');
OJ.importJs('oj.events.MouseEvent');
OJ.importJs('oj.fx.Fade');
OJ.importJs('oj.menu.Menu');
OJ.importJs('oj.modal.ModalManager');


'use strict';

OJ.compileManager(
	'MenuManager',
	oj.menu.MenuManager = function(){
		return new oj.events.Actionable(
			arguments, 'OjMenuManager',
			{
				'_menus' : null,  '_active' : null,  '_tweens' : null,


				'_constructor' : function(){
					this._super('OjMenuManager', '_constructor', arguments);

					this._menus = {};
					this._active = {};
					this._tweens = {};
				},

				'_percentRectVisible' : function(rect){
					var viewport = OJ.getViewport();

					var x = {
						'top'       : rect.top > 0 && rect.top >= viewport.top ? rect.top : viewport.top,
						'left'      : rect.left > 0 && rect.left >= viewport.left ? rect.left : viewport.left,
						'bottom'    : viewport.bottom >= rect.bottom ? rect.bottom : viewport.bottom,
						'right'     : viewport.right >= rect.right ? rect.right : viewport.right
					};

					return ((rect.bottom - rect.top) * (rect.right - rect.left)) /
						((x.bottom - x.top) * (x.right - x.left));
				},

				'_positionMenu' : function(menu, target){
					var pos = menu.getPositioning();
					var rect, rect_vis;
					var backup, visibility = 0;
					var i, ln = pos.length;

					for(i = 0; i < ln; i++){
						rect = this[pos[i]](target, menu);
						rect_vis = this._percentRectVisible(rect);

						if(rect_vis == 1){
							break;
						}
						else if(rect_vis > visibility){
							visibility = rect_vis;

							backup = rect;
						}

						rect = null;
					}

					if(!rect){
						rect = backup;
					}

					menu.setX(rect.left);
					menu.setY(rect.top);
				},

				'_removeMenus' : function(list){
					var key, tweens = new OjTweenSet();

					for(key in list){
						// stop & remove the old tween/menu
						OJ.destroy(this._tweens[key]);

						// remove old event listeners
						OjElement.byId(key).removeEventListener(OjTransformEvent.MOVE, this, '_onTargetMove');

						// add the fade out
						tweens.addTween(new OjFade(list[key], OjFade.OUT));

						delete this._active[key];
						delete this._tweens[key];
					}

					if(tweens.numTweens()){
						tweens.addEventListener(OjTweenEvent.COMPLETE, this, '_onTransOut');
						tweens.start();
					}
				},


				'_onPageClick' : function(evt){
					var key, active, target;

					// check to see if we should cancel
					for(key in this._active){
						active = this._active[key];

						if(active && active.hitTestPoint(evt.getPageX(), evt.getPageY())){
							return;
						}

						target = OjElement.byId(key);

						if(target && target.hitTestPoint(evt.getPageX(), evt.getPageY())){
							return;
						}
					}

					// if not shut it down for all actives
					this._removeMenus(this._active);

					// remove the event listener
					OJ.removeEventListener(OjMouseEvent.CLICK, this, '_onPageClick');
				},

				'_onTargetClick' : function(evt){
					var target = evt.getCurrentTarget();
					var menu = this._menus[target.id()];

					if(menu && !this._active[target.id()]){
						this.show(menu, target)
					}
				},

				'_onTargetMove' : function(evt){
					var target = evt.getCurrentTarget();
					var menu = this._menus[target.id()];

					if(menu){
						this._positionMenu(menu, target);
					}
				},

				'_onTransOut' : function(evt){
					OJ.destroy(evt.getCurrentTarget());
				},


				'hide' : function(menu){
					var key, id, ln = 0;

					for(key in this._active){
						ln++;

						if(this._active[key] == menu){
							id = key
						}
					}

					if(id){
						var tmp = {};
						tmp[id] = menu;

						delete this._active[id];

						this._removeMenus(tmp);

						// if there are no more active menus then stop listening for page clicks
						if(ln == 1){
							OJ.removeEventListener(OjMouseEvent.CLICK, this, '_onPageClick');
						}
					}
				},

				'register' : function(target, content/*, positioning, parent_menu*/){
					target.addEventListener(OjMouseEvent.CLICK, this, '_onTargetClick');

					var menu = new OjMenu(content);
					var ln = arguments.length;

					if(ln > 2){
						menu.setPositioning(arguments[2]);

						if(ln > 3){
							menu.setParentMenu(arguments[3]);
						}
					}

					this._menus[target.id()] = menu;

					return menu;
				},

				'show' : function(menu/*, target*/){
					var target = arguments.length > 1 ? arguments[1] : null;
					var key, list = {};

					if(!target){
						for(key in this._menus){
							if(this._menus[key] == menu){
								target = OjElement.byId(key);

								break;
							}
						}
					}

					// remove all non-parent active menus
					for(key in this._active){
						if(this._active[key] != menu && !this._active[key].hasSubMenu(menu)){
							list[key] = this._active[key];
						}
					}

					this._removeMenus(list);

					// grab the menu
					menu.setAlpha(0);

					OJ.addChild(menu);

					// position the menu based on preferences
					if(menu){
						this._positionMenu(menu, target);

						var tween = new OjFade(menu);
						tween.start();

						this._active[target.id()] = menu;
						this._tweens[target.id()] = tween;

						OJ.addEventListener(OjMouseEvent.CLICK, this, '_onPageClick');
					}

					target.addEventListener(OjTransformEvent.MOVE, this, '_onTargetMove');
				},

				'unregister' : function(target/*|menu*/){
					if(target.is('OjMenu')){
						var key;

						for(key in this._menus){
							if(this._menus[key] == target){
								target = OjElement.byId(key);

								break;
							}
						}
					}

					if(target){
						target.removeEventListener(OjMouseEvent.CLICK, this, '_onTargetClick');

						delete this._menus[target.id()];
					}
				},


				'positionTopLeft' : function(target, menu){
					return OJ.makeRect(
						target.getPageX() - menu.getHorzOffset(),
						target.getPageY() - menu.getHeight() - menu.getVertOffset(),
						menu.getWidth(),
						menu.getHeight()
					);
				},

				'positionTopCenter' : function(target, menu){
					return OJ.makeRect(
						target.getPageX() + ((target.getWidth() - menu.getWidth()) / 2),
						target.getPageY() - menu.getHeight(),
						menu.getWidth(),
						menu.getHeight()
					);
				},

				'positionTopRight' : function(target, menu){
					return OJ.makeRect(
						target.getPageX() + target.getWidth() - menu.getWidth(),
						target.getPageY() - menu.getHeight(),
						menu.getWidth(),
						menu.getHeight()
					);
				},


				'positionBottomLeft' : function(target, menu){
					return OJ.makeRect(
						target.getPageX(),
						target.getPageY() + target.getHeight(),
						menu.getWidth(),
						menu.getHeight()
					);
				},

				'positionBottomCenter' : function(target, menu){
					return OJ.makeRect(
						target.getPageX() + ((target.getWidth() - menu.getWidth()) / 2),
						target.getPageY() + target.getHeight(),
						menu.getWidth(),
						menu.getHeight()
					);
				},

				'positionBottomRight' : function(target, menu){
					return OJ.makeRect(
						target.getPageX() + target.getWidth() - menu.getWidth(),
						target.getPageY() + target.getHeight(),
						menu.getWidth(),
						menu.getHeight()
					);
				},


				'positionLeftTop' : function(target, menu){
					return OJ.makeRect(
						target.getPageX() - menu.getWidth(),
						target.getPageY(),
						menu.getWidth(),
						menu.getHeight()
					);
				},

				'positionLeftMiddle' : function(target, menu){
					return OJ.makeRect(
						target.getPageX() - menu.getWidth(),
						target.getPageY() + ((target.getHeight() - menu.getHeight()) / 2),
						menu.getWidth(),
						menu.getHeight()
					);
				},

				'positionLeftBottom' : function(target, menu){
					return OJ.makeRect(
						target.getPageX() - menu.getWidth(),
						target.getPageY() + target.getHeight() - menu.getHeight(),
						menu.getWidth(),
						menu.getHeight()
					);
				},


				'positionRightTop' : function(target, menu){
					return OJ.makeRect(
						target.getPageX() + target.getWidth(),
						target.getPageY(),
						menu.getWidth(),
						menu.getHeight()
					);
				},

				'positionRightMiddle' : function(target, menu){
					return OJ.makeRect(
						target.getPageX() + target.getWidth(),
						target.getPageY() + ((target.getHeight() - menu.getHeight()) / 2),
						menu.getWidth(),
						menu.getHeight()
					);
				},

				'positionRightBottom' : function(target, menu){
					return OJ.makeRect(
						target.getPageX() + target.getWidth(),
						target.getPageY() + target.getHeight() - menu.getHeight(),
						menu.getWidth(),
						menu.getHeight()
					);
				}
			}
		);
	}
);