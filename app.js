// GAME FUNCTION:
// - Player must guess a number between a min and max
// - Player gets a certain amount of guesses
// - Notify the player of guesses remaining
// - Notify the player of the correct answer if lose
// - Let player choose to play again

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});

// Listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);

    // Validate
    if(isNaN(guess) || guess<min || guess>max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    // Check if won
    if(guess === winningNum){
        // Game Over - Won
        gameOver(true, `${winningNum} is correct! You Win!`)

    } else{
        // Wrong number
        guessesLeft -= 1;

        if(guessesLeft === 0){
            // Game Over - Lost
            gameOver(false, `Game Over! You Lose. The correct number was ${winningNum}!`);
        
        } else{
            // Game continues - answer wrong

            // Set border color
            guessInput.style.borderColor = 'red';

            // Clear input
            guessInput.value = '';

            // Tell user it's the wrong number
            setMessage(`${guess} is not correct! ${guessesLeft} guesses left`, 'red')
        }
    }
});

// Game over
function gameOver(won, msg){
    let color = won===true? 'green':'red';

    // Disable input
    guessInput.disabled = true;
    // Set border color
    guessInput.style.borderColor = color;
    // Set message
    setMessage(msg, color);

    // Play again?
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

// Get winning num
function getRandomNum(min, max){
    return Math.floor(Math.random()*(max-min+1));
}

// Set message
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}