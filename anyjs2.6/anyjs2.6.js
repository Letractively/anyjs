/*!
 * Anyjs JavaScript Toolkit v2.6
 * http://anyjs.googlecode.com/
 * Description: Contains many usual functions for web devolepment.
 * Copyright 2010, ENimo
 * Released under the MIT Licenses.
 * http://www.anymoore.com
 *
 * Date: May 24  2010
 */
(function(){
var $=window.$=anyjs=function(){ //anyjs内部使用
   return new _ANY(arguments);
};
anyjs.version="2.6";
anyjs.ie = !-[1,]; //7字节,IE与标准浏览器在处理数组的toString方法的差异,标准浏览器自动提取数组结尾逗号
anyjs.temp=false;  //global temp var
anyjs.globalval=[];
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
					//else alert("没有"+sp[0].split("#")[1]+"这个ID");
				}
				else{ //only #id
				ip=document.getElementById(element.split("#")[1]);
				if(ip) this.elements.push(ip); //else alert("没有"+element.split("#")[1]+"这个ID");
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
   //return this.elements[0];  //1 $("id").innerHTML 不行不能当对象用 2 //不能返回值 3 直接由新建时执行构造函数 FF
};//end function _ANY()

_ANY.prototype ={		//向_ANY的prototype属性上添加方法
/* 	init: function(){
		return this.elements;
	}, */
	/****鼠标事件****/
	hov: function(fn1,fn2){ //已测试通过Trident,Webkit,Geckos
	return this.msover(fn1).msout(fn2);
	},
	click: function(fn){ //已测试通过Trident,Webkit,Geckos
			var that=this;
	        this.each(function(el){
			 that.addEvent(el,'click',fn);
			});
			return this;	
	},
	msover: function(fn){ //已测试通过Trident,Webkit,Geckos
			var that=this;
	        this.each(function(el){
			 that.addEvent(el,'mouseover',fn);
			});
			return this;	
	},
	msout: function(fn){ //已测试通过Trident,Webkit,Geckos
			var that=this;
	        this.each(function(el){
			 that.addEvent(el,'mouseout',fn);
			});
			return this;	
	},
	msmv: function(fn){ //已测试通过Trident,Webkit,Geckos
			var that=this;
	        this.each(function(el){
			 that.addEvent(el,'mousemove',fn);
			});
			return this;	
	},
 	toggle: function(fn1,fn2){ //目前不可用
			var that=this,id=this.elements[0].id;//怀疑是否事件冒泡引起的问题，因只调用一次
			if(anyjs.globalval[id+'togglefunc']==undefined||anyjs.globalval[id+'togglefunc']==fn2) 
				{anyjs.globalval[id+'togglefunc']=fn2;that.rmvEvent(this.elements[0],'click');}
			else {anyjs.globalval[id+'togglefunc']=fn2;that.rmvEvent(this.elements[0],'click');}
			alert("只在初始化的时候调用了一次"+anyjs.globalval[id+'togglefunc']);
			//return that.addEvent(this.elements[0],'click',anyjs.globalval[id+'togglefunc']);
/* 			if(!anyjs.temp){anyjs.temp=true;
	        this.each(function(el){
			return that.addEvent(el,'click',fn1);
			});}
			else{anyjs.temp=false;
			this.each(function(el){
			return that.addEvent(el,'click',fn2);
			}); 
			}  */
			//return this.click(fn1).click(fn2);	
	}, 
	/****表单事件****/
	blur: function(fn){ //已测试通过Trident,Webkit,Geckos
			var that=this;
	        this.each(function(el){
			 that.addEvent(el,'blur',fn);
			});
			return this;	
	},
	focus: function(fn){ //已测试通过Trident,Webkit,Geckos
			var that=this;
	        this.each(function(el){
			 that.addEvent(el,'focus',fn);
			});
			return this;	
	},
	change: function(fn){ //已测试通过Trident,Webkit,Geckos
			var that=this;
	        this.each(function(el){
			 that.addEvent(el,'change',fn);
			});
			return this;	
	},
	submit: function(fn){ //已测试通过Trident,Webkit,Geckos
			var that=this;
	        this.each(function(el){
			 that.addEvent(el,'submit',fn);
			});
			return this;	
	},
	/****窗口事件****/
	load: function(fn){ //已测试通过Trident,Webkit,Geckos //仅适用于image,iframe,page,默认为 window.onload
			var el=this.elements[0]==undefined?window: this.elements[0];
			return this.addEvent(el,'load',fn);
	},
	/****键盘事件****/
	keypress: function(fn){ //已测试通过Trident,Webkit,Geckos,参数为OBJ,默认为document.onkeypress //document通用,window在IE下不可用,body在FF下不可用
			var el=this.elements[0]==undefined?document: this.elements[0];
			return this.addEvent(el,'keypress',fn);	
	},
	keyup: function(fn){ 
			var el=this.elements[0]==undefined?document: this.elements[0];
			return this.addEvent(el,'keyup',fn);
	},
	/****常用DOM操作方法****/  //获取值时没return this,因为return value嘛，故链式操作终结，注意注意
    cs:function(prop,val){ //已测试通过Trident,Webkit,Geckos
		if(val==undefined) { //此时参数只能是ID值，如$("#id"),同.get(),不能$("div.class"),$("p")
		  var val=this.elements[0];
		  if (val.currentStyle){return parseInt(val.currentStyle[prop]);//IE下
		  }else{return parseInt(window.getComputedStyle(val,null)[prop]);} 	//支持W3C
		}
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
    show:function(){ //已测试通过Trident,Webkit,Geckos
    var that=this;
        this.each(function(){
        that.cs("display","block");
        })
    return this;
     },
	hide: function(){ //已测试通过Trident,Webkit,Geckos
    var that=this;
        this.each(function(){
        that.cs("display","none");
        })
    return this;
     },
	get: function(str){//已测试通过Trident,Webkit,Geckos //此时参数唯一//在IE下可以获取动态value值FF,chrome下失效，需用$$().value代替
		var attr=str==undefined?"value": str;
		 if(str=="html"||str=="h") return this.elements[0].innerHTML;
		 if(str=="class") return this.elements[0].className;
		return this.elements[0].getAttribute(attr);
	},
	set:function(attr,val){ //setattribute 已测试通过Trident,Webkit,Geckos
        this.each(function(el){
			if(attr== 'html'||attr=="h"){
				el.innerHTML = val;
			}else if(attr== 'class') //为了兼容IE加入
				{el.className=el.className+(el.className==""?"":" ")+val;}//解决前一个class为空时多出空格，影响美观
			else
				{el.setAttribute(attr,val);}
        });
    return this;
    },
	rmvcls:function(clsname){ //测试通过Trident,Webkit,Geckos
        this.each(function(el){
			el.className=el.className.replace(clsname,"");
        });
    return this;
    },
	h: function(data){ //已测试通过Trident,Webkit,Geckos
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
	/****一些常用效果****/
	fout: function(){ 
		//已测试通过Trident,Webkit,Geckos   会出现闪屏 未解决 
		//经测试，可以被调用 ，但是不能修改其值，
		//经验证，每次调用$后,都会将this.temp的值重置为初始值，最外层设置全局变量
		//OK,问题解决，包括闪屏
	 var that=this,opval=100;
	 if(anyjs.temp!=null) clearInterval(anyjs.temp);
	 anyjs.temp=setInterval(function(){opval-=5;that.cs("opacity",(opval/100));if(opval<=0) {clearInterval(anyjs.temp); anyjs.temp=null; that.hide();}},10);
	 },
	fin: function(){ //已测试通过Trident,Webkit,Geckos
	 //alert("ag");
	 var opval=1,that=this; //这里不同sin(),勿需函数保护,闪屏可用作提示
	 if(anyjs.temp!=null) clearInterval(anyjs.temp);
	 that.cs("opacity",(0.05));
	 that.show();
	 anyjs.temp=setInterval(function(){opval+=5;that.cs("opacity",(opval/100));if(opval>=100){clearInterval(anyjs.temp);anyjs.temp=null;} },10);
	 },
	sout: function(speed,direct){ 
	 speed=(speed==undefined?5: speed);
	 direct=(direct==undefined?"height": direct);
	 var that=this,val=that.cs(direct),id=this.elements[0].id;
	 if(val==0) return false;//为零时，跳出，防报错
	 if(anyjs.globalval[id+'slide']==undefined) anyjs.globalval[id+'slide']=val;//防止反复点击时，val的原始值被篡改//alert(id+val+anyjs.globalval[id+'slide']);
	 if(anyjs.temp!=null) clearInterval(anyjs.temp);
	 anyjs.temp=setInterval(function(){val-=speed;that.cs(direct,val+"px");if(val<=0) {clearInterval(anyjs.temp); anyjs.temp=null; that.hide();}},10);
	 },
 	sin: function(speed,direct){ 
	 var that=this,val=0;id=this.elements[0].id;//alert(id+anyjs.globalval[id+'slide']);
	 if(anyjs.globalval[id+'slide']==undefined) return false;//函数保护，当未执行sout()时，此操作将无效，否则呵呵需注意不是同一ID的情况
	 speed=(speed==undefined?5: speed);
	 direct=(direct==undefined?"height": direct);
	 if(anyjs.temp!=null) clearInterval(anyjs.temp);
	 that.cs(direct,val+"px");
	 that.show();
	 anyjs.temp=setInterval(function(){val+=speed;that.cs(direct,val+"px");if(val>=anyjs.globalval[id+'slide']) {clearInterval(anyjs.temp); anyjs.temp=null; }},10);
	 }, 
	/****内部使用方法****///可对外
	each : function(fn){ //已测试通过Trident,Webkit,Geckos 内部使用
        for(var i=0; i<this.elements.length;i++){
          fn.call(this,this.elements[i]);
        }
    return this;
    },
	addEvent: function(el,evType,fn){ //已测试通过Trident,Webkit,Geckos 内部使用
		   if (el.addEventListener) { 
			el.addEventListener(evType, fn, false); //DOM2.0 useCapture默认false,捕获+冒泡
			return true; 
		   } 
			else if (el.attachEvent) {
			el["e"+evType+fn] = fn;  
			el.attachEvent( "on"+evType, function() { el["e"+evType+fn](); } );  
			} 
	},
	rmvEvent: function(evType, fn) { //目前失效，不知为何
		this.each(function(el){
			if (el.removeEventListener) {
				el.removeEventListener(evType, fn, false);//alert("running");
			} else {
				el.detachEvent( "on"+evType, el["e"+evType+fn] );  
				el["e"+evType+fn] = null;  alert("running");
			}
		});
	//return this;
  }//end rmvEvent
};// end _ANY.prototype
anyjs.x=function(x){ //默认为method为GET，返回值可以为xml,json,html
	//url,callbackfn,method,msgid,datatype,senddata
 	x.method= (x.method ==undefined? 'GET': x.method.toUpperCase());//默认大写
	x.datatype = x.datatype ? x.datatype : 'HTML';//HTML XML
	x.msgid=(x.msgid!=undefined?document.getElementById(x.msgid): null);
	var accepts={
			xml: "application/xml, text/xml",
			html: "text/html",
			script: "text/javascript, application/javascript",
			json: "application/json, text/javascript",
			text: "text/plain",
			_default: "*/*"
		};
	if ( !window.XMLHttpRequest )
	XMLHttpRequest = function(){
		return new ActiveXObject("Microsoft.XMLHTTP");
	};
	var xhr=new XMLHttpRequest;
	if(xhr){
	var xhr_building = '请等待，正在建立连接...';
	var xhr_sending = '请等待，正在发送数据...';
	var xhr_loading = '请等待，正在接受数据...';
	var xhr_failed = '通信失败，请刷新重新尝试';
 	xhr.open(x.method,x.url,true); //open socket //asynchronous=async=true 异步(JQ default=true) 表示脚本会在 send() 方法之后继续执行，而不等待来自服务器的响应。
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');//默认即可
	xhr.setRequestHeader("Accept",x.datatype&&accepts[x.datatype]?accepts[x.datatype]+", */*" : accepts._default);
	xhr.onreadystatechange=function(){
		if(xhr.readyState == 1) {	//alert("1");
			x.msgid!=null?x.msgid.innerHTML = xhr_building:"";
		} else if(xhr.readyState == 2) {//alert("2");
			x.msgid!=null?x.msgid.innerHTML = xhr_sending:"";;
		} else if(xhr.readyState == 3) {//alert("3"); //attention:小斌学长shuo在FF下没有第三个装载状态
			x.msgid!=null?x.msgid.innerHTML = xhr_loading:"";;
		} else if(xhr.readyState == 4) {//alert("4");
			if(xhr.status == 200) {
				x.callbackfn(anyjs.dataform(xhr,x.datatype));
			}
			else {x.msgid!=null?x.msgid.innerHTML = xhr_failed:"";;}
		}
	}//end onreadystatechange
	try {
		xhr.send( x.method === "POST" || x.method === "PUT" || x.method === "DELETE" ? x.senddata : null );
		} catch(e) {} //JQ
	}else alert("该升级浏览器了");
};//end x=ajax
anyjs.dataform=function( xhr, datatype ) {
		var rhd = xhr.getResponseHeader("content-type") || "",
			 xml = datatype === "xml" || !datatype && rhd.indexOf("xml") >= 0,
			data = xml ? xhr.responseXML : xhr.responseText;
			if ( typeof data === "string" ) {
				if ( datatype === "json" || !datatype && rhd.indexOf("json") >= 0 ) {
				data = anyjs.trim( data );
			//use the native JSON parser first
			return window.JSON && window.JSON.parse ?window.JSON.parse(data):(new Function("return " + data))();
			} 
		}
		return data;
};//end
anyjs.xget=function(url,callbackfn,msgid,datatype,senddata){
			return anyjs.x({
			method: "GET",
			url: url,
			callbackfn: callbackfn,
			msgid: msgid,
			datatype: datatype,
			senddata: senddata
		});
};//end 
anyjs.post=function(url, senddata, callbackfn,msgid,datatype) {//通过G,W,T测试，跨域POST可采用webService或动态生成iframe
		return anyjs.x({
			method: "POST",
			url: url,
			senddata: senddata, //"name="+ name+"&msg="+ msg
			callbackfn: callbackfn,//POST成功后回调函数,当前必须
			msgid: msgid,
			datatype: datatype
		});
};//end
anyjs.gjson=function(url,callbackfn,msgid){//通过G,W,T测试
		return anyjs.xget(url,callbackfn,msgid,"json");
};//end 
anyjs.gxml=function(url,callbackfn,msgid){//通过G,W,T测试
		return anyjs.xget(url,callbackfn,msgid,"xml");
};//end 
anyjs.gjsonp=function(url,callbackfn){ //通过G,W,T测试//利用JSONPadding解决跨域json调用简单//IE6+,FF,(Chrome通过)
    var h=document.getElementsByTagName('head')[0];
    var s=document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', url);
    h.appendChild(s);
   if(anyjs.ie){ //IE6、IE7 支持onreadystatechange
        s.onreadystatechange = function () {
            if (s.readyState == 'loaded' || s.readyState == 'complete') {
                (callbackfn)(JSONP);
                JSONP=null;
                h.removeChild(s);
            }
        }
    } else {//FF、WEBKIT系列支持onload
        s.onload = function() {
            (callbackfn)(JSONP);
            JSONP=null;
            h.removeChild(s);
        }
    }
    return false;
};//end
anyjs.create=function(tag){ //DOM操作 //对象id需自行设定，如x.set("id","enimo");//无参调用 如$.create();
	//var tp=new _ANY("btn"); tp.in("可以调用");//实例化一个新对象，继承对象属性
	if(document.createElement) return document.createElement(tag);
};//end create
anyjs.trim=function(str){ return (str||"").replace(/(^\s+)|(\s+$)/g, "");};
//anyjs.prototype={}; //?使用原型继承时会出错，显示方法未定义
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