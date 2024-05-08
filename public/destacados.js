const obtenerUrl = (globalThis.location.pathname).split('/')

// Inyeccion de imagen y url de planes destacados/promociones
fetch('http://192.168.0.16:1234/destinos.json')
  .then(res => res.json())
  .then(response => {
    const destacados = document.querySelector('.destacados')
    if (obtenerUrl[1] === '') { // inyección al index
      buscarIndiceParaOrdenar(0, 2)
    } else if (obtenerUrl[1] === 'nacionales') {
      buscarIndiceParaOrdenar(1, 3)
    } else if (obtenerUrl[1] === 'internacionales') {
      buscarIndiceParaOrdenar(1, 4)
    }

    function buscarIndiceParaOrdenar(n1, n2) {
      const destacados = []
      for (let i = 0; i < response.length; i++) {
        if (response[i].destacado[n1] && response[i].destacado[n2] !== 0) {
          destacados.push(response[i])
        }
      }

      for (let i = 1; i < destacados.length + 1; i++) {
        const orden = destacados.find(x => x.destacado[n2] === i)
        renderDestacados(orden.banner, orden.url)
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
  })
