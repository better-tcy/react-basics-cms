(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{106:function(e,t,n){e.exports={content:"login_content__1G2BD",card:"login_card__25XBM"}},109:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var a="GET_COMMON_DATA_ONE"},152:function(e,t,n){},227:function(e,t,n){},228:function(e,t,n){"use strict";n.r(t),t.default=n.p+"static/media/login_bg.494b9bd1.jpeg"},229:function(e,t,n){},230:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(25),o=n.n(r),s=n(44),i=n(104),u=n(124),l=n(123),m=n(41),j="SET_CURRENT_ONE_MENU_PATH",h="SET_CURRENT_TWO_MENU_PATH",d="RESET_FRAMEWORK_STATE",b="SET_MENU_DATA",O=Object(m.Map)({currentOneMenuPathR:"",currentTwoMenuPathR:"",menuDataR:[]});var p=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:O,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case d:return t.state;case j:return e.set("currentOneMenuPathR",t.currentOneMenuPath);case h:return e.set("currentTwoMenuPathR",t.currentTwoMenuPath);case b:return e.set("menuDataR",t.menuData);default:return e}},g=n(109),f=Object(m.Map)({commonDataOneR:""});var x=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f,t=arguments.length>1?arguments[1]:void 0;return t.type===g.a?e.set("commonDataOneR",t.commonDataOne):e},_=Object(l.combineReducers)({frameWork:p,business:x}),k=Object(i.a)(u.a),w=Object(i.b)(_,k),y=n(66),M=n(90),P=(n(129),n(81)),v=n(6),T=n(20),C=(n(99),n(61)),R=n(4),S=(n(147),n(73)),N=(n(150),n(65)),E=function(e){return{type:j,currentOneMenuPath:e}},W=function(e){return{type:h,currentTwoMenuPath:e}},D=function(e){return{type:b,menuData:e}},I=n(72),B=n.n(I),A=(n(152),n(232)),U=n(233),F=n(234),J=n(235),z=n(236),H=n(8),K=N.a.Header,q=N.a.Sider,G=N.a.Content,L=S.a.SubMenu,X=Object(a.memo)((function(e){var t=e.route,n=Object(T.g)(),r=Object(s.c)(),o=Object(a.useContext)(ue),i=Object(a.useState)(!1),u=Object(R.a)(i,2),l=u[0],m=u[1],j=Object(a.useState)([]),h=Object(R.a)(j,2),d=h[0],b=h[1],O=Object(s.d)((function(e){return{currentOneMenuPath:e.get("frameWork").get("currentOneMenuPathR"),currentTwoMenuPath:e.get("frameWork").get("currentTwoMenuPathR"),menuData:e.get("frameWork").get("menuDataR")}}),s.b),p=O.currentOneMenuPath,g=O.currentTwoMenuPath,f=O.menuData,x=Object(a.useCallback)((function(){m(!l)}),[l]),_=Object(a.useCallback)((function(e,t){n.push(e),r(W(e)),r(E(t))}),[n,r]),k=Object(a.useCallback)((function(){localStorage.clear(),r(W("/content/home")),r(E("")),r(D([])),n.replace("/login")}),[r,n]);return Object(H.jsx)("div",{className:"frame_work",children:Object(H.jsxs)(N.a,{style:{height:"100vh"},children:[Object(H.jsxs)(q,{style:{background:o.asideBgColor},trigger:null,collapsible:!0,collapsed:l,children:[Object(H.jsx)("div",{className:B.a.cms_name,children:l?"":"Betteryourself"}),Object(H.jsx)(S.a,{theme:"dark",mode:"inline",style:{color:o.menuTextColor},openKeys:0===d.length?[p]:d,defaultSelectedKeys:[g||"/content/home"],defaultOpenKeys:[p],onOpenChange:function(e){b([e[e.length-1]])},children:f&&f.map((function(e){return e.children&&0!==e.children.length?Object(H.jsx)(L,{title:e.name,icon:Object(H.jsx)(U.a,{}),children:e.children.map((function(t){return Object(H.jsx)(S.a.Item,{icon:Object(H.jsx)(F.a,{}),onClick:function(){_(t.path,e.path)},children:t.name},t.path)}))},e.path):Object(H.jsx)(S.a.Item,{icon:Object(H.jsx)(A.a,{}),onClick:function(){_(e.path)},children:e.name},e.path)}))})]}),Object(H.jsxs)(N.a,{children:[Object(H.jsxs)(K,{style:{background:o.headBgColor},className:B.a.header,children:[c.a.createElement(l?J.a:z.a,{className:"trigger",style:{color:"#ffffff"},onClick:x}),Object(H.jsx)("div",{className:B.a.header_right,children:Object(H.jsx)(C.a,{onClick:function(){k()},size:"small",type:"primary",children:"\u9000\u51fa\u7a0b\u5e8f"})})]}),Object(H.jsx)(G,{className:B.a.content,style:{padding:20,background:o.mainBgColor},children:Object(H.jsx)(a.Suspense,{fallback:Object(H.jsx)("div",{children:"Loading..."}),children:Object(M.a)(t.routes)})})]})]})})})),Q=(n(231),n(74)),V=(n(225),n(107)),Y=n(237),Z=n(238),$=n(106),ee=n.n($),te=(n(227),[{name:"\u9996\u9875",path:"/content/home"},{name:"one",path:"/content/one",children:[{name:"oneOne",path:"/content/one/one"},{name:"oneTwo",path:"/content/one/two"}]},{name:"two",path:"/content/two",children:[{name:"twoOne",path:"/content/two/one"},{name:"twoTwo",path:"/content/two/two"}]}]),ne=[{path:"/login",exact:!0,component:Object(a.memo)((function(){var e=Object(T.g)(),t=Object(s.c)(),n=Object(a.useContext)(ue);return Object(H.jsx)("div",{className:"login",children:Object(H.jsx)("div",{className:ee.a.content,style:{backgroundImage:"url(".concat(n.loginBgImg.default,")")},children:Object(H.jsxs)("div",{className:ee.a.card,children:[Object(H.jsx)("h1",{children:"Hello Betteryourself"}),Object(H.jsxs)(Q.a,{style:{width:"100%"},name:"basic",labelCol:{span:5},wrapperCol:{span:18},onFinish:function(){localStorage.setItem("token","token"),t(D(te)),e.replace("/content")},onFinishFailed:function(e){console.log("Failed:",e)},autoComplete:"off",children:[Object(H.jsx)(Q.a.Item,{label:"Username",name:"username",rules:[{required:!0,message:"Please input your username!"}],children:Object(H.jsx)(V.a,{placeholder:"Please input your username!",prefix:Object(H.jsx)(Y.a,{className:"site-form-item-icon"})})}),Object(H.jsx)(Q.a.Item,{label:"Password",name:"password",rules:[{required:!0,message:"Please input your password!"}],children:Object(H.jsx)(V.a.Password,{placeholder:"Please input your password!",prefix:Object(H.jsx)(Z.a,{className:"site-form-item-icon"})})}),Object(H.jsx)(Q.a.Item,{wrapperCol:{offset:5,span:18},children:Object(H.jsx)(C.a,{type:"primary",htmlType:"submit",block:!0,children:"\u767b\u5f55"})})]})]})})})}))}],ae=[{path:"/content/home",component:Object(a.lazy)((function(){return Promise.all([n.e(3),n.e(4)]).then(n.bind(null,270))}))}],ce=[{path:"/content/one/one",component:Object(a.lazy)((function(){return n.e(5).then(n.bind(null,269))}))}],re=[{path:"/",exact:!0,render:function(){return Object(H.jsx)(T.a,{to:"/login"})}}].concat(Object(v.a)(ne),[{path:"/content",render:function(e){var t=e.route;return localStorage.getItem("token")?Object(H.jsx)(t.component,{route:t}):(P.b.warning("\u8bf7\u5148\u767b\u5f55"),Object(H.jsx)(T.a,{to:"/login"}))},component:X,routes:[{path:"/content",exact:!0,render:function(){return Object(H.jsx)(T.a,{to:"/content/home"})}}].concat(Object(v.a)(ae),Object(v.a)(ce))},{path:"**",render:function(){return Object(H.jsx)(T.a,{to:"/login"})}}]),oe=n(1);function se(){var e;sessionStorage.getItem("frameWorkState")&&(w.dispatch((e=Object(oe.a)(Object(oe.a)({},w.getState().get("frameWork")),JSON.parse(sessionStorage.getItem("frameWorkState"))),{type:d,state:Object(m.Map)(e)})),sessionStorage.clear())}var ie={loginBgImg:n(228),asideBgColor:"",headBgColor:"",mainBgColor:""},ue=Object(a.createContext)(),le=Object(a.memo)((function(){return window.addEventListener("beforeunload",(function(){var e=w.getState();sessionStorage.setItem("frameWorkState",JSON.stringify({currentOneMenuPathR:e.get("frameWork").get("currentOneMenuPathR"),currentTwoMenuPathR:e.get("frameWork").get("currentTwoMenuPathR"),menuDataR:e.get("frameWork").get("menuDataR")}))})),se(),Object(H.jsx)(ue.Provider,{value:ie,children:Object(H.jsx)(s.a,{store:w,children:Object(H.jsx)(y.a,{children:Object(M.a)(re)})})})}));n(229);o.a.render(Object(H.jsx)(le,{}),document.getElementById("root"))},72:function(e,t,n){e.exports={cms_name:"frameWork_cms_name__pMWnx",header:"frameWork_header__1UWFz",content:"frameWork_content__5mJex"}}},[[230,1,2]]]);
//# sourceMappingURL=main.b97a2b11.chunk.js.map