(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{262:function(e,t,a){e.exports=a(519)},465:function(e,t,a){},519:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(167),s=a.n(c),l=a(32),i=a(17),o=a(258),u=a(71),m=a(72),d=a(44),h={authError:null},p=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOGIN_ERROR":return Object(d.a)({},e,{authError:"Login failed"});case"LOGIN_SUCCESS":return Object(d.a)({},e,{authError:null});case"SIGNOUT_SUCCESS":return console.log("SIGnOUT_SUCCESS"),e;case"SIGNOUT_ERROR":return console.log("SIGNOUT_ERROR"),e;case"SIGNUP_SUCCESS":return console.log("SIGNUP_SUCCESS"),Object(d.a)({},e,{authError:null});case"SIGNUP_ERROR":return console.log("SIGNUP_ERROR"),Object(d.a)({},e,{authError:t.err.message});case"SAVE_PROFILE_ERROR":return Object(d.a)({},e,{authError:t.err.message});case"SAVE_PROFILE_SUCCESS":return Object(d.a)({},e,{authError:"Save completed"});default:return e}},b={},g=function(){return arguments.length>0&&void 0!==arguments[0]?arguments[0]:b},E=Object(l.c)({auth:p,exercise:g,firestore:u.firestoreReducer,firebase:m.firebaseReducer}),f=a(520),v=a(523),N=a(261),y=a(4),O=a(5),j=a(7),w=a(6),S=a(8),x=a(522),C=Object(i.b)(null,function(e){return{signOutDispatch:function(){return e(function(e,t,a){(0,a.getFirebase)().auth().signOut().then(function(){e({type:"SIGNOUT_SUCCESS"})}).catch(function(t){e({type:"SIGNOUT_ERROR",err:t})})})}}})(function(e){var t=e.profile,a=e.signOutDispatch;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"app-header-right"},r.a.createElement("div",{className:"header-btn-lg pr-0"},r.a.createElement("div",{className:"widget-content p-0"},r.a.createElement("div",{className:"widget-content-wrapper"},r.a.createElement("div",{className:"widget-content-left"},r.a.createElement("ul",{className:"header-menu nav"},r.a.createElement("li",{className:"nav-item"},r.a.createElement(x.a,{to:"/",className:"nav-link"},"Account")),r.a.createElement("li",{className:"btn-group nav-item"},r.a.createElement(x.a,{to:"/signin",onClick:a,tabIndex:"0",className:"dropdown-item"},"Esci")))),r.a.createElement("div",{className:"widget-content-left  ml-3 header-user-info"},r.a.createElement("div",{className:"widget-heading"},t.firstName," ",t.lastName)),r.a.createElement("div",{className:"widget-content-right header-user-info ml-3"}))))))}),k=function(e){function t(){var e,a;Object(y.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(j.a)(this,(e=Object(w.a)(t)).call.apply(e,[this].concat(r)))).state={},a}return Object(S.a)(t,e),Object(O.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"app-header-right"},r.a.createElement("div",{className:"header-btn-lg pr-0"},r.a.createElement("div",{className:"widget-content p-0"},r.a.createElement("div",{className:"widget-content-wrapper"},r.a.createElement("div",{className:"widget-content-left"},r.a.createElement("ul",{className:"header-menu nav"},r.a.createElement("li",{className:"nav-item"},r.a.createElement(x.a,{to:"/signup",className:"nav-link"},r.a.createElement("i",{className:"material-icons text-info"},"person_add"),"Registrati")),r.a.createElement("li",{className:"btn-group nav-item"},r.a.createElement(x.a,{to:"/signin",className:"nav-link"},r.a.createElement("i",{className:"material-icons text-primary"},"person"),"Accedi")))),r.a.createElement("div",{className:"widget-content-right header-user-info ml-3"}))))))}}]),t}(n.Component),_=function(e){function t(){var e,a;Object(y.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(j.a)(this,(e=Object(w.a)(t)).call.apply(e,[this].concat(r)))).state={},a}return Object(S.a)(t,e),Object(O.a)(t,[{key:"render",value:function(){var e=this.props,t=e.auth,a=e.profile,n=t.uid?r.a.createElement(C,{profile:a}):r.a.createElement(k,null);return r.a.createElement("div",{className:"app-header header-shadow"},r.a.createElement("div",{className:"app-header__logo"},r.a.createElement("div",{className:""},r.a.createElement("h2",null,"SWEight")),r.a.createElement("div",{className:"header__pane ml-auto"},r.a.createElement("div",null,r.a.createElement("button",{type:"button",className:"hamburger close-sidebar-btn hamburger--elastic","data-class":"closed-sidebar"},r.a.createElement("span",{className:"hamburger-box"},r.a.createElement("span",{className:"hamburger-inner"})))))),r.a.createElement("div",{className:"app-header__mobile-menu"},r.a.createElement("div",null,r.a.createElement("button",{type:"button",className:"hamburger hamburger--elastic mobile-toggle-nav"},r.a.createElement("span",{className:"hamburger-box"},r.a.createElement("span",{className:"hamburger-inner"}))))),r.a.createElement("div",{className:"app-header__menu"},r.a.createElement("span",null,r.a.createElement("button",{type:"button",className:"btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav"},r.a.createElement("span",{className:"btn-icon-wrapper"},r.a.createElement("i",{className:"material-icons"},"person_outline"))))),r.a.createElement("div",{className:"app-header__content"},n))}}]),t}(n.Component),L=Object(i.b)(function(e){return{auth:e.firebase.auth,profile:e.firebase.profile}})(_),I=function(e){function t(){var e,a;Object(y.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(j.a)(this,(e=Object(w.a)(t)).call.apply(e,[this].concat(r)))).state={},a}return Object(S.a)(t,e),Object(O.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"scrollbar-sidebar"},r.a.createElement("div",{className:"app-sidebar__inner"},r.a.createElement("ul",{className:"vertical-nav-menu"},r.a.createElement("li",{className:"app-sidebar__heading"},"Dashboards"),r.a.createElement("li",null,r.a.createElement(x.a,{to:"/",className:"nav-link mm-active"},r.a.createElement("i",{className:"metismenu-icon pe-7s-pen"}),"Nuovo Esercizio")))))}}]),t}(n.Component),R=a(521),A=a(259),F=a.n(A),P=a(24),B=function(e){function t(){var e,a;Object(y.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(j.a)(this,(e=Object(w.a)(t)).call.apply(e,[this].concat(r)))).state={sentence:""},a.handleChange=function(e){e.preventDefault(),a.setState(Object(P.a)({},e.target.id,e.target.value))},a.handleSubmit=function(e){e.preventDefault();var t=a.state.sentence;t=t.replace(/[,.?!"'<>;:]/g,function(e){return" ".concat(e," ")}).replace(/[--@[-`{-~\xa1-\xa9\xab-\xac\xae-\xb1\xb4\xb6-\xbb\xbf\xd7\xf7\u02c2-\u02c5\u02d2-\u02df\u02e5-\u02eb\u02ed\u02ef-\u02ff\u0375\u0384-\u0385\u0387\u03f6\u0482\u055a-\u055f-\u058a\u05be\u05c0\u05c3\u05c6\u05f3-\u05f4\u0606-\u060f\u061b\u061e-\u061f\u066a-\u066d\u06d4\u06e9\u06fd-\u06fe\u0700-\u070d\u07f6-\u07f9\u0964-\u0965\u0970\u09f2-\u09f3\u09fa\u0af1\u0b70\u0bf3-\u0bfa\u0c7f\u0cf1-\u0cf2\u0d79\u0df4\u0e3f\u0e4f\u0e5a-\u0e5b\u0f01-\u0f17\u0f1a-\u0f1f\u0f34\u0f36\u0f38\u0f3a-\u0f3d\u0f85\u0fbe-\u0fc5\u0fc7-\u0fcc\u0fce-\u0fd4\u104a-\u104f\u109e-\u109f\u10fb\u1360-\u1368\u1390-\u1399\u166d-\u166e\u169b-\u169c\u16eb-\u16ed\u1735-\u1736\u17d4-\u17d6\u17d8-\u17db\u1800-\u180a\u1940\u1944-\u1945\u19de-\u19ff\u1a1e-\u1a1f\u1b5a-\u1b6a\u1b74-\u1b7c\u1c3b-\u1c3f\u1c7e-\u1c7f\u1fbd\u1fbf-\u1fc1\u1fcd-\u1fcf\u1fdd-\u1fdf\u1fed-\u1fef\u1ffd-\u1ffe\u2000-\u206e\u207a-\u207e\u208a-\u208e\u20a0-\u20b5\u2100-\u2101\u2103-\u2106\u2108-\u2109\u2114\u2116-\u2118\u211e-\u2123\u2125\u2127\u2129\u212e\u213a-\u213b\u2140-\u2144\u214a-\u214d\u214f\u2190-\u23e7\u2400-\u2426\u2440-\u244a\u249c-\u24e9\u2500-\u269d\u26a0-\u26bc\u26c0-\u26c3\u2701-\u2704\u2706-\u2709\u270c-\u2727\u2729-\u274b\u274d\u274f-\u2752\u2756\u2758-\u275e\u2761-\u2775\u2794\u2798-\u27af\u27b1-\u27be\u27c0-\u27ca\u27cc\u27d0-\u2b4c\u2b50-\u2b54\u2ce5-\u2cea\u2cf9-\u2cfc\u2cfe-\u2cff\u2e00-\u2e7e\u2e80-\u2e99\u2e9b-\u2ef3\u2f00-\u2fd5\u2ff0-\u2ffb\u3000-\u303f\u309b-\u309c\u30a0\u30fb\u3190-\u3191\u3196-\u319f\u31c0-\u31e3\u3200-\u321e\u322a-\u3243\u3250\u3260-\u327f\u328a-\u32b0\u32c0-\u32fe\u3300-\u33ff\u4dc0-\u4dff\ua490-\ua4c6\ua60d-\ua60f\ua673\ua67e\ua700-\ua716\ua720-\ua721\ua789-\ua78a\ua828-\ua82b\ua874-\ua877\ua8ce-\ua8cf\ua92e-\ua92f\ua95f\uaa5c-\uaa5f\ufb29\ufd3e-\ufd3f\ufdfc-\ufdfd\ufe10-\ufe19\ufe30-\ufe52\ufe54-\ufe66\ufe68-\ufe6b\uff01-\uff0f\uff1a-\uff20\uff3b-\uff40\uff5b-\uff65\uffe0-\uffe6\uffe8-\uffee\ufffc-\ufffd]]/g,"").replace(/(\s){2,}/g,"$1").trim(),document.getElementById("sentence").value=t,(0,a.props.prepareExercise)(t)},a}return Object(S.a)(t,e),Object(O.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-12"},r.a.createElement("div",{className:"main-card mb-3 card"},r.a.createElement("div",{className:"card-body"},r.a.createElement("h5",{className:"card-title"},"Inserisci la frase "),r.a.createElement("form",{onSubmit:this.handleSubmit,className:"needs-validation was-validated"},r.a.createElement("div",{className:"input-group"},r.a.createElement("input",{id:"sentence",type:"text",className:"form-control validate",placeholder:"Inserisci una frase",onChange:this.handleChange,required:!0}),r.a.createElement("div",{className:"input-group-append"},r.a.createElement("button",{className:"btn btn-success",type:"submit"},"SVOLGI ESERCIZIO"))))))))}}]),t}(n.Component),U=a(260),D=function(){function e(t){Object(y.a)(this,e),this.langStruct=t,this.setBaseLevel()}return Object(O.a)(e,[{key:"setBaseLevel",value:function(){this.solution=[],this.currentLevel=-1,this.categoryData=null,this.categoryText="",this.currentButtonList=Object.values(this.langStruct.gerarchy)}},{key:"getSolution",value:function(){return!(arguments.length>0&&void 0!==arguments[0])||arguments[0]?this.solution.map(function(e){return e.data[0]}).join(" "):this.solution.map(function(e){return e.data[1]}).join(" ")}},{key:"getSolutionComplete",value:function(){var e=this.solution;return Object.assign.apply(Object,[{}].concat(Object(U.a)(e.map(function(e){return Object(P.a)({},e.text,e.data)}))))}},{key:"getCurrentButtonList",value:function(){return-1===this.currentLevel?this.currentButtonList.map(function(e){return e.text[0]}):this.currentButtonList.data?this.currentButtonList.data.map(function(e){return e[0]}):[]}},{key:"nextLevel",value:function(e){var t=null,a=null;if(-1===this.currentLevel){if(!(a=this.currentButtonList.find(function(t){return t.text[0]===e})))throw new RangeError("Element not found");this.categoryData=Object.values(a.data),this.categoryText=a.text,t={text:"pos",data:this.categoryText}}else if(this.currentLevel>this.categoryData.length-1)this.currentButtonList=[];else if(!(t={text:this.currentButtonList.text,data:this.currentButtonList.data.find(function(t){return t[0]===e})}))throw new RangeError("Element not found");this.currentLevel<this.categoryData.length-1?(this.currentLevel+=1,this.currentButtonList=this.categoryData[this.currentLevel],this.solution.push(t)):this.currentLevel===this.categoryData.length-1&&(this.solution.push(t),this.currentButtonList=[])}},{key:"prevLevel",value:function(){0===this.currentLevel?this.setBaseLevel():-1!==this.currentLevel&&(this.currentLevel-=1,this.currentButtonList=this.categoryData[this.currentLevel],this.solution.pop())}}]),e}(),G=function(){function e(t){Object(y.a)(this,e),this.gerarchy=t}return Object(O.a)(e,[{key:"getBaseIterator",value:function(){return new D(this)}}]),e}(),T=function(e){function t(e){var a;Object(y.a)(this,t),(a=Object(j.a)(this,Object(w.a)(t).call(this,e))).backOne=function(){try{var e=a.state.languageIterator;e.prevLevel(),a.setState({languageIterator:e,buttons:e.getCurrentButtonList(),solution:e.getSolution()})}catch(t){console.log(t)}},a.generateNext=function(e){try{var t=a.state.languageIterator;t.nextLevel(e),a.setState({buttons:t.getCurrentButtonList(),solution:t.getSolution(),languageIterator:t})}catch(n){console.log(n)}},a.reset=function(){var e=a.state.languageIterator;e.setBaseLevel(),a.setState({buttons:e.getCurrentButtonList(),solution:e.getSolution(),languageIterator:e})};var n=e.gerarchy,r=new G(n).getBaseIterator();return a.state={languageIterator:r,buttons:r.getCurrentButtonList(),solution:""},a}return Object(S.a)(t,e),Object(O.a)(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.parola,n=t.solutionAuto,c=t.showSolution,s=this.state,l=s.buttons,i=s.solution,o="";n&&(o=Object.keys(n).map(function(e){return Object.assign({data:n[e]},{text:e})}).filter(function(e){return"id"!==e.text&&"begin"!==e.text&&"end"!==e.text&&"form"!==e.text&&"lemma"!==e.text&&"tag"!==e.text&&"ctag"!==e.text}).map(function(e){return e.data}).join(" "));return null!==a.match(/[,.?!"'<>;:]/g)?r.a.createElement(r.a.Fragment,null):r.a.createElement("li",{className:"list-group-item",ref:function(t){e.liElement=t}},r.a.createElement("div",null,r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row "},r.a.createElement("div",{className:"pt-2  col-md-auto"},!1===c&&r.a.createElement(r.a.Fragment,null,r.a.createElement("button",{type:"button",className:"border-0 btn btn-outline-danger btn-sm",onClick:this.backOne},r.a.createElement("i",{className:"material-icons"},"settings_backup_restore")),r.a.createElement("button",{type:"button",className:"border-0 btn btn-outline-danger btn-sm",onClick:this.reset},r.a.createElement("i",{className:"material-icons"},"delete_forever"))),r.a.createElement("strong",{className:"p-2 text-uppercase"},a)),r.a.createElement("div",{className:" col-md-auto py-2 text-uppercase shwo-tooltip"},i&&r.a.createElement("p",{title:"La tua soluzione",className:"bg-light p-2 mb-2"},i),o&&c&&r.a.createElement("p",{title:"La soluzione automatica",className:" text-warning mb-2 text-uppercase"},!0===c&&o))))),l&&!1===c&&l.map(function(t,a){return r.a.createElement("button",{type:"button",className:"btn btn-outline-primary m-1",key:"index".concat(a),onClick:function(){return e.generateNext(t)}},t)}))}}]),t}(n.Component),W=function(e){function t(){var e,a;Object(y.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(j.a)(this,(e=Object(w.a)(t)).call.apply(e,[this].concat(r)))).state={it:{adjective:{text:["adjective","A"],data:{type:{text:"type",data:[["ordinal","O"],["qualificative","Q"],["possessive","P"]]},degree:{text:"degree",data:[["superlative","S"],["none","0"]]},gen:{text:"gen",data:[["feminile","F"],["masculine","M"],["common","C"],["neuter","N"]]},num:{text:"num",data:[["singular","S"],["plural","P"],["invariable","N"]]},possessorpers:{text:"possessorpers",data:[["1","1"],["2","2"],["3","3"]]},possessornum:{text:"possessornum",data:[["singular","S"],["plural","P"],["invariable","N"]]}}},conjunction:{text:["conjunction","C"],data:{type:{text:"type",data:[["coordinating","C"],["subordinating","S"]]}}},determiner:{text:["determiner","A"],data:{type:{text:"type",data:[["article","A"],["demonstrative","D"],["exclamative","E"],["indefinite","I"],["interrogative","T"],["numeral","N"],["possessive","P"]]},person:{text:"person",data:[["1","1"],["2","2"],["3","3"]]},gen:{text:"gen",data:[["feminile","F"],["masculine","M"],["common","C"],["neuter","N"]]},num:{text:"num",data:[["singular","S"],["plural","P"],["invariable","N"]]},possessornum:{text:"possessornum",data:[["singular","S"],["plural","P"]]}}}}},a.confirm=function(){(0,a.props.checkExerciseFunction)()},a}return Object(S.a)(t,e),Object(O.a)(t,[{key:"render",value:function(){var e=this.props,t=e.sentence,a=e.response,n=e.showSolution,c=e.lockInput,s=e.createAt,l=this.state.it,i=null;return t&&t.length&&(i=r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-12"},r.a.createElement("div",{className:"main-card mb-3 card"},r.a.createElement("div",{className:"card-body"},r.a.createElement("h5",{className:"card-title"},"Esegui l'esercizio"),r.a.createElement("ul",{className:"list-group"},t&&t.map(function(e,t){return r.a.createElement(T,{key:"".concat(t+e+s,"word"),parola:e,gerarchy:l,index:t,solutionAuto:a&&a.length?a[t]:[],showSolution:n,lock:c})})),r.a.createElement("div",{className:"row justify-content-end px-3"},r.a.createElement("div",{className:"col-12 col-sm-4 py-2 px-0"},r.a.createElement("button",{type:"button",className:"btn btn-success btn-block",onClick:this.confirm},"Completa")))))))),r.a.createElement(r.a.Fragment,null,i)}}]),t}(n.Component),J=function(e){function t(e){var a;Object(y.a)(this,t),(a=Object(j.a)(this,Object(w.a)(t).call(this,e))).prepareExercise=function(e){var t=Date.now();a.setState({sentenceString:e,showSolution:!1,response:null,createAt:t});var n=e.split(" ");n.length>0&&a.setState({sentence:n},function(){a.getSolution(e)})},a.checkSolution=function(){a.setState({showSolution:!0})},a.getSolution=function(){var e=a.state.sentenceString;F.a.post("http://sw8.tech/grammatical-analysis/p",{phrase:e}).then(function(e){console.log(e),a.setState({response:e.data.sentences[0].tokens})}).catch(function(e){return console.log(e)})};var n=Date.now();return a.state={sentence:[],sentenceString:"",response:null,showSolution:!1,createAt:n},a}return Object(S.a)(t,e),Object(O.a)(t,[{key:"render",value:function(){var e=this.state,t=e.sentence,a=e.response,n=e.showSolution,c=e.createAt;return r.a.createElement("div",{className:"col-12 col-md-10"},r.a.createElement(B,{prepareExercise:this.prepareExercise}),r.a.createElement(W,{sentence:t,checkExerciseFunction:this.checkSolution,response:a,showSolution:n,createAt:c}))}}]),t}(n.Component),z=function(e){function t(e){var a;return Object(y.a)(this,t),(a=Object(j.a)(this,Object(w.a)(t).call(this,e))).state={},a.state={},a}return Object(S.a)(t,e),Object(O.a)(t,[{key:"render",value:function(){return this.props.auth.uid?r.a.createElement("div",{className:"app-main__inner full-height-mobile"},r.a.createElement(J,null)):r.a.createElement(R.a,{to:"/signin"})}}]),t}(n.Component),M=Object(i.b)(function(e){return{auth:e.firebase.auth}})(z),q=function(e){function t(e){var a;return Object(y.a)(this,t),(a=Object(j.a)(this,Object(w.a)(t).call(this,e))).addMainJs=function(){var e=document.getElementsByTagName("body")[0],t=document.createElement("script");t.type="text/javascript",t.src="./main.js",t.id="mainJs",document.getElementById("mainJs")||e.appendChild(t)},a.addMainJs(),a}return Object(S.a)(t,e),Object(O.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"app-wrapper-footer"},r.a.createElement("div",{className:"app-footer"},r.a.createElement("div",{className:"app-footer__inner"},r.a.createElement("div",{className:"app-footer-left"},r.a.createElement("span",null,"\xa9 2019 SWEight")))))}}]),t}(n.Component),V=function(e){function t(){var e,a;Object(y.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(j.a)(this,(e=Object(w.a)(t)).call.apply(e,[this].concat(r)))).state={email:"",password:"",firstName:"",lastName:"",linkPhoto:""},a.handleChange=function(e){a.setState(Object(P.a)({},e.target.id,e.target.value))},a.handleSubmit=function(e){var t=a.props.signUpDispatch;e.preventDefault(),t(a.state)},a}return Object(S.a)(t,e),Object(O.a)(t,[{key:"render",value:function(){var e=this.props,t=e.auth,a=e.authError;return t.uid?r.a.createElement(R.a,{to:"/"}):r.a.createElement("div",{className:"app-main__inner full-height-mobile"},r.a.createElement("div",{className:"row justify-content-md-center"},r.a.createElement("div",{className:"col-sm-12 col-md-8 col-lg-8"},r.a.createElement("div",{className:"main-card mb-3 card"},r.a.createElement("div",{className:"card-body"},r.a.createElement("h5",{className:"card-title"},"Login"),r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("div",{className:"position-relative form-group"},r.a.createElement("label",{htmlFor:"firstName"},"Nome"),r.a.createElement("input",{name:"firstName",id:"firstName",placeholder:"Nome",type:"text",className:"form-control",onChange:this.handleChange})),r.a.createElement("div",{className:"position-relative form-group"},r.a.createElement("label",{htmlFor:"firstName"},"Cognome"),r.a.createElement("input",{name:"lastName",id:"lastName",placeholder:"Cognome",type:"text",className:"form-control",onChange:this.handleChange})),r.a.createElement("div",{className:"position-relative form-group"},r.a.createElement("label",{htmlFor:"email"},"Email"),r.a.createElement("input",{name:"address",id:"email",placeholder:"Email",type:"email",className:"form-control",onChange:this.handleChange})),r.a.createElement("div",{className:"position-relative form-group"},r.a.createElement("label",{htmlFor:"password"},"Password"),r.a.createElement("input",{name:"address2",id:"password",placeholder:"Passowrd",type:"password",className:"form-control",onChange:this.handleChange})),r.a.createElement("div",{className:"position-relative form-group"},r.a.createElement("label",{htmlFor:"linkPhoto"},"Link immagine del profile"),r.a.createElement("input",{name:"linkPhoto",id:"linkPhoto",placeholder:"http://ilmiosito.it/laMiaImmagine.jpg",type:"text",className:"form-control",onChange:this.handleChange})),r.a.createElement("button",{type:"submit",className:"mt-2 btn btn-primary"},"Accedi"),r.a.createElement("div",{className:""},a?r.a.createElement("p",null,a):null)))))))}}]),t}(n.Component),Z=Object(i.b)(function(e){return{auth:e.firebase.auth,authError:e.auth.authError}},function(e){return{signUpDispatch:function(t){return e((a=t,function(e,t,n){var r=n.getFirebase,c=n.getFirestore,s=r(),l=c();s.auth().createUserWithEmailAndPassword(a.email,a.password).then(function(e){return l.collection("users").doc(e.user.uid).set({firstName:a.firstName,lastName:a.lastName,initials:a.firstName[0]+a.lastName[0],linkPhoto:a.linkPhoto})}).then(function(){e({type:"SIGNUP_SUCCESS"})}).catch(function(t){e({type:"SIGNUP_ERROR",err:t})})}));var a}}})(V),$=function(e){function t(){var e,a;Object(y.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(j.a)(this,(e=Object(w.a)(t)).call.apply(e,[this].concat(r)))).state={email:"",password:""},a.handleChange=function(e){a.setState(Object(P.a)({},e.target.id,e.target.value))},a.handleSubmit=function(e){var t=a.props.signInDispatch;e.preventDefault(),t(a.state)},a}return Object(S.a)(t,e),Object(O.a)(t,[{key:"render",value:function(){var e=this.props,t=e.authError;return e.auth.uid?r.a.createElement(R.a,{to:"/"}):r.a.createElement("div",{className:"app-main__inner full-height-mobile "},r.a.createElement("div",{className:"row justify-content-md-center"},r.a.createElement("div",{className:"col-sm-12 col-md-6"},r.a.createElement("div",{className:"main-card mb-3 card"},r.a.createElement("div",{className:"card-body"},r.a.createElement("h5",{className:"card-title"},"Login"),r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("div",{className:"position-relative form-group"},r.a.createElement("label",{htmlFor:"email"},"Email"),r.a.createElement("input",{name:"address",id:"email",placeholder:"Email",type:"email",className:"form-control",onChange:this.handleChange})),r.a.createElement("div",{className:"position-relative form-group"},r.a.createElement("label",{htmlFor:"password"},"Password"),r.a.createElement("input",{name:"address2",id:"password",placeholder:"Passowrd",type:"password",className:"form-control",onChange:this.handleChange})),r.a.createElement("button",{type:"submit",className:"mt-2 btn btn-primary"},"Accedi"),r.a.createElement("div",{className:""},t?r.a.createElement("p",null,t):null)))))))}}]),t}(n.Component),K=Object(i.b)(function(e){return{authError:e.auth.authError,auth:e.firebase.auth}},function(e){return{signInDispatch:function(t){return e((a=t,function(e,t,n){(0,n.getFirebase)().auth().signInWithEmailAndPassword(a.email,a.password).then(function(){e({type:"LOGIN_SUCCESS"})}).catch(function(t){e({type:"LOGIN_ERROR",err:t})})}));var a}}})($),Q=function(){return r.a.createElement("div",{className:"app-main__inner "},r.a.createElement("div",{className:"row justify-content-md-center"},r.a.createElement("div",{className:"col-sm-12 col-md-6"},r.a.createElement("h1",null,"Error 404 page not found"))))},H=(a(465),Object(i.b)(function(e){return{auth:e.firebase.auth}})(function(){return r.a.createElement(f.a,{basename:"/"},r.a.createElement("div",{className:"app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header"},r.a.createElement(L,null),r.a.createElement("div",{className:"app-main"},r.a.createElement("div",{className:"app-sidebar sidebar-shadow"},r.a.createElement("div",{className:"app-header__logo"},r.a.createElement("div",{className:"logo-src"}),r.a.createElement("div",{className:"header__pane ml-auto"},r.a.createElement("div",null,r.a.createElement("button",{type:"button",className:"hamburger close-sidebar-btn hamburger--elastic","data-class":"closed-sidebar"},r.a.createElement("span",{className:"hamburger-box"},r.a.createElement("span",{className:"hamburger-inner"})))))),r.a.createElement("div",{className:"app-header__mobile-menu"},r.a.createElement("div",null,r.a.createElement("button",{type:"button",className:"hamburger hamburger--elastic mobile-toggle-nav"},r.a.createElement("span",{className:"hamburger-box"},r.a.createElement("span",{className:"hamburger-inner"}))))),r.a.createElement(I,null)),r.a.createElement("div",{className:"app-main__outer"},r.a.createElement(v.a,null,r.a.createElement(N.a,{exact:!0,path:"/",component:M}),r.a.createElement(N.a,{path:"/signin",component:K}),r.a.createElement(N.a,{path:"/signup",component:Z}),r.a.createElement(N.a,{component:Q})),r.a.createElement(q,null)))))})),X=a(105),Y=a.n(X);a(512),a(517);Y.a.initializeApp({apiKey:"AIzaSyAkZ6klWWfD_GLI9JGxh8pgd8qCR2x1-9g",authDomain:"colletta-9fb53.firebaseapp.com",databaseURL:"https://colletta-9fb53.firebaseio.com",projectId:"colletta-9fb53",storageBucket:"colletta-9fb53.appspot.com",messagingSenderId:"797571105871"}),Y.a.firestore().settings({timestampsInSnapshots:!0});var ee=Y.a,te=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function ae(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("","/service-worker.js");te?(!function(e,t){fetch(e).then(function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):ne(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit http://bit.ly/CRA-PWA")})):ne(t,e)})}}function ne(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See http://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}var re=Object(l.e)(E,Object(l.d)(Object(l.a)(o.a.withExtraArgument({getFirebase:m.getFirebase,getFirestore:u.getFirestore})),Object(m.reactReduxFirebase)(ee,{userProfile:"users",presence:"presence",useFirestoreForProfile:!0,attachAuthIsReady:!0}),Object(u.reduxFirestore)(ee)));re.firebaseAuthIsReady.then(function(){s.a.render(r.a.createElement(i.a,{store:re},r.a.createElement(H,null)),document.getElementById("root")),ae()}).catch(function(){s.a.render(r.a.createElement("h1",null,"Sto caricando"),document.getElementById("root")),ae()})}},[[262,1,2]]]);
//# sourceMappingURL=main.f142f1b0.chunk.js.map