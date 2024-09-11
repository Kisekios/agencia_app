const urlPath = (globalThis.location.pathname).split('/')

//cSpell: disable

function detectarDispositivo() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Detectar Android
  if (/android/i.test(userAgent) || (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)) {
      document.body.classList.add('device');
  }
}

detectarDispositivo();



/* ===========HEADER=========== */
/* Render header para todas las paginas */


const header = document.querySelector('header')

header.innerHTML = `
  <section id="header">
    <div>
      <h2>3 AÑOS</h2>
      <h2>3 AÑOS</h2>
    </div>
    <div>
      <a href="https://wa.me/+573219379621?text=Hola,%20estoy%20navegando%20el%20sitio%20web%20y%20quisiera%20m%C3%A1s%20informaci%C3%B3n..."class="fa fa-whatsapp"></a>
      <a href="https://www.facebook.com/profile.php?id=100088886881677" class="fa fa-facebook"></a>
      <a href="tel:3219379621" class="fa fa-phone"></a><a href="mailto:enmodovacacionesporvenir@gmail.com?Subject=Información%20Para%20unas%20Vacaciones&body=Buen%20día,%20estoy%20interesad@%20en%20estar%20en%20Modo%20Vacaciones."class="fa fa-envelope"></a>
    </div>
  </section>
  <nav>
    <section>
      <a href="/">
        <img src="/assets/img/logo.png" alt="">
      </a>
    </section>
    <section>
      <a href="/sobre-nosotros">Acerca de nosotros</a>
      <div>
        <button class="menu-icon-movil">
          <div></div>
          <div></div>
          <div></div>
        </button>
      </div>
      <aside class="menu-opciones-movil inactive">
        <a href="/nacionales">Nacionales</a>
        <a href="/internacionales">Internacionales</a>
        <a href="/blog">Blog</a>
        <a href="/TyC">Términos y condiciones</a>
        <ol>
          <li class="switcher active">
            <i class="fa fa-sun-o" aria-hidden="true"></i>
            <i class="fa fa-moon-o" aria-hidden="true"></i>
          </li>
        </ol>
      </aside>
    </section>
  </nav>`;

const menuIconMovil = document.querySelector('.menu-icon-movil')
const menuOpcionesMovil = document.querySelector('.menu-opciones-movil')
const switchModoLightDark = document.querySelector('.switcher')
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

function preferenciaModoLD() {
  console.log(localStorage)
  if (localStorage.theme === 'light' && document.body.classList.contains('light') == false) {
    switchModoLightDark.classList.toggle('active')
    document.body.classList.contains('dark') ? document.body.classList.toggle('dark') : document.body.classList.remove('dark')
    document.body.classList.toggle('light')
    console.log('cambio a claro')
  } else if ((localStorage.theme === 'dark' && document.body.classList.contains('dark') == false) || localStorage.theme == undefined) {
    document.body.classList.toggle('dark')
    document.body.classList.contains('light') === true ? document.body.classList.toggle('light') : document.body.classList.remove('light')
    console.log('cambio a oscuro')
  }
}

mediaQuery.addEventListener('change', handleColorSchemeChange);

function handleColorSchemeChange() {
  console.log('entro al prefers')
  if (globalThis.matchMedia("(prefers-color-scheme: dark)").matches && document.body.classList.contains('light')) {
    switchModoLightDark.classList.toggle('active')
    document.body.classList.toggle('dark')
    document.body.classList.toggle('light')
    localStorage.setItem('theme', 'dark')
    localStorage.setItem('dark-mode', true)
    localStorage.setItem('light-mode', false)
  } else if (globalThis.matchMedia("(prefers-color-scheme: light)").matches && document.body.classList.contains('dark')) {
    switchModoLightDark.classList.toggle('active')
    document.body.classList.toggle('dark')
    document.body.classList.toggle('light')
    localStorage.setItem('theme', 'light')
    localStorage.setItem('light-mode', true)
    localStorage.setItem('dark-mode', false)
  }
}

menuIconMovil.addEventListener('click', mostrarOpcionesMovil)
switchModoLightDark.addEventListener('click', () => {
  switchModoLightDark.classList.toggle('active')
  document.body.classList.toggle('dark')
  document.body.classList.toggle('light')
  if (document.body.classList.contains('dark') === true) {
    localStorage.setItem('theme', 'dark')
    localStorage.setItem('dark-mode', true)
    localStorage.setItem('light-mode', false)
  } else {
    localStorage.setItem('theme', 'light')
    localStorage.setItem('light-mode', true)
    localStorage.setItem('dark-mode', false)
  }
})


function mostrarOpcionesMovil() {
  menuOpcionesMovil.classList.toggle('inactive')
  menuIconMovil.classList.toggle('cambio')
}


/* ===========FOOTER=========== */
/* Render de informacion footer para todas las paginas*/

const footer = document.querySelector('footer')
let sedeFooterSeleccionada = 'sur'

footer.innerHTML = `
      <section>
        <h1><em>Contactanos</em></h1>
        <div>
          <button id="btn-opcion-norte">Sede Norte</button>
          <button id="btn-opcion-sur">Sede Sur</button>
          <a href="#header"><button>Subir</button></a>
        </div>
        <div>
          <div>
          <a href="https://wa.me/+573219379621?text=Hola,%20estoy%20navegando%20el%20sitio%20web%20y%20quisiera%20m%C3%A1s%20informaci%C3%B3n..." class="fa fa-whatsapp"></a>
          <a href="https://www.facebook.com/profile.php?id=100088886881677" class="fa fa-facebook-square"></a>
          <a href="mailto:enmodovacacionesporvenir@gmail.com?Subject=Información%20Para%20unas%20Vacaciones&amp;body=Buen%20día,%20estoy%20interesad@%20en%20estar%20en%20Modo%20Vacaciones." class="fa fa-envelope"></a>
          <a href="tel:3219379621" class="fa fa-phone"></a>
          </div>
          <ul>
            <li>
              <p class="fa fa-map-marker"></p><p id="sede">Sede Bosa Porvenir:</p>
              <p id="edificio">Centro Comercial <em>Mi Centro Porvenir</em></p>
              <p id="direccion">Calle 54f sur # 94 - 18 segundo piso</p>
            </li>
            <li>
              <p class="fa fa-phone"></p>
              <p id="telefono">321 937 9621</p>
            </li>
          </ul>
        </div>
        <div>
          <article>
            <h5 id="asesor">Wilber Plaza</h5>
            <p id="cargo">Ejecutivo Comercial</p>
          </article>
          <img id="foto" src="/assets/img/user.png">
        </div>
        <h6><a href="/TyC">Términos y condiciones</a><p><small>Todos los derechos reservados</small></p></h6>
    </section>`


const btnSedeNorteFooter = document.querySelector('#btn-opcion-norte')
const btnSedeSurFooter = document.querySelector('#btn-opcion-sur')

btnSedeNorteFooter.addEventListener('click', mostrarInformacionFooter)
btnSedeSurFooter.addEventListener('click', mostrarInformacionFooter)

function mostrarInformacionFooter(mensaje) {
  if (!mensaje) {
    btnSedeNorteFooter.removeAttribute('style')
    btnSedeSurFooter.style.backgroundColor = "var(--color-blanco)"
    btnSedeSurFooter.style.color = "var(--color-azul)"
  }
  else if (sedeFooterSeleccionada != 'norte' && mensaje.target.id === 'btn-opcion-norte') {
    btnSedeSurFooter.removeAttribute('style')
    btnSedeNorteFooter.style.backgroundColor = "var(--color-blanco)"
    btnSedeNorteFooter.style.color = "var(--color-azul)"
    sedeFooterSeleccionada = 'norte'
  } else if (sedeFooterSeleccionada != 'sur' && mensaje.target.id === 'btn-opcion-sur') {
    btnSedeNorteFooter.removeAttribute('style')
    btnSedeSurFooter.style.backgroundColor = "var(--color-blanco)"
    btnSedeSurFooter.style.color = "var(--color-azul)"
    sedeFooterSeleccionada = 'sur'
  } else {
    return
  }

  let informacionSede
  const sede = document.querySelector('#sede')
  const edificio = document.querySelector('#edificio')
  const direccion = document.querySelector('#direccion')
  const telefono = document.querySelector('#telefono')
  const foto = document.querySelector('#foto')
  const asesor = document.querySelector('#asesor')
  const cargo = document.querySelector('#cargo')

  fetch(globalThis.origin + '/informacion')
    .then(res => res.json())
    .then(response => {
      if (sedeFooterSeleccionada === 'norte') {
        informacionSede = response[1]
      } else {
        informacionSede = response[0]
      }
      sede.innerHTML = informacionSede.ubicacion.sede
      edificio.innerHTML = informacionSede.ubicacion.edificio
      direccion.innerHTML = informacionSede.ubicacion.direccion
      telefono.innerHTML = informacionSede.telefono
      foto.src = informacionSede.foto
      asesor.innerHTML = informacionSede.asesor
      cargo.innerHTML = informacionSede.cargo
    })
}

mostrarInformacionFooter()

/* ===========MAIN=========== */
/* Desplazamiento en home y destinos nacionales e internacionales */

let timeLecturaMedidasDiv
let timeLecturaEventosClickOrTouch
let timeIniciarDesplazamiento
let intervalDesplazandoContain
let direccionDesplazamientoContain = true
let posicionScroll = 0

function iniciarDesplazamientoDiv(ubicacion) {
  if (ubicacion === 'destino' || ubicacion === 'plan-turistico') {
    const hotelesODias = document.querySelector('.destino-hoteles')
    tomaMedidasDivDesplazamiento(hotelesODias)
  } else if (ubicacion === 'nacionales' || ubicacion === 'internacionales') {
    const nacionalesOInternacionales = document.querySelector('.destacados')
    tomaMedidasDivDesplazamiento(nacionalesOInternacionales)
  } else if (ubicacion === '') {
    const homeDestacados = document.querySelector('.destacados')
    tomaMedidasDivDesplazamiento(homeDestacados)
  }
}

function tomaMedidasDivDesplazamiento(contenedor) {
  contenedor.style.scrollSnapType = "x mandatory"
  clearTimeout(timeLecturaMedidasDiv)
  lecturasAddEventListener(contenedor)
  timeLecturaMedidasDiv = setTimeout(() => {
    let velocidadDesplazamiento
    posicionScroll = contenedor.scrollLeft
    globalThis.innerWidth <= 1024 ? velocidadDesplazamiento = 20 : velocidadDesplazamiento = 25
    desplazamientoContenedor((contenedor.scrollWidth - contenedor.offsetWidth), velocidadDesplazamiento, contenedor)
  }, 500)
}

function lecturasAddEventListener(contenedor) {
  clearTimeout(timeLecturaEventosClickOrTouch)
  let banderaEventos = true
  timeLecturaEventosClickOrTouch = setTimeout(() => {
    contenedor.addEventListener('scroll', () => {
      if (Math.abs(contenedor.scrollLeft - posicionScroll) > 5 && banderaEventos === true) {
        banderaEventos = false
        clearInterval(intervalDesplazandoContain)
        return iniciarDesplazamientoDiv(urlPath[1])
      }
    })
    contenedor.addEventListener('click', () => {
      if (banderaEventos === true) {
        banderaEventos = false
        clearInterval(intervalDesplazandoContain)
        return iniciarDesplazamientoDiv(urlPath[1])
      }
    });

  }, 50)
}

function desplazamientoContenedor(limiteBarra, velocidadContain, contenedor) {
  clearTimeout(timeIniciarDesplazamiento)
  timeIniciarDesplazamiento = setTimeout(() => {
    contenedor.style.scrollSnapType = "none"
    intervalDesplazandoContain = setInterval(() => {
      if (direccionDesplazamientoContain === true) {
        posicionScroll++
        contenedor.scroll((posicionScroll), 0)
        if (posicionScroll >= limiteBarra - 1) pausaDesplazamientoContain(false)
      } else {
        direccionDesplazamientoContain = false
        posicionScroll <= 0 ? direccionDesplazamientoContain = true : direccionDesplazamientoContain = false
        posicionScroll--
        contenedor.scroll(posicionScroll, 0)
        if (posicionScroll <= 0) pausaDesplazamientoContain(true)
      }
    }, velocidadContain)
  }, 2000)
}

function pausaDesplazamientoContain(cambio) {
  direccionDesplazamientoContain = cambio
  clearInterval(intervalDesplazandoContain)
  setTimeout(iniciarDesplazamientoDiv(urlPath[1]), 1500)
}

window.addEventListener('resize', () => {
  clearInterval(intervalDesplazandoContain)
  iniciarDesplazamientoDiv(urlPath[1])
});

globalThis.onload = preferenciaModoLD()
globalThis.onload = iniciarDesplazamientoDiv(urlPath[1])