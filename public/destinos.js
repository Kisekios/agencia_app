const obtenerUrl = (globalThis.location.pathname).split('/')

fetch('http://192.168.0.8:1234//destinos.json')
  .then(res => res.json())
  .then(response => {
    const destino = response.find(x => x.id === obtenerUrl[2])

    const imagen = document.querySelector('.imagen')
    const nameDestino = document.querySelector('.destino-name')
    const descripcionDestino = document.querySelector('.destino-descripcion')
    const incluyeDestino = document.querySelector('.destino-incluye')

    imagen.setAttribute('src', destino.banner)
    nameDestino.innerHTML = destino.titulo
    descripcionDestino.innerHTML = destino.descripcion
    incluyeDestino.innerHTML = destino.incluye

    descripcionHoteles(destino.hoteles)
    actividadesDestino(destino.actividades)
    informacionAdicionalDestino(destino.informacion)
  })

function descripcionHoteles (hoteles) {
  const hotelesDestino = document.querySelector('.destino-hoteles')

  for (hotel of hoteles) {
    const hotelCard = document.createElement('div')

    const hotelName = document.createElement('h4')
    hotelName.innerHTML = hotel.nombreHotel

    const hotelDescripcion = document.createElement('h5')
    hotelDescripcion.innerHTML = 'Cuenta con:'

    const hotelOfrece = document.createElement('ul')

    hotel.ofrece.forEach(element => {
      const puntoOfreceHotel = document.createElement('li')
      puntoOfreceHotel.innerHTML = '→ ' + element

      hotelOfrece.appendChild(puntoOfreceHotel)
    })

    hotelCard.appendChild(hotelName)
    hotelCard.appendChild(hotelDescripcion)
    hotelCard.appendChild(hotelOfrece)
    hotelesDestino.appendChild(hotelCard)
  }
}

function actividadesDestino (actividades) {
  const actividadesDestino = document.querySelector('.destino-actividades')

  for (opcion of actividades) {
    const actividadCard = document.createElement('div')

    const actividadName = document.createElement('h3')
    actividadName.innerHTML = opcion.actividad

    const actividadImagen = document.createElement('img')
    actividadImagen.setAttribute('src', opcion.imagen)

    actividadCard.appendChild(actividadName)
    actividadCard.appendChild(actividadImagen)

    actividadesDestino.appendChild(actividadCard)
  }
}

function informacionAdicionalDestino (informacion) {
  const informacionDestino = document.querySelector('.informacion-destino')
  const informacionAdicional = document.createElement('ul')

  for (nota of informacion) {
    const notaAdicional = document.createElement('li')
    notaAdicional.innerHTML = nota

    informacionAdicional.appendChild(notaAdicional)
  }
  informacionDestino.appendChild(informacionAdicional)
}
