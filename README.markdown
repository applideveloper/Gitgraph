##Gitgraph

Pure JS github participation graph using canvas element. [Demo](http://bouchon.github.com/Gitgraph).

##Usage

* Paste into your page's HEAD

	```console
	<script src="http://logicalcognition.com/Projects/Gitgraph/Gitgraph.js"></script>
	```

* From within a script tag or a JS file
	
	```javascript
	var graph = new Gitgraph({ 
	  user    : 'bouchon',       // any github username
	  repo    : 'coweb',         // name of repo
	  domNode : document.body,   // (optional) domNode to attach to 
	  width   : '416px'          // (optional) custom graph width
	});
	```

* Or use it as a jQuery plugin

	```javascript
	$('#demoHolder').gitgraph({
		user:'bouchon',          // any github username
		repo:'coweb',            // name of repo
		width: '416px'           // (optional) custom graph width
	});
	```
	
FYI, the script uses a little Dojo, and will require it if its not already loaded. Nothing to worry about!

##Issues & Features

File under the Issues section and feel free to fork and pull-request

##License

WTFPL