const obtenerUrl = (globalThis.location.pathname).split('/')

fetch('http://192.168.0.8:1234//destinos.json')
  .then(res => res.json())
  .then(response => {
    const destino = response.find(x => x.id === obtenerUrl[2])

    const imagen = document.querySelector('.imagen')
    imagen.setAttribute('src', destino.banner)
  })
