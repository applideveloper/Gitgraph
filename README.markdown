[Gitgraph](http://bitpshr.info/gitgraph)
=================

Dirt simple GitHub participation graphs built with a `<canvas>` element and sorcery.

##Usage
1. Paste right before your page's closing `</body>` tag
```console
<script src="Gitgraph.min.js"></script>
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
        background  : "white",               // (optional) background styles
        showName    : true                   // (optional) show or hide name of user / repo
    });
```

##Limitations
GitHub hasn't exposed participation data via the [api](http://developer.github.com/v3/) yet, but plans to. Until then, requests funnel through a [simple proxy](http://benalman.com/code/projects/php-simple-proxy/docs/files/ba-simple-proxy-php.html) via [my vps](http://bitpshr.info).

##Contributing
Gitgraph uses [Grunt](http://gruntjs.com) for file linting and uglification. To start contributing, first make sure [node](http://nodejs.org) is installed. Then:

```bash
git clone https://github.com/bitpshr/Gitgraph.git
cd Gitgraph
git submodule update --recursive --init
npm install
# hack on Gitgraph.js, run `grunt`, view demo/index.html
```

##License
[WTFPL](http://sam.zoy.org/wtfpl/)