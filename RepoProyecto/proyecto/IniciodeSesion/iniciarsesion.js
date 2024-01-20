

const inicioSecion = document.getElementById('botonInicio')


///
const desplegarInicio = document.getElementById('CartelInicioSecion');

function AbrirInicio() {
desplegarInicio.style.display = (desplegarInicio.style.display === 'none') ? 'flex' : 'none';
}

const inicio = document.getElementById('botonInicio');
inicio.addEventListener('click', AbrirInicio);


//cerrar incio

const CerrarInicio = document.getElementById('CartelInicioSecion');

function Cerrar() {
  CerrarInicio.style.display = (CerrarInicio.style.display === 'none') ? 'flex' : 'none';
}

const cerrar = document.getElementById('cerrarInicio');
cerrar.addEventListener('click', Cerrar);




// document.addEventListener("DOMContentLoaded", function() {
//     let publicidad = document.getElementById("publicidad");
//     let cerrarBtn = document.getElementById("cerrarBtn");


//     cerrarBtn.addEventListener("click", function() { 
//         publicidad.style.display = "none";
//     });




const URL_BASE = 'http://localhost:3000';
const USUARIOS_ENDPOINT = '/usuarios';
const CARRITO_ENDPOINT = '/carrito';

document.addEventListener("DOMContentLoaded", function () {

const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));
if (usuarioGuardado) {

}
});



function iniciarSesion() {
const username = document.getElementById('inputIngresar').value;
const password = document.getElementById('Inputcontraseña').value;


fetch(`${URL_BASE}${USUARIOS_ENDPOINT}?nombre=${username}&contraseña=${password}`)
.then(respuesta => respuesta.json())
.then(usuarios => {
if (usuarios.length > 0) {
  
 
  const usuario = usuarios[0];
  alert(`¡Bienvenido, ${username}!`);

  localStorage.setItem('usuario', JSON.stringify(usuario));

  const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || { total: 0 };
  totalCarrito = carritoGuardado.total;
  carritoTotal.textContent = totalCarrito;
} else {

  alert('Credenciales incorrectas. Intenta de nuevo o regístrate.');
}
})
.catch(error => console.error('Error al iniciar sesión:', error));
}
const botonIniciarSesion = document.getElementById('ingresar')
botonIniciarSesion.addEventListener('click',iniciarSesion)



function registrarUsuario(event) {
const newUsername = document.getElementById('inputRegistrar').value;
const newPassword = document.getElementById('InputcontraseñaR').value;


fetch(`${URL_BASE}${USUARIOS_ENDPOINT}?nombre=${newUsername}`)
.then(respuesta => respuesta.json())
.then(usuarios => {
if (usuarios.length > 0) {
  alert('Este nombre de usuario ya está registrado. Por favor, elige otro.');
} else {

  fetch(`${URL_BASE}${USUARIOS_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nombre: newUsername, contraseña: newPassword, historial:[]}),
  })
    .then(respuesta => respuesta.json())
    .then(usuarioRegistrado => {

      return fetch(`${URL_BASE}${USUARIOS_ENDPOINT}/${usuarioRegistrado.id}`);
    })
    .then(respuesta => respuesta.json())
    .then(usuario => {
      CartelR.style.display = (CartelR.style.display === 'none') ? 'flex' : 'none';
      alert(`Bienvenido ${newUsername} acabas de registrarte,ya puedes iniciar sesion`);

    })
    .catch(error => console.error('Error al registrar usuario:', error));
}
})
.catch(error => console.error('Error al verificar existencia del usuario:', error));
event.preventDefault()
}

const ValidarRegistro = document.getElementById('RegistrarUS')
ValidarRegistro.addEventListener('click',registrarUsuario)


const CartelR = document.getElementById('contenedorRegistro')

const loginUsername = document.getElementById('inputIngresar').value;
const loginPassword = document.getElementById('Inputcontraseña').value;


function RegistrarCartel() {
CartelR.style.display = (CartelR.style.display === 'none') ? 'flex' : 'none';
CerrarInicio.style.display = (CerrarInicio.style.display === 'none') ? 'flex' : 'none';
if(loginUsername=='' && loginPassword == ''){
CerrarInicio.style.display = (CerrarInicio.style.display === 'none') ? 'flex' : 'none'
}
}
const registrarBoton = document.getElementById('registrarse');
registrarBoton.addEventListener('click',RegistrarCartel);



function CerrarR() {
CartelR.style.display = (CartelR.style.display === 'none') ? 'flex' : 'none';
}


const cerrarRegistro = document.getElementById('cerrarInicioR')
cerrarRegistro.addEventListener('click', CerrarR);

