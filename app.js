let scores, roundScore, activePlayer, gamePlaying;
const firstPlayerPanel = document.getElementsByClassName('player-0-panel')[0];
const secondPlayerPanel = document.getElementsByClassName('player-1-panel')[0];
const diceDOM = document.getElementsByClassName('dice')[0];
const firstCurrentScore = document.getElementById('current-0');
const secondCurrentScore = document.getElementById('current-1');

const startNewGame = () => {

    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    diceDOM.style.display = 'none';
    firstCurrentScore.textContent = '0';
    secondCurrentScore.textContent = '0';
    firstPlayerPanel.classList.remove('winner');
    secondPlayerPanel.classList.remove('winner');
    firstPlayerPanel.classList.remove('active');
    secondPlayerPanel.classList.remove('active');
    firstPlayerPanel.classList.add('active');
};

const switchPlayer = () => {

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    firstCurrentScore.textContent = '0';
    secondCurrentScore.textContent = '0';
    diceDOM.style.display = 'none';

    firstPlayerPanel.classList.toggle('active');
    secondPlayerPanel.classList.toggle('active');
};

document.getElementsByClassName('btn-roll')[0].addEventListener('click', () => {
    if (gamePlaying) {

        const dice = Math.floor(Math.random() * 6) + 1;

        diceDOM.style.display = 'block';
        diceDOM.src = `images/dice-${dice}.png`;

        if (dice !== 1) {
            roundScore += dice;
            document.getElementById(`current-${activePlayer}`).textContent = roundScore;
        } else {
            switchPlayer();
        }
    }
});

document.getElementsByClassName('btn-hold')[0].addEventListener('click', () => {

    const activePlayerPanel = document.getElementsByClassName(`player-${activePlayer}-panel`)[0];

    if (gamePlaying) {

        scores[activePlayer] += roundScore;
        document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 100) {
            document.getElementById(`name-${activePlayer}`).textContent = 'Winner!';
            diceDOM.style.display = 'none';
            activePlayerPanel.classList.add('winner');
            activePlayerPanel.classList.remove('active');
            gamePlaying = false;
        } else {
            switchPlayer();
        }
    }
});

document.getElementsByClassName('btn-new')[0].addEventListener('click', startNewGame);

startNewGame();
