console.log('hola mundo!');
const noCambia = "Leonidas";

let cambia = "@LeonidasEsteban"

function cambiarNombre(nuevoNombre) {
  cambia = nuevoNombre
}

const getUser = new Promise(function(resolve, reject) {
  setTimeout(function () {
    reject('all fail');
  }, 3000)
});

// getUser
//   .then(function () {
//     console.log('Todo ok');
//   })
//   .catch(function (msg) {
//     console.log(msg);
//   })

Promise.all([
  getUser,
  getUser,
])
  .then(function () {
    console.log('promise all ok');
  })
  .catch(function() {
    console.log('promise all fail');
  })

//jquery
  // $.ajax('https://randomuser.me/api/', {
  //   method: 'GET',
  //   success: function (data) {
  //     console.log(data);
  //   }
  // })

//vanilla JS
fetch('https://randomuser.me/api/')
  .then(function(response){
    return response.json()
  })
  .then(function(data) {
    console.log('user', data.results[0].gender);
  })
  .catch(function(response){
    console.log(response);
  });

(async function load () {
    //await
    async function getData (url){
      const response = await fetch(url)
      const data = await response.json()
      return data;
    }

    const $actionContainer = document.querySelector('#action');
    const actionList = await getData('https://yts.am/api/v2/list_movies.json?genre=action')
    actionList.data.movies.forEach((movie) =>{
      const HTMLString = videoItemTemplate(movie);
      const $html = document.implementation.createHTMLDocument();
      $html.body.innerHTML = HTMLString;
      $actionContainer.append($html.body.children[0]);

    })

    const $dramaContainer = document.getElementById('#drama');
    const $animationContainer = document.getElementById('#animation');

    const $featuringContainer = document.getElementById('#featuring');
    const $form = document.getElementById('#form');
    const $home = document.getElementById('#home');

    const $modal = document.getElementById('modal');
    const $overlay = document.getElementById('overlay');
    const $hideModal = document.getElementById('hide-modal');

    const $modalTitle = $modal.querySelector('h1');
    const $modalImage = $modal.querySelector('img');
    const $modalDescription = $modal.querySelector('p');

    function videoItemTemplate(movie){
      return (
        `<div class="primaryPlaylistItem">
          <div class="primaryPlaylistItem-image">
            <img src="${movie.medium_cover_image}">
          </div>
          <h4 class="primaryPlaylistItem-title">
            ${movie.title}
          </h4>
        </div>`
      )
    }

    //console.log(videoItemTemplate('./src/images/covers/mejorandola.jpg', 'Este era el sitio de platzi en el 2014'));

})()
