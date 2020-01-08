class Game {
    // Constructor:
    constructor() {
        console.log("Starting game");

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
        

        // Clear invisible info
        this.start();
    }

    // Public:
    // Start new game (Reset info, counter, etc)
    start() {
        this._word = words[Math.floor(Math.random() * words.length)];
        // this._word = "lijst";
        this._wordContainsIJ = false;

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
                if(guessedWord.charAt(letterCounter) == "i" && guessedWord.charAt(letterCounter + 1) == "j") {
                    this._usedHTMLObjects.individualGuessedLetterObjects[this._guessCounter][placeCounter].innerHTML = "ij";
                    letterCounter++;
                    if(this._checkLetterWithWord("ij", placeCounter)) correct += 2;
                } else {
                    this._usedHTMLObjects.individualGuessedLetterObjects[this._guessCounter][placeCounter].innerHTML = guessedWord.charAt(letterCounter);
                    if(this._checkLetterWithWord(guessedWord.charAt(placeCounter), placeCounter)) correct++;
                }
                placeCounter++;
            }

            this._guessCounter++;
        }
        this._usedHTMLObjects.input.value = "";

        if(correct == this._word.length) {
            alert("WIN")
        }
        if(this._guessCounter == 5) {
            console.log("END");
        }
    }
    
    // private:
    _word = [];
    _wordContainsIJ = false;
    _guessCounter = 0;
    _guessedLetters = [];
    _hasStarted = false;

    _usedHTMLObjects = {
        input: null,
        inputButton: null,
        individualGuessedWordObjects: [],
        individualGuessedLetterObjects: [],
        correctLetterWord: null,
        // individualCorrectLetterObjects: [],
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