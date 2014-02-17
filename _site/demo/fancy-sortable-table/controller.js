
var data = [
  [ "22", 
    "first post", 
    "<p>This is the first post.</p>"
  ],
  [ "23", 
    "second post", 
    "<p>This is the second post.</p>"
  ],
  [ "24", 
    "fourth post", 
    "<p>This is the fourth post.</p>"
  ],
  [ "25", 
    "fifth post", 
    "<p>This is the fifth post.</p>"
  ]
];

$.golf.controller = [

  { route: ".*",
    action: function(container, params) {
      container.empty().append(new Component.TableExample(data));
    }
  }

];
