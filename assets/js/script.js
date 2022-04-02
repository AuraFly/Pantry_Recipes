<<<<<<< HEAD
// Creating a branch for Shane's contributions
=======
var submitBtn = document.querySelector('.button');

function getApi() {
  let ingInputInit = document.querySelector('.input').value;
  var ingInput = ingInputInit.replace(/\s/g, '%2C%20');
  var algyOpt = [];
  var checkB = document.querySelectorAll('input[type=checkbox]:checked')
  var dietRes = document.getElementById('dietR').value;

for (var i = 0; i < checkB.length; i++) {
  algyOpt.push(checkB[i].value)
}

  let cbConfirmed = algyOpt.toString().replaceAll(',', '&');
  console.log(cbConfirmed);



    var requestUrl = 
    'https://api.edamam.com/api/recipes/v2?type=public&q=' + 
    ingInput + 
    '&app_id=69bfd030&app_key=a13d6c322f775c2a3d1839b8fbb5e288&limit=20' + 
    '&health=' + 
    cbConfirmed + 
    '&' + 
    dietRes;

    console.log(requestUrl)

    fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //output writes to console for the moment - expand array and objects to see details. Once we decide a place to put the data, I can build this out easy.
      console.log(data)
      }
    );
}

submitBtn.addEventListener('click', getApi);
>>>>>>> 7d035cc083b3a3d8525585dd12d64cc1d55370a9
