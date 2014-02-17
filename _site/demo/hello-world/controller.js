$.golf.controller = [
  { route: ".*",
    action: function(container, params) {
      container.empty().append(
        "<h1>Hello, world! This is "+params[0]+"!</h1>"
      );
    }
  }
];
