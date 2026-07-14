// ==================== DOM ELEMENTS ====================

// Game board
const board = document.querySelector(".board");

// Feedback UI
const feedbackEmoji = document.querySelector(".feedback-emoji");
const feedbackMessage = document.querySelector(".feedback-message");

// Score UI
const currentGuesses = document.querySelector("#current-guesses");
const highScoreElement = document.querySelector("#high-score");

// Start modal
const startModal = document.querySelector(".modal-start");
const startButton = document.querySelector(".btn-start");

// Restart modal
const restartModal = document.querySelector(".modal-restart");
const restartButton = document.querySelector(".btn-restart");
const finalGuessCount = document.querySelector("#final-guess-count");


// ==================== GAME STATE ====================

// Secret number for the current game
let computerNumber;

// Number of valid unique guesses
let guessCount;

// Controls whether the board accepts guesses
let isGameActive = false;


// ==================== HIGH SCORE ====================

// Retrieve previously saved high score
const savedHighScore = localStorage.getItem("highScore");

// Convert saved score to a number if it exists
let highScore =
    savedHighScore !== null
        ? Number(savedHighScore)
        : null;

// Display saved high score or "--"
highScoreElement.innerText = highScore === null ? "--" : highScore;


// ==================== GENERATE BOARD ====================

// Create number cells from 1 to 100
for (let i = 1; i <= 100; i++) {
    const numberCell = document.createElement("li");

    numberCell.innerText = i;

    board.appendChild(numberCell);
}


// ==================== HANDLE BOARD CLICKS ====================

// Event delegation: one listener handles all number cells
board.addEventListener("click", (event) => {

    // Ignore clicks if the game is not active
    if (!isGameActive) {
        return;
    }

    // Ignore clicks outside number cells
    if (event.target.tagName !== "LI") {
        return;
    }

    // Ignore already guessed numbers
    if (event.target.classList.contains("guessed")) {
        return;
    }


    // ==================== PROCESS VALID GUESS ====================

    // Mark number as guessed
    event.target.classList.add("guessed");

    // Increase guess count
    guessCount++;

    // Update displayed guess count
    currentGuesses.innerText = guessCount;


    // Get clicked number
    const userNumber = Number(event.target.innerText);

    // Calculate distance from secret number
    const distance = Math.abs(userNumber - computerNumber);


    // ==================== HANDLE RESULT ====================

    if (distance === 0) {

        // Winning feedback
        feedbackEmoji.innerText = "🎉";
        feedbackMessage.innerText = "You Win!!";

        // Stop the game
        isGameActive = false;


        // ==================== UPDATE HIGH SCORE ====================

        // Update only if this is the first win
        // or the current score is better
        if (highScore === null || guessCount < highScore) {
            highScore = guessCount;

            highScoreElement.innerText = highScore;

            localStorage.setItem("highScore", highScore);
        }


        // ==================== SHOW RESTART MODAL ====================

        // Display final number of guesses
        finalGuessCount.innerText = guessCount;

        // Show restart modal
        restartModal.classList.remove("hidden");

    } else if (distance <= 5) {

        feedbackEmoji.innerText = "🔥";
        feedbackMessage.innerText = "Very Close";

    } else if (distance <= 15) {

        feedbackEmoji.innerText = "🙂";
        feedbackMessage.innerText = "Close";

    } else if (distance <= 25) {

        feedbackEmoji.innerText = "😐";
        feedbackMessage.innerText = "Far";

    } else {

        feedbackEmoji.innerText = "🥶";
        feedbackMessage.innerText = "Very Far";
    }
});


// ==================== START GAME ====================

function startGame() {

    // Generate random number between 1 and 100
    computerNumber = Math.floor(Math.random() * 100) + 1;

    // Keep temporarily for testing
    console.log("Computer Number:", computerNumber);


    // Reset JavaScript game state
    guessCount = 0;
    isGameActive = true;


    // Reset UI
    currentGuesses.innerText = 0;

    feedbackEmoji.innerText = "";
    feedbackMessage.innerText = "";


    // Select all number cells
    const numberCells = document.querySelectorAll(".board li");

    // Remove guessed state from every cell
    numberCells.forEach((cell) => {
        cell.classList.remove("guessed");
    });
}


// ==================== START MODAL ====================

startButton.addEventListener("click", () => {

    // Hide start modal
    startModal.classList.add("hidden");

    // Begin first game
    startGame();
});


// ==================== RESTART MODAL ====================

restartButton.addEventListener("click", () => {

    // Hide restart modal
    restartModal.classList.add("hidden");

    // Start a fresh game
    startGame();
});