OJ.importJs('oj.components.Component');


'use strict';

OJ.compileClass(
	'TableCell',
	oj.table.TableCell = function(){
		return new oj.components.Component(
			arguments, 'OjTableCell',
			{
				'_template' : 'oj.table.TableCell',


				'_constructor' : function(/*content*/){
					this._super('OjTableCell', '_constructor', []);

					if(arguments.length){
						this.setContent(arguments[0]);
					}
				},


				'getContent' : function(){
					var children = [], ln = this.numChildren();

					while(ln-- > 0){
						children.splice(0, 0, this.getChildAt(ln));
					}

					return children;
				},
				'setContent' : function(content){
					this.removeAllChildren();

					if(content){
						content = Array.array(content);

						var ln = content.length;

						while(ln-- > 0){
							this.addChildAt(content[ln], 0);
						}
					}
				}
			}
		);
	}
);