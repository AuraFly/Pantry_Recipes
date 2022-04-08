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
        "src": viewedRecipe.recipe.images.REGULAR.url,
        "alt": "selectedRecImg"
    });


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
     


    $(recipeMain).append(mainHeader, mainImage )

bhBtn.addEventListener('click', movetoMain);