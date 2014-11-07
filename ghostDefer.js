// JavaScript Document
(function(w,d,fn){
	var events = {
			onload:[],
			onfinish:[]	
		},
		scripts = [];
	function addReady(el,callback,par){
		var fired = false,
			ready = function(){
				if(!fired){
					fired =true;
					callback(par);
				}
			},
			readyState = function(){
				if(el.readyState == "complete")
					ready()
			};
			
		if(el.addEventListener){
			el.addEventListener('DOMContentLoaded',ready);
			el.addEventListener('onload',ready);
		}else{
			el.attachEvent('onreadystatechange',readyState);
			el.attachEvent('onload',ready);	
		}
			
	}
	function addEvents(name,fn){
		if(typeof fn === "function"){
			events[name].push(fn);
		}
	}
	
	function triggerEvent(name){
		for(var i in events[name])
			events[name][i]() // trigger event
	}
	function createElement(source){
		var el;
		if( (/.js$/).test(source) ){
			el = d.createElement('script');
			el.src = source;	
		}else{
			el = d.createElement('link');
			el.rel = "stylesheet";
			el.href = source;	
		}
		
		return el;
	}

	function addScript(p){ // parameter should be an array
		for(var i in p)
			scripts.push(p[i]);
		return this;
	}
	function loadChildren(i){
		if(scripts[i].children){

		}
	}
	function run(){
		triggerEvent('onload'); //trigger event onload before scripts are loaded

		for(var i in scripts){
			if(scripts[i].d){
				var source = scripts[i].s || scripts[i]; // check if script is object and get its source url
				var el = createElement(source);
				addReady(el,loadChildren,i);
			}
		}
	}
	
})(window,document,'ghostDefer');