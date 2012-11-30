##About
Dirt simple [Dojo](http://dojotoolkit.org)-powered GitHub participation graphs built with a `<canvas>` element and sorcery.

##Usage
1. Paste into your page's HEAD
```console
<script src="//ajax.googleapis.com/ajax/libs/dojo/1.8.1/dojo/dojo.js"></script>
<script src="https://raw.github.com/bitpshr/Gitgraph/master/Gitgraph.js"></script>
```

2. From within a script tag or a JS file
```javascript
    var graph = new Gitgraph({ 
        user    : 'nex3',                // any github username
        repo    : 'sass',                // name of repo
        domNode : document.body,         // (optional) DOM node to attach to 
        width   : 800,                   // (optional) graph width
        height  : 300,                   // (optional) graph height
        allColor: "rgb(202, 202, 202)",  // (optional) color of user's participation
        userColor: "rgb(51, 102, 153)",  // (optional) color of total participation
        background: "white"              // (optional) background styles
    });
```

##License
WTFPL