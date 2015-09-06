OJ.importJs('oj.components.OjSpinner');
OJ.importJs('oj.events.OjEvent');

OJ.importCss('oj.media.OjMedia');


OJ.extendClass(
    'OjMedia', [OjComponent],
    {
        '_props_': {
            'preload': false,
            'resizeBy': 'none', // OjMedia.NONE
            'source': null,
            'showSpinner': false,
            'spinnerTint': '#333'
        },

        '_height': 0, '_loaded': false, '_resize_vals': ['none', 'fill', 'fit', 'hFill', 'wFill'], '_width': 0,

        //'_template': 'oj.media.OjMedia',

        '_h_align': OjStyleElement.CENTER,
        '_v_align': OjStyleElement.MIDDLE,


        '_constructor': function (/*source*/) {
            this._super(OjComponent, '_constructor', []);

            if (arguments.length) {
                this.source = arguments[0];
            }
        },

        '_destructor': function () {
            this._unset('media');
            this._unset('loading');

            return this._super(OjComponent, '_destructor', arguments);
        },


        // NOTE: this should never be called directly
        '_load' : function(){

        },

        '_makeMedia' : function(){
            return new OjStyleElement('<div class="media"></div>');
        },

        '_resize' : function(){
            if(!this._media){
                return;
            }

            if(this._source_is_css){
                this._media.width = OjStyleElement.AUTO;
                this._media.height = OjStyleElement.AUTO;

                return;
            }

            var w = this._getStyleBackup('width'),
                h = this._getStyleBackup('height');

            if(!isEmpty(w)){
                this._media.width = ['100', '%'];

                if (h) {
                    this._media.height = ['100', '%'];
                }
                else {
                    this._media.height = OjStyleElement.AUTO;
                }
            }
            else if(!isEmpty(h)){
                this._media.height = ['100', '%'];

                this._media.width = OjStyleElement.AUTO;
            }
            else if(this._resizeBy == this._static.WIDTH){
                this._media.width = ['100', '%'];
                this._media.height = OjStyleElement.AUTO;
            }
            else{
                this._media.height = ['100', '%'];
                this._media.width = OjStyleElement.AUTO;

                var w2 = this.width;

                if(w > w2){
                    this._media.marginLeft = (w2 - w) / 2;
                }
            }
        },

        '_setIsDisplayed' : function(displayed){
            this._super(OjComponent, '_setIsDisplayed', arguments);

            if(displayed && !this._loaded){
                this._load();
            }
        },

        // NOTE: this should never be called directly
        '_setSource' : function(url){
            this._source = url;
        },

        // NOTE: this should never be called directly
        '_unload': function(){
            this._source = null;

            this._loaded = false;

            if (this.loading) {
                this._unset('loading');
            }

            if (this._media) {
                this._media.maxWidth = OjStyleElement.AUTO;
                this._media.maxHeight = OjStyleElement.AUTO;
            }

            this.removeCss('is-loaded');

            this.dispatchEvent(new OjEvent(OjEvent.UNLOAD));
        },


        '_onMediaLoad': function (evt) {
            this._unset('loading');

            this._loaded = true;

            if (this._media) {
                // make sure we don't allow up-scaling
                if (this._original_w) {
                    this._media.maxWidth = this._original_w;
                }

                if (this._original_h) {
                    this._media.maxHeight = this._original_h;
                }
            }

            this._resize();

            this.addCss('is-loaded');

            this.dispatchEvent(new OjEvent(OjEvent.LOAD));
        },


        'clone': function () {
            var media = this._super(OjComponent, 'clone', arguments);
            media.source = this._source;

            return media;
        },
        'isLoaded': function () {
            return this._loaded;
        },

        'load': function () {
            if (!this._loaded && this._source) {
                this._load();
            }
        },

        'unload': function () {
            if (this._loaded && this._source) {
                this._unload();
            }
        },


        // Getter & Setter Functions
        '.originalHeight': function () {
            return this._original_h;
        },

        '.originalWidth': function () {
            return this._original_w;
        },

        '=source': function (url) {
            if (Array.isArray(url)) {
                url = url.join(', ');
            }
            else if (url) {
                url = url.toString();
            }

            // make sure we don't do extra work with loading the same media twice
            if (this._source == url) {
                return;
            }

            this.unload();

            if (!this.loading && this._showSpinner) {
                this.appendElm(this.loading = new OjSpinner(this._spinnerTint));
            }

            this._setSource(url);

            if (this._preload || this._is_displayed) {
                this._load();
            }
        },

        '=resizeBy': function (val) {
            if (this._resizeBy == val) {
                return;
            }

            this._resizeBy = this._resize_vals.indexOf(val) > -1 ? val : this._static.NONE;

            this._resize();
        },

        '_setHeight': function (val) {
            this._super(OjComponent, '_setHeight', arguments);

            this._height = val

//			this._resize();
        },

        '_setWidth': function (val) {
            this._super(OjComponent, '_setWidth', arguments);

            this._width = val;

//			this._resize();
        }
    },
    {
        'NONE': 'none',
        'FILL': 'fill',
        'FIT': 'fit',
        'HEIGHT': 'hFill',
        'WIDTH': 'wFill'
    }
);