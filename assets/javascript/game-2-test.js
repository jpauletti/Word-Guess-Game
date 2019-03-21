var chosenSong;
var chosenArtist;
var chosenSongAudio;







// var body = document.querySelector('body');
// var audio = document.createElement('audio');
// body.appendChild(audio);


// var audioParent = document.querySelector('audio');
// audioParent.setAttribute('src', 'assets/audio/bloodline.mp3');
// // audioParent.play();








var game = {
    validGuesses: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],

    // possible songs to choose from
    songs: [
        {
            song: 'Sucker',
            artist: 'Jonas Brothers',
            audio: new Audio('assets/audio/Sucker.mp3')
        },
        {
            song: 'Happier',
            artist: 'Marshmello & Bastille',
            audio: new Audio('assets/audio/Happier.mp3')
        },
        {
            song: 'Eastside',
            artist: 'benny blanco, Halsey & Khalid',
            audio: new Audio('assets/audio/Eastside.mp3')
        },
        {
            song: 'Youngblood',
            artist: '5 Seconds Of Summer',
            audio: new Audio('assets/audio/Youngblood.mp3')
        },
        {
            song: 'Sunflower',
            artist: 'Post Malone & Swae Lee',
            audio: new Audio('assets/audio/Sunflower.mp3')
        },
        {
            song: 'Shallow',
            artist: 'Lady Gaga & Bradley Cooper',
            audio: new Audio('assets/audio/Shallow.mp3')
        },
        {
            song: 'Tequila',
            artist: 'Dan + Shay',
            audio: new Audio('assets/audio/Tequila.mp3')
        },
        {
            song: 'Imagine',
            artist: 'Ariana Grande',
            audio: new Audio('assets/audio/Imagine.mp3')
        },
        {
            song: 'Bloodline',
            artist: 'Ariana Grande',
            audio: new Audio('assets/audio/Bloodline.mp3')
        },
        {
            song: 'Without Me',
            artist: 'Halsey',
            audio: new Audio('assets/audio/Without Me.mp3')
        },
        {
            song: 'High Hopes',
            artist: 'Panic! At The Disco',
            audio: new Audio('assets/audio/High Hopes.mp3')
        },
        {
            song: 'Close To Me',
            artist: 'Ellie Goulding X Diplo Featuring Swae Lee',
            audio: new Audio('assets/audio/Close To Me.mp3')
        }
    ],

    // var chosenSong: ,
    // var chosenArtist: ,
    lettersGuessed: [],
    wins: 0,
    remainingGuesses: 12,

    // DOM variables
    chosenSongText: document.getElementById('chosen-word'),
    chosenArtistText: document.getElementById('artist'),
    leftImage: document.getElementById('left-image'),
    lettersGuessedText: document.getElementById('letters-guessed'),
    remainingGuessesText: document.getElementById('remaining-guesses'),
    winsText: document.getElementById('wins'),
    playAgainButton: document.getElementById('play-again'),

    // start game 
    startGame: function () {
        game.playSong();
        // find chosenSong, and play its audio
        // for (var i = 0; i < game.songs.length; i++) {
        //     if (game.songs[i].song.toLowerCase() === chosenSong) {
        //         chosenSongAudio = game.songs[i].audio;
        //         console.log(chosenSongAudio);
        //         chosenSongAudio.play();
        //     }
        // }



            // pause song if playing
            if (chosenSongAudio != undefined) {
                chosenSongAudio.pause();
                // reset to beggining of song if it's been played before
                chosenSongAudio.currentTime = 0;
            }

            // get random song name from songs array
            chosenSong = game.songs[Math.floor(Math.random() * game.songs.length)].song.toLowerCase();
            game.playAgainButton.classList.remove('show');
            console.log('game started');

            // reset guesses
            game.remainingGuesses = 12;
            // show new guesses left on page
            game.remainingGuessesText.textContent = game.remainingGuesses;
            // reset letters guessed
            game.lettersGuessed = [];
            game.lettersGuessedText.innerHTML = '';

            // make text black again
            game.chosenSongText.style.color = 'black';

            //clear out current letters
            game.chosenSongText.innerHTML = '';

            // clear out artists
            game.chosenArtistText.textContent = '';

            // reset image
            game.leftImage.src = 'assets/images/billboard-hot-100.jpg';
            // reset image width
            game.leftImage.style.width = '500px';

            // start with blank <li>s for each letter in the song name
            for (var i = 0; i < chosenSong.length; i++) {
                // chosenSongText.innerHTML = chosenSongText.innerHTML + '<li id="' + i + '"></li>'
                // if chosenSong[i]=== ' '
                if (chosenSong[i] === ' ') {
                    // var originalUl = game.chosenSongText;
                    // game.chosenSongText = document.createElement('ul').setAttribute("id", "chosen-word2");
                    // console.log(document.getElementById('chosen-word').parentNode);
                    // originalUl.parentNode.insertBefore(game.chosenSongText, originalUl.nextSibling);


                    // game.chosenSongText.outerHTML = game.chosenSongText.outerHTML + '<ul id="chosen-word' + i + '"></ul>'
                    // game.chosenSongText = document.getElementById('chosen-word' + i);
                    game.chosenSongText.innerHTML = game.chosenSongText.innerHTML + '<li id="' + i + '" style="border:none;"></li>'
                } else {
                    game.chosenSongText.innerHTML = game.chosenSongText.innerHTML + '<li id="' + i + '"></li>'
                }
            }
    },

    // subtract 1 from guesses and update page
    updateGuesses: function () {
        // subtract one guess
        game.remainingGuesses = game.remainingGuesses - 1;
        // show new guesses left on page
        game.remainingGuessesText.textContent = game.remainingGuesses;

    },

    playSong: function() {
        for (var i = 0; i < game.songs.length; i++) {
            if (game.songs[i].song.toLowerCase() === chosenSong) {
                chosenSongAudio = game.songs[i].audio;
                console.log(chosenSongAudio);
                chosenSongAudio.play();
            }
        }
    },

    evaluateEnding: function() {
        // check if all letters have been shown/guessed
        var emptyLis = 0;
        for (var i = 0; i < chosenSong.length; i++) {
            // get length of strings in each <li>
            var content = document.getElementById(i.toString()).textContent;
            var length = document.getElementById(i.toString()).textContent.length;
            //if empty, 
            if (length === 0) {
                emptyLis = emptyLis + 1;
            }
        }

        // find spaces in word & their indexes
        var spaceIndexes = [];
        for (var i = 0; i < chosenSong.length; i++) {
            if (chosenSong[i] === ' ') {
                spaceIndexes.push(i);
            }
        }

        // if # of empty <li>s = number of spaces in word, you win
        if (emptyLis === spaceIndexes.length && game.remainingGuesses > 0) {
            console.log(emptyLis + ' ' + spaceIndexes.length);
            game.youWin();
        }

        // don't let user keep guessing when remainingGuesses = 0
        if (game.remainingGuesses > 0) {
            game.updateGuesses();
        } else {
            game.youLose();
        }

    },

    // if fail - reveal all letters
    youLose: function () {
        console.log('end game you lost');
        for (var i = 0; i < chosenSong.length; i++) {
            // reveal all letters
            document.getElementById(i.toString()).textContent = chosenSong[i];
        }
        // make text red
        game.chosenSongText.style.color = 'red';

        game.endGame();
    },

    // if win
    youWin: function () {
        console.log('you win');
        // add 1 to wins
        game.wins = game.wins + 1;
        // update wins on page
        game.winsText.textContent = game.wins;
        //make text green
        game.chosenSongText.style.color = 'green';

        game.endGame();
    },

    // universal end game functions
    endGame: function () {
        // find chosenSong, and play its audio
        for (var i = 0; i < game.songs.length; i++) {
            if (game.songs[i].song.toLowerCase() === chosenSong) {
                chosenSongAudio = game.songs[i].audio;
                console.log(chosenSongAudio);
                chosenSongAudio.play();
            }
        }
        // var audio = {
        //     happier: new Audio('assets/audio/happier.mp3'),
        //     bloodline: new Audio('assets/audio/bloodline.mp3'),
        //     closeToMe: new Audio('assets/audio/closeToMe.mp3')

        // };
        // audio[chosenSongAudio].play();

        // find artist that matches the chosenSong
        for (var i = 0; i < game.songs.length; i++) {
            if (game.songs[i].song.toLowerCase() === chosenSong) {
                chosenArtist = game.songs[i].artist;
            }
        }
        // show artist text
        game.chosenArtistText.textContent = 'by ' + chosenArtist;

        // change to artist image
        game.leftImage.src = 'assets/images/' + chosenSong + '.jpg';
        // shrink image width to fit square image
        game.leftImage.style.width = '350px';

        // show button, restart game when clicked
        game.playAgainButton.classList.add('show');
        game.playAgainButton.addEventListener('click', game.startGame);
    }
    

} // end of game variable



// page loaded
document.addEventListener("DOMContentLoaded", function () {
    game.startGame();


    // listen for keyup
    if (game.remainingGuesses > -1) {
        document.onkeyup = function (event) {
            // keyData.audio.sound.play();

            var letter = event.key.toLowerCase();
            console.log(letter);

            // if it's a valid letter, that hasn't already been guessed
            if (game.validGuesses.indexOf(letter) > -1 && game.lettersGuessed.indexOf(letter) === -1) {
                // if user still has guesses remaining
                if (game.remainingGuesses > 0) {
                    // add letter to array of guessed letters
                    game.lettersGuessed.push(letter);
                    // show new guessed letter on page
                    game.lettersGuessedText.innerHTML = game.lettersGuessedText.innerHTML + '<span>' + game.lettersGuessed[game.lettersGuessed.length - 1] + '</span>';
                }


                // when a correct letter is guessed, reveal it
                if (chosenSong.includes(letter)) {
                    // find index of ALL OCCURRENCES of the letter in the word
                    for (i = 0; i < chosenSong.length; i++) {
                        if (chosenSong[i] === letter)
                            // reveal letter on page
                            document.getElementById(i.toString()).textContent = chosenSong[i]; // reveal letter in word
                    }
                }

                game.evaluateEnding();
            }
        }
    }
});

