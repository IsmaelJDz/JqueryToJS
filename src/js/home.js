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
    const actionList = await getData('https://yts.am/api/v2/list_movies.json?genre=action')
    console.log(actionList);

})()
