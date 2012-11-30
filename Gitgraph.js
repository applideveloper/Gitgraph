//
// Pure JS GitHub participation graph
// http://bouchon.github.com/Gitgraph
//

window.Gitgraph = function(args){
	require([
		"dojo/dom-construct",
		"dojo/dom-attr", 
		"dojo/_base/lang",
		"dojo/request/xhr",
		"dojo/domReady!"
	], function(domConstruct, domAttr, lang, xhr){
	    var app = {
			height 	: 20,
			width  	: args.width ? parseInt(args.width.substring(0,args.width.length-2)) : 416,
			node  	: args.domNode ? args.domNode : document.body,

			init : function(){
				//build container
				this.graphContainer = this._createContainer();
				//get particiption data
				this.getParticipationData().then(
					lang.hitch(this, "_showGraph"), 
					lang.hitch(this, "_showError")
				);
			},

			_showGraph: function(data){
				this.data = data.contents;
				this.total 	= this.data.all;	//array of all commit data points
				this.own	= this.data.owner;	//array of just your commit data points
				// create canvas
				this.createCanvas();
				// create bottom of graph img
				this.createLower();
				// populate canvas with data points
				this.populate();
			},

			_createContainer: function(){
				return domConstruct.create("div", {
					innerHTML 	: '<img style="width:40px;height:40px;" '+
									'src="http://senoda.com/images/site/spinner.gif"/>',
					style 		: 'color:grey; position:relative; line-height:15px; '+
									'border-radius:3px; border:1px solid #E5E5E5;background:white;'+
			        				'height:55px;text-align:center;width:'+(this.width+14)+'px'
				}, this.node); 
			},



			_showError: function(err){
				this.graphContainer.innerHTML = '';
				dojo.create('div',{
					innerHTML:'Can not find repository.',
					style:'margin-top:20px;font:12px arial;'
				},this.graphContainer);
			},

			getParticipationData: function(){
				var self = this;
				return xhr('http://bitpshr.info/cdn/ba-simple-proxy.php?url=https://github.com/'+args.user+'/'+args.repo+"/graphs/owner_participation", {
					handleAs: 'json'
				});	
			},
			
			//Render canvas element
			createCanvas : function(){
			    this.graphContainer.innerHTML = '';
				this.canvas	= dojo.create('canvas',{
				    width:this.width,height:this.height,style:'position:relative;margin-top:11px;'
				},this.graphContainer);
			},
			
			//Render bottom part of graph
			createLower : function(){
			    var img = this.createKey();
			    //Participation key
				dojo.create('span',{
					innerHTML:'52 week participation',
					style:'position:absolute;right:7px;font:10px arial;'
				},img,'after');
				//Commits by owner key
				dojo.create('span',{
					innerHTML:'commits by owner',
					style:'position:absolute;left:82px;font:10px arial;'
				},img,'after');
				//All commits key
				dojo.create('span',{
					innerHTML:'all commits',
					style:'position:absolute;left:16px;float:left;font:10px arial;'
				},img,'after');
				//Color legends
				dojo.create('div',{
					style:'display:inline-block;position:absolute;left:7px;'+
					    'background:lightgrey;width:7px;height:7px;top:35px'
				},img,'after');
				dojo.create('div',{
					style:'display:inline-block;position:absolute;left:73px;'+
					    'background:#3377CC;width:7px;height:7px;top:35px'
				},img,'after');
			},
			
			//Builds graph key
			createKey : function(){
			    var img = dojo.create('img',{
					src:'http://bitpshr.github.com/Gitgraph/bin/gitgraph.png',
					style:'position:relative;top:-11px;'
				},this.graphContainer);
				var currHeight = img.offsetHeight;
				dojo.style(img,'width',this.width+'px');
				dojo.style(img,'height','4px');
				dojo.create('br',{},img,'after');
				return img;
			},
			
			//Populates graph with data points
			populate : function(){
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
			}
	    };

	    lang.hitch(app, "init")();
	});
};
