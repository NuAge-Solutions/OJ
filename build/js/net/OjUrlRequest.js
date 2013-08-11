OJ.importJs("oj.net.OjUrl");"use strict";OJ.extendClass("OjUrlRequest",[OjUrl],{_props_:{data:null,files:null,headers:null,method:"get"},_ignores_cache:false,_constructor:function(){var a=arguments.length;this._super(OjUrl,"_constructor",a?[arguments[0]]:[]);this._headers={};if(a>1){this.setData(arguments[1]);if(a>2){this.setContentType(arguments[2]);if(a>3){this.setMethod(arguments[3])}}}},ignoresCache:function(){if(arguments.length){this._ignores_cache=arguments[0]}return this._ignores_cache&&!this._headers["cache-control"]},isDelete:function(){return this._method==OjUrlRequest.DELETE},isGet:function(){return this._method==OjUrlRequest.GET},isHead:function(){return this._method==OjUrlRequest.HEAD},isMultiPart:function(){return this.getContentType()==OjUrlRequest.MULTIPART||!isEmpty(this._files)},isOptions:function(){return this._method==OjUrlRequest.OPTIONS},isPost:function(){return this._method==OjUrlRequest.POST},isPut:function(){return this._method==OjUrlRequest.PUT},isSafe:function(){return this.isGet()||this.isHead()||this.isOptions()},isUnsafe:function(){return !this.isSafe()},getHeader:function(a){return this._headers[a.toLowerCase()]},setHeader:function(a,b){this._headers[a.toLowerCase()]=b},unsetHeader:function(a){if(this._headers){delete this._headers[a.toLowerCase()]}},getContentType:function(){return this._headers["content-type"]?this._headers["content-type"]:OjUrlRequest.TEXT},setContentType:function(a){this._headers["content-type"]=a},setData:function(a){this._data=a;if(!this._headers["content-type"]){this.setContentType(OjUrlRequest.QUERY_STRING)}}},{urlRequest:function(a){if(isString(a)){return new OjUrlRequest(a)}if(isObject(a)&&a.is("OjUrlRequest")){return a}return new OjUrlRequest()},DELETE:"delete",GET:"get",HEAD:"head",OPTIONS:"options",POST:"post",PUT:"put",CSS:"text/css",QUERY_STRING:"application/x-www-form-urlencoded",HTML:"text/html",JS:"text/javascript",JSON:"application/json",MULTIPART:"multipart/form-data",TEXT:"text/plain",XML:"text/xml"});