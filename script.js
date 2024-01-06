// Elementos del DOM
const elements = {
  setting: document.getElementById("svg__settings"),
  lupa: document.getElementById("svg__lupa"),
  subtitle: document.getElementById("subtitulo"),
  searchInput: document.getElementById("searchInput"), // Input donde se ingresa la palabra a buscar
  palabra: document.getElementById("palabra"),
  word: document.getElementById("word"), // Elemento donde se muestra la palabra buscada
  category: document.getElementById("category"), // Elemento donde se muestra la categoría de la palabra
  definition: document.getElementById("definition"), // Elemento donde se muestra la definición de la palabra
  example: document.getElementById("example"), // Elemento donde se muestra un ejemplo del uso de la palabra
  errorMessage: document.getElementById("error__message"), // Elemento para mostrar mensajes de error al usuario
};

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
};

// Evento que maneja la entrada del usuario
elements.searchInput.addEventListener('input', handleInput);

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
  elements.palabra.style.display = "none";
  elements.word.innerText = "";
  elements.category.innerText = "";
  elements.definition.innerText = "";
  elements.example.innerText = "";

  if (mensaje !== "none") {
    // Si el mensaje no es 'none', se muestra en el área de mensajes de error
    elements.errorMessage.innerText = mensaje;
  } else {
    // Si el mensaje es 'none', se limpia el área de mensajes de error
    elements.errorMessage.innerText = "";
  }
  
  elements.searchInput.focus();
}

function obtenerPalabraAleatoria(diccionario) {
  const keys = Object.keys(diccionario);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return diccionario[randomKey];
}

function definirPalabra(aleatorio, palabra = null) {
  if (!aleatorio && palabra !== null && diccionario[palabra]) {
    const wordm = diccionario[palabra];
    mostrarPalabra(wordm);
  } else if (aleatorio) {
    const palabraAleatoria = obtenerPalabraAleatoria(diccionario);
    mostrarPalabra(palabraAleatoria);
  }
}

function mostrarPalabra(wordm) {
  // Aquí debes manipular la interfaz para mostrar los valores del objeto 'word'
  elements.word.innerText = wordm.palabra;
  elements.definition.innerText = wordm.definicion;
  elements.example.innerText = wordm.ejemplo;
  elements.category.innerText = wordm.categoria;
}

// Función que se activa al presionar el botón de búsqueda
function buscar(event) {
  const searchInput = elements.searchInput;
  if (searchInput.getAttribute("placeholder") === "Aleatorio") {
    elements.palabra.style.display = "block";
    definirPalabra(true);
  } else if (
    (event.type === "click" || (event.type === "keypress" && event.keyCode === 13)) &&
    searchInput.value !== ''
  ) {
    const palabraBuscada = searchInput.value.toLowerCase();
    if (diccionario[palabraBuscada]) {
      elements.palabra.style.display = "block";
      definirPalabra(false, palabraBuscada);
      elements.errorMessage.innerText = "";
      searchInput.blur();
      // Aquí puedes agregar la lógica para mostrar la palabra buscada en la interfaz
    } else {
      animacionError("* Palabra no reconocida en el diccionario.");
      // Puedes manejar el mensaje de error en la interfaz aquí
    }
  } else {
    animacionError("* Escriba la palabra a definir, por favor.");
    // Puedes manejar el mensaje de error en la interfaz aquí
  }
}

function cambiarModo() {
  const placeholderValue = (elements.searchInput.getAttribute("placeholder") === "Buscar") ? "Aleatorio" : "Buscar";
  const isAleatorio = (placeholderValue === "Aleatorio");
  
  elements.searchInput.disabled = isAleatorio;
  elements.searchInput.setAttribute("placeholder", placeholderValue);
  elements.searchInput.value = "";
  elements.palabra.style.display = "none";

  [elements.word, elements.category, elements.definition, elements.example, elements.errorMessage].forEach(element => element.innerText = "");

  const backgroundColorBody = isAleatorio ? "#1C6E8C" : "#274156";
  const backgroundColorInput = isAleatorio ? "#274156" : "#1C6E8C";

  document.body.style.backgroundColor = backgroundColorBody;
  document.documentElement.style.backgroundColor = backgroundColorBody;
  elements.subtitle.style.display = isAleatorio ? "block" : "none";
  elements.lupa.style.backgroundColor = backgroundColorInput;
  elements.setting.style.backgroundColor = backgroundColorInput;
  elements.searchInput.style.backgroundColor = backgroundColorInput;
  elements.palabra.style.backgroundColor =  backgroundColorInput;
}
