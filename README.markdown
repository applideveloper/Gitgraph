##About
Dirt simple GitHub participation graphs built with a `<canvas>` element and sorcery.

##Usage
1. Paste into your page's HEAD
```console
<script src="https://raw.github.com/bitpshr/Gitgraph/master/Gitgraph.js"></script>
```

2. From within a script tag or a JS file
```javascript
    var graph = new Gitgraph({ 
        user        : 'nex3',                // any github username
        repo        : 'sass',                // name of repo
        domNode     : document.body,         // (optional) DOM node to attach to 
        width       : 800,                   // (optional) graph width
        height      : 300,                   // (optional) graph height
        allColor    : "rgb(202, 202, 202)",  // (optional) color of user's participation
        userColor   : "rgb(51, 102, 153)",   // (optional) color of total participation
        background  : "white"                // (optional) background styles
    });
```

##Limitations
GitHub hasn't exposed participation data via the [api](http://developer.github.com/v3/) yet, but plans to. Until then, I a [simple proxy](http://benalman.com/code/projects/php-simple-proxy/docs/files/ba-simple-proxy-php.html) is required via my domain.

##License
WTFPL