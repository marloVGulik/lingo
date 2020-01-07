class Game {
    // Constructor:
    constructor() {
        console.log("Starting game");
        // Generate html objects
        this._usedHTMLObjects.guesses = document.getElementById("guesses");
        for(var wordNumber = 0; wordNumber < 5; wordNumber++) {
            this._usedHTMLObjects.individualGuessedLetterObjects.push([]);
            var lineDiv = document.createElement("div");
            lineDiv.className = "blockLine";

            for(var letterNumber = 0; letterNumber < 5; letterNumber++) {
                var obj = document.createElement("p");
                obj.className = "block";
                obj.innerHTML = " ";
                
                this._usedHTMLObjects.individualGuessedLetterObjects[wordNumber].push(obj);
                lineDiv.appendChild(obj);
            }
            this._usedHTMLObjects.guesses.appendChild(lineDiv);
        }

        this._usedHTMLObjects.input = document.getElementById("inputText");
        

        // Clear invisible info
        
    }

    // Start new game (Reset info, counter, etc)
    start() {
        this._word = words[Math.floor(Math.random() * words.length)];
        this._guessCounter = 0;
        this._guessedLetters = [];
        this._hasStarted = true;
    }

    // Update visible game data, the logic behind the game
    update() {

    }
    
    // private
    _word = [];
    _guessCounter = 0;
    _guessedLetters = [];
    _hasStarted = false;

    _usedHTMLObjects = {
        input: "",
        individualGuessedWordObjects: [],
        individualGuessedLetterObjects: [],
        individualCorrectLetterObjects: [],
    }
}