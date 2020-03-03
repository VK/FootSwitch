(function(t){function e(e){for(var o,r,s=e[0],c=e[1],u=e[2],p=0,f=[];p<s.length;p++)r=s[p],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&f.push(i[r][0]),i[r]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(t[o]=c[o]);l&&l(e);while(f.length)f.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],o=!0,s=1;s<n.length;s++){var c=n[s];0!==i[c]&&(o=!1)}o&&(a.splice(e--,1),t=r(r.s=n[0]))}return t}var o={},i={app:0},a=[];function r(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=o,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/FootSwitch/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var u=0;u<s.length;u++)e(s[u]);var l=c;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("cd49")},"5c0b":function(t,e,n){"use strict";var o=n("e332"),i=n.n(o);i.a},a76d:function(t,e,n){},cd49:function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var o=n("2b0e"),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("vue-progress-bar"),n("div",{staticClass:"input-group mb-3"},[t._m(0),n("input",{directives:[{name:"model",rawName:"v-model",value:t.config.name,expression:"config.name"}],staticClass:"form-control",attrs:{type:"text",disabled:t.appState.disabled},domProps:{value:t.config.name},on:{input:function(e){e.target.composing||t.$set(t.config,"name",e.target.value)}}}),!0===t.appState.bluetoothVersion?n("div",{staticClass:"input-group-append"},[t.appState.connected?t._e():n("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:t.loadConfig}},[t._v("Connect")]),t.appState.connected?n("button",{staticClass:"btn btn-secondary",attrs:{type:"button"},on:{click:t.disconnect}},[t._v("Disconnect")]):t._e()]):t._e()]),t.showConfigsMenu?n("div",{staticClass:"input-group mb-3"},[t._m(1),n("select",{directives:[{name:"model",rawName:"v-model",value:t.selectedConfigName,expression:"selectedConfigName"}],ref:"configSelect",staticClass:"input-txt-smp pad2 form-control",attrs:{id:"selectedConfig",disabled:t.appState.disabled},on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.selectedConfigName=e.target.multiple?n:n[0]}}},t._l(t.configNames,(function(e,o){return n("option",{key:o},[t._v(t._s(e))])})),0),n("div",{staticClass:"input-group-append"},[n("button",{staticClass:"btn btn-secondary",attrs:{type:"button",disabled:t.appState.disabled},on:{click:t.deleteConfig}},[t._v("Delete")])])]):t._e(),t.showConfigsSetting?n("div",[t._l(t.selectedConfigData,(function(e,o,i){return n("div",{key:i},[n("div",{staticClass:"input-group mb-1"},[n("div",{staticClass:"input-group-prepend"},[n("span",{staticClass:"input-group-text mp-0",staticStyle:{flex:"1","min-width":"3.4em","max-width":"20%",padding:"0","padding-left":"0.2em"},attrs:{id:"basic-addon1"}},[n("img",{staticClass:"mb-0",attrs:{src:t.appState.publicPath+"img/icon"+o+".svg",height:"35",alt:t.fsConfig.shortToLongNameMap[o]}})])]),n("select",{directives:[{name:"model",rawName:"v-model",value:e.KEY,expression:"value.KEY"}],staticClass:"input-txt-smp pad2 form-control",attrs:{disabled:t.appState.disabled},on:{change:function(n){var o=Array.prototype.filter.call(n.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.$set(e,"KEY",n.target.multiple?o:o[0])}}},t._l(t.fsConfig.possibleKeys,(function(e,o){return n("option",{key:o},[t._v(t._s(e))])})),0),n("div",{staticClass:"input-group-append"},[n("div",{staticClass:"input-group-text"},[n("div",{staticClass:"custom-control custom-checkbox"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.SHIFT,expression:"value.SHIFT"}],staticClass:"custom-control-input",attrs:{type:"checkbox",id:o+"_SHIFT",disabled:t.appState.disabled},domProps:{checked:Array.isArray(e.SHIFT)?t._i(e.SHIFT,null)>-1:e.SHIFT},on:{change:function(n){var o=e.SHIFT,i=n.target,a=!!i.checked;if(Array.isArray(o)){var r=null,s=t._i(o,r);i.checked?s<0&&t.$set(e,"SHIFT",o.concat([r])):s>-1&&t.$set(e,"SHIFT",o.slice(0,s).concat(o.slice(s+1)))}else t.$set(e,"SHIFT",a)}}}),n("label",{staticClass:"custom-control-label",attrs:{for:o+"_SHIFT"}},[n("img",{attrs:{src:t.appState.publicPath+"img/iconShift.svg",height:"20",alt:"Shift"}})])]),n("div",{staticClass:"custom-control custom-checkbox"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.CTR,expression:"value.CTR"}],staticClass:"custom-control-input",attrs:{type:"checkbox",id:o+"_CTR",disabled:t.appState.disabled},domProps:{checked:Array.isArray(e.CTR)?t._i(e.CTR,null)>-1:e.CTR},on:{change:function(n){var o=e.CTR,i=n.target,a=!!i.checked;if(Array.isArray(o)){var r=null,s=t._i(o,r);i.checked?s<0&&t.$set(e,"CTR",o.concat([r])):s>-1&&t.$set(e,"CTR",o.slice(0,s).concat(o.slice(s+1)))}else t.$set(e,"CTR",a)}}}),n("label",{staticClass:"custom-control-label",attrs:{for:o+"_CTR"}},[n("img",{attrs:{src:t.appState.publicPath+"img/iconCtr.svg",height:"20",alt:"Ctr"}})])]),n("div",{staticClass:"custom-control custom-checkbox"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.ALT,expression:"value.ALT"}],staticClass:"custom-control-input",attrs:{type:"checkbox",id:o+"_ALT",disabled:t.appState.disabled},domProps:{checked:Array.isArray(e.ALT)?t._i(e.ALT,null)>-1:e.ALT},on:{change:function(n){var o=e.ALT,i=n.target,a=!!i.checked;if(Array.isArray(o)){var r=null,s=t._i(o,r);i.checked?s<0&&t.$set(e,"ALT",o.concat([r])):s>-1&&t.$set(e,"ALT",o.slice(0,s).concat(o.slice(s+1)))}else t.$set(e,"ALT",a)}}}),n("label",{staticClass:"custom-control-label m-0 p-0",attrs:{for:o+"_ALT"}},[n("img",{attrs:{src:t.appState.publicPath+"img/iconAlt.svg",height:"20",alt:"Alt"}})])])])])])])})),n("div",{staticClass:"input-group mt-3"},[t._m(2),n("input",{directives:[{name:"model",rawName:"v-model",value:t.newConfigName,expression:"newConfigName"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Name",disabled:t.appState.disabled},domProps:{value:t.newConfigName},on:{input:function(e){e.target.composing||(t.newConfigName=e.target.value)}}}),n("div",{staticClass:"input-group-append"},[n("button",{staticClass:"btn btn-secondary",attrs:{type:"button",disabled:t.appState.disabled},on:{click:t.addNewConfig}},[t._v("Add")])])]),n("div",{staticClass:"input-group mt-3"},[n("button",{staticClass:"btn btn-primary w-100",attrs:{type:"button",disabled:t.appState.disabled},on:{click:t.saveConfig}},[t._v("Save")])])],2):t._e()],1)},a=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"input-group-prepend"},[n("span",{staticClass:"input-group-text",attrs:{id:"basic-addon1"}},[t._v("Device")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"input-group-prepend"},[n("span",{staticClass:"input-group-text",attrs:{id:"basic-addon1"}},[t._v("Config")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"input-group-prepend"},[n("span",{staticClass:"input-group-text",attrs:{id:"basic-addon1"}},[t._v("New Config")])])}],r=(n("ac6a"),n("456d"),n("d225")),s=n("b0b4"),c=n("308d"),u=n("6bb5"),l=n("4e2b"),p=n("9ab4"),f=n("60a3"),d=n("2f62"),g=n("6fc5"),m=n("bc3a"),h=n.n(m),v="http://192.168.4.1/configApi";function b(){return h.a.get("".concat(v))}function C(t){return h.a.post("".concat(v),t)}var y=function(t){function e(){var t;return Object(r["a"])(this,e),t=Object(c["a"])(this,Object(u["a"])(e).apply(this,arguments)),t.publicPath="/FootSwitch/",t.connected=!1,t.connectedDevice=void 0,t.disabled=!1,t.bluetoothVersion=!0,t.progressbar="",t}return Object(l["a"])(e,t),Object(s["a"])(e,[{key:"disconnect",value:function(){if(this.connected)try{this.connectedDevice.gatt.disconnect()}catch(t){this.connectedDevice=void 0}this.connected=!1,this.connectedDevice=void 0,w.commit("fsConfig/resetConfig"),w.commit("appState/finishProgress")}},{key:"connect",value:function(){this.connected=!0}},{key:"disableInput",value:function(){this.disabled=!0}},{key:"enableInput",value:function(){this.disabled=!1}},{key:"registerConnectedDevice",value:function(t){this.connected=!0,this.connectedDevice=t}},{key:"getDevice",value:function(t){var e=this;return this.connected?this.connectedDevice.gatt.connect():navigator.bluetooth.requestDevice({filters:[{name:t},{services:["automation_io"]}]}).then((function(t){return e.progressbar.set(10),w.commit("appState/registerConnectedDevice",t),t.gatt.connect()}))}},{key:"registerProgressbar",value:function(t){var e=this;this.progressbar=t,this.bluetoothVersion=!0,b().then((function(t){e.bluetoothVersion=!1,w.commit("fsConfig/load")})).catch((function(t){console.log("Use bluetooth to connect")}))}},{key:"setProgress",value:function(t){this.progressbar.set(t)}},{key:"finishProgress",value:function(){this.progressbar.finish()}},{key:"failProgress",value:function(){this.progressbar.fail()}}]),e}(g["d"]);Object(p["a"])([g["c"]],y.prototype,"disconnect",null),Object(p["a"])([g["c"]],y.prototype,"connect",null),Object(p["a"])([g["c"]],y.prototype,"disableInput",null),Object(p["a"])([g["c"]],y.prototype,"enableInput",null),Object(p["a"])([g["c"]],y.prototype,"registerConnectedDevice",null),Object(p["a"])([g["a"]],y.prototype,"getDevice",null),Object(p["a"])([g["c"]],y.prototype,"registerProgressbar",null),Object(p["a"])([g["c"]],y.prototype,"setProgress",null),Object(p["a"])([g["c"]],y.prototype,"finishProgress",null),Object(p["a"])([g["c"]],y.prototype,"failProgress",null),y=Object(p["a"])([Object(g["b"])({namespaced:!0})],y);var S=y,k=(n("7f7f"),n("34ef"),n("a76d"),function(t){function e(){var t;return Object(r["a"])(this,e),t=Object(c["a"])(this,Object(u["a"])(e).apply(this,arguments)),t.data={name:"FootSwitch",configs:{},currentConfig:""},t.possibleKeys=["LEFT","RIGHT","UP","DOWN","TAB","HOME","PgUp","PgDn","SPACE","BACKSP","DEL"],t.shortToLongNameMap={LA:"Left short",LB:"Left long",RA:"Right short",RB:"Right long",C:"Center"},t.indexBluetoothString=new Uint8Array(1),t.totalBluetoothString="",t}return Object(l["a"])(e,t),Object(s["a"])(e,[{key:"setCurrentConfig",value:function(t){this.data.currentConfig=t}},{key:"resetConfig",value:function(){this.data.currentConfig="",this.data.configs={}}},{key:"addNewConfig",value:function(t){var e=JSON.parse(JSON.stringify(this.data)),n=JSON.parse(JSON.stringify(this.data.configs[this.data.currentConfig]));e.configs[t]=n,e.currentConfig=t,this.data=e}},{key:"deleteCurrentConfig",value:function(){var t=JSON.parse(JSON.stringify(this.data));delete t.configs[this.data.currentConfig],t.currentConfig=Object.keys(t.configs)[0],this.data=t}},{key:"loadConfigBluetooth",value:function(){this.totalBluetoothString="",this.indexBluetoothString[0]=0,w.dispatch("fsConfig/setConfigChunkIndex",25).catch((function(t){alert("Connection Error. Please retry."),w.commit("appState/failProgress"),w.commit("appState/disconnect")}))}},{key:"endBluetoothString",value:function(){var t=JSON.parse(this.totalBluetoothString);w.commit("fsConfig/setBluetoothConfig",t),w.commit("appState/finishProgress")}},{key:"appendBluetoothString",value:function(t){this.totalBluetoothString+=t,this.indexBluetoothString[0]++}},{key:"setBluetoothConfig",value:function(t){this.data=t}},{key:"setConfigChunkIndex",value:function(t){var e=this;return w.dispatch("appState/getDevice",this.data.name).then((function(t){return t.getPrimaryService("automation_io")})).then((function(t){return t.getCharacteristic("user_index")})).then((function(t){return t.writeValue(e.indexBluetoothString)})).then((function(){return new Promise((function(t){return setTimeout(t,100)})).then((function(){return w.dispatch("fsConfig/getConfigChunk",t+5)}))}))}},{key:"getConfigChunk",value:function(t){return w.dispatch("appState/getDevice",this.data.name).then((function(t){return t.getPrimaryService("automation_io")})).then((function(t){return t.getCharacteristic("string")})).then((function(t){return t.readValue()})).then((function(e){w.commit("appState/setProgress",t);var n=new TextDecoder("utf-8"),o=n.decode(e);return"end"===o?w.dispatch("fsConfig/endBluetoothString"):(w.commit("fsConfig/appendBluetoothString",o),new Promise((function(t){return setTimeout(t,20)})).then((function(){return w.dispatch("fsConfig/setConfigChunkIndex",t+5)})))}))}},{key:"sendMessagePart",value:function(t){var e=this,n=t.inputPromise,o=t.message,i=t.progressValue,a=new TextEncoder,r=a.encode(o);return n.then((function(){return w.dispatch("appState/getDevice",e.data.name).then((function(t){return t.getPrimaryService("automation_io")})).then((function(t){return t.getCharacteristic("string")})).then((function(t){return t.writeValue(r)})).then((function(){return w.commit("appState/setProgress",i),new Promise((function(t){return setTimeout(t,200)}))}))}))}},{key:"saveConfigBluetooth",value:function(){var t=JSON.stringify(this.data),e=200,n=Math.ceil(t.length/e),o=new Array(n+2);o[0]="start";for(var i=0,a=0;i<n;++i,a+=e)o[i+1]=t.substr(a,e);o[n+1]="save";var r=new Promise((function(t){return setTimeout(t,200)}));o.forEach((function(t,e){r=w.dispatch("fsConfig/sendMessagePart",{inputPromise:r,message:t,progressValue:10+80/o.length*e})})),r.then((function(){w.commit("appState/disconnect"),w.commit("appState/finishProgress"),w.commit("appState/enableInput")})).catch((function(t){alert("Connection Error. Please retry."),w.commit("appState/disconnect"),w.commit("appState/failProgress"),w.commit("appState/enableInput")}))}},{key:"loadConfigWeb",value:function(){var t=this;b().then((function(e){var n=e.data;t.data=n,w.commit("appState/finishProgress")})).catch((function(t){alert("Connection Error. Please reload page."),w.commit("appState/disconnect"),w.commit("appState/failProgress"),w.commit("appState/enableInput")}))}},{key:"saveConfigWeb",value:function(){C(JSON.stringify(this.data)).then((function(t){w.commit("appState/disconnect"),w.commit("appState/finishProgress"),w.commit("appState/enableInput")})).catch((function(t){alert("Connection Error. Please reload page."),w.commit("appState/disconnect"),w.commit("appState/failProgress"),w.commit("appState/enableInput")}))}},{key:"load",value:function(){w.state.appState.bluetoothVersion?(w.commit("appState/setProgress",10),w.commit("fsConfig/loadConfigBluetooth"),w.commit("appState/enableInput")):(w.commit("appState/setProgress",10),w.commit("fsConfig/loadConfigWeb"))}},{key:"save",value:function(){w.state.appState.bluetoothVersion?(w.commit("appState/disableInput"),w.commit("appState/setProgress",10),w.commit("fsConfig/saveConfigBluetooth")):(w.commit("appState/disableInput"),w.commit("appState/setProgress",10),w.commit("fsConfig/saveConfigWeb"))}}]),e}(g["d"]));Object(p["a"])([g["c"]],k.prototype,"setCurrentConfig",null),Object(p["a"])([g["c"]],k.prototype,"resetConfig",null),Object(p["a"])([g["c"]],k.prototype,"addNewConfig",null),Object(p["a"])([g["c"]],k.prototype,"deleteCurrentConfig",null),Object(p["a"])([g["c"]],k.prototype,"loadConfigBluetooth",null),Object(p["a"])([g["a"]],k.prototype,"endBluetoothString",null),Object(p["a"])([g["c"]],k.prototype,"appendBluetoothString",null),Object(p["a"])([g["c"]],k.prototype,"setBluetoothConfig",null),Object(p["a"])([g["a"]],k.prototype,"setConfigChunkIndex",null),Object(p["a"])([g["a"]],k.prototype,"getConfigChunk",null),Object(p["a"])([g["a"]],k.prototype,"sendMessagePart",null),Object(p["a"])([g["c"]],k.prototype,"saveConfigBluetooth",null),Object(p["a"])([g["c"]],k.prototype,"loadConfigWeb",null),Object(p["a"])([g["c"]],k.prototype,"saveConfigWeb",null),Object(p["a"])([g["c"]],k.prototype,"load",null),Object(p["a"])([g["c"]],k.prototype,"save",null),k=Object(p["a"])([Object(g["b"])({namespaced:!0})],k);var O=k;o["a"].use(d["b"]);var P=new d["a"]({modules:{fsConfig:O,appState:S}}),w=P,j=function(t){function e(){var t;return Object(r["a"])(this,e),t=Object(c["a"])(this,Object(u["a"])(e).call(this)),t.newConfigName="",w.commit("appState/registerProgressbar",t.$Progress),t}return Object(l["a"])(e,t),Object(s["a"])(e,[{key:"disconnect",value:function(){w.commit("appState/disconnect")}},{key:"loadConfig",value:function(){w.commit("fsConfig/load")}},{key:"addNewConfig",value:function(){""!==this.newConfigName?void 0===this.config.configs[this.newConfigName]?w.commit("fsConfig/addNewConfig",this.newConfigName):alert("Configuration with same name already defined. Choose a different name!"):alert("Please choose a name for the new configuration.")}},{key:"deleteConfig",value:function(){Object.keys(w.state.fsConfig.data.configs).length<=1?alert("Please do not delete the last configuration."):w.commit("fsConfig/deleteCurrentConfig")}},{key:"saveConfig",value:function(){w.commit("fsConfig/save")}},{key:"appState",get:function(){return w.state.appState}},{key:"fsConfig",get:function(){return w.state.fsConfig}},{key:"config",get:function(){return w.state.fsConfig.data}},{key:"showConfigsMenu",get:function(){return Object.keys(this.config.configs).length>0}},{key:"showConfigsSetting",get:function(){return void 0!==this.config.configs[this.selectedConfigName]}},{key:"allConfigs",get:function(){return this.config.configs}},{key:"configNames",get:function(){return Object.keys(this.allConfigs)}},{key:"selectedConfigData",get:function(){return this.config.configs[this.selectedConfigName]}},{key:"selectedConfigName",get:function(){return this.config.currentConfig},set:function(t){w.commit("fsConfig/setCurrentConfig",t)}}]),e}(f["b"]);j=Object(p["a"])([f["a"]],j);var _=j,T=_,N=(n("5c0b"),n("2877")),x=Object(N["a"])(T,i,a,!1,null,null,null),A=x.exports,B=n("9483");Object(B["a"])("".concat("/FootSwitch/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(t){console.error("Error during service worker registration:",t)}});var I=n("26b9"),D=n.n(I);o["a"].use(D.a,{color:"#007bff",failedColor:"red",thickness:"3px"}),o["a"].config.productionTip=!1,new o["a"]({store:w,render:function(t){return t(A)}}).$mount("#app")},e332:function(t,e,n){}});