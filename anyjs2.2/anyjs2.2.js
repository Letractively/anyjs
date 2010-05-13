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
(function(){
var $=window.$ = anyjs = function(){ //anyjs为全局使用的变量，内部使用
   return new _ANY(arguments);
}
anyjs.version="v 2.2";
anyjs.temp=false;  //global temp var
var _ANY=function(ele){
   this.elements = [];
   this.anyOk=(document.getElementById && document.createElement && Array.prototype.push);
   //if(this.anyOk)
   for(var i=0;i<ele.length;i++){
       var element = ele[i],sp=[],fp=[],ip,tp=[],lp=[];
       if(typeof element === "string"){//id,class,tag
			if(element.indexOf("#")>=0) //alert("id"); //#id tag 只针对以下搭配 ("#id h3"),("#id"),("#id1","#id2")
		   {
				if(element.indexOf(" ")>=0){ //#id+tag
					sp=element.split(" ");
					ip=document.getElementById(sp[0].split("#")[1]);
					if(ip){
					fp=ip.getElementsByTagName(sp[1]);
					for(var m=0;m<fp.length;m++)
						this.elements.push(fp[m]);}
					else alert("没有"+sp[0].split("#")[1]+"这个ID");
				}
				else{ //only #id
				ip=document.getElementById(element.split("#")[1]);
				if(ip) this.elements.push(ip); else alert("没有"+element.split("#")[1]+"这个ID");
				}
		   }//end if indexof #
			else if(element.indexOf(".")>=0){//tag.class tag //最后还是采用tag.class,如li.class 保证速度，放弃正则表达式
				if(element.split(".")[0]=="") alert("呵呵，你貌似忘记在类前面加标签了");//标签提醒
				if(element.indexOf(" ")>=0){//tag.class+tag
					sp=element.split(" ");
					tp=document.getElementsByTagName(sp[0].split(".")[0]);
					for(var m=0;m<tp.length;m++)
						if(tp[m].className==sp[0].split(".")[1])
							{lp=tp[m].getElementsByTagName(sp[1]);
							 for(var j=0;j<lp.length;j++) this.elements.push(lp[j]);}
				}//end if tag.class+tag
				else{ //only tag.class
				tp=document.getElementsByTagName(element.split(".")[0]);//alert(element.split(".")[0]);
				for(var m=0;m<tp.length;m++)
						if(tp[m].className==element.split(".")[1])
							this.elements.push(tp[m]);				
				}//end  else	
			}// end else if indexof .
			else{ //only tag
			tp=document.getElementsByTagName(element);
			for(var j=0;j<tp.length;j++) this.elements.push(tp[j]);	
			}//end else
       }//end if string     
	   
     else  this.elements.push(element); //else !="string" 默认object

} //end for
	//alert(this.elements.join(","));
   //return this.elements[0];  //1 $("id").innerHTML 不行不能当对象用 2 //不能返回值 3 直接由新建时执行构造函数 FF
};//end function _ANY()

_ANY.prototype ={		//向_ANY的prototype属性上添加方法
	/****鼠标事件****/
	hov: function(fn1,fn2){ //已测试通过Tredent,Webkit,Geckos
	return this.msover(fn1).msout(fn2);
	},
	click: function(fn){ //已测试通过Tredent,Webkit,Geckos
			var that=this;
	        this.each(function(el){
			 that.addEvent(el,'click',fn);
			});
			return this;	
	},
	msover: function(fn){ //已测试通过Tredent,Webkit,Geckos
			var that=this;
	        this.each(function(el){
			 that.addEvent(el,'mouseover',fn);
			});
			return this;	
	},
	msout: function(fn){ //已测试通过Tredent,Webkit,Geckos
			var that=this;
	        this.each(function(el){
			 that.addEvent(el,'mouseout',fn);
			});
			return this;	
	},
	msmv: function(fn){ //已测试通过Tredent,Webkit,Geckos
			var that=this;
	        this.each(function(el){
			 that.addEvent(el,'mousemove',fn);
			});
			return this;	
	},
/* 	toggle: function(fn1,fn2){ //目前不可用
			var that=this;
			alert("只在初始化的时候调用了一次");
			if(!anyjs.temp){anyjs.temp=true;
	        this.each(function(el){
			return that.addEvent(el,'click',fn1);
			});}
			else{anyjs.temp=false;
			this.each(function(el){
			return that.addEvent(el,'click',fn2);
			}); 
			} 
			//return this.click(fn1).click(fn2);	
	}, */
	/****表单事件****/
	blur: function(fn){ //已测试通过Tredent,Webkit,Geckos
			var that=this;
	        this.each(function(el){
			 that.addEvent(el,'blur',fn);
			});
			return this;	
	},
	focus: function(fn){ //已测试通过Tredent,Webkit,Geckos
			var that=this;
	        this.each(function(el){
			 that.addEvent(el,'focus',fn);
			});
			return this;	
	},
	change: function(fn){ //已测试通过Tredent,Webkit,Geckos
			var that=this;
	        this.each(function(el){
			 that.addEvent(el,'change',fn);
			});
			return this;	
	},
	submit: function(fn){ //已测试通过Tredent,Webkit,Geckos
			var that=this;
	        this.each(function(el){
			 that.addEvent(el,'submit',fn);
			});
			return this;	
	},
	/****窗口事件****/
	load: function(fn){ //已测试通过Tredent,Webkit,Geckos //仅适用于image,iframe,page,默认为 window.onload
			var el=this.elements[0]==undefined?window: this.elements[0];
			return this.addEvent(el,'load',fn);
	},
	/****键盘事件****/
	keypress: function(fn){ //已测试通过Tredent,Webkit,Geckos,参数为OBJ,默认为document.onkeypress //document通用,window在IE下不可用,body在FF下不可用
			var el=this.elements[0]==undefined?document: this.elements[0];
			return this.addEvent(el,'keypress',fn);	
	},
	keyup: function(fn){ 
			var el=this.elements[0]==undefined?document: this.elements[0];
			return this.addEvent(el,'keyup',fn);
	},
	/****常用DOM操作方法****/
    cs:function(prop,val){ //已测试通过Tredent,Webkit,Geckos
        this.each(function(el){
			if(prop == 'opacity'){
				el.style.filter = "alpha(opacity=" + parseInt(val*100) + ")";
				el.style.opacity = val;
			}else{
			el.style[prop]=val;
			}
        });
    return this;
    },
    show:function(){ //已测试通过Tredent,Webkit,Geckos
    var that=this;
        this.each(function(){
        that.cs("display","block");
        })
    return this;
     },
	hide: function(){ //已测试通过Tredent,Webkit,Geckos
    var that=this;
        this.each(function(){
        that.cs("display","none");
        })
    return this;
     },
	get: function(str){//已测试通过Tredent,Webkit,Geckos obj对象只可一个
		var attr=str==undefined?"value": str;
		 if(str=="html"||str=="h") return this.elements[0].innerHTML;
		return this.elements[0].getAttribute(attr);
	},
	set:function(attr,val){ //setattribute 已测试通过Tredent,Webkit,Geckos
        this.each(function(el){
			if(attr== 'html'||attr=="h"){
				el.innerHTML = val;
			}else if(attr== 'class') //为了兼容IE加入
				{el.className=val;}
			else
				{
			el.setAttribute(attr,val);
			}
        });
    return this;
    },
	h: function(data){ //已测试通过Tredent,Webkit,Geckos
		var that=this;
        this.each(function(){
        that.set("h",data);
        })
    return this;
     },
	apd: function(childid){//appendto 放在obj内最末尾 obj对象只可一个
		return this.elements[0].appendChild(childid);
	},
	ist: function(childid){//insertbefore 放在obj内最前端
	if (this.elements[0].firstChild) 
			return this.elements[0].insertBefore(childid, this.elements[0].firstChild);
	else  return this.elements[0].appendChild(childid);
	},
	rmv: function(){//removenode $(obj) obj对象本身移除 obj对象可多个
		if(this.elements)
		for(var i=0;i<this.elements.length;i++) this.elements[i].parentNode.removeChild(this.elements[i]);
		return null;
	},
	fout: function(){ 
		//已测试通过Tredent,Webkit,Geckos   会出现闪屏 未解决 
		//经测试，可以被调用 ，但是不能修改其值，
		//经验证，每次调用$后,都会将this.temp的值重置为初始值，最外层设置全局变量
		//OK,问题解决，包括闪屏
	 var that=this,opval=100;
	 if(anyjs.temp!=null) clearInterval(anyjs.temp);
	 anyjs.temp=setInterval(function(){opval-=5;that.cs("opacity",(opval/100));if(opval==0) {clearInterval(anyjs.temp); anyjs.temp=null; that.hide();}},1);
	 },
	 fin: function(){ //已测试通过Tredent,Webkit,Geckos
	 var opval=1,that=this;
	 if(anyjs.temp!=null) clearInterval(anyjs.temp);
	 that.cs("opacity",(0.01));
	 that.show();
	 anyjs.temp=setInterval(function(){opval+=5;that.cs("opacity",(opval/100));if(opval==100){clearInterval(anyjs.temp);anyjs.temp=null;} },1);
	 },

	/****内部使用方法****/
	each : function(fn){ //已测试通过Tredent,Webkit,Geckos 内部使用
        for(var i=0; i<this.elements.length;i++){
          fn.call(this,this.elements[i]);
        }
    return this;
    },
	addEvent: function(elm,evType,fn){ //已测试通过Tredent,Webkit,Geckos 内部使用
		   if (elm.addEventListener) { 
			elm.addEventListener(evType, fn, false);//DOM2.0 
			return true; 
		   } 
			else if (elm.attachEvent) { 
			var r = elm.attachEvent('on' + evType, fn);//IE5+ 
			return r; 
		   } 
			else { 
			elm['on' + evType] = fn;//DOM 0 
			} 
	},
	removeEvent: function(ele, evtype, handler) { //已测试通过Tredent,Webkit,Geckos 内部使用
	if (ele.removeEventListener) {
		ele.removeEventListener(evtype, handler, false);
	} else {
		if (ele.events && ele.events[evtype]) {
			delete ele.events[evtype];
		}
	}
  }
};// end _ANY.prototype
anyjs.x=function(url,callbackfn,method,msgid,datatype){ //默认为method为GET，返回值可以为xml,json,html
 	method= method ? 'GET': method;
	datatype = datatype ? datatype : 'HTML';//HTML XML
	msgid=(msgid!=undefined?document.getElementById(msgid):"");
	var xhr_building = '请等待，正在建立连接...';
	var xhr_sending = '请等待，正在发送数据...';
	var xhr_loading = '请等待，正在接受数据...';
	var xhr_failed = '通信失败，请刷新重新尝试';
	if ( !window.XMLHttpRequest )
	XMLHttpRequest = function(){
		return new ActiveXObject("Microsoft.XMLHTTP");
	};
	var xhr=new XMLHttpRequest;
	if(xhr){
 	xhr.open(method,url,true); //asynchronous=async=true 异步 表示脚本会在 send() 方法之后继续执行，而不等待来自服务器的响应。
	xhr.onreadystatechange=function(){
		if(xhr.readyState == 1) {	//alert("1");
			msgid.innerHTML = xhr_building;
		} else if(xhr.readyState == 2) {//alert("2");
			msgid.innerHTML = xhr_sending;
		} else if(xhr.readyState == 3) {//alert("3"); //attention:小斌学长shuo在FF下没有第三个装载状态
			msgid.innerHTML = xhr_loading;
		} else if(xhr.readyState == 4) {//alert("4");
			if(xhr.status == 200) {
				if(datatype=="XML"||datatype=="xml") {callbackfn(xhr.responseXML);}
				else callbackfn(xhr.responseText);
			}
			else {msgid.innerHTML = xhr_failed;}
		}
	}//end onreadystatechange
	//xhr.setRequestHeader("Cache-Control","no-cache"); 
	//xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');//post
	xhr.send(null); 
	//return xhr; 
	}else alert("该升级浏览器了");
};//end x=ajax
anyjs.create=function(tag){ //DOM操作 //对象id需自行设定，如x.set("id","enimo");//无参调用 如$.create();
	//alert(typeof tag);
		if(document.createElement) return document.createElement(tag);
};//end create

})();//匿名函数结束

//弥补函数 暂时需要弥补
var $$=function(){return (typeof arguments[0])=="string"?document.getElementById(arguments[0]):"null";}
//创建Cookie记录,来自PPK
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
}
//读取Cookie记录			
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca;
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
}
//清除Cookie记录		
function eraseCookie(name) {
	createCookie(name,"",-1);
}