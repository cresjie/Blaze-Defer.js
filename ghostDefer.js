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
			load(scripts[i]);
		}
	}
	function load(par){ // parameter is a script
		for(var i in par){
			if(!par[i].d){ // if script is independent
				var source = par[i].s || par[i]; // check if script is object and get its source url
				var el = createElement(source);
				addReady(el,function(par_i){
					if(par[par_i].cb)
						par[par_i].cb(); // trigger callback function
					loadChildren(par_i);
				},i);
				d.querySelector('head').appendChild(el);
			}
		}

	}
	function run(){
		triggerEvent('onload'); //trigger event onload before scripts are loaded
		load(scripts);
		
	}
	
	//contructor execute
	addReady(d,run);

})(window,document,'ghostDefer');