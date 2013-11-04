OJ.importJs('oj.views.OjView');
OJ.importJs('oj.components.OjList');
OJ.importJs('oj.renderers.OjListViewItemRenderer');


OJ.extendComponent(
  'OjListView', [OjView, OjList],
  {
    '_itemRenderer' : OjListViewItemRenderer,


    '_constructor' : function(){
      this._super(OjView, '_constructor', arguments);


    }
  },
  {
    '_TAGS' : ['listview']
  }
);