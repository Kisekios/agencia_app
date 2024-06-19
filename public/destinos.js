const obtenerUrl = (globalThis.location.pathname).split('/')
//cSpell: disable
fetch(globalThis.origin + '/destinos')
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

function descripcionHoteles(hoteles) {
  const hotelesDestino = document.querySelector('.destino-hoteles')
  const divContenedorCards = document.createElement('div')
  divContenedorCards.classList.add('div-tag')

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
    divContenedorCards.appendChild(hotelCard)
    hotelesDestino.appendChild(divContenedorCards)
  }
  globalThis.onload = desplazamientoDivHoteles(hotelesDestino)
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

function desplazamientoDivHoteles(contenedor) {
  let desplazamiento
  let ajusteSegunPantalla
  let posicion = 1
  let scrollReverseX = false
  let banderaX = false
  let banderaY = false
  let banderaIntervalo = false
  let intervalo
  let pausarDesplazamiento
  let aumentarTiempoPausa

  function ajustarDesplazamiento() {
    let anchoPagina = globalThis.innerWidth;
    if (anchoPagina <= 500) {
      desplazamiento = 2;
    } else {
      desplazamiento = 1;
    }
  }

  function iniciarIntervalo() {
    if (!banderaX && !banderaY && !banderaIntervalo) {
      banderaIntervalo = true
      clearInterval(intervalo)
      contenedor.style.scrollSnapType = "none"
      setTimeout(() => {
        intervalo = setInterval(function () {
          let anchoDiv = contenedor.scrollWidth - contenedor.offsetWidth
          if (posicion <= anchoDiv && !scrollReverseX) {
            contenedor.scroll(posicion, 0)
            posicion++
          } else {

            setTimeout(() => {
              scrollReverseX = true
            }, 1000)
            posicion--
            contenedor.scroll(posicion, 0)
            if (posicion <= 1) {
              setTimeout(() => {
                scrollReverseX = false
              }, 1000)
            }
          }
        }, 30 / desplazamiento);
      }, 1000)
    }
  }

  function detenerIntervalo() {
    if (!banderaX && !banderaY) {
      banderaX = true
      clearInterval(intervalo)
      contenedor.style.scrollSnapType = "x mandatory"
      pausarDesplazamiento = setTimeout(() => {
        banderaX = false
        reanudarDesplazamiento()
      }, 5000)
    } else {
      if (banderaX) {
        banderaY = true
        clearTimeout(pausarDesplazamiento)
        clearTimeout(aumentarTiempoPausa)
        aumentarTiempoPausa = setTimeout(() => {
          banderaX = false
          banderaY = false
          reanudarDesplazamiento()
        }, 5000)
      }
    }
  }

  function reanudarDesplazamiento() {
    clearInterval(intervalo)
    if (!banderaX && !banderaY && banderaIntervalo) {
      banderaIntervalo = false
      posicion = contenedor.scrollLeft
      ajustarDesplazamiento();
      iniciarIntervalo();
    }
  }

  contenedor.addEventListener('touchstart', detenerIntervalo);
  contenedor.addEventListener('click', detenerIntervalo);

  contenedor.addEventListener('scroll', () => {
    if (Math.abs(contenedor.scrollLeft - posicion) > 5) {
      detenerIntervalo()
    }
  })

  ajustarDesplazamiento();
  iniciarIntervalo();

  window.addEventListener('resize', () => {
    clearInterval(intervalo)
    detenerIntervalo()
  });
}
