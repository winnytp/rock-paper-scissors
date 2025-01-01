console.log("Rock Paper Scissors");
console.log("To start, type playGame() and press the Enter key.")

// starting variable declarations
let playerScore = 0, computerScore = 0, round = 1;

function getUserInput(choice) {
    console.log(choice);
    return choice;
}

function getComputerInput() {
    // generate random number between 1-3
    let randomSelection = Math.floor((Math.random() * 3) + 1);

    // apply random number to a valid selection in rock, paper, scissors.
    if (randomSelection === 1) { return "rock" };
    if (randomSelection === 2) { return "paper" };
    if (randomSelection === 3) { return "scissors"};
}

function playGame(choice) {
    let computerChoice;
    let userChoice;

    console.log(`Round ${round}`);
    roundCount.textContent = `Round ${round}`;

    // input the choices for computer and user, store in variables
    computerChoice = getComputerInput();
    userChoice = getUserInput(choice);

    // check result
    let result = checkRoundResult(userChoice, computerChoice);

    // action the results depending on who won round
    if (result === "player") {
        ++playerScore; // increment user score
        displayRoundResult("player", userChoice, computerChoice);
    } else if (result === "draw") {
        displayRoundResult("draw", userChoice);
    } else {
        ++computerScore; // increment computer score
        displayRoundResult("computer", computerChoice, userChoice);
    }

    ++round; // increment round counter

    if (checkGameWinner() === false) { 
        return;
    } else {
        if (playerScore > computerScore) {
            console.log(`You have won ${playerScore} rounds to ${computerScore}. First to 5 wins. You are the winner.`)
            modalText.textContent = `You won!`;
        } else {
            console.log(`The opponent won ${computerScore} rounds to ${playerScore} rounds. First to 5 wins. You have lost.`)
            modalText.textContent = `You lost, sorry.`;
        }
        modal.classList.remove('hidden');
    }

    // return console.log("Thanks for playing. To restart, type playGame() and press Enter.");
}

function displayRoundResult(winner, winnerChoice, loserChoice) {
    if (winner === "player") { // if player won, display their results
        console.log(`You played ${winnerChoice} against ${loserChoice} and won.`);
        roundStatus.textContent = `You played ${winnerChoice} against ${loserChoice}.`;
        roundWinner.textContent = "You won!";
        playerScoreText.textContent = `Score: ${playerScore}`;
        updateHPBar(winner);
    } else if (winner === "draw") {
        console.log(`You played ${winnerChoice} against ${winnerChoice} resulting in a draw.`);
        roundStatus.textContent = `You played ${winnerChoice} against ${winnerChoice}.`;
        roundWinner.textContent = "It's a draw!";
        updateHPBar(winner);
    } else { // if computer won, display their results
        console.log(`You played ${loserChoice} against ${winnerChoice} and lost.`);
        roundStatus.textContent = `You played ${loserChoice} against ${winnerChoice}.`;
        roundWinner.textContent = "You lost!";
        computerScoreText.textContent = `Score: ${computerScore}`;
        updateHPBar(winner);
    }
    console.log(`Your score: ${playerScore}`);
    console.log(`Opponent's score: ${computerScore}`);
    return;
}

function updateHPBar(winner) {
    // draw the HP bar for the winner
    if (winner === "player") {
        // reduce computer HP bar
        let gridItem = document.querySelector(`[data-computer="${playerScore}"]`);
        gridItem.classList.add('transparent');
    } else if (winner === "draw") {
        return;
    } else {
        // reduce player HP bar
        let gridItem = document.querySelector(`[data-player="${computerScore}"]`);
        gridItem.classList.add('transparent');
    }
    return;
}

function checkGameWinner() {
    // check if game has a winner yet (first to 5 wins)
    if (playerScore === 5 || computerScore === 5) {
        return true;
    } else {
        return false;
    }
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
    } else { // else return "computer" as the winner
        return "computer";
    };
}

function resetGame() {
    // reset game variables
    playerScore = 0;
    computerScore = 0;
    round = 0;

    // reset html elements
    modal.classList.add('hidden');
    playerScoreText.textContent = `Score: ${playerScore}`;
    computerScoreText.textContent = `Score: ${computerScore}`;
    roundCount.textContent = `Round ${round}`;
    roundStatus.textContent = "Click a button to start";
    roundWinner.textContent = "-- Game not started --";

    // reset hp bars
    for (let i = 1; i <= 5; i++) {
        let playerHP = document.querySelector(`[data-player="${i}"]`);
        let computerHP = document.querySelector(`[data-computer="${i}"]`);
        playerHP.classList.remove('transparent');
        computerHP.classList.remove('transparent');
    }

    return;
}

// query selectors
const buttons = document.querySelectorAll("button");
const roundCount = document.querySelector(".round-count");
const roundStatus = document.querySelector(".round-status");
const roundWinner = document.querySelector(".round-winner");
const playerScoreText = document.querySelector("#player-score");
const computerScoreText = document.querySelector("#computer-score");
const modal = document.querySelector(".modal");
const modalText = document.querySelector(".modal-text");
const modalBtn = document.querySelector("#modal-btn");

buttons.forEach((button) => {
    // game buttons (rock, paper, scissors) event listener
    console.log(button.id);
    if (button.id === "rock" || button.id === "paper" || button.id === "scissors") {
        button.addEventListener("click", () => {
            playGame(button.id);
        });
        return;
    }

    // modal button event listener
    if (button.id = "modal-btn") {
        button.addEventListener("click", () => {
            resetGame();
        });
        return;
    }
});