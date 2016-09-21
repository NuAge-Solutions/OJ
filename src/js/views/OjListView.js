importJs('oj.views.OjView');
importJs('oj.components.OjList');
importJs('oj.renderers.OjListViewItemRenderer');


OJ.extendComponent(
  'OjListView', [OjView, OjList],
  {
    '_item_renderer' : OjListViewItemRenderer,
  },
  {
    '_TAGS' : ['list-view']
  }
);