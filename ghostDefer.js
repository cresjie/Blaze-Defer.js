(function(w,d,fn){
	var events = {
			onload:[],
			onfinish:[]	
		},
		scripts = [],
		independentScripts = [],
		dependentScript = {},
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

	function  load(){
		for(var i in scripts){
			if(!scripts[i].d){ // if script is independent
				loadScript(scripts[i]);
				
			}
		}
	}

	function loadDepend(name){
		for(var i in scripts){

			if(scripts[i].d){

				if(scripts[i].d == name){
					if(scripts[i].f)
						scripts[i].f();
					else
					loadScript(script[i]);
				}
			}
		}
		
	}

	function loadScript(script){
		var source = scripts[i].s || scripts[i]; // check if scripts is object or string
				var el = createElement(source);

				addReady(el,function(index){
					if(scripts[index].cb)
						scripts[index].cb();
					if(scripts[index].name)
						loadDependent(scripts[index].name);
				},i);

		d.querySelector('head').appendChild(el);

	}
	function run(){
		triggerEvent('onload'); //trigger event onload before scripts are loaded
		
		triggerEvent('onfinish');
	}
	 
	//contructor execute
	addReady(d,run); //when document is ready execute function run

	w[fn] =  {
		addEvent:addEvent,
		addScripts:addScripts
	};

})(window,document,'ghostDefer');

function separateScript(){

	for(var i in scripts){
		if(scripts[i].d){

			if(!dependentScript[scripts[i].d]) 
				dependentScript[scripts[i].d] = []; // if dependentScript name if not yet register

			dependentScript[scripts[i].d].push(scripts[i]);
			
		}else
			independentScripts.push(scripts[i])
	}
}
