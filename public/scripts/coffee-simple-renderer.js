
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
}).call(this)({"indexing/Partition": function(exports, require, module) {(function() {
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
}, "renderer/SceneRenderer": function(exports, require, module) {/*
Imports
*/


(function() {
  var Rect, SceneIndex, SceneRenderer;

  SceneIndex = require("indexing/SceneIndex");

  Rect = require("indexing/Rect");

  /*
  SceneRenderer
  
  Basic SceneRenderer to render many display objects.
  Used with EaselJS for now.
  */


  module.exports = SceneRenderer = (function() {
    function SceneRenderer(w, h, hDiv, vDiv, viewport, easelStage) {
      this.viewport = viewport;
      this.easelStage = easelStage;
      if (!this.viewport) {
        this.viewport = new Rect(0, 0, 100, 100);
      }
      this.index = new SceneIndex(w, h, hDiv, vDiv);
      this.renderList = [];
    }

    /*
     add()
    
     Add an object to the Renderer.
     object must implement a "rect" property of type indexing.Rect
    */


    SceneRenderer.prototype.add = function(object) {
      return this.index.add(object);
    };

    /*
     remove()
    
    	Removes an object from the Renderer.
    */


    SceneRenderer.prototype.remove = function(object) {
      return this.index.remove(object);
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
    
     Used to assign a renderer  to a specific object type
     Not implemented yet.
     Would need some RendererFactory class.
    */


    SceneRenderer.prototype.registerRenderer = function(rendererClass, rendererType) {};

    /*
     render()
    
     Renders the
    */


    SceneRenderer.prototype.render = function() {
      var object, _i, _len, _ref, _results;
      this.easelStage.removeAllChildren();
      this.renderList.splice(0);
      this.renderList = this.index.find(this.viewport);
      _ref = this.renderList;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        object = _ref[_i];
        object.renderer.x = object.rect.left - this.viewport.left;
        object.renderer.y = object.rect.top - this.viewport.top;
        _results.push(this.easelStage.addChild(object.renderer));
      }
      return _results;
    };

    return SceneRenderer;

  })();

}).call(this);
}});
