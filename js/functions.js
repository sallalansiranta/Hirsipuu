const words = ['javascript', 'ohjelmointi', 'verkko', 'tietokone']; 
let randomizedWord;
let maskedWord;
let attempts = 0;

const wordElement = document.querySelector('#word');
const guessInput = document.querySelector('#guess');
const submitGuessButton = document.querySelector('#submitGuess');
const messageElement = document.querySelector('#message');
const attemptsElement = document.querySelector('#attempts');

// Aloita uusi peli
const newGame = () => {
  const randomIndex = Math.floor(Math.random() * words.length);
  randomizedWord = words[randomIndex];
  maskedWord = '*'.repeat(randomizedWord.length);
  wordElement.textContent = maskedWord;
  attempts = 0;
  attemptsElement.textContent = `Arvaukset: ${attempts}`;
  messageElement.textContent = '';
  console.log(`Oikea sana: ${randomizedWord}`); 
};


const replaceFoundChars = (guess) => {
  let newMaskedWord = maskedWord.split('');
  for (let i = 0; i < randomizedWord.length; i++) {
    if (randomizedWord[i] === guess) {
      newMaskedWord[i] = guess;
    }
  }
  maskedWord = newMaskedWord.join('');
  wordElement.textContent = maskedWord;
};


const checkGuess = () => {
  const guess = guessInput.value.toLowerCase();
  guessInput.value = '';
  attempts++;

  if (guess.length === 1) {
    if (randomizedWord.includes(guess)) {
      replaceFoundChars(guess);
      if (maskedWord === randomizedWord) {
        messageElement.textContent = `Voitit! Oikea sana on ${randomizedWord}.`;
        return;
      }
    } else {
      messageElement.textContent = `Kirjain ${guess} ei ole sanassa.`;
    }
  } else if (guess === randomizedWord) {
    maskedWord = randomizedWord;
    wordElement.textContent = randomizedWord;
    messageElement.textContent = `Voitit! Oikea sana on ${randomizedWord}.`;
  } else {
    messageElement.textContent = 'Väärä arvaus.';
  }

  attemptsElement.textContent = `Arvaukset: ${attempts}`;

  if (maskedWord === randomizedWord) {
    messageElement.textContent = `Voitit! Oikea sana on ${randomizedWord}.`;
  }
};

submitGuessButton.addEventListener('click', checkGuess);
guessInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    checkGuess();
  }
});

newGame();
