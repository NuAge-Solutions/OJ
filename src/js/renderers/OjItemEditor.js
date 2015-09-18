OJ.importJs('oj.renderers.OjItemRenderer');
OJ.importJs('oj.renderers.OjLabelItemRenderer');
OJ.importJs('oj.components.OjButton');

OJ.importCss('oj.renderers.OjItemEditor')


OJ.extendComponent(
	'OjItemEditor', [OjItemRenderer],
	{
        '_props_' : {
            'item_renderer' : OjLabelItemRenderer
        },

		'_template' : 'oj.renderers.OjItemEditor',


        '_resetItem' : function(){
            if(this.item){
                this.holder.removeAllChildren();

                this.item = null;
            }
        },

		'_redrawData' : function(){
			if(this._super(OjItemRenderer, '_redrawData', arguments)){
                this._resetItem();

                var data = this.data,
                    cls = item_renderer;

                if(data){
                    this.holder.appendChild(this.item = new cls(this.group, data));
                }

				return true;
			}

			return false;
		},


        '_onDeletePress' : function(evt){
            this.group.removeElm(this.data);
        },


        '=group' : function(group){
            this._super(OjItemRenderer, '=group', arguments);

            if(group){
                this.item_renderer = group.item_renderer;
            }
        }
	},
    {
        '_TAGS' : ['item-editor', 'oj-e-item', 'e-item']
    }
);