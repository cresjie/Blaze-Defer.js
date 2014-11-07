(function(w,d,fn){
	var events = {
			onload:[],
			onfinish:[]	
		},
		scripts = [],
		loadedScripts = {};
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
	function addEvent(name,fn){
		if(typeof fn === "function"){
			events[name].push(fn);
		}
		return this;
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

	function addScripts(p){ // parameter should be an array
		for(var i in p)
			scripts.push(p[i]);
		return this;
	}
	function loadChildren(i){
		if(scripts[i].children){
			load(scripts[i]);
		}
	}
	function load(script){ // parameter is a script
		for(var i in script){
			if(!script[i].d){ // if script is independent
				var source = script[i].s || script[i]; // check if script is object and get its source url
				var el = createElement(source);
				addReady(el,function(index){
					if(script[index].cb)
						script[index].cb(); // trigger callback function
					loadChildren(index);
				},i);
				d.querySelector('head').appendChild(el);

				if(script.name)
					loadedScripts[name] = true; // register the loaded script by its name
			}
		}

	}
	function run(){
		triggerEvent('onload'); //trigger event onload before scripts are loaded
		load(scripts);
		triggerEvent('onfinish');
	}
	
	//contructor execute
	addReady(d,run); //when document is ready execute function run

	w[fn] =  {
		addEvent:addEvent,
		addScripts:addScripts
	};

})(window,document,'ghostDefer');