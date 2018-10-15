importJs('oj.events.OjEvent');
importJs('oj.media.OjMedia');


OJ.extendComponent(
    'OjImage', [OjMedia],
    {
        '_source_is_css': false,

        // todo: OjImage handle upscaling....

        '_destructor': function () {
            if (this._img) {
                this._img.removeEventListener('load', this._callback);
            }

            this._callback = this._img = null;

            return this._super(OjMedia, '_destructor', arguments);
        },


        '_load': function () {
            if (!this._source_is_css && this._img) {
                this._loaded = false;

                this._img.src = this._source;
            }
        },

        '_makeMedia': function () {


            return this._super(OjMedia, '_makeMedia', arguments);
        },

        '_resize': function () {
            this.removeCss(this._resize_vals);

            if (this._resize_by == this._static.NONE) {
                return;
            }

            this.addCss(this._resize_by);
        },


        '_onMediaLoad': function (evt) {
            if(this._source_is_css){
                this._media.addCss(this._source.substring(1));

                this._original_w = this._media.width;
                this._original_h = this._media.height;
            }
            else{
                this._original_w = this._img.width;
                this._original_h = this._img.height;

                if(!this.width){
                    this.width = this._original_w;
                }

                if(!this.height){
                    this.height = this._original_h;
                }
                print("set background", this.source);
                this._setStyle('background-image', 'url(' + this.source + ')');
            }

            return this._super(OjMedia, '_onMediaLoad', arguments);
        },


        '_setSource': function (url) {
            this._super(OjMedia, '_setSource', arguments);

            if (url) {
                // check to see if this is a css class
                if (this._source_is_css = (this._source.charAt(0) == '@')) {
                    // if the media holder doesn't exist then create it
                    this.appendElm(this._media = this._makeMedia());

                    // trigger the image load since its already loaded
                    this._onMediaLoad(null);
                }
                else {
                    // make sure we have an image loader object
                    if (!this._img) {
                        this._img = new Image();
                        this._img.addEventListener('load', this._callback = this._onMediaLoad.bind(this));
                    }
                }
            }
        },

        '_unload': function () {
            // cleanup old source
            if (!this._source_is_css) {
                // remove old source background image
                this._setStyle('background-image', null);
            }

            this._unset('_media');

            this._source_is_css = false;

            this._super(OjMedia, '_unload', arguments);
        }
    },
    {
        '_TAGS': ['img', 'image'],

        'image': function (img/*, clone=false*/) {
            if (img) {
                if (isString(img)) {
                    return new OjImage(img);
                }

                if (img.is('OjImage')) {
                    return arguments.length > 1 && arguments[1] ? img.clone() : img;
                }
            }

            return null;
        }
    }
);