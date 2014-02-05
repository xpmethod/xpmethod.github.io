(function($) {
  
  $.fn.tableize = function() {
    return $("<table cellspacing='0' cellpadding='0'></table>")
      .append("<caption></caption>")
      .append("<colgroup></colgroup>")
      .append("<thead></thead>")
      .append("<tfoot></tfoot>")
      .append($("<tbody/>").append($(this).map(function(k,v) {
        return $("<tr/>").append($(v).map(function(kk,vv) {
          return $("<td/>")[vv.jquery||vv.nodeName?"append":"text"](vv)[0];
        }))[0]
      }).get()));
  };

  $.each(["thead","tfoot"], function(k,v) {
    $.fn[v] = function(h) {
      return this.each(function(kk,vv) {
        $(vv).find(v).append($("<tr/>").append($(h).map(function(kkk,vvv) {
          var elem = v == "thead" ? "<th/>" : "<td/>";
          return $(elem).append($("<span/>").text(vvv))[0];
        })))
      });
    };
  });
  
  $.fn.twidth = function(h) {
    return this.each(function(k,v) {
      $(v).find("colgroup").empty().append($(h).map(function(kk,vv) {
        return $("<col/>").attr("width", vv)[0];
      }))
    });
  };

  $.fn.talign = function(h) {
    return this.each(function(k,v) {
      $(v).find("tr").not($("thead tr")).each(function(kk,vv) {
        $(vv).find("td").each(function(kkk,vvv) {
          $(vvv).attr("align", h[kkk]);
        });
      });
    });
  };

  $.fn.tcaption = function(cap) {
    this.find("caption").text(cap);
    return this;
  };

})(jQuery);
