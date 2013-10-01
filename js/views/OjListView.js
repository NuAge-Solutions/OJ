OJ.importJs('oj.views.OjView');
OJ.importJs('oj.components.OjList');


OJ.extendComponent(
  'OjListView', [OjView],
  {
    '_template' : 'oj.views.OjListView'
  },
  {
    '_TAGS' : ['listview']
  }
);