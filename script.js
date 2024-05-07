// ----------------------------- Variables Globales ----------------------------- //

let formulario = document.querySelector("form");
let inputPalabra = document.querySelector("#busqueda");
let historial = document.querySelector("#busquedas-realizadas");
let usuario = document.querySelector("#nombre");
let busquedas = [];
let nombre;

// ----------------------------- Llamar usuario ----------------------------- //

function llamarUsuario(){
    if (localStorage.getItem("nombre") === null) {
        nombre = prompt("Ingrese su nombre");
        localStorage.setItem("nombre", nombre);
      } else {
        nombre = localStorage.getItem("nombre");
      }
      usuario.textContent = nombre;
}

llamarUsuario()


// ----------------------------- Normalizar datos ----------------------------- //

function normalizar(input) {
  return input.value.trim();
}

// ----------------------------- Renderizar historial ----------------------------- //
function renderizarBusquedas(lista){
    historial.innerHTML = ''
    lista.forEach(elemento => {
        historial.innerHTML += `<p>${elemento}</p>`
    });
}

// ----------------------------- Guardar datos ----------------------------- //

function guardarDatos(){
    let jsonString = JSON.stringify(busquedas)
    localStorage.setItem('historial', jsonString)
}
 
// ----------------------------- Traer el historial ----------------------------- //
function traerHistorial(){
    if (localStorage.getItem('historial')) {
        let objeto = JSON.parse(localStorage.getItem('historial'))
        busquedas = objeto
        renderizarBusquedas(busquedas)
    }
}
traerHistorial()

// ----------------------------- Abrir buscador con la palabra ----------------------------- //

function iniciarBusqueda(palabra){
    location.assign(`https://www.google.com/search?q=${palabra}`)
}

// ----------------------------- Eventos del formulario ----------------------------- //

// leer el dato del formulario, validar que tenga al menos un caracter

formulario.addEventListener('submit', (e) => {
    e.preventDefault()
    let palabra = normalizar(inputPalabra)
    if ( palabra != '') {
        busquedas.push(palabra)
        renderizarBusquedas(busquedas)
        guardarDatos(busquedas)
        iniciarBusqueda(palabra)
    }
})