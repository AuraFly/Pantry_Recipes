//Make modal open up
$(document).ready(function () {
  $(".modal").addClass("is-active");
  $("#launchModal").click(function () {
  $(".modal").addClass("is-active");
  });

  $("#closebtn").click(function () {
    $(".modal").removeClass("is-active");
  });
});

// function to pull favorites from local storage if available
favArray2 = JSON.parse(localStorage.getItem("favArr"))
favArray = []

if (favArray2 !== null) {
var favArray = favArray.concat(favArray2);
}

if (favArray.length >= 1) {
    favArray.forEach(function (iiL) {
        var favEntry = $("<div>")
        .attr({
        "class": "navbar-item",
        "id": "favitem"
        });

        $("#navbarFav").append(favEntry);

        console.log(favArray)

        var favLink = $("<a>")
        .text(iiL.favLabel1)
        .attr({
        "href": iiL.favUrl1
        });

        $(favEntry).append(favLink);
    });
}


//Make navbar burger active when screen sizre is small
document.addEventListener('DOMContentLoaded', () => {
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }
});

//clear text field and checkboxes
function ClearFields() {
document.getElementById("ingField").value = "";
let checks = document.querySelectorAll("input[type=checkbox]:checked");
for (let i = 0; i < checks.length; i++)
  checks[i].checked = false;
}

//variables used for the rest of the script
var submitBtn = document.getElementById('submitBtn');
var bhBtn = document.getElementById("bhBtn")
var searchCount = 0;
var elCount = 0;
var dArray = [];

// main function that will remove previous search results when a new one is ran
//it is called when the main search button is clicked as part of the getapiEdemam function
function remoldTiles(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}


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
    '&app_id=69bfd030&app_key=a13d6c322f775c2a3d1839b8fbb5e288&limit=20'

      // If statement making sure to add to the URL string only if there are items that are checked.
  if (cbConfirmed !== null) {
    requestUrl.append = '&health=' + cbConfirmed}

  if (dietRes !== "null") {
    requestUrl.append = '&' + dietRes}

  //searchcount var will be to keep track of how many times the loop has ran to make individual ids
    searchCount++
    localStorage.setItem("search" + searchCount, requestUrl);
    var elCount = 0;

  console.log(requestUrl)


  //sets var for parent tile that houses the following generated files
  //then calls the function that deletes all previous tiles
  const remTiles = document.querySelector('#ancestor');
  remoldTiles(remTiles);

  // main fetch function
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var dArray = [];
      //pushing data to an array
      dArray.push(data);
      localStorage.setItem("originalData", JSON.stringify(dArray))

      //changes h3 after search is ran
      searchHead.textContent = "Here are recipes that use '" + ingInputInit + "':";

      //primary loop generating tiles for each result
      dArray[0].hits.forEach((iteminLoop) => {

        //adds counter to created elements to separate the IDs of each element.
        elCount++;
        var recLink = iteminLoop.recipe.shareAs

        var resultTile = $("<div>")
        .attr({
          "class": "tile is-child"
        });
  
        $("#ancestor").append(resultTile);

        var recTitle = $("<a>")
        .text(iteminLoop.recipe.label)
        .attr({
          "class": "rtitle",
          "id": "title" + `${elCount}`,
          "href": recLink
        });


        var recImg = $("<img>")
        .attr({
          "class": "rimage",
          "id": "image" + elCount,
          "src": iteminLoop.recipe.image,
          "alt": "recipeImg#" + elCount,
          "href": recLink
        });

        //removing decimals from calorie count and dividing the total calories by servings
        let calperServ = Math.floor(iteminLoop.recipe.calories / iteminLoop.recipe.yield)
        
        var recCal = $("<p>")
        .text("Calories Per Serving: " + calperServ)
        .attr({
          "class": "rCal",
          "id": "calories" + elCount,
        });

        var neededIng = $("<p>")
        .text("Ingredients: " + iteminLoop.recipe.ingredients.length)
        .attr({
          "class": "rIngs",
          "id": "ingredients" + elCount,
        });

        var recServ = $("<p>")
        .text("Servings: " + iteminLoop.recipe.yield)
        .attr({
          "class": "rServ",
          "id": "servings" + elCount,
        });

        var recHealth = $("<p>")
        .text("Tags: " + iteminLoop.recipe.healthLabels.join(' / '))
        .attr({
          "class": "rHealth",
          "id": "health" + elCount,
        });

        var recBtn = $("<button>")
        .text("See Recipe Details")
        .attr({
          "class": "rBtn",
          "id": "rBtn" + elCount,
        });

        $(resultTile).append(recTitle, recImg, recCal, neededIng, recServ, recHealth, recBtn)

        
    });
  })
}

//event listener for search button
submitBtn.addEventListener('click', getapiEdemam);

$("body").on('click', '#rBtn1', function(){
  var ogData = JSON.parse(localStorage.getItem("originalData"));
  var viewedRecipe = ogData[0].hits[0];
  localStorage.setItem("storedRecipe", JSON.stringify(viewedRecipe))
  recipeDetails();
});
$("body").on('click', '#rBtn2', function(){
  var ogData = JSON.parse(localStorage.getItem("originalData"));
  var viewedRecipe = ogData[0].hits[1];
  localStorage.setItem("storedRecipe", JSON.stringify(viewedRecipe))
  recipeDetails();
});
$("body").on('click', '#rBtn3', function(){
  var ogData = JSON.parse(localStorage.getItem("originalData"));
  var viewedRecipe = ogData[0].hits[2];
  localStorage.setItem("storedRecipe", JSON.stringify(viewedRecipe))
  recipeDetails();
});
$("body").on('click', '#rBtn4', function(){
  var ogData = JSON.parse(localStorage.getItem("originalData"));
  var viewedRecipe = ogData[0].hits[3];
  localStorage.setItem("storedRecipe", JSON.stringify(viewedRecipe))
  recipeDetails();
});
$("body").on('click', '#rBtn5', function(){
  var ogData = JSON.parse(localStorage.getItem("originalData"));
  var viewedRecipe = ogData[0].hits[4];
  localStorage.setItem("storedRecipe", JSON.stringify(viewedRecipe))
  recipeDetails();
});
$("body").on('click', '#rBtn6', function(){
  var ogData = JSON.parse(localStorage.getItem("originalData"));
  var viewedRecipe = ogData[0].hits[5];
  localStorage.setItem("storedRecipe", JSON.stringify(viewedRecipe))
  recipeDetails();
});
$("body").on('click', '#rBtn7', function(){
  var ogData = JSON.parse(localStorage.getItem("originalData"));
  var viewedRecipe = ogData[0].hits[6];
  localStorage.setItem("storedRecipe", JSON.stringify(viewedRecipe))
  recipeDetails();
});
$("body").on('click', '#rBtn8', function(){
  var ogData = JSON.parse(localStorage.getItem("originalData"));
  var viewedRecipe = ogData[0].hits[7];
  localStorage.setItem("storedRecipe", JSON.stringify(viewedRecipe))
  recipeDetails();
});
$("body").on('click', '#rBtn9', function(){
  var ogData = JSON.parse(localStorage.getItem("originalData"));
  var viewedRecipe = ogData[0].hits[8];
  localStorage.setItem("storedRecipe", JSON.stringify(viewedRecipe))
  recipeDetails();
});
$("body").on('click', '#rBtn10', function(){
  var ogData = JSON.parse(localStorage.getItem("originalData"));
  var viewedRecipe = ogData[0].hits[9];
  localStorage.setItem("storedRecipe", JSON.stringify(viewedRecipe))
  recipeDetails();
});
$("body").on('click', '#rBtn11', function(){
  var ogData = JSON.parse(localStorage.getItem("originalData"));
  var viewedRecipe = ogData[0].hits[10];
  localStorage.setItem("storedRecipe", JSON.stringify(viewedRecipe))
  recipeDetails();
});
$("body").on('click', '#rBtn12', function(){
  var ogData = JSON.parse(localStorage.getItem("originalData"));
  var viewedRecipe = ogData[0].hits[11];
  localStorage.setItem("storedRecipe", JSON.stringify(viewedRecipe))
  recipeDetails();
});
$("body").on('click', '#rBtn13', function(){
  var ogData = JSON.parse(localStorage.getItem("originalData"));
  var viewedRecipe = ogData[0].hits[12];
  localStorage.setItem("storedRecipe", JSON.stringify(viewedRecipe))
  recipeDetails();
});
$("body").on('click', '#rBtn14', function(){
  var ogData = JSON.parse(localStorage.getItem("originalData"));
  var viewedRecipe = ogData[0].hits[13];
  localStorage.setItem("storedRecipe", JSON.stringify(viewedRecipe))
  recipeDetails();
});
$("body").on('click', '#rBtn15', function(){
  var ogData = JSON.parse(localStorage.getItem("originalData"));
  var viewedRecipe = ogData[0].hits[14];
  localStorage.setItem("storedRecipe", JSON.stringify(viewedRecipe))
  recipeDetails();
});
$("body").on('click', '#rBtn16', function(){
  var ogData = JSON.parse(localStorage.getItem("originalData"));
  var viewedRecipe = ogData[0].hits[15];
  localStorage.setItem("storedRecipe", JSON.stringify(viewedRecipe))
  recipeDetails();
});
$("body").on('click', '#rBtn17', function(){
  var ogData = JSON.parse(localStorage.getItem("originalData"));
  var viewedRecipe = ogData[0].hits[16];
  localStorage.setItem("storedRecipe", JSON.stringify(viewedRecipe))
  recipeDetails();
});
$("body").on('click', '#rBtn18', function(){
  var ogData = JSON.parse(localStorage.getItem("originalData"));
  var viewedRecipe = ogData[0].hits[17];
  localStorage.setItem("storedRecipe", JSON.stringify(viewedRecipe))
  recipeDetails();
});
$("body").on('click', '#rBtn19', function(){
  var ogData = JSON.parse(localStorage.getItem("originalData"));
  var viewedRecipe = ogData[0].hits[18];
  localStorage.setItem("storedRecipe", JSON.stringify(viewedRecipe))
  recipeDetails();
});
$("body").on('click', '#rBtn20', function(){
  var ogData = JSON.parse(localStorage.getItem("originalData"));
  var viewedRecipe = ogData[0].hits[19];
  localStorage.setItem("storedRecipe", JSON.stringify(viewedRecipe))
  recipeDetails();
});

function recipeDetails() {
  window.location = "./recipe-details.html";
}
