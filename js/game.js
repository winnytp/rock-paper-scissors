console.log('Rock Paper Scissors');

let round = 0;
let computerTally = 0;
let playerTally = 0;

function computerTurn() {
    let outcome = Math.floor(Math.random() * 3) + 1;
    if (outcome === 1) return 'Rock';
    if (outcome === 2) return 'Scissors';
    if (outcome === 3) return 'Paper';
}

function playerTurn() {
    let outcome = prompt('Choose a move [rock, paper or scissors]:').toLowerCase();
    if (outcome === 'rock' || outcome === 'paper' || outcome === 'scissors') {
        return outcome;
    } else {
        alert('Invalid response, please try again.');
        return playerTurn();
    }
}

function playRound(pMove, cMove) {
    // pMove = playerTurn();
    pMove = this.dataset.value;
    cMove = computerTurn();
    pMove = capitalise(pMove);

    if (pMove === cMove) {
        console.log(`Draw, both chose ${convertToEmoji(pMove)}`);
        round += 1;
        return writeTally('draw', pMove);
    }

    if (pMove === 'Rock' && cMove === 'Scissors') return addScore('player', pMove, cMove);
    if (pMove === 'Scissors' && cMove === 'Paper') return addScore('player', pMove, cMove);
    if (pMove === 'Paper' && cMove === 'Rock') return addScore('player', pMove, cMove);
    if (cMove === 'Rock' && pMove === 'Scissors') return addScore('computer', cMove, pMove);
    if (cMove === 'Scissors' && pMove === 'Paper') return addScore('computer', cMove, pMove);
    if (cMove === 'Paper' && pMove === 'Rock') return addScore('computer', cMove, pMove);
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

function addScore(winner, winningMove, losingMove) {
    round += 1;
    if (winner === 'player') playerTally += 1;
    if (winner === 'computer') computerTally += 1;
    writeTally(winner, winningMove, losingMove);
    announceTally(winningMove, losingMove, winner);
    checkWinner();
}

function announceTally(winnerSelection, loserSelection, winner) {
    console.log(`${winnerSelection} beats ${loserSelection.toLowerCase()}. ` + capitalise(winner) + ` has won this round.`)
    console.log(`User: ${playerTally} rounds won.`);
    console.log(`Computer: ${computerTally} rounds won.`)
}

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
}

function capitalise(string) {
    return string[0].toUpperCase() + string.slice(1);
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

// Query Selectors
const userButtons = document.querySelectorAll('button');
const pResult = document.getElementById('result-txt');
const pPlayerTally = document.getElementById('p-tally-txt');
const pComputerTally = document.getElementById('c-tally-txt');
const pRound = document.getElementById('round-txt');

// Event Listeners
userButtons.forEach((button) => {
    button.addEventListener('click', playRound);
});