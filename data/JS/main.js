var time = 10;


class Game {
    // Constructor:
    constructor() {
        console.log("Starting game");
        document.getElementById("inputButton").removeAttribute("onclick");
        document.getElementById("inputButton").addEventListener("click", function(event) {
            event.preventDefault();
            game.update(document.getElementById('inputText').value);
        })
        // Generate html objects
        // All guesses object are generated here
        this._usedHTMLObjects.guesses = document.getElementById("guesses");
        for(var wordNumber = 0; wordNumber < 5; wordNumber++) {
            this._usedHTMLObjects.individualGuessedLetterObjects.push([]);
            var lineDiv = document.createElement("div");
            lineDiv.className = "blockLine";

            for(var letterNumber = 0; letterNumber < 5; letterNumber++) {
                var obj = document.createElement("p");
                obj.className = "block";
                obj.innerHTML = "_";
                this._usedHTMLObjects.individualGuessedLetterObjects[wordNumber].push(obj);
                lineDiv.appendChild(obj);
            }
            this._usedHTMLObjects.guesses.appendChild(lineDiv);
        }

        // The correctly guessed letters are generated below
        // this._usedHTMLObjects.correctLetterWord = document.getElementById("correctLetters");
        // for(var letterNumber = 0; letterNumber < 5; letterNumber++) {
        //     var obj = document.createElement("p");
        //     obj.innerHTML = " ";
        //     obj.className = "block";
        //     this._usedHTMLObjects.individualCorrectLetterObjects.push(obj);
        //     this._usedHTMLObjects.correctLetterWord.appendChild(obj);
        // }

        this._usedHTMLObjects.input = document.getElementById("inputText");
        this._usedHTMLObjects.inputButton = document.getElementById("inputButton");
        this._usedHTMLObjects.timer = document.getElementById("timer");

        // Clear invisible info
        this.start();
        this._startTimer();
    }

    // Public:
    // Start new game (Reset info, counter, etc)
    start() {
        this._word = words[Math.floor(Math.random() * words.length)];
        this._wordContainsIJ = false;

        for(var i = 0; i < 5; i++) {
            for(var j = 0; j < 5; j++) {
                this._usedHTMLObjects.individualGuessedLetterObjects[i][j].innerHTML = "_";
                this._usedHTMLObjects.individualGuessedLetterObjects[i][j].className = "block"
            }
        }

        for(var letterCounter = 0; letterCounter < this._word.length; letterCounter++) {
            if(this._word.charAt(letterCounter) == "i" && this._word.charAt(letterCounter + 1) == "j") {
                this._wordContainsIJ = true;
            }
        }
        
        this._usedHTMLObjects.individualGuessedLetterObjects[0][0].innerHTML = this._word.charAt(0);
        if(this._word.charAt(0) == "i" && this._word.charAt(1) == j) {
            this._usedHTMLObjects.individualGuessedLetterObjects[0][0].innerHTML = "ij";
        }
        this._usedHTMLObjects.individualGuessedLetterObjects[0][0].classList.add("correct");
        this._usedHTMLObjects.individualGuessedLetterObjects[0][0].classList.add("locationCorrect");

        this._guessCounter = 0;
        this._guessedLetters = [];
        this._hasStarted = true;
    }

    // Update visible game data, the logic behind the game
    update(guessedWord) {
        var guessedWordContainsIJ = false;
        var guessedWordArray = [];

        if(guessedWord.length > 6) return; // IJ infinite word length exploit removal

        for(var letterCounter = 0; letterCounter < guessedWord.length; letterCounter++) {
            if(guessedWord.charAt(letterCounter) == "i" && guessedWord.charAt(letterCounter + 1) == "j") {
                letterCounter++;
                guessedWordContainsIJ = true;
                guessedWordArray.push("ij");
                console.log("Guessed word contains ij");
            } else {
                guessedWordArray.push(guessedWord.charAt(letterCounter));
            }
        }

        var correct = 0;
        if(guessedWord.length != 5 && !guessedWordContainsIJ) {
            console.log("Word error1")
            this._usedHTMLObjects.input.value = "";
            this._usedHTMLObjects.inputButton.value = "Word too short/long";

            function localCallBack(gameObj) {
                gameObj._usedHTMLObjects.inputButton.value = "Submit";
            }
            setTimeout(localCallBack, 1000, this);
        } else if(guessedWord.length == 5 && !guessedWordContainsIJ || guessedWord.length == 6 && guessedWordContainsIJ || guessedWord.length == 5 && guessedWordContainsIJ) {
            console.log(guessedWord);
            var placeCounter = 0;
            for(var letterCounter = 0; letterCounter < guessedWord.length; letterCounter++) {
                var cont = true;
                if(this._word.charAt(letterCounter) == "i" && this._word.charAt(letterCounter + 1) == "j" && guessedWord.charAt(letterCounter) == "i" && guessedWord.charAt(letterCounter + 1) == "j") {
                    this._usedHTMLObjects.individualGuessedLetterObjects[this._guessCounter][placeCounter].classList.add("locationCorrect");
                    this._usedHTMLObjects.individualGuessedLetterObjects[this._guessCounter][placeCounter].innerHTML = "ij";
                    letterCounter++;
                    cont = false;
                    console.log("New line");
                    correct += 2;
                } else if(guessedWord.charAt(letterCounter) == this._word.charAt(letterCounter) && cont) {
                    this._usedHTMLObjects.individualGuessedLetterObjects[this._guessCounter][placeCounter].classList.add("locationCorrect");
                    this._usedHTMLObjects.individualGuessedLetterObjects[this._guessCounter][placeCounter].innerHTML = guessedWord.charAt(letterCounter);
                    correct++;
                }
                placeCounter++;
            }
            for(var letterCounter = 0; letterCounter < guessedWord.length; letterCounter++) {
                for(var checkedLetterCounter = 0; checkedLetterCounter < this._word.length; checkedLetterCounter++) {
                    var doContinue = true;
                    for(var i = 0; i < this._usedHTMLObjects.individualGuessedLetterObjects[this._guessCounter][checkedLetterCounter].classList.length; i++) {
                        // console.log(this._usedHTMLObjects.individualGuessedLetterObjects[this._guessCounter][checkedLetterCounter].classList[i]);
                        if(this._usedHTMLObjects.individualGuessedLetterObjects[this._guessCounter][checkedLetterCounter].classList[i] == "locationCorrect") {
                            doContinue = false;
                        }
                    }
                    if(doContinue) {
                        if(guessedWord.charAt(letterCounter) == this._word.charAt(checkedLetterCounter)) {
                            this._usedHTMLObjects.individualGuessedLetterObjects[this._guessCounter][letterCounter].classList.add("correct");
                        }
                        this._usedHTMLObjects.individualGuessedLetterObjects[this._guessCounter][letterCounter].innerHTML = guessedWord.charAt(letterCounter);
                    }
                }
            }

            this._guessCounter++;
            time = this._timerTime;
        }
        this._usedHTMLObjects.input.value = "";

        if(correct == this._word.length) {
            alert("WIN");
            this._win();
        }
    }
    
    // private:
    _word = [];
    _wordContainsIJ = false;
    _guessCounter = 0;
    _guessedLetters = [];
    _hasStarted = false;
    _timerTime = 100;
    _timerInterval = null;

    _usedHTMLObjects = {
        input: null,
        inputButton: null,
        individualGuessedWordObjects: [],
        individualGuessedLetterObjects: [],
        correctLetterWord: null,
        timer: null,
        // individualCorrectLetterObjects: [],
    }

    _win() {
        this.start();
    }
    _lose() {
        alert("LOSE");
        this.start();
    }
    _startTimer() {
        time = this._timerTime;
        this._usedHTMLObjects.timer.innerHTML = time;
        this._timerInterval = setInterval(function() {
            game._usedHTMLObjects.timer.innerHTML = `${time / 10}`;
            game.check();
            time--;
        }, 100);
    }
    check() {
        if(time <= 0) {
            time = this._timerTime;
            this._guessCounter++;
        }
        
        if(this._guessCounter == 5) {
            this._lose();
        }
    }


    _checkLetterWithWord(letter, iteration) {
        var correct = 0;
        for(var checkedLetterCount = 0; checkedLetterCount < this._word.length; checkedLetterCount++) {
            if(this._word.charAt(checkedLetterCount) == "i" && this._word.charAt(checkedLetterCount + 1) == "j") {
                if(letter == "ij") {
                    this._usedHTMLObjects.individualGuessedLetterObjects[this._guessCounter][iteration].classList.add("correct");
                    if(checkedLetterCount == iteration) {
                        this._usedHTMLObjects.individualGuessedLetterObjects[this._guessCounter][iteration].classList.add("locationCorrect");
                        correct++;
                    }
                }
            } else if(letter == this._word.charAt(checkedLetterCount)) {
                this._usedHTMLObjects.individualGuessedLetterObjects[this._guessCounter][iteration].classList.add("correct");
                if(checkedLetterCount == iteration) {
                    this._usedHTMLObjects.individualGuessedLetterObjects[this._guessCounter][iteration].classList.add("locationCorrect");
                    correct++;
                }
            }
        }
        if(correct == 1) return true;
        return false;
    }
}