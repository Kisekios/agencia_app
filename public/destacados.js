const obtenerUrl = (globalThis.location.pathname).split('/')

// Inyección de imagen y url de planes destacados/promociones
fetch(globalThis.origin + '/destinos')
  .then(res => res.json())
  .then(response => {
    const destacados = document.querySelector('.destacados')
    if (obtenerUrl[1] === '') { // inyección al index
      buscarIndiceParaOrdenar(0, true)
    } else if (obtenerUrl[1] === 'nacionales') {
      buscarIndiceParaOrdenar(1, 'nacional')
      inyectarEnlacesDestinos('nacional')
    } else if (obtenerUrl[1] === 'internacionales') {
      buscarIndiceParaOrdenar(2, 'internacional')
      inyectarEnlacesDestinos('internacional')
    }

    function buscarIndiceParaOrdenar(n1, tipo) {
      const destacados = []
      for (let i = 0; i < response.length; i++) {
        if (response[i].destacado[n1] !== 0 && (response[i].viaje === tipo || tipo === true)) {
          destacados.push(response[i])
        }
      }

      for (let i = 1; i < destacados.length + 1; i++) {
        const orden = destacados.find(x => x.destacado[n1] === i)
        if (n1 === 0 && orden.bannerGrande !== false){
          renderDestacados(orden.bannerGrande, orden.url)
        }else {
          renderDestacados(orden.banner, orden.url)
        }
      }
    }

    function renderDestacados(imagen, url) {
      const enlaceDestacado = document.createElement('a')
      enlaceDestacado.setAttribute('href', url)

      const imageDestacado = document.createElement('img')
      imageDestacado.setAttribute('src', imagen)

      enlaceDestacado.appendChild(imageDestacado)
      destacados.appendChild(enlaceDestacado)
    }

    function inyectarEnlacesDestinos(tipoViaje) {
      const allDestinos = document.querySelector('.destinos-opciones')
      
      const tituloAllDestinos = document.createElement('h1')
      tituloAllDestinos.innerHTML = 'Todos los destinos ' + obtenerUrl[1]
      allDestinos.appendChild(tituloAllDestinos)
      for (let i = 0; i < response.length; i++) {
        if (response[i].viaje === tipoViaje) {
          const enlaceDestino = document.createElement('a')
          enlaceDestino.setAttribute('href', response[i].url)
          enlaceDestino.innerHTML = response[i].titulo

          allDestinos.appendChild(enlaceDestino)
        }
      }
    }
  })
