console.log('Rock Paper Scissors');

let round = 0;
let computerTally = 0;
let playerTally = 0;

/* Computer picks rock, paper or scissors */
function computerTurn() {
    let outcome = Math.floor(Math.random() * 3) + 1;
    if (outcome === 1) return 'Rock';
    if (outcome === 2) return 'Scissors';
    if (outcome === 3) return 'Paper';
}

function playerTurn() {
    let outcome = prompt('Choose a move [rock, paper or scissors]:');
    outcome = outcome.toLowerCase();
    console.log(capitalise(outcome));
    if (outcome === 'rock' || outcome === 'paper' || outcome === 'scissors') {
        return outcome;
    } else {
        alert('Invalid response, please try again.');
        return playerTurn();
    }
}

/* Play ONE ROUND of rock, paper, scissors */
function playRound(pMove, cMove) {
    pMove = playerTurn();
    cMove = computerTurn();
    pMove = capitalise(pMove);

    if (pMove === cMove) {
        console.log(`Draw, both chose ${pMove.toLowerCase()}`);
        return playRound();
    }

    if (pMove === 'Rock' && cMove === 'Scissors') return advanceScore('player', pMove, cMove);
    if (pMove === 'Scissors' && cMove === 'Paper') return advanceScore('player', pMove, cMove);
    if (pMove === 'Paper' && cMove === 'Rock') return advanceScore('player', pMove, cMove);
    if (cMove === 'Rock' && pMove === 'Scissors') return advanceScore('computer', cMove, pMove);
    if (cMove === 'Scissors' && pMove === 'Paper') return advanceScore('computer', cMove, pMove);
    if (cMove === 'Paper' && pMove === 'Rock') return advanceScore('computer', cMove, pMove);
}

/* Play ONE MATCH (first to win 5 rounds) of rock, paper, scissors */
function startMatch() {
    while (playerTally < 5 || computerTally < 5) {
        return playRound();
    }
}

function checkWinner() {
    if (playerTally === 5 || computerTally === 5) {
        
        if (playerTally > computerTally) {
            resetScore();
            return console.log('Player wins');
        }

        if (computerTally > playerTally) {
            resetScore();
            return console.log('Computer wins');
        }

    } else {
        return playRound();
    }
}

function advanceScore(winner, winningMove, losingMove) {
    round += 1;
    if (winner === 'player') playerTally += 1;
    if (winner === 'computer') computerTally += 1;
    announceTally(winningMove, losingMove, winner);
    checkWinner();
}

function announceTally(winnerSelection, loserSelection, winner) {
    // Announce who won the round
    console.log(`${winnerSelection} beats ${loserSelection.toLowerCase()}. ` + capitalise(winner) + ` has won this round.`)
    // Announce the current score
    console.log(`User: ${playerTally} rounds won.`);
    console.log(`Computer: ${computerTally} rounds won.`)
}

function resetScore() {
    round = 0;
    computerTally = 0;
    playerTally = 0;
}

function capitalise(string) {
    return string[0].toUpperCase() + string.slice(1);
}

// startMatch();