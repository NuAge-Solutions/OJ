OJ.importJs('oj.views.OjView');
OJ.importJs('oj.components.OjList');
OJ.importJs('oj.renderers.OjListViewItemRenderer');


OJ.extendComponent(
  'OjListView', [OjView, OjList],
  {
    '_item_renderer' : OjListViewItemRenderer,
  },
  {
    '_TAGS' : ['list-view']
  }
);