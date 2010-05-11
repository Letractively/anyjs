/**
 * Description:Anymoore all rights reserved.
 * Author:ENimo
 * www.anymoore.com
 *	
 **/

 (function(){
  function _ANY(ele){
   this.elements = [];
   for(var i=0;i<ele.length;i++){
       var element = ele[i];
       if(typeof element === "string"){
           element = document.getElementById(element);
       }
      this.elements.push(element);
	   //alert(elements.join(","));
   }
}
//向_ANY的prototype属性上添加方法
_ANY.prototype ={
    each : function(fn){
        for(var i=0; i<this.elements.length;i++){
          fn.call(this,this.elements[i]);
        }
    return this;
    },
	toggle: function(fn1,fn2){ //目前不可用
			return this;
	},
	hov: function(fn1,fn2){
	return this.msover(fn1).msout(fn2);
	},
	click: function(fn){
			var that=this;
	        this.each(function(el){
			 that.addEvent(el,'click',fn);
			});
			return this;	
	},
 	dbclick: function(fn){
			var that=this;
	        this.each(function(el){
			 that.addEvent(el,'dblclick',fn);
			});
			return this;	
	}, 
	msover: function(fn){
			var that=this;
	        this.each(function(el){
			 that.addEvent(el,'mouseover',fn);
			});
			return this;	
	},
	msout: function(fn){
			var that=this;
	        this.each(function(el){
			 that.addEvent(el,'mouseout',fn);
			});
			return this;	
	},
    cs:function(prop,val){
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
    show:function(){
    var that=this;
        this.each(function(){
        that.cs("display","block");
        })
    return this;
     },
	hide: function(){
    var that=this;
        this.each(function(){
        that.cs("display","none");
        })
    return this;
     },
	get: function(str){
		var attr=str==undefined?"value": str;
		 if(str=="html"||str=="h") return this.elements[0].innerHTML;
		return this.elements[0].getAttribute(attr);
	},
	set:function(attr,val){
        this.each(function(el){
			if(attr== 'html'||attr=="h"){
				el.innerHTML = val;
			}else{
			el.setAttribute(attr,val);
			}
        });
    return this;
    },
	 fout: function(){
	 var opval=100,that=this;
	 t=setInterval(function(){opval-=5;that.cs("opacity",(opval/100));if(!opval) {clearInterval(t); t=null; that.hide();}},1);
	 },
	 fin: function(){
	 var opval=1,that=this;
	 that.show();
	 t=setInterval(function(){opval+=5;that.cs("opacity",(opval/100));if(opval==100){clearInterval(t);t=null;} },1);
	 },
	 addEvent: function(elm,evType,fn){
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
	removeEvent: function(ele, evtype, handler) {
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