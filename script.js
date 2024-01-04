// Elementos del DOM
const palabra = document.getElementById("palabra");
const searchInput = document.getElementById("searchInput"); // Input donde se ingresa la palabra a buscar
const word = document.getElementById("word"); // Elemento donde se muestra la palabra buscada
const category = document.getElementById("category"); // Elemento donde se muestra la categoría de la palabra
const definition = document.getElementById("definition"); // Elemento donde se muestra la definición de la palabra
const example = document.getElementById("example"); // Elemento donde se muestra un ejemplo del uso de la palabra
const errorMessage = document.getElementById("error__message"); // Elemento para mostrar mensajes de error al usuario

// Diccionario de palabras y sus detalles
let diccionario = {
  "sest": {
    palabra: "Sest.",
    definicion: "Sest es el acto de comer alimentos para satisfacer las necesidades nutricionales del cuerpo humano. Es un proceso mediante el cual se ingiere y se digiere la comida para obtener energía y los nutrientes necesarios.",
    ejemplo: "Posatɾon tɾeststok ate (I’ve an attribute.).",
    categoria: "V."
  },
  "soet": {
    palabra: "Soet.",
    definicion: "Nombre oficial de la lengua construida.",
    ejemplo: "Der tresk soet.",
    categoria: "Sust."
  },
}

// Evento que maneja la entrada del usuario
searchInput.addEventListener('input', handleInput);

// Función para filtrar caracteres no deseados
function handleInput(event) {
  const inputValue = event.target.value;
  const filteredValue = inputValue.replace(/[^aAeEoOtTsSpPkKrRɾ]/g, '');

  if (inputValue !== filteredValue) {
    // Si se ingresan caracteres no permitidos, se activa la animación de error
    animacionError("* El carácter ingresado no es aceptado en este idioma.");
  }

  // Se actualiza el valor del input con los caracteres permitidos
  event.target.value = filteredValue;
}

// Función para mostrar mensajes de error al usuario
function animacionError(mensaje) {
  // Se limpian los campos de palabra, categoría, definición y ejemplo
    palabra.style.display = "none";
  word.innerText = "";
  category.innerText = "";
  definition.innerText = "";
  example.innerText = "";

  
  if (mensaje !== "none") {
    // Si el mensaje no es 'none', se muestra en el área de mensajes de error
    errorMessage.innerText = mensaje;
  } else {
    // Si el mensaje es 'none', se limpia el área de mensajes de error
    errorMessage.innerText = "";
  }
    
    searchInput.focus();
}

// Función para definir una palabra buscada en el diccionario
function definirPalabra(){
  const palabraBuscada = searchInput.value.toLowerCase(); // Se convierte la palabra ingresada a minúsculas para buscarla en el diccionario
    palabra.style.display = "block";
  word.innerText = diccionario[palabraBuscada].palabra; // Se muestra la palabra encontrada
  category.innerText = diccionario[palabraBuscada].categoria; // Se muestra la categoría de la palabra
  definition.innerText = diccionario[palabraBuscada].definicion; // Se muestra la definición de la palabra
  example.innerText = diccionario[palabraBuscada].ejemplo; // Se muestra un ejemplo de uso de la palabra
}

// Función que se activa al presionar el botón de búsqueda
function buscar(event) {
  const searchInput = document.getElementById('searchInput');

  if (searchInput.disabled) {
    return; // Si está deshabilitado, salir de la función
  }

  if (event.type === 'click' || (event.type === 'keypress' && event.keyCode === 13)) {
    if (searchInput.value === '') {
      animacionError("* Escriba la palabra a definir, por favor.");
    } else {
      if (diccionario[searchInput.value.toLowerCase()]) {
        animacionError(null);
        definirPalabra();
        searchInput.blur();
      } else {
        animacionError("* Palabra no reconocida en el diccionario.");
      }
    }
  }
}

function mostrarVentana() {
  document.getElementById("ajustes").classList.add("mostrar");
}

function cerrarVentana() {
  document.getElementById("ajustes").classList.remove("mostrar");
}
