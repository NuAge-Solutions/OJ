OJ.importJs("oj.events.OjEvent");"use strict";OJ.extendClass("OjCollectionEvent",[OjEvent],{_get_props_:{item:null,index:null,oldItem:null},_constructor:function(c,e,b){var f=[c],a=arguments,d=a.length;this._item=e;this._index=b;if(d>3){this._oldItem=a[3];if(d>4){f=Array.array(a);f.splice(1,3)}}this._super(OjEvent,"_constructor",f)}},{ITEM_ADD:"onItemAdd",ITEM_CLICK:"onItemClick",ITEM_OVER:"onItemOver",ITEM_OUT:"onItemOut",ITEM_MOVE:"onItemMove",ITEM_REMOVE:"onItemRemove",ITEM_REPLACE:"onItemReplace"});