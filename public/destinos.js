const obtenerUrl = (globalThis.location.pathname).split('/')

fetch('http://213.218.240.150/destinos.json')
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
    if (obtenerUrl[1] === 'destino') {
      (document.querySelector('.presentation-destino-titulo')).innerHTML = '<em>Que puedes encontrar en ' + destino.titulo;
      (document.querySelector('.hoteles-planes-descripcion')).innerHTML = 'Hoteles con tarifa especial'
    } else {
      (document.querySelector('.presentation-destino-titulo')).innerHTML = '<em>Visitaras y disfrutaras de';
      (document.querySelector('.hoteles-planes-descripcion')).innerHTML = 'Como es el itinerario'
    }

    descripcionHoteles(destino.hoteles)
    actividadesDestino(destino.actividades)
    informacionAdicionalDestino(destino.informacion)
  })

function descripcionHoteles (hoteles) {
  const hotelesDestino = document.querySelector('.destino-hoteles')

  for (const hotel of hoteles) {
    const hotelCard = document.createElement('div')

    const hotelName = document.createElement('h4')

    const hotelDescripcion = document.createElement('h5')

    if (hotel.nombreHotel) {
      hotelName.innerHTML = hotel.nombreHotel
      hotelDescripcion.innerHTML = 'Cuenta con:'
    } else {
      hotelName.innerHTML = hotel.dia
      hotelDescripcion.innerHTML = 'Cronograma:'
    }

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

  for (const option of actividades) {
    const actividadCard = document.createElement('div')

    const actividadName = document.createElement('h3')
    actividadName.innerHTML = option.actividad

    const actividadImagen = document.createElement('img')
    actividadImagen.setAttribute('src', option.imagen)

    actividadCard.appendChild(actividadName)
    actividadCard.appendChild(actividadImagen)

    actividadesDestino.appendChild(actividadCard)
  }
}

function informacionAdicionalDestino (informacion) {
  const informacionDestino = document.querySelector('.informacion-destino')
  const informacionAdicional = document.createElement('ul')

  for (const nota of informacion) {
    const notaAdicional = document.createElement('li')
    notaAdicional.innerHTML = nota

    informacionAdicional.appendChild(notaAdicional)
  }
  informacionDestino.appendChild(informacionAdicional)
}
