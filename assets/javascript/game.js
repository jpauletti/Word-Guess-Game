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
    },
    {
        song: 'Shallow',
        artist: 'Lady Gaga & Bradley Cooper'
    },
    {
        song: 'Wow',
        artist: 'Post Malone'
    },
    {
        song: 'Tequila',
        artist: 'Dan + Shay'
    },
    {
        song: 'Imagine',
        artist: 'Ariana Grande'
    },
    {
        song: 'Bloodline',
        artist: 'Ariana Grande'
    },
    {
        song: 'Without Me',
        artist: 'Halsey'
    },
    {
        song: 'High Hopes',
        artist: 'Panic! At The Disco'
    },
    {
        song: 'Bury A Friend',
        artist: 'Billie Eilish'
    }
];

// only acceptable guesses
var validGuesses = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

// array to push in letters that have been guessed
var chosenWord;
var chosenArtist;
var lettersGuessed = [];
var wins = 0;
var remainingGuesses = 12;

// DOM variables
var chosenWordText = document.getElementById('chosen-word');
var chosenArtistText = document.getElementById('artist');
var leftImage = document.getElementById('left-image');
var lettersGuessedText = document.getElementById('letters-guessed');
var remainingGuessesText = document.getElementById('remaining-guesses');
var winsText = document.getElementById('wins');
var playAgainButton = document.getElementById('play-again');

// start game 
function startGame() {
    // get random song name from words array
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

    // clear out artists
    chosenArtistText.textContent = '';

    // reset image
    leftImage.src = 'assets/images/billboard-hot-100.jpg';
    // reset image width
    leftImage.style.width = '500px';

    // start with blank <li>s
    for (var i = 0; i < chosenWord.length; i++) {
        // chosenWordText.innerHTML = chosenWordText.innerHTML + '<li id="' + i + '"></li>'
        // if chosenWord[i]=== ' '
        if (chosenWord[i] === ' ') {
            chosenWordText.innerHTML = chosenWordText.innerHTML + '<li id="' + i + '" style="border:none;"></li>'
        } else {
            chosenWordText.innerHTML = chosenWordText.innerHTML + '<li id="' + i + '"></li>'
        }
    }   
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
function youLose() {
    console.log('end game you lost');
    for (var i = 0; i < chosenWord.length; i++) {
        // reveal all letters
        document.getElementById(i.toString()).textContent = chosenWord[i];   
    }
    // make text red
    chosenWordText.style.color = 'red';

    endGame();
}

// if win
function youWin() {
    console.log('you win');
    // add 1 to wins
    wins = wins + 1;
    // update wins on page
    winsText.textContent = wins;
    //make text green
    chosenWordText.style.color = 'green';

    endGame();
}


// universal end game functions
function endGame() {
    // find artist that matches the chosenWord
    for (var i = 0; i < words.length; i++) {
        if (words[i].song.toLowerCase() === chosenWord) {
            chosenArtist = words[i].artist;
            console.log(chosenArtist);
        }
    }
    // show artist text
    chosenArtistText.textContent = 'by ' + chosenArtist;

    // change to artist image
    leftImage.src = 'assets/images/' + chosenWord + '.jpg';
    // shrink image width to fit square image
    leftImage.style.width = '350px';

    // show button, restart game when clicked
    playAgainButton.classList.add('show');
    playAgainButton.addEventListener('click', startGame);
}






startGame();


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
                    var content = document.getElementById(i.toString()).textContent;
                    var length = document.getElementById(i.toString()).textContent.length;
                    //if empty, 
                    if (length === 0) {
                        emptyLis = emptyLis + 1;
                    }
                }

                // find spaces in word & their indexes
                var indexes = [];
                for (var i = 0; i < chosenWord.length; i++) {
                    if (chosenWord[i] === ' ') {
                        indexes.push(i);
                    }
                }
                
                // if no empty <li>s OR if 1 empty <li> but word has a space in it, or 2 empty <li>s but word has a space in it
                if ((emptyLis === 0 && remainingGuesses > 0) || (emptyLis === 1 && chosenWord.indexOf(' ') > -1 && remainingGuesses > 0) || (emptyLis === 2 && indexes.length === 2 && remainingGuesses > 0)) {
                    console.log(chosenWord.indexOf(' '));
                    youWin();
                }

                // playAgainButton.addEventListener('click', startGame());

                // don't let user keep guessing when remainingGuesses = 0
                if (remainingGuesses > 0) {
                    updateGuesses();
                }

                if (remainingGuesses === 0) {
                    youLose();
                }

            }

        }

    }
}

