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
      const data = response.json()
      return data;

    }

    const $form = document.getElementById('form');
    const $home = document.getElementById('home');
    const $featuringContainer = document.getElementById('featuring');

    function createAttributes($element, attributes) {
      for (const attribute in attributes) {
        $element.setAttribute(attribute, attributes[attribute])
      }
    }

    /* Agregamos la base de la url como fija por lo tanto es una constante
      y se comenta por que al hacer la peticion Get sobre la API esta fallando
      al devolvernos una respuesta, por lo que bajamos la api en formato Json.
    */
    const BASE_API_EXTERNA = 'https://yts.am/api/v2/';
    const BASE_API_INTERNA = './src/js/api/';

    function featuringTemplate(peli) {
      return (`
        <div class="featuring">
          <div class="featuring-image">
            <img src="${peli.medium_cover_image}" width="70" height="100" alt="">
          </div>
          <div class="featuring-content">
            <p class="featuring-title">Pelicula encontrada</p>
            <p class="featuring-album">${peli.title}</p>
          </div>
        </div>
      `)
    }

    $form.addEventListener('submit', async (event) => {
      event.preventDefault();
      $home.classList.add('search-active')
      const $loader = document.createElement('img');
      createAttributes($loader, {
        src: 'src/images/loader.gif',
        height: 50,
        width: 50,
      })
      $featuringContainer.append($loader);

      const data = new FormData($form);
      /*Desesctructuracion de objetos entramos al objeto movies de data y solo asignamos
        su valor desestructurado a la funcion featuringTemplate en la poscision 0
      */
      const {
        data: {
          movies: pelis
        }
      } = await getData(`${BASE_API_EXTERNA}list_movies.json?limit=1&query_term=${data.get('name')}`)
      const HTMLMovie = featuringTemplate(pelis[0]);
      $featuringContainer.innerHTML = HTMLMovie;
    })

    //const actionList = await getData('https://yts.am/api/v2/list_movies.json?genre=action')
    const actionList = await getData(`${BASE_API_INTERNA}action.json`)
    const dramaList = await getData('./src/js/api/drama.json')
    //const dramaList = await getData('https://yts.am/api/v2/list_movies.json?genre=drama')
    //const animationList = await getData('https://yts.am/api/v2/list_movies.json?genre=anime')
    const animationList = await getData('./src/js/api/terror.json')

    function createTemplate(HTMLString){
      const $html = document.implementation.createHTMLDocument();
      $html.body.innerHTML = HTMLString;
      return $html.body.children[0];
    }

    function showModal($element){
      $overlay.classList.add('active');
      $modal.style.animation = 'modalIn .8s forwards';
      const id = $element.dataset.id;
      const category = $element.dataset.category;
    }

    function addEventClick($element){
      $element.addEventListener('click', showModal)
    }

    function renderMovieList(list, $container, category) {
      $container.children[0].remove();
      list.forEach((movie) =>{
        const HTMLString = videoItemTemplate(movie, category);
        const movieElement = createTemplate(HTMLString)
        $container.append(movieElement);
        addEventClick(movieElement);
      })
    }
    const $actionContainer = document.querySelector('#action');
    renderMovieList(actionList.data.movies, $actionContainer, 'action');
    const $dramaContainer = document.getElementById('drama');
    renderMovieList(dramaList.data.movies, $dramaContainer, 'drama');
    const $animationContainer = document.getElementById('animation');
    renderMovieList(animationList.data.movies, $animationContainer, 'animation');

    const $modal = document.getElementById('modal');
    const $overlay = document.getElementById('overlay');
    const $hideModal = document.getElementById('hide-modal');

    $hideModal.addEventListener('click', ()=>{
      $overlay.classList.remove('active');
      $modal.style.animation = 'modalOut .8s forwards';
    })

    const $modalTitle = $modal.querySelector('h1');
    const $modalImage = $modal.querySelector('img');
    const $modalDescription = $modal.querySelector('p');
    var prueba;

    function videoItemTemplate(movie, category){
      return (
        `<div class="primaryPlaylistItem" data-id="${movie.id}" data-category="${category}">
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
