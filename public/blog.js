const obtenerUrl = (globalThis.location.pathname).split('/')
const main = document.querySelector('main')

if(obtenerUrl[1] === "sobre-nosotros"){
  fetch(globalThis.origin + '/nosotros')
    .then(res => res.json())
    .then(response => {
      main.innerHTML = response.css + response.texto
    })
}

if(obtenerUrl[1] === "TyC"){
  fetch(globalThis.origin + '/terminos-y-condiciones')
    .then(res => res.json())
    .then(response => {
      main.innerHTML = response.css + response.texto
    })
}



