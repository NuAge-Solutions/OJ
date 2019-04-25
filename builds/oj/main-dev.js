/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
!function(a,b,c,d){"use strict";function e(a,b,c){return setTimeout(j(a,c),b)}function f(a,b,c){return Array.isArray(a)?(g(a,c[b],c),!0):!1}function g(a,b,c){var e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0;e<a.length;)b.call(c,a[e],e,a),e++;else for(e in a)a.hasOwnProperty(e)&&b.call(c,a[e],e,a)}function h(b,c,d){var e="DEPRECATED METHOD: "+c+"\n"+d+" AT \n";return function(){var c=new Error("get-stack-trace"),d=c&&c.stack?c.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",f=a.console&&(a.console.warn||a.console.log);return f&&f.call(a.console,e,d),b.apply(this,arguments)}}function i(a,b,c){var d,e=b.prototype;d=a.prototype=Object.create(e),d.constructor=a,d._super=e,c&&la(d,c)}function j(a,b){return function(){return a.apply(b,arguments)}}function k(a,b){return typeof a==oa?a.apply(b?b[0]||d:d,b):a}function l(a,b){return a===d?b:a}function m(a,b,c){g(q(b),function(b){a.addEventListener(b,c,!1)})}function n(a,b,c){g(q(b),function(b){a.removeEventListener(b,c,!1)})}function o(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1}function p(a,b){return a.indexOf(b)>-1}function q(a){return a.trim().split(/\s+/g)}function r(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0;d<a.length;){if(c&&a[d][c]==b||!c&&a[d]===b)return d;d++}return-1}function s(a){return Array.prototype.slice.call(a,0)}function t(a,b,c){for(var d=[],e=[],f=0;f<a.length;){var g=b?a[f][b]:a[f];r(e,g)<0&&d.push(a[f]),e[f]=g,f++}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b]}):d.sort()),d}function u(a,b){for(var c,e,f=b[0].toUpperCase()+b.slice(1),g=0;g<ma.length;){if(c=ma[g],e=c?c+f:b,e in a)return e;g++}return d}function v(){return ua++}function w(b){var c=b.ownerDocument||b;return c.defaultView||c.parentWindow||a}function x(a,b){var c=this;this.manager=a,this.callback=b,this.element=a.element,this.target=a.options.inputTarget,this.domHandler=function(b){k(a.options.enable,[a])&&c.handler(b)},this.init()}function y(a){var b,c=a.options.inputClass;return new(b=c?c:xa?M:ya?P:wa?R:L)(a,z)}function z(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&Ea&&d-e===0,g=b&(Ga|Ha)&&d-e===0;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,A(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c}function A(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=D(b)),e>1&&!c.firstMultiple?c.firstMultiple=D(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=E(d);b.timeStamp=ra(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=I(h,i),b.distance=H(h,i),B(c,b),b.offsetDirection=G(b.deltaX,b.deltaY);var j=F(b.deltaTime,b.deltaX,b.deltaY);b.overallVelocityX=j.x,b.overallVelocityY=j.y,b.overallVelocity=qa(j.x)>qa(j.y)?j.x:j.y,b.scale=g?K(g.pointers,d):1,b.rotation=g?J(g.pointers,d):0,b.maxPointers=c.prevInput?b.pointers.length>c.prevInput.maxPointers?b.pointers.length:c.prevInput.maxPointers:b.pointers.length,C(c,b);var k=a.element;o(b.srcEvent.target,k)&&(k=b.srcEvent.target),b.target=k}function B(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};b.eventType!==Ea&&f.eventType!==Ga||(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y)}function C(a,b){var c,e,f,g,h=a.lastInterval||b,i=b.timeStamp-h.timeStamp;if(b.eventType!=Ha&&(i>Da||h.velocity===d)){var j=b.deltaX-h.deltaX,k=b.deltaY-h.deltaY,l=F(i,j,k);e=l.x,f=l.y,c=qa(l.x)>qa(l.y)?l.x:l.y,g=G(j,k),a.lastInterval=b}else c=h.velocity,e=h.velocityX,f=h.velocityY,g=h.direction;b.velocity=c,b.velocityX=e,b.velocityY=f,b.direction=g}function D(a){for(var b=[],c=0;c<a.pointers.length;)b[c]={clientX:pa(a.pointers[c].clientX),clientY:pa(a.pointers[c].clientY)},c++;return{timeStamp:ra(),pointers:b,center:E(b),deltaX:a.deltaX,deltaY:a.deltaY}}function E(a){var b=a.length;if(1===b)return{x:pa(a[0].clientX),y:pa(a[0].clientY)};for(var c=0,d=0,e=0;b>e;)c+=a[e].clientX,d+=a[e].clientY,e++;return{x:pa(c/b),y:pa(d/b)}}function F(a,b,c){return{x:b/a||0,y:c/a||0}}function G(a,b){return a===b?Ia:qa(a)>=qa(b)?0>a?Ja:Ka:0>b?La:Ma}function H(a,b,c){c||(c=Qa);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e)}function I(a,b,c){c||(c=Qa);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI}function J(a,b){return I(b[1],b[0],Ra)+I(a[1],a[0],Ra)}function K(a,b){return H(b[0],b[1],Ra)/H(a[0],a[1],Ra)}function L(){this.evEl=Ta,this.evWin=Ua,this.pressed=!1,x.apply(this,arguments)}function M(){this.evEl=Xa,this.evWin=Ya,x.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function N(){this.evTarget=$a,this.evWin=_a,this.started=!1,x.apply(this,arguments)}function O(a,b){var c=s(a.touches),d=s(a.changedTouches);return b&(Ga|Ha)&&(c=t(c.concat(d),"identifier",!0)),[c,d]}function P(){this.evTarget=bb,this.targetIds={},x.apply(this,arguments)}function Q(a,b){var c=s(a.touches),d=this.targetIds;if(b&(Ea|Fa)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f,g=s(a.changedTouches),h=[],i=this.target;if(f=c.filter(function(a){return o(a.target,i)}),b===Ea)for(e=0;e<f.length;)d[f[e].identifier]=!0,e++;for(e=0;e<g.length;)d[g[e].identifier]&&h.push(g[e]),b&(Ga|Ha)&&delete d[g[e].identifier],e++;return h.length?[t(f.concat(h),"identifier",!0),h]:void 0}function R(){x.apply(this,arguments);var a=j(this.handler,this);this.touch=new P(this.manager,a),this.mouse=new L(this.manager,a),this.primaryTouch=null,this.lastTouches=[]}function S(a,b){a&Ea?(this.primaryTouch=b.changedPointers[0].identifier,T.call(this,b)):a&(Ga|Ha)&&T.call(this,b)}function T(a){var b=a.changedPointers[0];if(b.identifier===this.primaryTouch){var c={x:b.clientX,y:b.clientY};this.lastTouches.push(c);var d=this.lastTouches,e=function(){var a=d.indexOf(c);a>-1&&d.splice(a,1)};setTimeout(e,cb)}}function U(a){for(var b=a.srcEvent.clientX,c=a.srcEvent.clientY,d=0;d<this.lastTouches.length;d++){var e=this.lastTouches[d],f=Math.abs(b-e.x),g=Math.abs(c-e.y);if(db>=f&&db>=g)return!0}return!1}function V(a,b){this.manager=a,this.set(b)}function W(a){if(p(a,jb))return jb;var b=p(a,kb),c=p(a,lb);return b&&c?jb:b||c?b?kb:lb:p(a,ib)?ib:hb}function X(){if(!fb)return!1;var b={},c=a.CSS&&a.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach(function(d){b[d]=c?a.CSS.supports("touch-action",d):!0}),b}function Y(a){this.options=la({},this.defaults,a||{}),this.id=v(),this.manager=null,this.options.enable=l(this.options.enable,!0),this.state=nb,this.simultaneous={},this.requireFail=[]}function Z(a){return a&sb?"cancel":a&qb?"end":a&pb?"move":a&ob?"start":""}function $(a){return a==Ma?"down":a==La?"up":a==Ja?"left":a==Ka?"right":""}function _(a,b){var c=b.manager;return c?c.get(a):a}function aa(){Y.apply(this,arguments)}function ba(){aa.apply(this,arguments),this.pX=null,this.pY=null}function ca(){aa.apply(this,arguments)}function da(){Y.apply(this,arguments),this._timer=null,this._input=null}function ea(){aa.apply(this,arguments)}function fa(){aa.apply(this,arguments)}function ga(){Y.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function ha(a,b){return b=b||{},b.recognizers=l(b.recognizers,ha.defaults.preset),new ia(a,b)}function ia(a,b){this.options=la({},ha.defaults,b||{}),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=a,this.input=y(this),this.touchAction=new V(this,this.options.touchAction),ja(this,!0),g(this.options.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[3])},this)}function ja(a,b){var c=a.element;if(c.style){var d;g(a.options.cssProps,function(e,f){d=u(c.style,f),b?(a.oldCssProps[d]=c.style[d],c.style[d]=e):c.style[d]=a.oldCssProps[d]||""}),b||(a.oldCssProps={})}}function ka(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d)}var la,ma=["","webkit","Moz","MS","ms","o"],na=b.createElement("div"),oa="function",pa=Math.round,qa=Math.abs,ra=Date.now;la="function"!=typeof Object.assign?function(a){if(a===d||null===a)throw new TypeError("Cannot convert undefined or null to object");for(var b=Object(a),c=1;c<arguments.length;c++){var e=arguments[c];if(e!==d&&null!==e)for(var f in e)e.hasOwnProperty(f)&&(b[f]=e[f])}return b}:Object.assign;var sa=h(function(a,b,c){for(var e=Object.keys(b),f=0;f<e.length;)(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]),f++;return a},"extend","Use `assign`."),ta=h(function(a,b){return sa(a,b,!0)},"merge","Use `assign`."),ua=1,va=/mobile|tablet|ip(ad|hone|od)|android/i,wa="ontouchstart"in a,xa=u(a,"PointerEvent")!==d,ya=wa&&va.test(navigator.userAgent),za="touch",Aa="pen",Ba="mouse",Ca="kinect",Da=25,Ea=1,Fa=2,Ga=4,Ha=8,Ia=1,Ja=2,Ka=4,La=8,Ma=16,Na=Ja|Ka,Oa=La|Ma,Pa=Na|Oa,Qa=["x","y"],Ra=["clientX","clientY"];x.prototype={handler:function(){},init:function(){this.evEl&&m(this.element,this.evEl,this.domHandler),this.evTarget&&m(this.target,this.evTarget,this.domHandler),this.evWin&&m(w(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&n(this.element,this.evEl,this.domHandler),this.evTarget&&n(this.target,this.evTarget,this.domHandler),this.evWin&&n(w(this.element),this.evWin,this.domHandler)}};var Sa={mousedown:Ea,mousemove:Fa,mouseup:Ga},Ta="mousedown",Ua="mousemove mouseup";i(L,x,{handler:function(a){var b=Sa[a.type];b&Ea&&0===a.button&&(this.pressed=!0),b&Fa&&1!==a.which&&(b=Ga),this.pressed&&(b&Ga&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:Ba,srcEvent:a}))}});var Va={pointerdown:Ea,pointermove:Fa,pointerup:Ga,pointercancel:Ha,pointerout:Ha},Wa={2:za,3:Aa,4:Ba,5:Ca},Xa="pointerdown",Ya="pointermove pointerup pointercancel";a.MSPointerEvent&&!a.PointerEvent&&(Xa="MSPointerDown",Ya="MSPointerMove MSPointerUp MSPointerCancel"),i(M,x,{handler:function(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=Va[d],f=Wa[a.pointerType]||a.pointerType,g=f==za,h=r(b,a.pointerId,"pointerId");e&Ea&&(0===a.button||g)?0>h&&(b.push(a),h=b.length-1):e&(Ga|Ha)&&(c=!0),0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1))}});var Za={touchstart:Ea,touchmove:Fa,touchend:Ga,touchcancel:Ha},$a="touchstart",_a="touchstart touchmove touchend touchcancel";i(N,x,{handler:function(a){var b=Za[a.type];if(b===Ea&&(this.started=!0),this.started){var c=O.call(this,a,b);b&(Ga|Ha)&&c[0].length-c[1].length===0&&(this.started=!1),this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:za,srcEvent:a})}}});var ab={touchstart:Ea,touchmove:Fa,touchend:Ga,touchcancel:Ha},bb="touchstart touchmove touchend touchcancel";i(P,x,{handler:function(a){var b=ab[a.type],c=Q.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:za,srcEvent:a})}});var cb=2500,db=25;i(R,x,{handler:function(a,b,c){var d=c.pointerType==za,e=c.pointerType==Ba;if(!(e&&c.sourceCapabilities&&c.sourceCapabilities.firesTouchEvents)){if(d)S.call(this,b,c);else if(e&&U.call(this,c))return;this.callback(a,b,c)}},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var eb=u(na.style,"touchAction"),fb=eb!==d,gb="compute",hb="auto",ib="manipulation",jb="none",kb="pan-x",lb="pan-y",mb=X();V.prototype={set:function(a){a==gb&&(a=this.compute()),fb&&this.manager.element.style&&mb[a]&&(this.manager.element.style[eb]=a),this.actions=a.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var a=[];return g(this.manager.recognizers,function(b){k(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()))}),W(a.join(" "))},preventDefaults:function(a){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return void b.preventDefault();var d=this.actions,e=p(d,jb)&&!mb[jb],f=p(d,lb)&&!mb[lb],g=p(d,kb)&&!mb[kb];if(e){var h=1===a.pointers.length,i=a.distance<2,j=a.deltaTime<250;if(h&&i&&j)return}return g&&f?void 0:e||f&&c&Na||g&&c&Oa?this.preventSrc(b):void 0},preventSrc:function(a){this.manager.session.prevented=!0,a.preventDefault()}};var nb=1,ob=2,pb=4,qb=8,rb=qb,sb=16,tb=32;Y.prototype={defaults:{},set:function(a){return la(this.options,a),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(a){if(f(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=_(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this},dropRecognizeWith:function(a){return f(a,"dropRecognizeWith",this)?this:(a=_(a,this),delete this.simultaneous[a.id],this)},requireFailure:function(a){if(f(a,"requireFailure",this))return this;var b=this.requireFail;return a=_(a,this),-1===r(b,a)&&(b.push(a),a.requireFailure(this)),this},dropRequireFailure:function(a){if(f(a,"dropRequireFailure",this))return this;a=_(a,this);var b=r(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(a){return!!this.simultaneous[a.id]},emit:function(a){function b(b){c.manager.emit(b,a)}var c=this,d=this.state;qb>d&&b(c.options.event+Z(d)),b(c.options.event),a.additionalEvent&&b(a.additionalEvent),d>=qb&&b(c.options.event+Z(d))},tryEmit:function(a){return this.canEmit()?this.emit(a):void(this.state=tb)},canEmit:function(){for(var a=0;a<this.requireFail.length;){if(!(this.requireFail[a].state&(tb|nb)))return!1;a++}return!0},recognize:function(a){var b=la({},a);return k(this.options.enable,[this,b])?(this.state&(rb|sb|tb)&&(this.state=nb),this.state=this.process(b),void(this.state&(ob|pb|qb|sb)&&this.tryEmit(b))):(this.reset(),void(this.state=tb))},process:function(a){},getTouchAction:function(){},reset:function(){}},i(aa,Y,{defaults:{pointers:1},attrTest:function(a){var b=this.options.pointers;return 0===b||a.pointers.length===b},process:function(a){var b=this.state,c=a.eventType,d=b&(ob|pb),e=this.attrTest(a);return d&&(c&Ha||!e)?b|sb:d||e?c&Ga?b|qb:b&ob?b|pb:ob:tb}}),i(ba,aa,{defaults:{event:"pan",threshold:10,pointers:1,direction:Pa},getTouchAction:function(){var a=this.options.direction,b=[];return a&Na&&b.push(lb),a&Oa&&b.push(kb),b},directionTest:function(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&Na?(e=0===f?Ia:0>f?Ja:Ka,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?Ia:0>g?La:Ma,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction},attrTest:function(a){return aa.prototype.attrTest.call(this,a)&&(this.state&ob||!(this.state&ob)&&this.directionTest(a))},emit:function(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=$(a.direction);b&&(a.additionalEvent=this.options.event+b),this._super.emit.call(this,a)}}),i(ca,aa,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[jb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&ob)},emit:function(a){if(1!==a.scale){var b=a.scale<1?"in":"out";a.additionalEvent=this.options.event+b}this._super.emit.call(this,a)}}),i(da,Y,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function(){return[hb]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(Ga|Ha)&&!f)this.reset();else if(a.eventType&Ea)this.reset(),this._timer=e(function(){this.state=rb,this.tryEmit()},b.time,this);else if(a.eventType&Ga)return rb;return tb},reset:function(){clearTimeout(this._timer)},emit:function(a){this.state===rb&&(a&&a.eventType&Ga?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=ra(),this.manager.emit(this.options.event,this._input)))}}),i(ea,aa,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[jb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&ob)}}),i(fa,aa,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:Na|Oa,pointers:1},getTouchAction:function(){return ba.prototype.getTouchAction.call(this)},attrTest:function(a){var b,c=this.options.direction;return c&(Na|Oa)?b=a.overallVelocity:c&Na?b=a.overallVelocityX:c&Oa&&(b=a.overallVelocityY),this._super.attrTest.call(this,a)&&c&a.offsetDirection&&a.distance>this.options.threshold&&a.maxPointers==this.options.pointers&&qa(b)>this.options.velocity&&a.eventType&Ga},emit:function(a){var b=$(a.offsetDirection);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a)}}),i(ga,Y,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function(){return[ib]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime<b.time;if(this.reset(),a.eventType&Ea&&0===this.count)return this.failTimeout();if(d&&f&&c){if(a.eventType!=Ga)return this.failTimeout();var g=this.pTime?a.timeStamp-this.pTime<b.interval:!0,h=!this.pCenter||H(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,h&&g?this.count+=1:this.count=1,this._input=a;var i=this.count%b.taps;if(0===i)return this.hasRequireFailures()?(this._timer=e(function(){this.state=rb,this.tryEmit()},b.interval,this),ob):rb}return tb},failTimeout:function(){return this._timer=e(function(){this.state=tb},this.options.interval,this),tb},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==rb&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),ha.VERSION="2.0.7",ha.defaults={domEvents:!1,touchAction:gb,enable:!0,inputTarget:null,inputClass:null,preset:[[ea,{enable:!1}],[ca,{enable:!1},["rotate"]],[fa,{direction:Na}],[ba,{direction:Na},["swipe"]],[ga],[ga,{event:"doubletap",taps:2},["tap"]],[da]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var ub=1,vb=2;ia.prototype={set:function(a){return la(this.options,a),a.touchAction&&this.touchAction.update(),a.inputTarget&&(this.input.destroy(),this.input.target=a.inputTarget,this.input.init()),this},stop:function(a){this.session.stopped=a?vb:ub},recognize:function(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&rb)&&(e=b.curRecognizer=null);for(var f=0;f<d.length;)c=d[f],b.stopped===vb||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(ob|pb|qb)&&(e=b.curRecognizer=c),f++}},get:function(a){if(a instanceof Y)return a;for(var b=this.recognizers,c=0;c<b.length;c++)if(b[c].options.event==a)return b[c];return null},add:function(a){if(f(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a},remove:function(a){if(f(a,"remove",this))return this;if(a=this.get(a)){var b=this.recognizers,c=r(b,a);-1!==c&&(b.splice(c,1),this.touchAction.update())}return this},on:function(a,b){if(a!==d&&b!==d){var c=this.handlers;return g(q(a),function(a){c[a]=c[a]||[],c[a].push(b)}),this}},off:function(a,b){if(a!==d){var c=this.handlers;return g(q(a),function(a){b?c[a]&&c[a].splice(r(c[a],b),1):delete c[a]}),this}},emit:function(a,b){this.options.domEvents&&ka(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault()};for(var d=0;d<c.length;)c[d](b),d++}},destroy:function(){this.element&&ja(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},la(ha,{INPUT_START:Ea,INPUT_MOVE:Fa,INPUT_END:Ga,INPUT_CANCEL:Ha,STATE_POSSIBLE:nb,STATE_BEGAN:ob,STATE_CHANGED:pb,STATE_ENDED:qb,STATE_RECOGNIZED:rb,STATE_CANCELLED:sb,STATE_FAILED:tb,DIRECTION_NONE:Ia,DIRECTION_LEFT:Ja,DIRECTION_RIGHT:Ka,DIRECTION_UP:La,DIRECTION_DOWN:Ma,DIRECTION_HORIZONTAL:Na,DIRECTION_VERTICAL:Oa,DIRECTION_ALL:Pa,Manager:ia,Input:x,TouchAction:V,TouchInput:P,MouseInput:L,PointerEventInput:M,TouchMouseInput:R,SingleTouchInput:N,Recognizer:Y,AttrRecognizer:aa,Tap:ga,Pan:ba,Swipe:fa,Pinch:ca,Rotate:ea,Press:da,on:m,off:n,each:g,merge:ta,extend:sa,assign:la,inherit:i,bindFn:j,prefixed:u});var wb="undefined"!=typeof a?a:"undefined"!=typeof self?self:{};wb.Hammer=ha,"function"==typeof define&&define.amd?define(function(){return ha}):"undefined"!=typeof module&&module.exports?module.exports=ha:a[c]=ha}(window,document,"Hammer");
//# map=hammer.min.js.map
!function(e,a){"object"==typeof exports&&"undefined"!=typeof module?module.exports=a():"function"==typeof define&&define.amd?define(a):e.moment=a()}(this,function(){"use strict";var e,n;function l(){return e.apply(null,arguments)}function _(e){return e instanceof Array||"[object Array]"===Object.prototype.toString.call(e)}function i(e){return null!=e&&"[object Object]"===Object.prototype.toString.call(e)}function o(e){return void 0===e}function m(e){return"number"==typeof e||"[object Number]"===Object.prototype.toString.call(e)}function u(e){return e instanceof Date||"[object Date]"===Object.prototype.toString.call(e)}function M(e,a){var t,s=[];for(t=0;t<e.length;++t)s.push(a(e[t],t));return s}function h(e,a){return Object.prototype.hasOwnProperty.call(e,a)}function L(e,a){for(var t in a)h(a,t)&&(e[t]=a[t]);return h(a,"toString")&&(e.toString=a.toString),h(a,"valueOf")&&(e.valueOf=a.valueOf),e}function c(e,a,t,s){return Sa(e,a,t,s,!0).utc()}function Y(e){return null==e._pf&&(e._pf={empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1,parsedDateParts:[],meridiem:null,rfc2822:!1,weekdayMismatch:!1}),e._pf}function y(e){if(null==e._isValid){var a=Y(e),t=n.call(a.parsedDateParts,function(e){return null!=e}),s=!isNaN(e._d.getTime())&&a.overflow<0&&!a.empty&&!a.invalidMonth&&!a.invalidWeekday&&!a.weekdayMismatch&&!a.nullInput&&!a.invalidFormat&&!a.userInvalidated&&(!a.meridiem||a.meridiem&&t);if(e._strict&&(s=s&&0===a.charsLeftOver&&0===a.unusedTokens.length&&void 0===a.bigHour),null!=Object.isFrozen&&Object.isFrozen(e))return s;e._isValid=s}return e._isValid}function f(e){var a=c(NaN);return null!=e?L(Y(a),e):Y(a).userInvalidated=!0,a}n=Array.prototype.some?Array.prototype.some:function(e){for(var a=Object(this),t=a.length>>>0,s=0;s<t;s++)if(s in a&&e.call(this,a[s],s,a))return!0;return!1};var d=l.momentProperties=[];function k(e,a){var t,s,n;if(o(a._isAMomentObject)||(e._isAMomentObject=a._isAMomentObject),o(a._i)||(e._i=a._i),o(a._f)||(e._f=a._f),o(a._l)||(e._l=a._l),o(a._strict)||(e._strict=a._strict),o(a._tzm)||(e._tzm=a._tzm),o(a._isUTC)||(e._isUTC=a._isUTC),o(a._offset)||(e._offset=a._offset),o(a._pf)||(e._pf=Y(a)),o(a._locale)||(e._locale=a._locale),0<d.length)for(t=0;t<d.length;t++)o(n=a[s=d[t]])||(e[s]=n);return e}var a=!1;function p(e){k(this,e),this._d=new Date(null!=e._d?e._d.getTime():NaN),this.isValid()||(this._d=new Date(NaN)),!1===a&&(a=!0,l.updateOffset(this),a=!1)}function D(e){return e instanceof p||null!=e&&null!=e._isAMomentObject}function T(e){return e<0?Math.ceil(e)||0:Math.floor(e)}function g(e){var a=+e,t=0;return 0!==a&&isFinite(a)&&(t=T(a)),t}function r(e,a,t){var s,n=Math.min(e.length,a.length),d=Math.abs(e.length-a.length),r=0;for(s=0;s<n;s++)(t&&e[s]!==a[s]||!t&&g(e[s])!==g(a[s]))&&r++;return r+d}function w(e){!1===l.suppressDeprecationWarnings&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+e)}function t(n,d){var r=!0;return L(function(){if(null!=l.deprecationHandler&&l.deprecationHandler(null,n),r){for(var e,a=[],t=0;t<arguments.length;t++){if(e="","object"==typeof arguments[t]){for(var s in e+="\n["+t+"] ",arguments[0])e+=s+": "+arguments[0][s]+", ";e=e.slice(0,-2)}else e=arguments[t];a.push(e)}w(n+"\nArguments: "+Array.prototype.slice.call(a).join("")+"\n"+(new Error).stack),r=!1}return d.apply(this,arguments)},d)}var s,v={};function S(e,a){null!=l.deprecationHandler&&l.deprecationHandler(e,a),v[e]||(w(a),v[e]=!0)}function H(e){return e instanceof Function||"[object Function]"===Object.prototype.toString.call(e)}function b(e,a){var t,s=L({},e);for(t in a)h(a,t)&&(i(e[t])&&i(a[t])?(s[t]={},L(s[t],e[t]),L(s[t],a[t])):null!=a[t]?s[t]=a[t]:delete s[t]);for(t in e)h(e,t)&&!h(a,t)&&i(e[t])&&(s[t]=L({},s[t]));return s}function j(e){null!=e&&this.set(e)}l.suppressDeprecationWarnings=!1,l.deprecationHandler=null,s=Object.keys?Object.keys:function(e){var a,t=[];for(a in e)h(e,a)&&t.push(a);return t};var x={};function O(e,a){var t=e.toLowerCase();x[t]=x[t+"s"]=x[a]=e}function P(e){return"string"==typeof e?x[e]||x[e.toLowerCase()]:void 0}function W(e){var a,t,s={};for(t in e)h(e,t)&&(a=P(t))&&(s[a]=e[t]);return s}var A={};function E(e,a){A[e]=a}function F(e,a,t){var s=""+Math.abs(e),n=a-s.length;return(0<=e?t?"+":"":"-")+Math.pow(10,Math.max(0,n)).toString().substr(1)+s}var z=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,J=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,N={},R={};function C(e,a,t,s){var n=s;"string"==typeof s&&(n=function(){return this[s]()}),e&&(R[e]=n),a&&(R[a[0]]=function(){return F(n.apply(this,arguments),a[1],a[2])}),t&&(R[t]=function(){return this.localeData().ordinal(n.apply(this,arguments),e)})}function I(e,a){return e.isValid()?(a=U(a,e.localeData()),N[a]=N[a]||function(s){var e,n,a,d=s.match(z);for(e=0,n=d.length;e<n;e++)R[d[e]]?d[e]=R[d[e]]:d[e]=(a=d[e]).match(/\[[\s\S]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"");return function(e){var a,t="";for(a=0;a<n;a++)t+=H(d[a])?d[a].call(e,s):d[a];return t}}(a),N[a](e)):e.localeData().invalidDate()}function U(e,a){var t=5;function s(e){return a.longDateFormat(e)||e}for(J.lastIndex=0;0<=t&&J.test(e);)e=e.replace(J,s),J.lastIndex=0,t-=1;return e}var G=/\d/,V=/\d\d/,K=/\d{3}/,Z=/\d{4}/,$=/[+-]?\d{6}/,B=/\d\d?/,q=/\d\d\d\d?/,Q=/\d\d\d\d\d\d?/,X=/\d{1,3}/,ee=/\d{1,4}/,ae=/[+-]?\d{1,6}/,te=/\d+/,se=/[+-]?\d+/,ne=/Z|[+-]\d\d:?\d\d/gi,de=/Z|[+-]\d\d(?::?\d\d)?/gi,re=/[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,_e={};function ie(e,t,s){_e[e]=H(t)?t:function(e,a){return e&&s?s:t}}function oe(e,a){return h(_e,e)?_e[e](a._strict,a._locale):new RegExp(me(e.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(e,a,t,s,n){return a||t||s||n})))}function me(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var ue={};function le(e,t){var a,s=t;for("string"==typeof e&&(e=[e]),m(t)&&(s=function(e,a){a[t]=g(e)}),a=0;a<e.length;a++)ue[e[a]]=s}function Me(e,n){le(e,function(e,a,t,s){t._w=t._w||{},n(e,t._w,t,s)})}var he=0,Le=1,ce=2,Ye=3,ye=4,fe=5,ke=6,pe=7,De=8;function Te(e){return ge(e)?366:365}function ge(e){return e%4==0&&e%100!=0||e%400==0}C("Y",0,0,function(){var e=this.year();return e<=9999?""+e:"+"+e}),C(0,["YY",2],0,function(){return this.year()%100}),C(0,["YYYY",4],0,"year"),C(0,["YYYYY",5],0,"year"),C(0,["YYYYYY",6,!0],0,"year"),O("year","y"),E("year",1),ie("Y",se),ie("YY",B,V),ie("YYYY",ee,Z),ie("YYYYY",ae,$),ie("YYYYYY",ae,$),le(["YYYYY","YYYYYY"],he),le("YYYY",function(e,a){a[he]=2===e.length?l.parseTwoDigitYear(e):g(e)}),le("YY",function(e,a){a[he]=l.parseTwoDigitYear(e)}),le("Y",function(e,a){a[he]=parseInt(e,10)}),l.parseTwoDigitYear=function(e){return g(e)+(68<g(e)?1900:2e3)};var we,ve=Se("FullYear",!0);function Se(a,t){return function(e){return null!=e?(be(this,a,e),l.updateOffset(this,t),this):He(this,a)}}function He(e,a){return e.isValid()?e._d["get"+(e._isUTC?"UTC":"")+a]():NaN}function be(e,a,t){e.isValid()&&!isNaN(t)&&("FullYear"===a&&ge(e.year())&&1===e.month()&&29===e.date()?e._d["set"+(e._isUTC?"UTC":"")+a](t,e.month(),je(t,e.month())):e._d["set"+(e._isUTC?"UTC":"")+a](t))}function je(e,a){if(isNaN(e)||isNaN(a))return NaN;var t,s=(a%(t=12)+t)%t;return e+=(a-s)/12,1===s?ge(e)?29:28:31-s%7%2}we=Array.prototype.indexOf?Array.prototype.indexOf:function(e){var a;for(a=0;a<this.length;++a)if(this[a]===e)return a;return-1},C("M",["MM",2],"Mo",function(){return this.month()+1}),C("MMM",0,0,function(e){return this.localeData().monthsShort(this,e)}),C("MMMM",0,0,function(e){return this.localeData().months(this,e)}),O("month","M"),E("month",8),ie("M",B),ie("MM",B,V),ie("MMM",function(e,a){return a.monthsShortRegex(e)}),ie("MMMM",function(e,a){return a.monthsRegex(e)}),le(["M","MM"],function(e,a){a[Le]=g(e)-1}),le(["MMM","MMMM"],function(e,a,t,s){var n=t._locale.monthsParse(e,s,t._strict);null!=n?a[Le]=n:Y(t).invalidMonth=e});var xe=/D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,Oe="January_February_March_April_May_June_July_August_September_October_November_December".split("_");var Pe="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_");function We(e,a){var t;if(!e.isValid())return e;if("string"==typeof a)if(/^\d+$/.test(a))a=g(a);else if(!m(a=e.localeData().monthsParse(a)))return e;return t=Math.min(e.date(),je(e.year(),a)),e._d["set"+(e._isUTC?"UTC":"")+"Month"](a,t),e}function Ae(e){return null!=e?(We(this,e),l.updateOffset(this,!0),this):He(this,"Month")}var Ee=re;var Fe=re;function ze(){function e(e,a){return a.length-e.length}var a,t,s=[],n=[],d=[];for(a=0;a<12;a++)t=c([2e3,a]),s.push(this.monthsShort(t,"")),n.push(this.months(t,"")),d.push(this.months(t,"")),d.push(this.monthsShort(t,""));for(s.sort(e),n.sort(e),d.sort(e),a=0;a<12;a++)s[a]=me(s[a]),n[a]=me(n[a]);for(a=0;a<24;a++)d[a]=me(d[a]);this._monthsRegex=new RegExp("^("+d.join("|")+")","i"),this._monthsShortRegex=this._monthsRegex,this._monthsStrictRegex=new RegExp("^("+n.join("|")+")","i"),this._monthsShortStrictRegex=new RegExp("^("+s.join("|")+")","i")}function Je(e){var a;if(e<100&&0<=e){var t=Array.prototype.slice.call(arguments);t[0]=e+400,a=new Date(Date.UTC.apply(null,t)),isFinite(a.getUTCFullYear())&&a.setUTCFullYear(e)}else a=new Date(Date.UTC.apply(null,arguments));return a}function Ne(e,a,t){var s=7+a-t;return-((7+Je(e,0,s).getUTCDay()-a)%7)+s-1}function Re(e,a,t,s,n){var d,r,_=1+7*(a-1)+(7+t-s)%7+Ne(e,s,n);return r=_<=0?Te(d=e-1)+_:_>Te(e)?(d=e+1,_-Te(e)):(d=e,_),{year:d,dayOfYear:r}}function Ce(e,a,t){var s,n,d=Ne(e.year(),a,t),r=Math.floor((e.dayOfYear()-d-1)/7)+1;return r<1?s=r+Ie(n=e.year()-1,a,t):r>Ie(e.year(),a,t)?(s=r-Ie(e.year(),a,t),n=e.year()+1):(n=e.year(),s=r),{week:s,year:n}}function Ie(e,a,t){var s=Ne(e,a,t),n=Ne(e+1,a,t);return(Te(e)-s+n)/7}C("w",["ww",2],"wo","week"),C("W",["WW",2],"Wo","isoWeek"),O("week","w"),O("isoWeek","W"),E("week",5),E("isoWeek",5),ie("w",B),ie("ww",B,V),ie("W",B),ie("WW",B,V),Me(["w","ww","W","WW"],function(e,a,t,s){a[s.substr(0,1)]=g(e)});function Ue(e,a){return e.slice(a,7).concat(e.slice(0,a))}C("d",0,"do","day"),C("dd",0,0,function(e){return this.localeData().weekdaysMin(this,e)}),C("ddd",0,0,function(e){return this.localeData().weekdaysShort(this,e)}),C("dddd",0,0,function(e){return this.localeData().weekdays(this,e)}),C("e",0,0,"weekday"),C("E",0,0,"isoWeekday"),O("day","d"),O("weekday","e"),O("isoWeekday","E"),E("day",11),E("weekday",11),E("isoWeekday",11),ie("d",B),ie("e",B),ie("E",B),ie("dd",function(e,a){return a.weekdaysMinRegex(e)}),ie("ddd",function(e,a){return a.weekdaysShortRegex(e)}),ie("dddd",function(e,a){return a.weekdaysRegex(e)}),Me(["dd","ddd","dddd"],function(e,a,t,s){var n=t._locale.weekdaysParse(e,s,t._strict);null!=n?a.d=n:Y(t).invalidWeekday=e}),Me(["d","e","E"],function(e,a,t,s){a[s]=g(e)});var Ge="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_");var Ve="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_");var Ke="Su_Mo_Tu_We_Th_Fr_Sa".split("_");var Ze=re;var $e=re;var Be=re;function qe(){function e(e,a){return a.length-e.length}var a,t,s,n,d,r=[],_=[],i=[],o=[];for(a=0;a<7;a++)t=c([2e3,1]).day(a),s=this.weekdaysMin(t,""),n=this.weekdaysShort(t,""),d=this.weekdays(t,""),r.push(s),_.push(n),i.push(d),o.push(s),o.push(n),o.push(d);for(r.sort(e),_.sort(e),i.sort(e),o.sort(e),a=0;a<7;a++)_[a]=me(_[a]),i[a]=me(i[a]),o[a]=me(o[a]);this._weekdaysRegex=new RegExp("^("+o.join("|")+")","i"),this._weekdaysShortRegex=this._weekdaysRegex,this._weekdaysMinRegex=this._weekdaysRegex,this._weekdaysStrictRegex=new RegExp("^("+i.join("|")+")","i"),this._weekdaysShortStrictRegex=new RegExp("^("+_.join("|")+")","i"),this._weekdaysMinStrictRegex=new RegExp("^("+r.join("|")+")","i")}function Qe(){return this.hours()%12||12}function Xe(e,a){C(e,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),a)})}function ea(e,a){return a._meridiemParse}C("H",["HH",2],0,"hour"),C("h",["hh",2],0,Qe),C("k",["kk",2],0,function(){return this.hours()||24}),C("hmm",0,0,function(){return""+Qe.apply(this)+F(this.minutes(),2)}),C("hmmss",0,0,function(){return""+Qe.apply(this)+F(this.minutes(),2)+F(this.seconds(),2)}),C("Hmm",0,0,function(){return""+this.hours()+F(this.minutes(),2)}),C("Hmmss",0,0,function(){return""+this.hours()+F(this.minutes(),2)+F(this.seconds(),2)}),Xe("a",!0),Xe("A",!1),O("hour","h"),E("hour",13),ie("a",ea),ie("A",ea),ie("H",B),ie("h",B),ie("k",B),ie("HH",B,V),ie("hh",B,V),ie("kk",B,V),ie("hmm",q),ie("hmmss",Q),ie("Hmm",q),ie("Hmmss",Q),le(["H","HH"],Ye),le(["k","kk"],function(e,a,t){var s=g(e);a[Ye]=24===s?0:s}),le(["a","A"],function(e,a,t){t._isPm=t._locale.isPM(e),t._meridiem=e}),le(["h","hh"],function(e,a,t){a[Ye]=g(e),Y(t).bigHour=!0}),le("hmm",function(e,a,t){var s=e.length-2;a[Ye]=g(e.substr(0,s)),a[ye]=g(e.substr(s)),Y(t).bigHour=!0}),le("hmmss",function(e,a,t){var s=e.length-4,n=e.length-2;a[Ye]=g(e.substr(0,s)),a[ye]=g(e.substr(s,2)),a[fe]=g(e.substr(n)),Y(t).bigHour=!0}),le("Hmm",function(e,a,t){var s=e.length-2;a[Ye]=g(e.substr(0,s)),a[ye]=g(e.substr(s))}),le("Hmmss",function(e,a,t){var s=e.length-4,n=e.length-2;a[Ye]=g(e.substr(0,s)),a[ye]=g(e.substr(s,2)),a[fe]=g(e.substr(n))});var aa,ta=Se("Hours",!0),sa={calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},longDateFormat:{LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},invalidDate:"Invalid date",ordinal:"%d",dayOfMonthOrdinalParse:/\d{1,2}/,relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",ss:"%d seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},months:Oe,monthsShort:Pe,week:{dow:0,doy:6},weekdays:Ge,weekdaysMin:Ke,weekdaysShort:Ve,meridiemParse:/[ap]\.?m?\.?/i},na={},da={};function ra(e){return e?e.toLowerCase().replace("_","-"):e}function _a(e){var a=null;if(!na[e]&&"undefined"!=typeof module&&module&&module.exports)try{a=aa._abbr,require("./locale/"+e),ia(a)}catch(e){}return na[e]}function ia(e,a){var t;return e&&((t=o(a)?ma(e):oa(e,a))?aa=t:"undefined"!=typeof console&&console.warn&&console.warn("Locale "+e+" not found. Did you forget to load it?")),aa._abbr}function oa(e,a){if(null===a)return delete na[e],null;var t,s=sa;if(a.abbr=e,null!=na[e])S("defineLocaleOverride","use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."),s=na[e]._config;else if(null!=a.parentLocale)if(null!=na[a.parentLocale])s=na[a.parentLocale]._config;else{if(null==(t=_a(a.parentLocale)))return da[a.parentLocale]||(da[a.parentLocale]=[]),da[a.parentLocale].push({name:e,config:a}),null;s=t._config}return na[e]=new j(b(s,a)),da[e]&&da[e].forEach(function(e){oa(e.name,e.config)}),ia(e),na[e]}function ma(e){var a;if(e&&e._locale&&e._locale._abbr&&(e=e._locale._abbr),!e)return aa;if(!_(e)){if(a=_a(e))return a;e=[e]}return function(e){for(var a,t,s,n,d=0;d<e.length;){for(a=(n=ra(e[d]).split("-")).length,t=(t=ra(e[d+1]))?t.split("-"):null;0<a;){if(s=_a(n.slice(0,a).join("-")))return s;if(t&&t.length>=a&&r(n,t,!0)>=a-1)break;a--}d++}return aa}(e)}function ua(e){var a,t=e._a;return t&&-2===Y(e).overflow&&(a=t[Le]<0||11<t[Le]?Le:t[ce]<1||t[ce]>je(t[he],t[Le])?ce:t[Ye]<0||24<t[Ye]||24===t[Ye]&&(0!==t[ye]||0!==t[fe]||0!==t[ke])?Ye:t[ye]<0||59<t[ye]?ye:t[fe]<0||59<t[fe]?fe:t[ke]<0||999<t[ke]?ke:-1,Y(e)._overflowDayOfYear&&(a<he||ce<a)&&(a=ce),Y(e)._overflowWeeks&&-1===a&&(a=pe),Y(e)._overflowWeekday&&-1===a&&(a=De),Y(e).overflow=a),e}function la(e,a,t){return null!=e?e:null!=a?a:t}function Ma(e){var a,t,s,n,d,r=[];if(!e._d){var _,i;for(_=e,i=new Date(l.now()),s=_._useUTC?[i.getUTCFullYear(),i.getUTCMonth(),i.getUTCDate()]:[i.getFullYear(),i.getMonth(),i.getDate()],e._w&&null==e._a[ce]&&null==e._a[Le]&&function(e){var a,t,s,n,d,r,_,i;if(null!=(a=e._w).GG||null!=a.W||null!=a.E)d=1,r=4,t=la(a.GG,e._a[he],Ce(Ha(),1,4).year),s=la(a.W,1),((n=la(a.E,1))<1||7<n)&&(i=!0);else{d=e._locale._week.dow,r=e._locale._week.doy;var o=Ce(Ha(),d,r);t=la(a.gg,e._a[he],o.year),s=la(a.w,o.week),null!=a.d?((n=a.d)<0||6<n)&&(i=!0):null!=a.e?(n=a.e+d,(a.e<0||6<a.e)&&(i=!0)):n=d}s<1||s>Ie(t,d,r)?Y(e)._overflowWeeks=!0:null!=i?Y(e)._overflowWeekday=!0:(_=Re(t,s,n,d,r),e._a[he]=_.year,e._dayOfYear=_.dayOfYear)}(e),null!=e._dayOfYear&&(d=la(e._a[he],s[he]),(e._dayOfYear>Te(d)||0===e._dayOfYear)&&(Y(e)._overflowDayOfYear=!0),t=Je(d,0,e._dayOfYear),e._a[Le]=t.getUTCMonth(),e._a[ce]=t.getUTCDate()),a=0;a<3&&null==e._a[a];++a)e._a[a]=r[a]=s[a];for(;a<7;a++)e._a[a]=r[a]=null==e._a[a]?2===a?1:0:e._a[a];24===e._a[Ye]&&0===e._a[ye]&&0===e._a[fe]&&0===e._a[ke]&&(e._nextDay=!0,e._a[Ye]=0),e._d=(e._useUTC?Je:function(e,a,t,s,n,d,r){var _;return e<100&&0<=e?(_=new Date(e+400,a,t,s,n,d,r),isFinite(_.getFullYear())&&_.setFullYear(e)):_=new Date(e,a,t,s,n,d,r),_}).apply(null,r),n=e._useUTC?e._d.getUTCDay():e._d.getDay(),null!=e._tzm&&e._d.setUTCMinutes(e._d.getUTCMinutes()-e._tzm),e._nextDay&&(e._a[Ye]=24),e._w&&void 0!==e._w.d&&e._w.d!==n&&(Y(e).weekdayMismatch=!0)}}var ha=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,La=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,ca=/Z|[+-]\d\d(?::?\d\d)?/,Ya=[["YYYYYY-MM-DD",/[+-]\d{6}-\d\d-\d\d/],["YYYY-MM-DD",/\d{4}-\d\d-\d\d/],["GGGG-[W]WW-E",/\d{4}-W\d\d-\d/],["GGGG-[W]WW",/\d{4}-W\d\d/,!1],["YYYY-DDD",/\d{4}-\d{3}/],["YYYY-MM",/\d{4}-\d\d/,!1],["YYYYYYMMDD",/[+-]\d{10}/],["YYYYMMDD",/\d{8}/],["GGGG[W]WWE",/\d{4}W\d{3}/],["GGGG[W]WW",/\d{4}W\d{2}/,!1],["YYYYDDD",/\d{7}/]],ya=[["HH:mm:ss.SSSS",/\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss,SSSS",/\d\d:\d\d:\d\d,\d+/],["HH:mm:ss",/\d\d:\d\d:\d\d/],["HH:mm",/\d\d:\d\d/],["HHmmss.SSSS",/\d\d\d\d\d\d\.\d+/],["HHmmss,SSSS",/\d\d\d\d\d\d,\d+/],["HHmmss",/\d\d\d\d\d\d/],["HHmm",/\d\d\d\d/],["HH",/\d\d/]],fa=/^\/?Date\((\-?\d+)/i;function ka(e){var a,t,s,n,d,r,_=e._i,i=ha.exec(_)||La.exec(_);if(i){for(Y(e).iso=!0,a=0,t=Ya.length;a<t;a++)if(Ya[a][1].exec(i[1])){n=Ya[a][0],s=!1!==Ya[a][2];break}if(null==n)return void(e._isValid=!1);if(i[3]){for(a=0,t=ya.length;a<t;a++)if(ya[a][1].exec(i[3])){d=(i[2]||" ")+ya[a][0];break}if(null==d)return void(e._isValid=!1)}if(!s&&null!=d)return void(e._isValid=!1);if(i[4]){if(!ca.exec(i[4]))return void(e._isValid=!1);r="Z"}e._f=n+(d||"")+(r||""),wa(e)}else e._isValid=!1}var pa=/^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;function Da(e,a,t,s,n,d){var r=[function(e){var a=parseInt(e,10);{if(a<=49)return 2e3+a;if(a<=999)return 1900+a}return a}(e),Pe.indexOf(a),parseInt(t,10),parseInt(s,10),parseInt(n,10)];return d&&r.push(parseInt(d,10)),r}var Ta={UT:0,GMT:0,EDT:-240,EST:-300,CDT:-300,CST:-360,MDT:-360,MST:-420,PDT:-420,PST:-480};function ga(e){var a,t,s,n=pa.exec(e._i.replace(/\([^)]*\)|[\n\t]/g," ").replace(/(\s\s+)/g," ").replace(/^\s\s*/,"").replace(/\s\s*$/,""));if(n){var d=Da(n[4],n[3],n[2],n[5],n[6],n[7]);if(a=n[1],t=d,s=e,a&&Ve.indexOf(a)!==new Date(t[0],t[1],t[2]).getDay()&&(Y(s).weekdayMismatch=!0,!(s._isValid=!1)))return;e._a=d,e._tzm=function(e,a,t){if(e)return Ta[e];if(a)return 0;var s=parseInt(t,10),n=s%100;return(s-n)/100*60+n}(n[8],n[9],n[10]),e._d=Je.apply(null,e._a),e._d.setUTCMinutes(e._d.getUTCMinutes()-e._tzm),Y(e).rfc2822=!0}else e._isValid=!1}function wa(e){if(e._f!==l.ISO_8601)if(e._f!==l.RFC_2822){e._a=[],Y(e).empty=!0;var a,t,s,n,d,r,_,i,o=""+e._i,m=o.length,u=0;for(s=U(e._f,e._locale).match(z)||[],a=0;a<s.length;a++)n=s[a],(t=(o.match(oe(n,e))||[])[0])&&(0<(d=o.substr(0,o.indexOf(t))).length&&Y(e).unusedInput.push(d),o=o.slice(o.indexOf(t)+t.length),u+=t.length),R[n]?(t?Y(e).empty=!1:Y(e).unusedTokens.push(n),r=n,i=e,null!=(_=t)&&h(ue,r)&&ue[r](_,i._a,i,r)):e._strict&&!t&&Y(e).unusedTokens.push(n);Y(e).charsLeftOver=m-u,0<o.length&&Y(e).unusedInput.push(o),e._a[Ye]<=12&&!0===Y(e).bigHour&&0<e._a[Ye]&&(Y(e).bigHour=void 0),Y(e).parsedDateParts=e._a.slice(0),Y(e).meridiem=e._meridiem,e._a[Ye]=function(e,a,t){var s;if(null==t)return a;return null!=e.meridiemHour?e.meridiemHour(a,t):(null!=e.isPM&&((s=e.isPM(t))&&a<12&&(a+=12),s||12!==a||(a=0)),a)}(e._locale,e._a[Ye],e._meridiem),Ma(e),ua(e)}else ga(e);else ka(e)}function va(e){var a,t,s,n,d=e._i,r=e._f;return e._locale=e._locale||ma(e._l),null===d||void 0===r&&""===d?f({nullInput:!0}):("string"==typeof d&&(e._i=d=e._locale.preparse(d)),D(d)?new p(ua(d)):(u(d)?e._d=d:_(r)?function(e){var a,t,s,n,d;if(0===e._f.length)return Y(e).invalidFormat=!0,e._d=new Date(NaN);for(n=0;n<e._f.length;n++)d=0,a=k({},e),null!=e._useUTC&&(a._useUTC=e._useUTC),a._f=e._f[n],wa(a),y(a)&&(d+=Y(a).charsLeftOver,d+=10*Y(a).unusedTokens.length,Y(a).score=d,(null==s||d<s)&&(s=d,t=a));L(e,t||a)}(e):r?wa(e):o(t=(a=e)._i)?a._d=new Date(l.now()):u(t)?a._d=new Date(t.valueOf()):"string"==typeof t?(s=a,null===(n=fa.exec(s._i))?(ka(s),!1===s._isValid&&(delete s._isValid,ga(s),!1===s._isValid&&(delete s._isValid,l.createFromInputFallback(s)))):s._d=new Date(+n[1])):_(t)?(a._a=M(t.slice(0),function(e){return parseInt(e,10)}),Ma(a)):i(t)?function(e){if(!e._d){var a=W(e._i);e._a=M([a.year,a.month,a.day||a.date,a.hour,a.minute,a.second,a.millisecond],function(e){return e&&parseInt(e,10)}),Ma(e)}}(a):m(t)?a._d=new Date(t):l.createFromInputFallback(a),y(e)||(e._d=null),e))}function Sa(e,a,t,s,n){var d,r={};return!0!==t&&!1!==t||(s=t,t=void 0),(i(e)&&function(e){if(Object.getOwnPropertyNames)return 0===Object.getOwnPropertyNames(e).length;var a;for(a in e)if(e.hasOwnProperty(a))return!1;return!0}(e)||_(e)&&0===e.length)&&(e=void 0),r._isAMomentObject=!0,r._useUTC=r._isUTC=n,r._l=t,r._i=e,r._f=a,r._strict=s,(d=new p(ua(va(r))))._nextDay&&(d.add(1,"d"),d._nextDay=void 0),d}function Ha(e,a,t,s){return Sa(e,a,t,s,!1)}l.createFromInputFallback=t("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",function(e){e._d=new Date(e._i+(e._useUTC?" UTC":""))}),l.ISO_8601=function(){},l.RFC_2822=function(){};var ba=t("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var e=Ha.apply(null,arguments);return this.isValid()&&e.isValid()?e<this?this:e:f()}),ja=t("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var e=Ha.apply(null,arguments);return this.isValid()&&e.isValid()?this<e?this:e:f()});function xa(e,a){var t,s;if(1===a.length&&_(a[0])&&(a=a[0]),!a.length)return Ha();for(t=a[0],s=1;s<a.length;++s)a[s].isValid()&&!a[s][e](t)||(t=a[s]);return t}var Oa=["year","quarter","month","week","day","hour","minute","second","millisecond"];function Pa(e){var a=W(e),t=a.year||0,s=a.quarter||0,n=a.month||0,d=a.week||a.isoWeek||0,r=a.day||0,_=a.hour||0,i=a.minute||0,o=a.second||0,m=a.millisecond||0;this._isValid=function(e){for(var a in e)if(-1===we.call(Oa,a)||null!=e[a]&&isNaN(e[a]))return!1;for(var t=!1,s=0;s<Oa.length;++s)if(e[Oa[s]]){if(t)return!1;parseFloat(e[Oa[s]])!==g(e[Oa[s]])&&(t=!0)}return!0}(a),this._milliseconds=+m+1e3*o+6e4*i+1e3*_*60*60,this._days=+r+7*d,this._months=+n+3*s+12*t,this._data={},this._locale=ma(),this._bubble()}function Wa(e){return e instanceof Pa}function Aa(e){return e<0?-1*Math.round(-1*e):Math.round(e)}function Ea(e,t){C(e,0,0,function(){var e=this.utcOffset(),a="+";return e<0&&(e=-e,a="-"),a+F(~~(e/60),2)+t+F(~~e%60,2)})}Ea("Z",":"),Ea("ZZ",""),ie("Z",de),ie("ZZ",de),le(["Z","ZZ"],function(e,a,t){t._useUTC=!0,t._tzm=za(de,e)});var Fa=/([\+\-]|\d\d)/gi;function za(e,a){var t=(a||"").match(e);if(null===t)return null;var s=((t[t.length-1]||[])+"").match(Fa)||["-",0,0],n=60*s[1]+g(s[2]);return 0===n?0:"+"===s[0]?n:-n}function Ja(e,a){var t,s;return a._isUTC?(t=a.clone(),s=(D(e)||u(e)?e.valueOf():Ha(e).valueOf())-t.valueOf(),t._d.setTime(t._d.valueOf()+s),l.updateOffset(t,!1),t):Ha(e).local()}function Na(e){return 15*-Math.round(e._d.getTimezoneOffset()/15)}function Ra(){return!!this.isValid()&&(this._isUTC&&0===this._offset)}l.updateOffset=function(){};var Ca=/^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,Ia=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;function Ua(e,a){var t,s,n,d=e,r=null;return Wa(e)?d={ms:e._milliseconds,d:e._days,M:e._months}:m(e)?(d={},a?d[a]=e:d.milliseconds=e):(r=Ca.exec(e))?(t="-"===r[1]?-1:1,d={y:0,d:g(r[ce])*t,h:g(r[Ye])*t,m:g(r[ye])*t,s:g(r[fe])*t,ms:g(Aa(1e3*r[ke]))*t}):(r=Ia.exec(e))?(t="-"===r[1]?-1:1,d={y:Ga(r[2],t),M:Ga(r[3],t),w:Ga(r[4],t),d:Ga(r[5],t),h:Ga(r[6],t),m:Ga(r[7],t),s:Ga(r[8],t)}):null==d?d={}:"object"==typeof d&&("from"in d||"to"in d)&&(n=function(e,a){var t;if(!e.isValid()||!a.isValid())return{milliseconds:0,months:0};a=Ja(a,e),e.isBefore(a)?t=Va(e,a):((t=Va(a,e)).milliseconds=-t.milliseconds,t.months=-t.months);return t}(Ha(d.from),Ha(d.to)),(d={}).ms=n.milliseconds,d.M=n.months),s=new Pa(d),Wa(e)&&h(e,"_locale")&&(s._locale=e._locale),s}function Ga(e,a){var t=e&&parseFloat(e.replace(",","."));return(isNaN(t)?0:t)*a}function Va(e,a){var t={};return t.months=a.month()-e.month()+12*(a.year()-e.year()),e.clone().add(t.months,"M").isAfter(a)&&--t.months,t.milliseconds=+a-+e.clone().add(t.months,"M"),t}function Ka(s,n){return function(e,a){var t;return null===a||isNaN(+a)||(S(n,"moment()."+n+"(period, number) is deprecated. Please use moment()."+n+"(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."),t=e,e=a,a=t),Za(this,Ua(e="string"==typeof e?+e:e,a),s),this}}function Za(e,a,t,s){var n=a._milliseconds,d=Aa(a._days),r=Aa(a._months);e.isValid()&&(s=null==s||s,r&&We(e,He(e,"Month")+r*t),d&&be(e,"Date",He(e,"Date")+d*t),n&&e._d.setTime(e._d.valueOf()+n*t),s&&l.updateOffset(e,d||r))}Ua.fn=Pa.prototype,Ua.invalid=function(){return Ua(NaN)};var $a=Ka(1,"add"),Ba=Ka(-1,"subtract");function qa(e,a){var t=12*(a.year()-e.year())+(a.month()-e.month()),s=e.clone().add(t,"months");return-(t+(a-s<0?(a-s)/(s-e.clone().add(t-1,"months")):(a-s)/(e.clone().add(t+1,"months")-s)))||0}function Qa(e){var a;return void 0===e?this._locale._abbr:(null!=(a=ma(e))&&(this._locale=a),this)}l.defaultFormat="YYYY-MM-DDTHH:mm:ssZ",l.defaultFormatUtc="YYYY-MM-DDTHH:mm:ss[Z]";var Xa=t("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(e){return void 0===e?this.localeData():this.locale(e)});function et(){return this._locale}var at=126227808e5;function tt(e,a){return(e%a+a)%a}function st(e,a,t){return e<100&&0<=e?new Date(e+400,a,t)-at:new Date(e,a,t).valueOf()}function nt(e,a,t){return e<100&&0<=e?Date.UTC(e+400,a,t)-at:Date.UTC(e,a,t)}function dt(e,a){C(0,[e,e.length],0,a)}function rt(e,a,t,s,n){var d;return null==e?Ce(this,s,n).year:((d=Ie(e,s,n))<a&&(a=d),function(e,a,t,s,n){var d=Re(e,a,t,s,n),r=Je(d.year,0,d.dayOfYear);return this.year(r.getUTCFullYear()),this.month(r.getUTCMonth()),this.date(r.getUTCDate()),this}.call(this,e,a,t,s,n))}C(0,["gg",2],0,function(){return this.weekYear()%100}),C(0,["GG",2],0,function(){return this.isoWeekYear()%100}),dt("gggg","weekYear"),dt("ggggg","weekYear"),dt("GGGG","isoWeekYear"),dt("GGGGG","isoWeekYear"),O("weekYear","gg"),O("isoWeekYear","GG"),E("weekYear",1),E("isoWeekYear",1),ie("G",se),ie("g",se),ie("GG",B,V),ie("gg",B,V),ie("GGGG",ee,Z),ie("gggg",ee,Z),ie("GGGGG",ae,$),ie("ggggg",ae,$),Me(["gggg","ggggg","GGGG","GGGGG"],function(e,a,t,s){a[s.substr(0,2)]=g(e)}),Me(["gg","GG"],function(e,a,t,s){a[s]=l.parseTwoDigitYear(e)}),C("Q",0,"Qo","quarter"),O("quarter","Q"),E("quarter",7),ie("Q",G),le("Q",function(e,a){a[Le]=3*(g(e)-1)}),C("D",["DD",2],"Do","date"),O("date","D"),E("date",9),ie("D",B),ie("DD",B,V),ie("Do",function(e,a){return e?a._dayOfMonthOrdinalParse||a._ordinalParse:a._dayOfMonthOrdinalParseLenient}),le(["D","DD"],ce),le("Do",function(e,a){a[ce]=g(e.match(B)[0])});var _t=Se("Date",!0);C("DDD",["DDDD",3],"DDDo","dayOfYear"),O("dayOfYear","DDD"),E("dayOfYear",4),ie("DDD",X),ie("DDDD",K),le(["DDD","DDDD"],function(e,a,t){t._dayOfYear=g(e)}),C("m",["mm",2],0,"minute"),O("minute","m"),E("minute",14),ie("m",B),ie("mm",B,V),le(["m","mm"],ye);var it=Se("Minutes",!1);C("s",["ss",2],0,"second"),O("second","s"),E("second",15),ie("s",B),ie("ss",B,V),le(["s","ss"],fe);var ot,mt=Se("Seconds",!1);for(C("S",0,0,function(){return~~(this.millisecond()/100)}),C(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),C(0,["SSS",3],0,"millisecond"),C(0,["SSSS",4],0,function(){return 10*this.millisecond()}),C(0,["SSSSS",5],0,function(){return 100*this.millisecond()}),C(0,["SSSSSS",6],0,function(){return 1e3*this.millisecond()}),C(0,["SSSSSSS",7],0,function(){return 1e4*this.millisecond()}),C(0,["SSSSSSSS",8],0,function(){return 1e5*this.millisecond()}),C(0,["SSSSSSSSS",9],0,function(){return 1e6*this.millisecond()}),O("millisecond","ms"),E("millisecond",16),ie("S",X,G),ie("SS",X,V),ie("SSS",X,K),ot="SSSS";ot.length<=9;ot+="S")ie(ot,te);function ut(e,a){a[ke]=g(1e3*("0."+e))}for(ot="S";ot.length<=9;ot+="S")le(ot,ut);var lt=Se("Milliseconds",!1);C("z",0,0,"zoneAbbr"),C("zz",0,0,"zoneName");var Mt=p.prototype;function ht(e){return e}Mt.add=$a,Mt.calendar=function(e,a){var t=e||Ha(),s=Ja(t,this).startOf("day"),n=l.calendarFormat(this,s)||"sameElse",d=a&&(H(a[n])?a[n].call(this,t):a[n]);return this.format(d||this.localeData().calendar(n,this,Ha(t)))},Mt.clone=function(){return new p(this)},Mt.diff=function(e,a,t){var s,n,d;if(!this.isValid())return NaN;if(!(s=Ja(e,this)).isValid())return NaN;switch(n=6e4*(s.utcOffset()-this.utcOffset()),a=P(a)){case"year":d=qa(this,s)/12;break;case"month":d=qa(this,s);break;case"quarter":d=qa(this,s)/3;break;case"second":d=(this-s)/1e3;break;case"minute":d=(this-s)/6e4;break;case"hour":d=(this-s)/36e5;break;case"day":d=(this-s-n)/864e5;break;case"week":d=(this-s-n)/6048e5;break;default:d=this-s}return t?d:T(d)},Mt.endOf=function(e){var a;if(void 0===(e=P(e))||"millisecond"===e||!this.isValid())return this;var t=this._isUTC?nt:st;switch(e){case"year":a=t(this.year()+1,0,1)-1;break;case"quarter":a=t(this.year(),this.month()-this.month()%3+3,1)-1;break;case"month":a=t(this.year(),this.month()+1,1)-1;break;case"week":a=t(this.year(),this.month(),this.date()-this.weekday()+7)-1;break;case"isoWeek":a=t(this.year(),this.month(),this.date()-(this.isoWeekday()-1)+7)-1;break;case"day":case"date":a=t(this.year(),this.month(),this.date()+1)-1;break;case"hour":a=this._d.valueOf(),a+=36e5-tt(a+(this._isUTC?0:6e4*this.utcOffset()),36e5)-1;break;case"minute":a=this._d.valueOf(),a+=6e4-tt(a,6e4)-1;break;case"second":a=this._d.valueOf(),a+=1e3-tt(a,1e3)-1;break}return this._d.setTime(a),l.updateOffset(this,!0),this},Mt.format=function(e){e||(e=this.isUtc()?l.defaultFormatUtc:l.defaultFormat);var a=I(this,e);return this.localeData().postformat(a)},Mt.from=function(e,a){return this.isValid()&&(D(e)&&e.isValid()||Ha(e).isValid())?Ua({to:this,from:e}).locale(this.locale()).humanize(!a):this.localeData().invalidDate()},Mt.fromNow=function(e){return this.from(Ha(),e)},Mt.to=function(e,a){return this.isValid()&&(D(e)&&e.isValid()||Ha(e).isValid())?Ua({from:this,to:e}).locale(this.locale()).humanize(!a):this.localeData().invalidDate()},Mt.toNow=function(e){return this.to(Ha(),e)},Mt.get=function(e){return H(this[e=P(e)])?this[e]():this},Mt.invalidAt=function(){return Y(this).overflow},Mt.isAfter=function(e,a){var t=D(e)?e:Ha(e);return!(!this.isValid()||!t.isValid())&&("millisecond"===(a=P(a)||"millisecond")?this.valueOf()>t.valueOf():t.valueOf()<this.clone().startOf(a).valueOf())},Mt.isBefore=function(e,a){var t=D(e)?e:Ha(e);return!(!this.isValid()||!t.isValid())&&("millisecond"===(a=P(a)||"millisecond")?this.valueOf()<t.valueOf():this.clone().endOf(a).valueOf()<t.valueOf())},Mt.isBetween=function(e,a,t,s){var n=D(e)?e:Ha(e),d=D(a)?a:Ha(a);return!!(this.isValid()&&n.isValid()&&d.isValid())&&("("===(s=s||"()")[0]?this.isAfter(n,t):!this.isBefore(n,t))&&(")"===s[1]?this.isBefore(d,t):!this.isAfter(d,t))},Mt.isSame=function(e,a){var t,s=D(e)?e:Ha(e);return!(!this.isValid()||!s.isValid())&&("millisecond"===(a=P(a)||"millisecond")?this.valueOf()===s.valueOf():(t=s.valueOf(),this.clone().startOf(a).valueOf()<=t&&t<=this.clone().endOf(a).valueOf()))},Mt.isSameOrAfter=function(e,a){return this.isSame(e,a)||this.isAfter(e,a)},Mt.isSameOrBefore=function(e,a){return this.isSame(e,a)||this.isBefore(e,a)},Mt.isValid=function(){return y(this)},Mt.lang=Xa,Mt.locale=Qa,Mt.localeData=et,Mt.max=ja,Mt.min=ba,Mt.parsingFlags=function(){return L({},Y(this))},Mt.set=function(e,a){if("object"==typeof e)for(var t=function(e){var a=[];for(var t in e)a.push({unit:t,priority:A[t]});return a.sort(function(e,a){return e.priority-a.priority}),a}(e=W(e)),s=0;s<t.length;s++)this[t[s].unit](e[t[s].unit]);else if(H(this[e=P(e)]))return this[e](a);return this},Mt.startOf=function(e){var a;if(void 0===(e=P(e))||"millisecond"===e||!this.isValid())return this;var t=this._isUTC?nt:st;switch(e){case"year":a=t(this.year(),0,1);break;case"quarter":a=t(this.year(),this.month()-this.month()%3,1);break;case"month":a=t(this.year(),this.month(),1);break;case"week":a=t(this.year(),this.month(),this.date()-this.weekday());break;case"isoWeek":a=t(this.year(),this.month(),this.date()-(this.isoWeekday()-1));break;case"day":case"date":a=t(this.year(),this.month(),this.date());break;case"hour":a=this._d.valueOf(),a-=tt(a+(this._isUTC?0:6e4*this.utcOffset()),36e5);break;case"minute":a=this._d.valueOf(),a-=tt(a,6e4);break;case"second":a=this._d.valueOf(),a-=tt(a,1e3);break}return this._d.setTime(a),l.updateOffset(this,!0),this},Mt.subtract=Ba,Mt.toArray=function(){var e=this;return[e.year(),e.month(),e.date(),e.hour(),e.minute(),e.second(),e.millisecond()]},Mt.toObject=function(){var e=this;return{years:e.year(),months:e.month(),date:e.date(),hours:e.hours(),minutes:e.minutes(),seconds:e.seconds(),milliseconds:e.milliseconds()}},Mt.toDate=function(){return new Date(this.valueOf())},Mt.toISOString=function(e){if(!this.isValid())return null;var a=!0!==e,t=a?this.clone().utc():this;return t.year()<0||9999<t.year()?I(t,a?"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]":"YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"):H(Date.prototype.toISOString)?a?this.toDate().toISOString():new Date(this.valueOf()+60*this.utcOffset()*1e3).toISOString().replace("Z",I(t,"Z")):I(t,a?"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]":"YYYY-MM-DD[T]HH:mm:ss.SSSZ")},Mt.inspect=function(){if(!this.isValid())return"moment.invalid(/* "+this._i+" */)";var e="moment",a="";this.isLocal()||(e=0===this.utcOffset()?"moment.utc":"moment.parseZone",a="Z");var t="["+e+'("]',s=0<=this.year()&&this.year()<=9999?"YYYY":"YYYYYY",n=a+'[")]';return this.format(t+s+"-MM-DD[T]HH:mm:ss.SSS"+n)},Mt.toJSON=function(){return this.isValid()?this.toISOString():null},Mt.toString=function(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},Mt.unix=function(){return Math.floor(this.valueOf()/1e3)},Mt.valueOf=function(){return this._d.valueOf()-6e4*(this._offset||0)},Mt.creationData=function(){return{input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict}},Mt.year=ve,Mt.isLeapYear=function(){return ge(this.year())},Mt.weekYear=function(e){return rt.call(this,e,this.week(),this.weekday(),this.localeData()._week.dow,this.localeData()._week.doy)},Mt.isoWeekYear=function(e){return rt.call(this,e,this.isoWeek(),this.isoWeekday(),1,4)},Mt.quarter=Mt.quarters=function(e){return null==e?Math.ceil((this.month()+1)/3):this.month(3*(e-1)+this.month()%3)},Mt.month=Ae,Mt.daysInMonth=function(){return je(this.year(),this.month())},Mt.week=Mt.weeks=function(e){var a=this.localeData().week(this);return null==e?a:this.add(7*(e-a),"d")},Mt.isoWeek=Mt.isoWeeks=function(e){var a=Ce(this,1,4).week;return null==e?a:this.add(7*(e-a),"d")},Mt.weeksInYear=function(){var e=this.localeData()._week;return Ie(this.year(),e.dow,e.doy)},Mt.isoWeeksInYear=function(){return Ie(this.year(),1,4)},Mt.date=_t,Mt.day=Mt.days=function(e){if(!this.isValid())return null!=e?this:NaN;var a,t,s=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=e?(a=e,t=this.localeData(),e="string"!=typeof a?a:isNaN(a)?"number"==typeof(a=t.weekdaysParse(a))?a:null:parseInt(a,10),this.add(e-s,"d")):s},Mt.weekday=function(e){if(!this.isValid())return null!=e?this:NaN;var a=(this.day()+7-this.localeData()._week.dow)%7;return null==e?a:this.add(e-a,"d")},Mt.isoWeekday=function(e){if(!this.isValid())return null!=e?this:NaN;if(null==e)return this.day()||7;var a,t,s=(a=e,t=this.localeData(),"string"==typeof a?t.weekdaysParse(a)%7||7:isNaN(a)?null:a);return this.day(this.day()%7?s:s-7)},Mt.dayOfYear=function(e){var a=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==e?a:this.add(e-a,"d")},Mt.hour=Mt.hours=ta,Mt.minute=Mt.minutes=it,Mt.second=Mt.seconds=mt,Mt.millisecond=Mt.milliseconds=lt,Mt.utcOffset=function(e,a,t){var s,n=this._offset||0;if(!this.isValid())return null!=e?this:NaN;if(null==e)return this._isUTC?n:Na(this);if("string"==typeof e){if(null===(e=za(de,e)))return this}else Math.abs(e)<16&&!t&&(e*=60);return!this._isUTC&&a&&(s=Na(this)),this._offset=e,this._isUTC=!0,null!=s&&this.add(s,"m"),n!==e&&(!a||this._changeInProgress?Za(this,Ua(e-n,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,l.updateOffset(this,!0),this._changeInProgress=null)),this},Mt.utc=function(e){return this.utcOffset(0,e)},Mt.local=function(e){return this._isUTC&&(this.utcOffset(0,e),this._isUTC=!1,e&&this.subtract(Na(this),"m")),this},Mt.parseZone=function(){if(null!=this._tzm)this.utcOffset(this._tzm,!1,!0);else if("string"==typeof this._i){var e=za(ne,this._i);null!=e?this.utcOffset(e):this.utcOffset(0,!0)}return this},Mt.hasAlignedHourOffset=function(e){return!!this.isValid()&&(e=e?Ha(e).utcOffset():0,(this.utcOffset()-e)%60==0)},Mt.isDST=function(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()},Mt.isLocal=function(){return!!this.isValid()&&!this._isUTC},Mt.isUtcOffset=function(){return!!this.isValid()&&this._isUTC},Mt.isUtc=Ra,Mt.isUTC=Ra,Mt.zoneAbbr=function(){return this._isUTC?"UTC":""},Mt.zoneName=function(){return this._isUTC?"Coordinated Universal Time":""},Mt.dates=t("dates accessor is deprecated. Use date instead.",_t),Mt.months=t("months accessor is deprecated. Use month instead",Ae),Mt.years=t("years accessor is deprecated. Use year instead",ve),Mt.zone=t("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",function(e,a){return null!=e?("string"!=typeof e&&(e=-e),this.utcOffset(e,a),this):-this.utcOffset()}),Mt.isDSTShifted=t("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",function(){if(!o(this._isDSTShifted))return this._isDSTShifted;var e={};if(k(e,this),(e=va(e))._a){var a=e._isUTC?c(e._a):Ha(e._a);this._isDSTShifted=this.isValid()&&0<r(e._a,a.toArray())}else this._isDSTShifted=!1;return this._isDSTShifted});var Lt=j.prototype;function ct(e,a,t,s){var n=ma(),d=c().set(s,a);return n[t](d,e)}function Yt(e,a,t){if(m(e)&&(a=e,e=void 0),e=e||"",null!=a)return ct(e,a,t,"month");var s,n=[];for(s=0;s<12;s++)n[s]=ct(e,s,t,"month");return n}function yt(e,a,t,s){a=("boolean"==typeof e?m(a)&&(t=a,a=void 0):(a=e,e=!1,m(t=a)&&(t=a,a=void 0)),a||"");var n,d=ma(),r=e?d._week.dow:0;if(null!=t)return ct(a,(t+r)%7,s,"day");var _=[];for(n=0;n<7;n++)_[n]=ct(a,(n+r)%7,s,"day");return _}Lt.calendar=function(e,a,t){var s=this._calendar[e]||this._calendar.sameElse;return H(s)?s.call(a,t):s},Lt.longDateFormat=function(e){var a=this._longDateFormat[e],t=this._longDateFormat[e.toUpperCase()];return a||!t?a:(this._longDateFormat[e]=t.replace(/MMMM|MM|DD|dddd/g,function(e){return e.slice(1)}),this._longDateFormat[e])},Lt.invalidDate=function(){return this._invalidDate},Lt.ordinal=function(e){return this._ordinal.replace("%d",e)},Lt.preparse=ht,Lt.postformat=ht,Lt.relativeTime=function(e,a,t,s){var n=this._relativeTime[t];return H(n)?n(e,a,t,s):n.replace(/%d/i,e)},Lt.pastFuture=function(e,a){var t=this._relativeTime[0<e?"future":"past"];return H(t)?t(a):t.replace(/%s/i,a)},Lt.set=function(e){var a,t;for(t in e)H(a=e[t])?this[t]=a:this["_"+t]=a;this._config=e,this._dayOfMonthOrdinalParseLenient=new RegExp((this._dayOfMonthOrdinalParse.source||this._ordinalParse.source)+"|"+/\d{1,2}/.source)},Lt.months=function(e,a){return e?_(this._months)?this._months[e.month()]:this._months[(this._months.isFormat||xe).test(a)?"format":"standalone"][e.month()]:_(this._months)?this._months:this._months.standalone},Lt.monthsShort=function(e,a){return e?_(this._monthsShort)?this._monthsShort[e.month()]:this._monthsShort[xe.test(a)?"format":"standalone"][e.month()]:_(this._monthsShort)?this._monthsShort:this._monthsShort.standalone},Lt.monthsParse=function(e,a,t){var s,n,d;if(this._monthsParseExact)return function(e,a,t){var s,n,d,r=e.toLocaleLowerCase();if(!this._monthsParse)for(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[],s=0;s<12;++s)d=c([2e3,s]),this._shortMonthsParse[s]=this.monthsShort(d,"").toLocaleLowerCase(),this._longMonthsParse[s]=this.months(d,"").toLocaleLowerCase();return t?"MMM"===a?-1!==(n=we.call(this._shortMonthsParse,r))?n:null:-1!==(n=we.call(this._longMonthsParse,r))?n:null:"MMM"===a?-1!==(n=we.call(this._shortMonthsParse,r))?n:-1!==(n=we.call(this._longMonthsParse,r))?n:null:-1!==(n=we.call(this._longMonthsParse,r))?n:-1!==(n=we.call(this._shortMonthsParse,r))?n:null}.call(this,e,a,t);for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),s=0;s<12;s++){if(n=c([2e3,s]),t&&!this._longMonthsParse[s]&&(this._longMonthsParse[s]=new RegExp("^"+this.months(n,"").replace(".","")+"$","i"),this._shortMonthsParse[s]=new RegExp("^"+this.monthsShort(n,"").replace(".","")+"$","i")),t||this._monthsParse[s]||(d="^"+this.months(n,"")+"|^"+this.monthsShort(n,""),this._monthsParse[s]=new RegExp(d.replace(".",""),"i")),t&&"MMMM"===a&&this._longMonthsParse[s].test(e))return s;if(t&&"MMM"===a&&this._shortMonthsParse[s].test(e))return s;if(!t&&this._monthsParse[s].test(e))return s}},Lt.monthsRegex=function(e){return this._monthsParseExact?(h(this,"_monthsRegex")||ze.call(this),e?this._monthsStrictRegex:this._monthsRegex):(h(this,"_monthsRegex")||(this._monthsRegex=Fe),this._monthsStrictRegex&&e?this._monthsStrictRegex:this._monthsRegex)},Lt.monthsShortRegex=function(e){return this._monthsParseExact?(h(this,"_monthsRegex")||ze.call(this),e?this._monthsShortStrictRegex:this._monthsShortRegex):(h(this,"_monthsShortRegex")||(this._monthsShortRegex=Ee),this._monthsShortStrictRegex&&e?this._monthsShortStrictRegex:this._monthsShortRegex)},Lt.week=function(e){return Ce(e,this._week.dow,this._week.doy).week},Lt.firstDayOfYear=function(){return this._week.doy},Lt.firstDayOfWeek=function(){return this._week.dow},Lt.weekdays=function(e,a){var t=_(this._weekdays)?this._weekdays:this._weekdays[e&&!0!==e&&this._weekdays.isFormat.test(a)?"format":"standalone"];return!0===e?Ue(t,this._week.dow):e?t[e.day()]:t},Lt.weekdaysMin=function(e){return!0===e?Ue(this._weekdaysMin,this._week.dow):e?this._weekdaysMin[e.day()]:this._weekdaysMin},Lt.weekdaysShort=function(e){return!0===e?Ue(this._weekdaysShort,this._week.dow):e?this._weekdaysShort[e.day()]:this._weekdaysShort},Lt.weekdaysParse=function(e,a,t){var s,n,d;if(this._weekdaysParseExact)return function(e,a,t){var s,n,d,r=e.toLocaleLowerCase();if(!this._weekdaysParse)for(this._weekdaysParse=[],this._shortWeekdaysParse=[],this._minWeekdaysParse=[],s=0;s<7;++s)d=c([2e3,1]).day(s),this._minWeekdaysParse[s]=this.weekdaysMin(d,"").toLocaleLowerCase(),this._shortWeekdaysParse[s]=this.weekdaysShort(d,"").toLocaleLowerCase(),this._weekdaysParse[s]=this.weekdays(d,"").toLocaleLowerCase();return t?"dddd"===a?-1!==(n=we.call(this._weekdaysParse,r))?n:null:"ddd"===a?-1!==(n=we.call(this._shortWeekdaysParse,r))?n:null:-1!==(n=we.call(this._minWeekdaysParse,r))?n:null:"dddd"===a?-1!==(n=we.call(this._weekdaysParse,r))?n:-1!==(n=we.call(this._shortWeekdaysParse,r))?n:-1!==(n=we.call(this._minWeekdaysParse,r))?n:null:"ddd"===a?-1!==(n=we.call(this._shortWeekdaysParse,r))?n:-1!==(n=we.call(this._weekdaysParse,r))?n:-1!==(n=we.call(this._minWeekdaysParse,r))?n:null:-1!==(n=we.call(this._minWeekdaysParse,r))?n:-1!==(n=we.call(this._weekdaysParse,r))?n:-1!==(n=we.call(this._shortWeekdaysParse,r))?n:null}.call(this,e,a,t);for(this._weekdaysParse||(this._weekdaysParse=[],this._minWeekdaysParse=[],this._shortWeekdaysParse=[],this._fullWeekdaysParse=[]),s=0;s<7;s++){if(n=c([2e3,1]).day(s),t&&!this._fullWeekdaysParse[s]&&(this._fullWeekdaysParse[s]=new RegExp("^"+this.weekdays(n,"").replace(".","\\.?")+"$","i"),this._shortWeekdaysParse[s]=new RegExp("^"+this.weekdaysShort(n,"").replace(".","\\.?")+"$","i"),this._minWeekdaysParse[s]=new RegExp("^"+this.weekdaysMin(n,"").replace(".","\\.?")+"$","i")),this._weekdaysParse[s]||(d="^"+this.weekdays(n,"")+"|^"+this.weekdaysShort(n,"")+"|^"+this.weekdaysMin(n,""),this._weekdaysParse[s]=new RegExp(d.replace(".",""),"i")),t&&"dddd"===a&&this._fullWeekdaysParse[s].test(e))return s;if(t&&"ddd"===a&&this._shortWeekdaysParse[s].test(e))return s;if(t&&"dd"===a&&this._minWeekdaysParse[s].test(e))return s;if(!t&&this._weekdaysParse[s].test(e))return s}},Lt.weekdaysRegex=function(e){return this._weekdaysParseExact?(h(this,"_weekdaysRegex")||qe.call(this),e?this._weekdaysStrictRegex:this._weekdaysRegex):(h(this,"_weekdaysRegex")||(this._weekdaysRegex=Ze),this._weekdaysStrictRegex&&e?this._weekdaysStrictRegex:this._weekdaysRegex)},Lt.weekdaysShortRegex=function(e){return this._weekdaysParseExact?(h(this,"_weekdaysRegex")||qe.call(this),e?this._weekdaysShortStrictRegex:this._weekdaysShortRegex):(h(this,"_weekdaysShortRegex")||(this._weekdaysShortRegex=$e),this._weekdaysShortStrictRegex&&e?this._weekdaysShortStrictRegex:this._weekdaysShortRegex)},Lt.weekdaysMinRegex=function(e){return this._weekdaysParseExact?(h(this,"_weekdaysRegex")||qe.call(this),e?this._weekdaysMinStrictRegex:this._weekdaysMinRegex):(h(this,"_weekdaysMinRegex")||(this._weekdaysMinRegex=Be),this._weekdaysMinStrictRegex&&e?this._weekdaysMinStrictRegex:this._weekdaysMinRegex)},Lt.isPM=function(e){return"p"===(e+"").toLowerCase().charAt(0)},Lt.meridiem=function(e,a,t){return 11<e?t?"pm":"PM":t?"am":"AM"},ia("en",{dayOfMonthOrdinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(e){var a=e%10;return e+(1===g(e%100/10)?"th":1===a?"st":2===a?"nd":3===a?"rd":"th")}}),l.lang=t("moment.lang is deprecated. Use moment.locale instead.",ia),l.langData=t("moment.langData is deprecated. Use moment.localeData instead.",ma);var ft=Math.abs;function kt(e,a,t,s){var n=Ua(a,t);return e._milliseconds+=s*n._milliseconds,e._days+=s*n._days,e._months+=s*n._months,e._bubble()}function pt(e){return e<0?Math.floor(e):Math.ceil(e)}function Dt(e){return 4800*e/146097}function Tt(e){return 146097*e/4800}function gt(e){return function(){return this.as(e)}}var wt=gt("ms"),vt=gt("s"),St=gt("m"),Ht=gt("h"),bt=gt("d"),jt=gt("w"),xt=gt("M"),Ot=gt("Q"),Pt=gt("y");function Wt(e){return function(){return this.isValid()?this._data[e]:NaN}}var At=Wt("milliseconds"),Et=Wt("seconds"),Ft=Wt("minutes"),zt=Wt("hours"),Jt=Wt("days"),Nt=Wt("months"),Rt=Wt("years");var Ct=Math.round,It={ss:44,s:45,m:45,h:22,d:26,M:11};var Ut=Math.abs;function Gt(e){return(0<e)-(e<0)||+e}function Vt(){if(!this.isValid())return this.localeData().invalidDate();var e,a,t=Ut(this._milliseconds)/1e3,s=Ut(this._days),n=Ut(this._months);a=T((e=T(t/60))/60),t%=60,e%=60;var d=T(n/12),r=n%=12,_=s,i=a,o=e,m=t?t.toFixed(3).replace(/\.?0+$/,""):"",u=this.asSeconds();if(!u)return"P0D";var l=u<0?"-":"",M=Gt(this._months)!==Gt(u)?"-":"",h=Gt(this._days)!==Gt(u)?"-":"",L=Gt(this._milliseconds)!==Gt(u)?"-":"";return l+"P"+(d?M+d+"Y":"")+(r?M+r+"M":"")+(_?h+_+"D":"")+(i||o||m?"T":"")+(i?L+i+"H":"")+(o?L+o+"M":"")+(m?L+m+"S":"")}var Kt=Pa.prototype;Kt.isValid=function(){return this._isValid},Kt.abs=function(){var e=this._data;return this._milliseconds=ft(this._milliseconds),this._days=ft(this._days),this._months=ft(this._months),e.milliseconds=ft(e.milliseconds),e.seconds=ft(e.seconds),e.minutes=ft(e.minutes),e.hours=ft(e.hours),e.months=ft(e.months),e.years=ft(e.years),this},Kt.add=function(e,a){return kt(this,e,a,1)},Kt.subtract=function(e,a){return kt(this,e,a,-1)},Kt.as=function(e){if(!this.isValid())return NaN;var a,t,s=this._milliseconds;if("month"===(e=P(e))||"quarter"===e||"year"===e)switch(a=this._days+s/864e5,t=this._months+Dt(a),e){case"month":return t;case"quarter":return t/3;case"year":return t/12}else switch(a=this._days+Math.round(Tt(this._months)),e){case"week":return a/7+s/6048e5;case"day":return a+s/864e5;case"hour":return 24*a+s/36e5;case"minute":return 1440*a+s/6e4;case"second":return 86400*a+s/1e3;case"millisecond":return Math.floor(864e5*a)+s;default:throw new Error("Unknown unit "+e)}},Kt.asMilliseconds=wt,Kt.asSeconds=vt,Kt.asMinutes=St,Kt.asHours=Ht,Kt.asDays=bt,Kt.asWeeks=jt,Kt.asMonths=xt,Kt.asQuarters=Ot,Kt.asYears=Pt,Kt.valueOf=function(){return this.isValid()?this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*g(this._months/12):NaN},Kt._bubble=function(){var e,a,t,s,n,d=this._milliseconds,r=this._days,_=this._months,i=this._data;return 0<=d&&0<=r&&0<=_||d<=0&&r<=0&&_<=0||(d+=864e5*pt(Tt(_)+r),_=r=0),i.milliseconds=d%1e3,e=T(d/1e3),i.seconds=e%60,a=T(e/60),i.minutes=a%60,t=T(a/60),i.hours=t%24,_+=n=T(Dt(r+=T(t/24))),r-=pt(Tt(n)),s=T(_/12),_%=12,i.days=r,i.months=_,i.years=s,this},Kt.clone=function(){return Ua(this)},Kt.get=function(e){return e=P(e),this.isValid()?this[e+"s"]():NaN},Kt.milliseconds=At,Kt.seconds=Et,Kt.minutes=Ft,Kt.hours=zt,Kt.days=Jt,Kt.weeks=function(){return T(this.days()/7)},Kt.months=Nt,Kt.years=Rt,Kt.humanize=function(e){if(!this.isValid())return this.localeData().invalidDate();var a,t,s,n,d,r,_,i,o,m,u,l=this.localeData(),M=(t=!e,s=l,n=Ua(a=this).abs(),d=Ct(n.as("s")),r=Ct(n.as("m")),_=Ct(n.as("h")),i=Ct(n.as("d")),o=Ct(n.as("M")),m=Ct(n.as("y")),(u=d<=It.ss&&["s",d]||d<It.s&&["ss",d]||r<=1&&["m"]||r<It.m&&["mm",r]||_<=1&&["h"]||_<It.h&&["hh",_]||i<=1&&["d"]||i<It.d&&["dd",i]||o<=1&&["M"]||o<It.M&&["MM",o]||m<=1&&["y"]||["yy",m])[2]=t,u[3]=0<+a,u[4]=s,function(e,a,t,s,n){return n.relativeTime(a||1,!!t,e,s)}.apply(null,u));return e&&(M=l.pastFuture(+this,M)),l.postformat(M)},Kt.toISOString=Vt,Kt.toString=Vt,Kt.toJSON=Vt,Kt.locale=Qa,Kt.localeData=et,Kt.toIsoString=t("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",Vt),Kt.lang=Xa,C("X",0,0,"unix"),C("x",0,0,"valueOf"),ie("x",se),ie("X",/[+-]?\d+(\.\d{1,3})?/),le("X",function(e,a,t){t._d=new Date(1e3*parseFloat(e,10))}),le("x",function(e,a,t){t._d=new Date(g(e))}),l.version="2.24.0",e=Ha,l.fn=Mt,l.min=function(){return xa("isBefore",[].slice.call(arguments,0))},l.max=function(){return xa("isAfter",[].slice.call(arguments,0))},l.now=function(){return Date.now?Date.now():+new Date},l.utc=c,l.unix=function(e){return Ha(1e3*e)},l.months=function(e,a){return Yt(e,a,"months")},l.isDate=u,l.locale=ia,l.invalid=f,l.duration=Ua,l.isMoment=D,l.weekdays=function(e,a,t){return yt(e,a,t,"weekdays")},l.parseZone=function(){return Ha.apply(null,arguments).parseZone()},l.localeData=ma,l.isDuration=Wa,l.monthsShort=function(e,a){return Yt(e,a,"monthsShort")},l.weekdaysMin=function(e,a,t){return yt(e,a,t,"weekdaysMin")},l.defineLocale=oa,l.updateLocale=function(e,a){if(null!=a){var t,s,n=sa;null!=(s=_a(e))&&(n=s._config),(t=new j(a=b(n,a))).parentLocale=na[e],na[e]=t,ia(e)}else null!=na[e]&&(null!=na[e].parentLocale?na[e]=na[e].parentLocale:null!=na[e]&&delete na[e]);return na[e]},l.locales=function(){return s(na)},l.weekdaysShort=function(e,a,t){return yt(e,a,t,"weekdaysShort")},l.normalizeUnits=P,l.relativeTimeRounding=function(e){return void 0===e?Ct:"function"==typeof e&&(Ct=e,!0)},l.relativeTimeThreshold=function(e,a){return void 0!==It[e]&&(void 0===a?It[e]:(It[e]=a,"s"===e&&(It.ss=a-1),!0))},l.calendarFormat=function(e,a){var t=e.diff(a,"days",!0);return t<-6?"sameElse":t<-1?"lastWeek":t<0?"lastDay":t<1?"sameDay":t<2?"nextDay":t<7?"nextWeek":"sameElse"},l.prototype=Mt,l.HTML5_FMT={DATETIME_LOCAL:"YYYY-MM-DDTHH:mm",DATETIME_LOCAL_SECONDS:"YYYY-MM-DDTHH:mm:ss",DATETIME_LOCAL_MS:"YYYY-MM-DDTHH:mm:ss.SSS",DATE:"YYYY-MM-DD",TIME:"HH:mm",TIME_SECONDS:"HH:mm:ss",TIME_MS:"HH:mm:ss.SSS",WEEK:"GGGG-[W]WW",MONTH:"YYYY-MM"},l.defineLocale("af",{months:"Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember".split("_"),monthsShort:"Jan_Feb_Mrt_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des".split("_"),weekdays:"Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag".split("_"),weekdaysShort:"Son_Maa_Din_Woe_Don_Vry_Sat".split("_"),weekdaysMin:"So_Ma_Di_Wo_Do_Vr_Sa".split("_"),meridiemParse:/vm|nm/i,isPM:function(e){return/^nm$/i.test(e)},meridiem:function(e,a,t){return e<12?t?"vm":"VM":t?"nm":"NM"},longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Vandag om] LT",nextDay:"[M\xf4re om] LT",nextWeek:"dddd [om] LT",lastDay:"[Gister om] LT",lastWeek:"[Laas] dddd [om] LT",sameElse:"L"},relativeTime:{future:"oor %s",past:"%s gelede",s:"'n paar sekondes",ss:"%d sekondes",m:"'n minuut",mm:"%d minute",h:"'n uur",hh:"%d ure",d:"'n dag",dd:"%d dae",M:"'n maand",MM:"%d maande",y:"'n jaar",yy:"%d jaar"},dayOfMonthOrdinalParse:/\d{1,2}(ste|de)/,ordinal:function(e){return e+(1===e||8===e||20<=e?"ste":"de")},week:{dow:1,doy:4}}),l.defineLocale("ar-dz",{months:"\u062c\u0627\u0646\u0641\u064a_\u0641\u064a\u0641\u0631\u064a_\u0645\u0627\u0631\u0633_\u0623\u0641\u0631\u064a\u0644_\u0645\u0627\u064a_\u062c\u0648\u0627\u0646_\u062c\u0648\u064a\u0644\u064a\u0629_\u0623\u0648\u062a_\u0633\u0628\u062a\u0645\u0628\u0631_\u0623\u0643\u062a\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062f\u064a\u0633\u0645\u0628\u0631".split("_"),monthsShort:"\u062c\u0627\u0646\u0641\u064a_\u0641\u064a\u0641\u0631\u064a_\u0645\u0627\u0631\u0633_\u0623\u0641\u0631\u064a\u0644_\u0645\u0627\u064a_\u062c\u0648\u0627\u0646_\u062c\u0648\u064a\u0644\u064a\u0629_\u0623\u0648\u062a_\u0633\u0628\u062a\u0645\u0628\u0631_\u0623\u0643\u062a\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062f\u064a\u0633\u0645\u0628\u0631".split("_"),weekdays:"\u0627\u0644\u0623\u062d\u062f_\u0627\u0644\u0625\u062b\u0646\u064a\u0646_\u0627\u0644\u062b\u0644\u0627\u062b\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062e\u0645\u064a\u0633_\u0627\u0644\u062c\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062a".split("_"),weekdaysShort:"\u0627\u062d\u062f_\u0627\u062b\u0646\u064a\u0646_\u062b\u0644\u0627\u062b\u0627\u0621_\u0627\u0631\u0628\u0639\u0627\u0621_\u062e\u0645\u064a\u0633_\u062c\u0645\u0639\u0629_\u0633\u0628\u062a".split("_"),weekdaysMin:"\u0623\u062d_\u0625\u062b_\u062b\u0644\u0627_\u0623\u0631_\u062e\u0645_\u062c\u0645_\u0633\u0628".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[\u0627\u0644\u064a\u0648\u0645 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextDay:"[\u063a\u062f\u0627 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextWeek:"dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastDay:"[\u0623\u0645\u0633 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastWeek:"dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",sameElse:"L"},relativeTime:{future:"\u0641\u064a %s",past:"\u0645\u0646\u0630 %s",s:"\u062b\u0648\u0627\u0646",ss:"%d \u062b\u0627\u0646\u064a\u0629",m:"\u062f\u0642\u064a\u0642\u0629",mm:"%d \u062f\u0642\u0627\u0626\u0642",h:"\u0633\u0627\u0639\u0629",hh:"%d \u0633\u0627\u0639\u0627\u062a",d:"\u064a\u0648\u0645",dd:"%d \u0623\u064a\u0627\u0645",M:"\u0634\u0647\u0631",MM:"%d \u0623\u0634\u0647\u0631",y:"\u0633\u0646\u0629",yy:"%d \u0633\u0646\u0648\u0627\u062a"},week:{dow:0,doy:4}}),l.defineLocale("ar-kw",{months:"\u064a\u0646\u0627\u064a\u0631_\u0641\u0628\u0631\u0627\u064a\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064a\u0644_\u0645\u0627\u064a_\u064a\u0648\u0646\u064a\u0648_\u064a\u0648\u0644\u064a\u0648\u0632_\u063a\u0634\u062a_\u0634\u062a\u0646\u0628\u0631_\u0623\u0643\u062a\u0648\u0628\u0631_\u0646\u0648\u0646\u0628\u0631_\u062f\u062c\u0646\u0628\u0631".split("_"),monthsShort:"\u064a\u0646\u0627\u064a\u0631_\u0641\u0628\u0631\u0627\u064a\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064a\u0644_\u0645\u0627\u064a_\u064a\u0648\u0646\u064a\u0648_\u064a\u0648\u0644\u064a\u0648\u0632_\u063a\u0634\u062a_\u0634\u062a\u0646\u0628\u0631_\u0623\u0643\u062a\u0648\u0628\u0631_\u0646\u0648\u0646\u0628\u0631_\u062f\u062c\u0646\u0628\u0631".split("_"),weekdays:"\u0627\u0644\u0623\u062d\u062f_\u0627\u0644\u0625\u062a\u0646\u064a\u0646_\u0627\u0644\u062b\u0644\u0627\u062b\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062e\u0645\u064a\u0633_\u0627\u0644\u062c\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062a".split("_"),weekdaysShort:"\u0627\u062d\u062f_\u0627\u062a\u0646\u064a\u0646_\u062b\u0644\u0627\u062b\u0627\u0621_\u0627\u0631\u0628\u0639\u0627\u0621_\u062e\u0645\u064a\u0633_\u062c\u0645\u0639\u0629_\u0633\u0628\u062a".split("_"),weekdaysMin:"\u062d_\u0646_\u062b_\u0631_\u062e_\u062c_\u0633".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[\u0627\u0644\u064a\u0648\u0645 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextDay:"[\u063a\u062f\u0627 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextWeek:"dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastDay:"[\u0623\u0645\u0633 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastWeek:"dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",sameElse:"L"},relativeTime:{future:"\u0641\u064a %s",past:"\u0645\u0646\u0630 %s",s:"\u062b\u0648\u0627\u0646",ss:"%d \u062b\u0627\u0646\u064a\u0629",m:"\u062f\u0642\u064a\u0642\u0629",mm:"%d \u062f\u0642\u0627\u0626\u0642",h:"\u0633\u0627\u0639\u0629",hh:"%d \u0633\u0627\u0639\u0627\u062a",d:"\u064a\u0648\u0645",dd:"%d \u0623\u064a\u0627\u0645",M:"\u0634\u0647\u0631",MM:"%d \u0623\u0634\u0647\u0631",y:"\u0633\u0646\u0629",yy:"%d \u0633\u0646\u0648\u0627\u062a"},week:{dow:0,doy:12}});var Zt={1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9",0:"0"},$t=function(e){return 0===e?0:1===e?1:2===e?2:3<=e%100&&e%100<=10?3:11<=e%100?4:5},Bt={s:["\u0623\u0642\u0644 \u0645\u0646 \u062b\u0627\u0646\u064a\u0629","\u062b\u0627\u0646\u064a\u0629 \u0648\u0627\u062d\u062f\u0629",["\u062b\u0627\u0646\u064a\u062a\u0627\u0646","\u062b\u0627\u0646\u064a\u062a\u064a\u0646"],"%d \u062b\u0648\u0627\u0646","%d \u062b\u0627\u0646\u064a\u0629","%d \u062b\u0627\u0646\u064a\u0629"],m:["\u0623\u0642\u0644 \u0645\u0646 \u062f\u0642\u064a\u0642\u0629","\u062f\u0642\u064a\u0642\u0629 \u0648\u0627\u062d\u062f\u0629",["\u062f\u0642\u064a\u0642\u062a\u0627\u0646","\u062f\u0642\u064a\u0642\u062a\u064a\u0646"],"%d \u062f\u0642\u0627\u0626\u0642","%d \u062f\u0642\u064a\u0642\u0629","%d \u062f\u0642\u064a\u0642\u0629"],h:["\u0623\u0642\u0644 \u0645\u0646 \u0633\u0627\u0639\u0629","\u0633\u0627\u0639\u0629 \u0648\u0627\u062d\u062f\u0629",["\u0633\u0627\u0639\u062a\u0627\u0646","\u0633\u0627\u0639\u062a\u064a\u0646"],"%d \u0633\u0627\u0639\u0627\u062a","%d \u0633\u0627\u0639\u0629","%d \u0633\u0627\u0639\u0629"],d:["\u0623\u0642\u0644 \u0645\u0646 \u064a\u0648\u0645","\u064a\u0648\u0645 \u0648\u0627\u062d\u062f",["\u064a\u0648\u0645\u0627\u0646","\u064a\u0648\u0645\u064a\u0646"],"%d \u0623\u064a\u0627\u0645","%d \u064a\u0648\u0645\u064b\u0627","%d \u064a\u0648\u0645"],M:["\u0623\u0642\u0644 \u0645\u0646 \u0634\u0647\u0631","\u0634\u0647\u0631 \u0648\u0627\u062d\u062f",["\u0634\u0647\u0631\u0627\u0646","\u0634\u0647\u0631\u064a\u0646"],"%d \u0623\u0634\u0647\u0631","%d \u0634\u0647\u0631\u0627","%d \u0634\u0647\u0631"],y:["\u0623\u0642\u0644 \u0645\u0646 \u0639\u0627\u0645","\u0639\u0627\u0645 \u0648\u0627\u062d\u062f",["\u0639\u0627\u0645\u0627\u0646","\u0639\u0627\u0645\u064a\u0646"],"%d \u0623\u0639\u0648\u0627\u0645","%d \u0639\u0627\u0645\u064b\u0627","%d \u0639\u0627\u0645"]},qt=function(r){return function(e,a,t,s){var n=$t(e),d=Bt[r][$t(e)];return 2===n&&(d=d[a?0:1]),d.replace(/%d/i,e)}},Qt=["\u064a\u0646\u0627\u064a\u0631","\u0641\u0628\u0631\u0627\u064a\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064a\u0644","\u0645\u0627\u064a\u0648","\u064a\u0648\u0646\u064a\u0648","\u064a\u0648\u0644\u064a\u0648","\u0623\u063a\u0633\u0637\u0633","\u0633\u0628\u062a\u0645\u0628\u0631","\u0623\u0643\u062a\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062f\u064a\u0633\u0645\u0628\u0631"];l.defineLocale("ar-ly",{months:Qt,monthsShort:Qt,weekdays:"\u0627\u0644\u0623\u062d\u062f_\u0627\u0644\u0625\u062b\u0646\u064a\u0646_\u0627\u0644\u062b\u0644\u0627\u062b\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062e\u0645\u064a\u0633_\u0627\u0644\u062c\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062a".split("_"),weekdaysShort:"\u0623\u062d\u062f_\u0625\u062b\u0646\u064a\u0646_\u062b\u0644\u0627\u062b\u0627\u0621_\u0623\u0631\u0628\u0639\u0627\u0621_\u062e\u0645\u064a\u0633_\u062c\u0645\u0639\u0629_\u0633\u0628\u062a".split("_"),weekdaysMin:"\u062d_\u0646_\u062b_\u0631_\u062e_\u062c_\u0633".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"D/\u200fM/\u200fYYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},meridiemParse:/\u0635|\u0645/,isPM:function(e){return"\u0645"===e},meridiem:function(e,a,t){return e<12?"\u0635":"\u0645"},calendar:{sameDay:"[\u0627\u0644\u064a\u0648\u0645 \u0639\u0646\u062f \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextDay:"[\u063a\u062f\u064b\u0627 \u0639\u0646\u062f \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextWeek:"dddd [\u0639\u0646\u062f \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastDay:"[\u0623\u0645\u0633 \u0639\u0646\u062f \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastWeek:"dddd [\u0639\u0646\u062f \u0627\u0644\u0633\u0627\u0639\u0629] LT",sameElse:"L"},relativeTime:{future:"\u0628\u0639\u062f %s",past:"\u0645\u0646\u0630 %s",s:qt("s"),ss:qt("s"),m:qt("m"),mm:qt("m"),h:qt("h"),hh:qt("h"),d:qt("d"),dd:qt("d"),M:qt("M"),MM:qt("M"),y:qt("y"),yy:qt("y")},preparse:function(e){return e.replace(/\u060c/g,",")},postformat:function(e){return e.replace(/\d/g,function(e){return Zt[e]}).replace(/,/g,"\u060c")},week:{dow:6,doy:12}}),l.defineLocale("ar-ma",{months:"\u064a\u0646\u0627\u064a\u0631_\u0641\u0628\u0631\u0627\u064a\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064a\u0644_\u0645\u0627\u064a_\u064a\u0648\u0646\u064a\u0648_\u064a\u0648\u0644\u064a\u0648\u0632_\u063a\u0634\u062a_\u0634\u062a\u0646\u0628\u0631_\u0623\u0643\u062a\u0648\u0628\u0631_\u0646\u0648\u0646\u0628\u0631_\u062f\u062c\u0646\u0628\u0631".split("_"),monthsShort:"\u064a\u0646\u0627\u064a\u0631_\u0641\u0628\u0631\u0627\u064a\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064a\u0644_\u0645\u0627\u064a_\u064a\u0648\u0646\u064a\u0648_\u064a\u0648\u0644\u064a\u0648\u0632_\u063a\u0634\u062a_\u0634\u062a\u0646\u0628\u0631_\u0623\u0643\u062a\u0648\u0628\u0631_\u0646\u0648\u0646\u0628\u0631_\u062f\u062c\u0646\u0628\u0631".split("_"),weekdays:"\u0627\u0644\u0623\u062d\u062f_\u0627\u0644\u0625\u062a\u0646\u064a\u0646_\u0627\u0644\u062b\u0644\u0627\u062b\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062e\u0645\u064a\u0633_\u0627\u0644\u062c\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062a".split("_"),weekdaysShort:"\u0627\u062d\u062f_\u0627\u062a\u0646\u064a\u0646_\u062b\u0644\u0627\u062b\u0627\u0621_\u0627\u0631\u0628\u0639\u0627\u0621_\u062e\u0645\u064a\u0633_\u062c\u0645\u0639\u0629_\u0633\u0628\u062a".split("_"),weekdaysMin:"\u062d_\u0646_\u062b_\u0631_\u062e_\u062c_\u0633".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[\u0627\u0644\u064a\u0648\u0645 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextDay:"[\u063a\u062f\u0627 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextWeek:"dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastDay:"[\u0623\u0645\u0633 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastWeek:"dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",sameElse:"L"},relativeTime:{future:"\u0641\u064a %s",past:"\u0645\u0646\u0630 %s",s:"\u062b\u0648\u0627\u0646",ss:"%d \u062b\u0627\u0646\u064a\u0629",m:"\u062f\u0642\u064a\u0642\u0629",mm:"%d \u062f\u0642\u0627\u0626\u0642",h:"\u0633\u0627\u0639\u0629",hh:"%d \u0633\u0627\u0639\u0627\u062a",d:"\u064a\u0648\u0645",dd:"%d \u0623\u064a\u0627\u0645",M:"\u0634\u0647\u0631",MM:"%d \u0623\u0634\u0647\u0631",y:"\u0633\u0646\u0629",yy:"%d \u0633\u0646\u0648\u0627\u062a"},week:{dow:6,doy:12}});var Xt={1:"\u0661",2:"\u0662",3:"\u0663",4:"\u0664",5:"\u0665",6:"\u0666",7:"\u0667",8:"\u0668",9:"\u0669",0:"\u0660"},es={"\u0661":"1","\u0662":"2","\u0663":"3","\u0664":"4","\u0665":"5","\u0666":"6","\u0667":"7","\u0668":"8","\u0669":"9","\u0660":"0"};l.defineLocale("ar-sa",{months:"\u064a\u0646\u0627\u064a\u0631_\u0641\u0628\u0631\u0627\u064a\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064a\u0644_\u0645\u0627\u064a\u0648_\u064a\u0648\u0646\u064a\u0648_\u064a\u0648\u0644\u064a\u0648_\u0623\u063a\u0633\u0637\u0633_\u0633\u0628\u062a\u0645\u0628\u0631_\u0623\u0643\u062a\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062f\u064a\u0633\u0645\u0628\u0631".split("_"),monthsShort:"\u064a\u0646\u0627\u064a\u0631_\u0641\u0628\u0631\u0627\u064a\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064a\u0644_\u0645\u0627\u064a\u0648_\u064a\u0648\u0646\u064a\u0648_\u064a\u0648\u0644\u064a\u0648_\u0623\u063a\u0633\u0637\u0633_\u0633\u0628\u062a\u0645\u0628\u0631_\u0623\u0643\u062a\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062f\u064a\u0633\u0645\u0628\u0631".split("_"),weekdays:"\u0627\u0644\u0623\u062d\u062f_\u0627\u0644\u0625\u062b\u0646\u064a\u0646_\u0627\u0644\u062b\u0644\u0627\u062b\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062e\u0645\u064a\u0633_\u0627\u0644\u062c\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062a".split("_"),weekdaysShort:"\u0623\u062d\u062f_\u0625\u062b\u0646\u064a\u0646_\u062b\u0644\u0627\u062b\u0627\u0621_\u0623\u0631\u0628\u0639\u0627\u0621_\u062e\u0645\u064a\u0633_\u062c\u0645\u0639\u0629_\u0633\u0628\u062a".split("_"),weekdaysMin:"\u062d_\u0646_\u062b_\u0631_\u062e_\u062c_\u0633".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},meridiemParse:/\u0635|\u0645/,isPM:function(e){return"\u0645"===e},meridiem:function(e,a,t){return e<12?"\u0635":"\u0645"},calendar:{sameDay:"[\u0627\u0644\u064a\u0648\u0645 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextDay:"[\u063a\u062f\u0627 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextWeek:"dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastDay:"[\u0623\u0645\u0633 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastWeek:"dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",sameElse:"L"},relativeTime:{future:"\u0641\u064a %s",past:"\u0645\u0646\u0630 %s",s:"\u062b\u0648\u0627\u0646",ss:"%d \u062b\u0627\u0646\u064a\u0629",m:"\u062f\u0642\u064a\u0642\u0629",mm:"%d \u062f\u0642\u0627\u0626\u0642",h:"\u0633\u0627\u0639\u0629",hh:"%d \u0633\u0627\u0639\u0627\u062a",d:"\u064a\u0648\u0645",dd:"%d \u0623\u064a\u0627\u0645",M:"\u0634\u0647\u0631",MM:"%d \u0623\u0634\u0647\u0631",y:"\u0633\u0646\u0629",yy:"%d \u0633\u0646\u0648\u0627\u062a"},preparse:function(e){return e.replace(/[\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669\u0660]/g,function(e){return es[e]}).replace(/\u060c/g,",")},postformat:function(e){return e.replace(/\d/g,function(e){return Xt[e]}).replace(/,/g,"\u060c")},week:{dow:0,doy:6}}),l.defineLocale("ar-tn",{months:"\u062c\u0627\u0646\u0641\u064a_\u0641\u064a\u0641\u0631\u064a_\u0645\u0627\u0631\u0633_\u0623\u0641\u0631\u064a\u0644_\u0645\u0627\u064a_\u062c\u0648\u0627\u0646_\u062c\u0648\u064a\u0644\u064a\u0629_\u0623\u0648\u062a_\u0633\u0628\u062a\u0645\u0628\u0631_\u0623\u0643\u062a\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062f\u064a\u0633\u0645\u0628\u0631".split("_"),monthsShort:"\u062c\u0627\u0646\u0641\u064a_\u0641\u064a\u0641\u0631\u064a_\u0645\u0627\u0631\u0633_\u0623\u0641\u0631\u064a\u0644_\u0645\u0627\u064a_\u062c\u0648\u0627\u0646_\u062c\u0648\u064a\u0644\u064a\u0629_\u0623\u0648\u062a_\u0633\u0628\u062a\u0645\u0628\u0631_\u0623\u0643\u062a\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062f\u064a\u0633\u0645\u0628\u0631".split("_"),weekdays:"\u0627\u0644\u0623\u062d\u062f_\u0627\u0644\u0625\u062b\u0646\u064a\u0646_\u0627\u0644\u062b\u0644\u0627\u062b\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062e\u0645\u064a\u0633_\u0627\u0644\u062c\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062a".split("_"),weekdaysShort:"\u0623\u062d\u062f_\u0625\u062b\u0646\u064a\u0646_\u062b\u0644\u0627\u062b\u0627\u0621_\u0623\u0631\u0628\u0639\u0627\u0621_\u062e\u0645\u064a\u0633_\u062c\u0645\u0639\u0629_\u0633\u0628\u062a".split("_"),weekdaysMin:"\u062d_\u0646_\u062b_\u0631_\u062e_\u062c_\u0633".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[\u0627\u0644\u064a\u0648\u0645 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextDay:"[\u063a\u062f\u0627 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextWeek:"dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastDay:"[\u0623\u0645\u0633 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastWeek:"dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",sameElse:"L"},relativeTime:{future:"\u0641\u064a %s",past:"\u0645\u0646\u0630 %s",s:"\u062b\u0648\u0627\u0646",ss:"%d \u062b\u0627\u0646\u064a\u0629",m:"\u062f\u0642\u064a\u0642\u0629",mm:"%d \u062f\u0642\u0627\u0626\u0642",h:"\u0633\u0627\u0639\u0629",hh:"%d \u0633\u0627\u0639\u0627\u062a",d:"\u064a\u0648\u0645",dd:"%d \u0623\u064a\u0627\u0645",M:"\u0634\u0647\u0631",MM:"%d \u0623\u0634\u0647\u0631",y:"\u0633\u0646\u0629",yy:"%d \u0633\u0646\u0648\u0627\u062a"},week:{dow:1,doy:4}});var as={1:"\u0661",2:"\u0662",3:"\u0663",4:"\u0664",5:"\u0665",6:"\u0666",7:"\u0667",8:"\u0668",9:"\u0669",0:"\u0660"},ts={"\u0661":"1","\u0662":"2","\u0663":"3","\u0664":"4","\u0665":"5","\u0666":"6","\u0667":"7","\u0668":"8","\u0669":"9","\u0660":"0"},ss=function(e){return 0===e?0:1===e?1:2===e?2:3<=e%100&&e%100<=10?3:11<=e%100?4:5},ns={s:["\u0623\u0642\u0644 \u0645\u0646 \u062b\u0627\u0646\u064a\u0629","\u062b\u0627\u0646\u064a\u0629 \u0648\u0627\u062d\u062f\u0629",["\u062b\u0627\u0646\u064a\u062a\u0627\u0646","\u062b\u0627\u0646\u064a\u062a\u064a\u0646"],"%d \u062b\u0648\u0627\u0646","%d \u062b\u0627\u0646\u064a\u0629","%d \u062b\u0627\u0646\u064a\u0629"],m:["\u0623\u0642\u0644 \u0645\u0646 \u062f\u0642\u064a\u0642\u0629","\u062f\u0642\u064a\u0642\u0629 \u0648\u0627\u062d\u062f\u0629",["\u062f\u0642\u064a\u0642\u062a\u0627\u0646","\u062f\u0642\u064a\u0642\u062a\u064a\u0646"],"%d \u062f\u0642\u0627\u0626\u0642","%d \u062f\u0642\u064a\u0642\u0629","%d \u062f\u0642\u064a\u0642\u0629"],h:["\u0623\u0642\u0644 \u0645\u0646 \u0633\u0627\u0639\u0629","\u0633\u0627\u0639\u0629 \u0648\u0627\u062d\u062f\u0629",["\u0633\u0627\u0639\u062a\u0627\u0646","\u0633\u0627\u0639\u062a\u064a\u0646"],"%d \u0633\u0627\u0639\u0627\u062a","%d \u0633\u0627\u0639\u0629","%d \u0633\u0627\u0639\u0629"],d:["\u0623\u0642\u0644 \u0645\u0646 \u064a\u0648\u0645","\u064a\u0648\u0645 \u0648\u0627\u062d\u062f",["\u064a\u0648\u0645\u0627\u0646","\u064a\u0648\u0645\u064a\u0646"],"%d \u0623\u064a\u0627\u0645","%d \u064a\u0648\u0645\u064b\u0627","%d \u064a\u0648\u0645"],M:["\u0623\u0642\u0644 \u0645\u0646 \u0634\u0647\u0631","\u0634\u0647\u0631 \u0648\u0627\u062d\u062f",["\u0634\u0647\u0631\u0627\u0646","\u0634\u0647\u0631\u064a\u0646"],"%d \u0623\u0634\u0647\u0631","%d \u0634\u0647\u0631\u0627","%d \u0634\u0647\u0631"],y:["\u0623\u0642\u0644 \u0645\u0646 \u0639\u0627\u0645","\u0639\u0627\u0645 \u0648\u0627\u062d\u062f",["\u0639\u0627\u0645\u0627\u0646","\u0639\u0627\u0645\u064a\u0646"],"%d \u0623\u0639\u0648\u0627\u0645","%d \u0639\u0627\u0645\u064b\u0627","%d \u0639\u0627\u0645"]},ds=function(r){return function(e,a,t,s){var n=ss(e),d=ns[r][ss(e)];return 2===n&&(d=d[a?0:1]),d.replace(/%d/i,e)}},rs=["\u064a\u0646\u0627\u064a\u0631","\u0641\u0628\u0631\u0627\u064a\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064a\u0644","\u0645\u0627\u064a\u0648","\u064a\u0648\u0646\u064a\u0648","\u064a\u0648\u0644\u064a\u0648","\u0623\u063a\u0633\u0637\u0633","\u0633\u0628\u062a\u0645\u0628\u0631","\u0623\u0643\u062a\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062f\u064a\u0633\u0645\u0628\u0631"];l.defineLocale("ar",{months:rs,monthsShort:rs,weekdays:"\u0627\u0644\u0623\u062d\u062f_\u0627\u0644\u0625\u062b\u0646\u064a\u0646_\u0627\u0644\u062b\u0644\u0627\u062b\u0627\u0621_\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621_\u0627\u0644\u062e\u0645\u064a\u0633_\u0627\u0644\u062c\u0645\u0639\u0629_\u0627\u0644\u0633\u0628\u062a".split("_"),weekdaysShort:"\u0623\u062d\u062f_\u0625\u062b\u0646\u064a\u0646_\u062b\u0644\u0627\u062b\u0627\u0621_\u0623\u0631\u0628\u0639\u0627\u0621_\u062e\u0645\u064a\u0633_\u062c\u0645\u0639\u0629_\u0633\u0628\u062a".split("_"),weekdaysMin:"\u062d_\u0646_\u062b_\u0631_\u062e_\u062c_\u0633".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"D/\u200fM/\u200fYYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},meridiemParse:/\u0635|\u0645/,isPM:function(e){return"\u0645"===e},meridiem:function(e,a,t){return e<12?"\u0635":"\u0645"},calendar:{sameDay:"[\u0627\u0644\u064a\u0648\u0645 \u0639\u0646\u062f \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextDay:"[\u063a\u062f\u064b\u0627 \u0639\u0646\u062f \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextWeek:"dddd [\u0639\u0646\u062f \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastDay:"[\u0623\u0645\u0633 \u0639\u0646\u062f \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastWeek:"dddd [\u0639\u0646\u062f \u0627\u0644\u0633\u0627\u0639\u0629] LT",sameElse:"L"},relativeTime:{future:"\u0628\u0639\u062f %s",past:"\u0645\u0646\u0630 %s",s:ds("s"),ss:ds("s"),m:ds("m"),mm:ds("m"),h:ds("h"),hh:ds("h"),d:ds("d"),dd:ds("d"),M:ds("M"),MM:ds("M"),y:ds("y"),yy:ds("y")},preparse:function(e){return e.replace(/[\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669\u0660]/g,function(e){return ts[e]}).replace(/\u060c/g,",")},postformat:function(e){return e.replace(/\d/g,function(e){return as[e]}).replace(/,/g,"\u060c")},week:{dow:6,doy:12}});var _s={1:"-inci",5:"-inci",8:"-inci",70:"-inci",80:"-inci",2:"-nci",7:"-nci",20:"-nci",50:"-nci",3:"-\xfcnc\xfc",4:"-\xfcnc\xfc",100:"-\xfcnc\xfc",6:"-nc\u0131",9:"-uncu",10:"-uncu",30:"-uncu",60:"-\u0131nc\u0131",90:"-\u0131nc\u0131"};function is(e,a,t){var s,n;return"m"===t?a?"\u0445\u0432\u0456\u043b\u0456\u043d\u0430":"\u0445\u0432\u0456\u043b\u0456\u043d\u0443":"h"===t?a?"\u0433\u0430\u0434\u0437\u0456\u043d\u0430":"\u0433\u0430\u0434\u0437\u0456\u043d\u0443":e+" "+(s=+e,n={ss:a?"\u0441\u0435\u043a\u0443\u043d\u0434\u0430_\u0441\u0435\u043a\u0443\u043d\u0434\u044b_\u0441\u0435\u043a\u0443\u043d\u0434":"\u0441\u0435\u043a\u0443\u043d\u0434\u0443_\u0441\u0435\u043a\u0443\u043d\u0434\u044b_\u0441\u0435\u043a\u0443\u043d\u0434",mm:a?"\u0445\u0432\u0456\u043b\u0456\u043d\u0430_\u0445\u0432\u0456\u043b\u0456\u043d\u044b_\u0445\u0432\u0456\u043b\u0456\u043d":"\u0445\u0432\u0456\u043b\u0456\u043d\u0443_\u0445\u0432\u0456\u043b\u0456\u043d\u044b_\u0445\u0432\u0456\u043b\u0456\u043d",hh:a?"\u0433\u0430\u0434\u0437\u0456\u043d\u0430_\u0433\u0430\u0434\u0437\u0456\u043d\u044b_\u0433\u0430\u0434\u0437\u0456\u043d":"\u0433\u0430\u0434\u0437\u0456\u043d\u0443_\u0433\u0430\u0434\u0437\u0456\u043d\u044b_\u0433\u0430\u0434\u0437\u0456\u043d",dd:"\u0434\u0437\u0435\u043d\u044c_\u0434\u043d\u0456_\u0434\u0437\u0451\u043d",MM:"\u043c\u0435\u0441\u044f\u0446_\u043c\u0435\u0441\u044f\u0446\u044b_\u043c\u0435\u0441\u044f\u0446\u0430\u045e",yy:"\u0433\u043e\u0434_\u0433\u0430\u0434\u044b_\u0433\u0430\u0434\u043e\u045e"}[t].split("_"),s%10==1&&s%100!=11?n[0]:2<=s%10&&s%10<=4&&(s%100<10||20<=s%100)?n[1]:n[2])}l.defineLocale("az",{months:"yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr".split("_"),monthsShort:"yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek".split("_"),weekdays:"Bazar_Bazar ert\u0259si_\xc7\u0259r\u015f\u0259nb\u0259 ax\u015fam\u0131_\xc7\u0259r\u015f\u0259nb\u0259_C\xfcm\u0259 ax\u015fam\u0131_C\xfcm\u0259_\u015e\u0259nb\u0259".split("_"),weekdaysShort:"Baz_BzE_\xc7Ax_\xc7\u0259r_CAx_C\xfcm_\u015e\u0259n".split("_"),weekdaysMin:"Bz_BE_\xc7A_\xc7\u0259_CA_C\xfc_\u015e\u0259".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[bug\xfcn saat] LT",nextDay:"[sabah saat] LT",nextWeek:"[g\u0259l\u0259n h\u0259ft\u0259] dddd [saat] LT",lastDay:"[d\xfcn\u0259n] LT",lastWeek:"[ke\xe7\u0259n h\u0259ft\u0259] dddd [saat] LT",sameElse:"L"},relativeTime:{future:"%s sonra",past:"%s \u0259vv\u0259l",s:"birne\xe7\u0259 saniy\u0259",ss:"%d saniy\u0259",m:"bir d\u0259qiq\u0259",mm:"%d d\u0259qiq\u0259",h:"bir saat",hh:"%d saat",d:"bir g\xfcn",dd:"%d g\xfcn",M:"bir ay",MM:"%d ay",y:"bir il",yy:"%d il"},meridiemParse:/gec\u0259|s\u0259h\u0259r|g\xfcnd\xfcz|ax\u015fam/,isPM:function(e){return/^(g\xfcnd\xfcz|ax\u015fam)$/.test(e)},meridiem:function(e,a,t){return e<4?"gec\u0259":e<12?"s\u0259h\u0259r":e<17?"g\xfcnd\xfcz":"ax\u015fam"},dayOfMonthOrdinalParse:/\d{1,2}-(\u0131nc\u0131|inci|nci|\xfcnc\xfc|nc\u0131|uncu)/,ordinal:function(e){if(0===e)return e+"-\u0131nc\u0131";var a=e%10;return e+(_s[a]||_s[e%100-a]||_s[100<=e?100:null])},week:{dow:1,doy:7}}),l.defineLocale("be",{months:{format:"\u0441\u0442\u0443\u0434\u0437\u0435\u043d\u044f_\u043b\u044e\u0442\u0430\u0433\u0430_\u0441\u0430\u043a\u0430\u0432\u0456\u043a\u0430_\u043a\u0440\u0430\u0441\u0430\u0432\u0456\u043a\u0430_\u0442\u0440\u0430\u045e\u043d\u044f_\u0447\u044d\u0440\u0432\u0435\u043d\u044f_\u043b\u0456\u043f\u0435\u043d\u044f_\u0436\u043d\u0456\u045e\u043d\u044f_\u0432\u0435\u0440\u0430\u0441\u043d\u044f_\u043a\u0430\u0441\u0442\u0440\u044b\u0447\u043d\u0456\u043a\u0430_\u043b\u0456\u0441\u0442\u0430\u043f\u0430\u0434\u0430_\u0441\u043d\u0435\u0436\u043d\u044f".split("_"),standalone:"\u0441\u0442\u0443\u0434\u0437\u0435\u043d\u044c_\u043b\u044e\u0442\u044b_\u0441\u0430\u043a\u0430\u0432\u0456\u043a_\u043a\u0440\u0430\u0441\u0430\u0432\u0456\u043a_\u0442\u0440\u0430\u0432\u0435\u043d\u044c_\u0447\u044d\u0440\u0432\u0435\u043d\u044c_\u043b\u0456\u043f\u0435\u043d\u044c_\u0436\u043d\u0456\u0432\u0435\u043d\u044c_\u0432\u0435\u0440\u0430\u0441\u0435\u043d\u044c_\u043a\u0430\u0441\u0442\u0440\u044b\u0447\u043d\u0456\u043a_\u043b\u0456\u0441\u0442\u0430\u043f\u0430\u0434_\u0441\u043d\u0435\u0436\u0430\u043d\u044c".split("_")},monthsShort:"\u0441\u0442\u0443\u0434_\u043b\u044e\u0442_\u0441\u0430\u043a_\u043a\u0440\u0430\u0441_\u0442\u0440\u0430\u0432_\u0447\u044d\u0440\u0432_\u043b\u0456\u043f_\u0436\u043d\u0456\u0432_\u0432\u0435\u0440_\u043a\u0430\u0441\u0442_\u043b\u0456\u0441\u0442_\u0441\u043d\u0435\u0436".split("_"),weekdays:{format:"\u043d\u044f\u0434\u0437\u0435\u043b\u044e_\u043f\u0430\u043d\u044f\u0434\u0437\u0435\u043b\u0430\u043a_\u0430\u045e\u0442\u043e\u0440\u0430\u043a_\u0441\u0435\u0440\u0430\u0434\u0443_\u0447\u0430\u0446\u0432\u0435\u0440_\u043f\u044f\u0442\u043d\u0456\u0446\u0443_\u0441\u0443\u0431\u043e\u0442\u0443".split("_"),standalone:"\u043d\u044f\u0434\u0437\u0435\u043b\u044f_\u043f\u0430\u043d\u044f\u0434\u0437\u0435\u043b\u0430\u043a_\u0430\u045e\u0442\u043e\u0440\u0430\u043a_\u0441\u0435\u0440\u0430\u0434\u0430_\u0447\u0430\u0446\u0432\u0435\u0440_\u043f\u044f\u0442\u043d\u0456\u0446\u0430_\u0441\u0443\u0431\u043e\u0442\u0430".split("_"),isFormat:/\[ ?[\u0423\u0443\u045e] ?(?:\u043c\u0456\u043d\u0443\u043b\u0443\u044e|\u043d\u0430\u0441\u0442\u0443\u043f\u043d\u0443\u044e)? ?\] ?dddd/},weekdaysShort:"\u043d\u0434_\u043f\u043d_\u0430\u0442_\u0441\u0440_\u0447\u0446_\u043f\u0442_\u0441\u0431".split("_"),weekdaysMin:"\u043d\u0434_\u043f\u043d_\u0430\u0442_\u0441\u0440_\u0447\u0446_\u043f\u0442_\u0441\u0431".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY \u0433.",LLL:"D MMMM YYYY \u0433., HH:mm",LLLL:"dddd, D MMMM YYYY \u0433., HH:mm"},calendar:{sameDay:"[\u0421\u0451\u043d\u043d\u044f \u045e] LT",nextDay:"[\u0417\u0430\u045e\u0442\u0440\u0430 \u045e] LT",lastDay:"[\u0423\u0447\u043e\u0440\u0430 \u045e] LT",nextWeek:function(){return"[\u0423] dddd [\u045e] LT"},lastWeek:function(){switch(this.day()){case 0:case 3:case 5:case 6:return"[\u0423 \u043c\u0456\u043d\u0443\u043b\u0443\u044e] dddd [\u045e] LT";case 1:case 2:case 4:return"[\u0423 \u043c\u0456\u043d\u0443\u043b\u044b] dddd [\u045e] LT"}},sameElse:"L"},relativeTime:{future:"\u043f\u0440\u0430\u0437 %s",past:"%s \u0442\u0430\u043c\u0443",s:"\u043d\u0435\u043a\u0430\u043b\u044c\u043a\u0456 \u0441\u0435\u043a\u0443\u043d\u0434",m:is,mm:is,h:is,hh:is,d:"\u0434\u0437\u0435\u043d\u044c",dd:is,M:"\u043c\u0435\u0441\u044f\u0446",MM:is,y:"\u0433\u043e\u0434",yy:is},meridiemParse:/\u043d\u043e\u0447\u044b|\u0440\u0430\u043d\u0456\u0446\u044b|\u0434\u043d\u044f|\u0432\u0435\u0447\u0430\u0440\u0430/,isPM:function(e){return/^(\u0434\u043d\u044f|\u0432\u0435\u0447\u0430\u0440\u0430)$/.test(e)},meridiem:function(e,a,t){return e<4?"\u043d\u043e\u0447\u044b":e<12?"\u0440\u0430\u043d\u0456\u0446\u044b":e<17?"\u0434\u043d\u044f":"\u0432\u0435\u0447\u0430\u0440\u0430"},dayOfMonthOrdinalParse:/\d{1,2}-(\u0456|\u044b|\u0433\u0430)/,ordinal:function(e,a){switch(a){case"M":case"d":case"DDD":case"w":case"W":return e%10!=2&&e%10!=3||e%100==12||e%100==13?e+"-\u044b":e+"-\u0456";case"D":return e+"-\u0433\u0430";default:return e}},week:{dow:1,doy:7}}),l.defineLocale("bg",{months:"\u044f\u043d\u0443\u0430\u0440\u0438_\u0444\u0435\u0432\u0440\u0443\u0430\u0440\u0438_\u043c\u0430\u0440\u0442_\u0430\u043f\u0440\u0438\u043b_\u043c\u0430\u0439_\u044e\u043d\u0438_\u044e\u043b\u0438_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043f\u0442\u0435\u043c\u0432\u0440\u0438_\u043e\u043a\u0442\u043e\u043c\u0432\u0440\u0438_\u043d\u043e\u0435\u043c\u0432\u0440\u0438_\u0434\u0435\u043a\u0435\u043c\u0432\u0440\u0438".split("_"),monthsShort:"\u044f\u043d\u0440_\u0444\u0435\u0432_\u043c\u0430\u0440_\u0430\u043f\u0440_\u043c\u0430\u0439_\u044e\u043d\u0438_\u044e\u043b\u0438_\u0430\u0432\u0433_\u0441\u0435\u043f_\u043e\u043a\u0442_\u043d\u043e\u0435_\u0434\u0435\u043a".split("_"),weekdays:"\u043d\u0435\u0434\u0435\u043b\u044f_\u043f\u043e\u043d\u0435\u0434\u0435\u043b\u043d\u0438\u043a_\u0432\u0442\u043e\u0440\u043d\u0438\u043a_\u0441\u0440\u044f\u0434\u0430_\u0447\u0435\u0442\u0432\u044a\u0440\u0442\u044a\u043a_\u043f\u0435\u0442\u044a\u043a_\u0441\u044a\u0431\u043e\u0442\u0430".split("_"),weekdaysShort:"\u043d\u0435\u0434_\u043f\u043e\u043d_\u0432\u0442\u043e_\u0441\u0440\u044f_\u0447\u0435\u0442_\u043f\u0435\u0442_\u0441\u044a\u0431".split("_"),weekdaysMin:"\u043d\u0434_\u043f\u043d_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043f\u0442_\u0441\u0431".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"D.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY H:mm",LLLL:"dddd, D MMMM YYYY H:mm"},calendar:{sameDay:"[\u0414\u043d\u0435\u0441 \u0432] LT",nextDay:"[\u0423\u0442\u0440\u0435 \u0432] LT",nextWeek:"dddd [\u0432] LT",lastDay:"[\u0412\u0447\u0435\u0440\u0430 \u0432] LT",lastWeek:function(){switch(this.day()){case 0:case 3:case 6:return"[\u0412 \u0438\u0437\u043c\u0438\u043d\u0430\u043b\u0430\u0442\u0430] dddd [\u0432] LT";case 1:case 2:case 4:case 5:return"[\u0412 \u0438\u0437\u043c\u0438\u043d\u0430\u043b\u0438\u044f] dddd [\u0432] LT"}},sameElse:"L"},relativeTime:{future:"\u0441\u043b\u0435\u0434 %s",past:"\u043f\u0440\u0435\u0434\u0438 %s",s:"\u043d\u044f\u043a\u043e\u043b\u043a\u043e \u0441\u0435\u043a\u0443\u043d\u0434\u0438",ss:"%d \u0441\u0435\u043a\u0443\u043d\u0434\u0438",m:"\u043c\u0438\u043d\u0443\u0442\u0430",mm:"%d \u043c\u0438\u043d\u0443\u0442\u0438",h:"\u0447\u0430\u0441",hh:"%d \u0447\u0430\u0441\u0430",d:"\u0434\u0435\u043d",dd:"%d \u0434\u043d\u0438",M:"\u043c\u0435\u0441\u0435\u0446",MM:"%d \u043c\u0435\u0441\u0435\u0446\u0430",y:"\u0433\u043e\u0434\u0438\u043d\u0430",yy:"%d \u0433\u043e\u0434\u0438\u043d\u0438"},dayOfMonthOrdinalParse:/\d{1,2}-(\u0435\u0432|\u0435\u043d|\u0442\u0438|\u0432\u0438|\u0440\u0438|\u043c\u0438)/,ordinal:function(e){var a=e%10,t=e%100;return 0===e?e+"-\u0435\u0432":0===t?e+"-\u0435\u043d":10<t&&t<20?e+"-\u0442\u0438":1===a?e+"-\u0432\u0438":2===a?e+"-\u0440\u0438":7===a||8===a?e+"-\u043c\u0438":e+"-\u0442\u0438"},week:{dow:1,doy:7}}),l.defineLocale("bm",{months:"Zanwuyekalo_Fewuruyekalo_Marisikalo_Awirilikalo_M\u025bkalo_Zuw\u025bnkalo_Zuluyekalo_Utikalo_S\u025btanburukalo_\u0254kut\u0254burukalo_Nowanburukalo_Desanburukalo".split("_"),monthsShort:"Zan_Few_Mar_Awi_M\u025b_Zuw_Zul_Uti_S\u025bt_\u0254ku_Now_Des".split("_"),weekdays:"Kari_Nt\u025bn\u025bn_Tarata_Araba_Alamisa_Juma_Sibiri".split("_"),weekdaysShort:"Kar_Nt\u025b_Tar_Ara_Ala_Jum_Sib".split("_"),weekdaysMin:"Ka_Nt_Ta_Ar_Al_Ju_Si".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"MMMM [tile] D [san] YYYY",LLL:"MMMM [tile] D [san] YYYY [l\u025br\u025b] HH:mm",LLLL:"dddd MMMM [tile] D [san] YYYY [l\u025br\u025b] HH:mm"},calendar:{sameDay:"[Bi l\u025br\u025b] LT",nextDay:"[Sini l\u025br\u025b] LT",nextWeek:"dddd [don l\u025br\u025b] LT",lastDay:"[Kunu l\u025br\u025b] LT",lastWeek:"dddd [t\u025bm\u025bnen l\u025br\u025b] LT",sameElse:"L"},relativeTime:{future:"%s k\u0254n\u0254",past:"a b\u025b %s b\u0254",s:"sanga dama dama",ss:"sekondi %d",m:"miniti kelen",mm:"miniti %d",h:"l\u025br\u025b kelen",hh:"l\u025br\u025b %d",d:"tile kelen",dd:"tile %d",M:"kalo kelen",MM:"kalo %d",y:"san kelen",yy:"san %d"},week:{dow:1,doy:4}});var os={1:"\u09e7",2:"\u09e8",3:"\u09e9",4:"\u09ea",5:"\u09eb",6:"\u09ec",7:"\u09ed",8:"\u09ee",9:"\u09ef",0:"\u09e6"},ms={"\u09e7":"1","\u09e8":"2","\u09e9":"3","\u09ea":"4","\u09eb":"5","\u09ec":"6","\u09ed":"7","\u09ee":"8","\u09ef":"9","\u09e6":"0"};l.defineLocale("bn",{months:"\u099c\u09be\u09a8\u09c1\u09df\u09be\u09b0\u09c0_\u09ab\u09c7\u09ac\u09cd\u09b0\u09c1\u09df\u09be\u09b0\u09bf_\u09ae\u09be\u09b0\u09cd\u099a_\u098f\u09aa\u09cd\u09b0\u09bf\u09b2_\u09ae\u09c7_\u099c\u09c1\u09a8_\u099c\u09c1\u09b2\u09be\u0987_\u0986\u0997\u09b8\u09cd\u099f_\u09b8\u09c7\u09aa\u09cd\u099f\u09c7\u09ae\u09cd\u09ac\u09b0_\u0985\u0995\u09cd\u099f\u09cb\u09ac\u09b0_\u09a8\u09ad\u09c7\u09ae\u09cd\u09ac\u09b0_\u09a1\u09bf\u09b8\u09c7\u09ae\u09cd\u09ac\u09b0".split("_"),monthsShort:"\u099c\u09be\u09a8\u09c1_\u09ab\u09c7\u09ac_\u09ae\u09be\u09b0\u09cd\u099a_\u098f\u09aa\u09cd\u09b0_\u09ae\u09c7_\u099c\u09c1\u09a8_\u099c\u09c1\u09b2_\u0986\u0997_\u09b8\u09c7\u09aa\u09cd\u099f_\u0985\u0995\u09cd\u099f\u09cb_\u09a8\u09ad\u09c7_\u09a1\u09bf\u09b8\u09c7".split("_"),weekdays:"\u09b0\u09ac\u09bf\u09ac\u09be\u09b0_\u09b8\u09cb\u09ae\u09ac\u09be\u09b0_\u09ae\u0999\u09cd\u0997\u09b2\u09ac\u09be\u09b0_\u09ac\u09c1\u09a7\u09ac\u09be\u09b0_\u09ac\u09c3\u09b9\u09b8\u09cd\u09aa\u09a4\u09bf\u09ac\u09be\u09b0_\u09b6\u09c1\u0995\u09cd\u09b0\u09ac\u09be\u09b0_\u09b6\u09a8\u09bf\u09ac\u09be\u09b0".split("_"),weekdaysShort:"\u09b0\u09ac\u09bf_\u09b8\u09cb\u09ae_\u09ae\u0999\u09cd\u0997\u09b2_\u09ac\u09c1\u09a7_\u09ac\u09c3\u09b9\u09b8\u09cd\u09aa\u09a4\u09bf_\u09b6\u09c1\u0995\u09cd\u09b0_\u09b6\u09a8\u09bf".split("_"),weekdaysMin:"\u09b0\u09ac\u09bf_\u09b8\u09cb\u09ae_\u09ae\u0999\u09cd\u0997_\u09ac\u09c1\u09a7_\u09ac\u09c3\u09b9\u0983_\u09b6\u09c1\u0995\u09cd\u09b0_\u09b6\u09a8\u09bf".split("_"),longDateFormat:{LT:"A h:mm \u09b8\u09ae\u09df",LTS:"A h:mm:ss \u09b8\u09ae\u09df",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm \u09b8\u09ae\u09df",LLLL:"dddd, D MMMM YYYY, A h:mm \u09b8\u09ae\u09df"},calendar:{sameDay:"[\u0986\u099c] LT",nextDay:"[\u0986\u0997\u09be\u09ae\u09c0\u0995\u09be\u09b2] LT",nextWeek:"dddd, LT",lastDay:"[\u0997\u09a4\u0995\u09be\u09b2] LT",lastWeek:"[\u0997\u09a4] dddd, LT",sameElse:"L"},relativeTime:{future:"%s \u09aa\u09b0\u09c7",past:"%s \u0986\u0997\u09c7",s:"\u0995\u09df\u09c7\u0995 \u09b8\u09c7\u0995\u09c7\u09a8\u09cd\u09a1",ss:"%d \u09b8\u09c7\u0995\u09c7\u09a8\u09cd\u09a1",m:"\u098f\u0995 \u09ae\u09bf\u09a8\u09bf\u099f",mm:"%d \u09ae\u09bf\u09a8\u09bf\u099f",h:"\u098f\u0995 \u0998\u09a8\u09cd\u099f\u09be",hh:"%d \u0998\u09a8\u09cd\u099f\u09be",d:"\u098f\u0995 \u09a6\u09bf\u09a8",dd:"%d \u09a6\u09bf\u09a8",M:"\u098f\u0995 \u09ae\u09be\u09b8",MM:"%d \u09ae\u09be\u09b8",y:"\u098f\u0995 \u09ac\u099b\u09b0",yy:"%d \u09ac\u099b\u09b0"},preparse:function(e){return e.replace(/[\u09e7\u09e8\u09e9\u09ea\u09eb\u09ec\u09ed\u09ee\u09ef\u09e6]/g,function(e){return ms[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return os[e]})},meridiemParse:/\u09b0\u09be\u09a4|\u09b8\u0995\u09be\u09b2|\u09a6\u09c1\u09aa\u09c1\u09b0|\u09ac\u09bf\u0995\u09be\u09b2|\u09b0\u09be\u09a4/,meridiemHour:function(e,a){return 12===e&&(e=0),"\u09b0\u09be\u09a4"===a&&4<=e||"\u09a6\u09c1\u09aa\u09c1\u09b0"===a&&e<5||"\u09ac\u09bf\u0995\u09be\u09b2"===a?e+12:e},meridiem:function(e,a,t){return e<4?"\u09b0\u09be\u09a4":e<10?"\u09b8\u0995\u09be\u09b2":e<17?"\u09a6\u09c1\u09aa\u09c1\u09b0":e<20?"\u09ac\u09bf\u0995\u09be\u09b2":"\u09b0\u09be\u09a4"},week:{dow:0,doy:6}});var us={1:"\u0f21",2:"\u0f22",3:"\u0f23",4:"\u0f24",5:"\u0f25",6:"\u0f26",7:"\u0f27",8:"\u0f28",9:"\u0f29",0:"\u0f20"},ls={"\u0f21":"1","\u0f22":"2","\u0f23":"3","\u0f24":"4","\u0f25":"5","\u0f26":"6","\u0f27":"7","\u0f28":"8","\u0f29":"9","\u0f20":"0"};function Ms(e,a,t){var s,n,d;return e+" "+(s={mm:"munutenn",MM:"miz",dd:"devezh"}[t],2!==e?s:void 0!==(d={m:"v",b:"v",d:"z"})[(n=s).charAt(0)]?d[n.charAt(0)]+n.substring(1):n)}function hs(e,a,t){var s=e+" ";switch(t){case"ss":return s+=1===e?"sekunda":2===e||3===e||4===e?"sekunde":"sekundi";case"m":return a?"jedna minuta":"jedne minute";case"mm":return s+=1===e?"minuta":2===e||3===e||4===e?"minute":"minuta";case"h":return a?"jedan sat":"jednog sata";case"hh":return s+=1===e?"sat":2===e||3===e||4===e?"sata":"sati";case"dd":return s+=1===e?"dan":"dana";case"MM":return s+=1===e?"mjesec":2===e||3===e||4===e?"mjeseca":"mjeseci";case"yy":return s+=1===e?"godina":2===e||3===e||4===e?"godine":"godina"}}l.defineLocale("bo",{months:"\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f51\u0f44\u0f0b\u0f54\u0f7c_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f42\u0f49\u0f72\u0f66\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f42\u0f66\u0f74\u0f58\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f5e\u0f72\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f63\u0f94\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f51\u0fb2\u0f74\u0f42\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f51\u0f74\u0f53\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f62\u0f92\u0fb1\u0f51\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f51\u0f42\u0f74\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f45\u0f74\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f45\u0f74\u0f0b\u0f42\u0f45\u0f72\u0f42\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f45\u0f74\u0f0b\u0f42\u0f49\u0f72\u0f66\u0f0b\u0f54".split("_"),monthsShort:"\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f51\u0f44\u0f0b\u0f54\u0f7c_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f42\u0f49\u0f72\u0f66\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f42\u0f66\u0f74\u0f58\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f5e\u0f72\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f63\u0f94\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f51\u0fb2\u0f74\u0f42\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f51\u0f74\u0f53\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f62\u0f92\u0fb1\u0f51\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f51\u0f42\u0f74\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f45\u0f74\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f45\u0f74\u0f0b\u0f42\u0f45\u0f72\u0f42\u0f0b\u0f54_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f56\u0f45\u0f74\u0f0b\u0f42\u0f49\u0f72\u0f66\u0f0b\u0f54".split("_"),weekdays:"\u0f42\u0f5f\u0f60\u0f0b\u0f49\u0f72\u0f0b\u0f58\u0f0b_\u0f42\u0f5f\u0f60\u0f0b\u0f5f\u0fb3\u0f0b\u0f56\u0f0b_\u0f42\u0f5f\u0f60\u0f0b\u0f58\u0f72\u0f42\u0f0b\u0f51\u0f58\u0f62\u0f0b_\u0f42\u0f5f\u0f60\u0f0b\u0f63\u0fb7\u0f42\u0f0b\u0f54\u0f0b_\u0f42\u0f5f\u0f60\u0f0b\u0f55\u0f74\u0f62\u0f0b\u0f56\u0f74_\u0f42\u0f5f\u0f60\u0f0b\u0f54\u0f0b\u0f66\u0f44\u0f66\u0f0b_\u0f42\u0f5f\u0f60\u0f0b\u0f66\u0fa4\u0f7a\u0f53\u0f0b\u0f54\u0f0b".split("_"),weekdaysShort:"\u0f49\u0f72\u0f0b\u0f58\u0f0b_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b_\u0f58\u0f72\u0f42\u0f0b\u0f51\u0f58\u0f62\u0f0b_\u0f63\u0fb7\u0f42\u0f0b\u0f54\u0f0b_\u0f55\u0f74\u0f62\u0f0b\u0f56\u0f74_\u0f54\u0f0b\u0f66\u0f44\u0f66\u0f0b_\u0f66\u0fa4\u0f7a\u0f53\u0f0b\u0f54\u0f0b".split("_"),weekdaysMin:"\u0f49\u0f72\u0f0b\u0f58\u0f0b_\u0f5f\u0fb3\u0f0b\u0f56\u0f0b_\u0f58\u0f72\u0f42\u0f0b\u0f51\u0f58\u0f62\u0f0b_\u0f63\u0fb7\u0f42\u0f0b\u0f54\u0f0b_\u0f55\u0f74\u0f62\u0f0b\u0f56\u0f74_\u0f54\u0f0b\u0f66\u0f44\u0f66\u0f0b_\u0f66\u0fa4\u0f7a\u0f53\u0f0b\u0f54\u0f0b".split("_"),longDateFormat:{LT:"A h:mm",LTS:"A h:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm",LLLL:"dddd, D MMMM YYYY, A h:mm"},calendar:{sameDay:"[\u0f51\u0f72\u0f0b\u0f62\u0f72\u0f44] LT",nextDay:"[\u0f66\u0f44\u0f0b\u0f49\u0f72\u0f53] LT",nextWeek:"[\u0f56\u0f51\u0f74\u0f53\u0f0b\u0f55\u0fb2\u0f42\u0f0b\u0f62\u0f97\u0f7a\u0f66\u0f0b\u0f58], LT",lastDay:"[\u0f41\u0f0b\u0f66\u0f44] LT",lastWeek:"[\u0f56\u0f51\u0f74\u0f53\u0f0b\u0f55\u0fb2\u0f42\u0f0b\u0f58\u0f50\u0f60\u0f0b\u0f58] dddd, LT",sameElse:"L"},relativeTime:{future:"%s \u0f63\u0f0b",past:"%s \u0f66\u0f94\u0f53\u0f0b\u0f63",s:"\u0f63\u0f58\u0f0b\u0f66\u0f44",ss:"%d \u0f66\u0f90\u0f62\u0f0b\u0f46\u0f0d",m:"\u0f66\u0f90\u0f62\u0f0b\u0f58\u0f0b\u0f42\u0f45\u0f72\u0f42",mm:"%d \u0f66\u0f90\u0f62\u0f0b\u0f58",h:"\u0f46\u0f74\u0f0b\u0f5a\u0f7c\u0f51\u0f0b\u0f42\u0f45\u0f72\u0f42",hh:"%d \u0f46\u0f74\u0f0b\u0f5a\u0f7c\u0f51",d:"\u0f49\u0f72\u0f53\u0f0b\u0f42\u0f45\u0f72\u0f42",dd:"%d \u0f49\u0f72\u0f53\u0f0b",M:"\u0f5f\u0fb3\u0f0b\u0f56\u0f0b\u0f42\u0f45\u0f72\u0f42",MM:"%d \u0f5f\u0fb3\u0f0b\u0f56",y:"\u0f63\u0f7c\u0f0b\u0f42\u0f45\u0f72\u0f42",yy:"%d \u0f63\u0f7c"},preparse:function(e){return e.replace(/[\u0f21\u0f22\u0f23\u0f24\u0f25\u0f26\u0f27\u0f28\u0f29\u0f20]/g,function(e){return ls[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return us[e]})},meridiemParse:/\u0f58\u0f5a\u0f53\u0f0b\u0f58\u0f7c|\u0f5e\u0f7c\u0f42\u0f66\u0f0b\u0f40\u0f66|\u0f49\u0f72\u0f53\u0f0b\u0f42\u0f74\u0f44|\u0f51\u0f42\u0f7c\u0f44\u0f0b\u0f51\u0f42|\u0f58\u0f5a\u0f53\u0f0b\u0f58\u0f7c/,meridiemHour:function(e,a){return 12===e&&(e=0),"\u0f58\u0f5a\u0f53\u0f0b\u0f58\u0f7c"===a&&4<=e||"\u0f49\u0f72\u0f53\u0f0b\u0f42\u0f74\u0f44"===a&&e<5||"\u0f51\u0f42\u0f7c\u0f44\u0f0b\u0f51\u0f42"===a?e+12:e},meridiem:function(e,a,t){return e<4?"\u0f58\u0f5a\u0f53\u0f0b\u0f58\u0f7c":e<10?"\u0f5e\u0f7c\u0f42\u0f66\u0f0b\u0f40\u0f66":e<17?"\u0f49\u0f72\u0f53\u0f0b\u0f42\u0f74\u0f44":e<20?"\u0f51\u0f42\u0f7c\u0f44\u0f0b\u0f51\u0f42":"\u0f58\u0f5a\u0f53\u0f0b\u0f58\u0f7c"},week:{dow:0,doy:6}}),l.defineLocale("br",{months:"Genver_C'hwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu".split("_"),monthsShort:"Gen_C'hwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker".split("_"),weekdays:"Sul_Lun_Meurzh_Merc'her_Yaou_Gwener_Sadorn".split("_"),weekdaysShort:"Sul_Lun_Meu_Mer_Yao_Gwe_Sad".split("_"),weekdaysMin:"Su_Lu_Me_Mer_Ya_Gw_Sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"h[e]mm A",LTS:"h[e]mm:ss A",L:"DD/MM/YYYY",LL:"D [a viz] MMMM YYYY",LLL:"D [a viz] MMMM YYYY h[e]mm A",LLLL:"dddd, D [a viz] MMMM YYYY h[e]mm A"},calendar:{sameDay:"[Hiziv da] LT",nextDay:"[Warc'hoazh da] LT",nextWeek:"dddd [da] LT",lastDay:"[Dec'h da] LT",lastWeek:"dddd [paset da] LT",sameElse:"L"},relativeTime:{future:"a-benn %s",past:"%s 'zo",s:"un nebeud segondenno\xf9",ss:"%d eilenn",m:"ur vunutenn",mm:Ms,h:"un eur",hh:"%d eur",d:"un devezh",dd:Ms,M:"ur miz",MM:Ms,y:"ur bloaz",yy:function(e){switch(function e(a){return 9<a?e(a%10):a}(e)){case 1:case 3:case 4:case 5:case 9:return e+" bloaz";default:return e+" vloaz"}}},dayOfMonthOrdinalParse:/\d{1,2}(a\xf1|vet)/,ordinal:function(e){return e+(1===e?"a\xf1":"vet")},week:{dow:1,doy:4}}),l.defineLocale("bs",{months:"januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar".split("_"),monthsShort:"jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.".split("_"),monthsParseExact:!0,weekdays:"nedjelja_ponedjeljak_utorak_srijeda_\u010detvrtak_petak_subota".split("_"),weekdaysShort:"ned._pon._uto._sri._\u010det._pet._sub.".split("_"),weekdaysMin:"ne_po_ut_sr_\u010de_pe_su".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danas u] LT",nextDay:"[sutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedjelju] [u] LT";case 3:return"[u] [srijedu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT"}},lastDay:"[ju\u010der u] LT",lastWeek:function(){switch(this.day()){case 0:case 3:return"[pro\u0161lu] dddd [u] LT";case 6:return"[pro\u0161le] [subote] [u] LT";case 1:case 2:case 4:case 5:return"[pro\u0161li] dddd [u] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"prije %s",s:"par sekundi",ss:hs,m:hs,mm:hs,h:hs,hh:hs,d:"dan",dd:hs,M:"mjesec",MM:hs,y:"godinu",yy:hs},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),l.defineLocale("ca",{months:{standalone:"gener_febrer_mar\xe7_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre".split("_"),format:"de gener_de febrer_de mar\xe7_d'abril_de maig_de juny_de juliol_d'agost_de setembre_d'octubre_de novembre_de desembre".split("_"),isFormat:/D[oD]?(\s)+MMMM/},monthsShort:"gen._febr._mar\xe7_abr._maig_juny_jul._ag._set._oct._nov._des.".split("_"),monthsParseExact:!0,weekdays:"diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte".split("_"),weekdaysShort:"dg._dl._dt._dc._dj._dv._ds.".split("_"),weekdaysMin:"dg_dl_dt_dc_dj_dv_ds".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM [de] YYYY",ll:"D MMM YYYY",LLL:"D MMMM [de] YYYY [a les] H:mm",lll:"D MMM YYYY, H:mm",LLLL:"dddd D MMMM [de] YYYY [a les] H:mm",llll:"ddd D MMM YYYY, H:mm"},calendar:{sameDay:function(){return"[avui a "+(1!==this.hours()?"les":"la")+"] LT"},nextDay:function(){return"[dem\xe0 a "+(1!==this.hours()?"les":"la")+"] LT"},nextWeek:function(){return"dddd [a "+(1!==this.hours()?"les":"la")+"] LT"},lastDay:function(){return"[ahir a "+(1!==this.hours()?"les":"la")+"] LT"},lastWeek:function(){return"[el] dddd [passat a "+(1!==this.hours()?"les":"la")+"] LT"},sameElse:"L"},relativeTime:{future:"d'aqu\xed %s",past:"fa %s",s:"uns segons",ss:"%d segons",m:"un minut",mm:"%d minuts",h:"una hora",hh:"%d hores",d:"un dia",dd:"%d dies",M:"un mes",MM:"%d mesos",y:"un any",yy:"%d anys"},dayOfMonthOrdinalParse:/\d{1,2}(r|n|t|\xe8|a)/,ordinal:function(e,a){var t=1===e?"r":2===e?"n":3===e?"r":4===e?"t":"\xe8";return"w"!==a&&"W"!==a||(t="a"),e+t},week:{dow:1,doy:4}});var Ls="leden_\xfanor_b\u0159ezen_duben_kv\u011bten_\u010derven_\u010dervenec_srpen_z\xe1\u0159\xed_\u0159\xedjen_listopad_prosinec".split("_"),cs="led_\xfano_b\u0159e_dub_kv\u011b_\u010dvn_\u010dvc_srp_z\xe1\u0159_\u0159\xedj_lis_pro".split("_"),Ys=[/^led/i,/^\xfano/i,/^b\u0159e/i,/^dub/i,/^kv\u011b/i,/^(\u010dvn|\u010derven$|\u010dervna)/i,/^(\u010dvc|\u010dervenec|\u010dervence)/i,/^srp/i,/^z\xe1\u0159/i,/^\u0159\xedj/i,/^lis/i,/^pro/i],ys=/^(leden|\xfanor|b\u0159ezen|duben|kv\u011bten|\u010dervenec|\u010dervence|\u010derven|\u010dervna|srpen|z\xe1\u0159\xed|\u0159\xedjen|listopad|prosinec|led|\xfano|b\u0159e|dub|kv\u011b|\u010dvn|\u010dvc|srp|z\xe1\u0159|\u0159\xedj|lis|pro)/i;function fs(e){return 1<e&&e<5&&1!=~~(e/10)}function ks(e,a,t,s){var n=e+" ";switch(t){case"s":return a||s?"p\xe1r sekund":"p\xe1r sekundami";case"ss":return a||s?n+(fs(e)?"sekundy":"sekund"):n+"sekundami";break;case"m":return a?"minuta":s?"minutu":"minutou";case"mm":return a||s?n+(fs(e)?"minuty":"minut"):n+"minutami";break;case"h":return a?"hodina":s?"hodinu":"hodinou";case"hh":return a||s?n+(fs(e)?"hodiny":"hodin"):n+"hodinami";break;case"d":return a||s?"den":"dnem";case"dd":return a||s?n+(fs(e)?"dny":"dn\xed"):n+"dny";break;case"M":return a||s?"m\u011bs\xedc":"m\u011bs\xedcem";case"MM":return a||s?n+(fs(e)?"m\u011bs\xedce":"m\u011bs\xedc\u016f"):n+"m\u011bs\xedci";break;case"y":return a||s?"rok":"rokem";case"yy":return a||s?n+(fs(e)?"roky":"let"):n+"lety";break}}function ps(e,a,t,s){var n={m:["eine Minute","einer Minute"],h:["eine Stunde","einer Stunde"],d:["ein Tag","einem Tag"],dd:[e+" Tage",e+" Tagen"],M:["ein Monat","einem Monat"],MM:[e+" Monate",e+" Monaten"],y:["ein Jahr","einem Jahr"],yy:[e+" Jahre",e+" Jahren"]};return a?n[t][0]:n[t][1]}function Ds(e,a,t,s){var n={m:["eine Minute","einer Minute"],h:["eine Stunde","einer Stunde"],d:["ein Tag","einem Tag"],dd:[e+" Tage",e+" Tagen"],M:["ein Monat","einem Monat"],MM:[e+" Monate",e+" Monaten"],y:["ein Jahr","einem Jahr"],yy:[e+" Jahre",e+" Jahren"]};return a?n[t][0]:n[t][1]}function Ts(e,a,t,s){var n={m:["eine Minute","einer Minute"],h:["eine Stunde","einer Stunde"],d:["ein Tag","einem Tag"],dd:[e+" Tage",e+" Tagen"],M:["ein Monat","einem Monat"],MM:[e+" Monate",e+" Monaten"],y:["ein Jahr","einem Jahr"],yy:[e+" Jahre",e+" Jahren"]};return a?n[t][0]:n[t][1]}l.defineLocale("cs",{months:Ls,monthsShort:cs,monthsRegex:ys,monthsShortRegex:ys,monthsStrictRegex:/^(leden|ledna|\xfanora|\xfanor|b\u0159ezen|b\u0159ezna|duben|dubna|kv\u011bten|kv\u011btna|\u010dervenec|\u010dervence|\u010derven|\u010dervna|srpen|srpna|z\xe1\u0159\xed|\u0159\xedjen|\u0159\xedjna|listopadu|listopad|prosinec|prosince)/i,monthsShortStrictRegex:/^(led|\xfano|b\u0159e|dub|kv\u011b|\u010dvn|\u010dvc|srp|z\xe1\u0159|\u0159\xedj|lis|pro)/i,monthsParse:Ys,longMonthsParse:Ys,shortMonthsParse:Ys,weekdays:"ned\u011ble_pond\u011bl\xed_\xfater\xfd_st\u0159eda_\u010dtvrtek_p\xe1tek_sobota".split("_"),weekdaysShort:"ne_po_\xfat_st_\u010dt_p\xe1_so".split("_"),weekdaysMin:"ne_po_\xfat_st_\u010dt_p\xe1_so".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd D. MMMM YYYY H:mm",l:"D. M. YYYY"},calendar:{sameDay:"[dnes v] LT",nextDay:"[z\xedtra v] LT",nextWeek:function(){switch(this.day()){case 0:return"[v ned\u011bli v] LT";case 1:case 2:return"[v] dddd [v] LT";case 3:return"[ve st\u0159edu v] LT";case 4:return"[ve \u010dtvrtek v] LT";case 5:return"[v p\xe1tek v] LT";case 6:return"[v sobotu v] LT"}},lastDay:"[v\u010dera v] LT",lastWeek:function(){switch(this.day()){case 0:return"[minulou ned\u011bli v] LT";case 1:case 2:return"[minul\xe9] dddd [v] LT";case 3:return"[minulou st\u0159edu v] LT";case 4:case 5:return"[minul\xfd] dddd [v] LT";case 6:return"[minulou sobotu v] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"p\u0159ed %s",s:ks,ss:ks,m:ks,mm:ks,h:ks,hh:ks,d:ks,dd:ks,M:ks,MM:ks,y:ks,yy:ks},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),l.defineLocale("cv",{months:"\u043a\u04d1\u0440\u043b\u0430\u0447_\u043d\u0430\u0440\u04d1\u0441_\u043f\u0443\u0448_\u0430\u043a\u0430_\u043c\u0430\u0439_\u04ab\u04d7\u0440\u0442\u043c\u0435_\u0443\u0442\u04d1_\u04ab\u0443\u0440\u043b\u0430_\u0430\u0432\u04d1\u043d_\u044e\u043f\u0430_\u0447\u04f3\u043a_\u0440\u0430\u0448\u0442\u0430\u0432".split("_"),monthsShort:"\u043a\u04d1\u0440_\u043d\u0430\u0440_\u043f\u0443\u0448_\u0430\u043a\u0430_\u043c\u0430\u0439_\u04ab\u04d7\u0440_\u0443\u0442\u04d1_\u04ab\u0443\u0440_\u0430\u0432\u043d_\u044e\u043f\u0430_\u0447\u04f3\u043a_\u0440\u0430\u0448".split("_"),weekdays:"\u0432\u044b\u0440\u0441\u0430\u0440\u043d\u0438\u043a\u0443\u043d_\u0442\u0443\u043d\u0442\u0438\u043a\u0443\u043d_\u044b\u0442\u043b\u0430\u0440\u0438\u043a\u0443\u043d_\u044e\u043d\u043a\u0443\u043d_\u043a\u04d7\u04ab\u043d\u0435\u0440\u043d\u0438\u043a\u0443\u043d_\u044d\u0440\u043d\u0435\u043a\u0443\u043d_\u0448\u04d1\u043c\u0430\u0442\u043a\u0443\u043d".split("_"),weekdaysShort:"\u0432\u044b\u0440_\u0442\u0443\u043d_\u044b\u0442\u043b_\u044e\u043d_\u043a\u04d7\u04ab_\u044d\u0440\u043d_\u0448\u04d1\u043c".split("_"),weekdaysMin:"\u0432\u0440_\u0442\u043d_\u044b\u0442_\u044e\u043d_\u043a\u04ab_\u044d\u0440_\u0448\u043c".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD-MM-YYYY",LL:"YYYY [\u04ab\u0443\u043b\u0445\u0438] MMMM [\u0443\u0439\u04d1\u0445\u04d7\u043d] D[-\u043c\u04d7\u0448\u04d7]",LLL:"YYYY [\u04ab\u0443\u043b\u0445\u0438] MMMM [\u0443\u0439\u04d1\u0445\u04d7\u043d] D[-\u043c\u04d7\u0448\u04d7], HH:mm",LLLL:"dddd, YYYY [\u04ab\u0443\u043b\u0445\u0438] MMMM [\u0443\u0439\u04d1\u0445\u04d7\u043d] D[-\u043c\u04d7\u0448\u04d7], HH:mm"},calendar:{sameDay:"[\u041f\u0430\u044f\u043d] LT [\u0441\u0435\u0445\u0435\u0442\u0440\u0435]",nextDay:"[\u042b\u0440\u0430\u043d] LT [\u0441\u0435\u0445\u0435\u0442\u0440\u0435]",lastDay:"[\u04d6\u043d\u0435\u0440] LT [\u0441\u0435\u0445\u0435\u0442\u0440\u0435]",nextWeek:"[\u04aa\u0438\u0442\u0435\u0441] dddd LT [\u0441\u0435\u0445\u0435\u0442\u0440\u0435]",lastWeek:"[\u0418\u0440\u0442\u043d\u04d7] dddd LT [\u0441\u0435\u0445\u0435\u0442\u0440\u0435]",sameElse:"L"},relativeTime:{future:function(e){return e+(/\u0441\u0435\u0445\u0435\u0442$/i.exec(e)?"\u0440\u0435\u043d":/\u04ab\u0443\u043b$/i.exec(e)?"\u0442\u0430\u043d":"\u0440\u0430\u043d")},past:"%s \u043a\u0430\u044f\u043b\u043b\u0430",s:"\u043f\u04d7\u0440-\u0438\u043a \u04ab\u0435\u043a\u043a\u0443\u043d\u0442",ss:"%d \u04ab\u0435\u043a\u043a\u0443\u043d\u0442",m:"\u043f\u04d7\u0440 \u043c\u0438\u043d\u0443\u0442",mm:"%d \u043c\u0438\u043d\u0443\u0442",h:"\u043f\u04d7\u0440 \u0441\u0435\u0445\u0435\u0442",hh:"%d \u0441\u0435\u0445\u0435\u0442",d:"\u043f\u04d7\u0440 \u043a\u0443\u043d",dd:"%d \u043a\u0443\u043d",M:"\u043f\u04d7\u0440 \u0443\u0439\u04d1\u0445",MM:"%d \u0443\u0439\u04d1\u0445",y:"\u043f\u04d7\u0440 \u04ab\u0443\u043b",yy:"%d \u04ab\u0443\u043b"},dayOfMonthOrdinalParse:/\d{1,2}-\u043c\u04d7\u0448/,ordinal:"%d-\u043c\u04d7\u0448",week:{dow:1,doy:7}}),l.defineLocale("cy",{months:"Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr".split("_"),monthsShort:"Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag".split("_"),weekdays:"Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn".split("_"),weekdaysShort:"Sul_Llun_Maw_Mer_Iau_Gwe_Sad".split("_"),weekdaysMin:"Su_Ll_Ma_Me_Ia_Gw_Sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Heddiw am] LT",nextDay:"[Yfory am] LT",nextWeek:"dddd [am] LT",lastDay:"[Ddoe am] LT",lastWeek:"dddd [diwethaf am] LT",sameElse:"L"},relativeTime:{future:"mewn %s",past:"%s yn \xf4l",s:"ychydig eiliadau",ss:"%d eiliad",m:"munud",mm:"%d munud",h:"awr",hh:"%d awr",d:"diwrnod",dd:"%d diwrnod",M:"mis",MM:"%d mis",y:"blwyddyn",yy:"%d flynedd"},dayOfMonthOrdinalParse:/\d{1,2}(fed|ain|af|il|ydd|ed|eg)/,ordinal:function(e){var a="";return 20<e?a=40===e||50===e||60===e||80===e||100===e?"fed":"ain":0<e&&(a=["","af","il","ydd","ydd","ed","ed","ed","fed","fed","fed","eg","fed","eg","eg","fed","eg","eg","fed","eg","fed"][e]),e+a},week:{dow:1,doy:4}}),l.defineLocale("da",{months:"januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december".split("_"),monthsShort:"jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),weekdays:"s\xf8ndag_mandag_tirsdag_onsdag_torsdag_fredag_l\xf8rdag".split("_"),weekdaysShort:"s\xf8n_man_tir_ons_tor_fre_l\xf8r".split("_"),weekdaysMin:"s\xf8_ma_ti_on_to_fr_l\xf8".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY HH:mm",LLLL:"dddd [d.] D. MMMM YYYY [kl.] HH:mm"},calendar:{sameDay:"[i dag kl.] LT",nextDay:"[i morgen kl.] LT",nextWeek:"p\xe5 dddd [kl.] LT",lastDay:"[i g\xe5r kl.] LT",lastWeek:"[i] dddd[s kl.] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"%s siden",s:"f\xe5 sekunder",ss:"%d sekunder",m:"et minut",mm:"%d minutter",h:"en time",hh:"%d timer",d:"en dag",dd:"%d dage",M:"en m\xe5ned",MM:"%d m\xe5neder",y:"et \xe5r",yy:"%d \xe5r"},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),l.defineLocale("de-at",{months:"J\xe4nner_Februar_M\xe4rz_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),monthsShort:"J\xe4n._Feb._M\xe4rz_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"),monthsParseExact:!0,weekdays:"Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),weekdaysShort:"So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),weekdaysMin:"So_Mo_Di_Mi_Do_Fr_Sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY HH:mm",LLLL:"dddd, D. MMMM YYYY HH:mm"},calendar:{sameDay:"[heute um] LT [Uhr]",sameElse:"L",nextDay:"[morgen um] LT [Uhr]",nextWeek:"dddd [um] LT [Uhr]",lastDay:"[gestern um] LT [Uhr]",lastWeek:"[letzten] dddd [um] LT [Uhr]"},relativeTime:{future:"in %s",past:"vor %s",s:"ein paar Sekunden",ss:"%d Sekunden",m:ps,mm:"%d Minuten",h:ps,hh:"%d Stunden",d:ps,dd:ps,M:ps,MM:ps,y:ps,yy:ps},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),l.defineLocale("de-ch",{months:"Januar_Februar_M\xe4rz_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),monthsShort:"Jan._Feb._M\xe4rz_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"),monthsParseExact:!0,weekdays:"Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),weekdaysShort:"So_Mo_Di_Mi_Do_Fr_Sa".split("_"),weekdaysMin:"So_Mo_Di_Mi_Do_Fr_Sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY HH:mm",LLLL:"dddd, D. MMMM YYYY HH:mm"},calendar:{sameDay:"[heute um] LT [Uhr]",sameElse:"L",nextDay:"[morgen um] LT [Uhr]",nextWeek:"dddd [um] LT [Uhr]",lastDay:"[gestern um] LT [Uhr]",lastWeek:"[letzten] dddd [um] LT [Uhr]"},relativeTime:{future:"in %s",past:"vor %s",s:"ein paar Sekunden",ss:"%d Sekunden",m:Ds,mm:"%d Minuten",h:Ds,hh:"%d Stunden",d:Ds,dd:Ds,M:Ds,MM:Ds,y:Ds,yy:Ds},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),l.defineLocale("de",{months:"Januar_Februar_M\xe4rz_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),monthsShort:"Jan._Feb._M\xe4rz_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"),monthsParseExact:!0,weekdays:"Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),weekdaysShort:"So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),weekdaysMin:"So_Mo_Di_Mi_Do_Fr_Sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY HH:mm",LLLL:"dddd, D. MMMM YYYY HH:mm"},calendar:{sameDay:"[heute um] LT [Uhr]",sameElse:"L",nextDay:"[morgen um] LT [Uhr]",nextWeek:"dddd [um] LT [Uhr]",lastDay:"[gestern um] LT [Uhr]",lastWeek:"[letzten] dddd [um] LT [Uhr]"},relativeTime:{future:"in %s",past:"vor %s",s:"ein paar Sekunden",ss:"%d Sekunden",m:Ts,mm:"%d Minuten",h:Ts,hh:"%d Stunden",d:Ts,dd:Ts,M:Ts,MM:Ts,y:Ts,yy:Ts},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});var gs=["\u0796\u07ac\u0782\u07aa\u0787\u07a6\u0783\u07a9","\u078a\u07ac\u0784\u07b0\u0783\u07aa\u0787\u07a6\u0783\u07a9","\u0789\u07a7\u0783\u07a8\u0797\u07aa","\u0787\u07ad\u0795\u07b0\u0783\u07a9\u078d\u07aa","\u0789\u07ad","\u0796\u07ab\u0782\u07b0","\u0796\u07aa\u078d\u07a6\u0787\u07a8","\u0787\u07af\u078e\u07a6\u0790\u07b0\u0793\u07aa","\u0790\u07ac\u0795\u07b0\u0793\u07ac\u0789\u07b0\u0784\u07a6\u0783\u07aa","\u0787\u07ae\u0786\u07b0\u0793\u07af\u0784\u07a6\u0783\u07aa","\u0782\u07ae\u0788\u07ac\u0789\u07b0\u0784\u07a6\u0783\u07aa","\u0791\u07a8\u0790\u07ac\u0789\u07b0\u0784\u07a6\u0783\u07aa"],ws=["\u0787\u07a7\u078b\u07a8\u0787\u07b0\u078c\u07a6","\u0780\u07af\u0789\u07a6","\u0787\u07a6\u0782\u07b0\u078e\u07a7\u0783\u07a6","\u0784\u07aa\u078b\u07a6","\u0784\u07aa\u0783\u07a7\u0790\u07b0\u078a\u07a6\u078c\u07a8","\u0780\u07aa\u0786\u07aa\u0783\u07aa","\u0780\u07ae\u0782\u07a8\u0780\u07a8\u0783\u07aa"];l.defineLocale("dv",{months:gs,monthsShort:gs,weekdays:ws,weekdaysShort:ws,weekdaysMin:"\u0787\u07a7\u078b\u07a8_\u0780\u07af\u0789\u07a6_\u0787\u07a6\u0782\u07b0_\u0784\u07aa\u078b\u07a6_\u0784\u07aa\u0783\u07a7_\u0780\u07aa\u0786\u07aa_\u0780\u07ae\u0782\u07a8".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"D/M/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},meridiemParse:/\u0789\u0786|\u0789\u078a/,isPM:function(e){return"\u0789\u078a"===e},meridiem:function(e,a,t){return e<12?"\u0789\u0786":"\u0789\u078a"},calendar:{sameDay:"[\u0789\u07a8\u0787\u07a6\u078b\u07aa] LT",nextDay:"[\u0789\u07a7\u078b\u07a6\u0789\u07a7] LT",nextWeek:"dddd LT",lastDay:"[\u0787\u07a8\u0787\u07b0\u0794\u07ac] LT",lastWeek:"[\u078a\u07a7\u0787\u07a8\u078c\u07aa\u0788\u07a8] dddd LT",sameElse:"L"},relativeTime:{future:"\u078c\u07ac\u0783\u07ad\u078e\u07a6\u0787\u07a8 %s",past:"\u0786\u07aa\u0783\u07a8\u0782\u07b0 %s",s:"\u0790\u07a8\u0786\u07aa\u0782\u07b0\u078c\u07aa\u0786\u07ae\u0785\u07ac\u0787\u07b0",ss:"d% \u0790\u07a8\u0786\u07aa\u0782\u07b0\u078c\u07aa",m:"\u0789\u07a8\u0782\u07a8\u0793\u07ac\u0787\u07b0",mm:"\u0789\u07a8\u0782\u07a8\u0793\u07aa %d",h:"\u078e\u07a6\u0791\u07a8\u0787\u07a8\u0783\u07ac\u0787\u07b0",hh:"\u078e\u07a6\u0791\u07a8\u0787\u07a8\u0783\u07aa %d",d:"\u078b\u07aa\u0788\u07a6\u0780\u07ac\u0787\u07b0",dd:"\u078b\u07aa\u0788\u07a6\u0790\u07b0 %d",M:"\u0789\u07a6\u0780\u07ac\u0787\u07b0",MM:"\u0789\u07a6\u0790\u07b0 %d",y:"\u0787\u07a6\u0780\u07a6\u0783\u07ac\u0787\u07b0",yy:"\u0787\u07a6\u0780\u07a6\u0783\u07aa %d"},preparse:function(e){return e.replace(/\u060c/g,",")},postformat:function(e){return e.replace(/,/g,"\u060c")},week:{dow:7,doy:12}}),l.defineLocale("el",{monthsNominativeEl:"\u0399\u03b1\u03bd\u03bf\u03c5\u03ac\u03c1\u03b9\u03bf\u03c2_\u03a6\u03b5\u03b2\u03c1\u03bf\u03c5\u03ac\u03c1\u03b9\u03bf\u03c2_\u039c\u03ac\u03c1\u03c4\u03b9\u03bf\u03c2_\u0391\u03c0\u03c1\u03af\u03bb\u03b9\u03bf\u03c2_\u039c\u03ac\u03b9\u03bf\u03c2_\u0399\u03bf\u03cd\u03bd\u03b9\u03bf\u03c2_\u0399\u03bf\u03cd\u03bb\u03b9\u03bf\u03c2_\u0391\u03cd\u03b3\u03bf\u03c5\u03c3\u03c4\u03bf\u03c2_\u03a3\u03b5\u03c0\u03c4\u03ad\u03bc\u03b2\u03c1\u03b9\u03bf\u03c2_\u039f\u03ba\u03c4\u03ce\u03b2\u03c1\u03b9\u03bf\u03c2_\u039d\u03bf\u03ad\u03bc\u03b2\u03c1\u03b9\u03bf\u03c2_\u0394\u03b5\u03ba\u03ad\u03bc\u03b2\u03c1\u03b9\u03bf\u03c2".split("_"),monthsGenitiveEl:"\u0399\u03b1\u03bd\u03bf\u03c5\u03b1\u03c1\u03af\u03bf\u03c5_\u03a6\u03b5\u03b2\u03c1\u03bf\u03c5\u03b1\u03c1\u03af\u03bf\u03c5_\u039c\u03b1\u03c1\u03c4\u03af\u03bf\u03c5_\u0391\u03c0\u03c1\u03b9\u03bb\u03af\u03bf\u03c5_\u039c\u03b1\u0390\u03bf\u03c5_\u0399\u03bf\u03c5\u03bd\u03af\u03bf\u03c5_\u0399\u03bf\u03c5\u03bb\u03af\u03bf\u03c5_\u0391\u03c5\u03b3\u03bf\u03cd\u03c3\u03c4\u03bf\u03c5_\u03a3\u03b5\u03c0\u03c4\u03b5\u03bc\u03b2\u03c1\u03af\u03bf\u03c5_\u039f\u03ba\u03c4\u03c9\u03b2\u03c1\u03af\u03bf\u03c5_\u039d\u03bf\u03b5\u03bc\u03b2\u03c1\u03af\u03bf\u03c5_\u0394\u03b5\u03ba\u03b5\u03bc\u03b2\u03c1\u03af\u03bf\u03c5".split("_"),months:function(e,a){return e?"string"==typeof a&&/D/.test(a.substring(0,a.indexOf("MMMM")))?this._monthsGenitiveEl[e.month()]:this._monthsNominativeEl[e.month()]:this._monthsNominativeEl},monthsShort:"\u0399\u03b1\u03bd_\u03a6\u03b5\u03b2_\u039c\u03b1\u03c1_\u0391\u03c0\u03c1_\u039c\u03b1\u03ca_\u0399\u03bf\u03c5\u03bd_\u0399\u03bf\u03c5\u03bb_\u0391\u03c5\u03b3_\u03a3\u03b5\u03c0_\u039f\u03ba\u03c4_\u039d\u03bf\u03b5_\u0394\u03b5\u03ba".split("_"),weekdays:"\u039a\u03c5\u03c1\u03b9\u03b1\u03ba\u03ae_\u0394\u03b5\u03c5\u03c4\u03ad\u03c1\u03b1_\u03a4\u03c1\u03af\u03c4\u03b7_\u03a4\u03b5\u03c4\u03ac\u03c1\u03c4\u03b7_\u03a0\u03ad\u03bc\u03c0\u03c4\u03b7_\u03a0\u03b1\u03c1\u03b1\u03c3\u03ba\u03b5\u03c5\u03ae_\u03a3\u03ac\u03b2\u03b2\u03b1\u03c4\u03bf".split("_"),weekdaysShort:"\u039a\u03c5\u03c1_\u0394\u03b5\u03c5_\u03a4\u03c1\u03b9_\u03a4\u03b5\u03c4_\u03a0\u03b5\u03bc_\u03a0\u03b1\u03c1_\u03a3\u03b1\u03b2".split("_"),weekdaysMin:"\u039a\u03c5_\u0394\u03b5_\u03a4\u03c1_\u03a4\u03b5_\u03a0\u03b5_\u03a0\u03b1_\u03a3\u03b1".split("_"),meridiem:function(e,a,t){return 11<e?t?"\u03bc\u03bc":"\u039c\u039c":t?"\u03c0\u03bc":"\u03a0\u039c"},isPM:function(e){return"\u03bc"===(e+"").toLowerCase()[0]},meridiemParse:/[\u03a0\u039c]\.?\u039c?\.?/i,longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendarEl:{sameDay:"[\u03a3\u03ae\u03bc\u03b5\u03c1\u03b1 {}] LT",nextDay:"[\u0391\u03cd\u03c1\u03b9\u03bf {}] LT",nextWeek:"dddd [{}] LT",lastDay:"[\u03a7\u03b8\u03b5\u03c2 {}] LT",lastWeek:function(){switch(this.day()){case 6:return"[\u03c4\u03bf \u03c0\u03c1\u03bf\u03b7\u03b3\u03bf\u03cd\u03bc\u03b5\u03bd\u03bf] dddd [{}] LT";default:return"[\u03c4\u03b7\u03bd \u03c0\u03c1\u03bf\u03b7\u03b3\u03bf\u03cd\u03bc\u03b5\u03bd\u03b7] dddd [{}] LT"}},sameElse:"L"},calendar:function(e,a){var t=this._calendarEl[e],s=a&&a.hours();return H(t)&&(t=t.apply(a)),t.replace("{}",s%12==1?"\u03c3\u03c4\u03b7":"\u03c3\u03c4\u03b9\u03c2")},relativeTime:{future:"\u03c3\u03b5 %s",past:"%s \u03c0\u03c1\u03b9\u03bd",s:"\u03bb\u03af\u03b3\u03b1 \u03b4\u03b5\u03c5\u03c4\u03b5\u03c1\u03cc\u03bb\u03b5\u03c0\u03c4\u03b1",ss:"%d \u03b4\u03b5\u03c5\u03c4\u03b5\u03c1\u03cc\u03bb\u03b5\u03c0\u03c4\u03b1",m:"\u03ad\u03bd\u03b1 \u03bb\u03b5\u03c0\u03c4\u03cc",mm:"%d \u03bb\u03b5\u03c0\u03c4\u03ac",h:"\u03bc\u03af\u03b1 \u03ce\u03c1\u03b1",hh:"%d \u03ce\u03c1\u03b5\u03c2",d:"\u03bc\u03af\u03b1 \u03bc\u03ad\u03c1\u03b1",dd:"%d \u03bc\u03ad\u03c1\u03b5\u03c2",M:"\u03ad\u03bd\u03b1\u03c2 \u03bc\u03ae\u03bd\u03b1\u03c2",MM:"%d \u03bc\u03ae\u03bd\u03b5\u03c2",y:"\u03ad\u03bd\u03b1\u03c2 \u03c7\u03c1\u03cc\u03bd\u03bf\u03c2",yy:"%d \u03c7\u03c1\u03cc\u03bd\u03b9\u03b1"},dayOfMonthOrdinalParse:/\d{1,2}\u03b7/,ordinal:"%d\u03b7",week:{dow:1,doy:4}}),l.defineLocale("en-SG",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",ss:"%d seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},dayOfMonthOrdinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(e){var a=e%10;return e+(1==~~(e%100/10)?"th":1===a?"st":2===a?"nd":3===a?"rd":"th")},week:{dow:1,doy:4}}),l.defineLocale("en-au",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",ss:"%d seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},dayOfMonthOrdinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(e){var a=e%10;return e+(1==~~(e%100/10)?"th":1===a?"st":2===a?"nd":3===a?"rd":"th")},week:{dow:1,doy:4}}),l.defineLocale("en-ca",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"YYYY-MM-DD",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",ss:"%d seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},dayOfMonthOrdinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(e){var a=e%10;return e+(1==~~(e%100/10)?"th":1===a?"st":2===a?"nd":3===a?"rd":"th")}}),l.defineLocale("en-gb",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",ss:"%d seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},dayOfMonthOrdinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(e){var a=e%10;return e+(1==~~(e%100/10)?"th":1===a?"st":2===a?"nd":3===a?"rd":"th")},week:{dow:1,doy:4}}),l.defineLocale("en-ie",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",ss:"%d seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},dayOfMonthOrdinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(e){var a=e%10;return e+(1==~~(e%100/10)?"th":1===a?"st":2===a?"nd":3===a?"rd":"th")},week:{dow:1,doy:4}}),l.defineLocale("en-il",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},dayOfMonthOrdinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(e){var a=e%10;return e+(1==~~(e%100/10)?"th":1===a?"st":2===a?"nd":3===a?"rd":"th")}}),l.defineLocale("en-nz",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",ss:"%d seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},dayOfMonthOrdinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(e){var a=e%10;return e+(1==~~(e%100/10)?"th":1===a?"st":2===a?"nd":3===a?"rd":"th")},week:{dow:1,doy:4}}),l.defineLocale("eo",{months:"januaro_februaro_marto_aprilo_majo_junio_julio_a\u016dgusto_septembro_oktobro_novembro_decembro".split("_"),monthsShort:"jan_feb_mar_apr_maj_jun_jul_a\u016dg_sep_okt_nov_dec".split("_"),weekdays:"diman\u0109o_lundo_mardo_merkredo_\u0135a\u016ddo_vendredo_sabato".split("_"),weekdaysShort:"dim_lun_mard_merk_\u0135a\u016d_ven_sab".split("_"),weekdaysMin:"di_lu_ma_me_\u0135a_ve_sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"D[-a de] MMMM, YYYY",LLL:"D[-a de] MMMM, YYYY HH:mm",LLLL:"dddd, [la] D[-a de] MMMM, YYYY HH:mm"},meridiemParse:/[ap]\.t\.m/i,isPM:function(e){return"p"===e.charAt(0).toLowerCase()},meridiem:function(e,a,t){return 11<e?t?"p.t.m.":"P.T.M.":t?"a.t.m.":"A.T.M."},calendar:{sameDay:"[Hodia\u016d je] LT",nextDay:"[Morga\u016d je] LT",nextWeek:"dddd [je] LT",lastDay:"[Hiera\u016d je] LT",lastWeek:"[pasinta] dddd [je] LT",sameElse:"L"},relativeTime:{future:"post %s",past:"anta\u016d %s",s:"sekundoj",ss:"%d sekundoj",m:"minuto",mm:"%d minutoj",h:"horo",hh:"%d horoj",d:"tago",dd:"%d tagoj",M:"monato",MM:"%d monatoj",y:"jaro",yy:"%d jaroj"},dayOfMonthOrdinalParse:/\d{1,2}a/,ordinal:"%da",week:{dow:1,doy:7}});var vs="ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),Ss="ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),Hs=[/^ene/i,/^feb/i,/^mar/i,/^abr/i,/^may/i,/^jun/i,/^jul/i,/^ago/i,/^sep/i,/^oct/i,/^nov/i,/^dic/i],bs=/^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;l.defineLocale("es-do",{months:"enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),monthsShort:function(e,a){return e?/-MMM-/.test(a)?Ss[e.month()]:vs[e.month()]:vs},monthsRegex:bs,monthsShortRegex:bs,monthsStrictRegex:/^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,monthsShortStrictRegex:/^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,monthsParse:Hs,longMonthsParse:Hs,shortMonthsParse:Hs,weekdays:"domingo_lunes_martes_mi\xe9rcoles_jueves_viernes_s\xe1bado".split("_"),weekdaysShort:"dom._lun._mar._mi\xe9._jue._vie._s\xe1b.".split("_"),weekdaysMin:"do_lu_ma_mi_ju_vi_s\xe1".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY h:mm A",LLLL:"dddd, D [de] MMMM [de] YYYY h:mm A"},calendar:{sameDay:function(){return"[hoy a la"+(1!==this.hours()?"s":"")+"] LT"},nextDay:function(){return"[ma\xf1ana a la"+(1!==this.hours()?"s":"")+"] LT"},nextWeek:function(){return"dddd [a la"+(1!==this.hours()?"s":"")+"] LT"},lastDay:function(){return"[ayer a la"+(1!==this.hours()?"s":"")+"] LT"},lastWeek:function(){return"[el] dddd [pasado a la"+(1!==this.hours()?"s":"")+"] LT"},sameElse:"L"},relativeTime:{future:"en %s",past:"hace %s",s:"unos segundos",ss:"%d segundos",m:"un minuto",mm:"%d minutos",h:"una hora",hh:"%d horas",d:"un d\xeda",dd:"%d d\xedas",M:"un mes",MM:"%d meses",y:"un a\xf1o",yy:"%d a\xf1os"},dayOfMonthOrdinalParse:/\d{1,2}\xba/,ordinal:"%d\xba",week:{dow:1,doy:4}});var js="ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),xs="ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),Os=[/^ene/i,/^feb/i,/^mar/i,/^abr/i,/^may/i,/^jun/i,/^jul/i,/^ago/i,/^sep/i,/^oct/i,/^nov/i,/^dic/i],Ps=/^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;l.defineLocale("es-us",{months:"enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),monthsShort:function(e,a){return e?/-MMM-/.test(a)?xs[e.month()]:js[e.month()]:js},monthsRegex:Ps,monthsShortRegex:Ps,monthsStrictRegex:/^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,monthsShortStrictRegex:/^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,monthsParse:Os,longMonthsParse:Os,shortMonthsParse:Os,weekdays:"domingo_lunes_martes_mi\xe9rcoles_jueves_viernes_s\xe1bado".split("_"),weekdaysShort:"dom._lun._mar._mi\xe9._jue._vie._s\xe1b.".split("_"),weekdaysMin:"do_lu_ma_mi_ju_vi_s\xe1".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"MM/DD/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY h:mm A",LLLL:"dddd, D [de] MMMM [de] YYYY h:mm A"},calendar:{sameDay:function(){return"[hoy a la"+(1!==this.hours()?"s":"")+"] LT"},nextDay:function(){return"[ma\xf1ana a la"+(1!==this.hours()?"s":"")+"] LT"},nextWeek:function(){return"dddd [a la"+(1!==this.hours()?"s":"")+"] LT"},lastDay:function(){return"[ayer a la"+(1!==this.hours()?"s":"")+"] LT"},lastWeek:function(){return"[el] dddd [pasado a la"+(1!==this.hours()?"s":"")+"] LT"},sameElse:"L"},relativeTime:{future:"en %s",past:"hace %s",s:"unos segundos",ss:"%d segundos",m:"un minuto",mm:"%d minutos",h:"una hora",hh:"%d horas",d:"un d\xeda",dd:"%d d\xedas",M:"un mes",MM:"%d meses",y:"un a\xf1o",yy:"%d a\xf1os"},dayOfMonthOrdinalParse:/\d{1,2}\xba/,ordinal:"%d\xba",week:{dow:0,doy:6}});var Ws="ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),As="ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),Es=[/^ene/i,/^feb/i,/^mar/i,/^abr/i,/^may/i,/^jun/i,/^jul/i,/^ago/i,/^sep/i,/^oct/i,/^nov/i,/^dic/i],Fs=/^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;function zs(e,a,t,s){var n={s:["m\xf5ne sekundi","m\xf5ni sekund","paar sekundit"],ss:[e+"sekundi",e+"sekundit"],m:["\xfche minuti","\xfcks minut"],mm:[e+" minuti",e+" minutit"],h:["\xfche tunni","tund aega","\xfcks tund"],hh:[e+" tunni",e+" tundi"],d:["\xfche p\xe4eva","\xfcks p\xe4ev"],M:["kuu aja","kuu aega","\xfcks kuu"],MM:[e+" kuu",e+" kuud"],y:["\xfche aasta","aasta","\xfcks aasta"],yy:[e+" aasta",e+" aastat"]};return a?n[t][2]?n[t][2]:n[t][1]:s?n[t][0]:n[t][1]}l.defineLocale("es",{months:"enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),monthsShort:function(e,a){return e?/-MMM-/.test(a)?As[e.month()]:Ws[e.month()]:Ws},monthsRegex:Fs,monthsShortRegex:Fs,monthsStrictRegex:/^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,monthsShortStrictRegex:/^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,monthsParse:Es,longMonthsParse:Es,shortMonthsParse:Es,weekdays:"domingo_lunes_martes_mi\xe9rcoles_jueves_viernes_s\xe1bado".split("_"),weekdaysShort:"dom._lun._mar._mi\xe9._jue._vie._s\xe1b.".split("_"),weekdaysMin:"do_lu_ma_mi_ju_vi_s\xe1".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY H:mm",LLLL:"dddd, D [de] MMMM [de] YYYY H:mm"},calendar:{sameDay:function(){return"[hoy a la"+(1!==this.hours()?"s":"")+"] LT"},nextDay:function(){return"[ma\xf1ana a la"+(1!==this.hours()?"s":"")+"] LT"},nextWeek:function(){return"dddd [a la"+(1!==this.hours()?"s":"")+"] LT"},lastDay:function(){return"[ayer a la"+(1!==this.hours()?"s":"")+"] LT"},lastWeek:function(){return"[el] dddd [pasado a la"+(1!==this.hours()?"s":"")+"] LT"},sameElse:"L"},relativeTime:{future:"en %s",past:"hace %s",s:"unos segundos",ss:"%d segundos",m:"un minuto",mm:"%d minutos",h:"una hora",hh:"%d horas",d:"un d\xeda",dd:"%d d\xedas",M:"un mes",MM:"%d meses",y:"un a\xf1o",yy:"%d a\xf1os"},dayOfMonthOrdinalParse:/\d{1,2}\xba/,ordinal:"%d\xba",week:{dow:1,doy:4}}),l.defineLocale("et",{months:"jaanuar_veebruar_m\xe4rts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember".split("_"),monthsShort:"jaan_veebr_m\xe4rts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets".split("_"),weekdays:"p\xfchap\xe4ev_esmasp\xe4ev_teisip\xe4ev_kolmap\xe4ev_neljap\xe4ev_reede_laup\xe4ev".split("_"),weekdaysShort:"P_E_T_K_N_R_L".split("_"),weekdaysMin:"P_E_T_K_N_R_L".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[T\xe4na,] LT",nextDay:"[Homme,] LT",nextWeek:"[J\xe4rgmine] dddd LT",lastDay:"[Eile,] LT",lastWeek:"[Eelmine] dddd LT",sameElse:"L"},relativeTime:{future:"%s p\xe4rast",past:"%s tagasi",s:zs,ss:zs,m:zs,mm:zs,h:zs,hh:zs,d:zs,dd:"%d p\xe4eva",M:zs,MM:zs,y:zs,yy:zs},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),l.defineLocale("eu",{months:"urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua".split("_"),monthsShort:"urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.".split("_"),monthsParseExact:!0,weekdays:"igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata".split("_"),weekdaysShort:"ig._al._ar._az._og._ol._lr.".split("_"),weekdaysMin:"ig_al_ar_az_og_ol_lr".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"YYYY[ko] MMMM[ren] D[a]",LLL:"YYYY[ko] MMMM[ren] D[a] HH:mm",LLLL:"dddd, YYYY[ko] MMMM[ren] D[a] HH:mm",l:"YYYY-M-D",ll:"YYYY[ko] MMM D[a]",lll:"YYYY[ko] MMM D[a] HH:mm",llll:"ddd, YYYY[ko] MMM D[a] HH:mm"},calendar:{sameDay:"[gaur] LT[etan]",nextDay:"[bihar] LT[etan]",nextWeek:"dddd LT[etan]",lastDay:"[atzo] LT[etan]",lastWeek:"[aurreko] dddd LT[etan]",sameElse:"L"},relativeTime:{future:"%s barru",past:"duela %s",s:"segundo batzuk",ss:"%d segundo",m:"minutu bat",mm:"%d minutu",h:"ordu bat",hh:"%d ordu",d:"egun bat",dd:"%d egun",M:"hilabete bat",MM:"%d hilabete",y:"urte bat",yy:"%d urte"},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}});var Js={1:"\u06f1",2:"\u06f2",3:"\u06f3",4:"\u06f4",5:"\u06f5",6:"\u06f6",7:"\u06f7",8:"\u06f8",9:"\u06f9",0:"\u06f0"},Ns={"\u06f1":"1","\u06f2":"2","\u06f3":"3","\u06f4":"4","\u06f5":"5","\u06f6":"6","\u06f7":"7","\u06f8":"8","\u06f9":"9","\u06f0":"0"};l.defineLocale("fa",{months:"\u0698\u0627\u0646\u0648\u06cc\u0647_\u0641\u0648\u0631\u06cc\u0647_\u0645\u0627\u0631\u0633_\u0622\u0648\u0631\u06cc\u0644_\u0645\u0647_\u0698\u0648\u0626\u0646_\u0698\u0648\u0626\u06cc\u0647_\u0627\u0648\u062a_\u0633\u067e\u062a\u0627\u0645\u0628\u0631_\u0627\u06a9\u062a\u0628\u0631_\u0646\u0648\u0627\u0645\u0628\u0631_\u062f\u0633\u0627\u0645\u0628\u0631".split("_"),monthsShort:"\u0698\u0627\u0646\u0648\u06cc\u0647_\u0641\u0648\u0631\u06cc\u0647_\u0645\u0627\u0631\u0633_\u0622\u0648\u0631\u06cc\u0644_\u0645\u0647_\u0698\u0648\u0626\u0646_\u0698\u0648\u0626\u06cc\u0647_\u0627\u0648\u062a_\u0633\u067e\u062a\u0627\u0645\u0628\u0631_\u0627\u06a9\u062a\u0628\u0631_\u0646\u0648\u0627\u0645\u0628\u0631_\u062f\u0633\u0627\u0645\u0628\u0631".split("_"),weekdays:"\u06cc\u06a9\u200c\u0634\u0646\u0628\u0647_\u062f\u0648\u0634\u0646\u0628\u0647_\u0633\u0647\u200c\u0634\u0646\u0628\u0647_\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647_\u067e\u0646\u062c\u200c\u0634\u0646\u0628\u0647_\u062c\u0645\u0639\u0647_\u0634\u0646\u0628\u0647".split("_"),weekdaysShort:"\u06cc\u06a9\u200c\u0634\u0646\u0628\u0647_\u062f\u0648\u0634\u0646\u0628\u0647_\u0633\u0647\u200c\u0634\u0646\u0628\u0647_\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647_\u067e\u0646\u062c\u200c\u0634\u0646\u0628\u0647_\u062c\u0645\u0639\u0647_\u0634\u0646\u0628\u0647".split("_"),weekdaysMin:"\u06cc_\u062f_\u0633_\u0686_\u067e_\u062c_\u0634".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},meridiemParse:/\u0642\u0628\u0644 \u0627\u0632 \u0638\u0647\u0631|\u0628\u0639\u062f \u0627\u0632 \u0638\u0647\u0631/,isPM:function(e){return/\u0628\u0639\u062f \u0627\u0632 \u0638\u0647\u0631/.test(e)},meridiem:function(e,a,t){return e<12?"\u0642\u0628\u0644 \u0627\u0632 \u0638\u0647\u0631":"\u0628\u0639\u062f \u0627\u0632 \u0638\u0647\u0631"},calendar:{sameDay:"[\u0627\u0645\u0631\u0648\u0632 \u0633\u0627\u0639\u062a] LT",nextDay:"[\u0641\u0631\u062f\u0627 \u0633\u0627\u0639\u062a] LT",nextWeek:"dddd [\u0633\u0627\u0639\u062a] LT",lastDay:"[\u062f\u06cc\u0631\u0648\u0632 \u0633\u0627\u0639\u062a] LT",lastWeek:"dddd [\u067e\u06cc\u0634] [\u0633\u0627\u0639\u062a] LT",sameElse:"L"},relativeTime:{future:"\u062f\u0631 %s",past:"%s \u067e\u06cc\u0634",s:"\u0686\u0646\u062f \u062b\u0627\u0646\u06cc\u0647",ss:"\u062b\u0627\u0646\u06cc\u0647 d%",m:"\u06cc\u06a9 \u062f\u0642\u06cc\u0642\u0647",mm:"%d \u062f\u0642\u06cc\u0642\u0647",h:"\u06cc\u06a9 \u0633\u0627\u0639\u062a",hh:"%d \u0633\u0627\u0639\u062a",d:"\u06cc\u06a9 \u0631\u0648\u0632",dd:"%d \u0631\u0648\u0632",M:"\u06cc\u06a9 \u0645\u0627\u0647",MM:"%d \u0645\u0627\u0647",y:"\u06cc\u06a9 \u0633\u0627\u0644",yy:"%d \u0633\u0627\u0644"},preparse:function(e){return e.replace(/[\u06f0-\u06f9]/g,function(e){return Ns[e]}).replace(/\u060c/g,",")},postformat:function(e){return e.replace(/\d/g,function(e){return Js[e]}).replace(/,/g,"\u060c")},dayOfMonthOrdinalParse:/\d{1,2}\u0645/,ordinal:"%d\u0645",week:{dow:6,doy:12}});var Rs="nolla yksi kaksi kolme nelj\xe4 viisi kuusi seitsem\xe4n kahdeksan yhdeks\xe4n".split(" "),Cs=["nolla","yhden","kahden","kolmen","nelj\xe4n","viiden","kuuden",Rs[7],Rs[8],Rs[9]];function Is(e,a,t,s){var n,d,r="";switch(t){case"s":return s?"muutaman sekunnin":"muutama sekunti";case"ss":return s?"sekunnin":"sekuntia";case"m":return s?"minuutin":"minuutti";case"mm":r=s?"minuutin":"minuuttia";break;case"h":return s?"tunnin":"tunti";case"hh":r=s?"tunnin":"tuntia";break;case"d":return s?"p\xe4iv\xe4n":"p\xe4iv\xe4";case"dd":r=s?"p\xe4iv\xe4n":"p\xe4iv\xe4\xe4";break;case"M":return s?"kuukauden":"kuukausi";case"MM":r=s?"kuukauden":"kuukautta";break;case"y":return s?"vuoden":"vuosi";case"yy":r=s?"vuoden":"vuotta";break}return d=s,r=((n=e)<10?d?Cs[n]:Rs[n]:n)+" "+r}l.defineLocale("fi",{months:"tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kes\xe4kuu_hein\xe4kuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu".split("_"),monthsShort:"tammi_helmi_maalis_huhti_touko_kes\xe4_hein\xe4_elo_syys_loka_marras_joulu".split("_"),weekdays:"sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai".split("_"),weekdaysShort:"su_ma_ti_ke_to_pe_la".split("_"),weekdaysMin:"su_ma_ti_ke_to_pe_la".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD.MM.YYYY",LL:"Do MMMM[ta] YYYY",LLL:"Do MMMM[ta] YYYY, [klo] HH.mm",LLLL:"dddd, Do MMMM[ta] YYYY, [klo] HH.mm",l:"D.M.YYYY",ll:"Do MMM YYYY",lll:"Do MMM YYYY, [klo] HH.mm",llll:"ddd, Do MMM YYYY, [klo] HH.mm"},calendar:{sameDay:"[t\xe4n\xe4\xe4n] [klo] LT",nextDay:"[huomenna] [klo] LT",nextWeek:"dddd [klo] LT",lastDay:"[eilen] [klo] LT",lastWeek:"[viime] dddd[na] [klo] LT",sameElse:"L"},relativeTime:{future:"%s p\xe4\xe4st\xe4",past:"%s sitten",s:Is,ss:Is,m:Is,mm:Is,h:Is,hh:Is,d:Is,dd:Is,M:Is,MM:Is,y:Is,yy:Is},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),l.defineLocale("fo",{months:"januar_februar_mars_apr\xedl_mai_juni_juli_august_september_oktober_november_desember".split("_"),monthsShort:"jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),weekdays:"sunnudagur_m\xe1nadagur_t\xfdsdagur_mikudagur_h\xf3sdagur_fr\xedggjadagur_leygardagur".split("_"),weekdaysShort:"sun_m\xe1n_t\xfds_mik_h\xf3s_fr\xed_ley".split("_"),weekdaysMin:"su_m\xe1_t\xfd_mi_h\xf3_fr_le".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D. MMMM, YYYY HH:mm"},calendar:{sameDay:"[\xcd dag kl.] LT",nextDay:"[\xcd morgin kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[\xcd gj\xe1r kl.] LT",lastWeek:"[s\xed\xf0stu] dddd [kl] LT",sameElse:"L"},relativeTime:{future:"um %s",past:"%s s\xed\xf0ani",s:"f\xe1 sekund",ss:"%d sekundir",m:"ein minuttur",mm:"%d minuttir",h:"ein t\xedmi",hh:"%d t\xedmar",d:"ein dagur",dd:"%d dagar",M:"ein m\xe1na\xf0ur",MM:"%d m\xe1na\xf0ir",y:"eitt \xe1r",yy:"%d \xe1r"},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),l.defineLocale("fr-ca",{months:"janvier_f\xe9vrier_mars_avril_mai_juin_juillet_ao\xfbt_septembre_octobre_novembre_d\xe9cembre".split("_"),monthsShort:"janv._f\xe9vr._mars_avr._mai_juin_juil._ao\xfbt_sept._oct._nov._d\xe9c.".split("_"),monthsParseExact:!0,weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"),weekdaysMin:"di_lu_ma_me_je_ve_sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[Aujourd\u2019hui \xe0] LT",nextDay:"[Demain \xe0] LT",nextWeek:"dddd [\xe0] LT",lastDay:"[Hier \xe0] LT",lastWeek:"dddd [dernier \xe0] LT",sameElse:"L"},relativeTime:{future:"dans %s",past:"il y a %s",s:"quelques secondes",ss:"%d secondes",m:"une minute",mm:"%d minutes",h:"une heure",hh:"%d heures",d:"un jour",dd:"%d jours",M:"un mois",MM:"%d mois",y:"un an",yy:"%d ans"},dayOfMonthOrdinalParse:/\d{1,2}(er|e)/,ordinal:function(e,a){switch(a){default:case"M":case"Q":case"D":case"DDD":case"d":return e+(1===e?"er":"e");case"w":case"W":return e+(1===e?"re":"e")}}}),l.defineLocale("fr-ch",{months:"janvier_f\xe9vrier_mars_avril_mai_juin_juillet_ao\xfbt_septembre_octobre_novembre_d\xe9cembre".split("_"),monthsShort:"janv._f\xe9vr._mars_avr._mai_juin_juil._ao\xfbt_sept._oct._nov._d\xe9c.".split("_"),monthsParseExact:!0,weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"),weekdaysMin:"di_lu_ma_me_je_ve_sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[Aujourd\u2019hui \xe0] LT",nextDay:"[Demain \xe0] LT",nextWeek:"dddd [\xe0] LT",lastDay:"[Hier \xe0] LT",lastWeek:"dddd [dernier \xe0] LT",sameElse:"L"},relativeTime:{future:"dans %s",past:"il y a %s",s:"quelques secondes",ss:"%d secondes",m:"une minute",mm:"%d minutes",h:"une heure",hh:"%d heures",d:"un jour",dd:"%d jours",M:"un mois",MM:"%d mois",y:"un an",yy:"%d ans"},dayOfMonthOrdinalParse:/\d{1,2}(er|e)/,ordinal:function(e,a){switch(a){default:case"M":case"Q":case"D":case"DDD":case"d":return e+(1===e?"er":"e");case"w":case"W":return e+(1===e?"re":"e")}},week:{dow:1,doy:4}}),l.defineLocale("fr",{months:"janvier_f\xe9vrier_mars_avril_mai_juin_juillet_ao\xfbt_septembre_octobre_novembre_d\xe9cembre".split("_"),monthsShort:"janv._f\xe9vr._mars_avr._mai_juin_juil._ao\xfbt_sept._oct._nov._d\xe9c.".split("_"),monthsParseExact:!0,weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"),weekdaysMin:"di_lu_ma_me_je_ve_sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[Aujourd\u2019hui \xe0] LT",nextDay:"[Demain \xe0] LT",nextWeek:"dddd [\xe0] LT",lastDay:"[Hier \xe0] LT",lastWeek:"dddd [dernier \xe0] LT",sameElse:"L"},relativeTime:{future:"dans %s",past:"il y a %s",s:"quelques secondes",ss:"%d secondes",m:"une minute",mm:"%d minutes",h:"une heure",hh:"%d heures",d:"un jour",dd:"%d jours",M:"un mois",MM:"%d mois",y:"un an",yy:"%d ans"},dayOfMonthOrdinalParse:/\d{1,2}(er|)/,ordinal:function(e,a){switch(a){case"D":return e+(1===e?"er":"");default:case"M":case"Q":case"DDD":case"d":return e+(1===e?"er":"e");case"w":case"W":return e+(1===e?"re":"e")}},week:{dow:1,doy:4}});var Us="jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.".split("_"),Gs="jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_");l.defineLocale("fy",{months:"jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber".split("_"),monthsShort:function(e,a){return e?/-MMM-/.test(a)?Gs[e.month()]:Us[e.month()]:Us},monthsParseExact:!0,weekdays:"snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon".split("_"),weekdaysShort:"si._mo._ti._wo._to._fr._so.".split("_"),weekdaysMin:"Si_Mo_Ti_Wo_To_Fr_So".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD-MM-YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[hjoed om] LT",nextDay:"[moarn om] LT",nextWeek:"dddd [om] LT",lastDay:"[juster om] LT",lastWeek:"[\xf4fr\xfbne] dddd [om] LT",sameElse:"L"},relativeTime:{future:"oer %s",past:"%s lyn",s:"in pear sekonden",ss:"%d sekonden",m:"ien min\xfat",mm:"%d minuten",h:"ien oere",hh:"%d oeren",d:"ien dei",dd:"%d dagen",M:"ien moanne",MM:"%d moannen",y:"ien jier",yy:"%d jierren"},dayOfMonthOrdinalParse:/\d{1,2}(ste|de)/,ordinal:function(e){return e+(1===e||8===e||20<=e?"ste":"de")},week:{dow:1,doy:4}});l.defineLocale("ga",{months:["Ean\xe1ir","Feabhra","M\xe1rta","Aibre\xe1n","Bealtaine","M\xe9itheamh","I\xfail","L\xfanasa","Me\xe1n F\xf3mhair","Deaireadh F\xf3mhair","Samhain","Nollaig"],monthsShort:["Ean\xe1","Feab","M\xe1rt","Aibr","Beal","M\xe9it","I\xfail","L\xfana","Me\xe1n","Deai","Samh","Noll"],monthsParseExact:!0,weekdays:["D\xe9 Domhnaigh","D\xe9 Luain","D\xe9 M\xe1irt","D\xe9 C\xe9adaoin","D\xe9ardaoin","D\xe9 hAoine","D\xe9 Satharn"],weekdaysShort:["Dom","Lua","M\xe1i","C\xe9a","D\xe9a","hAo","Sat"],weekdaysMin:["Do","Lu","M\xe1","Ce","D\xe9","hA","Sa"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Inniu ag] LT",nextDay:"[Am\xe1rach ag] LT",nextWeek:"dddd [ag] LT",lastDay:"[Inn\xe9 aig] LT",lastWeek:"dddd [seo caite] [ag] LT",sameElse:"L"},relativeTime:{future:"i %s",past:"%s \xf3 shin",s:"c\xfapla soicind",ss:"%d soicind",m:"n\xf3im\xe9ad",mm:"%d n\xf3im\xe9ad",h:"uair an chloig",hh:"%d uair an chloig",d:"l\xe1",dd:"%d l\xe1",M:"m\xed",MM:"%d m\xed",y:"bliain",yy:"%d bliain"},dayOfMonthOrdinalParse:/\d{1,2}(d|na|mh)/,ordinal:function(e){return e+(1===e?"d":e%10==2?"na":"mh")},week:{dow:1,doy:4}});function Vs(e,a,t,s){var n={s:["thodde secondanim","thodde second"],ss:[e+" secondanim",e+" second"],m:["eka mintan","ek minute"],mm:[e+" mintanim",e+" mintam"],h:["eka voran","ek vor"],hh:[e+" voranim",e+" voram"],d:["eka disan","ek dis"],dd:[e+" disanim",e+" dis"],M:["eka mhoinean","ek mhoino"],MM:[e+" mhoineanim",e+" mhoine"],y:["eka vorsan","ek voros"],yy:[e+" vorsanim",e+" vorsam"]};return a?n[t][0]:n[t][1]}l.defineLocale("gd",{months:["Am Faoilleach","An Gearran","Am M\xe0rt","An Giblean","An C\xe8itean","An t-\xd2gmhios","An t-Iuchar","An L\xf9nastal","An t-Sultain","An D\xe0mhair","An t-Samhain","An D\xf9bhlachd"],monthsShort:["Faoi","Gear","M\xe0rt","Gibl","C\xe8it","\xd2gmh","Iuch","L\xf9n","Sult","D\xe0mh","Samh","D\xf9bh"],monthsParseExact:!0,weekdays:["Did\xf2mhnaich","Diluain","Dim\xe0irt","Diciadain","Diardaoin","Dihaoine","Disathairne"],weekdaysShort:["Did","Dil","Dim","Dic","Dia","Dih","Dis"],weekdaysMin:["D\xf2","Lu","M\xe0","Ci","Ar","Ha","Sa"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[An-diugh aig] LT",nextDay:"[A-m\xe0ireach aig] LT",nextWeek:"dddd [aig] LT",lastDay:"[An-d\xe8 aig] LT",lastWeek:"dddd [seo chaidh] [aig] LT",sameElse:"L"},relativeTime:{future:"ann an %s",past:"bho chionn %s",s:"beagan diogan",ss:"%d diogan",m:"mionaid",mm:"%d mionaidean",h:"uair",hh:"%d uairean",d:"latha",dd:"%d latha",M:"m\xecos",MM:"%d m\xecosan",y:"bliadhna",yy:"%d bliadhna"},dayOfMonthOrdinalParse:/\d{1,2}(d|na|mh)/,ordinal:function(e){return e+(1===e?"d":e%10==2?"na":"mh")},week:{dow:1,doy:4}}),l.defineLocale("gl",{months:"xaneiro_febreiro_marzo_abril_maio_xu\xf1o_xullo_agosto_setembro_outubro_novembro_decembro".split("_"),monthsShort:"xan._feb._mar._abr._mai._xu\xf1._xul._ago._set._out._nov._dec.".split("_"),monthsParseExact:!0,weekdays:"domingo_luns_martes_m\xe9rcores_xoves_venres_s\xe1bado".split("_"),weekdaysShort:"dom._lun._mar._m\xe9r._xov._ven._s\xe1b.".split("_"),weekdaysMin:"do_lu_ma_m\xe9_xo_ve_s\xe1".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY H:mm",LLLL:"dddd, D [de] MMMM [de] YYYY H:mm"},calendar:{sameDay:function(){return"[hoxe "+(1!==this.hours()?"\xe1s":"\xe1")+"] LT"},nextDay:function(){return"[ma\xf1\xe1 "+(1!==this.hours()?"\xe1s":"\xe1")+"] LT"},nextWeek:function(){return"dddd ["+(1!==this.hours()?"\xe1s":"a")+"] LT"},lastDay:function(){return"[onte "+(1!==this.hours()?"\xe1":"a")+"] LT"},lastWeek:function(){return"[o] dddd [pasado "+(1!==this.hours()?"\xe1s":"a")+"] LT"},sameElse:"L"},relativeTime:{future:function(e){return 0===e.indexOf("un")?"n"+e:"en "+e},past:"hai %s",s:"uns segundos",ss:"%d segundos",m:"un minuto",mm:"%d minutos",h:"unha hora",hh:"%d horas",d:"un d\xeda",dd:"%d d\xedas",M:"un mes",MM:"%d meses",y:"un ano",yy:"%d anos"},dayOfMonthOrdinalParse:/\d{1,2}\xba/,ordinal:"%d\xba",week:{dow:1,doy:4}}),l.defineLocale("gom-latn",{months:"Janer_Febrer_Mars_Abril_Mai_Jun_Julai_Agost_Setembr_Otubr_Novembr_Dezembr".split("_"),monthsShort:"Jan._Feb._Mars_Abr._Mai_Jun_Jul._Ago._Set._Otu._Nov._Dez.".split("_"),monthsParseExact:!0,weekdays:"Aitar_Somar_Mongllar_Budvar_Brestar_Sukrar_Son'var".split("_"),weekdaysShort:"Ait._Som._Mon._Bud._Bre._Suk._Son.".split("_"),weekdaysMin:"Ai_Sm_Mo_Bu_Br_Su_Sn".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"A h:mm [vazta]",LTS:"A h:mm:ss [vazta]",L:"DD-MM-YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY A h:mm [vazta]",LLLL:"dddd, MMMM[achea] Do, YYYY, A h:mm [vazta]",llll:"ddd, D MMM YYYY, A h:mm [vazta]"},calendar:{sameDay:"[Aiz] LT",nextDay:"[Faleam] LT",nextWeek:"[Ieta to] dddd[,] LT",lastDay:"[Kal] LT",lastWeek:"[Fatlo] dddd[,] LT",sameElse:"L"},relativeTime:{future:"%s",past:"%s adim",s:Vs,ss:Vs,m:Vs,mm:Vs,h:Vs,hh:Vs,d:Vs,dd:Vs,M:Vs,MM:Vs,y:Vs,yy:Vs},dayOfMonthOrdinalParse:/\d{1,2}(er)/,ordinal:function(e,a){switch(a){case"D":return e+"er";default:case"M":case"Q":case"DDD":case"d":case"w":case"W":return e}},week:{dow:1,doy:4},meridiemParse:/rati|sokalli|donparam|sanje/,meridiemHour:function(e,a){return 12===e&&(e=0),"rati"===a?e<4?e:e+12:"sokalli"===a?e:"donparam"===a?12<e?e:e+12:"sanje"===a?e+12:void 0},meridiem:function(e,a,t){return e<4?"rati":e<12?"sokalli":e<16?"donparam":e<20?"sanje":"rati"}});var Ks={1:"\u0ae7",2:"\u0ae8",3:"\u0ae9",4:"\u0aea",5:"\u0aeb",6:"\u0aec",7:"\u0aed",8:"\u0aee",9:"\u0aef",0:"\u0ae6"},Zs={"\u0ae7":"1","\u0ae8":"2","\u0ae9":"3","\u0aea":"4","\u0aeb":"5","\u0aec":"6","\u0aed":"7","\u0aee":"8","\u0aef":"9","\u0ae6":"0"};l.defineLocale("gu",{months:"\u0a9c\u0abe\u0aa8\u0acd\u0aaf\u0ac1\u0a86\u0ab0\u0ac0_\u0aab\u0ac7\u0aac\u0acd\u0ab0\u0ac1\u0a86\u0ab0\u0ac0_\u0aae\u0abe\u0ab0\u0acd\u0a9a_\u0a8f\u0aaa\u0acd\u0ab0\u0abf\u0ab2_\u0aae\u0ac7_\u0a9c\u0ac2\u0aa8_\u0a9c\u0ac1\u0ab2\u0abe\u0a88_\u0a91\u0a97\u0ab8\u0acd\u0a9f_\u0ab8\u0aaa\u0acd\u0a9f\u0ac7\u0aae\u0acd\u0aac\u0ab0_\u0a91\u0a95\u0acd\u0a9f\u0acd\u0aac\u0ab0_\u0aa8\u0ab5\u0ac7\u0aae\u0acd\u0aac\u0ab0_\u0aa1\u0abf\u0ab8\u0ac7\u0aae\u0acd\u0aac\u0ab0".split("_"),monthsShort:"\u0a9c\u0abe\u0aa8\u0acd\u0aaf\u0ac1._\u0aab\u0ac7\u0aac\u0acd\u0ab0\u0ac1._\u0aae\u0abe\u0ab0\u0acd\u0a9a_\u0a8f\u0aaa\u0acd\u0ab0\u0abf._\u0aae\u0ac7_\u0a9c\u0ac2\u0aa8_\u0a9c\u0ac1\u0ab2\u0abe._\u0a91\u0a97._\u0ab8\u0aaa\u0acd\u0a9f\u0ac7._\u0a91\u0a95\u0acd\u0a9f\u0acd._\u0aa8\u0ab5\u0ac7._\u0aa1\u0abf\u0ab8\u0ac7.".split("_"),monthsParseExact:!0,weekdays:"\u0ab0\u0ab5\u0abf\u0ab5\u0abe\u0ab0_\u0ab8\u0acb\u0aae\u0ab5\u0abe\u0ab0_\u0aae\u0a82\u0a97\u0ab3\u0ab5\u0abe\u0ab0_\u0aac\u0ac1\u0aa7\u0acd\u0ab5\u0abe\u0ab0_\u0a97\u0ac1\u0ab0\u0ac1\u0ab5\u0abe\u0ab0_\u0ab6\u0ac1\u0a95\u0acd\u0ab0\u0ab5\u0abe\u0ab0_\u0ab6\u0aa8\u0abf\u0ab5\u0abe\u0ab0".split("_"),weekdaysShort:"\u0ab0\u0ab5\u0abf_\u0ab8\u0acb\u0aae_\u0aae\u0a82\u0a97\u0ab3_\u0aac\u0ac1\u0aa7\u0acd_\u0a97\u0ac1\u0ab0\u0ac1_\u0ab6\u0ac1\u0a95\u0acd\u0ab0_\u0ab6\u0aa8\u0abf".split("_"),weekdaysMin:"\u0ab0_\u0ab8\u0acb_\u0aae\u0a82_\u0aac\u0ac1_\u0a97\u0ac1_\u0ab6\u0ac1_\u0ab6".split("_"),longDateFormat:{LT:"A h:mm \u0ab5\u0abe\u0a97\u0acd\u0aaf\u0ac7",LTS:"A h:mm:ss \u0ab5\u0abe\u0a97\u0acd\u0aaf\u0ac7",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm \u0ab5\u0abe\u0a97\u0acd\u0aaf\u0ac7",LLLL:"dddd, D MMMM YYYY, A h:mm \u0ab5\u0abe\u0a97\u0acd\u0aaf\u0ac7"},calendar:{sameDay:"[\u0a86\u0a9c] LT",nextDay:"[\u0a95\u0abe\u0ab2\u0ac7] LT",nextWeek:"dddd, LT",lastDay:"[\u0a97\u0a87\u0a95\u0abe\u0ab2\u0ac7] LT",lastWeek:"[\u0aaa\u0abe\u0a9b\u0ab2\u0abe] dddd, LT",sameElse:"L"},relativeTime:{future:"%s \u0aae\u0abe",past:"%s \u0aaa\u0ac7\u0ab9\u0ab2\u0abe",s:"\u0a85\u0aae\u0ac1\u0a95 \u0aaa\u0ab3\u0acb",ss:"%d \u0ab8\u0ac7\u0a95\u0a82\u0aa1",m:"\u0a8f\u0a95 \u0aae\u0abf\u0aa8\u0abf\u0a9f",mm:"%d \u0aae\u0abf\u0aa8\u0abf\u0a9f",h:"\u0a8f\u0a95 \u0a95\u0ab2\u0abe\u0a95",hh:"%d \u0a95\u0ab2\u0abe\u0a95",d:"\u0a8f\u0a95 \u0aa6\u0abf\u0ab5\u0ab8",dd:"%d \u0aa6\u0abf\u0ab5\u0ab8",M:"\u0a8f\u0a95 \u0aae\u0ab9\u0abf\u0aa8\u0acb",MM:"%d \u0aae\u0ab9\u0abf\u0aa8\u0acb",y:"\u0a8f\u0a95 \u0ab5\u0ab0\u0acd\u0ab7",yy:"%d \u0ab5\u0ab0\u0acd\u0ab7"},preparse:function(e){return e.replace(/[\u0ae7\u0ae8\u0ae9\u0aea\u0aeb\u0aec\u0aed\u0aee\u0aef\u0ae6]/g,function(e){return Zs[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return Ks[e]})},meridiemParse:/\u0ab0\u0abe\u0aa4|\u0aac\u0aaa\u0acb\u0ab0|\u0ab8\u0ab5\u0abe\u0ab0|\u0ab8\u0abe\u0a82\u0a9c/,meridiemHour:function(e,a){return 12===e&&(e=0),"\u0ab0\u0abe\u0aa4"===a?e<4?e:e+12:"\u0ab8\u0ab5\u0abe\u0ab0"===a?e:"\u0aac\u0aaa\u0acb\u0ab0"===a?10<=e?e:e+12:"\u0ab8\u0abe\u0a82\u0a9c"===a?e+12:void 0},meridiem:function(e,a,t){return e<4?"\u0ab0\u0abe\u0aa4":e<10?"\u0ab8\u0ab5\u0abe\u0ab0":e<17?"\u0aac\u0aaa\u0acb\u0ab0":e<20?"\u0ab8\u0abe\u0a82\u0a9c":"\u0ab0\u0abe\u0aa4"},week:{dow:0,doy:6}}),l.defineLocale("he",{months:"\u05d9\u05e0\u05d5\u05d0\u05e8_\u05e4\u05d1\u05e8\u05d5\u05d0\u05e8_\u05de\u05e8\u05e5_\u05d0\u05e4\u05e8\u05d9\u05dc_\u05de\u05d0\u05d9_\u05d9\u05d5\u05e0\u05d9_\u05d9\u05d5\u05dc\u05d9_\u05d0\u05d5\u05d2\u05d5\u05e1\u05d8_\u05e1\u05e4\u05d8\u05de\u05d1\u05e8_\u05d0\u05d5\u05e7\u05d8\u05d5\u05d1\u05e8_\u05e0\u05d5\u05d1\u05de\u05d1\u05e8_\u05d3\u05e6\u05de\u05d1\u05e8".split("_"),monthsShort:"\u05d9\u05e0\u05d5\u05f3_\u05e4\u05d1\u05e8\u05f3_\u05de\u05e8\u05e5_\u05d0\u05e4\u05e8\u05f3_\u05de\u05d0\u05d9_\u05d9\u05d5\u05e0\u05d9_\u05d9\u05d5\u05dc\u05d9_\u05d0\u05d5\u05d2\u05f3_\u05e1\u05e4\u05d8\u05f3_\u05d0\u05d5\u05e7\u05f3_\u05e0\u05d5\u05d1\u05f3_\u05d3\u05e6\u05de\u05f3".split("_"),weekdays:"\u05e8\u05d0\u05e9\u05d5\u05df_\u05e9\u05e0\u05d9_\u05e9\u05dc\u05d9\u05e9\u05d9_\u05e8\u05d1\u05d9\u05e2\u05d9_\u05d7\u05de\u05d9\u05e9\u05d9_\u05e9\u05d9\u05e9\u05d9_\u05e9\u05d1\u05ea".split("_"),weekdaysShort:"\u05d0\u05f3_\u05d1\u05f3_\u05d2\u05f3_\u05d3\u05f3_\u05d4\u05f3_\u05d5\u05f3_\u05e9\u05f3".split("_"),weekdaysMin:"\u05d0_\u05d1_\u05d2_\u05d3_\u05d4_\u05d5_\u05e9".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D [\u05d1]MMMM YYYY",LLL:"D [\u05d1]MMMM YYYY HH:mm",LLLL:"dddd, D [\u05d1]MMMM YYYY HH:mm",l:"D/M/YYYY",ll:"D MMM YYYY",lll:"D MMM YYYY HH:mm",llll:"ddd, D MMM YYYY HH:mm"},calendar:{sameDay:"[\u05d4\u05d9\u05d5\u05dd \u05d1\u05be]LT",nextDay:"[\u05de\u05d7\u05e8 \u05d1\u05be]LT",nextWeek:"dddd [\u05d1\u05e9\u05e2\u05d4] LT",lastDay:"[\u05d0\u05ea\u05de\u05d5\u05dc \u05d1\u05be]LT",lastWeek:"[\u05d1\u05d9\u05d5\u05dd] dddd [\u05d4\u05d0\u05d7\u05e8\u05d5\u05df \u05d1\u05e9\u05e2\u05d4] LT",sameElse:"L"},relativeTime:{future:"\u05d1\u05e2\u05d5\u05d3 %s",past:"\u05dc\u05e4\u05e0\u05d9 %s",s:"\u05de\u05e1\u05e4\u05e8 \u05e9\u05e0\u05d9\u05d5\u05ea",ss:"%d \u05e9\u05e0\u05d9\u05d5\u05ea",m:"\u05d3\u05e7\u05d4",mm:"%d \u05d3\u05e7\u05d5\u05ea",h:"\u05e9\u05e2\u05d4",hh:function(e){return 2===e?"\u05e9\u05e2\u05ea\u05d9\u05d9\u05dd":e+" \u05e9\u05e2\u05d5\u05ea"},d:"\u05d9\u05d5\u05dd",dd:function(e){return 2===e?"\u05d9\u05d5\u05de\u05d9\u05d9\u05dd":e+" \u05d9\u05de\u05d9\u05dd"},M:"\u05d7\u05d5\u05d3\u05e9",MM:function(e){return 2===e?"\u05d7\u05d5\u05d3\u05e9\u05d9\u05d9\u05dd":e+" \u05d7\u05d5\u05d3\u05e9\u05d9\u05dd"},y:"\u05e9\u05e0\u05d4",yy:function(e){return 2===e?"\u05e9\u05e0\u05ea\u05d9\u05d9\u05dd":e%10==0&&10!==e?e+" \u05e9\u05e0\u05d4":e+" \u05e9\u05e0\u05d9\u05dd"}},meridiemParse:/\u05d0\u05d7\u05d4"\u05e6|\u05dc\u05e4\u05e0\u05d4"\u05e6|\u05d0\u05d7\u05e8\u05d9 \u05d4\u05e6\u05d4\u05e8\u05d9\u05d9\u05dd|\u05dc\u05e4\u05e0\u05d9 \u05d4\u05e6\u05d4\u05e8\u05d9\u05d9\u05dd|\u05dc\u05e4\u05e0\u05d5\u05ea \u05d1\u05d5\u05e7\u05e8|\u05d1\u05d1\u05d5\u05e7\u05e8|\u05d1\u05e2\u05e8\u05d1/i,isPM:function(e){return/^(\u05d0\u05d7\u05d4"\u05e6|\u05d0\u05d7\u05e8\u05d9 \u05d4\u05e6\u05d4\u05e8\u05d9\u05d9\u05dd|\u05d1\u05e2\u05e8\u05d1)$/.test(e)},meridiem:function(e,a,t){return e<5?"\u05dc\u05e4\u05e0\u05d5\u05ea \u05d1\u05d5\u05e7\u05e8":e<10?"\u05d1\u05d1\u05d5\u05e7\u05e8":e<12?t?'\u05dc\u05e4\u05e0\u05d4"\u05e6':"\u05dc\u05e4\u05e0\u05d9 \u05d4\u05e6\u05d4\u05e8\u05d9\u05d9\u05dd":e<18?t?'\u05d0\u05d7\u05d4"\u05e6':"\u05d0\u05d7\u05e8\u05d9 \u05d4\u05e6\u05d4\u05e8\u05d9\u05d9\u05dd":"\u05d1\u05e2\u05e8\u05d1"}});var $s={1:"\u0967",2:"\u0968",3:"\u0969",4:"\u096a",5:"\u096b",6:"\u096c",7:"\u096d",8:"\u096e",9:"\u096f",0:"\u0966"},Bs={"\u0967":"1","\u0968":"2","\u0969":"3","\u096a":"4","\u096b":"5","\u096c":"6","\u096d":"7","\u096e":"8","\u096f":"9","\u0966":"0"};function qs(e,a,t){var s=e+" ";switch(t){case"ss":return s+=1===e?"sekunda":2===e||3===e||4===e?"sekunde":"sekundi";case"m":return a?"jedna minuta":"jedne minute";case"mm":return s+=1===e?"minuta":2===e||3===e||4===e?"minute":"minuta";case"h":return a?"jedan sat":"jednog sata";case"hh":return s+=1===e?"sat":2===e||3===e||4===e?"sata":"sati";case"dd":return s+=1===e?"dan":"dana";case"MM":return s+=1===e?"mjesec":2===e||3===e||4===e?"mjeseca":"mjeseci";case"yy":return s+=1===e?"godina":2===e||3===e||4===e?"godine":"godina"}}l.defineLocale("hi",{months:"\u091c\u0928\u0935\u0930\u0940_\u092b\u093c\u0930\u0935\u0930\u0940_\u092e\u093e\u0930\u094d\u091a_\u0905\u092a\u094d\u0930\u0948\u0932_\u092e\u0908_\u091c\u0942\u0928_\u091c\u0941\u0932\u093e\u0908_\u0905\u0917\u0938\u094d\u0924_\u0938\u093f\u0924\u092e\u094d\u092c\u0930_\u0905\u0915\u094d\u091f\u0942\u092c\u0930_\u0928\u0935\u092e\u094d\u092c\u0930_\u0926\u093f\u0938\u092e\u094d\u092c\u0930".split("_"),monthsShort:"\u091c\u0928._\u092b\u093c\u0930._\u092e\u093e\u0930\u094d\u091a_\u0905\u092a\u094d\u0930\u0948._\u092e\u0908_\u091c\u0942\u0928_\u091c\u0941\u0932._\u0905\u0917._\u0938\u093f\u0924._\u0905\u0915\u094d\u091f\u0942._\u0928\u0935._\u0926\u093f\u0938.".split("_"),monthsParseExact:!0,weekdays:"\u0930\u0935\u093f\u0935\u093e\u0930_\u0938\u094b\u092e\u0935\u093e\u0930_\u092e\u0902\u0917\u0932\u0935\u093e\u0930_\u092c\u0941\u0927\u0935\u093e\u0930_\u0917\u0941\u0930\u0942\u0935\u093e\u0930_\u0936\u0941\u0915\u094d\u0930\u0935\u093e\u0930_\u0936\u0928\u093f\u0935\u093e\u0930".split("_"),weekdaysShort:"\u0930\u0935\u093f_\u0938\u094b\u092e_\u092e\u0902\u0917\u0932_\u092c\u0941\u0927_\u0917\u0941\u0930\u0942_\u0936\u0941\u0915\u094d\u0930_\u0936\u0928\u093f".split("_"),weekdaysMin:"\u0930_\u0938\u094b_\u092e\u0902_\u092c\u0941_\u0917\u0941_\u0936\u0941_\u0936".split("_"),longDateFormat:{LT:"A h:mm \u092c\u091c\u0947",LTS:"A h:mm:ss \u092c\u091c\u0947",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm \u092c\u091c\u0947",LLLL:"dddd, D MMMM YYYY, A h:mm \u092c\u091c\u0947"},calendar:{sameDay:"[\u0906\u091c] LT",nextDay:"[\u0915\u0932] LT",nextWeek:"dddd, LT",lastDay:"[\u0915\u0932] LT",lastWeek:"[\u092a\u093f\u091b\u0932\u0947] dddd, LT",sameElse:"L"},relativeTime:{future:"%s \u092e\u0947\u0902",past:"%s \u092a\u0939\u0932\u0947",s:"\u0915\u0941\u091b \u0939\u0940 \u0915\u094d\u0937\u0923",ss:"%d \u0938\u0947\u0915\u0902\u0921",m:"\u090f\u0915 \u092e\u093f\u0928\u091f",mm:"%d \u092e\u093f\u0928\u091f",h:"\u090f\u0915 \u0918\u0902\u091f\u093e",hh:"%d \u0918\u0902\u091f\u0947",d:"\u090f\u0915 \u0926\u093f\u0928",dd:"%d \u0926\u093f\u0928",M:"\u090f\u0915 \u092e\u0939\u0940\u0928\u0947",MM:"%d \u092e\u0939\u0940\u0928\u0947",y:"\u090f\u0915 \u0935\u0930\u094d\u0937",yy:"%d \u0935\u0930\u094d\u0937"},preparse:function(e){return e.replace(/[\u0967\u0968\u0969\u096a\u096b\u096c\u096d\u096e\u096f\u0966]/g,function(e){return Bs[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return $s[e]})},meridiemParse:/\u0930\u093e\u0924|\u0938\u0941\u092c\u0939|\u0926\u094b\u092a\u0939\u0930|\u0936\u093e\u092e/,meridiemHour:function(e,a){return 12===e&&(e=0),"\u0930\u093e\u0924"===a?e<4?e:e+12:"\u0938\u0941\u092c\u0939"===a?e:"\u0926\u094b\u092a\u0939\u0930"===a?10<=e?e:e+12:"\u0936\u093e\u092e"===a?e+12:void 0},meridiem:function(e,a,t){return e<4?"\u0930\u093e\u0924":e<10?"\u0938\u0941\u092c\u0939":e<17?"\u0926\u094b\u092a\u0939\u0930":e<20?"\u0936\u093e\u092e":"\u0930\u093e\u0924"},week:{dow:0,doy:6}}),l.defineLocale("hr",{months:{format:"sije\u010dnja_velja\u010de_o\u017eujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenoga_prosinca".split("_"),standalone:"sije\u010danj_velja\u010da_o\u017eujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac".split("_")},monthsShort:"sij._velj._o\u017eu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.".split("_"),monthsParseExact:!0,weekdays:"nedjelja_ponedjeljak_utorak_srijeda_\u010detvrtak_petak_subota".split("_"),weekdaysShort:"ned._pon._uto._sri._\u010det._pet._sub.".split("_"),weekdaysMin:"ne_po_ut_sr_\u010de_pe_su".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danas u] LT",nextDay:"[sutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedjelju] [u] LT";case 3:return"[u] [srijedu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT"}},lastDay:"[ju\u010der u] LT",lastWeek:function(){switch(this.day()){case 0:case 3:return"[pro\u0161lu] dddd [u] LT";case 6:return"[pro\u0161le] [subote] [u] LT";case 1:case 2:case 4:case 5:return"[pro\u0161li] dddd [u] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"prije %s",s:"par sekundi",ss:qs,m:qs,mm:qs,h:qs,hh:qs,d:"dan",dd:qs,M:"mjesec",MM:qs,y:"godinu",yy:qs},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}});var Qs="vas\xe1rnap h\xe9tf\u0151n kedden szerd\xe1n cs\xfct\xf6rt\xf6k\xf6n p\xe9nteken szombaton".split(" ");function Xs(e,a,t,s){var n=e;switch(t){case"s":return s||a?"n\xe9h\xe1ny m\xe1sodperc":"n\xe9h\xe1ny m\xe1sodperce";case"ss":return n+(s||a)?" m\xe1sodperc":" m\xe1sodperce";case"m":return"egy"+(s||a?" perc":" perce");case"mm":return n+(s||a?" perc":" perce");case"h":return"egy"+(s||a?" \xf3ra":" \xf3r\xe1ja");case"hh":return n+(s||a?" \xf3ra":" \xf3r\xe1ja");case"d":return"egy"+(s||a?" nap":" napja");case"dd":return n+(s||a?" nap":" napja");case"M":return"egy"+(s||a?" h\xf3nap":" h\xf3napja");case"MM":return n+(s||a?" h\xf3nap":" h\xf3napja");case"y":return"egy"+(s||a?" \xe9v":" \xe9ve");case"yy":return n+(s||a?" \xe9v":" \xe9ve")}return""}function en(e){return(e?"":"[m\xfalt] ")+"["+Qs[this.day()]+"] LT[-kor]"}function an(e){return e%100==11||e%10!=1}function tn(e,a,t,s){var n=e+" ";switch(t){case"s":return a||s?"nokkrar sek\xfandur":"nokkrum sek\xfandum";case"ss":return an(e)?n+(a||s?"sek\xfandur":"sek\xfandum"):n+"sek\xfanda";case"m":return a?"m\xedn\xfata":"m\xedn\xfatu";case"mm":return an(e)?n+(a||s?"m\xedn\xfatur":"m\xedn\xfatum"):a?n+"m\xedn\xfata":n+"m\xedn\xfatu";case"hh":return an(e)?n+(a||s?"klukkustundir":"klukkustundum"):n+"klukkustund";case"d":return a?"dagur":s?"dag":"degi";case"dd":return an(e)?a?n+"dagar":n+(s?"daga":"d\xf6gum"):a?n+"dagur":n+(s?"dag":"degi");case"M":return a?"m\xe1nu\xf0ur":s?"m\xe1nu\xf0":"m\xe1nu\xf0i";case"MM":return an(e)?a?n+"m\xe1nu\xf0ir":n+(s?"m\xe1nu\xf0i":"m\xe1nu\xf0um"):a?n+"m\xe1nu\xf0ur":n+(s?"m\xe1nu\xf0":"m\xe1nu\xf0i");case"y":return a||s?"\xe1r":"\xe1ri";case"yy":return an(e)?n+(a||s?"\xe1r":"\xe1rum"):n+(a||s?"\xe1r":"\xe1ri")}}l.defineLocale("hu",{months:"janu\xe1r_febru\xe1r_m\xe1rcius_\xe1prilis_m\xe1jus_j\xfanius_j\xfalius_augusztus_szeptember_okt\xf3ber_november_december".split("_"),monthsShort:"jan_feb_m\xe1rc_\xe1pr_m\xe1j_j\xfan_j\xfal_aug_szept_okt_nov_dec".split("_"),weekdays:"vas\xe1rnap_h\xe9tf\u0151_kedd_szerda_cs\xfct\xf6rt\xf6k_p\xe9ntek_szombat".split("_"),weekdaysShort:"vas_h\xe9t_kedd_sze_cs\xfct_p\xe9n_szo".split("_"),weekdaysMin:"v_h_k_sze_cs_p_szo".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"YYYY.MM.DD.",LL:"YYYY. MMMM D.",LLL:"YYYY. MMMM D. H:mm",LLLL:"YYYY. MMMM D., dddd H:mm"},meridiemParse:/de|du/i,isPM:function(e){return"u"===e.charAt(1).toLowerCase()},meridiem:function(e,a,t){return e<12?!0===t?"de":"DE":!0===t?"du":"DU"},calendar:{sameDay:"[ma] LT[-kor]",nextDay:"[holnap] LT[-kor]",nextWeek:function(){return en.call(this,!0)},lastDay:"[tegnap] LT[-kor]",lastWeek:function(){return en.call(this,!1)},sameElse:"L"},relativeTime:{future:"%s m\xfalva",past:"%s",s:Xs,ss:Xs,m:Xs,mm:Xs,h:Xs,hh:Xs,d:Xs,dd:Xs,M:Xs,MM:Xs,y:Xs,yy:Xs},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),l.defineLocale("hy-am",{months:{format:"\u0570\u0578\u0582\u0576\u057e\u0561\u0580\u056b_\u0583\u0565\u057f\u0580\u057e\u0561\u0580\u056b_\u0574\u0561\u0580\u057f\u056b_\u0561\u057a\u0580\u056b\u056c\u056b_\u0574\u0561\u0575\u056b\u057d\u056b_\u0570\u0578\u0582\u0576\u056b\u057d\u056b_\u0570\u0578\u0582\u056c\u056b\u057d\u056b_\u0585\u0563\u0578\u057d\u057f\u0578\u057d\u056b_\u057d\u0565\u057a\u057f\u0565\u0574\u0562\u0565\u0580\u056b_\u0570\u0578\u056f\u057f\u0565\u0574\u0562\u0565\u0580\u056b_\u0576\u0578\u0575\u0565\u0574\u0562\u0565\u0580\u056b_\u0564\u0565\u056f\u057f\u0565\u0574\u0562\u0565\u0580\u056b".split("_"),standalone:"\u0570\u0578\u0582\u0576\u057e\u0561\u0580_\u0583\u0565\u057f\u0580\u057e\u0561\u0580_\u0574\u0561\u0580\u057f_\u0561\u057a\u0580\u056b\u056c_\u0574\u0561\u0575\u056b\u057d_\u0570\u0578\u0582\u0576\u056b\u057d_\u0570\u0578\u0582\u056c\u056b\u057d_\u0585\u0563\u0578\u057d\u057f\u0578\u057d_\u057d\u0565\u057a\u057f\u0565\u0574\u0562\u0565\u0580_\u0570\u0578\u056f\u057f\u0565\u0574\u0562\u0565\u0580_\u0576\u0578\u0575\u0565\u0574\u0562\u0565\u0580_\u0564\u0565\u056f\u057f\u0565\u0574\u0562\u0565\u0580".split("_")},monthsShort:"\u0570\u0576\u057e_\u0583\u057f\u0580_\u0574\u0580\u057f_\u0561\u057a\u0580_\u0574\u0575\u057d_\u0570\u0576\u057d_\u0570\u056c\u057d_\u0585\u0563\u057d_\u057d\u057a\u057f_\u0570\u056f\u057f_\u0576\u0574\u0562_\u0564\u056f\u057f".split("_"),weekdays:"\u056f\u056b\u0580\u0561\u056f\u056b_\u0565\u0580\u056f\u0578\u0582\u0577\u0561\u0562\u0569\u056b_\u0565\u0580\u0565\u0584\u0577\u0561\u0562\u0569\u056b_\u0579\u0578\u0580\u0565\u0584\u0577\u0561\u0562\u0569\u056b_\u0570\u056b\u0576\u0563\u0577\u0561\u0562\u0569\u056b_\u0578\u0582\u0580\u0562\u0561\u0569_\u0577\u0561\u0562\u0561\u0569".split("_"),weekdaysShort:"\u056f\u0580\u056f_\u0565\u0580\u056f_\u0565\u0580\u0584_\u0579\u0580\u0584_\u0570\u0576\u0563_\u0578\u0582\u0580\u0562_\u0577\u0562\u0569".split("_"),weekdaysMin:"\u056f\u0580\u056f_\u0565\u0580\u056f_\u0565\u0580\u0584_\u0579\u0580\u0584_\u0570\u0576\u0563_\u0578\u0582\u0580\u0562_\u0577\u0562\u0569".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY \u0569.",LLL:"D MMMM YYYY \u0569., HH:mm",LLLL:"dddd, D MMMM YYYY \u0569., HH:mm"},calendar:{sameDay:"[\u0561\u0575\u057d\u0585\u0580] LT",nextDay:"[\u057e\u0561\u0572\u0568] LT",lastDay:"[\u0565\u0580\u0565\u056f] LT",nextWeek:function(){return"dddd [\u0585\u0580\u0568 \u056a\u0561\u0574\u0568] LT"},lastWeek:function(){return"[\u0561\u0576\u0581\u0561\u056e] dddd [\u0585\u0580\u0568 \u056a\u0561\u0574\u0568] LT"},sameElse:"L"},relativeTime:{future:"%s \u0570\u0565\u057f\u0578",past:"%s \u0561\u057c\u0561\u057b",s:"\u0574\u056b \u0584\u0561\u0576\u056b \u057e\u0561\u0575\u0580\u056f\u0575\u0561\u0576",ss:"%d \u057e\u0561\u0575\u0580\u056f\u0575\u0561\u0576",m:"\u0580\u0578\u057a\u0565",mm:"%d \u0580\u0578\u057a\u0565",h:"\u056a\u0561\u0574",hh:"%d \u056a\u0561\u0574",d:"\u0585\u0580",dd:"%d \u0585\u0580",M:"\u0561\u0574\u056b\u057d",MM:"%d \u0561\u0574\u056b\u057d",y:"\u057f\u0561\u0580\u056b",yy:"%d \u057f\u0561\u0580\u056b"},meridiemParse:/\u0563\u056b\u0577\u0565\u0580\u057e\u0561|\u0561\u057c\u0561\u057e\u0578\u057f\u057e\u0561|\u0581\u0565\u0580\u0565\u056f\u057e\u0561|\u0565\u0580\u0565\u056f\u0578\u0575\u0561\u0576/,isPM:function(e){return/^(\u0581\u0565\u0580\u0565\u056f\u057e\u0561|\u0565\u0580\u0565\u056f\u0578\u0575\u0561\u0576)$/.test(e)},meridiem:function(e){return e<4?"\u0563\u056b\u0577\u0565\u0580\u057e\u0561":e<12?"\u0561\u057c\u0561\u057e\u0578\u057f\u057e\u0561":e<17?"\u0581\u0565\u0580\u0565\u056f\u057e\u0561":"\u0565\u0580\u0565\u056f\u0578\u0575\u0561\u0576"},dayOfMonthOrdinalParse:/\d{1,2}|\d{1,2}-(\u056b\u0576|\u0580\u0564)/,ordinal:function(e,a){switch(a){case"DDD":case"w":case"W":case"DDDo":return 1===e?e+"-\u056b\u0576":e+"-\u0580\u0564";default:return e}},week:{dow:1,doy:7}}),l.defineLocale("id",{months:"Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split("_"),monthsShort:"Jan_Feb_Mar_Apr_Mei_Jun_Jul_Agt_Sep_Okt_Nov_Des".split("_"),weekdays:"Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"),weekdaysShort:"Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"),weekdaysMin:"Mg_Sn_Sl_Rb_Km_Jm_Sb".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] HH.mm",LLLL:"dddd, D MMMM YYYY [pukul] HH.mm"},meridiemParse:/pagi|siang|sore|malam/,meridiemHour:function(e,a){return 12===e&&(e=0),"pagi"===a?e:"siang"===a?11<=e?e:e+12:"sore"===a||"malam"===a?e+12:void 0},meridiem:function(e,a,t){return e<11?"pagi":e<15?"siang":e<19?"sore":"malam"},calendar:{sameDay:"[Hari ini pukul] LT",nextDay:"[Besok pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kemarin pukul] LT",lastWeek:"dddd [lalu pukul] LT",sameElse:"L"},relativeTime:{future:"dalam %s",past:"%s yang lalu",s:"beberapa detik",ss:"%d detik",m:"semenit",mm:"%d menit",h:"sejam",hh:"%d jam",d:"sehari",dd:"%d hari",M:"sebulan",MM:"%d bulan",y:"setahun",yy:"%d tahun"},week:{dow:1,doy:7}}),l.defineLocale("is",{months:"jan\xfaar_febr\xfaar_mars_apr\xedl_ma\xed_j\xfan\xed_j\xfal\xed_\xe1g\xfast_september_okt\xf3ber_n\xf3vember_desember".split("_"),monthsShort:"jan_feb_mar_apr_ma\xed_j\xfan_j\xfal_\xe1g\xfa_sep_okt_n\xf3v_des".split("_"),weekdays:"sunnudagur_m\xe1nudagur_\xferi\xf0judagur_mi\xf0vikudagur_fimmtudagur_f\xf6studagur_laugardagur".split("_"),weekdaysShort:"sun_m\xe1n_\xferi_mi\xf0_fim_f\xf6s_lau".split("_"),weekdaysMin:"Su_M\xe1_\xder_Mi_Fi_F\xf6_La".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY [kl.] H:mm",LLLL:"dddd, D. MMMM YYYY [kl.] H:mm"},calendar:{sameDay:"[\xed dag kl.] LT",nextDay:"[\xe1 morgun kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[\xed g\xe6r kl.] LT",lastWeek:"[s\xed\xf0asta] dddd [kl.] LT",sameElse:"L"},relativeTime:{future:"eftir %s",past:"fyrir %s s\xed\xf0an",s:tn,ss:tn,m:tn,mm:tn,h:"klukkustund",hh:tn,d:tn,dd:tn,M:tn,MM:tn,y:tn,yy:tn},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),l.defineLocale("it-ch",{months:"gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split("_"),monthsShort:"gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"),weekdays:"domenica_luned\xec_marted\xec_mercoled\xec_gioved\xec_venerd\xec_sabato".split("_"),weekdaysShort:"dom_lun_mar_mer_gio_ven_sab".split("_"),weekdaysMin:"do_lu_ma_me_gi_ve_sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[Oggi alle] LT",nextDay:"[Domani alle] LT",nextWeek:"dddd [alle] LT",lastDay:"[Ieri alle] LT",lastWeek:function(){switch(this.day()){case 0:return"[la scorsa] dddd [alle] LT";default:return"[lo scorso] dddd [alle] LT"}},sameElse:"L"},relativeTime:{future:function(e){return(/^[0-9].+$/.test(e)?"tra":"in")+" "+e},past:"%s fa",s:"alcuni secondi",ss:"%d secondi",m:"un minuto",mm:"%d minuti",h:"un'ora",hh:"%d ore",d:"un giorno",dd:"%d giorni",M:"un mese",MM:"%d mesi",y:"un anno",yy:"%d anni"},dayOfMonthOrdinalParse:/\d{1,2}\xba/,ordinal:"%d\xba",week:{dow:1,doy:4}}),l.defineLocale("it",{months:"gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split("_"),monthsShort:"gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"),weekdays:"domenica_luned\xec_marted\xec_mercoled\xec_gioved\xec_venerd\xec_sabato".split("_"),weekdaysShort:"dom_lun_mar_mer_gio_ven_sab".split("_"),weekdaysMin:"do_lu_ma_me_gi_ve_sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[Oggi alle] LT",nextDay:"[Domani alle] LT",nextWeek:"dddd [alle] LT",lastDay:"[Ieri alle] LT",lastWeek:function(){switch(this.day()){case 0:return"[la scorsa] dddd [alle] LT";default:return"[lo scorso] dddd [alle] LT"}},sameElse:"L"},relativeTime:{future:function(e){return(/^[0-9].+$/.test(e)?"tra":"in")+" "+e},past:"%s fa",s:"alcuni secondi",ss:"%d secondi",m:"un minuto",mm:"%d minuti",h:"un'ora",hh:"%d ore",d:"un giorno",dd:"%d giorni",M:"un mese",MM:"%d mesi",y:"un anno",yy:"%d anni"},dayOfMonthOrdinalParse:/\d{1,2}\xba/,ordinal:"%d\xba",week:{dow:1,doy:4}}),l.defineLocale("ja",{months:"\u4e00\u6708_\u4e8c\u6708_\u4e09\u6708_\u56db\u6708_\u4e94\u6708_\u516d\u6708_\u4e03\u6708_\u516b\u6708_\u4e5d\u6708_\u5341\u6708_\u5341\u4e00\u6708_\u5341\u4e8c\u6708".split("_"),monthsShort:"1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"),weekdays:"\u65e5\u66dc\u65e5_\u6708\u66dc\u65e5_\u706b\u66dc\u65e5_\u6c34\u66dc\u65e5_\u6728\u66dc\u65e5_\u91d1\u66dc\u65e5_\u571f\u66dc\u65e5".split("_"),weekdaysShort:"\u65e5_\u6708_\u706b_\u6c34_\u6728_\u91d1_\u571f".split("_"),weekdaysMin:"\u65e5_\u6708_\u706b_\u6c34_\u6728_\u91d1_\u571f".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY/MM/DD",LL:"YYYY\u5e74M\u6708D\u65e5",LLL:"YYYY\u5e74M\u6708D\u65e5 HH:mm",LLLL:"YYYY\u5e74M\u6708D\u65e5 dddd HH:mm",l:"YYYY/MM/DD",ll:"YYYY\u5e74M\u6708D\u65e5",lll:"YYYY\u5e74M\u6708D\u65e5 HH:mm",llll:"YYYY\u5e74M\u6708D\u65e5(ddd) HH:mm"},meridiemParse:/\u5348\u524d|\u5348\u5f8c/i,isPM:function(e){return"\u5348\u5f8c"===e},meridiem:function(e,a,t){return e<12?"\u5348\u524d":"\u5348\u5f8c"},calendar:{sameDay:"[\u4eca\u65e5] LT",nextDay:"[\u660e\u65e5] LT",nextWeek:function(e){return e.week()<this.week()?"[\u6765\u9031]dddd LT":"dddd LT"},lastDay:"[\u6628\u65e5] LT",lastWeek:function(e){return this.week()<e.week()?"[\u5148\u9031]dddd LT":"dddd LT"},sameElse:"L"},dayOfMonthOrdinalParse:/\d{1,2}\u65e5/,ordinal:function(e,a){switch(a){case"d":case"D":case"DDD":return e+"\u65e5";default:return e}},relativeTime:{future:"%s\u5f8c",past:"%s\u524d",s:"\u6570\u79d2",ss:"%d\u79d2",m:"1\u5206",mm:"%d\u5206",h:"1\u6642\u9593",hh:"%d\u6642\u9593",d:"1\u65e5",dd:"%d\u65e5",M:"1\u30f6\u6708",MM:"%d\u30f6\u6708",y:"1\u5e74",yy:"%d\u5e74"}}),l.defineLocale("jv",{months:"Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember".split("_"),monthsShort:"Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des".split("_"),weekdays:"Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu".split("_"),weekdaysShort:"Min_Sen_Sel_Reb_Kem_Jem_Sep".split("_"),weekdaysMin:"Mg_Sn_Sl_Rb_Km_Jm_Sp".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] HH.mm",LLLL:"dddd, D MMMM YYYY [pukul] HH.mm"},meridiemParse:/enjing|siyang|sonten|ndalu/,meridiemHour:function(e,a){return 12===e&&(e=0),"enjing"===a?e:"siyang"===a?11<=e?e:e+12:"sonten"===a||"ndalu"===a?e+12:void 0},meridiem:function(e,a,t){return e<11?"enjing":e<15?"siyang":e<19?"sonten":"ndalu"},calendar:{sameDay:"[Dinten puniko pukul] LT",nextDay:"[Mbenjang pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kala wingi pukul] LT",lastWeek:"dddd [kepengker pukul] LT",sameElse:"L"},relativeTime:{future:"wonten ing %s",past:"%s ingkang kepengker",s:"sawetawis detik",ss:"%d detik",m:"setunggal menit",mm:"%d menit",h:"setunggal jam",hh:"%d jam",d:"sedinten",dd:"%d dinten",M:"sewulan",MM:"%d wulan",y:"setaun",yy:"%d taun"},week:{dow:1,doy:7}}),l.defineLocale("ka",{months:{standalone:"\u10d8\u10d0\u10dc\u10d5\u10d0\u10e0\u10d8_\u10d7\u10d4\u10d1\u10d4\u10e0\u10d5\u10d0\u10da\u10d8_\u10db\u10d0\u10e0\u10e2\u10d8_\u10d0\u10de\u10e0\u10d8\u10da\u10d8_\u10db\u10d0\u10d8\u10e1\u10d8_\u10d8\u10d5\u10dc\u10d8\u10e1\u10d8_\u10d8\u10d5\u10da\u10d8\u10e1\u10d8_\u10d0\u10d2\u10d5\u10d8\u10e1\u10e2\u10dd_\u10e1\u10d4\u10e5\u10e2\u10d4\u10db\u10d1\u10d4\u10e0\u10d8_\u10dd\u10e5\u10e2\u10dd\u10db\u10d1\u10d4\u10e0\u10d8_\u10dc\u10dd\u10d4\u10db\u10d1\u10d4\u10e0\u10d8_\u10d3\u10d4\u10d9\u10d4\u10db\u10d1\u10d4\u10e0\u10d8".split("_"),format:"\u10d8\u10d0\u10dc\u10d5\u10d0\u10e0\u10e1_\u10d7\u10d4\u10d1\u10d4\u10e0\u10d5\u10d0\u10da\u10e1_\u10db\u10d0\u10e0\u10e2\u10e1_\u10d0\u10de\u10e0\u10d8\u10da\u10d8\u10e1_\u10db\u10d0\u10d8\u10e1\u10e1_\u10d8\u10d5\u10dc\u10d8\u10e1\u10e1_\u10d8\u10d5\u10da\u10d8\u10e1\u10e1_\u10d0\u10d2\u10d5\u10d8\u10e1\u10e2\u10e1_\u10e1\u10d4\u10e5\u10e2\u10d4\u10db\u10d1\u10d4\u10e0\u10e1_\u10dd\u10e5\u10e2\u10dd\u10db\u10d1\u10d4\u10e0\u10e1_\u10dc\u10dd\u10d4\u10db\u10d1\u10d4\u10e0\u10e1_\u10d3\u10d4\u10d9\u10d4\u10db\u10d1\u10d4\u10e0\u10e1".split("_")},monthsShort:"\u10d8\u10d0\u10dc_\u10d7\u10d4\u10d1_\u10db\u10d0\u10e0_\u10d0\u10de\u10e0_\u10db\u10d0\u10d8_\u10d8\u10d5\u10dc_\u10d8\u10d5\u10da_\u10d0\u10d2\u10d5_\u10e1\u10d4\u10e5_\u10dd\u10e5\u10e2_\u10dc\u10dd\u10d4_\u10d3\u10d4\u10d9".split("_"),weekdays:{standalone:"\u10d9\u10d5\u10d8\u10e0\u10d0_\u10dd\u10e0\u10e8\u10d0\u10d1\u10d0\u10d7\u10d8_\u10e1\u10d0\u10db\u10e8\u10d0\u10d1\u10d0\u10d7\u10d8_\u10dd\u10d7\u10ee\u10e8\u10d0\u10d1\u10d0\u10d7\u10d8_\u10ee\u10e3\u10d7\u10e8\u10d0\u10d1\u10d0\u10d7\u10d8_\u10de\u10d0\u10e0\u10d0\u10e1\u10d9\u10d4\u10d5\u10d8_\u10e8\u10d0\u10d1\u10d0\u10d7\u10d8".split("_"),format:"\u10d9\u10d5\u10d8\u10e0\u10d0\u10e1_\u10dd\u10e0\u10e8\u10d0\u10d1\u10d0\u10d7\u10e1_\u10e1\u10d0\u10db\u10e8\u10d0\u10d1\u10d0\u10d7\u10e1_\u10dd\u10d7\u10ee\u10e8\u10d0\u10d1\u10d0\u10d7\u10e1_\u10ee\u10e3\u10d7\u10e8\u10d0\u10d1\u10d0\u10d7\u10e1_\u10de\u10d0\u10e0\u10d0\u10e1\u10d9\u10d4\u10d5\u10e1_\u10e8\u10d0\u10d1\u10d0\u10d7\u10e1".split("_"),isFormat:/(\u10ec\u10d8\u10dc\u10d0|\u10e8\u10d4\u10db\u10d3\u10d4\u10d2)/},weekdaysShort:"\u10d9\u10d5\u10d8_\u10dd\u10e0\u10e8_\u10e1\u10d0\u10db_\u10dd\u10d7\u10ee_\u10ee\u10e3\u10d7_\u10de\u10d0\u10e0_\u10e8\u10d0\u10d1".split("_"),weekdaysMin:"\u10d9\u10d5_\u10dd\u10e0_\u10e1\u10d0_\u10dd\u10d7_\u10ee\u10e3_\u10de\u10d0_\u10e8\u10d0".split("_"),longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendar:{sameDay:"[\u10d3\u10e6\u10d4\u10e1] LT[-\u10d6\u10d4]",nextDay:"[\u10ee\u10d5\u10d0\u10da] LT[-\u10d6\u10d4]",lastDay:"[\u10d2\u10e3\u10e8\u10d8\u10dc] LT[-\u10d6\u10d4]",nextWeek:"[\u10e8\u10d4\u10db\u10d3\u10d4\u10d2] dddd LT[-\u10d6\u10d4]",lastWeek:"[\u10ec\u10d8\u10dc\u10d0] dddd LT-\u10d6\u10d4",sameElse:"L"},relativeTime:{future:function(e){return/(\u10ec\u10d0\u10db\u10d8|\u10ec\u10e3\u10d7\u10d8|\u10e1\u10d0\u10d0\u10d7\u10d8|\u10ec\u10d4\u10da\u10d8)/.test(e)?e.replace(/\u10d8$/,"\u10e8\u10d8"):e+"\u10e8\u10d8"},past:function(e){return/(\u10ec\u10d0\u10db\u10d8|\u10ec\u10e3\u10d7\u10d8|\u10e1\u10d0\u10d0\u10d7\u10d8|\u10d3\u10e6\u10d4|\u10d7\u10d5\u10d4)/.test(e)?e.replace(/(\u10d8|\u10d4)$/,"\u10d8\u10e1 \u10ec\u10d8\u10dc"):/\u10ec\u10d4\u10da\u10d8/.test(e)?e.replace(/\u10ec\u10d4\u10da\u10d8$/,"\u10ec\u10da\u10d8\u10e1 \u10ec\u10d8\u10dc"):void 0},s:"\u10e0\u10d0\u10db\u10d3\u10d4\u10dc\u10d8\u10db\u10d4 \u10ec\u10d0\u10db\u10d8",ss:"%d \u10ec\u10d0\u10db\u10d8",m:"\u10ec\u10e3\u10d7\u10d8",mm:"%d \u10ec\u10e3\u10d7\u10d8",h:"\u10e1\u10d0\u10d0\u10d7\u10d8",hh:"%d \u10e1\u10d0\u10d0\u10d7\u10d8",d:"\u10d3\u10e6\u10d4",dd:"%d \u10d3\u10e6\u10d4",M:"\u10d7\u10d5\u10d4",MM:"%d \u10d7\u10d5\u10d4",y:"\u10ec\u10d4\u10da\u10d8",yy:"%d \u10ec\u10d4\u10da\u10d8"},dayOfMonthOrdinalParse:/0|1-\u10da\u10d8|\u10db\u10d4-\d{1,2}|\d{1,2}-\u10d4/,ordinal:function(e){return 0===e?e:1===e?e+"-\u10da\u10d8":e<20||e<=100&&e%20==0||e%100==0?"\u10db\u10d4-"+e:e+"-\u10d4"},week:{dow:1,doy:7}});var sn={0:"-\u0448\u0456",1:"-\u0448\u0456",2:"-\u0448\u0456",3:"-\u0448\u0456",4:"-\u0448\u0456",5:"-\u0448\u0456",6:"-\u0448\u044b",7:"-\u0448\u0456",8:"-\u0448\u0456",9:"-\u0448\u044b",10:"-\u0448\u044b",20:"-\u0448\u044b",30:"-\u0448\u044b",40:"-\u0448\u044b",50:"-\u0448\u0456",60:"-\u0448\u044b",70:"-\u0448\u0456",80:"-\u0448\u0456",90:"-\u0448\u044b",100:"-\u0448\u0456"};l.defineLocale("kk",{months:"\u049b\u0430\u04a3\u0442\u0430\u0440_\u0430\u049b\u043f\u0430\u043d_\u043d\u0430\u0443\u0440\u044b\u0437_\u0441\u04d9\u0443\u0456\u0440_\u043c\u0430\u043c\u044b\u0440_\u043c\u0430\u0443\u0441\u044b\u043c_\u0448\u0456\u043b\u0434\u0435_\u0442\u0430\u043c\u044b\u0437_\u049b\u044b\u0440\u043a\u04af\u0439\u0435\u043a_\u049b\u0430\u0437\u0430\u043d_\u049b\u0430\u0440\u0430\u0448\u0430_\u0436\u0435\u043b\u0442\u043e\u049b\u0441\u0430\u043d".split("_"),monthsShort:"\u049b\u0430\u04a3_\u0430\u049b\u043f_\u043d\u0430\u0443_\u0441\u04d9\u0443_\u043c\u0430\u043c_\u043c\u0430\u0443_\u0448\u0456\u043b_\u0442\u0430\u043c_\u049b\u044b\u0440_\u049b\u0430\u0437_\u049b\u0430\u0440_\u0436\u0435\u043b".split("_"),weekdays:"\u0436\u0435\u043a\u0441\u0435\u043d\u0431\u0456_\u0434\u04af\u0439\u0441\u0435\u043d\u0431\u0456_\u0441\u0435\u0439\u0441\u0435\u043d\u0431\u0456_\u0441\u04d9\u0440\u0441\u0435\u043d\u0431\u0456_\u0431\u0435\u0439\u0441\u0435\u043d\u0431\u0456_\u0436\u04b1\u043c\u0430_\u0441\u0435\u043d\u0431\u0456".split("_"),weekdaysShort:"\u0436\u0435\u043a_\u0434\u04af\u0439_\u0441\u0435\u0439_\u0441\u04d9\u0440_\u0431\u0435\u0439_\u0436\u04b1\u043c_\u0441\u0435\u043d".split("_"),weekdaysMin:"\u0436\u043a_\u0434\u0439_\u0441\u0439_\u0441\u0440_\u0431\u0439_\u0436\u043c_\u0441\u043d".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[\u0411\u04af\u0433\u0456\u043d \u0441\u0430\u0493\u0430\u0442] LT",nextDay:"[\u0415\u0440\u0442\u0435\u04a3 \u0441\u0430\u0493\u0430\u0442] LT",nextWeek:"dddd [\u0441\u0430\u0493\u0430\u0442] LT",lastDay:"[\u041a\u0435\u0448\u0435 \u0441\u0430\u0493\u0430\u0442] LT",lastWeek:"[\u04e8\u0442\u043a\u0435\u043d \u0430\u043f\u0442\u0430\u043d\u044b\u04a3] dddd [\u0441\u0430\u0493\u0430\u0442] LT",sameElse:"L"},relativeTime:{future:"%s \u0456\u0448\u0456\u043d\u0434\u0435",past:"%s \u0431\u04b1\u0440\u044b\u043d",s:"\u0431\u0456\u0440\u043d\u0435\u0448\u0435 \u0441\u0435\u043a\u0443\u043d\u0434",ss:"%d \u0441\u0435\u043a\u0443\u043d\u0434",m:"\u0431\u0456\u0440 \u043c\u0438\u043d\u0443\u0442",mm:"%d \u043c\u0438\u043d\u0443\u0442",h:"\u0431\u0456\u0440 \u0441\u0430\u0493\u0430\u0442",hh:"%d \u0441\u0430\u0493\u0430\u0442",d:"\u0431\u0456\u0440 \u043a\u04af\u043d",dd:"%d \u043a\u04af\u043d",M:"\u0431\u0456\u0440 \u0430\u0439",MM:"%d \u0430\u0439",y:"\u0431\u0456\u0440 \u0436\u044b\u043b",yy:"%d \u0436\u044b\u043b"},dayOfMonthOrdinalParse:/\d{1,2}-(\u0448\u0456|\u0448\u044b)/,ordinal:function(e){return e+(sn[e]||sn[e%10]||sn[100<=e?100:null])},week:{dow:1,doy:7}});var nn={1:"\u17e1",2:"\u17e2",3:"\u17e3",4:"\u17e4",5:"\u17e5",6:"\u17e6",7:"\u17e7",8:"\u17e8",9:"\u17e9",0:"\u17e0"},dn={"\u17e1":"1","\u17e2":"2","\u17e3":"3","\u17e4":"4","\u17e5":"5","\u17e6":"6","\u17e7":"7","\u17e8":"8","\u17e9":"9","\u17e0":"0"};l.defineLocale("km",{months:"\u1798\u1780\u179a\u17b6_\u1780\u17bb\u1798\u17d2\u1797\u17c8_\u1798\u17b8\u1793\u17b6_\u1798\u17c1\u179f\u17b6_\u17a7\u179f\u1797\u17b6_\u1798\u17b7\u1790\u17bb\u1793\u17b6_\u1780\u1780\u17d2\u1780\u178a\u17b6_\u179f\u17b8\u17a0\u17b6_\u1780\u1789\u17d2\u1789\u17b6_\u178f\u17bb\u179b\u17b6_\u179c\u17b7\u1785\u17d2\u1786\u17b7\u1780\u17b6_\u1792\u17d2\u1793\u17bc".split("_"),monthsShort:"\u1798\u1780\u179a\u17b6_\u1780\u17bb\u1798\u17d2\u1797\u17c8_\u1798\u17b8\u1793\u17b6_\u1798\u17c1\u179f\u17b6_\u17a7\u179f\u1797\u17b6_\u1798\u17b7\u1790\u17bb\u1793\u17b6_\u1780\u1780\u17d2\u1780\u178a\u17b6_\u179f\u17b8\u17a0\u17b6_\u1780\u1789\u17d2\u1789\u17b6_\u178f\u17bb\u179b\u17b6_\u179c\u17b7\u1785\u17d2\u1786\u17b7\u1780\u17b6_\u1792\u17d2\u1793\u17bc".split("_"),weekdays:"\u17a2\u17b6\u1791\u17b7\u178f\u17d2\u1799_\u1785\u17d0\u1793\u17d2\u1791_\u17a2\u1784\u17d2\u1782\u17b6\u179a_\u1796\u17bb\u1792_\u1796\u17d2\u179a\u17a0\u179f\u17d2\u1794\u178f\u17b7\u17cd_\u179f\u17bb\u1780\u17d2\u179a_\u179f\u17c5\u179a\u17cd".split("_"),weekdaysShort:"\u17a2\u17b6_\u1785_\u17a2_\u1796_\u1796\u17d2\u179a_\u179f\u17bb_\u179f".split("_"),weekdaysMin:"\u17a2\u17b6_\u1785_\u17a2_\u1796_\u1796\u17d2\u179a_\u179f\u17bb_\u179f".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},meridiemParse:/\u1796\u17d2\u179a\u17b9\u1780|\u179b\u17d2\u1784\u17b6\u1785/,isPM:function(e){return"\u179b\u17d2\u1784\u17b6\u1785"===e},meridiem:function(e,a,t){return e<12?"\u1796\u17d2\u179a\u17b9\u1780":"\u179b\u17d2\u1784\u17b6\u1785"},calendar:{sameDay:"[\u1790\u17d2\u1784\u17c3\u1793\u17c1\u17c7 \u1798\u17c9\u17c4\u1784] LT",nextDay:"[\u179f\u17d2\u17a2\u17c2\u1780 \u1798\u17c9\u17c4\u1784] LT",nextWeek:"dddd [\u1798\u17c9\u17c4\u1784] LT",lastDay:"[\u1798\u17d2\u179f\u17b7\u179b\u1798\u17b7\u1789 \u1798\u17c9\u17c4\u1784] LT",lastWeek:"dddd [\u179f\u1794\u17d2\u178f\u17b6\u17a0\u17cd\u1798\u17bb\u1793] [\u1798\u17c9\u17c4\u1784] LT",sameElse:"L"},relativeTime:{future:"%s\u1791\u17c0\u178f",past:"%s\u1798\u17bb\u1793",s:"\u1794\u17c9\u17bb\u1793\u17d2\u1798\u17b6\u1793\u179c\u17b7\u1793\u17b6\u1791\u17b8",ss:"%d \u179c\u17b7\u1793\u17b6\u1791\u17b8",m:"\u1798\u17bd\u1799\u1793\u17b6\u1791\u17b8",mm:"%d \u1793\u17b6\u1791\u17b8",h:"\u1798\u17bd\u1799\u1798\u17c9\u17c4\u1784",hh:"%d \u1798\u17c9\u17c4\u1784",d:"\u1798\u17bd\u1799\u1790\u17d2\u1784\u17c3",dd:"%d \u1790\u17d2\u1784\u17c3",M:"\u1798\u17bd\u1799\u1781\u17c2",MM:"%d \u1781\u17c2",y:"\u1798\u17bd\u1799\u1786\u17d2\u1793\u17b6\u17c6",yy:"%d \u1786\u17d2\u1793\u17b6\u17c6"},dayOfMonthOrdinalParse:/\u1791\u17b8\d{1,2}/,ordinal:"\u1791\u17b8%d",preparse:function(e){return e.replace(/[\u17e1\u17e2\u17e3\u17e4\u17e5\u17e6\u17e7\u17e8\u17e9\u17e0]/g,function(e){return dn[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return nn[e]})},week:{dow:1,doy:4}});var rn={1:"\u0ce7",2:"\u0ce8",3:"\u0ce9",4:"\u0cea",5:"\u0ceb",6:"\u0cec",7:"\u0ced",8:"\u0cee",9:"\u0cef",0:"\u0ce6"},_n={"\u0ce7":"1","\u0ce8":"2","\u0ce9":"3","\u0cea":"4","\u0ceb":"5","\u0cec":"6","\u0ced":"7","\u0cee":"8","\u0cef":"9","\u0ce6":"0"};l.defineLocale("kn",{months:"\u0c9c\u0ca8\u0cb5\u0cb0\u0cbf_\u0cab\u0cc6\u0cac\u0ccd\u0cb0\u0cb5\u0cb0\u0cbf_\u0cae\u0cbe\u0cb0\u0ccd\u0c9a\u0ccd_\u0c8f\u0caa\u0ccd\u0cb0\u0cbf\u0cb2\u0ccd_\u0cae\u0cc6\u0cd5_\u0c9c\u0cc2\u0ca8\u0ccd_\u0c9c\u0cc1\u0cb2\u0cc6\u0cd6_\u0c86\u0c97\u0cb8\u0ccd\u0c9f\u0ccd_\u0cb8\u0cc6\u0caa\u0ccd\u0c9f\u0cc6\u0c82\u0cac\u0cb0\u0ccd_\u0c85\u0c95\u0ccd\u0c9f\u0cc6\u0cc2\u0cd5\u0cac\u0cb0\u0ccd_\u0ca8\u0cb5\u0cc6\u0c82\u0cac\u0cb0\u0ccd_\u0ca1\u0cbf\u0cb8\u0cc6\u0c82\u0cac\u0cb0\u0ccd".split("_"),monthsShort:"\u0c9c\u0ca8_\u0cab\u0cc6\u0cac\u0ccd\u0cb0_\u0cae\u0cbe\u0cb0\u0ccd\u0c9a\u0ccd_\u0c8f\u0caa\u0ccd\u0cb0\u0cbf\u0cb2\u0ccd_\u0cae\u0cc6\u0cd5_\u0c9c\u0cc2\u0ca8\u0ccd_\u0c9c\u0cc1\u0cb2\u0cc6\u0cd6_\u0c86\u0c97\u0cb8\u0ccd\u0c9f\u0ccd_\u0cb8\u0cc6\u0caa\u0ccd\u0c9f\u0cc6\u0c82_\u0c85\u0c95\u0ccd\u0c9f\u0cc6\u0cc2\u0cd5_\u0ca8\u0cb5\u0cc6\u0c82_\u0ca1\u0cbf\u0cb8\u0cc6\u0c82".split("_"),monthsParseExact:!0,weekdays:"\u0cad\u0cbe\u0ca8\u0cc1\u0cb5\u0cbe\u0cb0_\u0cb8\u0cc6\u0cc2\u0cd5\u0cae\u0cb5\u0cbe\u0cb0_\u0cae\u0c82\u0c97\u0cb3\u0cb5\u0cbe\u0cb0_\u0cac\u0cc1\u0ca7\u0cb5\u0cbe\u0cb0_\u0c97\u0cc1\u0cb0\u0cc1\u0cb5\u0cbe\u0cb0_\u0cb6\u0cc1\u0c95\u0ccd\u0cb0\u0cb5\u0cbe\u0cb0_\u0cb6\u0ca8\u0cbf\u0cb5\u0cbe\u0cb0".split("_"),weekdaysShort:"\u0cad\u0cbe\u0ca8\u0cc1_\u0cb8\u0cc6\u0cc2\u0cd5\u0cae_\u0cae\u0c82\u0c97\u0cb3_\u0cac\u0cc1\u0ca7_\u0c97\u0cc1\u0cb0\u0cc1_\u0cb6\u0cc1\u0c95\u0ccd\u0cb0_\u0cb6\u0ca8\u0cbf".split("_"),weekdaysMin:"\u0cad\u0cbe_\u0cb8\u0cc6\u0cc2\u0cd5_\u0cae\u0c82_\u0cac\u0cc1_\u0c97\u0cc1_\u0cb6\u0cc1_\u0cb6".split("_"),longDateFormat:{LT:"A h:mm",LTS:"A h:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm",LLLL:"dddd, D MMMM YYYY, A h:mm"},calendar:{sameDay:"[\u0c87\u0c82\u0ca6\u0cc1] LT",nextDay:"[\u0ca8\u0cbe\u0cb3\u0cc6] LT",nextWeek:"dddd, LT",lastDay:"[\u0ca8\u0cbf\u0ca8\u0ccd\u0ca8\u0cc6] LT",lastWeek:"[\u0c95\u0cc6\u0cc2\u0ca8\u0cc6\u0caf] dddd, LT",sameElse:"L"},relativeTime:{future:"%s \u0ca8\u0c82\u0ca4\u0cb0",past:"%s \u0cb9\u0cbf\u0c82\u0ca6\u0cc6",s:"\u0c95\u0cc6\u0cb2\u0cb5\u0cc1 \u0c95\u0ccd\u0cb7\u0ca3\u0c97\u0cb3\u0cc1",ss:"%d \u0cb8\u0cc6\u0c95\u0cc6\u0c82\u0ca1\u0cc1\u0c97\u0cb3\u0cc1",m:"\u0c92\u0c82\u0ca6\u0cc1 \u0ca8\u0cbf\u0cae\u0cbf\u0cb7",mm:"%d \u0ca8\u0cbf\u0cae\u0cbf\u0cb7",h:"\u0c92\u0c82\u0ca6\u0cc1 \u0c97\u0c82\u0c9f\u0cc6",hh:"%d \u0c97\u0c82\u0c9f\u0cc6",d:"\u0c92\u0c82\u0ca6\u0cc1 \u0ca6\u0cbf\u0ca8",dd:"%d \u0ca6\u0cbf\u0ca8",M:"\u0c92\u0c82\u0ca6\u0cc1 \u0ca4\u0cbf\u0c82\u0c97\u0cb3\u0cc1",MM:"%d \u0ca4\u0cbf\u0c82\u0c97\u0cb3\u0cc1",y:"\u0c92\u0c82\u0ca6\u0cc1 \u0cb5\u0cb0\u0ccd\u0cb7",yy:"%d \u0cb5\u0cb0\u0ccd\u0cb7"},preparse:function(e){return e.replace(/[\u0ce7\u0ce8\u0ce9\u0cea\u0ceb\u0cec\u0ced\u0cee\u0cef\u0ce6]/g,function(e){return _n[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return rn[e]})},meridiemParse:/\u0cb0\u0cbe\u0ca4\u0ccd\u0cb0\u0cbf|\u0cac\u0cc6\u0cb3\u0cbf\u0c97\u0ccd\u0c97\u0cc6|\u0cae\u0ca7\u0ccd\u0caf\u0cbe\u0cb9\u0ccd\u0ca8|\u0cb8\u0c82\u0c9c\u0cc6/,meridiemHour:function(e,a){return 12===e&&(e=0),"\u0cb0\u0cbe\u0ca4\u0ccd\u0cb0\u0cbf"===a?e<4?e:e+12:"\u0cac\u0cc6\u0cb3\u0cbf\u0c97\u0ccd\u0c97\u0cc6"===a?e:"\u0cae\u0ca7\u0ccd\u0caf\u0cbe\u0cb9\u0ccd\u0ca8"===a?10<=e?e:e+12:"\u0cb8\u0c82\u0c9c\u0cc6"===a?e+12:void 0},meridiem:function(e,a,t){return e<4?"\u0cb0\u0cbe\u0ca4\u0ccd\u0cb0\u0cbf":e<10?"\u0cac\u0cc6\u0cb3\u0cbf\u0c97\u0ccd\u0c97\u0cc6":e<17?"\u0cae\u0ca7\u0ccd\u0caf\u0cbe\u0cb9\u0ccd\u0ca8":e<20?"\u0cb8\u0c82\u0c9c\u0cc6":"\u0cb0\u0cbe\u0ca4\u0ccd\u0cb0\u0cbf"},dayOfMonthOrdinalParse:/\d{1,2}(\u0ca8\u0cc6\u0cd5)/,ordinal:function(e){return e+"\u0ca8\u0cc6\u0cd5"},week:{dow:0,doy:6}}),l.defineLocale("ko",{months:"1\uc6d4_2\uc6d4_3\uc6d4_4\uc6d4_5\uc6d4_6\uc6d4_7\uc6d4_8\uc6d4_9\uc6d4_10\uc6d4_11\uc6d4_12\uc6d4".split("_"),monthsShort:"1\uc6d4_2\uc6d4_3\uc6d4_4\uc6d4_5\uc6d4_6\uc6d4_7\uc6d4_8\uc6d4_9\uc6d4_10\uc6d4_11\uc6d4_12\uc6d4".split("_"),weekdays:"\uc77c\uc694\uc77c_\uc6d4\uc694\uc77c_\ud654\uc694\uc77c_\uc218\uc694\uc77c_\ubaa9\uc694\uc77c_\uae08\uc694\uc77c_\ud1a0\uc694\uc77c".split("_"),weekdaysShort:"\uc77c_\uc6d4_\ud654_\uc218_\ubaa9_\uae08_\ud1a0".split("_"),weekdaysMin:"\uc77c_\uc6d4_\ud654_\uc218_\ubaa9_\uae08_\ud1a0".split("_"),longDateFormat:{LT:"A h:mm",LTS:"A h:mm:ss",L:"YYYY.MM.DD.",LL:"YYYY\ub144 MMMM D\uc77c",LLL:"YYYY\ub144 MMMM D\uc77c A h:mm",LLLL:"YYYY\ub144 MMMM D\uc77c dddd A h:mm",l:"YYYY.MM.DD.",ll:"YYYY\ub144 MMMM D\uc77c",lll:"YYYY\ub144 MMMM D\uc77c A h:mm",llll:"YYYY\ub144 MMMM D\uc77c dddd A h:mm"},calendar:{sameDay:"\uc624\ub298 LT",nextDay:"\ub0b4\uc77c LT",nextWeek:"dddd LT",lastDay:"\uc5b4\uc81c LT",lastWeek:"\uc9c0\ub09c\uc8fc dddd LT",sameElse:"L"},relativeTime:{future:"%s \ud6c4",past:"%s \uc804",s:"\uba87 \ucd08",ss:"%d\ucd08",m:"1\ubd84",mm:"%d\ubd84",h:"\ud55c \uc2dc\uac04",hh:"%d\uc2dc\uac04",d:"\ud558\ub8e8",dd:"%d\uc77c",M:"\ud55c \ub2ec",MM:"%d\ub2ec",y:"\uc77c \ub144",yy:"%d\ub144"},dayOfMonthOrdinalParse:/\d{1,2}(\uc77c|\uc6d4|\uc8fc)/,ordinal:function(e,a){switch(a){case"d":case"D":case"DDD":return e+"\uc77c";case"M":return e+"\uc6d4";case"w":case"W":return e+"\uc8fc";default:return e}},meridiemParse:/\uc624\uc804|\uc624\ud6c4/,isPM:function(e){return"\uc624\ud6c4"===e},meridiem:function(e,a,t){return e<12?"\uc624\uc804":"\uc624\ud6c4"}});var on={1:"\u0661",2:"\u0662",3:"\u0663",4:"\u0664",5:"\u0665",6:"\u0666",7:"\u0667",8:"\u0668",9:"\u0669",0:"\u0660"},mn={"\u0661":"1","\u0662":"2","\u0663":"3","\u0664":"4","\u0665":"5","\u0666":"6","\u0667":"7","\u0668":"8","\u0669":"9","\u0660":"0"},un=["\u06a9\u0627\u0646\u0648\u0646\u06cc \u062f\u0648\u0648\u06d5\u0645","\u0634\u0648\u0628\u0627\u062a","\u0626\u0627\u0632\u0627\u0631","\u0646\u06cc\u0633\u0627\u0646","\u0626\u0627\u06cc\u0627\u0631","\u062d\u0648\u0632\u06d5\u06cc\u0631\u0627\u0646","\u062a\u06d5\u0645\u0645\u0648\u0632","\u0626\u0627\u0628","\u0626\u06d5\u06cc\u0644\u0648\u0648\u0644","\u062a\u0634\u0631\u06cc\u0646\u06cc \u06cc\u06d5\u0643\u06d5\u0645","\u062a\u0634\u0631\u06cc\u0646\u06cc \u062f\u0648\u0648\u06d5\u0645","\u0643\u0627\u0646\u0648\u0646\u06cc \u06cc\u06d5\u06a9\u06d5\u0645"];l.defineLocale("ku",{months:un,monthsShort:un,weekdays:"\u06cc\u0647\u200c\u0643\u0634\u0647\u200c\u0645\u0645\u0647\u200c_\u062f\u0648\u0648\u0634\u0647\u200c\u0645\u0645\u0647\u200c_\u0633\u06ce\u0634\u0647\u200c\u0645\u0645\u0647\u200c_\u0686\u0648\u0627\u0631\u0634\u0647\u200c\u0645\u0645\u0647\u200c_\u067e\u06ce\u0646\u062c\u0634\u0647\u200c\u0645\u0645\u0647\u200c_\u0647\u0647\u200c\u06cc\u0646\u06cc_\u0634\u0647\u200c\u0645\u0645\u0647\u200c".split("_"),weekdaysShort:"\u06cc\u0647\u200c\u0643\u0634\u0647\u200c\u0645_\u062f\u0648\u0648\u0634\u0647\u200c\u0645_\u0633\u06ce\u0634\u0647\u200c\u0645_\u0686\u0648\u0627\u0631\u0634\u0647\u200c\u0645_\u067e\u06ce\u0646\u062c\u0634\u0647\u200c\u0645_\u0647\u0647\u200c\u06cc\u0646\u06cc_\u0634\u0647\u200c\u0645\u0645\u0647\u200c".split("_"),weekdaysMin:"\u06cc_\u062f_\u0633_\u0686_\u067e_\u0647_\u0634".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},meridiemParse:/\u0626\u06ce\u0648\u0627\u0631\u0647\u200c|\u0628\u0647\u200c\u06cc\u0627\u0646\u06cc/,isPM:function(e){return/\u0626\u06ce\u0648\u0627\u0631\u0647\u200c/.test(e)},meridiem:function(e,a,t){return e<12?"\u0628\u0647\u200c\u06cc\u0627\u0646\u06cc":"\u0626\u06ce\u0648\u0627\u0631\u0647\u200c"},calendar:{sameDay:"[\u0626\u0647\u200c\u0645\u0631\u06c6 \u0643\u0627\u062a\u0698\u0645\u06ce\u0631] LT",nextDay:"[\u0628\u0647\u200c\u06cc\u0627\u0646\u06cc \u0643\u0627\u062a\u0698\u0645\u06ce\u0631] LT",nextWeek:"dddd [\u0643\u0627\u062a\u0698\u0645\u06ce\u0631] LT",lastDay:"[\u062f\u0648\u06ce\u0646\u06ce \u0643\u0627\u062a\u0698\u0645\u06ce\u0631] LT",lastWeek:"dddd [\u0643\u0627\u062a\u0698\u0645\u06ce\u0631] LT",sameElse:"L"},relativeTime:{future:"\u0644\u0647\u200c %s",past:"%s",s:"\u0686\u0647\u200c\u0646\u062f \u0686\u0631\u0643\u0647\u200c\u06cc\u0647\u200c\u0643",ss:"\u0686\u0631\u0643\u0647\u200c %d",m:"\u06cc\u0647\u200c\u0643 \u062e\u0648\u0644\u0647\u200c\u0643",mm:"%d \u062e\u0648\u0644\u0647\u200c\u0643",h:"\u06cc\u0647\u200c\u0643 \u0643\u0627\u062a\u0698\u0645\u06ce\u0631",hh:"%d \u0643\u0627\u062a\u0698\u0645\u06ce\u0631",d:"\u06cc\u0647\u200c\u0643 \u0695\u06c6\u0698",dd:"%d \u0695\u06c6\u0698",M:"\u06cc\u0647\u200c\u0643 \u0645\u0627\u0646\u06af",MM:"%d \u0645\u0627\u0646\u06af",y:"\u06cc\u0647\u200c\u0643 \u0633\u0627\u06b5",yy:"%d \u0633\u0627\u06b5"},preparse:function(e){return e.replace(/[\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669\u0660]/g,function(e){return mn[e]}).replace(/\u060c/g,",")},postformat:function(e){return e.replace(/\d/g,function(e){return on[e]}).replace(/,/g,"\u060c")},week:{dow:6,doy:12}});var ln={0:"-\u0447\u04af",1:"-\u0447\u0438",2:"-\u0447\u0438",3:"-\u0447\u04af",4:"-\u0447\u04af",5:"-\u0447\u0438",6:"-\u0447\u044b",7:"-\u0447\u0438",8:"-\u0447\u0438",9:"-\u0447\u0443",10:"-\u0447\u0443",20:"-\u0447\u044b",30:"-\u0447\u0443",40:"-\u0447\u044b",50:"-\u0447\u04af",60:"-\u0447\u044b",70:"-\u0447\u0438",80:"-\u0447\u0438",90:"-\u0447\u0443",100:"-\u0447\u04af"};function Mn(e,a,t,s){var n={m:["eng Minutt","enger Minutt"],h:["eng Stonn","enger Stonn"],d:["een Dag","engem Dag"],M:["ee Mount","engem Mount"],y:["ee Joer","engem Joer"]};return a?n[t][0]:n[t][1]}function hn(e){if(e=parseInt(e,10),isNaN(e))return!1;if(e<0)return!0;if(e<10)return 4<=e&&e<=7;if(e<100){var a=e%10;return hn(0===a?e/10:a)}if(e<1e4){for(;10<=e;)e/=10;return hn(e)}return hn(e/=1e3)}l.defineLocale("ky",{months:"\u044f\u043d\u0432\u0430\u0440\u044c_\u0444\u0435\u0432\u0440\u0430\u043b\u044c_\u043c\u0430\u0440\u0442_\u0430\u043f\u0440\u0435\u043b\u044c_\u043c\u0430\u0439_\u0438\u044e\u043d\u044c_\u0438\u044e\u043b\u044c_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043d\u0442\u044f\u0431\u0440\u044c_\u043e\u043a\u0442\u044f\u0431\u0440\u044c_\u043d\u043e\u044f\u0431\u0440\u044c_\u0434\u0435\u043a\u0430\u0431\u0440\u044c".split("_"),monthsShort:"\u044f\u043d\u0432_\u0444\u0435\u0432_\u043c\u0430\u0440\u0442_\u0430\u043f\u0440_\u043c\u0430\u0439_\u0438\u044e\u043d\u044c_\u0438\u044e\u043b\u044c_\u0430\u0432\u0433_\u0441\u0435\u043d_\u043e\u043a\u0442_\u043d\u043e\u044f_\u0434\u0435\u043a".split("_"),weekdays:"\u0416\u0435\u043a\u0448\u0435\u043c\u0431\u0438_\u0414\u04af\u0439\u0448\u04e9\u043c\u0431\u04af_\u0428\u0435\u0439\u0448\u0435\u043c\u0431\u0438_\u0428\u0430\u0440\u0448\u0435\u043c\u0431\u0438_\u0411\u0435\u0439\u0448\u0435\u043c\u0431\u0438_\u0416\u0443\u043c\u0430_\u0418\u0448\u0435\u043c\u0431\u0438".split("_"),weekdaysShort:"\u0416\u0435\u043a_\u0414\u04af\u0439_\u0428\u0435\u0439_\u0428\u0430\u0440_\u0411\u0435\u0439_\u0416\u0443\u043c_\u0418\u0448\u0435".split("_"),weekdaysMin:"\u0416\u043a_\u0414\u0439_\u0428\u0439_\u0428\u0440_\u0411\u0439_\u0416\u043c_\u0418\u0448".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[\u0411\u04af\u0433\u04af\u043d \u0441\u0430\u0430\u0442] LT",nextDay:"[\u042d\u0440\u0442\u0435\u04a3 \u0441\u0430\u0430\u0442] LT",nextWeek:"dddd [\u0441\u0430\u0430\u0442] LT",lastDay:"[\u041a\u0435\u0447\u044d\u044d \u0441\u0430\u0430\u0442] LT",lastWeek:"[\u04e8\u0442\u043a\u04e9\u043d \u0430\u043f\u0442\u0430\u043d\u044b\u043d] dddd [\u043a\u04af\u043d\u04af] [\u0441\u0430\u0430\u0442] LT",sameElse:"L"},relativeTime:{future:"%s \u0438\u0447\u0438\u043d\u0434\u0435",past:"%s \u043c\u0443\u0440\u0443\u043d",s:"\u0431\u0438\u0440\u043d\u0435\u0447\u0435 \u0441\u0435\u043a\u0443\u043d\u0434",ss:"%d \u0441\u0435\u043a\u0443\u043d\u0434",m:"\u0431\u0438\u0440 \u043c\u04af\u043d\u04e9\u0442",mm:"%d \u043c\u04af\u043d\u04e9\u0442",h:"\u0431\u0438\u0440 \u0441\u0430\u0430\u0442",hh:"%d \u0441\u0430\u0430\u0442",d:"\u0431\u0438\u0440 \u043a\u04af\u043d",dd:"%d \u043a\u04af\u043d",M:"\u0431\u0438\u0440 \u0430\u0439",MM:"%d \u0430\u0439",y:"\u0431\u0438\u0440 \u0436\u044b\u043b",yy:"%d \u0436\u044b\u043b"},dayOfMonthOrdinalParse:/\d{1,2}-(\u0447\u0438|\u0447\u044b|\u0447\u04af|\u0447\u0443)/,ordinal:function(e){return e+(ln[e]||ln[e%10]||ln[100<=e?100:null])},week:{dow:1,doy:7}}),l.defineLocale("lb",{months:"Januar_Februar_M\xe4erz_Abr\xebll_Mee_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),monthsShort:"Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),monthsParseExact:!0,weekdays:"Sonndeg_M\xe9indeg_D\xebnschdeg_M\xebttwoch_Donneschdeg_Freideg_Samschdeg".split("_"),weekdaysShort:"So._M\xe9._D\xeb._M\xeb._Do._Fr._Sa.".split("_"),weekdaysMin:"So_M\xe9_D\xeb_M\xeb_Do_Fr_Sa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm [Auer]",LTS:"H:mm:ss [Auer]",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm [Auer]",LLLL:"dddd, D. MMMM YYYY H:mm [Auer]"},calendar:{sameDay:"[Haut um] LT",sameElse:"L",nextDay:"[Muer um] LT",nextWeek:"dddd [um] LT",lastDay:"[G\xebschter um] LT",lastWeek:function(){switch(this.day()){case 2:case 4:return"[Leschten] dddd [um] LT";default:return"[Leschte] dddd [um] LT"}}},relativeTime:{future:function(e){return hn(e.substr(0,e.indexOf(" ")))?"a "+e:"an "+e},past:function(e){return hn(e.substr(0,e.indexOf(" ")))?"viru "+e:"virun "+e},s:"e puer Sekonnen",ss:"%d Sekonnen",m:Mn,mm:"%d Minutten",h:Mn,hh:"%d Stonnen",d:Mn,dd:"%d Deeg",M:Mn,MM:"%d M\xe9int",y:Mn,yy:"%d Joer"},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),l.defineLocale("lo",{months:"\u0ea1\u0eb1\u0e87\u0e81\u0ead\u0e99_\u0e81\u0eb8\u0ea1\u0e9e\u0eb2_\u0ea1\u0eb5\u0e99\u0eb2_\u0ec0\u0ea1\u0eaa\u0eb2_\u0e9e\u0eb6\u0e94\u0eaa\u0eb0\u0e9e\u0eb2_\u0ea1\u0eb4\u0e96\u0eb8\u0e99\u0eb2_\u0e81\u0ecd\u0ea5\u0eb0\u0e81\u0ebb\u0e94_\u0eaa\u0eb4\u0e87\u0eab\u0eb2_\u0e81\u0eb1\u0e99\u0e8d\u0eb2_\u0e95\u0eb8\u0ea5\u0eb2_\u0e9e\u0eb0\u0e88\u0eb4\u0e81_\u0e97\u0eb1\u0e99\u0ea7\u0eb2".split("_"),monthsShort:"\u0ea1\u0eb1\u0e87\u0e81\u0ead\u0e99_\u0e81\u0eb8\u0ea1\u0e9e\u0eb2_\u0ea1\u0eb5\u0e99\u0eb2_\u0ec0\u0ea1\u0eaa\u0eb2_\u0e9e\u0eb6\u0e94\u0eaa\u0eb0\u0e9e\u0eb2_\u0ea1\u0eb4\u0e96\u0eb8\u0e99\u0eb2_\u0e81\u0ecd\u0ea5\u0eb0\u0e81\u0ebb\u0e94_\u0eaa\u0eb4\u0e87\u0eab\u0eb2_\u0e81\u0eb1\u0e99\u0e8d\u0eb2_\u0e95\u0eb8\u0ea5\u0eb2_\u0e9e\u0eb0\u0e88\u0eb4\u0e81_\u0e97\u0eb1\u0e99\u0ea7\u0eb2".split("_"),weekdays:"\u0ead\u0eb2\u0e97\u0eb4\u0e94_\u0e88\u0eb1\u0e99_\u0ead\u0eb1\u0e87\u0e84\u0eb2\u0e99_\u0e9e\u0eb8\u0e94_\u0e9e\u0eb0\u0eab\u0eb1\u0e94_\u0eaa\u0eb8\u0e81_\u0ec0\u0eaa\u0ebb\u0eb2".split("_"),weekdaysShort:"\u0e97\u0eb4\u0e94_\u0e88\u0eb1\u0e99_\u0ead\u0eb1\u0e87\u0e84\u0eb2\u0e99_\u0e9e\u0eb8\u0e94_\u0e9e\u0eb0\u0eab\u0eb1\u0e94_\u0eaa\u0eb8\u0e81_\u0ec0\u0eaa\u0ebb\u0eb2".split("_"),weekdaysMin:"\u0e97_\u0e88_\u0ead\u0e84_\u0e9e_\u0e9e\u0eab_\u0eaa\u0e81_\u0eaa".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"\u0ea7\u0eb1\u0e99dddd D MMMM YYYY HH:mm"},meridiemParse:/\u0e95\u0ead\u0e99\u0ec0\u0e8a\u0ebb\u0ec9\u0eb2|\u0e95\u0ead\u0e99\u0ec1\u0ea5\u0e87/,isPM:function(e){return"\u0e95\u0ead\u0e99\u0ec1\u0ea5\u0e87"===e},meridiem:function(e,a,t){return e<12?"\u0e95\u0ead\u0e99\u0ec0\u0e8a\u0ebb\u0ec9\u0eb2":"\u0e95\u0ead\u0e99\u0ec1\u0ea5\u0e87"},calendar:{sameDay:"[\u0ea1\u0eb7\u0ec9\u0e99\u0eb5\u0ec9\u0ec0\u0ea7\u0ea5\u0eb2] LT",nextDay:"[\u0ea1\u0eb7\u0ec9\u0ead\u0eb7\u0ec8\u0e99\u0ec0\u0ea7\u0ea5\u0eb2] LT",nextWeek:"[\u0ea7\u0eb1\u0e99]dddd[\u0edc\u0ec9\u0eb2\u0ec0\u0ea7\u0ea5\u0eb2] LT",lastDay:"[\u0ea1\u0eb7\u0ec9\u0ea7\u0eb2\u0e99\u0e99\u0eb5\u0ec9\u0ec0\u0ea7\u0ea5\u0eb2] LT",lastWeek:"[\u0ea7\u0eb1\u0e99]dddd[\u0ec1\u0ea5\u0ec9\u0ea7\u0e99\u0eb5\u0ec9\u0ec0\u0ea7\u0ea5\u0eb2] LT",sameElse:"L"},relativeTime:{future:"\u0ead\u0eb5\u0e81 %s",past:"%s\u0e9c\u0ec8\u0eb2\u0e99\u0ea1\u0eb2",s:"\u0e9a\u0ecd\u0ec8\u0ec0\u0e97\u0ebb\u0ec8\u0eb2\u0ec3\u0e94\u0ea7\u0eb4\u0e99\u0eb2\u0e97\u0eb5",ss:"%d \u0ea7\u0eb4\u0e99\u0eb2\u0e97\u0eb5",m:"1 \u0e99\u0eb2\u0e97\u0eb5",mm:"%d \u0e99\u0eb2\u0e97\u0eb5",h:"1 \u0e8a\u0ebb\u0ec8\u0ea7\u0ec2\u0ea1\u0e87",hh:"%d \u0e8a\u0ebb\u0ec8\u0ea7\u0ec2\u0ea1\u0e87",d:"1 \u0ea1\u0eb7\u0ec9",dd:"%d \u0ea1\u0eb7\u0ec9",M:"1 \u0ec0\u0e94\u0eb7\u0ead\u0e99",MM:"%d \u0ec0\u0e94\u0eb7\u0ead\u0e99",y:"1 \u0e9b\u0eb5",yy:"%d \u0e9b\u0eb5"},dayOfMonthOrdinalParse:/(\u0e97\u0eb5\u0ec8)\d{1,2}/,ordinal:function(e){return"\u0e97\u0eb5\u0ec8"+e}});var Ln={ss:"sekund\u0117_sekund\u017ei\u0173_sekundes",m:"minut\u0117_minut\u0117s_minut\u0119",mm:"minut\u0117s_minu\u010di\u0173_minutes",h:"valanda_valandos_valand\u0105",hh:"valandos_valand\u0173_valandas",d:"diena_dienos_dien\u0105",dd:"dienos_dien\u0173_dienas",M:"m\u0117nuo_m\u0117nesio_m\u0117nes\u012f",MM:"m\u0117nesiai_m\u0117nesi\u0173_m\u0117nesius",y:"metai_met\u0173_metus",yy:"metai_met\u0173_metus"};function cn(e,a,t,s){return a?yn(t)[0]:s?yn(t)[1]:yn(t)[2]}function Yn(e){return e%10==0||10<e&&e<20}function yn(e){return Ln[e].split("_")}function fn(e,a,t,s){var n=e+" ";return 1===e?n+cn(0,a,t[0],s):a?n+(Yn(e)?yn(t)[1]:yn(t)[0]):s?n+yn(t)[1]:n+(Yn(e)?yn(t)[1]:yn(t)[2])}l.defineLocale("lt",{months:{format:"sausio_vasario_kovo_baland\u017eio_gegu\u017e\u0117s_bir\u017eelio_liepos_rugpj\u016b\u010dio_rugs\u0117jo_spalio_lapkri\u010dio_gruod\u017eio".split("_"),standalone:"sausis_vasaris_kovas_balandis_gegu\u017e\u0117_bir\u017eelis_liepa_rugpj\u016btis_rugs\u0117jis_spalis_lapkritis_gruodis".split("_"),isFormat:/D[oD]?(\[[^\[\]]*\]|\s)+MMMM?|MMMM?(\[[^\[\]]*\]|\s)+D[oD]?/},monthsShort:"sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd".split("_"),weekdays:{format:"sekmadien\u012f_pirmadien\u012f_antradien\u012f_tre\u010diadien\u012f_ketvirtadien\u012f_penktadien\u012f_\u0161e\u0161tadien\u012f".split("_"),standalone:"sekmadienis_pirmadienis_antradienis_tre\u010diadienis_ketvirtadienis_penktadienis_\u0161e\u0161tadienis".split("_"),isFormat:/dddd HH:mm/},weekdaysShort:"Sek_Pir_Ant_Tre_Ket_Pen_\u0160e\u0161".split("_"),weekdaysMin:"S_P_A_T_K_Pn_\u0160".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"YYYY [m.] MMMM D [d.]",LLL:"YYYY [m.] MMMM D [d.], HH:mm [val.]",LLLL:"YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]",l:"YYYY-MM-DD",ll:"YYYY [m.] MMMM D [d.]",lll:"YYYY [m.] MMMM D [d.], HH:mm [val.]",llll:"YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]"},calendar:{sameDay:"[\u0160iandien] LT",nextDay:"[Rytoj] LT",nextWeek:"dddd LT",lastDay:"[Vakar] LT",lastWeek:"[Pra\u0117jus\u012f] dddd LT",sameElse:"L"},relativeTime:{future:"po %s",past:"prie\u0161 %s",s:function(e,a,t,s){return a?"kelios sekund\u0117s":s?"keli\u0173 sekund\u017ei\u0173":"kelias sekundes"},ss:fn,m:cn,mm:fn,h:cn,hh:fn,d:cn,dd:fn,M:cn,MM:fn,y:cn,yy:fn},dayOfMonthOrdinalParse:/\d{1,2}-oji/,ordinal:function(e){return e+"-oji"},week:{dow:1,doy:4}});var kn={ss:"sekundes_sekund\u0113m_sekunde_sekundes".split("_"),m:"min\u016btes_min\u016bt\u0113m_min\u016bte_min\u016btes".split("_"),mm:"min\u016btes_min\u016bt\u0113m_min\u016bte_min\u016btes".split("_"),h:"stundas_stund\u0101m_stunda_stundas".split("_"),hh:"stundas_stund\u0101m_stunda_stundas".split("_"),d:"dienas_dien\u0101m_diena_dienas".split("_"),dd:"dienas_dien\u0101m_diena_dienas".split("_"),M:"m\u0113ne\u0161a_m\u0113ne\u0161iem_m\u0113nesis_m\u0113ne\u0161i".split("_"),MM:"m\u0113ne\u0161a_m\u0113ne\u0161iem_m\u0113nesis_m\u0113ne\u0161i".split("_"),y:"gada_gadiem_gads_gadi".split("_"),yy:"gada_gadiem_gads_gadi".split("_")};function pn(e,a,t){return t?a%10==1&&a%100!=11?e[2]:e[3]:a%10==1&&a%100!=11?e[0]:e[1]}function Dn(e,a,t){return e+" "+pn(kn[t],e,a)}function Tn(e,a,t){return pn(kn[t],e,a)}l.defineLocale("lv",{months:"janv\u0101ris_febru\u0101ris_marts_apr\u012blis_maijs_j\u016bnijs_j\u016blijs_augusts_septembris_oktobris_novembris_decembris".split("_"),monthsShort:"jan_feb_mar_apr_mai_j\u016bn_j\u016bl_aug_sep_okt_nov_dec".split("_"),weekdays:"sv\u0113tdiena_pirmdiena_otrdiena_tre\u0161diena_ceturtdiena_piektdiena_sestdiena".split("_"),weekdaysShort:"Sv_P_O_T_C_Pk_S".split("_"),weekdaysMin:"Sv_P_O_T_C_Pk_S".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY.",LL:"YYYY. [gada] D. MMMM",LLL:"YYYY. [gada] D. MMMM, HH:mm",LLLL:"YYYY. [gada] D. MMMM, dddd, HH:mm"},calendar:{sameDay:"[\u0160odien pulksten] LT",nextDay:"[R\u012bt pulksten] LT",nextWeek:"dddd [pulksten] LT",lastDay:"[Vakar pulksten] LT",lastWeek:"[Pag\u0101ju\u0161\u0101] dddd [pulksten] LT",sameElse:"L"},relativeTime:{future:"p\u0113c %s",past:"pirms %s",s:function(e,a){return a?"da\u017eas sekundes":"da\u017e\u0101m sekund\u0113m"},ss:Dn,m:Tn,mm:Dn,h:Tn,hh:Dn,d:Tn,dd:Dn,M:Tn,MM:Dn,y:Tn,yy:Dn},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});var gn={words:{ss:["sekund","sekunda","sekundi"],m:["jedan minut","jednog minuta"],mm:["minut","minuta","minuta"],h:["jedan sat","jednog sata"],hh:["sat","sata","sati"],dd:["dan","dana","dana"],MM:["mjesec","mjeseca","mjeseci"],yy:["godina","godine","godina"]},correctGrammaticalCase:function(e,a){return 1===e?a[0]:2<=e&&e<=4?a[1]:a[2]},translate:function(e,a,t){var s=gn.words[t];return 1===t.length?a?s[0]:s[1]:e+" "+gn.correctGrammaticalCase(e,s)}};function wn(e,a,t,s){switch(t){case"s":return a?"\u0445\u044d\u0434\u0445\u044d\u043d \u0441\u0435\u043a\u0443\u043d\u0434":"\u0445\u044d\u0434\u0445\u044d\u043d \u0441\u0435\u043a\u0443\u043d\u0434\u044b\u043d";case"ss":return e+(a?" \u0441\u0435\u043a\u0443\u043d\u0434":" \u0441\u0435\u043a\u0443\u043d\u0434\u044b\u043d");case"m":case"mm":return e+(a?" \u043c\u0438\u043d\u0443\u0442":" \u043c\u0438\u043d\u0443\u0442\u044b\u043d");case"h":case"hh":return e+(a?" \u0446\u0430\u0433":" \u0446\u0430\u0433\u0438\u0439\u043d");case"d":case"dd":return e+(a?" \u04e9\u0434\u04e9\u0440":" \u04e9\u0434\u0440\u0438\u0439\u043d");case"M":case"MM":return e+(a?" \u0441\u0430\u0440":" \u0441\u0430\u0440\u044b\u043d");case"y":case"yy":return e+(a?" \u0436\u0438\u043b":" \u0436\u0438\u043b\u0438\u0439\u043d");default:return e}}l.defineLocale("me",{months:"januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar".split("_"),monthsShort:"jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.".split("_"),monthsParseExact:!0,weekdays:"nedjelja_ponedjeljak_utorak_srijeda_\u010detvrtak_petak_subota".split("_"),weekdaysShort:"ned._pon._uto._sri._\u010det._pet._sub.".split("_"),weekdaysMin:"ne_po_ut_sr_\u010de_pe_su".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danas u] LT",nextDay:"[sjutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedjelju] [u] LT";case 3:return"[u] [srijedu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT"}},lastDay:"[ju\u010de u] LT",lastWeek:function(){return["[pro\u0161le] [nedjelje] [u] LT","[pro\u0161log] [ponedjeljka] [u] LT","[pro\u0161log] [utorka] [u] LT","[pro\u0161le] [srijede] [u] LT","[pro\u0161log] [\u010detvrtka] [u] LT","[pro\u0161log] [petka] [u] LT","[pro\u0161le] [subote] [u] LT"][this.day()]},sameElse:"L"},relativeTime:{future:"za %s",past:"prije %s",s:"nekoliko sekundi",ss:gn.translate,m:gn.translate,mm:gn.translate,h:gn.translate,hh:gn.translate,d:"dan",dd:gn.translate,M:"mjesec",MM:gn.translate,y:"godinu",yy:gn.translate},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),l.defineLocale("mi",{months:"Kohi-t\u0101te_Hui-tanguru_Pout\u016b-te-rangi_Paenga-wh\u0101wh\u0101_Haratua_Pipiri_H\u014dngoingoi_Here-turi-k\u014dk\u0101_Mahuru_Whiringa-\u0101-nuku_Whiringa-\u0101-rangi_Hakihea".split("_"),monthsShort:"Kohi_Hui_Pou_Pae_Hara_Pipi_H\u014dngoi_Here_Mahu_Whi-nu_Whi-ra_Haki".split("_"),monthsRegex:/(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,monthsStrictRegex:/(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,monthsShortRegex:/(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,monthsShortStrictRegex:/(?:['a-z\u0101\u014D\u016B]+\-?){1,2}/i,weekdays:"R\u0101tapu_Mane_T\u016brei_Wenerei_T\u0101ite_Paraire_H\u0101tarei".split("_"),weekdaysShort:"Ta_Ma_T\u016b_We_T\u0101i_Pa_H\u0101".split("_"),weekdaysMin:"Ta_Ma_T\u016b_We_T\u0101i_Pa_H\u0101".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [i] HH:mm",LLLL:"dddd, D MMMM YYYY [i] HH:mm"},calendar:{sameDay:"[i teie mahana, i] LT",nextDay:"[apopo i] LT",nextWeek:"dddd [i] LT",lastDay:"[inanahi i] LT",lastWeek:"dddd [whakamutunga i] LT",sameElse:"L"},relativeTime:{future:"i roto i %s",past:"%s i mua",s:"te h\u0113kona ruarua",ss:"%d h\u0113kona",m:"he meneti",mm:"%d meneti",h:"te haora",hh:"%d haora",d:"he ra",dd:"%d ra",M:"he marama",MM:"%d marama",y:"he tau",yy:"%d tau"},dayOfMonthOrdinalParse:/\d{1,2}\xba/,ordinal:"%d\xba",week:{dow:1,doy:4}}),l.defineLocale("mk",{months:"\u0458\u0430\u043d\u0443\u0430\u0440\u0438_\u0444\u0435\u0432\u0440\u0443\u0430\u0440\u0438_\u043c\u0430\u0440\u0442_\u0430\u043f\u0440\u0438\u043b_\u043c\u0430\u0458_\u0458\u0443\u043d\u0438_\u0458\u0443\u043b\u0438_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043f\u0442\u0435\u043c\u0432\u0440\u0438_\u043e\u043a\u0442\u043e\u043c\u0432\u0440\u0438_\u043d\u043e\u0435\u043c\u0432\u0440\u0438_\u0434\u0435\u043a\u0435\u043c\u0432\u0440\u0438".split("_"),monthsShort:"\u0458\u0430\u043d_\u0444\u0435\u0432_\u043c\u0430\u0440_\u0430\u043f\u0440_\u043c\u0430\u0458_\u0458\u0443\u043d_\u0458\u0443\u043b_\u0430\u0432\u0433_\u0441\u0435\u043f_\u043e\u043a\u0442_\u043d\u043e\u0435_\u0434\u0435\u043a".split("_"),weekdays:"\u043d\u0435\u0434\u0435\u043b\u0430_\u043f\u043e\u043d\u0435\u0434\u0435\u043b\u043d\u0438\u043a_\u0432\u0442\u043e\u0440\u043d\u0438\u043a_\u0441\u0440\u0435\u0434\u0430_\u0447\u0435\u0442\u0432\u0440\u0442\u043e\u043a_\u043f\u0435\u0442\u043e\u043a_\u0441\u0430\u0431\u043e\u0442\u0430".split("_"),weekdaysShort:"\u043d\u0435\u0434_\u043f\u043e\u043d_\u0432\u0442\u043e_\u0441\u0440\u0435_\u0447\u0435\u0442_\u043f\u0435\u0442_\u0441\u0430\u0431".split("_"),weekdaysMin:"\u043de_\u043fo_\u0432\u0442_\u0441\u0440_\u0447\u0435_\u043f\u0435_\u0441a".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"D.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY H:mm",LLLL:"dddd, D MMMM YYYY H:mm"},calendar:{sameDay:"[\u0414\u0435\u043d\u0435\u0441 \u0432\u043e] LT",nextDay:"[\u0423\u0442\u0440\u0435 \u0432\u043e] LT",nextWeek:"[\u0412\u043e] dddd [\u0432\u043e] LT",lastDay:"[\u0412\u0447\u0435\u0440\u0430 \u0432\u043e] LT",lastWeek:function(){switch(this.day()){case 0:case 3:case 6:return"[\u0418\u0437\u043c\u0438\u043d\u0430\u0442\u0430\u0442\u0430] dddd [\u0432\u043e] LT";case 1:case 2:case 4:case 5:return"[\u0418\u0437\u043c\u0438\u043d\u0430\u0442\u0438\u043e\u0442] dddd [\u0432\u043e] LT"}},sameElse:"L"},relativeTime:{future:"\u043f\u043e\u0441\u043b\u0435 %s",past:"\u043f\u0440\u0435\u0434 %s",s:"\u043d\u0435\u043a\u043e\u043b\u043a\u0443 \u0441\u0435\u043a\u0443\u043d\u0434\u0438",ss:"%d \u0441\u0435\u043a\u0443\u043d\u0434\u0438",m:"\u043c\u0438\u043d\u0443\u0442\u0430",mm:"%d \u043c\u0438\u043d\u0443\u0442\u0438",h:"\u0447\u0430\u0441",hh:"%d \u0447\u0430\u0441\u0430",d:"\u0434\u0435\u043d",dd:"%d \u0434\u0435\u043d\u0430",M:"\u043c\u0435\u0441\u0435\u0446",MM:"%d \u043c\u0435\u0441\u0435\u0446\u0438",y:"\u0433\u043e\u0434\u0438\u043d\u0430",yy:"%d \u0433\u043e\u0434\u0438\u043d\u0438"},dayOfMonthOrdinalParse:/\d{1,2}-(\u0435\u0432|\u0435\u043d|\u0442\u0438|\u0432\u0438|\u0440\u0438|\u043c\u0438)/,ordinal:function(e){var a=e%10,t=e%100;return 0===e?e+"-\u0435\u0432":0===t?e+"-\u0435\u043d":10<t&&t<20?e+"-\u0442\u0438":1===a?e+"-\u0432\u0438":2===a?e+"-\u0440\u0438":7===a||8===a?e+"-\u043c\u0438":e+"-\u0442\u0438"},week:{dow:1,doy:7}}),l.defineLocale("ml",{months:"\u0d1c\u0d28\u0d41\u0d35\u0d30\u0d3f_\u0d2b\u0d46\u0d2c\u0d4d\u0d30\u0d41\u0d35\u0d30\u0d3f_\u0d2e\u0d3e\u0d7c\u0d1a\u0d4d\u0d1a\u0d4d_\u0d0f\u0d2a\u0d4d\u0d30\u0d3f\u0d7d_\u0d2e\u0d47\u0d2f\u0d4d_\u0d1c\u0d42\u0d7a_\u0d1c\u0d42\u0d32\u0d48_\u0d13\u0d17\u0d38\u0d4d\u0d31\u0d4d\u0d31\u0d4d_\u0d38\u0d46\u0d2a\u0d4d\u0d31\u0d4d\u0d31\u0d02\u0d2c\u0d7c_\u0d12\u0d15\u0d4d\u0d1f\u0d4b\u0d2c\u0d7c_\u0d28\u0d35\u0d02\u0d2c\u0d7c_\u0d21\u0d3f\u0d38\u0d02\u0d2c\u0d7c".split("_"),monthsShort:"\u0d1c\u0d28\u0d41._\u0d2b\u0d46\u0d2c\u0d4d\u0d30\u0d41._\u0d2e\u0d3e\u0d7c._\u0d0f\u0d2a\u0d4d\u0d30\u0d3f._\u0d2e\u0d47\u0d2f\u0d4d_\u0d1c\u0d42\u0d7a_\u0d1c\u0d42\u0d32\u0d48._\u0d13\u0d17._\u0d38\u0d46\u0d2a\u0d4d\u0d31\u0d4d\u0d31._\u0d12\u0d15\u0d4d\u0d1f\u0d4b._\u0d28\u0d35\u0d02._\u0d21\u0d3f\u0d38\u0d02.".split("_"),monthsParseExact:!0,weekdays:"\u0d1e\u0d3e\u0d2f\u0d31\u0d3e\u0d34\u0d4d\u0d1a_\u0d24\u0d3f\u0d19\u0d4d\u0d15\u0d33\u0d3e\u0d34\u0d4d\u0d1a_\u0d1a\u0d4a\u0d35\u0d4d\u0d35\u0d3e\u0d34\u0d4d\u0d1a_\u0d2c\u0d41\u0d27\u0d28\u0d3e\u0d34\u0d4d\u0d1a_\u0d35\u0d4d\u0d2f\u0d3e\u0d34\u0d3e\u0d34\u0d4d\u0d1a_\u0d35\u0d46\u0d33\u0d4d\u0d33\u0d3f\u0d2f\u0d3e\u0d34\u0d4d\u0d1a_\u0d36\u0d28\u0d3f\u0d2f\u0d3e\u0d34\u0d4d\u0d1a".split("_"),weekdaysShort:"\u0d1e\u0d3e\u0d2f\u0d7c_\u0d24\u0d3f\u0d19\u0d4d\u0d15\u0d7e_\u0d1a\u0d4a\u0d35\u0d4d\u0d35_\u0d2c\u0d41\u0d27\u0d7b_\u0d35\u0d4d\u0d2f\u0d3e\u0d34\u0d02_\u0d35\u0d46\u0d33\u0d4d\u0d33\u0d3f_\u0d36\u0d28\u0d3f".split("_"),weekdaysMin:"\u0d1e\u0d3e_\u0d24\u0d3f_\u0d1a\u0d4a_\u0d2c\u0d41_\u0d35\u0d4d\u0d2f\u0d3e_\u0d35\u0d46_\u0d36".split("_"),longDateFormat:{LT:"A h:mm -\u0d28\u0d41",LTS:"A h:mm:ss -\u0d28\u0d41",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm -\u0d28\u0d41",LLLL:"dddd, D MMMM YYYY, A h:mm -\u0d28\u0d41"},calendar:{sameDay:"[\u0d07\u0d28\u0d4d\u0d28\u0d4d] LT",nextDay:"[\u0d28\u0d3e\u0d33\u0d46] LT",nextWeek:"dddd, LT",lastDay:"[\u0d07\u0d28\u0d4d\u0d28\u0d32\u0d46] LT",lastWeek:"[\u0d15\u0d34\u0d3f\u0d1e\u0d4d\u0d1e] dddd, LT",sameElse:"L"},relativeTime:{future:"%s \u0d15\u0d34\u0d3f\u0d1e\u0d4d\u0d1e\u0d4d",past:"%s \u0d2e\u0d41\u0d7b\u0d2a\u0d4d",s:"\u0d05\u0d7d\u0d2a \u0d28\u0d3f\u0d2e\u0d3f\u0d37\u0d19\u0d4d\u0d19\u0d7e",ss:"%d \u0d38\u0d46\u0d15\u0d4d\u0d15\u0d7b\u0d21\u0d4d",m:"\u0d12\u0d30\u0d41 \u0d2e\u0d3f\u0d28\u0d3f\u0d31\u0d4d\u0d31\u0d4d",mm:"%d \u0d2e\u0d3f\u0d28\u0d3f\u0d31\u0d4d\u0d31\u0d4d",h:"\u0d12\u0d30\u0d41 \u0d2e\u0d23\u0d3f\u0d15\u0d4d\u0d15\u0d42\u0d7c",hh:"%d \u0d2e\u0d23\u0d3f\u0d15\u0d4d\u0d15\u0d42\u0d7c",d:"\u0d12\u0d30\u0d41 \u0d26\u0d3f\u0d35\u0d38\u0d02",dd:"%d \u0d26\u0d3f\u0d35\u0d38\u0d02",M:"\u0d12\u0d30\u0d41 \u0d2e\u0d3e\u0d38\u0d02",MM:"%d \u0d2e\u0d3e\u0d38\u0d02",y:"\u0d12\u0d30\u0d41 \u0d35\u0d7c\u0d37\u0d02",yy:"%d \u0d35\u0d7c\u0d37\u0d02"},meridiemParse:/\u0d30\u0d3e\u0d24\u0d4d\u0d30\u0d3f|\u0d30\u0d3e\u0d35\u0d3f\u0d32\u0d46|\u0d09\u0d1a\u0d4d\u0d1a \u0d15\u0d34\u0d3f\u0d1e\u0d4d\u0d1e\u0d4d|\u0d35\u0d48\u0d15\u0d41\u0d28\u0d4d\u0d28\u0d47\u0d30\u0d02|\u0d30\u0d3e\u0d24\u0d4d\u0d30\u0d3f/i,meridiemHour:function(e,a){return 12===e&&(e=0),"\u0d30\u0d3e\u0d24\u0d4d\u0d30\u0d3f"===a&&4<=e||"\u0d09\u0d1a\u0d4d\u0d1a \u0d15\u0d34\u0d3f\u0d1e\u0d4d\u0d1e\u0d4d"===a||"\u0d35\u0d48\u0d15\u0d41\u0d28\u0d4d\u0d28\u0d47\u0d30\u0d02"===a?e+12:e},meridiem:function(e,a,t){return e<4?"\u0d30\u0d3e\u0d24\u0d4d\u0d30\u0d3f":e<12?"\u0d30\u0d3e\u0d35\u0d3f\u0d32\u0d46":e<17?"\u0d09\u0d1a\u0d4d\u0d1a \u0d15\u0d34\u0d3f\u0d1e\u0d4d\u0d1e\u0d4d":e<20?"\u0d35\u0d48\u0d15\u0d41\u0d28\u0d4d\u0d28\u0d47\u0d30\u0d02":"\u0d30\u0d3e\u0d24\u0d4d\u0d30\u0d3f"}}),l.defineLocale("mn",{months:"\u041d\u044d\u0433\u0434\u04af\u0433\u044d\u044d\u0440 \u0441\u0430\u0440_\u0425\u043e\u0451\u0440\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440_\u0413\u0443\u0440\u0430\u0432\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440_\u0414\u04e9\u0440\u04e9\u0432\u0434\u04af\u0433\u044d\u044d\u0440 \u0441\u0430\u0440_\u0422\u0430\u0432\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440_\u0417\u0443\u0440\u0433\u0430\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440_\u0414\u043e\u043b\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440_\u041d\u0430\u0439\u043c\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440_\u0415\u0441\u0434\u04af\u0433\u044d\u044d\u0440 \u0441\u0430\u0440_\u0410\u0440\u0430\u0432\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440_\u0410\u0440\u0432\u0430\u043d \u043d\u044d\u0433\u0434\u04af\u0433\u044d\u044d\u0440 \u0441\u0430\u0440_\u0410\u0440\u0432\u0430\u043d \u0445\u043e\u0451\u0440\u0434\u0443\u0433\u0430\u0430\u0440 \u0441\u0430\u0440".split("_"),monthsShort:"1 \u0441\u0430\u0440_2 \u0441\u0430\u0440_3 \u0441\u0430\u0440_4 \u0441\u0430\u0440_5 \u0441\u0430\u0440_6 \u0441\u0430\u0440_7 \u0441\u0430\u0440_8 \u0441\u0430\u0440_9 \u0441\u0430\u0440_10 \u0441\u0430\u0440_11 \u0441\u0430\u0440_12 \u0441\u0430\u0440".split("_"),monthsParseExact:!0,weekdays:"\u041d\u044f\u043c_\u0414\u0430\u0432\u0430\u0430_\u041c\u044f\u0433\u043c\u0430\u0440_\u041b\u0445\u0430\u0433\u0432\u0430_\u041f\u04af\u0440\u044d\u0432_\u0411\u0430\u0430\u0441\u0430\u043d_\u0411\u044f\u043c\u0431\u0430".split("_"),weekdaysShort:"\u041d\u044f\u043c_\u0414\u0430\u0432_\u041c\u044f\u0433_\u041b\u0445\u0430_\u041f\u04af\u0440_\u0411\u0430\u0430_\u0411\u044f\u043c".split("_"),weekdaysMin:"\u041d\u044f_\u0414\u0430_\u041c\u044f_\u041b\u0445_\u041f\u04af_\u0411\u0430_\u0411\u044f".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"YYYY \u043e\u043d\u044b MMMM\u044b\u043d D",LLL:"YYYY \u043e\u043d\u044b MMMM\u044b\u043d D HH:mm",LLLL:"dddd, YYYY \u043e\u043d\u044b MMMM\u044b\u043d D HH:mm"},meridiemParse:/\u04ae\u04e8|\u04ae\u0425/i,isPM:function(e){return"\u04ae\u0425"===e},meridiem:function(e,a,t){return e<12?"\u04ae\u04e8":"\u04ae\u0425"},calendar:{sameDay:"[\u04e8\u043d\u04e9\u04e9\u0434\u04e9\u0440] LT",nextDay:"[\u041c\u0430\u0440\u0433\u0430\u0430\u0448] LT",nextWeek:"[\u0418\u0440\u044d\u0445] dddd LT",lastDay:"[\u04e8\u0447\u0438\u0433\u0434\u04e9\u0440] LT",lastWeek:"[\u04e8\u043d\u0433\u04e9\u0440\u0441\u04e9\u043d] dddd LT",sameElse:"L"},relativeTime:{future:"%s \u0434\u0430\u0440\u0430\u0430",past:"%s \u04e9\u043c\u043d\u04e9",s:wn,ss:wn,m:wn,mm:wn,h:wn,hh:wn,d:wn,dd:wn,M:wn,MM:wn,y:wn,yy:wn},dayOfMonthOrdinalParse:/\d{1,2} \u04e9\u0434\u04e9\u0440/,ordinal:function(e,a){switch(a){case"d":case"D":case"DDD":return e+" \u04e9\u0434\u04e9\u0440";default:return e}}});var vn={1:"\u0967",2:"\u0968",3:"\u0969",4:"\u096a",5:"\u096b",6:"\u096c",7:"\u096d",8:"\u096e",9:"\u096f",0:"\u0966"},Sn={"\u0967":"1","\u0968":"2","\u0969":"3","\u096a":"4","\u096b":"5","\u096c":"6","\u096d":"7","\u096e":"8","\u096f":"9","\u0966":"0"};function Hn(e,a,t,s){var n="";if(a)switch(t){case"s":n="\u0915\u093e\u0939\u0940 \u0938\u0947\u0915\u0902\u0926";break;case"ss":n="%d \u0938\u0947\u0915\u0902\u0926";break;case"m":n="\u090f\u0915 \u092e\u093f\u0928\u093f\u091f";break;case"mm":n="%d \u092e\u093f\u0928\u093f\u091f\u0947";break;case"h":n="\u090f\u0915 \u0924\u093e\u0938";break;case"hh":n="%d \u0924\u093e\u0938";break;case"d":n="\u090f\u0915 \u0926\u093f\u0935\u0938";break;case"dd":n="%d \u0926\u093f\u0935\u0938";break;case"M":n="\u090f\u0915 \u092e\u0939\u093f\u0928\u093e";break;case"MM":n="%d \u092e\u0939\u093f\u0928\u0947";break;case"y":n="\u090f\u0915 \u0935\u0930\u094d\u0937";break;case"yy":n="%d \u0935\u0930\u094d\u0937\u0947";break}else switch(t){case"s":n="\u0915\u093e\u0939\u0940 \u0938\u0947\u0915\u0902\u0926\u093e\u0902";break;case"ss":n="%d \u0938\u0947\u0915\u0902\u0926\u093e\u0902";break;case"m":n="\u090f\u0915\u093e \u092e\u093f\u0928\u093f\u091f\u093e";break;case"mm":n="%d \u092e\u093f\u0928\u093f\u091f\u093e\u0902";break;case"h":n="\u090f\u0915\u093e \u0924\u093e\u0938\u093e";break;case"hh":n="%d \u0924\u093e\u0938\u093e\u0902";break;case"d":n="\u090f\u0915\u093e \u0926\u093f\u0935\u0938\u093e";break;case"dd":n="%d \u0926\u093f\u0935\u0938\u093e\u0902";break;case"M":n="\u090f\u0915\u093e \u092e\u0939\u093f\u0928\u094d\u092f\u093e";break;case"MM":n="%d \u092e\u0939\u093f\u0928\u094d\u092f\u093e\u0902";break;case"y":n="\u090f\u0915\u093e \u0935\u0930\u094d\u0937\u093e";break;case"yy":n="%d \u0935\u0930\u094d\u0937\u093e\u0902";break}return n.replace(/%d/i,e)}l.defineLocale("mr",{months:"\u091c\u093e\u0928\u0947\u0935\u093e\u0930\u0940_\u092b\u0947\u092c\u094d\u0930\u0941\u0935\u093e\u0930\u0940_\u092e\u093e\u0930\u094d\u091a_\u090f\u092a\u094d\u0930\u093f\u0932_\u092e\u0947_\u091c\u0942\u0928_\u091c\u0941\u0932\u0948_\u0911\u0917\u0938\u094d\u091f_\u0938\u092a\u094d\u091f\u0947\u0902\u092c\u0930_\u0911\u0915\u094d\u091f\u094b\u092c\u0930_\u0928\u094b\u0935\u094d\u0939\u0947\u0902\u092c\u0930_\u0921\u093f\u0938\u0947\u0902\u092c\u0930".split("_"),monthsShort:"\u091c\u093e\u0928\u0947._\u092b\u0947\u092c\u094d\u0930\u0941._\u092e\u093e\u0930\u094d\u091a._\u090f\u092a\u094d\u0930\u093f._\u092e\u0947._\u091c\u0942\u0928._\u091c\u0941\u0932\u0948._\u0911\u0917._\u0938\u092a\u094d\u091f\u0947\u0902._\u0911\u0915\u094d\u091f\u094b._\u0928\u094b\u0935\u094d\u0939\u0947\u0902._\u0921\u093f\u0938\u0947\u0902.".split("_"),monthsParseExact:!0,weekdays:"\u0930\u0935\u093f\u0935\u093e\u0930_\u0938\u094b\u092e\u0935\u093e\u0930_\u092e\u0902\u0917\u0933\u0935\u093e\u0930_\u092c\u0941\u0927\u0935\u093e\u0930_\u0917\u0941\u0930\u0942\u0935\u093e\u0930_\u0936\u0941\u0915\u094d\u0930\u0935\u093e\u0930_\u0936\u0928\u093f\u0935\u093e\u0930".split("_"),weekdaysShort:"\u0930\u0935\u093f_\u0938\u094b\u092e_\u092e\u0902\u0917\u0933_\u092c\u0941\u0927_\u0917\u0941\u0930\u0942_\u0936\u0941\u0915\u094d\u0930_\u0936\u0928\u093f".split("_"),weekdaysMin:"\u0930_\u0938\u094b_\u092e\u0902_\u092c\u0941_\u0917\u0941_\u0936\u0941_\u0936".split("_"),longDateFormat:{LT:"A h:mm \u0935\u093e\u091c\u0924\u093e",LTS:"A h:mm:ss \u0935\u093e\u091c\u0924\u093e",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm \u0935\u093e\u091c\u0924\u093e",LLLL:"dddd, D MMMM YYYY, A h:mm \u0935\u093e\u091c\u0924\u093e"},calendar:{sameDay:"[\u0906\u091c] LT",nextDay:"[\u0909\u0926\u094d\u092f\u093e] LT",nextWeek:"dddd, LT",lastDay:"[\u0915\u093e\u0932] LT",lastWeek:"[\u092e\u093e\u0917\u0940\u0932] dddd, LT",sameElse:"L"},relativeTime:{future:"%s\u092e\u0927\u094d\u092f\u0947",past:"%s\u092a\u0942\u0930\u094d\u0935\u0940",s:Hn,ss:Hn,m:Hn,mm:Hn,h:Hn,hh:Hn,d:Hn,dd:Hn,M:Hn,MM:Hn,y:Hn,yy:Hn},preparse:function(e){return e.replace(/[\u0967\u0968\u0969\u096a\u096b\u096c\u096d\u096e\u096f\u0966]/g,function(e){return Sn[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return vn[e]})},meridiemParse:/\u0930\u093e\u0924\u094d\u0930\u0940|\u0938\u0915\u093e\u0933\u0940|\u0926\u0941\u092a\u093e\u0930\u0940|\u0938\u093e\u092f\u0902\u0915\u093e\u0933\u0940/,meridiemHour:function(e,a){return 12===e&&(e=0),"\u0930\u093e\u0924\u094d\u0930\u0940"===a?e<4?e:e+12:"\u0938\u0915\u093e\u0933\u0940"===a?e:"\u0926\u0941\u092a\u093e\u0930\u0940"===a?10<=e?e:e+12:"\u0938\u093e\u092f\u0902\u0915\u093e\u0933\u0940"===a?e+12:void 0},meridiem:function(e,a,t){return e<4?"\u0930\u093e\u0924\u094d\u0930\u0940":e<10?"\u0938\u0915\u093e\u0933\u0940":e<17?"\u0926\u0941\u092a\u093e\u0930\u0940":e<20?"\u0938\u093e\u092f\u0902\u0915\u093e\u0933\u0940":"\u0930\u093e\u0924\u094d\u0930\u0940"},week:{dow:0,doy:6}}),l.defineLocale("ms-my",{months:"Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"),monthsShort:"Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),weekdays:"Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),weekdaysShort:"Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),weekdaysMin:"Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] HH.mm",LLLL:"dddd, D MMMM YYYY [pukul] HH.mm"},meridiemParse:/pagi|tengahari|petang|malam/,meridiemHour:function(e,a){return 12===e&&(e=0),"pagi"===a?e:"tengahari"===a?11<=e?e:e+12:"petang"===a||"malam"===a?e+12:void 0},meridiem:function(e,a,t){return e<11?"pagi":e<15?"tengahari":e<19?"petang":"malam"},calendar:{sameDay:"[Hari ini pukul] LT",nextDay:"[Esok pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kelmarin pukul] LT",lastWeek:"dddd [lepas pukul] LT",sameElse:"L"},relativeTime:{future:"dalam %s",past:"%s yang lepas",s:"beberapa saat",ss:"%d saat",m:"seminit",mm:"%d minit",h:"sejam",hh:"%d jam",d:"sehari",dd:"%d hari",M:"sebulan",MM:"%d bulan",y:"setahun",yy:"%d tahun"},week:{dow:1,doy:7}}),l.defineLocale("ms",{months:"Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"),monthsShort:"Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),weekdays:"Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),weekdaysShort:"Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),weekdaysMin:"Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] HH.mm",LLLL:"dddd, D MMMM YYYY [pukul] HH.mm"},meridiemParse:/pagi|tengahari|petang|malam/,meridiemHour:function(e,a){return 12===e&&(e=0),"pagi"===a?e:"tengahari"===a?11<=e?e:e+12:"petang"===a||"malam"===a?e+12:void 0},meridiem:function(e,a,t){return e<11?"pagi":e<15?"tengahari":e<19?"petang":"malam"},calendar:{sameDay:"[Hari ini pukul] LT",nextDay:"[Esok pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kelmarin pukul] LT",lastWeek:"dddd [lepas pukul] LT",sameElse:"L"},relativeTime:{future:"dalam %s",past:"%s yang lepas",s:"beberapa saat",ss:"%d saat",m:"seminit",mm:"%d minit",h:"sejam",hh:"%d jam",d:"sehari",dd:"%d hari",M:"sebulan",MM:"%d bulan",y:"setahun",yy:"%d tahun"},week:{dow:1,doy:7}}),l.defineLocale("mt",{months:"Jannar_Frar_Marzu_April_Mejju_\u0120unju_Lulju_Awwissu_Settembru_Ottubru_Novembru_Di\u010bembru".split("_"),monthsShort:"Jan_Fra_Mar_Apr_Mej_\u0120un_Lul_Aww_Set_Ott_Nov_Di\u010b".split("_"),weekdays:"Il-\u0126add_It-Tnejn_It-Tlieta_L-Erbg\u0127a_Il-\u0126amis_Il-\u0120img\u0127a_Is-Sibt".split("_"),weekdaysShort:"\u0126ad_Tne_Tli_Erb_\u0126am_\u0120im_Sib".split("_"),weekdaysMin:"\u0126a_Tn_Tl_Er_\u0126a_\u0120i_Si".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Illum fil-]LT",nextDay:"[G\u0127ada fil-]LT",nextWeek:"dddd [fil-]LT",lastDay:"[Il-biera\u0127 fil-]LT",lastWeek:"dddd [li g\u0127adda] [fil-]LT",sameElse:"L"},relativeTime:{future:"f\u2019 %s",past:"%s ilu",s:"ftit sekondi",ss:"%d sekondi",m:"minuta",mm:"%d minuti",h:"sieg\u0127a",hh:"%d sieg\u0127at",d:"\u0121urnata",dd:"%d \u0121ranet",M:"xahar",MM:"%d xhur",y:"sena",yy:"%d sni"},dayOfMonthOrdinalParse:/\d{1,2}\xba/,ordinal:"%d\xba",week:{dow:1,doy:4}});var bn={1:"\u1041",2:"\u1042",3:"\u1043",4:"\u1044",5:"\u1045",6:"\u1046",7:"\u1047",8:"\u1048",9:"\u1049",0:"\u1040"},jn={"\u1041":"1","\u1042":"2","\u1043":"3","\u1044":"4","\u1045":"5","\u1046":"6","\u1047":"7","\u1048":"8","\u1049":"9","\u1040":"0"};l.defineLocale("my",{months:"\u1007\u1014\u103a\u1014\u101d\u102b\u101b\u102e_\u1016\u1031\u1016\u1031\u102c\u103a\u101d\u102b\u101b\u102e_\u1019\u1010\u103a_\u1027\u1015\u103c\u102e_\u1019\u1031_\u1007\u103d\u1014\u103a_\u1007\u1030\u101c\u102d\u102f\u1004\u103a_\u101e\u103c\u1002\u102f\u1010\u103a_\u1005\u1000\u103a\u1010\u1004\u103a\u1018\u102c_\u1021\u1031\u102c\u1000\u103a\u1010\u102d\u102f\u1018\u102c_\u1014\u102d\u102f\u101d\u1004\u103a\u1018\u102c_\u1012\u102e\u1007\u1004\u103a\u1018\u102c".split("_"),monthsShort:"\u1007\u1014\u103a_\u1016\u1031_\u1019\u1010\u103a_\u1015\u103c\u102e_\u1019\u1031_\u1007\u103d\u1014\u103a_\u101c\u102d\u102f\u1004\u103a_\u101e\u103c_\u1005\u1000\u103a_\u1021\u1031\u102c\u1000\u103a_\u1014\u102d\u102f_\u1012\u102e".split("_"),weekdays:"\u1010\u1014\u1004\u103a\u1039\u1002\u1014\u103d\u1031_\u1010\u1014\u1004\u103a\u1039\u101c\u102c_\u1021\u1004\u103a\u1039\u1002\u102b_\u1017\u102f\u1012\u1039\u1013\u101f\u1030\u1038_\u1000\u103c\u102c\u101e\u1015\u1010\u1031\u1038_\u101e\u1031\u102c\u1000\u103c\u102c_\u1005\u1014\u1031".split("_"),weekdaysShort:"\u1014\u103d\u1031_\u101c\u102c_\u1002\u102b_\u101f\u1030\u1038_\u1000\u103c\u102c_\u101e\u1031\u102c_\u1014\u1031".split("_"),weekdaysMin:"\u1014\u103d\u1031_\u101c\u102c_\u1002\u102b_\u101f\u1030\u1038_\u1000\u103c\u102c_\u101e\u1031\u102c_\u1014\u1031".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[\u101a\u1014\u1031.] LT [\u1019\u103e\u102c]",nextDay:"[\u1019\u1014\u1000\u103a\u1016\u103c\u1014\u103a] LT [\u1019\u103e\u102c]",nextWeek:"dddd LT [\u1019\u103e\u102c]",lastDay:"[\u1019\u1014\u1031.\u1000] LT [\u1019\u103e\u102c]",lastWeek:"[\u1015\u103c\u102e\u1038\u1001\u1032\u1037\u101e\u1031\u102c] dddd LT [\u1019\u103e\u102c]",sameElse:"L"},relativeTime:{future:"\u101c\u102c\u1019\u100a\u103a\u1037 %s \u1019\u103e\u102c",past:"\u101c\u103d\u1014\u103a\u1001\u1032\u1037\u101e\u1031\u102c %s \u1000",s:"\u1005\u1000\u1039\u1000\u1014\u103a.\u1021\u1014\u100a\u103a\u1038\u1004\u101a\u103a",ss:"%d \u1005\u1000\u1039\u1000\u1014\u1037\u103a",m:"\u1010\u1005\u103a\u1019\u102d\u1014\u1005\u103a",mm:"%d \u1019\u102d\u1014\u1005\u103a",h:"\u1010\u1005\u103a\u1014\u102c\u101b\u102e",hh:"%d \u1014\u102c\u101b\u102e",d:"\u1010\u1005\u103a\u101b\u1000\u103a",dd:"%d \u101b\u1000\u103a",M:"\u1010\u1005\u103a\u101c",MM:"%d \u101c",y:"\u1010\u1005\u103a\u1014\u103e\u1005\u103a",yy:"%d \u1014\u103e\u1005\u103a"},preparse:function(e){return e.replace(/[\u1041\u1042\u1043\u1044\u1045\u1046\u1047\u1048\u1049\u1040]/g,function(e){return jn[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return bn[e]})},week:{dow:1,doy:4}}),l.defineLocale("nb",{months:"januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),monthsShort:"jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.".split("_"),monthsParseExact:!0,weekdays:"s\xf8ndag_mandag_tirsdag_onsdag_torsdag_fredag_l\xf8rdag".split("_"),weekdaysShort:"s\xf8._ma._ti._on._to._fr._l\xf8.".split("_"),weekdaysMin:"s\xf8_ma_ti_on_to_fr_l\xf8".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY [kl.] HH:mm",LLLL:"dddd D. MMMM YYYY [kl.] HH:mm"},calendar:{sameDay:"[i dag kl.] LT",nextDay:"[i morgen kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[i g\xe5r kl.] LT",lastWeek:"[forrige] dddd [kl.] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"%s siden",s:"noen sekunder",ss:"%d sekunder",m:"ett minutt",mm:"%d minutter",h:"en time",hh:"%d timer",d:"en dag",dd:"%d dager",M:"en m\xe5ned",MM:"%d m\xe5neder",y:"ett \xe5r",yy:"%d \xe5r"},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});var xn={1:"\u0967",2:"\u0968",3:"\u0969",4:"\u096a",5:"\u096b",6:"\u096c",7:"\u096d",8:"\u096e",9:"\u096f",0:"\u0966"},On={"\u0967":"1","\u0968":"2","\u0969":"3","\u096a":"4","\u096b":"5","\u096c":"6","\u096d":"7","\u096e":"8","\u096f":"9","\u0966":"0"};l.defineLocale("ne",{months:"\u091c\u0928\u0935\u0930\u0940_\u092b\u0947\u092c\u094d\u0930\u0941\u0935\u0930\u0940_\u092e\u093e\u0930\u094d\u091a_\u0905\u092a\u094d\u0930\u093f\u0932_\u092e\u0908_\u091c\u0941\u0928_\u091c\u0941\u0932\u093e\u0908_\u0905\u0917\u0937\u094d\u091f_\u0938\u0947\u092a\u094d\u091f\u0947\u092e\u094d\u092c\u0930_\u0905\u0915\u094d\u091f\u094b\u092c\u0930_\u0928\u094b\u092d\u0947\u092e\u094d\u092c\u0930_\u0921\u093f\u0938\u0947\u092e\u094d\u092c\u0930".split("_"),monthsShort:"\u091c\u0928._\u092b\u0947\u092c\u094d\u0930\u0941._\u092e\u093e\u0930\u094d\u091a_\u0905\u092a\u094d\u0930\u093f._\u092e\u0908_\u091c\u0941\u0928_\u091c\u0941\u0932\u093e\u0908._\u0905\u0917._\u0938\u0947\u092a\u094d\u091f._\u0905\u0915\u094d\u091f\u094b._\u0928\u094b\u092d\u0947._\u0921\u093f\u0938\u0947.".split("_"),monthsParseExact:!0,weekdays:"\u0906\u0907\u0924\u092c\u093e\u0930_\u0938\u094b\u092e\u092c\u093e\u0930_\u092e\u0919\u094d\u0917\u0932\u092c\u093e\u0930_\u092c\u0941\u0927\u092c\u093e\u0930_\u092c\u093f\u0939\u093f\u092c\u093e\u0930_\u0936\u0941\u0915\u094d\u0930\u092c\u093e\u0930_\u0936\u0928\u093f\u092c\u093e\u0930".split("_"),weekdaysShort:"\u0906\u0907\u0924._\u0938\u094b\u092e._\u092e\u0919\u094d\u0917\u0932._\u092c\u0941\u0927._\u092c\u093f\u0939\u093f._\u0936\u0941\u0915\u094d\u0930._\u0936\u0928\u093f.".split("_"),weekdaysMin:"\u0906._\u0938\u094b._\u092e\u0902._\u092c\u0941._\u092c\u093f._\u0936\u0941._\u0936.".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"A\u0915\u094b h:mm \u092c\u091c\u0947",LTS:"A\u0915\u094b h:mm:ss \u092c\u091c\u0947",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A\u0915\u094b h:mm \u092c\u091c\u0947",LLLL:"dddd, D MMMM YYYY, A\u0915\u094b h:mm \u092c\u091c\u0947"},preparse:function(e){return e.replace(/[\u0967\u0968\u0969\u096a\u096b\u096c\u096d\u096e\u096f\u0966]/g,function(e){return On[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return xn[e]})},meridiemParse:/\u0930\u093e\u0924\u093f|\u092c\u093f\u0939\u093e\u0928|\u0926\u093f\u0909\u0901\u0938\u094b|\u0938\u093e\u0901\u091d/,meridiemHour:function(e,a){return 12===e&&(e=0),"\u0930\u093e\u0924\u093f"===a?e<4?e:e+12:"\u092c\u093f\u0939\u093e\u0928"===a?e:"\u0926\u093f\u0909\u0901\u0938\u094b"===a?10<=e?e:e+12:"\u0938\u093e\u0901\u091d"===a?e+12:void 0},meridiem:function(e,a,t){return e<3?"\u0930\u093e\u0924\u093f":e<12?"\u092c\u093f\u0939\u093e\u0928":e<16?"\u0926\u093f\u0909\u0901\u0938\u094b":e<20?"\u0938\u093e\u0901\u091d":"\u0930\u093e\u0924\u093f"},calendar:{sameDay:"[\u0906\u091c] LT",nextDay:"[\u092d\u094b\u0932\u093f] LT",nextWeek:"[\u0906\u0909\u0901\u0926\u094b] dddd[,] LT",lastDay:"[\u0939\u093f\u091c\u094b] LT",lastWeek:"[\u0917\u090f\u0915\u094b] dddd[,] LT",sameElse:"L"},relativeTime:{future:"%s\u092e\u093e",past:"%s \u0905\u0917\u093e\u0921\u093f",s:"\u0915\u0947\u0939\u0940 \u0915\u094d\u0937\u0923",ss:"%d \u0938\u0947\u0915\u0947\u0923\u094d\u0921",m:"\u090f\u0915 \u092e\u093f\u0928\u0947\u091f",mm:"%d \u092e\u093f\u0928\u0947\u091f",h:"\u090f\u0915 \u0918\u0923\u094d\u091f\u093e",hh:"%d \u0918\u0923\u094d\u091f\u093e",d:"\u090f\u0915 \u0926\u093f\u0928",dd:"%d \u0926\u093f\u0928",M:"\u090f\u0915 \u092e\u0939\u093f\u0928\u093e",MM:"%d \u092e\u0939\u093f\u0928\u093e",y:"\u090f\u0915 \u092c\u0930\u094d\u0937",yy:"%d \u092c\u0930\u094d\u0937"},week:{dow:0,doy:6}});var Pn="jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"),Wn="jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"),An=[/^jan/i,/^feb/i,/^maart|mrt.?$/i,/^apr/i,/^mei$/i,/^jun[i.]?$/i,/^jul[i.]?$/i,/^aug/i,/^sep/i,/^okt/i,/^nov/i,/^dec/i],En=/^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;l.defineLocale("nl-be",{months:"januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),monthsShort:function(e,a){return e?/-MMM-/.test(a)?Wn[e.month()]:Pn[e.month()]:Pn},monthsRegex:En,monthsShortRegex:En,monthsStrictRegex:/^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december)/i,monthsShortStrictRegex:/^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,monthsParse:An,longMonthsParse:An,shortMonthsParse:An,weekdays:"zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),weekdaysShort:"zo._ma._di._wo._do._vr._za.".split("_"),weekdaysMin:"zo_ma_di_wo_do_vr_za".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[vandaag om] LT",nextDay:"[morgen om] LT",nextWeek:"dddd [om] LT",lastDay:"[gisteren om] LT",lastWeek:"[afgelopen] dddd [om] LT",sameElse:"L"},relativeTime:{future:"over %s",past:"%s geleden",s:"een paar seconden",ss:"%d seconden",m:"\xe9\xe9n minuut",mm:"%d minuten",h:"\xe9\xe9n uur",hh:"%d uur",d:"\xe9\xe9n dag",dd:"%d dagen",M:"\xe9\xe9n maand",MM:"%d maanden",y:"\xe9\xe9n jaar",yy:"%d jaar"},dayOfMonthOrdinalParse:/\d{1,2}(ste|de)/,ordinal:function(e){return e+(1===e||8===e||20<=e?"ste":"de")},week:{dow:1,doy:4}});var Fn="jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"),zn="jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"),Jn=[/^jan/i,/^feb/i,/^maart|mrt.?$/i,/^apr/i,/^mei$/i,/^jun[i.]?$/i,/^jul[i.]?$/i,/^aug/i,/^sep/i,/^okt/i,/^nov/i,/^dec/i],Nn=/^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;l.defineLocale("nl",{months:"januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),monthsShort:function(e,a){return e?/-MMM-/.test(a)?zn[e.month()]:Fn[e.month()]:Fn},monthsRegex:Nn,monthsShortRegex:Nn,monthsStrictRegex:/^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december)/i,monthsShortStrictRegex:/^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,monthsParse:Jn,longMonthsParse:Jn,shortMonthsParse:Jn,weekdays:"zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),weekdaysShort:"zo._ma._di._wo._do._vr._za.".split("_"),weekdaysMin:"zo_ma_di_wo_do_vr_za".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD-MM-YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[vandaag om] LT",nextDay:"[morgen om] LT",nextWeek:"dddd [om] LT",lastDay:"[gisteren om] LT",lastWeek:"[afgelopen] dddd [om] LT",sameElse:"L"},relativeTime:{future:"over %s",past:"%s geleden",s:"een paar seconden",ss:"%d seconden",m:"\xe9\xe9n minuut",mm:"%d minuten",h:"\xe9\xe9n uur",hh:"%d uur",d:"\xe9\xe9n dag",dd:"%d dagen",M:"\xe9\xe9n maand",MM:"%d maanden",y:"\xe9\xe9n jaar",yy:"%d jaar"},dayOfMonthOrdinalParse:/\d{1,2}(ste|de)/,ordinal:function(e){return e+(1===e||8===e||20<=e?"ste":"de")},week:{dow:1,doy:4}}),l.defineLocale("nn",{months:"januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),monthsShort:"jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),weekdays:"sundag_m\xe5ndag_tysdag_onsdag_torsdag_fredag_laurdag".split("_"),weekdaysShort:"sun_m\xe5n_tys_ons_tor_fre_lau".split("_"),weekdaysMin:"su_m\xe5_ty_on_to_fr_l\xf8".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY [kl.] H:mm",LLLL:"dddd D. MMMM YYYY [kl.] HH:mm"},calendar:{sameDay:"[I dag klokka] LT",nextDay:"[I morgon klokka] LT",nextWeek:"dddd [klokka] LT",lastDay:"[I g\xe5r klokka] LT",lastWeek:"[F\xf8reg\xe5ande] dddd [klokka] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"%s sidan",s:"nokre sekund",ss:"%d sekund",m:"eit minutt",mm:"%d minutt",h:"ein time",hh:"%d timar",d:"ein dag",dd:"%d dagar",M:"ein m\xe5nad",MM:"%d m\xe5nader",y:"eit \xe5r",yy:"%d \xe5r"},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});var Rn={1:"\u0a67",2:"\u0a68",3:"\u0a69",4:"\u0a6a",5:"\u0a6b",6:"\u0a6c",7:"\u0a6d",8:"\u0a6e",9:"\u0a6f",0:"\u0a66"},Cn={"\u0a67":"1","\u0a68":"2","\u0a69":"3","\u0a6a":"4","\u0a6b":"5","\u0a6c":"6","\u0a6d":"7","\u0a6e":"8","\u0a6f":"9","\u0a66":"0"};l.defineLocale("pa-in",{months:"\u0a1c\u0a28\u0a35\u0a30\u0a40_\u0a2b\u0a3c\u0a30\u0a35\u0a30\u0a40_\u0a2e\u0a3e\u0a30\u0a1a_\u0a05\u0a2a\u0a4d\u0a30\u0a48\u0a32_\u0a2e\u0a08_\u0a1c\u0a42\u0a28_\u0a1c\u0a41\u0a32\u0a3e\u0a08_\u0a05\u0a17\u0a38\u0a24_\u0a38\u0a24\u0a70\u0a2c\u0a30_\u0a05\u0a15\u0a24\u0a42\u0a2c\u0a30_\u0a28\u0a35\u0a70\u0a2c\u0a30_\u0a26\u0a38\u0a70\u0a2c\u0a30".split("_"),monthsShort:"\u0a1c\u0a28\u0a35\u0a30\u0a40_\u0a2b\u0a3c\u0a30\u0a35\u0a30\u0a40_\u0a2e\u0a3e\u0a30\u0a1a_\u0a05\u0a2a\u0a4d\u0a30\u0a48\u0a32_\u0a2e\u0a08_\u0a1c\u0a42\u0a28_\u0a1c\u0a41\u0a32\u0a3e\u0a08_\u0a05\u0a17\u0a38\u0a24_\u0a38\u0a24\u0a70\u0a2c\u0a30_\u0a05\u0a15\u0a24\u0a42\u0a2c\u0a30_\u0a28\u0a35\u0a70\u0a2c\u0a30_\u0a26\u0a38\u0a70\u0a2c\u0a30".split("_"),weekdays:"\u0a10\u0a24\u0a35\u0a3e\u0a30_\u0a38\u0a4b\u0a2e\u0a35\u0a3e\u0a30_\u0a2e\u0a70\u0a17\u0a32\u0a35\u0a3e\u0a30_\u0a2c\u0a41\u0a27\u0a35\u0a3e\u0a30_\u0a35\u0a40\u0a30\u0a35\u0a3e\u0a30_\u0a38\u0a3c\u0a41\u0a71\u0a15\u0a30\u0a35\u0a3e\u0a30_\u0a38\u0a3c\u0a28\u0a40\u0a1a\u0a30\u0a35\u0a3e\u0a30".split("_"),weekdaysShort:"\u0a10\u0a24_\u0a38\u0a4b\u0a2e_\u0a2e\u0a70\u0a17\u0a32_\u0a2c\u0a41\u0a27_\u0a35\u0a40\u0a30_\u0a38\u0a3c\u0a41\u0a15\u0a30_\u0a38\u0a3c\u0a28\u0a40".split("_"),weekdaysMin:"\u0a10\u0a24_\u0a38\u0a4b\u0a2e_\u0a2e\u0a70\u0a17\u0a32_\u0a2c\u0a41\u0a27_\u0a35\u0a40\u0a30_\u0a38\u0a3c\u0a41\u0a15\u0a30_\u0a38\u0a3c\u0a28\u0a40".split("_"),longDateFormat:{LT:"A h:mm \u0a35\u0a1c\u0a47",LTS:"A h:mm:ss \u0a35\u0a1c\u0a47",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm \u0a35\u0a1c\u0a47",LLLL:"dddd, D MMMM YYYY, A h:mm \u0a35\u0a1c\u0a47"},calendar:{sameDay:"[\u0a05\u0a1c] LT",nextDay:"[\u0a15\u0a32] LT",nextWeek:"[\u0a05\u0a17\u0a32\u0a3e] dddd, LT",lastDay:"[\u0a15\u0a32] LT",lastWeek:"[\u0a2a\u0a3f\u0a1b\u0a32\u0a47] dddd, LT",sameElse:"L"},relativeTime:{future:"%s \u0a35\u0a3f\u0a71\u0a1a",past:"%s \u0a2a\u0a3f\u0a1b\u0a32\u0a47",s:"\u0a15\u0a41\u0a1d \u0a38\u0a15\u0a3f\u0a70\u0a1f",ss:"%d \u0a38\u0a15\u0a3f\u0a70\u0a1f",m:"\u0a07\u0a15 \u0a2e\u0a3f\u0a70\u0a1f",mm:"%d \u0a2e\u0a3f\u0a70\u0a1f",h:"\u0a07\u0a71\u0a15 \u0a18\u0a70\u0a1f\u0a3e",hh:"%d \u0a18\u0a70\u0a1f\u0a47",d:"\u0a07\u0a71\u0a15 \u0a26\u0a3f\u0a28",dd:"%d \u0a26\u0a3f\u0a28",M:"\u0a07\u0a71\u0a15 \u0a2e\u0a39\u0a40\u0a28\u0a3e",MM:"%d \u0a2e\u0a39\u0a40\u0a28\u0a47",y:"\u0a07\u0a71\u0a15 \u0a38\u0a3e\u0a32",yy:"%d \u0a38\u0a3e\u0a32"},preparse:function(e){return e.replace(/[\u0a67\u0a68\u0a69\u0a6a\u0a6b\u0a6c\u0a6d\u0a6e\u0a6f\u0a66]/g,function(e){return Cn[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return Rn[e]})},meridiemParse:/\u0a30\u0a3e\u0a24|\u0a38\u0a35\u0a47\u0a30|\u0a26\u0a41\u0a2a\u0a39\u0a3f\u0a30|\u0a38\u0a3c\u0a3e\u0a2e/,meridiemHour:function(e,a){return 12===e&&(e=0),"\u0a30\u0a3e\u0a24"===a?e<4?e:e+12:"\u0a38\u0a35\u0a47\u0a30"===a?e:"\u0a26\u0a41\u0a2a\u0a39\u0a3f\u0a30"===a?10<=e?e:e+12:"\u0a38\u0a3c\u0a3e\u0a2e"===a?e+12:void 0},meridiem:function(e,a,t){return e<4?"\u0a30\u0a3e\u0a24":e<10?"\u0a38\u0a35\u0a47\u0a30":e<17?"\u0a26\u0a41\u0a2a\u0a39\u0a3f\u0a30":e<20?"\u0a38\u0a3c\u0a3e\u0a2e":"\u0a30\u0a3e\u0a24"},week:{dow:0,doy:6}});var In="stycze\u0144_luty_marzec_kwiecie\u0144_maj_czerwiec_lipiec_sierpie\u0144_wrzesie\u0144_pa\u017adziernik_listopad_grudzie\u0144".split("_"),Un="stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_wrze\u015bnia_pa\u017adziernika_listopada_grudnia".split("_");function Gn(e){return e%10<5&&1<e%10&&~~(e/10)%10!=1}function Vn(e,a,t){var s=e+" ";switch(t){case"ss":return s+(Gn(e)?"sekundy":"sekund");case"m":return a?"minuta":"minut\u0119";case"mm":return s+(Gn(e)?"minuty":"minut");case"h":return a?"godzina":"godzin\u0119";case"hh":return s+(Gn(e)?"godziny":"godzin");case"MM":return s+(Gn(e)?"miesi\u0105ce":"miesi\u0119cy");case"yy":return s+(Gn(e)?"lata":"lat")}}function Kn(e,a,t){var s=" ";return(20<=e%100||100<=e&&e%100==0)&&(s=" de "),e+s+{ss:"secunde",mm:"minute",hh:"ore",dd:"zile",MM:"luni",yy:"ani"}[t]}function Zn(e,a,t){var s,n;return"m"===t?a?"\u043c\u0438\u043d\u0443\u0442\u0430":"\u043c\u0438\u043d\u0443\u0442\u0443":e+" "+(s=+e,n={ss:a?"\u0441\u0435\u043a\u0443\u043d\u0434\u0430_\u0441\u0435\u043a\u0443\u043d\u0434\u044b_\u0441\u0435\u043a\u0443\u043d\u0434":"\u0441\u0435\u043a\u0443\u043d\u0434\u0443_\u0441\u0435\u043a\u0443\u043d\u0434\u044b_\u0441\u0435\u043a\u0443\u043d\u0434",mm:a?"\u043c\u0438\u043d\u0443\u0442\u0430_\u043c\u0438\u043d\u0443\u0442\u044b_\u043c\u0438\u043d\u0443\u0442":"\u043c\u0438\u043d\u0443\u0442\u0443_\u043c\u0438\u043d\u0443\u0442\u044b_\u043c\u0438\u043d\u0443\u0442",hh:"\u0447\u0430\u0441_\u0447\u0430\u0441\u0430_\u0447\u0430\u0441\u043e\u0432",dd:"\u0434\u0435\u043d\u044c_\u0434\u043d\u044f_\u0434\u043d\u0435\u0439",MM:"\u043c\u0435\u0441\u044f\u0446_\u043c\u0435\u0441\u044f\u0446\u0430_\u043c\u0435\u0441\u044f\u0446\u0435\u0432",yy:"\u0433\u043e\u0434_\u0433\u043e\u0434\u0430_\u043b\u0435\u0442"}[t].split("_"),s%10==1&&s%100!=11?n[0]:2<=s%10&&s%10<=4&&(s%100<10||20<=s%100)?n[1]:n[2])}l.defineLocale("pl",{months:function(e,a){return e?""===a?"("+Un[e.month()]+"|"+In[e.month()]+")":/D MMMM/.test(a)?Un[e.month()]:In[e.month()]:In},monthsShort:"sty_lut_mar_kwi_maj_cze_lip_sie_wrz_pa\u017a_lis_gru".split("_"),weekdays:"niedziela_poniedzia\u0142ek_wtorek_\u015broda_czwartek_pi\u0105tek_sobota".split("_"),weekdaysShort:"ndz_pon_wt_\u015br_czw_pt_sob".split("_"),weekdaysMin:"Nd_Pn_Wt_\u015ar_Cz_Pt_So".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Dzi\u015b o] LT",nextDay:"[Jutro o] LT",nextWeek:function(){switch(this.day()){case 0:return"[W niedziel\u0119 o] LT";case 2:return"[We wtorek o] LT";case 3:return"[W \u015brod\u0119 o] LT";case 6:return"[W sobot\u0119 o] LT";default:return"[W] dddd [o] LT"}},lastDay:"[Wczoraj o] LT",lastWeek:function(){switch(this.day()){case 0:return"[W zesz\u0142\u0105 niedziel\u0119 o] LT";case 3:return"[W zesz\u0142\u0105 \u015brod\u0119 o] LT";case 6:return"[W zesz\u0142\u0105 sobot\u0119 o] LT";default:return"[W zesz\u0142y] dddd [o] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"%s temu",s:"kilka sekund",ss:Vn,m:Vn,mm:Vn,h:Vn,hh:Vn,d:"1 dzie\u0144",dd:"%d dni",M:"miesi\u0105c",MM:Vn,y:"rok",yy:Vn},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),l.defineLocale("pt-br",{months:"Janeiro_Fevereiro_Mar\xe7o_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),monthsShort:"Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),weekdays:"Domingo_Segunda-feira_Ter\xe7a-feira_Quarta-feira_Quinta-feira_Sexta-feira_S\xe1bado".split("_"),weekdaysShort:"Dom_Seg_Ter_Qua_Qui_Sex_S\xe1b".split("_"),weekdaysMin:"Do_2\xaa_3\xaa_4\xaa_5\xaa_6\xaa_S\xe1".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY [\xe0s] HH:mm",LLLL:"dddd, D [de] MMMM [de] YYYY [\xe0s] HH:mm"},calendar:{sameDay:"[Hoje \xe0s] LT",nextDay:"[Amanh\xe3 \xe0s] LT",nextWeek:"dddd [\xe0s] LT",lastDay:"[Ontem \xe0s] LT",lastWeek:function(){return 0===this.day()||6===this.day()?"[\xdaltimo] dddd [\xe0s] LT":"[\xdaltima] dddd [\xe0s] LT"},sameElse:"L"},relativeTime:{future:"em %s",past:"h\xe1 %s",s:"poucos segundos",ss:"%d segundos",m:"um minuto",mm:"%d minutos",h:"uma hora",hh:"%d horas",d:"um dia",dd:"%d dias",M:"um m\xeas",MM:"%d meses",y:"um ano",yy:"%d anos"},dayOfMonthOrdinalParse:/\d{1,2}\xba/,ordinal:"%d\xba"}),l.defineLocale("pt",{months:"Janeiro_Fevereiro_Mar\xe7o_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),monthsShort:"Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),weekdays:"Domingo_Segunda-feira_Ter\xe7a-feira_Quarta-feira_Quinta-feira_Sexta-feira_S\xe1bado".split("_"),weekdaysShort:"Dom_Seg_Ter_Qua_Qui_Sex_S\xe1b".split("_"),weekdaysMin:"Do_2\xaa_3\xaa_4\xaa_5\xaa_6\xaa_S\xe1".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY HH:mm",LLLL:"dddd, D [de] MMMM [de] YYYY HH:mm"},calendar:{sameDay:"[Hoje \xe0s] LT",nextDay:"[Amanh\xe3 \xe0s] LT",nextWeek:"dddd [\xe0s] LT",lastDay:"[Ontem \xe0s] LT",lastWeek:function(){return 0===this.day()||6===this.day()?"[\xdaltimo] dddd [\xe0s] LT":"[\xdaltima] dddd [\xe0s] LT"},sameElse:"L"},relativeTime:{future:"em %s",past:"h\xe1 %s",s:"segundos",ss:"%d segundos",m:"um minuto",mm:"%d minutos",h:"uma hora",hh:"%d horas",d:"um dia",dd:"%d dias",M:"um m\xeas",MM:"%d meses",y:"um ano",yy:"%d anos"},dayOfMonthOrdinalParse:/\d{1,2}\xba/,ordinal:"%d\xba",week:{dow:1,doy:4}}),l.defineLocale("ro",{months:"ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie".split("_"),monthsShort:"ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.".split("_"),monthsParseExact:!0,weekdays:"duminic\u0103_luni_mar\u021bi_miercuri_joi_vineri_s\xe2mb\u0103t\u0103".split("_"),weekdaysShort:"Dum_Lun_Mar_Mie_Joi_Vin_S\xe2m".split("_"),weekdaysMin:"Du_Lu_Ma_Mi_Jo_Vi_S\xe2".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY H:mm",LLLL:"dddd, D MMMM YYYY H:mm"},calendar:{sameDay:"[azi la] LT",nextDay:"[m\xe2ine la] LT",nextWeek:"dddd [la] LT",lastDay:"[ieri la] LT",lastWeek:"[fosta] dddd [la] LT",sameElse:"L"},relativeTime:{future:"peste %s",past:"%s \xeen urm\u0103",s:"c\xe2teva secunde",ss:Kn,m:"un minut",mm:Kn,h:"o or\u0103",hh:Kn,d:"o zi",dd:Kn,M:"o lun\u0103",MM:Kn,y:"un an",yy:Kn},week:{dow:1,doy:7}});var $n=[/^\u044f\u043d\u0432/i,/^\u0444\u0435\u0432/i,/^\u043c\u0430\u0440/i,/^\u0430\u043f\u0440/i,/^\u043c\u0430[\u0439\u044f]/i,/^\u0438\u044e\u043d/i,/^\u0438\u044e\u043b/i,/^\u0430\u0432\u0433/i,/^\u0441\u0435\u043d/i,/^\u043e\u043a\u0442/i,/^\u043d\u043e\u044f/i,/^\u0434\u0435\u043a/i];l.defineLocale("ru",{months:{format:"\u044f\u043d\u0432\u0430\u0440\u044f_\u0444\u0435\u0432\u0440\u0430\u043b\u044f_\u043c\u0430\u0440\u0442\u0430_\u0430\u043f\u0440\u0435\u043b\u044f_\u043c\u0430\u044f_\u0438\u044e\u043d\u044f_\u0438\u044e\u043b\u044f_\u0430\u0432\u0433\u0443\u0441\u0442\u0430_\u0441\u0435\u043d\u0442\u044f\u0431\u0440\u044f_\u043e\u043a\u0442\u044f\u0431\u0440\u044f_\u043d\u043e\u044f\u0431\u0440\u044f_\u0434\u0435\u043a\u0430\u0431\u0440\u044f".split("_"),standalone:"\u044f\u043d\u0432\u0430\u0440\u044c_\u0444\u0435\u0432\u0440\u0430\u043b\u044c_\u043c\u0430\u0440\u0442_\u0430\u043f\u0440\u0435\u043b\u044c_\u043c\u0430\u0439_\u0438\u044e\u043d\u044c_\u0438\u044e\u043b\u044c_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043d\u0442\u044f\u0431\u0440\u044c_\u043e\u043a\u0442\u044f\u0431\u0440\u044c_\u043d\u043e\u044f\u0431\u0440\u044c_\u0434\u0435\u043a\u0430\u0431\u0440\u044c".split("_")},monthsShort:{format:"\u044f\u043d\u0432._\u0444\u0435\u0432\u0440._\u043c\u0430\u0440._\u0430\u043f\u0440._\u043c\u0430\u044f_\u0438\u044e\u043d\u044f_\u0438\u044e\u043b\u044f_\u0430\u0432\u0433._\u0441\u0435\u043d\u0442._\u043e\u043a\u0442._\u043d\u043e\u044f\u0431._\u0434\u0435\u043a.".split("_"),standalone:"\u044f\u043d\u0432._\u0444\u0435\u0432\u0440._\u043c\u0430\u0440\u0442_\u0430\u043f\u0440._\u043c\u0430\u0439_\u0438\u044e\u043d\u044c_\u0438\u044e\u043b\u044c_\u0430\u0432\u0433._\u0441\u0435\u043d\u0442._\u043e\u043a\u0442._\u043d\u043e\u044f\u0431._\u0434\u0435\u043a.".split("_")},weekdays:{standalone:"\u0432\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435_\u043f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a_\u0432\u0442\u043e\u0440\u043d\u0438\u043a_\u0441\u0440\u0435\u0434\u0430_\u0447\u0435\u0442\u0432\u0435\u0440\u0433_\u043f\u044f\u0442\u043d\u0438\u0446\u0430_\u0441\u0443\u0431\u0431\u043e\u0442\u0430".split("_"),format:"\u0432\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435_\u043f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a_\u0432\u0442\u043e\u0440\u043d\u0438\u043a_\u0441\u0440\u0435\u0434\u0443_\u0447\u0435\u0442\u0432\u0435\u0440\u0433_\u043f\u044f\u0442\u043d\u0438\u0446\u0443_\u0441\u0443\u0431\u0431\u043e\u0442\u0443".split("_"),isFormat:/\[ ?[\u0412\u0432] ?(?:\u043f\u0440\u043e\u0448\u043b\u0443\u044e|\u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0443\u044e|\u044d\u0442\u0443)? ?\] ?dddd/},weekdaysShort:"\u0432\u0441_\u043f\u043d_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043f\u0442_\u0441\u0431".split("_"),weekdaysMin:"\u0432\u0441_\u043f\u043d_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043f\u0442_\u0441\u0431".split("_"),monthsParse:$n,longMonthsParse:$n,shortMonthsParse:$n,monthsRegex:/^(\u044f\u043d\u0432\u0430\u0440[\u044c\u044f]|\u044f\u043d\u0432\.?|\u0444\u0435\u0432\u0440\u0430\u043b[\u044c\u044f]|\u0444\u0435\u0432\u0440?\.?|\u043c\u0430\u0440\u0442\u0430?|\u043c\u0430\u0440\.?|\u0430\u043f\u0440\u0435\u043b[\u044c\u044f]|\u0430\u043f\u0440\.?|\u043c\u0430[\u0439\u044f]|\u0438\u044e\u043d[\u044c\u044f]|\u0438\u044e\u043d\.?|\u0438\u044e\u043b[\u044c\u044f]|\u0438\u044e\u043b\.?|\u0430\u0432\u0433\u0443\u0441\u0442\u0430?|\u0430\u0432\u0433\.?|\u0441\u0435\u043d\u0442\u044f\u0431\u0440[\u044c\u044f]|\u0441\u0435\u043d\u0442?\.?|\u043e\u043a\u0442\u044f\u0431\u0440[\u044c\u044f]|\u043e\u043a\u0442\.?|\u043d\u043e\u044f\u0431\u0440[\u044c\u044f]|\u043d\u043e\u044f\u0431?\.?|\u0434\u0435\u043a\u0430\u0431\u0440[\u044c\u044f]|\u0434\u0435\u043a\.?)/i,monthsShortRegex:/^(\u044f\u043d\u0432\u0430\u0440[\u044c\u044f]|\u044f\u043d\u0432\.?|\u0444\u0435\u0432\u0440\u0430\u043b[\u044c\u044f]|\u0444\u0435\u0432\u0440?\.?|\u043c\u0430\u0440\u0442\u0430?|\u043c\u0430\u0440\.?|\u0430\u043f\u0440\u0435\u043b[\u044c\u044f]|\u0430\u043f\u0440\.?|\u043c\u0430[\u0439\u044f]|\u0438\u044e\u043d[\u044c\u044f]|\u0438\u044e\u043d\.?|\u0438\u044e\u043b[\u044c\u044f]|\u0438\u044e\u043b\.?|\u0430\u0432\u0433\u0443\u0441\u0442\u0430?|\u0430\u0432\u0433\.?|\u0441\u0435\u043d\u0442\u044f\u0431\u0440[\u044c\u044f]|\u0441\u0435\u043d\u0442?\.?|\u043e\u043a\u0442\u044f\u0431\u0440[\u044c\u044f]|\u043e\u043a\u0442\.?|\u043d\u043e\u044f\u0431\u0440[\u044c\u044f]|\u043d\u043e\u044f\u0431?\.?|\u0434\u0435\u043a\u0430\u0431\u0440[\u044c\u044f]|\u0434\u0435\u043a\.?)/i,monthsStrictRegex:/^(\u044f\u043d\u0432\u0430\u0440[\u044f\u044c]|\u0444\u0435\u0432\u0440\u0430\u043b[\u044f\u044c]|\u043c\u0430\u0440\u0442\u0430?|\u0430\u043f\u0440\u0435\u043b[\u044f\u044c]|\u043c\u0430[\u044f\u0439]|\u0438\u044e\u043d[\u044f\u044c]|\u0438\u044e\u043b[\u044f\u044c]|\u0430\u0432\u0433\u0443\u0441\u0442\u0430?|\u0441\u0435\u043d\u0442\u044f\u0431\u0440[\u044f\u044c]|\u043e\u043a\u0442\u044f\u0431\u0440[\u044f\u044c]|\u043d\u043e\u044f\u0431\u0440[\u044f\u044c]|\u0434\u0435\u043a\u0430\u0431\u0440[\u044f\u044c])/i,monthsShortStrictRegex:/^(\u044f\u043d\u0432\.|\u0444\u0435\u0432\u0440?\.|\u043c\u0430\u0440[\u0442.]|\u0430\u043f\u0440\.|\u043c\u0430[\u044f\u0439]|\u0438\u044e\u043d[\u044c\u044f.]|\u0438\u044e\u043b[\u044c\u044f.]|\u0430\u0432\u0433\.|\u0441\u0435\u043d\u0442?\.|\u043e\u043a\u0442\.|\u043d\u043e\u044f\u0431?\.|\u0434\u0435\u043a\.)/i,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY \u0433.",LLL:"D MMMM YYYY \u0433., H:mm",LLLL:"dddd, D MMMM YYYY \u0433., H:mm"},calendar:{sameDay:"[\u0421\u0435\u0433\u043e\u0434\u043d\u044f, \u0432] LT",nextDay:"[\u0417\u0430\u0432\u0442\u0440\u0430, \u0432] LT",lastDay:"[\u0412\u0447\u0435\u0440\u0430, \u0432] LT",nextWeek:function(e){if(e.week()===this.week())return 2===this.day()?"[\u0412\u043e] dddd, [\u0432] LT":"[\u0412] dddd, [\u0432] LT";switch(this.day()){case 0:return"[\u0412 \u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0435\u0435] dddd, [\u0432] LT";case 1:case 2:case 4:return"[\u0412 \u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0438\u0439] dddd, [\u0432] LT";case 3:case 5:case 6:return"[\u0412 \u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0443\u044e] dddd, [\u0432] LT"}},lastWeek:function(e){if(e.week()===this.week())return 2===this.day()?"[\u0412\u043e] dddd, [\u0432] LT":"[\u0412] dddd, [\u0432] LT";switch(this.day()){case 0:return"[\u0412 \u043f\u0440\u043e\u0448\u043b\u043e\u0435] dddd, [\u0432] LT";case 1:case 2:case 4:return"[\u0412 \u043f\u0440\u043e\u0448\u043b\u044b\u0439] dddd, [\u0432] LT";case 3:case 5:case 6:return"[\u0412 \u043f\u0440\u043e\u0448\u043b\u0443\u044e] dddd, [\u0432] LT"}},sameElse:"L"},relativeTime:{future:"\u0447\u0435\u0440\u0435\u0437 %s",past:"%s \u043d\u0430\u0437\u0430\u0434",s:"\u043d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u043e \u0441\u0435\u043a\u0443\u043d\u0434",ss:Zn,m:Zn,mm:Zn,h:"\u0447\u0430\u0441",hh:Zn,d:"\u0434\u0435\u043d\u044c",dd:Zn,M:"\u043c\u0435\u0441\u044f\u0446",MM:Zn,y:"\u0433\u043e\u0434",yy:Zn},meridiemParse:/\u043d\u043e\u0447\u0438|\u0443\u0442\u0440\u0430|\u0434\u043d\u044f|\u0432\u0435\u0447\u0435\u0440\u0430/i,isPM:function(e){return/^(\u0434\u043d\u044f|\u0432\u0435\u0447\u0435\u0440\u0430)$/.test(e)},meridiem:function(e,a,t){return e<4?"\u043d\u043e\u0447\u0438":e<12?"\u0443\u0442\u0440\u0430":e<17?"\u0434\u043d\u044f":"\u0432\u0435\u0447\u0435\u0440\u0430"},dayOfMonthOrdinalParse:/\d{1,2}-(\u0439|\u0433\u043e|\u044f)/,ordinal:function(e,a){switch(a){case"M":case"d":case"DDD":return e+"-\u0439";case"D":return e+"-\u0433\u043e";case"w":case"W":return e+"-\u044f";default:return e}},week:{dow:1,doy:4}});var Bn=["\u062c\u0646\u0648\u0631\u064a","\u0641\u064a\u0628\u0631\u0648\u0631\u064a","\u0645\u0627\u0631\u0686","\u0627\u067e\u0631\u064a\u0644","\u0645\u0626\u064a","\u062c\u0648\u0646","\u062c\u0648\u0644\u0627\u0621\u0650","\u0622\u06af\u0633\u067d","\u0633\u064a\u067e\u067d\u0645\u0628\u0631","\u0622\u06aa\u067d\u0648\u0628\u0631","\u0646\u0648\u0645\u0628\u0631","\u068a\u0633\u0645\u0628\u0631"],qn=["\u0622\u0686\u0631","\u0633\u0648\u0645\u0631","\u0627\u06b1\u0627\u0631\u0648","\u0627\u0631\u0628\u0639","\u062e\u0645\u064a\u0633","\u062c\u0645\u0639","\u0687\u0646\u0687\u0631"];l.defineLocale("sd",{months:Bn,monthsShort:Bn,weekdays:qn,weekdaysShort:qn,weekdaysMin:qn,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd\u060c D MMMM YYYY HH:mm"},meridiemParse:/\u0635\u0628\u062d|\u0634\u0627\u0645/,isPM:function(e){return"\u0634\u0627\u0645"===e},meridiem:function(e,a,t){return e<12?"\u0635\u0628\u062d":"\u0634\u0627\u0645"},calendar:{sameDay:"[\u0627\u0684] LT",nextDay:"[\u0633\u0680\u0627\u06bb\u064a] LT",nextWeek:"dddd [\u0627\u06b3\u064a\u0646 \u0647\u0641\u062a\u064a \u062a\u064a] LT",lastDay:"[\u06aa\u0627\u0644\u0647\u0647] LT",lastWeek:"[\u06af\u0632\u0631\u064a\u0644 \u0647\u0641\u062a\u064a] dddd [\u062a\u064a] LT",sameElse:"L"},relativeTime:{future:"%s \u067e\u0648\u0621",past:"%s \u0627\u06b3",s:"\u0686\u0646\u062f \u0633\u064a\u06aa\u0646\u068a",ss:"%d \u0633\u064a\u06aa\u0646\u068a",m:"\u0647\u06aa \u0645\u0646\u067d",mm:"%d \u0645\u0646\u067d",h:"\u0647\u06aa \u06aa\u0644\u0627\u06aa",hh:"%d \u06aa\u0644\u0627\u06aa",d:"\u0647\u06aa \u068f\u064a\u0646\u0647\u0646",dd:"%d \u068f\u064a\u0646\u0647\u0646",M:"\u0647\u06aa \u0645\u0647\u064a\u0646\u0648",MM:"%d \u0645\u0647\u064a\u0646\u0627",y:"\u0647\u06aa \u0633\u0627\u0644",yy:"%d \u0633\u0627\u0644"},preparse:function(e){return e.replace(/\u060c/g,",")},postformat:function(e){return e.replace(/,/g,"\u060c")},week:{dow:1,doy:4}}),l.defineLocale("se",{months:"o\u0111\u0111ajagem\xe1nnu_guovvam\xe1nnu_njuk\u010dam\xe1nnu_cuo\u014bom\xe1nnu_miessem\xe1nnu_geassem\xe1nnu_suoidnem\xe1nnu_borgem\xe1nnu_\u010dak\u010dam\xe1nnu_golggotm\xe1nnu_sk\xe1bmam\xe1nnu_juovlam\xe1nnu".split("_"),monthsShort:"o\u0111\u0111j_guov_njuk_cuo_mies_geas_suoi_borg_\u010dak\u010d_golg_sk\xe1b_juov".split("_"),weekdays:"sotnabeaivi_vuoss\xe1rga_ma\u014b\u014beb\xe1rga_gaskavahkku_duorastat_bearjadat_l\xe1vvardat".split("_"),weekdaysShort:"sotn_vuos_ma\u014b_gask_duor_bear_l\xe1v".split("_"),weekdaysMin:"s_v_m_g_d_b_L".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"MMMM D. [b.] YYYY",LLL:"MMMM D. [b.] YYYY [ti.] HH:mm",LLLL:"dddd, MMMM D. [b.] YYYY [ti.] HH:mm"},calendar:{sameDay:"[otne ti] LT",nextDay:"[ihttin ti] LT",nextWeek:"dddd [ti] LT",lastDay:"[ikte ti] LT",lastWeek:"[ovddit] dddd [ti] LT",sameElse:"L"},relativeTime:{future:"%s gea\u017ees",past:"ma\u014bit %s",s:"moadde sekunddat",ss:"%d sekunddat",m:"okta minuhta",mm:"%d minuhtat",h:"okta diimmu",hh:"%d diimmut",d:"okta beaivi",dd:"%d beaivvit",M:"okta m\xe1nnu",MM:"%d m\xe1nut",y:"okta jahki",yy:"%d jagit"},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),l.defineLocale("si",{months:"\u0da2\u0db1\u0dc0\u0dcf\u0dbb\u0dd2_\u0db4\u0dd9\u0db6\u0dbb\u0dc0\u0dcf\u0dbb\u0dd2_\u0db8\u0dcf\u0dbb\u0dca\u0dad\u0dd4_\u0d85\u0db4\u0dca\u200d\u0dbb\u0dda\u0dbd\u0dca_\u0db8\u0dd0\u0dba\u0dd2_\u0da2\u0dd6\u0db1\u0dd2_\u0da2\u0dd6\u0dbd\u0dd2_\u0d85\u0d9c\u0ddd\u0dc3\u0dca\u0dad\u0dd4_\u0dc3\u0dd0\u0db4\u0dca\u0dad\u0dd0\u0db8\u0dca\u0db6\u0dbb\u0dca_\u0d94\u0d9a\u0dca\u0dad\u0ddd\u0db6\u0dbb\u0dca_\u0db1\u0ddc\u0dc0\u0dd0\u0db8\u0dca\u0db6\u0dbb\u0dca_\u0daf\u0dd9\u0dc3\u0dd0\u0db8\u0dca\u0db6\u0dbb\u0dca".split("_"),monthsShort:"\u0da2\u0db1_\u0db4\u0dd9\u0db6_\u0db8\u0dcf\u0dbb\u0dca_\u0d85\u0db4\u0dca_\u0db8\u0dd0\u0dba\u0dd2_\u0da2\u0dd6\u0db1\u0dd2_\u0da2\u0dd6\u0dbd\u0dd2_\u0d85\u0d9c\u0ddd_\u0dc3\u0dd0\u0db4\u0dca_\u0d94\u0d9a\u0dca_\u0db1\u0ddc\u0dc0\u0dd0_\u0daf\u0dd9\u0dc3\u0dd0".split("_"),weekdays:"\u0d89\u0dbb\u0dd2\u0daf\u0dcf_\u0dc3\u0db3\u0dd4\u0daf\u0dcf_\u0d85\u0d9f\u0dc4\u0dbb\u0dd4\u0dc0\u0dcf\u0daf\u0dcf_\u0db6\u0daf\u0dcf\u0daf\u0dcf_\u0db6\u0dca\u200d\u0dbb\u0dc4\u0dc3\u0dca\u0db4\u0dad\u0dd2\u0db1\u0dca\u0daf\u0dcf_\u0dc3\u0dd2\u0d9a\u0dd4\u0dbb\u0dcf\u0daf\u0dcf_\u0dc3\u0dd9\u0db1\u0dc3\u0dd4\u0dbb\u0dcf\u0daf\u0dcf".split("_"),weekdaysShort:"\u0d89\u0dbb\u0dd2_\u0dc3\u0db3\u0dd4_\u0d85\u0d9f_\u0db6\u0daf\u0dcf_\u0db6\u0dca\u200d\u0dbb\u0dc4_\u0dc3\u0dd2\u0d9a\u0dd4_\u0dc3\u0dd9\u0db1".split("_"),weekdaysMin:"\u0d89_\u0dc3_\u0d85_\u0db6_\u0db6\u0dca\u200d\u0dbb_\u0dc3\u0dd2_\u0dc3\u0dd9".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"a h:mm",LTS:"a h:mm:ss",L:"YYYY/MM/DD",LL:"YYYY MMMM D",LLL:"YYYY MMMM D, a h:mm",LLLL:"YYYY MMMM D [\u0dc0\u0dd0\u0db1\u0dd2] dddd, a h:mm:ss"},calendar:{sameDay:"[\u0d85\u0daf] LT[\u0da7]",nextDay:"[\u0dc4\u0dd9\u0da7] LT[\u0da7]",nextWeek:"dddd LT[\u0da7]",lastDay:"[\u0d8a\u0dba\u0dda] LT[\u0da7]",lastWeek:"[\u0db4\u0dc3\u0dd4\u0d9c\u0dd2\u0dba] dddd LT[\u0da7]",sameElse:"L"},relativeTime:{future:"%s\u0d9a\u0dd2\u0db1\u0dca",past:"%s\u0d9a\u0da7 \u0db4\u0dd9\u0dbb",s:"\u0dad\u0dad\u0dca\u0db4\u0dbb \u0d9a\u0dd2\u0dc4\u0dd2\u0db4\u0dba",ss:"\u0dad\u0dad\u0dca\u0db4\u0dbb %d",m:"\u0db8\u0dd2\u0db1\u0dd2\u0dad\u0dca\u0dad\u0dd4\u0dc0",mm:"\u0db8\u0dd2\u0db1\u0dd2\u0dad\u0dca\u0dad\u0dd4 %d",h:"\u0db4\u0dd0\u0dba",hh:"\u0db4\u0dd0\u0dba %d",d:"\u0daf\u0dd2\u0db1\u0dba",dd:"\u0daf\u0dd2\u0db1 %d",M:"\u0db8\u0dcf\u0dc3\u0dba",MM:"\u0db8\u0dcf\u0dc3 %d",y:"\u0dc0\u0dc3\u0dbb",yy:"\u0dc0\u0dc3\u0dbb %d"},dayOfMonthOrdinalParse:/\d{1,2} \u0dc0\u0dd0\u0db1\u0dd2/,ordinal:function(e){return e+" \u0dc0\u0dd0\u0db1\u0dd2"},meridiemParse:/\u0db4\u0dd9\u0dbb \u0dc0\u0dbb\u0dd4|\u0db4\u0dc3\u0dca \u0dc0\u0dbb\u0dd4|\u0db4\u0dd9.\u0dc0|\u0db4.\u0dc0./,isPM:function(e){return"\u0db4.\u0dc0."===e||"\u0db4\u0dc3\u0dca \u0dc0\u0dbb\u0dd4"===e},meridiem:function(e,a,t){return 11<e?t?"\u0db4.\u0dc0.":"\u0db4\u0dc3\u0dca \u0dc0\u0dbb\u0dd4":t?"\u0db4\u0dd9.\u0dc0.":"\u0db4\u0dd9\u0dbb \u0dc0\u0dbb\u0dd4"}});var Qn="janu\xe1r_febru\xe1r_marec_apr\xedl_m\xe1j_j\xfan_j\xfal_august_september_okt\xf3ber_november_december".split("_"),Xn="jan_feb_mar_apr_m\xe1j_j\xfan_j\xfal_aug_sep_okt_nov_dec".split("_");function ed(e){return 1<e&&e<5}function ad(e,a,t,s){var n=e+" ";switch(t){case"s":return a||s?"p\xe1r sek\xfand":"p\xe1r sekundami";case"ss":return a||s?n+(ed(e)?"sekundy":"sek\xfand"):n+"sekundami";break;case"m":return a?"min\xfata":s?"min\xfatu":"min\xfatou";case"mm":return a||s?n+(ed(e)?"min\xfaty":"min\xfat"):n+"min\xfatami";break;case"h":return a?"hodina":s?"hodinu":"hodinou";case"hh":return a||s?n+(ed(e)?"hodiny":"hod\xedn"):n+"hodinami";break;case"d":return a||s?"de\u0148":"d\u0148om";case"dd":return a||s?n+(ed(e)?"dni":"dn\xed"):n+"d\u0148ami";break;case"M":return a||s?"mesiac":"mesiacom";case"MM":return a||s?n+(ed(e)?"mesiace":"mesiacov"):n+"mesiacmi";break;case"y":return a||s?"rok":"rokom";case"yy":return a||s?n+(ed(e)?"roky":"rokov"):n+"rokmi";break}}function td(e,a,t,s){var n=e+" ";switch(t){case"s":return a||s?"nekaj sekund":"nekaj sekundami";case"ss":return n+=1===e?a?"sekundo":"sekundi":2===e?a||s?"sekundi":"sekundah":e<5?a||s?"sekunde":"sekundah":"sekund";case"m":return a?"ena minuta":"eno minuto";case"mm":return n+=1===e?a?"minuta":"minuto":2===e?a||s?"minuti":"minutama":e<5?a||s?"minute":"minutami":a||s?"minut":"minutami";case"h":return a?"ena ura":"eno uro";case"hh":return n+=1===e?a?"ura":"uro":2===e?a||s?"uri":"urama":e<5?a||s?"ure":"urami":a||s?"ur":"urami";case"d":return a||s?"en dan":"enim dnem";case"dd":return n+=1===e?a||s?"dan":"dnem":2===e?a||s?"dni":"dnevoma":a||s?"dni":"dnevi";case"M":return a||s?"en mesec":"enim mesecem";case"MM":return n+=1===e?a||s?"mesec":"mesecem":2===e?a||s?"meseca":"mesecema":e<5?a||s?"mesece":"meseci":a||s?"mesecev":"meseci";case"y":return a||s?"eno leto":"enim letom";case"yy":return n+=1===e?a||s?"leto":"letom":2===e?a||s?"leti":"letoma":e<5?a||s?"leta":"leti":a||s?"let":"leti"}}l.defineLocale("sk",{months:Qn,monthsShort:Xn,weekdays:"nede\u013ea_pondelok_utorok_streda_\u0161tvrtok_piatok_sobota".split("_"),weekdaysShort:"ne_po_ut_st_\u0161t_pi_so".split("_"),weekdaysMin:"ne_po_ut_st_\u0161t_pi_so".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd D. MMMM YYYY H:mm"},calendar:{sameDay:"[dnes o] LT",nextDay:"[zajtra o] LT",nextWeek:function(){switch(this.day()){case 0:return"[v nede\u013eu o] LT";case 1:case 2:return"[v] dddd [o] LT";case 3:return"[v stredu o] LT";case 4:return"[vo \u0161tvrtok o] LT";case 5:return"[v piatok o] LT";case 6:return"[v sobotu o] LT"}},lastDay:"[v\u010dera o] LT",lastWeek:function(){switch(this.day()){case 0:return"[minul\xfa nede\u013eu o] LT";case 1:case 2:return"[minul\xfd] dddd [o] LT";case 3:return"[minul\xfa stredu o] LT";case 4:case 5:return"[minul\xfd] dddd [o] LT";case 6:return"[minul\xfa sobotu o] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"pred %s",s:ad,ss:ad,m:ad,mm:ad,h:ad,hh:ad,d:ad,dd:ad,M:ad,MM:ad,y:ad,yy:ad},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),l.defineLocale("sl",{months:"januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december".split("_"),monthsShort:"jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"),monthsParseExact:!0,weekdays:"nedelja_ponedeljek_torek_sreda_\u010detrtek_petek_sobota".split("_"),weekdaysShort:"ned._pon._tor._sre._\u010det._pet._sob.".split("_"),weekdaysMin:"ne_po_to_sr_\u010de_pe_so".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danes ob] LT",nextDay:"[jutri ob] LT",nextWeek:function(){switch(this.day()){case 0:return"[v] [nedeljo] [ob] LT";case 3:return"[v] [sredo] [ob] LT";case 6:return"[v] [soboto] [ob] LT";case 1:case 2:case 4:case 5:return"[v] dddd [ob] LT"}},lastDay:"[v\u010deraj ob] LT",lastWeek:function(){switch(this.day()){case 0:return"[prej\u0161njo] [nedeljo] [ob] LT";case 3:return"[prej\u0161njo] [sredo] [ob] LT";case 6:return"[prej\u0161njo] [soboto] [ob] LT";case 1:case 2:case 4:case 5:return"[prej\u0161nji] dddd [ob] LT"}},sameElse:"L"},relativeTime:{future:"\u010dez %s",past:"pred %s",s:td,ss:td,m:td,mm:td,h:td,hh:td,d:td,dd:td,M:td,MM:td,y:td,yy:td},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),l.defineLocale("sq",{months:"Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_N\xebntor_Dhjetor".split("_"),monthsShort:"Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_N\xebn_Dhj".split("_"),weekdays:"E Diel_E H\xebn\xeb_E Mart\xeb_E M\xebrkur\xeb_E Enjte_E Premte_E Shtun\xeb".split("_"),weekdaysShort:"Die_H\xebn_Mar_M\xebr_Enj_Pre_Sht".split("_"),weekdaysMin:"D_H_Ma_M\xeb_E_P_Sh".split("_"),weekdaysParseExact:!0,meridiemParse:/PD|MD/,isPM:function(e){return"M"===e.charAt(0)},meridiem:function(e,a,t){return e<12?"PD":"MD"},longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Sot n\xeb] LT",nextDay:"[Nes\xebr n\xeb] LT",nextWeek:"dddd [n\xeb] LT",lastDay:"[Dje n\xeb] LT",lastWeek:"dddd [e kaluar n\xeb] LT",sameElse:"L"},relativeTime:{future:"n\xeb %s",past:"%s m\xeb par\xeb",s:"disa sekonda",ss:"%d sekonda",m:"nj\xeb minut\xeb",mm:"%d minuta",h:"nj\xeb or\xeb",hh:"%d or\xeb",d:"nj\xeb dit\xeb",dd:"%d dit\xeb",M:"nj\xeb muaj",MM:"%d muaj",y:"nj\xeb vit",yy:"%d vite"},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});var sd={words:{ss:["\u0441\u0435\u043a\u0443\u043d\u0434\u0430","\u0441\u0435\u043a\u0443\u043d\u0434\u0435","\u0441\u0435\u043a\u0443\u043d\u0434\u0438"],m:["\u0458\u0435\u0434\u0430\u043d \u043c\u0438\u043d\u0443\u0442","\u0458\u0435\u0434\u043d\u0435 \u043c\u0438\u043d\u0443\u0442\u0435"],mm:["\u043c\u0438\u043d\u0443\u0442","\u043c\u0438\u043d\u0443\u0442\u0435","\u043c\u0438\u043d\u0443\u0442\u0430"],h:["\u0458\u0435\u0434\u0430\u043d \u0441\u0430\u0442","\u0458\u0435\u0434\u043d\u043e\u0433 \u0441\u0430\u0442\u0430"],hh:["\u0441\u0430\u0442","\u0441\u0430\u0442\u0430","\u0441\u0430\u0442\u0438"],dd:["\u0434\u0430\u043d","\u0434\u0430\u043d\u0430","\u0434\u0430\u043d\u0430"],MM:["\u043c\u0435\u0441\u0435\u0446","\u043c\u0435\u0441\u0435\u0446\u0430","\u043c\u0435\u0441\u0435\u0446\u0438"],yy:["\u0433\u043e\u0434\u0438\u043d\u0430","\u0433\u043e\u0434\u0438\u043d\u0435","\u0433\u043e\u0434\u0438\u043d\u0430"]},correctGrammaticalCase:function(e,a){return 1===e?a[0]:2<=e&&e<=4?a[1]:a[2]},translate:function(e,a,t){var s=sd.words[t];return 1===t.length?a?s[0]:s[1]:e+" "+sd.correctGrammaticalCase(e,s)}};l.defineLocale("sr-cyrl",{months:"\u0458\u0430\u043d\u0443\u0430\u0440_\u0444\u0435\u0431\u0440\u0443\u0430\u0440_\u043c\u0430\u0440\u0442_\u0430\u043f\u0440\u0438\u043b_\u043c\u0430\u0458_\u0458\u0443\u043d_\u0458\u0443\u043b_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043f\u0442\u0435\u043c\u0431\u0430\u0440_\u043e\u043a\u0442\u043e\u0431\u0430\u0440_\u043d\u043e\u0432\u0435\u043c\u0431\u0430\u0440_\u0434\u0435\u0446\u0435\u043c\u0431\u0430\u0440".split("_"),monthsShort:"\u0458\u0430\u043d._\u0444\u0435\u0431._\u043c\u0430\u0440._\u0430\u043f\u0440._\u043c\u0430\u0458_\u0458\u0443\u043d_\u0458\u0443\u043b_\u0430\u0432\u0433._\u0441\u0435\u043f._\u043e\u043a\u0442._\u043d\u043e\u0432._\u0434\u0435\u0446.".split("_"),monthsParseExact:!0,weekdays:"\u043d\u0435\u0434\u0435\u0459\u0430_\u043f\u043e\u043d\u0435\u0434\u0435\u0459\u0430\u043a_\u0443\u0442\u043e\u0440\u0430\u043a_\u0441\u0440\u0435\u0434\u0430_\u0447\u0435\u0442\u0432\u0440\u0442\u0430\u043a_\u043f\u0435\u0442\u0430\u043a_\u0441\u0443\u0431\u043e\u0442\u0430".split("_"),weekdaysShort:"\u043d\u0435\u0434._\u043f\u043e\u043d._\u0443\u0442\u043e._\u0441\u0440\u0435._\u0447\u0435\u0442._\u043f\u0435\u0442._\u0441\u0443\u0431.".split("_"),weekdaysMin:"\u043d\u0435_\u043f\u043e_\u0443\u0442_\u0441\u0440_\u0447\u0435_\u043f\u0435_\u0441\u0443".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[\u0434\u0430\u043d\u0430\u0441 \u0443] LT",nextDay:"[\u0441\u0443\u0442\u0440\u0430 \u0443] LT",nextWeek:function(){switch(this.day()){case 0:return"[\u0443] [\u043d\u0435\u0434\u0435\u0459\u0443] [\u0443] LT";case 3:return"[\u0443] [\u0441\u0440\u0435\u0434\u0443] [\u0443] LT";case 6:return"[\u0443] [\u0441\u0443\u0431\u043e\u0442\u0443] [\u0443] LT";case 1:case 2:case 4:case 5:return"[\u0443] dddd [\u0443] LT"}},lastDay:"[\u0458\u0443\u0447\u0435 \u0443] LT",lastWeek:function(){return["[\u043f\u0440\u043e\u0448\u043b\u0435] [\u043d\u0435\u0434\u0435\u0459\u0435] [\u0443] LT","[\u043f\u0440\u043e\u0448\u043b\u043e\u0433] [\u043f\u043e\u043d\u0435\u0434\u0435\u0459\u043a\u0430] [\u0443] LT","[\u043f\u0440\u043e\u0448\u043b\u043e\u0433] [\u0443\u0442\u043e\u0440\u043a\u0430] [\u0443] LT","[\u043f\u0440\u043e\u0448\u043b\u0435] [\u0441\u0440\u0435\u0434\u0435] [\u0443] LT","[\u043f\u0440\u043e\u0448\u043b\u043e\u0433] [\u0447\u0435\u0442\u0432\u0440\u0442\u043a\u0430] [\u0443] LT","[\u043f\u0440\u043e\u0448\u043b\u043e\u0433] [\u043f\u0435\u0442\u043a\u0430] [\u0443] LT","[\u043f\u0440\u043e\u0448\u043b\u0435] [\u0441\u0443\u0431\u043e\u0442\u0435] [\u0443] LT"][this.day()]},sameElse:"L"},relativeTime:{future:"\u0437\u0430 %s",past:"\u043f\u0440\u0435 %s",s:"\u043d\u0435\u043a\u043e\u043b\u0438\u043a\u043e \u0441\u0435\u043a\u0443\u043d\u0434\u0438",ss:sd.translate,m:sd.translate,mm:sd.translate,h:sd.translate,hh:sd.translate,d:"\u0434\u0430\u043d",dd:sd.translate,M:"\u043c\u0435\u0441\u0435\u0446",MM:sd.translate,y:"\u0433\u043e\u0434\u0438\u043d\u0443",yy:sd.translate},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}});var nd={words:{ss:["sekunda","sekunde","sekundi"],m:["jedan minut","jedne minute"],mm:["minut","minute","minuta"],h:["jedan sat","jednog sata"],hh:["sat","sata","sati"],dd:["dan","dana","dana"],MM:["mesec","meseca","meseci"],yy:["godina","godine","godina"]},correctGrammaticalCase:function(e,a){return 1===e?a[0]:2<=e&&e<=4?a[1]:a[2]},translate:function(e,a,t){var s=nd.words[t];return 1===t.length?a?s[0]:s[1]:e+" "+nd.correctGrammaticalCase(e,s)}};l.defineLocale("sr",{months:"januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar".split("_"),monthsShort:"jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.".split("_"),monthsParseExact:!0,weekdays:"nedelja_ponedeljak_utorak_sreda_\u010detvrtak_petak_subota".split("_"),weekdaysShort:"ned._pon._uto._sre._\u010det._pet._sub.".split("_"),weekdaysMin:"ne_po_ut_sr_\u010de_pe_su".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danas u] LT",nextDay:"[sutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedelju] [u] LT";case 3:return"[u] [sredu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT"}},lastDay:"[ju\u010de u] LT",lastWeek:function(){return["[pro\u0161le] [nedelje] [u] LT","[pro\u0161log] [ponedeljka] [u] LT","[pro\u0161log] [utorka] [u] LT","[pro\u0161le] [srede] [u] LT","[pro\u0161log] [\u010detvrtka] [u] LT","[pro\u0161log] [petka] [u] LT","[pro\u0161le] [subote] [u] LT"][this.day()]},sameElse:"L"},relativeTime:{future:"za %s",past:"pre %s",s:"nekoliko sekundi",ss:nd.translate,m:nd.translate,mm:nd.translate,h:nd.translate,hh:nd.translate,d:"dan",dd:nd.translate,M:"mesec",MM:nd.translate,y:"godinu",yy:nd.translate},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),l.defineLocale("ss",{months:"Bhimbidvwane_Indlovana_Indlov'lenkhulu_Mabasa_Inkhwekhweti_Inhlaba_Kholwane_Ingci_Inyoni_Imphala_Lweti_Ingongoni".split("_"),monthsShort:"Bhi_Ina_Inu_Mab_Ink_Inh_Kho_Igc_Iny_Imp_Lwe_Igo".split("_"),weekdays:"Lisontfo_Umsombuluko_Lesibili_Lesitsatfu_Lesine_Lesihlanu_Umgcibelo".split("_"),weekdaysShort:"Lis_Umb_Lsb_Les_Lsi_Lsh_Umg".split("_"),weekdaysMin:"Li_Us_Lb_Lt_Ls_Lh_Ug".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendar:{sameDay:"[Namuhla nga] LT",nextDay:"[Kusasa nga] LT",nextWeek:"dddd [nga] LT",lastDay:"[Itolo nga] LT",lastWeek:"dddd [leliphelile] [nga] LT",sameElse:"L"},relativeTime:{future:"nga %s",past:"wenteka nga %s",s:"emizuzwana lomcane",ss:"%d mzuzwana",m:"umzuzu",mm:"%d emizuzu",h:"lihora",hh:"%d emahora",d:"lilanga",dd:"%d emalanga",M:"inyanga",MM:"%d tinyanga",y:"umnyaka",yy:"%d iminyaka"},meridiemParse:/ekuseni|emini|entsambama|ebusuku/,meridiem:function(e,a,t){return e<11?"ekuseni":e<15?"emini":e<19?"entsambama":"ebusuku"},meridiemHour:function(e,a){return 12===e&&(e=0),"ekuseni"===a?e:"emini"===a?11<=e?e:e+12:"entsambama"===a||"ebusuku"===a?0===e?0:e+12:void 0},dayOfMonthOrdinalParse:/\d{1,2}/,ordinal:"%d",week:{dow:1,doy:4}}),l.defineLocale("sv",{months:"januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"),monthsShort:"jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),weekdays:"s\xf6ndag_m\xe5ndag_tisdag_onsdag_torsdag_fredag_l\xf6rdag".split("_"),weekdaysShort:"s\xf6n_m\xe5n_tis_ons_tor_fre_l\xf6r".split("_"),weekdaysMin:"s\xf6_m\xe5_ti_on_to_fr_l\xf6".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [kl.] HH:mm",LLLL:"dddd D MMMM YYYY [kl.] HH:mm",lll:"D MMM YYYY HH:mm",llll:"ddd D MMM YYYY HH:mm"},calendar:{sameDay:"[Idag] LT",nextDay:"[Imorgon] LT",lastDay:"[Ig\xe5r] LT",nextWeek:"[P\xe5] dddd LT",lastWeek:"[I] dddd[s] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"f\xf6r %s sedan",s:"n\xe5gra sekunder",ss:"%d sekunder",m:"en minut",mm:"%d minuter",h:"en timme",hh:"%d timmar",d:"en dag",dd:"%d dagar",M:"en m\xe5nad",MM:"%d m\xe5nader",y:"ett \xe5r",yy:"%d \xe5r"},dayOfMonthOrdinalParse:/\d{1,2}(e|a)/,ordinal:function(e){var a=e%10;return e+(1==~~(e%100/10)?"e":1===a?"a":2===a?"a":"e")},week:{dow:1,doy:4}}),l.defineLocale("sw",{months:"Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba".split("_"),monthsShort:"Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des".split("_"),weekdays:"Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi".split("_"),weekdaysShort:"Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos".split("_"),weekdaysMin:"J2_J3_J4_J5_Al_Ij_J1".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[leo saa] LT",nextDay:"[kesho saa] LT",nextWeek:"[wiki ijayo] dddd [saat] LT",lastDay:"[jana] LT",lastWeek:"[wiki iliyopita] dddd [saat] LT",sameElse:"L"},relativeTime:{future:"%s baadaye",past:"tokea %s",s:"hivi punde",ss:"sekunde %d",m:"dakika moja",mm:"dakika %d",h:"saa limoja",hh:"masaa %d",d:"siku moja",dd:"masiku %d",M:"mwezi mmoja",MM:"miezi %d",y:"mwaka mmoja",yy:"miaka %d"},week:{dow:1,doy:7}});var dd={1:"\u0be7",2:"\u0be8",3:"\u0be9",4:"\u0bea",5:"\u0beb",6:"\u0bec",7:"\u0bed",8:"\u0bee",9:"\u0bef",0:"\u0be6"},rd={"\u0be7":"1","\u0be8":"2","\u0be9":"3","\u0bea":"4","\u0beb":"5","\u0bec":"6","\u0bed":"7","\u0bee":"8","\u0bef":"9","\u0be6":"0"};l.defineLocale("ta",{months:"\u0b9c\u0ba9\u0bb5\u0bb0\u0bbf_\u0baa\u0bbf\u0baa\u0bcd\u0bb0\u0bb5\u0bb0\u0bbf_\u0bae\u0bbe\u0bb0\u0bcd\u0b9a\u0bcd_\u0b8f\u0baa\u0bcd\u0bb0\u0bb2\u0bcd_\u0bae\u0bc7_\u0b9c\u0bc2\u0ba9\u0bcd_\u0b9c\u0bc2\u0bb2\u0bc8_\u0b86\u0b95\u0bb8\u0bcd\u0b9f\u0bcd_\u0b9a\u0bc6\u0baa\u0bcd\u0b9f\u0bc6\u0bae\u0bcd\u0baa\u0bb0\u0bcd_\u0b85\u0b95\u0bcd\u0b9f\u0bc7\u0bbe\u0baa\u0bb0\u0bcd_\u0ba8\u0bb5\u0bae\u0bcd\u0baa\u0bb0\u0bcd_\u0b9f\u0bbf\u0b9a\u0bae\u0bcd\u0baa\u0bb0\u0bcd".split("_"),monthsShort:"\u0b9c\u0ba9\u0bb5\u0bb0\u0bbf_\u0baa\u0bbf\u0baa\u0bcd\u0bb0\u0bb5\u0bb0\u0bbf_\u0bae\u0bbe\u0bb0\u0bcd\u0b9a\u0bcd_\u0b8f\u0baa\u0bcd\u0bb0\u0bb2\u0bcd_\u0bae\u0bc7_\u0b9c\u0bc2\u0ba9\u0bcd_\u0b9c\u0bc2\u0bb2\u0bc8_\u0b86\u0b95\u0bb8\u0bcd\u0b9f\u0bcd_\u0b9a\u0bc6\u0baa\u0bcd\u0b9f\u0bc6\u0bae\u0bcd\u0baa\u0bb0\u0bcd_\u0b85\u0b95\u0bcd\u0b9f\u0bc7\u0bbe\u0baa\u0bb0\u0bcd_\u0ba8\u0bb5\u0bae\u0bcd\u0baa\u0bb0\u0bcd_\u0b9f\u0bbf\u0b9a\u0bae\u0bcd\u0baa\u0bb0\u0bcd".split("_"),weekdays:"\u0b9e\u0bbe\u0baf\u0bbf\u0bb1\u0bcd\u0bb1\u0bc1\u0b95\u0bcd\u0b95\u0bbf\u0bb4\u0bae\u0bc8_\u0ba4\u0bbf\u0b99\u0bcd\u0b95\u0b9f\u0bcd\u0b95\u0bbf\u0bb4\u0bae\u0bc8_\u0b9a\u0bc6\u0bb5\u0bcd\u0bb5\u0bbe\u0baf\u0bcd\u0b95\u0bbf\u0bb4\u0bae\u0bc8_\u0baa\u0bc1\u0ba4\u0ba9\u0bcd\u0b95\u0bbf\u0bb4\u0bae\u0bc8_\u0bb5\u0bbf\u0baf\u0bbe\u0bb4\u0b95\u0bcd\u0b95\u0bbf\u0bb4\u0bae\u0bc8_\u0bb5\u0bc6\u0bb3\u0bcd\u0bb3\u0bbf\u0b95\u0bcd\u0b95\u0bbf\u0bb4\u0bae\u0bc8_\u0b9a\u0ba9\u0bbf\u0b95\u0bcd\u0b95\u0bbf\u0bb4\u0bae\u0bc8".split("_"),weekdaysShort:"\u0b9e\u0bbe\u0baf\u0bbf\u0bb1\u0bc1_\u0ba4\u0bbf\u0b99\u0bcd\u0b95\u0bb3\u0bcd_\u0b9a\u0bc6\u0bb5\u0bcd\u0bb5\u0bbe\u0baf\u0bcd_\u0baa\u0bc1\u0ba4\u0ba9\u0bcd_\u0bb5\u0bbf\u0baf\u0bbe\u0bb4\u0ba9\u0bcd_\u0bb5\u0bc6\u0bb3\u0bcd\u0bb3\u0bbf_\u0b9a\u0ba9\u0bbf".split("_"),weekdaysMin:"\u0b9e\u0bbe_\u0ba4\u0bbf_\u0b9a\u0bc6_\u0baa\u0bc1_\u0bb5\u0bbf_\u0bb5\u0bc6_\u0b9a".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, HH:mm",LLLL:"dddd, D MMMM YYYY, HH:mm"},calendar:{sameDay:"[\u0b87\u0ba9\u0bcd\u0bb1\u0bc1] LT",nextDay:"[\u0ba8\u0bbe\u0bb3\u0bc8] LT",nextWeek:"dddd, LT",lastDay:"[\u0ba8\u0bc7\u0bb1\u0bcd\u0bb1\u0bc1] LT",lastWeek:"[\u0b95\u0b9f\u0ba8\u0bcd\u0ba4 \u0bb5\u0bbe\u0bb0\u0bae\u0bcd] dddd, LT",sameElse:"L"},relativeTime:{future:"%s \u0b87\u0bb2\u0bcd",past:"%s \u0bae\u0bc1\u0ba9\u0bcd",s:"\u0b92\u0bb0\u0bc1 \u0b9a\u0bbf\u0bb2 \u0bb5\u0bbf\u0ba8\u0bbe\u0b9f\u0bbf\u0b95\u0bb3\u0bcd",ss:"%d \u0bb5\u0bbf\u0ba8\u0bbe\u0b9f\u0bbf\u0b95\u0bb3\u0bcd",m:"\u0b92\u0bb0\u0bc1 \u0ba8\u0bbf\u0bae\u0bbf\u0b9f\u0bae\u0bcd",mm:"%d \u0ba8\u0bbf\u0bae\u0bbf\u0b9f\u0b99\u0bcd\u0b95\u0bb3\u0bcd",h:"\u0b92\u0bb0\u0bc1 \u0bae\u0ba3\u0bbf \u0ba8\u0bc7\u0bb0\u0bae\u0bcd",hh:"%d \u0bae\u0ba3\u0bbf \u0ba8\u0bc7\u0bb0\u0bae\u0bcd",d:"\u0b92\u0bb0\u0bc1 \u0ba8\u0bbe\u0bb3\u0bcd",dd:"%d \u0ba8\u0bbe\u0b9f\u0bcd\u0b95\u0bb3\u0bcd",M:"\u0b92\u0bb0\u0bc1 \u0bae\u0bbe\u0ba4\u0bae\u0bcd",MM:"%d \u0bae\u0bbe\u0ba4\u0b99\u0bcd\u0b95\u0bb3\u0bcd",y:"\u0b92\u0bb0\u0bc1 \u0bb5\u0bb0\u0bc1\u0b9f\u0bae\u0bcd",yy:"%d \u0b86\u0ba3\u0bcd\u0b9f\u0bc1\u0b95\u0bb3\u0bcd"},dayOfMonthOrdinalParse:/\d{1,2}\u0bb5\u0ba4\u0bc1/,ordinal:function(e){return e+"\u0bb5\u0ba4\u0bc1"},preparse:function(e){return e.replace(/[\u0be7\u0be8\u0be9\u0bea\u0beb\u0bec\u0bed\u0bee\u0bef\u0be6]/g,function(e){return rd[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return dd[e]})},meridiemParse:/\u0baf\u0bbe\u0bae\u0bae\u0bcd|\u0bb5\u0bc8\u0b95\u0bb1\u0bc8|\u0b95\u0bbe\u0bb2\u0bc8|\u0ba8\u0ba3\u0bcd\u0baa\u0b95\u0bb2\u0bcd|\u0b8e\u0bb1\u0bcd\u0baa\u0bbe\u0b9f\u0bc1|\u0bae\u0bbe\u0bb2\u0bc8/,meridiem:function(e,a,t){return e<2?" \u0baf\u0bbe\u0bae\u0bae\u0bcd":e<6?" \u0bb5\u0bc8\u0b95\u0bb1\u0bc8":e<10?" \u0b95\u0bbe\u0bb2\u0bc8":e<14?" \u0ba8\u0ba3\u0bcd\u0baa\u0b95\u0bb2\u0bcd":e<18?" \u0b8e\u0bb1\u0bcd\u0baa\u0bbe\u0b9f\u0bc1":e<22?" \u0bae\u0bbe\u0bb2\u0bc8":" \u0baf\u0bbe\u0bae\u0bae\u0bcd"},meridiemHour:function(e,a){return 12===e&&(e=0),"\u0baf\u0bbe\u0bae\u0bae\u0bcd"===a?e<2?e:e+12:"\u0bb5\u0bc8\u0b95\u0bb1\u0bc8"===a||"\u0b95\u0bbe\u0bb2\u0bc8"===a?e:"\u0ba8\u0ba3\u0bcd\u0baa\u0b95\u0bb2\u0bcd"===a&&10<=e?e:e+12},week:{dow:0,doy:6}}),l.defineLocale("te",{months:"\u0c1c\u0c28\u0c35\u0c30\u0c3f_\u0c2b\u0c3f\u0c2c\u0c4d\u0c30\u0c35\u0c30\u0c3f_\u0c2e\u0c3e\u0c30\u0c4d\u0c1a\u0c3f_\u0c0f\u0c2a\u0c4d\u0c30\u0c3f\u0c32\u0c4d_\u0c2e\u0c47_\u0c1c\u0c42\u0c28\u0c4d_\u0c1c\u0c41\u0c32\u0c48_\u0c06\u0c17\u0c38\u0c4d\u0c1f\u0c41_\u0c38\u0c46\u0c2a\u0c4d\u0c1f\u0c46\u0c02\u0c2c\u0c30\u0c4d_\u0c05\u0c15\u0c4d\u0c1f\u0c4b\u0c2c\u0c30\u0c4d_\u0c28\u0c35\u0c02\u0c2c\u0c30\u0c4d_\u0c21\u0c3f\u0c38\u0c46\u0c02\u0c2c\u0c30\u0c4d".split("_"),monthsShort:"\u0c1c\u0c28._\u0c2b\u0c3f\u0c2c\u0c4d\u0c30._\u0c2e\u0c3e\u0c30\u0c4d\u0c1a\u0c3f_\u0c0f\u0c2a\u0c4d\u0c30\u0c3f._\u0c2e\u0c47_\u0c1c\u0c42\u0c28\u0c4d_\u0c1c\u0c41\u0c32\u0c48_\u0c06\u0c17._\u0c38\u0c46\u0c2a\u0c4d._\u0c05\u0c15\u0c4d\u0c1f\u0c4b._\u0c28\u0c35._\u0c21\u0c3f\u0c38\u0c46.".split("_"),monthsParseExact:!0,weekdays:"\u0c06\u0c26\u0c3f\u0c35\u0c3e\u0c30\u0c02_\u0c38\u0c4b\u0c2e\u0c35\u0c3e\u0c30\u0c02_\u0c2e\u0c02\u0c17\u0c33\u0c35\u0c3e\u0c30\u0c02_\u0c2c\u0c41\u0c27\u0c35\u0c3e\u0c30\u0c02_\u0c17\u0c41\u0c30\u0c41\u0c35\u0c3e\u0c30\u0c02_\u0c36\u0c41\u0c15\u0c4d\u0c30\u0c35\u0c3e\u0c30\u0c02_\u0c36\u0c28\u0c3f\u0c35\u0c3e\u0c30\u0c02".split("_"),weekdaysShort:"\u0c06\u0c26\u0c3f_\u0c38\u0c4b\u0c2e_\u0c2e\u0c02\u0c17\u0c33_\u0c2c\u0c41\u0c27_\u0c17\u0c41\u0c30\u0c41_\u0c36\u0c41\u0c15\u0c4d\u0c30_\u0c36\u0c28\u0c3f".split("_"),weekdaysMin:"\u0c06_\u0c38\u0c4b_\u0c2e\u0c02_\u0c2c\u0c41_\u0c17\u0c41_\u0c36\u0c41_\u0c36".split("_"),longDateFormat:{LT:"A h:mm",LTS:"A h:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm",LLLL:"dddd, D MMMM YYYY, A h:mm"},calendar:{sameDay:"[\u0c28\u0c47\u0c21\u0c41] LT",nextDay:"[\u0c30\u0c47\u0c2a\u0c41] LT",nextWeek:"dddd, LT",lastDay:"[\u0c28\u0c3f\u0c28\u0c4d\u0c28] LT",lastWeek:"[\u0c17\u0c24] dddd, LT",sameElse:"L"},relativeTime:{future:"%s \u0c32\u0c4b",past:"%s \u0c15\u0c4d\u0c30\u0c3f\u0c24\u0c02",s:"\u0c15\u0c4a\u0c28\u0c4d\u0c28\u0c3f \u0c15\u0c4d\u0c37\u0c23\u0c3e\u0c32\u0c41",ss:"%d \u0c38\u0c46\u0c15\u0c28\u0c4d\u0c32\u0c41",m:"\u0c12\u0c15 \u0c28\u0c3f\u0c2e\u0c3f\u0c37\u0c02",mm:"%d \u0c28\u0c3f\u0c2e\u0c3f\u0c37\u0c3e\u0c32\u0c41",h:"\u0c12\u0c15 \u0c17\u0c02\u0c1f",hh:"%d \u0c17\u0c02\u0c1f\u0c32\u0c41",d:"\u0c12\u0c15 \u0c30\u0c4b\u0c1c\u0c41",dd:"%d \u0c30\u0c4b\u0c1c\u0c41\u0c32\u0c41",M:"\u0c12\u0c15 \u0c28\u0c46\u0c32",MM:"%d \u0c28\u0c46\u0c32\u0c32\u0c41",y:"\u0c12\u0c15 \u0c38\u0c02\u0c35\u0c24\u0c4d\u0c38\u0c30\u0c02",yy:"%d \u0c38\u0c02\u0c35\u0c24\u0c4d\u0c38\u0c30\u0c3e\u0c32\u0c41"},dayOfMonthOrdinalParse:/\d{1,2}\u0c35/,ordinal:"%d\u0c35",meridiemParse:/\u0c30\u0c3e\u0c24\u0c4d\u0c30\u0c3f|\u0c09\u0c26\u0c2f\u0c02|\u0c2e\u0c27\u0c4d\u0c2f\u0c3e\u0c39\u0c4d\u0c28\u0c02|\u0c38\u0c3e\u0c2f\u0c02\u0c24\u0c4d\u0c30\u0c02/,meridiemHour:function(e,a){return 12===e&&(e=0),"\u0c30\u0c3e\u0c24\u0c4d\u0c30\u0c3f"===a?e<4?e:e+12:"\u0c09\u0c26\u0c2f\u0c02"===a?e:"\u0c2e\u0c27\u0c4d\u0c2f\u0c3e\u0c39\u0c4d\u0c28\u0c02"===a?10<=e?e:e+12:"\u0c38\u0c3e\u0c2f\u0c02\u0c24\u0c4d\u0c30\u0c02"===a?e+12:void 0},meridiem:function(e,a,t){return e<4?"\u0c30\u0c3e\u0c24\u0c4d\u0c30\u0c3f":e<10?"\u0c09\u0c26\u0c2f\u0c02":e<17?"\u0c2e\u0c27\u0c4d\u0c2f\u0c3e\u0c39\u0c4d\u0c28\u0c02":e<20?"\u0c38\u0c3e\u0c2f\u0c02\u0c24\u0c4d\u0c30\u0c02":"\u0c30\u0c3e\u0c24\u0c4d\u0c30\u0c3f"},week:{dow:0,doy:6}}),l.defineLocale("tet",{months:"Janeiru_Fevereiru_Marsu_Abril_Maiu_Ju\xf1u_Jullu_Agustu_Setembru_Outubru_Novembru_Dezembru".split("_"),monthsShort:"Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),weekdays:"Domingu_Segunda_Tersa_Kuarta_Kinta_Sesta_Sabadu".split("_"),weekdaysShort:"Dom_Seg_Ters_Kua_Kint_Sest_Sab".split("_"),weekdaysMin:"Do_Seg_Te_Ku_Ki_Ses_Sa".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Ohin iha] LT",nextDay:"[Aban iha] LT",nextWeek:"dddd [iha] LT",lastDay:"[Horiseik iha] LT",lastWeek:"dddd [semana kotuk] [iha] LT",sameElse:"L"},relativeTime:{future:"iha %s",past:"%s liuba",s:"minutu balun",ss:"minutu %d",m:"minutu ida",mm:"minutu %d",h:"oras ida",hh:"oras %d",d:"loron ida",dd:"loron %d",M:"fulan ida",MM:"fulan %d",y:"tinan ida",yy:"tinan %d"},dayOfMonthOrdinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(e){var a=e%10;return e+(1==~~(e%100/10)?"th":1===a?"st":2===a?"nd":3===a?"rd":"th")},week:{dow:1,doy:4}});var _d={0:"-\u0443\u043c",1:"-\u0443\u043c",2:"-\u044e\u043c",3:"-\u044e\u043c",4:"-\u0443\u043c",5:"-\u0443\u043c",6:"-\u0443\u043c",7:"-\u0443\u043c",8:"-\u0443\u043c",9:"-\u0443\u043c",10:"-\u0443\u043c",12:"-\u0443\u043c",13:"-\u0443\u043c",20:"-\u0443\u043c",30:"-\u044e\u043c",40:"-\u0443\u043c",50:"-\u0443\u043c",60:"-\u0443\u043c",70:"-\u0443\u043c",80:"-\u0443\u043c",90:"-\u0443\u043c",100:"-\u0443\u043c"};l.defineLocale("tg",{months:"\u044f\u043d\u0432\u0430\u0440_\u0444\u0435\u0432\u0440\u0430\u043b_\u043c\u0430\u0440\u0442_\u0430\u043f\u0440\u0435\u043b_\u043c\u0430\u0439_\u0438\u044e\u043d_\u0438\u044e\u043b_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043d\u0442\u044f\u0431\u0440_\u043e\u043a\u0442\u044f\u0431\u0440_\u043d\u043e\u044f\u0431\u0440_\u0434\u0435\u043a\u0430\u0431\u0440".split("_"),monthsShort:"\u044f\u043d\u0432_\u0444\u0435\u0432_\u043c\u0430\u0440_\u0430\u043f\u0440_\u043c\u0430\u0439_\u0438\u044e\u043d_\u0438\u044e\u043b_\u0430\u0432\u0433_\u0441\u0435\u043d_\u043e\u043a\u0442_\u043d\u043e\u044f_\u0434\u0435\u043a".split("_"),weekdays:"\u044f\u043a\u0448\u0430\u043d\u0431\u0435_\u0434\u0443\u0448\u0430\u043d\u0431\u0435_\u0441\u0435\u0448\u0430\u043d\u0431\u0435_\u0447\u043e\u0440\u0448\u0430\u043d\u0431\u0435_\u043f\u0430\u043d\u04b7\u0448\u0430\u043d\u0431\u0435_\u04b7\u0443\u043c\u044a\u0430_\u0448\u0430\u043d\u0431\u0435".split("_"),weekdaysShort:"\u044f\u0448\u0431_\u0434\u0448\u0431_\u0441\u0448\u0431_\u0447\u0448\u0431_\u043f\u0448\u0431_\u04b7\u0443\u043c_\u0448\u043d\u0431".split("_"),weekdaysMin:"\u044f\u0448_\u0434\u0448_\u0441\u0448_\u0447\u0448_\u043f\u0448_\u04b7\u043c_\u0448\u0431".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[\u0418\u043c\u0440\u04ef\u0437 \u0441\u043e\u0430\u0442\u0438] LT",nextDay:"[\u041f\u0430\u0433\u043e\u04b3 \u0441\u043e\u0430\u0442\u0438] LT",lastDay:"[\u0414\u0438\u0440\u04ef\u0437 \u0441\u043e\u0430\u0442\u0438] LT",nextWeek:"dddd[\u0438] [\u04b3\u0430\u0444\u0442\u0430\u0438 \u043e\u044f\u043d\u0434\u0430 \u0441\u043e\u0430\u0442\u0438] LT",lastWeek:"dddd[\u0438] [\u04b3\u0430\u0444\u0442\u0430\u0438 \u0433\u0443\u0437\u0430\u0448\u0442\u0430 \u0441\u043e\u0430\u0442\u0438] LT",sameElse:"L"},relativeTime:{future:"\u0431\u0430\u044a\u0434\u0438 %s",past:"%s \u043f\u0435\u0448",s:"\u044f\u043a\u0447\u0430\u043d\u0434 \u0441\u043e\u043d\u0438\u044f",m:"\u044f\u043a \u0434\u0430\u049b\u0438\u049b\u0430",mm:"%d \u0434\u0430\u049b\u0438\u049b\u0430",h:"\u044f\u043a \u0441\u043e\u0430\u0442",hh:"%d \u0441\u043e\u0430\u0442",d:"\u044f\u043a \u0440\u04ef\u0437",dd:"%d \u0440\u04ef\u0437",M:"\u044f\u043a \u043c\u043e\u04b3",MM:"%d \u043c\u043e\u04b3",y:"\u044f\u043a \u0441\u043e\u043b",yy:"%d \u0441\u043e\u043b"},meridiemParse:/\u0448\u0430\u0431|\u0441\u0443\u0431\u04b3|\u0440\u04ef\u0437|\u0431\u0435\u0433\u043e\u04b3/,meridiemHour:function(e,a){return 12===e&&(e=0),"\u0448\u0430\u0431"===a?e<4?e:e+12:"\u0441\u0443\u0431\u04b3"===a?e:"\u0440\u04ef\u0437"===a?11<=e?e:e+12:"\u0431\u0435\u0433\u043e\u04b3"===a?e+12:void 0},meridiem:function(e,a,t){return e<4?"\u0448\u0430\u0431":e<11?"\u0441\u0443\u0431\u04b3":e<16?"\u0440\u04ef\u0437":e<19?"\u0431\u0435\u0433\u043e\u04b3":"\u0448\u0430\u0431"},dayOfMonthOrdinalParse:/\d{1,2}-(\u0443\u043c|\u044e\u043c)/,ordinal:function(e){return e+(_d[e]||_d[e%10]||_d[100<=e?100:null])},week:{dow:1,doy:7}}),l.defineLocale("th",{months:"\u0e21\u0e01\u0e23\u0e32\u0e04\u0e21_\u0e01\u0e38\u0e21\u0e20\u0e32\u0e1e\u0e31\u0e19\u0e18\u0e4c_\u0e21\u0e35\u0e19\u0e32\u0e04\u0e21_\u0e40\u0e21\u0e29\u0e32\u0e22\u0e19_\u0e1e\u0e24\u0e29\u0e20\u0e32\u0e04\u0e21_\u0e21\u0e34\u0e16\u0e38\u0e19\u0e32\u0e22\u0e19_\u0e01\u0e23\u0e01\u0e0e\u0e32\u0e04\u0e21_\u0e2a\u0e34\u0e07\u0e2b\u0e32\u0e04\u0e21_\u0e01\u0e31\u0e19\u0e22\u0e32\u0e22\u0e19_\u0e15\u0e38\u0e25\u0e32\u0e04\u0e21_\u0e1e\u0e24\u0e28\u0e08\u0e34\u0e01\u0e32\u0e22\u0e19_\u0e18\u0e31\u0e19\u0e27\u0e32\u0e04\u0e21".split("_"),monthsShort:"\u0e21.\u0e04._\u0e01.\u0e1e._\u0e21\u0e35.\u0e04._\u0e40\u0e21.\u0e22._\u0e1e.\u0e04._\u0e21\u0e34.\u0e22._\u0e01.\u0e04._\u0e2a.\u0e04._\u0e01.\u0e22._\u0e15.\u0e04._\u0e1e.\u0e22._\u0e18.\u0e04.".split("_"),monthsParseExact:!0,weekdays:"\u0e2d\u0e32\u0e17\u0e34\u0e15\u0e22\u0e4c_\u0e08\u0e31\u0e19\u0e17\u0e23\u0e4c_\u0e2d\u0e31\u0e07\u0e04\u0e32\u0e23_\u0e1e\u0e38\u0e18_\u0e1e\u0e24\u0e2b\u0e31\u0e2a\u0e1a\u0e14\u0e35_\u0e28\u0e38\u0e01\u0e23\u0e4c_\u0e40\u0e2a\u0e32\u0e23\u0e4c".split("_"),weekdaysShort:"\u0e2d\u0e32\u0e17\u0e34\u0e15\u0e22\u0e4c_\u0e08\u0e31\u0e19\u0e17\u0e23\u0e4c_\u0e2d\u0e31\u0e07\u0e04\u0e32\u0e23_\u0e1e\u0e38\u0e18_\u0e1e\u0e24\u0e2b\u0e31\u0e2a_\u0e28\u0e38\u0e01\u0e23\u0e4c_\u0e40\u0e2a\u0e32\u0e23\u0e4c".split("_"),weekdaysMin:"\u0e2d\u0e32._\u0e08._\u0e2d._\u0e1e._\u0e1e\u0e24._\u0e28._\u0e2a.".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY \u0e40\u0e27\u0e25\u0e32 H:mm",LLLL:"\u0e27\u0e31\u0e19dddd\u0e17\u0e35\u0e48 D MMMM YYYY \u0e40\u0e27\u0e25\u0e32 H:mm"},meridiemParse:/\u0e01\u0e48\u0e2d\u0e19\u0e40\u0e17\u0e35\u0e48\u0e22\u0e07|\u0e2b\u0e25\u0e31\u0e07\u0e40\u0e17\u0e35\u0e48\u0e22\u0e07/,isPM:function(e){return"\u0e2b\u0e25\u0e31\u0e07\u0e40\u0e17\u0e35\u0e48\u0e22\u0e07"===e},meridiem:function(e,a,t){return e<12?"\u0e01\u0e48\u0e2d\u0e19\u0e40\u0e17\u0e35\u0e48\u0e22\u0e07":"\u0e2b\u0e25\u0e31\u0e07\u0e40\u0e17\u0e35\u0e48\u0e22\u0e07"},calendar:{sameDay:"[\u0e27\u0e31\u0e19\u0e19\u0e35\u0e49 \u0e40\u0e27\u0e25\u0e32] LT",nextDay:"[\u0e1e\u0e23\u0e38\u0e48\u0e07\u0e19\u0e35\u0e49 \u0e40\u0e27\u0e25\u0e32] LT",nextWeek:"dddd[\u0e2b\u0e19\u0e49\u0e32 \u0e40\u0e27\u0e25\u0e32] LT",lastDay:"[\u0e40\u0e21\u0e37\u0e48\u0e2d\u0e27\u0e32\u0e19\u0e19\u0e35\u0e49 \u0e40\u0e27\u0e25\u0e32] LT",lastWeek:"[\u0e27\u0e31\u0e19]dddd[\u0e17\u0e35\u0e48\u0e41\u0e25\u0e49\u0e27 \u0e40\u0e27\u0e25\u0e32] LT",sameElse:"L"},relativeTime:{future:"\u0e2d\u0e35\u0e01 %s",past:"%s\u0e17\u0e35\u0e48\u0e41\u0e25\u0e49\u0e27",s:"\u0e44\u0e21\u0e48\u0e01\u0e35\u0e48\u0e27\u0e34\u0e19\u0e32\u0e17\u0e35",ss:"%d \u0e27\u0e34\u0e19\u0e32\u0e17\u0e35",m:"1 \u0e19\u0e32\u0e17\u0e35",mm:"%d \u0e19\u0e32\u0e17\u0e35",h:"1 \u0e0a\u0e31\u0e48\u0e27\u0e42\u0e21\u0e07",hh:"%d \u0e0a\u0e31\u0e48\u0e27\u0e42\u0e21\u0e07",d:"1 \u0e27\u0e31\u0e19",dd:"%d \u0e27\u0e31\u0e19",M:"1 \u0e40\u0e14\u0e37\u0e2d\u0e19",MM:"%d \u0e40\u0e14\u0e37\u0e2d\u0e19",y:"1 \u0e1b\u0e35",yy:"%d \u0e1b\u0e35"}}),l.defineLocale("tl-ph",{months:"Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre".split("_"),monthsShort:"Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis".split("_"),weekdays:"Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado".split("_"),weekdaysShort:"Lin_Lun_Mar_Miy_Huw_Biy_Sab".split("_"),weekdaysMin:"Li_Lu_Ma_Mi_Hu_Bi_Sab".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"MM/D/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY HH:mm",LLLL:"dddd, MMMM DD, YYYY HH:mm"},calendar:{sameDay:"LT [ngayong araw]",nextDay:"[Bukas ng] LT",nextWeek:"LT [sa susunod na] dddd",lastDay:"LT [kahapon]",lastWeek:"LT [noong nakaraang] dddd",sameElse:"L"},relativeTime:{future:"sa loob ng %s",past:"%s ang nakalipas",s:"ilang segundo",ss:"%d segundo",m:"isang minuto",mm:"%d minuto",h:"isang oras",hh:"%d oras",d:"isang araw",dd:"%d araw",M:"isang buwan",MM:"%d buwan",y:"isang taon",yy:"%d taon"},dayOfMonthOrdinalParse:/\d{1,2}/,ordinal:function(e){return e},week:{dow:1,doy:4}});var id="pagh_wa\u2019_cha\u2019_wej_loS_vagh_jav_Soch_chorgh_Hut".split("_");function od(e,a,t,s){var n=function(e){var a=Math.floor(e%1e3/100),t=Math.floor(e%100/10),s=e%10,n="";0<a&&(n+=id[a]+"vatlh");0<t&&(n+=(""!==n?" ":"")+id[t]+"maH");0<s&&(n+=(""!==n?" ":"")+id[s]);return""===n?"pagh":n}(e);switch(t){case"ss":return n+" lup";case"mm":return n+" tup";case"hh":return n+" rep";case"dd":return n+" jaj";case"MM":return n+" jar";case"yy":return n+" DIS"}}l.defineLocale("tlh",{months:"tera\u2019 jar wa\u2019_tera\u2019 jar cha\u2019_tera\u2019 jar wej_tera\u2019 jar loS_tera\u2019 jar vagh_tera\u2019 jar jav_tera\u2019 jar Soch_tera\u2019 jar chorgh_tera\u2019 jar Hut_tera\u2019 jar wa\u2019maH_tera\u2019 jar wa\u2019maH wa\u2019_tera\u2019 jar wa\u2019maH cha\u2019".split("_"),monthsShort:"jar wa\u2019_jar cha\u2019_jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar wa\u2019maH_jar wa\u2019maH wa\u2019_jar wa\u2019maH cha\u2019".split("_"),monthsParseExact:!0,weekdays:"lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),weekdaysShort:"lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),weekdaysMin:"lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[DaHjaj] LT",nextDay:"[wa\u2019leS] LT",nextWeek:"LLL",lastDay:"[wa\u2019Hu\u2019] LT",lastWeek:"LLL",sameElse:"L"},relativeTime:{future:function(e){var a=e;return a=-1!==e.indexOf("jaj")?a.slice(0,-3)+"leS":-1!==e.indexOf("jar")?a.slice(0,-3)+"waQ":-1!==e.indexOf("DIS")?a.slice(0,-3)+"nem":a+" pIq"},past:function(e){var a=e;return a=-1!==e.indexOf("jaj")?a.slice(0,-3)+"Hu\u2019":-1!==e.indexOf("jar")?a.slice(0,-3)+"wen":-1!==e.indexOf("DIS")?a.slice(0,-3)+"ben":a+" ret"},s:"puS lup",ss:od,m:"wa\u2019 tup",mm:od,h:"wa\u2019 rep",hh:od,d:"wa\u2019 jaj",dd:od,M:"wa\u2019 jar",MM:od,y:"wa\u2019 DIS",yy:od},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}});var md={1:"'inci",5:"'inci",8:"'inci",70:"'inci",80:"'inci",2:"'nci",7:"'nci",20:"'nci",50:"'nci",3:"'\xfcnc\xfc",4:"'\xfcnc\xfc",100:"'\xfcnc\xfc",6:"'nc\u0131",9:"'uncu",10:"'uncu",30:"'uncu",60:"'\u0131nc\u0131",90:"'\u0131nc\u0131"};function ud(e,a,t,s){var n={s:["viensas secunds","'iensas secunds"],ss:[e+" secunds",e+" secunds"],m:["'n m\xedut","'iens m\xedut"],mm:[e+" m\xeduts",e+" m\xeduts"],h:["'n \xfeora","'iensa \xfeora"],hh:[e+" \xfeoras",e+" \xfeoras"],d:["'n ziua","'iensa ziua"],dd:[e+" ziuas",e+" ziuas"],M:["'n mes","'iens mes"],MM:[e+" mesen",e+" mesen"],y:["'n ar","'iens ar"],yy:[e+" ars",e+" ars"]};return s?n[t][0]:a?n[t][0]:n[t][1]}function ld(e,a,t){var s,n;return"m"===t?a?"\u0445\u0432\u0438\u043b\u0438\u043d\u0430":"\u0445\u0432\u0438\u043b\u0438\u043d\u0443":"h"===t?a?"\u0433\u043e\u0434\u0438\u043d\u0430":"\u0433\u043e\u0434\u0438\u043d\u0443":e+" "+(s=+e,n={ss:a?"\u0441\u0435\u043a\u0443\u043d\u0434\u0430_\u0441\u0435\u043a\u0443\u043d\u0434\u0438_\u0441\u0435\u043a\u0443\u043d\u0434":"\u0441\u0435\u043a\u0443\u043d\u0434\u0443_\u0441\u0435\u043a\u0443\u043d\u0434\u0438_\u0441\u0435\u043a\u0443\u043d\u0434",mm:a?"\u0445\u0432\u0438\u043b\u0438\u043d\u0430_\u0445\u0432\u0438\u043b\u0438\u043d\u0438_\u0445\u0432\u0438\u043b\u0438\u043d":"\u0445\u0432\u0438\u043b\u0438\u043d\u0443_\u0445\u0432\u0438\u043b\u0438\u043d\u0438_\u0445\u0432\u0438\u043b\u0438\u043d",hh:a?"\u0433\u043e\u0434\u0438\u043d\u0430_\u0433\u043e\u0434\u0438\u043d\u0438_\u0433\u043e\u0434\u0438\u043d":"\u0433\u043e\u0434\u0438\u043d\u0443_\u0433\u043e\u0434\u0438\u043d\u0438_\u0433\u043e\u0434\u0438\u043d",dd:"\u0434\u0435\u043d\u044c_\u0434\u043d\u0456_\u0434\u043d\u0456\u0432",MM:"\u043c\u0456\u0441\u044f\u0446\u044c_\u043c\u0456\u0441\u044f\u0446\u0456_\u043c\u0456\u0441\u044f\u0446\u0456\u0432",yy:"\u0440\u0456\u043a_\u0440\u043e\u043a\u0438_\u0440\u043e\u043a\u0456\u0432"}[t].split("_"),s%10==1&&s%100!=11?n[0]:2<=s%10&&s%10<=4&&(s%100<10||20<=s%100)?n[1]:n[2])}function Md(e){return function(){return e+"\u043e"+(11===this.hours()?"\u0431":"")+"] LT"}}l.defineLocale("tr",{months:"Ocak_\u015eubat_Mart_Nisan_May\u0131s_Haziran_Temmuz_A\u011fustos_Eyl\xfcl_Ekim_Kas\u0131m_Aral\u0131k".split("_"),monthsShort:"Oca_\u015eub_Mar_Nis_May_Haz_Tem_A\u011fu_Eyl_Eki_Kas_Ara".split("_"),weekdays:"Pazar_Pazartesi_Sal\u0131_\xc7ar\u015famba_Per\u015fembe_Cuma_Cumartesi".split("_"),weekdaysShort:"Paz_Pts_Sal_\xc7ar_Per_Cum_Cts".split("_"),weekdaysMin:"Pz_Pt_Sa_\xc7a_Pe_Cu_Ct".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[bug\xfcn saat] LT",nextDay:"[yar\u0131n saat] LT",nextWeek:"[gelecek] dddd [saat] LT",lastDay:"[d\xfcn] LT",lastWeek:"[ge\xe7en] dddd [saat] LT",sameElse:"L"},relativeTime:{future:"%s sonra",past:"%s \xf6nce",s:"birka\xe7 saniye",ss:"%d saniye",m:"bir dakika",mm:"%d dakika",h:"bir saat",hh:"%d saat",d:"bir g\xfcn",dd:"%d g\xfcn",M:"bir ay",MM:"%d ay",y:"bir y\u0131l",yy:"%d y\u0131l"},ordinal:function(e,a){switch(a){case"d":case"D":case"Do":case"DD":return e;default:if(0===e)return e+"'\u0131nc\u0131";var t=e%10;return e+(md[t]||md[e%100-t]||md[100<=e?100:null])}},week:{dow:1,doy:7}}),l.defineLocale("tzl",{months:"Januar_Fevraglh_Mar\xe7_Avr\xefu_Mai_G\xfcn_Julia_Guscht_Setemvar_Listop\xe4ts_Noemvar_Zecemvar".split("_"),monthsShort:"Jan_Fev_Mar_Avr_Mai_G\xfcn_Jul_Gus_Set_Lis_Noe_Zec".split("_"),weekdays:"S\xfaladi_L\xfane\xe7i_Maitzi_M\xe1rcuri_Xh\xfaadi_Vi\xe9ner\xe7i_S\xe1turi".split("_"),weekdaysShort:"S\xfal_L\xfan_Mai_M\xe1r_Xh\xfa_Vi\xe9_S\xe1t".split("_"),weekdaysMin:"S\xfa_L\xfa_Ma_M\xe1_Xh_Vi_S\xe1".split("_"),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD.MM.YYYY",LL:"D. MMMM [dallas] YYYY",LLL:"D. MMMM [dallas] YYYY HH.mm",LLLL:"dddd, [li] D. MMMM [dallas] YYYY HH.mm"},meridiemParse:/d\'o|d\'a/i,isPM:function(e){return"d'o"===e.toLowerCase()},meridiem:function(e,a,t){return 11<e?t?"d'o":"D'O":t?"d'a":"D'A"},calendar:{sameDay:"[oxhi \xe0] LT",nextDay:"[dem\xe0 \xe0] LT",nextWeek:"dddd [\xe0] LT",lastDay:"[ieiri \xe0] LT",lastWeek:"[s\xfcr el] dddd [lasteu \xe0] LT",sameElse:"L"},relativeTime:{future:"osprei %s",past:"ja%s",s:ud,ss:ud,m:ud,mm:ud,h:ud,hh:ud,d:ud,dd:ud,M:ud,MM:ud,y:ud,yy:ud},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),l.defineLocale("tzm-latn",{months:"innayr_br\u02e4ayr\u02e4_mar\u02e4s\u02e4_ibrir_mayyw_ywnyw_ywlywz_\u0263w\u0161t_\u0161wtanbir_kt\u02e4wbr\u02e4_nwwanbir_dwjnbir".split("_"),monthsShort:"innayr_br\u02e4ayr\u02e4_mar\u02e4s\u02e4_ibrir_mayyw_ywnyw_ywlywz_\u0263w\u0161t_\u0161wtanbir_kt\u02e4wbr\u02e4_nwwanbir_dwjnbir".split("_"),weekdays:"asamas_aynas_asinas_akras_akwas_asimwas_asi\u1e0dyas".split("_"),weekdaysShort:"asamas_aynas_asinas_akras_akwas_asimwas_asi\u1e0dyas".split("_"),weekdaysMin:"asamas_aynas_asinas_akras_akwas_asimwas_asi\u1e0dyas".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[asdkh g] LT",nextDay:"[aska g] LT",nextWeek:"dddd [g] LT",lastDay:"[assant g] LT",lastWeek:"dddd [g] LT",sameElse:"L"},relativeTime:{future:"dadkh s yan %s",past:"yan %s",s:"imik",ss:"%d imik",m:"minu\u1e0d",mm:"%d minu\u1e0d",h:"sa\u025ba",hh:"%d tassa\u025bin",d:"ass",dd:"%d ossan",M:"ayowr",MM:"%d iyyirn",y:"asgas",yy:"%d isgasn"},week:{dow:6,doy:12}}),l.defineLocale("tzm",{months:"\u2d49\u2d4f\u2d4f\u2d30\u2d62\u2d54_\u2d31\u2d55\u2d30\u2d62\u2d55_\u2d4e\u2d30\u2d55\u2d5a_\u2d49\u2d31\u2d54\u2d49\u2d54_\u2d4e\u2d30\u2d62\u2d62\u2d53_\u2d62\u2d53\u2d4f\u2d62\u2d53_\u2d62\u2d53\u2d4d\u2d62\u2d53\u2d63_\u2d56\u2d53\u2d5b\u2d5c_\u2d5b\u2d53\u2d5c\u2d30\u2d4f\u2d31\u2d49\u2d54_\u2d3d\u2d5f\u2d53\u2d31\u2d55_\u2d4f\u2d53\u2d61\u2d30\u2d4f\u2d31\u2d49\u2d54_\u2d37\u2d53\u2d4a\u2d4f\u2d31\u2d49\u2d54".split("_"),monthsShort:"\u2d49\u2d4f\u2d4f\u2d30\u2d62\u2d54_\u2d31\u2d55\u2d30\u2d62\u2d55_\u2d4e\u2d30\u2d55\u2d5a_\u2d49\u2d31\u2d54\u2d49\u2d54_\u2d4e\u2d30\u2d62\u2d62\u2d53_\u2d62\u2d53\u2d4f\u2d62\u2d53_\u2d62\u2d53\u2d4d\u2d62\u2d53\u2d63_\u2d56\u2d53\u2d5b\u2d5c_\u2d5b\u2d53\u2d5c\u2d30\u2d4f\u2d31\u2d49\u2d54_\u2d3d\u2d5f\u2d53\u2d31\u2d55_\u2d4f\u2d53\u2d61\u2d30\u2d4f\u2d31\u2d49\u2d54_\u2d37\u2d53\u2d4a\u2d4f\u2d31\u2d49\u2d54".split("_"),weekdays:"\u2d30\u2d59\u2d30\u2d4e\u2d30\u2d59_\u2d30\u2d62\u2d4f\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d4f\u2d30\u2d59_\u2d30\u2d3d\u2d54\u2d30\u2d59_\u2d30\u2d3d\u2d61\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d4e\u2d61\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d39\u2d62\u2d30\u2d59".split("_"),weekdaysShort:"\u2d30\u2d59\u2d30\u2d4e\u2d30\u2d59_\u2d30\u2d62\u2d4f\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d4f\u2d30\u2d59_\u2d30\u2d3d\u2d54\u2d30\u2d59_\u2d30\u2d3d\u2d61\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d4e\u2d61\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d39\u2d62\u2d30\u2d59".split("_"),weekdaysMin:"\u2d30\u2d59\u2d30\u2d4e\u2d30\u2d59_\u2d30\u2d62\u2d4f\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d4f\u2d30\u2d59_\u2d30\u2d3d\u2d54\u2d30\u2d59_\u2d30\u2d3d\u2d61\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d4e\u2d61\u2d30\u2d59_\u2d30\u2d59\u2d49\u2d39\u2d62\u2d30\u2d59".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[\u2d30\u2d59\u2d37\u2d45 \u2d34] LT",nextDay:"[\u2d30\u2d59\u2d3d\u2d30 \u2d34] LT",nextWeek:"dddd [\u2d34] LT",lastDay:"[\u2d30\u2d5a\u2d30\u2d4f\u2d5c \u2d34] LT",lastWeek:"dddd [\u2d34] LT",sameElse:"L"},relativeTime:{future:"\u2d37\u2d30\u2d37\u2d45 \u2d59 \u2d62\u2d30\u2d4f %s",past:"\u2d62\u2d30\u2d4f %s",s:"\u2d49\u2d4e\u2d49\u2d3d",ss:"%d \u2d49\u2d4e\u2d49\u2d3d",m:"\u2d4e\u2d49\u2d4f\u2d53\u2d3a",mm:"%d \u2d4e\u2d49\u2d4f\u2d53\u2d3a",h:"\u2d59\u2d30\u2d44\u2d30",hh:"%d \u2d5c\u2d30\u2d59\u2d59\u2d30\u2d44\u2d49\u2d4f",d:"\u2d30\u2d59\u2d59",dd:"%d o\u2d59\u2d59\u2d30\u2d4f",M:"\u2d30\u2d62o\u2d53\u2d54",MM:"%d \u2d49\u2d62\u2d62\u2d49\u2d54\u2d4f",y:"\u2d30\u2d59\u2d33\u2d30\u2d59",yy:"%d \u2d49\u2d59\u2d33\u2d30\u2d59\u2d4f"},week:{dow:6,doy:12}}),l.defineLocale("ug-cn",{months:"\u064a\u0627\u0646\u06cb\u0627\u0631_\u0641\u06d0\u06cb\u0631\u0627\u0644_\u0645\u0627\u0631\u062a_\u0626\u0627\u067e\u0631\u06d0\u0644_\u0645\u0627\u064a_\u0626\u0649\u064a\u06c7\u0646_\u0626\u0649\u064a\u06c7\u0644_\u0626\u0627\u06cb\u063a\u06c7\u0633\u062a_\u0633\u06d0\u0646\u062a\u06d5\u0628\u0649\u0631_\u0626\u06c6\u0643\u062a\u06d5\u0628\u0649\u0631_\u0646\u0648\u064a\u0627\u0628\u0649\u0631_\u062f\u06d0\u0643\u0627\u0628\u0649\u0631".split("_"),monthsShort:"\u064a\u0627\u0646\u06cb\u0627\u0631_\u0641\u06d0\u06cb\u0631\u0627\u0644_\u0645\u0627\u0631\u062a_\u0626\u0627\u067e\u0631\u06d0\u0644_\u0645\u0627\u064a_\u0626\u0649\u064a\u06c7\u0646_\u0626\u0649\u064a\u06c7\u0644_\u0626\u0627\u06cb\u063a\u06c7\u0633\u062a_\u0633\u06d0\u0646\u062a\u06d5\u0628\u0649\u0631_\u0626\u06c6\u0643\u062a\u06d5\u0628\u0649\u0631_\u0646\u0648\u064a\u0627\u0628\u0649\u0631_\u062f\u06d0\u0643\u0627\u0628\u0649\u0631".split("_"),weekdays:"\u064a\u06d5\u0643\u0634\u06d5\u0646\u0628\u06d5_\u062f\u06c8\u0634\u06d5\u0646\u0628\u06d5_\u0633\u06d5\u064a\u0634\u06d5\u0646\u0628\u06d5_\u0686\u0627\u0631\u0634\u06d5\u0646\u0628\u06d5_\u067e\u06d5\u064a\u0634\u06d5\u0646\u0628\u06d5_\u062c\u06c8\u0645\u06d5_\u0634\u06d5\u0646\u0628\u06d5".split("_"),weekdaysShort:"\u064a\u06d5_\u062f\u06c8_\u0633\u06d5_\u0686\u0627_\u067e\u06d5_\u062c\u06c8_\u0634\u06d5".split("_"),weekdaysMin:"\u064a\u06d5_\u062f\u06c8_\u0633\u06d5_\u0686\u0627_\u067e\u06d5_\u062c\u06c8_\u0634\u06d5".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"YYYY-\u064a\u0649\u0644\u0649M-\u0626\u0627\u064a\u0646\u0649\u06adD-\u0643\u06c8\u0646\u0649",LLL:"YYYY-\u064a\u0649\u0644\u0649M-\u0626\u0627\u064a\u0646\u0649\u06adD-\u0643\u06c8\u0646\u0649\u060c HH:mm",LLLL:"dddd\u060c YYYY-\u064a\u0649\u0644\u0649M-\u0626\u0627\u064a\u0646\u0649\u06adD-\u0643\u06c8\u0646\u0649\u060c HH:mm"},meridiemParse:/\u064a\u06d0\u0631\u0649\u0645 \u0643\u06d0\u0686\u06d5|\u0633\u06d5\u06be\u06d5\u0631|\u0686\u06c8\u0634\u062a\u0649\u0646 \u0628\u06c7\u0631\u06c7\u0646|\u0686\u06c8\u0634|\u0686\u06c8\u0634\u062a\u0649\u0646 \u0643\u06d0\u064a\u0649\u0646|\u0643\u06d5\u0686/,meridiemHour:function(e,a){return 12===e&&(e=0),"\u064a\u06d0\u0631\u0649\u0645 \u0643\u06d0\u0686\u06d5"===a||"\u0633\u06d5\u06be\u06d5\u0631"===a||"\u0686\u06c8\u0634\u062a\u0649\u0646 \u0628\u06c7\u0631\u06c7\u0646"===a?e:"\u0686\u06c8\u0634\u062a\u0649\u0646 \u0643\u06d0\u064a\u0649\u0646"===a||"\u0643\u06d5\u0686"===a?e+12:11<=e?e:e+12},meridiem:function(e,a,t){var s=100*e+a;return s<600?"\u064a\u06d0\u0631\u0649\u0645 \u0643\u06d0\u0686\u06d5":s<900?"\u0633\u06d5\u06be\u06d5\u0631":s<1130?"\u0686\u06c8\u0634\u062a\u0649\u0646 \u0628\u06c7\u0631\u06c7\u0646":s<1230?"\u0686\u06c8\u0634":s<1800?"\u0686\u06c8\u0634\u062a\u0649\u0646 \u0643\u06d0\u064a\u0649\u0646":"\u0643\u06d5\u0686"},calendar:{sameDay:"[\u0628\u06c8\u06af\u06c8\u0646 \u0633\u0627\u0626\u06d5\u062a] LT",nextDay:"[\u0626\u06d5\u062a\u06d5 \u0633\u0627\u0626\u06d5\u062a] LT",nextWeek:"[\u0643\u06d0\u0644\u06d5\u0631\u0643\u0649] dddd [\u0633\u0627\u0626\u06d5\u062a] LT",lastDay:"[\u062a\u06c6\u0646\u06c8\u06af\u06c8\u0646] LT",lastWeek:"[\u0626\u0627\u0644\u062f\u0649\u0646\u0642\u0649] dddd [\u0633\u0627\u0626\u06d5\u062a] LT",sameElse:"L"},relativeTime:{future:"%s \u0643\u06d0\u064a\u0649\u0646",past:"%s \u0628\u06c7\u0631\u06c7\u0646",s:"\u0646\u06d5\u0686\u0686\u06d5 \u0633\u06d0\u0643\u0648\u0646\u062a",ss:"%d \u0633\u06d0\u0643\u0648\u0646\u062a",m:"\u0628\u0649\u0631 \u0645\u0649\u0646\u06c7\u062a",mm:"%d \u0645\u0649\u0646\u06c7\u062a",h:"\u0628\u0649\u0631 \u0633\u0627\u0626\u06d5\u062a",hh:"%d \u0633\u0627\u0626\u06d5\u062a",d:"\u0628\u0649\u0631 \u0643\u06c8\u0646",dd:"%d \u0643\u06c8\u0646",M:"\u0628\u0649\u0631 \u0626\u0627\u064a",MM:"%d \u0626\u0627\u064a",y:"\u0628\u0649\u0631 \u064a\u0649\u0644",yy:"%d \u064a\u0649\u0644"},dayOfMonthOrdinalParse:/\d{1,2}(-\u0643\u06c8\u0646\u0649|-\u0626\u0627\u064a|-\u06be\u06d5\u067e\u062a\u06d5)/,ordinal:function(e,a){switch(a){case"d":case"D":case"DDD":return e+"-\u0643\u06c8\u0646\u0649";case"w":case"W":return e+"-\u06be\u06d5\u067e\u062a\u06d5";default:return e}},preparse:function(e){return e.replace(/\u060c/g,",")},postformat:function(e){return e.replace(/,/g,"\u060c")},week:{dow:1,doy:7}}),l.defineLocale("uk",{months:{format:"\u0441\u0456\u0447\u043d\u044f_\u043b\u044e\u0442\u043e\u0433\u043e_\u0431\u0435\u0440\u0435\u0437\u043d\u044f_\u043a\u0432\u0456\u0442\u043d\u044f_\u0442\u0440\u0430\u0432\u043d\u044f_\u0447\u0435\u0440\u0432\u043d\u044f_\u043b\u0438\u043f\u043d\u044f_\u0441\u0435\u0440\u043f\u043d\u044f_\u0432\u0435\u0440\u0435\u0441\u043d\u044f_\u0436\u043e\u0432\u0442\u043d\u044f_\u043b\u0438\u0441\u0442\u043e\u043f\u0430\u0434\u0430_\u0433\u0440\u0443\u0434\u043d\u044f".split("_"),standalone:"\u0441\u0456\u0447\u0435\u043d\u044c_\u043b\u044e\u0442\u0438\u0439_\u0431\u0435\u0440\u0435\u0437\u0435\u043d\u044c_\u043a\u0432\u0456\u0442\u0435\u043d\u044c_\u0442\u0440\u0430\u0432\u0435\u043d\u044c_\u0447\u0435\u0440\u0432\u0435\u043d\u044c_\u043b\u0438\u043f\u0435\u043d\u044c_\u0441\u0435\u0440\u043f\u0435\u043d\u044c_\u0432\u0435\u0440\u0435\u0441\u0435\u043d\u044c_\u0436\u043e\u0432\u0442\u0435\u043d\u044c_\u043b\u0438\u0441\u0442\u043e\u043f\u0430\u0434_\u0433\u0440\u0443\u0434\u0435\u043d\u044c".split("_")},monthsShort:"\u0441\u0456\u0447_\u043b\u044e\u0442_\u0431\u0435\u0440_\u043a\u0432\u0456\u0442_\u0442\u0440\u0430\u0432_\u0447\u0435\u0440\u0432_\u043b\u0438\u043f_\u0441\u0435\u0440\u043f_\u0432\u0435\u0440_\u0436\u043e\u0432\u0442_\u043b\u0438\u0441\u0442_\u0433\u0440\u0443\u0434".split("_"),weekdays:function(e,a){var t={nominative:"\u043d\u0435\u0434\u0456\u043b\u044f_\u043f\u043e\u043d\u0435\u0434\u0456\u043b\u043e\u043a_\u0432\u0456\u0432\u0442\u043e\u0440\u043e\u043a_\u0441\u0435\u0440\u0435\u0434\u0430_\u0447\u0435\u0442\u0432\u0435\u0440_\u043f\u2019\u044f\u0442\u043d\u0438\u0446\u044f_\u0441\u0443\u0431\u043e\u0442\u0430".split("_"),accusative:"\u043d\u0435\u0434\u0456\u043b\u044e_\u043f\u043e\u043d\u0435\u0434\u0456\u043b\u043e\u043a_\u0432\u0456\u0432\u0442\u043e\u0440\u043e\u043a_\u0441\u0435\u0440\u0435\u0434\u0443_\u0447\u0435\u0442\u0432\u0435\u0440_\u043f\u2019\u044f\u0442\u043d\u0438\u0446\u044e_\u0441\u0443\u0431\u043e\u0442\u0443".split("_"),genitive:"\u043d\u0435\u0434\u0456\u043b\u0456_\u043f\u043e\u043d\u0435\u0434\u0456\u043b\u043a\u0430_\u0432\u0456\u0432\u0442\u043e\u0440\u043a\u0430_\u0441\u0435\u0440\u0435\u0434\u0438_\u0447\u0435\u0442\u0432\u0435\u0440\u0433\u0430_\u043f\u2019\u044f\u0442\u043d\u0438\u0446\u0456_\u0441\u0443\u0431\u043e\u0442\u0438".split("_")};return!0===e?t.nominative.slice(1,7).concat(t.nominative.slice(0,1)):e?t[/(\[[\u0412\u0432\u0423\u0443]\]) ?dddd/.test(a)?"accusative":/\[?(?:\u043c\u0438\u043d\u0443\u043b\u043e\u0457|\u043d\u0430\u0441\u0442\u0443\u043f\u043d\u043e\u0457)? ?\] ?dddd/.test(a)?"genitive":"nominative"][e.day()]:t.nominative},weekdaysShort:"\u043d\u0434_\u043f\u043d_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043f\u0442_\u0441\u0431".split("_"),weekdaysMin:"\u043d\u0434_\u043f\u043d_\u0432\u0442_\u0441\u0440_\u0447\u0442_\u043f\u0442_\u0441\u0431".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY \u0440.",LLL:"D MMMM YYYY \u0440., HH:mm",LLLL:"dddd, D MMMM YYYY \u0440., HH:mm"},calendar:{sameDay:Md("[\u0421\u044c\u043e\u0433\u043e\u0434\u043d\u0456 "),nextDay:Md("[\u0417\u0430\u0432\u0442\u0440\u0430 "),lastDay:Md("[\u0412\u0447\u043e\u0440\u0430 "),nextWeek:Md("[\u0423] dddd ["),lastWeek:function(){switch(this.day()){case 0:case 3:case 5:case 6:return Md("[\u041c\u0438\u043d\u0443\u043b\u043e\u0457] dddd [").call(this);case 1:case 2:case 4:return Md("[\u041c\u0438\u043d\u0443\u043b\u043e\u0433\u043e] dddd [").call(this)}},sameElse:"L"},relativeTime:{future:"\u0437\u0430 %s",past:"%s \u0442\u043e\u043c\u0443",s:"\u0434\u0435\u043a\u0456\u043b\u044c\u043a\u0430 \u0441\u0435\u043a\u0443\u043d\u0434",ss:ld,m:ld,mm:ld,h:"\u0433\u043e\u0434\u0438\u043d\u0443",hh:ld,d:"\u0434\u0435\u043d\u044c",dd:ld,M:"\u043c\u0456\u0441\u044f\u0446\u044c",MM:ld,y:"\u0440\u0456\u043a",yy:ld},meridiemParse:/\u043d\u043e\u0447\u0456|\u0440\u0430\u043d\u043a\u0443|\u0434\u043d\u044f|\u0432\u0435\u0447\u043e\u0440\u0430/,isPM:function(e){return/^(\u0434\u043d\u044f|\u0432\u0435\u0447\u043e\u0440\u0430)$/.test(e)},meridiem:function(e,a,t){return e<4?"\u043d\u043e\u0447\u0456":e<12?"\u0440\u0430\u043d\u043a\u0443":e<17?"\u0434\u043d\u044f":"\u0432\u0435\u0447\u043e\u0440\u0430"},dayOfMonthOrdinalParse:/\d{1,2}-(\u0439|\u0433\u043e)/,ordinal:function(e,a){switch(a){case"M":case"d":case"DDD":case"w":case"W":return e+"-\u0439";case"D":return e+"-\u0433\u043e";default:return e}},week:{dow:1,doy:7}});var hd=["\u062c\u0646\u0648\u0631\u06cc","\u0641\u0631\u0648\u0631\u06cc","\u0645\u0627\u0631\u0686","\u0627\u067e\u0631\u06cc\u0644","\u0645\u0626\u06cc","\u062c\u0648\u0646","\u062c\u0648\u0644\u0627\u0626\u06cc","\u0627\u06af\u0633\u062a","\u0633\u062a\u0645\u0628\u0631","\u0627\u06a9\u062a\u0648\u0628\u0631","\u0646\u0648\u0645\u0628\u0631","\u062f\u0633\u0645\u0628\u0631"],Ld=["\u0627\u062a\u0648\u0627\u0631","\u067e\u06cc\u0631","\u0645\u0646\u06af\u0644","\u0628\u062f\u06be","\u062c\u0645\u0639\u0631\u0627\u062a","\u062c\u0645\u0639\u06c1","\u06c1\u0641\u062a\u06c1"];return l.defineLocale("ur",{months:hd,monthsShort:hd,weekdays:Ld,weekdaysShort:Ld,weekdaysMin:Ld,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd\u060c D MMMM YYYY HH:mm"},meridiemParse:/\u0635\u0628\u062d|\u0634\u0627\u0645/,isPM:function(e){return"\u0634\u0627\u0645"===e},meridiem:function(e,a,t){return e<12?"\u0635\u0628\u062d":"\u0634\u0627\u0645"},calendar:{sameDay:"[\u0622\u062c \u0628\u0648\u0642\u062a] LT",nextDay:"[\u06a9\u0644 \u0628\u0648\u0642\u062a] LT",nextWeek:"dddd [\u0628\u0648\u0642\u062a] LT",lastDay:"[\u06af\u0630\u0634\u062a\u06c1 \u0631\u0648\u0632 \u0628\u0648\u0642\u062a] LT",lastWeek:"[\u06af\u0630\u0634\u062a\u06c1] dddd [\u0628\u0648\u0642\u062a] LT",sameElse:"L"},relativeTime:{future:"%s \u0628\u0639\u062f",past:"%s \u0642\u0628\u0644",s:"\u0686\u0646\u062f \u0633\u06cc\u06a9\u0646\u0688",ss:"%d \u0633\u06cc\u06a9\u0646\u0688",m:"\u0627\u06cc\u06a9 \u0645\u0646\u0679",mm:"%d \u0645\u0646\u0679",h:"\u0627\u06cc\u06a9 \u06af\u06be\u0646\u0679\u06c1",hh:"%d \u06af\u06be\u0646\u0679\u06d2",d:"\u0627\u06cc\u06a9 \u062f\u0646",dd:"%d \u062f\u0646",M:"\u0627\u06cc\u06a9 \u0645\u0627\u06c1",MM:"%d \u0645\u0627\u06c1",y:"\u0627\u06cc\u06a9 \u0633\u0627\u0644",yy:"%d \u0633\u0627\u0644"},preparse:function(e){return e.replace(/\u060c/g,",")},postformat:function(e){return e.replace(/,/g,"\u060c")},week:{dow:1,doy:4}}),l.defineLocale("uz-latn",{months:"Yanvar_Fevral_Mart_Aprel_May_Iyun_Iyul_Avgust_Sentabr_Oktabr_Noyabr_Dekabr".split("_"),monthsShort:"Yan_Fev_Mar_Apr_May_Iyun_Iyul_Avg_Sen_Okt_Noy_Dek".split("_"),weekdays:"Yakshanba_Dushanba_Seshanba_Chorshanba_Payshanba_Juma_Shanba".split("_"),weekdaysShort:"Yak_Dush_Sesh_Chor_Pay_Jum_Shan".split("_"),weekdaysMin:"Ya_Du_Se_Cho_Pa_Ju_Sha".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"D MMMM YYYY, dddd HH:mm"},calendar:{sameDay:"[Bugun soat] LT [da]",nextDay:"[Ertaga] LT [da]",nextWeek:"dddd [kuni soat] LT [da]",lastDay:"[Kecha soat] LT [da]",lastWeek:"[O'tgan] dddd [kuni soat] LT [da]",sameElse:"L"},relativeTime:{future:"Yaqin %s ichida",past:"Bir necha %s oldin",s:"soniya",ss:"%d soniya",m:"bir daqiqa",mm:"%d daqiqa",h:"bir soat",hh:"%d soat",d:"bir kun",dd:"%d kun",M:"bir oy",MM:"%d oy",y:"bir yil",yy:"%d yil"},week:{dow:1,doy:7}}),l.defineLocale("uz",{months:"\u044f\u043d\u0432\u0430\u0440_\u0444\u0435\u0432\u0440\u0430\u043b_\u043c\u0430\u0440\u0442_\u0430\u043f\u0440\u0435\u043b_\u043c\u0430\u0439_\u0438\u044e\u043d_\u0438\u044e\u043b_\u0430\u0432\u0433\u0443\u0441\u0442_\u0441\u0435\u043d\u0442\u044f\u0431\u0440_\u043e\u043a\u0442\u044f\u0431\u0440_\u043d\u043e\u044f\u0431\u0440_\u0434\u0435\u043a\u0430\u0431\u0440".split("_"),monthsShort:"\u044f\u043d\u0432_\u0444\u0435\u0432_\u043c\u0430\u0440_\u0430\u043f\u0440_\u043c\u0430\u0439_\u0438\u044e\u043d_\u0438\u044e\u043b_\u0430\u0432\u0433_\u0441\u0435\u043d_\u043e\u043a\u0442_\u043d\u043e\u044f_\u0434\u0435\u043a".split("_"),weekdays:"\u042f\u043a\u0448\u0430\u043d\u0431\u0430_\u0414\u0443\u0448\u0430\u043d\u0431\u0430_\u0421\u0435\u0448\u0430\u043d\u0431\u0430_\u0427\u043e\u0440\u0448\u0430\u043d\u0431\u0430_\u041f\u0430\u0439\u0448\u0430\u043d\u0431\u0430_\u0416\u0443\u043c\u0430_\u0428\u0430\u043d\u0431\u0430".split("_"),weekdaysShort:"\u042f\u043a\u0448_\u0414\u0443\u0448_\u0421\u0435\u0448_\u0427\u043e\u0440_\u041f\u0430\u0439_\u0416\u0443\u043c_\u0428\u0430\u043d".split("_"),weekdaysMin:"\u042f\u043a_\u0414\u0443_\u0421\u0435_\u0427\u043e_\u041f\u0430_\u0416\u0443_\u0428\u0430".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"D MMMM YYYY, dddd HH:mm"},calendar:{sameDay:"[\u0411\u0443\u0433\u0443\u043d \u0441\u043e\u0430\u0442] LT [\u0434\u0430]",nextDay:"[\u042d\u0440\u0442\u0430\u0433\u0430] LT [\u0434\u0430]",nextWeek:"dddd [\u043a\u0443\u043d\u0438 \u0441\u043e\u0430\u0442] LT [\u0434\u0430]",lastDay:"[\u041a\u0435\u0447\u0430 \u0441\u043e\u0430\u0442] LT [\u0434\u0430]",lastWeek:"[\u0423\u0442\u0433\u0430\u043d] dddd [\u043a\u0443\u043d\u0438 \u0441\u043e\u0430\u0442] LT [\u0434\u0430]",sameElse:"L"},relativeTime:{future:"\u042f\u043a\u0438\u043d %s \u0438\u0447\u0438\u0434\u0430",past:"\u0411\u0438\u0440 \u043d\u0435\u0447\u0430 %s \u043e\u043b\u0434\u0438\u043d",s:"\u0444\u0443\u0440\u0441\u0430\u0442",ss:"%d \u0444\u0443\u0440\u0441\u0430\u0442",m:"\u0431\u0438\u0440 \u0434\u0430\u043a\u0438\u043a\u0430",mm:"%d \u0434\u0430\u043a\u0438\u043a\u0430",h:"\u0431\u0438\u0440 \u0441\u043e\u0430\u0442",hh:"%d \u0441\u043e\u0430\u0442",d:"\u0431\u0438\u0440 \u043a\u0443\u043d",dd:"%d \u043a\u0443\u043d",M:"\u0431\u0438\u0440 \u043e\u0439",MM:"%d \u043e\u0439",y:"\u0431\u0438\u0440 \u0439\u0438\u043b",yy:"%d \u0439\u0438\u043b"},week:{dow:1,doy:7}}),l.defineLocale("vi",{months:"th\xe1ng 1_th\xe1ng 2_th\xe1ng 3_th\xe1ng 4_th\xe1ng 5_th\xe1ng 6_th\xe1ng 7_th\xe1ng 8_th\xe1ng 9_th\xe1ng 10_th\xe1ng 11_th\xe1ng 12".split("_"),monthsShort:"Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12".split("_"),monthsParseExact:!0,weekdays:"ch\u1ee7 nh\u1eadt_th\u1ee9 hai_th\u1ee9 ba_th\u1ee9 t\u01b0_th\u1ee9 n\u0103m_th\u1ee9 s\xe1u_th\u1ee9 b\u1ea3y".split("_"),weekdaysShort:"CN_T2_T3_T4_T5_T6_T7".split("_"),weekdaysMin:"CN_T2_T3_T4_T5_T6_T7".split("_"),weekdaysParseExact:!0,meridiemParse:/sa|ch/i,isPM:function(e){return/^ch$/i.test(e)},meridiem:function(e,a,t){return e<12?t?"sa":"SA":t?"ch":"CH"},longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM [n\u0103m] YYYY",LLL:"D MMMM [n\u0103m] YYYY HH:mm",LLLL:"dddd, D MMMM [n\u0103m] YYYY HH:mm",l:"DD/M/YYYY",ll:"D MMM YYYY",lll:"D MMM YYYY HH:mm",llll:"ddd, D MMM YYYY HH:mm"},calendar:{sameDay:"[H\xf4m nay l\xfac] LT",nextDay:"[Ng\xe0y mai l\xfac] LT",nextWeek:"dddd [tu\u1ea7n t\u1edbi l\xfac] LT",lastDay:"[H\xf4m qua l\xfac] LT",lastWeek:"dddd [tu\u1ea7n r\u1ed3i l\xfac] LT",sameElse:"L"},relativeTime:{future:"%s t\u1edbi",past:"%s tr\u01b0\u1edbc",s:"v\xe0i gi\xe2y",ss:"%d gi\xe2y",m:"m\u1ed9t ph\xfat",mm:"%d ph\xfat",h:"m\u1ed9t gi\u1edd",hh:"%d gi\u1edd",d:"m\u1ed9t ng\xe0y",dd:"%d ng\xe0y",M:"m\u1ed9t th\xe1ng",MM:"%d th\xe1ng",y:"m\u1ed9t n\u0103m",yy:"%d n\u0103m"},dayOfMonthOrdinalParse:/\d{1,2}/,ordinal:function(e){return e},week:{dow:1,doy:4}}),l.defineLocale("x-pseudo",{months:"J~\xe1\xf1\xfa\xe1~r\xfd_F~\xe9br\xfa~\xe1r\xfd_~M\xe1rc~h_\xc1p~r\xedl_~M\xe1\xfd_~J\xfa\xf1\xe9~_J\xfal~\xfd_\xc1\xfa~g\xfast~_S\xe9p~t\xe9mb~\xe9r_\xd3~ct\xf3b~\xe9r_\xd1~\xf3v\xe9m~b\xe9r_~D\xe9c\xe9~mb\xe9r".split("_"),monthsShort:"J~\xe1\xf1_~F\xe9b_~M\xe1r_~\xc1pr_~M\xe1\xfd_~J\xfa\xf1_~J\xfal_~\xc1\xfag_~S\xe9p_~\xd3ct_~\xd1\xf3v_~D\xe9c".split("_"),monthsParseExact:!0,weekdays:"S~\xfa\xf1d\xe1~\xfd_M\xf3~\xf1d\xe1\xfd~_T\xfa\xe9~sd\xe1\xfd~_W\xe9d~\xf1\xe9sd~\xe1\xfd_T~h\xfars~d\xe1\xfd_~Fr\xedd~\xe1\xfd_S~\xe1t\xfar~d\xe1\xfd".split("_"),weekdaysShort:"S~\xfa\xf1_~M\xf3\xf1_~T\xfa\xe9_~W\xe9d_~Th\xfa_~Fr\xed_~S\xe1t".split("_"),weekdaysMin:"S~\xfa_M\xf3~_T\xfa_~W\xe9_T~h_Fr~_S\xe1".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[T~\xf3d\xe1~\xfd \xe1t] LT",nextDay:"[T~\xf3m\xf3~rr\xf3~w \xe1t] LT",nextWeek:"dddd [\xe1t] LT",lastDay:"[\xdd~\xe9st~\xe9rd\xe1~\xfd \xe1t] LT",lastWeek:"[L~\xe1st] dddd [\xe1t] LT",sameElse:"L"},relativeTime:{future:"\xed~\xf1 %s",past:"%s \xe1~g\xf3",s:"\xe1 ~f\xe9w ~s\xe9c\xf3~\xf1ds",ss:"%d s~\xe9c\xf3\xf1~ds",m:"\xe1 ~m\xed\xf1~\xfat\xe9",mm:"%d m~\xed\xf1\xfa~t\xe9s",h:"\xe1~\xf1 h\xf3~\xfar",hh:"%d h~\xf3\xfars",d:"\xe1 ~d\xe1\xfd",dd:"%d d~\xe1\xfds",M:"\xe1 ~m\xf3\xf1~th",MM:"%d m~\xf3\xf1t~hs",y:"\xe1 ~\xfd\xe9\xe1r",yy:"%d \xfd~\xe9\xe1rs"},dayOfMonthOrdinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(e){var a=e%10;return e+(1==~~(e%100/10)?"th":1===a?"st":2===a?"nd":3===a?"rd":"th")},week:{dow:1,doy:4}}),l.defineLocale("yo",{months:"S\u1eb9\u0301r\u1eb9\u0301_E\u0300re\u0300le\u0300_\u1eb8r\u1eb9\u0300na\u0300_I\u0300gbe\u0301_E\u0300bibi_O\u0300ku\u0300du_Ag\u1eb9mo_O\u0300gu\u0301n_Owewe_\u1ecc\u0300wa\u0300ra\u0300_Be\u0301lu\u0301_\u1ecc\u0300p\u1eb9\u0300\u0300".split("_"),monthsShort:"S\u1eb9\u0301r_E\u0300rl_\u1eb8rn_I\u0300gb_E\u0300bi_O\u0300ku\u0300_Ag\u1eb9_O\u0300gu\u0301_Owe_\u1ecc\u0300wa\u0300_Be\u0301l_\u1ecc\u0300p\u1eb9\u0300\u0300".split("_"),weekdays:"A\u0300i\u0300ku\u0301_Aje\u0301_I\u0300s\u1eb9\u0301gun_\u1eccj\u1ecd\u0301ru\u0301_\u1eccj\u1ecd\u0301b\u1ecd_\u1eb8ti\u0300_A\u0300ba\u0301m\u1eb9\u0301ta".split("_"),weekdaysShort:"A\u0300i\u0300k_Aje\u0301_I\u0300s\u1eb9\u0301_\u1eccjr_\u1eccjb_\u1eb8ti\u0300_A\u0300ba\u0301".split("_"),weekdaysMin:"A\u0300i\u0300_Aj_I\u0300s_\u1eccr_\u1eccb_\u1eb8t_A\u0300b".split("_"),longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendar:{sameDay:"[O\u0300ni\u0300 ni] LT",nextDay:"[\u1ecc\u0300la ni] LT",nextWeek:"dddd [\u1eccs\u1eb9\u0300 to\u0301n'b\u1ecd] [ni] LT",lastDay:"[A\u0300na ni] LT",lastWeek:"dddd [\u1eccs\u1eb9\u0300 to\u0301l\u1ecd\u0301] [ni] LT",sameElse:"L"},relativeTime:{future:"ni\u0301 %s",past:"%s k\u1ecdja\u0301",s:"i\u0300s\u1eb9ju\u0301 aaya\u0301 die",ss:"aaya\u0301 %d",m:"i\u0300s\u1eb9ju\u0301 kan",mm:"i\u0300s\u1eb9ju\u0301 %d",h:"wa\u0301kati kan",hh:"wa\u0301kati %d",d:"\u1ecdj\u1ecd\u0301 kan",dd:"\u1ecdj\u1ecd\u0301 %d",M:"osu\u0300 kan",MM:"osu\u0300 %d",y:"\u1ecddu\u0301n kan",yy:"\u1ecddu\u0301n %d"},dayOfMonthOrdinalParse:/\u1ecdj\u1ecd\u0301\s\d{1,2}/,ordinal:"\u1ecdj\u1ecd\u0301 %d",week:{dow:1,doy:4}}),l.defineLocale("zh-cn",{months:"\u4e00\u6708_\u4e8c\u6708_\u4e09\u6708_\u56db\u6708_\u4e94\u6708_\u516d\u6708_\u4e03\u6708_\u516b\u6708_\u4e5d\u6708_\u5341\u6708_\u5341\u4e00\u6708_\u5341\u4e8c\u6708".split("_"),monthsShort:"1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"),weekdays:"\u661f\u671f\u65e5_\u661f\u671f\u4e00_\u661f\u671f\u4e8c_\u661f\u671f\u4e09_\u661f\u671f\u56db_\u661f\u671f\u4e94_\u661f\u671f\u516d".split("_"),weekdaysShort:"\u5468\u65e5_\u5468\u4e00_\u5468\u4e8c_\u5468\u4e09_\u5468\u56db_\u5468\u4e94_\u5468\u516d".split("_"),weekdaysMin:"\u65e5_\u4e00_\u4e8c_\u4e09_\u56db_\u4e94_\u516d".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY/MM/DD",LL:"YYYY\u5e74M\u6708D\u65e5",LLL:"YYYY\u5e74M\u6708D\u65e5Ah\u70b9mm\u5206",LLLL:"YYYY\u5e74M\u6708D\u65e5ddddAh\u70b9mm\u5206",l:"YYYY/M/D",ll:"YYYY\u5e74M\u6708D\u65e5",lll:"YYYY\u5e74M\u6708D\u65e5 HH:mm",llll:"YYYY\u5e74M\u6708D\u65e5dddd HH:mm"},meridiemParse:/\u51cc\u6668|\u65e9\u4e0a|\u4e0a\u5348|\u4e2d\u5348|\u4e0b\u5348|\u665a\u4e0a/,meridiemHour:function(e,a){return 12===e&&(e=0),"\u51cc\u6668"===a||"\u65e9\u4e0a"===a||"\u4e0a\u5348"===a?e:"\u4e0b\u5348"===a||"\u665a\u4e0a"===a?e+12:11<=e?e:e+12},meridiem:function(e,a,t){var s=100*e+a;return s<600?"\u51cc\u6668":s<900?"\u65e9\u4e0a":s<1130?"\u4e0a\u5348":s<1230?"\u4e2d\u5348":s<1800?"\u4e0b\u5348":"\u665a\u4e0a"},calendar:{sameDay:"[\u4eca\u5929]LT",nextDay:"[\u660e\u5929]LT",nextWeek:"[\u4e0b]ddddLT",lastDay:"[\u6628\u5929]LT",lastWeek:"[\u4e0a]ddddLT",sameElse:"L"},dayOfMonthOrdinalParse:/\d{1,2}(\u65e5|\u6708|\u5468)/,ordinal:function(e,a){switch(a){case"d":case"D":case"DDD":return e+"\u65e5";case"M":return e+"\u6708";case"w":case"W":return e+"\u5468";default:return e}},relativeTime:{future:"%s\u5185",past:"%s\u524d",s:"\u51e0\u79d2",ss:"%d \u79d2",m:"1 \u5206\u949f",mm:"%d \u5206\u949f",h:"1 \u5c0f\u65f6",hh:"%d \u5c0f\u65f6",d:"1 \u5929",dd:"%d \u5929",M:"1 \u4e2a\u6708",MM:"%d \u4e2a\u6708",y:"1 \u5e74",yy:"%d \u5e74"},week:{dow:1,doy:4}}),l.defineLocale("zh-hk",{months:"\u4e00\u6708_\u4e8c\u6708_\u4e09\u6708_\u56db\u6708_\u4e94\u6708_\u516d\u6708_\u4e03\u6708_\u516b\u6708_\u4e5d\u6708_\u5341\u6708_\u5341\u4e00\u6708_\u5341\u4e8c\u6708".split("_"),monthsShort:"1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"),weekdays:"\u661f\u671f\u65e5_\u661f\u671f\u4e00_\u661f\u671f\u4e8c_\u661f\u671f\u4e09_\u661f\u671f\u56db_\u661f\u671f\u4e94_\u661f\u671f\u516d".split("_"),weekdaysShort:"\u9031\u65e5_\u9031\u4e00_\u9031\u4e8c_\u9031\u4e09_\u9031\u56db_\u9031\u4e94_\u9031\u516d".split("_"),weekdaysMin:"\u65e5_\u4e00_\u4e8c_\u4e09_\u56db_\u4e94_\u516d".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY/MM/DD",LL:"YYYY\u5e74M\u6708D\u65e5",LLL:"YYYY\u5e74M\u6708D\u65e5 HH:mm",LLLL:"YYYY\u5e74M\u6708D\u65e5dddd HH:mm",l:"YYYY/M/D",ll:"YYYY\u5e74M\u6708D\u65e5",lll:"YYYY\u5e74M\u6708D\u65e5 HH:mm",llll:"YYYY\u5e74M\u6708D\u65e5dddd HH:mm"},meridiemParse:/\u51cc\u6668|\u65e9\u4e0a|\u4e0a\u5348|\u4e2d\u5348|\u4e0b\u5348|\u665a\u4e0a/,meridiemHour:function(e,a){return 12===e&&(e=0),"\u51cc\u6668"===a||"\u65e9\u4e0a"===a||"\u4e0a\u5348"===a?e:"\u4e2d\u5348"===a?11<=e?e:e+12:"\u4e0b\u5348"===a||"\u665a\u4e0a"===a?e+12:void 0},meridiem:function(e,a,t){var s=100*e+a;return s<600?"\u51cc\u6668":s<900?"\u65e9\u4e0a":s<1130?"\u4e0a\u5348":s<1230?"\u4e2d\u5348":s<1800?"\u4e0b\u5348":"\u665a\u4e0a"},calendar:{sameDay:"[\u4eca\u5929]LT",nextDay:"[\u660e\u5929]LT",nextWeek:"[\u4e0b]ddddLT",lastDay:"[\u6628\u5929]LT",lastWeek:"[\u4e0a]ddddLT",sameElse:"L"},dayOfMonthOrdinalParse:/\d{1,2}(\u65e5|\u6708|\u9031)/,ordinal:function(e,a){switch(a){case"d":case"D":case"DDD":return e+"\u65e5";case"M":return e+"\u6708";case"w":case"W":return e+"\u9031";default:return e}},relativeTime:{future:"%s\u5167",past:"%s\u524d",s:"\u5e7e\u79d2",ss:"%d \u79d2",m:"1 \u5206\u9418",mm:"%d \u5206\u9418",h:"1 \u5c0f\u6642",hh:"%d \u5c0f\u6642",d:"1 \u5929",dd:"%d \u5929",M:"1 \u500b\u6708",MM:"%d \u500b\u6708",y:"1 \u5e74",yy:"%d \u5e74"}}),l.defineLocale("zh-tw",{months:"\u4e00\u6708_\u4e8c\u6708_\u4e09\u6708_\u56db\u6708_\u4e94\u6708_\u516d\u6708_\u4e03\u6708_\u516b\u6708_\u4e5d\u6708_\u5341\u6708_\u5341\u4e00\u6708_\u5341\u4e8c\u6708".split("_"),monthsShort:"1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"),weekdays:"\u661f\u671f\u65e5_\u661f\u671f\u4e00_\u661f\u671f\u4e8c_\u661f\u671f\u4e09_\u661f\u671f\u56db_\u661f\u671f\u4e94_\u661f\u671f\u516d".split("_"),weekdaysShort:"\u9031\u65e5_\u9031\u4e00_\u9031\u4e8c_\u9031\u4e09_\u9031\u56db_\u9031\u4e94_\u9031\u516d".split("_"),weekdaysMin:"\u65e5_\u4e00_\u4e8c_\u4e09_\u56db_\u4e94_\u516d".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY/MM/DD",LL:"YYYY\u5e74M\u6708D\u65e5",LLL:"YYYY\u5e74M\u6708D\u65e5 HH:mm",LLLL:"YYYY\u5e74M\u6708D\u65e5dddd HH:mm",l:"YYYY/M/D",ll:"YYYY\u5e74M\u6708D\u65e5",lll:"YYYY\u5e74M\u6708D\u65e5 HH:mm",llll:"YYYY\u5e74M\u6708D\u65e5dddd HH:mm"},meridiemParse:/\u51cc\u6668|\u65e9\u4e0a|\u4e0a\u5348|\u4e2d\u5348|\u4e0b\u5348|\u665a\u4e0a/,meridiemHour:function(e,a){return 12===e&&(e=0),"\u51cc\u6668"===a||"\u65e9\u4e0a"===a||"\u4e0a\u5348"===a?e:"\u4e2d\u5348"===a?11<=e?e:e+12:"\u4e0b\u5348"===a||"\u665a\u4e0a"===a?e+12:void 0},meridiem:function(e,a,t){var s=100*e+a;return s<600?"\u51cc\u6668":s<900?"\u65e9\u4e0a":s<1130?"\u4e0a\u5348":s<1230?"\u4e2d\u5348":s<1800?"\u4e0b\u5348":"\u665a\u4e0a"},calendar:{sameDay:"[\u4eca\u5929] LT",nextDay:"[\u660e\u5929] LT",nextWeek:"[\u4e0b]dddd LT",lastDay:"[\u6628\u5929] LT",lastWeek:"[\u4e0a]dddd LT",sameElse:"L"},dayOfMonthOrdinalParse:/\d{1,2}(\u65e5|\u6708|\u9031)/,ordinal:function(e,a){switch(a){case"d":case"D":case"DDD":return e+"\u65e5";case"M":return e+"\u6708";case"w":case"W":return e+"\u9031";default:return e}},relativeTime:{future:"%s\u5167",past:"%s\u524d",s:"\u5e7e\u79d2",ss:"%d \u79d2",m:"1 \u5206\u9418",mm:"%d \u5206\u9418",h:"1 \u5c0f\u6642",hh:"%d \u5c0f\u6642",d:"1 \u5929",dd:"%d \u5929",M:"1 \u500b\u6708",MM:"%d \u500b\u6708",y:"1 \u5e74",yy:"%d \u5e74"}}),l.locale("en"),l});
"use strict";
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
   *                                  - `preventDefault: true | false | 'mouse' | 'touch' | 'pen'`.
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
      var srcStop = event.srcEvent.stopPropagation.bind(event.srcEvent);
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

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.ResizeObserver = factory());
}(this, (function () { ;
    /**
     * A collection of shims that provide minimal functionality of the ES6 collections.
     *
     * These implementations are not meant to be used outside of the ResizeObserver
     * modules as they cover only a limited range of use cases.
     */
    /* eslint-disable require-jsdoc, valid-jsdoc */
    var MapShim = (function () {
        if (typeof Map !== 'undefined') {
            return Map;
        }
        /**
         * Returns index in provided array that matches the specified key.
         *
         * @param {Array<Array>} arr
         * @param {*} key
         * @returns {number}
         */
        function getIndex(arr, key) {
            var result = -1;
            arr.some(function (entry, index) {
                if (entry[0] === key) {
                    result = index;
                    return true;
                }
                return false;
            });
            return result;
        }
        return /** @class */ (function () {
            function class_1() {
                this.__entries__ = [];
            }
            Object.defineProperty(class_1.prototype, "size", {
                /**
                 * @returns {boolean}
                 */
                get: function () {
                    return this.__entries__.length;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * @param {*} key
             * @returns {*}
             */
            class_1.prototype.get = function (key) {
                var index = getIndex(this.__entries__, key);
                var entry = this.__entries__[index];
                return entry && entry[1];
            };
            /**
             * @param {*} key
             * @param {*} value
             * @returns {void}
             */
            class_1.prototype.set = function (key, value) {
                var index = getIndex(this.__entries__, key);
                if (~index) {
                    this.__entries__[index][1] = value;
                }
                else {
                    this.__entries__.push([key, value]);
                }
            };
            /**
             * @param {*} key
             * @returns {void}
             */
            class_1.prototype.delete = function (key) {
                var entries = this.__entries__;
                var index = getIndex(entries, key);
                if (~index) {
                    entries.splice(index, 1);
                }
            };
            /**
             * @param {*} key
             * @returns {void}
             */
            class_1.prototype.has = function (key) {
                return !!~getIndex(this.__entries__, key);
            };
            /**
             * @returns {void}
             */
            class_1.prototype.clear = function () {
                this.__entries__.splice(0);
            };
            /**
             * @param {Function} callback
             * @param {*} [ctx=null]
             * @returns {void}
             */
            class_1.prototype.forEach = function (callback, ctx) {
                if (ctx === void 0) { ctx = null; }
                for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
                    var entry = _a[_i];
                    callback.call(ctx, entry[1], entry[0]);
                }
            };
            return class_1;
        }());
    })();
    /**
     * Detects whether window and document objects are available in current environment.
     */
    var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && window.document === document;
    // Returns global object of a current environment.
    var global$1 = (function () {
        if (typeof global !== 'undefined' && global.Math === Math) {
            return global;
        }
        if (typeof self !== 'undefined' && self.Math === Math) {
            return self;
        }
        if (typeof window !== 'undefined' && window.Math === Math) {
            return window;
        }
        // eslint-disable-next-line no-new-func
        return Function('return this')();
    })();
    /**
     * A shim for the requestAnimationFrame which falls back to the setTimeout if
     * first one is not supported.
     *
     * @returns {number} Requests' identifier.
     */
    var requestAnimationFrame$1 = (function () {
        if (typeof requestAnimationFrame === 'function') {
            // It's required to use a bounded function because IE sometimes throws
            // an "Invalid calling object" error if rAF is invoked without the global
            // object on the left hand side.
            return requestAnimationFrame.bind(global$1);
        }
        return function (callback) { return setTimeout(function () { return callback(Date.now()); }, 1000 / 60); };
    })();
    // Defines minimum timeout before adding a trailing call.
    var trailingTimeout = 2;
    /**
     * Creates a wrapper function which ensures that provided callback will be
     * invoked only once during the specified delay period.
     *
     * @param {Function} callback - Function to be invoked after the delay period.
     * @param {number} delay - Delay after which to invoke callback.
     * @returns {Function}
     */
    function throttle (callback, delay) {
        var leadingCall = false, trailingCall = false, lastCallTime = 0;
        /**
         * Invokes the original callback function and schedules new invocation if
         * the "proxy" was called during current request.
         *
         * @returns {void}
         */
        function resolvePending() {
            if (leadingCall) {
                leadingCall = false;
                callback();
            }
            if (trailingCall) {
                proxy();
            }
        }
        /**
         * Callback invoked after the specified delay. It will further postpone
         * invocation of the original function delegating it to the
         * requestAnimationFrame.
         *
         * @returns {void}
         */
        function timeoutCallback() {
            requestAnimationFrame$1(resolvePending);
        }
        /**
         * Schedules invocation of the original function.
         *
         * @returns {void}
         */
        function proxy() {
            var timeStamp = Date.now();
            if (leadingCall) {
                // Reject immediately following calls.
                if (timeStamp - lastCallTime < trailingTimeout) {
                    return;
                }
                // Schedule new call to be in invoked when the pending one is resolved.
                // This is important for "transitions" which never actually start
                // immediately so there is a chance that we might miss one if change
                // happens amids the pending invocation.
                trailingCall = true;
            }
            else {
                leadingCall = true;
                trailingCall = false;
                setTimeout(timeoutCallback, delay);
            }
            lastCallTime = timeStamp;
        }
        return proxy;
    }
    // Minimum delay before invoking the update of observers.
    var REFRESH_DELAY = 20;
    // A list of substrings of CSS properties used to find transition events that
    // might affect dimensions of observed elements.
    var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'];
    // Check if MutationObserver is available.
    var mutationObserverSupported = typeof MutationObserver !== 'undefined';
    /**
     * Singleton controller class which handles updates of ResizeObserver instances.
     */
    var ResizeObserverController = /** @class */ (function () {
        /**
         * Creates a new instance of ResizeObserverController.
         *
         * @private
         */
        function ResizeObserverController() {
            /**
             * Indicates whether DOM listeners have been added.
             *
             * @private {boolean}
             */
            this.connected_ = false;
            /**
             * Tells that controller has subscribed for Mutation Events.
             *
             * @private {boolean}
             */
            this.mutationEventsAdded_ = false;
            /**
             * Keeps reference to the instance of MutationObserver.
             *
             * @private {MutationObserver}
             */
            this.mutationsObserver_ = null;
            /**
             * A list of connected observers.
             *
             * @private {Array<ResizeObserverSPI>}
             */
            this.observers_ = [];
            this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
            this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
        }
        /**
         * Adds observer to observers list.
         *
         * @param {ResizeObserverSPI} observer - Observer to be added.
         * @returns {void}
         */
        ResizeObserverController.prototype.addObserver = function (observer) {
            if (!~this.observers_.indexOf(observer)) {
                this.observers_.push(observer);
            }
            // Add listeners if they haven't been added yet.
            if (!this.connected_) {
                this.connect_();
            }
        };
        /**
         * Removes observer from observers list.
         *
         * @param {ResizeObserverSPI} observer - Observer to be removed.
         * @returns {void}
         */
        ResizeObserverController.prototype.removeObserver = function (observer) {
            var observers = this.observers_;
            var index = observers.indexOf(observer);
            // Remove observer if it's present in registry.
            if (~index) {
                observers.splice(index, 1);
            }
            // Remove listeners if controller has no connected observers.
            if (!observers.length && this.connected_) {
                this.disconnect_();
            }
        };
        /**
         * Invokes the update of observers. It will continue running updates insofar
         * it detects changes.
         *
         * @returns {void}
         */
        ResizeObserverController.prototype.refresh = function () {
            var changesDetected = this.updateObservers_();
            // Continue running updates if changes have been detected as there might
            // be future ones caused by CSS transitions.
            if (changesDetected) {
                this.refresh();
            }
        };
        /**
         * Updates every observer from observers list and notifies them of queued
         * entries.
         *
         * @private
         * @returns {boolean} Returns "true" if any observer has detected changes in
         *      dimensions of it's elements.
         */
        ResizeObserverController.prototype.updateObservers_ = function () {
            // Collect observers that have active observations.
            var activeObservers = this.observers_.filter(function (observer) {
                return observer.gatherActive(), observer.hasActive();
            });
            // Deliver notifications in a separate cycle in order to avoid any
            // collisions between observers, e.g. when multiple instances of
            // ResizeObserver are tracking the same element and the callback of one
            // of them changes content dimensions of the observed target. Sometimes
            // this may result in notifications being blocked for the rest of observers.
            activeObservers.forEach(function (observer) { return observer.broadcastActive(); });
            return activeObservers.length > 0;
        };
        /**
         * Initializes DOM listeners.
         *
         * @private
         * @returns {void}
         */
        ResizeObserverController.prototype.connect_ = function () {
            // Do nothing if running in a non-browser environment or if listeners
            // have been already added.
            if (!isBrowser || this.connected_) {
                return;
            }
            // Subscription to the "Transitionend" event is used as a workaround for
            // delayed transitions. This way it's possible to capture at least the
            // final state of an element.
            document.addEventListener('transitionend', this.onTransitionEnd_);
            window.addEventListener('resize', this.refresh);
            if (mutationObserverSupported) {
                this.mutationsObserver_ = new MutationObserver(this.refresh);
                this.mutationsObserver_.observe(document, {
                    attributes: true,
                    childList: true,
                    characterData: true,
                    subtree: true
                });
            }
            else {
                document.addEventListener('DOMSubtreeModified', this.refresh);
                this.mutationEventsAdded_ = true;
            }
            this.connected_ = true;
        };
        /**
         * Removes DOM listeners.
         *
         * @private
         * @returns {void}
         */
        ResizeObserverController.prototype.disconnect_ = function () {
            // Do nothing if running in a non-browser environment or if listeners
            // have been already removed.
            if (!isBrowser || !this.connected_) {
                return;
            }
            document.removeEventListener('transitionend', this.onTransitionEnd_);
            window.removeEventListener('resize', this.refresh);
            if (this.mutationsObserver_) {
                this.mutationsObserver_.disconnect();
            }
            if (this.mutationEventsAdded_) {
                document.removeEventListener('DOMSubtreeModified', this.refresh);
            }
            this.mutationsObserver_ = null;
            this.mutationEventsAdded_ = false;
            this.connected_ = false;
        };
        /**
         * "Transitionend" event handler.
         *
         * @private
         * @param {TransitionEvent} event
         * @returns {void}
         */
        ResizeObserverController.prototype.onTransitionEnd_ = function (_a) {
            var _b = _a.propertyName, propertyName = _b === void 0 ? '' : _b;
            // Detect whether transition may affect dimensions of an element.
            var isReflowProperty = transitionKeys.some(function (key) {
                return !!~propertyName.indexOf(key);
            });
            if (isReflowProperty) {
                this.refresh();
            }
        };
        /**
         * Returns instance of the ResizeObserverController.
         *
         * @returns {ResizeObserverController}
         */
        ResizeObserverController.getInstance = function () {
            if (!this.instance_) {
                this.instance_ = new ResizeObserverController();
            }
            return this.instance_;
        };
        /**
         * Holds reference to the controller's instance.
         *
         * @private {ResizeObserverController}
         */
        ResizeObserverController.instance_ = null;
        return ResizeObserverController;
    }());
    /**
     * Defines non-writable/enumerable properties of the provided target object.
     *
     * @param {Object} target - Object for which to define properties.
     * @param {Object} props - Properties to be defined.
     * @returns {Object} Target object.
     */
    var defineConfigurable = (function (target, props) {
        for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
            var key = _a[_i];
            Object.defineProperty(target, key, {
                value: props[key],
                enumerable: false,
                writable: false,
                configurable: true
            });
        }
        return target;
    });
    /**
     * Returns the global object associated with provided element.
     *
     * @param {Object} target
     * @returns {Object}
     */
    var getWindowOf = (function (target) {
        // Assume that the element is an instance of Node, which means that it
        // has the "ownerDocument" property from which we can retrieve a
        // corresponding global object.
        var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
        // Return the local global object if it's not possible extract one from
        // provided element.
        return ownerGlobal || global$1;
    });
    // Placeholder of an empty content rectangle.
    var emptyRect = createRectInit(0, 0, 0, 0);
    /**
     * Converts provided string to a number.
     *
     * @param {number|string} value
     * @returns {number}
     */
    function toFloat(value) {
        return parseFloat(value) || 0;
    }
    /**
     * Extracts borders size from provided styles.
     *
     * @param {CSSStyleDeclaration} styles
     * @param {...string} positions - Borders positions (top, right, ...)
     * @returns {number}
     */
    function getBordersSize(styles) {
        var positions = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            positions[_i - 1] = arguments[_i];
        }
        return positions.reduce(function (size, position) {
            var value = styles['border-' + position + '-width'];
            return size + toFloat(value);
        }, 0);
    }
    /**
     * Extracts paddings sizes from provided styles.
     *
     * @param {CSSStyleDeclaration} styles
     * @returns {Object} Paddings box.
     */
    function getPaddings(styles) {
        var positions = ['top', 'right', 'bottom', 'left'];
        var paddings = {};
        for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
            var position = positions_1[_i];
            var value = styles['padding-' + position];
            paddings[position] = toFloat(value);
        }
        return paddings;
    }
    /**
     * Calculates content rectangle of provided SVG element.
     *
     * @param {SVGGraphicsElement} target - Element content rectangle of which needs
     *      to be calculated.
     * @returns {DOMRectInit}
     */
    function getSVGContentRect(target) {
        var bbox = target.getBBox();
        return createRectInit(0, 0, bbox.width, bbox.height);
    }
    /**
     * Calculates content rectangle of provided HTMLElement.
     *
     * @param {HTMLElement} target - Element for which to calculate the content rectangle.
     * @returns {DOMRectInit}
     */
    function getHTMLElementContentRect(target) {
        // Client width & height properties can't be
        // used exclusively as they provide rounded values.
        var clientWidth = target.clientWidth, clientHeight = target.clientHeight;
        // By this condition we can catch all non-replaced inline, hidden and
        // detached elements. Though elements with width & height properties less
        // than 0.5 will be discarded as well.
        //
        // Without it we would need to implement separate methods for each of
        // those cases and it's not possible to perform a precise and performance
        // effective test for hidden elements. E.g. even jQuery's ':visible' filter
        // gives wrong results for elements with width & height less than 0.5.
        if (!clientWidth && !clientHeight) {
            return emptyRect;
        }
        var styles = getWindowOf(target).getComputedStyle(target);
        var paddings = getPaddings(styles);
        var horizPad = paddings.left + paddings.right;
        var vertPad = paddings.top + paddings.bottom;
        // Computed styles of width & height are being used because they are the
        // only dimensions available to JS that contain non-rounded values. It could
        // be possible to utilize the getBoundingClientRect if only it's data wasn't
        // affected by CSS transformations let alone paddings, borders and scroll bars.
        var width = toFloat(styles.width), height = toFloat(styles.height);
        // Width & height include paddings and borders when the 'border-box' box
        // model is applied (except for IE).
        if (styles.boxSizing === 'border-box') {
            // Following conditions are required to handle Internet Explorer which
            // doesn't include paddings and borders to computed CSS dimensions.
            //
            // We can say that if CSS dimensions + paddings are equal to the "client"
            // properties then it's either IE, and thus we don't need to subtract
            // anything, or an element merely doesn't have paddings/borders styles.
            if (Math.round(width + horizPad) !== clientWidth) {
                width -= getBordersSize(styles, 'left', 'right') + horizPad;
            }
            if (Math.round(height + vertPad) !== clientHeight) {
                height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
            }
        }
        // Following steps can't be applied to the document's root element as its
        // client[Width/Height] properties represent viewport area of the window.
        // Besides, it's as well not necessary as the <html> itself neither has
        // rendered scroll bars nor it can be clipped.
        if (!isDocumentElement(target)) {
            // In some browsers (only in Firefox, actually) CSS width & height
            // include scroll bars size which can be removed at this step as scroll
            // bars are the only difference between rounded dimensions + paddings
            // and "client" properties, though that is not always true in Chrome.
            var vertScrollbar = Math.round(width + horizPad) - clientWidth;
            var horizScrollbar = Math.round(height + vertPad) - clientHeight;
            // Chrome has a rather weird rounding of "client" properties.
            // E.g. for an element with content width of 314.2px it sometimes gives
            // the client width of 315px and for the width of 314.7px it may give
            // 314px. And it doesn't happen all the time. So just ignore this delta
            // as a non-relevant.
            if (Math.abs(vertScrollbar) !== 1) {
                width -= vertScrollbar;
            }
            if (Math.abs(horizScrollbar) !== 1) {
                height -= horizScrollbar;
            }
        }
        return createRectInit(paddings.left, paddings.top, width, height);
    }
    /**
     * Checks whether provided element is an instance of the SVGGraphicsElement.
     *
     * @param {Element} target - Element to be checked.
     * @returns {boolean}
     */
    var isSVGGraphicsElement = (function () {
        // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
        // interface.
        if (typeof SVGGraphicsElement !== 'undefined') {
            return function (target) { return target instanceof getWindowOf(target).SVGGraphicsElement; };
        }
        // If it's so, then check that element is at least an instance of the
        // SVGElement and that it has the "getBBox" method.
        // eslint-disable-next-line no-extra-parens
        return function (target) { return (target instanceof getWindowOf(target).SVGElement &&
            typeof target.getBBox === 'function'); };
    })();
    /**
     * Checks whether provided element is a document element (<html>).
     *
     * @param {Element} target - Element to be checked.
     * @returns {boolean}
     */
    function isDocumentElement(target) {
        return target === getWindowOf(target).document.documentElement;
    }
    /**
     * Calculates an appropriate content rectangle for provided html or svg element.
     *
     * @param {Element} target - Element content rectangle of which needs to be calculated.
     * @returns {DOMRectInit}
     */
    function getContentRect(target) {
        if (!isBrowser) {
            return emptyRect;
        }
        if (isSVGGraphicsElement(target)) {
            return getSVGContentRect(target);
        }
        return getHTMLElementContentRect(target);
    }
    /**
     * Creates rectangle with an interface of the DOMRectReadOnly.
     * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
     *
     * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
     * @returns {DOMRectReadOnly}
     */
    function createReadOnlyRect(_a) {
        var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
        // If DOMRectReadOnly is available use it as a prototype for the rectangle.
        var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
        var rect = Object.create(Constr.prototype);
        // Rectangle's properties are not writable and non-enumerable.
        defineConfigurable(rect, {
            x: x, y: y, width: width, height: height,
            top: y,
            right: x + width,
            bottom: height + y,
            left: x
        });
        return rect;
    }
    /**
     * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
     * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
     *
     * @param {number} x - X coordinate.
     * @param {number} y - Y coordinate.
     * @param {number} width - Rectangle's width.
     * @param {number} height - Rectangle's height.
     * @returns {DOMRectInit}
     */
    function createRectInit(x, y, width, height) {
        return { x: x, y: y, width: width, height: height };
    }
    /**
     * Class that is responsible for computations of the content rectangle of
     * provided DOM element and for keeping track of it's changes.
     */
    var ResizeObservation = /** @class */ (function () {
        /**
         * Creates an instance of ResizeObservation.
         *
         * @param {Element} target - Element to be observed.
         */
        function ResizeObservation(target) {
            /**
             * Broadcasted width of content rectangle.
             *
             * @type {number}
             */
            this.broadcastWidth = 0;
            /**
             * Broadcasted height of content rectangle.
             *
             * @type {number}
             */
            this.broadcastHeight = 0;
            /**
             * Reference to the last observed content rectangle.
             *
             * @private {DOMRectInit}
             */
            this.contentRect_ = createRectInit(0, 0, 0, 0);
            this.target = target;
        }
        /**
         * Updates content rectangle and tells whether it's width or height properties
         * have changed since the last broadcast.
         *
         * @returns {boolean}
         */
        ResizeObservation.prototype.isActive = function () {
            var rect = getContentRect(this.target);
            this.contentRect_ = rect;
            return (rect.width !== this.broadcastWidth ||
                rect.height !== this.broadcastHeight);
        };
        /**
         * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
         * from the corresponding properties of the last observed content rectangle.
         *
         * @returns {DOMRectInit} Last observed content rectangle.
         */
        ResizeObservation.prototype.broadcastRect = function () {
            var rect = this.contentRect_;
            this.broadcastWidth = rect.width;
            this.broadcastHeight = rect.height;
            return rect;
        };
        return ResizeObservation;
    }());
    var ResizeObserverEntry = /** @class */ (function () {
        /**
         * Creates an instance of ResizeObserverEntry.
         *
         * @param {Element} target - Element that is being observed.
         * @param {DOMRectInit} rectInit - Data of the element's content rectangle.
         */
        function ResizeObserverEntry(target, rectInit) {
            var contentRect = createReadOnlyRect(rectInit);
            // According to the specification following properties are not writable
            // and are also not enumerable in the native implementation.
            //
            // Property accessors are not being used as they'd require to define a
            // private WeakMap storage which may cause memory leaks in browsers that
            // don't support this type of collections.
            defineConfigurable(this, { target: target, contentRect: contentRect });
        }
        return ResizeObserverEntry;
    }());
    var ResizeObserverSPI = /** @class */ (function () {
        /**
         * Creates a new instance of ResizeObserver.
         *
         * @param {ResizeObserverCallback} callback - Callback function that is invoked
         *      when one of the observed elements changes it's content dimensions.
         * @param {ResizeObserverController} controller - Controller instance which
         *      is responsible for the updates of observer.
         * @param {ResizeObserver} callbackCtx - Reference to the public
         *      ResizeObserver instance which will be passed to callback function.
         */
        function ResizeObserverSPI(callback, controller, callbackCtx) {
            /**
             * Collection of resize observations that have detected changes in dimensions
             * of elements.
             *
             * @private {Array<ResizeObservation>}
             */
            this.activeObservations_ = [];
            /**
             * Registry of the ResizeObservation instances.
             *
             * @private {Map<Element, ResizeObservation>}
             */
            this.observations_ = new MapShim();
            if (typeof callback !== 'function') {
                throw new TypeError('The callback provided as parameter 1 is not a function.');
            }
            this.callback_ = callback;
            this.controller_ = controller;
            this.callbackCtx_ = callbackCtx;
        }
        /**
         * Starts observing provided element.
         *
         * @param {Element} target - Element to be observed.
         * @returns {void}
         */
        ResizeObserverSPI.prototype.observe = function (target) {
            if (!arguments.length) {
                throw new TypeError('1 argument required, but only 0 present.');
            }
            // Do nothing if current environment doesn't have the Element interface.
            if (typeof Element === 'undefined' || !(Element instanceof Object)) {
                return;
            }
            if (!(target instanceof getWindowOf(target).Element)) {
                throw new TypeError('parameter 1 is not of type "Element".');
            }
            var observations = this.observations_;
            // Do nothing if element is already being observed.
            if (observations.has(target)) {
                return;
            }
            observations.set(target, new ResizeObservation(target));
            this.controller_.addObserver(this);
            // Force the update of observations.
            this.controller_.refresh();
        };
        /**
         * Stops observing provided element.
         *
         * @param {Element} target - Element to stop observing.
         * @returns {void}
         */
        ResizeObserverSPI.prototype.unobserve = function (target) {
            if (!arguments.length) {
                throw new TypeError('1 argument required, but only 0 present.');
            }
            // Do nothing if current environment doesn't have the Element interface.
            if (typeof Element === 'undefined' || !(Element instanceof Object)) {
                return;
            }
            if (!(target instanceof getWindowOf(target).Element)) {
                throw new TypeError('parameter 1 is not of type "Element".');
            }
            var observations = this.observations_;
            // Do nothing if element is not being observed.
            if (!observations.has(target)) {
                return;
            }
            observations.delete(target);
            if (!observations.size) {
                this.controller_.removeObserver(this);
            }
        };
        /**
         * Stops observing all elements.
         *
         * @returns {void}
         */
        ResizeObserverSPI.prototype.disconnect = function () {
            this.clearActive();
            this.observations_.clear();
            this.controller_.removeObserver(this);
        };
        /**
         * Collects observation instances the associated element of which has changed
         * it's content rectangle.
         *
         * @returns {void}
         */
        ResizeObserverSPI.prototype.gatherActive = function () {
            var _this = this;
            this.clearActive();
            this.observations_.forEach(function (observation) {
                if (observation.isActive()) {
                    _this.activeObservations_.push(observation);
                }
            });
        };
        /**
         * Invokes initial callback function with a list of ResizeObserverEntry
         * instances collected from active resize observations.
         *
         * @returns {void}
         */
        ResizeObserverSPI.prototype.broadcastActive = function () {
            // Do nothing if observer doesn't have active observations.
            if (!this.hasActive()) {
                return;
            }
            var ctx = this.callbackCtx_;
            // Create ResizeObserverEntry instance for every active observation.
            var entries = this.activeObservations_.map(function (observation) {
                return new ResizeObserverEntry(observation.target, observation.broadcastRect());
            });
            this.callback_.call(ctx, entries, ctx);
            this.clearActive();
        };
        /**
         * Clears the collection of active observations.
         *
         * @returns {void}
         */
        ResizeObserverSPI.prototype.clearActive = function () {
            this.activeObservations_.splice(0);
        };
        /**
         * Tells whether observer has active observations.
         *
         * @returns {boolean}
         */
        ResizeObserverSPI.prototype.hasActive = function () {
            return this.activeObservations_.length > 0;
        };
        return ResizeObserverSPI;
    }());
    // Registry of internal observers. If WeakMap is not available use current shim
    // for the Map collection as it has all required methods and because WeakMap
    // can't be fully polyfilled anyway.
    var observers = typeof WeakMap !== 'undefined' ? new WeakMap() : new MapShim();
    /**
     * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
     * exposing only those methods and properties that are defined in the spec.
     */
    var ResizeObserver = /** @class */ (function () {
        /**
         * Creates a new instance of ResizeObserver.
         *
         * @param {ResizeObserverCallback} callback - Callback that is invoked when
         *      dimensions of the observed elements change.
         */
        function ResizeObserver(callback) {
            if (!(this instanceof ResizeObserver)) {
                throw new TypeError('Cannot call a class as a function.');
            }
            if (!arguments.length) {
                throw new TypeError('1 argument required, but only 0 present.');
            }
            var controller = ResizeObserverController.getInstance();
            var observer = new ResizeObserverSPI(callback, controller, this);
            observers.set(this, observer);
        }
        return ResizeObserver;
    }());
    // Expose public methods of ResizeObserver.
    [
        'observe',
        'unobserve',
        'disconnect'
    ].forEach(function (method) {
        ResizeObserver.prototype[method] = function () {
            var _a;
            return (_a = observers.get(this))[method].apply(_a, arguments);
        };
    });
    var index = (function () {
        // Export existing implementation if available.
        if (typeof global$1.ResizeObserver !== 'undefined') {
            return global$1.ResizeObserver;
        }
        return ResizeObserver;
    })();
    return index;
})));

function hexToRgb(hex, alpha) {
    hex = hex.trim();
    hex = hex[0] === '#' ? hex.substr(1) : hex;
    var bigint = parseInt(hex, 16),
        h = [];
    if(hex.length === 3){
        h.push((bigint >> 4) & 255);
        h.push((bigint >> 2) & 255);
    }
    else {
        h.push((bigint >> 16) & 255);
        h.push((bigint >> 8) & 255);
    }
    h.push(bigint & 255);
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var a = isUndefined(alpha) ? 1.0 : alpha,
        rgb = h.join(", ");
    return {
        "r": h[0],
        "g": h[1],
        "b": h[2],
        "a": a,
        "rgb": "rgb(" + rgb + ")",
        "rgba": "rgba(" + rgb + ", " + a + ")"
    };
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
    return isObjective(obj) && isSet(obj.dom);
}
function isComponent(obj, cls){
    return isElement(obj) && isSet(obj._template) && (!cls || obj.is(cls));
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
    // if(OJ.mode == OJ.PROD){
    //     return;
    // }
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
    // css env support
    if(CSS.supports("padding", "env(test, 10)")){
        css.append("env-support");
    }
    // css constant support
    else if(CSS.supports("padding", "constant(test, 10)")){
        css.append("constant-support");
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
            // show it
            OJ.alpha = 1.0;
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
    const obj = {
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
        "MAC" : "macOS",
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
                if(OJ._is_landscape = (vp.width > vp.height)){
                    OJ.addCss("is-landscape");
                    OJ.removeCss("is-portrait");
                }
                else{
                    OJ.addCss("is-portrait");
                    OJ.removeCss("is-landscape");
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
            attr.split("-").forEach(function(item, i){
                str += i ? item.ucFirst() : item;
            });
            return str;
        },
        "propToAttribute" : function(prop, sep){
            let str = "";
            sep = sep || "-";
            prop.split(/(?=[A-Z])/).forEach((item, i) => {
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
                    const arr = obj.prototype.constructor.toString().match(/function\s*(\w+)/);
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
                    obj._destructor(arguments.length > 1 ? arguments[1] : 0);
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
            const cls = window[ns];
            def._class_name_ = ns;
            def._supers = (def._supers || []).slice(0);
            cls.oj_id = ns;
            cls.prototype = def;
            if(static_def){
                for(const key in static_def){
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
    };
    let key;

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
    const user_agent = navigator.userAgent.toLowerCase();
    if(/(android)/i.test(user_agent)){
        const v = navigator.appVersion.match(/(.*)Android\ (.*);\ (.*)\ Build/);
        OJ._os = OJ.ANDROID;
        OJ._os_version = v[2];
        OJ._is_tablet = !(OJ._is_mobile = /(mobile)/i.test(user_agent));
        OJ._is_touch_capable = true;
        OJ._is_webview = /(.*);\ wv/g.test(navigator.appVersion);
        // check for in app
        if(!OJ._browser_version){
            OJ._browser_version = OJ.IN_APP;
        }
    }
    else if(/(iphone|ipod|ipad)/i.test(user_agent)){
        const v = navigator.appVersion.match(/OS\ (\d+)_(\d+)_?(\d+)?/);
        OJ._os = OJ.IOS;
        OJ._is_tablet = !(OJ._is_mobile = (user_agent.indexOf("ipad") == -1));
        OJ._is_touch_capable = true;
        OJ._is_webview = !(/safari/i.test(user_agent)) || (/crios/i.test(user_agent));
        OJ._os_version = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)].join(".");
        // check for in app
        if(!OJ._browser_version){
            OJ._browser_version = OJ.IN_APP;
        }
    }
    else if(/(Macintosh;)/i.test(user_agent)){
        let v = navigator.appVersion.match(/Mac\ OS\ X\ (\d+)_(\d+)_?(\d+)?/);
        OJ._os = OJ.MAC;
        OJ._is_tablet = false;
        OJ._is_touch_capable = false;
        OJ._is_webview = !(/safari/i.test(user_agent));
        if(v){
            OJ._os_version = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)].join(".");
        }
        else{
            v = navigator.userAgent.match(/Mac\ OS\ X\ (\d+).(\d+)?/);
            OJ._os_version = [parseInt(v[1], 10), parseInt(v[2], 10)].join(".");
        }
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
                 'id' : 'macOS'
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
        return this.getTimezoneOffset() * -60;
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
    return JSON.stringify(obj);
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
    "_post_compile_" : [],
    "_propCompile_" : function(context, props){
        props = context[props];
        const is_getter = props != "_set_props_",
            is_setter = props != "_get_props_";
        let key, prop, val;
        if(isFunction(context["_processProp_"])){
            this._processProp_ = context["_processProp_"];
        }
        for(key in props){
            prop = "_" + key;
            val = props[key];
            // store the default value of the property
            if(isSet(val)){
                this[prop] = val;
            }
            this._processProp_(key, prop, is_getter ? "." + key : null, is_setter ? "=" + key : null);
        }
    },
    "_processProp_" : function(key, prop, getter, setter){
        // define property
        Object.defineProperty(this, key, {
            "configurable" : true,
            "enumerable" : false,
            "get" : function(){
                if(!getter){
                    throw "Property '" + key + "' get not allowed.";
                }
                const get_func = this[getter];
                return get_func ? get_func.call(this) : this[prop];
            },
            "set" : function(newValue){
                if(!setter){
                    throw "Property '" + key + "' set not allowed.";
                }
                const set_func = this[setter];
                set_func ? set_func.call(this, newValue) : this[prop] = newValue;
                return newValue;
            }
        });
    },

    "_constructor" : function(obj){
        this._id_ = OJ.guid(this);
        if(obj){
            this.bulkSet(obj);
        }
        return this;
    },
    // Internal Methods
    "_super" : function(context, func, args){
        if(!context || !context.prototype || !context.prototype[func]){
            print(arguments);
            debugger;
        }
        return context.prototype[func].apply(this, args || []);
    },
    "_destructor" : function(depth){
        for(const key in this){
            this[key] = undefined;
        }
        this._destroyed_ = true;
    },

    "_set" : function(key, val, dflt){
        // default the value
        if(isUndefined(val)){
            val = dflt;
        }
        // if the value is undefined then we don't need to do anything
        if(!isUndefined(val)){
            let ctx = this,
                ary = key.split("."),
                ln = ary.length;
            if(ln > 1){
                for(let i = 0; i < ln; i++){
                    if(i){
                        ctx = ctx[key];
                    }
                    key = ary[i];
                }
            }
            if(isFunction(ctx[key])){
                return ctx[key](val);
            }
            return ctx[key] = val;
        }
    },
    "_unset" : function(prop_or_props, depth){
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
            const cls = this._static;
            return new cls();
        },
        'exportData' : function(mode){
            const self = this,
                data = {};
            data[self._static.TYPE_KEY] = self.oj_class_name;
            return data;
        },
        'importData' : function(data, mode){
            return this;
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
        "toString" : function(){
            return this.oj_class_name + " : " + this.oj_id;
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
        'exportData' : function(obj, mode, processed){
            let key;
            processed = processed || [];
            if(isArray(obj)){
                for(key = obj.length; key--;){
                    obj[key] = OjObject.exportData(obj[key], mode, processed);
                }
            }
            else if(isObject(obj)){
                if(isFunction(obj.exportData)){
                    return obj.exportData(mode, processed);
                }
                for(key in obj){
                    obj[key] = OjObject.exportData(obj[key], mode, processed);
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
    "OjActionable", [OjObject],
    {
        // Internal Vars
        "_prevent_dispatch" : false,

        // Internal Methods
        "_constructor" : function(){
            this._actionable = this;
            this._super(OjObject, "_constructor", arguments);
        },
        "_destructor" : function(){
            // dispatch a destroy event and then destroy all active listeners
            if(this._actionable){
                this.dispatchEvent(new OjEvent(OjEvent.DESTROY));
                this.removeAllListeners();
                this._actionable = null;
            }
            return this._super(OjObject, "_destructor", arguments);
        },

        // Public Methods
        "addEventListener" : function(type, context, callback){
            EventManager.addEventListener(this._actionable, type, context, callback);
        },
        "hasEventListener" : function(type){
            return EventManager.hasEventListener(this._actionable, type);
        },
        "hasEventListeners" : function(type/*|types, type*/){
            let args = arguments,
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
        "removeAllListeners" : function(){
            return EventManager.removeAllListeners(this._actionable);
        },
        "removeEventListener" : function(type, context, callback){
            EventManager.removeEventListener(this._actionable, type, context, callback);
        },
        "dispatchEvent" : function(evt){
            if(this._prevent_dispatch || evt.canceled){
                return;
            }
            if(this._actionable){
                EventManager.dispatchEvent(this._actionable, evt);
            }
        }
    },
  {
    "ADD" : "add",
    "REMOVE" : "remove"
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
(function(){
    String.string = function(val){
        if(isSet(val)){
            return isObject(val) && val.toString ? val.toString() : String(val);
        }
        return "";
    };
    const proto = String.prototype;
    if(!proto.append){
        proto.append = function(str){
            return this + str;
        }
    }
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
    if(!proto.prepend){
        proto.prepend = function(str){
            return str + this;
        }
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
})();


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
        "exportData" : function(){
            return this._items;
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
        "map" : function(){
            return this._callArrayFunc("map", arguments);
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
            args.forEachReverse(function(item){
                if(isUnset(index) || item < index){
                    index = item;
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
        return obj.clone();
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
    // const params = new URLSearchParams(this),
    //     obj = {};
    //
    // let key, val, ln;
    //
    // for(key of params.keys()){
    //     val = params.getAll(key);
    //     ln = val.length;
    //
    //     if(!ln){
    //         val = null;
    //     }
    //     else if(ln == 1){
    //         val = val[0];
    //     }
    //
    //     obj[key] = val;
    // }
    //
    // return obj;
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
            'canceled' : false,
            'current_target' : null,
            'phase' : 0,
            'target' : null,
            'type' : null
        },

        "_constructor" : function(type, bubbles, cancelable){
            this._super(OjObject, "_constructor", []);
            this._set("_type", type);
            this._set("_bubbles", bubbles, false);
            this._set("_cancelable", cancelable, false);
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
        },
        "exportData" : function(mode, processed){
            processed = processed || [];
            var self = this,
                data = self._super(OjObject, "exportData", [mode, processed]);
            data.bubbles = self.bubbles;
            data.cancelable = self.cancelable;
            data.current_target = OjObject.exportData(self.current_target, mode, processed);
            data.canceled = self.canceled;
            data.phase = self.phase;
            data.target = OjObject.exportData(self.target, mode, processed);
            data.type = self.type;
            return data;
        },
        "importData": function(data, mode){
            var self = this;
            if(isSet(data.bubbles)){
                self._bubbles = data.bubbles;
            }
            if(isSet(data.cancelable)){
                self._cancelable = data.cancelable;
            }
            if(isSet(data.canceled)){
                self._canceled = data.canceled;
            }
            if(isSet(data.current_target)){
                self._current_target = OjObject.importData(data.current_target);
            }
            if(isSet(data.phase)){
                self._phase = data.phase;
            }
            if(isSet(data.target)){
                self._target = OjObject.importData(data.target);
            }
            if(isSet(data.type)){
                self._type = data.type;
            }
            return self;
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
        '_setIndex' : function(target_id, params){
            var index = this._index;
            if(!index[target_id]){
                index[target_id] = {};
            }
            index[target_id][params[0] + ':' + params[1] + ':' + params[3]] = params;
        },

        'addEventListener' : function(target, type, context, callback){
            try {
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
                    this._setIndex(target_id, [target_id, type, context_id, guid]);
                    this._setIndex(context_id, [target_id, type, context_id, guid]);
                }
            }
            catch (e) {
                print("Could not add event listener", arguments);
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
    "OjTextEvent", [OjEvent],
    {
        "_get_props_" : {
            "text" : ""
        },

        '_constructor' : function(type, text, bubbles, cancelable){
            var self = this;
            self._super(OjEvent, "_constructor", [type, bubbles, cancelable]);
            if(isSet(text)){
                self._text = text;
            }
        },
        "exportData" : function(mode){
            var self = this,
                data = self._super(OjEvent, "exportData", arguments);
            data.text = self.text;
            return data;
        },
		"importData" : function(data, mode){
			var self = this;
			if(isSet(data.text)){
				self._text = data.text;
			}
			return self._super(OjEvent, "importData", arguments);
		}
    },
    {
        "TEXT" : "onText"
    }
);

OJ.extendClass(
    "OjError", [OjTextEvent],
    {
        "_get_props_" : {
            "code"    : 0
        },

        '_constructor' : function(type, text, code, bubbles, cancelable){
            var self = this;
            self._super(OjTextEvent, "_constructor", [type, text, bubbles, cancelable]);
            self._code = code;
        },

        "exportData" : function(mode){
            var self = this,
                data = self._super(OjTextEvent, "exportData", arguments);
            data.code = self.code;
            return data;
        },
		"importData" : function(data, mode){
			var self = this;
			if(isSet(data.code)){
				self._code = data.code;
			}
			return self._super(OjTextEvent, "importData", arguments);
		}
    },
    {
        "ERROR" : "onError"
    }
);

OJ.extendClass(
    "OjUrl", [OjObject],
    {
        "_props_" : {
            "protocol"     : null,
            "host"         : null,
            "port"         : null,
            "path"         : null,
            "query"        : null,
            "query_params" : null,
            "hash"         : null,
            "hashbang"     : null,
            "source"       : null
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
                self._dirty.query = undefined;
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
        "=hashbang" : function(val){
            this.hash = "!" + val;
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

        '_constructor' : function(source, data, content_type, method){
            this._super(OjUrl, '_constructor', []);
            this._headers = {};
            this._set("source", source);
            this._set("data", data);
            this._set("content_type", content_type);
            this._set("method", method);
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
    'OjIoError', [OjError],
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
        "exportData" : function(mode, processed){
            processed = processed || [];
            var self = this,
                obj = self._super(OjObject, "exportData", arguments);
            obj.created    = self.created;
            obj.data       = self.data ? OjObject.exportData(self.data, mode, processed) : null;
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
            "status_code" : null
        },
        //"_error_thrown" : false,
        //
        //"_url" : null,  "_xhr" : null,

        "_constructor" : function(request, async){
            this._super(OjActionable, "_constructor", []);
            this._set("request", request);
            this._set("async", async);
        },
        "_destructor" : function(){
            if(this._xhr){
                this._cleanupXhr();
            }
            this._unset("_request");
            return this._super(OjActionable, "_destructor", arguments);
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
            return toJson(OjObject.exportData(data));
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
            //    self.dispatchEvent(new OjIoError(OjIoError.IO_TIMEOUT));
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
            const error = new OjIoError(OjIoError.IO_ERROR, xhr.statusText, xhr.status);
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
        "OK": 200,
        "CREATED": 201,
        "ACCEPTED": 202,
        "NOT_MODIFIED": 304,
        "BAD_REQUEST": 400,
        "UNAUTHORIZED": 401,
        "PAYMENT_REQUIRED": 402,
        "FORBIDDEN": 403,
        "NOT_FOUND": 404,
        "METHOD_NOT_ALLOWED": 405,
        "NOT_ACCEPTABLE": 406,
        "TIMEOUT": 408,
        "CONFLICT": 409,
        "GONE": 410,
        "DUPLICATE": 412,  // Formally known as "Precondition Failed"
        "UNSUPPORTED_TYPE": 415,
        "INTERNAL_ERROR": 500,
        "NOT_IMPLEMENTED": 501,
        "BAD_GATEWAY": 502,
        "UNAVAILABLE": 503,
        "GATEWAY_TIMEOUT": 504,
        "UNKNOWN": 520,

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
    "OjElement", [OjActionable],
    {
        // Internal Vars
        "_props_" : {
            "parent" : null
        },
        "_get_props_" : {
            "dom" : null,
            "id" : null,
            "in_dom" : false
        },
        "_draggable" : false, "_drag_x" : 0, "_drag_y" : 0, "_did_drag" : false,

        // Internal Methods
        "_constructor" : function(source, context){
            this._super(OjActionable, "_constructor", []);
            this._id_ = {"id": this._id_};
            // set the dom
            // if no source present then create one
            this._setDom(source ? source : OjElement.elm("div"), context);
        },
        "_destructor" : function(/*depth = 0*/){
            // cleanup dom
            const dom = this._dom;
            if(dom){
                this.parent = null;
                delete dom.__oj__;
                // release the vars
                this._dom = this._proxy = null;
            }
            // unregister element
            OjElement.unregister(this);
            // continue on with the destruction
            return this._super(OjActionable, "_destructor", arguments);
        },

        // Internal Properties
        "_setDom" : function(dom_elm){
            dom_elm.id = this.id;
            dom_elm.__oj__ = this._id_;
            this._dom = dom_elm;
            this._proxy = null;
            OjElement.register(this);
        },
        "_getProxy" : function(){
            return this._proxy || this._dom;
        },
        "_setProxy" : function(dom_elm){
            this._proxy = dom_elm;
        },
        "_getEventProxy" : function(){
            const proxy = this._getProxy();
            if(proxy == document.body){
                return window;
            }
            return proxy;
        },

        "_setIsDisplayed" : function(displayed){
            const evt = OjEvent;
            if(this._is_displayed == displayed){
                return;
            }
            if(this._is_displayed = displayed){
                this.dispatchEvent(new evt(evt.ADDED_TO_DISPLAY));
            }
            else{
                this.dispatchEvent(new evt(evt.REMOVED_FROM_DISPLAY));
            }
        },

        // Public Methods
        "hasDomElement" : function(dom_elm){
            return OjElement.hasDomElement(this._dom, dom_elm);
        },
        "query" : function(query){
            return new OjElmArray(this._dom.querySelectorAll(query));
        },
        "scrollIntoView" : function(){
            try{
                this._dom.scrollIntoView();
            }
            catch(e){}
        },

        // Public Properties
        ".id" : function(){
            return this.oj_id;
        },
        ".in_dom" : function(){
            const dom = this._dom;
            return dom.ownerDocument && isObject(dom.ownerDocument) && dom.parentNode ? true : false;
        },
        ".oj_id" : function(){
            return this._id_.id;
        },
        ".parent" : function(){
            return OjElement.element((this._dom || {}).parentNode);
        },
        "=parent" : function(parent){
            if(parent){
                parent.appendChild(this);
            }
            else if(parent = this.parent){
                parent.removeChild(this);
            }
        },
        ".parentComponent" : function(){
            if(!this._parentComponent){
                this._parentComponent = OjElement.parentComponent((this._dom || {}).parentNode);
            }
            return this._parentComponent;
        }
    },
    {
        // "_elms" : {},
        "_doms": new WeakMap(),
        "_elms": new WeakMap(),
        "byId" : function(id){
            // print(id);
            return this.element(document.getElementById(id));
            // const elms = this._elms;
            //
            // if(elms[id]){
            //     return elms[id];
            // }
            //
            // let elm = document.getElementById(id);
            //
            // return elm ? elms[elm.id] : null;
        },
        "byPoint" : function(x, y){
            return this.element(
                document.elementFromPoint(x, y)
            );
        },
        "elm" : function(tag){
            return document.createElement(tag);
        },
        "element" : function(obj){
            if(!obj){
                return null;
            }
            if(isDomElement(obj)){
                const oj_id = obj.__oj__;
                if(oj_id){
                    return this._elms.get(oj_id);
                }
                if(this.isCommentNode(obj)){
                    return new OjCommentElement(obj);
                }
                if(this.isTextNode(obj)){
                    return new OjTextElement(obj);
                }
                return this._doms.get(obj);
            }
            if(isObjective(obj)){
                return obj;
            }
            return obj == window ? OJ : new OjStyleElement(obj);
        },
        "hasDomElement" : function(haystack, needle){
            if(haystack == needle){
                return true;
            }
            while(needle = needle.parentNode){
                if(needle == haystack){
                    return true;
                }
            }
            return false;
        },
        "isCommentNode" : function(dom_elm){
            return dom_elm.nodeName.toLowerCase() == "#comment";
        },
        "isTextNode" : function(dom_elm){
            return dom_elm.nodeName.toLowerCase() == "#text";
        },
        "parentComponent" : function(elm, cls){
            if(isElement(elm)){
                elm = elm._dom;
            }
            let parent;
            while(elm){
                parent = elm.parentNode;
                if(parent && (elm = this.element(parent)) && isComponent(elm, cls)){
                    return elm;
                }
                elm = parent;
            }
            return null;
        },
        // todo: look into this it doesn't seem efficient
        "register" : function(elm){
            const dom = elm._dom;
            if(dom){
                this._doms.set(dom, elm);
            }
            this._elms.set(elm._id_, elm);
            // this._elms[elm.id] = elm;
        },
        "unregister" : function(elm){
            const dom = elm._dom;
            if(dom){
                this._doms.delete(dom);
            }
            this._elms.delete(elm._id_);
            // delete this._elms[elm.id];
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
            "array": null,
            "bottom" : 0,
            "right"  : 0
        },

        "_constructor" : function(left, top, width, height){
            this._super(OjObject, "_constructor", []);
            this._set("left", left, 0);
            this._set("top", top, 0);
            this._set("width", width, 0);
            this._set("height", height, 0);
        },
        "delta" : function(rect){
            rect = rect || {};
            return new OjRect(
                this.top - (rect.top || 0),
                this.left - (rect.left || 0),
                this.width - (rect.width || 0),
                this.height - (rect.height || 0)
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

        ".array" : function(){
            return [this.left, this.top, this.width, this.height];
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
                    return new OjRect(obj.left, obj.top, obj.width, obj.height);
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
    "OjCommentElement", [OjElement],
    {
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
    "OjTextElement", [OjElement],
    {
        "_props_" : {
            'on_change' : null,
            "text" : null
        },
        "_constructor" : function(text_or_dom){
            const self = this,
                is_dom = isDomElement(text_or_dom);
            self._super(OjElement, "_constructor", is_dom ? [text_or_dom] : []);
            if(!is_dom){
                self.text = text_or_dom;
            }
        },
        "_setDom" : function(dom_elm){
            // force text dom elm
            if(dom_elm.nodeName != "#text"){
                dom_elm = document.createTextNode(dom_elm.innerText);
            }
            return this._super(OjElement, "_setDom", [dom_elm]);
        },
        "clone" : function(){
            const obj = this._super(OjElement, "clone", arguments);
            obj.on_change = this.on_change;
            obj.text = this.text;
            return obj;
        },
        "toString" : function(){
            return this.dom.nodeValue;
        },
        ".text" : function(str){
            return this.dom.nodeValue;
        },
        "=text" : function(str){
            this.dom.nodeValue = String.string(str);
            if(this._on_change){
                this._on_change(this);
            }
        }
    }
);


OJ.extendClass(
    "OjDomEvent", [OjEvent],
    {
        "cancel" : function(){
            var self = this,
                src = self._source;
            if(self._cancelable){
                if(src){
                    try{ src.preventDefault(); } catch(e){}
                    try{ src.stopPropagation(); } catch(e){}
                }
                self._super(OjEvent, "cancel", arguments);
            }
        }
    },
    {
        "normalizeDomEvent" : function(evt){
            if(!evt){
                evt = window.event;
            }
            // todo: figure out a better way to handle FF not liking us changing event properties
            const new_evt = OJ.merge({}, evt); // because FF sucks
            if(new_evt.clientX || new_evt.clientY){
                new_evt.pageX = new_evt.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                new_evt.pageY = new_evt.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }
            if(new_evt.which){
                new_evt.rightClick = new_evt.which == 3;
            }
            else if(new_evt.button){
                new_evt.rightClick = new_evt.button == 2;
            }
            return new_evt;
        },
        "convertDomEvent" : function(evt){
            var norm = OjDomEvent.normalizeDomEvent(evt),
                new_evt = new OjDomEvent(norm.type, true, true);
            new_evt._source = evt;
            return new_evt;
        },
        // mouse events
        "PRESS"        : "click",
        "DOUBLE_PRESS" : "dblclick",
        "MOUSE_DOWN"   : "mousedown",
        "MOUSE_MOVE"   : "mousemove",
        "MOUSE_OVER"   : "mouseover",
        "MOUSE_OUT"    : "mouseout",
        "MOUSE_UP"     : "mouseup",
        "MOUSE_WHEEL"  : "mousewheel",
        // keyboard events
        "KEY_DOWN"  : "keydown",
        "KEY_PRESS" : "keypress",
        "KEY_UP"    : "keyup",
        // focus events
        "FOCUS_IN"  : "focus",
        "FOCUS_OUT" : "blur",
        // form events
        "CHANGE" : "change",
        // scroll events
        "SCROLL" : "scroll",
        // touch events
        "TOUCH_CANCEL" : "touchcancel",
        "TOUCH_END"    : "touchend",
        "TOUCH_LEAVE"  : "touchleave",
        "TOUCH_MOVE"   : "touchmove",
        "TOUCH_START"  : "touchstart",
        // orientation events
        "ORIENTATION_CHANGE" : "orientationchange"
    }
);

OJ.extendClass(
    "OjUiEvent", [OjDomEvent],
    {
        "_get_props_" : {
            "pageX" : NaN,
            "pageY" : NaN
        },

        "_constructor" : function(type/*, pageX = NaN, pageY = NaN, bubbles, cancelable*/){
            var args = Array.array(arguments),
                ln = args.length;
            if(ln > 1){
                this._pageX = args.removeAt(1)[0];
                if(ln > 2){
                    this._pageY = args.removeAt(1)[0];
                }
            }
            this._super(OjDomEvent, "_constructor", args);
        },

        "clone" : function(){
            var clone = this._super(OjDomEvent, "clone", arguments);
            clone._pageX = this._pageX;
            clone._pageY = this._pageY;
            return clone;
        }
    },
    {
        "_evt_map" : {
            "click"        : "onPress",
            "contextmenu"  : "onUp",
            "dblclick"     : "onDoublePress",
            "mousedown"    : "onDown",
            "mousemove"    : "onMove",
            "mouseover"    : "onOver",
            "mouseout"     : "onOut",
            "mouseup"      : "onUp",
            "mousewheel"   : "onWheel"
        },
        "convertDomEvent" : function(evt){
            var norm = evt = OjDomEvent.normalizeDomEvent(evt),
                type = this._evt_map[norm.type];
            if(type == OjUiEvent.PRESS){
                // todo: OjUiEvent - add middle and right click event detection
            }
            var new_evt = new OjUiEvent(type, norm.pageX, norm.pageY, norm.bubbles, norm.cancelable);
            new_evt._target = OjElement.element(norm.target);
            new_evt._current_target = OjElement.element(norm.current_target);
            new_evt._source = evt;
            return new_evt;
        },
        "isMouseEvent" : function(type){
            var k;
            for(k in this._evt_map){
                if(type == this._evt_map[k]){
                    return true;
                }
            }
            return false;
        },
        "isMouseDomEvent" : function(type){
            var k;
            for(k in this._evt_map){
                if(type == k){
                    return true;
                }
            }
            return false;
        },
        "PRESS"           : "onPress",
        "DOUBLE_PRESS"    : "onDoublePress",
        "MIDDLE_PRESS"    : "onMiddlePress",
        "RIGHT_PRESS"  : "onRightPress",
        "DOWN"            : "onDown",
        "RIGHT_DOWN"   : "onRightDown",
        "UP"           : "onUp",
        "UP_OUTSIDE"   : "onUpOutside",
        "RIGHT_UP"     : "onRightUp",
        "MOVE"         : "onMove",
        "OVER"         : "onOver",
        "OUT"          : "onOut",
        "WHEEL"        : "onWheel"
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
            "enable": true,
            'event' : null,
            'pointers' : null,
            'threshold' : null
        },
        "_touch_action": "compute",

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
                hammer.on(
                    self.oj_id,
                    function(evt){
                        var callback = self.callback;
                        if(callback){
                            callback(evt);
                        }
                    }
                );
            }
            hammer.add(recognizer);
            return hammer;
        },
        "_has" : function(hammer){
            var self = this,
                recognizer = self._recognizer;
            if(recognizer){
                return hammer.get(self.oj_id) != null;
            }
            return false;
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
                "enable"    : self.enable,
                "event"     : self.oj_id,
                "pointers"  : self.pointers,
                "threshold" : self.threshold,
                "touchAction": self._touch_action
            };
        },
        '_remove' : function(hammer){
            var self = this,
                recognizer = self._recognizer;
            if(recognizer){
                hammer.remove(recognizer);
            }
            return hammer;
        },
        ".enable" : function(val){
            var self = this,
                recognizer = self._recognizer;
            if(recognizer){
                recognizer.set({"enable": val});
            }
            return self._enable = val;
        }
    },
    {
        'DOWN' : Hammer.DIRECTION_DOWN,
        'LEFT' : Hammer.DIRECTION_LEFT,
        'NONE' : Hammer.DIRECTION_NONE,
        'RIGHT' : Hammer.DIRECTION_RIGHT,
        'UP' : Hammer.DIRECTION_UP,
        'ALL' : Hammer.DIRECTION_ALL,
        'HORIZONTAL' : Hammer.DIRECTION_HORIZONTAL,
        'VERTICAL' : Hammer.DIRECTION_VERTICAL
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
        },
        "=direction" : function(val){
            const self = this,
                cls = self._static;
            self._direction = val;
            if(val == cls.HORIZONTAL){
                self._touch_action = "pan-x";
            }
            else if(val == cls.VERTICAL){
                self._touch_action = "pan-y";
            }
            else{
                self._touch_action = "pan-x pan-y";
            }
        },
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
    "OjKeyboardEvent", [OjDomEvent],
    {
        "_get_props_" : {
            "key_code": null
        },
        "_constructor" : function(type, key_code, bubbles, cancelable){
            this._super(OjDomEvent, "_constructor", [type, bubbles, cancelable]);
            this._key_code = key_code;
        },

        "clone" : function(){
            const clone = this._super(OjDomEvent, "clone", arguments);
            clone._key_code = this._key_code;
            return clone;
        }
    },
    {
        "convertDomEvent" : function(evt){
            let type;
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
            return new OjKeyboardEvent(type, evt.keyCode, true, true);
        },
        "isKeyboardEvent" : function(type){
            return type == OjKeyboardEvent.DOWN || type == OjKeyboardEvent.PRESS || type == OjKeyboardEvent.UP;
        },
        "isKeyboardDomEvent" : function(type){
            return type == OjDomEvent.KEY_DOWN || type == OjDomEvent.KEY_PRESS || type == OjDomEvent.KEY_UP;
        },
        "DOWN"  : "onKeyDown",
        "PRESS" : "onKeyPress",
        "UP"    : "onKeyUp",
        "SHOW"  : "onKeyboardShow",
        "HIDE"  : "onKeyboardHide"
    }
);


OJ.extendClass(
    'OjScrollEvent', [OjDomEvent],
    {
        '_get_props_' : {
            'scroll_x' : NaN,
            'scroll_y' : NaN
        },

        '_constructor' : function(type, scroll_x, scroll_y/*, bubbles, cancelable*/){
            var args = Array.array(arguments).slice(3);
            args.unshift(type);
            this._super(OjDomEvent, '_constructor', args);
            this._scroll_x = scroll_x;
            this._scroll_y = scroll_y;
        },

        'clone' : function(){
            var clone = this._super(OjDomEvent, 'clone', arguments);
            clone._scroll_x = this._scroll_x;
            clone._scroll_y = this._scroll_y;
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

OJ.extendClass(
    "OjStyleElement", [OjElement],
    {
        "_props_" : {
            "alpha" : null,
            "background_color" : null,
            "bottom" : null,
            "children" : null,
            "css" : null,
            "css_list" : null,
            "depth" : null,
            "font_color": null,
            "font_size": null,
            "hAlign" : "left", // OjStyleElement.LEFT
            "height" : null,
            "id" : null,
            "innerHeight" : null,
            "innerWidth" : null,
            "left" : null,
            "origin" : null,
            "outerHeight" : null,
            "outerWidth" : null,
            "overflow" : null,
            "owner" : null,
            "page_rect" : null,
            "pageX" : null,
            "pageY" : null,
            "rect" : null,
            "right" : null,
            "rotation" : null,
            "scroll_height" : null,
            "scroll_width" : null,
            "scroll_x" : null,
            "scroll_y" : null,
            "top" : null,
            "text" : null,
            "translate" : null,
            "vAlign" : "top", // OjStyleElement.TOP
            "width" : null,
            "x" : null,
            "y" : null
        },
        "_get_props_" : {
            "dom" : null,
            "first_child" : null,
            "is_visible" : null,
            "last_child" : null,
            "num_children" : null,
            "tag" : null
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
            if(context && !context._template_vars_){
                context._template_vars_ = [];
            }
            if(nm == "var"){
                if(!isEmpty(val) && context){
                    const parts = val.split(".");
                    if(parts.length > 1){
                        // we want these last
                        context._template_vars_.append(
                            {
                                "context" : context,
                                "property" : parts,
                                "value" : self
                            }
                        );
                        self.addCss(parts.last);
                    }
                    else{
                        (context[val] = self).addCss(val);
                    }
                    self.owner = context;
                }
                return true;
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
                        if(context){
                            // setup holder for template reference values for deferred processing
                            context._template_vars_.prepend(
                                {
                                    "context" : self,
                                    "property" : setter,
                                    "value" : val
                                }
                            );
                        }
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
            const children = dom.childNodes;
            let ln = children.length;
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
            let tag = dom.tagName;
            if(!tag || OjElement.isTextNode(dom)){
                return isEmpty(dom.nodeValue) ? null : new OjTextElement(dom);
            }
            let cls = dom.getAttribute("class-name"),
                cls_path;
            tag = tag.toLowerCase();
            // if this is a script or link tag ignore it
            if(tag == "script" || tag == "link"){
                return false;
            }
            // load the class if we need to
            if(!window[cls] && (cls_path = dom.getAttribute("class-path"))){
                            }
            // process the class
            if(cls = OjStyleElement.getTagComponent(tag)){
                if(isFunction(cls)){
                    return cls(dom, context);
                }
                const child = new window[cls]();
                child._setDomSource(dom, context);
                return child;
            }
            return new OjStyleElement(dom, context);
        },
        "_processReferenceValue" : function(val, context, src){
            const $ = this;
            if(val && String.string(val).contains("$") && $ != context){
                throw "Template Reference Value Processing Deferred"
            }
            try{
                val = (function(str){ return eval(str); }).call(src || $, val);
            }
            catch(e){ }
            return val;
        },
        "_processTemplateVars" : function(){
            const self = this;
            let context, prop;
            if(self._template_vars_){
                self._template_vars_.forEachReverse(function(tvar){
                    context = tvar.context;
                    prop = tvar.property;
                    if(isArray(prop)){
                        const key = prop.pop();
                        try {
                            prop.forEach(function(p){
                                context = context[p];
                            });
                            context[key] = tvar.value;
                        }
                        catch(e) {
                            // do nothing
                        }
                    }
                    else{
                        context[prop] = self._processReferenceValue(tvar.value, self, context);
                    }
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
                this.id = this.oj_id;
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
            const proxy = OjElement.element(this);
            if(proxy && proxy._processEvent(evt)){
                proxy._onEvent(OjDomEvent.convertDomEvent(evt));
            }
        },
        "_onDomOjUiEvent" : function(evt){
            const proxy = OjElement.element(this);
            if(proxy && proxy._processEvent(evt)){
                evt = OjUiEvent.convertDomEvent(evt);
                proxy._onEvent(evt);
                //if(evt.type == OjUiEvent.DOWN && proxy.hasEventListener(OjUiEvent.UP_OUTSIDE)){
                //    OJ.addEventListener(OjUiEvent.UP, proxy, "_onOjMouseUp");
                //}
            }
        },
        "_onDomOjKeyboardEvent" : function(evt){
            const proxy = OjElement.element(this);
            if(proxy && proxy._processEvent(evt)){
                proxy._onEvent(OjKeyboardEvent.convertDomEvent(evt));
            }
        },
        "_onDomOjFocusEvent" : function(evt){
            const proxy = OjElement.element(this);
            if(proxy && proxy._processEvent(evt)){
                proxy._onEvent(OjFocusEvent.convertDomEvent(evt));
            }
        },
        "_onDomScrollEvent" : function(evt){
            const proxy = OjElement.element(this);
            if(proxy && proxy._processEvent(evt)){
                proxy._onScroll(OjScrollEvent.convertDomEvent(evt));
            }
        },
        "_onDomTouchEvent" : function(evt){
            const proxy = OjElement.element(this);
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
                    new_x - this._drag_x,
                    new_y - this._drag_y,
                    evt, false, false
                )
            );
            this._drag_x = new_x;
            this._drag_y = new_y;
        },
        "_onDragEnd" : function(evt){
            OJ.removeEventListener(OjUiEvent.MOVE, this, "_onDrag");
            OJ.removeEventListener(OjUiEvent.UP, this, "_onDragEnd");
            this.dispatchEvent(
                new OjDragEvent(
                    OjDragEvent.END,
                    evt.pageX - this._drag_x,
                    evt.pageY - this._drag_y,
                    evt, false, false
                )
            );
            this._drag_x = this._drag_y = null;
        },
        "_onDragStart" : function(evt){
            this._drag_x = evt.pageX;
            this._drag_y = evt.pageY;
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
////            if(type == OjUiEvent.UP && (!this._draggable || (this._drag_x == x && this._drag_y == y))){
////                print(this._draggable, this._drag_x == x, this._drag_y == y);
////                this._onEvent(new OjUiEvent(OjUiEvent.PRESS, evt.getBubbles(), evt.getCancelable(), x, y));
////            }
//
//            return response;
//        },
        "_onMoveTick" : function(evt){
            var self = this,
                cls = OjTransformEvent,
                prev = self._prev_rect,
                rect = self.rect;
            if(prev.top != rect.top || prev.left != rect.left){
                self._prev_rect = rect;
                self.dispatchEvent(new cls(cls.MOVE, rect, prev));
            }
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
                if(this._prev_x == (x = evt.scroll_x) && this._prev_y == (y = evt.scroll_y)){
                    return;
                }
                this._prev_x = x;
                this._prev_y = y;
                return this._onEvent(evt);
            }
            // for touch scroll events
            if(this._prev_x == (x = this.scroll_x) && this._prev_y == (y = this.scroll_y)){
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
                this._drag_x = x;
                this._drag_y = y;
            }
            else if(type == OjTouchEvent.MOVE){
                type = OjUiEvent.MOVE;
            }
            if(type){
                this._onEvent(new OjUiEvent(type, x, y, true, true));
                // if the touch hasn"t moved then issue a click event
                if(type == OjUiEvent.UP && !this.hasEventListener(OjDragEvent.START) && this.hitTestPoint(x, y)){
                    this._drag_x = this._drag_y = null;
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
                            og_evt = evt.srcEvent,
                            new_evt = ui.convertDomEvent(og_evt);
                        new_evt._type = map[type];
                        // og_evt.preventDefault();
                        // og_evt.stopPropagation();
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
                const proxy = this._getEventProxy();
                proxy.ontouchcancel = proxy.ontouchend = proxy.ontouchleave = null;
            }
        },
        "addEventListener" : function(type){
            const is_touch = OJ.is_touch_capable,
                proxy = this._getEventProxy(),
                hammer = this._setupHammer();
            this._super(OjElement, "addEventListener", arguments);
            if(type == OjScrollEvent.SCROLL){
                this._scrollable = true;
                proxy.onscroll = this._onDomScrollEvent;
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
                    proxy.ontouchstart = this._onDomTouchEvent;
                }
                else{
                    proxy.onmousedown = this._onDomOjUiEvent;
                }
            }
            else if(type == OjUiEvent.LONG_PRESS){
                if(!hammer.get("press")){
                    hammer.add( new Hammer.Tap({ event: "press" }) );
                }
            }
            else if(type == OjUiEvent.MOVE){
                if(is_touch){
                    proxy.ontouchmove = this._onDomTouchEvent;
                }
                else{
                    proxy.onmousemove = this._onDomOjUiEvent;
                }
            }
            else if(type == OjUiEvent.OUT){
                proxy.onmouseout = this._onDomOjUiEvent;
            }
            else if(type == OjUiEvent.OVER){
                proxy.onmouseover = this._onDomOjUiEvent;
            }
            else if(type == OjUiEvent.UP){
                if(is_touch){
                    proxy.ontouchcancel = proxy.ontouchend = proxy.ontouchleave = this._onDomTouchEvent;
                }
                else{
                    proxy.onmouseup = this._onDomOjUiEvent;
                    proxy.oncontextmenu = this._onDomOjUiEvent;
                }
            }
            else if(type == OjUiEvent.UP_OUTSIDE){
                if(is_touch){
                    proxy.ontouchcancel = proxy.ontouchend = proxy.ontouchleave = this._onDomTouchEvent;
                }
                else{
                    proxy.onmousedown = this._onDomOjUiEvent;
                }
            }
            // drag events
            else if(OjDragEvent.isDragEvent(type)){
                this._draggable = true;
//
//                if(is_touch){
//                    proxy.ontouchstart = proxy.ontouchmove = proxy.ontouchend = this._onDomTouchEvent;
//                }
//                else{
//                    proxy.onmousedown = this._onDomOjUiEvent;
//                }
                this.addEventListener(OjUiEvent.DOWN, this, "_onDragStart");
            }
            // keyboard events
            else if(type == OjKeyboardEvent.DOWN){
                proxy.onkeydown = this._onDomOjKeyboardEvent;
            }
            else if(type == OjKeyboardEvent.PRESS){
                proxy.onkeypress = this._onDomOjKeyboardEvent;
            }
            else if(type == OjKeyboardEvent.UP){
                proxy.onkeyup = this._onDomOjKeyboardEvent;
            }
            // focus events
            else if(type == OjFocusEvent.IN){
                proxy.onfocus = this._onDomOjFocusEvent;
                //proxy.onfocusin = self._onDomOjFocusEvent;
            }
            else if(type == OjFocusEvent.OUT){
                proxy.onblur = this._onDomOjFocusEvent;
            }
            // transform events
            else if(type == OjTransformEvent.MOVE){
                if(!this._move_timer){
                    this._move_timer = new OjTimer(250, 0);
                    this._move_timer.addEventListener(OjTimer.TICK, this, "_onMoveTick");
                    this._prev_rect = this.rect;
                    this._move_timer.start();
                }
            }
            else if(type == OjTransformEvent.RESIZE && proxy != document.body){
                this._prev_rect = this.rect;
                OjStyleElement._resize_observer.observe(proxy);
            }
            // misc dom events
            else if(type == OjDomEvent.CHANGE){
                proxy.onchange = this._onOjDomEvent;
                proxy.onanimationstart = this._onOjDomEvent;  // hack for autofill issues with some browsers
            }
        },
        "addGestureRecognizer" : function(recognizer){
            if(!recognizer || this.hasGestureRecognizer(recognizer)){
                return;
            }
            recognizer._add(this._setupHammer());
        },
        "hasGestureRecognizer" : function(recognizer){
            return recognizer._has(this._setupHammer());
        },
        "removeEventListener" : function(type, context, callback){
            const proxy = this._getEventProxy();
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
                    OjStyleElement._resize_observer.unobserve(proxy);
                }
            }
            // misc dom events
            else if(type == OjDomEvent.CHANGE){
                if(!this.hasEventListener(OjDomEvent.CHANGE)){
                    proxy.onchange = null;
                    proxy.onanimationstart = null;  // hack for autofill issues with some browsers
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
            let ln = this.num_children,
                ary = [];
            for(; ln--;){
                ary.unshift(this.removeChildAt(ln));
            }
            return ary;
        },
        "removeChild" : function(child){
            if(child){
                // this will help exclude text elements
                if(child.is(OjElement)){
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
            var dom = this.dom;
            if(!dom || !dom.childNodes){
                return 0;
            }
            return dom.childNodes.length;
        },

        // misc functions
        "blur" : function(){
            try{
                this.dom.blur();
            }
            catch(e){
                // do nothing
            }
        },
        "find" : function(query){
            if(isElement(query)){
                query = "#" + query.id;
            }
            return OJ.query(query, this.dom);
        },
        "focus" : function(){
            try{
                this.dom.focus();
            }
            catch(e){
                // do nothing
            }
        },
        "hide" : function(should){
            if(should == false){
                this.show();
            }
            else{
                this.addCss(["hidden"]);
                this.dispatchEvent(new OjEvent(OjEvent.HIDE));
            }
        },
        ".is_visible" : function(){
            return this._getStyle("display") != OjStyleElement.NONE &&
                   this._getStyle("visibility") != "hidden" &&
                   this.alpha > 0 && this.width > 0 && this.height > 0;
        },
        "show" : function(should){
            if(should == false){
                this.hide();
            }
            else{
                this.removeCss("hidden");
                this.dispatchEvent(new OjEvent(OjEvent.SHOW));
            }
        },

        // single style getter & setter functions
        "_getStyleBackup" : function(style){
            return this._getProxy().style.getPropertyValue(style);
        },
        "_getStyleIe" : function(style){
            return this._getProxy().currentStyle.getPropertyValue(style);
        },
        "_getStyle" : function(style){
            return document.defaultView.getComputedStyle(this._getProxy(), null).getPropertyValue(style);
        },
        "_setStyle" : function(style, value){
            if(isSet(value)){
                this._getProxy().style.setProperty(style, value);
                return value;
            }
            this._getProxy().style.removeProperty(style);
            return null;
        },
        "_setStyleColor" : function(style, value){
            if(value){
                if(isString(value) && value.charAt(0) == "#"){
                    value = hexToRgb(value).rgb;
                }
                if(isArray(value)){
                    value = "rgb" + (value.length > 3 ? "a(" : "(") + value.join(",") + ")";
                }
            }
            return this._setStyle(style, value);
        },

        "_getStyleNum" : function(prop){
            var val = this._getStyle(prop);
            if(!val || val == OjStyleElement.NONE){
                return 0;
            }
            return parseFloat(val.replaceAll(["px", "%", "pt", "em"], ""));
        },
        "_setStyleNum" : function(prop, val, unit){
            var args = arguments;
            this._setStyle(
                prop,
                isSet(val) ? val + (isUndefined(unit) ? this._getStyleUnit(prop) : unit) : null
            );
            return val;
        },
        "styleNum" : function (prop, val, unit) {
            if(isUndefined(val)){
                return this._getStyleNum(prop);
            }
            return this._setStyleNum(prop, val, unit);
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
            const proxy = this._getProxy();
            // process the key incase its an attribute object
            if(isObject(key)){
                key = key.nodeName;
            }
            if(!isUndefined(val)){
                // if the value is set (not null) then update attribute value
                if(isSet(val)){
                    proxy.setAttribute(key, val);
                }
                // otherwise remove
                else{
                    proxy.removeAttribute(key);
                }
            }
            // read the attribute value
            return proxy.getAttribute(key);
        },
        "style" : function(key, val){
            var self = this;
            if(isUndefined(val)){
                return self._getStyle(key);
            }
            return self._setStyle(key, val);
        },
        
        ".id" : function(){
            return this._id || this.oj_id;
        },
        "=id" : function(val){
            if(this._id == val){
                return
            }
            (this.dom || {}).id = this._id = val;
        },
        // Content Getter & Setter Functions
        ".text" : function(){
            return this.dom.innerHTML;
        },
        "=text" : function(str){
            this.removeAllChildren();
            if(!isObjective(str, OjTextElement)){
                str = new OjTextElement(str);
            }
            this.dom.appendChild(str.dom);
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
            return this._getProxy().className.trim();
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
            return this._getProxy().className = (isArray(css) ? css.join(" ") : css).trim();
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
            return this.dom.hasFocus;
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
        ".width" : function(){
            // const proxy = this._getProxy();
            // if(arguments[0] == OjStyleElement.PERCENT){
            //     const parent = proxy.offsetParent || proxy;
            //
            //     return (proxy.offsetWidth / parent.offsetWidth) * 100;
            // }
            return this._getProxy().offsetWidth || this._getStyleNum("width");
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
            return this._getProxy().offsetHeight || this._getStyleNum("height");
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
        // Style Getter & Setter Functions
        ".x" : function(/*unit=px*/){
            return this._getProxy().offsetLeft;
        },
        ".pageX" : function(){
            const proxy = this._getProxy();
            if(proxy.getBoundingClientRect){
                return proxy.getBoundingClientRect().left;
            }
            // todo: add backup solution
        },
        "=x" : function(val_or_tuple){
            this.left = val_or_tuple;
        },
        "=pageX" : function(val){
            this.left = this.parent.localX(val);
        },
        ".y" : function(){
            return this._getProxy().offsetTop;
        },
        ".pageY" : function(){
            const proxy = this._getProxy();
            if(proxy.getBoundingClientRect){
                return proxy.getBoundingClientRect().top;
            }
            // add backup solution
        },
        "=y" : function(val_or_tuple){
            this.top = val_or_tuple;
        },
        "=pageY" : function(val){
            this.top = this.parent.localY(val);
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
        ".bottom" : function(){
            return this._getStyleNum("bottom");
        },
        "=bottom" : function(val_or_tuple){
            const is_tuple = isArray(val_or_tuple),
                val = is_tuple ? val_or_tuple[0] : val_or_tuple,
                units = is_tuple ? val_or_tuple[1] : OJ.dim_unit;
            this._setStyleNum("bottom", val, units);
        },
        ".depth" : function(){
            return this._depth;
        },
        "=depth" : function(depth){
            this._depth = this._setStyle("zIndex", depth);
        },
        ".first_child" : function(){
            return this.getChildAt(0);
        },
        ".font_color" : function(){
            return this._getStyle("color");
        },
        "=font_color" : function(color){
            this._setStyleColor("color", color);
        },
        ".font_size" : function(){
            this._getStyleNum("font-size");
        },
        "=font_size" : function(size){
            this._setStyleNum("font-size", size, OJ.font_unit);
        },
        ".last_child" : function(){
            return this.getChildAt(this.num_children - 1);
        },
        ".left" : function(){
            return this._getStyleNum("left");
        },
        "=left" : function(val_or_tuple){
            const is_tuple = isArray(val_or_tuple),
                val = is_tuple ? val_or_tuple[0] : val_or_tuple,
                units = is_tuple ? val_or_tuple[1] : OJ.dim_unit;
            this._setStyleNum("left", val, units);
        },
        ".overflow" : function(){
            return this._overflow;
        },
        "=overflow" : function(overflow){
            this._overflow = this._setStyle("overflow", overflow);
        },
        ".page_rect" : function(){
            var self = this;
            return new OjRect(self.pageX, self.pageY, self.width, self.height);
        },
        "=page_rect" : function(rect){
            // todo: =page_rect
        },
        ".rect" : function(){
            return new OjRect(this.x, this.y, this.width, this.height);
        },
        "=rect" : function(rect){
            // add this later
        },
        ".right" : function(){
            return this._getStyleNum("right");
        },
        "=right" : function(val_or_tuple){
            const is_tuple = isArray(val_or_tuple),
                val = is_tuple ? val_or_tuple[0] : val_or_tuple,
                units = is_tuple ? val_or_tuple[1] : OJ.dim_unit;
            this._setStyleNum("right", val, units);
        },
        ".scroll_height" : function(){
            return this._getProxy().scrollHeight;
        },
        "=scroll_height" : function(val){
            this._getProxy().scrollHeight = val;
        },
        ".scroll_width" : function(){
            return this._getProxy().scrollWidth;
        },
        "=scroll_width" : function(val){
            this._getProxy().scrollWidth = val;
        },
        ".scroll_x" : function(){
            return this._getProxy().scrollLeft;
        },
        "=scroll_x" : function(val){
            this._getProxy().scrollLeft = val;
        },
        ".scroll_y" : function(){
            return this._getProxy().scrollTop;
        },
        "=scroll_y" : function(val){
            this._getProxy().scrollTop = val;
        },
        ".top" : function(){
            return this._getStyleNum("top");
        },
        "=top" : function(val_or_tuple){
            const is_tuple = isArray(val_or_tuple),
                val = is_tuple ? val_or_tuple[0] : val_or_tuple,
                units = is_tuple ? val_or_tuple[1] : OJ.dim_unit;
            this._setStyleNum("top", val, units);
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
        ".tag" : function(){
            return this.dom.tagName;
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
            const elm = OjElement.elm("div");
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
        "LEFT" : "left",
        "CENTER" : "center",
        "RIGHT" : "right",
        "TOP" : "top",
        "MIDDLE" : "middle",
        "BOTTOM" : "bottom",
        "PERCENT" : "%",
        "PX" : "px",
        "EM" : "em",
        "_resize_observer" : new ResizeObserver((entries, observer) => {
            const cls = OjTransformEvent;
            for (const entry of entries) {
                const self = OjElement.element(entry.target),
                    prev = self._prev_rect;
                self.dispatchEvent(new cls(cls.RESIZE, self._prev_rect = self.rect, prev));
            }
        }),

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

        "_constructor" : function(duration, repeat_count){
            this._super(OjActionable, "_constructor", []);
            this._state = OjTimer.STOPPED;
            this._set("duration", duration, 0);
            this._set("repeat_count", repeat_count, 1);
        },

        "_setupInterval" : function(){
            const self = this,
                intrvl = self._interval;
            if(intrvl){
                clearInterval(intrvl);
            }
            self._interval = setInterval(() => { self._tick(); }, self.duration);
            self._updateLastTick();
        },
        "_tick" : function(){
            const on_complete = this.on_complete,
                on_tick = this.on_tick,
                repeat = this.repeat_count;
            this._updateLastTick();
            if(on_tick){
                on_tick(this);
            }
            this.dispatchEvent(new OjEvent(OjTimer.TICK));
            if(repeat > 0 && this._count++ == repeat){
                this.stop();
                if(on_complete){
                    on_complete(this);
                }
                this.dispatchEvent(new OjEvent(OjTimer.COMPLETE));
            }
        },
        "_updateLastTick" : function(){
            this._last_tick = new Date();
            this._elapsed = 0;
        },

        "pause" : function(){
            const last_tick = this._last_tick,
                intrvl = this._interval;
            this._elapsed = last_tick ? (new Date()).getTime() - last_tick.getTime() : 0;
            this._state = OjTimer.PAUSED;
            if(intrvl){
                // todo: there is an edge case where this could be a timeout from a partial resume. not sure what to do.
                clearInterval(intrvl);
                this._interval = null;
            }
        },
        "restart" : function(){
            this.stop();
            this.start();
        },
        "start" : function(){
            const self = this,
                elapsed = self._elapsed;
            if(!self._interval){
                self._elapsed = 0;
                self._state = OjTimer.RUNNING;
                // check to see if we have a partial we need to complete
                if(elapsed && elapsed < self.duration){
                    self._last_tick = new Date((new Date().getTime() - elapsed)); // post date the last tick
                    // run the last little bit of the tick
                    self._interval = setTimeout(
                        () => {
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
            this.pause();
            this._count = 0;
            this._elapsed = 0;
            this._state = OjTimer.STOPPED;
        },

        "=duration" : function(duration){
            if(this._duration != duration){
                this._duration = Math.abs(duration);
                this._elapsed = 0;
                if(this._interval){
                    this._setupInterval();
                }
            }
        },
        ".paused" : function(){
            return this._state == OjTimer.PAUSED;
        },
        "=repeat_count" : function(repeat_count){
            this._repeat_count = repeat_count = Math.max(repeat_count, 0);
            if(repeat_count >= this.count && this.running){
                this.stop();
                this.dispatchEvent(new OjEvent(OjTimer.COMPLETE));
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
    var vendors = ["o", "ms", "webkit", "moz"],
        ln = vendors.length,
        vendor;
    for(; ln-- && !window.requestAnimationFrame;){
        vendor = vendors[ln];
        window.requestAnimationFrame = window[vendor + "RequestAnimationFrame"];
        window.cancelAnimationFrame = window[vendor + "CancelAnimationFrame"] || window[vendor + "CancelRequestAnimationFrame"];
    }
})();

OJ.extendClass(
    "OjTween", [OjActionable],
    {
        "_props_" : {
            "completion" : null,
            "duration" : null,
            "easing" : null,
            "from" : null,
            "quality" : 60,  // frame rate
            "to" : null
        },
//      "_animationFrame": null,  "_onAnimationFrame": null,  "_start": null,  "_timer": null,
        "_delta" : 0, "_progress" : 0,

        "_constructor" : function(from, to, duration, easing){
            this._super(OjActionable, "_constructor", []);
            this._set("from", from);
            this._set("to", to);
            this._set("duration", duration, 250);
            this._set("easing", easing, OjEasing.NONE);
            this._onAnimationFrame = this._onTick.bind(this);
        },

        "_destructor" : function(){
            this.stop();
            this._unset(["_timer", "_onAnimationFrame"]);
            return this._super(OjActionable, "_destructor", arguments);
        },

        "_calculateDelta" : function(){
            this._delta = this._to - this._from;
        },
        "_tick" : function(time){
            this.dispatchEvent(
                new OjTweenEvent(
                    OjTweenEvent.TICK, // type
                    this._easing(time, this._from, this._delta, this._duration, 0, 0), // value
                    time / this._duration // progress
                )
            );
        },

        "_onTick" : function(evt){
            // check if we should tick
            if(!this._interval && !this._animationFrame){
                return;
            }
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
        "_onComplete" : function(evt){
            const completion = this._completion;
            if(completion){
                completion(this);
            }
            this.dispatchEvent(new OjTweenEvent(OjTweenEvent.COMPLETE, this._to, 1));
        },

        "start" : function(){
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
        "pause" : function(){
            this._interval = clearInterval(this._interval);
            this._progress = Date.now() - this._start;
            if(this._animationFrame){
                window.cancelAnimationFrame(this._animationFrame);
                return this._animationFrame = null;
            }
        },
        "stop" : function(){
            this.pause();
            this._progress = this._start = 0;
        },
        "restart" : function(){
            this.stop();
            this.start();
        },
        "reverse" : function(){
            // todo: implement tween reverse
        }
    },
    {
        "USE_RAF" : isSet(window.requestAnimationFrame)
    }
);


OJ.extendClass(
    "OjPropTween", [OjTween],
    {
        "_props_" : {
            "mode" : "Javascript",
            "target" : null,
            "units" : null
        },

        "_constructor" : function(target, to, duration, easing, units){
            this._super(OjTween, "_constructor", []);
            this._set("target", target);
            this._set("to", to);
            this._set("duration", duration, 250);
            this._set("easing", easing, OjEasing.NONE);
            this._set("units", units);
//            var engine = OJ.getEngine();
//
//            if(engine == OJ.WEBKIT && !OJ.isMobile()){
//                        this._mode = OjPropTween.WEBKIT;
//            }
        },
        "_destructor" : function(){
            this._callback = null;
            return this._super(OjTween, "_destructor", arguments);
        },

        "_calculateDelta" : function(){
            var self = this,
                target = self.target;
            self._from_cache = {};
            self._delta = {};
            var has_from = !isEmptyObject(self._from), key, transition_properties = '';
            for(key in self._to){
                if(!has_from){
                    self._from[key] = target[key] || 0;
                }
                self._from_cache[key] = parseFloat(self._from[key]);
                self._delta[key] = parseFloat(self._to[key]) - self._from_cache[key];
                if(transition_properties != ''){
                    transition_properties += ', ';
                }
                transition_properties += (OjPropTween.PROPERTY_CSS_MAP[key] || key);
            }
        },
        "_is_animating" : function(val){
            if(this._target && this._target.is("OjComponent")){
                this._target._setIsAnimating(val);
            }
        },
        "_tick" : function(time){
            const self = this,
                cache = self._from_cache,
                duration = self.duration,
                delta = self._delta,
                easing = self.easing,
                target = self.target,
                units = self.units;
            if(target && cache && delta){
                for(const key in delta){
                    const args = [
                        Math.round(
                            easing(time, cache[key], delta[key], duration, 0, 0) * 1000
                        ) / 1000
                    ];
                    if(units){
                        args.append(units);
                    }
                    target[key] = args;
                }
            }
            self._super(OjTween, "_tick", arguments);
        },

        "_onComplete" : function(evt){
            this._is_animating(false);
            this._super(OjTween, "_onComplete", arguments);
        },
        "_onTargetDestroy" : function(evt){
            this.target = null;
        },
        "_onWebKitComplete" : function(evt){
            var self = this,
                target = self.target,
                prop = OjPropTween.CSS_PROPERTY_MAP[evt.propertyName] || evt.propertyName;
            if(isUndefined(self._from[prop])){
                return;
            }
            // cleanup the webkit transition settings
            target._setStyle("-webkit-transition-duration", null);
            target._setStyle("-webkit-transition-property", null);
            target.dom.removeEventListener("webkitTransitionEnd", self._callback, false);
            self._onComplete(evt);
            self._callback = null;
        },

        "pause" : function(){
            this._is_animating(false);
            this._super(OjTween, "pause", arguments);
        },
        "start" : function(){
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
                this._target._setStyle("-webkit-transition-duration", this._duration + "ms");
                this._target._setStyle("-webkit-transition-property", transition_properties);
                // add in easing setting later
                this._target.dom.addEventListener("webkitTransitionEnd", this._callback = this._onWebKitComplete.bind(this), false);
                for(key in this._delta){
                    this._target[key](this._from_cache[key] + this._delta[key]);
                }
                // maybe add fallback timer to trigger event in case something goes wrong...
            }
            else{
                this._super(OjTween, "start", arguments);
            }
        },
        "stop" : function(){
            this._is_animating(false);
            this._super(OjTween, "stop", arguments);
        },

        "=mode" : function(val){
            if(this._mode == val){
                return;
            }
            this._mode = val;
            if(this._timer){
                OJ.destroy(this._timer);
            }
        },
        "=target" : function(target){
            if(this._target == target){
                return;
            }
            if(this._target){
                this._target.removeEventListener(OjEvent.DESTROY, this, "_onTargetDestroy");
            }
            if(this._target = target){
                this._target.addEventListener(OjEvent.DESTROY, this, "_onTargetDestroy");
            }
        }
    },
    {
        "PROPERTY_CSS_MAP" : {
            "alpha" : "opacity",
            "x" : "left",
            "y" : "top"
        },
        "CSS_PROPERTY_MAP" : {
            "opacity" : "alpha",
            "left" : "x",
            "right" : "y"
        },
        "JS" : "Javascript",
        "WEBKIT" : "WebKit"
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

        "_constructor" : function(target, direction, duration, easing){
            this._super(OjPropTween, "_constructor", []);
            this._set("target", target);
            this._set("direction", direction, OjFade.IN);
            this._set("duration", duration, 250);
            this._set("easing", easing, OjEasing.NONE);
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
    "OjComponentEvent", [OjEvent],
    { },
    {
        "ACTIVE" : "onActive",
        "INACTIVE" : "onInactive",
        "ACTIVE_CHANGE" : "onActiveChange",
        "ENABLED" : "onEnabled",
        "DISABLED" : "onDisabled",
        "ENABLED_CHANGE" : "onEnabledChange"
    }
);

OJ.extendClass(
    "OjComponent", [OjStyleElement],
    {
        "_props_" : {
            "enabled" : null,
            "disabled" : false,
            "elms" : null,
            "is_active" : null,
            "is_inactive" : null,
            "is_enabled" : null,
            "is_disabled" : null,
            "num_elms" : 0
        },
        "_get_props_" : {
            "controller" : null,
            "is_animating" : false
        },

        "_constructor" : function(){
            const args = [null, this],
                template = this._template;
            // process the template if any
            if(template){
                if(template.charAt(0) == "<"){
                    args[0] = template;
                }
                else{
                    // TODO: this will throw an error until importTemplate is replaced
                    //args[0] = importTemplate(this._template);
                }
            }
            // call super constructor
            this._super(OjStyleElement, "_constructor", args);
            // add the class name inheritance as css classes
            this._setCss();
            // setup the container
            this._setContainer(this.container || this);
        },
        "_destructor" : function(){
            this._disableUiEvents();
            return this._super(OjStyleElement, "_destructor", arguments);
        },

        "_disableUiEvents" : function(){
            this.removeEventListener(OjUiEvent.DOWN, this, "_onUiDown");
            this.removeEventListener(OjUiEvent.PRESS, this, "_onUiPress");
            this.removeEventListener(OjUiEvent.OVER, this, "_onUiOver");
            this.removeEventListener(OjUiEvent.OUT, this, "_onUiOut");
            OJ.removeEventListener(OjUiEvent.MOVE, this, "_onUiMove");
            OJ.removeEventListener(OjUiEvent.UP, this, "_onUiUp");
        },
        "_enableUiEvents" : function(){
            this.addEventListener(OjUiEvent.DOWN, this, "_onUiDown");
            this.addEventListener(OjUiEvent.PRESS, this, "_onUiPress");
            this.addEventListener(OjUiEvent.OVER, this, "_onUiOver");
        },

        "_onUiDown" : function(evt){
            OJ.addEventListener(OjUiEvent.UP, this, "_onUiUp");
            this.addEventListener(OjUiEvent.UP, this, "_onUiUp");
            this.addCss("ui-down");
        },
        "_onUiMove" : function(evt){
            var self = this;
            if(!self.hitTestPoint(evt.pageX, evt.pageY)){
                OJ.removeEventListener(OjUiEvent.MOVE, self, "_onUiMove");
                self._onUiOut(evt);
            }
        },
        "_onUiOut" : function(evt){
            this.removeCss("ui-over");
        },
        "_onUiOver" : function(evt){
            var self = this;
            OJ.addEventListener(OjUiEvent.MOVE, self, "_onUiMove");
            self.addCss("ui-over");
        },
        "_onUiPress" : function(evt){
            // do nothing
        },
        "_onUiUp" : function(evt){
            var self = this;
            OJ.removeEventListener(OjUiEvent.UP, self, "_onUiUp");
            self.removeEventListener(OjUiEvent.UP, self, "_onUiUp");
            self.removeCss("ui-down");
        },
        // override this so that the component gets properly set
        "_processChild" : function(dom, context){
            return this._super(OjStyleElement, "_processChild", [dom, context ? context : this]);
        },
        "_processDomSourceAttributes" : function(dom, context){
            this._processAttributes(dom, context);
        },
        "_processDomSourceChild" : function(dom_elm, context){
            if(!dom_elm || OjElement.isCommentNode(dom_elm)){
                return ;
            }
            return this._processChild(dom_elm, context);
        },
        "_processDomSourceChildren" : function(dom, context){
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

        "_setCss" : function(){
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
        "_setContainer" : function(container){
            if(this.container == container){
                return;
            }
            if(this.container){
                this.container.removeCss("container");
            }
            if((this.container = container) != this){
                this.container.addCss("container");
            }
        },
        "_setDomSource" : function(dom, context){
            // setup our vars
            const is_body = (dom == document.body),
                _dom = this.dom,
                source = is_body ? _dom : dom,
                target = is_body ? dom : _dom;
            let ary, prev, nm, val, ln, i;
            // process dom attributes
            this._processDomSourceAttributes(dom, context);
            // copy over attributes
            ln = (ary = source.attributes).length;
            for(; ln--;){
                i = ary[ln];
                nm = i.nodeName;
                val = i.value;
                if(nm == "class"){
                    prev = target.getAttribute(nm);
                    target.className = (String.string(prev) + " " + val).trim();
                }
                else if(nm == "id"){
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
            // update our dom var to the target
            target.__oj__ = this._id_;
            // process any template vars
            this._processTemplateVars();
        },
        "_setIsAnimating" : function(val){
            if(this._is_animating == val){
                return;
            }
            if(this._is_animating = val){
                this.addCss("animating");
            }
            else{
                this.removeCss("animating");
            }
        },
        "_setIsDisplayed" : function(displayed){
            this._super(OjStyleElement, "_setIsDisplayed", arguments);
            this.redraw();
        },

        "_processEvent" : function(evt){
            if(this._is_disabled){
                return false;
            }
            return this._super(OjStyleElement, "_processEvent", arguments);
        },

        // Component Management Functions
        "_callElmFunc" : function(func, args){
            return this._callElmProp(func).apply(this.container, args);
        },
        "_callElmProp" : function(prop, val){
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
        "appendElm" : function(){
            return this._callElmFunc("appendElm", arguments);
        },
        ".elms" : function(){
            return this._callElmProp("elms");
        },
        "=elms" : function(elms){
            return this._callElmProp("elms", elms);
        },
        "forElm" : function(){
            return this._callElmFunc("forElm", arguments);
        },
        "forElmReverse" : function(){
            return this._callElmFunc("forElmReverse", arguments);
        },
        "getElmAt" : function(){
            return this._callElmFunc("getElmAt", arguments);
        },
        "hasElm" : function(){
            return this._callElmFunc("hasElm", arguments);
        },
        "indexOfElm" : function(){
            return this._callElmFunc("indexOfElm", arguments);
        },
        "insertElmAt" : function(){
            return this._callElmFunc("insertElmAt", arguments);
        },
        "moveElm" : function(){
            return this._callElmFunc("moveElm", arguments);
        },
        ".num_elms" : function(){
            return this._callElmProp("num_elms");
        },
        "prependElm" : function(){
            return this._callElmFunc("prependElm", arguments);
        },
        "removeAllElms" : function(){
            return this._callElmFunc("removeAllElms", arguments);
        },
        "removeElm" : function(){
            return this._callElmFunc("removeElm", arguments);
        },
        "removeElmAt" : function(){
            return this._callElmFunc("removeElmAt", arguments);
        },
        "replaceElm" : function(){
            return this._callElmFunc("replaceElm", arguments);
        },
        "replaceElmAt" : function(){
            return this._callElmFunc("replaceElmAt", arguments);
        },

        // event handling functions
        "_onFadeComplete" : function(evt){
            this.alpha = 1;
            if(this._fader.direction == OjFade.OUT){
                this.hide();
            }
            else{
                this.show();
            }
            this._setIsAnimating(false);
            this._unset("_fader");
        },

        "fadeIn" : function(duration, easing){
            if(this._fader){
                if(this._fader.direction == OjFade.IN){
                    return;
                }
                this._unset("_fader");
            }
            else if(this.is_visible){
                return;
            }
            this.show();
            var ln = arguments.length;
            this._fader = new OjFade(this, OjFade.IN, ln ? duration : 250, ln > 1 ? easing : OjEasing.NONE);
            this._fader.addEventListener(OjTweenEvent.COMPLETE, this, "_onFadeComplete");
            this._fader.start();
            this._setIsAnimating(true);
        },
        "fadeOut" : function(duration, easing){
            if(this._fader){
                if(this._fader.direction == OjFade.OUT){
                    return;
                }
                this._unset("_fader");
            }
            else if(!this.is_visible){
                return;
            }
            var ln = arguments.length;
            this._fader = new OjFade(this, OjFade.OUT, ln ? duration : 250, ln > 1 ? easing : OjEasing.NONE);
            this._fader.addEventListener(OjTweenEvent.COMPLETE, this, "_onFadeComplete");
            this._fader.start();
            this._setIsAnimating(true);
        },
        "redraw" : function(force){
            return this._is_displayed || force;
        },
        // Getter/Setter Methods
        ".controller" : function(){
            if(!this._controller){
                var p = this.parentComponent;
                if(p){
                    this._controller = p.controller;
                }
            }
            return this._controller;
        },
        // is_active
        "=is_active" : function(val){
            var self = this,
                evt = OjComponentEvent;
            if(self._is_active != val){
                if(self._is_active = val){
                    self.addCss("active");
                    self.dispatchEvent(new evt(evt.ACTIVE));
                }
                else{
                    self.removeCss("active");
                    self.dispatchEvent(new evt(evt.INACTIVE));
                }
                self.dispatchEvent(new evt(evt.ACTIVE_CHANGE));
            }
        },
        ".is_inactive" : function(){ return !this.is_active; },
        "=is_inactive" : function(val){ return this.is_active = !val; },
        // is_disabled
        "=is_disabled" : function(val){
            var self = this,
                evt = OjComponentEvent;
            if(self._is_disabled != val){
                if(self._is_disabled = val){
                    self.addCss("disabled");
                    self.dispatchEvent(new evt(evt.DISABLED));
                }
                else{
                    self.removeCss("disabled");
                    self.dispatchEvent(new evt(evt.ENABLED));
                }
                self.dispatchEvent(new evt(evt.ENABLED_CHANGE));
            }
        },
        ".is_enabled" : function(){ return !this.is_disabled; },
        "=is_enabled" : function(val){ return this.is_disabled = !val; }
    },
    {
        "_TAGS" : [],
        "ELM_FUNCS" : {
            "appendElm" : "appendChild",
            "elms" : "children",
            "forElm" : "forChild",
            "forElmReverse" : "forChildReverse",
            "getElmAt" : "getChildAt",
            "hasElm" : "hasChild",
            "indexOfElm" : "indexOfChild",
            "insertElmAt" : "insertChildAt",
            "moveElm" : "moveChild",
            "num_elms" : "num_children",
            "prependElm" : "prependChild",
            "removeAllElms" : "removeAllChildren",
            "removeElm" : "removeChild",
            "removeElmAt" : "removeChildAt",
            "replaceElm" : "replaceChild",
            "replaceElmAt" : "replaceChildAt"
        },
        "HORIZONTAL" : "horz",
        "HORIZONTAL_REVERSE" : "horz-rev",
        "VERTICAL" : "vert",
        "VERTICAL_REVERSE" : "vert-rev",
        "load" : function(source){
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
            "nav_css": null,
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
        "_loading_msg" : "Loading", "_template" : "<div></div>", "_is_loaded" : false,
        "_unloading_msg" : "UnLoading",

        "_constructor" : function(content, title, short_title, icon){
            this._super(OjComponent, "_constructor", []);
            // setup vars
            this._checkpoints = {};
            // process arguments
            const cls = this._static;
            this._set("content", content);
            this._set("title", title, OJ.copy(cls.TITLE));
            this._set("title", short_title, OJ.copy(cls.SHORT_TITLE));
            this._set("icon", icon, OJ.copy(cls.ICON));
        },
        "_destructor" : function(){
            this.unload();
            this._unset(["_action_view", "_cancel_view", "_title_view", "_overlay"]);
            return this._super(OjComponent, "_destructor", arguments);
        },

        "_checkpointsCompleted" : function(){
            for(const key in this._checkpoints){
                if(!this._checkpoints[key]){
                    return false;
                }
            }
            return true;
        },
        "_checkpointComplete" : function(checkpoint){
            this._checkpoints[checkpoint] = true;
            if(this._checkpointsCompleted()){
                this._load();
            }
        },
        "_hideOverlay" : function(overlay){
            if((overlay = overlay || this._overlay)){
                overlay.addEventListener(OjEvent.HIDE, this, "_onOverlayHide");
                overlay.hide();
            }
        },
        "_load" : function(){
            this._is_loaded = true;
            this.removeCss("loading");
            this.redraw();
            this._hideOverlay();
            this.dispatchEvent(new OjEvent(OjView.LOAD));
        },
        "_resetCheckpoints" : function(){
            for(const key in this._checkpoints){
                this._checkpoints[key] = false;
            }
        },
        "_showOverlay" : function(msg, icon){
            let overlay = this._overlay;
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
            this._is_loaded = false;
            // dispatch the event
            this.dispatchEvent(new OjEvent(OjView.UNLOAD));
        },

        "_onOverlayHide" : function(evt){
            this._unset("_overlay");
        },

        "didHide" : function(){ },
        "didShow" : function(){ },
        "load" : function(reload){
            // figure out if we need to actually load
            if(!reload && this._is_loaded){
                return false;
            }
            // let the ui know we are loading
            this.addCss("loading");
            // reset the checkpoints
            this._resetCheckpoints();
            const self = this,
                checkpoints = Object.keys(this._checkpoints);
            // only show overlay if we have checkpoints
            if(checkpoints.length){
                this._showOverlay(this._loading_msg, this._loading_icon);
                // call the checkpoints
                checkpoints.forEachReverse( (checkpoint) => {
                    self[checkpoint]();
                });
            }
            // if not checkpoints then we are done
            else{
                this._load();
            }
            return true;
        },
        "unload" : function(){
            // figure out if we need to unload
            if(this._is_loaded){
                this._unload();
            }
        },
        "willHide" : function(){
            const container = this.container;
            if(container){
                this._container_scroll_pos = [container.scroll_x, container.scroll_y];
            }
        },
        "willShow" : function(){
            const pos = this._container_scroll_pos,
                container = this.container;
            if(pos && container){
                container.scroll_x = pos[0];
                container.scroll_y = pos[1];
            }
        },

        // getter & Setter functions
        ".content" : function(){
            return this.elms;
        },
        "=content" : function(content){
            this.removeAllElms();
            if(content){
                content = Array.array(content);
                for(let ln = content.length; ln--;){
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
            var icon = this._icon;
            if(isObjective(icon)){
                return icon;
            }
            return OjImage.image(icon, true); // this will clone the icon so that we don"t run into the icon accidentally getting messed up
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
            "on_load" : null,
            'source' : null,
            'timeout' : 60
        },

        '_interval' : null,
        '_template' : '<iframe></iframe>',

        '_constructor' : function(source, target, on_load){
            var self = this;
            self._super(OjView, '_constructor', []);
            if(source){
                self.source = source;
            }
            if(target){
                self.target = target;
            }
            self.on_load = on_load;
            self.attr('name', self.id);
        },

        '_onLoad' : function(){
            clearInterval(this._interval);
            var on_load = this.on_load;
            if(on_load){
                on_load(true);
            }
            this.dispatchEvent(new OjEvent(OjEvent.COMPLETE));
        },
        '_onTimeout' : function(){
            clearInterval(this._interval);
            var on_load = this.on_load;
            if(on_load){
                on_load(false);
            }
            this.dispatchEvent(new OjIoError(OjIoError.IO_ERROR));
        },

        '.source' : function(){
            return this._source;
        },
        '=source' : function(source){
            var iframe = this.dom;
            this._source = source.toString();
            this.attr('src', this._source);
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
            'resize_by': 'none', // OjMedia.NONE
            'source': null,
            'show_spinner': false,
            'spinner_tint': '#333'
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
            else if(this._resize_by == this._static.WIDTH){
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
            if (!this.loading && this._show_spinner) {
                this.appendElm(this.loading = new OjSpinner(this._spinner_tint));
            }
            this._setSource(url);
            if (this._preload || this._is_displayed) {
                this._load();
            }
        },
        '=resize_by': function (val) {
            if (this._resize_by == val) {
                return;
            }
            this._resize_by = this._resize_vals.indexOf(val) > -1 ? val : this._static.NONE;
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

        '_constructor' : function(effect, duration, easing){
            this._super(OjObject, '_constructor', []);
            // default the easing property
            this._set("effect", effect, OjTransition.FADE);
            this._set("duration", duration, 250);
            this._set("easing", easing, [OjEasing.NONE, OjEasing.NONE]);
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
        "_onStackChange" : function(evt){
        },
        "_onStackChangeComplete" : function(evt){
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
    "OjLabel", [OjComponent],
    {
        "_props_" : {
            "prefix" : null,
            "suffix" : null
        },
        "_template" : "<label></label>",

        "_constructor" : function(text){
            this._super(OjComponent, "_constructor", []);
            this.text = text;
        },
        "_processDomSourceChild" : function(){
            const child = this._super(OjComponent, "_processDomSourceChild", arguments);
            if(child && child.is(OjTextElement)){
                this.text = child;
                return;
            }
            return child;
        },
        "_addSpan" : function(css, text, target){
            const span = new OjStyleElement("<span class='" + css + "'></span>");
            span.text = text;
            target.appendChild(span);
        },
        "_redrawText" : function(target){
            const prefix = this.prefix,
                suffix = this.suffix,
                text = this.text;
            target = target || this;
            target.removeAllChildren();
            if(prefix){
                this._addSpan("prefix", prefix, target);
            }
            if(prefix || suffix){
                this._addSpan("stem", text, target);
            }
            else if(text){
                target.appendChild(text);
            }
            if(suffix){
                this._addSpan("suffix", suffix, target);
            }
        },
        "redraw" : function(){
            if(this._super(OjComponent, "redraw", arguments)){
                this._redrawText();
                return true;
            }
            return false;
        },

        "=prefix" : function(val){
            if(this._prefix == val){
                return;
            }
            this._prefix = isObjective(val, OjTextElement) ? val : new OjTextElement(val);
            this.redraw();
        },
        "=suffix" : function(val){
            if(this._suffix == val){
                return;
            }
            this._suffix = isObjective(val, OjTextElement) ? val : new OjTextElement(val);
            this.redraw();
        },
        // these are needed to override the OjStyleElement text getter/setter
        ".text" : function(){
            return this._text;
        },
        "=text" : function(val){
            if(this._text == val){
                return;
            }
            this._text = isObjective(val, OjTextElement) ? val : new OjTextElement(val);
            this.redraw();
        }
    },
    {
        "_TAGS" : ["label"]
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
    "OjDimTween", [OjPropTween],
    {
        "_props_" : {
            "amount"    : null,
            "direction" : null
        },

        "_constructor" : function(target, direction, amount, duration, easing, units){
            this._super(OjPropTween, "_constructor", []);
            this._to = {};
            this._set("target", target);
            this._set("direction", direction, this._static.BOTH);
            this._set("amount", amount);
            this._set("duration", duration, 250);
            this._set("easing", easing, OjEasing.NONE);
            this._set("units", units, OJ.dim_unit);
        }
    },
    {
        "HORIZONTAL" : "dimTweenHorizontal",
        "VERTICAL"   : "dimTweenVertical",
        "BOTH"       : "dimTweenBoth"
    }
);

OJ.extendClass(
    "OjMove", [OjDimTween],
    {
        "=amount" : function(amount){
            const self = this,
                dir = self.direction,
                cls = OjMove,
                to = self._to;
            if(self._amount == amount){
                return;
            }
            self._amount = amount;
            if(dir == cls.BOTH){
                to.top = amount[0];
                to.left = amount[1];
            }
            else{
                to[dir] = amount;
            }
        }
    },
    {
        "X"    : "left",
        "Y"    : "top",
        "BOTH" : OjDimTween.BOTH,
        "TOP"    : "top",
        "LEFT"   : "left",
        "BOTTOM" : "bottom",
        "RIGHT"  : "right"
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
            "action_view": null,
            "cancel_icon": null,
            "cancel_label": "Cancel",
            "cancel_view": null,
            "cancel_visible": false,
            "default_title": null,
            "icon_only_back": false,
            "title": null,
            "title_view": null
        },
        "_template" : "<div class=flow-nav-controller><div var=bottom_bar><div var=btm_left class=left flex-h></div><div var=btm_title class=title flex-h></div><div var=btm_right class=right flex-h></div></div><div var=top_bar><div var=top_left class=left flex-h></div><div var=top_title class=title flex-h></div><div var=top_right class=right flex-h></div></div></div>",

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
        "_onStackChangeComplete" : function(evt){
            // remove all views after the active view
            var self = this,
                stack = self.stack,
                ln = stack.num_elms,
                i = stack.active_index;
            self._super(OjNavController, "_onStackChangeComplete", arguments);
            if(stack.has_deferred){
                return;
            }
            for(; --ln > i;){
                stack.removeElmAt(ln);
            }
        },
        // helper functions
        "_makeBackButton" : function(view){
            const btn = new OjButton(this.icon_only_back ? null : OJ.copy(view.short_title));
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
                return title.clone();
            }
            return new OjTextElement(title);
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
            var t = self.top_bar, tl = self.top_left, tt = self.top_title, tr = self.top_right,
                b = self.bottom_bar, bl = self.btm_left, bt = self.btm_title, br = self.btm_right,
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
        "complete" : function(){
            this.dispatchEvent(new OjEvent(OjEvent.COMPLETE, false));
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
        ".action_view" : function(){
            return this.top_right.getChildAt(0);
        },
        "=action_view": function(val){
            var top_right = this.top_right;
            top_right.removeAllChildren();
            if(val){
                top_right.appendChild(val);
            }
        },
        "=default_title" : function(title){
            var self = this;
            if(self._default_title == title){
                return;
            }
            self._default_title = title;
            if(!self.top_title.num_children){
                self.top_title.appendChild(
                    self._makeTitle(title)
                );
            }
        },
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
        ".cancel_view": function(){
            return this.top_left.getChildAt(0);
        },
        "=cancel_view": function(val){
            var top_left = this.top_left;
            top_left.removeAllChildren();
            if(val){
                top_left.appendChild(val);
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

        "_getItemId" : function(item, index){
            return isObjective(item) ? item.oj_id : (isUnset(index) ? item.toString() : index)
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
        'renderItem' : function(item, index, cached_only){
            if(!item){
                return null;
            }
            var self = this,
                cls = self.item_renderer,
                key, evt,
                id = self._getItemId(item, index);
            // if we have already rendered the item then just return the cached value
            if(self._rendered[id] || cached_only){
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
            this.unrenderItemAt(this._elms.indexOf(item));
        },
        'unrenderItemAt' : function(index){
            const self = this,
                item = this.elms[index],
                id = self._getItemId(item, index),
                elm = self._rendered[id];
            if(elm){
                delete self._rendered[id];
                // only destroy it if we made it.
                if(item != elm){
                    OJ.destroy(elm);
                }
            }
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
                remove_evt = col_evt.ITEM_REMOVE, remove_func = '_onItemRemove',
                replace_evt = col_evt.ITEM_REPLACE, replace_func = '_onItemReplace';
            // cleanup the old items if it existed
            if(elms){
                elms.removeEventListener(add_evt, self, add_func);
                elms.removeEventListener(change_evt, self, change_func);
                elms.removeEventListener(move_evt, self, move_func);
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
    "OjResize", [OjDimTween],
    {
        "=amount" : function(amount){
            this._amount = amount;
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
        "WIDTH"  : OjDimTween.HORIZONTAL,
        "HEIGHT" : OjDimTween.VERTICAL,
        "BOTH"   : OjDimTween.BOTH
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
            const self = this,
                container = self.container;
            container.width = OjStyleElement.AUTO;
            container.height = OjStyleElement.AUTO;
            self._transitioning = false;
            self.dispatchEvent(new OjStackEvent(OjStackEvent.CHANGE_COMPLETE, self._active, self._transition, self._active_index, self._prev_index));
            // show/hide methods
            self._active.didShow();
            if(self._prev_active){
                self._prev_active.didHide();
            }
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
        "_removeActiveElm" : function(elm){
            // remove the elm from the display
            this.container.removeChild(elm);
            elm.removeCss("prev-active");
            elm.width = OjStyleElement.AUTO;
            elm.height = OjStyleElement.AUTO;
            elm.x = null;
            elm.y = null;
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
            var self = this;
            // cleanup the transition
            self._unset('_trans_out');
            // remove the previously active item/elm
            self._removeActive(self._prev_active);
            // if there are no more transitions get us out of animating mode
            if(!self._trans_in){
                self._setIsAnimating(false);
                // dispatch the change is complete
                self._dispatchChangeComplete();
            }
            // unset prev vars since they are no longer needed
            self._prev_active = null;
            self._prev_index = null;
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
            // update transitioning flag
            self._transitioning = true;
            // handle custom transition if it exists
            if(trans_diff){
                self.transition = self._processTransParam(trans_diff);
                tmp_trans = self.transition;
            }
            // reset deferred active
            self._deferred_active = null;
            // transition out the old active container
            if(active){
                // get the old element
                self._prev_active = active;
                // let active know we are going to hide it
                active.willHide();
                // update the direction
                // create the transition out animation
                self._makeTransOut(direction = self._animationDirection(self._prev_index = self._active_index, val));
            }
            else{
                direction = always_trans ? 1 : 0;
                self._prev_index = 0;
            }
            // update current index
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
            item.willShow();
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

        // '_destructor' : function(){
        //     // make sure to remove stack and controller references
        //     if(this._active){
        //
        //     }
        //
        //     if(this._prev_active){
        //         //this._unload(this._prev_active);
        //     }
        //
        //     // continue on
        //     this._super(OjStack, '_destructor', arguments);
        // },

        // '_addActive' : function(item, index){
        //     this._super(OjStack, '_addActive', arguments);
        //
        //     item.load();
        // },
        // '_removeActive' : function(item){
        //     var self = this;
        //
        //     (item || self.getElmAt(self._active_index)).unload();
        //
        //     self._super(OjStack, '_removeActive', [item]);
        // },

        "renderItem" : function(item){
            const loaded = item.oj_id in this._rendered,
                elm = this._super(OjStack, "renderItem", arguments);
            elm.controller = this.controller;
            elm.stack = this;
            if(!loaded){
                item.load();
            }
            return elm;
        },
        "unrenderItemAt" : function(index){
            const self = this,
                item = self._elms[index],
                id = self._getItemId(item, index)
                elm = self._rendered[id];
            if(elm){
                item.unload();
                elm.controller = null;
                elm.stack = null;
            }
            return self._super(OjStack, "unrenderItemAt", arguments);
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
    "OjIcon", [OjComponent], {
        "_props_" : {
            "source" : null
        },
        "_template" : "<i></i>",

        "_constructor" : function(icon_class){
            this._super(OjComponent, "_constructor", []);
            if(icon_class){
                this.source = arguments.length == 1 ? icon_class : Array.array(arguments).join(" ");
            }
        },
        "_processDomSourceChild" : function(){
            const child = this._super(OjComponent, "_processDomSourceChild", arguments);
            if(child && child.is(OjTextElement)){
                this.source = child.text;
                return;
            }
            return child;
        },
        "clone" : function(){
            const obj = this._super(OjComponent, "clone", arguments);
            obj.source = this.source;
            return obj;
        },
        // "_setCss" : function(){
        //     // don"t do anything here
        // },
        "=source" : function(val){
            const old = this._source;
            if(old == val){
                return;
            }
            if(old){
                this.removeCss(old);
            }
            if(this._source = val){
                this.addCss(val);
            }
        }
    },
    {
        "_TAGS" : ["i", "icon"]
    }
);

OJ.extendComponent(
    "OjLink", [OjLabel],
    {
        "_props_" : {
            "direction": OjComponent.HORIZONTAL,
            "down_icon"     : null,
            "icon"         : null,
            "over_icon"     : null,
            "form_reset" : null,
            "form_submit" : null,
            "target"       : null,
            "target_height" : null,
            "target_width"  : null,
            "url"          : null
        },
        "_template" : "<a class=\"no-icon no-label\" flex-h><span var=icn></span><span var=lbl></span></a>",

        "_constructor" : function(label, url, target){
            this._super(OjLabel, "_constructor", []);
            if(label){
                this.text = label;
            }
            if(url){
                this.url = url;
            }
            this.target = target || WindowManager.SELF;
            this._enableUiEvents();
        },
        "_destructor" : function(){
            // just to make sure that the document mouse move event listener gets removed
            OJ.removeEventListener(OjUiEvent.MOVE, this, "_onMouseMove");
            this._super(OjLabel, "_destructor", arguments);
        },

        "_processAttribute" : function(dom, attr, context){
            if(attr.nodeName == "href"){
                this.url = attr.value;
                return true;
            }
            return this._super(OjLabel, "_processAttribute", arguments);
        },
        "_processDomSourceChild" : function(){
            const child = this._super(OjLabel, "_processDomSourceChild", arguments);
            if(child && (child.is(OjIcon) || child.is(OjImage))){
                this.icon = child;
                return;
            }
            return child;
        },

        "_redrawText" : function(){
            this._super(OjLabel, "_redrawText", [this.lbl]);
            // update link label css flag
            if(isEmpty(this.lbl.text)){
                this.addCss("no-label");
            }
            else{
                this.removeCss("no-label");
            }
        },
        "_updateIcon" : function(val){
            const icn = this.icn;
            icn.removeAllChildren();
            if(val){
                icn.appendChild(val);
                this.removeCss("no-icon");
            }
            else{
                this.addCss("no-icon");
            }
        },

        "_onUiDown" : function(evt){
            this._super(OjLabel, "_onUiDown", arguments);
            if(this._down_icon){
                this._updateIcon(this._down_icon);
            }
        },
        "_onUiOut" : function(evt){
            this._super(OjLabel, "_onUiOut", arguments);
            this._updateIcon(this._icon);
        },
        "_onUiOver" : function(evt){
            this._super(OjLabel, "_onUiOver", arguments);
            if(this._over_icon){
                this._updateIcon(this._over_icon);
            }
        },
        "_onUiPress" : function(evt){
            const url = this.url,
                form_reset = this.form_reset,
                form_submit = this.form_submit;
            this._super(OjLabel, "_onUiPress", arguments);
            if(url){
                WindowManager.open(
                    url,
                    this.target,
                    {
                        "width" : this.target_width,
                        "height" : this.target_height
                    }
                );
            }
            if(form_reset){
                form_reset.reset();
            }
            if(form_submit){
                form_submit.submit();
            }
        },
        "_onUiUp" : function(evt){
            this._super(OjLabel, "_onUiUp", arguments);
            this._updateIcon(this._icon);
        },

        // GETTER & SETTER FUNCTIONS
        "=direction": function(val){
            var self = this,
                cls = self._static,
                is_horz = val == cls.HORIZONTAL || val == cls.HORIZONTAL_REVERSE;
            // check for change
            if(self.direction == val){
                return;
            }
            self._direction = val;
            self.attr(is_horz ? "flex-v" : "flex-h", null);
            self.attr(is_horz ? "flex-h": "flex-v", "");
            if(val == cls.HORIZONTAL_REVERSE || val == cls.VERTICAL_REVERSE){
                self.addCss("reverse");
            }
            else{
                self.removeCss("reverse");
            }
        },
        "=down_icon" : function(icon){
            if(this._down_icon == (icon = OjImage.image(icon))){
                return;
            }
            this._down_icon = icon;
        },
        "=icon" : function(icon){
            var self = this;
            if(!isObjective(icon, OjIcon)){
                icon = OjImage.image(icon);  // todo: revisit this to process as icon if css based and not image
            }
            if(self._icon == icon){
                return;
            }
            self._updateIcon(self._icon = icon);
        },
        "=over_icon" : function(icon){
            if(this._over_icon == (icon = OjImage.image(icon))){
                return;
            }
            this._over_icon = icon;
        },
        "=url" : function(url){
            this._url = OjUrl.url(url)
        },
        "=target" : function(target){
            if(isComponent(target)){
                target = target.id;
            }
            this._target = target;
        }
    },
    {
        "_TAGS" : ["a", "link"]
    }
);

OJ.extendComponent(
    "OjButton", [OjLink],
    {
        "_props_" : {
            "callback" : null,
            "label" : null
        },

        "_constructor" : function(text, icon, callback){
            this._super(OjLink, "_constructor", []);
            this.addCss("no-select");
            this._set("text", text);
            this._set("icon", icon);
            this._set("callback", callback);
        },

        "_onUiPress" : function(evt){
            this._super(OjLink, "_onUiPress", arguments);
            if(this.callback){
                this.callback(evt);
            }
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
        '_TAGS' : ['button'],
        "button" : function(params, cls){
            cls = cls || OjButton;
            if(isObjective(params, cls)){
                return params;
            }
            if(isArray(params)){
                return new cls(params[0], params[1], params[2]);
			}
			if(isObject(params) && !isObjective(params, OjTextElement)){
			    return new cls(params.label, params.icon, params.callback);
			}
			return new cls(params);
        }
    }
);

OJ.extendClass(
    "OjAlert", [OjComponent],
    {
        "_props_" : {
            "buttons" : null,
            "callback" : null,
            "cancel_callback" : null,
            "cancel_label" : null,
            "content" : null,
            "pane_height" : null,
            "pane_width" : null,
            "self_destruct" : 0, // OjAlert.NONE
            "title" : null
        },
        "_template" : "<div flex-h><div var=underlay></div><div var=pane><div var=bar></div><div var=container class=content></div><div var=btns flex-h><button var=cancel_btn on-press=_onCancelPress>Ok</button></div></div></div>",

        "_constructor" : function(content, title, buttons, cancel_label, callback){
            this._super(OjComponent, "_constructor", []);
            this._set("content", content);
            this._set("title", title);
            this._set("buttons", buttons);
            this._set("cancel_label", cancel_label, OjAlert.CANCEL);
            this._set("callback", callback);
        },
        "_redrawButtons" : function(){
            var self = this;
            if(self.btns.num_children == 1 && isEmpty(self.cancel_label)){
                self.hideButtons();
            }
            else{
                self.showButtons();
            }
        },
        "_destructor" : function(/*depth = 1*/){
            var args = arguments,
                depth = args.length ? args[0] : 0;
            if(!depth){
                // remove all the content so it doesn"t get destroyed
                this.container.removeAllChildren();
            }
            return this._super(OjComponent, "_destructor", arguments);
        },

        "_onButtonClick" : function(evt){
            const self = this,
                index = self.btns.indexOfChild(evt.current_target) - 1; // offset for cancel
            self.dispatchEvent( new OjAlertEvent(OjAlertEvent.BUTTON_PRESS, index) );
            self.complete(index);
        },
        "_onCancelPress" : function(evt){
            this.cancel();
        },
        "cancel" : function(){
            let callback = this.cancel_callback;
            if(callback){
                callback();
            }
            if(callback = this.callback){
                callback(this._static.CANCEL_INDEX);
            }
            this.dispatchEvent( new OjEvent(OjEvent.CANCEL) );
            WindowManager.hide(this);
        },
        
        "complete" : function(button_index){
            const callback = this.callback
            if(callback){
                if(callback(button_index) === false){
                    return;
                }
            }
            WindowManager.hide(this);
        },
        "hideButtons" : function(){
            this.addCss("no-buttons");
            this.btns.hide();
        },
        "present" : function(){
            WindowManager.show(this);
        },
        "showButtons" : function(){
            this.removeCss("no-buttons");
            this.btns.show();
        },

        ".buttons" : function(){
            return this._buttons ? this._buttons.clone() : [];
        },
        "=buttons" : function(buttons){
            this._buttons = buttons = buttons ? buttons.clone() : [];
            var num_btns = buttons.length,
                ln = this.btns.num_children - 1,
                diff = num_btns - ln, btn;
            if(diff > 0){
                for(; diff > 0; ){
                    this.btns.insertChildAt(btn = OjButton.button(buttons[num_btns - (diff--)]), ln + 1);
                    btn.addEventListener(OjUiEvent.PRESS, this, "_onButtonClick");
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
            this._redrawButtons();
        },
        ".cancel_label" : function(){
            return this.cancel_btn.label;
        },
        "=cancel_label" : function(label){
            var btn = this.cancel_btn;
            btn.label = label;
            btn.hide(isEmpty(label));
            this._redrawButtons();
        },
        "=content" : function(content){
            var self = this,
                container = self.container;
            if(self._content == content){
                return;
            }
            container.removeAllChildren();
            self._content = content;
            if(isString(content)){
                content = new OjStyleElement("<p>" + content.replaceAll("\n", "<br />") + "</p>");
            }
            container.appendChild(content);
            if(isObjective(content, OjView)){
                content.load();
            }
        },
        "=title" : function(title){
            if(this._title == title){
                return;
            }
            this.bar.text = this._title = title;
        },
        ".pane_height" : function(){
            return this.pane.height;
        },
        "=pane_height" : function(val/*, unit*/){
            this.pane.height = Array.array(arguments);
        },
        ".pane_width" : function(){
            return this.pane.width;
        },
        "=pane_width" : function(val/*, unit*/){
            this.pane.width = Array.array(arguments);
        }
    },
    {
        "NONE" : 0,
        "SHALLOW" : 1,
        "DEEP" : 2,
        "OK" : "Ok",
        "CANCEL" : "Cancel",
        "CANCEL_INDEX" : -1
    }
);

OJ.extendClass(
    "OjModal", [OjAlert],
    {
        "_props_" : {
            "bar_visible" : true,
            "buttons_visible" : null,
            "cancel_icon" : null,
            "cancel_visible" : null,
            "is_fullscreen" : false,
            "underlay_visible" : true
        },
        "_template" : "<div flex-h><div var=underlay></div><div var=pane><flow-nav var=bar cancel-label=Close></flow-nav><nav-stack var=container class=content></nav-stack><div var=btns></div></div></div>",

        "_constructor" : function(view, title){
            const self = this;
            self._super(OjAlert, "_constructor", []);
            // setup controller stack relationship
            self.bar.stack = self.container;
            self.bar.addEventListener(OjEvent.CANCEL, self, "_onCancelPress");
            self.bar.addEventListener(OjEvent.COMPLETE, self, "_onComplete");
            self.cancel_visible = true;
            self.buttons_visible = false;
            // process arguments
            if(view){
                self.container.appendElm(view);
            }
            if(title){
                self.title = title;
            }
        },
        "_destructor" : function(depth){
            this._unset("bar", depth || 0);
            this._unset("stack", depth || 0);
            return this._super(OjAlert, "_destructor", arguments);
        },

        "_onComplete" : function(){
            this.complete(-1);
        },
        "_onDrag" : function(evt){
            this.pane.x += evt.deltaX;
            this.pane.y += evt.deltaY;
        },

        "=bar_visible" : function(val){
            if(this._bar_visible = val){
                this.bar.show();
                //this.bar.addEventListener(OjDragEvent.DRAG, this, "_onDrag");
            }
            else{
                this.bar.hide();
                //this.bar.removeEventListener(OjDragEvent.DRAG, this, "_onDrag");
            }
        },
        "=buttons_visible" : function(val){
            if(this._buttons_visible = val){
                this.removeCss("no-buttons");
            }
            else{
                this.addCss("no-buttons");
            }
        },
        ".cancel_icon" : function(){
            return this.bar.cancel_icon;
        },
        "=cancel_icon" : function(icon){
            this.bar.cancel_icon = icon;
        },
        ".cancel_label" : function(){
            return this.bar.cancel_label;
        },
        "=cancel_label" : function(label){
            this.bar.cancel_label = label;
        },
        ".cancel_visible" : function(){
            return this.bar.cancel_visible;
        },
        "=cancel_visible" : function(val){
            this.bar.cancel_visible = val;
        },
        "=is_fullscreen" : function(val){
            if(this._is_fullscreen = val){
                this.addCss("fullscreen");
            }
            else{
                this.removeCss("fullscreen");
            }
        },
        "=underlay_visible" : function(val){
            if(this._underlay_visible = val){
                this.underlay.show();
            }
            else{
                this.underlay.hide();
            }
        },

        "=buttons" : function(val){
            this._super(OjAlert, "=buttons", arguments);
            if(this.btns.num_children){
                this.btns.show();
            }
            else{
                this.btns.hide();
            }
        },
        "=title" : function(title){
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
        "_constructor" : function(manager){
            var self = this;
            self._super(OjActionable, "_constructor", []);
            if(manager){
                self._modals = manager._modals;
                self._modal_holder = manager._modal_holder;
                self._overlay = manager._overlay;
                if(!OJ.is_ready){
                    OJ.addEventListener(OjEvent.READY, self, "_onOjReady");
                }
                OJ.destroy(manager);
            }
            else{
                self._modals = [];
                self._modal_holder = new OjStyleElement();
                self._modal_holder.addCss("WindowManager");
                if(OJ.is_ready){
                    self._onOjReady(null);
                }
                else{
                    OJ.addEventListener(OjEvent.READY, self, "_onOjReady");
                }
            }
            OJ.addEventListener(OjKeyboardEvent.SHOW, self, "_onKeyboardUpdate");
            OJ.addEventListener(OjKeyboardEvent.HIDE, self, "_onKeyboardUpdate");
        },
        "_destructor" : function(){
            var self = this;
            OJ.removeEventListener(OjEvent.READY, self, "_onOjReady");
            OJ.removeEventListener(OjKeyboardEvent.SHOW, self, "_onKeyboardUpdate");
            OJ.removeEventListener(OjKeyboardEvent.HIDE, self, "_onKeyboardUpdate");
            self._super(OjActionable, "_destructor", arguments);
        },

        '_calcWindowWidth' : function(width, fullscreen){
            const vp = OJ.viewport;
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
        "_processSpecialProtocols" : function(url){
            var self = this;
            if(url) {
                // check for email
                if (url.protocol == "mailto") {
                    return self.email(url);
                }
                // check for phone call
                if (url.protocol == "tel") {
                    return self.call(url);
                }
                if(url.protocol == "sms" || url.protocol == "mms") {
                    return self.txt(url, params);
                }
                // TODO: handle map protocols
            }
            return false;
        },
        '_transIn' : function(modal, transition){
            if(transition === false){
                modal.dispatchEvent(new OjEvent(this.SHOW));
            }
            else{
                let anim = new OjFade(modal, OjFade.IN, 250),
                    pane = modal.pane,
                    h, y;
                modal._setIsAnimating(true);
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
            }
        },
        '_transOut' : function(modal){
            let anim = new OjFade(modal, OjFade.OUT, 250),
                pane = modal.pane,
                h, y;
            modal._setIsAnimating(true);
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
            if(self.keyboard_frame){
                self._modal_holder.height = self.keyboard_frame.height ? self.keyboard_frame.top : OjStyleElement.AUTO;
            }
        },
        '_onShow' : function(evt){
            const modal = evt.current_target.target;
            modal._setIsAnimating(false);
            // destroy tween
            evt = OJ.destroy(evt);
            // dispatch show event
            modal.dispatchEvent(new OjEvent(this.SHOW));
        },

        '_onHide' : function(evt){
            const holder = this._modal_holder,
                modal = evt.current_target.target;
            modal._setIsAnimating(false);
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
            const destruct = modal.self_destruct;
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
            var self = this,
                result;
            if(result = self._processSpecialProtocols(url)){
                return result;
            }
            var iframe = new OjIframe(url),
                modal = self.makeModal(iframe, title);
            if(isUnset(fullscreen)){
                fullscreen = self._isMobileModal(modal)
            }
            // update iframe dims
            iframe.width = [100, "%"];
            iframe.height = [100, "%"];
            // update the modal
            modal.addCss("browser");
            modal.self_destruct = OjAlert.DEEP;
            modal.pane_width = self._calcWindowWidth(width, fullscreen);
            modal.pane_height = self._calcWindowHeight(height, fullscreen);
            return self.show(modal);
        },
        'modal' : function(content, title, width, height, fullscreen, transition){
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
            self.show(modal, null, transition);
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
            var self = this,
                args = arguments,
                ln = args.length,
                target = ln > 1 ? args[1] : self.BLANK,
                params = ln > 2 ? args[2] : {},
                specs = [], key,
                vp = OJ.viewport, scrn = OJ.screen,
                result;
            if(result = self._processSpecialProtocols(url)){
                return result;
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
        'show' : function(modal, depth, transition){
            var holder = this._modal_holder;
            // store the modal
            this._modals.append(modal);
            // make sure the holder is visible
            if(!holder.is_visible){
                holder.addCss('active');
                holder.show();
            }
            // prep the modal
            modal.show();
            if(transition !== false){
                modal.alpha = 0;
            }
            // add the modal
            if(isSet(depth)){
                holder.insertChildAt(modal, depth);
            }
            else{
                holder.appendChild(modal);
            }
            this._transIn(modal, transition);
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
    "OjItemRenderer", [OjComponent],
    {
        "_props_" : {
            "data" : null,
            "group" : null
        },

        "_constructor" : function(group, data){
            var self = this;
            self._super(OjComponent, '_constructor', []);
            self.group = group;
            self.data = data;
        },
        "_destructor" : function(){
            var self = this;
            self.group = null;
            self.data = null;
            return self._super(OjComponent, "_destructor", arguments);
        },

        "_redrawData" : function(){
            return this._is_displayed;
        },

        "redraw" : function(){
            if(this._super(OjComponent, "redraw", arguments)){
                this._redrawData();
                return true;
            }
            return false;
        },

        "=data" : function(data){
            var self = this;
            if(self._data == data){
                return;
            }
            self._data = data;
            self._redrawData();
        }
    },
    {
        "_TAGS" : ["item", "item-renderer"]
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
        "_constructor" : function(elms, item_renderer, direction){
            this._super(OjCollectionComponent, "_constructor", []);
            this._set("item_renderer", item_renderer, this._default_renderer);
            this._set("direction", direction, this._default_direction);
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
        "_constructor" : function(icon){
            this._super(OjButton, "_constructor", []);
            this._set("icon", icon);
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

        '_constructor' : function(id, label){
            this._super(OjActionable, '_constructor', []);
            this._set("id", id);
            this._set("label", label);
        },
        "exportData" : function(){
            const obj = this._super(OjActionable, 'exportData', arguments);
            obj.id = this.id;
            obj.label = this.label;
            return obj;
        },
        "toString" : function(){
            return this.label;
        }
    }
);

OJ.extendClass(
    "OjCommentElement", [OjElement],
    {
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
        '_ready' : false, '_template' : '<div class="no-label no-default"><div var=wrapper><label var=lbl></label><div var=psuedoInput><span var=prefix_lbl class=prefix></span><span var=stem><input var=input type=hidden /><label var=dflt></label></span><span var=suffix_lbl class=suffix></span></div></div></div>',

        "_constructor" : function(name, label, value, validators){
            this._super(OjComponent, "_constructor", []);
            this._errors = [];
            this._validators = [];
            // detect default mode
            const input = this.input;
            if(input && !isUndefined(input.dom.placeholder)){
                this._unset("dflt");
            }
            this._set("name", name, this.oj_id);
            this._set("label", label);
            this._set("value", value);
            this._set("validators", validators, []);
            if(input){
                if(!this._value){
                    this.value = input.dom.value;
                }
                input.addEventListener(OjFocusEvent.IN, this, "_onInputFocusIn");
                input.addEventListener(OjFocusEvent.OUT, this, "_onInputFocusOut");
                input.addEventListener(OjDomEvent.CHANGE, this, "_onInputChange");
            }
            if(this.oj_class_name == "OjInput"){
                this.hide();
            }
            else{
                let ln = this._supers.length,
                    cls;
                for(; ln--;){
                    cls = this._supers[ln];
                    this.addCss(OJ.classToString(cls));
                    if(cls == OjInput){
                        break;
                    }
                }
            }
            this.addEventListener(OjUiEvent.PRESS, this, "_onPress");
            this._ready = true;
        },
        "_destructor" : function(){
            // unset placeholder for cleanup purposes
            try {
                this._placeholder.on_change = null;
            }
            catch(e){
                // do nothing
            }
            return this._super(OjComponent, "_destructor", arguments);
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
            this._onInputChange(evt);
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
            const val = this.value;
            this._errors = [];
            if(this._required && isEmpty(val)){
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
            const input = this.input,
                placeholder = this._placeholder;
            // cleanup on change
            if(isObjective(placeholder, OjTextElement)){
                placeholder.on_change = null;
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
            else if(input){
                input.attr("placeholder", String.string(val));
                // set on change so we get updates if/when it changes
                if(isObjective(val, OjTextElement)){
                    val.on_change = function(txt){
                        input.attr("placeholder", String.string(txt));
                    };
                }
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
        "=is_disabled" : function(val){
            this._super(OjComponent, "=is_disabled", arguments);
            this.input.attr("disabled", this._is_disabled ? "1" : null);
        },
        '=label' : function(lbl){
            this.lbl.text = this._label = lbl;
            if(isEmpty(lbl)){
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
            const input = this.input;
            if(input){
                this.input.attr("name", this._name);
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
        ".value" : function(){
            if(isEmpty(this._value)){
                this._onInputChange(null);
            }
            return this._value;
        },
        '=value' : function(value){
            if(value == this._value){
                return;
            }
            this._value = value;
            this._redrawValue();
            this._redrawDefault();
            if(this._ready){
                this.dispatchEvent(new OjEvent(OjEvent.CHANGE));
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

OJ.extendComponent(
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

        "_constructor" : function(name, label, value, options){
            var self = this,
                list = new OjList();
            self._options_index = [];
            self._options = [];
            self._super(OjInput, "_constructor", [name, label || null]);
            self._list = list;
            list.addEventListener(OjCollectionEvent.ITEM_PRESS, self, "_onItemClick");
            self._options_dp = list.dataProvider;
            if(isSet(options)){
                self.options = options;
            }
            if(isSet(value)){
                self.value = value;
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
            var self = this,
                input = self.input,
                slctd_i = self._selected_index;
            input.removeAllChildren();
            self._options.forEachReverse(function(item, i){
                const option = new OjStyleElement(
                    "<option value='{0}'{1}></option>".format(
                        item.id,
                        i == slctd_i ? " selected='selected'" : ""
                    )
                );
                option.text = item.label;
                input.insertChildAt(option, 0);
            });
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
                    option = isObjective(option, OjData) ? option : new OjData(String.string(option), option)
                    if(option.id == self._value){
                        self._selected = option;
                        self._selected_index = i;
                    }
                    opts.prepend(option);
                });
            }
            else if(isObject(options)){
                var i = 0;
                for(key in options){
                    option = options[key];
                    option = isObjective(option, OjData) ? option : new OjData(key, option)
                    if(option.id == self._value){
                        self._selected = option;
                        self._selected_index = i;
                    }
                    opts.append(option);
                    i++;
                }
            }
            else{
                self._selected_index = null;
                self._selected = null;
                self._value = null;
            }
            self._redrawList();
            self._redrawValue();
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
            self.input.dom.selectedIndex = self._selected_index;
        }
    },
    {
        "_TAGS" : ["select-input"]
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
    "OjEmailInput", [OjTextInput],
    {
        "_props_" : {
            "max_length" : 254,
            "min_length" : 3
        },
        "_type" : OjTextInput.EMAIL,

        "isValid" : function(){
            var self = this,
                valid = self._super(OjTextInput, "isValid", arguments),
                value = self.value;
            if(!isEmpty(value) && !self._static.isValidEmail(value)){
                self._errors.append(self._formatError(OjEmailInput.INVALID_ERROR));
                valid = false;
            }
            return valid;
        },

        "=max_length" : function(val){
            throw new Error("Cannot set the max length of an email. This is a fixed value.");
        },
        "=min_length" : function(val){
            throw new Error("Cannot set the min length of an email. This is a fixed value.");
        }
    },
    {
        "INVALID_ERROR" : "{INPUT} requires a valid email address.",
        "SUPPORTS_EMAIL_TYPE" : OjInput.supportsInputType("email"),
        "isValidEmail" : function(val){
            return /.+@.+(\..+)*/.test(val)
        },
        "_TAGS" : ["email-input"]
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
            'selection_max': 1
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

        '=selection_max' : function(val){
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
    "OjForm", [OjView], 
    {
        "_props_" : {
            "cancel_icon" : null,
            "cancel_label" : "Cancel",
            "data" : null,
            "dismiss_on_submit": true,
            "on_submit" : null,
            "reset_icon": null,
            "reset_label" : "Reset",
            "submit_icon" : null,
            "submit_label" : "Submit"
        },
        "_get_props_" : {
            "errors" : null,
            "inputs" : null,
            "is_valid" : null
        },
        "_constructor" : function(){
           this._super(OjView, "_constructor", arguments);
           (this._action_view = new OjButton(this._submit_label, this._submit_icon)).addEventListener(OjUiEvent.PRESS, this, "_onSubmitClick");
           this.addEventListener(OjKeyboardEvent.UP, this, "_onKeyPress");
        },
        "_destructor" : function(){
            this.removeEventListener(OjKeyboardEvent.UP, this, "_onKeyPress");
            return this._super(OjView, "_destructor", arguments);
        },

        "_showFormError" : function(){
            let msg = "";
            this._errors.forEachReverse(function(item){
                msg = "\n" + item.error + msg;
            });
            WindowManager.alert(
                "Please fix the following issues and re-submit:<span style='font-weight: bold;'>" + msg + "</span>\nThank you.",
                "Form Error"
            );
        },
        
        "_submit" : function(){
            const controller = this.controller;
            if(controller && this.dismiss_on_submit){
                controller.removeView(this);
            }
            this.dispatchEvent(new OjEvent(OjEvent.SUBMIT, false, false));
        },
        "_onKeyPress" : function(evt){
            if(evt.key_code == 13){
                this._onSubmitClick(evt);
            }
        },
        "_onSubmitClick" : function(evt){
            const self = this;
            OjTimer.delay(() => { self.submit(); }, 100);  // this gives the input enough time to blur
        },
        "blur" : function(){
            var self = this,
                rtrn = self._super(OjView, "blur", arguments),
                inputs = self.inputs,
                key;
            for(key in inputs){
                inputs[key].blur();
            }
            return rtrn;
        },
        "focus" : function(){
            var self = this,
                rtrn = self._super(OjView, "focus", arguments),
                inputs = self.inputs,
                key = Object.keys(inputs).first;
            if(key){
                inputs[key].focus();
            }
            return rtrn;
        },
        "reset" : function(){
            var inputs = this.inputs,
                nm;
            for(nm in inputs){
                inputs[nm].value = null;
            }
        },
        "submit" : function(){
            const on_submit = this.on_submit;
            if(on_submit && on_submit(this) === false){
                return;
            }
            if(this.validate()){
                this._submit()
            }
        },
        "validate" : function(){
            let is_valid = this.is_valid;
            if(is_valid){
               return true;
            }
            this._showFormError();
            return false;
        },
        ".data" : function(){
            var data = this.inputs,
                nm;
            for(nm in data){
                data[nm] = data[nm].value;
            }
            return data;
        },
        "=data" : function(data){
            var inputs = this.inputs,
                key, input;
            for(key in data){
                if(input = inputs[key]){
                    input.value = data[key];
                }
            }
        },
        ".errors" : function(){
            var errors = this._errors;
            return errors ? errors.clone() : [];
        },
        ".inputs" : function(){
            var inputs = this.dom.getElementsByClassName("OjInput"),
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
        ".is_valid" : function(){
            var self = this,
                inputs = self.inputs,
                errors = self._errors = [],
                nm, input;
            for(nm in inputs){
                input = inputs[nm];
                if(!input.validate()){
                    errors.append({
                        "input" : input,
                        "error" : input.error
                    });
                }
            }
            return !errors.length;
        },
        "=submit_label" : function(val){
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
        "_TAGS" : ["form"]
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
    "OjOption", [OjItemRenderer],
    {
        "_props_" : {
            "data_renderer" : null,
            "is_selected"   : false
        },
//        "_selector" : null,
        "_v_align" : OjStyleElement.MIDDLE,
        "_template" : "<div><div var=indicator v-align=m><input var=input type=checkbox /></div></div>",

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

OJ.extendComponent(
    "OjSelector", [OjInput],
    {
        "_props_" : {
            "item_renderer" : OjTextRenderer,
            "options": null,
            "selected": null,
            "selection_min" : 1,
            "selection_max" : 1,
            "selection_renderer" : OjRadioOption
        },
        "_template" : "<div><div var=wrapper><label var=lbl></label><div var=psuedoInput><span var=prefix_lbl class=prefix></span><span var=stem><list var=input item_renderer=OjRadioOption></list><label var=dflt></label></span><span var=suffix_lbl class=suffix></span></div></div></div>",

        "_constructor" : function(name, label, value, options){
            const self = this;
            // default vars
            self._selected = [];
            self._value = [];
            self._values_map = {};
            self._super(OjInput, "_constructor", [name, label, value]);
            // setup the list listeners
            const input = self.input,
                evt = OjCollectionEvent;
            input.addEventListener(evt.ITEM_ADD, self, "_onItemAdd");
            input.addEventListener(evt.ITEM_PRESS, self, "_onItemPress");
            input.addEventListener(evt.ITEM_MOVE, self, "_onItemMove");
            input.addEventListener(evt.ITEM_REMOVE, self, "_onItemRemove");
            input.addEventListener(evt.ITEM_REPLACE, self, "_onItemReplace");
            input.removeEventListener(OjDomEvent.CHANGE, self, "_onChange");
            // set options if available
            if(options){
                self.options = options;
            }
        },

        "_processDomSourceChild" : function(dom_elm, component){
            if(OjElement.isTextNode(dom_elm)){
                return;
            }
            const txt = dom_elm.innerHTML;
            if(txt){
                this.input.addItem(OjObject.importData(txt.parseJson()));
            }
        },
        "_selectOption" : function(option, data){
            const self = this,
                evt = OjEvent,
                max = self._selection_max,
                value = self._value,
                id = data.id;
            if(value.contains(id)){
                return;
            }
            if(max && max == value.length){
                return option.is_selected = false;
            }
            option.is_selected = true;
            value.append(id);
            if(!self._silent){
                self.dispatchEvent(new evt(evt.CHANGE));
            }
        },
        "_unselectOption" : function(option, data){
            const self = this,
                evt = OjEvent,
                min = self._selection_min,
                value = self._value,
                id = data.id,
                index = value.indexOf(id);
            // if not present nothing more to do
            if(index == -1) {
                return;
            }
            if(min && value.length == min){
                return option.is_selected = true;
            }
            option.is_selected = false;
            value.removeAt(index);
            if(!self._silent){
                self.dispatchEvent(new evt(evt.CHANGE));
            }
        },
        "_onInputChange" : function(evt){
            // pass since options will take care of the update
        },
        "_onItemAdd" : function(evt){
            // todo: implement onItemAdd in OjSelector
        },
        "_onItemPress" : function(evt){
            const self = this,
                index = evt.index,
                input = self.input,
                option = input.renderItemAt(index),
                data = input.getElmAt(index);
            if(option.is_selected){
                self._selectOption(option, data);
            }
            else{
                self._unselectOption(option, data);
            }
        },
        "_onItemMove" : function(evt){
            // todo: implement onItemMove in OjSelector
        },
        "_onItemRemove" : function(evt){
            // todo: implement onItemRemove in OjSelector
        },
        "_onItemReplace" : function(evt){
            // todo: implement onItemReplace in OjSelector
        },

        "redraw" : function(){
            const self = this;
            if(self._super(OjInput, "redraw", arguments)){
                self.input.redraw();
                // update the selection
                // this._updateSelection();
                return true;
            }
            return false;
        },

        "=item_renderer" : function(val){
            const self = this;
            if(isString(val)){
                val = OJ.stringToClass(val);
            }
            if(self._item_renderer == val){
                return;
            }
            self._item_renderer = val;
            self.redraw();
        },

        ".options" : function(){
            return this.input.elms;
        },
        "=options" : function(val){
            const self = this,
                evt = OjEvent,
                input = self.input,
                old_value = self._value;
            // check to make sure we don"t do extra work
            if(val == self.options){
                return;
            }
            // enter silent mode
            self._silent = true;
            // reset value & map
            self._value = [];
            self._values_map = {};
            // set the new options
            input.elms = val;
            let id;
            self.options.forEach(function(item, i){
                self._values_map[id = item.id] = item;
                if(old_value.contains(id)){
                    self._selectOption(input.renderItemAt(i), item);
                }
            });
            self.redraw();
            self.dispatchEvent(new evt(evt.CHANGE));
            self._silent = false;
        },
        ".selected" : function(){
            var self = this,
                slctd = [];
            // translate the ids to the data objects
            self.value.forEach(function(val){
                if(val = self._values_map[val]){
                    slctd.append(val);
                }
            });
            return slctd;
        },
        "=selected" : function(val){
            this.value = Array.array(val).map(x => x.id);
        },
        "=selection_max" : function(val){
            var self = this;
            self._selection_max = val;
            if(val != 1 && self.selection_renderer == OjRadioOption){
                self.selection_renderer = OjCheckedOption;
            }
        },
        "=selection_min" : function(val){
            var self = this;
            self._selection_min = val;
            if(val != 1 && self.selection_renderer == OjRadioOption){
                self.selection_renderer = OjCheckedOption;
            }
        },
        ".selection_renderer" : function(){
            return this.input.item_renderer;
        },
        "=selection_renderer" : function(val){
            var self = this;
            self.input.item_renderer = val;
            if(self.selection_renderer == OjRadioOption){
                self.selection_min = 1;
                self.selection_max = 1;
            }
        },
        ".value" : function(){
            var val = this._value;
            // return a copy
            return val ? val : val.clone();
        },
        "=value" : function(val){
            const self = this,
                evt = OjEvent;
            if(self._value != val){
                // store a copy
                self._value = val = Array.array(val);
                // update options selection state
                self.options.forEachReverse(function(item, i){
                    self.input.renderItemAt(i).is_selected = val.contains(item.id);
                });
                // dispatch change event
                self.dispatchEvent(new evt(evt.CHANGE));
            }
        }
    },
    {
        "_TAGS" : ["selector"]
    }
);


OJ.extendComponent(
    "OjSwitch", [OjInput],
    {
        "_props_" : {
        },
        "_template" : "<div class=\"off no-default no-label\"><div var=wrapper><label var=lbl></label><div var=psuedoInput><div var=slider><label var=prefix_lbl></label><label var=suffix_lbl></label><div class=highlight></div><span var=stem><input var=input type=hidden /></span></div></div></div></div>",
        "_onPress" : function(evt){
            this._super(OjInput, "_onPress", arguments);
            this.value = !this._value;
        },
        "_redrawValue" : function(){
            this._super(OjInput, "_redrawValue", arguments);
            if(this._value){
                this.addCss("on");
                this.removeCss("off");
            }
            else{
                this.addCss("off");
                this.removeCss("on");
            }
        },
        "=value" : function(value){
            value = isTrue(value);
            return this._super(OjInput, "=value", [value]);
        }
    },
    {
        "_TAGS" : ["switch"]
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

        "_constructor" : function(name, label, value){
            this._super(OjComponent, "_constructor", []);
            this._set("name", name);
            this._set("label", label);
            this._set("value", value);
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
            'horz_offset' : null,
            'positioning' : null,
            'parent_menu' : null,
            'vert_offset' : 0
        },

        "_constructor" : function(content, positioning, parent_menu){
            this._super(OjComponent, "_constructor", []);
            this._set("content", content);
            this._set("positioning", positioning, [
                OjMenu.RIGHT_MIDDLE, OjMenu.RIGHT_TOP, OjMenu.RIGHT_BOTTOM,
                OjMenu.LEFT_MIDDLE, OjMenu.LEFT_TOP, OjMenu.LEFT_BOTTOM,
                OjMenu.BOTTOM_LEFT, OjMenu.BOTTOM_CENTER, OjMenu.BOTTOM_RIGHT,
                OjMenu.TOP_LEFT, OjMenu.TOP_CENTER, OjMenu.TOP_RIGHT
            ]);
            this._set("parent_menu", parent_menu);
        },
        '_destructor' : function(){
            this._content = null;
            return this._super(OjComponent, '_destructor', arguments);
        },

        'hasSubMenu' : function(menu){
            while(menu){
                if((menu = menu.parent_menu) == this){
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
                    target.pageX - menu.horz_offset,
                    target.pageY - menu.height - menu.vert_offset,
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
    "OjTabNavController", [OjNavController],
    {
        "_props_" : {
	        "on_tab_press" : null
        },
        "_constructor" : function(){
            this._super(OjNavController, "_constructor", arguments);
            this.attr("flex-h", "");
        },
        "_activeButton" : function(){
            return this.getChildAt(this.active_index);
        },
        "_addViewButton" : function(view, index){
            var btn = new OjButton(view.short_title, view.icon),
                nav_css = view.nav_css;
            btn.attr("flex-h", null);
            btn.attr("flex-v", "");
            if(nav_css){
                btn.addCss(nav_css);
            }
            btn.addEventListener(OjUiEvent.PRESS, this, "_onTabPress");
            view.addEventListener(OjView.ICON_CHANGE, this, "_onViewIconChange");
            view.addEventListener(OjView.TITLE_CHANGE, this, "_onViewTitleChange");
            this.insertChildAt(btn, index);
        },
        "_processDomSourceChildren" : function(dom, context){
            return;
        },
        "_removeViewButton" : function(view, index){
            var self = this,
                views = isArray(view) ? view : [view];
            OJ.destroy(self.removeChildAt(index));
            views.forEachReverse(function(view){
                view.removeEventListener(OjView.ICON_CHANGE, self, "_onViewIconChange");
                view.removeEventListener(OjView.TITLE_CHANGE, self, "_onViewTitleChange");
            });
        },
        "_updateActiveBtn" : function(){
            var self = this,
                stack = self._stack,
                prev_active = self._prev_active;
            if(prev_active){
                prev_active.is_active = false;
            }
            if(stack && (prev_active = self._activeButton())){
                prev_active.is_active = true;
            }
            self._prev_active = prev_active;
        },
        // event listener callbacks
        "_onStackChange" : function(evt){
            this._updateActiveBtn();
        },
        "_onStackViewAdd" : function(evt){
            this._addViewButton(evt.view, evt.index);
        },
        "_onStackViewMove" : function(evt){
            // TODO: add tab button move
        },
        "_onStackViewRemove" : function(evt){
            this._removeViewButton(evt.view, evt.index);
        },
        "_onStackViewReplace" : function(evt){
            const self = this,
                btn = self._activeButton(),
                view = evt.view,
                active = self._stack.active_view,
                old_css = active ? active.nav_css : null,
                new_css = view.nav_css;
            btn.label = OJ.copy(view.short_title);
            btn.icon = OJ.copy(view.icon);
            if(old_css){
                btn.removeCss(old_css);
            }
            if(new_css){
                btn.addCss(new_css);
            }
        },
        "_onTabPress" : function(evt){
            const stack = this._stack,
                cur_i = stack.active_index;
            let new_i = this.indexOfChild(evt.current_target);
            if(this._on_tab_press){
                this._on_tab_press(this, new_i, cur_i);
            }
            if(cur_i == new_i){
                return;
            }
            stack.active_index = new_i;
        },
        "_onViewIconChange" : function(evt){
            const view = evt.view;
            this.getChildAt(this._stack.indexOfElm(view)).icon = view.icon;
        },
        "_onViewTitleChange" : function(evt){
            const view = evt.view;
            this.getChildAt(this._stack.indexOfElm(view)).label = view.short_title;
        },

        // getter & setters
        "=stack" : function(stack){
            if(this._stack == stack){
                return;
            }
            var ln;
            if(this._stack){
                this._stack.removeEventListener(OjStackEvent.ADD, this, "_onStackViewAdd");
                this._stack.removeEventListener(OjStackEvent.MOVE, this, "_onStackViewMove");
                this._stack.removeEventListener(OjStackEvent.REMOVE, this, "_onStackViewRemove");
                this._stack.removeEventListener(OjStackEvent.REPLACE, this, "_onStackViewReplace");
                // remove all the tabs
                ln = this.num_elms;
                for(; ln--;){
                    this._removeViewButton(this._stack.getElmAt(ln), ln);
                }
            }
            this._super(OjNavController, "=stack", arguments);
            if(stack){
                stack.addEventListener(OjStackEvent.ADD, this, "_onStackViewAdd");
                stack.addEventListener(OjStackEvent.MOVE, this, "_onStackViewMove");
                stack.addEventListener(OjStackEvent.REMOVE, this, "_onStackViewRemove");
                stack.addEventListener(OjStackEvent.REPLACE, this, "_onStackViewReplace");
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
        "_TAGS" : ["tab-nav", "tab-nav-controller"]
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

OJ.extendClass(
    "OjWorker", [OjActionable],
    {
        "_props_" : {
            "on_message": null,
            "on_error": null
        },

        "_constructor" : function(path_or_func){
            var self = this;
            self._super(OjActionable, "_constructor", []);
            if(isFunction(path_or_func)){
                var blob = new Blob(
                        ["onmessage = " + path_or_func.toString()],
                        { type: "text/javascript"}
                    ),
                    url = window.URL.createObjectURL(blob);
                self._worker = new Worker(url);
                URL.revokeObjectURL(url);
            }
            else{
                self._worker = new Worker(path_or_func);
            }
        },

        "postMessage" : function(){
            var worker = this._worker;
            return worker.postMessage.apply(worker, arguments);
        },
        "terminate" : function(){
            var worker = this._worker;
            return worker.terminate.apply(worker, arguments);
        },

        ".on_error" : function(){
            return this._worker.onerror;
        },
        "=on_error" : function(func){
            return this._worker.onerror = func;
        },
        ".on_message" : function(){
            return this._worker.onmessage;
        },
        "=on_message" : function(func){
            return this._worker.onmessage = func;
        }
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
