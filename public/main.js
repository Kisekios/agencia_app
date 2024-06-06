/* ===========HEADER=========== */

/* Llamada de los items de HTML */

const menuIconMovil = document.querySelector('.menu-icon-movil')
const menuOpcionesMovil = document.querySelector('.menu-opciones-movil')

/* Variables */

/* Funciones */

function mostrarOpcionesMovil () {
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
    renderItemsList(informacion.ubicacion,informacion.telefono, lista)

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

  function renderLinkRedes (div,links) {
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
    sede.innerHTML= ubicacion.sede
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