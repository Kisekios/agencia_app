/* ===========HEADER=========== */

/* Llamada de los items de HTML */

const menuIconMovil = document.querySelector('.menu-icon-movil')
const menuOpcionesMovil = document.querySelector('.menu-opciones-movil')

/* Variables */

const urlPath = (globalThis.location.pathname).split('/')

/* Funciones */

function mostrarOpcionesMovil() {
  menuOpcionesMovil.classList.toggle('inactive')
  menuIconMovil.classList.toggle('cambio')
}

/* Lectura de eventos del HTML */

menuIconMovil.addEventListener('click', mostrarOpcionesMovil)


/* ===========FOOTER=========== */
/* Render de informacion footer */

fetch(globalThis.origin + '/informacion')
  .then(res => res.json())
  .then(response => {
    const informacion = response[0]
    const footer = document.querySelector('footer')

    const section = document.createElement('section')

    const contactenos = document.createElement('h1')
    const redesYUbicacion = document.createElement('div')
    const informacionAsesor = document.createElement('div')
    const termYCondiciones = document.createElement('h6')

    contactenos.innerHTML = informacion.contacto

    const linkRedes = document.createElement('div')

    renderLinkRedes(linkRedes, informacion.links)
    const lista = document.createElement('ul')
    renderItemsList(informacion.ubicacion, informacion.telefono, lista)

    redesYUbicacion.appendChild(linkRedes)
    redesYUbicacion.appendChild(lista)

    const seccionAsesor = document.createElement('article')
    const nombreAsesor = document.createElement('h5')
    nombreAsesor.innerHTML = informacion.asesor
    seccionAsesor.appendChild(nombreAsesor)
    const cargoAsesor = document.createElement('p')
    cargoAsesor.innerHTML = informacion.cargo
    seccionAsesor.appendChild(cargoAsesor)

    const imagenAsesor = document.createElement('img')
    imagenAsesor.setAttribute('src', informacion.foto)

    informacionAsesor.appendChild(seccionAsesor)
    informacionAsesor.appendChild(imagenAsesor)

    termYCondiciones.innerHTML = informacion.terminos
    const derechosReservados = document.createElement('p')
    derechosReservados.innerHTML = informacion.derechos
    termYCondiciones.appendChild(derechosReservados)

    section.appendChild(contactenos)
    section.appendChild(redesYUbicacion)
    section.appendChild(informacionAsesor)
    section.appendChild(termYCondiciones)

    footer.appendChild(section)
  })

function renderLinkRedes(div, links) {
  for (const link of links) {
    const anchor = document.createElement('a')
    anchor.setAttribute('href', link.link)
    anchor.classList.add('fa')
    anchor.classList.add(link.simbolo)
    div.appendChild(anchor)
  }
}

function renderItemsList(ubicacion, telefono, lista) {
  const ubicacionYDireccion = document.createElement('li')

  const simboloUbicacion = document.createElement('p')
  simboloUbicacion.classList.add('fa')
  simboloUbicacion.classList.add(ubicacion.simbolo)
  ubicacionYDireccion.appendChild(simboloUbicacion)

  const sede = document.createElement('p')
  sede.innerHTML = ubicacion.sede
  ubicacionYDireccion.appendChild(sede)

  const lugar = document.createElement('p')
  lugar.innerHTML = ubicacion.edificio
  ubicacionYDireccion.appendChild(lugar)

  const address = document.createElement('p')
  address.innerHTML = ubicacion.direccion
  ubicacionYDireccion.appendChild(address)

  lista.appendChild(ubicacionYDireccion)

  const numeroDeTelefono = document.createElement('li')
  const simboloTelefono = document.createElement('p')
  simboloTelefono.classList.add('fa')
  simboloTelefono.classList.add(telefono.simbolo)
  numeroDeTelefono.appendChild(simboloTelefono)

  const numeroTelefono = document.createElement('p')
  numeroTelefono.innerHTML = telefono.numero
  numeroDeTelefono.appendChild(numeroTelefono)

  lista.appendChild(numeroDeTelefono)
}

function iniciarDesplazamientoDiv(ubicacion) {
  if (ubicacion === 'destino' || ubicacion === 'plan-turistico') {
    const hotelesODias = document.querySelector('.destino-hoteles')
    desplazamientoDiv(hotelesODias)
  } else if (ubicacion === 'nacionales' || ubicacion === 'internacionales') {
    const nacionalesOInternacionales = document.querySelector('.destacados')
    desplazamientoDiv(nacionalesOInternacionales)
  } else if (ubicacion === '') {
    const homeDestacados = document.querySelector('.destacados')
    desplazamientoDiv(homeDestacados)
  } else {
    console.log('sitio no configurado')
  }
}

function desplazamientoDiv(contenedor) {
  console.log('iniciando proceso ')
  let desplazamiento
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
      contenedor.style.scrollSnapType = "none"
      clearInterval(intervalo)
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
    console.log('detenido')
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

globalThis.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    iniciarDesplazamientoDiv(urlPath[1]);
  }, 1000);
})

