let sortedNumbers = [];
let sortedNumbersLimit = 10;
let attempts = 0;
let secretNumber = 0;

function ChangeInnerHtml(tag, text) {
    let field = document.querySelector(tag);
    field.innerHTML = text;
    responsiveVoice.speak(text, 'US English Male', {rate:1.2});
}

function showInitialMessage() {
    ChangeInnerHtml('h1', 'Secret Number Game');
    ChangeInnerHtml('p', 'Choose a number between 1 and 10');
}

function clearField() {
    guess = document.querySelector('input');
    guess.value = '';
}

function getRandomNumber() {
    let number;
    let sortedNumbersQty = sortedNumbers.length;

    if (sortedNumbersQty == sortedNumbersLimit) sortedNumbers = [];

    while (true) {
        number = parseInt(Math.random() * sortedNumbersLimit + 1);
        if (!sortedNumbers.includes(number)) break;
    }
    sortedNumbers.push(number);
    return number;
}

function setGame() {
    showInitialMessage();
    secretNumber = getRandomNumber();
}

function verifyGuess() {
    attempts++;
    let guess = document.querySelector('input').value;
    let wordAttempt = attempts > 1 ? 'attempts' : 'attempt';

    if (guess == secretNumber) {
        ChangeInnerHtml('h1', 'Congratulations!');
        ChangeInnerHtml('p', 'You found the secret number with ' + attempts + ' ' + wordAttempt + '!');
        document.getElementById('restart').removeAttribute('disabled');
        document.getElementById('guess').setAttribute('disabled', true);
    } else if (guess < secretNumber) {
        ChangeInnerHtml('p', 'The secret number is higher!');
    } else if (guess > secretNumber) {
        ChangeInnerHtml('p', 'The secret number is lower!');
    }

    clearField();
}

function restartGame() {
    setGame();
    attempts = 0;
    document.getElementById('restart').setAttribute('disabled', true);
    document.getElementById('guess').removeAttribute('disabled');
}

setGame();
