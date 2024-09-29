console.log("Rock Paper Scissors");

// starting variable declarations
let userScore = 0, computerScore = 0, round = 0;
let gameStarted = false;
let lastPlayed = undefined;

function getUserInput() {
    let userChoice = prompt("Type your selection (rock, paper, scissors): ");
    // if input is invalid then start prompt again from beginning.
    if (!checkInput(userChoice)) {
        userChoice = undefined;
        return getUserInput();
    }
    // if input is valid, return the input.
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
    // generate random number between 1-3
    let randomSelection = Math.floor((Math.random() * 3) + 1);

    // apply random number to a valid selection in rock, paper, scissors.
    if (randomSelection === 1) { return "rock" };
    if (randomSelection === 2) { return "paper" };
    if (randomSelection === 3) { return "scissors"};
    return console.log("Something went wrong with getComputerInput function...");
}

function startGame() {
    gameStarted = true;
}

function playRound() {
    let userChoice;
    let computerChoice;

    // input the choices for computer and user, store in variables
    computerChoice = getComputerInput();
    userChoice = getUserInput();

    // check result
    let result = checkRoundResult(userChoice, computerChoice);

    // action the results depending on who won round
    if (result === "player") {
        ++userScore; // increment user score
        displayRoundResult("player", userChoice, computerChoice);
    } else if (result === "draw") {
        displayRoundResult("draw", userChoice);
    } else {
        ++computerScore; // increment computer score
        displayRoundResult("computer", computerChoice, userChoice);
    }

    ++round; // increment round counter

    return;
}

function displayRoundResult(winner, winnerChoice, loserChoice) {
    if (winner === "player") { // if player won, display their results
        console.log(`You played ${winnerChoice} against ${loserChoice} and won.`);
    } else if (winner === "draw") {
        console.log(`You played ${winnerChoice} against ${winnerChoice} resulting in a draw.`);
    } else { // if computer won, display their results
        console.log(`You played ${loserChoice} against ${winnerChoice} and lost.`)
    }
    console.log(`Your score: ${userScore}`);
    console.log(`Opponent's score: ${computerScore}`);
    return;
}

function checkGameWinner() {
    // check if game has a winner yet (first to 5 wins)
    if (userScore != 5 || computerScore != 5) { return }
    if (userScore = 5) { return console.log("You won!") }
    if (computerScore = 5) { return (console.log("You lost!")) }
}

function checkRoundResult(user, computer) {
    if ( // if player choices beat computer choices, return "player"
        user === "rock" && computer === "scissors" ||
        user === "paper" && computer === "rock" ||
        user === "scissors" && computer === "paper"
    ) {
        return "player"
    } else if (user === computer) { // if choices are identical, return "draw"
        return "draw";
    } else { // if all else is false, then return "computer" as the winner
        return "computer";
    };
}

function resetGameVariables() {
    userScore = 0;
    computerScore = 0;
    round = 0;
    gameStarted = false;
    lastPlayed = undefined;
}