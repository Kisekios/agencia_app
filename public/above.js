const above = document.querySelector('.above')
const cantidadImagenes = above.querySelectorAll('a')
const botonIzquierdo = document.querySelector('#above-anterior')
const botonDerecho = document.querySelector('#above-siguiente')

let indexAbove = 0
let pausarIntervalo = false
let desplazamientoAboveAutomatico
let reanudandoProceso = false
let contadorResetDesplazamiento
let lecturaScrollEnTouch

function iniciarDesplazamientoAbove() {
  desplazamientoAboveAutomatico = setInterval(function () {
    desplazamientoAbove(false)
  }, 5000)
}

above.addEventListener('touchstart', () => {
  clearInterval(desplazamientoAboveAutomatico)

  let medidaImagenAbove = above.scrollWidth / cantidadImagenes.length
  let scrollBarXFinal

  above.addEventListener('touchend',()=> {
    clearTimeout(lecturaScrollEnTouch)
    lecturaScrollEnTouch = setTimeout(()=>{
      scrollBarXFinal = Math.round(above.scrollLeft / medidaImagenAbove)
      indexAbove = scrollBarXFinal
    },500)
    reanudarDesplazamientoAbove()
  })

})

botonIzquierdo.addEventListener('click', () => {
  clearInterval(desplazamientoAboveAutomatico)
  desplazamientoAbove(true)
  reanudarDesplazamientoAbove()
})

botonDerecho.addEventListener('click', () => {
  clearInterval(desplazamientoAboveAutomatico)
  desplazamientoAbove(false)
  reanudarDesplazamientoAbove()
})

function desplazamientoAbove(imagenAnterior) {
  if (imagenAnterior) {
    if (indexAbove === 0) {
      indexAbove = cantidadImagenes.length
    }
    indexAbove--
  } else {
    indexAbove++
  }
  if (indexAbove >= cantidadImagenes.length) {
    indexAbove = 0
  }
  let medidaImagenAbove = above.scrollWidth / cantidadImagenes.length
  let desplazamiento = indexAbove * medidaImagenAbove
  above.scroll({
    left: desplazamiento,
    top: 0,
    behavior: 'smooth'
  })
}

function reanudarDesplazamientoAbove() {
  if (!reanudandoProceso) {
    reanudandoProceso = true
    contadorResetDesplazamiento = setTimeout(() => {
      iniciarDesplazamientoAbove()
      reanudandoProceso = false
    }, 4000)
  } else {
    clearTimeout(contadorResetDesplazamiento)
    reanudandoProceso = false
    reanudarDesplazamientoAbove()
  }
}

iniciarDesplazamientoAbove()