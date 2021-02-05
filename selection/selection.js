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
      var hit = res.hits[0];
      console.log(hit);
      var container = $("<div>").attr("class", "grid-container");
      var grid = $("<div>").attr(
        "class",
        "grid-x grid-margin-x small-up-2 medium-up-3"
      );
      for (var i = 0; i < 5; i++) {
        var hit = res.hits[i];
        var title_text = hit.recipe.label;
        var image_text = hit.recipe.image;
        var url_text = hit.recipe.url;

        var recipe = [title_text, image_text, url_text];

        var cell = $("<div>").attr("class", "cell");
        var card = $("<div>").attr("class", "card");
        var title = $("<h3>").text(title_text);
        var img = $("<img>").attr("src", image_text);
        var save_btn = $("<button>").text("Save Recipe");
        save_btn.attr("class", "button");
        save_btn.attr("type", "button");
        save_btn.attr("value", recipe);
        card.append(title, img, save_btn);
        cell.append(card);
        grid.append(cell);

        save_btn.click(function () {
          var recipe = $(this).attr("value");
          var recipe_array = recipe.split(",");
          save_recipe_list(recipe_array);
          console.log(recipe_array[0]);
        });
      }

      container.append(grid);
      $("#generate").append(container);
    });
  }

  function save_recipe_list(recipe) {
    localStorage.setItem(recipe[0], recipe);

    render_save_list();
  }
  render_save_list();
  function render_save_list() {
    for (var i in localStorage) {
      if (
        localStorage.hasOwnProperty(i) &&
        localStorage.key(i) != "home-address"
      ) {
        var array = localStorage.getItem(i).split(",");
        var list = $("<li>");

        var list_div = $("<div>");
        var list_text = $("<p>").text(array[0]);
        var list_img = $("<img>").attr("src", array[1]);
        var list_url = $("<a>").attr("href", array[2]);
        list_url.attr("class", "card-divider wrap");
        list_url.text(array[2]);

        list_div.append(list_text, list_img, list_url);
        list.append(list_div);
        $("#save_list").append(list);
      }
    }
  }
});
