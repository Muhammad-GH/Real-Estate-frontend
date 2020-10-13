import $ from "jquery";

$.fn.multiSelect = function (options) {
  // Default options
  var settings = $.extend(
    {
      label: "Select",
    },
    options
  );

  var wrap = this,
    selectEl = wrap.children("select"),
    inputEl = wrap.children("input");

  var mainEl = $("<div></div>").addClass("multiselect-wrap"),
    selectedEl = $("<div></div>")
      .addClass("multiselect-selected")
      .text(settings.label),
    listEl = $("<div></div>")
      .addClass("multiselect-list")
      .css("display", "none");

  selectEl.find("option").each(function () {
    var option = $(this);
    var optionEl = $("<div></div>")
      .text(option.text())
      .attr("data-val", option.val());
    optionEl.appendTo(listEl);

    optionEl.on("click", function () {
      $(this).toggleClass("selected-option");
      selectedEl.empty();
      let selectedVal = [];
      let currentElem = null;
      listEl.find(".selected-option").each(function () {
        var $this = $(this),
          span = $("<span></span>").text($this.text());

        span.appendTo(selectedEl);

        if ($this.text() === "Custom") {
          $("#custom-message1").slideDown();
        } else if ($this.text() === "Custom 1") {
          $("#custom-message2").slideDown();
        } else {
          $("#custom-message1").hide();
          $("#custom-message2").hide();
        }
        currentElem = $this.attr("data-val");
        selectedVal.push($this.attr("data-val"));
      });

      if (inputEl.length > 0) {
        inputEl.val(selectedVal.join(","));

        if (selectedVal.length > 0) {
          // get the last DIV which ID starts with ^= "klon"
          var $div = $('div[id^="klon"]:last');

          // Read the Number from that DIV's ID (i.e: 3 from "klon3")
          // And increment that number by 1
          var num = parseInt($div.prop("id").match(/\d+/g), 10) + 1;

          // Check if a value exists in the fruits array
          // Clone it and assign the new ID (i.e: from num 4 to ID "klon4")
          var $klon = $div.clone().prop("id", "klon" + num);

          // Finally insert $klon wherever you want
          $div.after($klon);
        } else {
          $('div[id^="klon"]:last').remove();
        }
      }
    });
  });

  selectedEl.on("click", function () {
    if (listEl.hasClass("multi-list-opened")) {
      listEl.slideUp(function () {
        listEl.removeClass("multi-list-opened");
      });
    } else {
      listEl.slideDown(function () {
        listEl.addClass("multi-list-opened");
      });
    }
  });
  mainEl.append(selectedEl).append(listEl);
  wrap.append(mainEl);
  selectEl.hide();

  $("html").click(function (e) {
    if (
      !$(e.target).is(wrap) &&
      !$(e.target).is(listEl) &&
      !$(e.target).is(selectedEl) &&
      !$(e.target).is(mainEl) &&
      !$(e.target).is(listEl.children()) &&
      !$(e.target).is(selectedEl.children())
    ) {
      if (listEl.hasClass("multi-list-opened")) {
        console.log("html event");
        listEl.slideUp(function () {
          listEl.removeClass("multi-list-opened");
        });
      }
    }
  });
  return this;
};
