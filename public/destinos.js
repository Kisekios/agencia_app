const obtenerUrl = (globalThis.location.pathname).split('/')
//cSpell: disable

fetch(globalThis.origin + '/destino-' + obtenerUrl[2])
  .then(res => res.json())
  .then(response => {
    const containMain = document.querySelector('main')
    let subtitulos = []

    if (obtenerUrl[1] === 'destino') {
      subtitulos[0] = 'Hoteles con tarifa especial'
      subtitulos[1] = `<em>Que puedes encontrar en <strong>${response.titulo}</strong></em>`
    } else {
      subtitulos[0] = 'Itinerario de viaje'
      subtitulos[1] = 'Visitaras y disfrutaras de'
    }

    containMain.innerHTML = `<section>
      <img class="imagen" src="${response.banner}">
      <article>
        <h1>${response.titulo}</h1>
        <p>${response.descripcion}</p>
        <h3>Que Incluye?</h3>
        <p>${response.incluye}</p>
        <h3>${subtitulos[0]}</h3>
        <section class="destino-hoteles"></section>
        <h3>Buscas otro plan?</h3>
        <p>Disponemos de la gran mayoría de hoteles en el destino, Comunícate con nosotros y te ayudaremos a encontrar tus vacaciones como las sueñas</p>
      </article>
    </section>
    <section>
      <h1>${subtitulos[1]}</h1>
      <section class="destino-actividades"></section>
    </section>
    <section>
      <h2>Informacion Adicional</h2>
      <div class="informacion-destino"></div>
      <div>
        <ul>
          <li>Puedes reservar mínimo con el 30%, paga el saldo a cuotas, a 30 días antes del viaje debes tener el total
            del viaje pago</li>
          <li>Niños menores de 2 años no tiene costo, solo paga póliza de asistencia medica</li>
          <li>
            Niños mayores de 3 años pagan la totalidad del plan
          </li>
          <li>El plan incluye póliza de asistencia medica en caso de cualquier eventualidad</li>
        </ul>
      </div>
      <p>Si tienes alguna duda, comunícate con nosotros y te brindaremos la Información para responder a tus dudas</p>
    </section>
    `

    descripcionHoteles(response.hoteles)
    actividadesDestino(response.actividades)
    informacionAdicionalDestino(response.informacion)
  })

function descripcionHoteles(hoteles) {
  const hotelesDestino = document.querySelector('.destino-hoteles')

  for (const hotel of hoteles) {
    const hotelCard = document.createElement('article')
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

function actividadesDestino(actividades) {
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

function informacionAdicionalDestino(informacion) {
  const informacionDestino = document.querySelector('.informacion-destino')
  const informacionAdicional = document.createElement('ul')

  for (const nota of informacion) {
    const notaAdicional = document.createElement('li')
    notaAdicional.innerHTML = nota

    informacionAdicional.appendChild(notaAdicional)
  }
  informacionDestino.appendChild(informacionAdicional)
}