$(document).ready(function () {
  $(".modal").addClass("is-active");
  $("#launchModal").click(function () {
    $(".modal").addClass("is-active");
  });

  $("#closebtn").click(function () {
    $(".modal").removeClass("is-active");
  });
});

var submitBtn = document.querySelector('.button');
var searchCount = 0;

//Main API function for edemam
function getapiEdemam() {
  let ingInputInit = document.querySelector('.input').value;
  var ingInput = ingInputInit.replace(/\s/g, '%2C%20');
  var algyOpt = [];
  var checkB = document.querySelectorAll('input[type=checkbox]:checked')
  var dietRes = document.getElementById('dietR').value;
  var searchHead = document.querySelector('.resultsh');

  //loop taking checked checkboxes and pushing them into an array
  for (var i = 0; i < checkB.length; i++) {
    algyOpt.push(checkB[i].value)
  }

  //replacing white space in search to something understandable for the request URL
  let cbConfirmed = algyOpt.toString().replaceAll(',', '&');

  // If statement making sure to add to the URL string only if there are items that are checked.
  if (cbConfirmed !== null) {
    var cbFinal = "&health=" + cbConfirmed
  } else if (cbConfirmed === null) {
    cbFinal = ""
  };

  //Main url generation
  var requestUrl =
    'https://api.edamam.com/api/recipes/v2?type=public&q=' +
    ingInput +
    '&app_id=69bfd030&app_key=a13d6c322f775c2a3d1839b8fbb5e288&limit=20' +
    '&' +
    dietRes +
    cbFinal;

  //searchcount var will be to keep track of how many times the loop has ran to make individual ids
    searchCount++
    localStorage.setItem("search" + searchCount, requestUrl);

  console.log(requestUrl)

  // main fetch function
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //pushing data to an array
      var dArray = [];
      dArray.push(data);

      //changes h3 after search is ran
      searchHead.textContent = "Here are recipes that use '" + ingInputInit + "':";

      //primary loop generating tiles for each result
      dArray[0].hits.forEach((iteminLoop) => {
        var resultTile = $("<div>")
        .attr({
          "class": "tile is-child"
        });

        $("#ancestor").append(resultTile);

        var recTitle = $("<p>")
        .text(iteminLoop.recipe.label)
        .attr({
          "class": "rtitle",
          "id": "title" + searchCount
        });

        var recImg = $("<img>")
        .attr({
          "class": "rimage",
          "id": "image" + searchCount,
          "src": iteminLoop.recipe.image,
          "alt": "recipeImg#" + searchCount
        });

        //removing decimals from calorie count and dividing the total calories by servings
        let calperServ = Math.floor(iteminLoop.recipe.calories / iteminLoop.recipe.yield)
        
        var recCal = $("<p>")
        .text("Calories Per Serving: " + calperServ)
        .attr({
          "class": "rCal",
          "id": "calories" + searchCount,
        });

        var neededIng = $("<p>")
        .text("Ingredients: " + iteminLoop.recipe.ingredients.length)
        .attr({
          "class": "rIngs",
          "id": "ingredients" + searchCount,
        });

        var recServ = $("<p>")
        .text("Servings: " + iteminLoop.recipe.yield)
        .attr({
          "class": "rServ",
          "id": "servings" + searchCount,
        });

        $(resultTile).append(recTitle, recImg, recCal, neededIng, recServ)

    });

    }
    );
}

//event listener for search button
submitBtn.addEventListener('click', getapiEdemam);
