$(document).ready(function () {
  var check_list = [];
  function filter(item, type) {
    var div = $("<div>");

    var check = $("<input>");
    check.attr("class", "selected");
    check.attr("type", "checkbox");

    var label = $("<label>");
    label.text(item);

    check.text(item);
    div.append(check, label);
    $("#" + type).append(div);
  }

  for (var i = 0; i < protein.length; i++) {
    filter(protein[i], "protein");
  }

  for (var i = 0; i < vegetable.length; i++) {
    filter(vegetable[i], "vegetable");
  }

  for (var i = 0; i < carbohydrates.length; i++) {
    filter(carbohydrates[i], "carbohydrates");
  }

  $(".selected").on("click", function () {
    if ($(this).attr("checked") == undefined) {
      $(this).attr("checked", true);
      check_list.push($(this).text());
    } else {
      $(this).attr("checked", false);
      check_list.remove($(this).text());
    }
    console.log(check_list);
  });

  Array.prototype.remove = function () {
    var what,
      a = arguments,
      L = a.length,
      ax;
    while (L && this.length) {
      what = a[--L];
      while ((ax = this.indexOf(what)) !== -1) {
        this.splice(ax, 1);
      }
    }
    return this;
  };

  $("#recipe-generator").on("click", function () {
    add_to_url();
  });

  function add_to_url() {
    var ingredient_list = "";
    for (var i = 0; i < check_list.length - 2; i++) {
      ingredient_list += check_list[i] + "+";
    }
    ingredient_list += check_list[check_list.length - 1];

    var url =
      "https://api.edamam.com/search?q=" +
      ingredient_list +
      "&from=0&to=50&app_id=8de35897&app_key=8aeb83ccc4f0fd0b1fd7784e91bfe75f";

    getApi(url);
  }

  function getApi(url) {
    $.ajax({
      url: url,
      method: "GET",
    }).then(function (res) {
      console.log(res);
    });
  }
});
