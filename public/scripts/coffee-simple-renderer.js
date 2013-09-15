
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
}).call(this)({"examples/easel/EaselRenderer": function(exports, require, module) {(function() {
  var BlackCircleRenderer, BlueCircleRenderer, EaselRenderer, GreenCircleRenderer, Rect, RedCircleRenderer, SceneBuilder, SceneRenderer, YellowCircleRenderer;

  SceneRenderer = require("renderer/SceneRenderer");

  SceneBuilder = require("examples/utils/SceneBuilder");

  Rect = require("indexing/Rect");

  BlackCircleRenderer = require("examples/easel/renderers/BlackCircleRenderer");

  BlueCircleRenderer = require("examples/easel/renderers/BlueCircleRenderer");

  GreenCircleRenderer = require("examples/easel/renderers/GreenCircleRenderer");

  RedCircleRenderer = require("examples/easel/renderers/RedCircleRenderer");

  YellowCircleRenderer = require("examples/easel/renderers/YellowCircleRenderer");

  module.exports = EaselRenderer = (function() {
    function EaselRenderer(canvas) {
      var _this = this;
      this.canvas = canvas;
      this.builder = SceneBuilder.createBasic();
      this.renderer = new SceneRenderer(this.builder.totalWidth, this.builder.totalHeight, 5, 5, function() {
        return _this.clearSceneDelegate();
      }, function(renderer, rendererData, x, y) {
        return _this.addToSceneDelegate(renderer, rendererData, x, y);
      });
      this.builder.build(this.renderer);
      this.renderer.registerRenderer("black", BlackCircleRenderer, 10);
      this.renderer.registerRenderer("blue", BlueCircleRenderer, 10);
      this.renderer.registerRenderer("green", GreenCircleRenderer, 10);
      this.renderer.registerRenderer("red", RedCircleRenderer, 10);
      this.renderer.registerRenderer("yellow", YellowCircleRenderer, 10);
      this.easel = new createjs.Stage(this.canvas);
      $(window).resize(function() {
        return _this.resize();
      });
      $(window).scroll(function() {
        return _this.scroll();
      });
      this._output = $("div#output");
      this.output(["hello", "speed"]);
      this.resize();
      createjs.Ticker.addEventListener("tick", function() {
        return _this.tick();
      });
    }

    /*
     Handle tick to pass to Renderer.
     Update Easel.
    */


    EaselRenderer.prototype.tick = function() {
      this.renderer.render(false);
      this.easel.update();
      return this.output(["intersection tests:" + this.renderer.index.intersectionTests, "renderer count:" + this.renderer.renderList.length]);
    };

    /*
    	Clear the Easel Stage
    */


    EaselRenderer.prototype.clearSceneDelegate = function() {
      this.easel.removeAllChildren();
      return null;
    };

    /*
    	Add a renderer to the Easel Stage
    */


    EaselRenderer.prototype.addToSceneDelegate = function(renderer, rendererData, x, y) {
      renderer.data = rendererData;
      renderer.x = x;
      renderer.y = y;
      this.easel.addChild(renderer);
      return null;
    };

    EaselRenderer.prototype.output = function(list) {
      var html, item, _i, _len;
      html = "<p>";
      for (_i = 0, _len = list.length; _i < _len; _i++) {
        item = list[_i];
        html += item + "<br/>";
      }
      html += "</p>";
      $(this._output).empty();
      return $(this._output).html(html);
    };

    /*
    	Resize viewport & canvas
    */


    EaselRenderer.prototype.resize = function() {
      this.easel.canvas.width = window.innerWidth;
      this.easel.canvas.height = window.innerHeight;
      return this.renderer.viewportSize(window.innerWidth, window.innerHeight);
    };

    /*
    	Set viewport scroll position.
    */


    EaselRenderer.prototype.scroll = function() {
      var x, y;
      x = $(window).scrollLeft();
      y = $(window).scrollTop();
      return this.renderer.viewportPos(x, y);
    };

    return EaselRenderer;

  })();

}).call(this);
}, "examples/easel/renderers/BlackCircleRenderer": function(exports, require, module) {(function() {
  var BlackCircleRenderer,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  module.exports = BlackCircleRenderer = (function(_super) {
    __extends(BlackCircleRenderer, _super);

    BlackCircleRenderer.circleGraphics = null;

    /*
     Reuse a Graphics object for faster shape renderering.
    */


    BlackCircleRenderer.getGraphics = function() {
      if (!BlackCircleRenderer.circleGraphics) {
        BlackCircleRenderer.circleGraphics = new createjs.Graphics();
        BlackCircleRenderer.circleGraphics.beginFill("black").drawCircle(40, 40, 40);
      }
      return BlackCircleRenderer.circleGraphics;
    };

    BlackCircleRenderer.prototype.data = null;

    function BlackCircleRenderer() {
      BlackCircleRenderer.__super__.constructor.call(this);
      this.graphics = BlackCircleRenderer.getGraphics();
    }

    return BlackCircleRenderer;

  })(createjs.Shape);

}).call(this);
}, "examples/easel/renderers/BlueCircleRenderer": function(exports, require, module) {(function() {
  var BlueCircleRenderer,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  module.exports = BlueCircleRenderer = (function(_super) {
    __extends(BlueCircleRenderer, _super);

    BlueCircleRenderer.circleGraphics = null;

    /*
     Reuse a Graphics object for faster shape renderering.
    */


    BlueCircleRenderer.getGraphics = function() {
      if (!BlueCircleRenderer.circleGraphics) {
        BlueCircleRenderer.circleGraphics = new createjs.Graphics();
        BlueCircleRenderer.circleGraphics.beginFill("blue").drawCircle(40, 40, 40);
      }
      return BlueCircleRenderer.circleGraphics;
    };

    BlueCircleRenderer.prototype.data = null;

    function BlueCircleRenderer() {
      BlueCircleRenderer.__super__.constructor.call(this);
      this.graphics = BlueCircleRenderer.getGraphics();
    }

    return BlueCircleRenderer;

  })(createjs.Shape);

}).call(this);
}, "examples/easel/renderers/GreenCircleRenderer": function(exports, require, module) {(function() {
  var GreenCircleRenderer,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  module.exports = GreenCircleRenderer = (function(_super) {
    __extends(GreenCircleRenderer, _super);

    GreenCircleRenderer.circleGraphics = null;

    /*
     Reuse a Graphics object for faster shape renderering.
    */


    GreenCircleRenderer.getGraphics = function() {
      if (!GreenCircleRenderer.circleGraphics) {
        GreenCircleRenderer.circleGraphics = new createjs.Graphics();
        GreenCircleRenderer.circleGraphics.beginFill("green").drawCircle(40, 40, 40);
      }
      return GreenCircleRenderer.circleGraphics;
    };

    GreenCircleRenderer.prototype.data = null;

    function GreenCircleRenderer() {
      GreenCircleRenderer.__super__.constructor.call(this);
      this.graphics = GreenCircleRenderer.getGraphics();
    }

    return GreenCircleRenderer;

  })(createjs.Shape);

}).call(this);
}, "examples/easel/renderers/RedCircleRenderer": function(exports, require, module) {(function() {
  var RedCircleRenderer,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  module.exports = RedCircleRenderer = (function(_super) {
    __extends(RedCircleRenderer, _super);

    RedCircleRenderer.circleGraphics = null;

    /*
     Reuse a Graphics object for faster shape renderering.
    */


    RedCircleRenderer.getGraphics = function() {
      if (!RedCircleRenderer.circleGraphics) {
        RedCircleRenderer.circleGraphics = new createjs.Graphics();
        RedCircleRenderer.circleGraphics.beginFill("red").drawCircle(40, 40, 40);
      }
      return RedCircleRenderer.circleGraphics;
    };

    RedCircleRenderer.prototype.data = null;

    function RedCircleRenderer() {
      RedCircleRenderer.__super__.constructor.call(this);
      this.graphics = RedCircleRenderer.getGraphics();
    }

    return RedCircleRenderer;

  })(createjs.Shape);

}).call(this);
}, "examples/easel/renderers/YellowCircleRenderer": function(exports, require, module) {(function() {
  var YellowCircleRenderer,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  module.exports = YellowCircleRenderer = (function(_super) {
    __extends(YellowCircleRenderer, _super);

    YellowCircleRenderer.circleGraphics = null;

    /*
     Reuse a Graphics object for faster shape renderering.
    */


    YellowCircleRenderer.getGraphics = function() {
      if (!YellowCircleRenderer.circleGraphics) {
        YellowCircleRenderer.circleGraphics = new createjs.Graphics();
        YellowCircleRenderer.circleGraphics.beginFill("yellow").drawCircle(40, 40, 40);
      }
      return YellowCircleRenderer.circleGraphics;
    };

    YellowCircleRenderer.prototype.data = null;

    function YellowCircleRenderer() {
      YellowCircleRenderer.__super__.constructor.call(this);
      this.graphics = YellowCircleRenderer.getGraphics();
    }

    return YellowCircleRenderer;

  })(createjs.Shape);

}).call(this);
}, "examples/utils/Performance": function(exports, require, module) {(function() {
  var Performance;

  module.exports = Performance = (function() {
    function Performance() {
      this.performance = {};
    }

    Performance.prototype.add = function(name) {
      return this.performance[name] = [];
    };

    Performance.prototype.start = function(name) {
      return this.performance[name];
    };

    return Performance;

  })();

}).call(this);
}, "examples/utils/SceneBuilder": function(exports, require, module) {(function() {
  var Rect, SceneBuilder;

  Rect = require("indexing/Rect");

  /*
  	Create a super basic Scene for testing.
  
  	Class to centralised the build process of the scene to pass between
  	Renderers ( EaselJS/ WebGL / Canvas / Dom )
  */


  module.exports = SceneBuilder = (function() {
    SceneBuilder.createBasic = function() {
      return new SceneBuilder(100, 80, 40, ["red", "blue", "green", "black", "yellow"]);
    };

    function SceneBuilder(size, width, height, rendererTypes) {
      this.size = size;
      this.width = width;
      this.height = height;
      this.rendererTypes = rendererTypes;
      this.totalWidth = this.width * this.size;
      this.totalHeight = this.height * this.size;
    }

    SceneBuilder.prototype.getRandomRendererType = function() {
      var random;
      random = Math.round(Math.random() * (this.rendererTypes.length - 1));
      return this.rendererTypes[random];
    };

    SceneBuilder.prototype.build = function(renderer) {
      var count, ix, iy, obj, _i, _j, _ref, _ref1;
      count = 0;
      for (ix = _i = 0, _ref = this.width; 0 <= _ref ? _i <= _ref : _i >= _ref; ix = 0 <= _ref ? ++_i : --_i) {
        for (iy = _j = 0, _ref1 = this.height; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; iy = 0 <= _ref1 ? ++_j : --_j) {
          count++;
          obj = {
            id: count,
            rect: new Rect(ix * this.size, iy * this.size, this.size, this.size),
            rendererType: this.getRandomRendererType()
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
}, "indexing/QTree": function(exports, require, module) {(function() {


}).call(this);
}, "indexing/QTreeNode": function(exports, require, module) {(function() {
  var QTreeNode, Rect;

  Rect = require("indexing/Rect");

  QTreeNode = (function() {
    QTreeNode.prototype.children = null;

    QTreeNode.prototype.parent = null;

    QTreeNode.prototype.bounds = null;

    QTreeNode.prototype.data = null;

    QTreeNode.prototype.topleft = null;

    QTreeNode.prototype.topright = null;

    QTreeNode.prototype.bottomleft = null;

    QTreeNode.prototype.bottomright = null;

    function QTreeNode(parent, bounds) {
      this.parent = parent;
      if (bounds) {
        this.bounds = bounds;
      } else {
        this.bounds = new Rect();
      }
    }

    QTreeNode.prototype.split = function() {
      var bottomleft, bottomright, halfHeight, halfWidth, topleft, topright;
      halfWidth = this.bounds.width * 0.5;
      halfHeight = this.bounds.height * 0.5;
      topleft = new QTreeNode(this, new Rect(this.bounds.left, this.bounds.top, halfWidth, halfHeight));
      topright = new QTreeNode(this, new Rect(this.bounds.left + halfWith, this.bounds.top, halfWidth, halfHeight));
      bottomleft = new QTreeNode(this, new Rect(this.bounds.left, this.bounds.top + halfHeight, halfWidth, halfHeight));
      return bottomright = new QTreeNode(this, new Rect(this.bounds.left + halfWidth, this.bounds.top + halfHeight, halfWidth, halfHeight));
    };

    QTreeNode.prototype.add = function(node) {
      return null;
    };

    QTreeNode.prototype.remove = function(node) {
      return null;
    };

    QTreeNode.prototype.find = function(rect) {
      return null;
    };

    return QTreeNode;

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

    Rect.prototype.containsPoint = function(x, y) {
      return x >= this.left && x <= this.left + this.width && y >= this.top && y <= this.top + this.height;
    };

    Rect.prototype.difference = function(rect) {
      var ab, ar, bb, br, height, intersection, result, top;
      intersection = this.intersection(rect);
      if (!intersection || !intersection.height || !intersection.width) {
        return this.clone();
      }
      result = [];
      top = this.top;
      height = this.height;
      ar = this.left + this.width;
      ab = this.top + this.height;
      br = rect.left + rect.width;
      bb = rect.top + rect.height;
      if (rect.top > this.top) {
        result.push(new Rect(this.left, this.top, this.width, rect.top - this.top));
        top = rect.top;
        height -= rect.top - this.top;
      }
      if (bb < ab) {
        result.push(new Rect(this.left, bb, this.width, ab - bb));
        height = bb - top;
      }
      if (rect.left > this.left) {
        result.push(new Rect(this.left, top, rect.left - this.left, height));
      }
      if (br < ar) {
        result.push(new Rect(br, top, ar - br, height));
      }
      return result;
    };

    /*
    	Wraps the contents of a smaller rect around a bigger rect.
    */


    Rect.prototype.wrapped = function(rect) {
      var ab, al, ar, at, bb, br, lrFlip, result, tbFlip;
      result = [];
      al = ((this.left - rect.left) % rect.width) + rect.left;
      ar = (((this.left + this.width) - rect.left) % rect.width) + rect.left;
      at = ((this.top - rect.top) % rect.height) + rect.top;
      ab = (((this.top + this.height) - rect.top) % rect.height) + rect.top;
      lrFlip = ar < al;
      tbFlip = ab < at;
      br = rect.left + rect.width;
      bb = rect.top + rect.height;
      if (!lrFlip && !tbFlip && al >= rect.left && ar <= br && at >= rect.top && ab <= bb) {
        console.log("Straight Contain : (lrFlip, tbFlip) " + lrFlip + " " + tbFlip);
        result.push(new Rect(al, at, this.width, this.height));
      }
      return result;
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
      this.intersectionTests = 0;
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
      this.intersectionTests = 0;
      _ref = this.partitions;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        partition = _ref[_i];
        this.intersectionTests++;
        if (rect.intersects(partition.bounds)) {
          _ref1 = partition.objects;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            object = _ref1[_j];
            this.intersectionTests++;
            if (rect.intersects(object.rect)) {
              if (results.indexOf(object) < 0) {
                results.push(object);
              }
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
      this.poolCount = {};
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
      this.poolCount[rendererType] = [rendererType, null];
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
     ( although not doing that now )
    */


    RendererFactory.prototype.preCreate = function() {
      var key, pool, renderer, _i, _len, _ref;
      _ref = this.rendererList;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        renderer = _ref[_i];
        pool = this.rendererPool[renderer.data.rendererType];
        if (!pool) {
          console.log("no renderer for :" + renderer.data);
        } else {
          pool.push(renderer);
        }
      }
      for (key in this.rendererPool) {
        this.poolCount[key][1] = this.rendererPool[key].length;
      }
      return this.rendererList.splice(0);
    };

    RendererFactory.prototype.newRendererCount = null;

    /*
     Returns an array of rendererTypes and their current pool count.
    */


    RendererFactory.prototype.getPoolCount = function() {
      var count, key;
      count = [];
      for (key in this.poolCount) {
        count.push(this.poolCount[key].join(":"));
      }
      return count;
    };

    /*
    	Create a renderer object from the rendererType property
    	of the rendererData object.
    */


    RendererFactory.prototype.create = function(rendererData) {
      var pool, renderer, rendererClass;
      pool = this.rendererPool[rendererData.rendererType];
      if (!pool) {
        return null;
      }
      this.newRendererCount = 0;
      renderer = null;
      if (pool.length) {
        renderer = pool.pop();
        this.rendererList.push(renderer);
      } else {
        this.newRendererCount++;
        rendererClass = this.rendererMap[rendererData.rendererType];
        renderer = new rendererClass();
        this.rendererList.push(renderer);
      }
      return renderer;
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
      this.renderList = [];
    }

    /*
    	add()
    
    	Add an object to the Renderer.
    	object must implement a "rect" property of type indexing.Rect
    */


    SceneRenderer.prototype.add = function(rendererData) {
      return this.index.add(rendererData);
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
      return this.viewport.update(x, y, this.viewport.width, this.viewport.height);
    };

    /*
    	registerRenderer()
    
    	Register a specific rendererType to a rendererClass.
    	Specify a poolCount if you want to instantiate a number of renderers up front.
    */


    SceneRenderer.prototype.registerRenderer = function(rendererType, rendererClass, poolCount) {
      this.factory.register(rendererType, rendererClass, poolCount);
      return null;
    };

    /*
    	render()
    
    	Handles the rendering and instantiating of the renderers.
    	The clearScene() and addToScene() delegates need to be specified
    	as they do the positioning and assigning of rendererData.
    */


    SceneRenderer.prototype.render = function() {
      var renderer, rendererData, x, y, _i, _len, _ref;
      this.clearScene();
      this.renderList.splice(0);
      this.renderList = this.index.find(this.viewport);
      this.factory.preCreate();
      renderer = {};
      _ref = this.renderList;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        rendererData = _ref[_i];
        renderer = this.factory.create(rendererData);
        x = rendererData.rect.left - this.viewport.left;
        y = rendererData.rect.top - this.viewport.top;
        this.addToScene(renderer, rendererData, x, y);
      }
      return this.factory.postCreate();
    };

    return SceneRenderer;

  })();

}).call(this);
}});
