/**
 * jquery.tablesort.js: Tiny table sorting script for jQuery.
 *
 * Fork me on github:
 *   http://github.com/micha/jquery-tablesort/
 *
 * Author:
 *   Micha Niskin <micha@thinkminimo.com>
 *   Copyright 2009, no rights reserved.
 */
(function($) {
  $.fn.sortable = function() {
    this.each(function(i_table, v_table) {
      var tbl = $(this).addClass("jquery-tablesort");
      if (tbl.get()[0].tagName.toUpperCase() == "TABLE") {
        $("th > *:first-child", tbl).each(function(i_col, v_col) {
          var th = $(this);
          th.click(function() { 
            var not  = tbl.find("td table *");
            tbl.find("tbody").not(not).each(function(i_tbody, v_tbody) {
              var rows = $(v_tbody).find("tr").not(not);
              var bak  = [], sort_as = null;
              rows.each(function(i_row, v_row) {
                var td = bak[i_row] = 
                  $(this).find("td").not(not).eq(i_col).text()+"";
                var type =  
                  (!isNaN(Date.parse(td)) ? "date" 
                    : (!isNaN(new Number(td)) ? "number" 
                      : (!isNaN(new Number(td.replace(/^\$/,""))) ? "currency" 
                        : "string")));
                sort_as = (!!sort_as && sort_as != type ? "string" : type);
              });
              rows = rows.sort(function(a, b) {
                var va = $(a).find("td").not(not).eq(i_col).text();
                var vb = $(b).find("td").not(not).eq(i_col).text();
                if (sort_as == "date") {
                  va = Date.parse(va);
                  vb = Date.parse(vb);
                  return (va < vb ? -1 : (va == vb ? 0 : 1));
                } else if (sort_as == "currency") {
                  return (va.replace(/^\$/, "") - vb.replace(/^\$/, ""));
                } else if (sort_as == "number") {
                  return (va - vb);
                } else if (sort_as == "string") {
                  va = va.toString();
                  vb = vb.toString();
                  return (va < vb ? -1 : (va == vb ? 0 : 1));
                } else {
                  return 0;
                }
              });
              $(".sort-asc", tbl).not(not).removeClass("sort-asc");
              $(".sort-desc", tbl).not(not).removeClass("sort-desc");
              if ((function() {
                for (var i=0; i<rows.size(); i++)
                  if (rows.eq(i).find("td").not(not).eq(i_col).text() != bak[i])
                    return false;
                return true;
              })()) {
                rows = $(rows.get().reverse());
                th.removeClass("sort-asc").addClass("sort-desc");
              } else {
                th.removeClass("sort-desc").addClass("sort-asc");
              }
              $(v_tbody).append(rows);
            });
            tbl.trigger('sort');
          });
        });
        tbl.trigger('sort');
      }
    });
    return this;
  };
})(jQuery);
