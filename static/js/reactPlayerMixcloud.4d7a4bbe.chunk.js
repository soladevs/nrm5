(self.webpackChunknrmfifth=self.webpackChunknrmfifth||[]).push([[667],{2732:function(e,t,n){var r,o=n(2122).default,u=n(6690).default,a=n(9728).default,l=n(6115).default,i=n(1655).default,c=n(6389).default,f=n(4704).default,s=Object.create,p=Object.defineProperty,y=Object.getOwnPropertyDescriptor,d=Object.getOwnPropertyNames,m=Object.getPrototypeOf,v=Object.prototype.hasOwnProperty,h=function(e,t,n,r){if(t&&"object"===typeof t||"function"===typeof t){var o,u=f(d(t));try{var a=function(){var u=o.value;v.call(e,u)||u===n||p(e,u,{get:function(){return t[u]},enumerable:!(r=y(t,u))||r.enumerable})};for(u.s();!(o=u.n()).done;)a()}catch(l){u.e(l)}finally{u.f()}}return e},g=function(e,t,n){return function(e,t,n){t in e?p(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n}(e,"symbol"!==typeof t?t+"":t,n),n},k={};!function(e,t){for(var n in t)p(e,n,{get:t[n],enumerable:!0})}(k,{default:function(){return O}}),e.exports=(r=k,h(p({},"__esModule",{value:!0}),r));var b=function(e,t,n){return n=null!=e?s(m(e)):{},h(!t&&e&&e.__esModule?n:p(n,"default",{value:e,enumerable:!0}),e)}(n(2791)),P=n(135),w=n(365),O=function(e){"use strict";i(n,e);var t=c(n);function n(){var e;return u(this,n),e=t.apply(this,arguments),g(l(e),"callPlayer",P.callPlayer),g(l(e),"duration",null),g(l(e),"currentTime",null),g(l(e),"secondsLoaded",null),g(l(e),"mute",(function(){})),g(l(e),"unmute",(function(){})),g(l(e),"ref",(function(t){e.iframe=t})),e}return a(n,[{key:"componentDidMount",value:function(){this.props.onMount&&this.props.onMount(this)}},{key:"load",value:function(e){var t=this;(0,P.getSDK)("https://widget.mixcloud.com/media/js/widgetApi.js","Mixcloud").then((function(e){t.player=e.PlayerWidget(t.iframe),t.player.ready.then((function(){t.player.events.play.on(t.props.onPlay),t.player.events.pause.on(t.props.onPause),t.player.events.ended.on(t.props.onEnded),t.player.events.error.on(t.props.error),t.player.events.progress.on((function(e,n){t.currentTime=e,t.duration=n})),t.props.onReady()}))}),this.props.onError)}},{key:"play",value:function(){this.callPlayer("play")}},{key:"pause",value:function(){this.callPlayer("pause")}},{key:"stop",value:function(){}},{key:"seekTo",value:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];this.callPlayer("seek",e),t||this.pause()}},{key:"setVolume",value:function(e){}},{key:"getDuration",value:function(){return this.duration}},{key:"getCurrentTime",value:function(){return this.currentTime}},{key:"getSecondsLoaded",value:function(){return null}},{key:"render",value:function(){var e=this.props,t=e.url,n=e.config,r=t.match(w.MATCH_URL_MIXCLOUD)[1],u=(0,P.queryString)(o(o({},n.options),{},{feed:"/".concat(r,"/")}));return b.default.createElement("iframe",{key:r,ref:this.ref,style:{width:"100%",height:"100%"},src:"https://www.mixcloud.com/widget/iframe/?".concat(u),frameBorder:"0",allow:"autoplay"})}}]),n}(b.Component);g(O,"displayName","Mixcloud"),g(O,"canPlay",w.canPlay.mixcloud),g(O,"loopOnEnded",!0)}}]);
//# sourceMappingURL=reactPlayerMixcloud.4d7a4bbe.chunk.js.map