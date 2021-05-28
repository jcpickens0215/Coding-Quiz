// Fields for injecting content
var fldTextField = document.querySelector("#textField");
var fldPlayField = document.querySelector("#playField");

// Button Elements
var btnStartButton = document.querySelector("#startButton");
var btnSelectionA  = document.querySelector("#selectionA");
var btnSelectionB  = document.querySelector("#selectionB");
var btnSelectionC  = document.querySelector("#selectionC");
var btnSelectionD  = document.querySelector("#selectionD");

// Game variables
var gameState = "GS_WELCOME"; // Useful for checking if we're on the welcome screen, game screen, or highscore screen

var timeLeft = 60; // Total game time
var playerScore = 0; // Store the player's score

var currentQuestion; // Variable to store current question
var numQuestions = listOfQuestions.length; // Total number of questions
var questionIndex = 0; // Which question are we on?
var userSelectedAnswer = ""; // Store the player's selected answer as a string

/* INIT */
// STEP 0
// Function: Init
function init() {
    gameState = "GS_WELCOME";
    playerScore = 0;
    questionIndex = 0;
    currentQuestion = listOfQuestions[0];

    // Load highscores from system local storage

    // Clear Screen
    clearScreen();
    renderWelcomeScreen();
}

/* RENDER */
// STEP 0
// Function: Render Welcomescreen
function renderWelcomeScreen() {
    // fldTextField ==> print welcome/instructions
    fldTextField.children[0].textContent = "Welcome!";
    fldTextField.children[1].textContent = "Instructions: ";

    // fldGameText ==> display startButton
    btnStartButton.setAttribute("style", "visibility: visible; text-align:center;");
}

// Clears the screen of all text
function clearScreen() {
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

    ///// Print selection options to fldPlayField

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

// RENDER
// STEP 5, 6
// Function: Render Results
    // Log results
    // Print results to screen
    // Call Render HighScore

// When an option button is clicked, check which was selected and return
// string return type ==> returns "A", "B", "C", or "D"
function parseUserInput(element, isTrueFalse) {
    // Check which button was clicked
    if (isTrueFalse === true) {
        if (element === btnSelectionA) {
            return "A";
        } else if (element === btnSelectionB) {
            return "B";
        }
    } else {
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

    return "";
}

/* LOGIC */
// STEP 2
// Function: Main Game loop
function gameLoop() {
    gameState = "GS_GAMELOOP";

    // STEP2
    // >Timer
    var countDownInterval = setInterval(function() {
        timeLeft--;

        // Check if we're done
        if (questionIndex < numQuestions) { // If we're not done

            /* Sanity check
            // console.log(questionIndex);
            // console.log(numQuestions);*/

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
                        // Call renderResults()
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
            // Call renderResults()
            clearInterval(countDownInterval); // Exit the timer
        }
    }, 1000);

    // STEP 3
    // Timer runs out
        // Render Results
} 

/* FUNCTION CALLS */
init();

/* EVENTS */
// STEP 1
// EventListener Start Button
btnStartButton.addEventListener("click", function() {
    gameLoop();
});

// EventListener Answer Buttons

fldPlayField.addEventListener("click", function (event) {
    var element = event.target;
    if (element.matches("button") === true) {
        userSelectedAnswer = parseUserInput(element, currentQuestion["isTrueFalse"]);
    }
});


// Procedure
    // 0 Welcome screen
        // 1 User clicks START
            // 2 Start timer
                // 2 Choose first question
                    // 2b Render question
                    // 2c Listen for user input
                        // 2c1 Input correct ==> Log correct, clear screen, next question
                        // 2c2 Input incorrect ==> Subtract time, clear screen, next question
                    // Next question
                    // 2d Restart cycle until not more questions, or time out
            // 3 Time out ==> exit loop
            // 4 Clear screen
            // 5 Ask user for name
                // save score to local storage
            // 6 Render High score
            // 7 Go back to Home screen
    // Welcome screen
