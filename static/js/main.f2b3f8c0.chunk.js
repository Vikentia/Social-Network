(this.webpackJsonpmyapp=this.webpackJsonpmyapp||[]).push([[0],{114:function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"a",(function(){return a}));var r=function(e){return e?void 0:"Field is required"},a=function(e){return function(t){return t.length>e?"Max length is ".concat(e," symbols"):void 0}}},116:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));n(0);var r=n.p+"static/media/preloader.ea356991.svg",a=n(2),c=function(){return Object(a.jsx)("div",{children:Object(a.jsx)("img",{src:r})})}},149:function(e,t,n){e.exports={error:"FormsControls_error__2LN0j"}},153:function(e,t,n){"use strict";n.d(t,"a",(function(){return v})),n.d(t,"d",(function(){return y})),n.d(t,"c",(function(){return S})),n.d(t,"g",(function(){return _})),n.d(t,"e",(function(){return w})),n.d(t,"f",(function(){return P}));var r=n(17),a=n.n(r),c=n(30),s=n(23),i=n(1),o=n(64),u=n(29),l=function(e){return u.a.get("profile/"+e).then((function(e){return e.data}))},d=function(e){return u.a.get("profile/status/"+e).then((function(e){return e.data}))},f=function(e){return u.a.put("profile/status",{status:e}).then((function(e){return e.data}))},j=function(e){var t=new FormData;return t.append("image",e),u.a.put("profile/photo",t,{headers:{"Content-Type":"multipart/form-data"}}).then((function(e){return e.data}))},b=function(e){return u.a.put("profile",e).then((function(e){return e.data}))},p="SN/PROFILE/ADD-POST",O="SN/PROFILE/DELETE_POST",h="SN/PROFILE/SET_USER_PROFILE",m="SN/PROFILE/SET_STATUS",g="SN/PROFILE/SAVE_PHOTO_SUCCESS",x={posts:[{id:1,message:"Hello",likesCount:12},{id:2,message:"Good day!",likesCount:34},{id:3,message:"Great weather",likesCount:52},{id:4,message:"Welcome!",likesCount:42},{id:5,message:"Hi",likesCount:18},{id:6,message:"Ooops))",likesCount:62}],profile:null,status:"",newPostText:""},v={addPostActionCreater:function(e){return{type:p,payload:{newPostText:e}}},setUserProfile:function(e){return{type:h,payload:{profile:e}}},setStatus:function(e){return{type:m,payload:{status:e}}},deletePost:function(e){return{type:O,payload:{postId:e}}},savePhotoSuccess:function(e){return{type:g,payload:{photos:e}}}},y=function(e){return function(){var t=Object(c.a)(a.a.mark((function t(n){var r;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,l(e);case 2:r=t.sent,n(v.setUserProfile(r));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},S=function(e){return function(){var t=Object(c.a)(a.a.mark((function t(n){var r;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,d(e);case 2:r=t.sent,n(v.setStatus(r));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},_=function(e){return function(){var t=Object(c.a)(a.a.mark((function t(n){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,f(e);case 3:t.sent.resultCode||n(v.setStatus(e)),t.next=9;break;case 7:t.prev=7,t.t0=t.catch(0);case 9:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}()},w=function(e){return function(){var t=Object(c.a)(a.a.mark((function t(n){var r;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,j(e);case 2:(r=t.sent).resultCode||n(v.savePhotoSuccess(r.data.photos));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},P=function(e){return function(){var t=Object(c.a)(a.a.mark((function t(n,r){var c,s;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return c=r().auth.userId,t.next=3,b(e);case 3:if((s=t.sent).resultCode){t.next=12;break}if(null===c){t.next=9;break}n(y(c)),t.next=10;break;case 9:throw new Error("UserId can't be null");case 10:t.next=14;break;case 12:return n(Object(o.a)("edit-profile",{_error:s.message[0]})),t.abrupt("return",Promise.reject(s.message[0]));case 14:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()};t.b=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:x,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case p:var n={id:7,message:t.payload.newPostText,likesCount:0};return Object(i.a)(Object(i.a)({},e),{},{posts:[].concat(Object(s.a)(e.posts),[n]),newPostText:""});case O:return Object(i.a)(Object(i.a)({},e),{},{posts:e.posts.filter((function(e){return t.payload.postId!==e.id}))});case h:return Object(i.a)(Object(i.a)({},e),{},{profile:t.payload.profile});case m:return Object(i.a)(Object(i.a)({},e),{},{status:t.payload.status});case g:return Object(i.a)(Object(i.a)({},e),{},{profile:Object(i.a)(Object(i.a)({},e.profile),{},{photos:t.payload.photos})});default:return e}}},163:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var r=n(23),a=n(1),c="SN/DIALOGS/SEND_MESSAGE",s={dialogs:[{id:1,name:"Viktor"},{id:2,name:"Sveta"},{id:3,name:"Igor"},{id:4,name:"Masha"},{id:5,name:"Petya"},{id:6,name:"Vi\u0441toria"}],messages:[{id:1,message:"Hi"},{id:2,message:"Bye"},{id:3,message:"Hello"},{id:4,message:"Mess"},{id:5,message:"Mess123"},{id:6,message:"Mess456"}]},i={sendMessageCreater:function(e){return{type:c,payload:{newMessageBody:e}}}};t.b=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s,t=arguments.length>1?arguments[1]:void 0;if(t.type===c){var n=t.payload.newMessageBody;return Object(a.a)(Object(a.a)({},e),{},{messages:[].concat(Object(r.a)(e.messages),[{id:7,message:n}])})}return e}},196:function(e,t,n){e.exports={header:"Header_header__1W_Jk"}},207:function(e,t,n){e.exports={selectedPage:"Pagination_selectedPage__1rooW"}},211:function(e,t,n){e.exports={form__summaryError:"Login_form__summaryError__1b8EM"}},29:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n(189),a=n.n(r).a.create({withCredentials:!0,baseURL:"https://social-network.samuraijs.com/api/1.0/",headers:{"API-KEY":"e82d0870-e644-47bb-8212-44d44c6489be"}})},380:function(e,t,n){"use strict";n.r(t);var r,a=n(22),c=n(191),s=n(153),i=n(163),o={},u=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:o;return e},l=n(17),d=n.n(l),f=n(30),j=n(23),b=n(1),p=n(29),O={getUsers:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;return p.a.get("users?page=".concat(e,"&count=").concat(t,"&term=").concat(n)+(null===r?"":"&friend=".concat(r))).then((function(e){return e.data}))},unfollow:function(e){return p.a.delete("follow/"+e).then((function(e){return e.data}))},follow:function(e){return p.a.post("follow/"+e).then((function(e){return e.data}))}},h=function(e,t,n,r){return e.map((function(e){return e[n]===t?Object(b.a)(Object(b.a)({},e),r):e}))},m="SN/USERS/FOLLOW",g="SN/USERS/UNFOLLOW",x="SN/USERS/SET_USERS",v="SN/USERS/SET_CURRENT_PAGE",y="SN/USERS/SET_FILTER",S="SN/USERS/SET_TOTAL_COUNT",_="SN/USERS/TOGGLE_IS_FETCHING",w="SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS",P={users:[],pageSize:10,totalUsersCount:0,currentPage:1,isFetching:!0,followingInProgress:[],filter:{term:"",friend:null}},E=function(e){return{type:m,payload:{id:e}}},C=function(e){return{type:g,payload:{id:e}}},U=function(e){return{type:x,payload:{users:e}}},I=function(e){return{type:v,payload:{currentPage:e}}},k=function(e){return{type:y,payload:e}},N=function(e){return{type:S,payload:{totalUsersCount:e}}},L=function(e){return{type:_,payload:{isFetching:e}}},T=function(e,t){return{type:w,isFetching:e,userId:t}},F=function(e,t,n){return function(){var r=Object(f.a)(d.a.mark((function r(a){var c;return d.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return a(L(!0)),a(I(e)),a(k(n)),r.next=5,O.getUsers(e,t,n.term,n.friend);case 5:c=r.sent,a(L(!1)),a(U(c.items)),a(N(c.totalCount));case 9:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}()},R=function(){var e=Object(f.a)(d.a.mark((function e(t,n,r,a){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t(T(!0,n)),e.next=3,r(n);case 3:!e.sent.resultCode&&t(a(n)),t(T(!1,n));case 6:case"end":return e.stop()}}),e)})));return function(t,n,r,a){return e.apply(this,arguments)}}(),A=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:P,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case m:return Object(b.a)(Object(b.a)({},e),{},{users:h(e.users,t.payload.id,"id",{followed:!0})});case g:return Object(b.a)(Object(b.a)({},e),{},{users:h(e.users,t.payload.id,"id",{followed:!1})});case x:return Object(b.a)(Object(b.a)({},e),{},{users:t.payload.users});case v:return Object(b.a)(Object(b.a)({},e),{},{currentPage:t.payload.currentPage});case y:return Object(b.a)(Object(b.a)({},e),{},{filter:t.payload});case S:return Object(b.a)(Object(b.a)({},e),{},{totalUsersCount:t.payload.totalUsersCount});case _:return Object(b.a)(Object(b.a)({},e),{},{isFetching:t.payload.isFetching});case w:return Object(b.a)(Object(b.a)({},e),{},{followingInProgress:t.isFetching?[].concat(Object(j.a)(e.followingInProgress),[t.userId]):e.followingInProgress.filter((function(e){return e!==t.userId}))});default:return e}},M=n(64),H=function(){return p.a.get("auth/me").then((function(e){return e.data}))},D=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;return p.a.post("auth/login",{email:e,password:t,rememberMe:n,captcha:r}).then((function(e){return e.data}))},G=function(){return p.a.delete("auth/login")};!function(e){e[e.Success=0]="Success",e[e.Error=1]="Error",e[e.CaptchaIsRequired=10]="CaptchaIsRequired"}(r||(r={}));var z=function(){return p.a.get("security/get-captcha-url").then((function(e){return e.data}))},B="SN/AUTH/SET_USER_DATA",V="SN/AUTH/GET_CAPTCHA_URL_SUCCESS",W={userId:null,email:null,login:null,isAuth:!1,captchaUrl:null},q=function(e,t,n,r){return{type:B,payload:{userId:e,email:t,login:n,isAuth:r}}},X=function(e){return{type:V,payload:{captchaUrl:e}}},J=function(){return function(){var e=Object(f.a)(d.a.mark((function e(t){var n,a,c,s,i;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,H();case 2:(n=e.sent).resultCode===r.Success&&(a=n.data,c=a.id,s=a.login,i=a.email,t(q(c,i,s,!0)));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},K=function(){return function(){var e=Object(f.a)(d.a.mark((function e(t){var n,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,z();case 2:n=e.sent,r=n.url,t(X(r));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},Y=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:W,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case B:case V:return Object(b.a)(Object(b.a)({},e),t.payload);default:return e}},Z=n(187),Q="SN/APP/INITIALIZED_SUCCESS",$={initialized:!1},ee=function(){return{type:Q}},te=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:$,t=arguments.length>1?arguments[1]:void 0;return t.type===Q?Object(b.a)(Object(b.a)({},e),{},{initialized:!0}):e},ne=Object(a.c)({profilePage:s.b,dialogsPage:i.b,sidebar:u,usersPage:A,auth:Y,form:Z.a,app:te}),re=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||a.d,ae=Object(a.e)(ne,re(Object(a.a)(c.a))),ce=n(0),se=n.n(ce),ie=n(35),oe=n.n(ie),ue=n(6),le=n(34),de=n(13),fe=n(15),je=n(196),be=n.n(je),pe=n(382),Oe=n(387),he=n(388),me=n(386),ge=n(384),xe=n(389),ve=n(2),ye=function(){var e=Object(fe.d)((function(e){return e.auth.isAuth})),t=Object(fe.d)((function(e){return e.auth.login})),n=Object(fe.c)(),a=pe.a.Header;return Object(ve.jsx)(a,{className:be.a.header,children:Object(ve.jsx)(Oe.a,{children:Object(ve.jsxs)(ve.Fragment,{children:[e&&Object(ve.jsx)(he.a,{span:22,children:Object(ve.jsxs)(ve.Fragment,{children:[Object(ve.jsx)(me.a,{style:{backgroundColor:"#1890ff"},icon:Object(ve.jsx)(xe.a,{})}),t]})}),Object(ve.jsx)(he.a,{span:2,children:e?Object(ve.jsx)(ge.a,{type:"primary",onClick:function(){n(function(){var e=Object(f.a)(d.a.mark((function e(t){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,G();case 2:e.sent.data.resultCode===r.Success&&t(q(null,null,null,!1));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},children:"Logout"}):Object(ve.jsx)(ge.a,{type:"primary",children:Object(ve.jsx)(le.b,{to:"/login",children:"Login"})})})]})})})},Se=n(116),_e=n(207),we=n.n(_e),Pe=function(e){for(var t=e.totalItemsCount,n=e.pageSize,r=e.currentPage,a=e.onPageChanged,c=e.portionSize,s=void 0===c?10:c,i=Math.ceil(t/n),o=[],u=1;u<=i;u++)o.push(u);var l=Math.ceil(i/s),d=se.a.useState(1),f=Object(ue.a)(d,2),j=f[0],b=f[1],p=(j-1)*s+1,O=j*s;return Object(ve.jsxs)("div",{children:[j>1&&Object(ve.jsx)("button",{onClick:function(){b(j-1)},children:"\xab"}),o.filter((function(e){return e>=p&&e<=O})).map((function(e){return Object(ve.jsx)("span",{className:r===e&&we.a.selectedPage||"",onClick:function(t){return a(e)},children:e},e)})),l>j&&Object(ve.jsx)("button",{onClick:function(){b(j+1)},children:"\xbb"})]})},Ee=n(86),Ce=n.n(Ee),Ue=function(e){var t=e.user,n=e.followingInProgress,r=e.unfollow,a=e.follow;return Object(ve.jsx)("div",{children:Object(ve.jsxs)("div",{className:Ce.a.userProfile,children:[Object(ve.jsx)("div",{className:Ce.a.userProfile__photo,children:Object(ve.jsx)(le.b,{to:"/profile/"+t.id,children:Object(ve.jsx)("img",{src:t.photos.small||"https://binkor.ru/images/vopros/user_hover.png",className:Ce.a.userPhoto})})}),Object(ve.jsx)("div",{className:Ce.a.userProfile__button,children:t.followed?Object(ve.jsx)("button",{disabled:n.some((function(e){return e===t.id})),onClick:function(){r(t.id)},children:"Unfollow"}):Object(ve.jsx)("button",{disabled:n.some((function(e){return e===t.id})),onClick:function(){a(t.id)},children:"Follow"})}),Object(ve.jsxs)("div",{className:Ce.a.userProfile__info,children:[Object(ve.jsx)("div",{children:t.name}),Object(ve.jsx)("div",{children:t.status})]})]},t.id)})},Ie=n(100),ke=n(215),Ne=Object(ke.a)((function(e){return e.usersPage.users}),(function(e){return e})),Le=function(e){return e.usersPage.pageSize},Te=function(e){return e.usersPage.totalUsersCount},Fe=function(e){return e.usersPage.currentPage},Re=function(e){return e.usersPage.followingInProgress},Ae=function(e){return e.usersPage.isFetching},Me=function(e){return e.usersPage.filter},He=function(e){return{}},De=function(e){var t=e.onFilterChanged,n=Object(fe.d)(Me);return Object(ve.jsx)("div",{children:Object(ve.jsx)(Ie.c,{initialValues:{term:n.term,friend:String(n.friend)},validate:He,onSubmit:function(e,n){var r=n.setSubmitting;t(e),r(!1)},enableReinitialize:!0,children:function(e){var t=e.isSubmitting;return Object(ve.jsxs)(Ie.b,{children:[Object(ve.jsx)(Ie.a,{type:"text",name:"term"}),Object(ve.jsxs)(Ie.a,{name:"friend",as:"select",children:[Object(ve.jsx)("option",{value:"null",children:"All"}),Object(ve.jsx)("option",{value:"true",children:"Only followed"}),Object(ve.jsx)("option",{value:"false",children:"Only unfollowed"})]}),Object(ve.jsx)("button",{type:"submit",disabled:t,children:"Find"})]})}})})},Ge=se.a.memo(De),ze=function(){var e=Object(le.c)(),t=Object(ue.a)(e,2),n=t[0],r=t[1],a=Object(fe.d)(Te),c=Object(fe.d)(Fe),s=Object(fe.d)(Le),i=Object(fe.d)(Re),o=Object(fe.d)(Ne),u=Object(fe.d)(Me),l=Object(fe.c)();se.a.useEffect((function(){var e=Object.fromEntries(n),t=c,r=u;e.page&&(t=+e.page),e.term&&(r=Object(b.a)(Object(b.a)({},r),{},{term:e.term})),e.friend&&(r=Object(b.a)(Object(b.a)({},r),{},{friend:"null"===e.friend?null:"true"===e.friend})),l(F(t,s,r))}),[]),se.a.useEffect((function(){var e=u.term,t=u.friend,n=(""===e?"":"&term=".concat(e))+(null===t?"":"&friend=".concat(t))+(1===c?"":"&page=".concat(c));r(n)}),[u,c]);var j=function(e){l(function(e){return function(){var t=Object(f.a)(d.a.mark((function t(n){var r,a;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=O.follow.bind(O),a=E,t.next=4,R(n,e,r,a);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}(e))},p=function(e){l(function(e){return function(){var t=Object(f.a)(d.a.mark((function t(n){var r,a;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=O.unfollow.bind(O),a=C,t.next=4,R(n,e,r,a);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}(e))};return Object(ve.jsxs)("div",{children:[Object(ve.jsx)("div",{children:Object(ve.jsx)(Pe,{currentPage:c,onPageChanged:function(e){l(I(e)),l(F(e,s,u))},totalItemsCount:a,pageSize:s})}),Object(ve.jsx)("div",{children:Object(ve.jsx)(Ge,{onFilterChanged:function(e){l(F(1,s,e))}})}),o.map((function(e){return Object(ve.jsx)(Ue,{user:e,followingInProgress:i,unfollow:p,follow:j},e.id)}))]})},Be=function(){var e=Object(fe.d)(Ae);return Object(ve.jsxs)(ve.Fragment,{children:[e&&Object(ve.jsx)(Se.a,{}),Object(ve.jsx)(ze,{})]})},Ve=n(186),We=n(48),qe=n(114),Xe=n(211),Je=n.n(Xe),Ke=Object(Ve.a)({form:"login"})((function(e){var t=e.handleSubmit,n=e.error,r=e.captchaUrl;return Object(ve.jsxs)("form",{onSubmit:t,children:[Object(We.c)("Email","email",[qe.b],We.a),Object(We.c)("Password","password",[qe.b],We.a,{type:"password"}),Object(We.c)(void 0,"rememberMe",[],We.a,{type:"checkbox"},"remember me"),r&&Object(ve.jsx)("img",{src:r}),r&&Object(We.c)("Symbols from image","captcha",[qe.b],We.a,{}),n&&Object(ve.jsxs)("div",{className:Je.a.form__summaryError,children:[" ",n," "]}),Object(ve.jsxs)("div",{children:[" ",Object(ve.jsx)("button",{children:"Login "})]})]})})),Ye=function(){var e=Object(fe.d)((function(e){return e.auth.captchaUrl})),t=Object(fe.d)((function(e){return e.auth.isAuth})),n=Object(fe.c)();return t?Object(ve.jsx)(de.a,{to:"/profile"}):Object(ve.jsxs)("div",{children:[Object(ve.jsx)("h1",{children:"Login "}),Object(ve.jsx)(Ke,{onSubmit:function(e){var t,a,c,s;n((t=e.email,a=e.password,c=e.rememberMe,s=e.captcha,function(){var e=Object(f.a)(d.a.mark((function e(n){var i,o,u;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,D(t,a,c,s);case 2:(i=e.sent).resultCode===r.Success?n(J()):(i.resultCode===r.CaptchaIsRequired&&n(K()),o=i.message.length>0?i.message[0]:"Some error",u=Object(M.a)("login",{_error:o}),n(u));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()))},captchaUrl:e})]})},Ze=n(99),Qe=n.n(Ze),$e=(n(185),n(390)),et=n(385),tt=Object(ce.lazy)((function(){return n.e(3).then(n.bind(null,397))})),nt=Object(ce.lazy)((function(){return n.e(4).then(n.bind(null,398))})),rt=function(){var e=Object(ce.useState)(!1),t=Object(ue.a)(e,2),n=t[0],r=t[1],a=pe.a.Content,c=pe.a.Footer,s=pe.a.Sider,i=et.a.SubMenu,o=Object(fe.c)(),u=Object(fe.d)((function(e){return e.app.initialized})),l=function(){o((function(e){var t=e(J());Promise.all([t]).then((function(){e(ee())}))}))},d=function(e){};return se.a.useEffect((function(){return window.addEventListener("unhandledrejection",d),function(){window.removeEventListener("unhandledrejection",d)}}),[]),se.a.useEffect((function(){u||l()}),[u]),u?Object(ve.jsxs)(pe.a,{style:{minHeight:"100vh"},children:[Object(ve.jsxs)(s,{collapsible:!0,collapsed:n,onCollapse:function(e){return r(e)},children:[Object(ve.jsx)("div",{className:Qe.a.logo}),Object(ve.jsxs)(et.a,{theme:"dark",mode:"inline",children:[Object(ve.jsxs)(i,{icon:Object(ve.jsx)(xe.a,{}),title:"My Profile",children:[Object(ve.jsx)(et.a.Item,{children:Object(ve.jsx)(le.b,{to:"/profile",children:"Profile"})},"1"),Object(ve.jsx)(et.a.Item,{children:Object(ve.jsx)(le.b,{to:"/dialogs",children:"Messages"})},"2")]},"sub1"),Object(ve.jsx)(i,{icon:Object(ve.jsx)($e.a,{}),title:"Users",children:Object(ve.jsx)(et.a.Item,{children:Object(ve.jsx)(le.b,{to:"/users",children:"Users"})},"3")},"sub2")]})]}),Object(ve.jsxs)(pe.a,{className:Qe.a.siteLayout,children:[Object(ve.jsx)(ye,{}),Object(ve.jsx)(a,{style:{margin:"0 16px"},children:Object(ve.jsx)("div",{className:Qe.a.siteLayoutBackground,style:{padding:24,minHeight:360},children:Object(ve.jsx)("div",{className:Qe.a.content,children:Object(ve.jsx)(ce.Suspense,{fallback:Object(ve.jsx)("div",{children:"Loading..."}),children:Object(ve.jsxs)(de.d,{children:[Object(ve.jsx)(de.b,{path:"/",element:Object(ve.jsx)(de.a,{to:"/profile"})}),Object(ve.jsx)(de.b,{path:"/dialogs",element:Object(ve.jsx)(nt,{})}),Object(ve.jsx)(de.b,{path:"/profile",element:Object(ve.jsx)(tt,{}),children:Object(ve.jsx)(de.b,{path:":userId",element:Object(ve.jsx)(tt,{})})}),Object(ve.jsx)(de.b,{path:"/users",element:Object(ve.jsx)(Be,{})}),Object(ve.jsx)(de.b,{path:"/login",element:Object(ve.jsx)(Ye,{})}),Object(ve.jsx)(de.b,{path:"/*",element:Object(ve.jsx)("div",{children:" 404 NOT FOUND "})})]})})})})}),Object(ve.jsx)(c,{style:{textAlign:"center"},children:"Ant Design \xa92022 Created by Victoria Kovaliova"})]})]}):Object(ve.jsx)(Se.a,{})};oe.a.render(Object(ve.jsx)(le.a,{children:Object(ve.jsx)(fe.a,{store:ae,children:Object(ve.jsx)(rt,{})})}),document.getElementById("root"))},48:function(e,t,n){"use strict";n.d(t,"b",(function(){return j})),n.d(t,"a",(function(){return b})),n.d(t,"c",(function(){return p}));var r=n(1),a=n(12),c=(n(0),n(149)),s=n.n(c),i=n(150),o=n(2),u=["meta","children"],l=["input","meta"],d=["input","meta"],f=function(e){var t=e.meta,n=e.children,r=(Object(a.a)(e,u),t.touched&&t.error);return Object(o.jsxs)("div",{className:s.a.formControl+" "+(r?s.a.error:""),children:[Object(o.jsx)("div",{children:n}),r&&Object(o.jsx)("span",{children:t.error})]})},j=function(e){var t=e.input,n=e.meta,c=Object(a.a)(e,l);return Object(o.jsx)(f,Object(r.a)(Object(r.a)({},t),{},{meta:n,children:Object(o.jsx)("textarea",Object(r.a)(Object(r.a)({},t),c))}))},b=function(e){var t=e.input,n=e.meta,c=Object(a.a)(e,d);return Object(o.jsx)(f,Object(r.a)(Object(r.a)({},t),{},{meta:n,children:Object(o.jsx)("input",Object(r.a)(Object(r.a)({},t),c))}))};function p(e,t,n,a){var c=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},s=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"";return Object(o.jsxs)("div",{children:[Object(o.jsx)(i.a,Object(r.a)({placeholder:e,name:t,validate:n,component:a},c))," ",s]})}},86:function(e,t,n){e.exports={userPhoto:"Users_userPhoto__2dm5t",userProfile:"Users_userProfile__1S7Vo",userProfile__photo:"Users_userProfile__photo__1mEXt",userProfile__button:"Users_userProfile__button__2CHXZ",userProfile__info:"Users_userProfile__info__23TpK"}},99:function(e,t,n){e.exports={logo:"App_logo__2Y3Fp",siteLayout:"App_siteLayout__20lPD",siteLayoutBackground:"App_siteLayoutBackground__myvat"}}},[[380,1,2]]]);
//# sourceMappingURL=main.f2b3f8c0.chunk.js.map