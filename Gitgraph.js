var Gitgraph = function(args){
	if(!args || !args.user || !args.repo){
		throw new Error('Gitgraph: missing user and/or repo arg ');
	}else{
		
		//Rips through data point arrays and renders canvas		
		this.go = function(){
			//1. Vars
			this.total 	= this.data.all;	//array of all commit data points
			this.own	= this.data.owner;	//array of just your commit data points

			//2. Create canvas
			this.graphContainer.innerHTML = '';
			this.canvas	= dojo.create('canvas',{width:this.width,height:this.height,style:'position:relative;margin-top:11px;'},this.graphContainer);
			
			//3. Create bottom of graph img
			var img = dojo.create('img',{
				src:'http://logicalcognition.com/files/gitgraphFiles/gitgraph.png',
				style:'position:relative;top:-11px;'
			},this.graphContainer);
			var currHeight = img.offsetHeight;
			dojo.style(img,'width',this.width+'px');
			dojo.style(img,'height','4px');
			dojo.create('br',{},img,'after');
			dojo.create('span',{
				innerHTML:'52 week participation',
				style:'position:absolute;right:7px;font:10px arial;'
			},img,'after');
			dojo.create('span',{
				innerHTML:'commits by owner',
				style:'position:absolute;left:82px;font:10px arial;'
			},img,'after');
			dojo.create('span',{
				innerHTML:'all commits',
				style:'position:absolute;left:16px;float:left;font:10px arial;'
			},img,'after');
			dojo.create('div',{
				style:'display:inline-block;position:absolute;left:7px;background:lightgrey;width:7px;height:7px;top:35px'
			},img,'after');
			dojo.create('div',{
				style:'display:inline-block;position:absolute;left:73px;background:#3377CC;width:7px;height:7px;top:35px'
			},img,'after');
			
			///4. Populate canvas with data points
			var context	= this.canvas.getContext("2d"),
				width	= this.width / this.total.length,
				height 	= this.height,
				max		= Math.max.apply(Math, this.total),
				scale  	= max >= height ? parseFloat(height - 1) / max : 1;
			function render(value, index){
				value *= scale;
				context.fillRect(index * width, height - value, width - 1, value);
			}
			context.fillStyle = 'rgb(202, 202, 202)';
			dojo.forEach(this.total, render);
			context.fillStyle = 'rgb(51, 102, 153)';
			dojo.forEach(this.own, render);
		};
		
		//Dynamically load JS
		this.loadScript = function(sScriptSrc,callbackfunction) {
			var oHead = document.getElementsByTagName('head')[0];
			if(oHead){	
				var oScript = document.createElement('script');
				oScript.setAttribute('src',sScriptSrc);
				oScript.setAttribute('type','text/javascript');
				var loadFunction = function(){
					if (this.readyState == 'complete' || this.readyState == 'loaded')
						callbackfunction(); 
				};
				oScript.onreadystatechange = loadFunction;
				oScript.onload = callbackfunction;	
				oHead.appendChild(oScript);
			}
		};
		
		//Bind for browsers that don't have it
		this.bind = function (oThis) {
			if (typeof this !== "function")
			  throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
			var aArgs = Array.prototype.slice.call(arguments, 1), 
			    fToBind = this, fNOP = function () {},
			    fBound = function () {
			      return fToBind.apply(this instanceof fNOP
		                ? this
		                : oThis || window,
		              aArgs.concat(Array.prototype.slice.call(arguments)));
			    };
			fNOP.prototype = this.prototype;
			fBound.prototype = new fNOP();
			return fBound;
		};
		
		//Kick things off
		this.kickStart = function(){
			dojo.ready(this, function(){
				//Get particiption data
				dojo.xhrGet({
					url: 'http://logicalcognition.com/files/gitgraphFiles/gitgraph.php?user='+args.user+'&repo='+args.repo,
					handleAs: 'json',
					preventCache: true,
					load: dojo.hitch(this,function(data){
						this.data = data;
						this.go();
					}),
					error: dojo.hitch(this,function(e){
						this.graphContainer.innerHTML = '';
						dojo.create('div',{
							innerHTML:'Can not find repository.',
							style:'margin-top:20px;font:12px arial;'
						},this.graphContainer);
					})
				});	
			});
		};
		
		//Initialization
		this.height = 20;
		this.width = args.width ? parseInt(args.width.substring(0,args.width.length-2)) : 416;
		this.node 	= args.domNode ? args.domNode : document.body;
		if (!Function.prototype.bind)
		  Function.prototype.bind = this.bind;
		if(!window.dojo)
			this.loadScript('http://ajax.googleapis.com/ajax/libs/dojo/1.7.1/dojo/dojo.js',this.kickStart.bind(this));
		else
			this.kickStart.bind(this)();
		
		//build container
		this.graphContainer = dojo.create('div',{
			innerHTML:'<img src="http://biganimals.com/wp-content/themes/biganimals/images/loading_transparent_4.gif"/>',
			style:'color:grey;position:relative;line-height:15px;border-radius:3px;border:1px solid #E5E5E5;background:white;height:55px;text-align:center;width:'+(this.width+14)+'px'
		},this.node,'last');

		return this.graphContainer;
	}
};

//Make Jquery folks happy
if (window.jQuery) {
    jQuery.fn.gitgraph = function (args) {
		if(!args || !args.user || !args.repo){
			throw new Error('Gitgraph: missing user and/or repo arg ');
		}else{
			this.each(function () {
	            var view = new Gitgraph({ 
	                user    : args.user,     
	                domNode : $(this)[0], 
	                repo : args.repo,
				    width: args.width ? args.width : '416px'
	            });
	        });
		}
    };
}