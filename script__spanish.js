// Elementos del DOM
const elements = {
  word: document.getElementById("word"),
  savedDiv: document.getElementById("saved__div"),
  settings: document.getElementById("svg__settings"),
  magnifier: document.getElementById("svg__lens"),
  subtitle: document.getElementById("caption"),
  searchInput: document.getElementById("searchInput"),
  frase: document.getElementById("frase"),
  category: document.getElementById("category"),
  definition: document.getElementById("definition"),
  example: document.getElementById("example"),
  errorMessage: document.getElementById("error__message"),
};

let language = navigator.language.startsWith('en') ? 'english' : navigator.language.startsWith('es') ? 'spanish' : navigator.language.startsWith('de') ? 'german' : 'english';

if (language === "english") {
    window.location.href = 'index.html';
} else if (language === "german"){
    window.location.href = 'index__german.html';
}


let mode = "Buscar";

// Diccionario de palabras y detalles
let dictionary = {
  "sest": {
    word: "Sest.",
    definition: "Sest es el acto de comer alimentos para satisfacer las necesidades nutricionales del cuerpo humano. Es un proceso de ingerir y digerir alimentos para obtener energía y nutrientes necesarios.",
    example: "Posatɾon tɾeststok ate (Tengo un atributo.).",
    category: "V."
  },
  "soet": {
    word: "Soet.",
    definition: "Nombre oficial del idioma construido.",
    example: "Der tresk soet.",
    category: "Sustantivo"
  },
};

// Manejo del evento de entrada del usuario
elements.searchInput.addEventListener('input', handleInput);

// Función para filtrar caracteres no deseados
function handleInput(event) {
  const inputValue = event.target.value;
  const filteredValue = inputValue.replace(/[^aAeEoOtTsSpPkKrRɾ]/g, '');

  if (inputValue !== filteredValue) {
    // Activar la animación de error si se introducen caracteres no válidos
    elements.frase.style.display = "none";
    showError("* El carácter ingresado no se acepta en este idioma.");
  }

  // Actualizar el valor de entrada con los caracteres permitidos
  event.target.value = filteredValue;
}

// Función para mostrar mensajes de error al usuario
function showError(message) {
  // Limpiar campos de palabra, categoría, definición y ejemplo
  elements.word.innerText = "";
  elements.category.innerText = "";
  elements.definition.innerText = "";
  elements.example.innerText = "";

  if (message !== "none") {
    // Mostrar el mensaje de error en el área de error
    elements.errorMessage.innerText = message;
    elements.frase.style.display = "none";
  } else {
    // Limpiar el área de error
    elements.errorMessage.innerText = "";
  }

  elements.searchInput.focus();
}

function getRandomWord(dictionary) {
  const keys = Object.keys(dictionary);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return dictionary[randomKey];
}

function defineWord(random, word = null) {
  if (!random && word !== null && dictionary[word]) {
    const selectedWord = dictionary[word];
    showWord(selectedWord);
  } else if (random) {
    const randomWord = getRandomWord(dictionary);
    showWord(randomWord);
  }
}

function showWord(selectedWord) {
  elements.word.innerText = selectedWord.word;
  elements.definition.innerText = selectedWord.definition;
  elements.example.innerText = selectedWord.example;
  elements.category.innerText = selectedWord.category;
}

// Función activada cuando se presiona el botón de búsqueda
function search(event) {
  const searchInput = elements.searchInput;
  if (mode === "Aleatorio") {
    elements.frase.style.display = "block";
    defineWord(true);
  } else if ((event.type === "click" || (event.type === "keypress" && event.keyCode === 13)) && searchInput.value !== '') {
    const searchedWord = searchInput.value.toLowerCase();
    if (dictionary[searchedWord]) {
      elements.frase.style.display = "block";
      defineWord(false, searchedWord);
      elements.errorMessage.innerText = "";
      searchInput.blur();
    } else {
      showError("* Palabra no reconocida en el diccionario.");
    }
  } else {
    showError("* Por favor ingresa la palabra a definir.");
  }
}

function toggleMode() {
  const modeOn = (mode === "Buscar") ? "Aleatorio" : "Buscar";
  const isRandom = (modeOn === "Aleatorio");

  // Guardar el estado en localStorage
  if (isRandom === true) {
    mode = "Aleatorio"
    localStorage.setItem("randomMode", isRandom);
  } else {
    mode = "Buscar"
      localStorage.setItem("randomMode", isRandom);
  }

  elements.searchInput.disabled = isRandom;
  elements.searchInput.setAttribute("placeholder", modeOn);
  elements.searchInput.value = "";
  elements.frase.style.display = "none";

  [elements.word, elements.category, elements.definition, elements.example, elements.errorMessage].forEach(element => element.innerText = "");

  const backgroundColorBody = isRandom ? "#1C6E8C" : "#274156";
  const backgroundColorInput = isRandom ? "#274156" : "#1C6E8C";

  document.body.style.backgroundColor = backgroundColorBody;
  document.documentElement.style.backgroundColor = backgroundColorBody;
  elements.subtitle.style.display = isRandom ? "block" : "none";
  elements.magnifier.style.backgroundColor = backgroundColorInput;
  elements.settings.style.backgroundColor = backgroundColorInput;
  elements.searchInput.style.backgroundColor = backgroundColorInput;
  elements.frase.style.backgroundColor =  backgroundColorInput;
}

function askRestoreConfiguration() {
  const confirmation = confirm("¿Deseas restaurar el modo anterior?");

  if (confirmation) {
    const savedMode = localStorage.getItem("randomMode");

    if (savedMode === "true") {
      elements.savedDiv.classList.remove('show');
      toggleMode(); // Restaurar el modo aleatorio si fue guardado
    }
  } else {
    elements.savedDiv.classList.remove('show');
  }
}

// Mostrar el botón al cargar la página si hay algo guardado en localStorage
window.onload = function () {
  const savedMode = localStorage.getItem("randomMode");

  if (savedMode === "true") {
    elements.savedDiv.classList.add('show');

    // Ocultar el div después de 5 segundos
    setTimeout(function() {
      elements.savedDiv.classList.remove('show');
    }, 3000); // 3000 milisegundos = 3 segundos
  }
};

document.addEventListener('copy', function (event) {
    event.preventDefault();
    alert("La forma fácil, no está aquí.");
});
