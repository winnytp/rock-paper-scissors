// Query Selectors
const userButtons = document.querySelectorAll('button');
const pResult = document.getElementById('result-txt');
const pPlayerTally = document.getElementById('p-tally-txt');
const pComputerTally = document.getElementById('c-tally-txt');
const pRound = document.getElementById('round-txt');
const pWinLoss = document.getElementById('win-loss-p');

// Event Listeners
userButtons.forEach((button) => {
    button.addEventListener('click', playRound); // when player clicks button, play a round of rock, paper, scissors
});

// Initialise variables
let round = 0;
let computerTally = 0;
let playerTally = 0;

// Function: computer picks rock, paper or scissors and returns value
function computerTurn() {
    let outcome = Math.floor(Math.random() * 3);
    if (outcome === 0) return 'Rock';
    if (outcome === 1) return 'Scissors';
    if (outcome === 2) return 'Paper';
}

function playRound(pMove, cMove) {
    pMove = this.dataset.value;
    cMove = computerTurn();
    pMove = capitalise(pMove);

    if (pMove === cMove) {
        console.log(`Draw, both chose ${convertToEmoji(pMove)}`);
        round += 1;
        drawRoundResult('draw');
        return writeTally('draw', pMove);
    }

    if (pMove === 'Rock' && cMove === 'Scissors') return computeScore('player', pMove, cMove);
    if (pMove === 'Scissors' && cMove === 'Paper') return computeScore('player', pMove, cMove);
    if (pMove === 'Paper' && cMove === 'Rock') return computeScore('player', pMove, cMove);
    if (cMove === 'Rock' && pMove === 'Scissors') return computeScore('computer', cMove, pMove);
    if (cMove === 'Scissors' && pMove === 'Paper') return computeScore('computer', cMove, pMove);
    if (cMove === 'Paper' && pMove === 'Rock') return computeScore('computer', cMove, pMove);
}

function checkWinner() {
    if (playerTally === 5 || computerTally === 5) {

        resetText();

        if (playerTally > computerTally) {
            alert('User wins.');
            resetScore();
            return console.log('Player wins');
        }

        if (computerTally > playerTally) {
            alert('Computer wins.');
            resetScore();
            return console.log('Computer wins');
        }
    }
    return console.log('No winner yet.')
}

// Function: record score based on who won the round and output result to HTML DOM
function computeScore(winner, winningMove, losingMove) {
    round += 1;
    if (winner === 'player') {
        playerTally += 1;
        drawRoundResult('win');
    }
    if (winner === 'computer') {
        computerTally += 1;
        drawRoundResult('loss');
    }
    writeTally(winner, winningMove, losingMove);
    announceTally(winningMove, losingMove, winner);
    checkWinner();
}

// Function: output latest results (winner, moves) to DOM
function announceTally(winnerSelection, loserSelection, winner) {
    console.log(`${winnerSelection} beats ${loserSelection.toLowerCase()}. ` + capitalise(winner) + ` has won this round.`)
    console.log(`User: ${playerTally} rounds won.`);
    console.log(`Computer: ${computerTally} rounds won.`)
}

// Function: output round data to the DOM
function writeTally(winner, winMove, loseMove) {
    pRound.textContent = 'Round ' + round.toString();
    pPlayerTally.textContent = 'You: ' + playerTally.toString() + ' wins';
    pComputerTally.textContent = 'AI: ' + computerTally.toString() + ' wins';

    if (winner === 'draw') {
        pResult.textContent = `It's a draw. Both picked ${convertToEmoji(winMove)}`;
    }

    if (winner === 'player') {
        pResult.textContent = `You win. ${convertToEmoji(winMove)} beats ${convertToEmoji(loseMove)}`;
    }

    if (winner === 'computer') {
        pResult.textContent = `You lose. ${convertToEmoji(winMove)} beats ${convertToEmoji(loseMove)}`;
    }
}

function resetScore() {
    round = 0;
    computerTally = 0;
    playerTally = 0;
}

function resetText() {
    pResult.textContent = 'First to 5 rounds wins.';
    pPlayerTally.textContent = 'You: 0 wins';
    pComputerTally.textContent = 'AI: 0 wins';
    pRound.textContent = 'Round 0';
    pWinLoss.innerHTML = '';
}

function capitalise(string) {
    return string[0].toUpperCase() + string.slice(1);
}

function drawRoundResult(result) {
    let span = document.createElement('span');

    if (result === 'win') {
        span.classList.add('win');
        span.innerText = 'W';
        pWinLoss.appendChild(span);
    }

    if (result === 'loss') {
        span.classList.add('loss');
        span.innerText = 'L';
        pWinLoss.appendChild(span);
    }

    if (result === 'draw') {
        span.classList.add('draw');
        span.innerText = 'D';
        pWinLoss.appendChild(span);
    }
}

function convertToEmoji(text) {
    if (text === 'Rock') {
        return '🪨';
    }

    if (text === 'Paper') {
        return '📝';
    }

    if (text === 'Scissors') {
        return '✂️';
    }
}