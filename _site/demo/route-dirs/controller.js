$.golf.controller = [

  { route: ".*",
    action: function(container, params) {
      container.empty().append("<p>Main controller default route.</p>");
    }
  }

];

$.require("route_dirs");
