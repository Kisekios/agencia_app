fetch('http://192.168.0.8:1234/destacados.json')
  .then(res => res.json())
  .then(response => {
    const destacados = document.querySelector('.destacados')
    for (destacado of response) {
      const enlaceDestacado = document.createElement('a')
      enlaceDestacado.setAttribute('href', destacado.url)

      const imageDestacado = document.createElement('img')
      imageDestacado.setAttribute('src', destacado.imagen)

      enlaceDestacado.appendChild(imageDestacado)
      destacados.appendChild(enlaceDestacado)
    }
  })
