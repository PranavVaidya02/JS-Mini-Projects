# Number Guessing Game

A browser-based number guessing game built using HTML, CSS, and JavaScript.

The player selects numbers from 1 to 100 and receives feedback based on how close the selected number is to the randomly generated secret number.

## Features

- Dynamically generated number board from 1 to 100
- Distance-based feedback for each guess
- Duplicate guesses are prevented
- Guess counter
- High score system based on the lowest number of guesses
- High score persistence using localStorage
- Start game modal
- Win and restart modal
- Responsive layout

## Concepts Practiced

- DOM Manipulation
- Event Delegation
- Event Handling
- `event.target`
- `classList`
- Conditional Statements
- `Math.random()`
- `Math.abs()`
- JavaScript State Management
- localStorage
- CSS Grid
- Flexbox
- CSS Pseudo-classes
- Responsive Design

## How to Play

1. Click the **Start Game** button.
2. Select a number between 1 and 100.
3. Use the feedback to determine how close your guess is.
4. Continue guessing until you find the secret number.
5. Try to beat your high score by winning in fewer guesses.

## Project Structure

    01-Number-Guessing-Game/
    ├── index.html
    ├── style.css
    ├── script.js
    └── README.md

## What I Learned

Through this project, I practiced generating DOM elements dynamically, handling user interactions using event delegation, managing game state, preventing duplicate guesses, persisting data with localStorage, and resetting UI state between games.

## Future Improvements

- Add difficulty levels
- Add keyboard accessibility
- Add animations and sound effects
- Add an option to reset the high score