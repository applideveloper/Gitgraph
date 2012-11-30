//
// Pure JS GitHub participation graph
// http://bouchon.github.com/Gitgraph
//

window.Gitgraph = function(args){
	var graphContainer = document.createElement("div");
	require([
		"dojo/dom-construct",
		"dojo/dom-attr", 
		"dojo/_base/lang",
		"dojo/_base/array",
		"dojo/request/xhr",
		"dojo/domReady!"
	], function(domConstruct, domAttr, lang, array, xhr){
		// 1. Grab args
	    var h 		= args.height ? parseInt(args.height.substr(0,args.height.length-2)) : 40;
		var w  		= args.width ? parseInt(args.width.substr(0,args.width.length-2)) : 416;
		var node  	= args.domNode || document.body;

		// 2. Build container (the inline styles are ugly but k.i.s.s.)
		domAttr.set(graphContainer, "innerHTML", 
			'<img style="width:30px;height:30px;position:absolute;top:50%;margin-top:-15px;" src='+
			'"http://senoda.com/images/site/spinner.gif"/>');
		domAttr.set(graphContainer, "style", 
			'padding:5px; border-radius:4px; background:white;position:relative;'+
	        'height:'+h+'px;text-align:center;width:'+w+'px');
		domConstruct.place(graphContainer, node, "first");

		// 3. Build our request url (need to proxy bc GitHub
		// 	  hasn't exposed this data via the API yet...they plan to)
		var proxy 	= "http://bitpshr.info/cdn/ba-simple-proxy.php";
		var params 	= "?url=https://github.com/"+args.user+"/"+args.repo+"/graphs/owner_participation";

		// 4. Fetch participation data
		xhr(proxy+params, {
			handleAs: 'json'
		}).then(function(data){
			var total 	= data.contents.all;
			var own 	= data.contents.owner;
			// 5. build canvas
			var canvas	= domConstruct.create('canvas',{
			    width: w,
			    height: h,
			    style : 'position:relative;'
			},graphContainer,"only");
			// 7. Do some gd math
			var c		= canvas.getContext("2d");
			var width	= w / total.length;
			var height 	= h;
			var max		= Math.max.apply(Math, total);
			var scale  	= max >= height ? parseFloat(height - 1) / max : 1;
			// 6. Function to render each rectangle
			var render 	= function (value, index){
				value *= scale;
				c.fillRect(index * width, height - value, width - 1, value);
			};
			// 8. Set some styles n' stuff
			c.fillStyle = 'rgb(202, 202, 202)';
			array.forEach(total, render);
			c.fillStyle = 'rgb(51, 102, 153)';
			array.forEach(own, render);
		});
	});
	return graphContainer;
};
