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
