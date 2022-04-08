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
    .text("~" + viewedRecipe.recipe.dishType[0].toUpperCase() + "/" + viewedRecipe.recipe.cuisineType[0].toUpperCase() + "~")
    .attr({
        "class": "headp",
        "id": "headSub",
    });

    var mainImage = $("<img>")
    .attr({
        "class": "mainImage",
        "id": "mainImage1",
        "src": viewedRecipe.recipe.images.REGULAR.url,
        "alt": "selectedRecImg"
    });

    var mainingUL = $("<ul>")
    .text("INGREDIENTS:")
    .attr({
        "class": "ingrUl",
    });

    var mainnutrUL = $("<ul>")
    .text("NUTRITIONAL INFO:")
    .attr({
        "class": "ingrUl",
    });

    $(recipeMain).append(mainHeader, mainImage, mainp, mainingUL, mainnutrUL );

    viewedRecipe.recipe.ingredientLines.forEach((iteminloop) => {
        var ingLi = $("<li>")
        .text(iteminloop)
        .attr({
            "class": "listitems"
        })

        $(mainingUL).append(ingLi);
    });

    // viewedRecipe.recipe.totalDaily.forEach((iteminloop) => {
    //     var nutrLi = $("<li>")
    //     .text(iteminloop)
    //     .attr({
    //         "class": "listitems"
    //     })

    //     $(mainnutrUL).append(nutrLi);
    // });

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
     

bhBtn.addEventListener('click', movetoMain);