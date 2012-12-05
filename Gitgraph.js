//
// Pure JS GitHub participation graph
// http://bouchon.github.com/Gitgraph
//

var Gitgraph = (function (args) {
	// constructor
    var module = function (args) {
    	var graphContainer = document.createElement("div");
	    var node    = args.domNode || document.body;
	    node.appendChild(graphContainer);
	    
		// 1. Grab args
	    var h 		= args.height || 40;
		var w  		= args.width || 416;
	    var bg      = args.background || "white";
	    var userColor = args.userColor || 'rgb(51, 102, 153)';
	    var allColor  = args.allColor || 'rgb(202, 202, 202)';

		// 2. Build container (the inline styles are ugly but k.i.s.s.)
		graphContainer.innerHTML = '<img style="width:30px;height:30px;position:absolute;top:50%;margin-top:-15px;" src='+
			'"http://senoda.com/images/site/spinner.gif"/>';
		graphContainer.style.cssText = 'padding:5px; border-radius:4px; background:'+bg+';position:relative;'+
	        'height:'+h+'px;text-align:center;width:'+w+'px';
		node.appendChild(graphContainer);

		// 3. Build our request url (need to proxy bc GitHub
		// 	  hasn't exposed this data via the API yet...they plan to)
		var proxy 	= "http://bitpshr.info/cdn/ba-simple-proxy.php";
		var params 	= "?url=https://github.com/"+args.user+"/"+args.repo+"/graphs/owner_participation";

		// 4. Fetch participation data
		var xhr = new XMLHttpRequest();
		xhr.open("GET", proxy+params, true);
		xhr.onreadystatechange = function () {
		    if(xhr.readyState==4 && xhr.status==200 ) {
	            var data = JSON.parse( xhr.responseText );
	            if(data.contents && data.contents.all){
					var total 	= data.contents.all;
					var own 	= data.contents.owner;
					var repo 	= "https://github.com/"+args.user+"/"+args.repo+"/";

					// 5. build canvas
					graphContainer.innerHTML = "";
					var canvas = document.createElement("canvas");
					canvas.width = w;
					canvas.height = h;
					canvas.style.cssText = "position:relative;";
					var href = document.createElement("a");
					href.href = repo;
					graphContainer.appendChild(href);
					href.appendChild(canvas);

					// 6. build repo indicator
					var indicator = document.createElement("div");
					indicator.style.cssText = "font-size:12px;border-radius:3px;color:#EEE;background-color:rgba(0,0,0,0.5);display:inline-block;padding:5px;position:absolute;top:5px;right:5px;";
					indicator.innerHTML = args.user+"/"+args.repo;
					href.appendChild(indicator);

					// 7. Do some gd math
					var c		= canvas.getContext("2d");
					var width	= w / total.length;
					var height 	= h;
					var max		= Math.max.apply(Math, total);
					var scale  	= parseFloat(height - 1) / max;

					// 6. Function to render each rectangle
					var render 	= function (value, index){
						value *= scale;
						c.fillRect(index * width, height - value, width - 1, value);
					};

					// 8. Set some styles n' stuff
					c.fillStyle = allColor;
					var i;
					for(i=0; i<total.length; i++){
						render(total[i], i);
					}
					c.fillStyle = userColor;
					for(i=0; i<own.length; i++){
						render(own[i], i);
					}
	            }
	  	     }
		};
		xhr.send(null);
    };

    // dress up the module's prototype
    module.prototype = {
        constructor: module
    };

    return module;
}());