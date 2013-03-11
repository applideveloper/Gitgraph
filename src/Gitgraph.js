var Gitgraph = (function (args) {
	// constructor
	var module = function (args) {
		var container = document.createElement("div");
		
		// grab args
		var node = args.domNode || document.body,
			h = args.height || 40,
			w = args.width || 416,
			bg = args.background || "white",
			userColor = args.userColor || 'rgb(51, 102, 153)',
			allColor = args.allColor || 'rgb(202, 202, 202)',
			showName = args.showName || true;

		// build container (the inline styles are ugly but...yeah)
		var spinner = new Spinner().spin(container);
			spinner.el.style.left = "50%";
			spinner.el.style.top = "50%";

		// style the container...this sucks
		var cs = container.style;
			cs.padding = '4px',
			cs.borderRadius = '4px',
			cs.background = bg,
			cs.position = 'relative',
			cs.height = h+'px',
			cs.textAlign = 'center',
			cs.width = w+'px';

		node.appendChild(container);

		// Build our request url (need to proxy bc GitHub has
		// not exposed this data via the API yet; they plan to
		var proxy = "http://bitpshr.info/cdn/ba-simple-proxy.php",
			params = "?url=https://github.com/" + args.user + "/" + args.repo + "/graphs/owner_participation";

		// Fetch participation data
		var xhr = new XMLHttpRequest();
		xhr.open("GET", proxy+params, true);
		xhr.onreadystatechange = function () {
			if(xhr.readyState==4 && xhr.status==200) {
				var data = JSON.parse( xhr.responseText );
				if(data.contents && data.contents.all){
					var total = data.contents.all,
						repo = "https://github.com/"+args.user+"/"+args.repo+"/";

					// build canvas
					container.innerHTML = "";
					var canvas = document.createElement("canvas");
						canvas.width = w;
						canvas.height = h;
						canvas.style.position = "relative";
					var a = document.createElement("a");
						a.href = repo;
						a.appendChild(canvas);
					container.appendChild(a);
					
					// show a name if we have to
					if(showName){
						var indicator = document.createElement("div");
							indicator.innerHTML = args.user+"/"+args.repo;
						var is = indicator.style;
							is.fontSize = "12px",
							is.borderRadius = "3px",
							is.color = '#EEE',
							is.backgroundColor = 'rgba(0,0,0,0.5)',
							is.display = 'inline-block',
							is.padding = '5px',
							is.position = 'absolute',
							is.top = is.right = '5px';
						a.appendChild(indicator);
					}

					// do some gd math
					var c = canvas.getContext("2d"),
						width = w / total.length,
						max	= Math.max.apply(Math, total),
						scale = parseFloat(h - 1) / max;

					// Function to render each rectangle
					var render = function (value, index){
						value *= scale;
						c.fillRect(index * width, h - value, width - 1, value);
					};

					// Set some styles and stuff
					c.fillStyle = allColor;
					var i, len;
					for(i=0, len=total.length; i<len; i++){
						render(total[i], i);
					}
					c.fillStyle = userColor;
					for(i=0, len=data.contents.owner.length; i<len; i++){
						render(data.contents.owner[i], i);
					}
				}
			}
		};
		xhr.send(null);
	};

	module.prototype = { constructor: module };
	
	return module;
}());
