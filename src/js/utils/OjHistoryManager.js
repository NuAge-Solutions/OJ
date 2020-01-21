importJs("oj.events.OjActionable");
importJs("oj.events.OjEvent");
importJs("oj.net.OjUrl");
importJs("oj.utils.OjTimer");


OJ.extendClass(
    "OjHistoryEvent", [OjEvent],
    {
        "_get_props_" : {
            "direction" : null,
            "old_url" : null,
            "new_url" : null
        },

        "_constructor" : function(direction, old_value, new_value, bubbles, cancelable){
            const cls = this._static;

            this._super(OjEvent, "_constructor", [cls.CHANGE, bubbles, cancelable]);

            this._direction = direction || cls.PUSH;
            this._old_value = old_value;
            this._new_value = new_value;
        },

        "exportData" : function(mode){
            const data = this._super(OjEvent, "exportData", arguments);

            data.direction = this.direction;
            data.old_value = this.old_value;
            data.new_value = this.new_value;

            return data;
        },

		"importData" : function(data, mode){
			if(isSet(data.direction)){
				this._direction = data.direction;
			}

			if(isSet(data.old_value)){
				this._old_value = data.old_value;
			}

			if(isSet(data.new_value)){
				this._new_value = data.new_value;
			}

			return this._super(OjEvent, "importData", arguments);
		}
    },
    {
        "FORWARD"   : "historyForward",
        "BACK"      : "historyBack",
        "PUSH"      : "historyPush",

        "CHANGE"    : "historyChange",
    }
);

// TODO: make History Manager an extension of OjArray
OJ.extendManager(
    "HistoryManager", "OjHistoryManager", [OjActionable],
    {
        "HASH_ID": "__oj_id__",

        "_previous" : null,  "_next" : null,  "_current" : 0,  "_native" : false,  "_timer" : 0, "_length" : 0,

        "_next_id" : Math.floor(Date.now() / 1000),  "_ignore_next" : false,  "_list" : null,

        "disable_back" : false,

        "_get_props_" : {
            "url": null
        },


        "_constructor" : function(){
            this._super(OjActionable, "_constructor", []);

            this._list = [new OjUrl(window.location.href)];

            this._length = window.history.length;

            if("onhashchange" in window){
                // Add listener for url change
                window.onhashchange = (evt) => {
                    HistoryManager._onChange(evt)
                };
            }
            else{
                print("WARNING: onhashchange not supported. HistoryManager hash change events will not work!");
            }

            if("onpopstate" in window){
                window.onpopstate = function(evt){
                    HistoryManager._onPopState(evt);
                };
            }
            else{
                print("WARNING: onpopstate not supported. HistoryManager push/pop/replace state support will not work!");
            }
        },

        "_onChange" : function(){
            const old_url = HistoryManager.get();

            // check to see if the url has changed
            if(old_url.toString() != window.location.href){
                const new_url = new OjUrl(window.location.href),
                    cls = OjHistoryEvent;

                let direction = cls.NEW;

                // check for a back button click
                if(new_url.toString() == (this.get(-1) || "").toString()){
                    this._current--;

                    direction = cls.BACK;
                }
                // check for a forward button click
                else if(new_url.toString() == (this.get(this._current + 1) || "").toString()){
                    this._current++;

                    direction = cls.FORWARD;
                }
                // we assume that if it wasn't a forward or a back button click that we know of then it is a back button click we did not know about
                // therefore we make an adjustment to our history list and current positioning
                else{
                    this._list.append(new_url);

                    this._current = this._list.length - 1;
                }

                this._previous = this.get(-1);

                this._next = this.get(this._current + 1);

                this._dispatchChange(direction, old_url, new_url);
            }
        },

        "_onPopState" : function(evt){
            if(this.disable_back){
                return window.history.go(1);
            }

            const cls = OjHistoryEvent;

            this._dispatchChange(new cls(cls.BACK, HistoryManager.get(), this.url));
        },

        // "_onChange" : function(){
        //     const old_url = HistoryManager.get(),
        //         old_url_str = old_url.toString();
        //
        //     // check to see if the url has changed
        //     if(old_url_str != window.location.href){
        //         const new_url = new OjUrl(window.location.href),
        //             cls = OjHistoryEvent;
        //
        //         let direction = cls.PUSH;
        //
        //         // if history length doesn't change then it's a forward/back
        //         if(window.history.length == this._length) {
        //             const new_url_str = new_url.toString();
        //
        //             // check for a back
        //             if(this._previous && new_url_str == this._previous.toString()){
        //                 this._current--;
        //
        //                 direction = cls.BACK;
        //             }
        //             // check for forward
        //             else if(this._next && new_url_str == this._next.toString()){
        //                 this._current++;
        //
        //                 direction = cls.FORWARD;
        //             }
        //             // otherwise out of scope and ignore
        //             else{
        //                 return OJ.load(old_url_str);
        //             }
        //         }
        //         // we assume that if it wasn't a forward or a back button click that we know of then it is a back button click we did not know about
        //         // therefore we make an adjustment to our history list and current positioning
        //         else{
        //             this._list.append(new_url);
        //
        //             this._current = this._list.length - 1;
        //
        //             this._length = window.history.length;
        //         }
        //
        //         this._previous = this.get(-1);
        //
        //         this._next = this.get(this._current + 1);
        //         print("HistoryManager._onChange()", direction, old_url.toString(), new_url.toString());
        //         this._dispatchChange(direction, old_url, new_url);
        //     }
        // },

        "_dispatchChange" : function(direction, old_url, new_url){
            this.dispatchEvent(new OjHistoryEvent(direction, old_url, new_url, true));
        },


        "get" : function(){
            let url, index = arguments.length ? arguments[0] : this._current;

            if(index < 0){
                url = this._list[Math.max(this._current + index, 0)];
            }
            else if(index >= this._list.length){
                url = this._list[this._list.length - 1];
            }
            else {
                url = this._list[index];
            }

            return url ? url.clone() : null;
        },

        "previous" : function(){
            return this._previous;
        },

        "next" : function(){
            return this._next;
        },

        "go" : function(val){
            try{
                window.history.go(val);
            }
            catch(e){
                let url;

                if(isNaN(index)){
                    let ln = this._list.length;

                    while(ln-- > 0){
                        if(this._list[ln].toString() == val){
                            url = val;

                            break;
                        }
                    }

                    this._current = ln;
                }
                else{
                    url = this.get(val);

                    this._current = val;
                }

                window.location.href = url.toString();
            }
        },

        "forward" : function(){
            try{
                window.history.forward()
            }
            catch(e){
                OJ.load(this.get(this._current + 1));
            }
        },

        "back" : function(){
            try{
                window.history.back();
            }
            catch(e){
                OJ.load(this.get(this._current - 1));
            }
        },

        "length" : function(){
            return this._list.length;
        },

        "nextId" : function(){
            return this._next_id++;
        },

        "reload" : function(){
            window.location.reload(true);
        },

        ".url" : function(){
            return new OjUrl(window.location.href);
        }
    }
);