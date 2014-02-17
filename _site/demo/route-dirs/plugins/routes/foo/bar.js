exports = [

  { route: "/baz/",
    action: function(container, params) {
      container.empty().append("<p>Mini-controller /foo/bar/baz/ route.</p>");
    }
  },

  { route: ".*",
    action: function(container, params) {
      container.empty().append("<p>Mini-controller /foo/bar/ default route.</p>");
    }
  }
];
