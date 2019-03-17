// possible words to choose from
var words = [
    {
        song: 'Sucker',
        artist: 'Jonas Brothers'
    },
    {
        song: 'Happier',
        artist: 'Marshmello & Bastille'
    },
    {
        song: 'Eastside',
        artist: 'benny blanco, Halsey & Khalid'
    },
    {
        song: 'Youngblood',
        artist: '5 Seconds Of Summer'
    },
    {
        song: 'Sunflower',
        artist: 'Post Malone & Swae Lee'
    }
];

// only acceptable guesses
var validGuesses = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

// array to push in letters that have been guessed
var lettersGuessed = [];
var wins = 0;
var remainingGuesses = 12;

// DOM variables
var chosenWordText = document.getElementById('chosen-word');
var lettersGuessedText = document.getElementById('letters-guessed');
var remainingGuessesText = document.getElementById('remaining-guesses');
var winsText = document.getElementById('wins');
var playAgainButton = document.getElementById('play-again');

// start game - choose random word, don't show letters
function startGame() {
    chosenWord = words[Math.floor(Math.random() * words.length)].song.toLowerCase();
    playAgainButton.classList.remove('show');
    console.log('game started');

    // reset guesses
    remainingGuesses = 12;
    // show new guesses left on page
    remainingGuessesText.textContent = remainingGuesses;
    // reset letters guessed
    lettersGuessed = [];
    lettersGuessedText.innerHTML = '';

    // make text black again
    chosenWordText.style.color = 'black';

    //clear out current letters
    chosenWordText.innerHTML = '';

    // start with blank <li>s
    for (var i = 0; i < chosenWord.length; i++) {
        chosenWordText.innerHTML = chosenWordText.innerHTML + '<li id="' + i + '"></li>'
    }   
}

// get random song name from words array
var chosenWord = words[Math.floor(Math.random()*words.length)].song.toLowerCase();

// reset remainingGuesses and  lettersGuessed
function reset() {
    // reset guesses
    remainingGuesses = 12;
    // show new guesses left on page
    remainingGuessesText.textContent = remainingGuesses;
    // reset letters guessed
    lettersGuessed = [];
    lettersGuessedText.innerHTML = '';
}

// show letter if it's in the word
function revealLetter() {
    // when a correct letter is guessed, returns true
    if (chosenWord.includes(letter)) {
        // find index of ALL OCCURRENCES of the letter in the word
        for (var i = 0; i < chosenWord.length; i++) {
            if (chosenWord[i] === letter)
                // reveal letter in word on page
                document.getElementById(i.toString()).textContent = chosenWord[i];
        }
    }
}

// subtract 1 from guesses and update page
function updateGuesses() {
    // subtract one guess
    remainingGuesses = remainingGuesses - 1;
    // show new guesses left on page
    remainingGuessesText.textContent = remainingGuesses;

}

// if fail - reveal all letters
function endGame() {
    console.log('end game you lost');
    for (i = 0; i < chosenWord.length; i++) {
        // reveal all letters
        document.getElementById(i.toString()).textContent = chosenWord[i];
        chosenWordText.style.color = 'red';
    }
    playAgainButton.classList.add('show');
    // playAgainButton.addEventListener('click', startGame());
}

// if win
function youWin() {
    console.log('you win');
    wins = wins + 1;
    winsText.textContent = wins;
    chosenWordText.style.color = 'green';
    playAgainButton.classList.add('show');
    // playAgainButton.addEventListener('click', startGame);
}


startGame();

// for (var i = 0; i < chosenWord.length; i++) {
//     chosenWordText.innerHTML = chosenWordText.innerHTML + '<li id="' + i + '"></li>'
// }



// listen for keyup
if (remainingGuesses > -1) {
    document.onkeyup = function (event) {
        var letter = event.key.toLowerCase();
        console.log(letter);

        // if it's a letter
        if (validGuesses.indexOf(letter) > -1) {
            // if letter hasn't been guessed already
            if (lettersGuessed.indexOf(letter) === -1) {
                // don't let user keep guessing when remainingGuesses = 0
                if (remainingGuesses > 0) {
                    // add letter to array of guessed letters
                    lettersGuessed.push(letter);
                    // show new guessed letter on page
                    lettersGuessedText.innerHTML = lettersGuessedText.innerHTML + '<span>' + lettersGuessed[lettersGuessed.length - 1] + '</span>'; // add guessed letter to page
                }


                // when a correct letter is guessed, returns true
                if (chosenWord.includes(letter)) {
                    // find index of ALL OCCURRENCES of the letter in the word
                    for (i = 0; i < chosenWord.length; i++) {
                        if (chosenWord[i] === letter)
                            // reveal letter in word on page
                            document.getElementById(i.toString()).textContent = chosenWord[i]; // reveal letter in word
                    }


                }


                // check if all letters have been shown/guessed
                var emptyLis = 0;
                for (var i = 0; i < chosenWord.length; i++) {
                    // get length of strings in each <li>
                    var length = document.getElementById(i.toString()).textContent.length;
                    //if empty, 
                    if (length === 0) {
                        emptyLis = emptyLis + 1;
                    }
                }

                if (emptyLis === 0 && remainingGuesses > 0) {
                    youWin();
                }

                // playAgainButton.addEventListener('click', startGame());

                // don't let user keep guessing when remainingGuesses = 0
                if (remainingGuesses > 0) {
                    updateGuesses();
                }

                if (remainingGuesses === 0) {
                    endGame();
                }

            }

        }


        // // subtract one guess
        // remainingGuesses = remainingGuesses - 1;
        // // show new guesses left on page
        // remainingGuessesText.textContent = remainingGuesses;

        // if (remainingGuesses === 0) {
        //     for (i = 0; i < chosenWord.length; i++) {
        //         // reveal all letters
        //         document.getElementById(i.toString()).textContent = chosenWord[i];
        //         chosenWordText.style.color = 'red';
        //     }
        // }

        // if (remainingGuesses === 0) {
        //     for (i = 0; i < chosenWord.length; i++) {
        //         // reveal all letters
        //         document.getElementById(i.toString()).textContent = chosenWord[i];
        //         chosenWordText.style.color = 'red';
        //     }
        // }



    }
}




    // choose another word, reset game




// runs out of guesses - show all, make them red

// play again button
    // pick new word, clear content for each li




