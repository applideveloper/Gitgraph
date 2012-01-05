##Gitgraph

Pure JS github participation graph using canvas element. To see it in action, visit [gitgraph.logicalcognition.com](http://gitgraph.logicalcognition.com).

![Alt text](http://logicalcognition.com/Projects/Gitgraph/demo/images/screenshot-new.png)

##Supported Browsers

* Safari 4+
* Chrome 9+
* Firefox 4+
* Internet Explorer 8+

##Usage

* Paste into your page's HEAD

	```console
	<script src="http://logicalcognition.com/Projects/Gitgraph/Gitgraph.js"></script>
	```

* From within a script tag or a JS file
	
	```console
	var graph = new Gitgraph({ 
	  user    : 'bouchon',                // any github username
	  repo    : 'coweb',                  // name of repo
	  domNode : document.body,            // (optional) domNode to attach to 
	  width   : '416px'                   // (optional) custom graph width
	});
	```

* Or use it as a jQuery plugin

	```console
	$('#demoHolder').gitgraph({
		user:'bouchon',    // any github username
		repo:'coweb',      // name of repo
		width: '416px'     // (optional) custom graph width
	});
	```
	
FYI, the script uses a little Dojo, and will require it if its not already loaded. Nothing to worry about!

##Issues & Features

File under the Issues section and feel free to fork and pull-request

##License

WTFPL