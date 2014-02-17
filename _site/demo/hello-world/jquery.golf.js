(function($) {

function Component() {
  this._dom = null;
  this._$   = null;
}

function Debug(prefix) {
  return function(text) {
    text = prefix+": "+text;
    if (window.devmode && window.console && window.console.log)
      console.log(text);
    else if (window.serverside)
      alert(text);
  };
}

function $local(selector, root) {
  return $(root)
            .find("*")
            .andSelf()
            .filter(selector)
            .not($(".component *", root).get())
            .not($("* .component", root).get());
}

function checkForReservedClass(elems, shutup) {
  if (! $.golf.reservedClassChecking || window.forcebot)
    return [];
  var RESERVED_CLASSES = [ "component", "golfbody", "golfproxylink" ];
  var badclass = (
    (typeof elems == "string") 
      ? $.map(RESERVED_CLASSES, function(c) { 
          return (c == elems) ? elems : null; 
        })
      : $.map(RESERVED_CLASSES, function(c) {
          return elems.hasClass(c) ? c : null;
        })
  );

  if (badclass.length && !shutup)
    d("WARN: using, adding, or removing reserved class names: "
      + badclass.join(","));
  return badclass;
}

window.d          = Debug("GOLF");
//window.Debug      = Debug;
window.Component  = Component;

if (serverside) {

  if (!window.forcebot) {
    $.fx.off = true;

    $.fn.fadeIn = $.fn.slideDown = function(speed, callback) {
      return $.fn.show.call(this, 0, callback);
    };

    $.fn.fadeOut = $.fn.slideUp = function(speed, callback) {
      return $.fn.hide.call(this, 0, callback);
    };

    // this is problematic because the js css manipulations are not carried
    // over in proxy mode; needs to be in a style tag maybe
    //(function(fadeTo) {
    //  jQuery.fn.fadeTo = function(speed, opacity, callback) {
    //    return fadeTo.call(this, 0, opacity, callback);
    //  };
    //})(jQuery.fn.fadeTo);

    $.fn.slideToggle = function(speed, callback) {
      return $.fn.toggle.call(this, 0, callback);
    };

    $.fn.show = (function(show) {
      return function(speed, callback) {
        return show.call(this, 0, callback);
      };
    })($.fn.show);

    $.fn.hide = (function(hide) {
      return function(speed, callback) {
        return hide.call(this, 0, callback);
      };
    })($.fn.hide);

    $.fn.bind = (function(bind) {
      var lastId = 0;
      return function(name, fn) {
        var jself = $(this);
        if (name == "click") {
          ++lastId;
          jself.attr("golfid", lastId);
          var e = "onclick";
          var a = "<a rel='nofollow' class='golfproxylink' href='?target="+
            lastId+"&amp;event=onclick'></a>";
          jself.wrap(a);
        } else if (name == "submit") {
          if (!jself.attr("golfid")) {
            ++lastId;
            jself.attr("golfid", lastId);
            jself.append(
              "<input type='hidden' name='event' value='onsubmit'/>");
            jself.append(
              "<input type='hidden' name='target' value='"+lastId+"'/>");
            if (!$.golf.events[lastId])
              $.golf.events[lastId] = [];
          }
          $.golf.events[jself.attr("golfid")].push(fn);
        }
        return bind.call(jself, name, fn);
      };
    })($.fn.bind);

    $.fn.trigger = (function(trigger) {
      return function(type, data) {
        var jself = $(this);
        // FIXME: this is here because hunit stops firing js submit events
        if (type == "submit") {
          var tmp = $.golf.events[jself.attr("golfid")];
          return $.each(tmp, function(){
            this.call(jself, type, data);
          });
        } else {
          return trigger.call($(this), type, data);
        }
      };
    })($.fn.trigger);
  }

  $.fn.val = (function(val) {
    return function(newVal) {
      if (arguments.length == 0)
        return $.trim(val.call($(this)));
      else
        return val.call($(this), newVal);
    };
  })($.fn.val);

  $.ajax = (function(ajax) {
    return function(options) {
      options.async = false;
      return ajax(options);
    };
  })($.ajax);

}

// install overrides on jQ DOM manipulation methods to accomodate components

(function() {

    $.each(
      [
        "append",
        "prepend",
        "after",
        "before",
        "replaceWith"
      ],
      function(k,v) {
        $.fn["_golf_"+v] = $.fn[v];
        $.fn[v] = function(a) { 
          var e = $(a instanceof Component ? a._dom : a);
          if (! (a instanceof Component))
            checkForReservedClass(e);
          $.golf.prepare(e);
          var ret = $.fn["_golf_"+v].call($(this), e);
          $(e.parent()).each(function() {
            $(this).removeData("_golf_prepared");
          });
          $.golf.jss.mark(this);
          if (a instanceof Component && a.onAppend)
            a.onAppend();
          return $(this);
        }; 
      }
    );

    $.each(
      [
        "addClass",
        "removeClass",
        "toggleClass"
      ],
      function(k,v) {
        $.fn["_golf_"+v] = $.fn[v];
        $.fn[v] = function() {
          // FIXME need to cover the case of $(thing).removeClass() with no
          // parameters and when `thing` _has_ a reserved class already
          var putback = {};
          var self = this;
          if (arguments.length) {
            checkForReservedClass(arguments[0]);
          } else if (v == "removeClass") {
            $.map(checkForReservedClass(this, true), function(c) {
              putback[c] = $.map(self, function(e) {
                return $(e).hasClass(c) ? e : null;
              });
            });
          }
          var ret = $.fn["_golf_"+v].apply(this, arguments);
          for (var i in putback)
            for (var j in putback[i])
              $(putback[i][j])._golf_addClass(i);
          $.golf.jss.mark(this);
          return ret;
        };
      }
    );

    $.fn._golf_css = $.fn.css;
    $.fn.css = function() {
      var log = this.data("_golf_css_log") || {};

      if (arguments.length > 0) {
        if (typeof arguments[0] == "string") {
          if (arguments.length == 1)
            return this._golf_css(arguments[0]);
          else
            log[arguments[0]] = arguments[1];
        } else {
          $.extend(log, arguments[0]);
        }

        for (var i in log)
          if (log[i] == "")
            delete log[i];

        this.data("_golf_css_log", log);
        var ret = this._golf_css(arguments[0], arguments[1]);
        $.golf.jss.mark(this);
        return ret;
      }
      return this;
    };

    $.fn.href = (function() {
      var uri2;
      return function(uri) {
        var uri1    = $.golf.parseUri(uri);
        var curHash = window.location.hash.replace(/^#/, "");
        var anchor;

        if (!uri2)
          uri2 = $.golf.parseUri(servletUrl);

        if (uri1.protocol == uri2.protocol 
            && uri1.authority == uri2.authority
            && uri1.directory.substr(0, uri2.directory.length) 
                == uri2.directory) {
          if (uri1.queryKey.path) {
            if (cloudfrontDomain.length)
              uri = cloudfrontDomain[0]+uri.queryKey.path;
          } else if (uri1.anchor) {
            if (!uri1.anchor.match(/^\//)) {
              anchor = (curHash ? curHash : "/") + uri1.anchor;
              uri = "#"+anchor;
            } else {
              anchor = uri1.anchor;
            }
            if (serverside)
              uri = servletUrl + anchor;
            else
              $(this).click(function() {
                $.golf.location(anchor);
                return false;
              });
          }
        }
        this.attr("href", uri);
      }; 
    })();
})();

// Static jQuery methods

$.Import = function(name) {
  var ret="", obj, basename, dirname, i;

  basename = name.replace(/^.*\./, "");
  dirname  = name.replace(/\.[^.]*$/, "");

  if (basename == "*") {
    obj = eval(dirname);
    for (i in obj)
      ret += "var "+i+" = "+dirname+"['"+i+"'];";
  } else {
    ret = "var "+basename+" = "+name+";";
  }

  return ret;
};

// main jQ golf object

$.golf = {

  controller: [],

  defaultRoute: "/home/",
  
  onRouteError: undefined,

  reservedClassChecking: true,

  loaded: false,

  events: [],

  singleton: {},

  location: function(hash) {
    if (!!hash)
      $.address.value(hash);
    else
      return $.golf.location.hash;
  },

  htmlEncode: function(text) {
    return text.replace(/&/g,   "&amp;")
               .replace(/</g,   "&lt;")
               .replace(/>/g,   "&gt;")
               .replace(/"/g,   "&quot;");
  },

  /* parseUri is based on work (c) 2007 Steven Levithan <stevenlevithan.com> */

  parseUri: (function() {
    var o = {
      strictMode: true,
      key: ["source","protocol","authority","userInfo","user","password",
            "host","port","relative","path","directory","file","query","anchor"],
      q:   {
        name:   "queryKey",
        parser: /(?:^|&)([^&=]*)=?([^&]*)/g
      },
      parser: {
        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
      }
    };
    return function(str) {
      var m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
          uri = {},
          i   = 14;

      while (i--) uri[o.key[i]] = m[i] || "";

      uri[o.q.name] = {};
      uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
        if ($1) uri[o.q.name][$1] = $2;
      });

      return uri;
    };
  })(),

  /* jss is based on: JSS - 0.4 by Andy Kent */

  jss: {
    
    mark: function(elem) {
      var cpdom;

      try {
        cpdom  = $(elem).parents(".component").eq(0);

        if (cpdom.size() == 0 || cpdom.data("_golf_constructing"))
          return;
      }
      catch (x) {
        d("WARN: can't do mark: "+x);
        return;
      }

      cpdom.data("_golf_jss_dirty", true);
      setTimeout(function() { $.golf.jss.doit(elem) }, 10);
    },

    doit: function(elem, force) {
      var cpdom, cpname, data, parsed;

      if ((serverside && !force) || window.forcebot)
        return;

      try {
        cpdom  = $(elem).parents(".component").eq(0);

        if (cpdom.size() == 0 || cpdom.data("_golf_constructing")
            || !cpdom.data("_golf_jss_dirty"))
          return;

        cpdom.removeData("_golf_jss_dirty");

        cpname = cpdom.attr("class").split(" ")[1].replace(/-/g, ".");
        data   = $.golf.components[cpname].css;
        parsed = this.parse(data);
      } 
      catch (x) {
        d("WARN: can't do jss: "+x);
        return;
      }

      $local("*", cpdom).each(
        function() {
          var jself = $(this);
          for (var i in jself.data("_golf_jss_log"))
            jself._golf_css(i, "");
          jself.data("_golf_jss_log", {});
          jself.data("_golf_jss_spc", {});
          jself._golf_css(jself.data("_golf_css_log"));
        }
      );

      $.each(parsed, function() {
        var selectors = this.selector;
        var attrs     = this.attributes;

        $.each(
          selectors.split(/ *, */),
          function(k, selector) {
            var parser = /([a-z][a-z0-9]*|\*)|(#[_a-z][-_a-z0-9]*)|(\.[_a-z][-_a-z0-9]*|\[[^\]]+\])|(:[-a-z]+)|( *[>+~] *| +)/gi;
            var pseudo = /^:(first-(line|letter)|before|after)$/;
            var base=32,TAG=1,ID=2,ATTR=3,PSEUDO=4,COMBI=5,weight=0,m;

            parser.lastIndex = 0;

            while (m = parser.exec(selector)) {
              if (m[ID]) {
                weight += 32*32;
              } else if (m[ATTR]) {
                weight += 32;
              } else if (m[PSEUDO]) {
                weight += (m[PSEUDO].match(pseudo) ? 1 : 10);
              } else if (m[TAG]) {
                weight += 1;
              }
            }

            $local(selector, cpdom).each(
              function() {
                var jself=$(this), log, i;

                if (!jself.data("_golf_jss_log"))
                  jself.data("_golf_jss_log", {});
                if (!jself.data("_golf_jss_spc"))
                  jself.data("_golf_jss_spc", {});

                log = jself.data("_golf_jss_spc");
                for (i in attrs) {
                  if (log[i] > weight)
                    delete attrs[i];
                  else
                    log[i] = weight;
                }

                $.extend(jself.data("_golf_jss_spc"), log);
                $.extend(jself.data("_golf_jss_log"), attrs);

                jself._golf_css(attrs);
                
                log = jself.data("_golf_css_log");
                for (i in log)
                  jself._golf_css(jself.data("_golf_css_log"));
              }
            );
          }
        );
      });
    },
    
    // ---
    // Ultra lightweight CSS parser, only works with 100% valid css 
    // files, no support for hacks etc.
    // ---
    
    sanitize: function(content) {
      if(!content) return '';
      var c = content.replace(/[\n\r]/gi,''); // remove newlines
      c = c.replace(/\/\*.+?\*\//gi,''); // remove comments
      return c;
    },
    
    parse: function(content) {
      var c = this.sanitize(content);
      var tree = []; // this is the css tree that is built up
      c = c.match(/.+?\{.+?\}/gi); // seperate out selectors
      if(!c) return [];
      for(var i=0;i<c.length;i++) // loop through selectors & parse attributes
        if(c[i]) 
          tree.push( { 
            selector: this.parseSelectorName(c[i]),
            attributes: this.parseAttributes(c[i]) 
          } );
      return tree;
    },
    
    parseSelectorName: function(content) { // extract the selector
      return $.trim(content.match(/^.+?\{/)[0].replace('{','')); 
    },
    
    parseAttributes: function(content) {
      var attributes = {};
      c = content.match(/\{.+?\}/)[0].replace(/[\{\}]/g,'').split(';').slice(0,-1);
      for(var i=0;i<c.length; i++){
        if(c[i]){
          c[i] = c[i].split(':');
          attributes[$.trim(c[i][0])] = $.trim(c[i][1]);
        }; 
      };
      return attributes;
    }

  },

  makePkg: function(pkg, obj) {
    if (!obj)
      obj = Component;

    if (!pkg || !pkg.length)
      return obj;

    var r = /^([^.]+)((\.)([^.]+.*))?$/;
    var m = pkg.match(r);

    if (!m)
      throw "bad package: '"+pkg+"'";

    if (!obj[m[1]])
      obj[m[1]] = {};

    return $.golf.makePkg(m[4], obj[m[1]]);
  },

  addComponent: function(data, name) {
    var js = 
      data
        .replace(/^(.|\n)*<script +type *= *("text\/golf"|'text\/golf')>/, "")
        .replace(/<\/script>(.|\n)*$/, "");
    var css = 
      data
        .replace(/^(.|\n)*<style +type *= *("text\/golf"|'text\/golf')>/, "")
        .replace(/<\/style>(.|\n)*$/, "");
    var html = $("<div/>")._golf_append(
      $(data)._golf_addClass("component")
             ._golf_addClass(name.replace(".", "-"))
    );
    html.find("style,script").remove();
    var cmp  = { 
      "name"  : name,
      "html"  : html.html(),
      "dom"   : $(html.html()),
      "css"   : css,
      "js"    : js 
    };
    var m, pkg;

    $.golf.components[name] = cmp;

    if (!(m = name.match(/^(.*)\.([^.]+)$/)))
      m = [ "", "", name ];

    pkg = $.golf.makePkg(m[1]);
    pkg[m[2]] = $.golf.componentConstructor(name);
  },

  setupComponents: function() {
    var cmp, name, i, m, scripts=[];

    d("Loading scripts/ directory...");
    for (name in $.golf.scripts)
      scripts.push(name);

    // sort scripts by name
    scripts = scripts.sort();

    for (i=0, m=scripts.length; i<m; i++)
      $.globalEval($.golf.scripts[scripts[i]].js);

    d("Setting up components now.");

    d("Loading components/ directory...");
    for (name in $.golf.components)
      $.golf.addComponent($.golf.components[name].html, name);

    if (!window.forcebot) {
      d("Loading styles/ directory...");
      $("head style").remove();
      for (name in $.golf.styles)
        $("head").append(
          "<style type='text/css'>"+$.golf.styles[name].css+"</style>");
    } else {
      $("head style").remove();
    }

    // in proxy mode we can't reload scripts really because we
    // can't expect them to be idempotent
    if ($.golf.loaded)
      return;

    d("Done loading directories...");
    $.golf.loaded = true;
  },

  doCall: function(obj, jQuery, $, argv, js, d) {
    d = !!d ? d : window.d;
    if (js.length > 10) {
      var f;
      eval("f = "+js);
      f.apply(obj, argv);
    }
  },
    
  onLoad: function() {
    if (serverside)
      $("noscript").remove();

    if (urlHash && !location.hash)
      window.location.replace(servletUrl + "#" + urlHash);

    $.address.change(function(evnt) {
        $.golf.onHistoryChange(evnt.value);
    });
  },

  onHistoryChange: (function() {
    var lastHash = "";
    return function(hash, b) {

      d("history change => '"+hash+"'");
      if (hash == "/") {
        $.golf.location(String($.golf.defaultRoute));
        return;
      }

      if (hash && hash != lastHash) {
        lastHash = hash;
        hash = hash.replace(/^\/+/, "/");
        $.golf.location.hash = String(hash+"/").replace(/\/+$/, "/");
        window.location.hash = "#"+$.golf.location.hash;
        $.golf.route(hash, b);
      }
    };
  })(),

  route: function(hash, b) {
    var theName, theAction, i, x, pat, match;
    if (!hash)
      hash = String($.golf.defaultRoute+"/").replace(/\/+$/, "/");

    theName         = hash;
    theAction       = null;

    if (!b) b = $("body > div.golfbody").eq(0);
    //b.empty();

    if ($.golf.controller) {
      for (i=0; i<$.golf.controller.length; i++) {
        pat   = new RegExp($.golf.controller[i].route);
        match = theName.match(pat);
        if (match) {
          theAction = $.golf.controller[i].action;
          if (theAction(b, match)!==true)
            break;
          theAction = null;
        }
      }
    } else {
      alert("GOLF is installed! Congratulations. Now make yourself an app.");
    }
  },

  prepare: function(p) {
    $("*", p.parent()).each(function() { 
      var jself = $(this);

      if (jself.data("_golf_prepared"))
        return;

      jself.data("_golf_prepared", true);

      // makes hrefs in links work in both client and proxy modes
      if (this.tagName == "A")
        jself.href(this.href);
    });
    return p;
  },

  require: function($fake) {
    return function(name, options) {
      var js, exports, target;

      try {
        if (!$.golf.plugins[name])
          throw "not found";

        js        = $.golf.plugins[name].js;
        exports   = {};
        target    = this;

        if (!$.golf.singleton[name])
          $.golf.singleton[name] = {};

        (function(jQuery,$,js,exports,singleton,options) {
          if (!singleton._init) {
            d("require: loading '"+name+"'");
            eval("exports._init = "+
              "function($,jQuery,exports,singleton) { "+js+" }");
            $.extend(true, singleton, exports);
          } else {
            d("require: loading '"+name+"' from cache");
          }
          singleton._init($,$,exports,singleton);
        }).call(target,$fake,$fake,js,exports,$.golf.singleton[name],options);
      } catch (x) {
        d("can't require("+name+"): "+x);
      }
      return exports;
    };
  },

  componentConstructor: function(name) {
    var result = function() {
      var argv = Array.prototype.slice.call(arguments);
      var obj  = this;
      var cmp  = $.golf.components[name];

      d("Instantiating component '"+$.golf.components[name].name+"'");

      // $fake: the component-localized jQuery

      var $fake = function( selector, context ) {
        var isHtml = /^[^<]*(<(.|\s)+>)[^>]*$/;

        // if it's a function then immediately execute it (DOM loading
        // is guaranteed to be complete by the time this runs)
        if ($.isFunction(selector)) {
          selector();
          return;
        }

        // if it's not a css selector then passthru to jQ
        if (typeof selector != "string" || selector.match(isHtml))
          return new $(selector);

        // it's a css selector
        if (context != null)
          return $(context)
                    .find(selector)
                    .not($(".component *", obj._dom).get())
                    .not($("* .component", obj._dom).get());
        else 
          return $(obj._dom)
                    .find("*")
                    .andSelf()
                    .filter(selector)
                    .not($(".component *", obj._dom).get())
                    .not($("* .component", obj._dom).get());
      };

      $.extend($fake, $);
      $fake.prototype = $fake.fn;

      $fake.component = cmp;

      $fake.require = $.golf.require($fake);

      if (cmp) {
        obj._dom = cmp.dom.clone();
        obj._dom.data("_golf_constructing", true);
        obj.require = $fake.require;
        checkForReservedClass(obj._dom.children().find("*"));
        $.golf.doCall(obj, $fake, $fake, argv, cmp.js, Debug(name));
        obj._dom.removeData("_golf_constructing");
        $.golf.jss.mark(obj._dom.children().eq(0));
        $.golf.jss.doit(obj._dom.children().eq(0));
      } else {
        throw "can't find component: "+name;
      }
    };
    result.prototype = new Component();
    return result;
  }

};

$.golf.location.params = function(i) {
  var p = String($.golf.location.hash).replace(/(^\/|\/$)/g,"").split("/");
  if (i == null)
    return p;
  else
    return p[(p.length + i) % p.length];
};

$.require = $.golf.require($);

$(function() {
  $.golf.onLoad();
});

})(jQuery);
