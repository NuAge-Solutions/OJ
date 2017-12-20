!function(a,b){"object"==typeof exports&&"undefined"!=typeof module?module.exports=b():"function"==typeof define&&define.amd?define(b):a.moment=b()}(this,function(){"use strict";function a(){return Rd.apply(null,arguments)}function b(a){Rd=a}function c(a){return"[object Array]"===Object.prototype.toString.call(a)}function d(a){return a instanceof Date||"[object Date]"===Object.prototype.toString.call(a)}function e(a,b){var c,d=[];for(c=0;c<a.length;++c)d.push(b(a[c],c));return d}function f(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function g(a,b){for(var c in b)f(b,c)&&(a[c]=b[c]);return f(b,"toString")&&(a.toString=b.toString),f(b,"valueOf")&&(a.valueOf=b.valueOf),a}function h(a,b,c,d){return Da(a,b,c,d,!0).utc()}function i(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1}}function j(a){return null==a._pf&&(a._pf=i()),a._pf}function k(a){if(null==a._isValid){var b=j(a);a._isValid=!(isNaN(a._d.getTime())||!(b.overflow<0)||b.empty||b.invalidMonth||b.invalidWeekday||b.nullInput||b.invalidFormat||b.userInvalidated),a._strict&&(a._isValid=a._isValid&&0===b.charsLeftOver&&0===b.unusedTokens.length&&void 0===b.bigHour)}return a._isValid}function l(a){var b=h(NaN);return null!=a?g(j(b),a):j(b).userInvalidated=!0,b}function m(a){return void 0===a}function n(a,b){var c,d,e;if(m(b._isAMomentObject)||(a._isAMomentObject=b._isAMomentObject),m(b._i)||(a._i=b._i),m(b._f)||(a._f=b._f),m(b._l)||(a._l=b._l),m(b._strict)||(a._strict=b._strict),m(b._tzm)||(a._tzm=b._tzm),m(b._isUTC)||(a._isUTC=b._isUTC),m(b._offset)||(a._offset=b._offset),m(b._pf)||(a._pf=j(b)),m(b._locale)||(a._locale=b._locale),Td.length>0)for(c in Td)d=Td[c],e=b[d],m(e)||(a[d]=e);return a}function o(b){n(this,b),this._d=new Date(null!=b._d?b._d.getTime():NaN),Ud===!1&&(Ud=!0,a.updateOffset(this),Ud=!1)}function p(a){return a instanceof o||null!=a&&null!=a._isAMomentObject}function q(a){return 0>a?Math.ceil(a):Math.floor(a)}function r(a){var b=+a,c=0;return 0!==b&&isFinite(b)&&(c=q(b)),c}function s(a,b,c){var d,e=Math.min(a.length,b.length),f=Math.abs(a.length-b.length),g=0;for(d=0;e>d;d++)(c&&a[d]!==b[d]||!c&&r(a[d])!==r(b[d]))&&g++;return g+f}function t(){}function u(a){return a?a.toLowerCase().replace("_","-"):a}function v(a){for(var b,c,d,e,f=0;f<a.length;){for(e=u(a[f]).split("-"),b=e.length,c=u(a[f+1]),c=c?c.split("-"):null;b>0;){if(d=w(e.slice(0,b).join("-")))return d;if(c&&c.length>=b&&s(e,c,!0)>=b-1)break;b--}f++}return null}function w(a){var b=null;if(!Vd[a]&&"undefined"!=typeof module&&module&&module.exports)try{b=Sd._abbr,require("./locale/"+a),x(b)}catch(c){}return Vd[a]}function x(a,b){var c;return a&&(c=m(b)?z(a):y(a,b),c&&(Sd=c)),Sd._abbr}function y(a,b){return null!==b?(b.abbr=a,Vd[a]=Vd[a]||new t,Vd[a].set(b),x(a),Vd[a]):(delete Vd[a],null)}function z(a){var b;if(a&&a._locale&&a._locale._abbr&&(a=a._locale._abbr),!a)return Sd;if(!c(a)){if(b=w(a))return b;a=[a]}return v(a)}function A(a,b){var c=a.toLowerCase();Wd[c]=Wd[c+"s"]=Wd[b]=a}function B(a){return"string"==typeof a?Wd[a]||Wd[a.toLowerCase()]:void 0}function C(a){var b,c,d={};for(c in a)f(a,c)&&(b=B(c),b&&(d[b]=a[c]));return d}function D(a){return a instanceof Function||"[object Function]"===Object.prototype.toString.call(a)}function E(b,c){return function(d){return null!=d?(G(this,b,d),a.updateOffset(this,c),this):F(this,b)}}function F(a,b){return a.isValid()?a._d["get"+(a._isUTC?"UTC":"")+b]():NaN}function G(a,b,c){a.isValid()&&a._d["set"+(a._isUTC?"UTC":"")+b](c)}function H(a,b){var c;if("object"==typeof a)for(c in a)this.set(c,a[c]);else if(a=B(a),D(this[a]))return this[a](b);return this}function I(a,b,c){var d=""+Math.abs(a),e=b-d.length,f=a>=0;return(f?c?"+":"":"-")+Math.pow(10,Math.max(0,e)).toString().substr(1)+d}function J(a,b,c,d){var e=d;"string"==typeof d&&(e=function(){return this[d]()}),a&&($d[a]=e),b&&($d[b[0]]=function(){return I(e.apply(this,arguments),b[1],b[2])}),c&&($d[c]=function(){return this.localeData().ordinal(e.apply(this,arguments),a)})}function K(a){return a.match(/\[[\s\S]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function L(a){var b,c,d=a.match(Xd);for(b=0,c=d.length;c>b;b++)$d[d[b]]?d[b]=$d[d[b]]:d[b]=K(d[b]);return function(e){var f="";for(b=0;c>b;b++)f+=d[b]instanceof Function?d[b].call(e,a):d[b];return f}}function M(a,b){return a.isValid()?(b=N(b,a.localeData()),Zd[b]=Zd[b]||L(b),Zd[b](a)):a.localeData().invalidDate()}function N(a,b){function c(a){return b.longDateFormat(a)||a}var d=5;for(Yd.lastIndex=0;d>=0&&Yd.test(a);)a=a.replace(Yd,c),Yd.lastIndex=0,d-=1;return a}function O(a,b,c){qe[a]=D(b)?b:function(a,d){return a&&c?c:b}}function P(a,b){return f(qe,a)?qe[a](b._strict,b._locale):new RegExp(Q(a))}function Q(a){return R(a.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a,b,c,d,e){return b||c||d||e}))}function R(a){return a.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function S(a,b){var c,d=b;for("string"==typeof a&&(a=[a]),"number"==typeof b&&(d=function(a,c){c[b]=r(a)}),c=0;c<a.length;c++)re[a[c]]=d}function T(a,b){S(a,function(a,c,d,e){d._w=d._w||{},b(a,d._w,d,e)})}function U(a,b,c){null!=b&&f(re,a)&&re[a](b,c._a,c,a)}function V(a,b){return new Date(Date.UTC(a,b+1,0)).getUTCDate()}function W(a,b){return c(this._months)?this._months[a.month()]:this._months[Be.test(b)?"format":"standalone"][a.month()]}function X(a,b){return c(this._monthsShort)?this._monthsShort[a.month()]:this._monthsShort[Be.test(b)?"format":"standalone"][a.month()]}function Y(a,b,c){var d,e,f;for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),d=0;12>d;d++){if(e=h([2e3,d]),c&&!this._longMonthsParse[d]&&(this._longMonthsParse[d]=new RegExp("^"+this.months(e,"").replace(".","")+"$","i"),this._shortMonthsParse[d]=new RegExp("^"+this.monthsShort(e,"").replace(".","")+"$","i")),c||this._monthsParse[d]||(f="^"+this.months(e,"")+"|^"+this.monthsShort(e,""),this._monthsParse[d]=new RegExp(f.replace(".",""),"i")),c&&"MMMM"===b&&this._longMonthsParse[d].test(a))return d;if(c&&"MMM"===b&&this._shortMonthsParse[d].test(a))return d;if(!c&&this._monthsParse[d].test(a))return d}}function Z(a,b){var c;return a.isValid()?"string"==typeof b&&(b=a.localeData().monthsParse(b),"number"!=typeof b)?a:(c=Math.min(a.date(),V(a.year(),b)),a._d["set"+(a._isUTC?"UTC":"")+"Month"](b,c),a):a}function $(b){return null!=b?(Z(this,b),a.updateOffset(this,!0),this):F(this,"Month")}function _(){return V(this.year(),this.month())}function aa(a){return this._monthsParseExact?(f(this,"_monthsRegex")||ca.call(this),a?this._monthsShortStrictRegex:this._monthsShortRegex):this._monthsShortStrictRegex&&a?this._monthsShortStrictRegex:this._monthsShortRegex}function ba(a){return this._monthsParseExact?(f(this,"_monthsRegex")||ca.call(this),a?this._monthsStrictRegex:this._monthsRegex):this._monthsStrictRegex&&a?this._monthsStrictRegex:this._monthsRegex}function ca(){function a(a,b){return b.length-a.length}var b,c,d=[],e=[],f=[];for(b=0;12>b;b++)c=h([2e3,b]),d.push(this.monthsShort(c,"")),e.push(this.months(c,"")),f.push(this.months(c,"")),f.push(this.monthsShort(c,""));for(d.sort(a),e.sort(a),f.sort(a),b=0;12>b;b++)d[b]=R(d[b]),e[b]=R(e[b]),f[b]=R(f[b]);this._monthsRegex=new RegExp("^("+f.join("|")+")","i"),this._monthsShortRegex=this._monthsRegex,this._monthsStrictRegex=new RegExp("^("+e.join("|")+")$","i"),this._monthsShortStrictRegex=new RegExp("^("+d.join("|")+")$","i")}function da(a){var b,c=a._a;return c&&-2===j(a).overflow&&(b=c[te]<0||c[te]>11?te:c[ue]<1||c[ue]>V(c[se],c[te])?ue:c[ve]<0||c[ve]>24||24===c[ve]&&(0!==c[we]||0!==c[xe]||0!==c[ye])?ve:c[we]<0||c[we]>59?we:c[xe]<0||c[xe]>59?xe:c[ye]<0||c[ye]>999?ye:-1,j(a)._overflowDayOfYear&&(se>b||b>ue)&&(b=ue),j(a)._overflowWeeks&&-1===b&&(b=ze),j(a)._overflowWeekday&&-1===b&&(b=Ae),j(a).overflow=b),a}function ea(b){a.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+b)}function fa(a,b){var c=!0;return g(function(){return c&&(ea(a+"\nArguments: "+Array.prototype.slice.call(arguments).join(", ")+"\n"+(new Error).stack),c=!1),b.apply(this,arguments)},b)}function ga(a,b){Ge[a]||(ea(b),Ge[a]=!0)}function ha(a){var b,c,d,e,f,g,h=a._i,i=He.exec(h)||Ie.exec(h);if(i){for(j(a).iso=!0,b=0,c=Ke.length;c>b;b++)if(Ke[b][1].exec(i[1])){e=Ke[b][0],d=Ke[b][2]!==!1;break}if(null==e)return void(a._isValid=!1);if(i[3]){for(b=0,c=Le.length;c>b;b++)if(Le[b][1].exec(i[3])){f=(i[2]||" ")+Le[b][0];break}if(null==f)return void(a._isValid=!1)}if(!d&&null!=f)return void(a._isValid=!1);if(i[4]){if(!Je.exec(i[4]))return void(a._isValid=!1);g="Z"}a._f=e+(f||"")+(g||""),wa(a)}else a._isValid=!1}function ia(b){var c=Me.exec(b._i);return null!==c?void(b._d=new Date(+c[1])):(ha(b),void(b._isValid===!1&&(delete b._isValid,a.createFromInputFallback(b))))}function ja(a,b,c,d,e,f,g){var h=new Date(a,b,c,d,e,f,g);return 100>a&&a>=0&&isFinite(h.getFullYear())&&h.setFullYear(a),h}function ka(a){var b=new Date(Date.UTC.apply(null,arguments));return 100>a&&a>=0&&isFinite(b.getUTCFullYear())&&b.setUTCFullYear(a),b}function la(a){return ma(a)?366:365}function ma(a){return a%4===0&&a%100!==0||a%400===0}function na(){return ma(this.year())}function oa(a,b,c){var d=7+b-c,e=(7+ka(a,0,d).getUTCDay()-b)%7;return-e+d-1}function pa(a,b,c,d,e){var f,g,h=(7+c-d)%7,i=oa(a,d,e),j=1+7*(b-1)+h+i;return 0>=j?(f=a-1,g=la(f)+j):j>la(a)?(f=a+1,g=j-la(a)):(f=a,g=j),{year:f,dayOfYear:g}}function qa(a,b,c){var d,e,f=oa(a.year(),b,c),g=Math.floor((a.dayOfYear()-f-1)/7)+1;return 1>g?(e=a.year()-1,d=g+ra(e,b,c)):g>ra(a.year(),b,c)?(d=g-ra(a.year(),b,c),e=a.year()+1):(e=a.year(),d=g),{week:d,year:e}}function ra(a,b,c){var d=oa(a,b,c),e=oa(a+1,b,c);return(la(a)-d+e)/7}function sa(a,b,c){return null!=a?a:null!=b?b:c}function ta(b){var c=new Date(a.now());return b._useUTC?[c.getUTCFullYear(),c.getUTCMonth(),c.getUTCDate()]:[c.getFullYear(),c.getMonth(),c.getDate()]}function ua(a){var b,c,d,e,f=[];if(!a._d){for(d=ta(a),a._w&&null==a._a[ue]&&null==a._a[te]&&va(a),a._dayOfYear&&(e=sa(a._a[se],d[se]),a._dayOfYear>la(e)&&(j(a)._overflowDayOfYear=!0),c=ka(e,0,a._dayOfYear),a._a[te]=c.getUTCMonth(),a._a[ue]=c.getUTCDate()),b=0;3>b&&null==a._a[b];++b)a._a[b]=f[b]=d[b];for(;7>b;b++)a._a[b]=f[b]=null==a._a[b]?2===b?1:0:a._a[b];24===a._a[ve]&&0===a._a[we]&&0===a._a[xe]&&0===a._a[ye]&&(a._nextDay=!0,a._a[ve]=0),a._d=(a._useUTC?ka:ja).apply(null,f),null!=a._tzm&&a._d.setUTCMinutes(a._d.getUTCMinutes()-a._tzm),a._nextDay&&(a._a[ve]=24)}}function va(a){var b,c,d,e,f,g,h,i;b=a._w,null!=b.GG||null!=b.W||null!=b.E?(f=1,g=4,c=sa(b.GG,a._a[se],qa(Ea(),1,4).year),d=sa(b.W,1),e=sa(b.E,1),(1>e||e>7)&&(i=!0)):(f=a._locale._week.dow,g=a._locale._week.doy,c=sa(b.gg,a._a[se],qa(Ea(),f,g).year),d=sa(b.w,1),null!=b.d?(e=b.d,(0>e||e>6)&&(i=!0)):null!=b.e?(e=b.e+f,(b.e<0||b.e>6)&&(i=!0)):e=f),1>d||d>ra(c,f,g)?j(a)._overflowWeeks=!0:null!=i?j(a)._overflowWeekday=!0:(h=pa(c,d,e,f,g),a._a[se]=h.year,a._dayOfYear=h.dayOfYear)}function wa(b){if(b._f===a.ISO_8601)return void ha(b);b._a=[],j(b).empty=!0;var c,d,e,f,g,h=""+b._i,i=h.length,k=0;for(e=N(b._f,b._locale).match(Xd)||[],c=0;c<e.length;c++)f=e[c],d=(h.match(P(f,b))||[])[0],d&&(g=h.substr(0,h.indexOf(d)),g.length>0&&j(b).unusedInput.push(g),h=h.slice(h.indexOf(d)+d.length),k+=d.length),$d[f]?(d?j(b).empty=!1:j(b).unusedTokens.push(f),U(f,d,b)):b._strict&&!d&&j(b).unusedTokens.push(f);j(b).charsLeftOver=i-k,h.length>0&&j(b).unusedInput.push(h),j(b).bigHour===!0&&b._a[ve]<=12&&b._a[ve]>0&&(j(b).bigHour=void 0),b._a[ve]=xa(b._locale,b._a[ve],b._meridiem),ua(b),da(b)}function xa(a,b,c){var d;return null==c?b:null!=a.meridiemHour?a.meridiemHour(b,c):null!=a.isPM?(d=a.isPM(c),d&&12>b&&(b+=12),d||12!==b||(b=0),b):b}function ya(a){var b,c,d,e,f;if(0===a._f.length)return j(a).invalidFormat=!0,void(a._d=new Date(NaN));for(e=0;e<a._f.length;e++)f=0,b=n({},a),null!=a._useUTC&&(b._useUTC=a._useUTC),b._f=a._f[e],wa(b),k(b)&&(f+=j(b).charsLeftOver,f+=10*j(b).unusedTokens.length,j(b).score=f,(null==d||d>f)&&(d=f,c=b));g(a,c||b)}function za(a){if(!a._d){var b=C(a._i);a._a=e([b.year,b.month,b.day||b.date,b.hour,b.minute,b.second,b.millisecond],function(a){return a&&parseInt(a,10)}),ua(a)}}function Aa(a){var b=new o(da(Ba(a)));return b._nextDay&&(b.add(1,"d"),b._nextDay=void 0),b}function Ba(a){var b=a._i,e=a._f;return a._locale=a._locale||z(a._l),null===b||void 0===e&&""===b?l({nullInput:!0}):("string"==typeof b&&(a._i=b=a._locale.preparse(b)),p(b)?new o(da(b)):(c(e)?ya(a):e?wa(a):d(b)?a._d=b:Ca(a),k(a)||(a._d=null),a))}function Ca(b){var f=b._i;void 0===f?b._d=new Date(a.now()):d(f)?b._d=new Date(+f):"string"==typeof f?ia(b):c(f)?(b._a=e(f.slice(0),function(a){return parseInt(a,10)}),ua(b)):"object"==typeof f?za(b):"number"==typeof f?b._d=new Date(f):a.createFromInputFallback(b)}function Da(a,b,c,d,e){var f={};return"boolean"==typeof c&&(d=c,c=void 0),f._isAMomentObject=!0,f._useUTC=f._isUTC=e,f._l=c,f._i=a,f._f=b,f._strict=d,Aa(f)}function Ea(a,b,c,d){return Da(a,b,c,d,!1)}function Fa(a,b){var d,e;if(1===b.length&&c(b[0])&&(b=b[0]),!b.length)return Ea();for(d=b[0],e=1;e<b.length;++e)(!b[e].isValid()||b[e][a](d))&&(d=b[e]);return d}function Ga(){var a=[].slice.call(arguments,0);return Fa("isBefore",a)}function Ha(){var a=[].slice.call(arguments,0);return Fa("isAfter",a)}function Ia(a){var b=C(a),c=b.year||0,d=b.quarter||0,e=b.month||0,f=b.week||0,g=b.day||0,h=b.hour||0,i=b.minute||0,j=b.second||0,k=b.millisecond||0;this._milliseconds=+k+1e3*j+6e4*i+36e5*h,this._days=+g+7*f,this._months=+e+3*d+12*c,this._data={},this._locale=z(),this._bubble()}function Ja(a){return a instanceof Ia}function Ka(a,b){J(a,0,0,function(){var a=this.utcOffset(),c="+";return 0>a&&(a=-a,c="-"),c+I(~~(a/60),2)+b+I(~~a%60,2)})}function La(a,b){var c=(b||"").match(a)||[],d=c[c.length-1]||[],e=(d+"").match(Re)||["-",0,0],f=+(60*e[1])+r(e[2]);return"+"===e[0]?f:-f}function Ma(b,c){var e,f;return c._isUTC?(e=c.clone(),f=(p(b)||d(b)?+b:+Ea(b))-+e,e._d.setTime(+e._d+f),a.updateOffset(e,!1),e):Ea(b).local()}function Na(a){return 15*-Math.round(a._d.getTimezoneOffset()/15)}function Oa(b,c){var d,e=this._offset||0;return this.isValid()?null!=b?("string"==typeof b?b=La(ne,b):Math.abs(b)<16&&(b=60*b),!this._isUTC&&c&&(d=Na(this)),this._offset=b,this._isUTC=!0,null!=d&&this.add(d,"m"),e!==b&&(!c||this._changeInProgress?cb(this,Za(b-e,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,a.updateOffset(this,!0),this._changeInProgress=null)),this):this._isUTC?e:Na(this):null!=b?this:NaN}function Pa(a,b){return null!=a?("string"!=typeof a&&(a=-a),this.utcOffset(a,b),this):-this.utcOffset()}function Qa(a){return this.utcOffset(0,a)}function Ra(a){return this._isUTC&&(this.utcOffset(0,a),this._isUTC=!1,a&&this.subtract(Na(this),"m")),this}function Sa(){return this._tzm?this.utcOffset(this._tzm):"string"==typeof this._i&&this.utcOffset(La(me,this._i)),this}function Ta(a){return this.isValid()?(a=a?Ea(a).utcOffset():0,(this.utcOffset()-a)%60===0):!1}function Ua(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()}function Va(){if(!m(this._isDSTShifted))return this._isDSTShifted;var a={};if(n(a,this),a=Ba(a),a._a){var b=a._isUTC?h(a._a):Ea(a._a);this._isDSTShifted=this.isValid()&&s(a._a,b.toArray())>0}else this._isDSTShifted=!1;return this._isDSTShifted}function Wa(){return this.isValid()?!this._isUTC:!1}function Xa(){return this.isValid()?this._isUTC:!1}function Ya(){return this.isValid()?this._isUTC&&0===this._offset:!1}function Za(a,b){var c,d,e,g=a,h=null;return Ja(a)?g={ms:a._milliseconds,d:a._days,M:a._months}:"number"==typeof a?(g={},b?g[b]=a:g.milliseconds=a):(h=Se.exec(a))?(c="-"===h[1]?-1:1,g={y:0,d:r(h[ue])*c,h:r(h[ve])*c,m:r(h[we])*c,s:r(h[xe])*c,ms:r(h[ye])*c}):(h=Te.exec(a))?(c="-"===h[1]?-1:1,g={y:$a(h[2],c),M:$a(h[3],c),d:$a(h[4],c),h:$a(h[5],c),m:$a(h[6],c),s:$a(h[7],c),w:$a(h[8],c)}):null==g?g={}:"object"==typeof g&&("from"in g||"to"in g)&&(e=ab(Ea(g.from),Ea(g.to)),g={},g.ms=e.milliseconds,g.M=e.months),d=new Ia(g),Ja(a)&&f(a,"_locale")&&(d._locale=a._locale),d}function $a(a,b){var c=a&&parseFloat(a.replace(",","."));return(isNaN(c)?0:c)*b}function _a(a,b){var c={milliseconds:0,months:0};return c.months=b.month()-a.month()+12*(b.year()-a.year()),a.clone().add(c.months,"M").isAfter(b)&&--c.months,c.milliseconds=+b-+a.clone().add(c.months,"M"),c}function ab(a,b){var c;return a.isValid()&&b.isValid()?(b=Ma(b,a),a.isBefore(b)?c=_a(a,b):(c=_a(b,a),c.milliseconds=-c.milliseconds,c.months=-c.months),c):{milliseconds:0,months:0}}function bb(a,b){return function(c,d){var e,f;return null===d||isNaN(+d)||(ga(b,"moment()."+b+"(period, number) is deprecated. Please use moment()."+b+"(number, period)."),f=c,c=d,d=f),c="string"==typeof c?+c:c,e=Za(c,d),cb(this,e,a),this}}function cb(b,c,d,e){var f=c._milliseconds,g=c._days,h=c._months;b.isValid()&&(e=null==e?!0:e,f&&b._d.setTime(+b._d+f*d),g&&G(b,"Date",F(b,"Date")+g*d),h&&Z(b,F(b,"Month")+h*d),e&&a.updateOffset(b,g||h))}function db(a,b){var c=a||Ea(),d=Ma(c,this).startOf("day"),e=this.diff(d,"days",!0),f=-6>e?"sameElse":-1>e?"lastWeek":0>e?"lastDay":1>e?"sameDay":2>e?"nextDay":7>e?"nextWeek":"sameElse",g=b&&(D(b[f])?b[f]():b[f]);return this.format(g||this.localeData().calendar(f,this,Ea(c)))}function eb(){return new o(this)}function fb(a,b){var c=p(a)?a:Ea(a);return this.isValid()&&c.isValid()?(b=B(m(b)?"millisecond":b),"millisecond"===b?+this>+c:+c<+this.clone().startOf(b)):!1}function gb(a,b){var c=p(a)?a:Ea(a);return this.isValid()&&c.isValid()?(b=B(m(b)?"millisecond":b),"millisecond"===b?+c>+this:+this.clone().endOf(b)<+c):!1}function hb(a,b,c){return this.isAfter(a,c)&&this.isBefore(b,c)}function ib(a,b){var c,d=p(a)?a:Ea(a);return this.isValid()&&d.isValid()?(b=B(b||"millisecond"),"millisecond"===b?+this===+d:(c=+d,+this.clone().startOf(b)<=c&&c<=+this.clone().endOf(b))):!1}function jb(a,b){return this.isSame(a,b)||this.isAfter(a,b)}function kb(a,b){return this.isSame(a,b)||this.isBefore(a,b)}function lb(a,b,c){var d,e,f,g;return this.isValid()?(d=Ma(a,this),d.isValid()?(e=6e4*(d.utcOffset()-this.utcOffset()),b=B(b),"year"===b||"month"===b||"quarter"===b?(g=mb(this,d),"quarter"===b?g/=3:"year"===b&&(g/=12)):(f=this-d,g="second"===b?f/1e3:"minute"===b?f/6e4:"hour"===b?f/36e5:"day"===b?(f-e)/864e5:"week"===b?(f-e)/6048e5:f),c?g:q(g)):NaN):NaN}function mb(a,b){var c,d,e=12*(b.year()-a.year())+(b.month()-a.month()),f=a.clone().add(e,"months");return 0>b-f?(c=a.clone().add(e-1,"months"),d=(b-f)/(f-c)):(c=a.clone().add(e+1,"months"),d=(b-f)/(c-f)),-(e+d)}function nb(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")}function ob(){var a=this.clone().utc();return 0<a.year()&&a.year()<=9999?D(Date.prototype.toISOString)?this.toDate().toISOString():M(a,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):M(a,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")}function pb(b){var c=M(this,b||a.defaultFormat);return this.localeData().postformat(c)}function qb(a,b){return this.isValid()&&(p(a)&&a.isValid()||Ea(a).isValid())?Za({to:this,from:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function rb(a){return this.from(Ea(),a)}function sb(a,b){return this.isValid()&&(p(a)&&a.isValid()||Ea(a).isValid())?Za({from:this,to:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function tb(a){return this.to(Ea(),a)}function ub(a){var b;return void 0===a?this._locale._abbr:(b=z(a),null!=b&&(this._locale=b),this)}function vb(){return this._locale}function wb(a){switch(a=B(a)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===a&&this.weekday(0),"isoWeek"===a&&this.isoWeekday(1),"quarter"===a&&this.month(3*Math.floor(this.month()/3)),this}function xb(a){return a=B(a),void 0===a||"millisecond"===a?this:this.startOf(a).add(1,"isoWeek"===a?"week":a).subtract(1,"ms")}function yb(){return+this._d-6e4*(this._offset||0)}function zb(){return Math.floor(+this/1e3)}function Ab(){return this._offset?new Date(+this):this._d}function Bb(){var a=this;return[a.year(),a.month(),a.date(),a.hour(),a.minute(),a.second(),a.millisecond()]}function Cb(){var a=this;return{years:a.year(),months:a.month(),date:a.date(),hours:a.hours(),minutes:a.minutes(),seconds:a.seconds(),milliseconds:a.milliseconds()}}function Db(){return this.isValid()?this.toISOString():"null"}function Eb(){return k(this)}function Fb(){return g({},j(this))}function Gb(){return j(this).overflow}function Hb(){return{input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict}}function Ib(a,b){J(0,[a,a.length],0,b)}function Jb(a){return Nb.call(this,a,this.week(),this.weekday(),this.localeData()._week.dow,this.localeData()._week.doy)}function Kb(a){return Nb.call(this,a,this.isoWeek(),this.isoWeekday(),1,4)}function Lb(){return ra(this.year(),1,4)}function Mb(){var a=this.localeData()._week;return ra(this.year(),a.dow,a.doy)}function Nb(a,b,c,d,e){var f;return null==a?qa(this,d,e).year:(f=ra(a,d,e),b>f&&(b=f),Ob.call(this,a,b,c,d,e))}function Ob(a,b,c,d,e){var f=pa(a,b,c,d,e),g=ka(f.year,0,f.dayOfYear);return this.year(g.getUTCFullYear()),this.month(g.getUTCMonth()),this.date(g.getUTCDate()),this}function Pb(a){return null==a?Math.ceil((this.month()+1)/3):this.month(3*(a-1)+this.month()%3)}function Qb(a){return qa(a,this._week.dow,this._week.doy).week}function Rb(){return this._week.dow}function Sb(){return this._week.doy}function Tb(a){var b=this.localeData().week(this);return null==a?b:this.add(7*(a-b),"d")}function Ub(a){var b=qa(this,1,4).week;return null==a?b:this.add(7*(a-b),"d")}function Vb(a,b){return"string"!=typeof a?a:isNaN(a)?(a=b.weekdaysParse(a),"number"==typeof a?a:null):parseInt(a,10)}function Wb(a,b){return c(this._weekdays)?this._weekdays[a.day()]:this._weekdays[this._weekdays.isFormat.test(b)?"format":"standalone"][a.day()]}function Xb(a){return this._weekdaysShort[a.day()]}function Yb(a){return this._weekdaysMin[a.day()]}function Zb(a,b,c){var d,e,f;for(this._weekdaysParse||(this._weekdaysParse=[],this._minWeekdaysParse=[],this._shortWeekdaysParse=[],this._fullWeekdaysParse=[]),d=0;7>d;d++){if(e=Ea([2e3,1]).day(d),c&&!this._fullWeekdaysParse[d]&&(this._fullWeekdaysParse[d]=new RegExp("^"+this.weekdays(e,"").replace(".",".?")+"$","i"),this._shortWeekdaysParse[d]=new RegExp("^"+this.weekdaysShort(e,"").replace(".",".?")+"$","i"),this._minWeekdaysParse[d]=new RegExp("^"+this.weekdaysMin(e,"").replace(".",".?")+"$","i")),this._weekdaysParse[d]||(f="^"+this.weekdays(e,"")+"|^"+this.weekdaysShort(e,"")+"|^"+this.weekdaysMin(e,""),this._weekdaysParse[d]=new RegExp(f.replace(".",""),"i")),c&&"dddd"===b&&this._fullWeekdaysParse[d].test(a))return d;if(c&&"ddd"===b&&this._shortWeekdaysParse[d].test(a))return d;if(c&&"dd"===b&&this._minWeekdaysParse[d].test(a))return d;if(!c&&this._weekdaysParse[d].test(a))return d}}function $b(a){if(!this.isValid())return null!=a?this:NaN;var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?(a=Vb(a,this.localeData()),this.add(a-b,"d")):b}function _b(a){if(!this.isValid())return null!=a?this:NaN;var b=(this.day()+7-this.localeData()._week.dow)%7;return null==a?b:this.add(a-b,"d")}function ac(a){return this.isValid()?null==a?this.day()||7:this.day(this.day()%7?a:a-7):null!=a?this:NaN}function bc(a){var b=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==a?b:this.add(a-b,"d")}function cc(){return this.hours()%12||12}function dc(a,b){J(a,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),b)})}function ec(a,b){return b._meridiemParse}function fc(a){return"p"===(a+"").toLowerCase().charAt(0)}function gc(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"}function hc(a,b){b[ye]=r(1e3*("0."+a))}function ic(){return this._isUTC?"UTC":""}function jc(){return this._isUTC?"Coordinated Universal Time":""}function kc(a){return Ea(1e3*a)}function lc(){return Ea.apply(null,arguments).parseZone()}function mc(a,b,c){var d=this._calendar[a];return D(d)?d.call(b,c):d}function nc(a){var b=this._longDateFormat[a],c=this._longDateFormat[a.toUpperCase()];return b||!c?b:(this._longDateFormat[a]=c.replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a])}function oc(){return this._invalidDate}function pc(a){return this._ordinal.replace("%d",a)}function qc(a){return a}function rc(a,b,c,d){var e=this._relativeTime[c];return D(e)?e(a,b,c,d):e.replace(/%d/i,a)}function sc(a,b){var c=this._relativeTime[a>0?"future":"past"];return D(c)?c(b):c.replace(/%s/i,b)}function tc(a){var b,c;for(c in a)b=a[c],D(b)?this[c]=b:this["_"+c]=b;this._ordinalParseLenient=new RegExp(this._ordinalParse.source+"|"+/\d{1,2}/.source)}function uc(a,b,c,d){var e=z(),f=h().set(d,b);return e[c](f,a)}function vc(a,b,c,d,e){if("number"==typeof a&&(b=a,a=void 0),a=a||"",null!=b)return uc(a,b,c,e);var f,g=[];for(f=0;d>f;f++)g[f]=uc(a,f,c,e);return g}function wc(a,b){return vc(a,b,"months",12,"month")}function xc(a,b){return vc(a,b,"monthsShort",12,"month")}function yc(a,b){return vc(a,b,"weekdays",7,"day")}function zc(a,b){return vc(a,b,"weekdaysShort",7,"day")}function Ac(a,b){return vc(a,b,"weekdaysMin",7,"day")}function Bc(){var a=this._data;return this._milliseconds=qf(this._milliseconds),this._days=qf(this._days),this._months=qf(this._months),a.milliseconds=qf(a.milliseconds),a.seconds=qf(a.seconds),a.minutes=qf(a.minutes),a.hours=qf(a.hours),a.months=qf(a.months),a.years=qf(a.years),this}function Cc(a,b,c,d){var e=Za(b,c);return a._milliseconds+=d*e._milliseconds,a._days+=d*e._days,a._months+=d*e._months,a._bubble()}function Dc(a,b){return Cc(this,a,b,1)}function Ec(a,b){return Cc(this,a,b,-1)}function Fc(a){return 0>a?Math.floor(a):Math.ceil(a)}function Gc(){var a,b,c,d,e,f=this._milliseconds,g=this._days,h=this._months,i=this._data;return f>=0&&g>=0&&h>=0||0>=f&&0>=g&&0>=h||(f+=864e5*Fc(Ic(h)+g),g=0,h=0),i.milliseconds=f%1e3,a=q(f/1e3),i.seconds=a%60,b=q(a/60),i.minutes=b%60,c=q(b/60),i.hours=c%24,g+=q(c/24),e=q(Hc(g)),h+=e,g-=Fc(Ic(e)),d=q(h/12),h%=12,i.days=g,i.months=h,i.years=d,this}function Hc(a){return 4800*a/146097}function Ic(a){return 146097*a/4800}function Jc(a){var b,c,d=this._milliseconds;if(a=B(a),"month"===a||"year"===a)return b=this._days+d/864e5,c=this._months+Hc(b),"month"===a?c:c/12;switch(b=this._days+Math.round(Ic(this._months)),a){case"week":return b/7+d/6048e5;case"day":return b+d/864e5;case"hour":return 24*b+d/36e5;case"minute":return 1440*b+d/6e4;case"second":return 86400*b+d/1e3;case"millisecond":return Math.floor(864e5*b)+d;default:throw new Error("Unknown unit "+a)}}function Kc(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*r(this._months/12)}function Lc(a){return function(){return this.as(a)}}function Mc(a){return a=B(a),this[a+"s"]()}function Nc(a){return function(){return this._data[a]}}function Oc(){return q(this.days()/7)}function Pc(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)}function Qc(a,b,c){var d=Za(a).abs(),e=Gf(d.as("s")),f=Gf(d.as("m")),g=Gf(d.as("h")),h=Gf(d.as("d")),i=Gf(d.as("M")),j=Gf(d.as("y")),k=e<Hf.s&&["s",e]||1>=f&&["m"]||f<Hf.m&&["mm",f]||1>=g&&["h"]||g<Hf.h&&["hh",g]||1>=h&&["d"]||h<Hf.d&&["dd",h]||1>=i&&["M"]||i<Hf.M&&["MM",i]||1>=j&&["y"]||["yy",j];return k[2]=b,k[3]=+a>0,k[4]=c,Pc.apply(null,k)}function Rc(a,b){return void 0===Hf[a]?!1:void 0===b?Hf[a]:(Hf[a]=b,!0)}function Sc(a){var b=this.localeData(),c=Qc(this,!a,b);return a&&(c=b.pastFuture(+this,c)),b.postformat(c)}function Tc(){var a,b,c,d=If(this._milliseconds)/1e3,e=If(this._days),f=If(this._months);a=q(d/60),b=q(a/60),d%=60,a%=60,c=q(f/12),f%=12;var g=c,h=f,i=e,j=b,k=a,l=d,m=this.asSeconds();return m?(0>m?"-":"")+"P"+(g?g+"Y":"")+(h?h+"M":"")+(i?i+"D":"")+(j||k||l?"T":"")+(j?j+"H":"")+(k?k+"M":"")+(l?l+"S":""):"P0D"}
//! moment.js locale configuration
//! locale : belarusian (be)
//! author : Dmitry Demidov : https://github.com/demidov91
//! author: Praleska: http://praleska.pro/
//! Author : Menelion Elensúle : https://github.com/Oire
function Uc(a,b){var c=a.split("_");return b%10===1&&b%100!==11?c[0]:b%10>=2&&4>=b%10&&(10>b%100||b%100>=20)?c[1]:c[2]}function Vc(a,b,c){var d={mm:b?"хвіліна_хвіліны_хвілін":"хвіліну_хвіліны_хвілін",hh:b?"гадзіна_гадзіны_гадзін":"гадзіну_гадзіны_гадзін",dd:"дзень_дні_дзён",MM:"месяц_месяцы_месяцаў",yy:"год_гады_гадоў"};return"m"===c?b?"хвіліна":"хвіліну":"h"===c?b?"гадзіна":"гадзіну":a+" "+Uc(d[c],+a)}
//! moment.js locale configuration
//! locale : breton (br)
//! author : Jean-Baptiste Le Duigou : https://github.com/jbleduigou
function Wc(a,b,c){var d={mm:"munutenn",MM:"miz",dd:"devezh"};return a+" "+Zc(d[c],a)}function Xc(a){switch(Yc(a)){case 1:case 3:case 4:case 5:case 9:return a+" bloaz";default:return a+" vloaz"}}function Yc(a){return a>9?Yc(a%10):a}function Zc(a,b){return 2===b?$c(a):a}function $c(a){var b={m:"v",b:"v",d:"z"};return void 0===b[a.charAt(0)]?a:b[a.charAt(0)]+a.substring(1)}
//! moment.js locale configuration
//! locale : bosnian (bs)
//! author : Nedim Cholich : https://github.com/frontyard
//! based on (hr) translation by Bojan Marković
function _c(a,b,c){var d=a+" ";switch(c){case"m":return b?"jedna minuta":"jedne minute";case"mm":return d+=1===a?"minuta":2===a||3===a||4===a?"minute":"minuta";case"h":return b?"jedan sat":"jednog sata";case"hh":return d+=1===a?"sat":2===a||3===a||4===a?"sata":"sati";case"dd":return d+=1===a?"dan":"dana";case"MM":return d+=1===a?"mjesec":2===a||3===a||4===a?"mjeseca":"mjeseci";case"yy":return d+=1===a?"godina":2===a||3===a||4===a?"godine":"godina"}}function ad(a){return a>1&&5>a&&1!==~~(a/10)}function bd(a,b,c,d){var e=a+" ";switch(c){case"s":return b||d?"pár sekund":"pár sekundami";case"m":return b?"minuta":d?"minutu":"minutou";case"mm":return b||d?e+(ad(a)?"minuty":"minut"):e+"minutami";break;case"h":return b?"hodina":d?"hodinu":"hodinou";case"hh":return b||d?e+(ad(a)?"hodiny":"hodin"):e+"hodinami";break;case"d":return b||d?"den":"dnem";case"dd":return b||d?e+(ad(a)?"dny":"dní"):e+"dny";break;case"M":return b||d?"měsíc":"měsícem";case"MM":return b||d?e+(ad(a)?"měsíce":"měsíců"):e+"měsíci";break;case"y":return b||d?"rok":"rokem";case"yy":return b||d?e+(ad(a)?"roky":"let"):e+"lety"}}
//! moment.js locale configuration
//! locale : austrian german (de-at)
//! author : lluchs : https://github.com/lluchs
//! author: Menelion Elensúle: https://github.com/Oire
//! author : Martin Groller : https://github.com/MadMG
//! author : Mikolaj Dadela : https://github.com/mik01aj
function cd(a,b,c,d){var e={m:["eine Minute","einer Minute"],h:["eine Stunde","einer Stunde"],d:["ein Tag","einem Tag"],dd:[a+" Tage",a+" Tagen"],M:["ein Monat","einem Monat"],MM:[a+" Monate",a+" Monaten"],y:["ein Jahr","einem Jahr"],yy:[a+" Jahre",a+" Jahren"]};return b?e[c][0]:e[c][1]}
//! moment.js locale configuration
//! locale : german (de)
//! author : lluchs : https://github.com/lluchs
//! author: Menelion Elensúle: https://github.com/Oire
//! author : Mikolaj Dadela : https://github.com/mik01aj
function dd(a,b,c,d){var e={m:["eine Minute","einer Minute"],h:["eine Stunde","einer Stunde"],d:["ein Tag","einem Tag"],dd:[a+" Tage",a+" Tagen"],M:["ein Monat","einem Monat"],MM:[a+" Monate",a+" Monaten"],y:["ein Jahr","einem Jahr"],yy:[a+" Jahre",a+" Jahren"]};return b?e[c][0]:e[c][1]}
//! moment.js locale configuration
//! locale : estonian (et)
//! author : Henry Kehlmann : https://github.com/madhenry
//! improvements : Illimar Tambek : https://github.com/ragulka
function ed(a,b,c,d){var e={s:["mõne sekundi","mõni sekund","paar sekundit"],m:["ühe minuti","üks minut"],mm:[a+" minuti",a+" minutit"],h:["ühe tunni","tund aega","üks tund"],hh:[a+" tunni",a+" tundi"],d:["ühe päeva","üks päev"],M:["kuu aja","kuu aega","üks kuu"],MM:[a+" kuu",a+" kuud"],y:["ühe aasta","aasta","üks aasta"],yy:[a+" aasta",a+" aastat"]};return b?e[c][2]?e[c][2]:e[c][1]:d?e[c][0]:e[c][1]}function fd(a,b,c,d){var e="";switch(c){case"s":return d?"muutaman sekunnin":"muutama sekunti";case"m":return d?"minuutin":"minuutti";case"mm":e=d?"minuutin":"minuuttia";break;case"h":return d?"tunnin":"tunti";case"hh":e=d?"tunnin":"tuntia";break;case"d":return d?"päivän":"päivä";case"dd":e=d?"päivän":"päivää";break;case"M":return d?"kuukauden":"kuukausi";case"MM":e=d?"kuukauden":"kuukautta";break;case"y":return d?"vuoden":"vuosi";case"yy":e=d?"vuoden":"vuotta"}return e=gd(a,d)+" "+e}function gd(a,b){return 10>a?b?fg[a]:eg[a]:a}
//! moment.js locale configuration
//! locale : hrvatski (hr)
//! author : Bojan Marković : https://github.com/bmarkovic
function hd(a,b,c){var d=a+" ";switch(c){case"m":return b?"jedna minuta":"jedne minute";case"mm":return d+=1===a?"minuta":2===a||3===a||4===a?"minute":"minuta";case"h":return b?"jedan sat":"jednog sata";case"hh":return d+=1===a?"sat":2===a||3===a||4===a?"sata":"sati";case"dd":return d+=1===a?"dan":"dana";case"MM":return d+=1===a?"mjesec":2===a||3===a||4===a?"mjeseca":"mjeseci";case"yy":return d+=1===a?"godina":2===a||3===a||4===a?"godine":"godina"}}function id(a,b,c,d){var e=a;switch(c){case"s":return d||b?"néhány másodperc":"néhány másodperce";case"m":return"egy"+(d||b?" perc":" perce");case"mm":return e+(d||b?" perc":" perce");case"h":return"egy"+(d||b?" óra":" órája");case"hh":return e+(d||b?" óra":" órája");case"d":return"egy"+(d||b?" nap":" napja");case"dd":return e+(d||b?" nap":" napja");case"M":return"egy"+(d||b?" hónap":" hónapja");case"MM":return e+(d||b?" hónap":" hónapja");case"y":return"egy"+(d||b?" év":" éve");case"yy":return e+(d||b?" év":" éve")}return""}function jd(a){return(a?"":"[múlt] ")+"["+pg[this.day()]+"] LT[-kor]"}
//! moment.js locale configuration
//! locale : icelandic (is)
//! author : Hinrik Örn Sigurðsson : https://github.com/hinrik
function kd(a){return a%100===11?!0:a%10===1?!1:!0}function ld(a,b,c,d){var e=a+" ";switch(c){case"s":return b||d?"nokkrar sekúndur":"nokkrum sekúndum";case"m":return b?"mínúta":"mínútu";case"mm":return kd(a)?e+(b||d?"mínútur":"mínútum"):b?e+"mínúta":e+"mínútu";case"hh":return kd(a)?e+(b||d?"klukkustundir":"klukkustundum"):e+"klukkustund";case"d":return b?"dagur":d?"dag":"degi";case"dd":return kd(a)?b?e+"dagar":e+(d?"daga":"dögum"):b?e+"dagur":e+(d?"dag":"degi");case"M":return b?"mánuður":d?"mánuð":"mánuði";case"MM":return kd(a)?b?e+"mánuðir":e+(d?"mánuði":"mánuðum"):b?e+"mánuður":e+(d?"mánuð":"mánuði");case"y":return b||d?"ár":"ári";case"yy":return kd(a)?e+(b||d?"ár":"árum"):e+(b||d?"ár":"ári")}}
//! moment.js locale configuration
//! locale : Luxembourgish (lb)
//! author : mweimerskirch : https://github.com/mweimerskirch, David Raison : https://github.com/kwisatz
function md(a,b,c,d){var e={m:["eng Minutt","enger Minutt"],h:["eng Stonn","enger Stonn"],d:["een Dag","engem Dag"],M:["ee Mount","engem Mount"],y:["ee Joer","engem Joer"]};return b?e[c][0]:e[c][1]}function nd(a){var b=a.substr(0,a.indexOf(" "));return pd(b)?"a "+a:"an "+a}function od(a){var b=a.substr(0,a.indexOf(" "));return pd(b)?"viru "+a:"virun "+a}function pd(a){if(a=parseInt(a,10),isNaN(a))return!1;if(0>a)return!0;if(10>a)return a>=4&&7>=a?!0:!1;if(100>a){var b=a%10,c=a/10;return pd(0===b?c:b)}if(1e4>a){for(;a>=10;)a/=10;return pd(a)}return a/=1e3,pd(a)}function qd(a,b,c,d){return b?"kelios sekundės":d?"kelių sekundžių":"kelias sekundes"}function rd(a,b,c,d){return b?td(c)[0]:d?td(c)[1]:td(c)[2]}function sd(a){return a%10===0||a>10&&20>a}function td(a){return rg[a].split("_")}function ud(a,b,c,d){var e=a+" ";return 1===a?e+rd(a,b,c[0],d):b?e+(sd(a)?td(c)[1]:td(c)[0]):d?e+td(c)[1]:e+(sd(a)?td(c)[1]:td(c)[2])}function vd(a,b,c){return c?b%10===1&&11!==b?a[2]:a[3]:b%10===1&&11!==b?a[0]:a[1]}function wd(a,b,c){return a+" "+vd(sg[c],a,b)}function xd(a,b,c){return vd(sg[c],a,b)}function yd(a,b){return b?"dažas sekundes":"dažām sekundēm"}function zd(a,b,c,d){var e="";if(b)switch(c){case"s":e="काही सेकंद";break;case"m":e="एक मिनिट";break;case"mm":e="%d मिनिटे";break;case"h":e="एक तास";break;case"hh":e="%d तास";break;case"d":e="एक दिवस";break;case"dd":e="%d दिवस";break;case"M":e="एक महिना";break;case"MM":e="%d महिने";break;case"y":e="एक वर्ष";break;case"yy":e="%d वर्षे"}else switch(c){case"s":e="काही सेकंदां";break;case"m":e="एका मिनिटा";break;case"mm":e="%d मिनिटां";break;case"h":e="एका तासा";break;case"hh":e="%d तासां";break;case"d":e="एका दिवसा";break;case"dd":e="%d दिवसां";break;case"M":e="एका महिन्या";break;case"MM":e="%d महिन्यां";break;case"y":e="एका वर्षा";break;case"yy":e="%d वर्षां"}return e.replace(/%d/i,a)}function Ad(a){return 5>a%10&&a%10>1&&~~(a/10)%10!==1}function Bd(a,b,c){var d=a+" ";switch(c){case"m":return b?"minuta":"minutę";case"mm":return d+(Ad(a)?"minuty":"minut");case"h":return b?"godzina":"godzinę";case"hh":return d+(Ad(a)?"godziny":"godzin");case"MM":return d+(Ad(a)?"miesiące":"miesięcy");case"yy":return d+(Ad(a)?"lata":"lat")}}
//! moment.js locale configuration
//! locale : romanian (ro)
//! author : Vlad Gurdiga : https://github.com/gurdiga
//! author : Valentin Agachi : https://github.com/avaly
function Cd(a,b,c){var d={mm:"minute",hh:"ore",dd:"zile",MM:"luni",yy:"ani"},e=" ";return(a%100>=20||a>=100&&a%100===0)&&(e=" de "),a+e+d[c]}
//! moment.js locale configuration
//! locale : russian (ru)
//! author : Viktorminator : https://github.com/Viktorminator
//! Author : Menelion Elensúle : https://github.com/Oire
function Dd(a,b){var c=a.split("_");return b%10===1&&b%100!==11?c[0]:b%10>=2&&4>=b%10&&(10>b%100||b%100>=20)?c[1]:c[2]}function Ed(a,b,c){var d={mm:b?"минута_минуты_минут":"минуту_минуты_минут",hh:"час_часа_часов",dd:"день_дня_дней",MM:"месяц_месяца_месяцев",yy:"год_года_лет"};return"m"===c?b?"минута":"минуту":a+" "+Dd(d[c],+a)}function Fd(a){return a>1&&5>a}function Gd(a,b,c,d){var e=a+" ";switch(c){case"s":return b||d?"pár sekúnd":"pár sekundami";case"m":return b?"minúta":d?"minútu":"minútou";case"mm":return b||d?e+(Fd(a)?"minúty":"minút"):e+"minútami";break;case"h":return b?"hodina":d?"hodinu":"hodinou";case"hh":return b||d?e+(Fd(a)?"hodiny":"hodín"):e+"hodinami";break;case"d":return b||d?"deň":"dňom";case"dd":return b||d?e+(Fd(a)?"dni":"dní"):e+"dňami";break;case"M":return b||d?"mesiac":"mesiacom";case"MM":return b||d?e+(Fd(a)?"mesiace":"mesiacov"):e+"mesiacmi";break;case"y":return b||d?"rok":"rokom";case"yy":return b||d?e+(Fd(a)?"roky":"rokov"):e+"rokmi"}}
//! moment.js locale configuration
//! locale : slovenian (sl)
//! author : Robert Sedovšek : https://github.com/sedovsek
function Hd(a,b,c,d){var e=a+" ";switch(c){case"s":return b||d?"nekaj sekund":"nekaj sekundami";case"m":return b?"ena minuta":"eno minuto";case"mm":return e+=1===a?b?"minuta":"minuto":2===a?b||d?"minuti":"minutama":5>a?b||d?"minute":"minutami":b||d?"minut":"minutami";case"h":return b?"ena ura":"eno uro";case"hh":return e+=1===a?b?"ura":"uro":2===a?b||d?"uri":"urama":5>a?b||d?"ure":"urami":b||d?"ur":"urami";case"d":return b||d?"en dan":"enim dnem";case"dd":return e+=1===a?b||d?"dan":"dnem":2===a?b||d?"dni":"dnevoma":b||d?"dni":"dnevi";case"M":return b||d?"en mesec":"enim mesecem";case"MM":return e+=1===a?b||d?"mesec":"mesecem":2===a?b||d?"meseca":"mesecema":5>a?b||d?"mesece":"meseci":b||d?"mesecev":"meseci";case"y":return b||d?"eno leto":"enim letom";case"yy":return e+=1===a?b||d?"leto":"letom":2===a?b||d?"leti":"letoma":5>a?b||d?"leta":"leti":b||d?"let":"leti"}}function Id(a){var b=a;return b=-1!==a.indexOf("jaj")?b.slice(0,-3)+"leS":-1!==a.indexOf("jar")?b.slice(0,-3)+"waQ":-1!==a.indexOf("DIS")?b.slice(0,-3)+"nem":b+" pIq"}function Jd(a){var b=a;return b=-1!==a.indexOf("jaj")?b.slice(0,-3)+"Hu’":-1!==a.indexOf("jar")?b.slice(0,-3)+"wen":-1!==a.indexOf("DIS")?b.slice(0,-3)+"ben":b+" ret"}function Kd(a,b,c,d){var e=Ld(a);switch(c){case"mm":return e+" tup";case"hh":return e+" rep";case"dd":return e+" jaj";case"MM":return e+" jar";case"yy":return e+" DIS"}}function Ld(a){var b=Math.floor(a%1e3/100),c=Math.floor(a%100/10),d=a%10,e="";return b>0&&(e+=Lg[b]+"vatlh"),c>0&&(e+=(""!==e?" ":"")+Lg[c]+"maH"),d>0&&(e+=(""!==e?" ":"")+Lg[d]),""===e?"pagh":e}function Md(a,b,c,d){var e={s:["viensas secunds","'iensas secunds"],m:["'n míut","'iens míut"],mm:[a+" míuts",""+a+" míuts"],h:["'n þora","'iensa þora"],hh:[a+" þoras",""+a+" þoras"],d:["'n ziua","'iensa ziua"],dd:[a+" ziuas",""+a+" ziuas"],M:["'n mes","'iens mes"],MM:[a+" mesen",""+a+" mesen"],y:["'n ar","'iens ar"],yy:[a+" ars",""+a+" ars"]};return d?e[c][0]:b?e[c][0]:e[c][1]}
//! moment.js locale configuration
//! locale : ukrainian (uk)
//! author : zemlanin : https://github.com/zemlanin
//! Author : Menelion Elensúle : https://github.com/Oire
function Nd(a,b){var c=a.split("_");return b%10===1&&b%100!==11?c[0]:b%10>=2&&4>=b%10&&(10>b%100||b%100>=20)?c[1]:c[2]}function Od(a,b,c){var d={mm:b?"хвилина_хвилини_хвилин":"хвилину_хвилини_хвилин",hh:b?"година_години_годин":"годину_години_годин",dd:"день_дні_днів",MM:"місяць_місяці_місяців",yy:"рік_роки_років"};return"m"===c?b?"хвилина":"хвилину":"h"===c?b?"година":"годину":a+" "+Nd(d[c],+a)}function Pd(a,b){var c={nominative:"неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота".split("_"),accusative:"неділю_понеділок_вівторок_середу_четвер_п’ятницю_суботу".split("_"),genitive:"неділі_понеділка_вівторка_середи_четверга_п’ятниці_суботи".split("_")},d=/(\[[ВвУу]\]) ?dddd/.test(b)?"accusative":/\[?(?:минулої|наступної)? ?\] ?dddd/.test(b)?"genitive":"nominative";return c[d][a.day()]}function Qd(a){return function(){return a+"о"+(11===this.hours()?"б":"")+"] LT"}}var Rd,Sd,Td=a.momentProperties=[],Ud=!1,Vd={},Wd={},Xd=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,Yd=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,Zd={},$d={},_d=/\d/,ae=/\d\d/,be=/\d{3}/,ce=/\d{4}/,de=/[+-]?\d{6}/,ee=/\d\d?/,fe=/\d\d\d\d?/,ge=/\d\d\d\d\d\d?/,he=/\d{1,3}/,ie=/\d{1,4}/,je=/[+-]?\d{1,6}/,ke=/\d+/,le=/[+-]?\d+/,me=/Z|[+-]\d\d:?\d\d/gi,ne=/Z|[+-]\d\d(?::?\d\d)?/gi,oe=/[+-]?\d+(\.\d{1,3})?/,pe=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,qe={},re={},se=0,te=1,ue=2,ve=3,we=4,xe=5,ye=6,ze=7,Ae=8;J("M",["MM",2],"Mo",function(){return this.month()+1}),J("MMM",0,0,function(a){return this.localeData().monthsShort(this,a)}),J("MMMM",0,0,function(a){return this.localeData().months(this,a)}),A("month","M"),O("M",ee),O("MM",ee,ae),O("MMM",function(a,b){return b.monthsShortRegex(a)}),O("MMMM",function(a,b){return b.monthsRegex(a)}),S(["M","MM"],function(a,b){b[te]=r(a)-1}),S(["MMM","MMMM"],function(a,b,c,d){var e=c._locale.monthsParse(a,d,c._strict);null!=e?b[te]=e:j(c).invalidMonth=a});var Be=/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/,Ce="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),De="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),Ee=pe,Fe=pe,Ge={};a.suppressDeprecationWarnings=!1;var He=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,Ie=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,Je=/Z|[+-]\d\d(?::?\d\d)?/,Ke=[["YYYYYY-MM-DD",/[+-]\d{6}-\d\d-\d\d/],["YYYY-MM-DD",/\d{4}-\d\d-\d\d/],["GGGG-[W]WW-E",/\d{4}-W\d\d-\d/],["GGGG-[W]WW",/\d{4}-W\d\d/,!1],["YYYY-DDD",/\d{4}-\d{3}/],["YYYY-MM",/\d{4}-\d\d/,!1],["YYYYYYMMDD",/[+-]\d{10}/],["YYYYMMDD",/\d{8}/],["GGGG[W]WWE",/\d{4}W\d{3}/],["GGGG[W]WW",/\d{4}W\d{2}/,!1],["YYYYDDD",/\d{7}/]],Le=[["HH:mm:ss.SSSS",/\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss,SSSS",/\d\d:\d\d:\d\d,\d+/],["HH:mm:ss",/\d\d:\d\d:\d\d/],["HH:mm",/\d\d:\d\d/],["HHmmss.SSSS",/\d\d\d\d\d\d\.\d+/],["HHmmss,SSSS",/\d\d\d\d\d\d,\d+/],["HHmmss",/\d\d\d\d\d\d/],["HHmm",/\d\d\d\d/],["HH",/\d\d/]],Me=/^\/?Date\((\-?\d+)/i;a.createFromInputFallback=fa("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.",function(a){a._d=new Date(a._i+(a._useUTC?" UTC":""))}),J("Y",0,0,function(){var a=this.year();return 9999>=a?""+a:"+"+a}),J(0,["YY",2],0,function(){return this.year()%100}),J(0,["YYYY",4],0,"year"),J(0,["YYYYY",5],0,"year"),J(0,["YYYYYY",6,!0],0,"year"),A("year","y"),O("Y",le),O("YY",ee,ae),O("YYYY",ie,ce),O("YYYYY",je,de),O("YYYYYY",je,de),S(["YYYYY","YYYYYY"],se),S("YYYY",function(b,c){c[se]=2===b.length?a.parseTwoDigitYear(b):r(b)}),S("YY",function(b,c){c[se]=a.parseTwoDigitYear(b)}),S("Y",function(a,b){b[se]=parseInt(a,10)}),a.parseTwoDigitYear=function(a){return r(a)+(r(a)>68?1900:2e3)};var Ne=E("FullYear",!1);a.ISO_8601=function(){};var Oe=fa("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548",function(){var a=Ea.apply(null,arguments);return this.isValid()&&a.isValid()?this>a?this:a:l()}),Pe=fa("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548",function(){var a=Ea.apply(null,arguments);return this.isValid()&&a.isValid()?a>this?this:a:l()}),Qe=function(){return Date.now?Date.now():+new Date};Ka("Z",":"),Ka("ZZ",""),O("Z",ne),O("ZZ",ne),S(["Z","ZZ"],function(a,b,c){c._useUTC=!0,c._tzm=La(ne,a)});var Re=/([\+\-]|\d\d)/gi;a.updateOffset=function(){};var Se=/(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,Te=/^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;Za.fn=Ia.prototype;var Ue=bb(1,"add"),Ve=bb(-1,"subtract");a.defaultFormat="YYYY-MM-DDTHH:mm:ssZ";var We=fa("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(a){return void 0===a?this.localeData():this.locale(a)});J(0,["gg",2],0,function(){return this.weekYear()%100}),J(0,["GG",2],0,function(){return this.isoWeekYear()%100}),Ib("gggg","weekYear"),Ib("ggggg","weekYear"),Ib("GGGG","isoWeekYear"),Ib("GGGGG","isoWeekYear"),A("weekYear","gg"),A("isoWeekYear","GG"),O("G",le),O("g",le),O("GG",ee,ae),O("gg",ee,ae),O("GGGG",ie,ce),O("gggg",ie,ce),O("GGGGG",je,de),O("ggggg",je,de),T(["gggg","ggggg","GGGG","GGGGG"],function(a,b,c,d){b[d.substr(0,2)]=r(a)}),T(["gg","GG"],function(b,c,d,e){c[e]=a.parseTwoDigitYear(b)}),J("Q",0,"Qo","quarter"),A("quarter","Q"),O("Q",_d),S("Q",function(a,b){b[te]=3*(r(a)-1)}),J("w",["ww",2],"wo","week"),J("W",["WW",2],"Wo","isoWeek"),A("week","w"),A("isoWeek","W"),O("w",ee),O("ww",ee,ae),O("W",ee),O("WW",ee,ae),T(["w","ww","W","WW"],function(a,b,c,d){b[d.substr(0,1)]=r(a)});var Xe={dow:0,doy:6};J("D",["DD",2],"Do","date"),A("date","D"),O("D",ee),O("DD",ee,ae),O("Do",function(a,b){return a?b._ordinalParse:b._ordinalParseLenient}),S(["D","DD"],ue),S("Do",function(a,b){b[ue]=r(a.match(ee)[0],10)});var Ye=E("Date",!0);J("d",0,"do","day"),J("dd",0,0,function(a){return this.localeData().weekdaysMin(this,a)}),J("ddd",0,0,function(a){return this.localeData().weekdaysShort(this,a)}),J("dddd",0,0,function(a){return this.localeData().weekdays(this,a)}),J("e",0,0,"weekday"),J("E",0,0,"isoWeekday"),A("day","d"),A("weekday","e"),A("isoWeekday","E"),O("d",ee),O("e",ee),O("E",ee),O("dd",pe),O("ddd",pe),O("dddd",pe),T(["dd","ddd","dddd"],function(a,b,c,d){var e=c._locale.weekdaysParse(a,d,c._strict);null!=e?b.d=e:j(c).invalidWeekday=a}),T(["d","e","E"],function(a,b,c,d){b[d]=r(a)});var Ze="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),$e="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),_e="Su_Mo_Tu_We_Th_Fr_Sa".split("_");J("DDD",["DDDD",3],"DDDo","dayOfYear"),A("dayOfYear","DDD"),O("DDD",he),O("DDDD",be),S(["DDD","DDDD"],function(a,b,c){c._dayOfYear=r(a)}),J("H",["HH",2],0,"hour"),J("h",["hh",2],0,cc),J("hmm",0,0,function(){return""+cc.apply(this)+I(this.minutes(),2)}),J("hmmss",0,0,function(){return""+cc.apply(this)+I(this.minutes(),2)+I(this.seconds(),2)}),J("Hmm",0,0,function(){return""+this.hours()+I(this.minutes(),2)}),J("Hmmss",0,0,function(){return""+this.hours()+I(this.minutes(),2)+I(this.seconds(),2)}),dc("a",!0),dc("A",!1),A("hour","h"),O("a",ec),O("A",ec),O("H",ee),O("h",ee),O("HH",ee,ae),O("hh",ee,ae),O("hmm",fe),O("hmmss",ge),O("Hmm",fe),O("Hmmss",ge),S(["H","HH"],ve),S(["a","A"],function(a,b,c){c._isPm=c._locale.isPM(a),c._meridiem=a}),S(["h","hh"],function(a,b,c){b[ve]=r(a),j(c).bigHour=!0}),S("hmm",function(a,b,c){var d=a.length-2;b[ve]=r(a.substr(0,d)),b[we]=r(a.substr(d)),j(c).bigHour=!0}),S("hmmss",function(a,b,c){var d=a.length-4,e=a.length-2;b[ve]=r(a.substr(0,d)),b[we]=r(a.substr(d,2)),b[xe]=r(a.substr(e)),j(c).bigHour=!0}),S("Hmm",function(a,b,c){var d=a.length-2;b[ve]=r(a.substr(0,d)),b[we]=r(a.substr(d))}),S("Hmmss",function(a,b,c){var d=a.length-4,e=a.length-2;b[ve]=r(a.substr(0,d)),b[we]=r(a.substr(d,2)),b[xe]=r(a.substr(e))});var af=/[ap]\.?m?\.?/i,bf=E("Hours",!0);J("m",["mm",2],0,"minute"),A("minute","m"),O("m",ee),O("mm",ee,ae),S(["m","mm"],we);var cf=E("Minutes",!1);J("s",["ss",2],0,"second"),A("second","s"),O("s",ee),O("ss",ee,ae),S(["s","ss"],xe);var df=E("Seconds",!1);J("S",0,0,function(){return~~(this.millisecond()/100)}),J(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),J(0,["SSS",3],0,"millisecond"),J(0,["SSSS",4],0,function(){return 10*this.millisecond()}),J(0,["SSSSS",5],0,function(){return 100*this.millisecond()}),J(0,["SSSSSS",6],0,function(){return 1e3*this.millisecond()}),J(0,["SSSSSSS",7],0,function(){return 1e4*this.millisecond()}),J(0,["SSSSSSSS",8],0,function(){return 1e5*this.millisecond()}),J(0,["SSSSSSSSS",9],0,function(){return 1e6*this.millisecond()}),A("millisecond","ms"),O("S",he,_d),O("SS",he,ae),O("SSS",he,be);var ef;for(ef="SSSS";ef.length<=9;ef+="S")O(ef,ke);for(ef="S";ef.length<=9;ef+="S")S(ef,hc);var ff=E("Milliseconds",!1);J("z",0,0,"zoneAbbr"),J("zz",0,0,"zoneName");var gf=o.prototype;gf.add=Ue,gf.calendar=db,gf.clone=eb,gf.diff=lb,gf.endOf=xb,gf.format=pb,gf.from=qb,gf.fromNow=rb,gf.to=sb,gf.toNow=tb,gf.get=H,gf.invalidAt=Gb,gf.isAfter=fb,gf.isBefore=gb,gf.isBetween=hb,gf.isSame=ib,gf.isSameOrAfter=jb,gf.isSameOrBefore=kb,gf.isValid=Eb,gf.lang=We,gf.locale=ub,gf.localeData=vb,gf.max=Pe,gf.min=Oe,gf.parsingFlags=Fb,gf.set=H,gf.startOf=wb,gf.subtract=Ve,gf.toArray=Bb,gf.toObject=Cb,gf.toDate=Ab,gf.toISOString=ob,gf.toJSON=Db,gf.toString=nb,gf.unix=zb,gf.valueOf=yb,gf.creationData=Hb,gf.year=Ne,gf.isLeapYear=na,gf.weekYear=Jb,gf.isoWeekYear=Kb,gf.quarter=gf.quarters=Pb,gf.month=$,gf.daysInMonth=_,gf.week=gf.weeks=Tb,gf.isoWeek=gf.isoWeeks=Ub,gf.weeksInYear=Mb,gf.isoWeeksInYear=Lb,gf.date=Ye,gf.day=gf.days=$b,gf.weekday=_b,gf.isoWeekday=ac,gf.dayOfYear=bc,gf.hour=gf.hours=bf,gf.minute=gf.minutes=cf,gf.second=gf.seconds=df,gf.millisecond=gf.milliseconds=ff,gf.utcOffset=Oa,gf.utc=Qa,gf.local=Ra,gf.parseZone=Sa,gf.hasAlignedHourOffset=Ta,gf.isDST=Ua,gf.isDSTShifted=Va,gf.isLocal=Wa,gf.isUtcOffset=Xa,gf.isUtc=Ya,gf.isUTC=Ya,gf.zoneAbbr=ic,gf.zoneName=jc,gf.dates=fa("dates accessor is deprecated. Use date instead.",Ye),gf.months=fa("months accessor is deprecated. Use month instead",$),gf.years=fa("years accessor is deprecated. Use year instead",Ne),gf.zone=fa("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779",Pa);var hf=gf,jf={sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},kf={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},lf="Invalid date",mf="%d",nf=/\d{1,2}/,of={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},pf=t.prototype;pf._calendar=jf,pf.calendar=mc,pf._longDateFormat=kf,pf.longDateFormat=nc,pf._invalidDate=lf,pf.invalidDate=oc,pf._ordinal=mf,pf.ordinal=pc,pf._ordinalParse=nf,pf.preparse=qc,pf.postformat=qc,pf._relativeTime=of,pf.relativeTime=rc,pf.pastFuture=sc,pf.set=tc,pf.months=W,pf._months=Ce,pf.monthsShort=X,pf._monthsShort=De,pf.monthsParse=Y,pf._monthsRegex=Fe,pf.monthsRegex=ba,pf._monthsShortRegex=Ee,pf.monthsShortRegex=aa,pf.week=Qb,pf._week=Xe,pf.firstDayOfYear=Sb,pf.firstDayOfWeek=Rb,pf.weekdays=Wb,pf._weekdays=Ze,pf.weekdaysMin=Yb,pf._weekdaysMin=_e,pf.weekdaysShort=Xb,pf._weekdaysShort=$e,pf.weekdaysParse=Zb,pf.isPM=fc,pf._meridiemParse=af,pf.meridiem=gc,x("en",{ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(a){var b=a%10,c=1===r(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),a.lang=fa("moment.lang is deprecated. Use moment.locale instead.",x),a.langData=fa("moment.langData is deprecated. Use moment.localeData instead.",z);var qf=Math.abs,rf=Lc("ms"),sf=Lc("s"),tf=Lc("m"),uf=Lc("h"),vf=Lc("d"),wf=Lc("w"),xf=Lc("M"),yf=Lc("y"),zf=Nc("milliseconds"),Af=Nc("seconds"),Bf=Nc("minutes"),Cf=Nc("hours"),Df=Nc("days"),Ef=Nc("months"),Ff=Nc("years"),Gf=Math.round,Hf={s:45,m:45,h:22,d:26,M:11},If=Math.abs,Jf=Ia.prototype;Jf.abs=Bc,Jf.add=Dc,Jf.subtract=Ec,Jf.as=Jc,Jf.asMilliseconds=rf,Jf.asSeconds=sf,Jf.asMinutes=tf,Jf.asHours=uf,Jf.asDays=vf,Jf.asWeeks=wf,Jf.asMonths=xf,Jf.asYears=yf,Jf.valueOf=Kc,Jf._bubble=Gc,Jf.get=Mc,Jf.milliseconds=zf,Jf.seconds=Af,Jf.minutes=Bf,Jf.hours=Cf,Jf.days=Df,Jf.weeks=Oc,Jf.months=Ef,Jf.years=Ff,Jf.humanize=Sc,Jf.toISOString=Tc,Jf.toString=Tc,Jf.toJSON=Tc,Jf.locale=ub,Jf.localeData=vb,Jf.toIsoString=fa("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",Tc),Jf.lang=We,J("X",0,0,"unix"),J("x",0,0,"valueOf"),O("x",le),O("X",oe),S("X",function(a,b,c){c._d=new Date(1e3*parseFloat(a,10))}),S("x",function(a,b,c){c._d=new Date(r(a))}),
//! moment.js
//! version : 2.11.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
a.version="2.11.1",b(Ea),a.fn=hf,a.min=Ga,a.max=Ha,a.now=Qe,a.utc=h,a.unix=kc,a.months=wc,a.isDate=d,a.locale=x,a.invalid=l,a.duration=Za,a.isMoment=p,a.weekdays=yc,a.parseZone=lc,a.localeData=z,a.isDuration=Ja,a.monthsShort=xc,a.weekdaysMin=Ac,a.defineLocale=y,a.weekdaysShort=zc,a.normalizeUnits=B,a.relativeTimeThreshold=Rc,a.prototype=hf;var Kf=a,Lf=(Kf.defineLocale("af",{months:"Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember".split("_"),monthsShort:"Jan_Feb_Mar_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des".split("_"),weekdays:"Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag".split("_"),weekdaysShort:"Son_Maa_Din_Woe_Don_Vry_Sat".split("_"),weekdaysMin:"So_Ma_Di_Wo_Do_Vr_Sa".split("_"),meridiemParse:/vm|nm/i,isPM:function(a){return/^nm$/i.test(a)},meridiem:function(a,b,c){return 12>a?c?"vm":"VM":c?"nm":"NM"},longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Vandag om] LT",nextDay:"[Môre om] LT",nextWeek:"dddd [om] LT",lastDay:"[Gister om] LT",lastWeek:"[Laas] dddd [om] LT",sameElse:"L"},relativeTime:{future:"oor %s",past:"%s gelede",s:"'n paar sekondes",m:"'n minuut",mm:"%d minute",h:"'n uur",hh:"%d ure",d:"'n dag",dd:"%d dae",M:"'n maand",MM:"%d maande",y:"'n jaar",yy:"%d jaar"},ordinalParse:/\d{1,2}(ste|de)/,ordinal:function(a){return a+(1===a||8===a||a>=20?"ste":"de")},week:{dow:1,doy:4}}),Kf.defineLocale("ar-ma",{months:"يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"),monthsShort:"يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"),weekdays:"الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),weekdaysShort:"احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت".split("_"),weekdaysMin:"ح_ن_ث_ر_خ_ج_س".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[اليوم على الساعة] LT",nextDay:"[غدا على الساعة] LT",nextWeek:"dddd [على الساعة] LT",lastDay:"[أمس على الساعة] LT",lastWeek:"dddd [على الساعة] LT",sameElse:"L"},relativeTime:{future:"في %s",past:"منذ %s",s:"ثوان",m:"دقيقة",mm:"%d دقائق",h:"ساعة",hh:"%d ساعات",d:"يوم",dd:"%d أيام",M:"شهر",MM:"%d أشهر",y:"سنة",yy:"%d سنوات"},week:{dow:6,doy:12}}),{1:"١",2:"٢",3:"٣",4:"٤",5:"٥",6:"٦",7:"٧",8:"٨",9:"٩",0:"٠"}),Mf={"١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9","٠":"0"},Nf=(Kf.defineLocale("ar-sa",{months:"يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),monthsShort:"يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),weekdays:"الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),weekdaysShort:"أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),weekdaysMin:"ح_ن_ث_ر_خ_ج_س".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},meridiemParse:/ص|م/,isPM:function(a){return"م"===a},meridiem:function(a,b,c){return 12>a?"ص":"م"},calendar:{sameDay:"[اليوم على الساعة] LT",nextDay:"[غدا على الساعة] LT",nextWeek:"dddd [على الساعة] LT",lastDay:"[أمس على الساعة] LT",lastWeek:"dddd [على الساعة] LT",sameElse:"L"},relativeTime:{future:"في %s",past:"منذ %s",s:"ثوان",m:"دقيقة",mm:"%d دقائق",h:"ساعة",hh:"%d ساعات",d:"يوم",dd:"%d أيام",M:"شهر",MM:"%d أشهر",y:"سنة",yy:"%d سنوات"},preparse:function(a){return a.replace(/[١٢٣٤٥٦٧٨٩٠]/g,function(a){return Mf[a]}).replace(/،/g,",")},postformat:function(a){return a.replace(/\d/g,function(a){return Lf[a]}).replace(/,/g,"،")},week:{dow:6,doy:12}}),Kf.defineLocale("ar-tn",{months:"جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),monthsShort:"جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),weekdays:"الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),weekdaysShort:"أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),weekdaysMin:"ح_ن_ث_ر_خ_ج_س".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[اليوم على الساعة] LT",nextDay:"[غدا على الساعة] LT",nextWeek:"dddd [على الساعة] LT",lastDay:"[أمس على الساعة] LT",lastWeek:"dddd [على الساعة] LT",sameElse:"L"},relativeTime:{future:"في %s",past:"منذ %s",s:"ثوان",m:"دقيقة",mm:"%d دقائق",h:"ساعة",hh:"%d ساعات",d:"يوم",dd:"%d أيام",M:"شهر",MM:"%d أشهر",y:"سنة",yy:"%d سنوات"},week:{dow:1,doy:4}}),{1:"١",2:"٢",3:"٣",4:"٤",5:"٥",6:"٦",7:"٧",8:"٨",9:"٩",0:"٠"}),Of={"١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9","٠":"0"},Pf=function(a){return 0===a?0:1===a?1:2===a?2:a%100>=3&&10>=a%100?3:a%100>=11?4:5},Qf={s:["أقل من ثانية","ثانية واحدة",["ثانيتان","ثانيتين"],"%d ثوان","%d ثانية","%d ثانية"],m:["أقل من دقيقة","دقيقة واحدة",["دقيقتان","دقيقتين"],"%d دقائق","%d دقيقة","%d دقيقة"],h:["أقل من ساعة","ساعة واحدة",["ساعتان","ساعتين"],"%d ساعات","%d ساعة","%d ساعة"],d:["أقل من يوم","يوم واحد",["يومان","يومين"],"%d أيام","%d يومًا","%d يوم"],M:["أقل من شهر","شهر واحد",["شهران","شهرين"],"%d أشهر","%d شهرا","%d شهر"],y:["أقل من عام","عام واحد",["عامان","عامين"],"%d أعوام","%d عامًا","%d عام"]},Rf=function(a){return function(b,c,d,e){var f=Pf(b),g=Qf[a][Pf(b)];return 2===f&&(g=g[c?0:1]),g.replace(/%d/i,b)}},Sf=["كانون الثاني يناير","شباط فبراير","آذار مارس","نيسان أبريل","أيار مايو","حزيران يونيو","تموز يوليو","آب أغسطس","أيلول سبتمبر","تشرين الأول أكتوبر","تشرين الثاني نوفمبر","كانون الأول ديسمبر"],Tf=(Kf.defineLocale("ar",{months:Sf,monthsShort:Sf,weekdays:"الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),weekdaysShort:"أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),weekdaysMin:"ح_ن_ث_ر_خ_ج_س".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"D/‏M/‏YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},meridiemParse:/ص|م/,isPM:function(a){return"م"===a},meridiem:function(a,b,c){return 12>a?"ص":"م"},calendar:{sameDay:"[اليوم عند الساعة] LT",nextDay:"[غدًا عند الساعة] LT",nextWeek:"dddd [عند الساعة] LT",lastDay:"[أمس عند الساعة] LT",lastWeek:"dddd [عند الساعة] LT",sameElse:"L"},relativeTime:{future:"بعد %s",past:"منذ %s",s:Rf("s"),m:Rf("m"),mm:Rf("m"),h:Rf("h"),hh:Rf("h"),d:Rf("d"),dd:Rf("d"),M:Rf("M"),MM:Rf("M"),y:Rf("y"),yy:Rf("y")},preparse:function(a){return a.replace(/\u200f/g,"").replace(/[١٢٣٤٥٦٧٨٩٠]/g,function(a){return Of[a]}).replace(/،/g,",")},postformat:function(a){return a.replace(/\d/g,function(a){return Nf[a]}).replace(/,/g,"،")},week:{dow:6,doy:12}}),{1:"-inci",5:"-inci",8:"-inci",70:"-inci",80:"-inci",2:"-nci",7:"-nci",20:"-nci",50:"-nci",3:"-üncü",4:"-üncü",100:"-üncü",6:"-ncı",9:"-uncu",10:"-uncu",30:"-uncu",60:"-ıncı",90:"-ıncı"}),Uf=(Kf.defineLocale("az",{months:"yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr".split("_"),monthsShort:"yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek".split("_"),weekdays:"Bazar_Bazar ertəsi_Çərşənbə axşamı_Çərşənbə_Cümə axşamı_Cümə_Şənbə".split("_"),weekdaysShort:"Baz_BzE_ÇAx_Çər_CAx_Cüm_Şən".split("_"),weekdaysMin:"Bz_BE_ÇA_Çə_CA_Cü_Şə".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[bugün saat] LT",nextDay:"[sabah saat] LT",nextWeek:"[gələn həftə] dddd [saat] LT",lastDay:"[dünən] LT",lastWeek:"[keçən həftə] dddd [saat] LT",sameElse:"L"},relativeTime:{future:"%s sonra",past:"%s əvvəl",s:"birneçə saniyyə",m:"bir dəqiqə",mm:"%d dəqiqə",h:"bir saat",hh:"%d saat",d:"bir gün",dd:"%d gün",M:"bir ay",MM:"%d ay",y:"bir il",yy:"%d il"},meridiemParse:/gecə|səhər|gündüz|axşam/,isPM:function(a){return/^(gündüz|axşam)$/.test(a)},meridiem:function(a,b,c){return 4>a?"gecə":12>a?"səhər":17>a?"gündüz":"axşam"},ordinalParse:/\d{1,2}-(ıncı|inci|nci|üncü|ncı|uncu)/,ordinal:function(a){if(0===a)return a+"-ıncı";var b=a%10,c=a%100-b,d=a>=100?100:null;return a+(Tf[b]||Tf[c]||Tf[d])},week:{dow:1,doy:7}}),Kf.defineLocale("be",{months:{format:"студзеня_лютага_сакавіка_красавіка_траўня_чэрвеня_ліпеня_жніўня_верасня_кастрычніка_лістапада_снежня".split("_"),standalone:"студзень_люты_сакавік_красавік_травень_чэрвень_ліпень_жнівень_верасень_кастрычнік_лістапад_снежань".split("_")},monthsShort:"студ_лют_сак_крас_трав_чэрв_ліп_жнів_вер_каст_ліст_снеж".split("_"),weekdays:{format:"нядзелю_панядзелак_аўторак_сераду_чацвер_пятніцу_суботу".split("_"),standalone:"нядзеля_панядзелак_аўторак_серада_чацвер_пятніца_субота".split("_"),isFormat:/\[ ?[Вв] ?(?:мінулую|наступную)? ?\] ?dddd/},weekdaysShort:"нд_пн_ат_ср_чц_пт_сб".split("_"),weekdaysMin:"нд_пн_ат_ср_чц_пт_сб".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY г.",LLL:"D MMMM YYYY г., HH:mm",LLLL:"dddd, D MMMM YYYY г., HH:mm"},calendar:{sameDay:"[Сёння ў] LT",nextDay:"[Заўтра ў] LT",lastDay:"[Учора ў] LT",nextWeek:function(){return"[У] dddd [ў] LT"},lastWeek:function(){switch(this.day()){case 0:case 3:case 5:case 6:return"[У мінулую] dddd [ў] LT";case 1:case 2:case 4:return"[У мінулы] dddd [ў] LT"}},sameElse:"L"},relativeTime:{future:"праз %s",past:"%s таму",s:"некалькі секунд",m:Vc,mm:Vc,h:Vc,hh:Vc,d:"дзень",dd:Vc,M:"месяц",MM:Vc,y:"год",yy:Vc},meridiemParse:/ночы|раніцы|дня|вечара/,isPM:function(a){return/^(дня|вечара)$/.test(a)},meridiem:function(a,b,c){return 4>a?"ночы":12>a?"раніцы":17>a?"дня":"вечара"},ordinalParse:/\d{1,2}-(і|ы|га)/,ordinal:function(a,b){switch(b){case"M":case"d":case"DDD":case"w":case"W":return a%10!==2&&a%10!==3||a%100===12||a%100===13?a+"-ы":a+"-і";case"D":return a+"-га";default:return a}},week:{dow:1,doy:7}}),Kf.defineLocale("bg",{months:"януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември".split("_"),monthsShort:"янр_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек".split("_"),weekdays:"неделя_понеделник_вторник_сряда_четвъртък_петък_събота".split("_"),weekdaysShort:"нед_пон_вто_сря_чет_пет_съб".split("_"),weekdaysMin:"нд_пн_вт_ср_чт_пт_сб".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"D.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY H:mm",LLLL:"dddd, D MMMM YYYY H:mm"},calendar:{sameDay:"[Днес в] LT",nextDay:"[Утре в] LT",nextWeek:"dddd [в] LT",lastDay:"[Вчера в] LT",lastWeek:function(){switch(this.day()){case 0:case 3:case 6:return"[В изминалата] dddd [в] LT";case 1:case 2:case 4:case 5:return"[В изминалия] dddd [в] LT"}},sameElse:"L"},relativeTime:{future:"след %s",past:"преди %s",s:"няколко секунди",m:"минута",mm:"%d минути",h:"час",hh:"%d часа",d:"ден",dd:"%d дни",M:"месец",MM:"%d месеца",y:"година",yy:"%d години"},ordinalParse:/\d{1,2}-(ев|ен|ти|ви|ри|ми)/,ordinal:function(a){var b=a%10,c=a%100;return 0===a?a+"-ев":0===c?a+"-ен":c>10&&20>c?a+"-ти":1===b?a+"-ви":2===b?a+"-ри":7===b||8===b?a+"-ми":a+"-ти"},week:{dow:1,doy:7}}),{1:"১",2:"২",3:"৩",4:"৪",5:"৫",6:"৬",7:"৭",8:"৮",9:"৯",0:"০"}),Vf={"১":"1","২":"2","৩":"3","৪":"4","৫":"5","৬":"6","৭":"7","৮":"8","৯":"9","০":"0"},Wf=(Kf.defineLocale("bn",{months:"জানুয়ারী_ফেবুয়ারী_মার্চ_এপ্রিল_মে_জুন_জুলাই_অগাস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর".split("_"),monthsShort:"জানু_ফেব_মার্চ_এপর_মে_জুন_জুল_অগ_সেপ্ট_অক্টো_নভ_ডিসেম্".split("_"),weekdays:"রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পত্তিবার_শুক্রবার_শনিবার".split("_"),weekdaysShort:"রবি_সোম_মঙ্গল_বুধ_বৃহস্পত্তি_শুক্র_শনি".split("_"),weekdaysMin:"রব_সম_মঙ্গ_বু_ব্রিহ_শু_শনি".split("_"),longDateFormat:{LT:"A h:mm সময়",LTS:"A h:mm:ss সময়",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm সময়",LLLL:"dddd, D MMMM YYYY, A h:mm সময়"},calendar:{sameDay:"[আজ] LT",nextDay:"[আগামীকাল] LT",nextWeek:"dddd, LT",lastDay:"[গতকাল] LT",lastWeek:"[গত] dddd, LT",sameElse:"L"},relativeTime:{future:"%s পরে",past:"%s আগে",s:"কয়েক সেকেন্ড",m:"এক মিনিট",mm:"%d মিনিট",h:"এক ঘন্টা",hh:"%d ঘন্টা",d:"এক দিন",dd:"%d দিন",M:"এক মাস",MM:"%d মাস",y:"এক বছর",yy:"%d বছর"},preparse:function(a){return a.replace(/[১২৩৪৫৬৭৮৯০]/g,function(a){return Vf[a]})},postformat:function(a){return a.replace(/\d/g,function(a){return Uf[a]})},meridiemParse:/রাত|সকাল|দুপুর|বিকাল|রাত/,isPM:function(a){return/^(দুপুর|বিকাল|রাত)$/.test(a)},meridiem:function(a,b,c){return 4>a?"রাত":10>a?"সকাল":17>a?"দুপুর":20>a?"বিকাল":"রাত"},week:{dow:0,doy:6}}),{1:"༡",2:"༢",3:"༣",4:"༤",5:"༥",6:"༦",7:"༧",8:"༨",9:"༩",0:"༠"}),Xf={"༡":"1","༢":"2","༣":"3","༤":"4","༥":"5","༦":"6","༧":"7","༨":"8","༩":"9","༠":"0"},Yf=(Kf.defineLocale("bo",{months:"ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ".split("_"),monthsShort:"ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ".split("_"),weekdays:"གཟའ་ཉི་མ་_གཟའ་ཟླ་བ་_གཟའ་མིག་དམར་_གཟའ་ལྷག་པ་_གཟའ་ཕུར་བུ_གཟའ་པ་སངས་_གཟའ་སྤེན་པ་".split("_"),weekdaysShort:"ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་".split("_"),weekdaysMin:"ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་".split("_"),longDateFormat:{LT:"A h:mm",LTS:"A h:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm",LLLL:"dddd, D MMMM YYYY, A h:mm"},calendar:{sameDay:"[དི་རིང] LT",nextDay:"[སང་ཉིན] LT",nextWeek:"[བདུན་ཕྲག་རྗེས་མ], LT",lastDay:"[ཁ་སང] LT",lastWeek:"[བདུན་ཕྲག་མཐའ་མ] dddd, LT",sameElse:"L"},relativeTime:{future:"%s ལ་",past:"%s སྔན་ལ",s:"ལམ་སང",m:"སྐར་མ་གཅིག",mm:"%d སྐར་མ",h:"ཆུ་ཚོད་གཅིག",hh:"%d ཆུ་ཚོད",d:"ཉིན་གཅིག",dd:"%d ཉིན་",M:"ཟླ་བ་གཅིག",MM:"%d ཟླ་བ",y:"ལོ་གཅིག",yy:"%d ལོ"},preparse:function(a){return a.replace(/[༡༢༣༤༥༦༧༨༩༠]/g,function(a){return Xf[a]})},postformat:function(a){return a.replace(/\d/g,function(a){return Wf[a]})},meridiemParse:/མཚན་མོ|ཞོགས་ཀས|ཉིན་གུང|དགོང་དག|མཚན་མོ/,isPM:function(a){return/^(ཉིན་གུང|དགོང་དག|མཚན་མོ)$/.test(a)},meridiem:function(a,b,c){return 4>a?"མཚན་མོ":10>a?"ཞོགས་ཀས":17>a?"ཉིན་གུང":20>a?"དགོང་དག":"མཚན་མོ"},week:{dow:0,doy:6}}),Kf.defineLocale("br",{months:"Genver_C'hwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu".split("_"),monthsShort:"Gen_C'hwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker".split("_"),weekdays:"Sul_Lun_Meurzh_Merc'her_Yaou_Gwener_Sadorn".split("_"),weekdaysShort:"Sul_Lun_Meu_Mer_Yao_Gwe_Sad".split("_"),weekdaysMin:"Su_Lu_Me_Mer_Ya_Gw_Sa".split("_"),longDateFormat:{LT:"h[e]mm A",LTS:"h[e]mm:ss A",L:"DD/MM/YYYY",LL:"D [a viz] MMMM YYYY",LLL:"D [a viz] MMMM YYYY h[e]mm A",LLLL:"dddd, D [a viz] MMMM YYYY h[e]mm A"},calendar:{sameDay:"[Hiziv da] LT",nextDay:"[Warc'hoazh da] LT",nextWeek:"dddd [da] LT",lastDay:"[Dec'h da] LT",lastWeek:"dddd [paset da] LT",sameElse:"L"},relativeTime:{future:"a-benn %s",past:"%s 'zo",s:"un nebeud segondennoù",m:"ur vunutenn",mm:Wc,h:"un eur",hh:"%d eur",d:"un devezh",dd:Wc,M:"ur miz",MM:Wc,y:"ur bloaz",yy:Xc},ordinalParse:/\d{1,2}(añ|vet)/,ordinal:function(a){var b=1===a?"añ":"vet";return a+b},week:{dow:1,doy:4}}),Kf.defineLocale("bs",{months:"januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar".split("_"),monthsShort:"jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.".split("_"),weekdays:"nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"),weekdaysShort:"ned._pon._uto._sri._čet._pet._sub.".split("_"),weekdaysMin:"ne_po_ut_sr_če_pe_su".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD. MM. YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danas u] LT",nextDay:"[sutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedjelju] [u] LT";case 3:return"[u] [srijedu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT"}},lastDay:"[jučer u] LT",lastWeek:function(){switch(this.day()){case 0:case 3:return"[prošlu] dddd [u] LT";case 6:return"[prošle] [subote] [u] LT";case 1:case 2:case 4:case 5:return"[prošli] dddd [u] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"prije %s",s:"par sekundi",m:_c,mm:_c,h:_c,hh:_c,d:"dan",dd:_c,M:"mjesec",MM:_c,y:"godinu",yy:_c},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),Kf.defineLocale("ca",{months:"gener_febrer_març_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre".split("_"),monthsShort:"gen._febr._mar._abr._mai._jun._jul._ag._set._oct._nov._des.".split("_"),weekdays:"diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte".split("_"),weekdaysShort:"dg._dl._dt._dc._dj._dv._ds.".split("_"),weekdaysMin:"Dg_Dl_Dt_Dc_Dj_Dv_Ds".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY H:mm",LLLL:"dddd D MMMM YYYY H:mm"},calendar:{sameDay:function(){return"[avui a "+(1!==this.hours()?"les":"la")+"] LT"},nextDay:function(){return"[demà a "+(1!==this.hours()?"les":"la")+"] LT"},nextWeek:function(){return"dddd [a "+(1!==this.hours()?"les":"la")+"] LT"},lastDay:function(){return"[ahir a "+(1!==this.hours()?"les":"la")+"] LT"},lastWeek:function(){return"[el] dddd [passat a "+(1!==this.hours()?"les":"la")+"] LT"},sameElse:"L"},relativeTime:{future:"en %s",past:"fa %s",s:"uns segons",m:"un minut",mm:"%d minuts",h:"una hora",hh:"%d hores",d:"un dia",dd:"%d dies",M:"un mes",MM:"%d mesos",y:"un any",yy:"%d anys"},ordinalParse:/\d{1,2}(r|n|t|è|a)/,ordinal:function(a,b){var c=1===a?"r":2===a?"n":3===a?"r":4===a?"t":"è";return("w"===b||"W"===b)&&(c="a"),a+c},week:{dow:1,doy:4}}),"leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec".split("_")),Zf="led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro".split("_"),$f=(Kf.defineLocale("cs",{months:Yf,monthsShort:Zf,monthsParse:function(a,b){var c,d=[];for(c=0;12>c;c++)d[c]=new RegExp("^"+a[c]+"$|^"+b[c]+"$","i");return d}(Yf,Zf),shortMonthsParse:function(a){var b,c=[];for(b=0;12>b;b++)c[b]=new RegExp("^"+a[b]+"$","i");return c}(Zf),longMonthsParse:function(a){var b,c=[];for(b=0;12>b;b++)c[b]=new RegExp("^"+a[b]+"$","i");return c}(Yf),weekdays:"neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota".split("_"),weekdaysShort:"ne_po_út_st_čt_pá_so".split("_"),weekdaysMin:"ne_po_út_st_čt_pá_so".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd D. MMMM YYYY H:mm"},calendar:{sameDay:"[dnes v] LT",nextDay:"[zítra v] LT",nextWeek:function(){switch(this.day()){case 0:return"[v neděli v] LT";case 1:case 2:return"[v] dddd [v] LT";case 3:return"[ve středu v] LT";case 4:return"[ve čtvrtek v] LT";case 5:return"[v pátek v] LT";case 6:return"[v sobotu v] LT"}},lastDay:"[včera v] LT",lastWeek:function(){switch(this.day()){case 0:return"[minulou neděli v] LT";case 1:case 2:return"[minulé] dddd [v] LT";case 3:return"[minulou středu v] LT";case 4:case 5:return"[minulý] dddd [v] LT";case 6:return"[minulou sobotu v] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"před %s",s:bd,m:bd,mm:bd,h:bd,hh:bd,d:bd,dd:bd,M:bd,MM:bd,y:bd,yy:bd},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),Kf.defineLocale("cv",{months:"кӑрлач_нарӑс_пуш_ака_май_ҫӗртме_утӑ_ҫурла_авӑн_юпа_чӳк_раштав".split("_"),monthsShort:"кӑр_нар_пуш_ака_май_ҫӗр_утӑ_ҫур_авн_юпа_чӳк_раш".split("_"),weekdays:"вырсарникун_тунтикун_ытларикун_юнкун_кӗҫнерникун_эрнекун_шӑматкун".split("_"),weekdaysShort:"выр_тун_ытл_юн_кӗҫ_эрн_шӑм".split("_"),weekdaysMin:"вр_тн_ыт_юн_кҫ_эр_шм".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD-MM-YYYY",LL:"YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ]",LLL:"YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm",LLLL:"dddd, YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm"},calendar:{sameDay:"[Паян] LT [сехетре]",nextDay:"[Ыран] LT [сехетре]",lastDay:"[Ӗнер] LT [сехетре]",nextWeek:"[Ҫитес] dddd LT [сехетре]",lastWeek:"[Иртнӗ] dddd LT [сехетре]",sameElse:"L"},relativeTime:{future:function(a){var b=/сехет$/i.exec(a)?"рен":/ҫул$/i.exec(a)?"тан":"ран";return a+b},past:"%s каялла",s:"пӗр-ик ҫеккунт",m:"пӗр минут",mm:"%d минут",h:"пӗр сехет",hh:"%d сехет",d:"пӗр кун",dd:"%d кун",M:"пӗр уйӑх",MM:"%d уйӑх",y:"пӗр ҫул",yy:"%d ҫул"},ordinalParse:/\d{1,2}-мӗш/,ordinal:"%d-мӗш",week:{dow:1,doy:7}}),Kf.defineLocale("cy",{months:"Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr".split("_"),monthsShort:"Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag".split("_"),weekdays:"Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn".split("_"),weekdaysShort:"Sul_Llun_Maw_Mer_Iau_Gwe_Sad".split("_"),weekdaysMin:"Su_Ll_Ma_Me_Ia_Gw_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Heddiw am] LT",nextDay:"[Yfory am] LT",nextWeek:"dddd [am] LT",lastDay:"[Ddoe am] LT",lastWeek:"dddd [diwethaf am] LT",sameElse:"L"},relativeTime:{future:"mewn %s",past:"%s yn ôl",s:"ychydig eiliadau",m:"munud",mm:"%d munud",h:"awr",hh:"%d awr",d:"diwrnod",dd:"%d diwrnod",M:"mis",MM:"%d mis",y:"blwyddyn",yy:"%d flynedd"},ordinalParse:/\d{1,2}(fed|ain|af|il|ydd|ed|eg)/,ordinal:function(a){var b=a,c="",d=["","af","il","ydd","ydd","ed","ed","ed","fed","fed","fed","eg","fed","eg","eg","fed","eg","eg","fed","eg","fed"];return b>20?c=40===b||50===b||60===b||80===b||100===b?"fed":"ain":b>0&&(c=d[b]),a+c},week:{dow:1,doy:4}}),Kf.defineLocale("da",{months:"januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december".split("_"),monthsShort:"jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),weekdays:"søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),weekdaysShort:"søn_man_tir_ons_tor_fre_lør".split("_"),weekdaysMin:"sø_ma_ti_on_to_fr_lø".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY HH:mm",LLLL:"dddd [d.] D. MMMM YYYY HH:mm"},calendar:{sameDay:"[I dag kl.] LT",nextDay:"[I morgen kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[I går kl.] LT",lastWeek:"[sidste] dddd [kl] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"%s siden",s:"få sekunder",m:"et minut",mm:"%d minutter",h:"en time",hh:"%d timer",d:"en dag",dd:"%d dage",M:"en måned",MM:"%d måneder",y:"et år",yy:"%d år"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),Kf.defineLocale("de-at",{months:"Jänner_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),monthsShort:"Jän._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),weekdays:"Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),weekdaysShort:"So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),weekdaysMin:"So_Mo_Di_Mi_Do_Fr_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY HH:mm",LLLL:"dddd, D. MMMM YYYY HH:mm"},calendar:{sameDay:"[heute um] LT [Uhr]",sameElse:"L",nextDay:"[morgen um] LT [Uhr]",nextWeek:"dddd [um] LT [Uhr]",lastDay:"[gestern um] LT [Uhr]",lastWeek:"[letzten] dddd [um] LT [Uhr]"},relativeTime:{future:"in %s",past:"vor %s",s:"ein paar Sekunden",m:cd,mm:"%d Minuten",h:cd,hh:"%d Stunden",d:cd,dd:cd,M:cd,MM:cd,y:cd,yy:cd},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),Kf.defineLocale("de",{months:"Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),monthsShort:"Jan._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),weekdays:"Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),weekdaysShort:"So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),weekdaysMin:"So_Mo_Di_Mi_Do_Fr_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY HH:mm",LLLL:"dddd, D. MMMM YYYY HH:mm"},calendar:{sameDay:"[heute um] LT [Uhr]",sameElse:"L",nextDay:"[morgen um] LT [Uhr]",nextWeek:"dddd [um] LT [Uhr]",lastDay:"[gestern um] LT [Uhr]",lastWeek:"[letzten] dddd [um] LT [Uhr]"},relativeTime:{future:"in %s",past:"vor %s",s:"ein paar Sekunden",m:dd,mm:"%d Minuten",h:dd,hh:"%d Stunden",d:dd,dd:dd,M:dd,MM:dd,y:dd,yy:dd},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),["ޖެނުއަރީ","ފެބްރުއަރީ","މާރިޗު","އޭޕްރީލު","މޭ","ޖޫން","ޖުލައި","އޯގަސްޓު","ސެޕްޓެމްބަރު","އޮކްޓޯބަރު","ނޮވެމްބަރު","ޑިސެމްބަރު"]),_f=["އާދިއްތަ","ހޯމަ","އަންގާރަ","ބުދަ","ބުރާސްފަތި","ހުކުރު","ހޮނިހިރު"],ag=(Kf.defineLocale("dv",{months:$f,monthsShort:$f,weekdays:_f,weekdaysShort:_f,weekdaysMin:"އާދި_ހޯމަ_އަން_ބުދަ_ބުރާ_ހުކު_ހޮނި".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"D/M/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},meridiemParse:/މކ|މފ/,isPM:function(a){return""===a},meridiem:function(a,b,c){return 12>a?"މކ":"މފ"},calendar:{sameDay:"[މިއަދު] LT",nextDay:"[މާދަމާ] LT",nextWeek:"dddd LT",lastDay:"[އިއްޔެ] LT",lastWeek:"[ފާއިތުވި] dddd LT",sameElse:"L"},relativeTime:{future:"ތެރޭގައި %s",past:"ކުރިން %s",s:"ސިކުންތުކޮޅެއް",m:"މިނިޓެއް",mm:"މިނިޓު %d",h:"ގަޑިއިރެއް",hh:"ގަޑިއިރު %d",d:"ދުވަހެއް",dd:"ދުވަސް %d",M:"މަހެއް",MM:"މަސް %d",y:"އަހަރެއް",yy:"އަހަރު %d"},preparse:function(a){return a.replace(/،/g,",")},postformat:function(a){return a.replace(/,/g,"،")},week:{dow:7,doy:12}}),Kf.defineLocale("el",{monthsNominativeEl:"Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος".split("_"),monthsGenitiveEl:"Ιανουαρίου_Φεβρουαρίου_Μαρτίου_Απριλίου_Μαΐου_Ιουνίου_Ιουλίου_Αυγούστου_Σεπτεμβρίου_Οκτωβρίου_Νοεμβρίου_Δεκεμβρίου".split("_"),months:function(a,b){return/D/.test(b.substring(0,b.indexOf("MMMM")))?this._monthsGenitiveEl[a.month()]:this._monthsNominativeEl[a.month()]},monthsShort:"Ιαν_Φεβ_Μαρ_Απρ_Μαϊ_Ιουν_Ιουλ_Αυγ_Σεπ_Οκτ_Νοε_Δεκ".split("_"),weekdays:"Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο".split("_"),weekdaysShort:"Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ".split("_"),weekdaysMin:"Κυ_Δε_Τρ_Τε_Πε_Πα_Σα".split("_"),meridiem:function(a,b,c){return a>11?c?"μμ":"ΜΜ":c?"πμ":"ΠΜ"},isPM:function(a){return"μ"===(a+"").toLowerCase()[0]},meridiemParse:/[ΠΜ]\.?Μ?\.?/i,longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendarEl:{sameDay:"[Σήμερα {}] LT",nextDay:"[Αύριο {}] LT",nextWeek:"dddd [{}] LT",lastDay:"[Χθες {}] LT",lastWeek:function(){switch(this.day()){case 6:return"[το προηγούμενο] dddd [{}] LT";default:return"[την προηγούμενη] dddd [{}] LT"}},sameElse:"L"},calendar:function(a,b){var c=this._calendarEl[a],d=b&&b.hours();return D(c)&&(c=c.apply(b)),c.replace("{}",d%12===1?"στη":"στις")},relativeTime:{future:"σε %s",past:"%s πριν",s:"λίγα δευτερόλεπτα",m:"ένα λεπτό",mm:"%d λεπτά",h:"μία ώρα",hh:"%d ώρες",d:"μία μέρα",dd:"%d μέρες",M:"ένας μήνας",MM:"%d μήνες",y:"ένας χρόνος",yy:"%d χρόνια"},ordinalParse:/\d{1,2}η/,ordinal:"%dη",week:{dow:1,doy:4}}),Kf.defineLocale("en-au",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(a){var b=a%10,c=1===~~(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c},week:{dow:1,doy:4}}),Kf.defineLocale("en-ca",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"YYYY-MM-DD",LL:"D MMMM, YYYY",LLL:"D MMMM, YYYY h:mm A",LLLL:"dddd, D MMMM, YYYY h:mm A"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(a){var b=a%10,c=1===~~(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),Kf.defineLocale("en-gb",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(a){var b=a%10,c=1===~~(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c},week:{dow:1,doy:4}}),Kf.defineLocale("en-ie",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD-MM-YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(a){var b=a%10,c=1===~~(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c},week:{dow:1,doy:4}}),Kf.defineLocale("en-nz",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(a){var b=a%10,c=1===~~(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c},week:{dow:1,doy:4}}),Kf.defineLocale("eo",{months:"januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro".split("_"),monthsShort:"jan_feb_mar_apr_maj_jun_jul_aŭg_sep_okt_nov_dec".split("_"),weekdays:"Dimanĉo_Lundo_Mardo_Merkredo_Ĵaŭdo_Vendredo_Sabato".split("_"),
weekdaysShort:"Dim_Lun_Mard_Merk_Ĵaŭ_Ven_Sab".split("_"),weekdaysMin:"Di_Lu_Ma_Me_Ĵa_Ve_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"D[-an de] MMMM, YYYY",LLL:"D[-an de] MMMM, YYYY HH:mm",LLLL:"dddd, [la] D[-an de] MMMM, YYYY HH:mm"},meridiemParse:/[ap]\.t\.m/i,isPM:function(a){return"p"===a.charAt(0).toLowerCase()},meridiem:function(a,b,c){return a>11?c?"p.t.m.":"P.T.M.":c?"a.t.m.":"A.T.M."},calendar:{sameDay:"[Hodiaŭ je] LT",nextDay:"[Morgaŭ je] LT",nextWeek:"dddd [je] LT",lastDay:"[Hieraŭ je] LT",lastWeek:"[pasinta] dddd [je] LT",sameElse:"L"},relativeTime:{future:"je %s",past:"antaŭ %s",s:"sekundoj",m:"minuto",mm:"%d minutoj",h:"horo",hh:"%d horoj",d:"tago",dd:"%d tagoj",M:"monato",MM:"%d monatoj",y:"jaro",yy:"%d jaroj"},ordinalParse:/\d{1,2}a/,ordinal:"%da",week:{dow:1,doy:7}}),"ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_")),bg="ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),cg=(Kf.defineLocale("es",{months:"enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),monthsShort:function(a,b){return/-MMM-/.test(b)?bg[a.month()]:ag[a.month()]},weekdays:"domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),weekdaysShort:"dom._lun._mar._mié._jue._vie._sáb.".split("_"),weekdaysMin:"do_lu_ma_mi_ju_vi_sá".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY H:mm",LLLL:"dddd, D [de] MMMM [de] YYYY H:mm"},calendar:{sameDay:function(){return"[hoy a la"+(1!==this.hours()?"s":"")+"] LT"},nextDay:function(){return"[mañana a la"+(1!==this.hours()?"s":"")+"] LT"},nextWeek:function(){return"dddd [a la"+(1!==this.hours()?"s":"")+"] LT"},lastDay:function(){return"[ayer a la"+(1!==this.hours()?"s":"")+"] LT"},lastWeek:function(){return"[el] dddd [pasado a la"+(1!==this.hours()?"s":"")+"] LT"},sameElse:"L"},relativeTime:{future:"en %s",past:"hace %s",s:"unos segundos",m:"un minuto",mm:"%d minutos",h:"una hora",hh:"%d horas",d:"un día",dd:"%d días",M:"un mes",MM:"%d meses",y:"un año",yy:"%d años"},ordinalParse:/\d{1,2}º/,ordinal:"%dº",week:{dow:1,doy:4}}),Kf.defineLocale("et",{months:"jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember".split("_"),monthsShort:"jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets".split("_"),weekdays:"pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev".split("_"),weekdaysShort:"P_E_T_K_N_R_L".split("_"),weekdaysMin:"P_E_T_K_N_R_L".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[Täna,] LT",nextDay:"[Homme,] LT",nextWeek:"[Järgmine] dddd LT",lastDay:"[Eile,] LT",lastWeek:"[Eelmine] dddd LT",sameElse:"L"},relativeTime:{future:"%s pärast",past:"%s tagasi",s:ed,m:ed,mm:ed,h:ed,hh:ed,d:ed,dd:"%d päeva",M:ed,MM:ed,y:ed,yy:ed},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),Kf.defineLocale("eu",{months:"urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua".split("_"),monthsShort:"urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.".split("_"),weekdays:"igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata".split("_"),weekdaysShort:"ig._al._ar._az._og._ol._lr.".split("_"),weekdaysMin:"ig_al_ar_az_og_ol_lr".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"YYYY[ko] MMMM[ren] D[a]",LLL:"YYYY[ko] MMMM[ren] D[a] HH:mm",LLLL:"dddd, YYYY[ko] MMMM[ren] D[a] HH:mm",l:"YYYY-M-D",ll:"YYYY[ko] MMM D[a]",lll:"YYYY[ko] MMM D[a] HH:mm",llll:"ddd, YYYY[ko] MMM D[a] HH:mm"},calendar:{sameDay:"[gaur] LT[etan]",nextDay:"[bihar] LT[etan]",nextWeek:"dddd LT[etan]",lastDay:"[atzo] LT[etan]",lastWeek:"[aurreko] dddd LT[etan]",sameElse:"L"},relativeTime:{future:"%s barru",past:"duela %s",s:"segundo batzuk",m:"minutu bat",mm:"%d minutu",h:"ordu bat",hh:"%d ordu",d:"egun bat",dd:"%d egun",M:"hilabete bat",MM:"%d hilabete",y:"urte bat",yy:"%d urte"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),{1:"۱",2:"۲",3:"۳",4:"۴",5:"۵",6:"۶",7:"۷",8:"۸",9:"۹",0:"۰"}),dg={"۱":"1","۲":"2","۳":"3","۴":"4","۵":"5","۶":"6","۷":"7","۸":"8","۹":"9","۰":"0"},eg=(Kf.defineLocale("fa",{months:"ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"),monthsShort:"ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"),weekdays:"یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"),weekdaysShort:"یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"),weekdaysMin:"ی_د_س_چ_پ_ج_ش".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},meridiemParse:/قبل از ظهر|بعد از ظهر/,isPM:function(a){return/بعد از ظهر/.test(a)},meridiem:function(a,b,c){return 12>a?"قبل از ظهر":"بعد از ظهر"},calendar:{sameDay:"[امروز ساعت] LT",nextDay:"[فردا ساعت] LT",nextWeek:"dddd [ساعت] LT",lastDay:"[دیروز ساعت] LT",lastWeek:"dddd [پیش] [ساعت] LT",sameElse:"L"},relativeTime:{future:"در %s",past:"%s پیش",s:"چندین ثانیه",m:"یک دقیقه",mm:"%d دقیقه",h:"یک ساعت",hh:"%d ساعت",d:"یک روز",dd:"%d روز",M:"یک ماه",MM:"%d ماه",y:"یک سال",yy:"%d سال"},preparse:function(a){return a.replace(/[۰-۹]/g,function(a){return dg[a]}).replace(/،/g,",")},postformat:function(a){return a.replace(/\d/g,function(a){return cg[a]}).replace(/,/g,"،")},ordinalParse:/\d{1,2}م/,ordinal:"%dم",week:{dow:6,doy:12}}),"nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän".split(" ")),fg=["nolla","yhden","kahden","kolmen","neljän","viiden","kuuden",eg[7],eg[8],eg[9]],gg=(Kf.defineLocale("fi",{months:"tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu".split("_"),monthsShort:"tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu".split("_"),weekdays:"sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai".split("_"),weekdaysShort:"su_ma_ti_ke_to_pe_la".split("_"),weekdaysMin:"su_ma_ti_ke_to_pe_la".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD.MM.YYYY",LL:"Do MMMM[ta] YYYY",LLL:"Do MMMM[ta] YYYY, [klo] HH.mm",LLLL:"dddd, Do MMMM[ta] YYYY, [klo] HH.mm",l:"D.M.YYYY",ll:"Do MMM YYYY",lll:"Do MMM YYYY, [klo] HH.mm",llll:"ddd, Do MMM YYYY, [klo] HH.mm"},calendar:{sameDay:"[tänään] [klo] LT",nextDay:"[huomenna] [klo] LT",nextWeek:"dddd [klo] LT",lastDay:"[eilen] [klo] LT",lastWeek:"[viime] dddd[na] [klo] LT",sameElse:"L"},relativeTime:{future:"%s päästä",past:"%s sitten",s:fd,m:fd,mm:fd,h:fd,hh:fd,d:fd,dd:fd,M:fd,MM:fd,y:fd,yy:fd},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),Kf.defineLocale("fo",{months:"januar_februar_mars_apríl_mai_juni_juli_august_september_oktober_november_desember".split("_"),monthsShort:"jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),weekdays:"sunnudagur_mánadagur_týsdagur_mikudagur_hósdagur_fríggjadagur_leygardagur".split("_"),weekdaysShort:"sun_mán_týs_mik_hós_frí_ley".split("_"),weekdaysMin:"su_má_tý_mi_hó_fr_le".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D. MMMM, YYYY HH:mm"},calendar:{sameDay:"[Í dag kl.] LT",nextDay:"[Í morgin kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[Í gjár kl.] LT",lastWeek:"[síðstu] dddd [kl] LT",sameElse:"L"},relativeTime:{future:"um %s",past:"%s síðani",s:"fá sekund",m:"ein minutt",mm:"%d minuttir",h:"ein tími",hh:"%d tímar",d:"ein dagur",dd:"%d dagar",M:"ein mánaði",MM:"%d mánaðir",y:"eitt ár",yy:"%d ár"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),Kf.defineLocale("fr-ca",{months:"janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),monthsShort:"janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"),weekdaysMin:"Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[Aujourd'hui à] LT",nextDay:"[Demain à] LT",nextWeek:"dddd [à] LT",lastDay:"[Hier à] LT",lastWeek:"dddd [dernier à] LT",sameElse:"L"},relativeTime:{future:"dans %s",past:"il y a %s",s:"quelques secondes",m:"une minute",mm:"%d minutes",h:"une heure",hh:"%d heures",d:"un jour",dd:"%d jours",M:"un mois",MM:"%d mois",y:"un an",yy:"%d ans"},ordinalParse:/\d{1,2}(er|e)/,ordinal:function(a){return a+(1===a?"er":"e")}}),Kf.defineLocale("fr-ch",{months:"janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),monthsShort:"janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"),weekdaysMin:"Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[Aujourd'hui à] LT",nextDay:"[Demain à] LT",nextWeek:"dddd [à] LT",lastDay:"[Hier à] LT",lastWeek:"dddd [dernier à] LT",sameElse:"L"},relativeTime:{future:"dans %s",past:"il y a %s",s:"quelques secondes",m:"une minute",mm:"%d minutes",h:"une heure",hh:"%d heures",d:"un jour",dd:"%d jours",M:"un mois",MM:"%d mois",y:"un an",yy:"%d ans"},ordinalParse:/\d{1,2}(er|e)/,ordinal:function(a){return a+(1===a?"er":"e")},week:{dow:1,doy:4}}),Kf.defineLocale("fr",{months:"janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),monthsShort:"janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"),weekdaysMin:"Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[Aujourd'hui à] LT",nextDay:"[Demain à] LT",nextWeek:"dddd [à] LT",lastDay:"[Hier à] LT",lastWeek:"dddd [dernier à] LT",sameElse:"L"},relativeTime:{future:"dans %s",past:"il y a %s",s:"quelques secondes",m:"une minute",mm:"%d minutes",h:"une heure",hh:"%d heures",d:"un jour",dd:"%d jours",M:"un mois",MM:"%d mois",y:"un an",yy:"%d ans"},ordinalParse:/\d{1,2}(er|)/,ordinal:function(a){return a+(1===a?"er":"")},week:{dow:1,doy:4}}),"jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.".split("_")),hg="jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),ig=(Kf.defineLocale("fy",{months:"jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber".split("_"),monthsShort:function(a,b){return/-MMM-/.test(b)?hg[a.month()]:gg[a.month()]},weekdays:"snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon".split("_"),weekdaysShort:"si._mo._ti._wo._to._fr._so.".split("_"),weekdaysMin:"Si_Mo_Ti_Wo_To_Fr_So".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD-MM-YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[hjoed om] LT",nextDay:"[moarn om] LT",nextWeek:"dddd [om] LT",lastDay:"[juster om] LT",lastWeek:"[ôfrûne] dddd [om] LT",sameElse:"L"},relativeTime:{future:"oer %s",past:"%s lyn",s:"in pear sekonden",m:"ien minút",mm:"%d minuten",h:"ien oere",hh:"%d oeren",d:"ien dei",dd:"%d dagen",M:"ien moanne",MM:"%d moannen",y:"ien jier",yy:"%d jierren"},ordinalParse:/\d{1,2}(ste|de)/,ordinal:function(a){return a+(1===a||8===a||a>=20?"ste":"de")},week:{dow:1,doy:4}}),["Am Faoilleach","An Gearran","Am Màrt","An Giblean","An Cèitean","An t-Ògmhios","An t-Iuchar","An Lùnastal","An t-Sultain","An Dàmhair","An t-Samhain","An Dùbhlachd"]),jg=["Faoi","Gear","Màrt","Gibl","Cèit","Ògmh","Iuch","Lùn","Sult","Dàmh","Samh","Dùbh"],kg=["Didòmhnaich","Diluain","Dimàirt","Diciadain","Diardaoin","Dihaoine","Disathairne"],lg=["Did","Dil","Dim","Dic","Dia","Dih","Dis"],mg=["Dò","Lu","Mà","Ci","Ar","Ha","Sa"],ng=(Kf.defineLocale("gd",{months:ig,monthsShort:jg,monthsParseExact:!0,weekdays:kg,weekdaysShort:lg,weekdaysMin:mg,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[An-diugh aig] LT",nextDay:"[A-màireach aig] LT",nextWeek:"dddd [aig] LT",lastDay:"[An-dè aig] LT",lastWeek:"dddd [seo chaidh] [aig] LT",sameElse:"L"},relativeTime:{future:"ann an %s",past:"bho chionn %s",s:"beagan diogan",m:"mionaid",mm:"%d mionaidean",h:"uair",hh:"%d uairean",d:"latha",dd:"%d latha",M:"mìos",MM:"%d mìosan",y:"bliadhna",yy:"%d bliadhna"},ordinalParse:/\d{1,2}(d|na|mh)/,ordinal:function(a){var b=1===a?"d":a%10===2?"na":"mh";return a+b},week:{dow:1,doy:4}}),Kf.defineLocale("gl",{months:"Xaneiro_Febreiro_Marzo_Abril_Maio_Xuño_Xullo_Agosto_Setembro_Outubro_Novembro_Decembro".split("_"),monthsShort:"Xan._Feb._Mar._Abr._Mai._Xuñ._Xul._Ago._Set._Out._Nov._Dec.".split("_"),weekdays:"Domingo_Luns_Martes_Mércores_Xoves_Venres_Sábado".split("_"),weekdaysShort:"Dom._Lun._Mar._Mér._Xov._Ven._Sáb.".split("_"),weekdaysMin:"Do_Lu_Ma_Mé_Xo_Ve_Sá".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY H:mm",LLLL:"dddd D MMMM YYYY H:mm"},calendar:{sameDay:function(){return"[hoxe "+(1!==this.hours()?"ás":"á")+"] LT"},nextDay:function(){return"[mañá "+(1!==this.hours()?"ás":"á")+"] LT"},nextWeek:function(){return"dddd ["+(1!==this.hours()?"ás":"a")+"] LT"},lastDay:function(){return"[onte "+(1!==this.hours()?"á":"a")+"] LT"},lastWeek:function(){return"[o] dddd [pasado "+(1!==this.hours()?"ás":"a")+"] LT"},sameElse:"L"},relativeTime:{future:function(a){return"uns segundos"===a?"nuns segundos":"en "+a},past:"hai %s",s:"uns segundos",m:"un minuto",mm:"%d minutos",h:"unha hora",hh:"%d horas",d:"un día",dd:"%d días",M:"un mes",MM:"%d meses",y:"un ano",yy:"%d anos"},ordinalParse:/\d{1,2}º/,ordinal:"%dº",week:{dow:1,doy:7}}),Kf.defineLocale("he",{months:"ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר".split("_"),monthsShort:"ינו׳_פבר׳_מרץ_אפר׳_מאי_יוני_יולי_אוג׳_ספט׳_אוק׳_נוב׳_דצמ׳".split("_"),weekdays:"ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת".split("_"),weekdaysShort:"א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳".split("_"),weekdaysMin:"א_ב_ג_ד_ה_ו_ש".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D [ב]MMMM YYYY",LLL:"D [ב]MMMM YYYY HH:mm",LLLL:"dddd, D [ב]MMMM YYYY HH:mm",l:"D/M/YYYY",ll:"D MMM YYYY",lll:"D MMM YYYY HH:mm",llll:"ddd, D MMM YYYY HH:mm"},calendar:{sameDay:"[היום ב־]LT",nextDay:"[מחר ב־]LT",nextWeek:"dddd [בשעה] LT",lastDay:"[אתמול ב־]LT",lastWeek:"[ביום] dddd [האחרון בשעה] LT",sameElse:"L"},relativeTime:{future:"בעוד %s",past:"לפני %s",s:"מספר שניות",m:"דקה",mm:"%d דקות",h:"שעה",hh:function(a){return 2===a?"שעתיים":a+" שעות"},d:"יום",dd:function(a){return 2===a?"יומיים":a+" ימים"},M:"חודש",MM:function(a){return 2===a?"חודשיים":a+" חודשים"},y:"שנה",yy:function(a){return 2===a?"שנתיים":a%10===0&&10!==a?a+" שנה":a+" שנים"}}}),{1:"१",2:"२",3:"३",4:"४",5:"५",6:"६",7:"७",8:"८",9:"९",0:"०"}),og={"१":"1","२":"2","३":"3","४":"4","५":"5","६":"6","७":"7","८":"8","९":"9","०":"0"},pg=(Kf.defineLocale("hi",{months:"जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर".split("_"),monthsShort:"जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.".split("_"),weekdays:"रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"),weekdaysShort:"रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि".split("_"),weekdaysMin:"र_सो_मं_बु_गु_शु_श".split("_"),longDateFormat:{LT:"A h:mm बजे",LTS:"A h:mm:ss बजे",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm बजे",LLLL:"dddd, D MMMM YYYY, A h:mm बजे"},calendar:{sameDay:"[आज] LT",nextDay:"[कल] LT",nextWeek:"dddd, LT",lastDay:"[कल] LT",lastWeek:"[पिछले] dddd, LT",sameElse:"L"},relativeTime:{future:"%s में",past:"%s पहले",s:"कुछ ही क्षण",m:"एक मिनट",mm:"%d मिनट",h:"एक घंटा",hh:"%d घंटे",d:"एक दिन",dd:"%d दिन",M:"एक महीने",MM:"%d महीने",y:"एक वर्ष",yy:"%d वर्ष"},preparse:function(a){return a.replace(/[१२३४५६७८९०]/g,function(a){return og[a]})},postformat:function(a){return a.replace(/\d/g,function(a){return ng[a]})},meridiemParse:/रात|सुबह|दोपहर|शाम/,meridiemHour:function(a,b){return 12===a&&(a=0),"रात"===b?4>a?a:a+12:"सुबह"===b?a:"दोपहर"===b?a>=10?a:a+12:"शाम"===b?a+12:void 0},meridiem:function(a,b,c){return 4>a?"रात":10>a?"सुबह":17>a?"दोपहर":20>a?"शाम":"रात"},week:{dow:0,doy:6}}),Kf.defineLocale("hr",{months:{format:"siječnja_veljače_ožujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenoga_prosinca".split("_"),standalone:"siječanj_veljača_ožujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac".split("_")},monthsShort:"sij._velj._ožu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.".split("_"),weekdays:"nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"),weekdaysShort:"ned._pon._uto._sri._čet._pet._sub.".split("_"),weekdaysMin:"ne_po_ut_sr_če_pe_su".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD. MM. YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danas u] LT",nextDay:"[sutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedjelju] [u] LT";case 3:return"[u] [srijedu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT"}},lastDay:"[jučer u] LT",lastWeek:function(){switch(this.day()){case 0:case 3:return"[prošlu] dddd [u] LT";case 6:return"[prošle] [subote] [u] LT";case 1:case 2:case 4:case 5:return"[prošli] dddd [u] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"prije %s",s:"par sekundi",m:hd,mm:hd,h:hd,hh:hd,d:"dan",dd:hd,M:"mjesec",MM:hd,y:"godinu",yy:hd},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),"vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton".split(" ")),qg=(Kf.defineLocale("hu",{months:"január_február_március_április_május_június_július_augusztus_szeptember_október_november_december".split("_"),monthsShort:"jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec".split("_"),weekdays:"vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat".split("_"),weekdaysShort:"vas_hét_kedd_sze_csüt_pén_szo".split("_"),weekdaysMin:"v_h_k_sze_cs_p_szo".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"YYYY.MM.DD.",LL:"YYYY. MMMM D.",LLL:"YYYY. MMMM D. H:mm",LLLL:"YYYY. MMMM D., dddd H:mm"},meridiemParse:/de|du/i,isPM:function(a){return"u"===a.charAt(1).toLowerCase()},meridiem:function(a,b,c){return 12>a?c===!0?"de":"DE":c===!0?"du":"DU"},calendar:{sameDay:"[ma] LT[-kor]",nextDay:"[holnap] LT[-kor]",nextWeek:function(){return jd.call(this,!0)},lastDay:"[tegnap] LT[-kor]",lastWeek:function(){return jd.call(this,!1)},sameElse:"L"},relativeTime:{future:"%s múlva",past:"%s",s:id,m:id,mm:id,h:id,hh:id,d:id,dd:id,M:id,MM:id,y:id,yy:id},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),Kf.defineLocale("hy-am",{months:{format:"հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի".split("_"),standalone:"հունվար_փետրվար_մարտ_ապրիլ_մայիս_հունիս_հուլիս_օգոստոս_սեպտեմբեր_հոկտեմբեր_նոյեմբեր_դեկտեմբեր".split("_")},monthsShort:"հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ".split("_"),weekdays:"կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ".split("_"),weekdaysShort:"կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"),weekdaysMin:"կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY թ.",LLL:"D MMMM YYYY թ., HH:mm",LLLL:"dddd, D MMMM YYYY թ., HH:mm"},calendar:{sameDay:"[այսօր] LT",nextDay:"[վաղը] LT",lastDay:"[երեկ] LT",nextWeek:function(){return"dddd [օրը ժամը] LT"},lastWeek:function(){return"[անցած] dddd [օրը ժամը] LT"},sameElse:"L"},relativeTime:{future:"%s հետո",past:"%s առաջ",s:"մի քանի վայրկյան",m:"րոպե",mm:"%d րոպե",h:"ժամ",hh:"%d ժամ",d:"օր",dd:"%d օր",M:"ամիս",MM:"%d ամիս",y:"տարի",yy:"%d տարի"},meridiemParse:/գիշերվա|առավոտվա|ցերեկվա|երեկոյան/,isPM:function(a){return/^(ցերեկվա|երեկոյան)$/.test(a)},meridiem:function(a){return 4>a?"գիշերվա":12>a?"առավոտվա":17>a?"ցերեկվա":"երեկոյան"},ordinalParse:/\d{1,2}|\d{1,2}-(ին|րդ)/,ordinal:function(a,b){switch(b){case"DDD":case"w":case"W":case"DDDo":return 1===a?a+"-ին":a+"-րդ";default:return a}},week:{dow:1,doy:7}}),Kf.defineLocale("id",{months:"Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split("_"),monthsShort:"Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des".split("_"),weekdays:"Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"),weekdaysShort:"Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"),weekdaysMin:"Mg_Sn_Sl_Rb_Km_Jm_Sb".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] HH.mm",LLLL:"dddd, D MMMM YYYY [pukul] HH.mm"},meridiemParse:/pagi|siang|sore|malam/,meridiemHour:function(a,b){return 12===a&&(a=0),"pagi"===b?a:"siang"===b?a>=11?a:a+12:"sore"===b||"malam"===b?a+12:void 0},meridiem:function(a,b,c){return 11>a?"pagi":15>a?"siang":19>a?"sore":"malam"},calendar:{sameDay:"[Hari ini pukul] LT",nextDay:"[Besok pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kemarin pukul] LT",lastWeek:"dddd [lalu pukul] LT",sameElse:"L"},relativeTime:{future:"dalam %s",past:"%s yang lalu",s:"beberapa detik",m:"semenit",mm:"%d menit",h:"sejam",hh:"%d jam",d:"sehari",dd:"%d hari",M:"sebulan",MM:"%d bulan",y:"setahun",yy:"%d tahun"},week:{dow:1,doy:7}}),Kf.defineLocale("is",{months:"janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember".split("_"),monthsShort:"jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des".split("_"),weekdays:"sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur".split("_"),weekdaysShort:"sun_mán_þri_mið_fim_fös_lau".split("_"),weekdaysMin:"Su_Má_Þr_Mi_Fi_Fö_La".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD/MM/YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY [kl.] H:mm",LLLL:"dddd, D. MMMM YYYY [kl.] H:mm"},calendar:{sameDay:"[í dag kl.] LT",nextDay:"[á morgun kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[í gær kl.] LT",lastWeek:"[síðasta] dddd [kl.] LT",sameElse:"L"},relativeTime:{future:"eftir %s",past:"fyrir %s síðan",s:ld,m:ld,mm:ld,h:"klukkustund",hh:ld,d:ld,dd:ld,M:ld,MM:ld,y:ld,yy:ld},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),Kf.defineLocale("it",{months:"gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split("_"),monthsShort:"gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"),weekdays:"Domenica_Lunedì_Martedì_Mercoledì_Giovedì_Venerdì_Sabato".split("_"),weekdaysShort:"Dom_Lun_Mar_Mer_Gio_Ven_Sab".split("_"),weekdaysMin:"Do_Lu_Ma_Me_Gi_Ve_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Oggi alle] LT",nextDay:"[Domani alle] LT",nextWeek:"dddd [alle] LT",lastDay:"[Ieri alle] LT",lastWeek:function(){switch(this.day()){case 0:return"[la scorsa] dddd [alle] LT";default:return"[lo scorso] dddd [alle] LT"}},sameElse:"L"},relativeTime:{future:function(a){return(/^[0-9].+$/.test(a)?"tra":"in")+" "+a},past:"%s fa",s:"alcuni secondi",m:"un minuto",mm:"%d minuti",h:"un'ora",hh:"%d ore",d:"un giorno",dd:"%d giorni",M:"un mese",MM:"%d mesi",y:"un anno",yy:"%d anni"},ordinalParse:/\d{1,2}º/,ordinal:"%dº",week:{dow:1,doy:4}}),Kf.defineLocale("ja",{months:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),weekdays:"日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日".split("_"),weekdaysShort:"日_月_火_水_木_金_土".split("_"),weekdaysMin:"日_月_火_水_木_金_土".split("_"),longDateFormat:{LT:"Ah時m分",LTS:"Ah時m分s秒",L:"YYYY/MM/DD",LL:"YYYY年M月D日",LLL:"YYYY年M月D日Ah時m分",LLLL:"YYYY年M月D日Ah時m分 dddd"},meridiemParse:/午前|午後/i,isPM:function(a){return"午後"===a},meridiem:function(a,b,c){return 12>a?"午前":"午後"},calendar:{sameDay:"[今日] LT",nextDay:"[明日] LT",nextWeek:"[来週]dddd LT",lastDay:"[昨日] LT",lastWeek:"[前週]dddd LT",sameElse:"L"},relativeTime:{future:"%s後",past:"%s前",s:"数秒",m:"1分",mm:"%d分",h:"1時間",hh:"%d時間",d:"1日",dd:"%d日",M:"1ヶ月",MM:"%dヶ月",y:"1年",yy:"%d年"}}),Kf.defineLocale("jv",{months:"Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember".split("_"),monthsShort:"Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des".split("_"),weekdays:"Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu".split("_"),weekdaysShort:"Min_Sen_Sel_Reb_Kem_Jem_Sep".split("_"),weekdaysMin:"Mg_Sn_Sl_Rb_Km_Jm_Sp".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] HH.mm",LLLL:"dddd, D MMMM YYYY [pukul] HH.mm"},meridiemParse:/enjing|siyang|sonten|ndalu/,meridiemHour:function(a,b){return 12===a&&(a=0),"enjing"===b?a:"siyang"===b?a>=11?a:a+12:"sonten"===b||"ndalu"===b?a+12:void 0},meridiem:function(a,b,c){return 11>a?"enjing":15>a?"siyang":19>a?"sonten":"ndalu"},calendar:{sameDay:"[Dinten puniko pukul] LT",nextDay:"[Mbenjang pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kala wingi pukul] LT",lastWeek:"dddd [kepengker pukul] LT",sameElse:"L"},relativeTime:{future:"wonten ing %s",past:"%s ingkang kepengker",s:"sawetawis detik",m:"setunggal menit",mm:"%d menit",h:"setunggal jam",hh:"%d jam",d:"sedinten",dd:"%d dinten",M:"sewulan",MM:"%d wulan",y:"setaun",yy:"%d taun"},week:{dow:1,doy:7}}),Kf.defineLocale("ka",{months:{standalone:"იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი".split("_"),format:"იანვარს_თებერვალს_მარტს_აპრილის_მაისს_ივნისს_ივლისს_აგვისტს_სექტემბერს_ოქტომბერს_ნოემბერს_დეკემბერს".split("_")},monthsShort:"იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ".split("_"),weekdays:{standalone:"კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი".split("_"),format:"კვირას_ორშაბათს_სამშაბათს_ოთხშაბათს_ხუთშაბათს_პარასკევს_შაბათს".split("_"),isFormat:/(წინა|შემდეგ)/},weekdaysShort:"კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ".split("_"),weekdaysMin:"კვ_ორ_სა_ოთ_ხუ_პა_შა".split("_"),longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendar:{sameDay:"[დღეს] LT[-ზე]",nextDay:"[ხვალ] LT[-ზე]",lastDay:"[გუშინ] LT[-ზე]",nextWeek:"[შემდეგ] dddd LT[-ზე]",lastWeek:"[წინა] dddd LT-ზე",sameElse:"L"},relativeTime:{future:function(a){return/(წამი|წუთი|საათი|წელი)/.test(a)?a.replace(/ი$/,"ში"):a+"ში"},past:function(a){return/(წამი|წუთი|საათი|დღე|თვე)/.test(a)?a.replace(/(ი|ე)$/,"ის წინ"):/წელი/.test(a)?a.replace(/წელი$/,"წლის წინ"):void 0},s:"რამდენიმე წამი",m:"წუთი",mm:"%d წუთი",h:"საათი",hh:"%d საათი",d:"დღე",dd:"%d დღე",M:"თვე",MM:"%d თვე",y:"წელი",yy:"%d წელი"},ordinalParse:/0|1-ლი|მე-\d{1,2}|\d{1,2}-ე/,ordinal:function(a){return 0===a?a:1===a?a+"-ლი":20>a||100>=a&&a%20===0||a%100===0?"მე-"+a:a+"-ე"},week:{dow:1,doy:7}}),{0:"-ші",1:"-ші",2:"-ші",3:"-ші",4:"-ші",5:"-ші",6:"-шы",7:"-ші",8:"-ші",9:"-шы",10:"-шы",20:"-шы",30:"-шы",40:"-шы",50:"-ші",60:"-шы",70:"-ші",80:"-ші",90:"-шы",100:"-ші"}),rg=(Kf.defineLocale("kk",{months:"Қаңтар_Ақпан_Наурыз_Сәуір_Мамыр_Маусым_Шілде_Тамыз_Қыркүйек_Қазан_Қараша_Желтоқсан".split("_"),monthsShort:"Қаң_Ақп_Нау_Сәу_Мам_Мау_Шіл_Там_Қыр_Қаз_Қар_Жел".split("_"),weekdays:"Жексенбі_Дүйсенбі_Сейсенбі_Сәрсенбі_Бейсенбі_Жұма_Сенбі".split("_"),weekdaysShort:"Жек_Дүй_Сей_Сәр_Бей_Жұм_Сен".split("_"),weekdaysMin:"Жк_Дй_Сй_Ср_Бй_Жм_Сн".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Бүгін сағат] LT",nextDay:"[Ертең сағат] LT",nextWeek:"dddd [сағат] LT",lastDay:"[Кеше сағат] LT",lastWeek:"[Өткен аптаның] dddd [сағат] LT",sameElse:"L"},relativeTime:{future:"%s ішінде",past:"%s бұрын",s:"бірнеше секунд",m:"бір минут",mm:"%d минут",h:"бір сағат",hh:"%d сағат",d:"бір күн",dd:"%d күн",M:"бір ай",MM:"%d ай",y:"бір жыл",yy:"%d жыл"},ordinalParse:/\d{1,2}-(ші|шы)/,ordinal:function(a){var b=a%10,c=a>=100?100:null;return a+(qg[a]||qg[b]||qg[c])},week:{dow:1,doy:7}}),Kf.defineLocale("km",{months:"មករា_កុម្ភៈ_មិនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ".split("_"),monthsShort:"មករា_កុម្ភៈ_មិនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ".split("_"),weekdays:"អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"),weekdaysShort:"អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"),weekdaysMin:"អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[ថ្ងៃនេះ ម៉ោង] LT",nextDay:"[ស្អែក ម៉ោង] LT",nextWeek:"dddd [ម៉ោង] LT",lastDay:"[ម្សិលមិញ ម៉ោង] LT",lastWeek:"dddd [សប្តាហ៍មុន] [ម៉ោង] LT",sameElse:"L"},relativeTime:{future:"%sទៀត",past:"%sមុន",s:"ប៉ុន្មានវិនាទី",m:"មួយនាទី",mm:"%d នាទី",h:"មួយម៉ោង",hh:"%d ម៉ោង",d:"មួយថ្ងៃ",dd:"%d ថ្ងៃ",M:"មួយខែ",MM:"%d ខែ",y:"មួយឆ្នាំ",yy:"%d ឆ្នាំ"},week:{dow:1,doy:4}}),Kf.defineLocale("ko",{months:"1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),monthsShort:"1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),weekdays:"일요일_월요일_화요일_수요일_목요일_금요일_토요일".split("_"),weekdaysShort:"일_월_화_수_목_금_토".split("_"),weekdaysMin:"일_월_화_수_목_금_토".split("_"),longDateFormat:{LT:"A h시 m분",LTS:"A h시 m분 s초",L:"YYYY.MM.DD",LL:"YYYY년 MMMM D일",LLL:"YYYY년 MMMM D일 A h시 m분",LLLL:"YYYY년 MMMM D일 dddd A h시 m분"},calendar:{sameDay:"오늘 LT",nextDay:"내일 LT",nextWeek:"dddd LT",lastDay:"어제 LT",lastWeek:"지난주 dddd LT",sameElse:"L"},relativeTime:{future:"%s 후",past:"%s 전",s:"몇초",ss:"%d초",m:"일분",mm:"%d분",h:"한시간",hh:"%d시간",d:"하루",dd:"%d일",M:"한달",MM:"%d달",y:"일년",yy:"%d년"},ordinalParse:/\d{1,2}일/,ordinal:"%d일",meridiemParse:/오전|오후/,isPM:function(a){return"오후"===a},meridiem:function(a,b,c){return 12>a?"오전":"오후"}}),Kf.defineLocale("lb",{months:"Januar_Februar_Mäerz_Abrëll_Mee_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),monthsShort:"Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),weekdays:"Sonndeg_Méindeg_Dënschdeg_Mëttwoch_Donneschdeg_Freideg_Samschdeg".split("_"),weekdaysShort:"So._Mé._Dë._Më._Do._Fr._Sa.".split("_"),weekdaysMin:"So_Mé_Dë_Më_Do_Fr_Sa".split("_"),longDateFormat:{LT:"H:mm [Auer]",LTS:"H:mm:ss [Auer]",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm [Auer]",LLLL:"dddd, D. MMMM YYYY H:mm [Auer]"},calendar:{sameDay:"[Haut um] LT",sameElse:"L",nextDay:"[Muer um] LT",nextWeek:"dddd [um] LT",lastDay:"[Gëschter um] LT",lastWeek:function(){switch(this.day()){case 2:case 4:return"[Leschten] dddd [um] LT";default:return"[Leschte] dddd [um] LT"}}},relativeTime:{future:nd,past:od,s:"e puer Sekonnen",m:md,mm:"%d Minutten",h:md,hh:"%d Stonnen",d:md,dd:"%d Deeg",M:md,MM:"%d Méint",y:md,yy:"%d Joer"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),Kf.defineLocale("lo",{months:"ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ".split("_"),monthsShort:"ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ".split("_"),weekdays:"ອາທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ".split("_"),weekdaysShort:"ທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ".split("_"),weekdaysMin:"ທ_ຈ_ອຄ_ພ_ພຫ_ສກ_ສ".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"ວັນdddd D MMMM YYYY HH:mm"},meridiemParse:/ຕອນເຊົ້າ|ຕອນແລງ/,isPM:function(a){return"ຕອນແລງ"===a},meridiem:function(a,b,c){return 12>a?"ຕອນເຊົ້າ":"ຕອນແລງ"},calendar:{sameDay:"[ມື້ນີ້ເວລາ] LT",nextDay:"[ມື້ອື່ນເວລາ] LT",nextWeek:"[ວັນ]dddd[ໜ້າເວລາ] LT",lastDay:"[ມື້ວານນີ້ເວລາ] LT",lastWeek:"[ວັນ]dddd[ແລ້ວນີ້ເວລາ] LT",sameElse:"L"},relativeTime:{future:"ອີກ %s",past:"%sຜ່ານມາ",s:"ບໍ່ເທົ່າໃດວິນາທີ",m:"1 ນາທີ",mm:"%d ນາທີ",h:"1 ຊົ່ວໂມງ",hh:"%d ຊົ່ວໂມງ",d:"1 ມື້",dd:"%d ມື້",M:"1 ເດືອນ",MM:"%d ເດືອນ",y:"1 ປີ",yy:"%d ປີ"},ordinalParse:/(ທີ່)\d{1,2}/,ordinal:function(a){
return"ທີ່"+a}}),{m:"minutė_minutės_minutę",mm:"minutės_minučių_minutes",h:"valanda_valandos_valandą",hh:"valandos_valandų_valandas",d:"diena_dienos_dieną",dd:"dienos_dienų_dienas",M:"mėnuo_mėnesio_mėnesį",MM:"mėnesiai_mėnesių_mėnesius",y:"metai_metų_metus",yy:"metai_metų_metus"}),sg=(Kf.defineLocale("lt",{months:{format:"sausio_vasario_kovo_balandžio_gegužės_birželio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio".split("_"),standalone:"sausis_vasaris_kovas_balandis_gegužė_birželis_liepa_rugpjūtis_rugsėjis_spalis_lapkritis_gruodis".split("_")},monthsShort:"sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd".split("_"),weekdays:{format:"sekmadienį_pirmadienį_antradienį_trečiadienį_ketvirtadienį_penktadienį_šeštadienį".split("_"),standalone:"sekmadienis_pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis".split("_"),isFormat:/dddd HH:mm/},weekdaysShort:"Sek_Pir_Ant_Tre_Ket_Pen_Šeš".split("_"),weekdaysMin:"S_P_A_T_K_Pn_Š".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"YYYY [m.] MMMM D [d.]",LLL:"YYYY [m.] MMMM D [d.], HH:mm [val.]",LLLL:"YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]",l:"YYYY-MM-DD",ll:"YYYY [m.] MMMM D [d.]",lll:"YYYY [m.] MMMM D [d.], HH:mm [val.]",llll:"YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]"},calendar:{sameDay:"[Šiandien] LT",nextDay:"[Rytoj] LT",nextWeek:"dddd LT",lastDay:"[Vakar] LT",lastWeek:"[Praėjusį] dddd LT",sameElse:"L"},relativeTime:{future:"po %s",past:"prieš %s",s:qd,m:rd,mm:ud,h:rd,hh:ud,d:rd,dd:ud,M:rd,MM:ud,y:rd,yy:ud},ordinalParse:/\d{1,2}-oji/,ordinal:function(a){return a+"-oji"},week:{dow:1,doy:4}}),{m:"minūtes_minūtēm_minūte_minūtes".split("_"),mm:"minūtes_minūtēm_minūte_minūtes".split("_"),h:"stundas_stundām_stunda_stundas".split("_"),hh:"stundas_stundām_stunda_stundas".split("_"),d:"dienas_dienām_diena_dienas".split("_"),dd:"dienas_dienām_diena_dienas".split("_"),M:"mēneša_mēnešiem_mēnesis_mēneši".split("_"),MM:"mēneša_mēnešiem_mēnesis_mēneši".split("_"),y:"gada_gadiem_gads_gadi".split("_"),yy:"gada_gadiem_gads_gadi".split("_")}),tg=(Kf.defineLocale("lv",{months:"janvāris_februāris_marts_aprīlis_maijs_jūnijs_jūlijs_augusts_septembris_oktobris_novembris_decembris".split("_"),monthsShort:"jan_feb_mar_apr_mai_jūn_jūl_aug_sep_okt_nov_dec".split("_"),weekdays:"svētdiena_pirmdiena_otrdiena_trešdiena_ceturtdiena_piektdiena_sestdiena".split("_"),weekdaysShort:"Sv_P_O_T_C_Pk_S".split("_"),weekdaysMin:"Sv_P_O_T_C_Pk_S".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY.",LL:"YYYY. [gada] D. MMMM",LLL:"YYYY. [gada] D. MMMM, HH:mm",LLLL:"YYYY. [gada] D. MMMM, dddd, HH:mm"},calendar:{sameDay:"[Šodien pulksten] LT",nextDay:"[Rīt pulksten] LT",nextWeek:"dddd [pulksten] LT",lastDay:"[Vakar pulksten] LT",lastWeek:"[Pagājušā] dddd [pulksten] LT",sameElse:"L"},relativeTime:{future:"pēc %s",past:"pirms %s",s:yd,m:xd,mm:wd,h:xd,hh:wd,d:xd,dd:wd,M:xd,MM:wd,y:xd,yy:wd},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),{words:{m:["jedan minut","jednog minuta"],mm:["minut","minuta","minuta"],h:["jedan sat","jednog sata"],hh:["sat","sata","sati"],dd:["dan","dana","dana"],MM:["mjesec","mjeseca","mjeseci"],yy:["godina","godine","godina"]},correctGrammaticalCase:function(a,b){return 1===a?b[0]:a>=2&&4>=a?b[1]:b[2]},translate:function(a,b,c){var d=tg.words[c];return 1===c.length?b?d[0]:d[1]:a+" "+tg.correctGrammaticalCase(a,d)}}),ug=(Kf.defineLocale("me",{months:["januar","februar","mart","april","maj","jun","jul","avgust","septembar","oktobar","novembar","decembar"],monthsShort:["jan.","feb.","mar.","apr.","maj","jun","jul","avg.","sep.","okt.","nov.","dec."],weekdays:["nedjelja","ponedjeljak","utorak","srijeda","četvrtak","petak","subota"],weekdaysShort:["ned.","pon.","uto.","sri.","čet.","pet.","sub."],weekdaysMin:["ne","po","ut","sr","če","pe","su"],longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD. MM. YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danas u] LT",nextDay:"[sjutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedjelju] [u] LT";case 3:return"[u] [srijedu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT"}},lastDay:"[juče u] LT",lastWeek:function(){var a=["[prošle] [nedjelje] [u] LT","[prošlog] [ponedjeljka] [u] LT","[prošlog] [utorka] [u] LT","[prošle] [srijede] [u] LT","[prošlog] [četvrtka] [u] LT","[prošlog] [petka] [u] LT","[prošle] [subote] [u] LT"];return a[this.day()]},sameElse:"L"},relativeTime:{future:"za %s",past:"prije %s",s:"nekoliko sekundi",m:tg.translate,mm:tg.translate,h:tg.translate,hh:tg.translate,d:"dan",dd:tg.translate,M:"mjesec",MM:tg.translate,y:"godinu",yy:tg.translate},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),Kf.defineLocale("mk",{months:"јануари_февруари_март_април_мај_јуни_јули_август_септември_октомври_ноември_декември".split("_"),monthsShort:"јан_фев_мар_апр_мај_јун_јул_авг_сеп_окт_ное_дек".split("_"),weekdays:"недела_понеделник_вторник_среда_четврток_петок_сабота".split("_"),weekdaysShort:"нед_пон_вто_сре_чет_пет_саб".split("_"),weekdaysMin:"нe_пo_вт_ср_че_пе_сa".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"D.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY H:mm",LLLL:"dddd, D MMMM YYYY H:mm"},calendar:{sameDay:"[Денес во] LT",nextDay:"[Утре во] LT",nextWeek:"[Во] dddd [во] LT",lastDay:"[Вчера во] LT",lastWeek:function(){switch(this.day()){case 0:case 3:case 6:return"[Изминатата] dddd [во] LT";case 1:case 2:case 4:case 5:return"[Изминатиот] dddd [во] LT"}},sameElse:"L"},relativeTime:{future:"после %s",past:"пред %s",s:"неколку секунди",m:"минута",mm:"%d минути",h:"час",hh:"%d часа",d:"ден",dd:"%d дена",M:"месец",MM:"%d месеци",y:"година",yy:"%d години"},ordinalParse:/\d{1,2}-(ев|ен|ти|ви|ри|ми)/,ordinal:function(a){var b=a%10,c=a%100;return 0===a?a+"-ев":0===c?a+"-ен":c>10&&20>c?a+"-ти":1===b?a+"-ви":2===b?a+"-ри":7===b||8===b?a+"-ми":a+"-ти"},week:{dow:1,doy:7}}),Kf.defineLocale("ml",{months:"ജനുവരി_ഫെബ്രുവരി_മാർച്ച്_ഏപ്രിൽ_മേയ്_ജൂൺ_ജൂലൈ_ഓഗസ്റ്റ്_സെപ്റ്റംബർ_ഒക്ടോബർ_നവംബർ_ഡിസംബർ".split("_"),monthsShort:"ജനു._ഫെബ്രു._മാർ._ഏപ്രി._മേയ്_ജൂൺ_ജൂലൈ._ഓഗ._സെപ്റ്റ._ഒക്ടോ._നവം._ഡിസം.".split("_"),weekdays:"ഞായറാഴ്ച_തിങ്കളാഴ്ച_ചൊവ്വാഴ്ച_ബുധനാഴ്ച_വ്യാഴാഴ്ച_വെള്ളിയാഴ്ച_ശനിയാഴ്ച".split("_"),weekdaysShort:"ഞായർ_തിങ്കൾ_ചൊവ്വ_ബുധൻ_വ്യാഴം_വെള്ളി_ശനി".split("_"),weekdaysMin:"ഞാ_തി_ചൊ_ബു_വ്യാ_വെ_ശ".split("_"),longDateFormat:{LT:"A h:mm -നു",LTS:"A h:mm:ss -നു",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm -നു",LLLL:"dddd, D MMMM YYYY, A h:mm -നു"},calendar:{sameDay:"[ഇന്ന്] LT",nextDay:"[നാളെ] LT",nextWeek:"dddd, LT",lastDay:"[ഇന്നലെ] LT",lastWeek:"[കഴിഞ്ഞ] dddd, LT",sameElse:"L"},relativeTime:{future:"%s കഴിഞ്ഞ്",past:"%s മുൻപ്",s:"അൽപ നിമിഷങ്ങൾ",m:"ഒരു മിനിറ്റ്",mm:"%d മിനിറ്റ്",h:"ഒരു മണിക്കൂർ",hh:"%d മണിക്കൂർ",d:"ഒരു ദിവസം",dd:"%d ദിവസം",M:"ഒരു മാസം",MM:"%d മാസം",y:"ഒരു വർഷം",yy:"%d വർഷം"},meridiemParse:/രാത്രി|രാവിലെ|ഉച്ച കഴിഞ്ഞ്|വൈകുന്നേരം|രാത്രി/i,isPM:function(a){return/^(ഉച്ച കഴിഞ്ഞ്|വൈകുന്നേരം|രാത്രി)$/.test(a)},meridiem:function(a,b,c){return 4>a?"രാത്രി":12>a?"രാവിലെ":17>a?"ഉച്ച കഴിഞ്ഞ്":20>a?"വൈകുന്നേരം":"രാത്രി"}}),{1:"१",2:"२",3:"३",4:"४",5:"५",6:"६",7:"७",8:"८",9:"९",0:"०"}),vg={"१":"1","२":"2","३":"3","४":"4","५":"5","६":"6","७":"7","८":"8","९":"9","०":"0"},wg=(Kf.defineLocale("mr",{months:"जानेवारी_फेब्रुवारी_मार्च_एप्रिल_मे_जून_जुलै_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर".split("_"),monthsShort:"जाने._फेब्रु._मार्च._एप्रि._मे._जून._जुलै._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.".split("_"),weekdays:"रविवार_सोमवार_मंगळवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"),weekdaysShort:"रवि_सोम_मंगळ_बुध_गुरू_शुक्र_शनि".split("_"),weekdaysMin:"र_सो_मं_बु_गु_शु_श".split("_"),longDateFormat:{LT:"A h:mm वाजता",LTS:"A h:mm:ss वाजता",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm वाजता",LLLL:"dddd, D MMMM YYYY, A h:mm वाजता"},calendar:{sameDay:"[आज] LT",nextDay:"[उद्या] LT",nextWeek:"dddd, LT",lastDay:"[काल] LT",lastWeek:"[मागील] dddd, LT",sameElse:"L"},relativeTime:{future:"%sमध्ये",past:"%sपूर्वी",s:zd,m:zd,mm:zd,h:zd,hh:zd,d:zd,dd:zd,M:zd,MM:zd,y:zd,yy:zd},preparse:function(a){return a.replace(/[१२३४५६७८९०]/g,function(a){return vg[a]})},postformat:function(a){return a.replace(/\d/g,function(a){return ug[a]})},meridiemParse:/रात्री|सकाळी|दुपारी|सायंकाळी/,meridiemHour:function(a,b){return 12===a&&(a=0),"रात्री"===b?4>a?a:a+12:"सकाळी"===b?a:"दुपारी"===b?a>=10?a:a+12:"सायंकाळी"===b?a+12:void 0},meridiem:function(a,b,c){return 4>a?"रात्री":10>a?"सकाळी":17>a?"दुपारी":20>a?"सायंकाळी":"रात्री"},week:{dow:0,doy:6}}),Kf.defineLocale("ms-my",{months:"Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"),monthsShort:"Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),weekdays:"Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),weekdaysShort:"Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),weekdaysMin:"Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] HH.mm",LLLL:"dddd, D MMMM YYYY [pukul] HH.mm"},meridiemParse:/pagi|tengahari|petang|malam/,meridiemHour:function(a,b){return 12===a&&(a=0),"pagi"===b?a:"tengahari"===b?a>=11?a:a+12:"petang"===b||"malam"===b?a+12:void 0},meridiem:function(a,b,c){return 11>a?"pagi":15>a?"tengahari":19>a?"petang":"malam"},calendar:{sameDay:"[Hari ini pukul] LT",nextDay:"[Esok pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kelmarin pukul] LT",lastWeek:"dddd [lepas pukul] LT",sameElse:"L"},relativeTime:{future:"dalam %s",past:"%s yang lepas",s:"beberapa saat",m:"seminit",mm:"%d minit",h:"sejam",hh:"%d jam",d:"sehari",dd:"%d hari",M:"sebulan",MM:"%d bulan",y:"setahun",yy:"%d tahun"},week:{dow:1,doy:7}}),Kf.defineLocale("ms",{months:"Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"),monthsShort:"Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),weekdays:"Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),weekdaysShort:"Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),weekdaysMin:"Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] HH.mm",LLLL:"dddd, D MMMM YYYY [pukul] HH.mm"},meridiemParse:/pagi|tengahari|petang|malam/,meridiemHour:function(a,b){return 12===a&&(a=0),"pagi"===b?a:"tengahari"===b?a>=11?a:a+12:"petang"===b||"malam"===b?a+12:void 0},meridiem:function(a,b,c){return 11>a?"pagi":15>a?"tengahari":19>a?"petang":"malam"},calendar:{sameDay:"[Hari ini pukul] LT",nextDay:"[Esok pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kelmarin pukul] LT",lastWeek:"dddd [lepas pukul] LT",sameElse:"L"},relativeTime:{future:"dalam %s",past:"%s yang lepas",s:"beberapa saat",m:"seminit",mm:"%d minit",h:"sejam",hh:"%d jam",d:"sehari",dd:"%d hari",M:"sebulan",MM:"%d bulan",y:"setahun",yy:"%d tahun"},week:{dow:1,doy:7}}),{1:"၁",2:"၂",3:"၃",4:"၄",5:"၅",6:"၆",7:"၇",8:"၈",9:"၉",0:"၀"}),xg={"၁":"1","၂":"2","၃":"3","၄":"4","၅":"5","၆":"6","၇":"7","၈":"8","၉":"9","၀":"0"},yg=(Kf.defineLocale("my",{months:"ဇန်နဝါရီ_ဖေဖော်ဝါရီ_မတ်_ဧပြီ_မေ_ဇွန်_ဇူလိုင်_သြဂုတ်_စက်တင်ဘာ_အောက်တိုဘာ_နိုဝင်ဘာ_ဒီဇင်ဘာ".split("_"),monthsShort:"ဇန်_ဖေ_မတ်_ပြီ_မေ_ဇွန်_လိုင်_သြ_စက်_အောက်_နို_ဒီ".split("_"),weekdays:"တနင်္ဂနွေ_တနင်္လာ_အင်္ဂါ_ဗုဒ္ဓဟူး_ကြာသပတေး_သောကြာ_စနေ".split("_"),weekdaysShort:"နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ".split("_"),weekdaysMin:"နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[ယနေ.] LT [မှာ]",nextDay:"[မနက်ဖြန်] LT [မှာ]",nextWeek:"dddd LT [မှာ]",lastDay:"[မနေ.က] LT [မှာ]",lastWeek:"[ပြီးခဲ့သော] dddd LT [မှာ]",sameElse:"L"},relativeTime:{future:"လာမည့် %s မှာ",past:"လွန်ခဲ့သော %s က",s:"စက္ကန်.အနည်းငယ်",m:"တစ်မိနစ်",mm:"%d မိနစ်",h:"တစ်နာရီ",hh:"%d နာရီ",d:"တစ်ရက်",dd:"%d ရက်",M:"တစ်လ",MM:"%d လ",y:"တစ်နှစ်",yy:"%d နှစ်"},preparse:function(a){return a.replace(/[၁၂၃၄၅၆၇၈၉၀]/g,function(a){return xg[a]})},postformat:function(a){return a.replace(/\d/g,function(a){return wg[a]})},week:{dow:1,doy:4}}),Kf.defineLocale("nb",{months:"januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),monthsShort:"jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.".split("_"),weekdays:"søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),weekdaysShort:"sø._ma._ti._on._to._fr._lø.".split("_"),weekdaysMin:"sø_ma_ti_on_to_fr_lø".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY [kl.] HH:mm",LLLL:"dddd D. MMMM YYYY [kl.] HH:mm"},calendar:{sameDay:"[i dag kl.] LT",nextDay:"[i morgen kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[i går kl.] LT",lastWeek:"[forrige] dddd [kl.] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"for %s siden",s:"noen sekunder",m:"ett minutt",mm:"%d minutter",h:"en time",hh:"%d timer",d:"en dag",dd:"%d dager",M:"en måned",MM:"%d måneder",y:"ett år",yy:"%d år"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),{1:"१",2:"२",3:"३",4:"४",5:"५",6:"६",7:"७",8:"८",9:"९",0:"०"}),zg={"१":"1","२":"2","३":"3","४":"4","५":"5","६":"6","७":"7","८":"8","९":"9","०":"0"},Ag=(Kf.defineLocale("ne",{months:"जनवरी_फेब्रुवरी_मार्च_अप्रिल_मई_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर".split("_"),monthsShort:"जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.".split("_"),weekdays:"आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार".split("_"),weekdaysShort:"आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.".split("_"),weekdaysMin:"आ._सो._मं._बु._बि._शु._श.".split("_"),longDateFormat:{LT:"Aको h:mm बजे",LTS:"Aको h:mm:ss बजे",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, Aको h:mm बजे",LLLL:"dddd, D MMMM YYYY, Aको h:mm बजे"},preparse:function(a){return a.replace(/[१२३४५६७८९०]/g,function(a){return zg[a]})},postformat:function(a){return a.replace(/\d/g,function(a){return yg[a]})},meridiemParse:/राति|बिहान|दिउँसो|साँझ/,meridiemHour:function(a,b){return 12===a&&(a=0),"राति"===b?4>a?a:a+12:"बिहान"===b?a:"दिउँसो"===b?a>=10?a:a+12:"साँझ"===b?a+12:void 0},meridiem:function(a,b,c){return 3>a?"राति":12>a?"बिहान":16>a?"दिउँसो":20>a?"साँझ":"राति"},calendar:{sameDay:"[आज] LT",nextDay:"[भोलि] LT",nextWeek:"[आउँदो] dddd[,] LT",lastDay:"[हिजो] LT",lastWeek:"[गएको] dddd[,] LT",sameElse:"L"},relativeTime:{future:"%sमा",past:"%s अगाडि",s:"केही क्षण",m:"एक मिनेट",mm:"%d मिनेट",h:"एक घण्टा",hh:"%d घण्टा",d:"एक दिन",dd:"%d दिन",M:"एक महिना",MM:"%d महिना",y:"एक बर्ष",yy:"%d बर्ष"},week:{dow:0,doy:6}}),"jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_")),Bg="jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"),Cg=(Kf.defineLocale("nl",{months:"januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),monthsShort:function(a,b){return/-MMM-/.test(b)?Bg[a.month()]:Ag[a.month()]},weekdays:"zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),weekdaysShort:"zo._ma._di._wo._do._vr._za.".split("_"),weekdaysMin:"Zo_Ma_Di_Wo_Do_Vr_Za".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD-MM-YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[vandaag om] LT",nextDay:"[morgen om] LT",nextWeek:"dddd [om] LT",lastDay:"[gisteren om] LT",lastWeek:"[afgelopen] dddd [om] LT",sameElse:"L"},relativeTime:{future:"over %s",past:"%s geleden",s:"een paar seconden",m:"één minuut",mm:"%d minuten",h:"één uur",hh:"%d uur",d:"één dag",dd:"%d dagen",M:"één maand",MM:"%d maanden",y:"één jaar",yy:"%d jaar"},ordinalParse:/\d{1,2}(ste|de)/,ordinal:function(a){return a+(1===a||8===a||a>=20?"ste":"de")},week:{dow:1,doy:4}}),Kf.defineLocale("nn",{months:"januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),monthsShort:"jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),weekdays:"sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag".split("_"),weekdaysShort:"sun_mån_tys_ons_tor_fre_lau".split("_"),weekdaysMin:"su_må_ty_on_to_fr_lø".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY [kl.] H:mm",LLLL:"dddd D. MMMM YYYY [kl.] HH:mm"},calendar:{sameDay:"[I dag klokka] LT",nextDay:"[I morgon klokka] LT",nextWeek:"dddd [klokka] LT",lastDay:"[I går klokka] LT",lastWeek:"[Føregåande] dddd [klokka] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"for %s sidan",s:"nokre sekund",m:"eit minutt",mm:"%d minutt",h:"ein time",hh:"%d timar",d:"ein dag",dd:"%d dagar",M:"ein månad",MM:"%d månader",y:"eit år",yy:"%d år"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),"styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień".split("_")),Dg="stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia".split("_"),Eg=(Kf.defineLocale("pl",{months:function(a,b){return""===b?"("+Dg[a.month()]+"|"+Cg[a.month()]+")":/D MMMM/.test(b)?Dg[a.month()]:Cg[a.month()]},monthsShort:"sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru".split("_"),weekdays:"niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota".split("_"),weekdaysShort:"nie_pon_wt_śr_czw_pt_sb".split("_"),weekdaysMin:"Nd_Pn_Wt_Śr_Cz_Pt_So".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Dziś o] LT",nextDay:"[Jutro o] LT",nextWeek:"[W] dddd [o] LT",lastDay:"[Wczoraj o] LT",lastWeek:function(){switch(this.day()){case 0:return"[W zeszłą niedzielę o] LT";case 3:return"[W zeszłą środę o] LT";case 6:return"[W zeszłą sobotę o] LT";default:return"[W zeszły] dddd [o] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"%s temu",s:"kilka sekund",m:Bd,mm:Bd,h:Bd,hh:Bd,d:"1 dzień",dd:"%d dni",M:"miesiąc",MM:Bd,y:"rok",yy:Bd},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),Kf.defineLocale("pt-br",{months:"Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),monthsShort:"Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),weekdays:"Domingo_Segunda-Feira_Terça-Feira_Quarta-Feira_Quinta-Feira_Sexta-Feira_Sábado".split("_"),weekdaysShort:"Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),weekdaysMin:"Dom_2ª_3ª_4ª_5ª_6ª_Sáb".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY [às] HH:mm",LLLL:"dddd, D [de] MMMM [de] YYYY [às] HH:mm"},calendar:{sameDay:"[Hoje às] LT",nextDay:"[Amanhã às] LT",nextWeek:"dddd [às] LT",lastDay:"[Ontem às] LT",lastWeek:function(){return 0===this.day()||6===this.day()?"[Último] dddd [às] LT":"[Última] dddd [às] LT"},sameElse:"L"},relativeTime:{future:"em %s",past:"%s atrás",s:"poucos segundos",m:"um minuto",mm:"%d minutos",h:"uma hora",hh:"%d horas",d:"um dia",dd:"%d dias",M:"um mês",MM:"%d meses",y:"um ano",yy:"%d anos"},ordinalParse:/\d{1,2}º/,ordinal:"%dº"}),Kf.defineLocale("pt",{months:"Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),monthsShort:"Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),weekdays:"Domingo_Segunda-Feira_Terça-Feira_Quarta-Feira_Quinta-Feira_Sexta-Feira_Sábado".split("_"),weekdaysShort:"Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),weekdaysMin:"Dom_2ª_3ª_4ª_5ª_6ª_Sáb".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY HH:mm",LLLL:"dddd, D [de] MMMM [de] YYYY HH:mm"},calendar:{sameDay:"[Hoje às] LT",nextDay:"[Amanhã às] LT",nextWeek:"dddd [às] LT",lastDay:"[Ontem às] LT",lastWeek:function(){return 0===this.day()||6===this.day()?"[Último] dddd [às] LT":"[Última] dddd [às] LT"},sameElse:"L"},relativeTime:{future:"em %s",past:"há %s",s:"segundos",m:"um minuto",mm:"%d minutos",h:"uma hora",hh:"%d horas",d:"um dia",dd:"%d dias",M:"um mês",MM:"%d meses",y:"um ano",yy:"%d anos"},ordinalParse:/\d{1,2}º/,ordinal:"%dº",week:{dow:1,doy:4}}),Kf.defineLocale("ro",{months:"ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie".split("_"),monthsShort:"ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.".split("_"),weekdays:"duminică_luni_marți_miercuri_joi_vineri_sâmbătă".split("_"),weekdaysShort:"Dum_Lun_Mar_Mie_Joi_Vin_Sâm".split("_"),weekdaysMin:"Du_Lu_Ma_Mi_Jo_Vi_Sâ".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY H:mm",LLLL:"dddd, D MMMM YYYY H:mm"},calendar:{sameDay:"[azi la] LT",nextDay:"[mâine la] LT",nextWeek:"dddd [la] LT",lastDay:"[ieri la] LT",lastWeek:"[fosta] dddd [la] LT",sameElse:"L"},relativeTime:{future:"peste %s",past:"%s în urmă",s:"câteva secunde",m:"un minut",mm:Cd,h:"o oră",hh:Cd,d:"o zi",dd:Cd,M:"o lună",MM:Cd,y:"un an",yy:Cd},week:{dow:1,doy:7}}),[/^янв/i,/^фев/i,/^мар/i,/^апр/i,/^ма[й|я]/i,/^июн/i,/^июл/i,/^авг/i,/^сен/i,/^окт/i,/^ноя/i,/^дек/i]),Fg=(Kf.defineLocale("ru",{months:{format:"Января_Февраля_Марта_Апреля_Мая_Июня_Июля_Августа_Сентября_Октября_Ноября_Декабря".split("_"),standalone:"Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь".split("_")},monthsShort:{format:"янв_фев_мар_апр_мая_июня_июля_авг_сен_окт_ноя_дек".split("_"),standalone:"янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек".split("_")},weekdays:{standalone:"Воскресенье_Понедельник_Вторник_Среда_Четверг_Пятница_Суббота".split("_"),format:"Воскресенье_Понедельник_Вторник_Среду_Четверг_Пятницу_Субботу".split("_"),isFormat:/\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?\] ?dddd/},weekdaysShort:"Вс_Пн_Вт_Ср_Чт_Пт_Сб".split("_"),weekdaysMin:"Вс_Пн_Вт_Ср_Чт_Пт_Сб".split("_"),monthsParse:Eg,longMonthsParse:Eg,shortMonthsParse:Eg,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY г.",LLL:"D MMMM YYYY г., HH:mm",LLLL:"dddd, D MMMM YYYY г., HH:mm"},calendar:{sameDay:"[Сегодня в] LT",nextDay:"[Завтра в] LT",lastDay:"[Вчера в] LT",nextWeek:function(a){if(a.week()===this.week())return 2===this.day()?"[Во] dddd [в] LT":"[В] dddd [в] LT";switch(this.day()){case 0:return"[В следующее] dddd [в] LT";case 1:case 2:case 4:return"[В следующий] dddd [в] LT";case 3:case 5:case 6:return"[В следующую] dddd [в] LT"}},lastWeek:function(a){if(a.week()===this.week())return 2===this.day()?"[Во] dddd [в] LT":"[В] dddd [в] LT";switch(this.day()){case 0:return"[В прошлое] dddd [в] LT";case 1:case 2:case 4:return"[В прошлый] dddd [в] LT";case 3:case 5:case 6:return"[В прошлую] dddd [в] LT"}},sameElse:"L"},relativeTime:{future:"через %s",past:"%s назад",s:"несколько секунд",m:Ed,mm:Ed,h:"час",hh:Ed,d:"день",dd:Ed,M:"месяц",MM:Ed,y:"год",yy:Ed},meridiemParse:/ночи|утра|дня|вечера/i,isPM:function(a){return/^(дня|вечера)$/.test(a)},meridiem:function(a,b,c){return 4>a?"ночи":12>a?"утра":17>a?"дня":"вечера"},ordinalParse:/\d{1,2}-(й|го|я)/,ordinal:function(a,b){switch(b){case"M":case"d":case"DDD":return a+"-й";case"D":return a+"-го";case"w":case"W":return a+"-я";default:return a}},week:{dow:1,doy:7}}),Kf.defineLocale("se",{months:"ođđajagemánnu_guovvamánnu_njukčamánnu_cuoŋománnu_miessemánnu_geassemánnu_suoidnemánnu_borgemánnu_čakčamánnu_golggotmánnu_skábmamánnu_juovlamánnu".split("_"),monthsShort:"ođđj_guov_njuk_cuo_mies_geas_suoi_borg_čakč_golg_skáb_juov".split("_"),weekdays:"sotnabeaivi_vuossárga_maŋŋebárga_gaskavahkku_duorastat_bearjadat_lávvardat".split("_"),weekdaysShort:"sotn_vuos_maŋ_gask_duor_bear_láv".split("_"),weekdaysMin:"s_v_m_g_d_b_L".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"MMMM D. [b.] YYYY",LLL:"MMMM D. [b.] YYYY [ti.] HH:mm",LLLL:"dddd, MMMM D. [b.] YYYY [ti.] HH:mm"},calendar:{sameDay:"[otne ti] LT",nextDay:"[ihttin ti] LT",nextWeek:"dddd [ti] LT",lastDay:"[ikte ti] LT",lastWeek:"[ovddit] dddd [ti] LT",sameElse:"L"},relativeTime:{future:"%s geažes",past:"maŋit %s",s:"moadde sekunddat",m:"okta minuhta",mm:"%d minuhtat",h:"okta diimmu",hh:"%d diimmut",d:"okta beaivi",dd:"%d beaivvit",M:"okta mánnu",MM:"%d mánut",y:"okta jahki",yy:"%d jagit"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),Kf.defineLocale("si",{months:"ජනවාරි_පෙබරවාරි_මාර්තු_අප්‍රේල්_මැයි_ජූනි_ජූලි_අගෝස්තු_සැප්තැම්බර්_ඔක්තෝබර්_නොවැම්බර්_දෙසැම්බර්".split("_"),monthsShort:"ජන_පෙබ_මාර්_අප්_මැයි_ජූනි_ජූලි_අගෝ_සැප්_ඔක්_නොවැ_දෙසැ".split("_"),weekdays:"ඉරිදා_සඳුදා_අඟහරුවාදා_බදාදා_බ්‍රහස්පතින්දා_සිකුරාදා_සෙනසුරාදා".split("_"),weekdaysShort:"ඉරි_සඳු_අඟ_බදා_බ්‍රහ_සිකු_සෙන".split("_"),weekdaysMin:"ඉ_ස_අ_බ_බ්‍ර_සි_සෙ".split("_"),longDateFormat:{LT:"a h:mm",LTS:"a h:mm:ss",L:"YYYY/MM/DD",LL:"YYYY MMMM D",LLL:"YYYY MMMM D, a h:mm",LLLL:"YYYY MMMM D [වැනි] dddd, a h:mm:ss"},calendar:{sameDay:"[අද] LT[ට]",nextDay:"[හෙට] LT[ට]",nextWeek:"dddd LT[ට]",lastDay:"[ඊයේ] LT[ට]",lastWeek:"[පසුගිය] dddd LT[ට]",sameElse:"L"},relativeTime:{future:"%sකින්",past:"%sකට පෙර",s:"තත්පර කිහිපය",m:"මිනිත්තුව",mm:"මිනිත්තු %d",h:"පැය",hh:"පැය %d",d:"දිනය",dd:"දින %d",M:"මාසය",MM:"මාස %d",y:"වසර",yy:"වසර %d"},ordinalParse:/\d{1,2} වැනි/,ordinal:function(a){return a+" වැනි"},meridiem:function(a,b,c){return a>11?c?"ප.ව.":"පස් වරු":c?"පෙ.ව.":"පෙර වරු"}}),"január_február_marec_apríl_máj_jún_júl_august_september_október_november_december".split("_")),Gg="jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec".split("_"),Hg=(Kf.defineLocale("sk",{months:Fg,monthsShort:Gg,weekdays:"nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota".split("_"),weekdaysShort:"ne_po_ut_st_št_pi_so".split("_"),weekdaysMin:"ne_po_ut_st_št_pi_so".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd D. MMMM YYYY H:mm"},calendar:{sameDay:"[dnes o] LT",nextDay:"[zajtra o] LT",nextWeek:function(){switch(this.day()){case 0:return"[v nedeľu o] LT";case 1:case 2:return"[v] dddd [o] LT";case 3:return"[v stredu o] LT";case 4:return"[vo štvrtok o] LT";case 5:return"[v piatok o] LT";case 6:return"[v sobotu o] LT"}},lastDay:"[včera o] LT",lastWeek:function(){switch(this.day()){case 0:return"[minulú nedeľu o] LT";case 1:case 2:return"[minulý] dddd [o] LT";case 3:return"[minulú stredu o] LT";case 4:case 5:return"[minulý] dddd [o] LT";case 6:return"[minulú sobotu o] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"pred %s",s:Gd,m:Gd,mm:Gd,h:Gd,hh:Gd,d:Gd,dd:Gd,M:Gd,MM:Gd,y:Gd,yy:Gd},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),Kf.defineLocale("sl",{months:"januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december".split("_"),monthsShort:"jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"),weekdays:"nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota".split("_"),weekdaysShort:"ned._pon._tor._sre._čet._pet._sob.".split("_"),weekdaysMin:"ne_po_to_sr_če_pe_so".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD. MM. YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danes ob] LT",nextDay:"[jutri ob] LT",nextWeek:function(){switch(this.day()){case 0:return"[v] [nedeljo] [ob] LT";case 3:return"[v] [sredo] [ob] LT";case 6:return"[v] [soboto] [ob] LT";case 1:case 2:case 4:case 5:return"[v] dddd [ob] LT"}},lastDay:"[včeraj ob] LT",lastWeek:function(){switch(this.day()){case 0:return"[prejšnjo] [nedeljo] [ob] LT";case 3:return"[prejšnjo] [sredo] [ob] LT";case 6:return"[prejšnjo] [soboto] [ob] LT";case 1:case 2:case 4:case 5:return"[prejšnji] dddd [ob] LT"}},sameElse:"L"},relativeTime:{future:"čez %s",past:"pred %s",s:Hd,m:Hd,mm:Hd,h:Hd,hh:Hd,d:Hd,dd:Hd,M:Hd,MM:Hd,y:Hd,yy:Hd},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),Kf.defineLocale("sq",{months:"Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor".split("_"),monthsShort:"Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj".split("_"),weekdays:"E Diel_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë".split("_"),weekdaysShort:"Die_Hën_Mar_Mër_Enj_Pre_Sht".split("_"),weekdaysMin:"D_H_Ma_Më_E_P_Sh".split("_"),meridiemParse:/PD|MD/,isPM:function(a){return"M"===a.charAt(0)},meridiem:function(a,b,c){return 12>a?"PD":"MD"},longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Sot në] LT",nextDay:"[Nesër në] LT",nextWeek:"dddd [në] LT",lastDay:"[Dje në] LT",lastWeek:"dddd [e kaluar në] LT",sameElse:"L"},relativeTime:{future:"në %s",past:"%s më parë",s:"disa sekonda",m:"një minutë",mm:"%d minuta",h:"një orë",hh:"%d orë",d:"një ditë",dd:"%d ditë",M:"një muaj",MM:"%d muaj",y:"një vit",yy:"%d vite"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),{words:{m:["један минут","једне минуте"],mm:["минут","минуте","минута"],h:["један сат","једног сата"],hh:["сат","сата","сати"],dd:["дан","дана","дана"],MM:["месец","месеца","месеци"],yy:["година","године","година"]},correctGrammaticalCase:function(a,b){return 1===a?b[0]:a>=2&&4>=a?b[1]:b[2]},translate:function(a,b,c){var d=Hg.words[c];return 1===c.length?b?d[0]:d[1]:a+" "+Hg.correctGrammaticalCase(a,d)}}),Ig=(Kf.defineLocale("sr-cyrl",{months:["јануар","фебруар","март","април","мај","јун","јул","август","септембар","октобар","новембар","децембар"],monthsShort:["јан.","феб.","мар.","апр.","мај","јун","јул","авг.","сеп.","окт.","нов.","дец."],weekdays:["недеља","понедељак","уторак","среда","четвртак","петак","субота"],weekdaysShort:["нед.","пон.","уто.","сре.","чет.","пет.","суб."],weekdaysMin:["не","по","ут","ср","че","пе","су"],longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD. MM. YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[данас у] LT",nextDay:"[сутра у] LT",nextWeek:function(){switch(this.day()){case 0:return"[у] [недељу] [у] LT";case 3:return"[у] [среду] [у] LT";case 6:return"[у] [суботу] [у] LT";case 1:case 2:case 4:case 5:return"[у] dddd [у] LT"}},lastDay:"[јуче у] LT",lastWeek:function(){var a=["[прошле] [недеље] [у] LT","[прошлог] [понедељка] [у] LT","[прошлог] [уторка] [у] LT","[прошле] [среде] [у] LT","[прошлог] [четвртка] [у] LT","[прошлог] [петка] [у] LT","[прошле] [суботе] [у] LT"];return a[this.day()]},sameElse:"L"},relativeTime:{future:"за %s",past:"пре %s",s:"неколико секунди",m:Hg.translate,mm:Hg.translate,h:Hg.translate,hh:Hg.translate,d:"дан",dd:Hg.translate,M:"месец",MM:Hg.translate,y:"годину",yy:Hg.translate},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),{words:{m:["jedan minut","jedne minute"],mm:["minut","minute","minuta"],h:["jedan sat","jednog sata"],hh:["sat","sata","sati"],dd:["dan","dana","dana"],MM:["mesec","meseca","meseci"],yy:["godina","godine","godina"]},correctGrammaticalCase:function(a,b){return 1===a?b[0]:a>=2&&4>=a?b[1]:b[2]},translate:function(a,b,c){var d=Ig.words[c];return 1===c.length?b?d[0]:d[1]:a+" "+Ig.correctGrammaticalCase(a,d)}}),Jg=(Kf.defineLocale("sr",{months:["januar","februar","mart","april","maj","jun","jul","avgust","septembar","oktobar","novembar","decembar"],monthsShort:["jan.","feb.","mar.","apr.","maj","jun","jul","avg.","sep.","okt.","nov.","dec."],weekdays:["nedelja","ponedeljak","utorak","sreda","četvrtak","petak","subota"],weekdaysShort:["ned.","pon.","uto.","sre.","čet.","pet.","sub."],weekdaysMin:["ne","po","ut","sr","če","pe","su"],longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD. MM. YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danas u] LT",nextDay:"[sutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedelju] [u] LT";case 3:return"[u] [sredu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT"}},lastDay:"[juče u] LT",lastWeek:function(){var a=["[prošle] [nedelje] [u] LT","[prošlog] [ponedeljka] [u] LT","[prošlog] [utorka] [u] LT","[prošle] [srede] [u] LT","[prošlog] [četvrtka] [u] LT","[prošlog] [petka] [u] LT","[prošle] [subote] [u] LT"];return a[this.day()]},sameElse:"L"},relativeTime:{future:"za %s",past:"pre %s",s:"nekoliko sekundi",m:Ig.translate,mm:Ig.translate,h:Ig.translate,hh:Ig.translate,d:"dan",dd:Ig.translate,M:"mesec",MM:Ig.translate,y:"godinu",yy:Ig.translate
},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),Kf.defineLocale("sv",{months:"januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"),monthsShort:"jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),weekdays:"söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag".split("_"),weekdaysShort:"sön_mån_tis_ons_tor_fre_lör".split("_"),weekdaysMin:"sö_må_ti_on_to_fr_lö".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[Idag] LT",nextDay:"[Imorgon] LT",lastDay:"[Igår] LT",nextWeek:"[På] dddd LT",lastWeek:"[I] dddd[s] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"för %s sedan",s:"några sekunder",m:"en minut",mm:"%d minuter",h:"en timme",hh:"%d timmar",d:"en dag",dd:"%d dagar",M:"en månad",MM:"%d månader",y:"ett år",yy:"%d år"},ordinalParse:/\d{1,2}(e|a)/,ordinal:function(a){var b=a%10,c=1===~~(a%100/10)?"e":1===b?"a":2===b?"a":"e";return a+c},week:{dow:1,doy:4}}),Kf.defineLocale("sw",{months:"Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba".split("_"),monthsShort:"Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des".split("_"),weekdays:"Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi".split("_"),weekdaysShort:"Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos".split("_"),weekdaysMin:"J2_J3_J4_J5_Al_Ij_J1".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[leo saa] LT",nextDay:"[kesho saa] LT",nextWeek:"[wiki ijayo] dddd [saat] LT",lastDay:"[jana] LT",lastWeek:"[wiki iliyopita] dddd [saat] LT",sameElse:"L"},relativeTime:{future:"%s baadaye",past:"tokea %s",s:"hivi punde",m:"dakika moja",mm:"dakika %d",h:"saa limoja",hh:"masaa %d",d:"siku moja",dd:"masiku %d",M:"mwezi mmoja",MM:"miezi %d",y:"mwaka mmoja",yy:"miaka %d"},week:{dow:1,doy:7}}),{1:"௧",2:"௨",3:"௩",4:"௪",5:"௫",6:"௬",7:"௭",8:"௮",9:"௯",0:"௦"}),Kg={"௧":"1","௨":"2","௩":"3","௪":"4","௫":"5","௬":"6","௭":"7","௮":"8","௯":"9","௦":"0"},Lg=(Kf.defineLocale("ta",{months:"ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்".split("_"),monthsShort:"ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்".split("_"),weekdays:"ஞாயிற்றுக்கிழமை_திங்கட்கிழமை_செவ்வாய்கிழமை_புதன்கிழமை_வியாழக்கிழமை_வெள்ளிக்கிழமை_சனிக்கிழமை".split("_"),weekdaysShort:"ஞாயிறு_திங்கள்_செவ்வாய்_புதன்_வியாழன்_வெள்ளி_சனி".split("_"),weekdaysMin:"ஞா_தி_செ_பு_வி_வெ_ச".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, HH:mm",LLLL:"dddd, D MMMM YYYY, HH:mm"},calendar:{sameDay:"[இன்று] LT",nextDay:"[நாளை] LT",nextWeek:"dddd, LT",lastDay:"[நேற்று] LT",lastWeek:"[கடந்த வாரம்] dddd, LT",sameElse:"L"},relativeTime:{future:"%s இல்",past:"%s முன்",s:"ஒரு சில விநாடிகள்",m:"ஒரு நிமிடம்",mm:"%d நிமிடங்கள்",h:"ஒரு மணி நேரம்",hh:"%d மணி நேரம்",d:"ஒரு நாள்",dd:"%d நாட்கள்",M:"ஒரு மாதம்",MM:"%d மாதங்கள்",y:"ஒரு வருடம்",yy:"%d ஆண்டுகள்"},ordinalParse:/\d{1,2}வது/,ordinal:function(a){return a+"வது"},preparse:function(a){return a.replace(/[௧௨௩௪௫௬௭௮௯௦]/g,function(a){return Kg[a]})},postformat:function(a){return a.replace(/\d/g,function(a){return Jg[a]})},meridiemParse:/யாமம்|வைகறை|காலை|நண்பகல்|எற்பாடு|மாலை/,meridiem:function(a,b,c){return 2>a?" யாமம்":6>a?" வைகறை":10>a?" காலை":14>a?" நண்பகல்":18>a?" எற்பாடு":22>a?" மாலை":" யாமம்"},meridiemHour:function(a,b){return 12===a&&(a=0),"யாமம்"===b?2>a?a:a+12:"வைகறை"===b||"காலை"===b?a:"நண்பகல்"===b&&a>=10?a:a+12},week:{dow:0,doy:6}}),Kf.defineLocale("te",{months:"జనవరి_ఫిబ్రవరి_మార్చి_ఏప్రిల్_మే_జూన్_జూలై_ఆగస్టు_సెప్టెంబర్_అక్టోబర్_నవంబర్_డిసెంబర్".split("_"),monthsShort:"జన._ఫిబ్ర._మార్చి_ఏప్రి._మే_జూన్_జూలై_ఆగ._సెప్._అక్టో._నవ._డిసె.".split("_"),weekdays:"ఆదివారం_సోమవారం_మంగళవారం_బుధవారం_గురువారం_శుక్రవారం_శనివారం".split("_"),weekdaysShort:"ఆది_సోమ_మంగళ_బుధ_గురు_శుక్ర_శని".split("_"),weekdaysMin:"ఆ_సో_మం_బు_గు_శు_శ".split("_"),longDateFormat:{LT:"A h:mm",LTS:"A h:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm",LLLL:"dddd, D MMMM YYYY, A h:mm"},calendar:{sameDay:"[నేడు] LT",nextDay:"[రేపు] LT",nextWeek:"dddd, LT",lastDay:"[నిన్న] LT",lastWeek:"[గత] dddd, LT",sameElse:"L"},relativeTime:{future:"%s లో",past:"%s క్రితం",s:"కొన్ని క్షణాలు",m:"ఒక నిమిషం",mm:"%d నిమిషాలు",h:"ఒక గంట",hh:"%d గంటలు",d:"ఒక రోజు",dd:"%d రోజులు",M:"ఒక నెల",MM:"%d నెలలు",y:"ఒక సంవత్సరం",yy:"%d సంవత్సరాలు"},ordinalParse:/\d{1,2}వ/,ordinal:"%dవ",meridiemParse:/రాత్రి|ఉదయం|మధ్యాహ్నం|సాయంత్రం/,meridiemHour:function(a,b){return 12===a&&(a=0),"రాత్రి"===b?4>a?a:a+12:"ఉదయం"===b?a:"మధ్యాహ్నం"===b?a>=10?a:a+12:"సాయంత్రం"===b?a+12:void 0},meridiem:function(a,b,c){return 4>a?"రాత్రి":10>a?"ఉదయం":17>a?"మధ్యాహ్నం":20>a?"సాయంత్రం":"రాత్రి"},week:{dow:0,doy:6}}),Kf.defineLocale("th",{months:"มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม".split("_"),monthsShort:"มกรา_กุมภา_มีนา_เมษา_พฤษภา_มิถุนา_กรกฎา_สิงหา_กันยา_ตุลา_พฤศจิกา_ธันวา".split("_"),weekdays:"อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์".split("_"),weekdaysShort:"อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัส_ศุกร์_เสาร์".split("_"),weekdaysMin:"อา._จ._อ._พ._พฤ._ศ._ส.".split("_"),longDateFormat:{LT:"H นาฬิกา m นาที",LTS:"H นาฬิกา m นาที s วินาที",L:"YYYY/MM/DD",LL:"D MMMM YYYY",LLL:"D MMMM YYYY เวลา H นาฬิกา m นาที",LLLL:"วันddddที่ D MMMM YYYY เวลา H นาฬิกา m นาที"},meridiemParse:/ก่อนเที่ยง|หลังเที่ยง/,isPM:function(a){return"หลังเที่ยง"===a},meridiem:function(a,b,c){return 12>a?"ก่อนเที่ยง":"หลังเที่ยง"},calendar:{sameDay:"[วันนี้ เวลา] LT",nextDay:"[พรุ่งนี้ เวลา] LT",nextWeek:"dddd[หน้า เวลา] LT",lastDay:"[เมื่อวานนี้ เวลา] LT",lastWeek:"[วัน]dddd[ที่แล้ว เวลา] LT",sameElse:"L"},relativeTime:{future:"อีก %s",past:"%sที่แล้ว",s:"ไม่กี่วินาที",m:"1 นาที",mm:"%d นาที",h:"1 ชั่วโมง",hh:"%d ชั่วโมง",d:"1 วัน",dd:"%d วัน",M:"1 เดือน",MM:"%d เดือน",y:"1 ปี",yy:"%d ปี"}}),Kf.defineLocale("tl-ph",{months:"Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre".split("_"),monthsShort:"Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis".split("_"),weekdays:"Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado".split("_"),weekdaysShort:"Lin_Lun_Mar_Miy_Huw_Biy_Sab".split("_"),weekdaysMin:"Li_Lu_Ma_Mi_Hu_Bi_Sab".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"MM/D/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY HH:mm",LLLL:"dddd, MMMM DD, YYYY HH:mm"},calendar:{sameDay:"[Ngayon sa] LT",nextDay:"[Bukas sa] LT",nextWeek:"dddd [sa] LT",lastDay:"[Kahapon sa] LT",lastWeek:"dddd [huling linggo] LT",sameElse:"L"},relativeTime:{future:"sa loob ng %s",past:"%s ang nakalipas",s:"ilang segundo",m:"isang minuto",mm:"%d minuto",h:"isang oras",hh:"%d oras",d:"isang araw",dd:"%d araw",M:"isang buwan",MM:"%d buwan",y:"isang taon",yy:"%d taon"},ordinalParse:/\d{1,2}/,ordinal:function(a){return a},week:{dow:1,doy:4}}),"pagh_wa’_cha’_wej_loS_vagh_jav_Soch_chorgh_Hut".split("_")),Mg=(Kf.defineLocale("tlh",{months:"tera’ jar wa’_tera’ jar cha’_tera’ jar wej_tera’ jar loS_tera’ jar vagh_tera’ jar jav_tera’ jar Soch_tera’ jar chorgh_tera’ jar Hut_tera’ jar wa’maH_tera’ jar wa’maH wa’_tera’ jar wa’maH cha’".split("_"),monthsShort:"jar wa’_jar cha’_jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar wa’maH_jar wa’maH wa’_jar wa’maH cha’".split("_"),weekdays:"lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),weekdaysShort:"lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),weekdaysMin:"lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[DaHjaj] LT",nextDay:"[wa’leS] LT",nextWeek:"LLL",lastDay:"[wa’Hu’] LT",lastWeek:"LLL",sameElse:"L"},relativeTime:{future:Id,past:Jd,s:"puS lup",m:"wa’ tup",mm:Kd,h:"wa’ rep",hh:Kd,d:"wa’ jaj",dd:Kd,M:"wa’ jar",MM:Kd,y:"wa’ DIS",yy:Kd},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),{1:"'inci",5:"'inci",8:"'inci",70:"'inci",80:"'inci",2:"'nci",7:"'nci",20:"'nci",50:"'nci",3:"'üncü",4:"'üncü",100:"'üncü",6:"'ncı",9:"'uncu",10:"'uncu",30:"'uncu",60:"'ıncı",90:"'ıncı"}),Ng=(Kf.defineLocale("tr",{months:"Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık".split("_"),monthsShort:"Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara".split("_"),weekdays:"Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi".split("_"),weekdaysShort:"Paz_Pts_Sal_Çar_Per_Cum_Cts".split("_"),weekdaysMin:"Pz_Pt_Sa_Ça_Pe_Cu_Ct".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[bugün saat] LT",nextDay:"[yarın saat] LT",nextWeek:"[haftaya] dddd [saat] LT",lastDay:"[dün] LT",lastWeek:"[geçen hafta] dddd [saat] LT",sameElse:"L"},relativeTime:{future:"%s sonra",past:"%s önce",s:"birkaç saniye",m:"bir dakika",mm:"%d dakika",h:"bir saat",hh:"%d saat",d:"bir gün",dd:"%d gün",M:"bir ay",MM:"%d ay",y:"bir yıl",yy:"%d yıl"},ordinalParse:/\d{1,2}'(inci|nci|üncü|ncı|uncu|ıncı)/,ordinal:function(a){if(0===a)return a+"'ıncı";var b=a%10,c=a%100-b,d=a>=100?100:null;return a+(Mg[b]||Mg[c]||Mg[d])},week:{dow:1,doy:7}}),Kf.defineLocale("tzl",{months:"Januar_Fevraglh_Març_Avrïu_Mai_Gün_Julia_Guscht_Setemvar_Listopäts_Noemvar_Zecemvar".split("_"),monthsShort:"Jan_Fev_Mar_Avr_Mai_Gün_Jul_Gus_Set_Lis_Noe_Zec".split("_"),weekdays:"Súladi_Lúneçi_Maitzi_Márcuri_Xhúadi_Viénerçi_Sáturi".split("_"),weekdaysShort:"Súl_Lún_Mai_Már_Xhú_Vié_Sát".split("_"),weekdaysMin:"Sú_Lú_Ma_Má_Xh_Vi_Sá".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD.MM.YYYY",LL:"D. MMMM [dallas] YYYY",LLL:"D. MMMM [dallas] YYYY HH.mm",LLLL:"dddd, [li] D. MMMM [dallas] YYYY HH.mm"},meridiem:function(a,b,c){return a>11?c?"d'o":"D'O":c?"d'a":"D'A"},calendar:{sameDay:"[oxhi à] LT",nextDay:"[demà à] LT",nextWeek:"dddd [à] LT",lastDay:"[ieiri à] LT",lastWeek:"[sür el] dddd [lasteu à] LT",sameElse:"L"},relativeTime:{future:"osprei %s",past:"ja%s",s:Md,m:Md,mm:Md,h:Md,hh:Md,d:Md,dd:Md,M:Md,MM:Md,y:Md,yy:Md},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),Kf.defineLocale("tzm-latn",{months:"innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"),monthsShort:"innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"),weekdays:"asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),weekdaysShort:"asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),weekdaysMin:"asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[asdkh g] LT",nextDay:"[aska g] LT",nextWeek:"dddd [g] LT",lastDay:"[assant g] LT",lastWeek:"dddd [g] LT",sameElse:"L"},relativeTime:{future:"dadkh s yan %s",past:"yan %s",s:"imik",m:"minuḍ",mm:"%d minuḍ",h:"saɛa",hh:"%d tassaɛin",d:"ass",dd:"%d ossan",M:"ayowr",MM:"%d iyyirn",y:"asgas",yy:"%d isgasn"},week:{dow:6,doy:12}}),Kf.defineLocale("tzm",{months:"ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split("_"),monthsShort:"ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split("_"),weekdays:"ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),weekdaysShort:"ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),weekdaysMin:"ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[ⴰⵙⴷⵅ ⴴ] LT",nextDay:"[ⴰⵙⴽⴰ ⴴ] LT",nextWeek:"dddd [ⴴ] LT",lastDay:"[ⴰⵚⴰⵏⵜ ⴴ] LT",lastWeek:"dddd [ⴴ] LT",sameElse:"L"},relativeTime:{future:"ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ %s",past:"ⵢⴰⵏ %s",s:"ⵉⵎⵉⴽ",m:"ⵎⵉⵏⵓⴺ",mm:"%d ⵎⵉⵏⵓⴺ",h:"ⵙⴰⵄⴰ",hh:"%d ⵜⴰⵙⵙⴰⵄⵉⵏ",d:"ⴰⵙⵙ",dd:"%d oⵙⵙⴰⵏ",M:"ⴰⵢoⵓⵔ",MM:"%d ⵉⵢⵢⵉⵔⵏ",y:"ⴰⵙⴳⴰⵙ",yy:"%d ⵉⵙⴳⴰⵙⵏ"},week:{dow:6,doy:12}}),Kf.defineLocale("uk",{months:{format:"січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня".split("_"),standalone:"січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень".split("_")},monthsShort:"січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд".split("_"),weekdays:Pd,weekdaysShort:"нд_пн_вт_ср_чт_пт_сб".split("_"),weekdaysMin:"нд_пн_вт_ср_чт_пт_сб".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY р.",LLL:"D MMMM YYYY р., HH:mm",LLLL:"dddd, D MMMM YYYY р., HH:mm"},calendar:{sameDay:Qd("[Сьогодні "),nextDay:Qd("[Завтра "),lastDay:Qd("[Вчора "),nextWeek:Qd("[У] dddd ["),lastWeek:function(){switch(this.day()){case 0:case 3:case 5:case 6:return Qd("[Минулої] dddd [").call(this);case 1:case 2:case 4:return Qd("[Минулого] dddd [").call(this)}},sameElse:"L"},relativeTime:{future:"за %s",past:"%s тому",s:"декілька секунд",m:Od,mm:Od,h:"годину",hh:Od,d:"день",dd:Od,M:"місяць",MM:Od,y:"рік",yy:Od},meridiemParse:/ночі|ранку|дня|вечора/,isPM:function(a){return/^(дня|вечора)$/.test(a)},meridiem:function(a,b,c){return 4>a?"ночі":12>a?"ранку":17>a?"дня":"вечора"},ordinalParse:/\d{1,2}-(й|го)/,ordinal:function(a,b){switch(b){case"M":case"d":case"DDD":case"w":case"W":return a+"-й";case"D":return a+"-го";default:return a}},week:{dow:1,doy:7}}),Kf.defineLocale("uz",{months:"январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр".split("_"),monthsShort:"янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек".split("_"),weekdays:"Якшанба_Душанба_Сешанба_Чоршанба_Пайшанба_Жума_Шанба".split("_"),weekdaysShort:"Якш_Душ_Сеш_Чор_Пай_Жум_Шан".split("_"),weekdaysMin:"Як_Ду_Се_Чо_Па_Жу_Ша".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"D MMMM YYYY, dddd HH:mm"},calendar:{sameDay:"[Бугун соат] LT [да]",nextDay:"[Эртага] LT [да]",nextWeek:"dddd [куни соат] LT [да]",lastDay:"[Кеча соат] LT [да]",lastWeek:"[Утган] dddd [куни соат] LT [да]",sameElse:"L"},relativeTime:{future:"Якин %s ичида",past:"Бир неча %s олдин",s:"фурсат",m:"бир дакика",mm:"%d дакика",h:"бир соат",hh:"%d соат",d:"бир кун",dd:"%d кун",M:"бир ой",MM:"%d ой",y:"бир йил",yy:"%d йил"},week:{dow:1,doy:7}}),Kf.defineLocale("vi",{months:"tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12".split("_"),monthsShort:"Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12".split("_"),weekdays:"chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy".split("_"),weekdaysShort:"CN_T2_T3_T4_T5_T6_T7".split("_"),weekdaysMin:"CN_T2_T3_T4_T5_T6_T7".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM [năm] YYYY",LLL:"D MMMM [năm] YYYY HH:mm",LLLL:"dddd, D MMMM [năm] YYYY HH:mm",l:"DD/M/YYYY",ll:"D MMM YYYY",lll:"D MMM YYYY HH:mm",llll:"ddd, D MMM YYYY HH:mm"},calendar:{sameDay:"[Hôm nay lúc] LT",nextDay:"[Ngày mai lúc] LT",nextWeek:"dddd [tuần tới lúc] LT",lastDay:"[Hôm qua lúc] LT",lastWeek:"dddd [tuần rồi lúc] LT",sameElse:"L"},relativeTime:{future:"%s tới",past:"%s trước",s:"vài giây",m:"một phút",mm:"%d phút",h:"một giờ",hh:"%d giờ",d:"một ngày",dd:"%d ngày",M:"một tháng",MM:"%d tháng",y:"một năm",yy:"%d năm"},ordinalParse:/\d{1,2}/,ordinal:function(a){return a},week:{dow:1,doy:4}}),Kf.defineLocale("zh-cn",{months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),weekdaysShort:"周日_周一_周二_周三_周四_周五_周六".split("_"),weekdaysMin:"日_一_二_三_四_五_六".split("_"),longDateFormat:{LT:"Ah点mm分",LTS:"Ah点m分s秒",L:"YYYY-MM-DD",LL:"YYYY年MMMD日",LLL:"YYYY年MMMD日Ah点mm分",LLLL:"YYYY年MMMD日ddddAh点mm分",l:"YYYY-MM-DD",ll:"YYYY年MMMD日",lll:"YYYY年MMMD日Ah点mm分",llll:"YYYY年MMMD日ddddAh点mm分"},meridiemParse:/凌晨|早上|上午|中午|下午|晚上/,meridiemHour:function(a,b){return 12===a&&(a=0),"凌晨"===b||"早上"===b||"上午"===b?a:"下午"===b||"晚上"===b?a+12:a>=11?a:a+12},meridiem:function(a,b,c){var d=100*a+b;return 600>d?"凌晨":900>d?"早上":1130>d?"上午":1230>d?"中午":1800>d?"下午":"晚上"},calendar:{sameDay:function(){return 0===this.minutes()?"[今天]Ah[点整]":"[今天]LT"},nextDay:function(){return 0===this.minutes()?"[明天]Ah[点整]":"[明天]LT"},lastDay:function(){return 0===this.minutes()?"[昨天]Ah[点整]":"[昨天]LT"},nextWeek:function(){var a,b;return a=Kf().startOf("week"),b=this.unix()-a.unix()>=604800?"[下]":"[本]",0===this.minutes()?b+"dddAh点整":b+"dddAh点mm"},lastWeek:function(){var a,b;return a=Kf().startOf("week"),b=this.unix()<a.unix()?"[上]":"[本]",0===this.minutes()?b+"dddAh点整":b+"dddAh点mm"},sameElse:"LL"},ordinalParse:/\d{1,2}(日|月|周)/,ordinal:function(a,b){switch(b){case"d":case"D":case"DDD":return a+"日";case"M":return a+"月";case"w":case"W":return a+"周";default:return a}},relativeTime:{future:"%s内",past:"%s前",s:"几秒",m:"1 分钟",mm:"%d 分钟",h:"1 小时",hh:"%d 小时",d:"1 天",dd:"%d 天",M:"1 个月",MM:"%d 个月",y:"1 年",yy:"%d 年"},week:{dow:1,doy:4}}),Kf.defineLocale("zh-tw",{months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),weekdaysShort:"週日_週一_週二_週三_週四_週五_週六".split("_"),weekdaysMin:"日_一_二_三_四_五_六".split("_"),longDateFormat:{LT:"Ah點mm分",LTS:"Ah點m分s秒",L:"YYYY年MMMD日",LL:"YYYY年MMMD日",LLL:"YYYY年MMMD日Ah點mm分",LLLL:"YYYY年MMMD日ddddAh點mm分",l:"YYYY年MMMD日",ll:"YYYY年MMMD日",lll:"YYYY年MMMD日Ah點mm分",llll:"YYYY年MMMD日ddddAh點mm分"},meridiemParse:/早上|上午|中午|下午|晚上/,meridiemHour:function(a,b){return 12===a&&(a=0),"早上"===b||"上午"===b?a:"中午"===b?a>=11?a:a+12:"下午"===b||"晚上"===b?a+12:void 0},meridiem:function(a,b,c){var d=100*a+b;return 900>d?"早上":1130>d?"上午":1230>d?"中午":1800>d?"下午":"晚上"},calendar:{sameDay:"[今天]LT",nextDay:"[明天]LT",nextWeek:"[下]ddddLT",lastDay:"[昨天]LT",lastWeek:"[上]ddddLT",sameElse:"L"},ordinalParse:/\d{1,2}(日|月|週)/,ordinal:function(a,b){switch(b){case"d":case"D":case"DDD":return a+"日";case"M":return a+"月";case"w":case"W":return a+"週";default:return a}},relativeTime:{future:"%s內",past:"%s前",s:"幾秒",m:"一分鐘",mm:"%d分鐘",h:"一小時",hh:"%d小時",d:"一天",dd:"%d天",M:"一個月",MM:"%d個月",y:"一年",yy:"%d年"}}),Kf);return Ng.locale("en"),Ng});
"use strict";
function hexToRgb(hex){
    var bigint = parseInt(hex, 16);
    return [
        (bigint >> 16) & 255,
        (bigint >> 8) & 255,
        bigint & 255
    ];
}
/**
 * Type & Value Detection Functions
 */
// true when obj is not a member of a function
function isAlien(obj){
    return isObject(obj) && !isFunction(obj.constructor);
}
// true when obj is a native javascript array
function isArray(obj){
    return Array.isArray(obj);
}
// true when obj is the meta-type boolean
function isBoolean(obj){
    return typeof obj === 'boolean';
}
// true when obj is an object having the getMonth method
function isDate(obj){
    return isObject(obj) && obj.getMonth;
}
function isDefined(obj){
    return !isUndefined(obj);
}
// true when obj is set and has children nodes or a node type
function isDomElement(obj){
    return obj && (!isUndefined(obj.childNodes) || obj.nodeType);
}
// true when obj is set, the native javascript events is defined, and obj has an events phase
function isEvent(obj){
    return obj && typeof Event != 'undefined' && obj.eventPhase;
}
function isHash(obj){
    return isObject(obj) && isUndefined(obj.prototype);
}
// true when the object is an integer
function isInt(obj){
    var tmp = parseInt(obj);
    if(isNaN(tmp) || isObject(obj) || isArray(obj)){
        return false;
    }
    return obj == tmp && obj.toString() == obj.toString();
};
// true when obj is exactly equal to null
function isNull(obj){
    return obj === null;
}
// true when obj is the meta-type function
function isFunction(obj){
    return isSet(obj) && typeof obj === 'function';
}
// true when obj is the meta-type number and is finite
function isNumber(obj){
    return isSet(obj) && typeof obj === 'number' && isFinite(obj);
}
// true when obj is the meta-type object
function isObject(obj){
    return isSet(obj) && obj instanceof Object && !isArray(obj);
}
// true when obj is of the meta-type string
function isString(obj){
    return isSet(obj) && (typeof obj === 'string' || obj.constructor.toString() === 'string');
}
// true when obj is of the meta-type undefined
function isUndefined(obj){
    return typeof obj === 'undefined';
}

// true if the obj is a oj class
function isObjective(obj, cls){
    return obj && isSet(obj.oj_id) && isFunction(obj._constructor) && (!cls || obj.is(cls));
}
function isObjectiveClass(cls){
    return isFunction(cls) && isSet(cls.TYPE_KEY);
}
function isElement(obj){
    return isObjective(obj) && isSet(obj._dom);
}
function isComponent(obj){
    return isElement(obj) && isSet(obj._template);
}
function isXml(obj){
    // documentElement is verified for cases where it doesn't yet exist
    // (such as loading iframes in IE - #4833)
    var doc_elm = (obj ? obj.ownerDocument || obj : 0).documentElement;
    return doc_elm ? doc_elm.nodeName !== 'HTML' : false;
}
function toXml(obj){
    if(isString(obj)){
        if(window.DOMParser){
            return (new DOMParser()).parseFromString(obj, 'text/xml');
        }
        // Internet Explorer
        var xml = new ActiveXObject('Microsoft.XMLDOM');
        xml.async = false;
        xml.loadXML(obj);
        return xml;
    }
    return isXml(obj) ? obj : null;
}
// value detection functions
function isEmpty(obj){
    return isUnset(obj) || obj === false ||
           (isString(obj) && obj.trim() == '') ||
           (isArray(obj) && obj.length == 0) ||
           (isObject(obj) && isEmptyObject(obj)) ||
           (isObjective(obj) && obj.is('OjArray') && !obj.length);
}
function isEmptyObject(obj){
    var key, val;
    if(isArray(obj)){
        return obj.length == 0;
    }
    else if(isObject(obj)){
        for(key in obj){
            val = obj[key];
            if(!isUndefined(val) && !isFunction(val)){
                return false;
            }
        }
    }
    return true;
}
function isFalse(obj){
    return isUnset(obj) || obj === false || obj === 0 || (isString(obj) && (obj.toLowerCase() == "false" || obj == "0"));
}
function isNumeric(obj){
    return isSet(obj) && isFinite(parseFloat(obj));
}
// true when obj has any value, including 0 and false, both of which are normally false
function isSet(obj){
    return !isUnset(obj);
}
function isTrue(obj){
    return !isFalse(obj);
}
function isUnset(obj){
    return isNull(obj) || isUndefined(obj);
}


/**
 * Framework Logging Functions
 */
function print(obj/*, ...objs*/){
    if(OJ.mode == OJ.PROD){
        return;
    }
    var ln = arguments.length, i;
    if(ln < 2){
        console.log(obj);
    }
    else{
        var ary = [];
        for(i = 0; i < ln; i++){
            ary.push(arguments[i]);
        }
        console.log(ary);
    }
}
function printCloseGroup(){
    console.groupEnd();
}
function printGroup(obj, force){
    if(OJ.mode == OJ.PROD && !force){
        return;
    }
    if(isSet(console.groupCollapsed)){
        console.groupCollapsed(obj);
    }
    else{
        console.group(obj);
    }

    // close the group
    if(!arguments.length){
        printCloseGroup();
    }
}
if(!isSet(window.console) || !isObject(window.console)){
    window.console = {};
}
if(!isSet(console.log) || !isFunction(console.log)){
    console.log = function(){
        // do something not sure what
    };
}
if(!isSet(console.group) || !isFunction(console.group)){
    console.group = console.groupCollapsed = console.groupEnd = console.log;
}


/*
 * DOM Ready Event Handler
 */
function onDomReady(){
    var key,
        target = OJ.byId(OJ.target) || document.body;  // process the target and it's attributes for any additional settings
    if(target){
        // process the target attributes
        // as settings
        var attrs = target.attributes, attr,
            special = ['mode', 'version'],
            ln = special.length;
        // process order sensitive settings first
        for(; ln--;){
            if((attr = special[ln]) && attrs[attr]){
                OJ[attr] = attrs[attr].value;
                target.removeAttribute(attr);
            }
        }
        // process the rest of the settings
        ln = attrs.length;
        for(; ln--;){
            attr = attrs[ln].nodeName;
            // disregard the id, class and event attributes since they are not settings
            if(attr == 'id' || attr == 'class' || attr.substr(0, 3) == 'on-'){
                continue;
            }
            // all other attributes are settings
            OJ[OJ.attributeToProp(attr)] = attrs[ln].value;
            target.removeAttribute(attr);
        }
        OJ._target = target;
    }
    // make sure the theme got loaded
    if(!OJ._theme_elm){
        OJ.theme = OJ.theme;
    }
    // process the mode
    // if no mode has been specified then push us into production mode by default
    if(OJ.mode == OJ.LOADING){
        OJ.mode = OJ.PROD;
    }
    // updated the loaded assets with the appropriate query string
    for(key in OJ._loaded){
        OJ._loaded[key + OJ.version_query] = true;
    }
    // create the OJ component
    var tmp = new OjView();
    tmp.alpha = 0;
    // handle events added before we could do anything with them
    var evt,
        i = 0,
        ln = OJ._events.length;
    for(; i < ln; i++){
        evt = OJ._events[i];
        tmp.addEventListener.apply(tmp, evt);
    }
    delete OJ._events;
    delete OJ.addEventListener;
    delete OJ.removeEventListener;
    // merge OJ with component
    tmp.bulkSet(OJ);
    tmp.addCss('OJ');
    window.OJ = tmp;
    // setup the dom event proxy
    OJ._setProxy(document.body);
    // dispatch load event
    OJ.dispatchEvent(new OjEvent(OjEvent.LOAD));
    // setup css
    var os = OJ.os,
        scale = OJ.pixel_ratio,
        css = [];
    //if(os == OJ.IOS){
    //    tmp.dom.onclick = function(){};
    //}
    // setup dev
    if(OJ.mode == OJ.DEV){
        css.append('is-dev');
    }
    // setup the css classes for special displays
    OJ._onOjResize(null);
    OJ._onOjScroll(null);
    if(OJ.is_mobile){
        css.append('is-mobile');
    }
    else if(OJ.is_tablet){
        css.append('is-tablet');
    }
    if(os == OJ.ANDROID){
        css.append('is-android');
    }
    else if(os == OJ.IOS){
        css.append('is-ios');
    }
    else if(os == OJ.LINUX){
        css.append('is-linux');
    }
    else if(os == OJ.MAC){
        css.append('is-mac');
    }
    else if(os == OJ.WINDOWS){
        css.append('is-windows');
    }
    // setup resolution css
    if(scale >= 1.5){
        css.append('2x'); // 2x resolution
    }
    else if(scale >= 2.5){
        css.append('3x'); // 3x resolution
    }
    else{
        css.append('1x'); // 1x resolution
    }
    // add the css
    OJ.addCss(css);
    // set all the content as displayed
    OJ._setIsDisplayed(true);
    // check if browser is supported
    try{
        var browser = OJ.browser,
            version = OJ.browser_version;
        OJ._is_supported =
            !OJ.is_computer || version == OJ.IN_APP ||
            (browser == OJ.IE && version.compareVersion('10.0') >= 0) ||
            (browser == OJ.FIREFOX && version.compareVersion('2.0') >= 0) ||
            (browser == OJ.CHROME && version.compareVersion('4.0') >= 0) ||
            (browser == OJ.SAFARI && version.compareVersion('5.0') >= 0) ||
            (browser == OJ.OPERA && version.compareVersion('10.5') >= 0);
    }
    catch(e){
        OJ._is_supported = false;
    }
    // timeout offset to allow for css and stuff to settle
    // this is clearly a hack so deal with it
    var on_ready = setInterval(
        // on oj ready event handler
        function(){
            // this is so we know all the css has been applied
            if(isEmpty(OjStyleElement.getStyle(document.body, "minWidth"))){
                return;
            }
            clearInterval(on_ready);
            // close up the loading group logs
            printCloseGroup();
            // run this init function if any
            printGroup("Juicing the oranges.", true);
            // place OJ component in the DOM
            if(OJ._target){
                OJ._setDomSource(OJ._target, OJ);
                OJ._target = null;
            }
            else{
                document.body.appendChild(OJ.dom);
            }
            var init = OJ.init;
            if(init){
                init();
            }
            printCloseGroup();
            // dispatch the ready event
            printGroup("Your OJ is ready. Enjoy!", true);
            OJ._is_ready = true;
            OJ.fadeIn();
            OJ.dispatchEvent(new OjEvent(OjEvent.READY));
            // detect if the browser is not supported
            if(!OJ.is_supported){
                var alrt = WindowManager.makeAlert(OJ.support_message, "Unsupported Browser");
                alrt.hideButtons();
                alrt.pane_width = 425;
                WindowManager.show(alrt);
                return;
            }
            printCloseGroup();
        },
        1
    );
}

window.OJ = function Oj(){
    var obj = {
        "_events" : [], "_guid" : 8, "_loaded" : {},
        "_is_landscape" : true, "_is_mobile" : false, "_is_ready" : false,
        "_is_supported" : true, "_is_tablet" : false, "_is_touch_capable" : false, "_is_webview" : false,
        "_protocol" : "http", "_os_version" : "",
        "_settings" : {
            "css_ext" : ".css", "css_path" : null, "dim_unit" : "px", "font_unit" : "px",
            "init" : null, "js_ext" : ".js", "js_path" : null, "mode" : "loading",
            "support_message" : "<div> Your browser is currently not supported. Please try again with a more recent version of <a href=\"https://www.google.com/intl/en/chrome/browser/\">Chrome</a><a href=\"http://www.mozilla.org/en-US/firefox/new/\">Firefox</a>, or <a href=\"http://www.apple.com/safari/\">Safari</a> You can easily download the latest version by clicking on the name of the browser you wish to use and following the download and installation instructions on the corresponding page. </div>",
            "target" : "#OJ", "theme" : null, "tpl_ext" : "html", "tpl_path" : null,
            "version" : "0.0.0", "wait_for_css" : true
        },
        "_viewport" : null,

        // modes
        "DEV" : "development",
        "LOADING" : "loading",
        "LOCAL" : "local",
        "PROD" : "production",
        // protocols
        "FILE" : "file",
        "HTTP" : "http",
        "HTTPS" : "https",
        // browsers
        "CHROME" : "Chrome",
        "FIREFOX" : "Firefox",
        "IE" : "Internet Explorer",
        "IN_APP" : "in-app",
        "MOZILLA" : "Mozilla",
        "OPERA" : "Opera",
        "SAFARI" : "Safari",
        // Engines
        "GECKO" : "Gecko",
        "KHTML" : "KHTML",
        "TRIDENT" : "Trident",
        "WEBKIT" : "WebKit",
        // OSs
        "CHROME_OS" : "Chromium OS",
        "LINUX" : "Linux",
        "MAC" : "Mac",
        "WINDOWS" : "Windows",
        // mobile OSs
        "ANDROID" : "Android",
        "BADA" : "Bada",
        "BLACKBERRY" : "BlackBerry OS",
        "BREW" : "Brew",
        "GRID" : "Grid OS",
        "IOS" : "iOS",
        "MEEGO" : "MeeGo",
        "PALM" : "Palm",
        "QNX" : "QNX",
        "SYMBIAN" : "Symbian",
        "WEBOS" : "Web OS",
        "WIN_MOBILE" : "Windows Mobile",
        "WIN_PHONE" : "Windows Phone",
        // size classes
        "HEIGHT_COMPACT" : "hc",
        "HEIGHT_REGULAR" : "hr",
        "HEIGHT_LARGE"   : "hl",
        "WIDTH_COMPACT" : "wc",
        "WIDTH_REGULAR" : "wr",
        "WIDTH_LARGE"   : "wl",
        // protected functions
        "_getClassPath" : function(type, cls, ext){
            var parts = cls.split(".");
            return parts.shift() + "/" + (type ? type + "/" : "") + parts.join("/") + ext;
        },
        "_getCssImportPath" : function(path){
            var self = this;
            if(path.indexOf("/") != -1){
                return path;
            }
            return self.root + self._getClassPath(self.css_path, path, self.css_ext) + self.version_query;
        },
        "_getJsImportPath" : function(path){
            var self = this;
            if(path.indexOf("/") != -1){
                return path;
            }
            return self.root + self._getClassPath(self.js_path, path, self.js_ext) + self.version_query;
        },
        "_getModeSuffix" : function(){
            return this.mode == this.DEV ? "-dev" : "";
        },
        "_getTemplateImportPath" : function(path){
            var self = this;
            if(path.indexOf("/") != -1){
                return path;
            }
            return self.root + self._getClassPath(self.tpl_path, path, this.tpl_ext) + this.version_query;
        },
        "_getThemePath" : function(path){
            if(!path || path.indexOf("/") != -1){
                return path;
            }
            var self = this,
                parts = path.split(".");
            if(parts.length == 1){
                parts.push(path);
            }
            parts.splice(1, 0, "themes");
            return self.root + parts.join("/") + self._getModeSuffix() + self.css_ext + self.version_query;
        },
        "_onOjResize" : function(){
            if(isFunction(OJ.dispatchEvent) && isFunction(OJ.addCss)){
                // process resize event
                var prev = OJ.copy(OJ._viewport),
                    vp = OJ.viewport || new OjRect(),
                    w = (OJ.is_mobile ? window.screen : {}).width || window.innerWidth || document.body.clientWidth,
                    h = (OJ.is_mobile ? window.screen : {}).height || window.innerHeight || document.body.clientHeight;
                vp.width = w;
                vp.height = h;
                if(OJ._is_landscape = vp.width > vp.height){
                    OJ.addCss("is-landscape");
                    OJ.removeCss("is-portrait");
                }
                else{
                    OJ.addCss("is-portrait");
                    OJ.removeCss("is-portrait");
                }
                OJ.dispatchEvent(new OjTransformEvent(OjTransformEvent.RESIZE, vp, prev));
                OJ._viewport = vp;
                // process potential size class change event
                var old_h = OJ.size_height,
                    old_w = OJ.size_width,
                    new_h = h <  500 ? OJ.HEIGHT_COMPACT : (h < 1400 ? OJ.HEIGHT_REGULAR : OJ.HEIGHT_LARGE),
                    new_w = w <  500 ? OJ.WIDTH_COMPACT : (w < 1400 ? OJ.WIDTH_REGULAR : OJ.WIDTH_LARGE),
                    delta_h = old_h != new_h,
                    delta_w = old_w != new_w;
                if(delta_h){
                    if(old_h){
                        OJ.removeCss(old_h);
                    }
                    OJ.addCss(OJ._size_height = new_h);
                }
                if(delta_w){
                    if(old_w){
                        OJ.removeCss(old_w);
                    }
                    OJ.addCss(OJ._size_width = new_w);
                }
                if(delta_h || delta_w){
                    OJ.dispatchEvent(new OjSizeClassEvent(OjSizeClassEvent.CHANGE, [new_w, new_h], [old_w, old_h]));
                }
            }
        },
        "_onOjScroll" : function(evt){
            var vp = OJ.viewport.clone();
            vp.top = isSet(window.pageYOffset) ? window.pageYOffset : document.body.scrollTop;
            vp.left = isSet(window.pageXOffset) ? window.pageXOffset : document.body.scrollLeft;
            // TODO: figure out on page scroll functionality
            return vp;
        },
        "_onOjOrientationChange" : function(evt){
            if(isFunction(OJ.dispatchEvent)){
                OJ.dispatchEvent(OjOrientationEvent.convertDomEvent(evt));
            }
        },

        // public functions
        "addEventListener" : function(type, context, func){
            this._events.push(arguments);
        },
        "assetPath" : function(path, file){
            // search for package
            var self = this,
                pkg = path.replace(".", "/packages/");
            return new OjUrl(self.root + pkg + "/assets/" + (file ? file + self.version_query : ""));
        },
        "load" : function(url){
            window.location.href = String.string(url);
        },
        "loadCss" : function(css/*, is_path=false, async=true*/){
            var self = this,
                elm, head;
            // check to see if the value is a path
            if(arguments.length > 1 && arguments[1]){
                elm = document.createElement("link");
                elm.setAttribute("rel", "stylesheet");
                elm.setAttribute("type", "text/css");
                elm.setAttribute("href", css);
            }
            // check to see if we have any css data
            else if(css){
                elm = document.createElement("style");
                elm.type = "text/css";
                if(elm.styleSheet){
                    elm.styleSheet.cssText = css;
                }
                else{
                    elm.appendChild(document.createTextNode(css));
                }
            }
            else{
                return null;
            }
            // add the css element to the head
            head = document.getElementsByTagName("head")[0];
            // if we have a theme elm then we want to insert the css before the theme elm
            // so that it doesn't override the theme css
            if(self._theme_elm){
                head.insertBefore(elm, self._theme_elm);
            }
            // otherwise just add it to the end of the head
            else{
                head.appendChild(elm);
            }
            return elm;
        },
        // dynamically add js to page
        "loadJs" : function(js, is_path/*=true*/, is_async/*=true*/){
            var ln = arguments.length;
            if(ln < 3){
                is_async = true;
                if(ln < 2){
                    is_path = true;
                }
            }
            if(this.mode != this.LOADING || is_async){
                var elm = document.createElement("script");
                elm.setAttribute("type", "text/javascript");
                elm.setAttribute("language", "javascript");
                if(is_async){
                    elm.setAttribute("async", "true");
                }
                if(is_path){
                    elm.setAttribute("src", js);
                }
                else{
                    elm.appendChild(document.createTextNode(js));
                }
                document.getElementsByTagName("head")[0].appendChild(elm);
                return elm;
            }
            if(is_path){
                document.write(
                    "<scri" + "pt type=\"text/javascript\" language=\"javascript\" src=\"" + js + "\"></scr" + "ipt>"
                );
            }
            else{
                eval(js);
            }
        },
        "async" : function(context, func/*, ...args*/){
            setTimeout(function(){ func.apply(context, Array.array(arguments).slice(2)); }, 1);
        },
        "attributeToProp" : function(attr){
            var str = "";
            parts = attr.split("-").forEach(function(item, i){
                str += i ? item.ucFirst() : item;
            });
            return str;
        },
        "propToAttribute" : function(prop, sep){
            var str = "";
            sep = sep || "-";
            prop.split(/(?=[A-Z])/).forEach(function(item, i){
                str += (i ? sep : "") + item.toLowerCase();
            });
            return str;
        },
        "byId" : function(id){
            if(id.charAt(0) == "#"){
                id = id.substr(1);
            }
            return document.getElementById(id);
        },
        /* Returns the class name of the argument or undefined if
         it's not a valid JavaScript object.
         */
        "classToString" : function(obj){
            if(obj && obj.prototype){
                if(obj.prototype._class_name_){
                   return obj.prototype._class_name_;
                }
                if(obj.prototype.constructor && obj.prototype.constructor.toString){
                    var arr = obj.prototype.constructor.toString().match(/function\s*(\w+)/);
                    if(arr && arr.length == 2){
                        return arr[1];
                    }
                }
            }
            return undefined;
        },
        "copy" : function(val){
            if(isArray(val) || isObjective(val)){
                return val.clone();
            }
            if(isDate(val)){
                return new Date(val);
            }
            if(isObject(val)){
                return Object.clone(val);
            }
            return val;
        },
        "destroy" : function(obj/*, depth = 0*/){
            if(obj && isFunction(obj._destructor)){
                if(!obj._destroyed_){
                    var args = arguments;
                    obj._destructor(args.length > 1 ? args[1] : 0);
                }
                else{
                    // debugger;
                    print("Called destroy multiple times on: " + obj.oj_id);
                }
            }
            return obj = null;
        },
        "elm" : function(elm){
            return OjElement.element(elm);
        },

        "defineClass" : function(ns, def, static_def){
            eval("window[ns] = function " + ns + "(){" + (def["_constructor"] ? "this._constructor.apply(this, arguments);" : "") + "};");
            var cls = window[ns],
                key;
            def._class_name_ = ns;
            def._supers = (def._supers || []).slice(0);
            cls.oj_id = ns;
            cls.prototype = def;
            if(static_def){
                for(key in static_def){
                    cls[key] = static_def[key];
                }
            }
            return cls;
        },
        "definePackage" : function(ns, def, parents/*=[OjPackage]*/){
            var cls = this.extendClass(ns, parents || [OjPackage], def),
                pkg = new cls();
            window[ns.toUpperCase()] = pkg;
            OJ.addEventListener(OjEvent.LOAD, pkg, "_onOjLoad");
            OJ.addEventListener(OjEvent.READY, pkg, "_onOjReady");
        },
        "extendClass" : function(ns, parents, def, static_def){
            // setup our vars & prototype
            var key, parent, ln2, names, name, supers, spr,
                props = { "_get_props_" : null, "_set_props_" : null, "_props_" : null },
                ln = parents.length, i = 1,
                proto = Object.create(parents[0].prototype),
                cls = OJ.defineClass(ns, proto);
            proto._supers.push(parents[0]);
            // copy the base class statics
            for(; ln--;){
                parent = parents[ln];
                for(key in parent){
                    cls[key] = parent[key];
                }
            }
            // add new statics
            if(static_def){
                for(key in static_def){
                    cls[key] = static_def[key];
                }
            }
            // copy the other parent's prototype
            for(ln = parents.length; i < ln; i++){
                parent = parents[i].prototype;
                // copy object
                names = Object.getOwnPropertyNames(parent);
                for(ln2 = names.length; ln2--;){
                    name = names[ln2];
                    if(name == "_class_name_"){
                        continue;
                    }
                    if(name == "_supers"){
                        supers = proto[name];
                        for(var ln3 = parent[name].length; ln3--;){
                            spr = parent[name][ln3];
                            // we use indexOf here because contains may not be defined yet.
                            if(supers.indexOf(spr) == -1){
                                supers.push(spr);
                            }
                        }
                        proto[name].push(parents[ln]);
                    }
                    else if(name == "_post_compile_"){
                        proto[name] = parent[name].slice(0).concat(proto[name] || []);
                    }
                    else if(name in props){
                        // merge them straight into the def
                        def[name] = Object.concat({}, parent[name], def[name] || {});
                    }
                    else{
                        try{
                            Object.defineProperty(proto, name, Object.getOwnPropertyDescriptor(parent, name));
                        }
                        catch(e){
                            debugger;
                        }
                    }
                }
            }
            // add the namespace back
            proto._class_name_ = ns;
            // add the props
            for(key in props){
                // if no def props then finish exit process
                if(!def[key]){
                    continue;
                }
                // if we have def props then compile
                proto._propCompile_(def, key);
            }
            // setup the static var
            cls.oj_id = ns;
            proto._static = cls;
            // process other functions and properties accordingly
            for(key in def){
                // skip private funcs
                if(key.charAt(0) == "_" && key.slice(-1) == "_"){
                    continue;
                }
                proto[key] = def[key];
            }
            // if there is a compile function use it
            if(isFunction(def._compile_)){
                def._compile_.call(proto, def);
            }
            var post_compile = proto._post_compile_;
            if(post_compile){
                var def_post = def._post_compile_;
                // run the post compile functions
                if(isFunction(def_post)){
                    proto._post_compile_ = post_compile = post_compile.slice(0);
                    post_compile.unshift(def_post);
                }
                for(ln = post_compile.length; ln--;){
                    post_compile[ln](cls, proto);
                }
            }
            // setup the prototype and constructor for the class
            return cls.prototype.constructor = cls;
        },
        "extendComponent" : function(ns, parents, def, static_def){
            var self = this,
                tags = static_def ? static_def._TAGS : null,
                ln = tags ? tags.length : 0,
                cls = self.extendClass.apply(self, arguments);
            // register class name as tag
            OjStyleElement.registerComponentTag(OJ.propToAttribute(ns), ns);
            // register special tags
            for(; ln--;){
                OjStyleElement.registerComponentTag(tags[ln], ns);
            }
            return cls;
        },
        "extendManager" : function(manager_ns/*, cls_ns, parents, def, static_def*/){
            var prev_manager = window[manager_ns],
                cls = OJ.extendClass.apply(this, Array.slice(arguments, 1));
            return window[manager_ns] = new cls(prev_manager);
        },

        "guid" : function(){
            return (arguments.length ? "OJ" : "func") + "_" + this._guid++;
        },
        "implementInterface" : function(/*intrfc1, intrfc2, ..., def*/){
            var key, intrfc,
                i = 0,
                ln = arguments.length - 1,
                def = arguments[ln];
            for(; i < ln; i++){
                intrfc = arguments[i];
                // process strings as potential interfaces
                // then automatically setup the private interface var for css purposes
                if(isString(intrfc)){
                    var cls = OJ.stringToClass(intrfc)
                    cls._interface_ = intrfc;
                    intrfc = cls;
                }
                for(key in intrfc){
                    if(isUndefined(def[key])){
                        def[key] = intrfc[key];
                    }
                    // if this is properties and they are already defined then we handle them differently
                    else if(key == "_props_" || key == "_get_props_" || key == "_set_props_"){
                        OJ.implementInterface(intrfc[key], def[key]);
                    }
                }
            }
            return def;
        },
        "importCss" : function(path){
            return this.loadCss(this._getCssImportPath(path), true, false);
        },
        "importJs" : function(path){
            return this.loadJs(this._getJsImportPath(path), true, false);
        },
        "includeJs" : function(path){
            // TODO: actually make the include file function do something... or not
        },
        "merge" : function(/*obj, obj2, ...objs*/){
            return Object.concat.apply(Object, arguments);
        },
        "meta" : function(/*property, value*/){
            var ln, meta, name;
            // make sure we have the metadata obj populated
            if(!this._metadata){
                var metas = document.getElementsByTagName("meta");
                this._metadata = {};
                this._metas = {};
                for(ln = metas.length; ln--;){
                    meta = metas[ln];
                    if(meta.parentNode != document.head){
                        continue;
                    }
                    name = meta.getAttribute("name");
                    if(!name){
                        name = meta.getAttribute("http-equiv");
                    }
                    if(name){
                        name = name.toLowerCase();
                        this._metadata[name] = meta.getAttribute("content");
                        this._metas[name] = meta;
                    }
                }
            }
            // check to see if we are getting or setting a specific metadata item
            var ln = arguments.length;
            if(ln){
                name = arguments[0].toLowerCase();
                if(ln > 1){
                    if(meta = this._metas[name]){
                        meta.setAttribute("content", this._metadata[name] = arguments[1]);
                    }
                    else{
                        this._metas[name] = meta = document.createElement("meta");
                        meta.setAttribute("name", arguments[0]);
                        meta.setAttribute("content", this._metadata[name] = arguments[1]);
                        document.head.appendChild(meta);
                    }
                }
                return this._metadata[name];
            }
            // else return the whole thing
            return OJ.merge({}, this._metadata);
        },
        "pageTitle" : function(){
            var d = document;
            return d ? d.title : null;
        },
        "pageDescription" : function(){
            return this.meta("description");
        },
        "removeEventListener" : function(type, context, func){
            var ln = this._events.length,
                evt;
            for(; ln--;){
                evt = this._events[ln];
                if(evt[0] == type && evt[1] == context && evt[2] == func){
                    this._events.splice(ln, 1);
                    break;
                }
            }
        },
        "settings" : function(settings){
            var key;
            for(key in settings){
                this[key] =  settings[key];
            }
        },
        "stringToClass" : function(str){
            return window[str];
        },
        "stringToVar" : function(obj){
            var parts = isArray(obj) ? obj : obj.split("."), ln = parts.length, i;
            obj = window;
            for(i = 0; i < ln; i++){
                if(!obj[parts[i]]){
                    obj[parts[i]] = {};
                }
                obj = obj[parts[i]];
            }
            return obj;
        },
        "toClass" : function(obj){
            return isString(obj) ? this.stringToClass(obj) : obj;
        },
        "unset" : function(context, args){
            var ln = args.length,
                prop = args[0],
                props;
            if(isArray(args[0])){
                for(ln = (props = args[0]).length; ln--;){
                    args[0] = props[ln];
                    context._unset.apply(context, args);
                }
                return;
            }
            context[prop] = OJ.destroy(context[prop], ln > 1 ? args[1] : 0);
        }
    },
    get_props = {
        "browser" : null,
        "browser_version" : null,
        "css_prefix" : null,
        "engine" : null,
        "is_computer" : function(){
            return !this.is_mobile && !this.is_tablet;
        },
        "is_dev" : function(){
            return this.mode == this.DEV;
        },
        "is_landscape" : null,
        "is_loading" : function(){
            return this.mode == this.LOADING;
        },
        "is_local" : function(){
            return this.mode == this.LOCAL;
        },
        "is_mobile" : null,
        "is_portrait" : function(){
            return !this.is_landscape;
        },
        "is_prod" : function(){
            return this.mode == this.PROD;
        },
        "is_ready" : null,
        "is_supported" : null,
        "is_tablet" : null,
        "is_touch_capable" : null,
        "is_webview" : null,
        "os" : null,
        "os_version" : null,
        "pixel_ratio" : function(){
            return window.devicePixelRatio || 1;
        },
        "protocol" : null,
        "root" : null,
        "screen" : function(){
            var rect = {
                "top" : isSet(window.screenY) ? window.screenY : window.screenTop,
                "left" : isSet(window.screenX) ? window.screenX : window.screenLeft,
                "width" : window.screen.availWidth,
                "height" : window.screen.availHeight
            };
            rect.bottom = rect.top + rect.height;
            rect.right = rect.left + rect.width;
            return rect;
        },
        "scroll_left" : function(){
            return document.body.scrollLeft;
        },
        "scroll_top" : function(){
            return document.body.scrollTop;
        },
        "size_width" : null,
        "size_height" : null,
        "version_query" : function(){
            var self = this,
                v;
            if(self.mode == self.LOADING || self.protocol == self.FILE || isEmpty(v = self.version)){
                return "";
            }
            return "?v=" + v;
        },
        "viewport" : function(){
            return new OjRect(
                isSet(window.pageYOffset) ? window.pageYOffset : document.body.scrollTop,
                isSet(window.pageXOffset) ? window.pageXOffset : document.body.scrollLeft,
                isSet(window.innerWidth) ? window.innerWidth : document.body.clientWidth,
                isSet(window.innerHeight) ? window.innerHeight : document.body.clientHeight
            );
        }
    },
    set_props = {
        "root" : function(val){
            var self = this;
            self._root = isEmpty(val) && self.protocol == self.FILE ? "" : (val + "/");
        },
        "scroll_left" : function(val){
            document.body.scrollLeft = val;
        },
        "scroll_top" : function(val){
            document.body.scrollTop = val;
        },
        "theme" : function(val){
            var self = this,
                old_path = self._compiled_theme_path,
                path = self._getThemePath(val),
                ln, elms;
                // check for change
                if(!path || path.indexOf(old_path) > -1){
                    return;
                }
                elms = document.getElementsByTagName("link");
                self._compiled_theme_path = path;
                for(ln = elms.length; ln--;){
                    if(elms[ln].getAttribute("href").indexOf(old_path) > -1){
                        elms[ln].setAttribute("href", path);
                        return;
                    }
                }
                self._settings.theme = val;
                self._theme_elm = self.loadCss(path, true);
        },
        "viewport" : function(val){
        }
    },
    key;

    function makeProperty(key, is_setting){
        var get_func = is_setting ? function(){ return this._settings[key]; } : function(){ return this["_" + key]; },
            set_func = is_setting ? function(val){ return this._settings[key] = val; } : function(val){ return this["_" + key] = val; };
        Object.defineProperty(
            obj, key,
            {
                "get" : get_props[key] || get_func,
                "set" : set_props[key] || (is_setting ? set_func : function(){ throw "Property '" + key + "' cannot be set." }),
                "enumerable" : true,
                "configurable" : false
            }
        );
    }
    // add settings properties
    for(key in obj._settings){
        makeProperty(key, true);
    }
    // add other properties
    for(key in get_props){
        makeProperty(key);
    }
    return obj
}();
(function(){
    // detect script element
    var script_elms = document.getElementsByTagName("script"),
        ln = script_elms.length,
        src, index, path;
    for(; ln--;){
        src = script_elms[ln].getAttribute("src");
        index = src.indexOf('//'); // detect protocol mode
        // search for oj file
        if(src.indexOf("oj/main") > -1){
            break;
        }
    }
    // process the protocol and setup the path
    if(index > -1){
        path = src;
        OJ._protocol = (!index ? window.location.protocol : src.substring(0, index)).replace(':', '');
    }
    else{
        path = window.location.href.split("#")[0].split('/');
        // detect root
        if(src.charAt(0) == '/'){
            path = path.slice(0, 3);
        }
        else{
            path.pop();
            path.push('');  // fix for no prefix slash on src
        }
        path = path.join('/') + src;
        OJ._protocol = window.location.protocol.substring(-1);
    }
    path = path.split('/');
    path.pop(); // remove the file name
    path.pop(); // move up a directory
    // detect the root
    OJ.root = path.join('/');
    // detect the browser, os and version
    var detector = {
        'search' : function(data){
            var ln = data.length;
            for(; ln--;){
                var dataString = data[ln].s,
                    dataProp = data[ln].p;
                this.v = data[ln].v || data[ln].id;
                if(dataString){
                    if(dataString.indexOf(data[ln].sub) != -1){
                        return data[ln].id;
                    }
                }
                else if(dataProp){
                    return data[ln].id;
                }
            }
        },
        'version' : function(str){
            var index = str ? str.indexOf(this.v) : -1;
            if(index == -1){
                return;
            }
            return str.substring(index + this.v.length + 1).split(' ')[0];
        }
    };
    OJ._browser = detector.search(
        [
            {
              // for older Netscapes (4-)
              's' : navigator.userAgent,
              'sub' : 'Mozilla',
              'id' : 'Netscape',
              'v' : 'Mozilla'
            },
            {
              's' : navigator.userAgent,
              'sub' : 'OmniWeb',
              'v' : 'OmniWeb/',
              'id' : 'OmniWeb'
            },
            {
              'p' : window.opera,
              'id' : 'Opera',
              'v' : 'Version'
            },
            {
              's' : navigator.vendor,
              'sub' : 'iCab',
              'id' : 'iCab'
            },
            {
              's' : navigator.vendor,
              'sub' : 'KDE',
              'id' : 'Konqueror'
            },
            {
              's' : navigator.vendor,
              'sub' : 'Camino',
              'id' : 'Camino'
            },
            {
              // for newer Netscapes (6+)
              's' : navigator.userAgent,
              'sub' : 'Netscape',
              'id' : 'Netscape'
            },
            {
              's' : navigator.userAgent,
              'sub' : 'Gecko',
              'id' : 'Mozilla',
              'v' : 'rv'
            },
            {
              's' : navigator.appVersion,
              'sub' : 'Edge',
              'id' : 'Internet Explorer',
              'v' : 'rv'
            },
            {
              's' : navigator.appVersion,
              'sub' : 'Trident',
              'id' : 'Internet Explorer',
              'v' : 'rv'
            },
            {
              's' : navigator.userAgent,
              'sub' : 'MSIE',
              'id' : 'Internet Explorer',
              'v' : 'MSIE'
            },
            {
              's' : navigator.vendor,
              'sub' : 'Apple',
              'id' : 'Safari',
              'v' : 'Version'
            },
            {
              's' : navigator.userAgent,
              'sub' : 'Firefox',
              'id' : 'Firefox'
            },
            {
              's' : navigator.userAgent,
              'sub' : 'Chrome',
              'id' : 'Chrome'
            }
        ]
    ) || null;
    OJ._browser_version = detector.version(navigator.userAgent) || detector.version(navigator.appVersion) ||
        detector.version(navigator.user_agent);
    // detect OS
    var user_agent = navigator.userAgent.toLowerCase();
    if(/(android)/i.test(user_agent)){
        OJ._os = OJ.ANDROID;
        OJ._is_tablet = !(OJ._is_mobile = /(mobile)/i.test(user_agent));
        OJ._is_touch_capable = true;
    }
    else if(/(iphone|ipod|ipad)/i.test(user_agent)){
        var v = (navigator.appVersion).match(/OS\ (\d+)_(\d+)_?(\d+)?/);
        OJ._os = OJ.IOS;
        OJ._is_tablet = !(OJ._is_mobile = (user_agent.indexOf('ipad') == -1));
        OJ._is_touch_capable = true;
        OJ._is_webview = !(/safari/i.test(user_agent)) || (/crios/i.test(user_agent));
        OJ._os_version = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)].join('.');
        // check for in app
        if(!OJ._browser_version){
            OJ._browser_version = OJ.IN_APP;
        }
    }
    else{
        OJ._os = detector.search(
            [
                {
                 's' : navigator.platform,
                 'sub' : 'Win',
                 'id' : 'Windows'
                },
                {
                 's' : navigator.platform,
                 'sub' : 'Mac',
                 'id' : 'Mac'
                },
                {
                 's' : navigator.platform,
                 'sub' : 'Linux',
                 'id' : 'Linux'
                },
                {
                 's' : navigator.platform,
                 'sub' : 'CrOS',
                 'id' : 'Chromium OS'
                }
            ]
        ) || null;
    }
    if(!OJ._is_touch_capable){
        OJ._is_touch_capable = 'ontouchstart' in window;
    }
    // detect
    switch(OJ._browser){
        case OJ.FIREFOX:
            OJ._engine = OJ.GECKO;
            OJ._css_prefix = '-moz-';
            break;
        case OJ.IE:
            OJ._engine = OJ.TRIDENT;
            OJ._css_prefix = '-ms-';
            break;
        case OJ.CHROME:
        case OJ.SAFARI:
            OJ._engine = OJ.WEBKIT;
            OJ._css_prefix = '-webkit-';
    }
    // setup browser event listeners
    if(window.addEventListener){
        window.addEventListener("resize", OJ._onOjResize, false);
        window.addEventListener("scroll", OJ._onOjScroll, false);
        window.addEventListener("orientationchange", OJ._onOjOrientationChange, false);
    }
    else{
        window.attachEvent("onresize", OJ._onOjResize, false);
        window.attachEvent("onscroll", OJ._onOjScroll, false);
        window.attachEvent("onorientationchange", OJ._onOjOrientationChange, false);
    }
    printGroup("Picking the oranges.", true);
})();

// date functions
if(!Date.prototype.add){
    Date.prototype.add = function(milliseconds){
        return new Date(this.getTime() + milliseconds);
    };
}
if(!Date.prototype.clone){
    Date.prototype.clone = function(){
        return new Date(this.getTime());
    };
}
if(!Date.prototype.isEqual){
    Date.prototype.isEqual = function(date){
        return isDate(date) && this.getTime() == date.getTime();
    };
}
if(!Date.prototype.getTotalMinutes){
    Date.prototype.getTotalMinutes = function(no_partial){
        return (this.getHours() * 60) + this.getMinutes() + (no_partial ? 0 : this.getSeconds() / 60);
    };
}
if(!Date.prototype.exportData){
    Date.prototype.exportData = function(mode){
        return this.toISOString();
    }
}
if(!Date.prototype.getUTCTimezoneOffset){
    Date.prototype.getUTCTimezoneOffset = function(){
        return this.getTimezoneOffset() * -1;
    }
}
if(!Date.prototype.subtract){
    Date.prototype.subtract = function(milliseconds){
        return this.add(-1 * milliseconds);
    };
}
if(!Date.date){
    Date.date = function(val){
        if(val){
            return new Date(val);
        }
        return new Date();
    }
}
if(!Date.utcTimezoneOffset){
    Date.utcTimezoneOffset = function(){
        return (new Date()).getUTCTimezoneOffset();
    };
}
var proto = Function.prototype;
if(!proto.bind){
    proto.bind = function(oThis){
        if(!isFunction(this)){
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }
        var aArgs = Array.array(arguments).slice(1),
            fToBind = this,
            fNOP = function(){
            },
            fBound = function OjCallback(){
                return fToBind.apply(
                        this instanceof fNOP && oThis ? this : oThis,
                        aArgs.concat(Array.array(arguments))
                );
            };
        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();
        return fBound;
    };
}
/**
 * JSON Prototype Functions
 */
Date.prototype.toJson = function(key){
    return isFinite(this.valueOf()) ?
        this.getUTCFullYear().toFormattedString(2, 0) + '-' +
            (this.getUTCMonth() + 1).toFormattedString(2, 0) + '-' +
            this.getUTCDate().toFormattedString(2, 0) + 'T' +
            this.getUTCHours().toFormattedString(2, 0) + ':' +
            this.getUTCMinutes().toFormattedString(2, 0) + ':' +
            this.getUTCSeconds().toFormattedString(2, 0) + 'Z'
        : null;
};
Array.prototype.toJson = function(){
    return JSON.stringify(this);
};
String.prototype.toJson = Number.prototype.toJson = Boolean.prototype.toJson = function(key){
    return this.valueOf();
};
String.prototype.parseJson = function(){
    if(isEmpty(this)){
        return null;
    }
    return JSON.parse(this, function(key, value){
        // date revival
        if(isString(value) && value.substr(-1) == 'Z'){
            var a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
            if(a){
                return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]));
            }
        }
        return value;

    });
};
window.toJson = function(obj){
    return JSON.stringify(obj);
};
// math functions
if(!Math.signedCeil){
    Math.signedCeil = function(num){
        if(num < 0){
            return Math.floor(num);
        }
        return Math.ceil(num);
    };
}
if(!Math.signedFloor){
    Math.signedFloor = function(num){
        if(num < 0){
            return Math.ceil(num);
        }
        return Math.floor(num);
    }
}
if(!Math.bounds){
    Math.bounds = function(num, min, max){
        return Math.min(Math.max(min, num), max)
    }
}

// number functions
var proto = Number.prototype;
proto.oldToString = proto.toString();
if(!proto.toFormattedString){
    proto.toFormattedString = function(num_digits, num_decimals){
        var str = '',
            parts = this.valueOf().split('.');
        if(num_digits){
            for(; parts[0].length < num_digits;){
                parts[0] = '0' + parts[0];
            }
            str = parts[0];
        }
        if(num_decimals){
            str += '.';
            for(; parts[1].length < num_decimals;){
                parts[1] += '0';
            }
            str += parts[1];
        }
        return str;
    };
}
// Modify Built-In Object Class
// Modify Built-In Object Class
if(!Object.create){
    Object.create = function(o){
        if(arguments.length > 1){
            throw new Error('Object.create implementation only accepts the first parameter.');
        }
        function F(){
        }
        F.prototype = o;
        return new F();
    };
}
if(!Object.keys){
    Object.keys = function(obj){
        if(obj !== Object(obj)){
            throw new TypeError('Object.keys called on non-object');
        }
        if(obj.__count__){
            return obj.__count__;
        }
        var key, rtrn = [];
        for(key in obj){
            if(Object.prototype.hasOwnProperty.call(obj, key)){
                rtrn.append(key);
            }
        }
        key = null;
        return rtrn;
    };
}
Object.numKeys = function(obj){
    return isSet(obj) ? Object.keys(obj).length : 0;
};
Object.toJson = function(obj){
};
Object.clone = function(obj){
    var cloned = {}, key;
    for(key in obj){
        cloned[key] = obj[key];
    }
    return cloned;
};
Object.concat = function(obj, obj2/*, ...objs*/){
    var key, i,
        merged = {},
        ln = arguments.length;
    for(i = 0; i < ln; i++){
        for(key in arguments[i]){
            merged[key] = arguments[i][key];
        }
    }
    return merged;
};


// Setup OjObject Class
window.OjObject = function(){ };
OjObject.prototype = {
    '_post_compile_' : [],
    '_propCompile_' : function(context, props){
        var key, prop, val,
            props = context[props],
            is_getter = props != '_set_props_',
            is_setter = props != '_get_props_';
        if(isFunction(context['_processProp_'])){
            this._processProp_ = context['_processProp_'];
        }
        for(key in props){
            prop = '_' + key;
            val = props[key];
            // store the default value of the property
            if(isSet(val)){
                this[prop] = val;
            }
            this._processProp_(key, prop, is_getter ? '.' + key : null, is_setter ? '=' + key : null);
        }
    },
    '_processProp_' : function(key, prop, getter, setter){
        // define property
        Object.defineProperty(this, key, {
            'configurable': true,
            'enumerable': false,
            'get' : function(){
                if(!getter){
                    throw 'Property "' + key + '" get not allowed.'
                }
                var get_func = this[getter];
                if(get_func){
                    return get_func.call(this);
                }
                return this[prop];
            },
            'set' : function(newValue){
                if(!setter){
                    throw 'Property "' + key + '" set not allowed.'
                }
                var set_func = this[setter];
                if(set_func){
                    set_func.call(this, newValue);
                }
                else{
                    this[prop] = newValue;
                }
                return newValue;
            }
        });
    },

    '_constructor' : function(obj){
        this._id_ = OJ.guid(this);
        if(obj){
            this.bulkSet(obj);
        }
        return this;
    },
    // Internal Methods
    '_super' : function(context, func, args){
        if(!context || !context.prototype || !context.prototype[func]){
            print(arguments);
            debugger;
        }
        return context.prototype[func].apply(this, args || []);
    },
    '_destructor' : function(/*depth = 0*/){
        var key;
        for(key in this){
            delete this[key];
        }
        this._destroyed_ = true;
    },

    '_processArguments' : function(args, def){
        var ln = args.length,
            count = 0,
            key, val, ctx, ary, ln2, i;
        for(key in def){
            if(!isEmpty(key)){
                val = def[key];
                if(ln > count){
                    val = args[count];
                }
                if(!isUndefined(val)){
                    ctx = this;
                    ary = key.split('.');
                    if((ln2 = ary.length) > 1){
                        for(i = 0; i < ln2; i++){
                            if(i){
                                ctx = ctx[key];
                            }
                            key = ary[i];
                        }
                    }
                    if(isFunction(ctx[key])){
                        ctx[key](val);
                    }
                    else{
                        ctx[key] = val;
                    }
                }
            }
            count++;
        }
    },
    '_unset' : function(prop/*|props, depth*/){
        OJ.unset(this, arguments);
    }
};

OJ.extendClass(
    'OjObject', [OjObject],
    {
        // Private Vars
        '_destroyed_' : false,
        '_get_props_' : {
            'oj_class_name' : null,
            'oj_class' : null,
            'oj_id' : null
        },
        // Public Methods
        'bulkGet' : function(props){
            var key, getter_func, obj = {};
            for(key in props){
                if(isFunction(this[key])){
                    obj[key] = this[key]();
                }
                else{
                    obj[key] = props[key];
                }
            }
            return obj;
        },
        'bulkSet' : function(obj){
            var props = Object.getOwnPropertyNames(obj),
                ln = props.length,
                prop;
            for(;ln--;){
                prop = props[ln];
                Object.defineProperty(this, prop, Object.getOwnPropertyDescriptor(obj, prop));
            }
        },
        'clone' : function(){
            var cls = this._static;
            return new cls();
        },
        'exportData' : function(mode){
            var self = this,
                data = {};
            data[self._static.TYPE_KEY] = self.oj_class_name;
            return data;
        },
        'importData' : function(data, mode){
            return data;
        },
        'is' : function(val){
            if(isString(val)){
                val = OJ.stringToClass(val);
            }
            return val == this._static || this._supers.contains(val);
        },
        'isEqualTo' : function(obj){
            return this == obj;
        },
        'toJson' : function(){
            return JSON.stringify(this);
        },
        'toQueryString' : function(){
            return Object.toQueryString(this);
        },
        'toString' : function(){
            var self = this;
            return self.oj_class_name + ' : ' + self.oj_id;
        },

        // Public Properties
        '.oj_class' : function(){
            return this._static;
        },
        '.oj_class_name' : function(){
            return this._class_name_
        },
        '.oj_id' : function(){
            return this._id_;
        }
    },
    {
        'TYPE_KEY' : '__type__',
        "CACHE": "cache",
        'CLONE' : 'clone',
        "DEFAULT" : "default",

        '_unset' : function(prop/*|props, depth*/){
            OJ.unset(this, arguments);
        },
        'importData' : function(data, mode){
            var i, c, obj, key, cls;
            if(isArray(data)){
                for(i = data.length; i--;){
                    data[i] = OjObject.importData(data[i], mode);
                }
            }
            else if(isObject(data)){
                cls = data[this.TYPE_KEY];
                if(cls){
                    c = OJ.stringToClass(cls);
                    if(!c && cls.indexOf('.') > -1){
                        
                        c = OJ.stringToClass(cls.split('.').last)
                    }
                    if(c){
                        obj = new c();
                        obj.importData(data, mode);
                        return obj;
                    }
                }
                for(key in data){
                    data[key] = OjObject.importData(data[key], mode);
                }
            }
            return data;
        },
        'exportData' : function(obj, mode){
            var key;
            if(isArray(obj)){
                for(key = obj.length; key--;){
                    obj[key] = OjObject.exportData(obj[key], mode);
                }
            }
            else if(isObject(obj)){
                if(isFunction(obj.exportData)){
                    return obj.exportData(mode);
                }
                for(key in obj){
                    obj[key] = OjObject.exportData(obj[key], mode);
                }
            }
            // this checks for NaN since NaN does not equal itself
            else if(obj !== obj){
                return null;
            }
            return obj;
        },
        'makeNew' : function(args){
            var constructor = this;
            function F(){
                return constructor.apply(this, args);
            }
            F.prototype = constructor.prototype;
            return new F();
        }
    }
);

// force supers to empty array since we spoofed the super when extending the class
OjObject.prototype._supers = [];


OJ.extendClass(
    'OjActionable', [OjObject],
    {
        // Internal Vars
        '_prevent_dispatch' : false,

        // Internal Methods
        '_constructor' : function(){
            this._actionable = this;
            this._super(OjObject, '_constructor', arguments);
        },
        '_destructor' : function(){
            // dispatch a destroy event and then destroy all active listeners
            if(this._actionable){
                this.dispatchEvent(new OjEvent(OjEvent.DESTROY));
                this.removeAllListeners();
                this._actionable = null;
            }
            return this._super(OjObject, '_destructor', arguments);
        },

        '_listeners' : function(type) {
            return null;
        },
        '_updateListeners' : function(action, type){
            var func = action == 'add' ? 'addEventListener' : 'removeEventListener',
                settings = this._listeners(type),
                ln = settings ? settings.length : 0,
                obj;
            if(ln){
                if((obj = settings[0]) && obj[func]){
                    type = type.ucFirst()
                    if(ln > 1){
                        obj[func](settings[1], this, '_on' + type + 'Success');
                    }
                    if(ln > 2){
                        obj[func](settings[2], this, '_on' + type + 'Fail');
                    }
                }
            }
        },

        // Public Methods
        'addEventListener' : function(type, context, callback){
            EventManager.addEventListener(this._actionable, type, context, callback);
        },
        'hasEventListener' : function(type){
            return EventManager.hasEventListener(this._actionable, type);
        },
        'hasEventListeners' : function(type/*|types, type*/){
            var args = arguments,
                  ln = args.length;
            if(ln == 1){
                if(isArray(args[0])){
                    args = args[0];
                    ln = args.length;
                }
                else{
                    args = [args[0]];
                    ln = 1;
                }
            }
            for(; ln--;){
                if(!EventManager.hasEventListener(this._actionable, args[ln])){
                    return false;
                }
            }
            return true;
        },
        'removeAllListeners' : function(){
            return EventManager.removeAllListeners(this._actionable);
        },
        'removeEventListener' : function(type, context, callback){
            EventManager.removeEventListener(this._actionable, type, context, callback);
        },
        'dispatchEvent' : function(evt){
            if(this._prevent_dispatch || evt.canceled){
                return;
            }
            if(this._actionable){
                EventManager.dispatchEvent(this._actionable, evt);
            }
        }
    },
  {
    'ADD' : 'add',
    'REMOVE' : 'remove'
  }
);

OJ.extendClass(
  'OjPackage', [OjActionable],
  {
    '_onOjLoad' : function(evt){
      OJ.removeEventListener(OjEvent.LOAD, this, '_onOjLoad');
    },
    '_onOjReady' : function(evt){
      OJ.removeEventListener(OjEvent.READY, this, '_onOjReady');
    }
  }
);
String.string = function(val){
    if(isSet(val)){
        return isObject(val) && val.toString ? val.toString() : String(val);
    }
    return "";
};

var proto = String.prototype;
if(!proto.chunk){
    proto.chunk = function(size, callback){
        var num = Math.ceil(this.length / size), // | 0,
            chunks = new Array(num),
            i = 0,
            o = 0;
        for(; i < num; ++i, o += size) {
            chunks[i] = this.substr(o, size);
            if(callback){
                callback(chunks[i])
            }
        }
        return chunks;
    };
}
if(!proto.contains){
    proto.contains = function(obj){
        return this.indexOf(obj) != -1;
    };
}
if(!proto.lcFirst){
    proto.lcFirst = function(){
        return this.charAt(0).toLowerCase() + this.slice(1);
    };
}

if(!proto.ucFirst){
    proto.ucFirst = function(){
        return this.charAt(0).toUpperCase() + this.slice(1);
    };
}

if(!proto.capitalize){
    proto.capitalize = function(){
        var str = '',
            words = this.split(' '),
            ln = words.length;
        for(; ln--;){
            if(str != ''){
                str = ' ' + str;
            }
            str = words[ln].ucFirst() + str;
        }
        return str;
    };
}
if(!proto.compareVersion){
    proto.compareVersion = function(v){
        var i = 0,
            res = 0,
            p1 = this.split('.'),
            p2 = v.split('.'),
            ln = Math.max(p1.length, p2.length);
        for(; i < ln; i++){
            var t1 = (i < p1.length) ? parseInt(p1[i], 10) : 0,
                t2 = (i < p2.length) ? parseInt(p2[i], 10) : 0;
            if(isNaN(t1)){
                t1 = 0;
            }
            if(isNaN(t2)){
                t2 = 0;
            }
            if(t1 != t2){
                res = (t1 > t2) ? 1 : -1;
                break;
            }
        }
        return res;
    };
}
if(!proto.count){
    proto.count = function(needle){
        return (this.match(new RegExp(needle.regexEscape(), 'g')) || []).length;
    };
}
if(!proto.decodeUri){
    proto.decodeUri = function(){
        return decodeURIComponent(this);
    };
}
if(!proto.encodeUri){
    proto.encodeUri = function(){
        return encodeURIComponent(this);
    };
}
if(!proto.format){
    proto.format = function(value_or_tokens){
        var self = this,
            args = Array.array(arguments),
            tokens = {},
            token;

        if(args.length == 1 && isObject(value_or_tokens)){
            tokens = value_or_tokens;
        }
        else{
            args.forEachReverse(function(item, i){
                tokens[i] = item;
            });
        }
        for(token in tokens){
            self = self.replace(new RegExp('\\{' + token + '\\}', 'g'), tokens[token]);
        }
        return self;
    };
}
if(!proto.html){
    proto.html = function(){
        return this.replace(
            /[\u00A0-\u9999<>\&]/gim,
            function(i) {
                return '&#'+i.charCodeAt(0)+';';
            }
        ).replaceAll(['\n', '\t'], ['<br />', '&nbsp;&nbsp;&nbsp;&nbsp;']);
    };
}
if(!proto.isEmpty){
    proto.isEmpty = function(){
        return this.trim() != '';
    };
}
if(!proto.pluralize){
    proto.pluralize = function(){
        var self = this,
            c = self.slice(-1),
            c2 = self.slice(-2),
            c3 = self.slice(-3);
        if(c == "s"){
            return self + "es";
        }
        if(c2 == "ey"){
            return self.slice(0, -2) + "ies";
        }
        if(c3 == "elf"){
            return self.slice(0, -3) + "elvs";
        }
        return self + "s";
    };
}
if(!proto.possessive){
    proto.possessive = function(){
        var self = this,
            c = self.slice(-1);
        if(c == "s"){
            return self + "'";
        }
        return self + "'s";
    };
}
if(!proto.trim){
    proto.trim = function(){
        return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    };
}
if(!proto.ltrim){
    proto.ltrim = function(){
        return this.replace(/^\s+/, '');
    };
}
if(!proto.rtrim){
    proto.rtrim = function(){
        return this.replace(/\s+$/, '');
    };
}
if(!proto.fulltrim){
    proto.fulltrim = function(){
        return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, '').replace(/\s+/g, ' ');
    };
}
if(!proto.clean){
    proto.clean = function(obj){
        return obj.replace(/\r/g, '');
    };
}
if(!proto.regexSpecialChars){
    proto.regexSpecialChars = new RegExp('[.*+?$|()\\[\\]{}\\\\]', 'g'); // .*+?$|()[]{}\
}
if(!proto.regexEscape){
    proto.regexEscape = function(){
        return this.replace(String.prototype.regexSpecialChars, '\\$&');
    };
}
if(!proto.replaceAll){
    proto.replaceAll = function(needle, replace){
        if(Array.isArray(needle)){
            var haystack = this, i, ln = needle.length;
            replace = needle.equalize(replace);
            for(i = 0; i < ln; i++){
                haystack = haystack.replace(new RegExp(needle[i].regexEscape(), 'g'), replace[i]);
            }
            return haystack;
        }
        else{
            return this.replace(new RegExp(needle.regexEscape(), 'g'), replace);
        }
    };
}
if(SVGAnimatedString){
    SVGAnimatedString.prototype.trim = function(){ return ""; }
}

OJ.extendClass(
    'OjArray', [OjActionable],
    {
        '_props_' : {
            'allow_duplicates' : true,
            'first' : null,
            'last' : null,
            'length' : null
        },

        // internal methods
        '_constructor' : function(items){
            var self = this;
            self._super(OjActionable, '_constructor', []);
            self._items = [];
            if(items){
                if(isObject(items)){
                    var ary = [],
                        key;
                    for(key in items){
                        ary.append(items[key]);
                    }
                    items = ary;
                }
                self._updateIndexProperties(items.length);
                self._items = items;
            }
        },
        '_addIndexProperty' : function(index){
            Object.defineProperty(this, index, {
                'configurable': true,
                'enumerable': true,
                'get': function(){ return this._getIndex.call(this, index); },
                'set' : function(newValue){ return this._setIndex.call(this, index, newValue); }
            });
        },
        '_callArrayFunc' : function(func, args){
            var items = this._items;
            return items[func].apply(items, args);
        },
        '_checkDuplicate' : function(item){
            if(!this.allow_duplicates && this.contains(item)){
                throw 'Duplicate value not allowed.';
            }
        },
        '_checkDuplicates' : function(items){
            var self = this;
            items.forEachReverse(
                function(item){
                    self._checkDuplicate(item);
                }
            );
        },
        '_dispatchAdd' : function(items, index){
            var col_evt = OjCollectionEvent;
            this.dispatchEvent(new col_evt(col_evt.ITEM_ADD, items, index));
        },
        '_getIndex' : function(index){
            return this._items[index];
        },
        '_processIndex' : function(index){
            return index >= 0 ? index : this.length + index;
        },
        '_removeIndexProperty' : function(index){
            delete this[index];
        },
        '_setIndex' : function(index, item){
            var self = this,
                col_evt = OjCollectionEvent,
                items = self._items,
                old_item = items[index];
            // check for change
            if(old_item == item){
                return
            }
            self._checkDuplicate(item)
            items[index] = item;
            self.dispatchEvent(new col_evt(col_evt.ITEM_REPLACE, [item], index, [old_item]));
            return item;
        },
        '_updateIndexProperties' : function(newLength){
            var ln = this.length,
                diff = newLength - ln;
            if(diff > 0){
                for(; diff--;){
                    this._addIndexProperty(ln + diff);
                }
            }
            else if(diff < 0){
                for(; diff++ < 0;){
                    this._removeIndexProperty(ln + diff);
                }
            }
        },

        // public methods
        'append' : function(){
            var self = this,
                args = Array.array(arguments),
                check = self._checkDuplicates(args),
                ln = self.length,
                index = self._updateIndexProperties(ln + args.length),
                rtrn = self._callArrayFunc('append', args);
            self._dispatchAdd(args, ln);
            return rtrn;
        },
        'clone' : function(){
            var self = this,
                obj = new self._static(self._items.clone());
            obj.allow_duplicates = self.allow_duplicates;
            return obj;
        },
        'contains' : function(){
            return this._callArrayFunc('contains', arguments);
        },
        'dispatchEvent' : function(evt){
            var col_evt = OjCollectionEvent,
                self = this;
            self._super(OjActionable, 'dispatchEvent', arguments);
            if(col_evt.isChangeEvent(evt)){
                self.dispatchEvent(new col_evt(col_evt.ITEM_CHANGE, evt.items, evt.index, evt.old_items));
            }
        },
        'equalize' : function(){
            return this._callArrayFunc('equalize', arguments);
        },
        'forEach' : function(){
            return this._callArrayFunc('forEach', arguments);
        },
        'forEachReverse' : function(){
            return this._callArrayFunc('forEachReverse', arguments);
        },
        'getAt' : function(index){
            return this[index];
        },
        'indexOf' : function(){
            return this._callArrayFunc('indexOf', arguments);
        },
        'insertAt' : function(){
            var self = this,
                args = Array.array(arguments),
                check = self._checkDuplicates(args),
                index = self._updateIndexProperties(self.length + args.length - 1),
                rtrn = self._callArrayFunc('insertAt', args);
            self._dispatchAdd(args.slice(0, -1), args.last);
            return rtrn;
        },
        'join' : function() {
            return this._callArrayFunc('join', arguments);
        },
        'move' : function(item, index){
            var self = this,
                check = self._checkDuplicate(item),
                col_evt = OjCollectionEvent,
                rtrn = this._callArrayFunc('move', arguments);
            self.dispatchEvent(new col_evt(col_evt.ITEM_MOVE, [item], index));
            return rtrn;
        },
        'prepend' : function(){
            var self = this,
                args = Array.array(arguments),
                check = self._checkDuplicates(args),
                index = self._updateIndexProperties(self.length + args.length),
                rtrn = self._callArrayFunc('prepend', args);
            self._dispatchAdd(args, 0);
            return rtrn;
        },
        'remove' : function(){
            var self = this,
                args = Array.array(arguments),
                index = self._updateIndexProperties(self.length - args.length),
                col_evt = OjCollectionEvent;
            // find the lowest index
            args.forEachReverse(function(item, i){
                i = self.indexOf(item);
                if(isUnset(index) || i < index){
                    index = i > -1 ? i : index;
                }
            });
            // process the request
            var rtrn = self._callArrayFunc('remove', args)
            // dispatch the event
            self.dispatchEvent(new col_evt(col_evt.ITEM_REMOVE, args, index));
            return rtrn;
        },
        'removeAll' : function(){
            var self = this,
                items = self._items,
                col_evt = OjCollectionEvent;
            self._items = [];
            self._updateIndexProperties(0);
            self.dispatchEvent(new col_evt(col_evt.ITEM_REMOVE, items, 0));
            return items;
        },
        'removeAt' : function(){
            var self = this,
                args = Array.array(arguments),
                index = self._updateIndexProperties(self.length - args.length),
                col_evt = OjCollectionEvent;
            // find the lowest index
            args.forEachReverse(function(item, i){
                if(isUnset(index) || i < index){
                    index = i;
                }
            });
            // process the request
            var rtrn = self._callArrayFunc('removeAt', args)
            // dispatch the event
            self.dispatchEvent(new col_evt(col_evt.ITEM_REMOVE, rtrn, index));
            return rtrn;
        },
        'removeFirst' : function(){
            var self = this,
                col_evt = OjCollectionEvent;
            self._updateIndexProperties(self.length - 1);
            var rtrn = self._callArrayFunc('removeFirst', arguments);
            self.dispatchEvent(new col_evt(col_evt.ITEM_REMOVE, [rtrn], 0));
            return rtrn;
        },
        'removeLast' : function(){
            var self = this;
            self._updateIndexProperties(self.length - 1);
            return self._callArrayFunc('removeLast', arguments);
        },
        'replace' : function(){
            // todo: add dispatch replace event
            return this._callArrayFunc('replace', arguments);
        },
        'replaceAll' : function(){
            // todo: add dispatch replace event
            return this._callArrayFunc('replaceAll', arguments);
        },
        'reverse' : function(){
            return this._callArrayFunc('reverse', arguments);
        },
        'setAt' : function(index, value){
            return this[index] = value;
        },
        'sort' : function(){
            var self = this,
                cls = self._static;
            return new cls(self._callArrayFunc('sort', arguments));
        },
        'unique' : function(){
            return this._callArrayFunc('unique', arguments);
        },

        // public properties
        '.first' : function(){
            return this._items.first;
        },
        '=first' : function(val){
            this._items.first = val;
        },
        '.last' : function(){
            return this._items.last;
        },
        '=last' : function(val){
            this._items.last = val;
        },
        '.length' : function(){
            return this._items.length;
        },
        '=length' : function(val){
            return this._items.length = val;
        }
    },
    {
        'array' : function(obj){
            if(isObjective(obj, OjArray)){
                return obj;
            }
            if(!isArray(obj)){
                obj = [obj];
            }
            return new OjArray(obj);
        }
    }
);


// Modify Built-In Array Class
Array.array = function(obj){
    if(isNull(obj)){
        return [];
    }
    else if(isArray(obj)){
        return obj;
    }
    else if((isObject(obj) || isFunction(obj)) && !isUndefined(obj.length)){
        return [].slice.call(obj, 0);
    }
    return [obj];
};
Array._isArray = Array.isArray;
Array.isArray = function(obj){
    return (Array._isArray ? Array._isArray(obj) : Object.prototype.toString.call(obj) === "[object Array]") ||
           (window["OjArray"] && isObjective(obj, OjArray));
};
if(!Array.slice){
    Array.slice = function(ary, start/*, end*/){
        var args = Array.array(arguments);
        ary = Array.array(ary);
        return ary.slice.apply(ary, args.slice(1));
    };
}

var proto = Array.prototype
if(!proto.append){
    proto.append = proto.push;
}
if(!proto.clone){
    proto.clone = function(){
        return this.slice(0);
    };
}
if(!proto.contains){
    proto.contains = function(obj){
        return this.indexOf(obj) != -1;
    };
}
if(!proto.equalize){
    proto.equalize = function(obj){
        var ln = this.length,
            ln2,
            v = null;
        if(!Array.isArray(obj)){
            v = obj;
            obj = [obj];
        }
        ln2 = obj.length;
        for(; ln2-- > ln;){
            obj.push(v);
        }
        return obj;
    };
}
if(!proto.first){
    Object.defineProperty(proto, 'first', {
        'configurable' : false,
        'enumerable' : false,
        'get' : function(){
            var self = this;
            return self.length ? self[0] : null;
        },
        'set' : function(newValue){
            var self = this;
            if(self.length){
                self[0] = val;
            }
            else{
                self.append(newValue);
            }
        }
    });
}
proto.oldForEach = proto.forEach;
proto.forEach = function(callback, context){
    var self = this,
        ln = self.length,
        i = 0;
    context = context || self;
    for(; i < ln; i++){
        if(callback.call(context, self[i], i, self) === false){
            break
        }
    }
    return i == ln
};
if(!proto.forEachReverse){
    proto.forEachReverse = function(callback, context){
        var self = this,
            ln = self.length;
        context = context || self;
        for(; ln--;){
            if(callback.call(context, self[ln], ln, self) === false){
                break;
            }
        }
        return ln == 0
    };
}
if(!proto.indexOf){
    proto.indexOf = function(needle, from){
        var self = this,
            ln = self.length,
            from = Number(from) || 0;
        from = (from < 0) ? Math.ceil(from) : Math.floor(from);
        if(from < 0){
            from += ln;
        }
        for(; from < ln; from++){
            if(from in self && self[from] === needle){
                return from;
            }
        }
        return -1;
    };
}
if(!proto.insertAt){
    proto.insertAt = function(/*item, item2... n, index*/){
        var args = Array.array(arguments),
            new_args = args.slice(0, -1), // get all the items to insert
            self = this;
        // add the insert start index and delete count
        new_args.splice(0, 0, args.last, 0);
        // call native splice
        return self.splice.apply(self, new_args);
    };
}
if(!proto.last){
    Object.defineProperty(proto, 'last', {
        'configurable' : false,
        'enumerable' : false,
        'get' : function(){
            var ln = this.length;
            return ln ? this[ln - 1] : null;
        },
        'set' : function(newValue){
            var ln = this.length;
            if(ln){
                this[ln - 1] = val;
            }
            else{
                this.append(newValue);
            }
        }
    });
}
if(!proto.move){
    proto.move = function(old_index, new_index){
        var ln = this.length;
        if(new_index >= ln){
            var k = new_index - ln;
            for(; (k--) + 1;){
                this.push(undefined);
            }
        }
        this.splice(new_index, 0, this.splice(old_index, 1)[0]);
        return this;
    };
}
if(!proto.prepend){
    proto.prepend = proto.unshift;
}
if(!proto.remove){
    proto.remove = function(val/*, ...*/){
        var self = this,
            needle, i,
            a = arguments,
            ln = a.length,
            removed = [];
        for(; ln-- && self.length;){
            needle = a[ln];
            for(; (i = self.indexOf(needle)) > -1;){
                removed.append(self.splice(i, 1));
            }
        }
        return removed;
    };
}
if(!proto.removeAll){
    proto.removeAll = function(){
        var removed = this.clone();
        this.length = 0;
        return removed;
    };
}
if(!proto.removeAt){
    proto.removeAt = function(index){
        var removed = [],
            args = arguments,
            ln = args.length;
        for(; ln--;){
            removed.append(this.splice(args[ln], 1));
        }
        return removed;
    }
}
if(!proto.removeFirst){
    proto.removeFirst = proto.shift;
}
if(!proto.removeLast){
    proto.removeLast = proto.pop;
}

proto.origReplace = proto.replace;
proto.replace = function(needle, replace){
    var result, i, ln;
    if(Array.isArray(needle)){
        result = this.clone();
        ln = needle.length;
        replace = needle.equalize(replace);
        for(i = 0; i < ln; i++){
            result = result.origReplace(needle[i], replace[i]);
        }
        return result;
    }
    else{
        return this.origReplace(needle, replace);
    }
};
if(!proto.replaceAll){
    proto.replaceAll = function(needle, replace, recursive){
        var result = [],
            i = 0,
            ln = this.length,
            j, ln2, hay;
        if(Array.isArray(needle)){
            ln2 = needle.length;
            replace = needle.equalize(replace);
            for(i; i < ln; i++){
                hay = this[i];
                for(j = 0; j < ln2; j++){
                    if(needle[j] == hay){
                        result.push(replace[j]);
                    }
                    else if(recursive && Array.isArray(hay)){
                        result.push(hay.replaceAll(needle[j], replace[j], true));
                    }
                    else{
                        result.push(hay);
                    }
                }
            }
        }
        else{
            for(i; i < ln; i++){
                hay = this[i];
                if(needle == hay){
                    result.push(replace);
                }
                else if(recursive && Array.isArray(hay)){
                    result.push(hay.replaceAll(needle, replace, true));
                }
                else{
                    result.push(hay);
                }
            }
        }
        return result;
    };
}
if(!proto.replaceAt){
    proto.replaceAt = function(item, index){
        return this.splice(index, 1, item);
    };
}
if(!proto.unique){
    proto.unique = function(){
        var ary = [],
            self = this,
            ln = self.length,
            item;
        for(; ln--;){
            item = self[ln];
            if(ary.indexOf(item) < 0){
                ary.unshift(item);
            }
        }
        return ary;
    };
}


/**
 * Query String Prototype Functions
 */
Array.prototype.toQueryString = function(/*prefix*/){
    var str = '', i, p, ln = this.length, prefix = arguments.length ? arguments[0] : null;
    for(i = 0; i < ln; i++){
        if(isFunction(this[i])){
            continue;
        }
        if(str != ''){
            str += '&';
        }
        p = prefix ? prefix + '[' + i + ']' : i + '';
        if(isObject(this[i])){
            str += this[i].toQueryString ? this[i].toQueryString(p) : Object.toQueryString(this[i], p);
        }
        else{
            str += p + '=' + encodeURI(this[i]);
        }
    }
    return str;
};
Object.toQueryString = function(obj, prefix){
    var key, str = '', p;
    for(key in obj){
        if(isFunction(obj[key]) || obj[key] == obj){
            continue;
        }
        if(str != ''){
            str += '&';
        }
        p = prefix ? prefix + '[' + encodeURI(key) + ']' : encodeURI(key);
        if(obj[key]){
            if(isFunction(obj[key].toQueryString)){
                str += obj[key].toQueryString(p);
            }
            else{
                str += Object.toQueryString(obj[key], p);
            }
        }
        else{
            str += p + '=';
        }
    }
    return str;
};
String.prototype.toQueryString = Number.prototype.toQueryString = Boolean.prototype.toQueryString = function(key){
    return encodeURI(key) + '=' + encodeURI(this.valueOf());
};
Date.prototype.toQueryString = function(key){
    return this.toISOString().toQueryString(key);
};
String.prototype.parseQueryString = function(){
    var str = this, obj = {}, vars, ln, parts, i, ln2, tmp;
    if(str[0] == '?'){
        str = str.substring(1);
    }
    if(str != ''){
        vars = str.split('&');
        ln = vars.length;
        for(; ln--;){
            parts = vars[ln].split('=');
            parts[0] = parts[0].replaceAll(']', '').split('[');
            ln2 = parts[0].length;
            if(ln2 > 1){
                if(!obj[parts[0][0]]){
                    obj[parts[0][0]] = {};
                }
                obj[parts[0][0]][parts[0][1]] = parts[1];
            }
            else{
                obj[parts[0][0]] = parts[1];
            }
        }
    }
    return obj;
};
window.toQueryString = function(obj){
    if(obj){
        if(obj.toQueryString){
            return obj.toQueryString();
        }
        else if(isObject(obj)){
            return Object.toQueryString(obj);
        }
    }
    return '';
};

OJ.extendClass(
    'OjEvent', [OjObject],
    {
        '_get_props_' : {
            'bubbles' : null,
            'cancelable' : null,
            'current_target' : null,
            'canceled' : false,
            'phase' : 0,
            'target' : null,
            'type' : null
        },

        '_constructor' : function(type/*, bubbles = false, cancelable = false*/){
            this._super(OjObject, '_constructor', []);
            this._processArguments(arguments, {
                '_type' : type,
                '_bubbles' : false,
                '_cancelable' : false
            });
        },
        'cancel' : function(){
            if(this._cancelable){
                this._canceled = true;
            }
        },
        'clone' : function(){
            var evt = this._super(OjObject, 'clone', arguments);
            evt._bubbles = this.bubbles;
            evt._cancelable = this.cancelable;
            evt._type = this.type;
            return evt;
        },
        'cloneWithChanges' : function(delta){
            var clone = this.clone(), key;
            for(key in delta){
                if(key != 'current_target' || key != 'phase' || key != 'target'){
                    clone['_' + key] = delta[key];
                }
            }
            return clone;
        }
    },
    {
        'ADDED' : 'onAdded',
        'OPEN' : 'onOpen',
        'CANCEL' : 'onCancel',
        'CHANGE' : 'onChange',
        'CLOSE' : 'onClose',
        'COMPLETE' : 'onComplete',
        'DESTROY' : 'onDestroy',
        'FAIL' : 'onFail',
        'HIDE' : 'onHide',
        'INIT' : 'onInit',
        'LOAD' : 'onLoad',
        'OK' : 'onOk',
        'READY' : 'onReady',
        'REMOVED' : 'onRemoved',
        'SHOW' : 'onShow',
        'SUBMIT' : 'onSubmit',
        'UNLOAD' : 'onUnload',
        'ADDED_TO_DISPLAY' : 'onAddToDisplay',
        'REMOVED_FROM_DISPLAY' : 'onRemovedFromDisplay'
    }
);

OJ.extendManager(
    'EventManager', 'OjEventManager', [OjObject],
    {
        '_events' : {},
        '_index' : {},

        '_constructor' : function(){
            this._super(OjObject, '_constructor', []);
            var ready,
                timer,
                onChange = function(e){
                    if(e && e.type == 'DOMContentLoaded'){
                        fireDOMReady();
                    }
                    else if(e && e.type == 'load'){
                        fireDOMReady();
                    }
                    else if(document.readyState){
                        if((/loaded|complete/).test(document.readyState)){
                            fireDOMReady();
                        }
                        else if(!!document.documentElement.doScroll){
                            try{
                                ready || document.documentElement.doScroll('left');
                            }
                            catch(e){
                                return;
                            }
                            fireDOMReady();
                        }
                    }
                },
                fireDOMReady = function(){
                    if(!ready){
                        ready = true;
                        if(document.removeEventListener){
                            document.removeEventListener('DOMContentLoaded', onChange, false);
                        }
                        clearInterval(timer);
                        document.onreadystatechange = window.onload = timer = null;
                        window.onDomReady();
                    }
                };
            // add the listener to the document
            if(document.addEventListener){
                document.addEventListener('DOMContentLoaded', onChange, false);
            }
            document.onreadystatechange = onChange;
            timer = setInterval(onChange, 5);
            window.onload = onChange;
            return this;
        },

        '_dispatchEvents' : function(evt, type, target){
            if(evt.canceled){
                return;
            }
            if(target == window){
                target = OJ;
            }
            var events = this._events,
                target_id = target.oj_id,
                listener, listeners, key;
            evt._current_target = target;
            if(events[type] && events[type][target_id]){
                listeners = events[type][target_id];
                for(key in listeners){
                    listener = listeners[key];
                    if(listener && isFunction(listener.callback)){
                        listener.callback.call(listener.context, evt);
                    }
                }
            }
        },
        '_getIndex' : function(target_id, params){
            var index = this._index;
            if(!index[target_id]){
                index[target_id] = {};
            }
            index[target_id][params[0] + ':' + params[1] + ':' + params[3]] = params;
        },

        'addEventListener' : function(target, type, context, callback){
            // make sure the callback is a function
            callback = isString(callback) ? context[callback] : callback;
            // get the unique ids needed to qualify listeners
            var events = this._events,
                target_id = target.oj_id,
                context_id = context == window ? 'window' : context.oj_id,
                guid = context_id + ':' + (callback.guid ? callback.guid : callback.guid = OJ.guid());
            // make sure we have a holder for this type of event
            if(!events[type]){
                events[type] = {};
            }
            // make sure we have a holder for this target on this type of event
            if(!events[type][target_id]){
                events[type][target.oj_id] = {};
            }
            // only make changes if we haven't already recorded this listener
            if(!events[type][target_id][guid]){
                events[type][target_id][guid] = {
                    'callback' : callback,
                    'context' : context
                };
                // track the listener by the target for cleanup purposes
                this._getIndex(target_id, [target_id, type, context_id, guid]);
                this._getIndex(context_id, [target_id, type, context_id, guid]);
            }
        },
        'dispatchEvent' : function(target, evt){
            var type = evt.type,
                parent;
            evt._target = evt._target ? evt._target : target;
            evt._current_target = target;
            this._dispatchEvents(evt, type, target);
            if(evt._bubbles){
                parent = target;
                while(parent && (parent = parent.parent)){
                    this._dispatchEvents(evt, type, parent);
                }
                if(parent && parent != OJ){
                    this._dispatchEvents(evt, type, OJ);
                }
            }
        },
        'hasEventListener' : function(target, type){
            var events = this._events[type];
            return events && events[target.oj_id];
        },
        'hasEventListeners' : function(type){
            return this._events[type] ? true : false;
        },
        '_removeEventListener' : function(target_id, type, context_id, guid){
            var events = this._events,
                index = this._index,
                i = target_id + ':' + type + ':' + guid;
            // cleanup the events
            if(events[type] && events[type][target_id] && events[type][target_id][guid]){
                delete events[type][target_id][guid];
                if(isEmptyObject(events[type][target_id])){
                    delete events[type][target_id];
                    if(isEmptyObject(events[type])){
                        delete events[type];
                    }
                }
            }
            // cleanup the index
            if(index[target_id] && index[target_id][i]){
                delete index[target_id][i];
                if(isEmptyObject(index[target_id])){
                    delete index[target_id];
                }
            }
            if(index[context_id] && index[context_id][i]){
                delete index[context_id][index];
                if(isEmptyObject(index[context_id])){
                    delete index[context_id];
                }
            }
        },
        'removeAllListeners' : function(target){
            var target_id = target.oj_id,
                events, evt;
            if(events = this._index[target_id]){
                for(evt in events){
                    this._removeEventListener.apply(this, events[evt]);
                }
                delete this._index[target_id];
            }
        },
        'removeEventListener' : function(target, type, context, callback){
            var events = this._events,
                target_id = target.oj_id,
                context_id = context.oj_id,
                guid;
            if(events[type]){
                if(events[type][target_id]){
                    if(callback = isString(callback) ? context[callback] : callback){
                        guid = context_id + ':' + callback.guid;
                        if(events[type][target_id][guid]){
                            this._removeEventListener(target_id, type, context_id, guid);
                        }
                    }
                }
            }
        }
    }
);


OJ.extendClass(
    'OjTextEvent', [OjEvent],
    {
        '_get_props_' : {
            'text' : ''
        },

        '_constructor' : function(type/*, text = "", bubbles = false, cancelable = false*/){
            var cancelable, bubbles = cancelable = false, ln = arguments.length;
            if(ln > 1){
                this._text = arguments[1];
                if(ln > 2){
                    bubbles = arguments[2];
                    if(ln > 3){
                        cancelable = arguments[3];
                    }
                }
            }
            this._super(OjEvent, '_constructor', [type, bubbles, cancelable]);
        }
    },
    {
        'TEXT' : 'onText'
    }
);

OJ.extendClass(
    'OjErrorEvent', [OjTextEvent],
    {
        '_get_props_' : {
            'code'    : 0
        },

        '_constructor' : function(type/*, text = null, code = 0, bubbles = false, cancelable = false*/){
            var args = Array.array(arguments),
                ln = args.length;
            if(ln > 2){
                this._code = args[2];
                args.removeAt(2);
            }
            this._super(OjTextEvent, '_constructor', args);
        }
    },
    {
        'ERROR' : 'onError'
    }
);

OJ.extendClass(
    "OjUrl", [OjObject],
    {
        "_get_props_" : {
            "hashbang" : null
        },
        "_props_" : {
            "protocol"    : null,
            "host"        : null,
            "port"        : null,
            "path"        : null,
            "query"       : null,
            "query_params" : null,
            "hash"        : null,
            "source"      : null
        },

        "_constructor" : function(url){
            var self = this;
            self._super(OjObject, "_constructor", []);
            self._dirty = {};
            self.source = url || "";
        },

        "_updateQuery" : function(){
            var self = this;
            if(self._dirty.query){
                self._query = Object.toQueryString(self._query_params)
                delete self._dirty.query;
            }
            return self._query;
        },

        "clone" : function() {
            return new OjUrl(this.toString());
        },
        "getQueryParam" : function(key){
            return this._query_params[key];
        },
        "setQueryParam" : function(key, value){
            var self = this,
                params = self._query_params;
            if(isSet(value)){
                params[key] = value;
            }
            else{
                delete params[key];
            }
            self._dirty.query = true;
        },
        "toString" : function() {
            var self = this,
                str = String.string,
                hash = self.hash,
                port = self.port,
                protocol = self.protocol,
                query = self._updateQuery();
            return (protocol ? protocol + ":" : "") + "//" + str(self.host) + (port ? ":" + port : "") +
                   str(self.path) + (isEmpty(query) ? "" : "?" + query) + (isEmpty(hash) ? "" : "#" + hash);
        },

        "=protocol" : function(protocol){
            this._protocol = (protocol || "http").replaceAll([":", "/"], "");
        },
        "=path" : function(path){
            if(path && path.charAt(0) != "/"){
                path = "/" + path;
            }
            this._path = path;
        },
        ".query" : function(){
            return this._updateQuery();
        },
        "=query" : function(query){
            if(isString(query) && query.charAt(0) == "?"){
                query = query.substr(1);
            }
            var self = this;
            if(self._query == query && !self._dirty.query){
                return
            }
            self._query_params = (self._query = query || "").parseQueryString();
        },
        ".query_params" : function(){
            return Object.clone(this._query_params);
        },
        "=query_params" : function(params){
            this._query_params = params ? params.clone() : {};
            this._dirty.query = true;
        },
        ".hash" : function(){
            return this._hash;
        },
        "=hash" : function(hash){
            if(isString(hash) && hash.charAt(0) == "#"){
                hash = hash.substr(1);
            }
            this._hash = hash;
        },
        ".hashbang" : function(){
            var hash = this.hash;
            return hash && hash[0] == "!" ? hash.substr(1) : null;
        },
        ".source" : function(){
            return this.toString();
        },
        "=source" : function(val){
            var self = this,
                a = document.createElement("a");
            if(isObjective(val)){
                val = val.toString();
            }
            // create an anchor and let the dom do the url parsing
            a.href = val;
            // get the parsed url info from the a element
            self.protocol = a.protocol;
            self.host = a.hostname;
            self.port = a.port;
            self.path = a.pathname;
            self.query = a.search;
            self.hash = a.hash;
            self._dirty = {};
        }
    },
    {
        "url" : function(obj){
            if(obj){
                if(isString(obj)){
                    return new OjUrl(obj)
                }
                if(isObjective(obj, OjUrl)){
                    return obj;
                }
                return new OjUrl();
            }
            return null;
        }
    }
);

OJ.extendClass(
    'OjUrlRequest', [OjUrl],
    {
        '_props_' : {
            'content_type' : null,
            'data'        : null,
            'headers'     : null,
            'method'      : 'get'
        },
        '_ignores_cache' : false,  '_is_multipart' : false,

        '_constructor' : function(){
            var self = this,
                u = undefined;
            self._super(OjUrl, '_constructor', []);
            self._headers = {};
            self._processArguments(arguments, {
                'source': u,
                'data' : u,
                'content_type' : u,
                'method' : u
            });
        },

        '_search_for_files' : function(obj){
            var self = this,
                i;
            if(isObject(obj)){
                // add check for file object
                if(obj instanceof File){
                    self._is_multipart = true;
                }
                else{
                    for(i in obj){
                        if(self._search_for_files(obj[i])){
                            break;
                        }
                    }
                }
            }
            else if(isArray(obj)){
                for(i = obj.length; i--;){
                    if(self._search_for_files(obj[i])){
                        break;
                    }
                }
            }
            return this._is_multipart;
        },

        'ignoresCache' : function(/*val*/){
            if(arguments.length){
                this._ignores_cache = arguments[0];
            }
            return this._ignores_cache && !this._headers['cache-control'];
        },
        'isDelete' : function(){
            return this._method == OjUrlRequest.DELETE;
        },
        'isGet' : function(){
            return this._method == OjUrlRequest.GET;
        },
        'isHead' : function(){
            return this._method == OjUrlRequest.HEAD;
        },
        'isMultiPart' : function(){
            return this._is_multipart || this.content_type.indexOf(OjUrlRequest.MULTIPART) > -1;
        },
        'isOptions' : function(){
            return this._method == OjUrlRequest.OPTIONS;
        },
        'isPost' : function(){
            return this._method == OjUrlRequest.POST;
        },
        'isPut' : function(){
            return this._method == OjUrlRequest.PUT;
        },
        'isSafe' : function(){
            return this.isGet() || this.isHead() || this.isOptions();
        },
        'isUnsafe' : function(){
            return !this.isSafe();
        },

        'getHeader' : function(key){
            return this._headers[key];
        },
        'setHeader' : function(key, value){
            if(key.toLowerCase() == 'content-type'){
                this.content_type = value;
            }
            else{
                this._headers[key] = value;
            }
        },
        'unsetHeader' : function(key){
            if(this._headers){
                delete this._headers[key];
            }
        },

        '.content_type' : function(){
            return this._headers['Content-Type'] ? this._headers['Content-Type'] : OjUrlRequest.TEXT;
        },
        '=content_type' : function(val){
            if(this._is_multipart || val == OjUrlRequest.MULTIPART){
                val = OjUrlRequest.MULTIPART;
                // reset the method if we are multipart, because only post and put are now valid
                this.setMethod(this.method);
            }
            this._headers['Content-Type'] = val;
        },
        '.headers' : function(){
            return Object.clone(this._headers);
        },
        '=headers' : function(val){
            this._headers = {};
            if(val){
                var key;
                for(key in val){
                    this.setHeader(key, val[key]);
                }
            }
        },
        '=data' : function(val){
            this._data = val;
            if(!this._headers['Content-Type']){
                this.content_type = OjUrlRequest.QUERY_STRING;
            }
            this._is_multipart = false;
            // search for files
            if(val && this._search_for_files(val)){
                // reset the content type, because only multipart content type is valid now
                // this will in turn update the method
                this.content_type = this.content_type;
            }
        },
        '=method' : function(val){
            if(
                this.isMultiPart() && !(val == OjUrlRequest.POST || val == OjUrlRequest.PUT)
            ){
                val = OjUrlRequest.POST;
            }
            this._method = val;
        }
    },
    {
        'urlRequest' : function(obj){
            if(isString(obj)){
                return new OjUrlRequest(obj)
            }
            if(isObject(obj) && obj.is('OjUrlRequest')){
                return obj;
            }
            return new OjUrlRequest();
        },

        'DELETE'  : 'delete',
        'GET'     : 'get',
        'HEAD'    : 'head',
        'OPTIONS' : 'options',
        'POST'    : 'post',
        'PUT'     : 'put',
        'CSS'          : 'text/css',
        'QUERY_STRING' : 'application/x-www-form-urlencoded',
        'HTML'         : 'text/html',
        'JS'           : 'text/javascript',
        'JSON'         : 'application/json',
        'MULTIPART'    : 'multipart/form-data',
        'TEXT'         : 'text/plain',
        'XML'          : 'text/xml'
    }
);



OJ.extendClass(
    'OjXml', [OjObject],
    {
        '_props_' : {
            'xml'  : null
        },

        '_constructor' : function(xml){
            this._super(OjObject, '_constructor', []);
            this.xml = xml;
        },

        'attr' : function(attr /*, val*/){
            var args = arguments;
            if(args.length > 1){
                this.xml.setAttribute(attr, args[1]);
                return val;
            }
            return this.xml.getAttribute(attr);
        },
        'query' : function(xpath /*, limit=0*/){
            var args = arguments,
                i = 0, ln, xresult,
                limit = args.length > 1 ? args[1] : 0,
                result, results = [];
            // ie implementation
            if(!window.DOMParser){
                results = this._xml.selectNodes(xpath);
                ln = results.length;
                for(; i < ln && (!limit || i < limit); i++){
                    results[i] = new OjXml(results[i]);
                }
                return limit == 1 ? (ln ? results[0] : null) : results.slice(0, limit);
            }
            // all other browser implementations
            xresult = (this._xml.ownerDocument ? this._xml.ownerDocument : this._xml).evaluate('.' + xpath, this._xml, null, XPathResult.ANY_TYPE, null);
            if(
                xresult.resultType == XPathResult.ORDERED_NODE_ITERATOR_TYPE ||
                xresult.resultType == XPathResult.UNORDERED_NODE_ITERATOR_TYPE
            ){
                for(; (result = xresult.iterateNext()) && (!limit || i++ < limit);){
                    results.append(new OjXml(result));
                }
                return limit == 1 ? (results.length ? results[0] : null) : results;
            }
            if(xresult.resultType == XPathResult.STRING_TYPE){
                return xresult.stringValue;
            }
            if(xresult.resultType == XPathResult.NUMBER_TYPE){
                return xresult.numberValue;
            }
            if(xresult.resultType == XPathResult.BOOLEAN_TYPE){
                return xresult.booleanValue;
            }
            return null;
        },
        'value' : function(/*xpath, value*/){
            var args = arguments,
                result;
            if(args.length){
                result = this.query('/' + args[0], 1);
                return result ? result.value() : null;
            }
            return this._xml.textContent;
        },

        '=xml' : function(xml){
            this._xml = toXml(xml);
        }
    },
    {
        'xml' : function(xml){
            if(isXml(xml)){
                return new OjXml(xml);
            }
            if(isString(xml)){
                return new OjXml(toXml(xml));
            }
            return isObjective(xml) && xml.is('OjXml') ? xml : null;
        }
    }
);


OJ.extendClass(
    'OjHttpStatusEvent', [OjEvent],
    {
        '_get_props_' : {
            'status' : null
        },

        '_constructor' : function(type/*, status = 0, bubbles = false, cancelable = false*/){
            var bubbles = false,
                cancelable = false,
                args = arguments,
                ln = args.length;
            if(ln > 1){
                this._status = args[1];
                if(ln > 2){
                    bubbles = args[2];
                    if(ln > 3){
                        cancelable = args[3];
                    }
                }
            }
            this._super(OjEvent, '_constructor', [type, bubbles, cancelable]);
        }
    },
    {
        'HTTP_STATUS' : 'onHttpStatus'
    }
);


OJ.extendClass(
    'OjIoErrorEvent', [OjErrorEvent],
    {},
    {
        'IO_ERROR'   : 'onIoError',
        'IO_TIMEOUT' : 'onIoTimeout'
    }
);


OJ.extendClass(
    'OjProgressEvent', [OjEvent],
    {
        '_get_props_' : {
            'progress' : 0
        },

        '_constructor' : function(type/*, progress = 0, bubbles = false, cancelable = false*/){
            var cancelable, bubbles = cancelable = false, ln = arguments.length;
            if(ln > 1){
                this._progress = arguments[1];
                if(ln > 2){
                    bubbles = arguments[2];
                    if(ln > 3){
                        cancelable = arguments[3];
                    }
                }
            }
            this._super(OjEvent, '_constructor', [type, bubbles, cancelable]);
        }
    },
    {
        'PROGRESS' : 'onProgress'
    }
);

OJ.extendClass(
    "OjCacheObject", [OjObject],
    {
        "_props_" : {
            "created"    : null,
            "data"       : null,
            "expiration" : null
        },

        "_constructor" : function(/*data, expiration*/){
            this._super(OjObject, "_constructor", []);
            this.created = new Date();
            var args = arguments,
                ln = args.length;
            if(ln){
                this.data = args[0];
                if(ln > 1){
                    this.expiration = args[1];
                }
            }
        },
        "exportData" : function(mode){
            var self = this,
                obj = self._super(OjObject, "exportData", arguments);
            obj.created    = self.created;
            obj.data       = self.data ? OjObject.exportData(self.data, mode) : null;
            obj.expiration = self.expiration;
            return obj;
        },
        "importData" : function(obj, mode){
            var self = this;
            if(!obj){
                obj = {
                    "created"    : null,
                    "data"       : null,
                    "expiration" : null
                }
            }
            self.created = obj.created;
            self.data = OjObject.importData(obj.data, mode);
            self.expiration = obj.expiration;
        },

        "=expiration" : function(exp/*date|milliseconds from now*/){
            if(this._expiration == exp){
                return;
            }
            if(!isDate(exp)){
                this._expiration = new Date();
                this._expiration.setSeconds(this._expiration.getSeconds() + exp);
            }
            else{
                this._expiration = exp;
            }
        }
    }
);

OJ.extendClass(
    'OjCachePolicy', [OjObject],
    {
        '_get_props_' : {
            'action'     : 1,
            'lifespan'   : null,
            'url'        : null
        },

        '_constructor' : function(url/*, action, lifespan*/){
            this._super(OjObject, '_constructor', arguments);
            var args = arguments,
                ln = args.length;
            this._url = url;
            if(ln > 1){
                this._action = args[1];
                if(ln > 2){
                    this._lifespan = args[2];
                }
            }
        }
    },
    {
        // actions
        'ALWAYS'  : 1,
        'NEVER'   : 0,
        'OFFLINE' : 2
    }
);


OJ.extendManager(
    'CacheManager', 'OjCacheManager', [OjActionable],
    {
        // lifespans
        'MINUTE'  : 60,
        'HOUR'    : 3600,
        'DAY'     : 86400,
        'WEEK'    : 604800,
        'MONTH'   : 2419200,
        'YEAR'    : 29030400,
        'FOREVER' : 0,

        '_cache_size' : 0,  '_localStorage' : null,  '_policies' : null,
        '_getCached' : null,  '_setCached' : null,  '_unsetCached' : null,

        '_constructor' : function(){
            this._super(OjActionable, '_constructor', []);
            // check to see if local storage is supported
            try{
                this._localStorage = 'localStorage' in window && !isNull(window['localStorage']) ? window.localStorage : null;
            }
            catch(exception){
                // we don't need to do anything here since this was just to check for local storage support
            }
            // determine which set of functions to use based on the systems capabilities
            if(this._localStorage){
                this.getData   = this.getLocalData;
                this.setData   = this.setLocalData;
                this.unsetData = this.unsetLocalData;
            }
            else{
                this.getData   = this.getCookie;
                this.setData   = this.setCookie;
                this.unsetData = this.unsetCookie;
            }
            // setup vars
            this._policies = {};
        },

        // Caching Method Functions
        '_getCookie' : function(key){
            var cookies = ';' + document.cookie;
            var index = cookies.indexOf(';' + key + '=');
            if(index == -1 || isEmpty(key)){
                return undefined;
            }
            var index2 = cookies.indexOf(';', index + 1);
            if(index2 == -1){
                index2 = theCookie.length;
            }
            return this._getData(decodeURIComponent(cookies.substring(index + key.length + 2, index2)));
        },
        '_getData' : function(raw_data){
            var data;
            if(!raw_data || !(data = raw_data.parseJson())){
                return null;
            }
            if(isObject(data)){
                var type = data[OjObject.TYPE_KEY];
                if(
                    isUndefined(type) ||
                        (!isNull(type) && type != 'undefined' && type != 'boolean' && type != 'number' && type != 'string')
                ){
                    return OjObject.importData(data, OjObject.CACHE);
                }
                if(!type){
                    return null;
                }
                if(type == 'undefined'){
                    return undefined;
                }
                return data['value'];
            }
            return data;
        },
        '_getLocalData' : function(key){
            return this._getData(this._localStorage.getItem(key));
        },
        '_isDataExpired' : function(data){
            var exp;
            // if this is a cache object and then make sure it hasn't expired
            if(
                isObjective(data) && data.is(OjCacheObject) &&
                (exp = data.expiration) && exp < new Date()
            ){
                return true;
            }
            return false;
        },
        '_processDefault' : function(args){
            return args.length > 1 ? args[1] : null;
        },
        '_setCookie' : function(key, data){
            var expires = new Date();
            var lifespan = arguments.length > 2 ? arguments[2] : this.FOREVER;
            if(isNull(lifespan) || lifespan == 0){
                lifespan = this.YEAR; // 1 year = forever
            }
            expires.setTime((new Date()).getTime() + lifespan);
            document.cookie = key + '=' + encodeURIComponent(this._setData(data)) + ';expires=' + expires.toGMTString();
        },
        '_setData' : function(data){
            if(isObject(data)){
                data = OjObject.exportData(data, OjObject.CACHE);
            }
            else{
                data = {
                    'value' : data
                };
                data[OjObject.TYPE_KEY] = typeof data
            }
            return toJson(data);
        },
        '_setLocalData' : function(key, data){
            this._localStorage[key] = this._setData(data);
        },

        // UrlRequest Caching Functions
        'getCacheUrlRequestData' : function(url){
            if(isEmpty(url = url.toString())){
                return null;
            }
            return this.getData(url);
        },
        'getCacheUrlRequestPolicy' : function(url){
            if(isEmpty(url = url.toString())){
                return null;
            }
            var key;
            for(key in this._policies){
                if(url.match(key)){
                    return this._policies[key];
                }
            }
            return null;
        },
        'setCacheUrlRequestData' : function(url, data/*, policy*/){
            if(isEmpty(url = url.toString())){
                return null;
            }
            var policy = arguments.length > 2 ? arguments[2] : this.getCacheUrlRequestPolicy(url);
            CacheManager.setData(url, data, policy ? policy.lifespan : null);
        },
        'setCacheUrlRequestPolicy' : function(policy){
            this._policies[policy.url.replace(/\*/g, '[^ ]*')] = policy;
        },
        'unsetCacheUrlRequestPolicy' : function(policy/*|url*/){
            var url;
            if(isObjective(policy) && policy.is('OjCachePolicy')){
                url = policy.url.toString();
            }
            else{
                url = policy.toString();
            }
            try{
                delete this._policies[url.replace(/\*/g, '[^ ]*')];
            }
            catch(e){}
        },
        'unsetCacheUrlRequestData' : function(url){
            CacheManager.unsetData(url);
        },

        // Regular Data Caching Functions
        'getData' : function(key/*, default*/){
            throw new Error('No getData() defined.');
            return;
        },
        'setData' : function(key, value/*, lifespan*/){
            throw new Error('No setData() defined.');
            return;
            this._setCachedData(key, this._setData.apply(this, [].slice.call(arguments, 1)));
        },
        'unsetData' : function(key){
            throw new Error('No unsetData() defined.');
        },

        // Cookie Caching Functions
        'getCookie' : function(key/*, default*/){
            var data = this._getCookie(key);
            return data ? data.data : this._processDefault(arguments);
        },
        'setCookie' : function(key, value/*, lifespan*/){
            var ln = arguments.length;
            this._setCookie(key, new OjCacheObject(value, ln > 2 ? arguments[2] : null));
        },
        'unsetCookie' : function(key){
            document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        },

        // LocalData Caching Functions
        'getLocalData' : function(key/*, default*/){
            var data = this._getLocalData(key);
            if(this._isDataExpired(data)){
                this.unsetLocalData(key);
                return null;
            }
            return data ? data.data : this._processDefault(arguments);
        },
        'setLocalData' : function(key, value/*, lifespan*/){
            var args = arguments,
                ln = args.length;
            this._setLocalData(key, new OjCacheObject(value, ln > 2 ? args[2] : null));
        },
        'unsetLocalData' : function(key){
            delete this._localStorage[key];
        }
    }
);

OJ.extendClass(
    "OjUrlLoader", [OjActionable],
    {
        "_props_" : {
            'async'       : true,
            'data'        : null,
            'callback'    : null,
            'content_type' : OjUrlRequest.QUERY_STRING,
            'request'     : null,
            'timeout'     : 30000
        },
        "_get_props_" : {
            "policy" : null,
            "response_headers" : null,
            "status_cide" : null
        },
        //"_error_thrown" : false,
        //
        //"_url" : null,  "_xhr" : null,

        "_constructor" : function(/*request, async,*/){
            this._super(OjActionable, "_constructor", []);
            this._processArguments(arguments, {
                "request": undefined,
                "async": undefined
            });
        },
        "_destructor" : function(){
            var self = this;
            if(self._xhr){
                self._cleanupXhr();
            }
            self._unset("_request");
            return self._super(OjActionable, "_destructor", arguments);
        },

        '_calc_form_namespace' : function(ns, key){
            return isEmpty(ns) ? key : ns + '[' + key + ']';
        },
        "_cleanupXhr" : function(){
            var self = this,
                xhr = self._xhr;
            xhr.onprogress = xhr.onloadend = xhr.ontimeout = null;
            self._unset("_xhr");
        },
        '_load' : function(){
            var data,
                method = this._request.method;
            this._error_thrown = false;
            this._url = this._request.clone();
            if(method == OjUrlRequest.GET && (data = this._request.data)){
                var key;
                for(key in data){
                    this._url.setQueryParam(key, data[key]);
                }
            }
            // this._request.source = this._url;
            // check to see if we have this cached
            if(!this._request.ignoresCache()){
                var url = this._url.toString();
                this._policy = CacheManager.getCacheUrlRequestPolicy(url);
                if(
                    this._policy && this._policy.action == OjCachePolicy.ALWAYS &&
                    (this._data = CacheManager.getCacheUrlRequestData(url, this._policy))
                ){
                    this.dispatchEvent(new OjEvent(OjEvent.COMPLETE));
                    return;
                }
            }
            // if not cached or ignored send the request as usual
            this._xhr = new window.XMLHttpRequest();
            this._xhrOpen();
            this._xhrFormat();
            this._xhrEvents();
            this._xhrSend();
        },

        '_process_data' : function(data){
            return data;
        },
        '_process_form_data' : function(form, data, ns){
            if(isArray(data) || data instanceof FileList){
                for(var ln = data.length; ln--;){
                    this._process_form_data(form, data[ln], this._calc_form_namespace(ns, ln));
                }
            }
            else if(!(data instanceof File) && isObject(data)){
                var key;
                for(key in data){
                    this._process_form_data(form, data[key], this._calc_form_namespace(ns, key));
                }
            }
            else{
                form.append(ns, data);
            }
            return form;
        },
        '_process_json_data' : function(data){
            return toJson(data);
        },
        '_process_multipart_data' : function(data){
            if(data instanceof FormData){
                return data;
            }
            return this._process_form_data(new FormData(), data);
        },
        '_process_query_data' : function(data){
            return toQueryString(data);
        },
        '_process_xml_data' : function(data){
            return toXml(data);
        },

        '_xhrEvents' : function(){
            var self = this,
                xhr = self._xhr;
            self.dispatchEvent(new OjEvent(OjEvent.OPEN));
            xhr.onloadend = function(){
                var status = this.status;
                self._status_code = status;
                self._static.dequeueLoader(self);
                if(status > 199 && status < 400){
                    // detect the content type from the response
                    self._content_type = xhr.getResponseHeader("Content-Type");
                    self._onLoad();
                }
                else{
                    self._onError();
                }
            };
            xhr.onprogress = function(){
                self.dispatchEvent(new OjProgressEvent(OjProgressEvent.PROGRESS));
            };
            //xhr.ontimeout = function(){
            //    self.dispatchEvent(new OjIoErrorEvent(OjIoErrorEvent.IO_TIMEOUT));
            //    self.dispatchEvent(new OjEvent(OjEvent.FAIL));
            //};
        },
        '_xhrFormat' : function(){
            // set the format
            var key, headers = this._request.headers;
            if(headers){
                for(key in headers){
                    // ignore content-type setting when safe since no data is sent
                    if(key.toLowerCase() == 'content-type' && (this._request.isSafe() || this._request.isMultiPart())){
                        continue;
                    }
                    this._xhr.setRequestHeader(key, headers[key]);
                }
            }
            // set the caching
            if(this._policy){
                if(this._policy.action == OjCachePolicy.ALWAYS){
                    var lifespan = this._policy.lifespan;
                    if(!lifespan){
                        lifespan = CacheManager.YEAR;
                    }
                    this._xhr.setRequestHeader('cache-control', 'max-age=' + lifespan);
                }
                else{
                    this._xhr.setRequestHeader('cache-control', 'no-cache');
                }
            }
        },
        '_xhrOpen' : function(){
            this._xhr.open(this._request.method, this._url, this._async);
            if(this._async){
                this._xhr.timeout = this._timeout;
            }
            else{
                //todo: look into adding sync timeout capability if at all possible
            }
        },
        '_xhrSend' : function(){
            var data;
            if(this._request.method != OjUrlRequest.GET){
                if(data = this._request.data){
                    var type = this._request.content_type;
                    if(type == OjUrlRequest.JSON){
                        data = this._process_json_data(data);
                    }
                    else if(type == OjUrlRequest.XML){
                        data = this._process_xml_data(data);
                    }
                    else if(type == OjUrlRequest.QUERY_STRING){
                        data = this._process_query_data(data);
                    }
                    else if(type == OjUrlRequest.MULTIPART){
                        data = this._process_multipart_data(data);
                    }
                    else{
                        data = this._process_data(data);
                    }
                }
            }
            this._xhr.send(data)
        },

        '_onError' : function(){
            var self = this,
                callback = self._callback,
                xhr = self._xhr;
            if(!xhr || self._error_thrown){
                return;
            }
            // clear the timeout timer
            OJ.destroy(self._timer);
            var error = new OjIoErrorEvent(OjIoErrorEvent.IO_ERROR, xhr.statusText, xhr.status);
            self.dispatchEvent(error);
            self.dispatchEvent(new OjEvent(OjEvent.FAIL));
            if(callback){
                callback(null, error);
            }
            self._error_thrown = true;
        },
        '_onLoad' : function(){
            var self = this,
                ct = self._content_type,
                xhr = self._xhr;
            if(!xhr){
                return;
            }
            // clear the timeout timer
            OJ.destroy(self._timer);
            if(ct){
                self._content_type = ct = ct.toLowerCase();
            }
            else{
                self._content_type = ct = OjUrlRequest.TEXT;
            }
            var data = xhr.response;
            if(data && isString(data)){
                if(ct.contains("/json")){
                    data = data.parseJson();
                }
                else if(ct.contains("/xml") || ct.contains("/html")){
                    data = OjXml.xml(data);
                }
                else if(ct == OjUrlRequest.QUERY_STRING){
                    data = data.parseQueryString();
                }
            }
            self.data = data;
            self.dispatchEvent(new OjEvent(OjEvent.COMPLETE));
            if(self._callback){
                self._callback(self.data, null);
            }
        },

        'cancel' : function(){
            if(this._xhr){
                this._xhr.abort();
                this._xhr = null;
            }
        },
        'load' : function(callback){
            var self = this;
            if(callback){
                self.callback = callback;
            }
            self._static.queueLoader(self);
            return self._data;
        },

        "=data" : function(data){
            var self = this,
                policy = self.policy;
            self._data = data;
            if(policy && policy.action != OjCachePolicy.NEVER){
                CacheManager.setCacheUrlRequestData(self.request, data, policy);
            }
        },
        '.response_headers' : function(){
            var xhr = this._xhr;
            return xhr && xhr.getAllResponseHeaders ? xhr.getAllResponseHeaders() : {};
        },
        'getResponseHeader' : function(header){
            return this._xhr.getResponseHeader(header);
        }
    },
    {
        '_HOST_REQUEST_COUNT' : {},
        '_HOST_REQUEST_MAX' : 5,
        '_QUEUE' : [],

        '_loadLoader' : function(ldr){
            var self = this,
                counts = self._HOST_REQUEST_COUNT,
                queue = self._QUEUE,
                host = ldr.request.host;
            // update the host request count
            if(counts[host]){
                counts[host]++;
            }
            else{
                counts[host] = 1;
            }
            // try to remove req from queue
            queue.remove(ldr);
            // load it up
            ldr._load();
        },
        'dequeueLoader' : function(ldr){
            var self = this,
                counts = self._HOST_REQUEST_COUNT,
                queue = self._QUEUE,
                host = ldr.request.host;
            // update domain request count
            counts[host]--;
            // check to see if we have any queued request for that domain
            queue.forEach(function(item, i){
                if(item.request.host == host){
                    self._loadLoader(item);
                    return false;
                }
            });
        },
        'queueLoader' : function(ldr){
            var self = this,
                counts = self._HOST_REQUEST_COUNT,
                queue = self._QUEUE,
                host = ldr.request.host,
                cnt = counts[host] || 0;
            // check to make sure we aren't already queued
            if(queue.contains(ldr)){
                return;
            }
            // check to see if are under the threshold to allow load
            if(cnt < self._HOST_REQUEST_MAX){
                self._loadLoader(ldr);
            }
            else{
                queue.append(ldr);
            }
        },

        'USE_ACTIVEX' : (window.XDomainRequest || window.ActiveXObject)
    }
);

/*
 * Import Core
 */


/*
 * Import Classes
 */


// import the required classes


OJ.extendClass(
    'OjElmArray', [OjArray],
    {
        'push' : function(){
            throw "OjElmArray is immutable.";
        },
        'splice' : function(){
            throw "OjElmArray is immutable.";
        },
        'getItemAt' : function(index){
            return OjElement.element(this._items[index]);
        },
        'indexOf' : function(item){
            if(isObjective(item) && item.is('OjElement')){
                item = item.dom;
            }
            for(var key in this._items){
                if(this._items[key] == item){
                    return parseInt(key);
                }
            }
            return -1;
        },
        'move' : function(item, index){
            throw "OjElmArray is immutable.";
        },
        'removeAt' : function(index){
            throw "OjElmArray is immutable.";
        },
        'replaceAt' : function(index, newItem){
            throw "OjElmArray is immutable.";
        },
        'reverse' : function(){
            // TODO: add OjElmArray reverse method
        },
        'setItemAt' : function(item, index){
            throw "OjElmArray is immutable.";
        },
        'sort' : function(/*sort_func*/){
            // TODO: add OjElmArray sort method
        },

        '=items' : function(items){
            this._items = items ? items : [];
        }
    }
);



OJ.extendClass(
    'OjElement', [OjActionable],
    {
        // Internal Vars
        '_props_' : {
            'parent' : null
        },
        '_get_props_' : {
            'dom' : null,
            'id' : null,
            'inDom' : false
        },
        '_draggable' : false, '_dragX' : 0, '_dragY' : 0, '_did_drag' : false,

        // Internal Methods
        '_constructor' : function(source, context){
            this._super(OjActionable, '_constructor', []);
            // set the dom
            // if no source present then create one
            this._setDom(source ? source : OjElement.elm('div'), context);
            OjElement.register(this);
        },
        '_destructor' : function(/*depth = 0*/){
            OjElement.unregister(this);
            // remove from parent
            this.parent = null;
            if(this._dom){
                delete this._dom.ojProxy;
                // release the vars
                this._dom = this._proxy = null;
            }
            // continue on with the destruction
            return this._super(OjActionable, '_destructor', arguments);
        },

        // Internal Properties
        '_setDom' : function(dom_elm){
            this._setProxy(this._dom = dom_elm);
            this._dom.id = this.id;
        },
        '_setProxy' : function(dom_elm){
            if(this._proxy){
                this._proxy.ojProxy = null;
            }
            (this._proxy = dom_elm).ojProxy = this.id;
        },
        '_getEventProxy' : function(){
            if(this._proxy == document.body){
                return window;
            }
            return this._proxy;
        },

        '_setIsDisplayed' : function(displayed){
            var self = this,
                dispatch = self.dispatchEvent,
                evt = OjEvent;
            if(self._is_displayed == displayed){
                return;
            }
            if(self._is_displayed = displayed){
                self.dispatchEvent(new evt(evt.ADDED_TO_DISPLAY));
            }
            else{
                self.dispatchEvent(new evt(evt.REMOVED_FROM_DISPLAY));
            }
        },

        // Public Methods
        'hasDomElement' : function(dom_elm){
            return OjElement.hasDomElement(this._dom, dom_elm);
        },
        'query' : function(query){
            return new OjElmArray(this._dom.querySelectorAll(query));
        },

        // Public Properties
        '.dom' : function(){
            return this._dom;
        },
        '.id' : function(){
            return this.oj_id;
        },
        '.inDom' : function(){
            var dom = this._dom;
            return dom.ownerDocument && isObject(dom.ownerDocument) && dom.parentNode ? true : false;
        },
        '.parent' : function(){
            return this._dom ? OjElement.element(this._dom.parentNode) : null;
        },
        '=parent' : function(parent){
            if(parent){
                parent.appendChild(this);
            }
            else if(parent = this.parent){
                parent.removeChild(this);
            }
        },
        '.parentComponent' : function(){
            if(!this._parentComponent){
                this._parentComponent = OjElement.parentComponent(this._dom.parentNode);
            }
            return this._parentComponent;
        }
    },
    {
        '_elms' : {},
        'byId' : function(id){
            var elms = this._elms,
                elm;
            if(elms[id]){
                return elms[id];
            }
            return (elm = document.getElementById(id)) ? elms[elm.id] : null;
        },
        'byPoint' : function(x, y){
            var obj = document.elementFromPoint(x, y);
            return obj ? this.element(obj) : null;
        },
        'elm' : function(tag){
            return document.createElement(tag);
        },
        'element' : function(obj){
            var self = this;
            if(!obj){
                return null;
            }
            if(isDomElement(obj)){
                return self.isTextNode(obj) ? new OjTextElement(obj) : self.byId(obj.id);
            }
            if(isObjective(obj)){
                return obj;
            }
            return obj == window ? OJ : new OjStyleElement(obj);
        },
        'hasDomElement' : function(haystack, needle){
            if(haystack == needle){
                return true;
            }
            while((needle = needle.parentNode)){
                if(needle == haystack){
                    return true;
                }
            }
            return false;
        },
        'isCommentNode' : function(dom_elm){
            return dom_elm.nodeName.toLowerCase() == '#comment';
        },
        'isTextNode' : function(dom_elm){
            return dom_elm.nodeName.toLowerCase() == '#text';
        },
        'parentComponent' : function(elm){
            if(isElement(elm)){
                elm = elm._dom;
            }
            var parent;
            while(elm){
                parent = elm.parentNode;
                if(parent && (elm = this.element(parent)) && isComponent(elm)){
                    return elm;
                }
                elm = parent;
            }
            return null;
        },
        // todo: look into this it doesn't seem efficient
        'register' : function(elm){
            this._elms[elm.id] = elm;
        },
        'unregister' : function(elm){
            delete this._elms[elm.id];
//            print(Object.keys(this._elms).length);
        }
    }
);




OJ.extendClass(
    "OjRect", [OjObject],
    {
        "_props_" : {
            "top"    : 0,
            "left"   : 0,
            "width"  : 0,
            "height" : 0
        },
        "_get_props_" : {
            "bottom" : 0,
            "right"  : 0
        },

        "_constructor" : function(/*left, top, width, height*/){
            this._super(OjObject, "_constructor", []);
            this._processArguments(arguments, {
                "left" : 0,
                "top" : 0,
                "width" : 0,
                "height" : 0
            });
        },
        "delta" : function(rect){
            var self = this;
            return new OjRect(
                self.top - (rect ? rect.top : 0),
                self.left - (rect ? rect.left : 0),
                self.width - (rect ? rect.width : 0),
                self.height - (rect ? rect.height : 0)
            );
        },
        "hitTestPoint" : function(x, y){
            var self = this;
            return x >= self._left && x <= self._right && y >= self._top && y <= self._bottom;
        },
        "hitTestRect" : function(rect){
            var self = this;
            return (rect._top >= self._top && rect._top <= self._bottom && rect._left >= self._left && rect._left <= self._right) ||
                (rect._top >= self._top && rect._top <= self._bottom && rect._right >= self._left && rect._right <= self._right) ||
                (rect._bottom >= self._top && rect._bottom <= self._bottom && rect._left >= self._left && rect._left <= self._right) ||
                (rect._bottom >= self._top && rect._bottom <= self._bottom && rect._right >= self._left && rect._right <= self._right);
        },

        "=top" : function(val){
            var self = this;
            self._bottom = (self._top = val) + self._height;
        },
        "=left" : function(val){
            var self = this;
            self._right = (self._left = val) + self._width;
        },
        "=width" : function(val){
            var self = this;
            self._right = (self._width = val) + self._left;
        },
        "=height" : function(val){
            var self = this;
            self._bottom = (self._height = val) + self._top;
        }
    },
    {
        "rect" : function(obj){
            if(isObjective(obj, OjRect)){
                return obj;
            }
            if(isObject(obj)){
                if(isSet(obj.top) && isSet(obj.left) && isSet(obj.width) && isSet(obj.height)){
                    return new OjRect(obj.top, obj.left, obj.width, obj.height);
                }
            }
            else if(isArray(obj) && obj.length == 4){
                return new OjRect(obj[0], obj[1], obj[2], obj[3]);
            }
            return new OjRect();
        }
    }
);

OJ.extendClass(
    'OjCssTranslate', [OjObject],
    {
        '_props_' : {
            'x'     : 0,
            'unitX' : OJ.dim_unit,
            'unitY' : OJ.dim_unit,
            'y'     : 0
        },

        '_constructor' : function(/*x, y, unitX, unitY*/){
            var args = arguments,
                ln = args.length;
            this._super(OjObject, '_constructor', []);
            if(ln){
                this.x = args[0];
                if(ln > 1){
                    this.y = args[1];
                    if(ln > 2){
                        this.unitX = args[2];
                        if(ln > 3){
                            this.unitY = args[3];
                        }
                    }
                }
            }
        },

        'clone' : function(){
            var obj = this._super(OjObject, 'clone', arguments);
            obj._x     = this._x;
            obj._unitX = this._unitX;
            obj._unitY = this._unitY;
            obj._y     = this._y;
            return obj;
        },
        'isEqualTo' : function(obj){
            return obj && obj._x == this._x && obj._unitX == this._unitX && obj._unitY == this._unitY && obj._y == this._y;
        },
        'toString' : function(){
            return !this._x && !this._y ? '' : String(this._x) + this._unitX + ', ' + String(this._y) + this._unitY;
        }
    }
);


OJ.extendClass(
    'OjDomEvent', [OjEvent],
    {},
    {
        'normalizeDomEvent' : function(evt){
            if(!evt){
                evt = window.event;
            }
            // todo: figure out a better way to handle FF not liking us changing event properties
            evt = OJ.merge({}, evt); // because FF sucks
            if(evt.clientX || evt.clientY){
                evt.pageX = evt.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                evt.pageY = evt.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }
            if(evt.which){
                evt.rightClick = evt.which == 3;
            }
            else if(evt.button){
                evt.rightClick = evt.button == 2;
            }
            return evt;
        },
        'convertDomEvent' : function(evt){
            evt = OjDomEvent.normalizeDomEvent(evt);
            return new OjDomEvent(evt.type, true, true);
        },
        // mouse events
        'PRESS'        : 'click',
        'DOUBLE_PRESS' : 'dblclick',
        'MOUSE_DOWN'   : 'mousedown',
        'MOUSE_MOVE'   : 'mousemove',
        'MOUSE_OVER'   : 'mouseover',
        'MOUSE_OUT'    : 'mouseout',
        'MOUSE_UP'     : 'mouseup',
        'MOUSE_WHEEL'  : 'mousewheel',
        // keyboard events
        'KEY_DOWN'  : 'keydown',
        'KEY_PRESS' : 'keypress',
        'KEY_UP'    : 'keyup',
        // focus events
        'FOCUS_IN'  : 'focus',
        'FOCUS_OUT' : 'blur',
        // form events
        'CHANGE' : 'change',
        // scroll events
        'SCROLL' : 'scroll',
        // touch events
        'TOUCH_CANCEL' : 'touchcancel',
    'TOUCH_END'    : 'touchend',
        'TOUCH_LEAVE'  : 'touchleave',
    'TOUCH_MOVE'   : 'touchmove',
        'TOUCH_START'  : 'touchstart',
        // orientation events
        'ORIENTATION_CHANGE' : 'orientationchange'
    }
);

OJ.extendClass(
    'OjUiEvent', [OjDomEvent],
    {
        '_get_props_' : {
            'pageX' : NaN,
            'pageY' : NaN
        },

        '_constructor' : function(type/*, pageX = NaN, pageY = NaN, bubbles, cancelable*/){
            var args = Array.array(arguments),
                ln = args.length;
            if(ln > 1){
                this._pageX = args.removeAt(1)[0];
                if(ln > 2){
                    this._pageY = args.removeAt(1)[0];
                }
            }
            this._super(OjDomEvent, '_constructor', args);
        },

        'clone' : function(){
            var clone = this._super(OjDomEvent, 'clone', arguments);
            clone._pageX = this._pageX;
            clone._pageY = this._pageY;
            return clone;
        }
    },
    {
        '_evt_map' : {
            'click'        : 'onPress',
            "contextmenu"  : "onUp",
            'dblclick'     : 'onDoublePress',
            'mousedown'    : 'onDown',
            'mousemove'    : 'onMove',
            'mouseover'    : 'onOver',
            'mouseout'     : 'onOut',
            'mouseup'      : 'onUp',
            'mousewheel'   : 'onWheel'
        },
        'convertDomEvent' : function(evt){
            evt = OjDomEvent.normalizeDomEvent(evt);
            var type = this._evt_map[evt.type];
            if(type == OjUiEvent.PRESS){
                // todo: OjUiEvent - add middle and right click event detection
            }
            var new_evt = new OjUiEvent(type, evt.pageX, evt.pageY, evt.bubbles, evt.cancelable);
            new_evt._target = OjElement.element(evt.target);
            new_evt._current_target = OjElement.element(evt.current_target);
            return new_evt;
        },
        'isMouseEvent' : function(type){
            var k;
            for(k in this._evt_map){
                if(type == this._evt_map[k]){
                    return true;
                }
            }
            return false;
        },
        'isMouseDomEvent' : function(type){
            var k;
            for(k in this._evt_map){
                if(type == k){
                    return true;
                }
            }
            return false;
        },
        'PRESS'           : 'onPress',
        'DOUBLE_PRESS'    : 'onDoublePress',
        'MIDDLE_PRESS'    : 'onMiddlePress',
        'RIGHT_PRESS'  : 'onRightPress',
        'DOWN'            : 'onDown',
        'RIGHT_DOWN'   : 'onRightDown',
        'UP'           : 'onUp',
        'UP_OUTSIDE'   : 'onUpOutside',
        'RIGHT_UP'     : 'onRightUp',
        'MOVE'         : 'onMove',
        'OVER'         : 'onOver',
        'OUT'          : 'onOut',
        'WHEEL'        : 'onWheel'
    }
);


OJ.extendClass(
    'OjDragEvent', [OjUiEvent],
    {
        '_get_props_' : {
            'deltaX'   : 0,
            'deltaY'   : 0,
            'originX'  : 0,
            'originY'  : 0
        },

        '_constructor' : function(type, deltaX, deltaY, mouseEvent/*, bubbles, cancelable*/){
            var args = [].slice.call(arguments, 4);
            args.unshift(type);
            this._super(OjUiEvent, '_constructor', args);
            this._deltaX = deltaX;
            this._deltaY = deltaY;
            this._pageX = mouseEvent._pageX;
            this._pageY = mouseEvent._pageY;
        },

        'clone' : function(){
            var clone = this._super(OjUiEvent, 'clone', arguments);
            clone._deltaX = this._deltaX;
            clone._deltaY = this._deltaY
            return clone;
        }
    },
    {
        'isDragEvent' : function(type){
            return type == OjDragEvent.DRAG || type == OjDragEvent.END || type == OjDragEvent.START;
        },
        'END'   : 'onDragEnd',
        'DRAG'  : 'onDrag',
        'START' : 'onDragStart'
    }
);


OJ.extendClass(
    'OjFocusEvent', [OjDomEvent],
    {},
    {
        'convertDomEvent' : function(evt){
            var type;
            evt = OjDomEvent.normalizeDomEvent(evt);
            if(evt.type == OjDomEvent.FOCUS_IN){
                type = OjFocusEvent.IN;
            }
            else if(evt.type == OjDomEvent.FOCUS_OUT){
                type = OjFocusEvent.OUT;
            }
            return new OjFocusEvent(type, true, true);
        },
        'isFocusEvent' : function(type){
            return type == OjFocusEvent.IN || type == OjFocusEvent.OUT;
        },
        'isFocusDomEvent' : function(type){
            return type == OjDomEvent.FOCUS_IN || type == OjDomEvent.FOCUS_OUT;
        },

        'IN'  : 'onFocusIn',
        'OUT' : 'onFocusOut'
    }
);

OJ.extendClass(
    'OjGestureRecognizer', [OjObject],
    {
        '_props_' : {
            'callback' : null,
            'event' : null,
            'pointers' : null,
            'threshold' : null
        },

        '_constructor' : function(event, pointers, threshold, callback){
            var self = this;
            self._super(OjObject, '_constructor', []);
            self.event = event;
            self.pointers = pointers;
            self.threshold = threshold;
            self.callback = callback;
        },

        '_add' : function(hammer){
            var self = this,
                recognizer = self._recognizer;
            if(!recognizer){
                self._recognizer = recognizer = self._make();
            }
            hammer.add(recognizer);
            hammer.on(
                self.oj_id,
                function(evt){
                    var callback = self.callback;
                    if(callback){
                        callback(evt);
                    }
                }
            );
            return hammer;
        },
        '_make' : function(){
            var self = this,
                cls = self._cls,
                options = self._options();
            return cls ? new cls(options) : null;
        },
        '_options' : function(){
            var self = this;
            return {
                'event'     : self.oj_id,
                'pointers'  : self.pointers,
                'threshold' : self.threshold
            };
        },
        '_remove' : function(hammer){
            var self = this,
                recognizer = self._recognizer;
            if(recognizer){
                hammer.remove(recognizer);
            }
            return hammer;
        }
    },
    {
        'DOWN' : Hammer.DIRECTION_DOWN,
        'LEFT' : Hammer.DIRECTION_LEFT,
        'NONE' : Hammer.DIRECTION_NONE,
        'RIGHT' : Hammer.DIRECTION_RIGHT,
        'UP' : Hammer.DIRECTION_UP,
        'ALL' : Hammer.DIRECTION_ALL,
        'HORIZONTAL' : Hammer.HORIZONTAL,
        'VERTICAL' : Hammer.VERTICAL
    }
);

OJ.extendClass(
    'OjPanRecognizer', [OjGestureRecognizer],
    {
        '_props_' : {
            'direction' : null
        },

        '_constructor' : function(callback, direction, pointers, threshold){
            var self = this;
            self._cls = Hammer.Pan;
            self._super(OjGestureRecognizer, '_constructor', [
                self._static.PAN, Math.max(pointers || 1, 1), Math.max(threshold || 10, 1), callback
            ]);
            self.direction = direction || self._static.ALL;
        },

        '_options' : function(){
            var self = this,
                options = self._super(OjGestureRecognizer, '_options', arguments);
            options.direction = self.direction;
            return options;
        }
    },
    {
        'PAN'        : 'pan',
        'PAN_CANCEL' : 'pancancel',
        'PAN_DOWN'   : 'pandown',
        'PAN_END'    : 'panend',
        'PAN_LEFT'   : 'panleft',
        'PAN_MOVE'   : 'panmove',
        'PAN_RIGHT'  : 'panright',
        'PAN_START'  : 'panstart',
        'PAN_UP'     : 'panup'
    }
);

OJ.extendClass(
    'OjPinchRecognizer', [OjGestureRecognizer],
    {
        '_constructor' : function(callback, pointers, threshold){
            var self = this;
            self._cls = Hammer.Pinch;
            self._super(OjGestureRecognizer, '_constructor', [
                self._static.PINCH, Math.max(pointers || 1, 1), Math.max(threshold || 10, 1), callback
            ]);
        }
    },
    {
        'PINCH'        : 'pinch',
        'PINCH_CANCEL' : 'pinchcancel',
        'PINCH_END'    : 'pinchend',
        'PINCH_IN'     : 'pinchin',
        'PINCH_MOVE'   : 'pinchmove',
        'PINCH_OUT'    : 'pinchout',
        'PINCH_START'  : 'pinchstart'
    }
);

OJ.extendClass(
    'OjPressRecognizer', [OjGestureRecognizer],
    {
        '_props_' : {
            'time' : null
        },

        '_constructor' : function(callback, pointers, time, threshold){
            var self = this;
            self._cls = Hammer.Press;
            self._super(OjGestureRecognizer, '_constructor', [
                self._static.PRESS, Math.max(pointers || 1, 1), Math.max(threshold || 5, 1), callback
            ]);
            self.time = Math.max(time || 500, 10);
        },

        '_options' : function(){
            var self = this,
                options = self._super(OjGestureRecognizer, '_options', arguments);
            options.time = self.time;
            return options;
        }
    },
    {
        'PRESS'    : 'press',
        'PRESS_UP' : 'pressup'
    }
);

OJ.extendClass(
    'OjRotateRecognizer', [OjGestureRecognizer],
    {
        '_constructor' : function(callback, pointers, threshold){
            var self = this;
            self._cls = Hammer.Rotate;
            self._super(OjGestureRecognizer, '_constructor', [
                self._static.ROTATE, Math.max(pointers || 2, 2), Math.max(threshold || 0, 0), callback
            ]);
        }
    },
    {
        'ROTATE'        : 'rotate',
        'ROTATE_CANCEL' : 'rotatecancel',
        'ROTATE_END'    : 'rotateend',
        'ROTATE_MOVE'   : 'rotatemove',
        'ROTATE_START'  : 'rotatestart'
    }
);

OJ.extendClass(
    'OjSwipeRecognizer', [OjGestureRecognizer],
    {
        '_props_' : {
            'direction' : null,
            'velocity' : null
        },

        '_constructor' : function(callback, direction, pointers, velocity, threshold){
            var self = this;
            self._cls = Hammer.Swipe;
            self._super(OjGestureRecognizer, '_constructor', [
                self._static.SWIPE, Math.max(pointers || 1, 1), Math.max(threshold || 10, 1), callback
            ]);
            self.direction = direction || self._static.ALL;
            self.velocity = Math.max(velocity || 0.65, 0.01);
        },

        '_options' : function(){
            var self = this,
                options = self._super(OjGestureRecognizer, '_options', arguments);
            options.direction = self.direction;
            options.velocity = self.velocity;
            return options;
        }
    },
    {
        'SWIPE'       : 'swipe',
        'SWIPE_DOWN'  : 'swipedown',
        'SWIPE_LEFT'  : 'swipeleft',
        'SWIPE_RIGHT' : 'swiperight',
        'SWIPE_UP'    : 'swipeup'
    }
);

OJ.extendClass(
    'OjTapRecognizer', [OjGestureRecognizer],
    {
        '_props_' : {
            'interval' : null,
            'pos_threshold' : null,
            'taps' : null,
            'time' : null
        },

        '_constructor' : function(callback, taps, pointers, interval, time, threshold, pos_threshold){
            var self = this;
            self._cls = Hammer.Tap;
            self._super(OjGestureRecognizer, '_constructor', [
                self._static.TAP, Math.max(pointers || 1, 1), Math.max(threshold || 2, 1), callback
            ]);
            self.interval = Math.max(interval || 300, 10);
            self.pos_threshold = Math.max(pos_threshold || 10, 1);
            self.taps = Math.max(taps || 1, 1);
            self.time = Math.max(time || 250, 1);
        },

        '_options' : function(){
            var self = this,
                options = self._super(OjGestureRecognizer, '_options', arguments);
            options.interval = self.interval;
            options.pos_threshold = self.pos_threshold;
            options.taps = self.taps;
            options.time = self.time;
            return options;
        }
    },
    {
        'TAP' : 'tap'
    }
);



OJ.extendClass(
    'OjKeyboardEvent', [OjDomEvent],
    {},
    {
        'convertDomEvent' : function(evt){
            var type;
            evt = OjDomEvent.normalizeDomEvent(evt);
            if(evt.type == OjDomEvent.KEY_DOWN){
                type = OjKeyboardEvent.DOWN;
            }
            else if(evt.type == OjDomEvent.KEY_PRESS){
                type = OjKeyboardEvent.PRESS;
            }
            else if(evt.type == OjDomEvent.KEY_UP){
                type = OjKeyboardEvent.UP;
            }
            return new OjKeyboardEvent(type, true, true);
        },
        'isKeyboardEvent' : function(type){
            return type == OjKeyboardEvent.DOWN || type == OjKeyboardEvent.PRESS || type == OjKeyboardEvent.UP;
        },
        'isKeyboardDomEvent' : function(type){
            return type == OjDomEvent.KEY_DOWN || type == OjDomEvent.KEY_PRESS || type == OjDomEvent.KEY_UP;
        },
        'DOWN'  : 'onKeyDown',
        'PRESS' : 'onKeyPress',
        'UP'    : 'onKeyUp',
        'SHOW'  : 'onKeyboardShow',
        'HIDE'  : 'onKeyboardHide'
    }
);


OJ.extendClass(
    'OjScrollEvent', [OjDomEvent],
    {
        '_get_props_' : {
            'scrollX' : NaN,
            'scrollY' : NaN
        },

        '_constructor' : function(type, scrollX, scrollY/*, bubbles, cancelable*/){
            var args = Array.array(arguments).slice(3);
            args.unshift(type);
            this._super(OjDomEvent, '_constructor', args);
            this._scrollX = scrollX;
            this._scrollY = scrollY;
        },

        'clone' : function(){
            var clone = this._super(OjDomEvent, 'clone', arguments);
            clone._scrollX = this._scrollX;
            clone._scrollY = this._scrollY;
            return clone;
        }
    },
    {
        'convertDomEvent' : function(evt){
            var type;
            evt = OjDomEvent.normalizeDomEvent(evt);
            if(evt.type == 'scroll'){
                type = 'onScroll';
            }
            return new OjScrollEvent(type, evt.target.scrollLeft, evt.target.scrollTop, false, false);
        },
        'isScrollEvent' : function(type){
            return type == 'onScroll';
        },
        'isScrollDomEvent' : function(type){
            return type == 'scroll';
        },

        'SCROLL' : 'onScroll'
    }
);


OJ.extendClass(
    'OjTouchEvent', [OjDomEvent],
    {
        '_get_props_' : {
            'pageX'   : NaN,
            'pageY'   : NaN
        },

        '_constructor' : function(type/*, pageX = NaN, pageY = NaN, bubbles, cancelable*/){
            var args = Array.array(arguments),
                ln = args.length;
            if(ln > 1){
                this._pageX = args.removeAt(1)[0];
                if(ln > 2){
                    this._pageY = args.removeAt(1)[0];
                }
            }
            this._super(OjDomEvent, '_constructor', args);
        },

        'clone' : function(){
            var clone = this._super(OjDomEvent, 'clone', arguments);
            clone._pageX = this._pageX;
            clone._pageY = this._pageY;
            return clone;
        }
    },
    {
        'convertDomEvent' : function(evt){
            var type;
            evt = OjDomEvent.normalizeDomEvent(evt);
            if(evt.type == OjDomEvent.TOUCH_MOVE){
                type = OjTouchEvent.MOVE;
            }
            else if(evt.type == OjDomEvent.TOUCH_START){
                type = OjTouchEvent.START;
            }
      else if(
        evt.type == OjDomEvent.TOUCH_END || evt.type == OjDomEvent.TOUCH_CANCEL || evt.type == OjDomEvent.TOUCH_LEAVE
      ){
                type = OjTouchEvent.END;
            }
            var new_evt = new OjTouchEvent(type, evt.changedTouches[0].pageX, evt.changedTouches[0].pageY, evt.bubbles, evt.cancelable);
            new_evt._target = OjElement.element(evt.target)
            new_evt._current_target = OjElement.element(evt.current_target);
            return new_evt;
        },
        'isTouchEvent' : function(type){
            return type == OjTouchEvent.END || type == OjTouchEvent.MOVE || type == OjTouchEvent.START;
        },
        'isTouchDomEvent' : function(type){
            return type == OjDomEvent.TOUCH_END || type == OjDomEvent.TOUCH_MOVE || type == OjDomEvent.TOUCH_START;
        },
        'START' : 'onTouchStart',
        'MOVE'  : 'onTouchMove',
        'END'   : 'onTouchEnd'
    }
);

OJ.extendClass(
    "OjTransformEvent", [OjEvent],
    {
        "_get_props_" : {
            "rect"   : 0,
            "prev"   : 0,
            "delta"  : 0
        },

        "_constructor" : function(type, rect, prev, bubbles, cancelable){
            var self = this;
            self._super(OjEvent, "_constructor", [type, bubbles, cancelable]);
            self._prev = prev;
            self._rect = rect;
            self._delta = rect.delta(prev);
        },

        "clone" : function(){
            var self = this,
                clone = self._super(OjEvent, "clone", arguments);
            clone._delta = self._delta;
            clone._prev = self._prev;
            clone._rect = self._rect;
            return clone;
        }
    },
    {
        "MOVE"   : "onMove",
        "RESIZE" : "onResize"
    }
);

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    window.propagating = factory();
  }
}(function () {
  var _firstTarget = null; // singleton, will contain the target element where the touch event started
  var _processing = false; // singleton, true when a touch event is being handled
  /**
   * Extend an Hammer.js instance with event propagation.
   *
   * Features:
   * - Events emitted by hammer will propagate in order from child to parent
   *   elements.
   * - Events are extended with a function `event.stopPropagation()` to stop
   *   propagation to parent elements.
   * - An option `preventDefault` to stop all default browser behavior.
   *
   * Usage:
   *   var hammer = propagatingHammer(new Hammer(element));
   *   var hammer = propagatingHammer(new Hammer(element), {preventDefault: true});
   *
   * @param {Hammer.Manager} hammer   An hammer instance.
   * @param {Object} [options]        Available options:
   *                                  - `preventDefault: true | 'mouse' | 'touch' | 'pen'`.
   *                                    Enforce preventing the default browser behavior.
   *                                    Cannot be set to `false`.
   * @return {Hammer.Manager} Returns the same hammer instance with extended
   *                          functionality
   */
  return function propagating(hammer, options) {
    var _options = options || {
      preventDefault: false
    };
    if (hammer.Manager) {
      // This looks like the Hammer constructor.
      // Overload the constructors with our own.
      var Hammer = hammer;
      var PropagatingHammer = function(element, options) {
        var o = Object.create(_options);
        if (options) Hammer.assign(o, options);
        return propagating(new Hammer(element, o), o);
      };
      Hammer.assign(PropagatingHammer, Hammer);
      PropagatingHammer.Manager = function (element, options) {
        var o = Object.create(_options);
        if (options) Hammer.assign(o, options);
        return propagating(new Hammer.Manager(element, o), o);
      };
      return PropagatingHammer;
    }
    // create a wrapper object which will override the functions
    // `on`, `off`, `destroy`, and `emit` of the hammer instance
    var wrapper = Object.create(hammer);
    // attach to DOM element
    var element = hammer.element;
    if(!element.hammer) element.hammer = [];
    element.hammer.push(wrapper);
    // register an event to catch the start of a gesture and store the
    // target in a singleton
    hammer.on('hammer.input', function (event) {
      if (_options.preventDefault === true || (_options.preventDefault === event.pointerType)) {
        event.preventDefault();
      }
      if (event.isFirst) {
        _firstTarget = event.target;
      }
    });
    /** @type {Object.<String, Array.<function>>} */
    wrapper._handlers = {};
    /**
     * Register a handler for one or multiple events
     * @param {String} events    A space separated string with events
     * @param {function} handler A callback function, called as handler(event)
     * @returns {Hammer.Manager} Returns the hammer instance
     */
    wrapper.on = function (events, handler) {
      // register the handler
      split(events).forEach(function (event) {
        var _handlers = wrapper._handlers[event];
        if (!_handlers) {
          wrapper._handlers[event] = _handlers = [];
          // register the static, propagated handler
          hammer.on(event, propagatedHandler);
        }
        _handlers.push(handler);
      });
      return wrapper;
    };
    /**
     * Unregister a handler for one or multiple events
     * @param {String} events      A space separated string with events
     * @param {function} [handler] Optional. The registered handler. If not
     *                             provided, all handlers for given events
     *                             are removed.
     * @returns {Hammer.Manager}   Returns the hammer instance
     */
    wrapper.off = function (events, handler) {
      // unregister the handler
      split(events).forEach(function (event) {
        var _handlers = wrapper._handlers[event];
        if (_handlers) {
          _handlers = handler ? _handlers.filter(function (h) {
            return h !== handler;
          }) : [];
          if (_handlers.length > 0) {
            wrapper._handlers[event] = _handlers;
          }
          else {
            // remove static, propagated handler
            hammer.off(event, propagatedHandler);
            delete wrapper._handlers[event];
          }
        }
      });
      return wrapper;
    };
    /**
     * Emit to the event listeners
     * @param {string} eventType
     * @param {Event} event
     */
    wrapper.emit = function(eventType, event) {
      _firstTarget = event.target;
      hammer.emit(eventType, event);
    };
    wrapper.destroy = function () {
      // Detach from DOM element
      var hammers = hammer.element.hammer;
      var idx = hammers.indexOf(wrapper);
      if(idx !== -1) hammers.splice(idx,1);
      if(!hammers.length) delete hammer.element.hammer;
      // clear all handlers
      wrapper._handlers = {};
      // call original hammer destroy
      hammer.destroy();
    };
    // split a string with space separated words
    function split(events) {
      return events.match(/[^ ]+/g);
    }
    /**
     * A static event handler, applying event propagation.
     * @param {Object} event
     */
    function propagatedHandler(event) {
      // let only a single hammer instance handle this event
      if (event.type !== 'hammer.input') {
        // it is possible that the same srcEvent is used with multiple hammer events,
        // we keep track on which events are handled in an object _handled
        if (!event.srcEvent._handled) {
          event.srcEvent._handled = {};
        }
        if (event.srcEvent._handled[event.type]) {
          return;
        }
        else {
          event.srcEvent._handled[event.type] = true;
        }
      }
      // attach a stopPropagation function to the event
      var stopped = false;
      event.stopPropagation = function () {
        stopped = true;
      };
      //wrap the srcEvent's stopPropagation to also stop hammer propagation:
      var srcStop = event.srcEvent.stopPropagation;
      if(typeof srcStop == "function") {
        event.srcEvent.stopPropagation = function(){
          srcStop();
          event.stopPropagation();
        }
      }
      // attach firstTarget property to the event
      event.firstTarget = _firstTarget;
      // propagate over all elements (until stopped)
      var elem = _firstTarget;
      while (elem && !stopped) {
        var elemHammer = elem.hammer;
        if(elemHammer){
          var _handlers;
          for(var k = 0; k < elemHammer.length; k++){
            _handlers = elemHammer[k]._handlers[event.type];
            if(_handlers) for (var i = 0; i < _handlers.length && !stopped; i++) {
              _handlers[i](event);
            }
          }
        }
        elem = elem.parentNode;
      }
    }
    return wrapper;
  };
}));


OJ.extendClass(
    "OjStyleElement", [OjElement],
    {
        "_props_" : {
            "alpha" : null,
            "background_color" : null,
            "children" : null,
            "css" : null,
            "css_list" : null,
            "depth" : null,
            "hAlign" : "l", // OjStyleElement.LEFT
            "height" : null,
            "id" : null,
            "innerHeight" : null,
            "innerWidth" : null,
            "origin" : null,
            "outerHeight" : null,
            "outerWidth" : null,
            "overflow" : null,
            "owner" : null,
            "page_rect" : null,
            "pageX" : null,
            "pageY" : null,
            "rect" : null,
            "rotation" : null,
            "scrollHeight" : null,
            "scrollWidth" : null,
            "scrollX" : null,
            "scrollY" : null,
            "text" : null,
            "translate" : null,
            "vAlign" : "t", // OjStyleElement.TOP
            "width" : null,
            "x" : null,
            "y" : null
        },
        "_get_props_" : {
            "dom" : null,
            "isVisible" : null,
            "num_children" : null
        },
        "_alpha" : 1,
        "_depth" : 0,
        "_scrollable" : false,
        "_origin" : "0px, 0px",
        "_rotation" : 0,
        "_translate" : "0px, 0px",

        "_compile_" : function(def){
            var cls = OjStyleElement;
            if(cls.STYLE_MODE == cls.STYLE_IE){
                this._getStyle = this._getStyleIe;
            }
            else if(cls.STYLE_MODE == cls.STYLE_BACKUP){
                this._getStyle = this._getStyleBackup;
            }
            // build functions for style getter and setters
            def._style_funcs_.call(this, "margin", "Margin");
            def._style_funcs_.call(this, "padding", "Padding");
        },
        "_style_funcs_" : function(style, u_style){
            var g = "get",
                s = "set",
                bottom = "Bottom",
                left = "Left",
                right = "Right",
                top = "Top";
            this[g + u_style] = function(/*side_index : top = 0, right = 1, bottom = 2, left = 3*/){
                return this._getStyler(style, arguments);
            };
            this[s + u_style] = function(val/* | top/bottom, right/left | top, right/left, bottom | top, right, bottom, left*/){
                this._setStyler(style, arguments);
            };
            this[g + u_style + bottom] = function(){
                return this[g + u_style](2);
            };
            this[s + u_style + bottom] = function(val){
                this[s + u_style](null, null, val, null);
            };
            this[g + u_style + left] = function(){
                return this[g + u_style](3);
            };
            this[s + u_style + left] = function(val){
                this[s + u_style](null, null, null, val);
            };
            this[g + u_style + right] = function(){
                return this[g + u_style](1);
            };
            this[s + u_style + right] = function(val){
                this[s + u_style](null, val, null, null);
            };
            this[g + u_style + top] = function(){
                return this[g + u_style](0);
            };
            this[s + u_style + top] = function(val){
                this[s + u_style](val, null, null, null);
            };
        },

        "_constructor" : function(source, context){
            var self = this;
            // set the source
            // if dom element then we are done
            if(source && !source.nodeType){
                // if its the document or body do something special
                if(source === "body" || source == document || source == document.body){
                    source = document.body;
                }
                // if its a string then we need to make sure its html and handle it accordingly
                else if(isString(source)){
                    source = source.trim();
                    if(source.charAt(0) == "<" && source.slice(-1) == ">" && source.length >= 5){
                        var tag = source.substr(0, 6).toLowerCase(),
                            tag2 = tag.substr(0, 3),
                            tmp;
                        if(tag == "<thead" || tag == "<tbody" || tag == "<tfoot"){
                            tmp = OjElement.elm("table");
                        }
                        else if(tag2 == "<tr"){
                            tmp = OjElement.elm("tbody");
                        }
                        else if(tag2 == "<td" || tag2 == "<th"){
                            tmp = OjElement.elm("tr")
                        }
                        else{
                            tmp = OjElement.elm("div");
                        }
                        tmp.innerHTML = source;
                        if(tmp.childNodes.length){
                            tmp.removeChild(source = tmp.childNodes[0]);
                        }
                        else{
                            source = null
                        }
                    }
                    else{
                        // todo: re-evaluate the use query, maybe just allow ids...
                        // tmp = OJ.query(source);
                    }
                }
            }
            self._super(OjElement, "_constructor", [source, context]);
            self.hAlign = this._hAlign;
            self.vAlign = this._vAlign;
        },
        "_destructor" : function(/*depth = 0*/){
            // remove the children
            var self = this,
                args = arguments,
                depth = args.length ? args[0] : 0,
                ln = self.num_children;
            // remove the children
            for(; ln--;){
                OJ.destroy(self.getChildAt(ln), depth);
            }
            // release the vars
            self._owner = null;
            // cleanup hammer & gesture recognizers
            self._cleanupHammer();
            // remove the timers
            self._unset("_move_timer", "_scroll_timer");
            // continue on with the destruction
            return self._super(OjElement, "_destructor", args);
        },

        "_processAttribute" : function(dom, attr, context){
            var self = this,
                setter, solo, target, lower,
                nm = attr.nodeName,
                val = attr.value;
            if(nm == "id"){
                if(!isEmpty(val) && val != "null"){
                    self.id = val;
                }
                return false;
            }
            if(nm.substr(0, 3) == "on-"){
                // todo: add support for multiple event listeners
                // todo? add support for nested event listener functions in templates
                setter = val.split(".");
                solo = setter.length == 1;
                target = context;
                if(!solo){
                    switch(setter[0]){
                        case "this":
                            target = self;
                        break;
                        case "window":
                            target = window;
                        break;
                    }
                }
                self.addEventListener(OJ.attributeToProp(nm), target, solo ? setter[0] : setter[1]);
                return true;
            }
            if(nm == "var"){
                if(!isEmpty(val) && context){
                    (context[val] = self).addCss(val);
                    self.owner = context;
                }
                return true;
            }
            if(nm != "class"){
                setter = OJ.attributeToProp(nm);
                if(setter in self){
                    try{
                        if(val == ""){
                            val = null;
                        }
                        else if(isNumeric(val)){
                            val = parseFloat(val);
                        }
                        else if((lower = val.toLowerCase()) == "true"){
                            val = true;
                        }
                        else if(lower == "false"){
                            val = false;
                        }
                        else{
                            val = self._processReferenceValue(val, context, self);
                        }
                        self[setter] = val;
                    }
                    catch(e){
                        // setup holder for template reference values for deferred processing
                        if(!context._template_vars_){
                            context._template_vars_ = [];
                        }
                        context._template_vars_.unshift(
                            {
                                "context" : self,
                                "property" : setter,
                                "value" : val
                            }
                        );
                    }
                    // if the nm is v-align or h-align we want to return false so that the attribute isn"t destroyed
                    return nm.indexOf("-align") == -1;
                }
            }
            return false;
        },
        "_processAttributes" : function(dom, context){
            var attrs = dom.attributes,
                priority = ["var", "id"],
                ln = priority.length,
                attr;
            // process priority attributes first reference
            for(; ln--;){
                if((attr = dom.attributes[priority[ln]]) && this._processAttribute(dom, attr, context)){
                    dom.removeAttribute(priority[ln]);
                }
            }
            // class name
            dom.removeAttribute("class-name");
            // class path
            dom.removeAttribute("class-path");
            // process the other attributes
            for(ln = attrs.length; ln--;){
                attr = attrs[ln];
                if(this._processAttribute(dom, attr, context)){
                    dom.removeAttribute(attr.nodeName);
                }
            }
        },
        "_processChildren" : function(dom, context){
            // make sure we have something to process
            if(!dom){
                return;
            }
            var children = dom.childNodes,
                ln = children.length;
            for(; ln--;){
                if(!this._processChild(children[ln], context) && children[ln]){
                    dom.removeChild(children[ln]);
                }
            }
        },
        "_processChild" : function(dom, context){
            // make sure we have something to process
            if(!dom){
                return;
            }
            var tag = dom.tagName;
            if(!tag || OjElement.isTextNode(dom)){
                return isEmpty(dom.nodeValue) ? null : new OjTextElement(dom);
            }
            var child, cls_path,
                cls = dom.getAttribute("class-name");
            tag = tag.toLowerCase();
            // if this is a script or link tag ignore it
            if(tag == "script" || tag == "link"){
                return false;
            }
            // load the class if we need to
            if(!window[cls] && (cls_path = dom.getAttribute("class-path"))){
                            }
            // get the component tag class
            if(OjStyleElement.isComponentTag(tag)){
                cls = OjStyleElement.getTagComponent(tag);
            }
            // process the class
            if(cls){
                if(isFunction(cls)){
                    child = cls(dom);
                }
                else{
                    child = new window[cls]();
                }
                child._setDomSource(dom, context);
            }
            else{
                child = new OjStyleElement(dom, context);
            }
            return child;
        },
        "_processReferenceValue" : function(val, context, src){
            var $ = this;
            if(val.contains("$") && $ != context){
                throw "Template Reference Value Processing Deferred"
            }
            try{
                val = (function(str){ return eval(str); }).call(src || $, val);
            }
            catch(e){ }
            return val;
        },
        "_processTemplateVars" : function(){
            var self = this,
                context;
            if(self._template_vars_){
                self._template_vars_.forEachReverse(function(item){
                    context = item.context;
                    context[item.property] = self._processReferenceValue(item.value, self, context);
                });
                self._unset("_template_vars_");
            }
        },
        "_setDom" : function(dom, context){
            // todo: re-evaluate the pre-render functionality of dom
            this._super(OjElement, "_setDom", [dom]);
            // process the attributes
            this._processAttributes(dom, context);
            // process the children
            this._processChildren(dom, context);
            // process any template vars
            this._processTemplateVars();
            // setup the dom id if there isn"t one already
            if(!this._id){
                this.id = this._id_;
            }
        },
        "_setIsDisplayed" : function(displayed){
            var ln, child,
                self = this;
            if(self._is_displayed == displayed){
                return;
            }
            self._super(OjElement, "_setIsDisplayed", arguments);
            for(ln = self.num_children; ln--;){
                if(child = self.getChildAt(ln)){
                    child._setIsDisplayed(displayed);
                }
            }
        },
        // Event Listeners
        "_processEvent" : function(evt){
            // because js natively calls the event functions on the context of the dom element
            // we just get the attached oj element from it to get into the proper context to dispatch
            // the event
            if(OjElement.element(evt.currentTarget) != this || evt.dispatched){
                return false;
            }
            evt.dispatched = true;
            return true;
        },
        "_onOjDomEvent" : function(evt){
            var proxy = OjElement.element(this);
            if(proxy && proxy._processEvent(evt)){
                proxy._onEvent(OjDomEvent.convertDomEvent(evt));
            }
        },
        "_onDomOjUiEvent" : function(evt){
            var proxy = OjElement.element(this);
            if(proxy && proxy._processEvent(evt)){
                evt = OjUiEvent.convertDomEvent(evt);
                proxy._onEvent(evt);
                //if(evt.type == OjUiEvent.DOWN && proxy.hasEventListener(OjUiEvent.UP_OUTSIDE)){
                //    OJ.addEventListener(OjUiEvent.UP, proxy, "_onOjMouseUp");
                //}
            }
        },
        "_onDomOjKeyboardEvent" : function(evt){
            var proxy = OjElement.element(this);
            if(proxy && proxy._processEvent(evt)){
                proxy._onEvent(OjKeyboardEvent.convertDomEvent(evt));
            }
        },
        "_onDomOjFocusEvent" : function(evt){
            var proxy = OjElement.element(this);
            if(proxy && proxy._processEvent(evt)){
                proxy._onEvent(OjFocusEvent.convertDomEvent(evt));
            }
        },
        "_onDomScrollEvent" : function(evt){
            var proxy = OjElement.element(this);
            if(proxy && proxy._processEvent(evt)){
                proxy._onScroll(OjScrollEvent.convertDomEvent(evt));
            }
        },
        "_onDomTouchEvent" : function(evt){
            var proxy = OjElement.element(this);
            if(proxy && proxy._processEvent(evt)){
                return proxy._onTouch(OjTouchEvent.convertDomEvent(evt));
            }
            return true;
        },
        "_onDrag" : function(evt){
            var new_x = evt.pageX,
                new_y = evt.pageY;
            this.dispatchEvent(
                new OjDragEvent(
                    OjDragEvent.DRAG,
                    new_x - this._dragX,
                    new_y - this._dragY,
                    evt, false, false
                )
            );
            this._dragX = new_x;
            this._dragY = new_y;
        },
        "_onDragEnd" : function(evt){
            OJ.removeEventListener(OjUiEvent.MOVE, this, "_onDrag");
            OJ.removeEventListener(OjUiEvent.UP, this, "_onDragEnd");
            this.dispatchEvent(
                new OjDragEvent(
                    OjDragEvent.END,
                    evt.pageX - this._dragX,
                    evt.pageY - this._dragY,
                    evt, false, false
                )
            );
            this._dragX = this._dragY = null;
        },
        "_onDragStart" : function(evt){
            this._dragX = evt.pageX;
            this._dragY = evt.pageY;
            if(this.hasEventListener(OjDragEvent.DRAG)){
                OJ.addEventListener(OjUiEvent.MOVE, this, "_onDrag");
            }
            OJ.addEventListener(OjUiEvent.UP, this, "_onDragEnd");
            this.dispatchEvent(
                new OjDragEvent(OjDragEvent.START, 0, 0, evt, false, false)
            );
        },
        "_onEvent" : function(evt){
            this.dispatchEvent(evt);
            return false;
        },
//        "_onMouse" : function(evt){
//            var type = evt.getType(),
//                x = evt.getPageX(),
//                y = evt.getPageY(),
//                response = this._onEvent(evt);
//
//
////            if(type == OjUiEvent.UP && (!this._draggable || (this._dragX == x && this._dragY == y))){
////                print(this._draggable, this._dragX == x, this._dragY == y);
////                this._onEvent(new OjUiEvent(OjUiEvent.PRESS, evt.getBubbles(), evt.getCancelable(), x, y));
////            }
//
//            return response;
//        },
        "_onMoveTick" : function(evt){
            var page_x = this.pageX,
                page_y = this.pageY,
                delta_x = this._page_x - page_x,
                delta_y = this._page_y - page_y;
            if(delta_x || delta_y){
                this.dispatchEvent(new OjTransformEvent(OjTransformEvent.MOVE, page_x, page_y, delta_x, delta_y));
            }
            this._page_x = page_x;
            this._page_y = page_y;
        },
        "_onOjMouseUp" : function(evt){
            OJ.removeEventListener(OjUiEvent.UP, this, "_onOjMouseUp");
            if(this.hitTestPoint(evt.pageX, evt.pageY)){
                return;
            }
            this.dispatchEvent(evt);
        },
        "_onScroll" : function(evt){
            var x, y;
            // for native scroll events
            if(evt.is("OjScrollEvent")){
                if(this._prev_x == (x = evt.scrollX) && this._prev_y == (y = evt.scrollY)){
                    return;
                }
                this._prev_x = x;
                this._prev_y = y;
                return this._onEvent(evt);
            }
            // for touch scroll events
            if(this._prev_x == (x = this.scrollX) && this._prev_y == (y = this.scrollY)){
                return;
            }
            return this._onEvent(
                new OjScrollEvent(OjScrollEvent.SCROLL, this._prev_x = x, this._prev_y = y)
            );
        },
        "_onTouch" : function(evt){
            var type = evt.type,
                x = evt.pageX,
                y = evt.pageY;
            if(type == OjTouchEvent.END){
                type = OjUiEvent.UP;
            }
            else if(type == OjTouchEvent.START){
                type = OjUiEvent.DOWN;
                this._dragX = x;
                this._dragY = y;
            }
            else if(type == OjTouchEvent.MOVE){
                type = OjUiEvent.MOVE;
            }
            if(type){
                this._onEvent(new OjUiEvent(type, x, y, true, true));
                // if the touch hasn"t moved then issue a click event
                if(type == OjUiEvent.UP && !this.hasEventListener(OjDragEvent.START) && this.hitTestPoint(x, y)){
                    this._dragX = this._dragY = null;
                }
            }
            return true;
        },

        // event listener overrides
        // customize this functionality for dom events so that they work
        "_cleanupHammer" : function(){
            var self = this,
                hammer = self._hammer;
            if(hammer){
                hammer.destroy();
                self._hammer = null;
            }
        },
        "_newHammer" : function(settings){
            settings = settings || {};
            settings.preset = [];
            return propagating(new Hammer(this._getEventProxy(), settings));
        },
        "_setupHammer" : function(){
            var self = this,
                ui = OjUiEvent,
                map = {
                    "doubletap" : ui.DOUBLE_PRESS,
                    "pressup" : ui.PRESS,
                    "tap" : ui.PRESS
                },
                settings = {
                    "recognizers": [
                        [Hammer.Press],
                        [Hammer.Tap],
                        [Hammer.Tap, {
                            "event": "doubletap", "taps": 2, "interval": 300, "pointers": 1, "posThreshold": 10,
                            "threshold": 2, "time": 250
                        }, "tap" ]
                    ]
                };
            if(!self._hammer){
                if(["input", "textarea"].indexOf(self.dom.tagName.toLowerCase()) > -1){
                    settings["cssProps"] = {};
                }
                self._hammer = self._newHammer(settings);
                self._hammer.on(
                    "tap doubletap pressup",
                    function(evt){
                        var type = evt.type,
                            prev_tap = self._hammer.prev_tap,
                            new_evt = ui.convertDomEvent(evt.srcEvent);
                        new_evt._type = map[type];
                        
                        evt.stopPropagation();
                        if(type == "tap"){
                            self._hammer.prev_tap = new Date();
                        }
                        else if(type == "pressup" && prev_tap){
                            self._hammer.prev_tap = null;
                            return;
                        }
                        self._onEvent(new_evt);
                    }
                );
            }
            return self._hammer;
        },
        "_updateTouchStartListeners" : function(){
            if(!this.hasEventListeners(OjUiEvent.DOWN, OjUiEvent.PRESS, OjDragEvent.START, OjDragEvent.DRAG, OjDragEvent.END)){
                this._getEventProxy().ontouchstart = null;
            }
        },
        "_updateTouchMoveListeners" : function(){
            if(!this.hasEventListeners(OjUiEvent.MOVE, OjDragEvent.START, OjDragEvent.DRAG, OjDragEvent.END)){//}, OjScrollEvent.SCROLL)){
                this._getEventProxy().ontouchmove = null;
            }
        },
        "_updateTouchEndListeners" : function(){
            if(!this.hasEventListeners(OjUiEvent.UP, OjUiEvent.UP_OUTSIDE, OjUiEvent.PRESS, OjDragEvent.END)){
                var proxy = this._getEventProxy();
                proxy.ontouchcancel = proxy.ontouchend = proxy.ontouchleave = null;
            }
        },
        "addEventListener" : function(type){
            var self = this,
                is_touch = OJ.is_touch_capable,
                proxy = self._getEventProxy(),
                hammer = self._setupHammer();
            self._super(OjElement, "addEventListener", arguments);
            if(type == OjScrollEvent.SCROLL){
                self._scrollable = true;
                proxy.onscroll = self._onDomScrollEvent;
//                if(is_touch){
//                    proxy.ontouchmove = this._onDomTouchEvent;
//                }
            }
            // mouse events
            else if(type == OjUiEvent.PRESS){
                if(!hammer.get("tap")){
                    hammer.add( new Hammer.Tap({ event: "tap" }) );
                }
            }
            else if(type == OjUiEvent.DOUBLE_PRESS){
                if(!hammer.get("doubletap")){
                    hammer.add( new Hammer.Tap({ event: "doubletap" }) );
                }
            }
            else if(type == OjUiEvent.DOWN){
                if(is_touch){
                    proxy.ontouchstart = self._onDomTouchEvent;
                }
                else{
                    proxy.onmousedown = self._onDomOjUiEvent;
                }
            }
            else if(type == OjUiEvent.LONG_PRESS){
                if(!hammer.get("press")){
                    hammer.add( new Hammer.Tap({ event: "press" }) );
                }
            }
            else if(type == OjUiEvent.MOVE){
                if(is_touch){
                    proxy.ontouchmove = self._onDomTouchEvent;
                }
                else{
                    proxy.onmousemove = self._onDomOjUiEvent;
                }
            }
            else if(type == OjUiEvent.OUT){
                proxy.onmouseout = self._onDomOjUiEvent;
            }
            else if(type == OjUiEvent.OVER){
                proxy.onmouseover = self._onDomOjUiEvent;
            }
            else if(type == OjUiEvent.UP){
                if(is_touch){
                    proxy.ontouchcancel = proxy.ontouchend = proxy.ontouchleave = self._onDomTouchEvent;
                }
                else{
                    proxy.onmouseup = self._onDomOjUiEvent;
                    proxy.oncontextmenu = self._onDomOjUiEvent;
                }
            }
            else if(type == OjUiEvent.UP_OUTSIDE){
                if(is_touch){
                    proxy.ontouchcancel = proxy.ontouchend = proxy.ontouchleave = self._onDomTouchEvent;
                }
                else{
                    proxy.onmousedown = self._onDomOjUiEvent;
                }
            }
            // drag events
            else if(OjDragEvent.isDragEvent(type)){
                self._draggable = true;
//
//                if(is_touch){
//                    proxy.ontouchstart = proxy.ontouchmove = proxy.ontouchend = this._onDomTouchEvent;
//                }
//                else{
//                    proxy.onmousedown = this._onDomOjUiEvent;
//                }
                self.addEventListener(OjUiEvent.DOWN, self, "_onDragStart");
            }
            // keyboard events
            else if(type == OjKeyboardEvent.DOWN){
                proxy.onkeydown = self._onDomOjKeyboardEvent;
            }
            else if(type == OjKeyboardEvent.PRESS){
                proxy.onkeypress = self._onDomOjKeyboardEvent;
            }
            else if(type == OjKeyboardEvent.UP){
                proxy.onkeyup = self._onDomOjKeyboardEvent;
            }
            // focus events
            else if(type == OjFocusEvent.IN){
                proxy.onfocus = self._onDomOjFocusEvent;
                //proxy.onfocusin = self._onDomOjFocusEvent;
            }
            else if(type == OjFocusEvent.OUT){
                proxy.onblur = self._onDomOjFocusEvent;
            }
            // transform events
            else if(type == OjTransformEvent.MOVE){
                if(!self._move_timer){
                    self._move_timer = new OjTimer(250, 0);
                    self._move_timer.addEventListener(OjTimer.TICK, self, "_onMoveTick");
                    self._page_x = self.pageX;
                    self._page_y = self.pageY;
                    self._move_timer.start();
                }
            }
            else if(type == OjTransformEvent.RESIZE && self._proxy != document.body){
                proxy.onresize = self._onOjDomEvent;
            }
            // misc dom events
            else if(type == OjDomEvent.CHANGE){
                proxy.onchange = self._onOjDomEvent;
            }
        },
        "addGestureRecognizer" : function(recognizer){
            recognizer._add(this._setupHammer());
        },
        "removeEventListener" : function(type, context, callback){
            var proxy = this._getEventProxy();
            this._super(OjElement, "removeEventListener", arguments);
            // scroll events
            if(type == OjScrollEvent.SCROLL){
                if(!this.hasEventListener(OjScrollEvent.SCROLL)){
                    this._scrollable = false;
                    proxy.onscroll = null;
//                    this._updateTouchMoveListeners();
                }
            }
            // mouse events
            else if(type == OjUiEvent.PRESS){
                if(!this.hasEventListener(OjUiEvent.PRESS)){
                    proxy.onclick = null;
                    this._updateTouchStartListeners();
                    this._updateTouchEndListeners();
                }
            }
            else if(type == OjUiEvent.DOUBLE_PRESS){
                if(!this.hasEventListener(OjUiEvent.DOUBLE_PRESS)){
                    proxy.ondblclick = null;
                    this._updateTouchStartListeners();
                    this._updateTouchEndListeners();
                }
            }
            else if(type == OjUiEvent.DOWN){
                if(!this.hasEventListeners(OjUiEvent.DOWN, OjUiEvent.UP_OUTSIDE, OjDragEvent.DRAG)){
                    proxy.onmousedown = null;
                    this._updateTouchStartListeners();
                }
            }
            else if(type == OjUiEvent.MOVE){
                if(!this.hasEventListener(OjUiEvent.MOVE)){
                    proxy.onmousemove = null;
                    this._updateTouchMoveListeners();
                }
            }
            else if(type == OjUiEvent.OUT){
                if(!this.hasEventListener(OjUiEvent.OUT)){
                    proxy.onmouseout = null;
                }
            }
            else if(type == OjUiEvent.OVER){
                if(!this.hasEventListener(OjUiEvent.OVER)){
                    proxy.onmouseover = null;
                }
            }
            else if(type == OjUiEvent.UP){
                if(!this.hasEventListener(OjUiEvent.UP)){
                    proxy.onmouseup = null;
                    proxy.oncontextmenu = null;
                    this._updateTouchEndListeners();
                }
            }
            else if(type == OjUiEvent.UP_OUTSIDE){
                if(!this.hasEventListener(OjUiEvent.DOWN)){
                    proxy.onmousedown = null;
                    OJ.removeEventListener(OjUiEvent.UP, proxy, "_onOjMouseUp");
                    this._updateTouchEndListeners();
                }
            }
            // drag events
            else if(OjDragEvent.isDragEvent(type)){
                if(!this.hasEventListeners(OjDragEvent.DRAG, OjDragEvent.END, OjDragEvent.START)){
                    this._draggable = false;
                    this.removeEventListener(OjUiEvent.DOWN, this, "_onDragStart");
                    OJ.removeEventListener(OjUiEvent.MOVE, this, "_onDrag");
                    OJ.removeEventListener(OjUiEvent.UP, this, "_onDragEnd");
                }
            }
            // keyboard events
            else if(type == OjKeyboardEvent.DOWN){
                if(!this.hasEventListener(OjKeyboardEvent.DOWN)){
                    proxy.onkeydown = null;
                }
            }
            else if(type == OjKeyboardEvent.PRESS){
                if(!this.hasEventListener(OjKeyboardEvent.PRESS)){
                    proxy.onkeypress = null;
                }
            }
            else if(type == OjKeyboardEvent.UP){
                if(!this.hasEventListener(OjKeyboardEvent.UP)){
                    proxy.onkeyup = null;
                }
            }
            // focus events
            else if(type == OjFocusEvent.IN){
                if(!this.hasEventListener(OjFocusEvent.IN)){
                    proxy.onfocus = null;
                }
            }
            else if(type == OjFocusEvent.OUT){
                if(!this.hasEventListener(OjFocusEvent.OUT)){
                    proxy.onblur = null;
                }
            }
            // transform event
            else if(type == OjTransformEvent.MOVE){
                if(!this.hasEventListener(OjTransformEvent.MOVE)){
                    this._unset("_move_timer");
                }
            }
            else if(type == OjTransformEvent.RESIZE){
                if(!this.hasEventListener(OjTransformEvent.RESIZE)){
                    proxy.onresize = null;
                }
            }
            // misc dom events
            else if(type == OjDomEvent.CHANGE){
                if(!this.hasEventListener(OjDomEvent.CHANGE)){
                    proxy.onchange = null;
                }
            }
        },
        "removeGestureRecognizer" : function(recognizer){
            recognizer._remove(this._setupHammer())
        },

        // Child Management Functions
        "appendChild" : function(child){
            return this.insertChildAt(child, this.num_children);
        },
        "insertChildAt" : function(child, index){
            var dom = this.dom;
            if(!child){
                return child;
            }
            if(index >= this.num_children){
                dom.appendChild(child.dom);
            }
            else{
                dom.insertBefore(child.dom, dom.childNodes[index]);
            }
            // update the display state
            child._setIsDisplayed(this._is_displayed);
            return child;
        },
        "forChild" : function(callback, complete, context){
            var self = this,
                ln = self.num_children,
                i = 0;
            context = context || self;
            for(; i < ln; i++){
                if(callback.call(context, self.getChildAt(i), i) === false){
                    break;
                }
            }
            if(complete){
                complete.call(context);
            }
        },
        "forChildReverse" : function(callback, complete, context){
            var self = this,
                ln = self.num_children;
            context = context || self;
            for(; ln--;){
                if(callback.call(context, self.getChildAt(ln), ln) == false){
                    break;
                }
            }
            if(complete){
                complete.call(context);
            }
        },
        "getChildAt" : function(index){
            return OjElement.element(this.dom.childNodes[index]);
        },
        "indexOfChild" : function(child){
            return Array.array(this.dom.childNodes).indexOf(child.dom);
        },
        "hasChild" : function(child){
            return child.parent == this;
        },
        "moveChild" : function(child, index){
            if(this.hasChild(child)){
                this.dom.insertBefore(child.dom, this.getChildAt(index).dom);
                return child;
            }
            // throw an error here
        },
        "prependChild" : function(child){
            return this.insertChildAt(child, 0);
        },
        "removeAllChildren" : function(){
            var ln = this.num_children,
                ary = [];
            for(; ln--;){
                ary.unshift(this.removeChildAt(ln));
            }
            return ary;
        },
        "removeChild" : function(child){
            if(child){
                // this will help exclude text elements
                if(child.is(OjStyleElement)){
                    try{
                        this.dom.removeChild(child.dom);
                    }
                    catch(e){
                        // we don't really care if the child couldn't be removed. it"s cheaper than checking every time
                    }
                }
                child._setIsDisplayed(false);
            }
            return child;
        },
        "removeChildAt" : function(index){
            if(index < 0 || index >= this.num_children){
                return null;
            }
            return this.removeChild(this.getChildAt(index));
        },
        "removeChildren" : function(children){
            var ln = children.length;
            for(; ln--;){
                this.removeChild(children[ln]);
            }
        },
        "replaceChild" : function(target, replacement){
            return this.replaceChildAt(replacement, this.indexOfChild(target));
        },
        "replaceChildAt" : function(child, index){
            var rtrn;
            if(index >= this.num_children){
                this.appendChild(child);
            }
            else{
                rtrn = this.removeChildAt(index);
                this.insertChildAt(child, index);
            }
            return rtrn;
        },

        ".children" : function(){
            var ary = [],
                ln = this.num_children;
            for(; ln--;){
                ary.unshift(this.getChildAt(ln));
            }
            return ary;
        },
        "=children" : function(children){
            this.removeAllChildren();
            var i = 0,
                ln = children.length;
            for(; i < ln; i++){
                this.appendChild(children[i]);
            }
        },
        ".num_children" : function(){
            return this.dom.childNodes.length;
        },

        // misc functions
        "blur" : function(){
            if(isFunction(this._dom.blur)){
                this._dom.blur();
            }
        },
        "find" : function(query){
            if(isElement(query)){
                query = "#" + query.id;
            }
            return OJ.query(query, this._dom);
        },
        "focus" : function(){
            if(isFunction(this._dom.focus)){
                this._dom.focus();
            }
        },
        "hide" : function(should){
            if(should === false){
                this.show();
            }
            else{
                this.addCss(["hidden"]);
                this.dispatchEvent(new OjEvent(OjEvent.HIDE));
            }
        },
        ".isVisible" : function(){
            var self = this;
            return self._getStyle("display") != OjStyleElement.NONE &&
                   self._getStyle("visibility") != "hidden" &&
                   self.alpha > 0 && self.width > 0 && self.height > 0;
        },
        "show" : function(should){
            if(should === false){
                this.hide();
            }
            else{
                this.removeCss("hidden");
                this.dispatchEvent(new OjEvent(OjEvent.SHOW));
            }
        },

        // single style getter & setter functions
        "_getStyleBackup" : function(style){
            return this._proxy.style[style];
        },
        "_getStyleIe" : function(style){
            return this._proxy.currentStyle[style];
        },
        "_getStyle" : function(style){
            return document.defaultView.getComputedStyle(this._proxy, null)[style];
        },
        "_setStyle" : function(style, value){
            return this._proxy.style[style] = value;
        },
        "_setStyleColor" : function(style, value){
            if(value){
                if(isString(value) && value.charAt(0) == "#"){
                    value = hexToRgb(value);
                }
                if(isArray(value)){
                    value = "rgb" + (value.length > 3 ? "a(" : "(") + value.join(",") + ")";
                }
            }
            return this._setStyle(style, value);
        },

        "_getStyleNumber" : function(prop){
            var val = this._getStyle(prop);
            if(!val || val == OjStyleElement.NONE){
                return 0;
            }
            return parseFloat(val.replaceAll(["px", "%", "pt", "em"], ""));
        },
        "_setStyleNumber" : function(prop, val/*, unit*/){
            var args = arguments;
            this._setStyle(
                prop,
                isSet(val) ? val + (args.length > 2 ? args[2] : this._getStyleUnit(prop)) : null
            );
        },
        // Bulk Style Getter & Setter Functions
        "_getStyler" : function(prop, args){
            var unit = prop == "font" || prop == "line" ? OJ.font_unit : OJ.dim_unit;
            if(!this["_" + prop]){
                this["_" + prop] = [
                    this._getStyle(prop + "Top").replaceAll(unit, ""),
                    this._getStyle(prop + "Right").replaceAll(unit, ""),
                    this._getStyle(prop + "Bottom").replaceAll(unit, ""),
                    this._getStyle(prop + "Left").replaceAll(unit, "")
                ];
            }
            return args && args.length ? this["_" + prop][args[0]] : this["_" + prop];
        },
        "_setStyler" : function(prop, vals){
            var str = "",
                ln = vals.length,
                val = vals[0],
                unit = this._getStyleUnit(prop);
            this._getStyler(prop);
            // fill out the vals array so that there is always the 4 values
            if(ln == 1){
                vals = [val, val, val, val];
            }
            else if(ln == 2){
                vals = [val, vals[1], val, vals[1]];
            }
            else if(ln == 3){
                vals = [val, vals[1], vals[2], vals[1]];
            }
            // substitute current values for null values
            for(ln = 4; ln--;){
                val = vals[ln];
                if(isNull(val)){
                    val = this["_" + prop][ln];
                }
                str = (ln ? " " : "") + val + unit + str;
            }
            this._setStyle(prop, str);
        },
        "_getStyleUnit" : function(prop){
            prop = prop.substr(0, 4);
            if(prop == "font" || prop == "line"){
                return OJ.font_unit;
            }
            return OJ.dim_unit;
        },

        // Attribute Getter & Setter Functions
        "attr" : function(key, val){
            var proxy = this._proxy;
            // process the key incase its an attribute object
            if(isObject(key)){
                key = key.nodeName;
            }
            if(!isUndefined(val)){
                if(isSet(val)){
                    // if the value is set (not null) then update attribute value
                    if(isSet(val)){
                        proxy.setAttribute(key, val);
                    }
                    // otherwise remove
                    else{
                        proxy.removeAttribute(key);
                    }
                }
            }
            // read the attribute value
            return proxy.getAttribute(key);
        },
        
        ".id" : function(){
            return this._id || this.oj_id;
        },
        "=id" : function(val){
            if(this._id == val){
                return
            }
            // unregister the old id
            OjElement.unregister(this);
            (this._proxy || {}).ojProxy = (this.dom || {}).id = this._id = val;
            // register the new id
            OjElement.register(this);
        },
        // Content Getter & Setter Functions
        ".text" : function(){
            return this.dom.innerHTML;
        },
        "=text" : function(str){
            this.removeAllChildren();
            this.dom.innerHTML = String.string(str).html();
            // we may want to process this html, just a thought
        },
        // Css Functions
        "_makeCssList" : function(args){
            if(isArray(args[0])){
                return args[0];
            }
            var ln = args.length,
                list = [];
            for(; ln--;){
                list = list.concat(args[ln].trim().split(" "));
            }
            return list;
        },
        "_processCssList" : function(args, action){
            var css = this.css_list,
                list = this._makeCssList(args),
                ln = list.length,
                cls, index;
            for(; ln--;){
                index = css.indexOf(cls = list[ln]);
                if(index == -1){
                    switch(action){
                        case "has":
                            return false;
                        case "add":
                        case "toggle":
                            css.append(cls);
                    }
                }
                else{
                    switch(action){
                        case "remove":
                        case "toggle":
                            css.removeAt(index);
                    }
                }
            }
            if(action == "has"){
                return true;
            }
            return this.css = css;
        },
        "addCss" : function(css/*...css | array*/){
            return this._processCssList(arguments, "add");
        },
        ".css" : function(){
            return this._proxy.className.trim();
        },
        ".css_list" : function(){
            return this.css.split(" ");
        },
        "hasCss" : function(css/*...css | array*/){
            return this._processCssList(arguments, "has");
        },
        "removeCss" : function(css/*... css | array*/){
            return this._processCssList(arguments, "remove");
        },
        "=css" : function(css){
            return this._proxy.className = (isArray(css) ? css.join(" ") : css).trim();
        },
        "swapCss" : function(target, replacement){
            this.removeCss(target);
            this.addCss(replacement);
        },
        "toggleCss" : function(css/*...css | array*/){
            return this._processCssList(arguments, "toggle");
        },
        // Focus Functions
        "hasFocus" : function(){
            return this._dom.hasFocus;
        },
        "hitTest" : function(elm, local){
            return this.hitTestRect(elm.rect);
        },
        "hitTestRect" : function(rect, local){
            return (local ? this.rect : this.page_rect).hitTestRect(rect);
        },
        "hitTestPoint" : function(x, y, local){
            return (local ? this.rect : this.page_rect).hitTestPoint(x, y);
        },
        "localPoint" : function(global_point){
            // todo: add localPoint functionality
        },
        "localX" : function(global_x){
            return global_x - this.pageX;
        },
        "localY" : function(global_y){
            return global_y - this.pageY;
        },

        // Dimensional Getter & Setter Functions
        // TODO:
        // 1) factor in border into sizing
        // 2) handle non-metric values such as auto and %
        ".innerWidth" : function(){
            return this.width - this.getPaddingLeft() - this.getPaddingRight();
        },
        "=innerWidth" : function(w){
            this._setWidth(Math.round(w) + OJ.dim_unit);
        },
        ".outerWidth" : function(){
            return this.width + this.getMarginLeft() + Math.abs(this.getMarginRight());
        },
        "=outerWidth" : function(w){
            this.innerWidth = w - this.getPaddingLeft() - this.getPaddingRight() - this.getMarginLeft() - Math.abs(this.getMarginRight());
        },
        ".width" : function(/*unit=px*/){
            var unit = arguments.length ? arguments[0] : null;
            if(unit == OjStyleElement.PERCENT){
                var parent = this._proxy.offsetParent || this._proxy;
                return (this._proxy.offsetWidth / parent.offsetWidth) * 100;
            }
            return this._proxy.offsetWidth || this._getStyleNumber("width");
        },
        "_setWidth" : function(val){
            this._setStyle("width", val);
        },
        "=width" : function(val){
            var args = isArray(val) ? val : [val],
                w = args[0];
            if(w == OjStyleElement.AUTO || !isSet(w)){
                this._setWidth(null);
            }
            else if(args.length > 1){
                this._setWidth(args.join(""));
            }
            else{
                this.innerWidth = w - this.getPaddingLeft() - this.getPaddingRight();
            }
        },
        //".minWidth" : function(){
        //    return isNull(this._min_width) ? this._min_width = this._getStyleNumber("minWidth") : this._min_width;
        //},
        //"=minWidth" : function(min){
        //    this._setStyleNumber("minWidth", this._min_width = min);
        //},
        //
        //".maxWidth" : function(){
        //    return isNull(this._max_width) ? this._max_width = this._getStyleNumber("maxWidth") : this._max_width;
        //},
        //"=maxWidth" : function(max){
        //    this._setStyleNumber("maxWidth", this._max_width = max);
        //},
        ".innerHeight" : function(){
            return this.height - this.getPaddingTop() - this.getPaddingBottom();
        },
        "=innerHeight" : function(h){
            this._setHeight(Math.round(h) + OJ.dim_unit);
        },
        ".outerHeight" : function(){
            return this.height + this.getMarginTop() + Math.abs(this.getMarginBottom());
        },
        "=outerHeight" : function(h){
            this.innerHeight = h - this.getPaddingTop() - this.getPaddingBottom() - this.getMarginTop() - Math.abs(this.getMarginBottom());
        },
        ".height" : function(/*unit=px*/){
            var unit = arguments.length ? arguments[0] : null;
            if(unit == OjStyleElement.PERCENT){
                var parent = this._proxy.offsetParent || this._proxy;
                return (this._proxy.offsetHeight / parent.offsetHeight) * 100;
            }
            return this._proxy.offsetHeight || this._getStyleNumber("height");
        },
        "_setHeight" : function(val){
            this._setStyle("height", val);
        },
        "=height" : function(val){
            var args = isArray(val) ? val : [val],
                h = args[0];
            if(h == OjStyleElement.AUTO || !isSet(h)){
                this._setHeight(null);
            }
            else if(args.length > 1){
                this._setHeight(args.join(""));
            }
            else{
                this.innerHeight = h - this.getPaddingTop() - this.getPaddingBottom();
            }
        },
        //".minHeight" : function(){
        //    return isNull(this._min_height) ? this._min_height = this._getStyleNumber("minHeight") : this._min_height;
        //},
        //"=minHeight" : function(min){
        //    this._min_height = min;
        //
        //    this._setStyleNumber("minHeight", min);
        //},
        //
        //".maxHeight" : function(){
        //    return isNull(this._max_height) ? this._max_height = this._getStyleNumber("maxHeight") : this._max_height;
        //},
        //"=maxHeight" : function(max){
        //    this._max_height = max;
        //
        //    this._setStyleNumber("maxHeight", max);
        //},
        // Style Getter & Setter Functions
        ".x" : function(/*unit=px*/){
            var unit = arguments.length ? arguments[0] : null;
            if(unit == OjStyleElement.PERCENT){
                var parent = this._proxy.offsetParent || this._proxy;
                return (this._proxy.offsetLeft / parent.offsetWidth) * 100;
            }
            return this._proxy.offsetLeft;
        },
        ".pageX" : function(){
            if(this._proxy.getBoundingClientRect){
                return this._proxy.getBoundingClientRect().left;
            }
            // add backup solution
        },
        "=x" : function(val/*[val, unit=px]*/){
            var args = isArray(val) ? val : [val];
            this._setStyleNumber("left", args[0], args.length > 1 ? args[1] : OJ.dim_unit);
        },
        "=pageX" : function(val){
            this.x = this.parent.localX(val);
        },
        ".y" : function(/*unit=px*/){
            var unit = arguments.length ? arguments[0] : null;
            if(unit == OjStyleElement.PERCENT){
                var parent = this._proxy.offsetParent || this._proxy;
                return (this._proxy.offsetTop / parent.offsetHeight) * 100;
            }
            return this._proxy.offsetTop;
        },
        ".pageY" : function(){
            if(this._proxy.getBoundingClientRect){
                return this._proxy.getBoundingClientRect().top;
            }
            // add backup solution
        },
        "=y" : function(val/*[val, unit=px]*/){
            var args = isArray(val) ? val : [val];
            this._setStyleNumber("top", args[0], args.length > 1 ? args[1] : OJ.dim_unit);
        },
        "=pageY" : function(val){
            this.y = this.parent.localY(val);
        },
        ".alpha" : function(){
            return this._alpha;
        },
        "=alpha" : function(alpha){
            var old_alpha = this._alpha;
            if(old_alpha == alpha){
                return;
            }
            if((alpha = this._alpha = this._setStyle("opacity", alpha)) && old_alpha === 0){
//                this.dispatchEvent(new OjEvent(OjEvent.SHOW));
            }
            else if(!alpha){
//                this.dispatchEvent(new OjEvent(OjEvent.HIDE));
            }
        },
        ".background_color" : function(){
            return this._getStyle("background-color");
        },
        "=background_color" : function(color){
            this._setStyleColor("background-color", color);
        },
        ".depth" : function(){
            return this._depth;
        },
        "=depth" : function(depth){
            this._depth = this._setStyle("zIndex", depth);
        },
        ".overflow" : function(){
            return this._overflow;
        },
        "=overflow" : function(overflow){
            this._overflow = this._setStyle("overflow", overflow);
        },
        ".rect" : function(){
            return new OjRect(this.x, this.y, this.width, this.height);
        },
        "=rect" : function(rect){
            // add this later
        },
        ".page_rect" : function(){
            var self = this;
            return new OjRect(self.pageX, self.pageY, self.width, self.height);
        },
        "=page_rect" : function(rect){
            // todo: =page_rect
        },
        ".scrollHeight" : function(){
            return this._proxy.scrollHeight;
        },
        "=scrollHeight" : function(val){
            this._proxy.scrollHeight = val;
        },
        ".scrollWidth" : function(){
            return this._proxy.scrollWidth;
        },
        "=scrollWidth" : function(val){
            this._proxy.scrollWidth = val;
        },
        ".scrollX" : function(){
            return this._proxy.scrollLeft;
        },
        "=scrollX" : function(val){
            this._proxy.scrollLeft = val;
        },
        ".scrollY" : function(){
            return this._proxy.scrollTop;
        },
        "=scrollY" : function(val){
            this._proxy.scrollTop = val;
        },

        // alignment getter & setters
        "_getAlign" : function(type, dflt){
            var align = this.attr(type + "-align");
            return align ? align : dflt;
        },
        "_setAlign" : function(type, val, dflt){
            if(val == dflt){
                val = null;
            }
            this.attr(type + "-align", this["_" + type + "_align"] = val);
        },
        ".hAlign" : function(){
            return this._getAlign("h", OjStyleElement.LEFT);
        },
        "=hAlign" : function(val){
            return this._setAlign("h", val, OjStyleElement.LEFT);
        },
        ".vAlign" : function(){
            return this._getAlign("v", OjStyleElement.TOP);
        },
        "=vAlign" : function(val){
            return this._setAlign("v", val, OjStyleElement.TOP);
        },

        // Transform Setter & Getters
        "_updateTransform" : function(){
            var rotate = this._rotation ? "rotate(" + this._rotation + "deg) " : "",
                translate = this._translate ? this._translate.toString() : "",
                transform = rotate + (isEmpty(translate) ? "" : "translate(" + translate + ")"),
                prefix = OJ.css_prefix;
            if(prefix == "-moz-"){
                this._setStyle("MozTransform", transform);
            }
            else{
                this._setStyle(prefix + "transform", transform);
            }
            this._setStyle("transform", transform);
        },
        ".origin" : function(){
            return this._origin;
        },
        "=origin" : function(val){
            this._setStyle(OJ.css_prefix + "transform-origin", val);
            this._setStyle("transform-origin", this._origin = val);
        },
        ".rotation" : function(){
            return this._rotation;
        },
        "=rotation" : function(val){
            if(this._rotation == val){
                return;
            }
            this._rotation = val;
            this._updateTransform();
        },
        ".translate" : function(){
            return this._translate;
        },
        "=translate" : function(val){
            if(val.isEqualTo(this._translate)){
                return;
            }
            this._translate = val;
            this._updateTransform();
        }
    },
    {
        "COMPONENT_TAGS" : {},
        "STYLE_BACKUP" : "styleBackup",
        "STYLE_DEFAULT" : "styleDefault",
        "STYLE_IE" : "styleIE",
        "STYLE_MODE" : (function(){
            var elm = OjElement.elm("div");
            if(elm.currentStyle){
                return "styleIE";
            }
            if(!document.defaultView || !document.defaultView.getComputedStyle){
                return "styleBackup";
            }
            return "styleDefault";
        })(),
        "AUTO" : "auto",
        "BLOCK" : "block",
        "HIDDEN" : "hidden",
        "NONE" : "none",
        "SCROLL" : "scroll",
        "VISIBLE" : "visible",
        "LEFT" : "l",
        "CENTER" : "c",
        "RIGHT" : "r",
        "TOP" : "t",
        "MIDDLE" : "m",
        "BOTTOM" : "b",
        "PERCENT" : "%",
        "PX" : "px",
        "EM" : "em",

        "getTagComponent" : function(tag){
            return this.COMPONENT_TAGS[tag];
        },
        "isComponentTag" : function(tag){
            return isSet(this.COMPONENT_TAGS[tag]);
        },
        "registerComponentTag" : function(tag, component){
            this.COMPONENT_TAGS[tag] = component;
            if(OJ.browser == OJ.IE && OJ.browser_version.compareVersion("9.0.0") < 0){
                document.createElement(tag);
            }
        },
        "getStyle" : function(dom, style){
            if(this.STYLE_MODE == this.STYLE_IE){
                return dom.currentStyle[style];
            }
            if(this.STYLE_MODE == this.STYLE_BACKUP){
                return dom.style[style];
            }
            return document.defaultView.getComputedStyle(dom, null)[style];
        }
    }
);

OJ.extendClass(
    'OjTextElement', [OjElement],
    {
        '_props_' : {
            'text' : null
        },
        '_constructor' : function(/*text*/){
            var self = this,
                args = arguments,
                ln = args.length,
                is_dom = ln && isDomElement(args[0]);
            self._super(OjElement, '_constructor', is_dom ? [args[0]] : []);
            if(ln && !is_dom){
                self.text = args[0];
            }
        },
        '_setDom' : function(dom_elm){
            // force text dom elm
            if(dom_elm.nodeName != "#text"){
                dom_elm = document.createTextNode(dom_elm.innerText);
            }
            this._super(OjElement, '_setDom', [dom_elm]);
        },

        'appendText' : function(str){
            this.dom.nodeValue += str.toString();
        },
        'prependText' : function(str){
            this.dom.nodeValue = str.toString() + this.dom.nodeValue;
        },

        '.text' : function(){
            return this.dom.nodeValue;
        },
        '=text' : function(str){
            this.dom.nodeValue = String.string(str);
        }
    }
);

OJ.extendClass(
    "OjTimer", [OjActionable],
    {
        "_props_" : {
            "duration"    : null,
            "on_complete" : null,
            "on_tick" : null,
            "repeat_count" : null // run n additional times, negative value means run forever
        },
        "_get_props_" : {
            "count" : 0,
            "paused" : null,
            "running" : null,
            "state" : null,
            "stopped" : null
        },
        "_elapsed" : 0,

        "_constructor" : function(/*duration, repeat_count*/){
            var self = this;
            self._super(OjActionable, "_constructor", []);
            self._state = OjTimer.STOPPED;
            self._processArguments(arguments, {
                "duration" : 0,
                "repeat_count" : 1
            });
        },

        "_setupInterval" : function(){
            var self = this,
                intrvl = self._interval;
            if(intrvl){
                clearInterval(intrvl);
            }
            self._interval = setInterval(function(){ self._tick(); }, self.duration);
            self._updateLastTick();
        },
        "_tick" : function(){
            var self = this,
                on_complete = self.on_complete,
                on_tick = self.on_tick,
                repeat = self.repeat_count;
            self._updateLastTick();
            if(on_tick){
                on_tick(this);
            }
            self.dispatchEvent(new OjEvent(OjTimer.TICK));
            if(repeat > 0 && self._count++ == repeat){
                self.stop();
                if(on_complete){
                    on_complete(this);
                }
                self.dispatchEvent(new OjEvent(OjTimer.COMPLETE));
            }
        },
        "_updateLastTick" : function(){
            self._last_tick = new Date();
            self._elapsed = 0;
        },

        "pause" : function(){
            var self = this,
                last_tick = self._last_tick,
                intrvl = self._interval;
            self._elapsed = last_tick ? (new Date()).getTime() - last_tick.getTime() : 0;
            self._state = OjTimer.PAUSED;
            if(intrvl){
                // todo: there is an edge case where this could be a timeout from a partial resume. not sure what to do.
                clearInterval(intrvl);
                self._interval = null;
            }
        },
        "restart" : function(){
            this.stop();
            this.start();
        },
        "start" : function(){
            var self = this,
                elapsed = self._elapsed;
            if(!self._interval){
                self._elapsed = 0;
                self._state = OjTimer.RUNNING;
                // check to see if we have a partial we need to complete
                if(elapsed && elapsed < self.duration){
                    self._last_tick = new Date((new Date().getTime() - elapsed)); // post date the last tick
                    // run the last little bit of the tick
                    self._interval = setTimeout(
                        function(){
                            self._tick();
                            self._setupInterval();
                        },
                        self.duration - elapsed
                    );
                }
                else{
                    self._setupInterval();
                }
            }
        },
        "stop" : function(){
            var self = this;
            self.pause();
            self._count = 0;
            self._elapsed = 0;
            self._state = OjTimer.STOPPED;
        },

        "=duration" : function(duration){
            var self = this,
                intrvl;
            if(self._duration != duration){
                self._duration = Math.abs(duration);
                self._elapsed = 0;
                if(intrvl){
                    self._setupInterval();
                }
            }
        },
        ".paused" : function(){
            return this._state == OjTimer.PAUSED;
        },
        "=repeat_count" : function(repeat_count){
            var self = this;
            self._repeat_count = repeat_count = Math.max(repeat_count, 0);
            if(repeat_count >= self.count && self.running){
                self.stop();
                self.dispatchEvent(new OjEvent(OjTimer.COMPLETE));
            }
        },
        ".running" : function(){
            return this._state == OjTimer.RUNNING;
        },
        ".stopped" : function(){
            return this._state == OjTimer.STOPPED;
        }
    },
    {
        "TICK"     : "onTimerTick",
        "COMPLETE" : "onTimerComplete",
        "PAUSED"   : "paused",
        "RUNNING"  : "running",
        "STOPPED"  : "stopped",

        "SECOND"   : 1000,
        "MINUTE"   : 60000,
        "HOUR"     : 3600000,
        "DAY"      : 86400000,

        "cancel" : function(id){
            clearTimeout(id);
            return null;
        },
        
        "delay" : function(callback, duration, id){
            var self = this;
            if(id){
                self.cancel(id);
            }
            return setTimeout(callback, duration);
        }
    }
);

// TODO: make History Manager an extension of OjArray
OJ.extendManager(
    "HistoryManager", "OjHistoryManager", [OjActionable],
    {
        "_previous" : null,  "_next" : null,  "_current" : 0,  "_native" : false,  "_timer" : 0,
        "_ignore_next" : false,  "_list" : null,

        "PREVIOUS"  : "previous",
        "NEXT"      : "next",
        "FORWARD"   : "historyForward",
        "BACK"      : "historyBack",
        "CHANGE"    : "historyChange",

        "_constructor" : function(){
            this._super(OjActionable, "_constructor", []);
            this._list = [new OjUrl(window.location.href)];
            try{
                var prev = window.history.previous;
                this._native = true;
                prev = null;
            }
            catch(e){}
            if("onhashchange" in window){
                // Add listener for url change
                window.onhashchange = function(evt){
                    HistoryManager._onChange(evt)
                };
            }
            else{
                // Add timer to listener for url change
                this._timer = new OjTimer(1000, 0);
                this._timer.addEventListener(OjTimer.TICK, HistoryManager, "_onChange");
                this._timer.start();
            }
        },
        "_destructor" : function(){
            OJ.destroy(this._timer);
            return this._super(OjActionable, "_destructor", arguments);
        },

        "_onChange" : function(){
            var old_url = HistoryManager.get();
            // check to see if the url has changed
            if(old_url.toString() != window.location.href){
                var new_url = new OjUrl(window.location.href);
                // check to see if the url change was page driven or browser driven
                // < 0 browser driven
                // > -1 page driven
                if(OJ.depth < 0){
                    // check for a back button click
                    if(new_url.toString() == this.get(-1).toString()){
                        this._current--;
                    }
                    // check for a forward button click
                    else if(new_url.toString() == this.get(this._current + 1).toString()){
                        this._current++;
                    }
                    // we assume that if it wasn't a forward or a back button click that we know of then it is a back button click we did not know about
                    // therefore we make an adjustment to our history list and current positioning
                    else{
                        this._current = 0;
                        this._list.unshift(new_url);
                    }
                }
                else{
                    if(this._current == 0){
                        this._list = [this._list[0]];
                    }
                    else{
                        this._list = this._list.slice(0, this._current + 1);
                    }
                    this._list.append(new_url);
                    this._current = this._list.length - 1;
                }
                this._previous = this.get(-1);
                this._next = this.get(this._current + 1);
                this._dispatchChange(old_url, new_url);
            }
        },
        "_dispatchChange" : function(old_url, new_url){
            this.dispatchEvent(new OjEvent(HistoryManager.CHANGE, true));
        },

        "get" : function(){
            var url, index = arguments.length ? arguments[0] : this._current;
            if(this._native){
                if(window.history[index]){
                    return new OjUrl(window.history[index]);
                }
                url = this._list[index];
            }
            else if(index < 0){
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
            if(this._native){
                window.history.go(val);
                return;
            }
            var url;
            if(isNaN(index)){
                var ln = this._list.length;
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
        },
        "forward" : function(){
            if(this._native){
                window.history.forward();
                return;
            }
            OJ.load(this.get(this._current + 1));
        },
        "back" : function(){
            if(this._native){
                window.history.back();
                return;
            }
            OJ.load(this.get(this._current - 1));
        },
        "length" : function(){
            return this._list.length;
        },
        "reload" : function(){
            window.location.reload(true);
        }
    }
);

// t = time, o = origin, d = delta, l = length
window.OjEasing = {
    'NONE' : function(t, o, d, l){
        return ((d * t) / l) + o;
    },
    'IN' : function(t, o, d, l){
        return (-d * Math.cos((t / l) * (Math.PI / 2))) + d + o;
    },
    'OUT' : function(t, o, d, l){
        return (d * Math.sin((t / l) * (Math.PI / 2))) + o;
    },
    'IN_OUT' : function(t, o, d, l){
        return ((-d / 2) * (Math.cos((Math.PI * t) / l) - 1)) + o;
    },
    'STRONG_IN' : function(t, o, d, l){
        return (t == 0) ? o : d * Math.pow(2, 10 * ((t / l) - 1)) + o;
    },
    'STRONG_OUT' : function(t, o, d, l){
        return (t == l) ? o + d : d * (-Math.pow(2, -10 * (t / l)) + 1) + o;
    },
    'STRONG_IN_OUT' : function(t, o, d, l){
        if(t == 0){ return o; }
        if(t == l){ return o + d; }
        t = t / (l / 2);
        if(t < 1){ return (d / 2) * Math.pow(2, 10 * (t - 1)) + o; }
        return (d / 2) * (-Math.pow(2, -10 * --t) + 2) + o;
    },
    'ELASTIC_IN' : function(t, o, d, l, a, p){
        if(t == 0){ return o; }
        t = t / l;
        if(t == 1){ return o + d; }
        if(!p){ p = l * .3; }
        var s;
        if(!a || a < Math.abs(d)){
            a = d;
            s = p / 4;
        }
        else{
            s = (p / (2 * Math.PI)) * Math.asin(d / a);
        }
        return (-(a * Math.pow(2, 10 * (t -= 1)) * Math.sin(((t * l) - s) * (2 * Math.PI) / p))) + d;
    },
    'ELASTIC_OUT' : function(t, o, d, l, a, p){
        if(t == 0){ return o; }
        t = t / l;
        if(t == 1){ return o + d; }
        if(!p){ p = l * .3; }
        var s;
        if(!a || a < Math.abs(d)){
            a = d;
            s = p / 4;
        }
        else{
            s = (p / (2 * Math.PI)) * Math.asin(d / a);
        }
        return (a * Math.pow(2, -10 * t) * Math.sin((t * l - s) * (2 * Math.PI) / p) + d + o);
    },
    'ELASTIC_IN_OUT' : function(t, o, d, l, a, p){
        if(t == 0){ return o; }
        t = t / (l / 2);
        if(t == 2){ return o + d; }
        if(!p){ p = l * (.3 * 1.5); }
        var s;
        if(!a || a < Math.abs(d)){
            a = d;
            s = p / 4;
        }
        else{
            s = (p / (2 * Math.PI)) * Math.asin(d / a);
        }
        if(t < 1){ return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * l - s) * (2 * Math.PI) / p)) + o; }
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * l - s) * (2 * Math.PI) / p) * .5 + d + o;
    }
};


OJ.extendClass(
    'OjTweenEvent', [OjEvent],
    {
        '_get_props_' : {
            'progress' : 0,
            'value'    : 0
        },

        '_constructor' : function(type, value, progress/*, bubbles = false, cancelable = false*/){
            var progress = 0,
                bubbles = false,
                cancelable = false,
                args = arguments,
                ln = args.length;
            this._value = value;
            this._progress = progress;
            if(ln > 3){
                bubbles = args[3];
                if(ln > 4){
                    cancelable = args[4];
                }
            }
            this._super(OjEvent, '_constructor', [type, bubbles, cancelable]);
        }
    },
    {
        'TICK'     : 'onTweenTick',
        'COMPLETE' : 'onTweenComplete'
    }
);

// normalize browser diff on requestAnimationFrame function
(function(){
    var vendors = ['o', 'ms', 'webkit', 'moz'],
        ln = vendors.length,
        vendor;
    for(; ln-- && !window.requestAnimationFrame;){
        vendor = vendors[ln];
        window.requestAnimationFrame = window[vendor + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendor + 'CancelAnimationFrame'] || window[vendor + 'CancelRequestAnimationFrame'];
    }
})();

OJ.extendClass(
    'OjTween', [OjActionable],
    {
        '_props_' : {
            'duration' : null,
            'easing' : null,
            'from' : null,
            'quality' : 60,  // frame rate
            'to' : null
        },
//      '_animationFrame': null,  '_onAnimationFrame': null,  '_start': null,  '_timer': null,
        '_delta' : 0, '_progress' : 0,

        '_constructor' : function(/*from = null, to = null, duration = 500, easing = NONE*/){
            this._super(OjActionable, '_constructor', []);
            this._processArguments(arguments, {
                'from' : undefined,
                'to' : undefined,
                'duration' : 250,
                'easing' : OjEasing.NONE
            });
            this._onAnimationFrame = this._onTick.bind(this);
        },

        '_destructor' : function(){
            this.stop();
            this._unset(['_timer', '_onAnimationFrame']);
            return this._super(OjActionable, '_destructor', arguments);
        },

        '_calculateDelta' : function(){
            this._delta = this._to - this._from;
        },
        '_tick' : function(time){
            this.dispatchEvent(
                new OjTweenEvent(
                    OjTweenEvent.TICK, // type
                    this._easing(time, this._from, this._delta, this._duration, 0, 0), // value
                    time / this._duration // progress
                )
            );
        },

        '_onTick' : function(evt){
            var time = Math.min(Date.now() - this._start, this._duration);
            this._tick(time);
            if(time == this._duration){
                this.stop();
                this._onComplete(evt);
            }
            else if(this._animationFrame){
                this._animationFrame = window.requestAnimationFrame(this._onAnimationFrame);
            }
        },
        '_onComplete' : function(evt){
            this.dispatchEvent(new OjTweenEvent(OjTweenEvent.COMPLETE, this._to, 1));
        },

        'start' : function(){
            // make sure we have what we need to get started
            if(isUnset(this._from) || isUnset(this._to)){
                return;
            }
            this._calculateDelta();
            this._start = Date.now() - this._progress;
            // only create the time once
            if(OjTween.USE_RAF){
                this._animationFrame = window.requestAnimationFrame(this._onAnimationFrame);
            }
            else{
                this._interval = setInterval(this._onAnimationFrame, 1000 / this._quality);
            }
        },
        'pause' : function(){
            if(this._animationFrame){
                window.cancelAnimationFrame(this._animationFrame);
                return this._animationFrame = null;
            }
            this._interval = clearInterval(this._interval);
            this._progress = Date.now() - this._start;
        },
        'stop' : function(){
            this.pause();
            this._progress = this._start = 0;
        },
        'restart' : function(){
            this.stop();
            this.start();
        },
        'reverse' : function(){
            // todo: implement tween reverse
        }
    },
    {
        'USE_RAF' : (OJ.os != OJ.IOS || OJ.os_version.compareVersion('6.9') == 1 || !OJ.is_webview()) && window.requestAnimationFrame
    }
);


OJ.extendClass(
    'OjPropTween', [OjTween],
    {
        '_props_' : {
            'mode' : 'Javascript',
            'target' : null,
            'units' : null
        },
        //'_callback' : null, '_delta' : null, '_from_cache' : null,

        '_constructor' : function(/*target = null, to = null, duration = 500, easing = NONE, units = null*/){
            this._super(OjTween, '_constructor', []);
            this._processArguments(arguments, {
                'target' : undefined,
                'to' : undefined,
                'duration' : 250,
                'easing' : OjEasing.NONE,
                'units' : undefined
            });
//            var engine = OJ.getEngine();
//
//            if(engine == OJ.WEBKIT && !OJ.isMobile()){
//                        this._mode = OjPropTween.WEBKIT;
//            }
        },
        '_destructor' : function(){
            this._callback = null;
            return this._super(OjTween, '_destructor', arguments);
        },

        '_calculateDelta' : function(){
            var self = this,
                target = self.target;
            self._from_cache = {};
            self._delta = {};
            var has_from = !isEmptyObject(self._from), key, transition_properties = '';
            for(key in self._to){
                if(!has_from){
                    self._from[key] = target[key];
                }
                self._from_cache[key] = parseFloat(self._from[key]);
                self._delta[key] = parseFloat(self._to[key]) - self._from_cache[key];
                if(transition_properties != ''){
                    transition_properties += ', ';
                }
                transition_properties += OjPropTween.PROPERTY_CSS_MAP[key];
            }
        },
        '_is_animating' : function(val){
            if(this._target && this._target.is('OjComponent')){
                this._target._setIsAnimating(val);
            }
        },
        '_tick' : function(time){
            var key,
                self = this,
                duration = self.duration,
                delta = self._delta,
                easing = self.easing,
                target = self.target,
                units = self.units;
            for(key in delta){
                var args = [
                    Math.round(
                        easing(time, self._from_cache[key], delta[key], duration, 0, 0) * 1000
                    ) / 1000
                ];
                if(units){
                    args.append(units);
                }
                target[key] = args;
            }
        },

        '_onComplete' : function(evt){
            this._is_animating(false);
            this._super(OjTween, '_onComplete', arguments);
        },
        '_onTargetDestroy' : function(evt){
            this._super(OjTween, 'stop', arguments);
            this.target = null;
        },
        '_onWebKitComplete' : function(evt){
            var self = this,
                target = self.target,
                prop = OjPropTween.CSS_PROPERTY_MAP[evt.propertyName];
            if(isUndefined(self._from[prop])){
                return;
            }
            // cleanup the webkit transition settings
            target._setStyle('-webkit-transition-duration', null);
            target._setStyle('-webkit-transition-property', null);
            target.dom.removeEventListener('webkitTransitionEnd', self._callback, false);
            self._onComplete(evt);
            self._callback = null;
        },

        'pause' : function(){
            this._is_animating(false);
            this._super(OjTween, 'pause', arguments);
        },
        'start' : function(){
            if(!isSet(this._target) || !isSet(this._to)){
                return;
            }
            if(!isSet(this._from)){
                this._from = {};
            }
            this._is_animating(true);
            if(this._mode == OjPropTween.WEBKIT){
                var key;
                this._calculateDelta();
                this._target._setStyle('-webkit-transition-duration', this._duration + 'ms');
                this._target._setStyle('-webkit-transition-property', transition_properties);
                // add in easing setting later
                this._target.dom.addEventListener('webkitTransitionEnd', this._callback = this._onWebKitComplete.bind(this), false);
                for(key in this._delta){
                    this._target[key](this._from_cache[key] + this._delta[key]);
                }
                // maybe add fallback timer to trigger event in case something goes wrong...
            }
            else{
                this._super(OjTween, 'start', arguments);
            }
        },
        'stop' : function(){
            this._is_animating(false);
            this._super(OjTween, 'stop', arguments);
        },

        '=mode' : function(val){
            if(this._mode == val){
                return;
            }
            this._mode = val;
            if(this._timer){
                OJ.destroy(this._timer);
            }
        },
        '=target' : function(target){
            if(this._target == target){
                return;
            }
            if(this._target){
                this._target.removeEventListener(OjEvent.DESTROY, this, '_onTargetDestroy');
            }
            if(this._target = target){
                this._target.addEventListener(OjEvent.DESTROY, this, '_onTargetDestroy');
            }
        }
    },
    {
        'PROPERTY_CSS_MAP' : {
            'alpha' : 'opacity',
            'x' : 'left',
            'y' : 'top',
            'width' : 'width',
            'height' : 'height'
        },
        'CSS_PROPERTY_MAP' : {
            'opacity' : 'alpha',
            'left' : 'x',
            'right' : 'y',
            'width' : 'width',
            'height' : 'height'
        },
        'JS' : 'Javascript',
        'WEBKIT' : 'WebKit'
    }
);

OJ.extendClass(
    'OjFade', [OjPropTween],
    {
        '_props_' : {
            'direction' : null,
            'duration'  : null
        },
        '_force' : false,

        '_constructor' : function(/*target = null, direction = IN, duration = 250, easing = NONE*/){
            this._super(OjPropTween, '_constructor', []);
            this._processArguments(arguments, {
                'target' : undefined,
                'direction' : OjFade.IN,
                'duration' : undefined,
                'easing' : undefined
            });
        },

        '_onComplete' : function(evt){
            if(this.direction == OjFade.NONE){
                this.target.alpha = 1;
                this.target.hide();
            }
            this._super(OjPropTween, '_onComplete', arguments);
        },

        'start' : function(){
            // for some reason this happens every once and awhile
            var target = this.target;
            if(!target){
                return;
            }
            if(!this._to){
                this._to = {};
            }
            if(this.direction == OjFade.IN){
                if(this._force || target.alpha == 1){
                    target.alpha = 0;
                }
                this._to.alpha = 1;
            }
            else{
                if(this._force || target.alpha == 0){
                    target.alpha = 1;
                }
                this._to.alpha = 0;
            }
            target.show();
            this._super(OjPropTween, 'start', arguments);
        }
    },
    {
        'IN'   : 'fadeIn',
        'NONE' : 'fadeNone',
        'OUT'  : 'fadeOut'
    }
);

OJ.extendClass(
    'OjComponent', [OjStyleElement],
    {
        '_props_' : {
            'active' : false,
            'enabled' : null,
            'disabled' : false,
            'elms' : null,
            'is_active' : null,
            'isEnabled' : null,
            'isDisabled' : null,
            'num_elms' : 0
        },
        '_get_props_' : {
            'controller' : null,
            'is_animating' : false
        },

        '_constructor' : function(){
            var self = this,
                args = [null, self],
                template = self._template;
            // process the template if any
            if(template){
                if(template.charAt(0) == '<'){
                    args[0] = template;
                }
                else{
                    // TODO: this will throw an error until importTemplate is replaced
                    //args[0] = importTemplate(this._template);
                }
            }
            // call super constructor
            self._super(OjStyleElement, '_constructor', args);
            // add the class name inheritance as css classes
            self._setCss();
            // setup the container
            self._setContainer(self.container || self);
        },
        "_destructor" : function(){
            this._disableUiEvents();
            return this._super(OjStyleElement, "_destructor", arguments);
        },

        "_disableUiEvents" : function(){
            var self = this;
            self.removeEventListener(OjUiEvent.DOWN, self, "_onUiDown");
            self.removeEventListener(OjUiEvent.PRESS, self, "_onUiPress");
            self.removeEventListener(OjUiEvent.OVER, self, "_onUiOver");
            self.removeEventListener(OjUiEvent.OUT, self, "_onUiOut");
            OJ.removeEventListener(OjUiEvent.MOVE, self, "_onUiMove");
            OJ.removeEventListener(OjUiEvent.UP, self, "_onUiUp");
        },
        "_enableUiEvents" : function(){
            var self = this;
            self.addEventListener(OjUiEvent.DOWN, self, "_onUiDown");
            self.addEventListener(OjUiEvent.PRESS, self, "_onUiPress");
            self.addEventListener(OjUiEvent.OVER, self, "_onUiOver");
        },

        "_onUiDown" : function(evt){
            var self = this;
            OJ.addEventListener(OjUiEvent.UP, self, "_onUiUp");
            self.addEventListener(OjUiEvent.UP, self, "_onUiUp");
            self.addCss("ui-down");
        },
        "_onUiMove" : function(evt){
            var self = this;
            if(!self.hitTestPoint(evt.pageX, evt.pageY)){
                OJ.removeEventListener(OjUiEvent.MOVE, self, "_onUiMove");
                self._onUiOut(evt);
            }
        },
        "_onUiOut" : function(evt){
            var self = this;
            self.removeCss("ui-over");
            self._updateIcon(self._icon);
        },
        "_onUiOver" : function(evt){
            var self = this;
            OJ.addEventListener(OjUiEvent.MOVE, self, "_onUiMove");
            self.addCss("ui-over");
        },
        "_onUiPress" : function(evt){
            var url = this.url;
            if(url){
                WindowManager.open(url, this.target, {
                    'width' : this.target_width,
                    'height' : this.target_height
                });
            }
        },
        "_onUiUp" : function(evt){
            var self = this;
            OJ.removeEventListener(OjUiEvent.UP, self, "_onUiUp");
            self.removeEventListener(OjUiEvent.UP, self, "_onUiUp");
            self.removeCss("ui-down");
        },
        // override this so that the component gets properly set
        '_processChild' : function(dom, context){
            return this._super(OjStyleElement, '_processChild', [dom, context ? context : this]);
        },
        '_processDomSourceAttributes' : function(dom, context){
            this._processAttributes(dom, context);
        },
        '_processDomSourceChild' : function(dom_elm, context){
            if(!dom_elm || OjElement.isCommentNode(dom_elm)){
                return ;
            }
            return this._processChild(dom_elm, context);
        },
        '_processDomSourceChildren' : function(dom, context){
            var self = this,
                child,
                children = dom.childNodes,
                ln = children.length;
            for(; ln--;){
                if(child = self._processDomSourceChild(children[ln], context)){
                    self.prependElm(child);
                }
            }
        },

        '_setCss' : function(){
            var self = this,
                css = [self.oj_class_name],
                ln = self._supers.length,
                cls;
            for(; ln--;){
                cls = self._supers[ln];
                css.append(OJ.classToString(cls));
                if(cls == OjComponent){
                    break;
                }
            }
            self.addCss(css);
        },
        '_setContainer' : function(container){
            if(this.container == container){
                return;
            }
            if(this.container){
                this.container.removeCss('container');
            }
            if((this.container = container) != this){
                this.container.addCss('container');
            }
        },
        '_setDomSource' : function(dom, context){
            // setup our vars
            var ary, prev, nm, val, ln, i,
                is_body = (dom == document.body),
                source = is_body ? this._dom : dom,
                target = is_body ? dom : this._dom;
            // prevent events from dispatching while we are setting everything up
//            this._prevent_dispatch = true;
            // process dom attributes
            this._processDomSourceAttributes(dom, context);
            // copy over attributes
            ln = (ary = source.attributes).length;
            for(; ln--;){
                i = ary[ln];
                nm = i.nodeName;
                val = i.value;
                if(nm == 'class'){
                    prev = target.getAttribute(nm);
                    target.className = (String.string(prev) + ' ' + val).trim();
                }
                else if(nm == 'id'){
                    target.id = val;
                }
                else{
                    target.setAttribute(nm, val);
                }
            }
            // process the dom children
            this._processDomSourceChildren(dom, context);
            // copy over the children
            if(dom.parentNode){
                if(is_body){
                    ln = (ary = source.children).length;
                    i = 0;
                    for(; i < ln; i++){
                        target.appendChild(ary[0]);
                    }
                }
                else{
                    source.parentNode.replaceChild(target, source);
                }
            }
            // reengage event dispatching now that everything is setup
//            this._prevent_dispatch = false;
            // update our dom var to the target
            this._dom = target;
            // process any template vars
            this._processTemplateVars();
        },
        '_setIsAnimating' : function(val){
            if(this._is_animating == val){
                return;
            }
            if(this._is_animating = val){
                this.addCss('animating');
            }
            else{
                this.removeCss('animating');
            }
        },
        '_setIsDisplayed' : function(displayed){
            this._super(OjStyleElement, '_setIsDisplayed', arguments);
            this.redraw();
        },

        '_processEvent' : function(evt){
            if(this._isDisabled){
                return false;
            }
            return this._super(OjStyleElement, '_processEvent', arguments);
        },

        // Component Management Functions
        '_callElmFunc' : function(func, args){
            return this._callElmProp(func).apply(this.container, args);
        },
        '_callElmProp' : function(prop, val){
            var cls = this._static,
                container = this.container,
                translated;
            if(container != this && container.is(OjComponent)) {
                translated = prop;
            }
            else {
                translated = cls.ELM_FUNCS[prop];
            }
            if(arguments.length > 1){
                container[translated] = val;
            }
            return container[translated]
        },
        'appendElm' : function(){
            return this._callElmFunc('appendElm', arguments);
        },
        '.elms' : function(){
            return this._callElmProp('elms');
        },
        '=elms' : function(elms){
            return this._callElmProp('elms', elms);
        },
        'forElm' : function(){
            return this._callElmFunc('forElm', arguments);
        },
        'forElmReverse' : function(){
            return this._callElmFunc('forElmReverse', arguments);
        },
        'getElmAt' : function(){
            return this._callElmFunc('getElmAt', arguments);
        },
        'hasElm' : function(){
            return this._callElmFunc('hasElm', arguments);
        },
        'indexOfElm' : function(){
            return this._callElmFunc('indexOfElm', arguments);
        },
        'insertElmAt' : function(){
            return this._callElmFunc('insertElmAt', arguments);
        },
        'moveElm' : function(){
            return this._callElmFunc('moveElm', arguments);
        },
        '.num_elms' : function(){
            return this._callElmProp('num_elms');
        },
        'prependElm' : function(){
            return this._callElmFunc('prependElm', arguments);
        },
        'removeAllElms' : function(){
            return this._callElmFunc('removeAllElms', arguments);
        },
        'removeElm' : function(){
            return this._callElmFunc('removeElm', arguments);
        },
        'removeElmAt' : function(){
            return this._callElmFunc('removeElmAt', arguments);
        },
        'replaceElm' : function(){
            return this._callElmFunc('replaceElm', arguments);
        },
        'replaceElmAt' : function(){
            return this._callElmFunc('replaceElmAt', arguments);
        },

        // event handling functions
        '_onFadeComplete' : function(evt){
            this.alpha = 1;
            if(this._fader.direction == OjFade.OUT){
                this.hide();
            }
            else{
                this.show();
            }
            this._setIsAnimating(false);
            this._unset('_fader');
        },

        'fadeIn' : function(duration, easing){
            if(this._fader){
                if(this._fader.direction == OjFade.IN){
                    return;
                }
                this._unset('_fader');
            }
            else if(this.isVisible){
                return;
            }
            this.show();
            var ln = arguments.length;
            this._fader = new OjFade(this, OjFade.IN, ln ? duration : 250, ln > 1 ? easing : OjEasing.NONE);
            this._fader.addEventListener(OjTweenEvent.COMPLETE, this, '_onFadeComplete');
            this._fader.start();
            this._setIsAnimating(true);
        },
        'fadeOut' : function(duration, easing){
            if(this._fader){
                if(this._fader.direction == OjFade.OUT){
                    return;
                }
                this._unset('_fader');
            }
            else if(!this.isVisible){
                return;
            }
            var ln = arguments.length;
            this._fader = new OjFade(this, OjFade.OUT, ln ? duration : 250, ln > 1 ? easing : OjEasing.NONE);
            this._fader.addEventListener(OjTweenEvent.COMPLETE, this, '_onFadeComplete');
            this._fader.start();
            this._setIsAnimating(true);
        },
        'redraw' : function(force){
            return this._is_displayed || force;
        },
        // Getter/Setter Methods
        '.controller' : function(){
            if(!this._controller){
                var p = this.parentComponent;
                if(p){
                    this._controller = p.controller;
                }
            }
            return this._controller;
        },
        // active
        '.is_active' : function(){
            return this.active;
        },
        '=is_active' : function(val){
            this.active = val;
        },
        '=active' : function(val){
            var self = this;
            if(self._active != val){
                if(self._active = val){
                    self.addCss('active');
                }
                else{
                    self.removeCss('active');
                }
            }
        },
        // disabled
        '.isDisabled' : function(){
            return this.disabled;
        },
        '=isDisabled' : function(val){
            return this.disabled = val;
        },
        '=disabled' : function(val){
            var self = this;
            if(self._disabled != val){
                if(self._disabled = val){
                    self.addCss('disabled');
                }
                else{
                    self.removeCss('disabled');
                }
            }
        },
        // enabled
        '.isEnabled' : function(){
            return this.enabled;
        },
        '=isEnabled' : function(val){
            return this.enabled = val;
        },
        '.enabled' : function(){
            return !this.disabled;
        },
        '=enabled' : function(val){
            this.disabled = !val;
        }
    },
    {
        '_TAGS' : [],
        'ELM_FUNCS' : {
            'appendElm' : 'appendChild',
            'elms' : 'children',
            'forElm' : 'forChild',
            'forElmReverse' : 'forChildReverse',
            'getElmAt' : 'getChildAt',
            'hasElm' : 'hasChild',
            'indexOfElm' : 'indexOfChild',
            'insertElmAt' : 'insertChildAt',
            'moveElm' : 'moveChild',
            'num_elms' : 'num_children',
            'prependElm' : 'prependChild',
            'removeAllElms' : 'removeAllChildren',
            'removeElm' : 'removeChild',
            'removeElmAt' : 'removeChildAt',
            'replaceElm' : 'replaceChild',
            'replaceElmAt' : 'replaceChildAt'
        },
        'load' : function(source){
        }
    }
);

OJ.extendComponent(
    'OjSpinner', [OjComponent],
    {
        '_props_' : {
            'numBlades' : null,
            'period'    : 1,
            'tint'      : '#FFFFFF'
        },
        '_position' : 0,  '_template' : '<div><div var=wrapper></div></div>',

        '_constructor' : function(/*tint, period, num_blades*/){
            var args = arguments,
                ln = args.length,
                num_blades = 13;
            this._super(OjComponent, '_constructor', []);
            if(ln){
                this.tint = args[0];
                if(ln > 1){
                    this.period = args[1];
                    if(ln > 2){
                        num_blades = args[2];
                    }
                }
            }
            this._translate = new OjCssTranslate(70, 0, '%');
            // setup the timer
            this._timer = new OjTimer(1000, 0);
            this._timer.addEventListener(OjTimer.TICK, this, '_onTimer');
            // setup the blades
            this.numBlades = num_blades;
            // start the timer/animation
            this.start();
        },
        '_destructor' : function(){
            this._unset('_timer');
            return this._super(OjComponent, '_destructor', arguments);
        },

        '_setIsDisplayed' : function(){
            var timer = this._timer;
            this._super(OjComponent, '_setIsDisplayed', arguments);
            if(timer){
                timer[this._is_displayed ? 'start' : 'stop']();
            }
        },
        '_updateTimer' : function(){
            this._timer.duration = (this._period * 1000) / this._numBlades;
        },
        '_onTimer' : function(){
            if(this._position == 0){
                this._position = this._numBlades;
            }
            this._position--;
            this.redraw();
        },

        'hide' : function(){
            this._timer.pause();
            this._super(OjComponent, 'hide', arguments);
        },
        'redraw' : function(){
            if(this._super(OjComponent, 'redraw', arguments)){
                var ln = this._numBlades, elm, pos;
                for(; ln--;){
                    elm = this.wrapper.getChildAt(ln);
                    // calculate the translated position
                    pos = (ln - this._position) % this._numBlades;
                    if(pos < 0){
                        pos = pos + this._numBlades;
                    }
                    elm.alpha = Math.max(1 - (pos / this._numBlades), .2);
                }
                return true;
            }
            return false;
        },
        'show' : function(){
            if(this._running){
                this._timer.start();
            }
            this._super(OjComponent, 'show', arguments);
        },
        'start' : function(){
            this._timer.start();
            this._running = true;
        },
        'stop' : function(){
            this._timer.pause();
            this._running = false;
        },

        '=alpha' : function(val){
            if(this._running){
                if(val == 0){
                    this._timer.pause();
                }
                else{
                    this._timer.start();
                }
            }
            this._super(OjComponent, '=alpha', arguments);
        },
        '=numBlades' : function(val){
            var ln, elm, section;
            if(this._numBlades == val){
                return;
            }
            this._numBlades = val;
            // redraw the blades
            ln = this._numBlades;
            section = 360 / ln;
            this.wrapper.removeAllChildren();
            for(; ln--;){
                elm = new OjStyleElement();
                elm.addCss('blade');
                elm.rotation = section * ln;
                elm.translate = this._translate;
                elm.background_color = this._tint;
                this.wrapper.appendChild(elm);
            }
            // redraw the tint
            this.redraw();
            // update the timer
            this._updateTimer();
        },
        '=period' : function(val){
            if(this._period == val){
                return;
            }
            this._period = val;
            // update the timer
            this._updateTimer();
        },
        '=tint' : function(val){
            var ln;
            if(this._tint == val){
                return;
            }
            this._tint = val;
            ln = this._numBlades;
            for(; ln--;){
                this.wrapper.getChildAt(ln).background_color = this._tint;
            }
        }
    },
    {
        '_TAGS' : ['spinner']
    }
);

OJ.extendComponent(
    'OjOverlay', [OjComponent],
    {
        '_props_' : {
            'forceIcon'    : true,
            'forceMessage' : false,
            'message'      : null,
            'icon'         : null
        },
        '_v_align' : OjStyleElement.MIDDLE,
        '_template' : '<div><div class=box><div var=icn></div><label var=msg></label></div></div>',

        '_constructor' : function(/*message, icon*/){
            var args = arguments,
                ln = arguments.length,
                icon;
            this._super(OjComponent, '_constructor', []);
            if(ln){
                this.message = args[0];
                if(ln > 1){
                    icon = args[1];
                }
            }
            this.icon = icon;
        },

        '_onFadeComplete' : function(evt){
            if(this._fader.direction == OjFade.OUT && this.parent){
                this.parent.removeChild(this);
            }
            this._super(OjComponent, '_onFadeComplete', arguments);
        },

        'hide' : function(){
            if(!this.parent){
                return;
            }
            this.fadeOut();
        },
        'show' : function(target){
            if(!target || this.parent == target){
                return;
            }
            this.alpha = 0;
            target.appendChild(this);
            this.fadeIn();
        },

        '=message' : function(msg){
            if(!msg && this._forceMessage){
                msg = 'Loading';
            }
            if(isEmpty(msg)){
                this.addCss('no-message');
            }
            else{
                this.removeCss('no-message');
            }
            this.msg.text = this._message = msg;
        },
        '=icon' : function(icon){
            this.icn.removeAllChildren();
            if(icon || this._forceIcon){
                if(!icon){
                    icon = new OjSpinner();
                    icon.width = 40;
                    icon.height = 40;
                }
                this.removeCss('no-icon');
                this.icn.appendChild(icon);
            }
            else{
                this.addCss('no-icon');
            }
        }
    },
    {
        '_TAGS' : ['overlay']
    }
);

OJ.extendComponent(
    "OjView", [OjComponent],
    {
        "_props_" : {
            "controller" : null,
            "footer" : null,
            "header" : null,
            "icon" : null,
            "short_title" : null,
            "stack" : null,
            "title" : null
        },
        "_get_props_" : {
            "action_view" : null,
            "cancel_view" : null,
            "title_view" : null
        },
//        "_elm_funcs" : null,  "_load_checkpoints" : null,  "_loading_icon" : null,
//
//        "_overlay" : null,  "_unload_checkpoints" : null,  "_unloading_icon" : null,
        "_loading_msg" : "Loading", "_template" : "<div></div>", "_loaded" : false,
        "_unloading_msg" : "UnLoading",

        "_constructor" : function(/*content, title, short_title, icon*/){
            var self = this,
                cls = self._static;
            self._super(OjComponent, "_constructor", []);
            // setup vars
            self._load_checkpoints = {};
            self._unload_checkpoints = {};
            // process arguments
            self._processArguments(arguments, {
                "content": undefined,
                "title" : undefined,
                "short_title" : undefined,
                "icon" : undefined
            });
            if(!self.title){
                self.title = cls.TITLE;
            }
            if(!self.short_title){
                self.short_title = cls.SHORT_TITLE;
            }
            if(!self.icon){
                self.icon = cls.ICON;
            }
        },
        "_destructor" : function(){
            this.unload();
            this._unset(["_action_view", "_cancel_view", "_title_view", "_overlay"]);
            return this._super(OjComponent, "_destructor", arguments);
        },

        "_checkpointsCompleted" : function(checkpoints){
            for(var key in checkpoints){
                if(!checkpoints[key]){
                    return false;
                }
            }
            return true;
        },
        "_hideOverlay" : function(overlay){
            if((overlay = overlay || this._overlay)){
                overlay.addEventListener(OjEvent.HIDE, this, "_onOverlayHide");
                overlay.hide();
            }
        },
        "_load" : function(){
            this._loaded = true;
            this.removeCss("loading");
            this.redraw();
            this._hideOverlay();
            this.dispatchEvent(new OjEvent(OjView.LOAD));
        },
        "_loadCheckpoint" : function(checkpoint){
            var self = this,
                checkpoints = self._load_checkpoints;
            if(checkpoint){
                checkpoints[checkpoint] = true;
            }
            if(self._checkpointsCompleted(checkpoints)){
                self._load();
            }
            else{
                self._showOverlay(self._loading_msg, self._loading_icon);
            }
        },
        "_resetCheckpoints" : function(checkpoints){
            var key;
            for(key in checkpoints){
                checkpoints[key] = false;
            }
        },
        "_showOverlay" : function(/*msg, icon*/){
            var args = arguments,
                ln = args.length,
                msg = ln ? args[0] : null,
                icon = ln > 1 ? args[1] : null,
                overlay = this._overlay;
            if(overlay){
                overlay.message = msg;
                overlay.icon = icon;
            }
            else{
                overlay = this._overlay = new OjOverlay(msg, icon);
            }
            overlay.show(this);
            return overlay;
        },
        "_unload" : function(){
            this._loaded = false;
            this._hideOverlay();
            // dispatch the event
            this.dispatchEvent(new OjEvent(OjView.UNLOAD));
        },
        "_unloadCheckpoint" : function(/*checkpoint*/){
            var args = arguments;
            if(args.length){
                this._unload_checkpoints[args[0]] = true;
            }
            if(this._checkpointsCompleted(this._unload_checkpoints)){
                this._unload();
            }
            else{
                this._showOverlay(this._unloading_msg, this._unloading_icon);
            }
        },

        "_onOverlayHide" : function(evt){
            this._unset("_overlay");
        },

        "load" : function(reload){
            var self = this;
            if(!reload && self._loaded){
                return false;
            }
            self.addCss("loading");
            self._resetCheckpoints(self._load_checkpoints);
            self._loadCheckpoint();
            return true;
        },
        "unload" : function(){
            var self = this;
            if(self._loaded){
                self._resetCheckpoints(self._unload_checkpoints);
                self._unloadCheckpoint();
                return true;
            }
            return false;
        },

        // getter & Setter functions
        ".content" : function(){
            return this.elms;
        },
        "=content" : function(content){
            this.removeAllElms();
            if(content){
                content = Array.array(content);
                var ln = content.length;
                for(; ln--;){
                    this.insertElmAt(content[ln], 0);
                }
            }
        },
        "=footer" : function(val){
            if(this._footer == val){
                return;
            }
            if(this._footer = val){
                this.removeCss("no-footer");
                if(!this.ftr){
                    var ftr = new OjStyleElement();
                    ftr.addCss("footer");
                    this.container.parent.insertChildAt(this.ftr = ftr, 0);
                }
                this.ftr.removeAllChildren();
                this.ftr.appendChild(val);
            }
            else{
                this._unset("ftr");
                this.addCss("no-footer");
            }
        },
        "=header" : function(val){
            if(this._header == val){
                return;
            }
            if(this._header = val){
                this.removeCss("no-header");
                if(!this.hdr){
                    var hdr = new OjStyleElement();
                    hdr.addCss("header");
                    this.container.parent.insertChildAt(this.hdr = hdr, 0);
                }
                this.hdr.removeAllChildren();
                this.hdr.appendChild(val);
            }
            else{
                this._unset("hdr");
                this.addCss("no-header");
            }
        },
        ".icon" : function(){
            return OjImage.image(this._icon, true); // this will clone the icon so that we don"t run into the icon accidentally getting messed up
        },
        "=icon" : function(icon){
            if(this._icon == icon){
                return;
            }
            this._icon = icon;
            this.dispatchEvent(new OjEvent(OjView.ICON_CHANGE, false));
        },
        "=title" : function(title){
            if(this._title == title){
                return;
            }
            this._title = title;
            if(!this._short_title){
                this._short_title = title;
            }
            this.dispatchEvent(new OjEvent(OjView.TITLE_CHANGE, false));
        }
    },
    {
        "ICON" : null,
        "SHORT_TITLE" : null,
        "TITLE" : null,
        "HORIZONTAL" : "horizontal",
        "VERTICAL" : "vertical",
        "TOP" : "top",
        "BOTTOM" : "bottom",
        "LEFT" : "left",
        "RIGHT" : "right",
        "ICON_CHANGE" : "onTitleChange",
        "LOAD" : "onViewLoad",
        "TITLE_CHANGE" : "onTitleChange",
        "UNLOAD" : "onViewUnload",
        "_TAGS" : ["view"]
    }
);

OJ.extendComponent(
    'OjIframe', [OjView],
    {
        '_props_' : {
            'source' : null,
            'timeout' : 60
        },

        '_interval' : null,
        '_template' : '<iframe></iframe>',

        '_constructor' : function(source, target){
            var self = this;
            self._super(OjView, '_constructor', []);
            if(source){
                self.source = source;
            }
            if(target){
                self.target = target;
            }
            self.attr('name', self.id);
        },

        '_onLoad' : function(){
            clearInterval(this._interval);
            this.dispatchEvent(new OjEvent(OjEvent.COMPLETE));
        },
        '_onTimeout' : function(){
            clearInterval(this._interval);
            this.dispatchEvent(new OjIoErrorEvent(OjIoErrorEvent.IO_ERROR));
        },

        '.source' : function(){
            return this._source;
        },
        '=source' : function(source){
            var iframe = this.dom;
            this._source = source.toString();
            if(iframe.src){
                iframe.src = this._source;
            }
            else if(iframe.contentWindow !== null && iframe.contentWindow.location !== null){
//                        iframe.contentWindow.location.href = this._source;
            }
            else{
                this.attr('src', this._source);
            }
            if(!isEmpty(this._source)){
                clearInterval(this._interval);
                this._interval = setInterval(this._onTimeout.bind(this), this._timeout * 1000);
                var on_load_func = this._onLoad.bind(this);
                if(iframe.attachEvent){
                    iframe.attachEvent('onload', on_load_func);
                }
                else{
                    iframe.onload = on_load_func;
                }
            }
        }
    },
    {
        '_TAGS' : ['iframe']
    }
);

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
        //'_template': '<div><div var=container></div></div>',
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
//            this._resize();
        },
        '_setWidth': function (val) {
            this._super(OjComponent, '_setWidth', arguments);
            this._width = val;
//            this._resize();
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
            if (this._resizeBy == this._static.NONE) {
                return;
            }
            this.addCss(this._resizeBy);
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
                this._setStyle('backgroundImage', 'url(' + this.source + ')');
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
                this._setStyle('backgroundImage', null);
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

OJ.extendComponent(
    'OjImageViewer', [OjView],
    {
        '_images' : null,

        '_constructor' : function(/*content, title, short_title*/){
            this._images = [];
            this._super(OjView, '_constructor', arguments);
        },

        '.content' : function(){
            return this._images.clone();
        },
        '=content' : function(content){
            this.removeAllElms();
            if(content){
                this._images = Array.array(content);
                var ln = this._images.length;
                for(; ln--;){
                    this.insertElmAt(new OjImage(this._images[ln]), 0);
                }
            }
        }
    },
    {
        '_TAGS' : ['image-viewer']
    }
);

OJ.extendClass(
    'OjTransition', [OjObject],
    {
        '_props_' : {
            'easing'   : null,
            'effect'   : null,
            'duration' : null
        },

        '_constructor' : function(/*effect, duration, easing*/){
            this._super(OjObject, '_constructor', []);
            // default the easing property
            this._processArguments(arguments, {
                'effect' : OjTransition.FADE,
                'duration' : 250,
                'easing' : [OjEasing.NONE, OjEasing.NONE]
            });
        },

        '_getEasing' : function(direction){
            var easing = this.easing,
                ln = easing.length;
            if(ln){
                if(ln > 1 && direction == OjTransition.OUT){
                    return easing[1];
                }
                return easing[0];
            }
            return null;
        },
        '_makeNone' : function(elm, amount){
            return null;
        },
        '_makeFade' : function(elm, direction, amount){
            return new OjFade(elm, amount ? OjFade.IN : OjFade.OUT, this.duration, this._getEasing(direction))
        },
        '_makeFlip' : function(elm, direction, amount){
            return new OjFlip(elm, amount, this.duration, this._getEasing(direction))
        },
        '_makeSlideHorz' : function(elm, direction, amount){
            return new OjMove(elm, OjMove.X, amount, this.duration, this._getEasing(direction));
        },
        '_makeSlideVert' : function(elm, direction, amount){
            return new OjMove(elm, OjMove.Y, amount, this.duration, this._getEasing(direction));
        },
        '_makeZoom' : function(elm, direction, amount){
            return null;
        },

        'make' : function(elm, direction, amount){
            var self = this;
            return self['_make' + self.effect.ucFirst()].apply(self, arguments);
        },

        '.easing' : function(){
            var e = this._easing;
            return e ? e.clone() : null;
        },
        '=easing' : function(val){
            if(!isArray(val)){
                val = [val, val];
            }
            this._easing = val;
        }
    },
    {
        // Transition Constants
        'DEFAULT'    : null,
        'NONE'       : 'none',
        'FADE'       : 'fade',
        'FLIP'       : 'flip',
        'SLIDE_HORZ' : 'slideHorz',
        'SLIDE_VERT' : 'slideVert',
        'ZOOM'       : 'zoom',

        // transition make function
        'transition' : function(trans/*, default*/){
            if(isObjective(trans) && trans.is('OjTransition')){
                return trans
            }
            var args = arguments,
                ln = args.length;
            if(isString(trans)){
                var dflt = ln > 1 && args[1] ? args[1] : OjTransition.DEFAULT,
                    easing = dflt.easing;
                args = trans.fulltrim(' ').split(',');
                ln = args.length;
                return new OjTransition(
                    ln ? args[0] : dflt.effect,
                    ln > 1 ? args[1] : dflt.duration,
                    [
                        ln > 2 ? OjEasing[args[2]] : easing[0],
                        ln > 3 ? OjEasing[args[3]] : easing[1]
                    ]
                );
            }
            return new OjTransition(OjTransition.NONE, 250);
        }
    }
);
// setup the default transition
OjTransition.DEFAULT = new OjTransition(OjTransition.NONE, 250);

OJ.extendComponent(
    'OjNavController', [OjComponent],
    {
        '_props_' : {
            'active_view' : null,
            'active_index' : null,
            'stack' : null,
        },

        '_constructor' : function(stack){
            this._super(OjComponent, '_constructor', []);
            // process the arguments
            if(stack){
                this.stack = stack;
            }
        },
        '_destructor' : function(){
            this._cleanupStack();
            return this._super(OjComponent, '_destructor', arguments);
        },
        '_setupStack' : function(stack){
            var self = this,
                evt = OjStackEvent;
            if(stack){
                // setup the stack controller reference
                stack.controller = self;
                // setup the stack event listeners
                stack.addEventListener(evt.CHANGE, self, '_onStackChange');
                stack.addEventListener(evt.CHANGE_COMPLETE, self, '_onStackChangeComplete');
                // if we already have stuff in the stack then trigger a change event so the display gets updated properly
                var active = stack.active;
                if(active){
                    self._onStackChange(
                        new OjStackEvent(evt.CHANGE, active, OjTransition.DEFAULT, stack.indexOfElm(active), 0)
                    );
                }
            }
            return stack;
        },
        '_cleanupStack' : function(){
            var self = this,
                stack = self.stack,
                evt = OjStackEvent;
            if(stack){
                stack.removeEventListener(evt.CHANGE, self, '_onStackChange');
                stack.removeEventListener(evt.CHANGE_COMPLETE, self, '_onStackChangeComplete');
            }
        },

        // event listener callbacks
        '_onStackChange' : function(evt){
        },
        '_onStackChangeComplete' : function(evt){
            // remove all views after the active view
            var stack = this.stack,
                ln = stack.num_elms,
                i = stack.active_index;
            if(stack.has_deferred){
                return;
            }
            for(; --ln > i;){
                stack.removeElmAt(ln);
            }
        },

        // stack view functions
        'appendView' : function(view/*, animated = true*/){
            var s = this.stack;
            return s.appendElm.apply(s, arguments);
        },
        'insertViewAt' : function(view, index/*, animated = true*/){
            var s = this.stack;
            return s.insertElmAt.apply(s, arguments);
        },
        'gotoView' : function(/*view = root, animated = true*/){
            var args = arguments,
                ln = args.length, index,
                view = ln ? args[0] : null,
                animated = ln > 1 ? args[1] : true;
            // if no view is specified we go all the way back to the root
            // if a new view is specified we go all the way back to root and replace with new view
            if(!view || (index = this.indexOfView(view)) > -1){
                return this.gotoViewAt(index, animated);
            }
            if(index = this.active_index){
                this.replaceViewAt(0, view);
                return this.gotoViewAt(0);
            }
            this.replaceActive(view, animated);
        },
        'gotoViewAt' : function(index/*, animated = true*/){
            return this.stack.active_index = arguments;
        },
        'hasView' : function(view){
            return this.stack.hasElm(view);
        },
        'indexOfView' : function(view){
            return this.stack.indexOfElm(view);
        },
        'removeActive' : function(/*animated = true*/){
            return this.removeViewAt(this.stack.active_index, arguments.length ? arguments[0] : true);
        },
        'removeView' : function(view/*, animated = true*/){
            var s = this.stack;
            return s.removeElm.apply(s, arguments);
        },
        'removeViewAt' : function(view, index/*, animated = true*/){
            var s = this.stack;
            return s.removeElmAt.apply(s, arguments);
        },
        'replaceActive' : function(view/*, animated = true*/){
            var s = this.stack,
                args = arguments;
            return s.replaceElmAt(this.active_index, view, args.length > 1 ? args[0] : true);
        },
        'replaceView' : function(oldView, newView/*, animated = true*/){
            var s = this.stack;
            return s.replaceElm.apply(s, arguments);
        },
        'replaceViewAt' : function(index, newView/*, animated = true*/){
            var s = this.stack;
            return s.replaceElmAt.apply(s, arguments);
        },

        // getter & setter functions
        '.active_view' : function(){
            return this.stack.active;
        },
        '=active_view' : function(val){
            this.stack.active = val;
        },
        '.active_index' : function(){
            return this.stack.active_index;
        },
        '=active_index' : function(val){
            this.stack.active_index = val;
        },
        '=stack' : function(stack){
            var self = this,
                old = self._stack;
            if(old == stack){
                return;
            }
            if(old){
                self._cleanupStack();
            }
            self._stack = self._setupStack(stack);
        }
    },
    {
        '_TAGS' : ['nav', 'nav-controller']
    }
);
OJ.extendComponent(
    'OjLabel', [OjComponent],
    {
        '_props_' : {
            'prefix' : null,
            'suffix' : null
        },
        '_template' : '<label></label>',

        '_constructor' : function(text){
            this._super(OjComponent, '_constructor', []);
            this.text = text;
        },
        '_processDomSourceChild' : function(){
            var self = this,
                child = self._super(OjComponent, '_processDomSourceChild', arguments);
            if(child && (child.is(OjTextElement) || child.is(OjLabel) || !child.is(OjComponent))){
                self.text = child.text;
                return;
            }
            return child;
        },
        //'_processDomSourceChildren' : function(dom_elm, component){
        //    var txt = dom_elm.innerHTML;
        //
        //    if(!isEmpty(txt)){
        //        this.text = String.string(this.text) + String.string(txt);
        //
        //        return;
        //    }
        //
        //    return this._super(OjComponent, '_processDomSourceChildren', arguments);
        //},
        '_redrawText' : function(){
            var self = this;
            self.dom.innerHTML = String.string(self.prefix).html() + String.string(self.text).html() + String.string(self.suffix).html();
        },

        'appendText' : function(str){
            this.text = String.string(this.text) + String.string(str);
        },
        'prependText' : function(str){
            this.text = String.string(str) + String.string(this.text);
        },
        'redraw' : function(){
            if(this._super(OjComponent, 'redraw', arguments)){
                this._redrawText();
                return true;
            }
            return false;
        },

        '=prefix' : function(val){
            if(this._prefix == val){
                return;
            }
            this._prefix = val;
            this.redraw();
        },
        '=suffix' : function(val){
            if(this._suffix == val){
                return;
            }
            this._suffix = val;
            this.redraw();
        },
        // these are needed to override the OjStyleElement text getter/setter
        '.text' : function(){
            return this._text;
        },
        '=text' : function(val){
            if(this._text == val){
                return;
            }
            this._text = val;
            this.redraw();
        }
    },
    {
        '_TAGS' : ['label']
    }
);


OJ.extendClass(
    'OjStackEvent', [OjEvent],
    {
        '_get_props_' : {
            'index'      : null,
            'old_index'   : null,
            'transition' : null,
            'view'       : null
        },

        '_constructor' : function(type, view, transition, index/*, old_index, bubbles = false, cancelable = false*/){
            var args = [type, false, false],
                ln = arguments.length;
            this._view = view;
            this._transition = transition;
            this._index = index;
            if(ln > 4){
                this._old_index = arguments[4];
                if(ln > 5){
                    args[1] = arguments[5];
                    if(ln > 6){
                        args[2] = arguments[6];
                    }
                }
            }
            this._super(OjEvent, '_constructor', args);
        }
    },
    {
        'ACTIVE'          : 'onStackViewActive',
        'ADD'             : 'onStackViewAdd',
        'CHANGE'          : 'onStackChange',
        'CHANGE_COMPLETE' : 'onStackChangeComplete',
        'INACTIVE'        : 'onStackViewInactive',
        'MOVE'            : 'onStackViewMove',
        'REMOVE'          : 'onStackViewRemove',
        'REPLACE'         : 'onStackViewReplace'
    }
);

OJ.extendClass(
    'OjDimTween', [OjPropTween],
    {
        '_props_' : {
            'amount'    : null,
            'direction' : null
        },

        '_constructor' : function(/*target, direction, amount, duration, easing, units*/){
            var self = this;
            self._super(OjPropTween, '_constructor', []);
            self._to = {};
            self._processArguments(arguments, {
                'target' : undefined,
                'direction' : self._static.BOTH,
                'amount': undefined,
                'duration' : 250,
                'easing' : OjEasing.NONE,
                'units' : OJ.dim_unit
            });
        }
    },
    {
        'HORIZONTAL' : 'dimTweenHorizontal',
        'VERTICAL'   : 'dimTweenVertical',
        'BOTH'       : 'dimTweenBoth'
    }
);

OJ.extendClass(
    'OjMove', [OjDimTween],
    {
        '=amount' : function(amount){
            var self = this,
                dir = self.direction,
                cls = OjMove,
                to = self._to;
            if(self._amount == amount){
                return;
            }
            self._amount = amount;
            if(dir == cls.BOTH){
                to.x = amount[0];
                to.y = amount[1];
            }
            else if(dir == cls.X){
                to.x = amount;
            }
            else{
                to.y = amount;
            }
        }
    },
    {
        'X'    : OjDimTween.HORIZONTAL,
        'Y'    : OjDimTween.VERTICAL,
        'BOTH' : OjDimTween.BOTH
    }
);


OJ.extendClass(
    'OjTweenSet', [OjActionable],
    {
        '_props_' : {
            'tweens' : null
        },
        '_get_props_' : {
            'numTweens' : null,
            'isFinished' : false
        },

        '_constructor' : function(/*tweens|tween, tween, tween...*/){
            var self = this,
                args = arguments;
            self._completed = [];
            self._tweens = [];
            self._super(OjActionable, '_constructor', []);
            if(args.length){
                if(isArray(args[0])){
                    this.tweens = args[0];
                }
                else{
                    this.tweens = Array.array(arguments);
                }
            }
        },
        '_destructor' : function(depth){
            var self = this,
                tweens = self._tweens;
            this.stop();
            if(depth){
                tweens.forEachReverse(function(item){
                    OJ.destroy(item, depth);
                });
            }
            else{
                tweens.forEachReverse(function(item){
                    self.removeTween(item);
                });
            }
            return self._super(OjActionable, '_destructor', arguments);
        },

        '_checkCompleted' : function(){
            var self = this,
                evt = OjTweenEvent;
            if(self._tweens.length == self._completed.length && !self.isFinished){
                self.dispatchEvent(new evt(evt.COMPLETE));
            }
        },

        '_onTweenComplete'  : function(evt){
            var self = this,
                completed = self._completed,
                tween = evt.target;
            if(!completed.contains(tween)){
                completed.append(tween);
            }
//                this.dispatchEvent(new OjTweenEvent(OjTweenEvent.TICK));
            self._checkCompleted();
        },

        '_controlTweens' : function(command, args){
            this._tweens.forEachReverse(function(item){
                item[command].apply(item, args);
            });
        },
        'start' : function(){
            this._controlTweens('start', arguments);
        },
        'pause' : function(){
            this._controlTweens('pause', arguments);
        },
        'stop' : function(){
            this._controlTweens('stop', arguments);
        },
        'reverse' : function(){
            this._controlTweens('reverse', arguments);
        },

        // tween management functions
        'addTween' : function(tween){
            var self = this;
            if(self.hasTween(tween)){
                return;
            }
            self._isFinished = false;
            tween.addEventListener(OjTweenEvent.COMPLETE, self, '_onTweenComplete');
            return self._tweens.append(tween);
        },
        'removeTween' : function(tween){
            var self = this,
                tweens = self._tweens,
                index = tweens.indexOf(tween);
            if(index == -1){
                return;
            }
            tween.removeEventListener(OjTweenEvent.COMPLETE, self, '_onTweenComplete');
            tweens.removeAt(index);
            self._checkCompleted();
            return tween;
        },
        'hasTween' : function(tween){
            return this._tweens.contains(tween);
        },

        '.numTweens' : function(){
            return this._tweens.length;
        },
        '.tweens' : function(){
            return this._tweens.clone();
        },
        '=tweens' : function(tweens){
            var self = this;
            self._tweens.forEachReverse(function(item){
                self.removeTween(item);
            });
            if(tweens){
                tweens.forEachReverse(function(item){
                    self.addTween(item);
                });
            }
        }
    }
);

OJ.extendComponent(
    "OjFlowNavController", [OjNavController],
    {
        "_props_" : {
            "cancel_icon" : null,
            "cancel_label" : "Cancel",
            "cancel_visible" : false,
            "default_title" : null,
            "title" : null
        },
        "_template" : "<div class=flow-nav-controller><div var=bottom><div var=btm_left class=left flex-h></div><div var=btm_title class=title flex-h></div><div var=btm_right class=right flex-h></div></div><div var=top><div var=top_left class=left flex-h></div><div var=top_title class=title flex-h></div><div var=top_right class=right flex-h></div></div></div>",

        // internal stack methods
        "_setupStack" : function(stack){
            var self = this,
                trans = OjTransition;
            if(self._super(OjNavController, "_setupStack", arguments)){
                stack.transition = new trans(trans.SLIDE_HORZ, 250, [OjEasing.IN, OjEasing.OUT]);
            }
            return stack;
        },
        //"_onStackAdd" : function(evt){
        //    this._stack.active = evt.view;
        //},

        // helper functions
        "_makeBackButton" : function(view){
            var btn = new OjButton(view.short_title);
            btn.addCss("back-button");
            return btn;
        },
        "_makeCancelButton" : function(title, icon){
            var btn = new OjButton(title, icon);
            btn.addCss("cancel-button");
            return btn;
        },
        "_makeTitle" : function(title){
            if(isObjective(title)){
                return title;
            }
            return new OjStyleElement("<div>" + title + "</div>");
        },
        "_update" : function(view, transition, index, old_index){
            var self = this;
            // remove any old animations
            self._unset("_tween");
            if(!view){
                return; // todo: re-evalute this to properly handle transition to on view
            }
            // process the left, title & right components
            // setup the vars
            var t = self.top, tl = self.top_left, tt = self.top_title, tr = self.top_right,
                b = self.bottom, bl = self.btm_left, bt = self.btm_title, br = self.btm_right,
                left = tl.num_children ? tl.getChildAt(0) : null,
                center = tt.num_children ? tt.getChildAt(0) : null,
                right = tr.num_children ? tr.getChildAt(0) : null,
                action_view = view.action_view,
                cancel_view = view.cancel_view,
                title_view = view.title_view,
                evt = OjUiEvent,
                stack = self.stack,
                title;
            // if there is no title view than try to make one from the title
            if( !title_view && ((title = view.title) || (title = self.default_title)) ){
                title_view = self._makeTitle(title);
            }
            // figure out default values
            if(self._back_btn){
                self._back_btn.removeEventListener(evt.PRESS, self, "_onBackClick");
            }
            else if(self._cancel_btn){
                self._cancel_btn.removeEventListener(evt.PRESS, self, "_onCancelClick");
            }
            if(!cancel_view){
                if(index > 0){
                    cancel_view = self._makeBackButton(stack.getElmAt(index - 1));
                }
                else if(self.cancel_visible){
                    cancel_view = self._cancel_btn = self._makeCancelButton(self.cancel_label, self.cancel_icon);
                }
            }
            if(index > 0){
                self._back_btn = cancel_view;
                cancel_view.addEventListener(evt.PRESS, self, "_onBackClick");
            }
            else if(cancel_view){
                self._cancel_btn = cancel_view;
                cancel_view.addEventListener(evt.PRESS, self, "_onCancelClick");
            }
            // figure out the transition
            if(left != cancel_view){
                if(left){
                    bl.appendChild(left);
                }
                if(cancel_view){
                    tl.appendChild(cancel_view);
                }
            }
            if(right != action_view){
                if(right){
                    br.appendChild(right);
                }
                if(action_view){
                    tr.appendChild(action_view);
                }
            }
            if(center != title_view){
                if(center){
                    bt.appendChild(center);
                }
                if(title_view){
                    tt.appendChild(title_view);
                }
            }
            // setup the top
            t.x = 0;
            t.alpha = 1;
            b.x = 0;
            b.alpha = 1;
            // check to see if we should animate or not
            var e = transition && transition.effect ? transition.effect : OjTransition.DEFAULT;
            if(e == OjTransition.NONE){
                // remove the animating css class since we aren"t anymore
                self.removeCss("animating");
                // make the necessary changes to the left, title & right bottom components components
                t.show();
                b.hide();
                bl.removeAllChildren();
                bt.removeAllChildren();
                br.removeAllChildren();
                return;
            }
            // setup the transition
            self.addCss("animating");
            self._tween = new OjTweenSet();
            // figure out the direction and then update
            var direction = 0,
                duration = transition.duration,
                easing = transition.easing,
                width = self.width;
            if(old_index != -1){
                if(old_index > index){
                    direction = width * -.5;
                }
                else if(old_index < index){
                    direction = width * .5;
                }
            }
            if(direction && e != OjTransition.FADE){
                // todo: OjFlowNavController - add support for multiple transition effects
                // update the display of the controller bar
                // setup the display
                b.x = 0;
                t.x = direction;
                t.alpha = 0;
                self._tween.addTween(new OjMove(b, OjMove.X, -1 * direction * .5, duration * .5), easing[1]);
                self._tween.addTween(new OjMove(t, OjMove.X, 0, duration, easing[1]));
            }
            else{
                t.alpha = 0;
            }
            self._tween.addTween(new OjFade(b, OjFade.OUT, duration, easing[1]));
            self._tween.addTween(new OjFade(t, OjFade.IN, duration, easing[0]));

            // start the transition
            self._tween.addEventListener(OjTweenEvent.COMPLETE, self, "_onTweenComplete");
            self._tween.start();
        },

        // event handler functions
        "_onBackClick" : function(evt){
            this.back();
        },
        "_onCancelClick" : function(evt){
            this.cancel();
        },
        "_onStackChange" : function(evt){
            this._update(evt.view, evt.transition, evt.index, evt.oldIndex);
        },
        "_onTweenComplete" : function(evt){
            this._unset("_tween");
            this.btm_left.removeAllChildren();
            this.btm_title.removeAllChildren();
            this.btm_right.removeAllChildren();
            this.removeCss("animating");
        },

        // public methods
        "back" : function(){
            var self = this,
                stack = self.stack;
            stack.active_index = stack.active_index - 1;
            self.dispatchEvent(new OjEvent(OjFlowNavController.BACK));
        },
        "cancel" : function(){
            this.dispatchEvent(new OjEvent(OjEvent.CANCEL, false));
        },

        // stack view functions
        "pushView" : function(view, transition){
            var stack = this.stack;
            stack.appendElm(view);
            stack.active = isSet(transition) ? [view, transition] : view;
        },
        "popToView" : function(view, transition){
            this.popToViewAt(this.stack.indexOfElm(view), transition);
        },
        "popToViewAt" : function(index, transition){
            this.stack.active_index = [index, transition];
        },
        "popView" : function(transition){
            this.popToViewAt(this.stack.num_elms - 2, transition);
        },

        // public properties
        "=title" : function(title){
            var self = this,
                hldr = self.top_title;
            if(self._title == title){
                return;
            }
            
            self._title = title;
            hldr.removeAllChildren();
            
            hldr.appendChild(
                self._makeTitle(title)
            );
        },
        "=cancel_label" : function(val){
            var self = this,
                btn = self._cancel_btn;
            self._cancel_label = val;
            if(btn){
                btn.label = val;
            }
        },
        "=cancel_icon" : function(val){
            var self = this,
                btn = self._cancel_btn;
            self._cancel_icon = val;
            if(btn){
                btn.icon = val;
            }
        },
        "=cancel_visible" : function(val){
            var self = this;
            if(!(self._cancel_visible = val) && self._cancel_btn){
                self._unset("_cancel_btn");
            }
        }
    },
    {
        "_TAGS" : ["flow-nav", "flow-nav-controller"],
        "BACK" : "onFlowNavBack"
    }
);

OJ.extendClass(
    'OjCollectionEvent', [OjEvent],
    {
        '_get_props_' : {
            'items'    : null,
            'index'  : null,
            'old_items' : null
        },

        '_constructor' : function(type, items, index, old_items, bubbles, cancelable){
            var self = this,
                params = [type];
            self._items = items;
            self._index = index;
            self._old_items = old_items;
            if(isSet(bubbles)){
                params.append(bubbles);
                if(isSet(cancelable)){
                    params.append(cancelable);
                }
            }
            self._super(OjEvent, '_constructor', params);
        },
        'clone' : function(){
            var self = this,
                evt = self._super(OjEvent, 'clone', arguments);
            evt._items = self._items;
            evt._index = self._index;
            evt._old_items = self._old_items;
            return evt;
        }
    },
    {
        'ITEM_ADD'     : 'onItemAdd',
        'ITEM_CHANGE'  : 'onItemChange',
        'ITEM_PRESS'   : 'onItemPress',
        'ITEM_OVER'    : 'onItemOver',
        'ITEM_OUT'     : 'onItemOut',
        'ITEM_MOVE'    : 'onItemMove',
        'ITEM_REMOVE'  : 'onItemRemove',
        'ITEM_REPLACE' : 'onItemReplace',

        'isChangeEvent' : function(evt){
            if(!evt){
                return false;
            }
            var self = this,
                type = evt.type;
            return evt.is(OjCollectionEvent) && (
                type == self.ITEM_ADD || type == self.ITEM_MOVE || type == self.ITEM_REMOVE || type == self.ITEM_REPLACE
            );
        }
    }
);

OJ.extendComponent(
    'OjCollectionComponent', [OjComponent],
    {
        // Internal Properties
        '_props_' : {
            'item_renderer' : null
        },
        // Internal Methods
        '_constructor' : function(elms, item_renderer){
            this._super(OjComponent, '_constructor', arguments);
            this._item_events = {};
            this._rendered = {};
            if(item_renderer){
                this.item_renderer = item_renderer;
            }
            this.elms = OjArray.array(elms|| []);
        },
        '_destructor' : function(){
            // remove all rendered items
            var rendered = this._rendered,
                key;
            for(key in rendered){
                OJ.destroy(rendered[key]);
            }
            // clear out the helper vars
            this._rendered = this._item_events = null;
            this._super(OjComponent, '_destructor', arguments);
        },

        // event functions
        '_addItemListener' : function(type){
            // apply the event listener to all the rendered items if it hasn't already been
            if(!this._item_events[type]){
                var evt = this._convertItemEventType(type),
                    key;
                if(evt){
                    for(key in this._rendered){
                        this._rendered[key].addEventListener(evt[0], this, evt[1]);
                    }
                    this._item_events[type] = evt[0];
                }
            }
        },
        '_convertItemEventType' : function(type){
            var col_evt = OjCollectionEvent,
                ui_evt = OjUiEvent;
            // convert the item event into a mouse event
            if(type == col_evt.ITEM_PRESS){
                return [ui_evt.PRESS, '_onItemPress'];
            }
            if(type == col_evt.ITEM_OVER){
                return [ui_evt.OVER, '_onItemOver'];
            }
            if(type == col_evt.ITEM_OUT){
                return [ui_evt.OUT, '_onItemOut'];
            }
            return null;
        },
        '_dispatchItemEvent' : function(type, evt){
            var self = this,
                item = evt.current_target;
            if(self.item_renderer){
                item = item.data;
            }
            self.dispatchEvent(new OjCollectionEvent(type, [item], self.elms.indexOf(item)));
        },
        '_removeItemListener' : function(type){
            // make sure that no other listeners for this type exist
            if(!this.hasEventListener(type)){
                var evt = this._convertItemEventType(type),
                    key;
                if(evt){
                    // un-apply the event listener to all the rendered items
                    for(key in this._rendered){
                        this._rendered[key].removeEventListener(evt[0], this, evt[1]);
                    }
                    // remove the record fo this item event
                    delete this._item_events[type];
                }
            }
        },

        // event listeners
        '_onItemAdd' : function(evt){
            this.dispatchEvent(evt.clone());
        },
        '_onItemChange' : function(evt){
            this.dispatchEvent(evt.clone());
        },
        '_onItemPress' : function(evt){
            this._dispatchItemEvent(OjCollectionEvent.ITEM_PRESS, evt);
        },
        '_onItemOut' : function(evt){
            this._dispatchItemEvent(OjCollectionEvent.ITEM_OUT, evt);
        },
        '_onItemOver' : function(evt){
            this._dispatchItemEvent(OjCollectionEvent.ITEM_OVER, evt);
        },
        '_onItemMove' : function(evt){
            this.dispatchEvent(evt.clone());
        },
        '_onItemRemove' : function(evt){
            var self = this;
            self.dispatchEvent(evt.clone());
            evt.items.forEachReverse(function(item, index){
                self.unrenderItem(item, index)
            });
        },
        '_onItemReplace' : function(evt){
            var self = this;
            self.dispatchEvent(evt.clone());
            evt.old_items.forEachReverse(function(item, index){
                self.unrenderItem(item, index)
            });
        },

        // elm methods
        '_callElmFunc' : function(func, args){
            return this._callElmProp(func).apply(this.elms, args);
        },
        '_callElmProp' : function(prop, val){
            var cls = this._static,
                container = this.elms,
                translated;
            translated = cls.ELM_FUNCS[prop];
            if(arguments.length > 1){
                container[translated] = val;
            }
            return container[translated]
        },

        // Public Methods
        'addEventListener' : function(type){
            this._super(OjComponent, 'addEventListener', arguments);
            this._addItemListener(type);
        },
        'removeEventListener' : function(type){
            this._super(OjComponent, 'removeEventListener', arguments);
            this._removeItemListener(type);
        },
        //'redraw' : function(){
        //    if(this._super(OjComponent, 'redraw', arguments)){
        //        //this.container.forChildReverse(
        //        //    function(i, child){
        //        //        if(child.is(OjComponent)){
        //        //            child.redraw();
        //        //        }
        //        //    }
        //        //);
        //
        //        return true;
        //    }
        //
        //    return false;
        //},
        'renderItem' : function(item, index){
            if(!item){
                return null;
            }
            var self = this,
                cls = self.item_renderer,
                key, evt,
                id = isObjective(item) ? item.oj_id : (isUnset(index) ? item.toString() : index);
            // if we have already rendered the item then just return the cached value
            if(self._rendered[id]){
                return self._rendered[id];
            }
            item = cls ? new cls(self, item) : item;
            for(key in self._item_events){
                evt = self._convertItemEventType(key);
                item.addEventListener(evt[0], this, evt[1]);
            }
            return self._rendered[id] = item;
        },
        'renderItemAt' : function(index){
            return this.renderItem(this.elms[index]);
        },
        'unrenderItem' : function(item){
            var self = this,
                id = item.oj_id,
                elm = self._rendered[id];
            if(elm){
                delete self._rendered[id];
                // only destroy it if we made it.
                if(item != elm){
                    OJ.destroy(elm);
                }
            }
        },
        'unrenderItemAt' : function(index){
            this.unrenderItem(this.elms[index]);
        },

        // Public Properties
        '.elms' : function(){
            return this._elms;
        },
        '=elms' : function(val){
            var self = this,
                elms = self._elms;
            val = OjArray.array(val);
            if(elms == val){
                return;
            }
            var col_evt = OjCollectionEvent,
                add_evt = col_evt.ITEM_ADD, add_func = '_onItemAdd',
                change_evt = col_evt.ITEM_CHANGE, change_func = '_onItemChange',
                move_evt = col_evt.ITEM_MOVE, move_func = '_onItemMove',
                out_evt = col_evt.ITEM_OUT, out_func = '_onItemOut',
                over_evt = col_evt.ITEM_OVER, over_func = '_onItemOver',
                press_evt = col_evt.ITEM_PRESS, press_func = '_onItemPress',
                remove_evt = col_evt.ITEM_REMOVE, remove_func = '_onItemRemove',
                replace_evt = col_evt.ITEM_REPLACE, replace_func = '_onItemReplace';
            // cleanup the old items if it existed
            if(elms){
                elms.removeEventListener(add_evt, self, add_func);
                elms.removeEventListener(change_evt, self, change_func);
                elms.removeEventListener(move_evt, self, move_func);
                elms.removeEventListener(out_evt, self, out_func);
                elms.removeEventListener(over_evt, self, over_func);
                elms.removeEventListener(press_evt, self, press_func);
                elms.removeEventListener(remove_evt, self, remove_func);
                elms.removeEventListener(replace_evt, self, replace_func);
                if(elms){
                    elms.forEachReverse(function(item){
                        self.unrenderItem(item);
                    });
                }
            }
            // setup the new items
            self._elms = val;
            val.addEventListener(add_evt, self, add_func);
            val.addEventListener(change_evt, self, change_func);
            val.addEventListener(move_evt, self, move_func);
            val.addEventListener(remove_evt, self, remove_func);
            val.addEventListener(replace_evt, self, replace_func);
            return true;
        },
        '=item_renderer' : function(val){
            val = isString(val) ? OJ.stringToClass(val) : val;
            if(val == this._item_renderer){
                return;
            }
            this._item_renderer = val;
        }
    },
    {
        '_TAGS' : ['collection'],
        'ELM_FUNCS' : {
            'appendElm' : 'append',
            'elms' : 'items',
            'forElm' : 'for',
            'forReverseElm' : 'forReverse',
            'getElmAt' : 'getAt',
            'hasElm' : 'contains',
            'indexOfElm' : 'indexOf',
            'insertElmAt' : 'insertAt',
            'moveElm' : 'move',
            'prependElm': 'prepend',
            'num_elms' : 'length',
            'removeAllElms' : 'removeAll',
            'removeElm' : 'remove',
            'removeElmAt' : 'removeAt',
            'replaceElm' : 'replace',
            'replaceElmAt' : 'setAt'
        }
    }
);


OJ.extendClass(
    'OjResize', [OjDimTween],
    {
        '=amount' : function(amount){
            this._super(OjDimTween, '=amount', arguments);
            if(this._direction == OjResize.BOTH){
                this._to.width = amount[0];
                this._to.height = amount[1];
            }
            else if(this._direction == OjResize.WIDTH){
                this._to.width = amount;
            }
            else{
                this._to.height = amount;
            }
        }
    },
    {
        'WIDTH'  : OjDimTween.HORIZONTAL,
        'HEIGHT' : OjDimTween.VERTICAL,
        'BOTH'   : OjDimTween.BOTH
    }
);
/*
 * Note: Stack requires defined dimensions for transitions to work properly
 */

OJ.extendComponent(
    'OjStack', [OjCollectionComponent],
    {
        // Properties & Vars
        '_props_' : {
            'active' : null,
            'active_index' : 0,
            'allow_looping' : true, // todo: OjStack - add support for looping
            'always_trans' : false,
            'auto_size_height' : false, // todo: OjStack - add support for auto size height
            'auto_size_width' : false, // todo: OjStack - add support for auto size width
            'transition' : null
        },
        '_get_props_' : {
            'has_deferred' : null
        },
//            '_active_elm' : null,  '_deferred_active' : null,  '_prev_active' : null,
//
//            '_trans_in' : null,  '_trans_out' : null,
        '_current_index' : 0,  '_prev_index' : 0,  '_transitioning' : false,

        // Construction & Destruction Functions
        '_constructor' : function(items, transition, item_renderer){
            var self = this;
            self.transition = transition || OjTransition.NONE;
            self._super(OjCollectionComponent, '_constructor', [items, item_renderer]);
        },
        '_destructor' : function(){
            var ln,
                args = arguments,
                depth = args.length && args[0];
            // unset transitions
            this._unset('_trans_in', true);
            this._unset('_trans_out', true);
            // unset previous active
            if(this._prev_active){
                this._removeActive(this._prev_active);
                this._prev_active = null;
            }
            // unset current active
            if(this._active){
                this._removeActive();
                this._active = null;
            }
            // unset views
            if(depth > 1){
                ln = this.num_elms;
                for(; ln--;){
                    OJ.destroy(this.renderItemAt(ln), depth);
                }
            }
            // remove object references
            this._controller = this._transition = null;
            return this._super(OjCollectionComponent, '_destructor', args);
        },

        // Element Management Functions
        '_callElmFunc' : function(func, args){
            var self = this,
                trans = self.transition,
                index = -1;
            args = Array.array(args);
            // detect transition flag
            switch(func){
                case 'removeAllElms':
                    index = 0;
                break;
                case 'removeElmAt':
                case 'appendElm':
                case 'removeElm':
                    index = 1;
                break;
                case 'insertElmAt':
                case 'replaceElmAt':
                case 'moveElm':
                case 'replaceElm':
                    index = 2;
                break;
            }
            // handle transition flag
            if(index > -1){
                if(args.length > index){
                    this.transition = this._processTransParam(args[index]);
                    args.removeLast();
                }
            }
            // call the elm func
            var rtrn = self._callElmProp(func).apply(self.elms, args);
            // return transition to previous state
            if(index > -1){
                this.transition = trans;
            }
            return rtrn
        },
        '_processDomSourceChild' : function(dom_elm, context){
            if(OjElement.isTextNode(dom_elm)){
                return false;
            }
            return this._super(OjCollectionComponent, '_processDomSourceChild', arguments);
        },
        '_processDomSourceChildren' : function(dom_elm, context){
            var children = dom_elm.childNodes,
                ln = children.length,
                i = 0, child;
            for(; i < ln; i++){
                if(child = this._processDomSourceChild(children[i], context)){
                    // remove the child from the dom source
                    child.parent = null;
                    // add the child to our stack
                    this.appendElm(child);
                    // if we add then we need to decrement the counter and length since
                    // a child will have been removed from the child nodes array
                    i += children.length - ln;
                    ln = children.length;
                }
            }
        },
        // Helper Functions
        '_addActive' : function(item, index){
            this._active = item;
            this._active_index = index;
            this._addActiveElm(this.renderItem(item));
        },
        '_addActiveElm' : function(elm){
            elm.is_active = true;
            this.container.appendChild(elm);
        },
        '_animationDirection' : function(start, finish){
            return start < finish ? -1 : 1;
        },
        '_dispatchChangeComplete' : function(){
            var self = this,
                container = self.container;
            container.width = OjStyleElement.AUTO;
            container.height = OjStyleElement.AUTO;
            self._transitioning = false;
            self.dispatchEvent(new OjStackEvent(OjStackEvent.CHANGE_COMPLETE, self._active, self._transition, self._active_index, self._prev_index));
            // process any deferred
            if(!isNull(self._deferred_active)){
                self.active_index = self._deferred_active;
            }
        },
        '_makeTransIn' : function(direction){
            var amount = 0, elm,
                container = this.container,
                w = container.width,
                h = container.height;
            this._unset('_trans_in');
            if(!direction){
                return null;
            }
            elm = container.getChildAt(
                Math.bounds(container.num_children - 1, 0, 1)
            );
            // force container dims
            container.width = w;
            container.height = h;
            // TODO: add in height transition
            switch(this._transition.effect){
                case OjTransition.FADE:
                    if(this._trans_out){
                        return null;
                    }
                    amount = 1;
                    break;
                case OjTransition.SLIDE_HORZ:
                    elm.x = -1 * direction * w;
                    break;
                case OjTransition.SLIDE_VERT:
                    elm.y = -1 * direction * h;
                    break;
            }
            if(this._trans_in = this._transition.make(elm, OjTransition.IN, amount)){
                this._trans_in.addEventListener(OjTweenEvent.COMPLETE, this, '_onTransIn');
                this._trans_in.start();
                this._setIsAnimating(true);
            }
            else if(!this._trans_out){
                // dispatch the change is complete
                this._dispatchChangeComplete();
            }
            return this._trans_in;
        },
        '_makeTransOut' : function(direction){
            var amount = 0,
                container = this.container,
                w = container.width,
                h = container.height,
                elm = container.getChildAt(0);
            this._unset('_trans_out');
            // force container dims
            container.width = w;
            container.height = h;
            if(elm){
                switch(this._transition.effect){
                    case OjTransition.SLIDE_HORZ:
                        amount = elm.x + (direction * w);
                        break;
                    case OjTransition.SLIDE_VERT:
                        amount = elm.y + (direction * h);
                        break;
                }
                if(this._trans_out = this._transition.make(elm, OjTransition.OUT, amount)){
                    elm.addCss('prev-active');
                    this._trans_out.addEventListener(OjTweenEvent.COMPLETE, this, '_onTransOut');
                    this._trans_out.start();
                    this._setIsAnimating(true);
                }
                else{
                    this._removeActive(this._prev_active);
                }
            }
            return this._trans_out;
        },
        '_processIndex' : function(index){
            var ln = this.num_elms;
            if(this.allow_looping){
                index = index % ln;
                // set the active
                if(index < 0){
                    return ln + index;
                }
                return index;
            }
            return Math.bounds(index, 0, ln - 1);
        },
        '_processTransParam' : function(param){
            if(!param){
                return OjStack.NONE;
            }
            if(param === true){
                return this._transition;
            }
            return param;
        },
        '_removeActive' : function(item){
            var self = this,
                elm = item || self.getElmAt(self._active_index);
            if(elm){
                if(self._item_renderer){
                    // find the matching elm
                    // NOTE: this will not function properly if it can't find a match since it sets the elm on each pass
                    self.container.children.forEachReverse(function(x){
                        if(x.data == item){
                            return false;
                        }
                    });
                }
                self._removeActiveElm(elm);
            }
        },
        '_removeActiveElm' : function(elm){
            // remove the elm from the display
            this.container.removeChild(elm);
            elm.removeCss('prev-active');
            elm.width = OjStyleElement.AUTO;
            elm.height = OjStyleElement.AUTO;
            elm.alpha = 1;
            elm.is_active = false;
        },

        // Event Handler Functions
        '_onItemAdd' : function(evt){
            this._super(OjCollectionComponent, '_onItemAdd', arguments);
            // since we are using a collection to keep track of things the parent won't get properly changes
            // so we need to do it here
            var index = evt.index,
                item = evt.items.first;
            this.dispatchEvent(new OjStackEvent(OjStackEvent.ADD, item, this._transition, index));
            if(!this._active){
                this.active_index = index;
            }
            else{
                this._active_index = this._current_index = this.indexOfElm(this._active);
            }
        },
        '_onItemMove' : function(evt){
            this._super(OjCollectionComponent, '_onItemMove', arguments);
            this.dispatchEvent(new OjStackEvent(OjStackEvent.MOVE, evt.item, this._transition, evt.index));
            if(this._active == evt.item){
                this._active_index = this._current_index = evt.index;
                // todo: add logic for stack item move current_index
            }
        },
        '_onItemRemove' : function(evt){
            this._super(OjCollectionComponent, '_onItemRemove', arguments);
            var ln,
                item = evt.items.first,
                index = evt.index;
            this.dispatchEvent(new OjStackEvent(OjStackEvent.REMOVE, item, this._transition, index));
            if(this._active == item){
                if(this._current_index){
                    this.active_index = this._current_index - 1;
                }
                else if(ln = this.num_elms){
                    this.active_index = ln - 1;
                }
                else{
                    this._active = null;
                    this._active_index = this._current_index = 0;
                }
            }
            else{
                if(this._prev_active == item){
                    this._prev_active = null;
                }
                this._active_index = this._current_index = this.indexOfElm(this._active);
            }
        },
        '_onItemReplace' : function(evt){
            var self = this,
                item = evt.items.first,
                index = evt.index,
                active_index = self._active_index;
            self._super(OjCollectionComponent, '_onItemReplace', arguments);
            self.dispatchEvent(new OjStackEvent(OjStackEvent.REPLACE, item, self._transition, index));
            if(active_index == index){
                self._current_index = -1;
                self.active_index = index;
            }
        },
        '_onTransIn' : function(evt){
            // cleanup the transition
            this._unset('_trans_in');
            // if there are no more transitions get us out of animating mode
            if(!this._trans_out){
                this._setIsAnimating(false);
                // dispatch the change is complete
                this._dispatchChangeComplete();
            }
        },
        '_onTransOut' : function(evt){
            // cleanup the transition
            this._unset('_trans_out');
            // remove the previously active item/elm
            this._removeActive(this._prev_active);
            // if there are no more transitions get us out of animating mode
            if(!this._trans_in){
                this._setIsAnimating(false);
                // dispatch the change is complete
                this._dispatchChangeComplete();
            }
            // unset prev vars since they are no longer needed
            this._prev_active = null;
            this._prev_index = null;
        },

        // Utility Functions
        'next' : function(){
            this.active_index = this._current_index + 1;
        },
        'prev' : function(){
            this.active_index = this._current_index - 1;
        },
        'renderItemAt' : function(index){
            return this._super(OjCollectionComponent, 'renderItemAt', [this._processIndex(index)]);
        },

        // Getter & Setter Functions
        '=active' : function(val/*, transition*/){
            if(!isArray(val)){
                val = [val];
            }
            if((val[0] = this.indexOfElm(val[0])) > -1){
                this.active_index = val;
            }
        },

        // Getter & Setter Functions
        '=active_index' : function(val/*, transition*/){
            var self = this,
                active = self.active,
                always_trans = self.always_trans,
                trans = self.transition, tmp_trans = trans,
                trans_diff, item, direction, evt;
            // handle tuple
            if(isArray(val)){
                trans_diff = val.length > 1 ? val[1] : true;
                val = val[0];
            }
            // check for change
            if(self._current_index == val && active){
                return;
            }
            // if we are in the middle of an animation then deffer the change until afterward
            if(self._transitioning){
                self._deferred_active = [val, trans_diff];
                return;
            }
            self._transitioning = true;
            // handle custom transition if it exists
            if(trans_diff){
                self.transition = self._processTransParam(trans_diff);
                tmp_trans = self.transition;
            }
            self._deferred_active = null;
            // transition out the old active container
            if(active){
                // get the old element
                self._prev_active = active;
                // update the direction
                // create the transition out animation
                self._makeTransOut(direction = self._animationDirection(self._prev_index = self._active_index, val));
            }
            else{
                direction = always_trans ? 1 : 0;
                self._prev_index = 0;
            }
            self._current_index = val = self._processIndex(val);
            // make sure we have something to set active
            if(!self.num_elms){
                self._active_index = 0;
                self._current_index = 0;
                self._active = null;
                self.dispatchEvent(
                    new OjStackEvent(OjStackEvent.CHANGE, null, tmp_trans, 0, self._prev_index)
                );
                self._transitioning = false;
                return;
            }
            // create the change event
            evt = new OjStackEvent(
                OjStackEvent.CHANGE, item = self.getElmAt(val),
                self._trans_out || always_trans ? tmp_trans : OjTransition.DEFAULT,
                val, self._prev_index
            );
            self._addActive(item, val);
            // transition in the new active container
            // but only if we are transitioning out an old active
            if(self._trans_out || always_trans){
                self._makeTransIn(direction);
            }
            if(trans_diff){
                self.transition = trans;
            }
            // dispatch the change event
            self.dispatchEvent(evt);
            // dispatch the change is complete
            // if no animation
            if(!self._trans_out && !always_trans){
                self._dispatchChangeComplete();
            }
        },
        '=allow_looping' : function(allow_looping){
            if(this._allow_looping == allow_looping){
                return;
            }
            // check to see if current index is out of bounds
            if(!(this._allow_looping = allow_looping)){
                var ln = this.num_elms;
                if(this._current_index < 0){
                    this.active_index = (ln - this._current_index) % ln;
                }
                else if(this._current_index >= ln){
                    this.active_index = this._current_index % ln;
                }
            }
        },
        '=elms' : function(){
            this._super(OjCollectionComponent, '=elms', arguments);
            this._current_index = 0;
            this.active_index = this.active_index;
        },
        '.has_deferred' : function(){
            return !isEmpty(this._deferred_active);
        },
        '=transition' : function(val){
            var self = this;
            if(self._transition == val){
                return;
            }
            self._transition = OjTransition.transition(val, self._transition);
        }
    },
    {
        '_TAGS' : ['stack']
    }
);
 
OJ.extendComponent(
    'OjNavStack', [OjStack],
    {
        '_props_' : {
            'controller' : null
        },

        '_destructor' : function(){
            // make sure to remove stack and controller references
            if(this._active){
            }
            if(this._prev_active){
                //this._unload(this._prev_active);
            }
            // continue on
            this._super(OjStack, '_destructor', arguments);
        },

        '_addActive' : function(item, index){
            this._super(OjStack, '_addActive', arguments);
            item.load();
        },
        '_removeActive' : function(item){
            var self = this;
            (item || self.getElmAt(self._active_index)).unload();
            self._super(OjStack, '_removeActive', [item]);
        },

        'renderItem' : function(){
            var self = this,
                elm = self._super(OjStack, 'renderItem', arguments);
            elm.controller = self.controller;
            elm.stack = self;
            return elm;
        },
        'unrenderItem' : function(item){
            var self = this,
                elm = self._rendered[item.id];
            if(elm){
                elm.controller = null;
                elm.stack = null;
            }
            return self._super(OjStack, 'unrenderItem', arguments);
        },

        '=controller' : function(val){
            var self = this,
                rendered = self._rendered,
                id;
            if(self._controller == val){
                return;
            }
            (self._controller = val).stack = self;
            // update the items in this stack with the latest
            for(id in rendered){
                rendered[id].controller = val;
            }
        }
        //,
        //
        //
        //'=active_index' : function(val){
        //    var self = this,
        //        prev_active = self._active,
        //        active;
        //
        //    self._super(OjStack, '=active_index', arguments);
        //
        //    if((active = self._active) != prev_active){
        //        //if(prev_active){
        //        //    prev_active.unload();
        //        //}
        //
        //        //if(active){
        //        //    active.load();
        //        //}
        //    }
        //}
    },
    {
        '_TAGS' : ['nav-stack']
    }
);


OJ.extendClass(
    'OjAlertEvent', [OjEvent],
    {
        '_get_props_' : {
            'buttonIndex' : -1
        },

        '_constructor' : function(type/*, button_index = -1, bubbles = false, cancelable = false*/){
            var cancelable, bubbles = cancelable = false, ln = arguments.length;
            if(ln > 1){
                this._buttonIndex = arguments[1];
                if(ln > 2){
                    bubbles = arguments[2];
                    if(ln > 3){
                        cancelable = arguments[3];
                    }
                }
            }
            this._super(OjEvent, '_constructor', [type, bubbles, cancelable]);
        }
    },
    {
        'BUTTON_PRESS' : 'onAlertButtonClick'
    }
);

OJ.extendComponent(
    'OjIcon', [OjComponent], {
        '_props_' : {
            'source' : null
        },
        '_template' : '<i></i>',

        '_constructor' : function(icon_class){
            var self = this,
                args = arguments;
            self._super(OjComponent, '_constructor', []);
            if(icon_class){
                self.source = args.length == 1 ? icon_class : Array.array(args).join(' ');
            }
        },
        '_processDomSourceChild' : function(){
            var self = this,
                child = self._super(OjComponent, '_processDomSourceChild', arguments);
            if(child && child.is(OjTextElement)){
                self.source = child.text;
                return;
            }
            return child;
        },
        '_setCss' : function(){
            // don't do anything here
        },
        '=source' : function(val){
            var self = this,
                old = self._source;
            if(old == val){
                return;
            }
            if(old){
                self.removeCss(old);
            }
            if(self._source = val){
                self.addCss(val);
            }
        }
    },
    {
        '_TAGS' : ['i', 'icon']
    }
);

OJ.extendComponent(
    'OjLink', [OjLabel],
    {
        '_props_' : {
            'down_icon'     : null,
            'icon'         : null,
            'over_icon'     : null,
            'target'       : null,
            'target_height' : null,
            'target_width'  : null,
            'url'          : null
        },
        '_template' : '<a class="no-icon no-label" flex-h><span var=icn></span><span var=lbl></span></a>',

        '_constructor' : function(/*label, url, target*/){
            var self = this;
            self._super(OjLabel, '_constructor', []);
            self._processArguments(arguments, {
                'text' : undefined,
                'url' : undefined,
                'target' : WindowManager.SELF
            });
            self._enableUiEvents();
        },
        '_destructor' : function(){
            // just to make sure that the document mouse move event listener gets removed
            OJ.removeEventListener(OjUiEvent.MOVE, this, '_onMouseMove');
            this._super(OjLabel, '_destructor', arguments);
        },

        '_processAttribute' : function(dom, attr, context){
            if(attr.nodeName == 'href'){
                this.url = attr.value;
                return true;
            }
            return this._super(OjLabel, '_processAttribute', arguments);
        },
        '_processDomSourceChild' : function(){
            var self = this,
                child = self._super(OjLabel, '_processDomSourceChild', arguments);
            if(child && (child.is(OjIcon) || child.is(OjImage))){
                self.icon = child;
                return;
            }
            return child;
        },

        '_redrawText' : function(){
            var self = this,
                txt = (self.prefix || '') + (self.text || '') + (self.suffix || '').trim();
            self.lbl.text = txt;
            if(isEmpty(txt)){
                self.addCss("no-label");
            }
            else{
                self.removeCss("no-label");
            }
        },
        '_updateIcon' : function(val){
            var self = this,
                icn = self.icn;
            icn.removeAllChildren();
            if(val){
                icn.appendChild(val);
                self.removeCss("no-icon");
            }
            else{
                self.addCss("no-icon");
            }
        },

        "_onUiDown" : function(evt){
            var self = this;
            self._super(OjLabel, "_onUiDown", arguments);
            if(self._down_icon){
                self._updateIcon(self._down_icon);
            }
        },
        "_onUiOut" : function(evt){
            var self = this;
            self._super(OjLabel, "_onUiOut", arguments);
            self._updateIcon(self._icon);
        },
        "_onUiOver" : function(evt){
            var self = this;
            self._super(OjLabel, "_onUiOver", arguments);
            if(self._over_icon){
                self._updateIcon(self._over_icon);
            }
        },
        "_onUiPress" : function(evt){
            var self = this,
                url = self.url;
            self._super(OjLabel, "_onUiPress", arguments);
            if(url){
                WindowManager.open(
                    url,
                    self.target,
                    {
                        "width" : self.target_width,
                        "height" : self.target_height
                    }
                );
            }
        },
        "_onUiUp" : function(evt){
            var self = this;
            self._super(OjLabel, "_onUiUp", arguments);
            self._updateIcon(self._icon);
        },

        // GETTER & SETTER FUNCTIONS
        '=down_icon' : function(icon){
            if(this._down_icon == (icon = OjImage.image(icon))){
                return;
            }
            this._down_icon = icon;
        },
        '=icon' : function(icon){
            var self = this;
            if(!isObjective(icon, OjIcon)){
                icon = OjImage.image(icon);  // todo: revisit this to process as icon if css based and not image
            }
            if(self._icon == icon){
                return;
            }
            self._updateIcon(self._icon = icon);
        },
        '=over_icon' : function(icon){
            if(this._over_icon == (icon = OjImage.image(icon))){
                return;
            }
            this._over_icon = icon;
        },
        '=url' : function(url){
            this._url = OjUrl.url(url)
        },
        '=target' : function(target){
            if(isComponent(target)){
                target = target.id;
            }
            this._target = target;
        }
    },
    {
        '_TAGS' : ['a', 'link']
    }
);

OJ.extendComponent(
    'OjButton', [OjLink],
    {
        '_props_' : {
            'label' : null
        },

        '_constructor' : function(/*label, icon*/){
            var self = this;
            self._super(OjLink, '_constructor', []);
            self.addCss('no-select');
            self._processArguments(arguments, {
                'text' : undefined,
                'icon' : undefined
            });
        },

        'redraw' : function(){
            if(this._super(OjLink, 'redraw', arguments)){
                // note: hack for webkit render bug
                if(OJ.engine == OJ.WEBKIT){
                    this._setStyle('font-size', '1px');
                    this._setStyle('font-size', null);
                }
                return true;
            }
            return false;
        },

        '.label' : function(){
              return this.text;
        },
        '=label' : function(label){
            this.text = label;
        },
        '=is_active' : function(active){
            this._super(OjLink, '=is_active', arguments);
            if(this._icon){
                this._icon.is_active = active;
            }
        }
    },
    {
        '_TAGS' : ['button']
    }
);

OJ.extendClass(
    'OjAlert', [OjComponent],
    {
        '_props_' : {
            'buttons' : null,
            'callback' : null,
            'cancel_label' : null,
            'content' : null,
            'pane_height' : null,
            'pane_width' : null,
            'self_destruct' : 0, // OjAlert.NONE
            'title' : null
        },
        "_add_cancel_btn" : false,
        '_template' : '<div flex-h><div var=underlay></div><div var=pane><div var=bar></div><div var=container class=content></div><div var=btns flex-h></div></div></div>',

        '_constructor' : function(/*content, title, buttons, cancel_label, callback*/){
            var self = this;
            self._super(OjComponent, '_constructor', []);
            // setup the display
            if(self.oj_class_name.contains('Alert') || self._add_cancel_btn){
                self.btns.appendChild(self.cancel_btn = new OjButton(OjAlert.OK));
                self.cancel_btn.addEventListener(OjUiEvent.PRESS, self, '_onCancelPress');
            }
            self._processArguments(arguments, {
                'content' : undefined,
                'title' : undefined,
                'buttons' : undefined,
                'cancel_label' : OjAlert.CANCEL,
                'callback' : undefined
            });
        },
        '_destructor' : function(/*depth = 1*/){
            var args = arguments,
                depth = args.length ? args[0] : 0;
            if(!depth){
                // remove all the content so it doesn't get destroyed
                this.container.removeAllChildren();
            }
            return this._super(OjComponent, '_destructor', arguments);
        },

        '_onButtonClick' : function(evt){
            var self = this,
                callback = self.callback,
                index = self.btns.indexOfChild(evt.current_target) - 1; // offset for cancel
            self.dispatchEvent( new OjAlertEvent(OjAlertEvent.BUTTON_PRESS, index) );
            if(callback){
                if(callback(index) === false){
                    return;
                }
            }
            WindowManager.hide(self);
        },
        '_onCancelPress' : function(evt){
            this.cancel();
        },
        'cancel' : function(){
            var self = this,
                callback = self.callback;
            self.dispatchEvent( new OjEvent(OjEvent.CANCEL) );
            WindowManager.hide(self);
            if(callback){
                callback(-1);
            }
        },
        'hideButtons' : function(){
            this.addCss('no-buttons');
            this.btns.hide();
        },
        'present' : function(){
            WindowManager.show(this);
        },
        'showButtons' : function(){
            this.removeCss('no-buttons');
            this.btns.show();
        },

        '.buttons' : function(){
            return this._buttons ? this._buttons.clone() : [];
        },
        '=buttons' : function(buttons){
            this._buttons = buttons = buttons ? buttons.clone() : [];
            var num_btns = buttons.length,
                ln = this.btns.num_children - 1,
                diff = num_btns - ln, btn;
            if(diff > 0){
                for(; diff > 0; ){
                    this.btns.insertChildAt(btn = new OjButton(buttons[num_btns - (diff--)]), ln + 1);
                    btn.addEventListener(OjUiEvent.PRESS, this, '_onButtonClick');
                }
            }
            else if(diff < 0){
                for(; diff++ < 0; ){
                    OJ.destroy(this.btns.getChildAt(--ln - 1));
                }
            }
            for(; ln-- > 1;){
                btn = this.btns.getChildAt(ln);
                btn.label = buttons[ln];
            }
        },
        '.cancel_label' : function(){
            return this.cancel_btn.label;
        },
        '=cancel_label' : function(label){
            return (this.cancel_btn || {}).label = label;
        },
        '=content' : function(content){
            var self = this,
                container = self.container;
            if(self._content == content){
                return;
            }
            container.removeAllChildren();
            self._content = content;
            if(isString(content)){
                content = new OjStyleElement('<p>' + content.replaceAll('\n', '<br />') + '</p>');
            }
            container.appendChild(content);
        },
        '=title' : function(title){
            if(this._title == title){
                return;
            }
            this.bar.text = this._title = title;
        },
        '.pane_height' : function(){
            return this.pane.height;
        },
        '=pane_height' : function(val/*, unit*/){
            this.pane.height = Array.array(arguments);
        },
        '.pane_width' : function(){
            return this.pane.width;
        },
        '=pane_width' : function(val/*, unit*/){
            this.pane.width = Array.array(arguments);
        }
    },
    {
        'NONE' : 0,
        'SHALLOW' : 1,
        'DEEP' : 2,
        'OK' : 'Ok',
        'Cancel' : 'Cancel'
    }
);

OJ.extendClass(
    'OjModal', [OjAlert],
    {
        '_props_' : {
            'bar_visible' : true,
            'buttons_visible' : null,
            'close_visible' : null,
            'is_fullscreen' : false,
            'underlay_visible' : true
        },
        '_template' : '<div flex-h><div var=underlay></div><div var=pane><flow-nav var=bar cancel-label=Close></flow-nav><nav-stack var=container class=content></nav-stack><div var=btns></div></div></div>',

        "_constructor" : function(view, title){
            var self = this;
            self._super(OjAlert, "_constructor", []);
            // setup controller stack relationship
            self.bar.stack = self.container;
            self.close_visible = true;
            self.buttons_visible = false;
            // process arguments
            if(view){
                self.container.appendElm(view);
            }
            if(title){
                self.title = title;
            }
        },
        '_destructor' : function(depth){
            this._unset('bar', depth || 0);
            this._unset('stack', depth || 0);
            return this._super(OjAlert, '_destructor', arguments);
        },

        '_onDrag' : function(evt){
            this.pane.x += evt.deltaX;
            this.pane.y += evt.deltaY;
        },

        '=bar_visible' : function(val){
            if(this._bar_visible = val){
                this.bar.show();
                //this.bar.addEventListener(OjDragEvent.DRAG, this, '_onDrag');
            }
            else{
                this.bar.hide();
                //this.bar.removeEventListener(OjDragEvent.DRAG, this, '_onDrag');
            }
        },
        '=buttons_visible' : function(val){
            if(this._buttons_visible = val){
                this.removeCss('no-buttons');
            }
            else{
                this.addCss('no-buttons');
            }
        },
        '.close_visible' : function(){
            return this.bar.cancel_visible;
        },
        '=close_visible' : function(val){
            var self = this,
                bar = self.bar,
                evt = OjEvent.CANCEL;
            bar.cancel_visible = val;
            if(val){
                bar.addEventListener(evt, self, '_onCancelPress');
            }
            else{
                bar.removeEventListener(evt, self, '_onCancelPress');
            }
        },
        '=is_fullscreen' : function(val){
            if(this._is_fullscreen = val){
                this.addCss('fullscreen');
            }
            else{
                this.removeCss('fullscreen');
            }
        },
        '=underlay_visible' : function(val){
            if(this._underlay_visible = val){
                this.underlay.show();
            }
            else{
                this.underlay.hide();
            }
        },

        '=buttons' : function(val){
            this._super(OjAlert, '=buttons', arguments);
            if(this.btns.num_children){
                this.btns.show();
            }
            else{
                this.btns.hide();
            }
        },
        '=title' : function(title){
            this.bar.title = this._title = title;
        }
    }
);

OJ.extendManager(
    'WindowManager', 'OjWindowManager', [OjActionable],
    {
        'BLANK' : '_blank',
        'SELF' : '_self',
        'PARENT' : '_parent',
        'TOP' : '_top',
        'WINDOW' : '_window',
        'HIDE' : 'onWindowHide',
        'SHOW' : 'onWindowShow',
        '_props_' : {
            'alertClass' : OjAlert,
            'modalClass' : OjModal
        },
        '_get_props_' : {
            'holder' : null
        },
        '_constructor' : function(manager){
            var self = this;
            self._super(OjActionable, '_constructor', []);
            if(manager){
                self._modals = manager._modals;
                self._modal_holder = manager._modal_holder;
                self._overlay = manager._overlay;
                if(!OJ.is_ready){
                    OJ.removeEventListener(OjEvent.READY, manager, '_onOjReady');
                    OJ.addEventListener(OjEvent.READY, self, '_onOjReady');
                }
                OJ.destroy(manager);
            }
            else{
                self._modals = [];
                self._modal_holder = new OjStyleElement();
                self._modal_holder.addCss('WindowManager');
                if(OJ.is_ready){
                    self._onOjReady(null);
                }
                else{
                    OJ.addEventListener(OjEvent.READY, self, '_onOjReady');
                }
            }
            OJ.addEventListener(OjKeyboardEvent.SHOW, self, '_onKeyboardUpdate');
            OJ.addEventListener(OjKeyboardEvent.HIDE, self, '_onKeyboardUpdate');
        },

        '_calcWindowWidth' : function(width, fullscreen){
            var vp = OJ.viewport;
            if(fullscreen){
                return vp.width;
            }
            if(width){
                return width;
            }
            if(OJ.is_tablet && vp.width > 540){
                return 540;
            }
            return Math.round(vp.width * .85);
        },
        '_calcWindowHeight' : function(height, fullscreen){
            var vp = OJ.viewport;
            if(fullscreen){
                return vp.height;
            }
            if(height){
                return height;
            }
            if(OJ.is_tablet && vp.height > 620){
                return 620;
            }
            return Math.round(vp.height * .85);
        },
        '_isMobileModal' : function(modal){
            return modal.is(OjModal) && OJ.is_mobile
        },
        '_transIn' : function(modal){
            var anim = new OjFade(modal, OjFade.IN, 250),
                pane = modal.pane,
                h, y;
            // transition the alert/modal
            anim.addEventListener(OjTweenEvent.COMPLETE, this, '_onShow');
            anim.start();
            if(this._isMobileModal(modal)){
                h = pane.height;
                y = pane.y;
                pane.y += h;
                // transition the modal
                anim = new OjMove(pane, OjMove.Y, y, anim.duration, OjEasing.OUT);
                anim.start();
            }
        },
        '_transOut' : function(modal){
            var anim = new OjFade(modal, OjFade.OUT, 250),
                pane = modal.pane,
                h, y;
            // transition the alert/modal
            anim.addEventListener(OjTweenEvent.COMPLETE, this, '_onHide');
            anim.start();
            if(this._isMobileModal(modal)){
                h = pane.height;
                y = pane.y;
                // transition the modal
                anim = new OjMove(modal.pane, OjMove.Y, y + h, anim.duration, OjEasing.OUT);
                anim.start();
            }
        },

        '_onKeyboardUpdate' : function(evt){
            var self = this;
            if(evt.type == OjKeyboardEvent.SHOW){
                if(self._keyboard_int){
                    return;
                }
                self._keyboard_int = setInterval(function(){
                    if(self._keyboard_height == window.innerHeight){
                        clearInterval(self._keyboard_int);
                        self._keyboard_int = null;
                    }
                    else{
                        self._modal_holder.height = window.innerHeight;
                    }
                }, 50);
            }
            else{
                this._modal_holder.height = OjStyleElement.AUTO;
            }
        },
        '_onShow' : function(evt){
            var modal = evt.current_target.target;
            // destroy tween
            evt = OJ.destroy(evt);
            // dispatch show event
            modal.dispatchEvent(new OjEvent(this.SHOW));
        },

        '_onHide' : function(evt){
            var holder = this._modal_holder,
                modal = evt.current_target.target;
            // remove the modal from the holder
            holder.removeChild(modal);
            // destroy the tween
            evt = OJ.destroy(evt);
            // check to see if the modal holder is empty
            // if it is empty then hide it since there is nothing more to show
            if(!holder.num_children){
                holder.removeCss('active');
                holder.hide();
            }
            // dispatch hide event
            modal.dispatchEvent(new OjEvent(this.HIDE));
            // check to see if this modal is self destructing
            var destruct = modal.self_destruct;
            if(destruct){
                OJ.destroy(modal, destruct);
            }
        },
        '_onOjReady' : function(evt){
            var self = this,
                holder = self._modal_holder;
            OJ.removeEventListener(OjEvent.READY, self, '_onOjReady');
            document.body.appendChild(holder.dom);
            holder._setIsDisplayed(true);
            if(isEmpty(self._modals)){
                holder.hide();
            }

            // not sure why we had a timeout here... seems to be working fine without it
            //setTimeout(
            //    function(){
            //
            //    },
            //    250
            //);
        },

        'alert' : function(/*message, title, buttons, cancel_label, callback*/){
            var self = this,
                alrt = self.makeAlert.apply(self, arguments);
            self.show(alrt);
            return alrt;
        },
        'call' : function(phone){
            window.location.href = 'tel:' + phone.path.substring(1);
        },
        'close' : function(){
            window.close();
        },
        'email' : function(email){
            window.location.href = 'mailto:' + email.path.substring(1);
        },
        'browser' : function(url, title, width, height, fullscreen){
            var iframe = new OjIframe(url),
                modal = this.makeModal(iframe, title);
            if(isUnset(fullscreen)){
                fullscreen = this._isMobileModal(modal)
            }
            // update iframe dims
            iframe.width = [100, '%'];
            iframe.height = [100, '%'];
            // update the modal
            modal.addCss('browser');
            modal.self_destruct = OjAlert.DEEP;
            modal.pane_width = this._calcWindowWidth(width, fullscreen);
            modal.pane_height = this._calcWindowHeight(height, fullscreen);
            return this.show(modal);
        },
        'modal' : function(content, title, width, height, fullscreen){
            var self = this,
                args = arguments,
                modal = self.makeModal.apply(self, args);
            if(isUnset(fullscreen)){
                fullscreen = self._isMobileModal(modal);
            }
            modal.self_destruct = OjAlert.DEEP;
            modal.is_fullscreen = fullscreen;
            modal.pane_width = self._calcWindowWidth(width, fullscreen);
            modal.pane_height = self._calcWindowHeight(height, fullscreen);
            self.show(modal);
            return modal;
        },
        'hide' : function(modal){
            var modals = this._modals,
                index;
            if((index = modals.indexOf(modal)) == -1){
                return;
            }
            modals.removeAt(index);
            this._transOut(modal);
        },
        'hideLoading' : function(/*overlay*/){
            var args = arguments,
                overlay = args.length ? args[0] : this._overlay;
            if(overlay){
                overlay.hide();
            }
        },
        'image' : function(url, title, width, height, fullscreen){
            var args = arguments,
                ln = args.length,
                viewer = new OjImageViewer(url),
                modal = this.makeModal(viewer, title);
            viewer.width = [100, '%'];
            viewer.height = [100, '%'];
            modal.self_destruct = OjAlert.DEEP;
            modal.pane_width = this._calcWindowWidth(width, fullscreen);
            modal.pane_height = ln > 3 ? args[3] : this._calcWindowHeight(height, fullscreen);
            return this.show(modal);
        },
        'makeAlert' : function(content, title, buttons, cancel_label, callback){
            // make the new alert
            return this._alertClass.makeNew([
                content, title, buttons || [], cancel_label || OjAlert.CANCEL, callback
            ]);
        },
        'makeModal' : function(/*content, title*/){
            return this._modalClass.makeNew(arguments);
        },
        'moveToTop' : function(modal){
            this._modal_holder.moveChild(modal, this._modal_holder.num_children - 1);
        },
        'open' : function(url/*, target, params*/){
            // check for email
            if(url.protocol == 'mailto'){
                return this.email(url);
            }
            // check for phone call
            if(url.protocol == 'tel'){
                return this.call(url);
            }
            var args = arguments,
                ln = args.length,
                target = ln > 1 ? args[1] : this.BLANK,
                params = ln > 2 ? args[2] : {},
                specs = [], key,
                vp = OJ.viewport, scrn = OJ.screen;
            // check for text message
            if(url.protocol == 'sms' || url.protocol == 'mms'){
                return this.txt(url, params);
            }
            if(target != this.SELF && target != this.TOP && target != this.PARENT){
                if(isUnset(params.toolbar)){
                    params.toolbar = 0;
                }
                if(!params.width){
                    params.width = vp.width * .75;
                }
                if(!params.height){
                    params.height = vp.height * .75;
                }
                if(isUnset(params.top)){
                    params.top = scrn.top + Math.round((vp.height - params.height) / 2);
                }
                if(isUnset(params.left)){
                    params.left = scrn.left + Math.round((vp.width - params.width) / 2);
                }
                // merge the params into the specs string
                for(key in params){
                    specs.append(key + '=' + params[key]);
                }
                if(target == this.WINDOW){
                    // create a new target id
                    target = OJ.guid();
                }
            }
            args = [url.toString()];
            if(target != this.BLANK){
                args.append(target);
                args.append(specs.join(','));
            }
            window.open.apply(window, args);
            return target;
        },
        'show' : function(modal, depth){
            var holder = this._modal_holder;
            // store the modal
            this._modals.append(modal);
            // make sure the holder is visible
            if(!holder.isVisible){
                holder.addCss('active');
                holder.show();
            }
            // prep the modal
            modal.show();
            modal.alpha = 0;
            // add the modal
            if(isSet(depth)){
                holder.insertChildAt(modal, depth);
            }
            else{
                holder.appendChild(modal);
            }
            this._transIn(modal);
        },
        'showLoading' : function(/*message, icon*/){
            var args = arguments,
                ln = args.length,
                msg = ln ? args[0] : null,
                icon = ln > 1 ? args[1] : null,
                overlay = this._overlay;
            if(!overlay){
                overlay = this._overlay = new OjOverlay();
            }
            overlay.message = msg;
            overlay.icon = icon;
            overlay.show(this._modal_holder);
            return overlay;
        }
    }
);

OJ.extendClass(
    "OjSizeClassEvent", [OjEvent],
    {
        "_get_props_" : {
            "sizes" : null,
            "prev"  : null
        },

        "_constructor" : function(type, sizes, prev, bubbles, cancelable){
            var self = this;
            self._super(OjEvent, "_constructor", [type, bubbles, cancelable]);
            self._prev = prev;
            self._sizes = sizes;
        },

        "clone" : function(){
            var self = this,
                clone = self._super(OjEvent, "clone", arguments);
            clone._prev = self._prev;
            clone._sizes = self._sizes;
            return clone;
        }
    },
    {
        "CHANGE"   : "onSizeClassChange"
    }
);

OJ.extendComponent(
    'OjItemRenderer', [OjComponent],
    {
        '_props_' : {
            'data' : null,
            'group' : null
        },

        '_constructor' : function(/*group, data*/){
            this._super(OjComponent, '_constructor', []);
            this._processArguments(arguments, {
                'group' : null,
                'data' : null
            });
        },

        '_redrawData' : function(){
            return this._is_displayed;
        },

        'redraw' : function(){
            if(this._super(OjComponent, 'redraw', arguments)){
                this._redrawData();
                return true;
            }
            return false;
        },

        '=data' : function(data){
            var self = this;
            if(self._data == data){
                return;
            }
            self._data = data;
            self._redrawData();
        }
    },
    {
        '_TAGS' : ['item', 'item-renderer']
    }
);

OJ.extendComponent(
    'OjList', [OjCollectionComponent],
    {
        '_default_direction' : 'vert',  // OjList.VERTICAL
        '_default_renderer' : OjItemRenderer,
        '_props_' : {
            'direction' : null
        },
        '_constructor' : function(elms, item_renderer, direction){
            this._super(OjCollectionComponent, '_constructor', []);
            this._processArguments(arguments, {
                '' : undefined,
                'item_renderer' : this._default_renderer,
                'direction' : this._default_direction
            });
            if(elms){
                this.elms = elms;
            }
        },
        '_updateListCss' : function(){
            if(this.container.num_children){
                this.removeCss('is-empty');
            }
            else{
                this.addCss('is-empty');
            }
        },

        '_onItemAdd' : function(evt){
            var self = this,
                container = self.container;
            
            evt.items.forEach(function(item, i){
                container.insertChildAt(
                    self.renderItem(item, evt.index + i),
                    evt.index + i
                );
            });

            this._updateListCss();
            this._super(OjCollectionComponent, '_onItemAdd', arguments);
        },
        '_onItemMove' : function(evt){
            var self = this,
                container = self.container;
            evt.items.forEach(function(item, i){
                container.moveChild(
                    self.renderItem(item, evt.index + i),
                    evt.index
                );
            });
            self._super(OjCollectionComponent, '_onItemMove', arguments);
        },
        '_onItemRemove' : function(evt){
            var self = this,
                container = self.container;
            evt.items.forEachReverse(function(item, i){
                container.removeChildAt(evt.index + i);
            });
            self._updateListCss();
            self._super(OjCollectionComponent, '_onItemRemove', arguments);
        },
        '_onItemReplace' : function(evt){
            var self = this,
                container = self.container;
            evt.items.forEachReverse(function(item, i){
                container.replaceChildAt(self.renderItem(item, evt.index + i), evt.index + i)
            });
            self._super(OjCollectionComponent, '_onItemReplace', arguments);
        },

        '_onItemPress' : function(evt){
            this._super(OjCollectionComponent, '_onItemPress', arguments);
        },
        '_onItemOver' : function(evt){
            this._super(OjCollectionComponent, '_onItemOver', arguments);
        },
        '_onItemOut' : function(evt){
            this._super(OjCollectionComponent, '_onItemOut', arguments);
        },

        '=direction' : function(val){
            if(this._direction == val){
                return;
            }
            if(this._direction){
                this.removeCss(this._direction);
            }
            this.addCss(this._direction = val);
            return true;
        },
        '=elms' : function(val){
            var self = this,
                container = self.container,
                elms = self._elms;
            if(elms == val){
                return;
            }
            self._super(OjCollectionComponent, '=elms', arguments);
            // reset rendered object
            self._rendered = {};
            // render the new items
            self._elms.forEach(function(item, i){
                container.appendChild(self.renderItem(item, i));
            });
            // update the css
            self._updateListCss();
        }
    },
    {
        'HORIZONTAL' : 'horz',
        'VERTICAL' : 'vert',
        '_TAGS' : ['list']
    }
);

OJ.extendComponent(
    'OjTextRenderer', [OjItemRenderer],
    {
        '_template' : '<div><span var=lbl></span></div>',

        '_redrawData' : function(){
            var self = this,
                data = self._data;
            if(self._super(OjItemRenderer, '_redrawData', arguments)){
                if(isBoolean(data)){
                    data = data ? 'True' : 'False';
                }
                self.lbl.text = String.string(data);
                return true;
            }
            return false;
        }
    }
);

OJ.extendComponent(
    'OjItemEditor', [OjItemRenderer],
    {
        '_props_' : {
            'item_renderer' : OjTextRenderer
        },
        '_template' : '<div><div var=holder></div><div var=actions v-align=m><button var=delete_btn on-press=_onDeletePress>&times;</button></div></div>',

        '_resetItem' : function(){
            if(this.item){
                this.holder.removeAllChildren();
                this.item = null;
            }
        },
        '_redrawData' : function(){
            if(this._super(OjItemRenderer, '_redrawData', arguments)){
                this._resetItem();
                var data = this.data,
                    cls = item_renderer;
                if(data){
                    this.holder.appendChild(this.item = new cls(this.group, data));
                }
                return true;
            }
            return false;
        },

        '_onDeletePress' : function(evt){
            this.group.removeElm(this.data);
        },

        '=group' : function(group){
            this._super(OjItemRenderer, '=group', arguments);
            if(group){
                this.item_renderer = group.item_renderer;
            }
        }
    },
    {
        '_TAGS' : ['item-editor', 'oj-e-item', 'e-item']
    }
);

OJ.extendComponent(
    'OjEditableList', [OjList],
    {
        '_props_' : {
            'item_editor' : OjItemEditor
        },

        '_getItemRenderer' : function(){
            return this.item_editor;
        },
//
//
//        '_onElmDelete' : function(evt){
//
//        },
//
//
//        'renderItem' : function(item){
//            var elm = this._super(OjList, 'renderItem', arguments);
//
//            if(elm){
//                elm.addEventListener(this._static.DELETE, this, '_onElmDelete');
//            }
//
//            return elm;
//        }
        '=item_editor' : function(val){
            val = isString(val) ? OJ.stringToClass(val) : val;
            if(val == this._item_editor){
                return;
            }
            this._item_editor = val;
            return true;
        }
    },
    {
        '_TAGS' : ['e-list', 'edit-list']
    }
);

// TODO: title property and title elm may be conflicting
OJ.extendComponent(
    'OjFieldset', [OjComponent],
    {
        '_props_' : {
            'collapsedIcon' : null,
            'collapsedText' : 'show',
            'collapsable'   : false,
            'expandedIcon'  : null,
            'expandedText'  : 'hide',
            'isCollapsed'   : false,
            'icon'          : null,
            'title'         : null
        },
        '_template' : '<fieldset><legend var=legend></legend><a var=actuator></a><div var=container></div></fieldset>',

        '_constructor' : function(/*title*/){
            var args = arguments,
                ln = args.length;
            this._super(OjComponent, '_constructor', []);
            // remove the actuator
            this.actuator.addEventListener(OjUiEvent.PRESS, this, '_onActuatorClick');
            this.removeChild(this.actuator);
            // process arguments
            if(ln){
                this.title = args[0];
            }
        },

        '_processDomSourceChild' : function(dom_elm, component){
            var tag = dom_elm.tagName;
            if(tag && tag.toLowerCase() == 'legend'){
                var ln = dom_elm.childNodes.length, child;
                for(; ln--;){
                    child = dom_elm.childNodes[ln];
                    if(OjElement.isTextNode(child)){
                        this.title = child.nodeValue;
                    }
                }
                return null;
            }
            return this._processChild(dom_elm, component);
        },
        '_redrawActuator' : function(){
            if(this._is_displayed){
                if(this._collapsable){
                    this.actuator.height = this.legend.height;
                    if(this._isCollapsed){
                        if(this._collapsedIcon || this._collapsedText){
                            this.actuator.icon = this._collapsedIcon;
                            this.actuator.text = this._collapsedText;
                            this.insertChildAt(this.actuator, 1);
                        }
                        else{
                            this.removeChild(this.actuator);
                        }
                    }
                    else{
                        if(this._expandedIcon || this._expandedText){
                            this.actuator.icon = this._expandedIcon;
                            this.actuator.text = this._expandedText;
                            this.insertChildAt(this.actuator,  1);
                        }
                        else{
                            this.removeChild(this.actuator);
                        }
                    }
                }
                else{
                    this.removeChild(this.actuator);
                }
                return true;
            }
            return false;
        },
        '_redrawLegend' : function(){
            if(this._is_displayed){
                if(!this.title && this._title){
                    this.legend.appendChild(this.title = new OjLabel(this._title));
                }
                else if(this.title){
                    this.title.text = this._title;
                }
                if(!this.icon && this._icon){
                    this.legend.appendChild(this.icon = new OjImage(this._icon));
                }
                else if(this.icon){
                    this.icon.source = this._icon;
                }
                return true;
            }
            return false;
        },

        '_onActuatorClick' : function(evt){
            if(this._isCollapsed){
                this.expand();
            }
            else{
                this.collapse();
            }
        },
        '_onExpand' : function(evt){
            this.removeCss(['collapsed']);
            this.height = OjStyleElement.AUTO;
            OJ.destroy(evt);
        },

        'collapse' : function(){
            var tween;
            if(this._isCollapsed){
                return;
            }
            this.isCollapsed = true;
            tween = new OjResize(this, OjResize.HEIGHT, this.legend.height, 250, OjEasing.OUT);
            tween.start();
            this._redrawActuator();
        },
        'expand' : function(){
            var tween;
            if(!this._isCollapsed){
                return;
            }
            this.isCollapsed = false;
            tween = new OjResize(this, OjResize.HEIGHT, this.legend.height + this.container.height, 250, OjEasing.OUT);
            tween.addEventListener(OjTweenEvent.COMPLETE, this, '_onExpand');
            tween.start();
            this._redrawActuator();
        },
        'redraw' : function(){
            if(this._super(OjComponent, 'redraw', arguments)){
                this._redrawActuator();
                this._redrawLegend();
                return true;
            }
            return false;
        },

        '=collapsable' : function(val){
            if(this._collapsable == val){
                return;
            }
            this._collapsable = val;
            this._redrawActuator();
        },
        '=collapsedIcon' : function(val){
            if(this._collapsedIcon == val){
                return;
            }
            this._collapsedIcon = val;
            this._redrawActuator();
        },
        '=collapsedText' : function(val){
            if(this._collapsedText == val){
                return;
            }
            this._collapsedText = val;
            this._redrawActuator();
        },
        '=expandedIcon' : function(val){
            if(this._expandedIcon == val){
                return;
            }
            this._expandedIcon = val;
            this._redrawActuator();
        },
        '=expandedText' : function(val){
            if(this._expandedText == val){
                return;
            }
            this._expandedText = val;
            this._redrawActuator();
        },
        '=icon' : function(val){
            if(this._icon == val){
                return;
            }
            this._icon = val;
            this._redrawLegend();
        },
        '=isCollapsed' : function(val){
            if(this._isCollapsed == val){
                return;
            }
            if(this._isCollapsed = val){
                this.addCss('collapsed');
                this.dispatchEvent(new OjEvent(this._static.COLLAPSE));
            }
            else{
                this.removeCss('collapsed');
                this.dispatchEvent(new OjEvent(this._static.EXPAND));
            }
        },
        '=title' : function(val){
            if(this._title == val){
                return;
            }
            this._title = val;
            this._redrawLegend();
        }
    },
    {
        '_TAGS' : ['fieldset'],
        'COLLAPSE' : 'onCollapse',
        'EXPAND'   : 'onExpand'
    }
);


OJ.extendComponent(
    'OjImageButton', [OjButton],
    {
        '_constructor' : function(/*image*/){
            this._super(OjButton, '_constructor', []);
            this._processArguments(arguments, {
                'icon' : null
            });
            this.removeChild(this.label);
        },
        '_processDomSourceChildren' : function(dom_elm, component){
            var txt = dom_elm.innerHTML;
            if(!isEmpty(txt)){
                this.icon = new OjImage(txt.trim());
                return null;
            }
            return this._super(OjButton, '_processDomSourceChildren', arguments);
        },

        '_makeLabel' : function(){
            // don't do anything since we don't need a label
        },

        '.image' : function(){
            return this.icon;
        },
        '=image' : function(img){
            this.icon = img;
        }
    },
    {
        '_TAGS' : ['oj-i-button', 'i-button', 'image-button']
    }
);

OJ.extendClass(
    'OjData', [OjActionable],
    {
        '_props_' : {
            'id' : null,
            'label' : null
        },

        '_constructor' : function(/*id, label*/){
            this._super(OjActionable, '_constructor', []);
            this._processArguments(arguments, {
                'id' : undefined,
                'label' : undefined
            });
        }
    }
);

OJ.extendClass(
    'OjEventPhase', [OjObject],
    {},
    {
        'BUBBLING'  : 3,
        'CAPTURING' : 1,
        'TARGETING' : 2
    }
);



OJ.extendClass(
    'OjOrientationEvent', [OjDomEvent],
    {
        '_get_props_' : {
            'orientation' : null
        },

        '_constructor' : function(type/*, orientation = NULL, bubbles, cancelable*/){
            var args = Array.array(arguments),
                ln = args.length;
            if(ln > 1){
                this._orientation = args.removeAt(1)[0];
            }
            this._super(OjDomEvent, '_constructor', args);
        },

        'clone' : function(){
            var clone = this._super(OjDomEvent, 'clone', arguments);
            clone._orientation = this._orientation;
            return clone;
        }
    },
    {
        'convertDomEvent' : function(evt){
            var type;
            evt = OjDomEvent.normalizeDomEvent(evt);
            if(evt.type == OjDomEvent.ORIENTATION_CHANGE){
                type = OjOrientationEvent.CHANGE;
            }
            return new OjOrientationEvent(type, window.orientation, false, false);
        },
        'isOrientationEvent' : function(type){
            return type == OjOrientationEvent.CHANGE;
        },
        'isOrientationDomEvent' : function(type){
            return type == OjDomEvent.ORIENTATION_CHANGE;
        },
        'PORTRAIT' : 0,
        'LANDSCAPE_LEFT' : 90,
        'LANDSCAPE_RIGHT' : -90,
        'CHANGE'  : 'onOrienationChange'
    }
);

OJ.extendClass(
    'OjInput', [OjComponent],
    {
        '_props_' : {
            'label' : null,
            'name' : null,
            'placeholder' : null,
            'prefix' : null,
            'required' : false,
            'suffix' : null,
            'title' : null,
            'validators' : null,
            'value' : null
        },
        '_get_props_' : {
            'error' : null,
            'errors' : null
        },
        '_ready' : false, '_template' : '<div><div var=wrapper><label var=lbl></label><div var=psuedoInput><span var=prefix_lbl class=prefix></span><span var=stem><input var=input type=hidden /><label var=dflt></label></span><span var=suffix_lbl class=suffix></span></div></div></div>',

        '_constructor' : function(/*name, label, value, validators*/){
            var self = this;
            self._super(OjComponent, '_constructor', []);
            self._errors = [];
            self._validators = [];
            // detect default mode
            var has_input = 'input' in self;
            if(has_input && !isUndefined(this.input.dom.placeholder)){
                self._unset('dflt');
            }
            self._processArguments(arguments, {
                'name' : self.oj_id,
                'label' : null,
                'value' : null,
                'validators' : []
            });
            if(has_input){
                if(!self._value){
                    self.value = self.input.dom.value;
                }
                self.input.addEventListener(OjFocusEvent.IN, self, '_onInputFocusIn');
                self.input.addEventListener(OjFocusEvent.OUT, self, '_onInputFocusOut');
                self.input.addEventListener(OjDomEvent.CHANGE, self, '_onInputChange');
            }
            if(self.oj_class_name == 'OjInput'){
                self.hide();
            }
            else{
                var ln = self._supers.length,
                    cls;
                for(; ln--;){
                    cls = self._supers[ln];
                    self.addCss(OJ.classToString(cls));
                    if(cls == OjInput){
                        break;
                    }
                }
            }
            self.addEventListener(OjUiEvent.PRESS, self, '_onPress');
            self._ready = true;
        },

        '_formatError' : function(error){
            return  error.format(this._formatErrorTokens());
        },
        '_formatErrorTokens' : function(){
            return {
                'INPUT' : this.title || this.label || this.placeholder || this.name,
                'VALUE' : this.value
            };
        },
        '_redrawDefault' : function(){
            if(!this.dflt || isEmpty(this.placeholder) || !isEmpty(this.value)){
                this.addCss('no-default');
            }
            else{
                this.removeCss('no-default');
            }
            return true;
        },
        '_redrawValue' : function(){
            var self = this,
                input = self.input;
            if(input){
                var dom = input.dom,
                    val = self._value;
                if(dom.value != val){
                    dom.value = String.string(val);
                }
            }
        },
        '_onDefaultClick' : function(evt){
            if(this.input){
                this.input.focus();
            }
        },
        '_onInputFocusIn' : function(evt){
            this.addCss('focus');
        },
        '_onInputFocusOut' : function(evt){
            this.removeCss('focus');
        },
        '_onInputChange' : function(evt){
            this.value = this.input.dom.value;
        },
        '_onPress' : function(evt){
            if(this.input && !this.input.hasFocus()){
                this.focus();
            }
        },

        'blur' : function(){
            if(this.input){
                this.input.blur();
            }
        },
        'focus' : function(){
            if(this.input){
                this.input.focus();
            }
        },
        'isValid' : function(){
            this._errors = [];
            if(this._required && isEmpty(this._value)){
                this._errors.append(this._formatError(OjInput.REQUIRED_ERROR));
                return false;
            }
            return true;
        },
        'redraw' : function(){
            if(this._super(OjComponent, 'redraw', arguments)){
                this._redrawDefault();
                return true;
            }
            return false;
        },
        'validate' : function(){
            if(this.isValid()){
                this.removeCss(['error']);
                return true;
            }
            this.addCss(['error']);
            return false;
        },

        '=placeholder' : function(val){
            if(this._placeholder == val){
                return;
            }
            this._placeholder = val;
            if(this.dflt){
                if(val){
                    this.dflt.addEventListener(OjUiEvent.PRESS, this, '_onDefaultClick');
                }
                else{
                    this.dflt.removeEventListener(OjUiEvent.PRESS, this, '_onDefaultClick');
                }
                this.dflt.text = val;
                this._redrawDefault();
            }
            else if(this.input){
                this.input.attr('placeholder', val);
            }
        },
        '.error' : function(){
            return this.errors.first;
        },
        '.errors' : function(){
            var errors = this._errors;
            return errors ? errors.clone() : [];
        },
        '.form' : function(){
            if(!this._form){
                var p = this.parentComponent;
                while(p && p != OJ){
                    if(p.is(OjForm)){
                        this._form = p;
                        break;
                    }
                    p = p.parentComponent;
                }
            }
            return this._form;
        },
        '=label' : function(lbl){
            this.lbl.text = this._label = lbl;
            if(isEmpty(this._label)){
                this.addCss('no-label');
            }
            else{
                this.removeCss('no-label');
            }
        },
        '=name' : function(nm){
            if(this._name == nm){
                return;
            }
            if(this._name){
                this.removeCss(this._name.toLowerCase() + '-input');
            }
            if(this._name = nm){
                this.addCss(nm.toLowerCase() + '-input');
            }
        },
        '.notes' : function(){
            return this.notes ? this.notes.text : null;
        },
        '=notes' : function(val){
            if(!val){
                this._unset('notes_lbl');
                return;
            }
            if(!this.notes_lbl){
                this.notes_lbl = new OjLabel();
                this.notes_lbl.css = 'notes';
                this.psuedoInput.appendChild(this.notes_lbl);
            }
            this.notes_lbl.text = val;
        },
        '=prefix' : function(prefix){
            if(isString(prefix)){
                this.prefix_lbl.text = this._prefix = prefix;
            }
            else{
                if(this._prefix){
                    if(isString(this._prefix)){
                        this.prefix_lbl.removeAllChildren();
                    }
                    else{
                        this.prefix_lbl.removeChild(this._prefix);
                    }
                }
                this.prefix_lbl.appendChild(this._prefix = prefix);
            }
        },
        '=suffix' : function(suffix){
            if(isString(suffix)){
                this.suffix_lbl.text = this._suffix = suffix;
            }
            else{
                if(this._suffix){
                    if(isString(this._suffix)){
                        this.suffix_lbl.removeAllChildren();
                    }
                    else{
                        this.suffix_lbl.removeChild(this._suffix);
                    }
                }
                if(this._suffix = suffix){
                    this.suffix_lbl.appendChild(suffix);
                }
            }
        },
        '=validators' : function(validators){
            this._validators = Array.array(validators);
        },
        '=value' : function(value){
            var self = this;
            if(value == self._value){
                return;
            }
            self._value = value;
            self._redrawValue();
            self._redrawDefault();
            if(self._ready){
                self.dispatchEvent(new OjEvent(OjEvent.CHANGE));
            }
        }
    },
    {
        'REQUIRED_ERROR' : '{INPUT} is required.',

        'supportsInputType' : function(type){
            var i = document.createElement('input');
            i.setAttribute('type', type);
            return i.type == type;
        },
        'triggerKeyboardShow' : function(target){
            clearTimeout(this._keyboard_timeout);
            target.dispatchEvent(new OjKeyboardEvent(OjKeyboardEvent.SHOW, true));
        },
        'triggerKeyboardHide' : function(target){
            var self = this;
            self._keyboard_target = target;
            if(self._keyboard_timeout){
                return;
            }
            self._keyboard_timeout = setTimeout(function(){
                self._keyboard_target.dispatchEvent(new OjKeyboardEvent(OjKeyboardEvent.HIDE, true));
                self._keyboard_timeout = null;
                self._keyboard_target = null;
            }, 10);
        }
    }
);

OJ.extendClass(
    'OjComboBox', [OjInput],
    {
        '_props_' : {
            'allow_none' : null,
            'item_renderer' : null,
            'options' : null,
            'selected' : null,
            'selected_index' : null
        },
        '_list_visible' : false, '_ignore_click' : false, '_none_lbl' : '-- Select -- ',

        '_constructor' : function(/*name, label, value, options*/){
            var ln = arguments.length;
            this._options_index = [];
            this._super(OjInput, '_constructor', ln > 2 ? [].slice.call(arguments, 0, 2) : arguments);
            this._list = new OjList();
            this._list.addEventListener(OjCollectionEvent.ITEM_PRESS, this, '_onItemClick');
            this._options_dp = this._list.dataProvider;
            if(ln > 2){
                if(ln > 3){
                    this.options = arguments[3];
                }
                this.value = arguments[2];
            }
            // setup event listeners
//            this.input.removeEventListener(OjDomEvent.CHANGE, this, '_onChange');
//
//            this.psuedoInput.addEventListener(OjUiEvent.PRESS, this, '_onPress');
        },
        '_setDom' : function(dom_elm){
            this._super(OjInput, '_setDom', arguments);
            var select = new OjStyleElement('<select class="input"></select>');
            this.stem.replaceChild(this.input, select);
            this.input = select;
            this.dflt.hide();
        },
        '_showList' : function(){
            // check to see if the list is already shown
            if(this._list_visible){
                return;
            }
            // prepare the list so we can extract the height and animate it in
            this._list.alpha = 0;
            this._list.show();
            // get the actual height of the list
            var h = this._list.height;
            // now set it back to 0 so we can animate it to its full height
            this._list.height = 0;
            // make sure to destroy an current animations for this combobox
            OJ.destroy(this._tween, true);
            // setup the animation
            this._tween = new OjTweenSet(
                new OjPropTween(this._list, { 'height' : h }, 250),
                new OjFade(this._list, OjFade.IN, 250)
            );
            // listen for when the animation is over so we can cleanup after ourselves
            this._tween.addEventListener(OjTweenEvent.COMPLETE, this, '_onTween');
            // start the animation
            this._tween.start();
            // listen for page clicks to know when to close the list
            OJ.addEventListener(OjUiEvent.PRESS, this, '_onPageClick');
            this._list_visible = true;
        },
        '_hideList' : function(){
            // check to see if the list is already hidden
            if(!this._list_visible){
                return;
            }
            // make sure to destroy an current animations for this combobox
            OJ.destroy(this._tween, true);
            // setup the animation
            this._tween = new OjTweenSet(
                new OjPropTween(this._list, { 'height' : 0 }, 250),
                new OjFade(this._list, OjFade.NONE, 250)
            );
            // listen for when the animation is over so we can cleanup after ourselves
            this._tween.addEventListener(OjTweenEvent.COMPLETE, this, '_onTween');
            // start the animation
            this._tween.start();
            OJ.removeEventListener(OjUiEvent.PRESS, this, '_onPageClick');
            this._trigger_evt = null;
            this._list_visible = this._ignore_click = false;
        },

        '_redrawList' : function(){
            this.input.removeAllChildren();
            var ln = this._options.length;
            for(; ln--;){
                this.input.insertChildAt(
                    new OjStyleElement(
                        "<option value='{0}'>{1}</option>".format(
                            this._options[ln].id,
                            this._options[ln].label
                        )
                    ),
                    0
                );
            }
            return;
        },
        '_redrawValue' : function(){
            return;
        },

        '_onPress' : function(evt){
            if(!this._trigger_evt){
                this._showList();
            }
            if(!this._ignore_click){
                this._trigger_evt = evt;
                this._ignore_click = false;
            }
        },
        '_onItemClick' : function(evt){
            this.selected = evt.item;
            this._ignore_click = true;
        },
        '_onPageClick' : function(evt){
            if(this._trigger_evt == evt){
                return;
            }
            this._hideList();
        },
        '_onTween' : function(evt){
            this._list.height = OjStyleElement.AUTO;
            OJ.destroy(this._tween, true);
        },

        // Public Properties
        '.item_renderer' : function(){
            return this._list.item_renderer;
        },
        '=item_renderer' : function(item_renderer){
            this._list.item_renderer = item_renderer;
            this._redrawValue();
        },
        '=options' : function(options){
            var self = this,
                opts = self._options,
                key, option;
            if(options == opts){
                return;
            }
            self._options = opts = [];
            if(isArray(options)){
                options.forEachReverse(function(option, i){
                    option = options[i];
                    opts.prepend(
                        isObjective(option, OjData) ? option : new OjData(String.string(option), option)
                    );
                });
            }
            else if(isObject(options)){
                for(key in options){
                    option = options[key];
                    opts.append(
                        isObjective(option, OjData) ? option : new OjData(key, option)
                    );
                }
            }
            self._redrawList();
            self._redrawValue();
            self.value = self._value;
        },
        '=selected' : function(selected){
            var self = this;
            if(self._selected != selected){
                self._selected = selected;
                self.options.forEachReverse(function(option, i){
                    if(option == selected){
                        self._selected_index = i;
                        self._value = option.id;
                        return false;
                    }
                });
            }
        },
        '=selectedIndex' : function(index){
            if(this._selected_index != index){
                if(this._options){
                    this.value = this._options_index[index];
                }
                else{
                    this._selected_index = index;
                }
            }
        },
        '=value' : function(value){
            var self = this;
            if(self._value == value){
                return;
            }
            self._super(OjInput, '=value', arguments);
            self.options.forEachReverse(function(option, i){
                if(option.id == value){
                    self._selected = option;
                    self._selected_index = i;
                    return false;
                }
            });
            self.input.selectedIndex = self._selected_index;
        }
    }
);

OJ.extendComponent(
    "OjTextInput", [OjInput],
    {
        "_props_" : {
            "min_length" : 0,
            "max_length" : 255,
            "select_on_focus" : false
        },
        "_get_props_" : {
            "type" : "text"
        },

        '_constructor' : function(/*name, label, value, validators*/){
            this._super(OjInput, '_constructor', arguments);
            this.input.addEventListener(OjKeyboardEvent.UP, this, '_onInputChange');
        },

        '_setDom' : function(dom_elm){
            this._super(OjInput, '_setDom', arguments);
            this.input.attr('type', this._type);
        },
        '_formatErrorTokens' : function(){
            var tokens = this._super(OjInput, '_formatErrorTokens', arguments);
            tokens.MAX = this.max_length;
            tokens.MIN = this.min_length;
            return tokens;
        },

        '_onInputFocusIn' : function(evt){
            var self = this;
            self._super(OjInput, '_onInputFocusIn', arguments);
            if(OJ.is_mobile){
                self._static.triggerKeyboardShow(self);
            }
            if(self.select_on_focus){
                OjTimer.delay(
                    function(){
                        self.select();
                    },
                    OJ.is_mobile ? 250 : 0
                );
            }
        },
        '_onInputFocusOut' : function(evt){
            var self = this;
            self._super(OjInput, '_onInputFocusOut', arguments);
            if(OJ.is_mobile){
                self._static.triggerKeyboardHide(self);
            }
        },

        'isValid' : function(){
            var self = this,
                valid = self._super(OjInput, 'isValid', arguments),
                value = self.value,
                ln = value ? value.length : 0;
            if(self.min_length && ln < self.min_length){
                self._errors.append(self._formatError(OjTextInput.MIN_LENGTH_ERROR));
                valid = false;
            }
            if(self.max_length && ln > self.max_length){
                self._errors.append(self._formatError(OjTextInput.MAX_LENGTH_ERROR));
                valid = false;
            }
            return valid;
        },
        "select" : function(start, end){
            this.input.dom.setSelectionRange(start || 0, end || 9999999);
        },
        '=max_length' : function(val){
            var self = this;
            if(self._max_length == val){
                return;
            }
            self.input.attr('maxlength', self._max_length = val);
        },
        '=value' : function(value){
            var self = this;
            if(isSet(value)){
                value = String.string(value);
                if(value.length > self.max_length){
                    value = value.slice(0, self.max_length);
                }
            }
            return self._super(OjInput, '=value', [value]);
        }
    },
    {
        'EMAIL' : 'email',
        'TEXT' : 'text',
        'NUMBER' : 'number',
        'SECURE' : 'password',
        'MIN_LENGTH_ERROR' : '{INPUT} must be at least {MIN} characters.',
        'MAX_LENGTH_ERROR' : '{INPUT} must be no more than {MAX} characters.',
        '_TAGS' : ['text-input']
    }
);

OJ.extendComponent(
    'OjEmailInput', [OjTextInput],
    {
        '_props_' : {
            'max_length' : 254,
            'min_length' : 3
        },
        '_type' : OjTextInput.EMAIL,

        'isValid' : function(){
            var self = this,
                valid = self._super(OjTextInput, 'isValid', arguments),
                value = self.value;
            if(!isEmpty(value) && !self._static.isValidEmail(value)){
                self._errors.append(self._formatError(OjEmailInput.INVALID_ERROR));
                valid = false;
            }
            return valid;
        },

        '=max_length' : function(val){
            throw new Error('Cannot set the max length of an email. This is a fixed value.');
        },
        '=min_length' : function(val){
            throw new Error('Cannot set the min length of an email. This is a fixed value.');
        }
    },
    {
        'INVALID_ERROR' : '{INPUT} requires a valid email address.',
        'SUPPORTS_EMAIL_TYPE' : OjInput.supportsInputType('email'),
        'isValidEmail' : function(val){
            return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)
        },
        '_TAGS' : ['email-input']
    }
);

OJ.extendComponent(
    "OjNumberInput", [OjTextInput],
    {
        "_type" : OjTextInput.NUMBER,
        "_props_" : {
            "max" : null,
            "min" : null
        },

        "_formatErrorTokens" : function(){
            var self = this,
                tokens = self._super(OjTextInput, "_formatErrorTokens", arguments);
            tokens.MAX = self.max;
            tokens.MIN = self.min;
            return tokens;
        },

        "isValid" : function(){
            var self = this,
                cls = self._static,
                valid = self._super(OjTextInput, "isValid", arguments),
                errors = self._errors,
                val = self.value;
            
            if(isSet(self.min) && val < self.min){
                errors.append(self._formatError(cls.MIN_ERROR));
                valid = false;
            }
            if(isSet(self.max) && val > self.max){
                errors.append(self._formatError(cls.MAX_ERROR));
                valid = false;
            }
            return valid;
        },

        ".value" : function(){
            var val = this._value;
            if(isEmpty(val)){
                return 0;
            }
            return parseFloat(val);
        },

        "=max" : function(val){
            var self = this;
            self._max = val;
            self.input.attr("max", val);
        },
        "=min" : function(val){
            var self = this;
            self._min = val;
            self.input.attr("min", val);
        }
    },
    {
        "MIN_ERROR" : "{INPUT} minimum value is {MIN}.",
        "MAX_ERROR" : "{INPUT} maxiumum value is {MAX}.",
        "_TAGS" : ["num-input", "number-input"]
    }
);

OJ.extendComponent(
    "OjSecureInput", [OjTextInput],
    {
        "_min_length" : 6,  "_max_length" : 30,
        "_type" : OjTextInput.SECURE
    },
    {
        "_TAGS" : ["secure-input"]
    }
);

OJ.extendComponent(
    "OjDateInput", [OjTextInput],
    {
        "_get_props_" : {
            "type" : "date"
        },
        // todo: add min and max date support
        "_onFocusIn" : function(evt){
            this._super(OjTextInput, "_onFocusIn", arguments);
            //showCalendarControl(this.dom);
        },
        "select" : function(){
            if(OJ.is_mobile){
                return;
            }
            this._super(OjTextInput, "select", arguments);
        },
        ".value" : function(){
            var val = this._value;
            if(isEmpty(val)){
                return null;
            }
            return moment(val).toDate();
        },
        "=value" : function(val){
            val = moment(val);
            return this._super(OjTextInput, "=value", [val.isValid() ? moment(val).format("YYYY-MM-DD") : null]);
        }
    },
    {
        "_TAGS" : ["date-input"]
    }
);

OJ.extendComponent(
    "OjTimeInput", [OjTextInput],
    {
        "_get_props_" : {
            "type" : "time"
        },
        "select" : function(){
            if(OJ.is_mobile){
                return;
            }
            this._super(OjTextInput, "select", arguments);
        },
        "=value" : function(val){
            if(isNumber(val)){
                val = String(val).split(".");
                while(val < 2){
                    val.append(0);
                }
                val = val[0] + ":" + Math.round(val[1] / 60);
            }
            return this._super(OjTextInput, "=value", [val]);
        }
    },
    {
        "_TAGS" : ["time-input"]
    }
);


OJ.extendComponent(
    'OjFileInput', [OjInput],
    {
        '_props_' : {
            'minSize' : 0,
            'maxSize' : 0,
            'selectionMax': 1
        },

        '_constructor' : function(name, label, maxSize, minSize){
            this._super(OjInput, '_constructor', [name, label]);
            if(maxSize){
                this.maxSize = maxSize;
            }
            if(minSize){
                this.minSize = minSize;
            }
        },

        '_setDom' : function(dom_elm){
            this._super(OjInput, '_setDom', arguments);
            this.stem.replaceChild(this.input, this.input = new OjStyleElement('<input type="file" class="input" />'));
        },
        '_formatErrorTokens' : function(){
            var tokens = this._super(OjInput, '_formatErrorTokens', arguments);
            tokens.MAX = this._maxSize;
            tokens.MIN = this._minSize;
            return tokens;
        },
        '_onInputChange' : function(evt){
            var val = this.input.dom.files,
                ln = val.length;
            if(this.allowMultiple){
                // check the length
                // remove the overflow
                // notify of the removal
            }
            else if(ln){
                val = val[0];
            }
            this.value = val;
        },
        // '_redrawValue' : function(){
        //     // file input cannot be redrawn
        //     // TODO: figure out how to redraw file input (make sure to support multiple files)
        // },

        'isValid' : function(){
            var valid = this._super(OjInput, 'isValid', arguments);
            var size = this._value ? this._value.size / 1000000 : 0;
            if(this._minSize && size < this._minSize){
                this._errors.append(this._formatError(OjFileInput.MIN_SIZE_ERROR));
                valid = false;
            }
            else if(this._maxSize && size > this._maxSize){
                this._errors.append(this._formatError(OjFileInput.MAX_SIZE_ERROR));
                valid = false;
            }
            return valid;
        },

        '=selectionMax' : function(val){
            if(this._selectionMax == val){
                return;
            }
            this.input.attr('multiple', (this._selectionMax = val) == 1 ? null : '');
        }
    },
    {
        'MIN_SIZE_ERROR' : '{INPUT} must be at least {MIN} MB.',
        'MAX_SIZE_ERROR' : '{INPUT} must be no more than {MAX} MB.',

        '_TAGS' : ['file-input']
    }
);

OJ.extendClass(
    'OjFilterBox', [OjComboBox],
    {
        '_item_index' : null,  '_previous_search' : null,

        '_constructor' : function(){
            this._super(OjComboBox, '_constructor', arguments);
            // setup event listeners
            this.valueHldr.addEventListener(OjEvent.CHANGE, this, '_onSearch');
            this.valueHldr.addEventListener(OjFocusEvent.IN, this, '_onFocusIn');
            this.valueHldr.addEventListener(OjFocusEvent.OUT, this, '_onFocusOut');
            this._item_index = {};
        },

        '_setDom' : function(dom_elm){
            this._super(OjComboBox, '_setDom', arguments);
            var prnt = this.valueHldr.parent;
            var new_value = new OjTextInput();
            new_value.addCss('value');
            new_value.addEventListener(OjFocusEvent.IN, this, '_onValueFocus');
            prnt.replaceChild(this.valueHldr, new_value);
            this.valueHldr = new_value;
        },

        '_redrawList' : function(/*search = null*/){
            var search = arguments.length && arguments[0] ? arguments[0] : null;
            var old_ln  = this._options_dp.length, new_ln = 0, key;
            if(this._options){
                if(isEmpty(search) || search == this._none_lbl){
                    search = null;
                }
                else{
                    search = search.toLowerCase();
                }
                if(this._previous_search == search){
                    return;
                }
                this._options_index = [];
                this._previous_search = search;
                for(key in this._options){
                    this._options_index.append(key);
                    if(search && this._options[key] && this._item_index[key] && this._item_index[key].indexOf(search) == -1){
                        continue;
                    }
                    if(old_ln > new_ln){
                        if(this._options_dp[new_ln] != this._options[key]){
                            this._options_dp.setItemAt(this._options[key], new_ln);
                        }
                    }
                    else{
                        this._options_dp.addItem(this._options[key]);
                    }
                    new_ln++;
                }
            }
            else{
                this._options_index = [];
            }
            while(old_ln-- > new_ln){
                this._options_dp.removeItemAt(old_ln);
            }
        },
        '_redrawValue' : function(){
            var value = null;
            if(isObject(this._selected)){
                if(isFunction(this._selected.toString)){
                    value = this._selected.toString();
                }
                else{
                    value = this._value;
                }
            }
            else if(this._selected){
                value = this._selected.toString();
            }
            this.valueHldr.value = value;
        },
        '_showList' : function(){
            this._redrawList();
            this._super(OjComboBox, '_showList', arguments);
        },
        '_hideList' : function(){
            this._super(OjComboBox, '_hideList', arguments);
            this._redrawValue();
        },

        '_onSearch' : function(evt){
            this._redrawList(this.valueHldr.value);
        },
        '_onFocusIn' : function(evt){
            this._showList();
        },
        '_onFocusOut' : function(evt){
            var is_child = this.find(evt.target);
            if(!is_child.length){
                this._hideList();
            }
        },
        '_onValueFocus' : function(evt){
            if(this.valueHldr.value == this._none_lbl){
                this.valueHldr.value = null;
            }
        },

        '=options' : function(options){
            var key, key2;
            this._item_index = {};
            for(key in options){
                if(isString(options[key])){
                    this._item_index[key] = options[key].toLowerCase();
                }
                else if(isNumber(options[key])){
                    this._item_index[key] = options[key].toString();
                }
                else if(isObject(options[key])){
                    if(isFunction(options[key].toString)){
                        this._item_index[key] = options[key].toString().toLowerCase();
                    }
                    else{
                        this._item_index[key] = '';
                        for(key2 in options[key]){
                            if(isString(options[key][key2])){
                                this._item_index[key] += ' ' + options[key][key2].toLowerCase();
                            }
                            else if(isNumber(options[key][key2])){
                                this._item_index[key] += ' ' + options[key][key2].toString();
                            }
                        }
                        this._item_index[key] = this._item_index[key].trim();
                    }
                }
            }
            this._options = options;
            this._previous_search = -1;
            this._redrawValue();
            this.value = this._value;
        }
    }
);

OJ.extendComponent(
    'OjForm', [OjView], 
    {
        '_props_' : {
            'cancelLabel' : 'Cancel',
            'data' : null,
            'resetLabel' : 'Reset',
            'submit_label' : 'Submit'
        },
        '_get_props_' : {
            'errors' : null,
            'inputs' : null,
            'is_valid' : null
        },

        '_showFormError' : function(){
            var self = this,
                msg = '';
            self._errors.forEachReverse(function(item){
                msg = '\n' + item.error + msg;
            });
            WindowManager.alert(
                'Please fix the following issues and re-submit:<span style="font-weight: bold;">' + msg + '</span>\nThank you.',
                'Form Error'
            );
        },
        '_onSubmitClick' : function(evt){
            var self = this,
                controller = self.controller;
            if(self.submit() && controller){
                controller.removeView(self);
            }
        },
        'blur' : function(){
            var self = this,
                rtrn = self._super(OjView, 'blur', arguments),
                inputs = self.inputs,
                key;
            for(key in inputs){
                inputs[key].blur();
            }
            return rtrn;
        },
        'focus' : function(){
            var self = this,
                rtrn = self._super(OjView, 'focus', arguments),
                inputs = self.inputs,
                key = Object.keys(inputs).first;
            if(key){
                inputs[key].focus();
            }
            return rtrn;
        },
        'reset' : function(){
            var inputs = this.inputs,
                nm;
            for(nm in inputs){
                inputs[nm].value = null;
            }
        },
        'submit' : function(){
            var self = this,
                evt = OjEvent;
            if(self.validate()){
                // todo: OjForm - add submit code logic/functionality
                self.dispatchEvent(new evt(evt.SUBMIT, false, false));
                return true;
            }
            return false;
        },
        'validate' : function(){
            var self = this,
                is_valid = self.is_valid,
                msg = '';
            if(is_valid){
               return true;
            }
            this._showFormError();
            return false;
        },

        '.action_view' : function(){
            var self = this;
            if(!self._action_view){
                (self._action_view = new OjButton(self._submit_label)).addEventListener(
                    OjUiEvent.PRESS, self, '_onSubmitClick'
                );
            }
            return self._action_view;
        },
        '.data' : function(){
            var data = this.inputs,
                nm;
            for(nm in data){
                data[nm] = data[nm].value;
            }
            return data;
        },
        '=data' : function(data){
            var inputs = this.inputs,
                key, input;
            for(key in data){
                if(input = inputs[key]){
                    input.value = data[key];
                }
            }
        },
        '.errors' : function(){
            var errors = this._errors;
            return errors ? errors.clone() : [];
        },
        '.inputs' : function(){
            var inputs = this.dom.getElementsByClassName('OjInput'),
                ln = inputs.length,
                rtrn = {},
                item;
            for(; ln--;){
                item = OjElement.element(inputs[ln]);
                // todo: OjForm - add checking for compound inputs
                rtrn[item.name] = item;
            }
            return rtrn;
        },
        '.is_valid' : function(){
            var self = this,
                inputs = self.inputs,
                errors = self._errors = [],
                nm, input;
            for(nm in inputs){
                input = inputs[nm];
                if(!input.validate()){
                    errors.append({
                        'input' : input,
                        'error' : input.error
                    });
                }
            }
            return !errors.length;
        },
        '=submit_label' : function(val){
            if(this._submit_label == val){
                return;
            }
            this._submit_label = val;
            if(this._action_view){
                this._action_view.label = val;
            }
        }
    },
    {
        '_TAGS' : ['form']
    }
);


OJ.extendClass(
    'OjFormError', [OjItemRenderer],
    {
        '_template' : '<div><div var=input></div><list var=errors></list></div>',

        '_redrawData' : function(){
            var data = this._data,
                input = this.input,
                errors = this.errors;
            if(data){
                if(data.input){
                    input.show();
                    input.text = data.input.label;
                }
                else{
                    input.hide();
                }
                if(data.errors){
                    errors.show();
                    errors.dataProvider.source = data.errors;
                }
                else{
                    errors.hide();
                }
            }
        }
    }
);

OJ.extendClass(
    'OjOption', [OjItemRenderer],
    {
        '_props_' : {
            'dataRenderer' : null,
            'isSelected'   : false
        },
//        '_selector' : null,
        '_v_align' : OjStyleElement.MIDDLE,
        '_template' : '<div><div var=indicator v-align=m><input var=input type=checkbox /></div></div>',

        '_constructor' : function(/*group|dataRenderer, data*/){
            // process the arguments
            var args = arguments,
                ln = args.length,
                renderer = OjTextRenderer;
            if(ln > 1){
                var tmp = args[1];
                if(isString(tmp) || tmp.is('OjItemRenderer')){
                    renderer = tmp;
                    args[1] = null;
                }
            }
            this._super(OjItemRenderer, '_constructor', arguments);
            if(!this._selector){
                this.dataRenderer = renderer;
                this.addEventListener(OjUiEvent.PRESS, this, '_onPress');
            }
        },
        '_destructor' : function(){
            this._selector = this._dataRenderer = null;
            return this._super(OjItemRenderer, '_destructor', arguments);
        },

        '_processDomSourceChild' : function(dom_elm, component){
            if(!isEmpty(dom_elm.nodeValue)){
                this.data = (this._data ? this._data : '') + dom_elm.nodeValue;
                return null;
            }
            return this._super(OjItemRenderer, '_processDomSourceChild', arguments);
        },
        '_redrawData' : function(){
            if(this.option && this._super(OjItemRenderer, '_redrawData', arguments)){
                this.option.data = this._data;
                return true;
            }
            return false;
        },

        '_onPress' : function(evt){
            this.isSelected = !this.isSelected;
        },

        '=dataRenderer' : function(val){
            if(isString(val)){
                val = OJ.stringToClass(val);
            }
            if(this._dataRenderer == val){
                return;
            }
            this._unset('option');
            this._dataRenderer = val;
            this.option = new val(this._group, this._data)
            this.option.addCss('option');
            this.appendElm(this.option);
        },
        '=group' : function(group){
            if(this._group == group){
                return;
            }
            this._super(OjItemRenderer, '=group', arguments);
            var owner;
            if(this._group && (owner = this._group.owner) && owner.is(OjSelector)){
                this._selector = owner;
                this.dataRenderer = owner.item_renderer;
                this.removeEventListener(OjUiEvent.PRESS, this, '_onPress');
            }
            else{
                this._selector = null;
                this.dataRenderer = OjTextRenderer;
                this.addEventListener(OjUiEvent.PRESS, this, '_onPress');
            }
        },
        '=isSelected' : function(val){
            if(this._isSelected == val){
                return;
            }
            if(this._isSelected = val){
                this.addCss('selected');
                this.input.dom.checked = true;
            }
            else{
                this.removeCss('selected');
                this.input.dom.checked = false;
            }
            this.dispatchEvent(new OjEvent(OjEvent.CHANGE));
        }
    }
);


OJ.extendComponent(
    'OjCheckedOption', [OjOption],
    {},
    {
        '_TAGS' : ['oj-checkbox', 'checkbox']
    }
);

OJ.extendComponent(
    'OjRadioOption', [OjOption],
    {
        '_constructor' : function(){
            this._super(OjOption, '_constructor', arguments);
            this.input.attr('type', 'radio');
        }
    },
    {
        '_TAGS' : ['oj-radio', 'radio']
    }
);

OJ.extendComponent(
    'OjSelector', [OjInput],
    {
        '_props_' : {
            'item_renderer' : OjTextRenderer,
            'selectionMin' : 0,
            'selectionMax' : 1
        },
        '_template' : '<div><div var=wrapper><label var=label></label><div var=psuedoInput><span var=prefix class=prefix></span><span var=stem><list var=input item_renderer=OjOption></list><label var=dflt></label></span><span var=suffix class=suffix></span></div></div></div>',

        '_constructor' : function(/*name, label, value, options*/){
            var args = arguments,
                ln = args.length;
            // default the value
            this._value = [];
            this._super(OjInput, '_constructor', ln > 2 ? Array.array(args).slice(0, 2) : args);
            // setup the list listeners
            this.input.addEventListener(OjCollectionEvent.ITEM_ADD, this, '_onItemAdd');
            this.input.addEventListener(OjCollectionEvent.ITEM_PRESS, this, '_onItemClick');
            this.input.addEventListener(OjCollectionEvent.ITEM_MOVE, this, '_onItemMove');
            this.input.addEventListener(OjCollectionEvent.ITEM_REMOVE, this, '_onItemRemove');
            this.input.addEventListener(OjCollectionEvent.ITEM_REPLACE, this, '_onItemReplace');
            this.input.removeEventListener(OjDomEvent.CHANGE, this, '_onChange');
            // set options if available
            if(ln > 3){
                this.options = args[3];
            }
        },
        '_setDom' : function(dom_elm){
            this._super(OjInput, '_setDom', arguments);
//
//      var list = new OjList();
//      list.setItemRenderer(OjOption);
//      list.addCss('input');
//
//      this.stem.replaceChild(this.input, list);
//
//      this.input = list;
        },

        '_processDomSourceChild' : function(dom_elm, component){
            if(OjElement.isTextNode(dom_elm)){
                return;
            }
            var txt = dom_elm.innerHTML;
            if(txt){
                this.input.addItem(OjObject.importData(txt.parseJson()));
            }
        },
        '_selectOption' : function(option, data){
            if(this._value.indexOf(data) > -1){
                return;
            }
            if(this._selectionMax && this._selectionMax == this._value.length){
                this.input.renderItem(this._value.shift()).isSelected = false;
            }
            option.isSelected = true;
            this._value.append(data);
            this.dispatchEvent(new OjEvent(OjEvent.CHANGE));
        },
        '_toggleOptionAt' : function(index){
            var option = this.input.renderItemAt(index),
                data = this.input.getElmAt(index);
            if(option.isSelected){
                this._unselectOption(option, data);
            }
            else{
                this._selectOption(option, data);
            }
        },
        '_unselectOption' : function(option, data){
            var index = this._value.indexOf(data);
            if(index == -1 || this._value.length <= this._selectionMin){
                return;
            }
            option.isSelected = false;
            this._value.removeAt(index);
            this.dispatchEvent(new OjEvent(OjEvent.CHANGE));
        },
        '_updateSelection' : function(){
            // make sure we remove any stale values and replace with fresh if possible
            var ln = this._value.length;
            for(; ln--;){
                if(this.input.indexOfElm(this._value[ln]) == -1){
                    this._value.removeAt(ln);
                }
            }
            // make sure we have the at least the min amount selected
            var i = 0,
                ln2 = this.input.num_elms;
            for(; (ln = this._value.length) < this._selectionMin && i < ln2; i++){
                this._selectOption(this.input.renderItemAt(i), this.input.getElmAt(i));
            }
        },
        '_onInputChange' : function(evt){
            // pass since options will take care of the update
        },
        '_onItemAdd' : function(evt){
            this._updateSelection();
        },
        '_onItemClick' : function(evt){
            this._toggleOptionAt(evt.index);
        },
        '_onItemMove' : function(evt){
            // todo: implement onItemMove in OjSelector
        },
        '_onItemRemove' : function(evt){
            // todo: implement onItemRemove in OjSelector
            this._updateSelection();
        },
        '_onItemReplace' : function(evt){
            // todo: implement onItemReplace in OjSelector
            return;
            var index, old_data = this._options[evt.index];
            if((index = this._value.indexOf(old_data)) > -1){
                this._value[index] = evt.item;
            }
            this.options.getChildAt(evt.index).data = evt.item;
        },

        'redraw' : function(){
            if(this._super(OjInput, 'redraw', arguments)){
                this.input.redraw();
                // update the selection
                this._updateSelection();
                return true;
            }
            return false;
        },

        '=item_renderer' : function(val){
            if(isString(val)){
                val = OJ.stringToClass(val);
            }
            if(this._item_renderer == val){
                return;
            }
            this._item_renderer = val;
            this.redraw();
        },

        '.options' : function(){
            return this.input.dataProvider;
        },
        '=options' : function(val){
            // check to make sure we don't do extra work
            if(val == this.options){
                return;
            }
            // get the old selected indices
            var indices = [],
                ln = this._value.length,
                options, index, ln2;
            for(; ln--;){
                indices.unshift(this.input.indexOfElm(this._value[ln]));
            }
            this._value = [];
            // set the new options
            this.input.dataProvider = val;
            // get the new options
            ln = (options = this.options).length;
            // try to select previous selected indices
            ln2 = indices.length;
            for(; ln2--;){
                if((index = indices[ln2]) < ln){
                    this._selectOption(this.input.renderItemAt(index), options.getItemAt(index));
                }
            }
            this.redraw();
        },
        '=value' : function(val){
            val = Array.array(val);
            if(this._value != val){
                if(this._value = val){
                    var options = this.options,
                        ln = options.length;
                    for(; ln--;){
                        this.input.renderItemAt(ln).isSelected = val.indexOf(options[ln]) > -1;
                    }
                }
                this.dispatchEvent(new OjEvent(OjEvent.CHANGE));
            }
        },
        '.selectionRenderer' : function(){
            return this.input.item_renderer;
        },
        '=selectionRenderer' : function(val){
            this.input.item_renderer = val;
            if(this.selectionRenderer == OjRadioOption){
                this.selectionMin = 1;
                this.selectionMax = 1;
            }
        }
    },
    {
        '_TAGS' : ['selector']
    }
);

OJ.extendComponent(
    'OjSwitch', [OjInput],
    {
        '_props_' : {
        },
        '_template' : '<div class=off><div var=wrapper><label var=lbl></label><div var=psuedoInput><div var=slider><label var=prefix_lbl></label><label var=suffix_lbl></label><div class=highlight></div><span var=stem><input var=input type=hidden /></span></div></div></div></div>',
        '_onPress' : function(evt){
            this._super(OjInput, '_onPress', arguments);
            this.value = !this._value;
        },
        '_redrawValue' : function(){
            this._super(OjInput, '_redrawValue', arguments);
            if(this._value){
                this.addCss('on');
                this.removeCss('off');
            }
            else{
                this.addCss('off');
                this.removeCss('on');
            }
        }
    },
    {
        '_TAGS' : ['switch']
    }
);

OJ.extendComponent(
    "OjTextArea", [OjInput],
    {
        "_props_" : {
            "min_length" : 0,
            "max_length" : 0
        },
        "_setDom" : function(dom_elm){
            var self = this;
            
            self._super(OjInput, "_setDom", arguments);
            var prnt = self.input.parent,
                new_input = new OjStyleElement(OjElement.elm("textarea"));
            new_input.addCss("input");
            prnt.replaceChild(self.input, new_input);
            self.input = new_input;
            self.psuedoInput.attr("flex-v", "");
            self.wrapper.attr("flex-v", "");
        }
    },
    {
        "_TAGS" : ["textarea", "text-area"]
    }
);


OJ.extendClass(
    'OjToken', [OjItemRenderer],
    {
        '_template' : '<div><div var=item></div><button var=removeBtn>&times;</button></div>',

        '_constructor' : function(/*data*/){
            this._super(OjItemRenderer, '_constructor', arguments);
            this.removeBtn.addEventListener(OjUiEvent.PRESS, this, '_onRemoveClick');
        },

        '_redrawData' : function(){
            this.item.text = this.data.toString();
        },

        '_onRemoveClick' : function(evt){
            this._list.removeItem(this.data);
        }
    }
);

OJ.extendComponent(
    'OjTokenInput', [OjInput],
    {
        '_props_' : {
            'allowNone' : true,
            'allow_duplicates' : false,
            'options' : null,
            'selected' : null
        },
//        '_available' : null,  'filterBox' : null,

        '_constructor' : function(/*name, label, value, list = Object*/){
            var ln = arguments.length;
            // setup the value and options
            this._selected = [];
            this._value = [];
            this._super(OjInput, '_constructor', ln > 2 ? [].slice.call(arguments, 0, 2) : arguments);
            if(ln > 2){
                if(ln > 3){
                    this.options = arguments[3];
                }
                this.value = arguments[2];
            }
            // setup event listeners
            this.valueHldr.addEventListener(OjCollectionEvent.ITEM_REMOVE, this, '_onListItemRemove');
            this.filterBox.addEventListener(OjEvent.CHANGE, this, '_onFilterChange');
        },

//        '_setDom' : function(dom_elm){
//            this._super(OjInput, '_setDom', arguments);
//
//            var prnt = this.input.parent();
//
//            // customize the input holder
//            this.filterBox = new OjFilterBox();
//            this.filterBox.setAllowNone(true);
//            this.filterBox.setValue(null);
//            this.filterBox.addCss('filter', 'grey');
//
//            prnt.insertChildAt(this.filterBox, prnt.indexOfChild(this.input) + 1);
//
//            // customize the value holder
//            this.valueHldr = new OjList();
//            this.valueHldr.setItemRenderer(OjToken);
//            this.valueHldr.addCss('value');
//
//            this.inputWrpr.appendChild(this.valueHldr);
//        },

        '_addValue' : function(value/*, suppress_event = false*/){
            return this._addValueAt(value, this._value.length, arguments.length > 2 ? arguments[2] : false);
        },
        '_addValueAt' : function(value, index/*, suppress_event = false*/){
            // update the values list
            this._value.insertAt(value, index);
            if(!this._options){
                return;
            }
            // update the selected list
            this._selected.insertAt(this._options[value], index);
            // update value display
            this.valueHldr.addItemAt(this._options[value], index);
            // update filter list
            if(!this._allow_duplicate){
                delete this._available[value];
                this.filterBox.options = this._available;
                if(!Object.keys(this._available).length){
                    this.filterBox.hide();
                }
            }
            // dispatch that we have a value change
            if(arguments.length < 3 || !arguments[2]){
                this.dispatchEvent(new OjEvent(OjEvent.CHANGE, true, true));
            }
            return value;
        },
        '_removeValue' : function(value/*, suppress_event = false*/){
            var ln = this._value.length;
            while(ln-- > 0){
                if(this._value[ln] == value){
                    return this._removeValueAt(ln, arguments.length > 2 ? arguments[2] : false);
                }
            }
            return null;
        },
        '_removeValueAt' : function(index/*, suppress_event = false*/){
            var rtrn = this._value[index];
            if(!this._options){
                this._values.removeAt(index);
                return rtrn;
            }
            // update value display
            this.valueHldr.removeItemAt(index);
            // dispatch that we have a value change
            if(arguments.length < 3 || !arguments[2]){
                this.dispatchEvent(new OjEvent(OjEvent.CHANGE, true, true));
            }
            return rtrn;
        },
        '_moveValueTo' : function(value, index){
            // add the move value logic
            this.dispatchEvent(new OjEvent(OjEvent.CHANGE, true, true));
        },

        '_onFilterChange' : function(evt){
            if(evt.target == this.filterBox && this.filterBox.value != null){
                this._addValue(this.filterBox.value);
                this.filterBox.value = null;
            }
        },
        '_onListItemRemove' : function(evt){
            // update values
            var removed = this._value.removeAt(evt.index);
            this._selected.removeAt(evt.index);
            // update filter list
            if(!this._allow_duplicate){
                this._available[removed] = this._options[removed];
                this.filterBox.options = this._available;
                this.filterBox.show();
            }
        },

        '.options' : function(options){
            this._options = options;
            this._available = OJ.merge({}, options);
            this.filterBox.options = this._available;
            this.value = this._value.clone();
        },
        '.tokenRenderer' : function(){
            return this.valueHldr.item_renderer;
        },
        '=tokenRenderer' : function(renderer){
            this.valueHldr.item_renderer = renderer;
        },
        '_onChange' : function(){},
        '=value' : function(value){
            var val = [], ln = this._value.length;
            while(ln-- > 0){
                this._removeValueAt(ln, true);
            }
            if(value){
                ln = value.length;
                for(var i = 0; i < ln; i++){
                    this._addValueAt(value[i], i, true);
                }
            }
            this.dispatchEvent(new OjEvent(OjEvent.CHANGE, true, true));
        }
    },
    {
        '_TAGS' : ['token-input']
    }
);

OJ.extendComponent(
    'OjValue', [OjComponent],
    {
        '_props_' : {
            'item_renderer' : OjTextRenderer,
            'label' : null,
            'name' : null,
            'value' : null
        },
        '_template' : '<div flex-h><label var=lbl></label><div var=val></div></div>',

        '_constructor' : function(/*name, label, value*/){
            this._super(OjComponent, '_constructor', []);
            this._processArguments(arguments, {
                'name' : null,
                'label' : null,
                'value' : null
            });
        },

        '_redrawLabel' : function(){
            this.lbl.text = this.label;
        },
        '_redrawValue' : function(){
            var self = this,
                renderer = self.item_renderer,
                val = self.val,
                value = self.value;
            val.removeAllChildren();
            if(isArray(value)){
                val.appendChild(new OjList(value, renderer));
            }
            else{
                val.appendChild(new renderer(null, value));
            }
        },
        '=label' : function(label){
            var self = this;
            if(self._label == label){
                return;
            }
            self._label = label;
            self._redrawLabel();
        },
        '=name' : function(nm){
            var self = this;
            if(self._name == nm){
                return;
            }
            if(self._name){
                self.removeCss(nm + '-value');
            }
            self.addCss((self._name = nm) + '-value');
        },
        '=value' : function(value){
            var self = this;
            if(self._value == value){
                return;
            }
            self._value = value;
            self._redrawValue();
        }
    },
    {
        "_TAGS" : ["value"]
    }
);

OJ.extendComponent(
    'OjOptionsValue', [OjValue], {
        '_props_' : {
            'options' : null
        },
        '_constructor' : function(name, label, options, value){
            this.options = options;
            this._super(OjValue, '_constructor', [name, label, value]);
        },
        '_redrawValue' : function(){
            var self = this,
                options = self.options,
                renderer = self.item_renderer,
                val = self.val,
                value = self.value;
            val.removeAllChildren();
            if(options){
                if(isArray(value)){
                    value = value.clone();
                    value.forEachReverse(function(item, i){
                        value[i] = options[item];
                    });
                    val.appendChild(new OjList(value, renderer));
                }
                else{
                    val.appendChild(new renderer(null, options[value]));
                }
            }
        }
    }
);

OJ.extendClass(
    'OjFlip', [OjPropTween],
    {
        '_props_' : {
            'direction' : 'flipLeft', // OjFlip.LEFT
            'duration'  : 250
        },
        '_force' : false,

        '_constructor' : function(/*target = null, direction = IN, duration = 250, easing = NONE*/){
            this._super(OjPropTween, '_constructor', []);
            var args = arguments,
                ln = args.length;
            if(ln){
                this.target = args[0];
                if(ln > 1){
                    this.direction = args[1];
                    if(ln > 2){
                        this.duration = args[2];
                        if(ln > 3){
                            this.easing = args[3];
                        }
                    }
                }
            }
        },

        '_onComplete' : function(evt){
            if(this._direction == OjFade.NONE){
                this._target.alpha = 1;
                this._target.hide();
            }
            this._super(OjPropTween, '_onComplete', arguments);
        },

        'start' : function(){
            // for some reason this happens every once and awhile
            if(!this._target){
                return;
            }
            if(!this._to){
                this._to = {};
            }
            if(this._direction == OjFlip.DOWN){
                if(this._force || this._target.alpha == 1){
                    this._target.alpha = 0;
                }
                this._to.alpha = 1;
            }
            else if(this._direction == OjFlip.RIGHT){
                if(this._force || this._target.alpha == 1){
                    this._target.alpha = 0;
                }
                this._to.alpha = 1;
            }
            else if(this._direction == OjFlip.UP){
                if(this._force || this._target.alpha == 1){
                    this._target.alpha = 0;
                }
                this._to.alpha = 1;
            }
            else{
                if(this._force || this._target.alpha == 0){
                    this._target.alpha = 1;
                }
                this._to.alpha = 0;
            }
            this._target.show();
            this._super(OjPropTween, 'start', arguments);
        }
    },
    {
        'DOWN'  : 'flipDown',
        'LEFT'  : 'flipLeft',
        'RIGHT' : 'flipRight',
        'UP'    : 'flipUp'
    }
);
/*! Hammer.JS - v2.0.4 - 2014-09-28
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2014 Jorik Tangelder;
 * Licensed under the MIT license */
!function(a,b,c,d){;function e(a,b,c){return setTimeout(k(a,c),b)}function f(a,b,c){return Array.isArray(a)?(g(a,c[b],c),!0):!1}function g(a,b,c){var e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0;e<a.length;)b.call(c,a[e],e,a),e++;else for(e in a)a.hasOwnProperty(e)&&b.call(c,a[e],e,a)}function h(a,b,c){for(var e=Object.keys(b),f=0;f<e.length;)(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]),f++;return a}function i(a,b){return h(a,b,!0)}function j(a,b,c){var d,e=b.prototype;d=a.prototype=Object.create(e),d.constructor=a,d._super=e,c&&h(d,c)}function k(a,b){return function(){return a.apply(b,arguments)}}function l(a,b){return typeof a==kb?a.apply(b?b[0]||d:d,b):a}function m(a,b){return a===d?b:a}function n(a,b,c){g(r(b),function(b){a.addEventListener(b,c,!1)})}function o(a,b,c){g(r(b),function(b){a.removeEventListener(b,c,!1)})}function p(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1}function q(a,b){return a.indexOf(b)>-1}function r(a){return a.trim().split(/\s+/g)}function s(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0;d<a.length;){if(c&&a[d][c]==b||!c&&a[d]===b)return d;d++}return-1}function t(a){return Array.prototype.slice.call(a,0)}function u(a,b,c){for(var d=[],e=[],f=0;f<a.length;){var g=b?a[f][b]:a[f];s(e,g)<0&&d.push(a[f]),e[f]=g,f++}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b]}):d.sort()),d}function v(a,b){for(var c,e,f=b[0].toUpperCase()+b.slice(1),g=0;g<ib.length;){if(c=ib[g],e=c?c+f:b,e in a)return e;g++}return d}function w(){return ob++}function x(a){var b=a.ownerDocument;return b.defaultView||b.parentWindow}function y(a,b){var c=this;this.manager=a,this.callback=b,this.element=a.element,this.target=a.options.inputTarget,this.domHandler=function(b){l(a.options.enable,[a])&&c.handler(b)},this.init()}function z(a){var b,c=a.options.inputClass;return new(b=c?c:rb?N:sb?Q:qb?S:M)(a,A)}function A(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&yb&&d-e===0,g=b&(Ab|Bb)&&d-e===0;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,B(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c}function B(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=E(b)),e>1&&!c.firstMultiple?c.firstMultiple=E(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=F(d);b.timeStamp=nb(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=J(h,i),b.distance=I(h,i),C(c,b),b.offsetDirection=H(b.deltaX,b.deltaY),b.scale=g?L(g.pointers,d):1,b.rotation=g?K(g.pointers,d):0,D(c,b);var j=a.element;p(b.srcEvent.target,j)&&(j=b.srcEvent.target),b.target=j}function C(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};(b.eventType===yb||f.eventType===Ab)&&(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y)}function D(a,b){var c,e,f,g,h=a.lastInterval||b,i=b.timeStamp-h.timeStamp;if(b.eventType!=Bb&&(i>xb||h.velocity===d)){var j=h.deltaX-b.deltaX,k=h.deltaY-b.deltaY,l=G(i,j,k);e=l.x,f=l.y,c=mb(l.x)>mb(l.y)?l.x:l.y,g=H(j,k),a.lastInterval=b}else c=h.velocity,e=h.velocityX,f=h.velocityY,g=h.direction;b.velocity=c,b.velocityX=e,b.velocityY=f,b.direction=g}function E(a){for(var b=[],c=0;c<a.pointers.length;)b[c]={clientX:lb(a.pointers[c].clientX),clientY:lb(a.pointers[c].clientY)},c++;return{timeStamp:nb(),pointers:b,center:F(b),deltaX:a.deltaX,deltaY:a.deltaY}}function F(a){var b=a.length;if(1===b)return{x:lb(a[0].clientX),y:lb(a[0].clientY)};for(var c=0,d=0,e=0;b>e;)c+=a[e].clientX,d+=a[e].clientY,e++;return{x:lb(c/b),y:lb(d/b)}}function G(a,b,c){return{x:b/a||0,y:c/a||0}}function H(a,b){return a===b?Cb:mb(a)>=mb(b)?a>0?Db:Eb:b>0?Fb:Gb}function I(a,b,c){c||(c=Kb);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e)}function J(a,b,c){c||(c=Kb);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI}function K(a,b){return J(b[1],b[0],Lb)-J(a[1],a[0],Lb)}function L(a,b){return I(b[0],b[1],Lb)/I(a[0],a[1],Lb)}function M(){this.evEl=Nb,this.evWin=Ob,this.allow=!0,this.pressed=!1,y.apply(this,arguments)}function N(){this.evEl=Rb,this.evWin=Sb,y.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function O(){this.evTarget=Ub,this.evWin=Vb,this.started=!1,y.apply(this,arguments)}function P(a,b){var c=t(a.touches),d=t(a.changedTouches);return b&(Ab|Bb)&&(c=u(c.concat(d),"identifier",!0)),[c,d]}function Q(){this.evTarget=Xb,this.targetIds={},y.apply(this,arguments)}function R(a,b){var c=t(a.touches),d=this.targetIds;if(b&(yb|zb)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f,g=t(a.changedTouches),h=[],i=this.target;if(f=c.filter(function(a){return p(a.target,i)}),b===yb)for(e=0;e<f.length;)d[f[e].identifier]=!0,e++;for(e=0;e<g.length;)d[g[e].identifier]&&h.push(g[e]),b&(Ab|Bb)&&delete d[g[e].identifier],e++;return h.length?[u(f.concat(h),"identifier",!0),h]:void 0}function S(){y.apply(this,arguments);var a=k(this.handler,this);this.touch=new Q(this.manager,a),this.mouse=new M(this.manager,a)}function T(a,b){this.manager=a,this.set(b)}function U(a){if(q(a,bc))return bc;var b=q(a,cc),c=q(a,dc);return b&&c?cc+" "+dc:b||c?b?cc:dc:q(a,ac)?ac:_b}function V(a){this.id=w(),this.manager=null,this.options=i(a||{},this.defaults),this.options.enable=m(this.options.enable,!0),this.state=ec,this.simultaneous={},this.requireFail=[]}function W(a){return a&jc?"cancel":a&hc?"end":a&gc?"move":a&fc?"start":""}function X(a){return a==Gb?"down":a==Fb?"up":a==Db?"left":a==Eb?"right":""}function Y(a,b){var c=b.manager;return c?c.get(a):a}function Z(){V.apply(this,arguments)}function $(){Z.apply(this,arguments),this.pX=null,this.pY=null}function _(){Z.apply(this,arguments)}function ab(){V.apply(this,arguments),this._timer=null,this._input=null}function bb(){Z.apply(this,arguments)}function cb(){Z.apply(this,arguments)}function db(){V.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function eb(a,b){return b=b||{},b.recognizers=m(b.recognizers,eb.defaults.preset),new fb(a,b)}function fb(a,b){b=b||{},this.options=i(b,eb.defaults),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.element=a,this.input=z(this),this.touchAction=new T(this,this.options.touchAction),gb(this,!0),g(b.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[3])},this)}function gb(a,b){var c=a.element;g(a.options.cssProps,function(a,d){c.style[v(c.style,d)]=b?a:""})}function hb(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d)}var ib=["","webkit","moz","MS","ms","o"],jb=b.createElement("div"),kb="function",lb=Math.round,mb=Math.abs,nb=Date.now,ob=1,pb=/mobile|tablet|ip(ad|hone|od)|android/i,qb="ontouchstart"in a,rb=v(a,"PointerEvent")!==d,sb=qb&&pb.test(navigator.userAgent),tb="touch",ub="pen",vb="mouse",wb="kinect",xb=25,yb=1,zb=2,Ab=4,Bb=8,Cb=1,Db=2,Eb=4,Fb=8,Gb=16,Hb=Db|Eb,Ib=Fb|Gb,Jb=Hb|Ib,Kb=["x","y"],Lb=["clientX","clientY"];y.prototype={handler:function(){},init:function(){this.evEl&&n(this.element,this.evEl,this.domHandler),this.evTarget&&n(this.target,this.evTarget,this.domHandler),this.evWin&&n(x(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&o(this.element,this.evEl,this.domHandler),this.evTarget&&o(this.target,this.evTarget,this.domHandler),this.evWin&&o(x(this.element),this.evWin,this.domHandler)}};var Mb={mousedown:yb,mousemove:zb,mouseup:Ab},Nb="mousedown",Ob="mousemove mouseup";j(M,y,{handler:function(a){var b=Mb[a.type];b&yb&&0===a.button&&(this.pressed=!0),b&zb&&1!==a.which&&(b=Ab),this.pressed&&this.allow&&(b&Ab&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:vb,srcEvent:a}))}});var Pb={pointerdown:yb,pointermove:zb,pointerup:Ab,pointercancel:Bb,pointerout:Bb},Qb={2:tb,3:ub,4:vb,5:wb},Rb="pointerdown",Sb="pointermove pointerup pointercancel";a.MSPointerEvent&&(Rb="MSPointerDown",Sb="MSPointerMove MSPointerUp MSPointerCancel"),j(N,y,{handler:function(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=Pb[d],f=Qb[a.pointerType]||a.pointerType,g=f==tb,h=s(b,a.pointerId,"pointerId");e&yb&&(0===a.button||g)?0>h&&(b.push(a),h=b.length-1):e&(Ab|Bb)&&(c=!0),0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1))}});var Tb={touchstart:yb,touchmove:zb,touchend:Ab,touchcancel:Bb},Ub="touchstart",Vb="touchstart touchmove touchend touchcancel";j(O,y,{handler:function(a){var b=Tb[a.type];if(b===yb&&(this.started=!0),this.started){var c=P.call(this,a,b);b&(Ab|Bb)&&c[0].length-c[1].length===0&&(this.started=!1),this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:tb,srcEvent:a})}}});var Wb={touchstart:yb,touchmove:zb,touchend:Ab,touchcancel:Bb},Xb="touchstart touchmove touchend touchcancel";j(Q,y,{handler:function(a){var b=Wb[a.type],c=R.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:tb,srcEvent:a})}}),j(S,y,{handler:function(a,b,c){var d=c.pointerType==tb,e=c.pointerType==vb;if(d)this.mouse.allow=!1;else if(e&&!this.mouse.allow)return;b&(Ab|Bb)&&(this.mouse.allow=!0),this.callback(a,b,c)},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var Yb=v(jb.style,"touchAction"),Zb=Yb!==d,$b="compute",_b="auto",ac="manipulation",bc="none",cc="pan-x",dc="pan-y";T.prototype={set:function(a){a==$b&&(a=this.compute()),Zb&&(this.manager.element.style[Yb]=a),this.actions=a.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var a=[];return g(this.manager.recognizers,function(b){l(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()))}),U(a.join(" "))},preventDefaults:function(a){if(!Zb){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return void b.preventDefault();var d=this.actions,e=q(d,bc),f=q(d,dc),g=q(d,cc);return e||f&&c&Hb||g&&c&Ib?this.preventSrc(b):void 0}},preventSrc:function(a){this.manager.session.prevented=!0,a.preventDefault()}};var ec=1,fc=2,gc=4,hc=8,ic=hc,jc=16,kc=32;V.prototype={defaults:{},set:function(a){return h(this.options,a),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(a){if(f(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=Y(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this},dropRecognizeWith:function(a){return f(a,"dropRecognizeWith",this)?this:(a=Y(a,this),delete this.simultaneous[a.id],this)},requireFailure:function(a){if(f(a,"requireFailure",this))return this;var b=this.requireFail;return a=Y(a,this),-1===s(b,a)&&(b.push(a),a.requireFailure(this)),this},dropRequireFailure:function(a){if(f(a,"dropRequireFailure",this))return this;a=Y(a,this);var b=s(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(a){return!!this.simultaneous[a.id]},emit:function(a){function b(b){c.manager.emit(c.options.event+(b?W(d):""),a)}var c=this,d=this.state;hc>d&&b(!0),b(),d>=hc&&b(!0)},tryEmit:function(a){return this.canEmit()?this.emit(a):void(this.state=kc)},canEmit:function(){for(var a=0;a<this.requireFail.length;){if(!(this.requireFail[a].state&(kc|ec)))return!1;a++}return!0},recognize:function(a){var b=h({},a);return l(this.options.enable,[this,b])?(this.state&(ic|jc|kc)&&(this.state=ec),this.state=this.process(b),void(this.state&(fc|gc|hc|jc)&&this.tryEmit(b))):(this.reset(),void(this.state=kc))},process:function(){},getTouchAction:function(){},reset:function(){}},j(Z,V,{defaults:{pointers:1},attrTest:function(a){var b=this.options.pointers;return 0===b||a.pointers.length===b},process:function(a){var b=this.state,c=a.eventType,d=b&(fc|gc),e=this.attrTest(a);return d&&(c&Bb||!e)?b|jc:d||e?c&Ab?b|hc:b&fc?b|gc:fc:kc}}),j($,Z,{defaults:{event:"pan",threshold:10,pointers:1,direction:Jb},getTouchAction:function(){var a=this.options.direction,b=[];return a&Hb&&b.push(dc),a&Ib&&b.push(cc),b},directionTest:function(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&Hb?(e=0===f?Cb:0>f?Db:Eb,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?Cb:0>g?Fb:Gb,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction},attrTest:function(a){return Z.prototype.attrTest.call(this,a)&&(this.state&fc||!(this.state&fc)&&this.directionTest(a))},emit:function(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=X(a.direction);b&&this.manager.emit(this.options.event+b,a),this._super.emit.call(this,a)}}),j(_,Z,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[bc]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&fc)},emit:function(a){if(this._super.emit.call(this,a),1!==a.scale){var b=a.scale<1?"in":"out";this.manager.emit(this.options.event+b,a)}}}),j(ab,V,{defaults:{event:"press",pointers:1,time:500,threshold:5},getTouchAction:function(){return[_b]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(Ab|Bb)&&!f)this.reset();else if(a.eventType&yb)this.reset(),this._timer=e(function(){this.state=ic,this.tryEmit()},b.time,this);else if(a.eventType&Ab)return ic;return kc},reset:function(){clearTimeout(this._timer)},emit:function(a){this.state===ic&&(a&&a.eventType&Ab?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=nb(),this.manager.emit(this.options.event,this._input)))}}),j(bb,Z,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[bc]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&fc)}}),j(cb,Z,{defaults:{event:"swipe",threshold:10,velocity:.65,direction:Hb|Ib,pointers:1},getTouchAction:function(){return $.prototype.getTouchAction.call(this)},attrTest:function(a){var b,c=this.options.direction;return c&(Hb|Ib)?b=a.velocity:c&Hb?b=a.velocityX:c&Ib&&(b=a.velocityY),this._super.attrTest.call(this,a)&&c&a.direction&&a.distance>this.options.threshold&&mb(b)>this.options.velocity&&a.eventType&Ab},emit:function(a){var b=X(a.direction);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a)}}),j(db,V,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:2,posThreshold:10},getTouchAction:function(){return[ac]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime<b.time;if(this.reset(),a.eventType&yb&&0===this.count)return this.failTimeout();if(d&&f&&c){if(a.eventType!=Ab)return this.failTimeout();var g=this.pTime?a.timeStamp-this.pTime<b.interval:!0,h=!this.pCenter||I(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,h&&g?this.count+=1:this.count=1,this._input=a;var i=this.count%b.taps;if(0===i)return this.hasRequireFailures()?(this._timer=e(function(){this.state=ic,this.tryEmit()},b.interval,this),fc):ic}return kc},failTimeout:function(){return this._timer=e(function(){this.state=kc},this.options.interval,this),kc},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==ic&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),eb.VERSION="2.0.4",eb.defaults={domEvents:!1,touchAction:$b,enable:!0,inputTarget:null,inputClass:null,preset:[[bb,{enable:!1}],[_,{enable:!1},["rotate"]],[cb,{direction:Hb}],[$,{direction:Hb},["swipe"]],[db],[db,{event:"doubletap",taps:2},["tap"]],[ab]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var lc=1,mc=2;fb.prototype={set:function(a){return h(this.options,a),a.touchAction&&this.touchAction.update(),a.inputTarget&&(this.input.destroy(),this.input.target=a.inputTarget,this.input.init()),this},stop:function(a){this.session.stopped=a?mc:lc},recognize:function(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&ic)&&(e=b.curRecognizer=null);for(var f=0;f<d.length;)c=d[f],b.stopped===mc||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(fc|gc|hc)&&(e=b.curRecognizer=c),f++}},get:function(a){if(a instanceof V)return a;for(var b=this.recognizers,c=0;c<b.length;c++)if(b[c].options.event==a)return b[c];return null},add:function(a){if(f(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a},remove:function(a){if(f(a,"remove",this))return this;var b=this.recognizers;return a=this.get(a),b.splice(s(b,a),1),this.touchAction.update(),this},on:function(a,b){var c=this.handlers;return g(r(a),function(a){c[a]=c[a]||[],c[a].push(b)}),this},off:function(a,b){var c=this.handlers;return g(r(a),function(a){b?c[a].splice(s(c[a],b),1):delete c[a]}),this},emit:function(a,b){this.options.domEvents&&hb(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault()};for(var d=0;d<c.length;)c[d](b),d++}},destroy:function(){this.element&&gb(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},h(eb,{INPUT_START:yb,INPUT_MOVE:zb,INPUT_END:Ab,INPUT_CANCEL:Bb,STATE_POSSIBLE:ec,STATE_BEGAN:fc,STATE_CHANGED:gc,STATE_ENDED:hc,STATE_RECOGNIZED:ic,STATE_CANCELLED:jc,STATE_FAILED:kc,DIRECTION_NONE:Cb,DIRECTION_LEFT:Db,DIRECTION_RIGHT:Eb,DIRECTION_UP:Fb,DIRECTION_DOWN:Gb,DIRECTION_HORIZONTAL:Hb,DIRECTION_VERTICAL:Ib,DIRECTION_ALL:Jb,Manager:fb,Input:y,TouchAction:T,TouchInput:Q,MouseInput:M,PointerEventInput:N,TouchMouseInput:S,SingleTouchInput:O,Recognizer:V,AttrRecognizer:Z,Tap:db,Pan:$,Swipe:cb,Pinch:_,Rotate:bb,Press:ab,on:n,off:o,each:g,merge:i,extend:h,inherit:j,bindFn:k,prefixed:v}),typeof define==kb&&define.amd?define(function(){return eb}):"undefined"!=typeof module&&module.exports?module.exports=eb:a[c]=eb}(window,document,"Hammer");


OJ.extendComponent(
    'OjAudio', [OjMedia],
    {
        '_sources' : null,

        '_makeMedia' : function(){
            var elm = new OjStyleElement('<audio></audio>');
//            elm.addEventListener('load', this._callback = this._onMediaLoad.bind(this));
            return elm;
        },
        '_setSource' : function(url){
            this._super(OjMedia, '_setSource', arguments);
            if(this.media){
                this.media.attr('src', this._source);
            }
        },

        '_onMediaLoad' : function(evt){
        },

        'pause' : function(){
            if(this.media){
                this.media.dom.pause();
            }
        },
        'play' : function(){
            if(this.media){
                this.media.dom.play();
            }
        },
        'stop' : function(){
            if(this.media){
                if(this.media.load){
                    this.media.dom.load();
                }
                else{
                    this.media.attr('src', null);
                    this.media.attr('src', this._source);
                }
            }
        },

        '.sources' : function(){
            if(this._sources){
                return this._sources.clone();
            }
            return [];
        },
        '=sources' : function(sources){
            this._sources = sources ? sources.clone() : [];
            var ln = this._sources.length;
            if(this.media){
                for(var i = 0; i < ln; i++){
                    if(this.media.canPlayType(OjAudio.audioType(this._sources[i])) == ''){
                    }
                }
            }
            else if(ln){
                this.source = this._sources[ln];
            }
        }
    },
    {
        'MP3' : 'audio/mpeg',
        'MP4' : 'audio/mp4',
        'OGG' : 'audio/ogg',
        'WAV' : 'audio/x-wav',
        'audioType' : function(url){
            var parts = OjUrl.url(url).path.split('.'),
                ext = parts.pop();
            if(!ext){
                return null;
            }
            ext = ext.toLowerCase();
            if(ext == 'mp3' || ext == 'mpeg' || ext == 'mpeg1' || ext == 'mpeg2' || ext == 'mpeg3'){
                return this.MP3;
            }
            if(ext == 'mp4' || ext == 'm4a' || ext == 'm4p' || ext == 'm4b' || ext == 'm4r' || ext == 'm4v'){
                return this.MP4;
            }
            if(ext == 'ogg'){
                return this.OGG;
            }
            if(ext == 'wav'){
                return this.WAV
            }
            return null;
        },
        '_TAGS' : ['audio']
    }
);


OJ.extendComponent(
    'OjFlash', [OjMedia],
    {
        '_tag' : '<object></object>'
    },
    {
        '_TAGS' : ['flash']
    }
);


OJ.extendComponent(
    'OjVideo', [OjMedia],
    {
        '_tag' : '<video></video>'
    },
    {
        'supportedVideo' : function(){
            return ['video'];
        }
    }
);

OJ.extendClass(
    'OjMenu', [OjComponent],
    {
        '_props_' : {
            'content' : null,
            'horzOffset' : null,
            'positioning' : null,
            'parentMenu' : null,
            'vertOffset' : 0
        },

        '_constructor' : function(/*content, positioning, parent_menu*/){
            this._super(OjComponent, '_constructor', []);
            this._processArguments(arguments, {
                'content' : null,
                'positioning' : [
                    OjMenu.RIGHT_MIDDLE, OjMenu.RIGHT_TOP, OjMenu.RIGHT_BOTTOM,
                    OjMenu.LEFT_MIDDLE, OjMenu.LEFT_TOP, OjMenu.LEFT_BOTTOM,
                    OjMenu.BOTTOM_LEFT, OjMenu.BOTTOM_CENTER, OjMenu.BOTTOM_RIGHT,
                    OjMenu.TOP_LEFT, OjMenu.TOP_CENTER, OjMenu.TOP_RIGHT
                ],
                'parentMenu' : null
            });
        },
        '_destructor' : function(){
            this._content = null;
            return this._super(OjComponent, '_destructor', arguments);
        },

        'hasSubMenu' : function(menu){
            while(menu){
                if((menu = menu.parentMenu) == this){
                    return true;
                }
            }
            return false;
        },
        '=content' : function(content){
            if(this._content == content){
                return;
            }
//                if(content.is('OjForm')){
//                    content.addEventListener(OjEvent.CANCEL, this, '_onClose');
//                    content.addEventListener(OjEvent.SUBMIT, this, '_onClose');
//                }
            if(this._content){
//                    this._content.removeEventListener(OjEvent.CANCEL, this, '_onClose');
//                    this._content.removeEventListener(OjEvent.SUBMIT, this, '_onClose');
                this.replaceChild(this._content, this._content = content);
            }
            else{
                this.appendChild(this._content = content);
            }
        }
    },
    {
        'TOP_LEFT' : 'positionTopLeft',
        'TOP_CENTER' : 'positionTopCenter',
        'TOP_RIGHT' : 'positionTopRight',
        'BOTTOM_LEFT' : 'positionBottomLeft',
        'BOTTOM_CENTER' : 'positionBottomCenter',
        'BOTTOM_RIGHT' : 'positionBottomRight',
        'LEFT_TOP' : 'positionLeftTop',
        'LEFT_MIDDLE' : 'positionLeftMiddle',
        'LEFT_BOTTOM' : 'positionLeftBottom',
        'RIGHT_TOP' : 'positionRightTop',
        'RIGHT_MIDDLE' : 'positionRightMiddle',
        'RIGHT_BOTTOM' : 'positionRightBottom'
    }
);

OJ.extendManager(
    'MenuManager', 'OjMenuManager', [OjActionable],
    {
        '_props_' : {
            'menuClass' : OjMenu
        },

//        '_active': null,  '_menus': null,  '_tweens': null,

        '_constructor' : function(){
            this._super(OjActionable, '_constructor', arguments);
            this._menus = {};
            this._active = {};
            this._tweens = {};
        },
        '_percentRectVisible' : function(rect){
            var viewport = OJ.viewport;
            var x = {
                'top' : rect.top > 0 && rect.top >= viewport.top ? rect.top : viewport.top,
                'left' : rect.left > 0 && rect.left >= viewport.left ? rect.left : viewport.left,
                'bottom' : viewport.bottom >= rect.bottom ? rect.bottom : viewport.bottom,
                'right' : viewport.right >= rect.right ? rect.right : viewport.right
            };
            return ((rect.bottom - rect.top) * (rect.right - rect.left)) /
                   ((x.bottom - x.top) * (x.right - x.left));
        },
        '_positionMenu' : function(menu, target){
            var pos = menu.positioning;
            var rect, rect_vis;
            var backup, visibility = 0;
            var i, ln = pos.length;
            for(i = 0; i < ln; i++){
                rect = this[pos[i]](target, menu);
                rect_vis = this._percentRectVisible(rect);
                if(rect_vis == 1){
                    break;
                }
                else if(rect_vis > visibility){
                    visibility = rect_vis;
                    backup = rect;
                }
                if(backup){
                    rect = null;
                }
            }
            if(!rect){
                rect = backup;
            }
            menu.x = rect.left;
            menu.y = rect.top;
        },
        '_removeMenus' : function(list){
            var key, tweens = new OjTweenSet();
            for(key in list){
                // stop & remove the old tween/menu
                OJ.destroy(this._tweens[key]);
                // remove old event listeners
                OjElement.byId(key).removeEventListener(OjTransformEvent.MOVE, this, '_onTargetMove');
                // add the fade out
                tweens.addTween(new OjFade(list[key], OjFade.OUT));
                delete this._active[key];
                delete this._tweens[key];
            }
            if(tweens.numTweens()){
                tweens.addEventListener(OjTweenEvent.COMPLETE, this, '_onTransOut');
                tweens.start();
            }
        },

        '_onPageClick' : function(evt){
            var key, active, target, page_x, page_y;
            // check to see if we should cancel
            for(key in this._active){
                active = this._active[key];
                page_x = evt.pageX;
                page_y = evt.pageY;
                if(active && active.hitTestPoint(page_x, page_y)){
                    return;
                }
                target = OjElement.byId(key);
                if(target && target.hitTestPoint(page_x, page_y)){
                    return;
                }
            }
            // if not shut it down for all actives
            this._removeMenus(this._active);
            // remove the event listener
            OJ.removeEventListener(OjUiEvent.PRESS, this, '_onPageClick');
        },
        '_onTargetClick' : function(evt){
            var target = evt.current_target;
            var menu = this._menus[target.id];
            if(menu && !this._active[target.id]){
                this.show(menu, target)
            }
        },
        '_onTargetMove' : function(evt){
            var target = evt.current_target;
            var menu = this._menus[target.id];
            if(menu){
                this._positionMenu(menu, target);
            }
        },
        '_onTransOut' : function(evt){
            OJ.destroy(evt.current_target);
        },

        'hide' : function(menu){
            var key, id, ln = 0;
            for(key in this._active){
                ln++;
                if(this._active[key] == menu){
                    id = key
                }
            }
            if(id){
                var tmp = {};
                tmp[id] = menu;
                delete this._active[id];
                this._removeMenus(tmp);
                // if there are no more active menus then stop listening for page clicks
                if(ln == 1){
                    OJ.removeEventListener(OjUiEvent.PRESS, this, '_onPageClick');
                }
            }
        },
        'makeMenu' : function(){
            return this._menuClass.makeNew(arguments);
        },
        'menu' : function(target, content/*, positioning, parent_menu*/){
            // build the menu
            var menu = this.makeMenu.apply(this, Array.slice(arguments, 1));
            this.register(target, menu);
            this.show(menu, target);
            return menu;
        },
        'register' : function(target, menu){
            // setup the target click listener
            target.addEventListener(OjUiEvent.PRESS, this, '_onTargetClick');
            this._menus[target.id] = menu;
        },
        'show' : function(menu/*, target*/){
            var target = arguments.length > 1 ? arguments[1] : null;
            var key, list = {};
            if(!target){
                for(key in this._menus){
                    if(this._menus[key] == menu){
                        target = OjElement.byId(key);
                        break;
                    }
                }
            }
            // remove all non-parent active menus
            for(key in this._active){
                if(this._active[key] != menu && !this._active[key].hasSubMenu(menu)){
                    list[key] = this._active[key];
                }
            }
            this._removeMenus(list);
            // grab the menu
            menu.alpha = 0;
            OJ.appendChild(menu);
            // position the menu based on preferences
            if(menu){
                this._positionMenu(menu, target);
                var tween = new OjFade(menu);
                tween.start();
                this._active[target.id] = menu;
                this._tweens[target.id] = tween;
                OJ.addEventListener(OjUiEvent.PRESS, this, '_onPageClick');
            }
            target.addEventListener(OjTransformEvent.MOVE, this, '_onTargetMove');
        },
        'unregister' : function(target/*|menu*/){
            if(target.is('OjMenu')){
                var key;
                for(key in this._menus){
                    if(this._menus[key] == target){
                        target = OjElement.byId(key);
                        break;
                    }
                }
            }
            if(target){
                target.removeEventListener(OjUiEvent.PRESS, this, '_onTargetClick');
                delete this._menus[target.id];
            }
        },

        'positionTopLeft' : function(target, menu){
            return new OjRect(
                    target.pageX - menu.horzOffset,
                    target.pageY - menu.height - menu.vertOffset,
                    menu.width,
                    menu.height
            );
        },
        'positionTopCenter' : function(target, menu){
            return new OjRect(
                    target.pageX + ((target.width - menu.width) / 2),
                    target.pageY - menu.height,
                    menu.width,
                    menu.height
            );
        },
        'positionTopRight' : function(target, menu){
            return new OjRect(
                    target.pageX + target.width - menu.width,
                    target.pageY - menu.height,
                    menu.width,
                    menu.height
            );
        },

        'positionBottomLeft' : function(target, menu){
            return new OjRect(
                target.pageX,
                target.pageY + target.height,
                menu.width,
                menu.height
            );
        },
        'positionBottomCenter' : function(target, menu){
            return new OjRect(
                    target.pageX + ((target.width - menu.width) / 2),
                    target.pageY + target.height,
                    menu.width,
                    menu.height
            );
        },
        'positionBottomRight' : function(target, menu){
            return new OjRect(
                    target.pageX + target.width - menu.width,
                    target.pageY + target.height,
                    menu.width,
                    menu.height
            );
        },

        'positionLeftTop' : function(target, menu){
            return new OjRect(
                    target.pageX - menu.width,
                    target.pageY,
                    menu.width,
                    menu.height
            );
        },
        'positionLeftMiddle' : function(target, menu){
            return new OjRect(
                    target.pageX - menu.width,
                    target.pageY + ((target.height - menu.height) / 2),
                    menu.width,
                    menu.height
            );
        },
        'positionLeftBottom' : function(target, menu){
            return new OjRect(
                    target.pageX - menu.width,
                    target.pageY + target.height - menu.height,
                    menu.width,
                    menu.height
            );
        },

        'positionRightTop' : function(target, menu){
            return new OjRect(
                    target.getPageX() + target.getWidth(),
                    target.getPageY(),
                    menu.getWidth(),
                    menu.getHeight()
            );
        },
        'positionRightMiddle' : function(target, menu){
            return new OjRect(
                    target.pageX + target.width,
                    target.pageY + ((target.height - menu.height) / 2),
                    menu.width,
                    menu.height
            );
        },
        'positionRightBottom' : function(target, menu){
            return new OjRect(
                    target.pageX + target.width,
                    target.pageY + target.height - menu.height,
                    menu.width,
                    menu.height
            );
        }
    }
);

OJ.extendComponent(
    'OjTabNavController', [OjNavController],
    {
        '_prev_active' : null,

        '_addViewButton' : function(view, index){
            var btn = new OjButton(view.short_title, view.icon);
            btn.vAlign = OjStyleElement.TOP;
            btn.addEventListener(OjUiEvent.PRESS, this, '_onTabClick');
            view.addEventListener(OjView.ICON_CHANGE, this, '_onViewIconChange');
            view.addEventListener(OjView.TITLE_CHANGE, this, '_onViewTitleChange');
            this.insertChildAt(btn, index);
        },
        '_processDomSourceChildren' : function(dom, context){
            return;
        },
        '_removeViewButton' : function(view, index){
            OJ.destroy(this.removeElmAt(index));
            view.removeEventListener(OjView.ICON_CHANGE, this, '_onViewIconChange');
            view.removeEventListener(OjView.TITLE_CHANGE, this, '_onViewTitleChange');
        },
        '_updateActiveBtn' : function(){
            if(this._prev_active){
                this._prev_active.is_active = false;
            }
            if(this._prev_active = this.getChildAt(this._stack.active_index)){
                this._prev_active.is_active = true;
            }
        },
        // event listener callbacks
        '_onStackChange' : function(evt){
            this._updateActiveBtn();
        },
        '_onStackViewAdd' : function(evt){
            this._addViewButton(evt.view, evt.index);
        },
        '_onStackViewMove' : function(evt){
        },
        '_onStackViewRemove' : function(evt){
            this._removeViewButton(evt.view, evt.index);
        },
        '_onStackViewReplace' : function(evt){
        },
        '_onTabClick' : function(evt){
            this._stack.active_index = this.indexOfChild(evt.current_target);
            this._updateActiveBtn();
        },
        '_onViewIconChange' : function(evt){
            var view = evt.current_target;
            this.getChildAt(this._stack.indexOfElm(view)).icon = view.icon;
        },
        '_onViewTitleChange' : function(evt){
            var view = evt.current_target;
            this.getChildAt(this._stack.indexOfElm(view)).label = view.short_title;
        },

        // getter & setters
        '=stack' : function(stack){
            if(this._stack == stack){
                return;
            }
            var ln;
            if(this._stack){
                this._stack.removeEventListener(OjStackEvent.ADD, this, '_onStackViewAdd');
                this._stack.removeEventListener(OjStackEvent.MOVE, this, '_onStackViewMove');
                this._stack.removeEventListener(OjStackEvent.REMOVE, this, '_onStackViewRemove');
                this._stack.removeEventListener(OjStackEvent.REPLACE, this, '_onStackViewReplace');
                // remove all the tabs
                ln = this.num_elms;
                for(; ln--;){
                    this._removeViewButton(this._stack.getElmAt(ln), ln);
                }
            }
            this._super(OjNavController, '=stack', arguments);
            if(stack){
                stack.addEventListener(OjStackEvent.ADD, this, '_onStackViewAdd');
                stack.addEventListener(OjStackEvent.MOVE, this, '_onStackViewMove');
                stack.addEventListener(OjStackEvent.REMOVE, this, '_onStackViewRemove');
                stack.addEventListener(OjStackEvent.REPLACE, this, '_onStackViewReplace');
                // process the stack
                ln = stack.num_elms;
                for(; ln--;){
                    this._addViewButton(stack.getElmAt(ln), 0);
                }
                this._updateActiveBtn();
            }
        }
    },
    {
        '_TAGS' : ['tab-nav', 'tab-nav-controller']
    }
);

OJ.extendClass(
    'OjRpc', [OjUrlLoader],
    {
        '_props_' : {
            'method' : null,
            'params' : null
        },
        '_get_props_' : {
            'id' : null
        },

        '_constructor' : function(url, method, params/*, content_type, async*/){
            this._super(OjUrlLoader, '_constructor', []);
            var args = arguments,
                ln = args.length;
            this.content_type = ln > 3 ? args[3] : OjUrlRequest.JSON;
            this.request = new OjUrlRequest(
                url,
                {
                    'id'        : this._id = OjRpc.guid(),
                    'method'    : method,
                    'params'    : Array.array(params)
                },
                this._content_type,
                OjUrlRequest.POST
            );
            if(ln > 4){
                this.async = args[4];
            }
        },
        'load' : function(){
            return this._super(OjUrlLoader, 'load', []);
        },

        '.request' : function(){
            // todo: add clone request for getRequest() func
            return this._request;
        },
        '=method' : function(val){
            if(this._method == val){
                return;
            }
            this._request.data.method = (this._method = val);
        },
        '=params' : function(val){
            if(this._params == val){
                return;
            }
            this._request.data.params = (this._params = val);
        }
    },
    {
        'guid' : function(){
            return OJ._guid++;
        }
    }
);

OJ.extendClass(
    'OjDataRenderer', [OjTextRenderer],
    {
        '_redrawData' : function(){
            var self = this,
                data = self.data;
            if(self._super(OjTextRenderer, '_redrawData', arguments)){
                self.lbl.text = data ? data.label : '';
                return true;
            }
            return false;
        }
    }
);

OJ.extendClass(
    'OjDateRenderer', [OjTextRenderer],
    {
        '_redrawData' : function(){
            var self = this,
                data = self.data;
            if(self._super(OjTextRenderer, '_redrawData', arguments)){
                self.lbl.text = data ? data.toLocaleString() : '';
                return true;
            }
            return false;
        }
    }
);

OJ.extendComponent(
    'OjListItem', [OjItemRenderer],
    {
        '_props_' : {
            'showAccessory' : false,
            'showIcon' : false
        },
        '_template' : '<div valign=m><div var=accessory></div><img var=icon /><span var=content></span></div>',

        '_destructor' : function(/*depth = 0*/){
            var data = this._data;
            if(isObjective(data, OjActionable)){
                data.removeEventListener(OjEvent.CHANGE, this, '_onDataChange');
            }
            this._list = this._data = null;
            return this._super(OjItemRenderer, '_destructor', arguments);
        },

        '_redrawAccessory' : function(){
            if(this.showAccessory){
                this.removeCss('no-accessory');
            }
            else{
                this.addCss('no-accessory');
            }
        },
        '_redrawData' : function(){
            if(this._super(OjItemRenderer, '_redrawData', arguments)){
                this.content.text = this.data;
                return true;
            }
            return false;
        },
        '_redrawIcon' : function(){
            if(this.showIcon){
                this.removeCss('no-icon');
            }
            else{
                this.addCss('no-icon');
            }
        },

        'redraw' : function(){
            if(this._super(OjItemRenderer, 'redraw', arguments)){
                this._redrawAccessory();
                this._redrawIcon();
                return true;
            }
            return false;
        },

        '_onDataChange' : function(evt){
            this._redrawData();
        },

        '=data' : function(data){
            var old = this._data;
            if(isObjective(old, OjActionable)){
                old.removeEventListener(OjEvent.CHANGE, this, '_onDataChange');
            }
            this._data = data;
            if(isObjective(data, OjActionable)){
                data.addEventListener(OjEvent.CHANGE, this, '_onDataChange');
            }
            this.redraw();
        },
        '=showAccessory' : function(val){
            if(this._showAccessory == val){
                return;
            }
            this._showAccessory = val;
            this.redraw();
        },
        '=showIcon' : function(val){
            if(this._showIcon == val){
                return;
            }
            this._showIcon = val;
            this.redraw();
        }
    },
    {
        '_TAGS' : ['list-item', 'oj-li', 'li']
    }
);

OJ.extendComponent(
  'OjListViewItemRenderer', [OjItemRenderer],
  {
  },
    {
        '_TAGS' : ['oj-list-view-item', 'list-view-item', 'oj-lvi', 'lvi']
    }
);

OJ.extendComponent(
  'OjListView', [OjView, OjList],
  {
    '_item_renderer' : OjListViewItemRenderer,
  },
  {
    '_TAGS' : ['list-view']
  }
);
