const obtenerUrl = (globalThis.location.pathname).split('/')
let idDestacados

if (obtenerUrl[1] === 'nacionales') { idDestacados = 'nacional'; destinosDestacados(idDestacados); }
else if (obtenerUrl[1] === 'internacionales') { idDestacados = 'internacional'; destinosDestacados(idDestacados); }
else { idDestacados = 'home'; homeDestacados() }
// Inyección de imagen y url de planes destacados/promociones
async function destinosDestacados() {
  try {
    const response = await fetch(globalThis.origin + '/destacados-' + idDestacados);
    const data = await response.json();

    function inyectarEnlacesDestinos() {
      const allDestinos = document.querySelector('.destinos-opciones');
      const tituloAllDestinos = document.createElement('h1');

      tituloAllDestinos.innerHTML = 'Todos los destinos ' + obtenerUrl[1];
      allDestinos.appendChild(tituloAllDestinos);

      data.sort((a, b) => {
        if (a.titulo < b.titulo) { return -1; }
        if (a.titulo > b.titulo) { return 1; }
        return 0;
      });

      for (let i = 0; i < data.length; i++) {
        const enlaceDestino = document.createElement('a');
        enlaceDestino.setAttribute('href', data[i].url);
        enlaceDestino.innerHTML = data[i].titulo;

        allDestinos.appendChild(enlaceDestino);
      }
    }

    inyectarEnlacesDestinos();

    const banners = data.filter(destino => destino.banner !== false).map(destino => ({
      banner: destino.banner,
      url: destino.url
    }));
    const destinosMezclados = mezclarArreglo(banners.slice());

    destinosMezclados.forEach(element => {
      if (element.banner) {
        renderDestacados(element.banner, element.url);
      }
    });
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

async function homeDestacados() {
  try{
    const response = await fetch(globalThis.origin + '/' + idDestacados);
    const data = await response.json();

    const bannersMix = mezclarArreglo(data.slice())

    bannersMix.forEach(element => {
      if (element.banner) {
        renderDestacados(element.banner, element.url);
      }
    });
  }catch (error) {
    console.error('No se pudo realizar la petición', error)
  }  
}

function mezclarArreglo(arreglo) {
  for (let i = arreglo.length - 1; i > 0; i--) {
    const indiceAleatorio = Math.floor(Math.random() * (i + 1));
    [arreglo[i], arreglo[indiceAleatorio]] = [arreglo[indiceAleatorio], arreglo[i]];
  }
  return arreglo;
}

function renderDestacados(imagen, url) {
  const destacados = document.querySelector('.destacados');
  const enlaceDestacado = document.createElement('a');
  enlaceDestacado.setAttribute('href', url);

  const imageDestacado = document.createElement('img');
  imageDestacado.setAttribute('src', imagen);

  enlaceDestacado.appendChild(imageDestacado);
  destacados.appendChild(enlaceDestacado);
}