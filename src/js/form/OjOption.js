importJs("oj.renderers.OjTextRenderer");
importJs("oj.events.OjUiEvent");


OJ.extendClass(
    "OjOption", [OjItemRenderer],
    {
        "_props_" : {
            "data_renderer" : null,
            "is_selected"   : false
        },

//        "_selector" : null,

        "_v_align" : OjStyleElement.MIDDLE,


        "_constructor" : function(/*group|data_renderer, data*/){
            // process the arguments
            var args = arguments,
                ln = args.length,
                renderer = OjTextRenderer;

            if(ln > 1){
                var tmp = args[1];

                if(isString(tmp) || tmp.is("OjItemRenderer")){
                    renderer = tmp;

                    args[1] = null;
                }
            }

            this._super(OjItemRenderer, "_constructor", arguments);

            if(!this._selector){
                this.data_renderer = renderer;

                this.addEventListener(OjUiEvent.PRESS, this, "_onPress");
            }
        },

        "_destructor" : function(){
            this._selector = this._data_renderer = null;

            return this._super(OjItemRenderer, "_destructor", arguments);
        },


        "_processDomSourceChild" : function(dom_elm, component){
            if(!isEmpty(dom_elm.nodeValue)){
                this.data = (this._data ? this._data : "") + dom_elm.nodeValue;

                return null;
            }

            return this._super(OjItemRenderer, "_processDomSourceChild", arguments);
        },

        "_redrawData" : function(){
            if(this.option && this._super(OjItemRenderer, "_redrawData", arguments)){
                this.option.data = this._data;

                return true;
            }

            return false;
        },


        "_onPress" : function(evt){
            this.is_selected = !this._is_selected;
        },


        "=data_renderer" : function(val){
            if(isString(val)){
                val = OJ.stringToClass(val);
            }

            if(this._data_renderer == val){
                return;
            }

            this._unset("option");

            this._data_renderer = val;

            this.option = new val(this._group, this._data)
            this.option.addCss("option");

            this.appendElm(this.option);
        },

        "=group" : function(group){
            if(this._group == group){
                return;
            }

            var owner;

            if(this._group && (owner = this._group.owner) && owner.is(OjSelector)){
                this._selector = owner;

                this.data_renderer = owner.item_renderer;

                this.removeEventListener(OjUiEvent.PRESS, this, "_onPress");
            }
            else{
                this._selector = null;

                this.data_renderer = OjTextRenderer;

                this.addEventListener(OjUiEvent.PRESS, this, "_onPress");
            }
        },

        "=is_selected" : function(val){
            if(this._is_selected == val){
                return;
            }

            if(this._is_selected = val){
                this.addCss("selected");

                this.input.dom.checked = true;
            }
            else{
                this.removeCss("selected");

                this.input.dom.checked = false;
            }

            this.dispatchEvent(new OjEvent(OjEvent.CHANGE));
        }
    },
    {
        "_TEMPLATE" : "oj.form.OjOption"
    }
);




OJ.extendComponent(
    "OjCheckedOption", [OjOption],
    {},
    {
        "_TAGS" : ["oj-checkbox", "checkbox"]
    }
);



OJ.extendComponent(
    "OjRadioOption", [OjOption],
    {
        "_constructor" : function(){
            this._super(OjOption, "_constructor", arguments);

            this.input.attr("type", "radio");
        }
    },
    {
        "_TAGS" : ["oj-radio", "radio"]
    }
);