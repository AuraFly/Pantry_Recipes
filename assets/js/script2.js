function movetoMain () {
    window.location = "./index.html";
}

var viewedRecipe = JSON.parse(localStorage.getItem("storedRecipe"));

    var recipeMain = $("<div>")
    .attr({
      "class": "tile is-child"
    });

    $("#mainParent").append(recipeMain);

    var mainHeader = $("<h2>")
    .text(viewedRecipe.recipe.label)
    .attr({
      "class": "recipeHeader",
      "id": "recipeH2",
    });

    var mainImage = $("<img>")
    .attr({
      "class": "mainImage",
      "id": "mainImage1",
      "src": viewedRecipe.recipe.images.LARGE.url,
      "alt": "selectedRecImg"
    });

    $(recipeMain).append(mainHeader, mainImage )

bhBtn.addEventListener('click', movetoMain);