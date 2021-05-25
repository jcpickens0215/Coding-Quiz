var fldTextField = document.querySelector("#textField");
var fldPlayField = document.querySelector("#playField");

var btnSelectionA = document.querySelector("#selectionA");
var btnSelectionB = document.querySelector("#selectionB");
var btnSelectionC = document.querySelector("#selectionC");
var btnSelectionD = document.querySelector("#selectionD");

var timeLeft = 60;
var numQuestions = 0;
var numCorrect = 0;
var currentQuestion = {
    answer: "",
    question: "",
    options: ["", "", "", ""]
};


// Function: Init
    // Loads questions and highscores

// Function: Load new question

// Function: Render question and answer
    // Print question to fldTextField
    // Print selection options to fldPlayField

// Function: Render Results
    // Log results
    // Print results to screen
    // Call Render HighScore

// Function: Listen for user input
    // 

// Function: Main Game loop
    // Timer
    // Timer runs out
        // Render Results

// EventListener Start Button

// EventListener Answer Buttons




// Procedure
    // Welcome screen
        // User clicks START
            // Start timer
                // Choose first question
                    // Load question
                    // Render question
                    // Listen for user input
                        // Input correct ==> Log correct, clear screen, next question
                        // Input incorrect ==> Subtract time, clear screen, next question
                    // Restart cycle until not more questions, or time out
            // Time out ==> exit loop
            // Clear screen
            // Ask user for name
                // save score to local storage
            // Render High score
