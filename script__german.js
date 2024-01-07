// DOM-Elemente
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
} else if (language === "english"){
    window.location.href = 'index.html';
}

let mode = "Suche";

// Wörterbuch mit Wörtern und Details
let dictionary = {
  "sest": {
    word: "Sest.",
    definition: "Sest ist der Akt des Essens von Lebensmitteln, um den ernährungsphysiologischen Bedarf des menschlichen Körpers zu decken. Es ist ein Prozess der Aufnahme und Verdauung von Lebensmitteln, um Energie und notwendige Nährstoffe zu erhalten.",
    example: "Posatɾon tɾeststok ate (Ich habe eine Eigenschaft.).",
    category: "V."
  },
  "soet": {
    word: "Soet.",
    definition: "Offizieller Name der konstruierten Sprache.",
    example: "Der tresk soet.",
    category: "Substantiv"
  },
};

// Behandlung des Benutzereingabeereignisses
elements.searchInput.addEventListener('input', handleInput);

// Funktion zum Filtern unerwünschter Zeichen
function handleInput(event) {
  const inputValue = event.target.value;
  const filteredValue = inputValue.replace(/[^aAeEoOtTsSpPkKrRɾ]/g, '');

  if (inputValue !== filteredValue) {
    // Fehleranimation aktivieren, wenn ungültige Zeichen eingegeben werden
    elements.frase.style.display = "none";
    showError("* Das eingegebene Zeichen wird in dieser Sprache nicht akzeptiert.");
  }

  // Eingabewert mit erlaubten Zeichen aktualisieren
  event.target.value = filteredValue;
}

// Funktion zum Anzeigen von Fehlermeldungen für den Benutzer
function showError(message) {
  // Felder für Wort, Kategorie, Definition und Beispiel löschen
  elements.word.innerText = "";
  elements.category.innerText = "";
  elements.definition.innerText = "";
  elements.example.innerText = "";

  if (message !== "none") {
    // Fehlermeldung im Fehlerbereich anzeigen
    elements.errorMessage.innerText = message;
    elements.frase.style.display = "none";
  } else {
    // Fehlerbereich leeren
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

// Funktion, die ausgelöst wird, wenn die Suchtaste gedrückt wird
function search(event) {
  const searchInput = elements.searchInput;
  if (mode === "Zufällig") {
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
      showError("* Wort im Wörterbuch nicht erkannt.");
    }
  } else {
    showError("* Bitte gib das zu definierende Wort ein.");
  }
}

function toggleMode() {
  const modeOn = (mode === "Suche") ? "Zufällig" : "Suche";
  const isRandom = (modeOn === "Zufällig");

  // Zustand in localStorage speichern
  if (isRandom === true) {
    mode = "Zufällig"
    localStorage.setItem("randomMode", isRandom);
  } else {
    mode = "Suche"
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
  const confirmation = confirm("Möchtest du den vorherigen Modus wiederherstellen?");

  if (confirmation) {
    const savedMode = localStorage.getItem("randomMode");

    if (savedMode === "true") {
      elements.savedDiv.classList.remove('show');
      toggleMode(); // Zufallsmodus wiederherstellen, wenn gespeichert
    }
  } else {
    elements.savedDiv.classList.remove('show');
  }
}

// Button beim Laden der Seite anzeigen, wenn etwas in localStorage gespeichert ist
window.onload = function () {
  const savedMode = localStorage.getItem("randomMode");

  if (savedMode === "true") {
    elements.savedDiv.classList.add('show');

    // Div nach 5 Sekunden ausblenden
    setTimeout(function() {
      elements.savedDiv.classList.remove('show');
    }, 3000); // 3000 Millisekunden = 3 Sekunden
  }
};

document.addEventListener('copy', function (event) {
    event.preventDefault();
    alert("Der einfache Weg ist nicht hier.");
});