"use strict";function rgx(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];var r=/^\s+|\s+\n|\s+#[\s\S]+?\n/gm,a=t.raw[0].replace(r,"");return new RegExp(a,"m")}function getTemplate(t){try{return ansi_up.ansi_to_html(window.isogram(t.join(""),{color:!0,scriptTag:!0,id:"XXXXX-XX"}))}catch(t){return ansi_up.ansi_to_html(window.isogram("isogram",{scriptTag:!0,id:"XXXXX-XX"}))}}function isIsogram(t){for(var e,n=[],r=t.split(""),a=!0,s=0,i=r.length;s<i;s++){if(e=r[s],-1!==n.indexOf(e)||!isNaN(e)){a=!1;break}n.push(e)}return a}function updateHash(t){history.replaceState(null,document.title,document.location.pathname+(t?"#"+t:""))}function _ready(t){(document.attachEvent?"complete"===document.readyState:"loading"!==document.readyState)?t():document.addEventListener("DOMContentLoaded",t)}function _addEventListener(t,e,n){t.addEventListener?t.addEventListener(e,n):t.attachEvent("on"+e,function(){n.call(t)})}function _triggerEvent(t,e,n){var r;window.CustomEvent?r=new CustomEvent(e,n):(r=document.createEvent("CustomEvent")).initCustomEvent(e,!0,!0,n),t.dispatchEvent(r)}var AnsiUp=function(){function t(){this.VERSION="2.0.1",this.ansi_colors=[[{rgb:[0,0,0],class_name:"ansi-black"},{rgb:[187,0,0],class_name:"ansi-red"},{rgb:[0,187,0],class_name:"ansi-green"},{rgb:[187,187,0],class_name:"ansi-yellow"},{rgb:[0,0,187],class_name:"ansi-blue"},{rgb:[187,0,187],class_name:"ansi-magenta"},{rgb:[0,187,187],class_name:"ansi-cyan"},{rgb:[255,255,255],class_name:"ansi-white"}],[{rgb:[85,85,85],class_name:"ansi-bright-black"},{rgb:[255,85,85],class_name:"ansi-bright-red"},{rgb:[0,255,0],class_name:"ansi-bright-green"},{rgb:[255,255,85],class_name:"ansi-bright-yellow"},{rgb:[85,85,255],class_name:"ansi-bright-blue"},{rgb:[255,85,255],class_name:"ansi-bright-magenta"},{rgb:[85,255,255],class_name:"ansi-bright-cyan"},{rgb:[255,255,255],class_name:"ansi-bright-white"}]],this.htmlFormatter={transform:function(t,e){var n=t.text;if(0===n.length)return n;if(e._escape_for_html&&(n=e.old_escape_for_html(n)),!t.bright&&null===t.fg&&null===t.bg)return n;var r=[],a=[],s=t.fg,i=t.bg;null===s&&t.bright&&(s=e.ansi_colors[1][7]),e._use_classes?(s&&("truecolor"!==s.class_name?a.push(s.class_name+"-fg"):r.push("color:rgb("+s.rgb.join(",")+")")),i&&("truecolor"!==i.class_name?a.push(i.class_name+"-bg"):r.push("background-color:rgb("+i.rgb.join(",")+")"))):(s&&r.push("color:rgb("+s.rgb.join(",")+")"),i&&r.push("background-color:rgb("+i.rgb+")"));var o="",l="";return a.length&&(o=' class="'+a.join(" ")+'"'),r.length&&(l=' style="'+r.join(";")+'"'),"<span"+o+l+">"+n+"</span>"},compose:function(t,e){return t.join("")}},this.textFormatter={transform:function(t,e){return t.text},compose:function(t,e){return t.join("")}},this.setup_256_palette(),this._use_classes=!1,this._escape_for_html=!0,this.bright=!1,this.fg=this.bg=null,this._buffer=""}return Object.defineProperty(t.prototype,"use_classes",{get:function(){return this._use_classes},set:function(t){this._use_classes=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"escape_for_html",{get:function(){return this._escape_for_html},set:function(t){this._escape_for_html=t},enumerable:!0,configurable:!0}),t.prototype.setup_256_palette=function(){var t=this;this.palette_256=[],this.ansi_colors.forEach(function(e){e.forEach(function(e){t.palette_256.push(e)})});for(var e=[0,95,135,175,215,255],n=0;n<6;++n)for(var r=0;r<6;++r)for(var a=0;a<6;++a){var s={rgb:[e[n],e[r],e[a]],class_name:"truecolor"};this.palette_256.push(s)}for(var i=8,o=0;o<24;++o,i+=10){var l={rgb:[i,i,i],class_name:"truecolor"};this.palette_256.push(l)}},t.prototype.old_escape_for_html=function(t){return t.replace(/[&<>]/gm,function(t){return"&"===t?"&amp;":"<"===t?"&lt;":">"===t?"&gt;":void 0})},t.prototype.old_linkify=function(t){return t.replace(/(https?:\/\/[^\s]+)/gm,function(t){return'<a href="'+t+'">'+t+"</a>"})},t.prototype.detect_incomplete_ansi=function(t){return!/.*?[\x40-\x7e]/.test(t)},t.prototype.detect_incomplete_link=function(t){for(var e=!1,n=t.length-1;n>0;n--)if(/\s|\x1B/.test(t[n])){e=!0;break}if(!e)return/(https?:\/\/[^\s]+)/.test(t)?0:-1;var r=t.substr(n+1,4);return 0===r.length?-1:0==="http".indexOf(r)?n+1:void 0},t.prototype.ansi_to=function(t,e){var n=this._buffer+t;this._buffer="";var r=n.split(/\x1B\[/);1===r.length&&r.push(""),this.handle_incomplete_sequences(r);for(var a=this.with_state(r.shift()),s=new Array(r.length),i=0,o=r.length;i<o;++i)s[i]=e.transform(this.process_ansi(r[i]),this);return a.text.length>0&&s.unshift(e.transform(a,this)),e.compose(s,this)},t.prototype.ansi_to_html=function(t){return this.ansi_to(t,this.htmlFormatter)},t.prototype.ansi_to_text=function(t){return this.ansi_to(t,this.textFormatter)},t.prototype.with_state=function(t){return{bright:this.bright,fg:this.fg,bg:this.bg,text:t}},t.prototype.handle_incomplete_sequences=function(t){var e=t[t.length-1];e.length>0&&this.detect_incomplete_ansi(e)?(this._buffer="["+e,t.pop(),t.push("")):(""===e.slice(-1)&&(this._buffer="",console.log("raw",t),t.pop(),t.push(e.substr(0,e.length-1)),console.log(t),console.log(e)),2===t.length&&""===t[1]&&""===t[0].slice(-1)&&(this._buffer="",e=t.shift(),t.unshift(e.substr(0,e.length-1))))},t.prototype.process_ansi=function(t){this._sgr_regex||(this._sgr_regex=(f=["\n            ^                           # beginning of line\n            ([!<-?]?)             # a private-mode char (!, <, =, >, ?)\n            ([d;]*)                    # any digits or semicolons\n            ([ -/]?               # an intermediate modifier\n            [@-~])                # the command\n            ([sS]*)                   # any text following this CSI sequence\n          "],f.raw=["\n            ^                           # beginning of line\n            ([!\\x3c-\\x3f]?)             # a private-mode char (!, <, =, >, ?)\n            ([\\d;]*)                    # any digits or semicolons\n            ([\\x20-\\x2f]?               # an intermediate modifier\n            [\\x40-\\x7e])                # the command\n            ([\\s\\S]*)                   # any text following this CSI sequence\n          "],rgx(f)));var e=t.match(this._sgr_regex);if(!e)return this.with_state(t);var n=e[4];if(""!==e[1]||"m"!==e[3])return this.with_state(n);for(var r=e[2].split(";");r.length>0;){var a=r.shift(),s=parseInt(a,10);if(isNaN(s)||0===s)this.fg=this.bg=null,this.bright=!1;else if(1===s)this.bright=!0;else if(22===s)this.bright=!1;else if(39===s)this.fg=null;else if(49===s)this.bg=null;else if(s>=30&&s<38){var i=this.bright?1:0;this.fg=this.ansi_colors[i][s-30]}else if(s>=90&&s<98)this.fg=this.ansi_colors[1][s-90];else if(s>=40&&s<48)this.bg=this.ansi_colors[0][s-40];else if(s>=100&&s<108)this.bg=this.ansi_colors[1][s-100];else if((38===s||48===s)&&r.length>0){var o=38===s,l=r.shift();if("5"===l&&r.length>0){var c=parseInt(r.shift(),10);c>=0&&c<=255&&(o?this.fg=this.palette_256[c]:this.bg=this.palette_256[c])}if("2"===l&&r.length>2){var h=parseInt(r.shift(),10),g=parseInt(r.shift(),10),u=parseInt(r.shift(),10);if(h>=0&&h<=255&&g>=0&&g<=255&&u>=0&&u<=255){var p={rgb:[h,g,u],class_name:"truecolor"};o?this.fg=p:this.bg=p}}}}return this.with_state(n);var f},t}(),ansi_up=new AnsiUp,isAlpha=function(t){return/^[A-Za-z]+$/.test(t)};_ready(function(){var t=document.getElementById("isogram-input"),e=document.getElementById("output-bottom"),n=document.getElementById("warning"),r=document.body;_addEventListener(t,"input",function(a){var s=t.value.split("");s.length;console.log("Checking for "+t.value),t.value&&!isAlpha(t.value)?(t.value=t.value.substring(0,t.value.length-1),n.innerHTML="Can only have alpha characters.",updateHash(""),r.classList.remove("success")):isIsogram(t.value)?t.value.length<3?(n.innerHTML="Please enter 3 - 7 characters.",e.innerHTML=getTemplate(),updateHash(""),r.classList.remove("success")):(n.innerHTML="",e.innerHTML=getTemplate(s),updateHash(t.value),r.classList.add("success")):(t.value=t.value.substring(0,t.value.length-1),n.innerHTML="Cannot repeat characters, not an isogram.",updateHash(""),r.classList.remove("success"))});var a=window.location.hash.replace(/^#/,"");a&&isAlpha(a)&&isIsogram(a)&&a.length>2?(t.value=a,_triggerEvent(t,"input")):e.innerHTML=getTemplate()}),window.arrayDuplicated=function(t){if(!Array.isArray(t))throw new TypeError(t+" is not an array. Argument to array-duplicated  must be an array.");for(var e=[],n=0;n<t.length;n++)t.indexOf(t[n])!==n&&-1===e.indexOf(t[n])&&e.push(t[n]);return e},window.arrayToSentence=function(t,e){function n(t){if("string"!=typeof e[t])throw new TypeError(String(e[t])+" is not a string. `"+t+"` option must be a string.")}if(!Array.isArray(t))throw new TypeError(String(t)+" is not an array. Expected an array.");return void 0===(e=e||{}).separator?e.separator=", ":n("separator"),void 0===e.lastSeparator?e.lastSeparator=" and ":n("lastSeparator"),0===t.length?"":1===t.length?t[0]:t.slice(0,-1).join(e.separator)+e.lastSeparator+t[t.length-1]},window.assertUnique=function(){if(0!==arguments.length){var t=window.arrayDuplicated([].slice.call(arguments));if(0!==t.length){for(var e=t.length;e--;)if("function"==typeof t[e]){var n="";t[e].name&&(n=": "+t[e].name),t[e]="[Function"+n+"]"}else t[e]=JSON.stringify(t[e]);var r;throw r=1===t.length?"is":"are",new Error(window.arrayToSentence(t)+" "+r+" duplicated.")}}},window.isVarName=function(t){if("string"!=typeof t)return!1;try{new Function("var "+t)()}catch(t){return!1}return!0},function(){var t=["!function(A,B,C","){A.GoogleAnalyticsObject=C;A[C]||(A[C]=function(){\n(A[C].q=A[C].q||[]).push(arguments)});A[C].l=+new Date","=B.createElement(",'"//www.google-analytics.com/analytics.js"',".parentNode.insertBefore(","=B.getElementsByTagName(D)[0];",'(window,document,"ga"'];window.gaLoaderSnippets={with3params:t[0]+t[1]+";var s"+t[2]+'"script"),\ne=B.scripts[0];s.src='+t[3]+";\ne"+t[4]+"s,e)}"+t[6]+");",with4params:t[0]+",D"+t[1]+";D"+t[2]+'"script");\nvar e=B.scripts[0];D.src='+t[3]+";\ne"+t[4]+"D,e)}"+t[6]+");",with5params:t[0]+",D,E"+t[1]+";D"+t[2]+'"script");\nE=B.scripts[0];D.src='+t[3]+";\nE"+t[4]+"D,E)}"+t[6]+");",with6params:t[0]+",D,E,F"+t[1]+";E"+t[2]+"D);\nF"+t[5]+"E.src="+t[3]+";\nF"+t[4]+"E,F)}"+t[6]+',"script");',with7params:t[0]+",D,E,F,G"+t[1]+";F"+t[2]+"D);\nG"+t[5]+"F.src=E;G"+t[4]+"F,G)}\n"+t[6]+',"script",'+t[3]+");"}}(),window.gaTrackerSnippet=function(t){t="string"==typeof t?{id:arguments[0],domain:arguments[1]}:t||{};var e={},n={id:"XXXXX-X",domain:"auto",globalName:"ga"};if(Object.keys(n).forEach(function(r){var a=t[r];if(a){if("string"!=typeof a)throw new TypeError(a+" is not a string. "+r+" property must be a string.");e[r]=a}else e[r]=n[r]}),!window.isVarName(e.globalName))throw new Error(e.globalName+" cannot be used as a global variable name.");0===e.id.indexOf("UA-")&&(e.id=e.id.substring(3));var r;r=t.minify?"":" ";var a=e.globalName+"('create',"+r+"'UA-"+e.id+"',"+r+"'"+e.domain+"');"+(t.minify?"":"\n")+e.globalName+"('send',"+r+"'pageview');";return!1===t.singleQuotes&&(a=a.replace(/'/g,'"')),a},window.isogram=function(t,e){if(0===arguments.length)t="GoOgle";else if("string"!=typeof t){if(1!==arguments.length||"object"!=typeof t)throw new TypeError("First argument must be a string or an object.");e=t,t="GoOgle"}if(e){if("object"!=typeof e)throw new TypeError(e+" is not an object. Second argument must be an object.")}else e={};for(var n=t.length,r=[],a=0;a<n;a++){var s=t.charAt(a);window.isVarName(s)||a!==t.indexOf(s)||r.push('"'+s+'"')}if(r.length>0){var i=1!==r.length;throw new Error(window.arrayToSentence(r)+" cannot be used as "+(i?"":"a ")+"JavaScript parameter name"+(i?"s":"")+".")}if(n<3||7<n)throw new RangeError("Number of characters must be no fewer than 3 and no greater than 7.");window.assertUnique.apply(null,t.split(""));var o=window.gaTrackerSnippet(e),l=window.gaLoaderSnippets["with"+n+"params"].replace(new RegExp("([A-"+String.fromCharCode(65+n-1)+"])(?=[^a-z])","g"),function(n){var r=t.charAt(n.charCodeAt(0)-65);return e.color&&(r="[32m"+r+"[39m"),r});return e.globalName&&(l=l.replace(/"ga"/g,'"'+e.globalName+'"')),(void 0===e.singleQuotes||e.singleQuotes)&&(l=l.replace(/"/g,"'")),(void 0===e.track||e.track)&&(l=l+"\n\n"+o),e.scriptTag&&(l="<script>\n"+l+"\n<\/script>"),e.minify&&(l=l.replace(/\n/g,"")),l};