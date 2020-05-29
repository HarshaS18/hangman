const wordEl = document.getElementById("word");
const wrongLetterEl = document.getElementById("wrong-letter");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

const words = ["application", "programming", "interface", "wizard"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

console.log(selectedWord);
console.log(selectedWord.split(""));

selectedWord
  .split("")
  .map((letter) =>
    correctLetters.includes(letter)
      ? console.log(letter)
      : console.log("no letter")
  );

function displayWord() {
  wordEl.innerHTML = `${selectedWord
    .split("")
    .map(
      (letter) =>
        `<span class="letter">${
          correctLetters.includes(letter) ? letter : ""
        }</span>`
    )
    .join("")}`;

  const innerWord = wordEl.innerHTML.replace(/\n/g, "");

  if (innerWord === selectedWord) {
    finalMessage.innerHTML = "Congratulations! You won!";
    popup.style.display = "flex";
  }
}

displayWord();

window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

function updateWrongLettersEl() {
  wrongLetterEl.innerHTML = `
  ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""} 
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}`;

  figureParts.forEach((parts, index) => {
    const error = wrongLetters.length;
    console.log(error, index);
    if (index < error) {
      parts.style.display = "block";
    } else {
      parts.style.display = "none";
    }
  });

  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerHTML = "Unfortunately you lost";
    popup.style.display = "flex";
  }
}

playAgainBtn.addEventListener("click", () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLettersEl();
  popup.style.display = "none";
});
