function movetoMain () {
    window.location = "./index.html";
}

var viewedRecipe = JSON.parse(localStorage.getItem("storedRecipe"));

    var recipeMain = $("<div>")
    .attr({
    "class": "tile is-child",
    "id": "main1"
    });

    $("#mainParent").append(recipeMain);

    var mainHeader = $("<h2>")
    .text(viewedRecipe.recipe.label)
    .attr({
        "class": "recipeHeader",
        "id": "recipeH2",
    });

    var mainp = $("<p>")
    .text("~" + viewedRecipe.recipe.dishType[0].toUpperCase() + "  /  " + viewedRecipe.recipe.cuisineType[0].toUpperCase() + "  /  Prep Time: " + viewedRecipe.recipe.totalTime + " minutes" + "~")
    .attr({
        "class": "headp",
        "id": "headSub",
    });

    var mainp2 = $("<a>")
    .text("Jump To " + viewedRecipe.recipe.source + " for Preparation Steps")
    .attr({
        "href": viewedRecipe.recipe.url,
        "id": "link1"
    });

    var mainImage = $("<img>")
    .attr({
        "class": "mainImage",
        "id": "mainImage1",
        "src": viewedRecipe.recipe.images.REGULAR.url,
        "alt": "selectedRecImg"
    });

    var mainBtn = $("<button>")
    .text("Save as Favorite")
    .attr({
        "class": "button is-primary",
        "id": "saveBtn"
    });

    $(recipeMain).append(mainHeader, mainImage, mainp, mainp2, mainBtn);

    var recipeSec = $("<div>")
    .attr({
    "class": "tile is-parent",
    "id": "main2"
    });

    $("#secondaryParent").append(recipeSec);

    
    var mainingUL = $("<ul>")
    .text("INGREDIENTS:")
    .attr({
        "class": "tile is-child is-vertical is-4",
        "id": "ingUl"
    });

    var mainnutrUL = $("<ul>")
    .text("NUTRITIONAL INFO:")
    .attr({
        "class": "tile is-child is-vertical is-4",
        "id": "nutriUl"
    });

    viewedRecipe.recipe.ingredientLines.forEach((iteminloop) => {
        var ingLi = $("<li>")
        .text(iteminloop)
        .attr({
            "class": "litems",
            "id": "ingLi"
        })

        $(mainingUL).append(ingLi);
    });

    viewedRecipe.recipe.digest.forEach((iteminloop) => {
        var nutrLi = $("<li>")
        .text(iteminloop.label + ": " + Math.floor(iteminloop.daily) + iteminloop.unit)
        .attr({
            "class": "litems",
            "id": "nutriLi"
    })

        $(mainnutrUL).append(nutrLi);
    });

    $(recipeSec).append(mainingUL, mainnutrUL);

    navigator.geolocation.getCurrentPosition(
        function (position) {
           initMap(position.coords.latitude, position.coords.longitude)
        },
     );
     
     function initMap(lat, lng) {
     
     var myLatLng = {
        lat,
        lng
     };
     
     var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: myLatLng
     });
     
     var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
     });
     }
     

     $("body").on('click', '#saveBtn', function(){

        var favEntry = $("<div>")
        .attr({
        "class": "navbar-item",
        "id": "favitem"
        });

        $("#navbarFav").append(favEntry);

        var favLink = $("<a>")
        .text(viewedRecipe.recipe.label)
        .attr({
        "href": viewedRecipe.recipe.url
        });

        $(favEntry).append(favLink);

      });


bhBtn.addEventListener('click', movetoMain);
