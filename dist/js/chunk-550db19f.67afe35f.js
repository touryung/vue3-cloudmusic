(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-550db19f"],{1133:function(t,e,n){},"15bc":function(t,e,n){"use strict";n("1133")},"466d":function(t,e,n){"use strict";var a=n("d784"),c=n("825a"),i=n("50c4"),o=n("1d80"),s=n("8aa5"),l=n("14c3");a("match",(function(t,e,n){return[function(e){var n=o(this),a=void 0==e?void 0:e[t];return void 0!==a?a.call(e,n):new RegExp(e)[t](String(n))},function(t){var a=n(e,this,t);if(a.done)return a.value;var o=c(this),r=String(t);if(!o.global)return l(o,r);var u=o.unicode;o.lastIndex=0;var b,d=[],j=0;while(null!==(b=l(o,r))){var f=String(b[0]);d[j]=f,""===f&&(o.lastIndex=s(r,i(o.lastIndex),u)),j++}return 0===j?null:d}]}))},"4bbf":function(t,e,n){},7030:function(t,e,n){"use strict";n.r(e);n("b0c0"),n("a4d3"),n("e01a");var a=n("7a23"),c=Object(a["M"])("data-v-8a338956");Object(a["v"])("data-v-8a338956");var i={class:"playlist-detail"},o={class:"detail-top"},s={class:"top-content"},l={class:"content-title"},r=Object(a["i"])("span",null,"歌单",-1),u={class:"content-provider"},b={class:"provider-name"},d={class:"content-options"},j=Object(a["i"])("div",{class:"option-item highlight"},[Object(a["i"])("i",{class:"iconfont icon-lyric-play"}),Object(a["i"])("span",null,"播放全部"),Object(a["i"])("i",{class:"iconfont icon-plus"})],-1),f={class:"option-item"},O=Object(a["i"])("i",{class:"iconfont icon-player-collect"},null,-1),m={class:"option-item"},p=Object(a["i"])("i",{class:"iconfont icon-share"},null,-1),v=Object(a["i"])("div",{class:"option-item"},[Object(a["i"])("i",{class:"iconfont icon-player-download"}),Object(a["i"])("span",null,"下载全部")],-1),g={key:0,class:"content-tags"},h=Object(a["i"])("span",{class:"label"},"标签 : ",-1),y={class:"tag"},C={class:"content-count"},w=Object(a["i"])("span",{class:"label"},"歌曲 : ",-1),I=Object(a["i"])("span",{class:"label"},"播放 : ",-1),k={class:"content-desc"},x=Object(a["i"])("span",{class:"label"},"简介 : ",-1),E={key:0},P={class:"detail-bottom"},M={class:"bottom-comment"};Object(a["t"])();var S=c((function(t,e,n,S,D,R){var T=Object(a["B"])("SongList"),U=Object(a["B"])("TabPane"),B=Object(a["B"])("CommentBox"),L=Object(a["B"])("Comments"),_=Object(a["B"])("Pagin"),q=Object(a["B"])("Tabs"),N=Object(a["C"])("loading");return Object(a["L"])((Object(a["s"])(),Object(a["e"])("div",i,[Object(a["i"])("div",o,[Object(a["i"])("img",{src:t.detailInfo.coverImgUrl,alt:""},null,8,["src"]),Object(a["i"])("div",s,[Object(a["i"])("h1",l,[r,Object(a["h"])(Object(a["E"])(t.detailInfo.name),1)]),Object(a["i"])("div",u,[Object(a["i"])("img",{src:t.detailInfo.avatarUrl,alt:""},null,8,["src"]),Object(a["i"])("span",b,Object(a["E"])(t.detailInfo.nickname),1),Object(a["i"])("span",null,Object(a["E"])(t.detailInfo.createTime)+"创建",1)]),Object(a["i"])("div",d,[j,Object(a["i"])("div",f,[O,Object(a["i"])("span",null,"收藏("+Object(a["E"])(t.detailInfo.subscribedCount)+")",1)]),Object(a["i"])("div",m,[p,Object(a["i"])("span",null,"分享("+Object(a["E"])(t.detailInfo.shareCount)+")",1)]),v]),t.detailInfo.tags?(Object(a["s"])(),Object(a["e"])("div",g,[h,Object(a["i"])("span",y,Object(a["E"])(t.detailInfo.tags),1)])):Object(a["f"])("",!0),Object(a["i"])("div",C,[w,Object(a["h"])(Object(a["E"])(t.detailInfo.trackCount)+"   ",1),I,Object(a["h"])(Object(a["E"])(t.detailInfo.playCount),1)]),Object(a["i"])("div",k,[x,Object(a["h"])(Object(a["E"])(t.detailInfo.subDescription)+" ",1),t.showDescMore?(Object(a["s"])(),Object(a["e"])("p",{key:1,innerHTML:t.detailInfo.description},null,8,["innerHTML"])):(Object(a["s"])(),Object(a["e"])("span",E,"...")),Object(a["i"])("i",{class:"iconfont icon-".concat(t.showDescMore?"up":"down-2"),onClick:e[1]||(e[1]=function(e){return t.showDescMore=!t.showDescMore})},null,2)])])]),Object(a["i"])("div",P,[Object(a["i"])(q,{modelValue:t.activeName,"onUpdate:modelValue":e[2]||(e[2]=function(e){return t.activeName=e})},{default:c((function(){return[Object(a["i"])(U,{label:"歌曲列表",name:"songList"},{default:c((function(){return[Object(a["i"])(T,{songs:t.detailInfo.songs},null,8,["songs"])]})),_:1}),Object(a["i"])(U,{label:"评论(".concat(t.detailInfo.commentCount||0,")"),name:"songComment"},{default:c((function(){return[Object(a["i"])("div",M,[Object(a["i"])(B),Object(a["i"])(L,{hotComments:t.hotComments,comments:t.comments,total:t.total},null,8,["hotComments","comments","total"]),Object(a["i"])(_,{totalPageCount:t.pageCount,pagerCount:9,currentPage:t.currentPage,onPageChange:t.handlePageChange},null,8,["totalPageCount","currentPage","onPageChange"])])]})),_:1},8,["label"])]})),_:1},8,["modelValue"])])],512)),[[N,t.isLoading]])})),D=n("5530"),R=n("1da1"),T=(n("96cf"),n("a9e3"),n("f2bc")),U=n("6c02"),B=n("bfb3"),L=n("ff9b"),_=Object(a["j"])({components:{SongList:B["a"],CommentBox:L["a"]},setup:function(t,e){var n=e.emit,c=Object(U["d"])(),i=Number(c.params.id),o=Object(a["x"])(!1),s=Object(a["x"])(!1),l=Object(a["x"])(sessionStorage.getItem("playlistTab")||"songList"),r=Object(a["x"])({}),u=Object(a["w"])({hotComments:[],comments:[],total:0,pageCount:0,currentPage:1}),b=function(){var t=Object(R["a"])(regeneratorRuntime.mark((function t(){var e,n,a,c,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(T["d"])(i,u.currentPage);case 2:e=t.sent,n=e.hotComments,a=e.comments,c=e.total,o=e.pageCount,u.hotComments=n,u.comments=a,u.total=c,u.pageCount=o;case 11:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),d=function(){var t=Object(R["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return o.value=!0,t.next=3,Object(T["f"])(i);case 3:return r.value=t.sent,t.next=6,b();case 6:o.value=!1;case 7:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();Object(a["q"])((function(){return d()}));var j=function(t){n("pagin-change"),u.currentPage=t,b()};return Object(D["a"])(Object(D["a"])({isLoading:o,detailInfo:r,showDescMore:s,activeName:l},Object(a["F"])(u)),{},{handlePageChange:j})}});n("8d43");_.render=S,_.__scopeId="data-v-8a338956";e["default"]=_},"8d43":function(t,e,n){"use strict";n("4bbf")},9729:function(t,e,n){},b088:function(t,e,n){"use strict";n("9729")},bfb3:function(t,e,n){"use strict";n("4d90"),n("d3b7"),n("25f0"),n("b0c0"),n("99af");var a=n("7a23"),c=Object(a["M"])("data-v-69b612f7");Object(a["v"])("data-v-69b612f7");var i={key:0,class:"list-item list-header"},o=Object(a["g"])('<span class="item-index" data-v-69b612f7></span><div class="item-options" data-v-69b612f7></div><div class="item-title" data-v-69b612f7>音乐标题</div><span class="item-singer" data-v-69b612f7>歌手</span><span class="item-album" data-v-69b612f7>专辑</span><span class="item-duration" data-v-69b612f7>时长</span>',6),s={class:"item-index"},l=Object(a["i"])("div",{class:"item-options"},[Object(a["i"])("i",{class:"iconfont icon-song-like"}),Object(a["i"])("i",{class:"iconfont icon-song-download"})],-1),r={class:"item-title"},u={class:"title-name"},b={key:0,class:"title-alias"},d={key:0,class:"iconfont icon-sq"},j={key:0,class:"item-singer"},f={key:1,class:"item-album"},O={class:"item-duration"};Object(a["t"])();var m=c((function(t,e,n,c,m,p){return Object(a["s"])(),Object(a["e"])(a["a"],null,[t.showTitle?(Object(a["s"])(),Object(a["e"])("div",i,[o])):Object(a["f"])("",!0),Object(a["i"])("ul",null,[(Object(a["s"])(!0),Object(a["e"])(a["a"],null,Object(a["z"])(t.songs,(function(e,n){return Object(a["s"])(),Object(a["e"])("li",{class:"list-item",key:e.id,onDblclick:function(e){return t.handlePlaySong(n)}},[Object(a["i"])("span",s,Object(a["E"])((n+1).toString().padStart(2,"0")),1),l,Object(a["i"])("div",r,[Object(a["i"])("div",u,[Object(a["i"])("span",null,Object(a["E"])(e.name),1),e.alias?(Object(a["s"])(),Object(a["e"])("span",b,"("+Object(a["E"])(e.alias)+")",1)):Object(a["f"])("",!0)]),e.sq?(Object(a["s"])(),Object(a["e"])("i",d)):Object(a["f"])("",!0),e.mvId?(Object(a["s"])(),Object(a["e"])("i",{key:1,class:"iconfont icon-mv",onClick:function(n){return t.handleShowMvDetail(e.mvId)}},null,8,["onClick"])):Object(a["f"])("",!0)]),t.showTitle?(Object(a["s"])(),Object(a["e"])("span",j,[(Object(a["s"])(!0),Object(a["e"])(a["a"],null,Object(a["z"])(e.artists,(function(t,n){return Object(a["s"])(),Object(a["e"])("span",{key:t.id},Object(a["E"])("".concat(t.name).concat(n===e.artists.length-1?"":" / ")),1)})),128))])):Object(a["f"])("",!0),t.showTitle?(Object(a["s"])(),Object(a["e"])("span",f,Object(a["E"])(e.album.name),1)):Object(a["f"])("",!0),Object(a["i"])("span",O,Object(a["E"])(e.durationStr),1)],40,["onDblclick"])})),128))])],64)})),p=n("984b"),v=n("6c02"),g=Object(a["j"])({props:{songs:{type:Array,default:function(){return[]}},showTitle:{type:Boolean,default:!0}},setup:function(t){var e=function(e){p["a"].changeCurrentSongQueue(t.songs),p["a"].changeCurrentIndex(e)},n=Object(v["e"])(),a=function(t){p["a"].changePlayStatus(!1),n.push("/mv/".concat(t))};return{handlePlaySong:e,handleShowMvDetail:a}}});n("15bc");g.render=m,g.__scopeId="data-v-69b612f7";e["a"]=g},f2bc:function(t,e,n){"use strict";n.d(e,"c",(function(){return d})),n.d(e,"a",(function(){return j})),n.d(e,"b",(function(){return f})),n.d(e,"e",(function(){return O})),n.d(e,"f",(function(){return m})),n.d(e,"d",(function(){return p})),n.d(e,"g",(function(){return v}));var a=n("7ffc"),c=n("b299"),i=n("dbe5"),o=n("1da1"),s=(n("96cf"),n("d81d"),n("b0c0"),n("a4d3"),n("e01a"),n("a15b"),n("ac1f"),n("1276"),n("fb6a"),n("73ec")),l=function(t){return t.data},r=function(t){var e=t.data,n=e.playlists,c=e.total,i=n.map((function(t){return{id:t.id,name:t.name,picUrl:t.coverImgUrl,playCount:Object(s["e"])(t.playCount),nickName:t.creator.nickname,copywriter:t.copywriter||"",tag:t.tag||""}}));return{playlists:i,pageCount:c%a["i"]?Math.floor(c/a["i"])+1:c/a["i"]}},u=function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(e){var n,a,c,i,o,l,r,u,b,d,j,f,O,m,p,g,h,y,C,w,I;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.data.playlist,a=n.id,c=n.name,i=n.creator,o=n.trackIds,l=n.coverImgUrl,r=n.createTime,u=n.trackCount,b=n.playCount,d=n.subscribedCount,j=n.shareCount,f=n.commentCount,O=n.tags,m=n.description,p=i.userId,g=i.nickname,h=i.avatarUrl,y=o.map((function(t){return t.id})).join(","),t.next=5,v(y);case 5:return C=t.sent,w=C.data,I=w.songs.map((function(t){return{id:t.id,name:t.name,picUrl:t.al.picUrl,alias:t.alia.length?t.alia.join("/"):"",artists:t.ar.map((function(t){return{id:t.id,name:t.name}})),album:{id:t.al.id,name:t.al.name},sq:0===t.st,duration:t.dt,durationStr:Object(s["c"])(t.dt),mvId:t.mv}})),t.abrupt("return",{id:a,name:c,coverImgUrl:l,userId:p,nickname:g,avatarUrl:h,tags:O.join(" / "),songs:I,trackCount:u,commentCount:f,playCount:Object(s["e"])(b),subscribedCount:Object(s["e"])(d),shareCount:Object(s["e"])(j),createTime:Object(s["b"])(r,"YYYY-MM-dd"),subDescription:(null===m||void 0===m?void 0:m.split("\n")[0])||"",description:(null===m||void 0===m?void 0:m.split("\n").slice(1).join("<br/>"))||""});case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),b={hotCategory:"/playlist/hot",allCategory:"/playlist/catlist",highQuality:"/top/playlist/highquality",playlist:"/top/playlist",detail:"/playlist/detail",comment:"/comment/playlist",songDetail:"/song/detail"},d=function(){return Object(i["a"])(b.hotCategory).then(l)},j=function(){return Object(i["a"])(b.allCategory).then(l)},f=function(t){return Object(i["a"])(b.highQuality,{cat:t}).then(r)},O=function(t,e){return Object(i["a"])(b.playlist,{cat:t,limit:a["i"],offset:(e-1)*a["b"]}).then(r)},m=function(t){return Object(i["a"])(b.detail,{id:t}).then(u)},p=function(t,e){return Object(i["a"])(b.comment,{id:t,limit:a["b"],offset:(e-1)*a["b"]}).then(c["a"])},v=function(t){return Object(i["a"])(b.songDetail,{ids:t})}},ff9b:function(t,e,n){"use strict";var a=n("7a23"),c=Object(a["M"])("data-v-2fead7f8");Object(a["v"])("data-v-2fead7f8");var i={class:"comment-box"},o={class:"input-rest"},s=Object(a["g"])('<div class="box-options" data-v-2fead7f8><div class="options-left" data-v-2fead7f8><i class="iconfont icon-emotional" data-v-2fead7f8></i><i class="iconfont icon-at" data-v-2fead7f8></i><i class="iconfont icon-well" data-v-2fead7f8></i></div><div class="options-right" data-v-2fead7f8>评论</div></div>',1);Object(a["t"])();var l=c((function(t,e,n,c,l,r){return Object(a["s"])(),Object(a["e"])("div",i,[Object(a["i"])("textarea",{class:"box-input",rows:"4",maxlength:"140",onKeyup:e[1]||(e[1]=function(){return t.handleCalcRestWord&&t.handleCalcRestWord.apply(t,arguments)}),ref:"commentInput"},null,544),Object(a["i"])("span",o,Object(a["E"])(t.inputRestWord),1),s])})),r=(n("ac1f"),n("466d"),n("73ec")),u=Object(a["j"])({setup:function(){var t=Object(a["x"])(140),e=Object(a["x"])(null),n=function(){var n,a=e.value.value,c=(null===(n=a.match(/[a-zA-Z]/g))||void 0===n?void 0:n.length)||0,i=a.length-c;t.value=Math.floor(140-c/2-i)},c=Object(r["a"])(n,300);return{inputRestWord:t,commentInput:e,handleCalcRestWord:c}}});n("b088");u.render=l,u.__scopeId="data-v-2fead7f8";e["a"]=u}}]);
//# sourceMappingURL=chunk-550db19f.67afe35f.js.map