'use strict';

const messageEl = document.querySelector('.message');
const guessEl = document.querySelector('.guess');
const bodyEl = document.querySelector('body');
const scoreEl = document.querySelector('.score');
const numberEl = document.querySelector('.number');
const highScoreEl = document.querySelector('.highscore');
const difficultyEl = document.querySelector('.difficulty');
const easyBtn = document.getElementById('easy');
const mediumBtn = document.getElementById('medium');
const hardBtn = document.getElementById('hard');

let isGameFinished = false;
let highScore = localStorage.getItem('highScore') || 0;
let secretNumber, currentScore;


function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
    
}


function showMessage(message) {
    messageEl.textContent = message;
}

function showScore(score) {
    scoreEl.textContent = score;
}

function showNumber(number) {
    numberEl.textContent = number;
}

function showHighScore(highScore) {
    highScoreEl.textContent = highScore;
}

function updateHighScore(score) {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        showHighScore(highScore);
    }
}

function resetGame() {
    isGameFinished = false;
    currentScore = 20;
    showScore(currentScore);
    showMessage('Start guessing...');
    guessEl.value = '';
    showNumber('?');
    bodyEl.style.backgroundColor = '#222';
    numberEl.classList.remove('big-number');
    setDifficulty();
    secretNumber = generateRandomNumber(difficulty.min, difficulty.max);
}

function checkGuess() {
    if (isGameFinished) {
        return;
    }

    const guess = Number(guessEl.value.trim());

    if (guess < difficulty.min || guess > difficulty.max) {
        showMessage(`🙅🏻‍♂️ Enter a number between ${difficulty.min} and ${difficulty.max}!`);
    } else if (guess === secretNumber) {
        showMessage('🎉 Correct Number!');
        bodyEl.style.backgroundColor = '#60b347 !important';
        updateHighScore(currentScore);
        isGameFinished = true;
        showNumber(secretNumber);
        numberEl.classList.add('big-number');
    } else {
        currentScore--;
        showScore(currentScore);

        if (currentScore > 0) {
            showMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
        } else {
            showMessage('💥 You lost the game!');
            bodyEl.style.backgroundColor = ' #da0909';
            showNumber(secretNumber);
            isGameFinished = true;
        }
    }
}

// ...

function setDifficulty() {
    if (easyBtn.checked) {
        difficulty.min = 1;
        difficulty.max = 10;
    } else if (mediumBtn.checked) {
        difficulty.min = 1;
        difficulty.max = 50;
    } else if (hardBtn.checked) {
        difficulty.min = 1;
        difficulty.max = 100;
    }

    const minNumberEl = document.querySelector('.min-number');
    const maxNumberEl = document.querySelector('.max-number');
    minNumberEl.textContent = difficulty.min;
    maxNumberEl.textContent = difficulty.max;
}

// ...



document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        checkGuess();
    }
});

document.querySelector('.check').addEventListener('click', checkGuess);

document.querySelector('.again').addEventListener('click', resetGame);

easyBtn.addEventListener('click', resetGame);
mediumBtn.addEventListener('click', resetGame);
hardBtn.addEventListener('click', resetGame);

const difficulty = {
    min: 1,
    max: 10
};

showHighScore(highScore);
setDifficulty();
resetGame();
