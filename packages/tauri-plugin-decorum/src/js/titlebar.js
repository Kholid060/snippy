var ce=Object.defineProperty;var Y=(n,e)=>{for(var t in e)ce(n,t,{get:e[t],enumerable:!0});};var D={};Y(D,{Channel:()=>k,PluginListener:()=>I,Resource:()=>y,SERIALIZE_TO_IPC_FN:()=>u,addPluginListener:()=>de,checkPermissions:()=>pe,convertFileSrc:()=>me,invoke:()=>i,isTauri:()=>we,requestPermissions:()=>he,transformCallback:()=>W});function m(n,e,t,r){if(t==="a"&&!r)throw new TypeError("Private accessor was defined without a getter");if(typeof e=="function"?n!==e||!r:!e.has(n))throw new TypeError("Cannot read private member from an object whose class did not declare it");return t==="m"?r:t==="a"?r.call(n):r?r.value:e.get(n)}function b(n,e,t,r,o){if(typeof e=="function"?n!==e||!o:!e.has(n))throw new TypeError("Cannot write private member to an object whose class did not declare it");return e.set(n,t),t}var f,L,v,P,u="__TAURI_TO_IPC_KEY__";function W(n,e=!1){return window.__TAURI_INTERNALS__.transformCallback(n,e)}var k=class{constructor(){this.__TAURI_CHANNEL_MARKER__=!0,f.set(this,()=>{}),L.set(this,0),v.set(this,{}),this.id=W(({message:e,id:t})=>{if(t===m(this,L,"f")){b(this,L,t+1),m(this,f,"f").call(this,e);let r=Object.keys(m(this,v,"f"));if(r.length>0){let o=t+1;for(let c of r.sort())if(parseInt(c)===o){let s=m(this,v,"f")[c];delete m(this,v,"f")[c],m(this,f,"f").call(this,s),o+=1;}else break;b(this,L,o);}}else m(this,v,"f")[t.toString()]=e;});}set onmessage(e){b(this,f,e);}get onmessage(){return m(this,f,"f")}[(f=new WeakMap,L=new WeakMap,v=new WeakMap,u)](){return `__CHANNEL__:${this.id}`}toJSON(){return this[u]()}},I=class{constructor(e,t,r){this.plugin=e,this.event=t,this.channelId=r;}async unregister(){return i(`plugin:${this.plugin}|remove_listener`,{event:this.event,channelId:this.channelId})}};async function de(n,e,t){let r=new k;return r.onmessage=t,i(`plugin:${n}|registerListener`,{event:e,handler:r}).then(()=>new I(n,e,r.id))}async function pe(n){return i(`plugin:${n}|check_permissions`)}async function he(n){return i(`plugin:${n}|request_permissions`)}async function i(n,e={},t){return window.__TAURI_INTERNALS__.invoke(n,e,t)}function me(n,e="asset"){return window.__TAURI_INTERNALS__.convertFileSrc(n,e)}var y=class{get rid(){return m(this,P,"f")}constructor(e){P.set(this,void 0),b(this,P,e);}async close(){return i("plugin:resources|close",{rid:this.rid})}};P=new WeakMap;function we(){return "isTauri"in window&&!!window.isTauri}var z=class n extends y{constructor(e){super(e);}static async new(e,t,r){return i("plugin:image|new",{rgba:g(e),width:t,height:r}).then(o=>new n(o))}static async fromBytes(e){return i("plugin:image|from_bytes",{bytes:g(e)}).then(t=>new n(t))}static async fromPath(e){return i("plugin:image|from_path",{path:e}).then(t=>new n(t))}async rgba(){return i("plugin:image|rgba",{rid:this.rid}).then(e=>new Uint8Array(e))}async size(){return i("plugin:image|size",{rid:this.rid})}};function g(n){return n==null?null:typeof n=="string"?n:n instanceof z?n.rid:n}var x=class{constructor(...e){this.type="Logical",e.length===1?"Logical"in e[0]?(this.width=e[0].Logical.width,this.height=e[0].Logical.height):(this.width=e[0].width,this.height=e[0].height):(this.width=e[0],this.height=e[1]);}toPhysical(e){return new d(this.width*e,this.height*e)}[u](){return {width:this.width,height:this.height}}toJSON(){return this[u]()}},d=class{constructor(...e){this.type="Physical",e.length===1?"Physical"in e[0]?(this.width=e[0].Physical.width,this.height=e[0].Physical.height):(this.width=e[0].width,this.height=e[0].height):(this.width=e[0],this.height=e[1]);}toLogical(e){return new x(this.width/e,this.height/e)}[u](){return {width:this.width,height:this.height}}toJSON(){return this[u]()}},p=class{constructor(e){this.size=e;}toLogical(e){return this.size instanceof x?this.size:this.size.toLogical(e)}toPhysical(e){return this.size instanceof d?this.size:this.size.toPhysical(e)}[u](){return {[`${this.size.type}`]:{width:this.size.width,height:this.size.height}}}toJSON(){return this[u]()}},T=class{constructor(...e){this.type="Logical",e.length===1?"Logical"in e[0]?(this.x=e[0].Logical.x,this.y=e[0].Logical.y):(this.x=e[0].x,this.y=e[0].y):(this.x=e[0],this.y=e[1]);}toPhysical(e){return new a(this.x*e,this.y*e)}[u](){return {x:this.x,y:this.y}}toJSON(){return this[u]()}},a=class{constructor(...e){this.type="Physical",e.length===1?"Physical"in e[0]?(this.x=e[0].Physical.x,this.y=e[0].Physical.y):(this.x=e[0].x,this.y=e[0].y):(this.x=e[0],this.y=e[1]);}toLogical(e){return new T(this.x/e,this.y/e)}[u](){return {x:this.x,y:this.y}}toJSON(){return this[u]()}},h=class{constructor(e){this.position=e;}toLogical(e){return this.position instanceof T?this.position:this.position.toLogical(e)}toPhysical(e){return this.position instanceof a?this.position:this.position.toPhysical(e)}[u](){return {[`${this.position.type}`]:{x:this.position.x,y:this.position.y}}}toJSON(){return this[u]()}};var l;(function(n){n.WINDOW_RESIZED="tauri://resize",n.WINDOW_MOVED="tauri://move",n.WINDOW_CLOSE_REQUESTED="tauri://close-requested",n.WINDOW_DESTROYED="tauri://destroyed",n.WINDOW_FOCUS="tauri://focus",n.WINDOW_BLUR="tauri://blur",n.WINDOW_SCALE_FACTOR_CHANGED="tauri://scale-change",n.WINDOW_THEME_CHANGED="tauri://theme-changed",n.WINDOW_CREATED="tauri://window-created",n.WEBVIEW_CREATED="tauri://webview-created",n.DRAG_ENTER="tauri://drag-enter",n.DRAG_OVER="tauri://drag-over",n.DRAG_DROP="tauri://drag-drop",n.DRAG_LEAVE="tauri://drag-leave";})(l||(l={}));async function X(n,e){await i("plugin:event|unlisten",{event:n,eventId:e});}async function _(n,e,t){var r;let o=typeof t?.target=="string"?{kind:"AnyLabel",label:t.target}:(r=t?.target)!==null&&r!==void 0?r:{kind:"Any"};return i("plugin:event|listen",{event:n,target:o,handler:W(e)}).then(c=>async()=>X(n,c))}async function A(n,e,t){return _(n,r=>{X(n,r.id),e(r);},t)}async function O(n,e){await i("plugin:event|emit",{event:n,payload:e});}async function F(n,e,t){await i("plugin:event|emit_to",{target:typeof n=="string"?{kind:"AnyLabel",label:n}:n,event:e,payload:t});}var $;(function(n){n.Add="Add",n.Advanced="Advanced",n.Bluetooth="Bluetooth",n.Bookmarks="Bookmarks",n.Caution="Caution",n.ColorPanel="ColorPanel",n.ColumnView="ColumnView",n.Computer="Computer",n.EnterFullScreen="EnterFullScreen",n.Everyone="Everyone",n.ExitFullScreen="ExitFullScreen",n.FlowView="FlowView",n.Folder="Folder",n.FolderBurnable="FolderBurnable",n.FolderSmart="FolderSmart",n.FollowLinkFreestanding="FollowLinkFreestanding",n.FontPanel="FontPanel",n.GoLeft="GoLeft",n.GoRight="GoRight",n.Home="Home",n.IChatTheater="IChatTheater",n.IconView="IconView",n.Info="Info",n.InvalidDataFreestanding="InvalidDataFreestanding",n.LeftFacingTriangle="LeftFacingTriangle",n.ListView="ListView",n.LockLocked="LockLocked",n.LockUnlocked="LockUnlocked",n.MenuMixedState="MenuMixedState",n.MenuOnState="MenuOnState",n.MobileMe="MobileMe",n.MultipleDocuments="MultipleDocuments",n.Network="Network",n.Path="Path",n.PreferencesGeneral="PreferencesGeneral",n.QuickLook="QuickLook",n.RefreshFreestanding="RefreshFreestanding",n.Refresh="Refresh",n.Remove="Remove",n.RevealFreestanding="RevealFreestanding",n.RightFacingTriangle="RightFacingTriangle",n.Share="Share",n.Slideshow="Slideshow",n.SmartBadge="SmartBadge",n.StatusAvailable="StatusAvailable",n.StatusNone="StatusNone",n.StatusPartiallyAvailable="StatusPartiallyAvailable",n.StatusUnavailable="StatusUnavailable",n.StopProgressFreestanding="StopProgressFreestanding",n.StopProgress="StopProgress",n.TrashEmpty="TrashEmpty",n.TrashFull="TrashFull",n.User="User",n.UserAccounts="UserAccounts",n.UserGroup="UserGroup",n.UserGuest="UserGuest";})($||($={}));var re;(function(n){n[n.Audio=1]="Audio",n[n.Cache=2]="Cache",n[n.Config=3]="Config",n[n.Data=4]="Data",n[n.LocalData=5]="LocalData",n[n.Document=6]="Document",n[n.Download=7]="Download",n[n.Picture=8]="Picture",n[n.Public=9]="Public",n[n.Video=10]="Video",n[n.Resource=11]="Resource",n[n.Temp=12]="Temp",n[n.AppConfig=13]="AppConfig",n[n.AppData=14]="AppData",n[n.AppLocalData=15]="AppLocalData",n[n.AppCache=16]="AppCache",n[n.AppLog=17]="AppLog",n[n.Desktop=18]="Desktop",n[n.Executable=19]="Executable",n[n.Font=20]="Font",n[n.Home=21]="Home",n[n.Runtime=22]="Runtime",n[n.Template=23]="Template";})(re||(re={}));var j={};Y(j,{CloseRequestedEvent:()=>G,Effect:()=>q,EffectState:()=>Z,LogicalPosition:()=>T,LogicalSize:()=>x,PhysicalPosition:()=>a,PhysicalSize:()=>d,ProgressBarStatus:()=>K,UserAttentionType:()=>N,Window:()=>w,availableMonitors:()=>Ce,currentMonitor:()=>Le,cursorPosition:()=>Me,getAllWindows:()=>U,getCurrentWindow:()=>V,monitorFromPoint:()=>Se,primaryMonitor:()=>Ee});var N;(function(n){n[n.Critical=1]="Critical",n[n.Informational=2]="Informational";})(N||(N={}));var G=class{constructor(e){this._preventDefault=!1,this.event=e.event,this.id=e.id;}preventDefault(){this._preventDefault=!0;}isPreventDefault(){return this._preventDefault}},K;(function(n){n.None="none",n.Normal="normal",n.Indeterminate="indeterminate",n.Paused="paused",n.Error="error";})(K||(K={}));function V(){return new w(window.__TAURI_INTERNALS__.metadata.currentWindow.label,{skip:!0})}async function U(){return i("plugin:window|get_all_windows").then(n=>n.map(e=>new w(e,{skip:!0})))}var J=["tauri://created","tauri://error"],w=class{constructor(e,t={}){var r;this.label=e,this.listeners=Object.create(null),t?.skip||i("plugin:window|create",{options:{...t,parent:typeof t.parent=="string"?t.parent:(r=t.parent)===null||r===void 0?void 0:r.label,label:e}}).then(async()=>this.emit("tauri://created")).catch(async o=>this.emit("tauri://error",o));}static async getByLabel(e){var t;return (t=(await U()).find(r=>r.label===e))!==null&&t!==void 0?t:null}static getCurrent(){return V()}static async getAll(){return U()}static async getFocusedWindow(){for(let e of await U())if(await e.isFocused())return e;return null}async listen(e,t){return this._handleTauriEvent(e,t)?()=>{let r=this.listeners[e];r.splice(r.indexOf(t),1);}:_(e,t,{target:{kind:"Window",label:this.label}})}async once(e,t){return this._handleTauriEvent(e,t)?()=>{let r=this.listeners[e];r.splice(r.indexOf(t),1);}:A(e,t,{target:{kind:"Window",label:this.label}})}async emit(e,t){if(J.includes(e)){for(let r of this.listeners[e]||[])r({event:e,id:-1,payload:t});return}return O(e,t)}async emitTo(e,t,r){if(J.includes(t)){for(let o of this.listeners[t]||[])o({event:t,id:-1,payload:r});return}return F(e,t,r)}_handleTauriEvent(e,t){return J.includes(e)?(e in this.listeners?this.listeners[e].push(t):this.listeners[e]=[t],!0):!1}async scaleFactor(){return i("plugin:window|scale_factor",{label:this.label})}async innerPosition(){return i("plugin:window|inner_position",{label:this.label}).then(e=>new a(e))}async outerPosition(){return i("plugin:window|outer_position",{label:this.label}).then(e=>new a(e))}async innerSize(){return i("plugin:window|inner_size",{label:this.label}).then(e=>new d(e))}async outerSize(){return i("plugin:window|outer_size",{label:this.label}).then(e=>new d(e))}async isFullscreen(){return i("plugin:window|is_fullscreen",{label:this.label})}async isMinimized(){return i("plugin:window|is_minimized",{label:this.label})}async isMaximized(){return i("plugin:window|is_maximized",{label:this.label})}async isFocused(){return i("plugin:window|is_focused",{label:this.label})}async isDecorated(){return i("plugin:window|is_decorated",{label:this.label})}async isResizable(){return i("plugin:window|is_resizable",{label:this.label})}async isMaximizable(){return i("plugin:window|is_maximizable",{label:this.label})}async isMinimizable(){return i("plugin:window|is_minimizable",{label:this.label})}async isClosable(){return i("plugin:window|is_closable",{label:this.label})}async isVisible(){return i("plugin:window|is_visible",{label:this.label})}async title(){return i("plugin:window|title",{label:this.label})}async theme(){return i("plugin:window|theme",{label:this.label})}async center(){return i("plugin:window|center",{label:this.label})}async requestUserAttention(e){let t=null;return e&&(e===N.Critical?t={type:"Critical"}:t={type:"Informational"}),i("plugin:window|request_user_attention",{label:this.label,value:t})}async setResizable(e){return i("plugin:window|set_resizable",{label:this.label,value:e})}async setEnabled(e){return i("plugin:window|set_enabled",{label:this.label,value:e})}async isEnabled(){return i("plugin:window|is_enabled",{label:this.label})}async setMaximizable(e){return i("plugin:window|set_maximizable",{label:this.label,value:e})}async setMinimizable(e){return i("plugin:window|set_minimizable",{label:this.label,value:e})}async setClosable(e){return i("plugin:window|set_closable",{label:this.label,value:e})}async setTitle(e){return i("plugin:window|set_title",{label:this.label,value:e})}async maximize(){return i("plugin:window|maximize",{label:this.label})}async unmaximize(){return i("plugin:window|unmaximize",{label:this.label})}async toggleMaximize(){return i("plugin:window|toggle_maximize",{label:this.label})}async minimize(){return i("plugin:window|minimize",{label:this.label})}async unminimize(){return i("plugin:window|unminimize",{label:this.label})}async show(){return i("plugin:window|show",{label:this.label})}async hide(){return i("plugin:window|hide",{label:this.label})}async close(){return i("plugin:window|close",{label:this.label})}async destroy(){return i("plugin:window|destroy",{label:this.label})}async setDecorations(e){return i("plugin:window|set_decorations",{label:this.label,value:e})}async setShadow(e){return i("plugin:window|set_shadow",{label:this.label,value:e})}async setEffects(e){return i("plugin:window|set_effects",{label:this.label,value:e})}async clearEffects(){return i("plugin:window|set_effects",{label:this.label,value:null})}async setAlwaysOnTop(e){return i("plugin:window|set_always_on_top",{label:this.label,value:e})}async setAlwaysOnBottom(e){return i("plugin:window|set_always_on_bottom",{label:this.label,value:e})}async setContentProtected(e){return i("plugin:window|set_content_protected",{label:this.label,value:e})}async setSize(e){return i("plugin:window|set_size",{label:this.label,value:e instanceof p?e:new p(e)})}async setMinSize(e){return i("plugin:window|set_min_size",{label:this.label,value:e instanceof p?e:e?new p(e):null})}async setMaxSize(e){return i("plugin:window|set_max_size",{label:this.label,value:e instanceof p?e:e?new p(e):null})}async setSizeConstraints(e){function t(r){return r?{Logical:r}:null}return i("plugin:window|set_size_constraints",{label:this.label,value:{minWidth:t(e?.minWidth),minHeight:t(e?.minHeight),maxWidth:t(e?.maxWidth),maxHeight:t(e?.maxHeight)}})}async setPosition(e){return i("plugin:window|set_position",{label:this.label,value:e instanceof h?e:new h(e)})}async setFullscreen(e){return i("plugin:window|set_fullscreen",{label:this.label,value:e})}async setFocus(){return i("plugin:window|set_focus",{label:this.label})}async setIcon(e){return i("plugin:window|set_icon",{label:this.label,value:g(e)})}async setSkipTaskbar(e){return i("plugin:window|set_skip_taskbar",{label:this.label,value:e})}async setCursorGrab(e){return i("plugin:window|set_cursor_grab",{label:this.label,value:e})}async setCursorVisible(e){return i("plugin:window|set_cursor_visible",{label:this.label,value:e})}async setCursorIcon(e){return i("plugin:window|set_cursor_icon",{label:this.label,value:e})}async setBackgroundColor(e){return i("plugin:window|set_background_color",{color:e})}async setCursorPosition(e){return i("plugin:window|set_cursor_position",{label:this.label,value:e instanceof h?e:new h(e)})}async setIgnoreCursorEvents(e){return i("plugin:window|set_ignore_cursor_events",{label:this.label,value:e})}async startDragging(){return i("plugin:window|start_dragging",{label:this.label})}async startResizeDragging(e){return i("plugin:window|start_resize_dragging",{label:this.label,value:e})}async setProgressBar(e){return i("plugin:window|set_progress_bar",{label:this.label,value:e})}async setVisibleOnAllWorkspaces(e){return i("plugin:window|set_visible_on_all_workspaces",{label:this.label,value:e})}async setTitleBarStyle(e){return i("plugin:window|set_title_bar_style",{label:this.label,value:e})}async setTheme(e){return i("plugin:window|set_theme",{label:this.label,value:e})}async onResized(e){return this.listen(l.WINDOW_RESIZED,t=>{t.payload=new d(t.payload),e(t);})}async onMoved(e){return this.listen(l.WINDOW_MOVED,t=>{t.payload=new a(t.payload),e(t);})}async onCloseRequested(e){return this.listen(l.WINDOW_CLOSE_REQUESTED,async t=>{let r=new G(t);await e(r),r.isPreventDefault()||await this.destroy();})}async onDragDropEvent(e){let t=await this.listen(l.DRAG_ENTER,s=>{e({...s,payload:{type:"enter",paths:s.payload.paths,position:new a(s.payload.position)}});}),r=await this.listen(l.DRAG_OVER,s=>{e({...s,payload:{type:"over",position:new a(s.payload.position)}});}),o=await this.listen(l.DRAG_DROP,s=>{e({...s,payload:{type:"drop",paths:s.payload.paths,position:new a(s.payload.position)}});}),c=await this.listen(l.DRAG_LEAVE,s=>{e({...s,payload:{type:"leave"}});});return ()=>{t(),o(),r(),c();}}async onFocusChanged(e){let t=await this.listen(l.WINDOW_FOCUS,o=>{e({...o,payload:!0});}),r=await this.listen(l.WINDOW_BLUR,o=>{e({...o,payload:!1});});return ()=>{t(),r();}}async onScaleChanged(e){return this.listen(l.WINDOW_SCALE_FACTOR_CHANGED,e)}async onThemeChanged(e){return this.listen(l.WINDOW_THEME_CHANGED,e)}},q;(function(n){n.AppearanceBased="appearanceBased",n.Light="light",n.Dark="dark",n.MediumLight="mediumLight",n.UltraDark="ultraDark",n.Titlebar="titlebar",n.Selection="selection",n.Menu="menu",n.Popover="popover",n.Sidebar="sidebar",n.HeaderView="headerView",n.Sheet="sheet",n.WindowBackground="windowBackground",n.HudWindow="hudWindow",n.FullScreenUI="fullScreenUI",n.Tooltip="tooltip",n.ContentBackground="contentBackground",n.UnderWindowBackground="underWindowBackground",n.UnderPageBackground="underPageBackground",n.Mica="mica",n.Blur="blur",n.Acrylic="acrylic",n.Tabbed="tabbed",n.TabbedDark="tabbedDark",n.TabbedLight="tabbedLight";})(q||(q={}));var Z;(function(n){n.FollowsWindowActiveState="followsWindowActiveState",n.Active="active",n.Inactive="inactive";})(Z||(Z={}));function H(n){return n===null?null:{name:n.name,scaleFactor:n.scaleFactor,position:new a(n.position),size:new d(n.size)}}async function Le(){return i("plugin:window|current_monitor").then(H)}async function Ee(){return i("plugin:window|primary_monitor").then(H)}async function Se(n,e){return i("plugin:window|monitor_from_point",{x:n,y:e}).then(H)}async function Ce(){return i("plugin:window|available_monitors").then(n=>n.map(H))}async function Me(){return i("plugin:window|cursor_position").then(n=>new a(n))}function Q(){return new R(V(),window.__TAURI_INTERNALS__.metadata.currentWebview.label,{skip:!0})}async function se(){return i("plugin:webview|get_all_webviews").then(n=>n.map(e=>new R(new w(e.windowLabel,{skip:!0}),e.label,{skip:!0})))}var B=["tauri://created","tauri://error"],R=class{constructor(e,t,r){this.window=e,this.label=t,this.listeners=Object.create(null),r?.skip||i("plugin:webview|create_webview",{windowLabel:e.label,label:t,options:r}).then(async()=>this.emit("tauri://created")).catch(async o=>this.emit("tauri://error",o));}static async getByLabel(e){var t;return (t=(await se()).find(r=>r.label===e))!==null&&t!==void 0?t:null}static getCurrent(){return Q()}static async getAll(){return se()}async listen(e,t){return this._handleTauriEvent(e,t)?()=>{let r=this.listeners[e];r.splice(r.indexOf(t),1);}:_(e,t,{target:{kind:"Webview",label:this.label}})}async once(e,t){return this._handleTauriEvent(e,t)?()=>{let r=this.listeners[e];r.splice(r.indexOf(t),1);}:A(e,t,{target:{kind:"Webview",label:this.label}})}async emit(e,t){if(B.includes(e)){for(let r of this.listeners[e]||[])r({event:e,id:-1,payload:t});return}return O(e,t)}async emitTo(e,t,r){if(B.includes(t)){for(let o of this.listeners[t]||[])o({event:t,id:-1,payload:r});return}return F(e,t,r)}_handleTauriEvent(e,t){return B.includes(e)?(e in this.listeners?this.listeners[e].push(t):this.listeners[e]=[t],!0):!1}async position(){return i("plugin:webview|webview_position",{label:this.label}).then(e=>new a(e))}async size(){return i("plugin:webview|webview_size",{label:this.label}).then(e=>new d(e))}async close(){return i("plugin:webview|close",{label:this.label})}async setSize(e){return i("plugin:webview|set_webview_size",{label:this.label,value:e instanceof p?e:new p(e)})}async setPosition(e){return i("plugin:webview|set_webview_position",{label:this.label,value:e instanceof h?e:new h(e)})}async setFocus(){return i("plugin:webview|set_webview_focus",{label:this.label})}async hide(){return i("plugin:webview|webview_hide",{label:this.label})}async show(){return i("plugin:webview|webview_show",{label:this.label})}async setZoom(e){return i("plugin:webview|set_webview_zoom",{label:this.label,value:e})}async reparent(e){return i("plugin:webview|reparent",{label:this.label,window:typeof e=="string"?e:e.label})}async clearAllBrowsingData(){return i("plugin:webview|clear_all_browsing_data")}async setBackgroundColor(e){return i("plugin:webview|set_webview_background_color",{color:e})}async onDragDropEvent(e){let t=await this.listen(l.DRAG_ENTER,s=>{e({...s,payload:{type:"enter",paths:s.payload.paths,position:new a(s.payload.position)}});}),r=await this.listen(l.DRAG_OVER,s=>{e({...s,payload:{type:"over",position:new a(s.payload.position)}});}),o=await this.listen(l.DRAG_DROP,s=>{e({...s,payload:{type:"drop",paths:s.payload.paths,position:new a(s.payload.position)}});}),c=await this.listen(l.DRAG_LEAVE,s=>{e({...s,payload:{type:"leave"}});});return ()=>{t(),o(),r(),c();}}};function Ie(){let n=Q();return new C(n.label,{skip:!0})}async function oe(){return i("plugin:window|get_all_windows").then(n=>n.map(e=>new C(e,{skip:!0})))}var C=class n{constructor(e,t={}){var r;this.label=e,this.listeners=Object.create(null),t?.skip||i("plugin:webview|create_webview_window",{options:{...t,parent:typeof t.parent=="string"?t.parent:(r=t.parent)===null||r===void 0?void 0:r.label,label:e}}).then(async()=>this.emit("tauri://created")).catch(async o=>this.emit("tauri://error",o));}static async getByLabel(e){var t;let r=(t=(await oe()).find(o=>o.label===e))!==null&&t!==void 0?t:null;return r?new n(r.label,{skip:!0}):null}static getCurrent(){return Ie()}static async getAll(){return oe()}async listen(e,t){return this._handleTauriEvent(e,t)?()=>{let r=this.listeners[e];r.splice(r.indexOf(t),1);}:_(e,t,{target:{kind:"WebviewWindow",label:this.label}})}async once(e,t){return this._handleTauriEvent(e,t)?()=>{let r=this.listeners[e];r.splice(r.indexOf(t),1);}:A(e,t,{target:{kind:"WebviewWindow",label:this.label}})}async setBackgroundColor(e){return i("plugin:window|set_background_color",{color:e}).then(()=>i("plugin:webview|set_webview_background_color",{color:e}))}};We(C,[w,R]);function We(n,e){(Array.isArray(e)?e:[e]).forEach(t=>{Object.getOwnPropertyNames(t.prototype).forEach(r=>{var o;typeof n.prototype=="object"&&n.prototype&&r in n.prototype||Object.defineProperty(n.prototype,r,(o=Object.getOwnPropertyDescriptor(t.prototype,r))!==null&&o!==void 0?o:Object.create(null));});});}function ae(n,e){let t;return (...r)=>{clearTimeout(t),t=setTimeout(()=>{n(...r);},e);}}function ze(){let n=document.querySelector("[data-tauri-decorum-tb]");if(n)return null;console.log("DECORUM: Element with data-tauri-decorum-tb not found. Creating one."),n=document.createElement("div"),n.setAttribute("data-tauri-decorum-tb",""),n.style.top="0px",n.style.left="0px",n.style.zIndex="100",n.style.width="100%",n.style.height="32px",n.style.display="flex",n.style.position="fixed",n.style.alignItems="end",n.style.justifyContent="end",n.style.backgroundColor="transparent";let e=document.createElement("div");return e.style.width="100%",e.style.height="100%",e.style.background="transparent",e.setAttribute("data-tauri-drag-region",""),n.appendChild(e),document.body.appendChild(n),n}var Oe={close:"\uE8BB",minimize:"\uE921",maximize:"\uE922",unmaximize:"\uE923"},Fe={close:"@win-close",minimize:"@win-minimize",maximize:"@win-maximize",unmaximize:"@win-restore"};async function Ue(n,e){let t=await e.isMaximized(),r=window.__windows?Oe:Fe,o=c=>{let s=document.createElement("button");s.id="decorum-tb-"+c,s.classList.add("decorum-tb-btn");let M,le=()=>{e.setFocus().then(()=>D.invoke("plugin:decorum|show_snap_overlay"));};switch(c){case"minimize":s.innerHTML=r.minimize,s.addEventListener("click",()=>{clearTimeout(M),e.minimize();});break;case"maximize":s.innerHTML=t?r.unmaximize:r.maximize,e.onResized(ae(()=>{e.isMaximized().then(ue=>{s.innerHTML=ue?r.unmaximize:r.maximize;});},500)),s.addEventListener("click",()=>{clearTimeout(M),e.toggleMaximize();}),s.addEventListener("mouseleave",()=>clearTimeout(M)),s.addEventListener("mouseenter",()=>{M=setTimeout(le,620);});break;case"close":s.innerHTML=r.close,s.addEventListener("click",()=>e.close());break}return s};["minimize","maximize","close"].forEach(c=>{n.appendChild(o(c));});}function Ne(){let n=ze();if(!n)return;let e=j.getCurrentWindow();Ue(n,e);let t=document.createElement("style");document.head.appendChild(t),t.innerHTML=`
    .decorum-tb-btn {
      cursor: default;
      width: 58px;
      height: 32px;
      border: none;
      padding: 0px;
      outline: none;
      display: flex;
      font-size: 10px;
      font-weight: 300;
      box-shadow: none;
      border-radius: 0;
      align-items: center;
      justify-content: center;
      transition: background 0.1s;
      background-color: transparent;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      font-family: 'Segoe Fluent Icons', 'Segoe MDL2 Assets';
    }

    .decorum-tb-btn:hover {
      background-color: rgba(0,0,0,0.2);
    }

    #decorum-tb-close:hover {
      background-color: rgba(255,0,0,0.7) !important;
    }
  `;}document.addEventListener("DOMContentLoaded",()=>{Ne();});