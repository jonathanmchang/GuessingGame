function generateWinningNumber() {
    return Math.floor((Math.random() *100) + 1)
}

function shuffle(arr) {
    for (let i = 0; i < arr.length; i++) {
        let randomIndex = Math.floor(Math.random() * (i+1))
        let temp = arr[i]
        arr[i] = arr[randomIndex]
        arr[randomIndex] = temp
    }
    return arr
}

function Game() {
    this.playersGuess = null
    this.pastGuesses = []
    this.winningNumber = generateWinningNumber()
}

Game.prototype.difference = function() {
    this.diff = this.playersGuess - this.winningNumber
    if (this.diff >= 0) {
        return this.diff 
    } else {
        return this.diff * -1
    }
}

Game.prototype.isLower = function() {
    return this.playersGuess < this.winningNumber
}

Game.prototype.playersGuessSubmission = function(num) {
    if (typeof num !== 'number' || num < 1 || num > 100 || !num) {
        $('h1').text('This is an invalid guess.')
        $('h3').text('Try again!')
        throw('That is an invalid guess.')
    }
    this.playersGuess = num
    return this.checkGuess()
}

Game.prototype.checkGuess = function() {
    if (this.playersGuess === this.winningNumber) {
        if (this.playersGuess < 10) {
            this.pastGuesses.push('0' + this.playersGuess)
        } else {
            this.pastGuesses.push(this.playersGuess)
        }
        $('#guess1').text(this.pastGuesses[0])
        $('#guess2').text(this.pastGuesses[1])
        $('#guess3').text(this.pastGuesses[2])
        $('#guess4').text(this.pastGuesses[3])
        $('#guess5').text(this.pastGuesses[4])
        $('h1').text('YOU WIN!')
        $('h3').text('Press the Reset Button to play again!')
        $('player-input').text(this.winningNumber)
        $('#hint, #submit, #player-input').prop("disabled", true)
        return 'You Win!'
    } else if (this.pastGuesses.indexOf(this.playersGuess) > -1) {
        $('h1').text('Already tried that one.')
        $('h3').text('Try another number!')
        return 'You have already guessed that number.'
    } else {
        if (this.playersGuess < 10) {
            this.pastGuesses.push('0' + this.playersGuess)
        } else {
            this.pastGuesses.push(this.playersGuess)
        }
        $('#guess1').text(this.pastGuesses[0])
        $('#guess2').text(this.pastGuesses[1])
        $('#guess3').text(this.pastGuesses[2])
        $('#guess4').text(this.pastGuesses[3])
        $('#guess5').text(this.pastGuesses[4])
    }
    if (this.pastGuesses.length === 5) {
        $('h1').text('You Lose! The Number was ' + this.winningNumber + ".")
        $('h3').text('Better Luck Next Time!')
        $('#hint, #submit, #player-input').prop("disabled", true)
        return 'You Lose.'
    } else {
        if (this.difference() < 10) {
            $('h1').text('You\'re burning up!')
            $('h3').text('Guess Again!')
            return "You\'re burning up!"
        } else if (this.difference() < 25) {
            $('h1').text('You\'re lukewarm.')
            $('h3').text('Guess Again!')
            return "You\'re lukewarm."
        } else if (this.difference() < 50) {
            $('h1').text('You\'re a bit chilly.')
            $('h3').text('Guess Again!')
            return "You\'re a bit chilly."
        } else {
            $('h1').text('You\'re ice cold!')
            $('h3').text('Guess Again!')
            return "You\'re ice cold!"
        }
    }
}

function newGame() {
    return new Game
}

Game.prototype.provideHint = function() {
    let hintArr = []
    hintArr.push(this.winningNumber)
    while (hintArr.length < 3) {
        let temp = generateWinningNumber()
        if (this.winningNumber !== temp) {
            hintArr.push(temp)
        }
    }
    
    return shuffle(hintArr)
}

function guessInput(game) {
    let guess = $('#player-input').val()
    // resets player-input 
    $('#player-input').val('')
    let output = game.playersGuessSubmission(parseInt(guess,10))
    console.log(output)
}

$(document).ready(function() {
    var game = newGame()
    $('#submit').click(function() {
        guessInput(game)
    })
    $('#player-input').keypress(function(event) {
        if (event.which === 13) {
            guessInput(game)
        }
    })
    $('#hint').click(function() {
        let hint = game.provideHint()
        $('h1').text("Here's a Hint!")
        $('h3').text("The winning number is " + hint[0] + ', ' + hint[1] + ', or ' + hint[2] + '.')
        // $('h3').text('Stop Cheating, Rachel!!!!')
        $('#hint').prop('disabled', true)
    })
    $('#reset').click(function() {
        game = newGame()
        $('h1').text('Play the Guessing Game!')
        $('h3').text('Pick a number between 1 - 100')
        $('.guess').text('--')
        $('#hint, #submit, #player-input').prop("disabled", false)

    })
})