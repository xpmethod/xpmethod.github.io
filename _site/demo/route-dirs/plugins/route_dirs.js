(function() {

  var base = "routes";

  for (var i in $.golf.plugins)
    if (i.substr(0, base.length+1) == base+"/")
      $.each($.require(i).reverse(), function(k, v) {
        v.route = "^"+i.substring(base.length)+v.route+"$";
        $.golf.controller.unshift(v);
      });

})()
