// Selecting Elements
const player0Element = document.querySelector(".player-0-panel");
const player1Element = document.querySelector(".player-1-panel");

const score0Element = document.getElementById("score-0");
const score1Element = document.getElementById("score-1");
const current0Element = document.getElementById("current-0");
const current1Element = document.getElementById("current-1");

const diceImg = document.querySelector(".dice");
const btnNew = document.querySelector(".btn-new");
const btnRoll = document.querySelector(".btn-roll");
const btnHold = document.querySelector(".btn-hold");

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// Function to avoid repition in the code below. we will simply call when we need it
const switchPlayer = function () {
  document.getElementById(`current-${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle("active");
  player1Element.classList.toggle("active");
};

// Starting Conditions
score0Element.textContent = 0;
score1Element.textContent = 0;
diceImg.classList.add("hidden");

// Rolling Dice Functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generate a Random Dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display the Dice
    diceImg.classList.remove("hidden"); // remove the hidden class that was added above
    diceImg.src = `media/dice-${dice}.png`; // this is how we manipulate the images through source'src'

    // 3. Check if the roll is 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current-${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to the next player
      switchPlayer(); // just call the function we created above.
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score-${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if the score is >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceImg.classList.add("hidden");
      // Finish the game
      document.querySelector(`.player-${activePlayer}`).classList.add("winner");
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove("active");
    } else {
      // Switch the player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", function () {
  // Reset all game parameters to original state
  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;
  playing = true;

  // Reset displayed scores
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;

  // Hide the dice
  diceImg.classList.add("hidden");

  // Remove winner class if present
  player0Element.classList.remove("winner");
  player1Element.classList.remove("winner");

  // Reset to player 0 as active player
  activePlayer = 0;
  player0Element.classList.add("active");
  player1Element.classList.remove("active");
});
