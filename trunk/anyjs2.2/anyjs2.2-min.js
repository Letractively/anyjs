/*
 * Anyjs JavaScript Toolkit v2.2 
 * http://anyjs.googlecode.com/
 * Description: Contains many usual functions for web devolepment.
 * Copyright 2010, ENimo
 * Released under the MIT Licenses.
 * http://www.anymoore.com
 *
 * Date: May 15  2010
 */
(function(){var b=window.$=anyjs=function(){return new a(arguments)};anyjs.version="v 2.2";anyjs.temp=false;var a=function(o){this.elements=[];this.anyOk=(document.getElementById&&document.createElement&&Array.prototype.push);for(var f=0;f<o.length;f++){var g=o[f],c=[],l=[],k,n=[],h=[];if(typeof g==="string"){if(g.indexOf("#")>=0){if(g.indexOf(" ")>=0){c=g.split(" ");k=document.getElementById(c[0].split("#")[1]);if(k){l=k.getElementsByTagName(c[1]);for(var d=0;d<l.length;d++){this.elements.push(l[d])}}else{alert("??????"+c[0].split("#")[1]+"??????ID")}}else{k=document.getElementById(g.split("#")[1]);if(k){this.elements.push(k)}else{alert("??????"+g.split("#")[1]+"??????ID")}}}else{if(g.indexOf(".")>=0){if(g.split(".")[0]==""){alert("????????????????????????????????????????????????")}if(g.indexOf(" ")>=0){c=g.split(" ");n=document.getElementsByTagName(c[0].split(".")[0]);for(var d=0;d<n.length;d++){if(n[d].className==c[0].split(".")[1]){h=n[d].getElementsByTagName(c[1]);for(var e=0;e<h.length;e++){this.elements.push(h[e])}}}}else{n=document.getElementsByTagName(g.split(".")[0]);for(var d=0;d<n.length;d++){if(n[d].className==g.split(".")[1]){this.elements.push(n[d])}}}}else{n=document.getElementsByTagName(g);for(var e=0;e<n.length;e++){this.elements.push(n[e])}}}}else{this.elements.push(g)}}};a.prototype={hov:function(d,c){return this.msover(d).msout(c)},click:function(c){var d=this;this.each(function(e){d.addEvent(e,"click",c)});return this},msover:function(c){var d=this;this.each(function(e){d.addEvent(e,"mouseover",c)});return this},msout:function(c){var d=this;this.each(function(e){d.addEvent(e,"mouseout",c)});return this},msmv:function(c){var d=this;this.each(function(e){d.addEvent(e,"mousemove",c)});return this},blur:function(c){var d=this;this.each(function(e){d.addEvent(e,"blur",c)});return this},focus:function(c){var d=this;this.each(function(e){d.addEvent(e,"focus",c)});return this},change:function(c){var d=this;this.each(function(e){d.addEvent(e,"change",c)});return this},submit:function(c){var d=this;this.each(function(e){d.addEvent(e,"submit",c)});return this},load:function(d){var c=this.elements[0]==undefined?window:this.elements[0];return this.addEvent(c,"load",d)},keypress:function(d){var c=this.elements[0]==undefined?document:this.elements[0];return this.addEvent(c,"keypress",d)},keyup:function(d){var c=this.elements[0]==undefined?document:this.elements[0];return this.addEvent(c,"keyup",d)},cs:function(d,c){this.each(function(e){if(d=="opacity"){e.style.filter="alpha(opacity="+parseInt(c*100)+")";e.style.opacity=c}else{e.style[d]=c}});return this},show:function(){var c=this;this.each(function(){c.cs("display","block")});return this},hide:function(){var c=this;this.each(function(){c.cs("display","none")});return this},get:function(d){var c=d==undefined?"value":d;if(d=="html"||d=="h"){return this.elements[0].innerHTML}return this.elements[0].getAttribute(c)},set:function(c,d){this.each(function(e){if(c=="html"||c=="h"){e.innerHTML=d}else{if(c=="class"){e.className=d}else{e.setAttribute(c,d)}}});return this},h:function(d){var c=this;this.each(function(){c.set("h",d)});return this},apd:function(c){return this.elements[0].appendChild(c)},ist:function(c){if(this.elements[0].firstChild){return this.elements[0].insertBefore(c,this.elements[0].firstChild)}else{return this.elements[0].appendChild(c)}},rmv:function(){if(this.elements){for(var c=0;c<this.elements.length;c++){this.elements[c].parentNode.removeChild(this.elements[c])}}return null},fout:function(){var c=this,d=100;if(anyjs.temp!=null){clearInterval(anyjs.temp)}anyjs.temp=setInterval(function(){d-=5;c.cs("opacity",(d/100));if(d==0){clearInterval(anyjs.temp);anyjs.temp=null;c.hide()}},1)},fin:function(){var d=1,c=this;if(anyjs.temp!=null){clearInterval(anyjs.temp)}c.cs("opacity",(0.01));c.show();anyjs.temp=setInterval(function(){d+=5;c.cs("opacity",(d/100));if(d==100){clearInterval(anyjs.temp);anyjs.temp=null}},1)},each:function(d){for(var c=0;c<this.elements.length;c++){d.call(this,this.elements[c])}return this},addEvent:function(f,e,c){if(f.addEventListener){f.addEventListener(e,c,false);return true}else{if(f.attachEvent){var d=f.attachEvent("on"+e,c);return d}else{f["on"+e]=c}}},removeEvent:function(d,e,c){if(d.removeEventListener){d.removeEventListener(e,c,false)}else{if(d.events&&d.events[e]){delete d.events[e]}}}};anyjs.x=function(e,h,c,d,f){c=c?"GET":c;f=f?f:"HTML";d=(d!=undefined?document.getElementById(d):"");var i="??????????????????????????????...";var g="??????????????????????????????...";var k="??????????????????????????????...";var j="????????????????????????????????????";if(!window.XMLHttpRequest){XMLHttpRequest=function(){return new ActiveXObject("Microsoft.XMLHTTP")}}var l=new XMLHttpRequest;if(l){l.open(c,e,true);l.onreadystatechange=function(){if(l.readyState==1){d.innerHTML=i}else{if(l.readyState==2){d.innerHTML=g}else{if(l.readyState==3){d.innerHTML=k}else{if(l.readyState==4){if(l.status==200){if(f=="XML"||f=="xml"){h(l.responseXML)}else{h(l.responseText)}}else{d.innerHTML=j}}}}}};l.send(null)}else{alert("?????????????????????")}};anyjs.create=function(c){if(document.createElement){return document.createElement(c)}}})();var $$=function(){return(typeof arguments[0])=="string"?document.getElementById(arguments[0]):"null"};function createCookie(c,d,e){if(e){var b=new Date();b.setTime(b.getTime()+(e*24*60*60*1000));var a="; expires="+b.toGMTString()}else{var a=""}document.cookie=c+"="+d+a+"; path=/"}function readCookie(b){var e=b+"=";var a=document.cookie.split(";");for(var d=0;d<a.length;d++){var f=a;while(f.charAt(0)==" "){f=f.substring(1,f.length)}if(f.indexOf(e)==0){return f.substring(e.length,f.length)}}return null}function eraseCookie(a){createCookie(a,"",-1)};