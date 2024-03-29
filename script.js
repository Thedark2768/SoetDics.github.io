// DOM Elements
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

if (language === "spanish") {
    window.location.href = 'index__spanish.html';
} else if (language === "german"){
    window.location.href = 'index__german.html';
}


let mode = "Search";

// Dictionary of words and details
let dictionary = {
  "sest": {
    word: "Sest.",
    definition: "Sest is the act of eating food to meet the nutritional needs of the human body. It is a process of ingesting and digesting food to obtain energy and necessary nutrients.",
    example: "Posatɾon tɾeststok ate (I’ve an attribute.).",
    category: "V."
  },
  "soet": {
    word: "Soet.",
    definition: "Official name of the constructed language.",
    example: "Der tresk soet.",
    category: "Noun"
  },
};

// User input event handling
elements.searchInput.addEventListener('input', handleInput);

// Function to filter unwanted characters
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

// Function to display error messages to the user
function showError(message) {
  // Clear word, category, definition, and example fields
  elements.word.innerText = "";
  elements.category.innerText = "";
  elements.definition.innerText = "";
  elements.example.innerText = "";

  if (message !== "none") {
    // Show the error message in the error area
    elements.errorMessage.innerText = message;
    elements.frase.style.display = "none";
  } else {
    // Clear the error area
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

// Function triggered when the search button is pressed
function search(event) {
  const searchInput = elements.searchInput;
  if (mode === "Random") {
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
      showError("* Word not recognized in the dictionary.");
    }
  } else {
    showError("* Please enter the word to define.");
  }
}

function toggleMode() {
  const modeOn = (mode === "Search") ? "Random" : "Search";
  const isRandom = (modeOn === "Random");

  // Save the state in localStorage
  if (isRandom === true) {
    mode = "Random"
    localStorage.setItem("randomMode", isRandom);
  } else {
  mode = "Search"
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
  const confirmation = confirm("Do you want to restore the previous mode?");

  if (confirmation) {
    const savedMode = localStorage.getItem("randomMode");

    if (savedMode === "true") {
      elements.savedDiv.classList.remove('show');
      toggleMode(); // Restore random mode if it was saved
    }
  } else {
    elements.savedDiv.classList.remove('show');
  }
}

// Show button on page load if something is saved in localStorage
window.onload = function () {
  const savedMode = localStorage.getItem("randomMode");

  if (savedMode === "true") {
    elements.savedDiv.classList.add('show');

    // Hide the div after 5 seconds
    setTimeout(function() {
      elements.savedDiv.classList.remove('show');
    }, 3000); // 3000 milliseconds = 3 seconds
  }
};

document.addEventListener('copy', function (event) {
    event.preventDefault();
    alert("The easy way, it's not here.");
});
