
(function(/*! Stitch !*/) {
  if (!this.require) {
    var modules = {}, cache = {}, require = function(name, root) {
      var path = expand(root, name), module = cache[path], fn;
      if (module) {
        return module.exports;
      } else if (fn = modules[path] || modules[path = expand(path, './index')]) {
        module = {id: path, exports: {}};
        try {
          cache[path] = module;
          fn(module.exports, function(name) {
            return require(name, dirname(path));
          }, module);
          return module.exports;
        } catch (err) {
          delete cache[path];
          throw err;
        }
      } else {
        throw 'module \'' + name + '\' not found';
      }
    }, expand = function(root, name) {
      var results = [], parts, part;
      if (/^\.\.?(\/|$)/.test(name)) {
        parts = [root, name].join('/').split('/');
      } else {
        parts = name.split('/');
      }
      for (var i = 0, length = parts.length; i < length; i++) {
        part = parts[i];
        if (part == '..') {
          results.pop();
        } else if (part != '.' && part != '') {
          results.push(part);
        }
      }
      return results.join('/');
    }, dirname = function(path) {
      return path.split('/').slice(0, -1).join('/');
    };
    this.require = function(name) {
      return require(name, '');
    }
    this.require.define = function(bundle) {
      for (var key in bundle)
        modules[key] = bundle[key];
    };
  }
  return this.require.define;
}).call(this)({"examples/EaselJSRenderer": function(exports, require, module) {(function() {
  var EaselJSRenderer, Rect, SceneBuilder, SceneRenderer,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  SceneRenderer = require("renderer/SceneRenderer");

  SceneBuilder = require("examples/SceneBuilder");

  Rect = require("indexing/Rect");

  EaselJSRenderer = (function() {
    function EaselJSRenderer(canvas) {
      var _this = this;
      this.canvas = canvas;
      this.addToSceneDelegate = __bind(this.addToSceneDelegate, this);
      this.builder = SceneBuilder.create();
      this.renderer = new SceneRenderer(builder.totalWidth, builder.totalHeight, 5, 5, function() {
        return _this.clearSceneDelegate;
      }, function() {
        return _this.addToSceneDelegate;
      });
      this.builder.build(this.renderer);
      this.easel = new createjs.Stage(this.canvas);
      $(window).resize(this.resize);
      $(window).scroll(this.scroll);
      this.resize();
      createjs.Ticker.addEventListener("tick", tick);
    }

    /*
     Handle tick to pass to Renderer.
     Update Easel.
    */


    EaselJSRenderer.prototype.tick = function() {
      this.renderer.render(false);
      return this.easel.update();
    };

    /*
    	Clear the Easel Stage
    */


    EaselJSRenderer.prototype.clearSceneDelegate = function() {
      this.easel.removeAllChildren();
      return null;
    };

    /*
    	Add a renderer to the Easel Stage
    */


    EaselJSRenderer.prototype.addToSceneDelegate = function(renderer, rendererData, x, y) {
      renderer.x = x;
      renderer.y = y;
      this.easel.addChild(renderer);
      return null;
    };

    /*
    	Resize viewport & canvas
    */


    EaselJSRenderer.prototype.resize = function() {
      this.easel.canvas.width = window.innerWidth;
      this.easel.canvas.width = window.innherHeight;
      return this.renderer.viewportSize(window.innerWidth, window.innerHeight);
    };

    /*
    	Set viewport scroll position.
    */


    EaselJSRenderer.prototype.scroll = function() {
      var x, y;
      x = $(window).scrollLeft();
      y = $(window).scrollTop();
      return this.renderer.viewportPos(x, y);
    };

    return EaselJSRenderer;

  })();

}).call(this);
}, "examples/SceneBuilder": function(exports, require, module) {(function() {
  var Rect, SceneBuilder;

  Rect = require("indexing/Rect");

  /*
  	Class to centralised the build process of the scene to pass between
  	Renderers ( EaselJS/ WebGL / Canvas / Dom )
  */


  SceneBuilder = (function() {
    SceneBuilder.createBasic = function() {
      return new SceneBuilder(100, 80, 40);
    };

    function SceneBuilder(size, width, height) {
      this.size = size;
      this.width = width;
      this.height = height;
      this.totalWidth = this.width * this.size;
      this.totalHeight = this.height * this.size;
    }

    SceneBuilder.prototype.build = function(renderer) {
      var count, ix, iy, obj, _i, _j, _ref, _ref1;
      count = 0;
      for (ix = _i = 0, _ref = this.width; 0 <= _ref ? _i <= _ref : _i >= _ref; ix = 0 <= _ref ? ++_i : --_i) {
        for (iy = _j = 0, _ref1 = this.height; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; iy = 0 <= _ref1 ? ++_j : --_j) {
          count++;
          obj = {
            id: count,
            rect: new Rect(ix * this.size, iy * size, this.size, this.size),
            rendererType: "myRenderer"
          };
          renderer.add(obj);
        }
      }
      return null;
    };

    return SceneBuilder;

  })();

}).call(this);
}, "indexing/Partition": function(exports, require, module) {(function() {
  var Partition, Rect;

  Rect = require("indexing/Rect");

  module.exports = Partition = (function() {
    function Partition(x, y, w, h) {
      this.objects = [];
      this.bounds = new Rect(x, y, w, h);
    }

    Partition.prototype.add = function(object) {
      this.objects.push(object);
      return true;
    };

    Partition.prototype.remove = function(object) {
      var idx;
      idx = this.objects.indexOf(object);
      if (idx >= 0) {
        this.objects.splice(0, 1);
        return true;
      } else {
        return false;
      }
    };

    return Partition;

  })();

}).call(this);
}, "indexing/Rect": function(exports, require, module) {(function() {
  var Rect;

  module.exports = Rect = (function() {
    function Rect(left, top, width, height) {
      this.left = left;
      this.top = top;
      this.width = width;
      this.height = height;
      this.y = this.top;
    }

    Rect.prototype.update = function(left, top, width, height) {
      this.left = left;
      this.top = top;
      this.width = width;
      this.height = height;
    };

    Rect.prototype.clone = function() {
      return new Rect(this.left, this.top, this.width, this.height);
    };

    Rect.prototype.equals = function(rect) {
      if (this === rect) {
        return true;
      }
      if (!rect) {
        return false;
      }
      return this.left === rect.left && this.top === rect.top && this.width === rect.width && this.height === rect.height;
    };

    Rect.prototype.intersects = function(rect) {
      return this.left <= rect.left + rect.width && rect.left <= this.left + this.width && this.top <= rect.top + rect.height && rect.top <= this.top + this.height;
    };

    Rect.prototype.intersection = function(rect) {
      var x0, x1, y0, y1;
      x0 = Math.max(this.left, rect.left);
      x1 = Math.min(this.left + this.width, rect.left + rect.width);
      if (x0 <= x1) {
        y0 = Math.max(this.top, rect.top);
        y1 = Math.min(this.top + this.height, rect.top + rect.height);
        if (y0 <= y1) {
          return new Rect(x0, y0, x1 - x0, y1 - y0);
        }
      }
      return null;
    };

    Rect.prototype.contains = function(rect) {
      return this.left <= rect.left && this.left + this.width >= rect.left + rect.width && this.top <= rect.top && this.top + this.height >= rect.top + rect.height;
    };

    return Rect;

  })();

}).call(this);
}, "indexing/SceneIndex": function(exports, require, module) {(function() {
  var Partition, Rect, SceneIndex;

  Rect = require("indexing/Rect");

  Partition = require("indexing/Partition");

  module.exports = SceneIndex = (function() {
    function SceneIndex(w, h, hDiv, vDiv) {
      var ix, iy, pHeight, pWidth, partition, _i, _j, _ref, _ref1;
      this.bounds = new Rect(0, 0, w, h);
      this.partitions = [];
      this.vDiv = (_ref = vDiv === 0) != null ? _ref : {
        1: vDiv
      };
      this.hDiv = (_ref1 = hDiv === 0) != null ? _ref1 : {
        1: hDiv
      };
      pWidth = w / hDiv;
      pHeight = h / vDiv;
      for (ix = _i = 0; 0 <= hDiv ? _i <= hDiv : _i >= hDiv; ix = 0 <= hDiv ? ++_i : --_i) {
        for (iy = _j = 0; 0 <= vDiv ? _j <= vDiv : _j >= vDiv; iy = 0 <= vDiv ? ++_j : --_j) {
          partition = new Partition(ix * pWidth, iy * pHeight, pWidth, pHeight);
          this.partitions.push(partition);
        }
      }
    }

    SceneIndex.prototype.add = function(object) {
      var added, partition, _i, _len, _ref;
      added = false;
      _ref = this.partitions;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        partition = _ref[_i];
        if (partition.bounds.intersects(object.rect)) {
          partition.add(object);
          added = true;
        }
      }
      return added;
    };

    SceneIndex.prototype.remove = function(object) {};

    SceneIndex.prototype.find = function(rect) {
      var object, partition, results, _i, _j, _len, _len1, _ref, _ref1;
      results = [];
      _ref = this.partitions;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        partition = _ref[_i];
        if (rect.intersects(partition.bounds)) {
          _ref1 = partition.objects;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            object = _ref1[_j];
            if (rect.intersects(object.rect)) {
              results.push(object);
            }
          }
        }
      }
      return results;
    };

    return SceneIndex;

  })();

}).call(this);
}, "renderer/RendererFactory": function(exports, require, module) {/*
A RendererFactory to instantiate renderer classes from a type identifier.
*/


(function() {
  var RendererFactory;

  module.exports = RendererFactory = (function() {
    function RendererFactory() {
      this.rendererMap = {};
      this.rendererPool = {};
      this.rendererList = [];
    }

    /*
    	Register a rendererType with an associated rendererClass and
    	create a number of pooled renderers if required.
    */


    RendererFactory.prototype.register = function(rendererType, rendererClass, poolCount) {
      var i, _i;
      if (!poolCount) {
        poolCount = 0;
      }
      if (!this.rendererMap[rendererType]) {
        this.rendererMap[rendererType] = rendererClass;
        this.rendererPool[rendererType] = [];
        if (poolCount > 0) {
          for (i = _i = 0; 0 <= poolCount ? _i <= poolCount : _i >= poolCount; i = 0 <= poolCount ? ++_i : --_i) {
            this.rendererPool[rendererType].push(new rendererClass());
          }
        }
      }
    };

    /*
    	Detaches renderers and assumes they may not be used again.
    	But holds on to association of rendererData to rendererObject
    	to main
    */


    RendererFactory.prototype.preCreate = function() {
      return null;
    };

    /*
    	Create a renderer object from the rendererType property
    	of the rendererData object.
    */


    RendererFactory.prototype.create = function(rendererData) {
      var pool;
      pool = this.rendererPool[rendererType];
      if (!pool) {
        return null;
      }
      if (pool.length) {
        return pool.pop();
      }
    };

    /*
    	Completely frees up renderers and adds them back to the pool
    */


    RendererFactory.prototype.postCreate = function() {
      return null;
    };

    return RendererFactory;

  })();

}).call(this);
}, "renderer/SceneRenderer": function(exports, require, module) {/*
Imports
*/


(function() {
  var Rect, RendererFactory, SceneIndex, SceneRenderer;

  SceneIndex = require("indexing/SceneIndex");

  Rect = require("indexing/Rect");

  RendererFactory = require("renderer/RendererFactory");

  /*
  SceneRenderer
  
  Basic SceneRenderer to render many display objects.
  Used with EaselJS for now.
  */


  module.exports = SceneRenderer = (function() {
    /*
    	The add to stage
    
    	w = The total width of the scene
    	h = The total height of the scene
    	hDiv = The total divisions horizontally for the spatial index
    	vDiv = The total divisions vertically for the spatial index
    	clearScene = The function to use to clear the rendering scene ( canvas / dom / webgl / etc )
    	addToScene = The function to use to add a renderer to the scene ( canvas / dom / webgl / etc )
    */

    function SceneRenderer(w, h, hDiv, vDiv, clearScene, addToScene) {
      this.clearScene = clearScene;
      this.addToScene = addToScene;
      if (!this.viewport) {
        this.viewport = new Rect(0, 0, 100, 100);
      }
      if (!this.clearScene) {
        this.clearScene = function() {
          return null;
        };
      }
      if (!this.addToScene) {
        this.addToScene = function(renderer, rendererData, x, y) {
          return null;
        };
      }
      this.index = new SceneIndex(w, h, hDiv, vDiv);
      this.factory = new RendererFactory();
    }

    /*
    	add()
    
    	Add an object to the Renderer.
    	object must implement a "rect" property of type indexing.Rect
    */


    SceneRenderer.prototype.add = function(rendererData) {
      var f,
        _this = this;
      this.index.add(rendererData);
      f = function(func) {
        return null;
      };
      f(function() {
        return _this.index.add();
      });
      return null;
    };

    /*
    	remove()
    
    	Removes an object from the Renderer.
    */


    SceneRenderer.prototype.remove = function(rendererData) {
      return this.index.remove(rendererData);
    };

    /*
    	update()
    
    	Updates an object in the index.
    */


    SceneRenderer.prototype.update = function(rendererData) {
      return this.index.update(rendererData);
    };

    /*
    	viewportSize()
    
    	Resize the viewport.
    */


    SceneRenderer.prototype.viewportSize = function(width, height) {
      return this.viewport.update(this.viewport.left, this.viewport.top, width, height);
    };

    /*
    	viewportMove()
    
    	Position the viewport.
    */


    SceneRenderer.prototype.viewportPos = function(x, y) {
      console.log(x, y);
      return this.viewport.update(x, y, this.viewport.width, this.viewport.height);
    };

    /*
    	registerRenderer()
    
    	Register a specific rendererType to a rendererClass.
    	Specify a poolCount if you want to instantiate a number of renderers up front.
    */


    SceneRenderer.prototype.registerRenderer = function(rendererType, rendererClass, poolCount) {
      this.factory.registerRenderer(rendererType, rendererClass, poolCount);
      return null;
    };

    /*
    	render()
    
    	Handles the rendering and instantiating of the renderers.
    	The clearScene() and addToScene() delegates need to be specified
    	as they do the positioning and assigning of rendererData.
    */


    SceneRenderer.prototype.render = function() {
      var renderer, rendererData, x, y, _i, _len, _ref, _results;
      this.clearScene();
      this.renderList.splice(0);
      this.renderList = this.index.find(this.viewport);
      this.factory.detach();
      _ref = this.renderList;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        rendererData = _ref[_i];
        renderer = this.factory.create(ren);
        x = object.rect.left - this.viewport.left;
        y = object.rect.top - this.viewport.top;
        _results.push(this.addToScene(renderer, rendererData, x, y));
      }
      return _results;
    };

    return SceneRenderer;

  })();

}).call(this);
}});
