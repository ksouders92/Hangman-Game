// Variable first
// Define words that computer will select from
var wordsList = ["Joey", "Monica", "Chandler", "Rachel", "Ross", "Phoebe", "Central Perk", "smelly cat", "New York City", "friends"];

// Define alphabet letters that user can pick from
var alphabetLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// Set the initial global variables
var wins = 0;
var losses = 0;

// guessesLeft is how many attempts user has remaining in the round
var guessesLeft = 10;
// guessesSoFar is an array that will hold all the user's guesses in each round
var guessesSoFar = [];
// userGuess is what the user picks by pressing a key
var userGuess = null;
// Have computer pick a word and store it in wordToBeGuessed
var wordToBeGuessed = wordsList[Math.floor(Math.random() * wordsList.length)];
// arrayFromWord is an array that will hold the letters of the wordToBeGuessed
var arrayFromWord = [];

// html is what will be injected back into the html from the javascript
var html = "<p><h1>";

//Functions second
// rip the wordToBeGuessed apart into an array such that each character is one array element 

function breakWordIntoArray() {
	for (var i = 0, j = 0; i < wordToBeGuessed.length; i++) {
		arrayFromWord[j] = wordToBeGuessed.charAt(i);
		j++
		if (wordToBeGuessed.charAt(i) != " ") {
			arrayFromWord[j] = false;
		} else {
			arrayFromWord[j] = true;
		}
		j++
	}
}

// to help with debugging 
// haven't completely gotten the chrome debugger down yet
function consoleLogs() {
	console.log("wins: " + wins + "\n" + "losses: " + losses + "\n");
	console.log("guessesLeft: " + guessesLeft + "\n");
	console.log("guessesSoFar: " + guessesSoFar + "\n");
	console.log("wordToBeGuessed: " + wordToBeGuessed + "\n");
	console.log("arrayFromWord: " + arrayFromWord + "\n");
	console.log("--------------------------------");
}


// function that will reset the game when the game is won or lost
function resetGame() {
	// lets reset the variables / stats for the game
	guessesLeft = 10;
	guessesSoFar = [];
	wordToBeGuessed = wordsList[Math.floor(Math.random() * wordsList.length)];
	arrayFromWord = [];
	breakWordIntoArray();
	// lets update the document via instructions id
	var htmlInstructions="<p><h3>Press any key to begin guessing</p></h3>";
	document.querySelector("#instructions").innerHTML = htmlInstructions;
    var htmlGameInitial = "<p><h1>";
    
    // Generates the number of underscores 
	for (var i = 0; i < wordToBeGuessed.length; i++) {
		if (wordToBeGuessed.charAt(i) == " ") {
			htmlGameInitial += "&nbsp;&nbsp;";
		} else {
			htmlGameInitial += "_&nbsp;";
		}
	}
	
	htmlGameInitial += "</h1></p>"
	document.querySelector("#game").innerHTML = htmlGameInitial;
	var htmlStats = "<p><h3>" + "Wins: " + wins + " Losses: " + losses + " Guesses Left : " + guessesLeft + "</h3></p>";
	document.querySelector("#stats").innerHTML = htmlStats;
}

// function that displays progress as the game is played
function displayProgress() {
	// Displaying progress to HTML
	for (i = 0, j = 0; i < (arrayFromWord.length / 2); i++) {
			if (arrayFromWord[j+1] == true) {
			html += arrayFromWord[j];
		} else {
			html += "_";
		}
		html += "&nbsp;";
		j=j+2;
	}
	html += "</h1></p>"	
	
	document.querySelector("#game").innerHTML = html;


	htmlStats = "<p><h3>Wins: " + wins + " Losses: " + losses + " Guesses Left : " + guessesLeft + "</h3></p>";
	document.querySelector("#stats").innerHTML = htmlStats;

	htmlGuesses = "<p><h3>"
	for (var i = 0; i < guessesSoFar.length; i++) {
		htmlGuesses += guessesSoFar[i] + "&nbsp;";
	}
	htmlGuesses += "</h3></p>";
	document.querySelector("#guesses").innerHTML = htmlGuesses;
}

// function to check user guess as valid and update arrays
function validateUserGuess() {
	// if user's pick doesn't exist in prior picks and doesn't exist in the word, reduce guesses left by 1 the array of prior picks, and
	//play sound
	if (arrayFromWord.indexOf(userGuess) < 0 && guessesSoFar.indexOf(userGuess) < 0 && alphabetLetters.indexOf(userGuess) >= 0) {
		guessesLeft--;
		var audio = new Audio("Assets/Audio/Ripped.mp3");
		audio.play();
	}
	// add all alphabetic guesses to guessesSoFar if not already in there
	if (guessesSoFar.indexOf(userGuess) < 0 && alphabetLetters.indexOf(userGuess) >= 0) {
		guessesSoFar[guessesSoFar.length]=userGuess;
	}

	// if userGuess exists in the array then switch from false to true
	for (var i = 0; i < arrayFromWord.length; i++) {
		if (arrayFromWord[i] === userGuess) {
			// if the letter wasn't previously guessed then play "how you doing"
			if (arrayFromWord[i+1] == false) {
				var audio = new Audio("Assets/Audio/Joey.mp3");
				audio.play();
			}
			arrayFromWord[i+1] = true;
		}
	}	
}

// function to see whether user has won the game
function hasUserWon() {
	
	if (arrayFromWord.indexOf(false) < 0 ) {
		console.log("USER WINS");
		// user has won, increment wins
		wins++;
		// play "I'll be there for you"
		var audio = new Audio("Assets/Audio/friends.mp3");
		audio.play();
		// update joey thinking to victory image
		var joeyThinking="<img src=\"Assets/images/victory.gif\" class=\"img-responsive\" alt=\"Dancing in fountain\">";
		document.querySelector("#joeyThinking").innerHTML = joeyThinking;
		// finally reset the game for new round
		resetGame();
	}	
}


// function to see whether user has lost the game
function hasUserLost() {
	// if they lost guessesLeft = 0
	if (guessesLeft == 0) {
		console.log("USER LOSES");
		// user has lost, increment losses
		losses++;
		// play Phoebe's "oh no"
		var audio = new Audio("Assets/Audio/Phoebe.mp3");
		audio.play();
		// update Joey's image to loss image
		var joeyThinking="<img src=\"Assets/images/loss.gif\" class=\"img-responsive\" alt=\"Monica falling\">";
		document.querySelector("#joeyThinking").innerHTML = joeyThinking;
		// finally reset the game for a new round
		resetGame();
	}

}

// function to reset the html variable
function resetHtmlVariable() {
	// reset the html variable so we can rebuild it after next user guess
	html="<p><h1>";

}
breakWordIntoArray();

//Game third
resetGame();

// debugging
consoleLogs();

// start listening for events
document.onkeyup = function(event) {

	// When user presses a key, it records it and saves to userGuess
	userGuess = String.fromCharCode(event.keyCode).toLowerCase();
	

	// check if user's guess is valid 
	validateUserGuess();

	// inject progress into html
	displayProgress();

	// debugging
	consoleLogs();

	// reset the html variable
	resetHtmlVariable();

	// check whether user has won and reset if true
	hasUserWon();

	// check whether user has lost and reset if true
	hasUserLost();

	// debugging
	consoleLogs();
}
