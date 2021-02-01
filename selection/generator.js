$(document).ready(function () {
  var recipeGen = $("#recipe-generator");

  recipeGen.click(function () {
    console.log("hello");

    var ingredient1 = "chicken";
    var ingredient2 = "rice";
    var ingredient3 = "peppers";
    var ingredient4 = "cheese";
    var ingredient5 = "salt";
    var queryUrl =
      "https://api.edamam.com/search?q=" +
      ingredient1 +
      "+" +
      ingredient2 +
      "+" +
      ingredient3 +
      "+" +
      ingredient4 +
      "+" +
      ingredient5 +
      "&from=0&to=50&app_id=8de35897&app_key=8aeb83ccc4f0fd0b1fd7784e91bfe75f";

    $.ajax({
      url: queryUrl,
      method: "GET",
    }).then(function (res) {
      console.log(res);
      $("#card-one").empty();
      $("#card-two").empty();
      $("#card-three").empty();
      $("#card-four").empty();
      $("#card-five").empty();
      $("#recipe-one-title").empty();
      $("#recipe-two-title").empty();
      $("#recipe-three-title").empty();
      $("#recipe-four-title").empty();
      $("#recipe-five-title").empty();
      var recipeOne = res.hits[Math.floor(Math.random() * (10 - 1))];
      var recipeTwo = res.hits[Math.floor(Math.random() * (20 - 12) + 11)];
      var recipeThree = res.hits[Math.floor(Math.random() * (30 - 22) + 21)];
      var recipeFour = res.hits[Math.floor(Math.random() * (40 - 32) + 32)];
      var recipeFive = res.hits[Math.floor(Math.random() * (50 - 42) + 41)];
      var recOneTitle = recipeOne.recipe.label;
      var recTwoTitle = recipeTwo.recipe.label;
      var recThreeTitle = recipeThree.recipe.label;
      var recFourTitle = recipeFour.recipe.label;
      var recFiveTitle = recipeFive.recipe.label;
      var recOneImg = $("<img>").attr("src", recipeOne.recipe.image);
      var recTwoImg = $("<img>").attr("src", recipeTwo.recipe.image);
      var recThreeImg = $("<img>").attr("src", recipeThree.recipe.image);
      var recFourImg = $("<img>").attr("src", recipeFour.recipe.image);
      var recFiveImg = $("<img>").attr("src", recipeFive.recipe.image);
      var titleOneHold = $("<h4>").text(recOneTitle);
      var titleTwoHold = $("<h4>").text(recTwoTitle);
      var titleThreeHold = $("<h4>").text(recThreeTitle);
      var titleFourHold = $("<h4>").text(recFourTitle);
      var titleFiveHold = $("<h4>").text(recFiveTitle);
      var saveButton1 = $("<button>").addClass("button");
      var saveButton2 = $("<button>").addClass("button");
      var saveButton3 = $("<button>").addClass("button");
      var saveButton4 = $("<button>").addClass("button");
      var saveButton5 = $("<button>").addClass("button");
      saveButton1.text("Save This Recipe");
      saveButton2.text("Save This Recipe");
      saveButton3.text("Save This Recipe");
      saveButton4.text("Save This Recipe");
      saveButton5.text("Save This Recipe");
      $("#card-one").append(titleOneHold, recOneImg, saveButton1);
      $("#card-two").append(titleTwoHold, recTwoImg, saveButton2);
      $("#card-three").append(titleThreeHold, recThreeImg, saveButton3);
      $("#card-four").append(titleFourHold, recFourImg, saveButton4);
      $("#card-five").append(titleFiveHold, recFiveImg, saveButton5);
    });
  });
});
