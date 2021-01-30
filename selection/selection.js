$(document).ready(function () {
  function filter(item, type) {
    var div = $("<div>");
    div.attr("style", "width: 100%");

    var check = $("<input>");
    check.attr("id", item);
    check.attr("type", "checkbox");

    var label = $("<label>");
    label.text(item);
    label.attr("for", item);

    div.append(check, label);
    $("#" + type).append(div);
  }

  for (var i = 0; i < protein.length; i++) {
    console.log(protein[i]);
    filter(protein[i], "protein");
  }

  for (var i = 0; i < vegetable.length; i++) {
    console.log(vegetable[i]);
    filter(vegetable[i], "vegetable");
  }

  for (var i = 0; i < carbohydrates.length; i++) {
    console.log(carbohydrates[i]);
    filter(carbohydrates[i], "carbohydrates");
  }
});
