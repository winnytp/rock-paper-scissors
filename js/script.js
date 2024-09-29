console.log("Rock Paper Scissors");

// Starting variable declarations
let userScore = 0, computerScore = 0, round = 0;
let gameStarted = false;
let lastPlayed = undefined;

function getUserInput() {
    let userChoice = prompt("Type your selection (rock, paper, scissors): ");
    // If input is invalid then start prompt again from beginning.
    if (!checkInput(userChoice)) {
        userChoice = undefined;
        return getUserInput();
    }
    // If input is valid, return the input.
    return userChoice;
}

function checkInput(input) {
    if (
        input === "rock" ||
        input === "paper" ||
        input === "scissors"
    ) {
        return true;
    } else {
        console.log("Your choice was invalid. Please type again.")
        return false;
    }
}

function getComputerInput() {
    // Generate random number between 1-3
    let randomSelection = Math.floor((Math.random() * 3) + 1);

    // Apply random number to a valid selection in rock, paper, scissors.
    if (randomSelection === 1) { return "rock" };
    if (randomSelection === 2) { return "paper" };
    if (randomSelection === 3) { return "scissors "};
    return console.log("Something went wrong with getComputerInput function...");
}

function startGame() {
    gameStarted = true;
}

function playRound() {
    
}

function resetGameVariables() {
    userScore = 0;
    computerScore = 0;
    round = 0;
    gameStarted = false;
    lastPlayed = undefined;
}