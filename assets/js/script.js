// Fields for injecting content
var fldTimerField     = document.querySelector("#timerField");
var fldTextField      = document.querySelector("#textField");
var fldPlayField      = document.querySelector("#playField");
var fldHighScoreField = document.querySelector("#highScoreField");

// Button Elements
var btnStartButton       = document.querySelector("#startButton");
var btnResetButton       = document.querySelector("#resetScoreButton");
var btnRestartGameButton = document.querySelector("#restartGameButton");
var btnSelectionA        = document.querySelector("#selectionA");
var btnSelectionB        = document.querySelector("#selectionB");
var btnSelectionC        = document.querySelector("#selectionC");
var btnSelectionD        = document.querySelector("#selectionD");

// Game variables
var gameState = "GS_WELCOME"; // Useful for checking if we're on the welcome screen, game screen, or highscore screen

var timeLeft = 60; // Total game time
var playerScore = 0; // Store the player's score
var highScores = []; // Declare empty highscore list

var currentQuestion; // Variable to store current question
var numQuestions = listOfQuestions.length; // Total number of questions
var questionIndex = 0; // Which question are we on?
var userSelectedAnswer = ""; // Store the player's selected answer as a string

// Initialize the game
function init() {
    gameState = "GS_WELCOME";
    playerScore = 0;
    questionIndex = 0;
    currentQuestion = listOfQuestions[0];

    // ** Load highscores from system local storage
    // Capture any existing local high score data
    var highScoresListJSON = JSON.parse(localStorage.getItem("highScoresList"));

    // If there was data...
    if (highScoresListJSON !== null) {
        // Then iterate through all entries
        for (var i = 0; i < highScoresListJSON.length; i++) {
            // And add each highscore to the list
            highScores.push(highScoresListJSON[i]);
        }
    }

    // Clear Screen
    clearScreen();
    renderWelcomeScreen();
}

// Render the welcome screen
function renderWelcomeScreen() {
    // Make sure the text field is visible
    fldTextField.setAttribute("style", "visibility: visible;");

    // fldTextField ==> print welcome/instructions
    fldTextField.children[0].textContent = "Welcome!";
    fldTextField.children[1].textContent = "Instructions: ";

    // fldGameText ==> display startButton
    btnStartButton.setAttribute("style", "visibility: visible; text-align:center;");
}

// Clears the screen of all text
function clearScreen() {
    // Make sure the high score page is hidden
    fldHighScoreField.setAttribute("style", "visibility: hidden;");

    // Clear fields
    fldTextField.children[0].textContent = "";
    fldTextField.children[1].textContent = "";

    // Hide start button
    btnStartButton.setAttribute("style", "visibility: hidden;");

    // Clear button text
    btnSelectionA.textContent = "";
    btnSelectionB.textContent = "";
    btnSelectionC.textContent = "";
    btnSelectionD.textContent = "";
}

// Draw the question and answer selctions to the screen
function renderQuestionAndAnswer(isTrueFalse) {
    // Print question to fldTextField
    fldTextField.children[0].textContent = "Question " + (questionIndex + 1);
    fldTextField.children[1].textContent = currentQuestion["question"];

    // Fetch array of answer selections from key "options"
    var optionsArray = currentQuestion["options"];

    // Make sure the unordered list is visible
    fldPlayField.children[1].setAttribute("style", "visibility: visible;");

    // Hide the start button
    btnStartButton.setAttribute("style", "visibility: hidden;");

    // Display the first 2 answer selections options
    btnSelectionA.textContent = optionsArray[0];
    btnSelectionB.textContent = optionsArray[1];

    // Check if the current question is a True/False
    if (isTrueFalse === false) { // If it's normal
        // Set the other 2 answer selections options
        btnSelectionC.textContent = optionsArray[2];
        btnSelectionD.textContent = optionsArray[3];

        // And make sure they are visible
        btnSelectionC.setAttribute("style", "visibility:visible;");
        btnSelectionD.setAttribute("style", "visibility:visible;");
    } else { // If it is a True/False
        // Hide the other 2 buttons
        btnSelectionC.setAttribute("style", "visibility:hidden;");
        btnSelectionD.setAttribute("style", "visibility:hidden;");
    }
}

// Render the High Score screen
function renderHighScoreScreen() {
    gameState = "GS_HIGHSCORE";

    // Show the high score table
    fldHighScoreField.setAttribute("style", "visibility: visible;");

    // Hide text field and play field
    fldTextField.setAttribute("style", "visibility: hidden;");
    fldPlayField.setAttribute("style", "visibility: hidden;");
    fldPlayField.children[1].setAttribute("style", "visibility: hidden;");

    // Hide selection buttons
    btnSelectionA.setAttribute("style", "visibility: hidden;");
    btnSelectionB.setAttribute("style", "visibility: hidden;");
    btnSelectionC.setAttribute("style", "visibility: hidden;");
    btnSelectionD.setAttribute("style", "visibility: hidden;");

    // Log results
    var playerName = prompt("Please enter your name."); // Ask player for their name
    if ((playerName === null) || (playerName === "")) { // If the player didn't enter anything
        playerName = "Player"; // Give the entry a default name
    }

    highScores.push([playerName, playerScore]); // Log high score

    // Sort highscores
    highScores.sort((a,b) =>  b[1] - a[1]);

    // Store highScores to local storage
    localStorage.setItem("highScoresList", JSON.stringify(highScores));
    console.log(JSON.stringify(highScores)); // ! DEBUGGING FILE HANDLING

    // Print results to screen
    // add an li for each entry in highScores
    for (var i = 0; i < highScores.length; i++) {
        var scoreEntry = document.createElement("li");
        scoreEntry.innerText = highScores[i][1] + "         " + highScores[i][0];
        fldHighScoreField.children[1].appendChild(scoreEntry);
    }
}

// When an option button is clicked, check which was selected and return
// string return type ==> returns "A", "B", "C", or "D"
function parseUserInput(element, isTrueFalse) {
    // Check which button was clicked
    if (isTrueFalse === true) { // If the current question is True/False
        if (element === btnSelectionA) {
            return "A";
        } else if (element === btnSelectionB) {
            return "B";
        }
    } else { // If the current question is not True/False
        if (element === btnSelectionA) {
            return "A";
        } else if (element === btnSelectionB) {
            return "B";
        } else if (element === btnSelectionC) {
            return "C";
        } else if (element === btnSelectionD) {
            return "D";
        }
    }

    return ""; // If input was invalid return nothing
}

// Main Game loop
function gameLoop() {
    gameState = "GS_GAMELOOP";

    // Set timer (game loop)
    var countDownInterval = setInterval(function() {
        timeLeft--; // Decrement the timer
        fldTimerField.textContent = timeLeft; // Print the time remaining to the screen

        // Check if we're done
        if (questionIndex < numQuestions) { // If we're not done
            // Render the next question, passing in if it is
            // a True/False question
            renderQuestionAndAnswer(currentQuestion["isTrueFalse"]);

            if (userSelectedAnswer != "") { // If the user has answered
                if (userSelectedAnswer == currentQuestion["answer"]) { // Correct!
                    playerScore += 10; // Add 10 to score
                    clearScreen(); // Clear the Screen

                    // Go to next question
                    questionIndex++; 
                    currentQuestion = listOfQuestions[questionIndex]
                    
                    // Reset userSelectedAnswer
                    userSelectedAnswer = "";

                    // Check if we're done
                    // NOTE: It looks like I'm repeating myself here,
                    // and I am, but it's so that the screen refreshes
                    // immediately after the player selects an option
                    if (questionIndex < numQuestions) { // If we're not done
                        // Render the next question, passing in if it is
                        // a True/False question
                        renderQuestionAndAnswer(currentQuestion["isTrueFalse"]);
                    } else { // If we are done
                        clearScreen(); // Clear the screen
                        playerScore += timeLeft; // Add remaining time to the score!
                        renderHighScoreScreen();
                        clearInterval(countDownInterval);
                    }
                } else { // Incorrect!
                    timeLeft = timeLeft - 10; // Subtract time
                    userSelectedAnswer = ""; // Reset userSelectedAnswer
                }
            }
        }

        if(timeLeft <= 0) { // If we are out of time!
            clearScreen(); // Clear the screen
            renderHighScoreScreen();
            clearInterval(countDownInterval); // Exit the timer
        }
    }, 1000);

    // Timer runs out
    if ((gameState === "GS_GAMELOOP") && (timeLeft < 1)) {
        renderHighScoreScreen();
    }
} 

init();

// Wait for click on the start button
btnStartButton.addEventListener("click", function() {
    gameLoop(); // Start the game
});

// Listen for player input
fldPlayField.addEventListener("click", function (event) {
    var element = event.target;
    if (element.matches("button") === true) {
        userSelectedAnswer = parseUserInput(element, currentQuestion["isTrueFalse"]);
    }
});

// When the user clicks the "Reset Scores" button
btnResetButton.addEventListener("click", function() {
    localStorage.removeItem("highScoresList");
    fldHighScoreField.children[1].innerHTML = '';
});

// When the user clicks the "Play Again" button
btnRestartGameButton.addEventListener("click", function() {
    window.location.reload();
});