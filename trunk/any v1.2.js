/**
The MIT License
Copyright (c) <2010> <enimong@gmail.com> <ENimo Luo>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
 **/

 (function(){
  function _ANY(ele){
   this.elements = [];
   this.anyOk=(document.getElementById && document.createElement && Array.prototype.push);
   for(var i=0;i<ele.length;i++){
       var element = ele[i];
       if(typeof element === "string"){
           element = document.getElementById(element);
		   //alert(element);
       }
	   //else if(typeof element==="object") element =
      this.elements.push(element);
	   //alert(elements.join(","));
   }
  // return this;
   //return this.elements[0];  //1 $("id").innerHTML 不行不能当对象用 2 //不能返回值 3 直接由新建时执行构造函数 FF
}
//向_ANY的prototype属性上添加方法
_ANY.prototype ={
    each : function(fn){ //已测试 内部使用
        for(var i=0; i<this.elements.length;i++){
          fn.call(this,this.elements[i]);
        }
    return this;
    },
	toggle: function(fn1,fn2){ //目前不可用
	that=this;
	//alert(document.getElementById("hiddenval").value);
/* 	if(document.getElementById("hiddenval").value)
		{	document.getElementById("hiddenval").value="0";
		        this.each(function(el){
			 that.addEvent(el,'click',fn1);
				});
			}
			else
		{
				document.getElementById("hiddenval").value="1";
				  this.each(function(el){
			 that.addEvent(el,'click',fn2);});
			} */
/* 				var that=this;
				if(tg){tg=false;
	        this.each(function(el){
			 that.addEvent(el,'click',fn1);
			});}
			else{tg=true;
			        this.each(function(el){
			 that.addEvent(el,'click',fn2);
			});} */
			return this;
			//return this.click(fn1).click(fn2);	
	
	},
	hov: function(fn1,fn2){ //已测试
	return this.msover(fn1).msout(fn2);
	},
	click: function(fn){ //已测试
			var that=this;
			//alert(document.getElementById("hiddenval").value);
	        this.each(function(el){
			 that.addEvent(el,'click',fn);
			});
			return this;	
	},
/* 	dbclick: function(fn){
			var that=this;
	        this.each(function(el){
			 that.addEvent(el,'dblclick',fn);
			});
			return this;	
	}, */
	msover: function(fn){ //已测试
			var that=this;
	        this.each(function(el){
			 that.addEvent(el,'mouseover',fn);
			});
			return this;	
	},
	msout: function(fn){ //已测试
			var that=this;
	        this.each(function(el){
			 that.addEvent(el,'mouseout',fn);
			});
			return this;	
	},
    cs:function(prop,val){ //已测试
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
    show:function(){ //已测试
    var that=this;
        this.each(function(){
        that.cs("display","block");
        })
    return this;
     },
	hide: function(){ //已测试
    var that=this;
        this.each(function(){
        that.cs("display","none");
        })
    return this;
     },
	get: function(str){//已测试 obj对象只可一个
		var attr=str==undefined?"value": str;
		 if(str=="html"||str=="h") return this.elements[0].innerHTML;
		return this.elements[0].getAttribute(attr);
	},
	create: function(tag){ //对象id需自行设定，如x.set("id","enimo");
		if(document.createElement)
		{x=document.createElement(tag); //alert(this.elements[0]);
			//x.id=this.elements[0];
			}
		return x;
	},
	apd: function(childid){//appendto 放在obj内最末尾 obj对象只可一个
		return this.elements[0].appendChild(childid);
	},
	ist: function(childid){//insertbefore 放在obj内最前端
	if (this.elements[0].firstChild) 
		return this.elements[0].insertBefore(childid, this.elements[0].firstChild);
	else return this.elements[0].appendChild(childid);
	},
	rmv: function(){//removenode $(obj) obj对象本身移除 obj对象只可一个
		if(this.elements[0])
		return this.elements[0].parentNode.removeChild(this.elements[0]);
		return;
	},
	set:function(attr,val){ //setattribute 已测试
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
	 fout: function(){ //已测试
	 var opval=100,that=this;
	 t=setInterval(function(){opval-=5;that.cs("opacity",(opval/100));if(!opval) {clearInterval(t); t=null; that.hide();}},1);
	 },
	 fin: function(){ //已测试
	 var opval=1,that=this;
	 that.show();
	 t=setInterval(function(){opval+=5;that.cs("opacity",(opval/100));if(opval==100){clearInterval(t);t=null;} },1);
	 },
	 addEvent: function(elm,evType,fn){ //已测试 内部使用
		//if(elm=!null)
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
	removeEvent: function(ele, evtype, handler) { //已测试 内部使用
	if (ele.removeEventListener) {
		ele.removeEventListener(evtype, handler, false);
	} else {
		if (ele.events && ele.events[evtype]) {
			delete ele.events[evtype];
		}
	}
}
}

var $=any=window.$ = function(){
   return new _ANY(arguments);
}
})();