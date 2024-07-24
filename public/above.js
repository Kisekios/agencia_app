const above = document.querySelector('.above')
const cantidadImagenes = above.querySelectorAll('a')
const botonIzquierdo = document.querySelector('#above-anterior')
const botonDerecho = document.querySelector('#above-siguiente')

let indexAbove = 0
let pausarIntervalo = false
let desplazamientoAboveAutomatico
let reanudandoProceso = false
let contadorResetDesplazamiento

function iniciarDesplazamientoAbove() {
  desplazamientoAboveAutomatico = setInterval(function () {
    desplazamientoAbove(false)
  }, 3000)
}

above.addEventListener('touchstart', () => {
  clearInterval(desplazamientoAboveAutomatico)
  reanudarDesplazamientoAbove()
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
  console.log('entro')
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
      console.log('contando')
    }, 5000)
  } else {
    clearTimeout(contadorResetDesplazamiento)
    reanudandoProceso = false
    reanudarDesplazamientoAbove()
  }
}

iniciarDesplazamientoAbove()