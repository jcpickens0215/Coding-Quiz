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
var numCorrect = 0; // Number of questions player answered correctly
var userSubmittedAnswer = false;

// I had to hardcode these questions because I couldn't figure out how to load a JSON
var listOfQuestions = [
    {
        "answer": "A",
        "isTrueFalse": "false",
        "question": "The answer is A",
        "options": ["A", "B", "C", "D"]
    },
    {
        "answer": "B",
        "isTrueFalse": "false",
        "question": "The answer is A",
        "options": ["A", "B", "C", "D"]
    },
    {
        "answer": "C",
        "isTrueFalse": "false",
        "question": "The answer is A",
        "options": ["A", "B", "C", "D"]
    },
    {
        "answer": "D",
        "isTrueFalse": "false",
        "question": "The answer is A",
        "options": ["A", "B", "C", "D"]
    },
    {
        "answer": "B",
        "isTrueFalse": "true",
        "question": "True/False test, the answer is False",
        "options": ["True", "False", "", ""]
    }
];

var currentQuestion = listOfQuestions[0]; // Variable to store current question
var numQuestions = listOfQuestions.length; // Total number of questions
var questionIndex = 0; // Which question are we on?
var userSelectedAnswer = "";

/* INIT */
// STEP 0
// Function: Init
function init() {
    gameState = "GS_WELCOME";
    // Loads questions and highscores
    console.log(currentQuestion);

    // Load highscores from system local storage

    // Clear Screen
    clearScreen();
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

// RENDER
// Function: Clear screen
function clearScreen() {
    fldTextField.children[0].textContent = "";
    fldTextField.children[1].textContent = "";

    btnStartButton.setAttribute("style", "visibility: hidden;");
    btnSelectionA.textContent = "";
    btnSelectionB.textContent = "";
    btnSelectionC.textContent = "";
    btnSelectionD.textContent = "";
}

// RENDER
// Step 2b
// Function: Render question and answer
function renderQuestionAndAnswer() {
    // Print question to fldTextField
    fldTextField.children[0].textContent = "Question " + (questionIndex + 1);
    fldTextField.children[1].textContent = currentQuestion["question"];
    var optionsArray = currentQuestion["options"];

    // Print selection options to fldPlayField
    fldPlayField.children[1].setAttribute("style", "visibility: visible;");
    btnStartButton.setAttribute("style", "visibility: hidden;");
    btnSelectionA.textContent = optionsArray[0];
    btnSelectionB.textContent = optionsArray[1];
    btnSelectionC.textContent = optionsArray[2];
    btnSelectionD.textContent = optionsArray[3];
}

// RENDER
// STEP 5, 6
// Function: Render Results
    // Log results
    // Print results to screen
    // Call Render HighScore


/* LOAD
// STEP 2a
// Function: Load new question
*/

/* LISTEN */
// STEP 2c
// Function: Listen for user input ( PARAM element, isTrueFalse ) 
function parseUserInput(element, isTrueFalse) {
    // string return type ==> returns "A", "B", "C", or "D"

    // Check which button was clicked
    if (isTrueFalse == true) {
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

        if (questionIndex < numQuestions) {
            

            // Sanity check
            // console.log(questionIndex);
            // console.log(numQuestions);

            userSelectedAnswer = ""; // !! May be buggy
            renderQuestionAndAnswer();
            if (userSelectedAnswer != "") { // If the user has answered
                console.log(userSelectedAnswer);
                console.log(currentQuestion["answer"]);

                if (userSelectedAnswer == currentQuestion["answer"]) {
                    // Correct!

                } else {
                    // Incorrect!

                }
            }
        }

        if(timeLeft === 0) {
            clearInterval(countDownInterval);
        }
    }, 1000);

    // STEP 3
    // Timer runs out
        // Render Results
} 

/* FUNCTION CALLS */
init();
renderWelcomeScreen();

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
        console.log(userSelectedAnswer);
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
