// Fields for injecting content
var fldTextField = document.querySelector("#textField");
var fldPlayField = document.querySelector("#playField");

// Button Elements
var btnStartButton = document.querySelector("#startButton");
var btnSelectionA = document.querySelector("#selectionA");
var btnSelectionB = document.querySelector("#selectionB");
var btnSelectionC = document.querySelector("#selectionC");
var btnSelectionD = document.querySelector("#selectionD");

// Game variables
var gameState = "GS_WELCOME"; // Useful for checking if we're on the welcome screen, game screen, or highscore screen
var timeLeft = 60; // Total game time
var numQuestions = 0; // Total number of questions
var numCorrect = 0; // Number of questions player answered correctly

// Object to store current question
var currentQuestion = {
    answer: "",
    question: "",
    options: ["", "", "", ""]
};

/* INIT
// STEP 0
// Function: Init
    // Loads questions and highscores
        // Get JSON question file
        // Load highscores from system local storage
*/

/* RENDER
// STEP 0
// Function: Render Homescreen
    // fldTextField ==> print welcome/instructions
    // fldGameText ==> display startButton
        // setAttr text-align Center

// RENDER
// Step 2b
// Function: Render question and answer
    // Print question to fldTextField
    // Print selection options to fldPlayField

// RENDER
// STEP 5, 6
// Function: Render Results
    // Log results
    // Print results to screen
    // Call Render HighScore
*/

/* LOAD
// STEP 2a
// Function: Load new question
*/

/* LISTEN
// STEP 2c
// Function: Listen for user input ( PARAM isTrueFalse )
    // string return type ==> returns "A", "B", "C", or "D"
    // Check which button was clicked
        // Possibly check for keystrokes
            // if isTrueFalse, ignore C and D keystrokes
*/

/* LOGIC
// STEP 2
// Function: Main Game loop
function gameLoop() {
    // Choose first Question
    // >Call "loadQuestion"

    // STEP2
    // >Timer
    var countDownInterval = setInterval(function() {
        timeLeft--;

        // 2a, 2b, 2c
        // >Call "loadQuestion"
        // >Call "renderQuestion"
        // >Call "parseUserInput"

        if(secondsLeft === 0) {
            clearInterval(timerInterval);
        }
    }, 1000);

    // STEP 3
    // Timer runs out
        // Render Results
} */

/* EVENTS
// STEP 1
// EventListener Start Button

// EventListener Answer Buttons
*/



// Procedure
    // 0 Welcome screen
        // 1 User clicks START
            // 2 Start timer
                // 2 Choose first question
                    // 2a Load question
                    // 2b Render question
                    // 2c Listen for user input
                        // 2c1 Input correct ==> Log correct, clear screen, next question
                        // 2c2 Input incorrect ==> Subtract time, clear screen, next question
                    // 2d Restart cycle until not more questions, or time out
            // 3 Time out ==> exit loop
            // 4 Clear screen
            // 5 Ask user for name
                // save score to local storage
            // 6 Render High score
            // 7 Go back to Home screen
    // Welcome screen
