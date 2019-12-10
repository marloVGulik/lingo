/*

foundLetters: {isInPosition: (true/false), position: (index position), letter: (Letter)};

*/

var inputBox;
var inputButton;
var outputBox;

var game = {
    chosenWordIndex: 0,
    foundLetters: [],
    update: function(input) {
        for(var inputCharNumber = 0; inputCharNumber < input.length; inputCharNumber++) {
            for(var chosenWordCharNumber = 0; chosenWordCharNumber < words[this.chosenWordIndex].length; chosenWordCharNumber++) {
                if(input.charAt(inputCharNumber) == words[this.chosenWordIndex].charAt(chosenWordCharNumber)) {
                    this.foundLetters.push({isInPostion: false, position: inputCharNumber, letter: words[this.chosenWordIndex].charAt(chosenWordCharNumber)});
                }
            }
        }
        for(var i = 0; i < this.foundLetters.length; i++) {
            if(this.foundLetters[i].letter == words[this.chosenWordIndex].charAt(this.foundLetters[i].position)) {
                this.foundLetters[i].isInPostion = true;
            }
            for(var j = 0; j < this.foundLetters.length; j++) {
                if(this.foundLetters[i].position == this.foundLetters[j].position && this.foundLetters[i].letter == this.foundLetters[j].letter && i != j) {
                    this.foundLetters.splice(j, 1);
                }
            }
        }
    },
    init: function() {
        this.chosenWordIndex = Math.floor(Math.random() * words.length);
        this.foundLetters = new Array;
        console.log(words[this.chosenWordIndex]);
    },
}

function init() {
    console.log("Initiating game");
    inputBox = document.getElementById("inputText");
    inputBox
    inputButton = document.getElementById("inputButton");
    inputButton.onclick = function() {
        update();
        return false;
    }
    outputBox = document.getElementById("words");
    game.init();
}
function update() {
    if(inputBox.value.length != 5) {
        inputBox.value = "STRING NOT CORRECT!";
        console.error("String is not correct!");
        return false;
    }
    game.update(inputBox.value);
    inputBox.value = "";
}