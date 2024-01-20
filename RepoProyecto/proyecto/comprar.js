const listPro = {};

const productos = [
  { id: 'tecladosP', tipo: 'teclados', elemento: null },
  { id: 'mouseP', tipo: 'mouse', elemento: null },
  { id: 'audioP', tipo: 'audio', elemento: null },
  { id: 'padsP', tipo: 'pads', elemento: null }
];

console.log(productos);

function cargarProductos() {
  productos.forEach(producto => {
    producto.elemento = document.getElementById(producto.id);

    fetch('productos.json')
      .then(respuesta => respuesta.json())
      .then(respuesta => {
        respuesta[producto.tipo].forEach(item => {
          const agg = document.createElement('header');
          agg.innerHTML = `
            <h1>${item.nombre}</h1>
            <img src="${item.img}" alt="${item.nombre}">
            <p>Precio: ${item.precio}</p>
            <div class ='ventaBoton'>
              <button id='botonAgregar' class='agregarAlcarro' data-precio='${item.precio}'>Agregar</button>
            </div>
          `;
          producto.elemento.appendChild(agg);

          const botonAgregar = agg.querySelector('.agregarAlcarro');
          botonAgregar.addEventListener('click', function() {
            const botonCanasta = document.getElementById('CarroCompras');
            botonCanasta.style.backgroundColor = 'rgb(58, 248, 0)';
            const precio = item.precio;
            const nombre = item.nombre;
            agregarAlCarrito(precio, nombre);

           
            if (listPro[nombre]) {
              listPro[nombre] += 1;
            } else {
              listPro[nombre] = 1;
            }

            console.log("Contador de productos:", listPro);
          });
        });
      })
      .catch(error => console.error('Error al cargar el JSON:', error));
  });
}

const botonFactura = document.getElementById('CarroCompras');
botonFactura.addEventListener('click', desplegarTotalFac);


cargarProductos();

const carritoTotal = document.getElementById('totalProductos');
const nombrePro = document.getElementById('ProductoFinal');
let totalCarrito = 0;
let totalnombres = 0;
////

function agregarAlCarrito(precio) {
  totalCarrito += precio;
}

async function checkOut(aggNew, productosVendidos) {
  try {
    const response = await fetch(`http://localhost:3000/usuarios/${aggNew.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        historial: [...aggNew.historial, { productos: productosVendidos, fecha: new Date() }],
      }),
    });

    if (response.ok) {
      console.log('Datos actualizados correctamente en el servidor.');
      localStorage.setItem('usuario', JSON.stringify(aggNew));

    
    } else {
      console.error('Error en la respuesta del servidor:', response.status);
    }
  } catch (error) {
    console.error('Error en la solicitud PATCH:', error);
  }
}
////

function desplegarTotalFac() {
  const desplegar = document.querySelector('#fullScreen');
  desplegar.innerHTML = `<div class='' id="contCarrito">
      <section class="animate__animated animate__fadeInDown" id="contDentroCarrito">
        <h1>Venta final</h1>
        <p>Productos</p>
        ${Object.entries(listPro).map(([nombreProducto, cantidad]) => `<p>${nombreProducto}: ${cantidad}</p>`).join('')}
        <p>Total a pagar</p>
        <p id="totalProductos">${totalCarrito}</p>
        <button id="btnPagar">Pagar</button>
        <button id="btnSeguirMirando">Seguir mirando</button>
      </section>
    </div>`
    const nuevoObjeto = Object.entries(listPro).map(([nombreProducto, cantidad]) => ({
      nombreProducto, 
      cantidad}))
      const nuevoJson = JSON.stringify(nuevoObjeto);
      console.log(nuevoJson);
  const desplegarcarrito = document.getElementById('contCarrito');
  const btnSeguir = document.getElementById('btnSeguirMirando');
  const btnPagar = document.getElementById('btnPagar');
  const finalCompra = document.getElementById('FinalizacionCompra')

  btnSeguir.addEventListener('click', () => {
    desplegarcarrito.style.display = desplegarcarrito.style.display === 'none' ? 'flex' : 'none';
})

 btnPagar.addEventListener('click', () => {
  if (totalCarrito <= 0) {
    alert('No tienes productos en el carrito');
  } else {
    const agregar_jsonUs = localStorage.getItem('usuario');
    const aggNew = JSON.parse(agregar_jsonUs);

    const productosVendidos = Object.entries(listPro).map(([nombreProducto, cantidad]) => ({
      nombreProducto,
      cantidad,
    }));

    aggNew.historial.push({ productos: productosVendidos, fecha: new Date() });
    
    localStorage.setItem('usuario', JSON.stringify(aggNew));

    checkOut(aggNew, productosVendidos);

 
    finalCompra.classList.toggle('nuevaClase');
    desplegarcarrito.style.display = desplegarcarrito.style.display === 'none' ? 'flex' : 'none';
    finalCompra.innerHTML = `<div id="ExitoCompra">
      <section class="animate__animated animate__fadeInDown" id="contDentroExit">
        <h1>Compra exitosa</h1>
        <p>Espero disfrutes al máximo nuestros productos</p>
      </section>
    </div>`;
  }
});
}
const rightBtn = document.querySelector("#scrolling-button-right");
const leftBtn = document.querySelector("#scrolling-button-left");

const content = document.querySelector(".contenedorProductos");

rightBtn.addEventListener("click", () => {
  content.scrollLeft += 300;
});

leftBtn.addEventListener("click", () => {
  content.scrollLeft -= 300;
});



