// Page elements
const body = document.body;
const header = document.createElement("header");
header.setAttribute("class", "header");

const pageTitle = document.createElement("h1");
pageTitle.setAttribute("class", "title");
pageTitle.innerHTML = "Coding Quiz";

const highScoresLink = document.createElement("a");
highScoresLink.setAttribute("href", "highscores.html");
highScoresLink.innerHTML = "High Scores";

const timerDiv = document.createElement("div");
timerDiv.setAttribute("class", "timer");
const timerH2 = document.createElement("h2");
timerH2.setAttribute("class", "timer-heading");
timerH2.innerHTML = "Score";
const timerBr = document.createElement("br");
const timerSpan = document.createElement("span");
timerSpan.innerHTML = "__";
timerSpan.setAttribute("id", "timer-span");
timerDiv.appendChild(timerH2);
timerDiv.appendChild(timerBr);
timerDiv.appendChild(timerSpan);

const mainSectionGrid = document.createElement("section");
mainSectionGrid.setAttribute("id", "main-section-grid");
const mainSection = document.createElement("section");
mainSection.setAttribute("id", "main-section");

const startButton = document.createElement("button");
startButton.setAttribute("id", "start-button");
startButton.textContent = "Press to Start";

const questionSection = document.createElement("section");
questionSection.setAttribute("id", "question-section");

const answerResponse = document.createElement("div");
answerResponse.setAttribute("id", "answer-response");
answerResponse.appendChild(document.createElement("hr"));
const answerResponseH2 = document.createElement("h2");
answerResponse.appendChild(answerResponseH2);

const quizOverSection = document.createElement("section");
quizOverSection.setAttribute("id", "quiz-over");
const quizOverH2 = document.createElement("h2");
const quizOverP = document.createElement("p");

const quizOverForm = document.createElement("form");
quizOverForm.setAttribute("id", "quiz-over-form");
const quizOverFormText = document.createElement("p");
quizOverFormText.innerHTML = "Submit your initials to save your score.";
const quizOverFormLabel = document.createElement("label");
quizOverFormLabel.setAttribute("for", "initials");
quizOverFormLabel.innerHTML = "Initials";
const quizOverFormInitials = document.createElement("input");
quizOverFormInitials.setAttribute("type", "text");
quizOverFormInitials.setAttribute("id", "initials");
quizOverFormInitials.setAttribute("name", "initials");
const quizOverFormSubmit = document.createElement("input");
quizOverFormSubmit.setAttribute("type", "submit");

const footer = document.createElement("footer");

let quizQuestionsDynamicLibrary = [];
let quizPosition = 0;
let startingTime = 60;
let timerInterval;

// Quiz variables
// Set up a library object that stores quiz questions
// In a larger application, it would make sense to store these elsewhere
// and build the object using a function.
const quizQuestionsStaticLibrary = [
  {
    question: 'What is the difference between "==" and "==="?',
    answers: [
      {
        text: '"==" checks equality in value, whereas "===" checks equality in value and type.',
        correct: true,
      },
      {
        text: "Nothing. Both are comparison operators that check equality.",
        correct: false,
      },
      {
        text: '"==" checks whether two values are equal, whereas "===" checks whether two values are not equal.',
        correct: false,
      },
      {
        text: '"==" checks equality in value, whereas "===" is not a valid comparison operator.',
        correct: false,
      },
    ],
  },
  {
    question: 'Which of the following is a "falsy" value?',
    answers: [
      { text: "object", correct: false },
      { text: "NaN", correct: true },
      { text: "[]", correct: false },
      { text: "-1", correct: false },
    ],
  },
  {
    question: 'Which of the following is a "truthy" value?',
    answers: [
      { text: "NaN", correct: false },
      { text: "null", correct: false },
      { text: '"false"', correct: true },
      { text: "0", correct: false },
    ],
  },
  {
    question: 'let x = "string"; What value does x[3] return?',
    answers: [
      { text: "r", correct: false },
      { text: "Error", correct: false },
      { text: "undefined", correct: false },
      { text: "i", correct: true },
    ],
  },
];

// Helper function to randomize arrays
function randomizeArray(arr) {
  let sourceArray = [];
  let returnArray = [];

  // Clone the array into a new array
  // I couldn't find an out-of-the-box method for doing this... Seems odd.
  for (let i = 0; i < arr.length; i++) {
    sourceArray.push(arr[i]);
  }

  // Pull a random element out of one array and feed it to the other
  while (sourceArray.length > 0) {
    let randomIndex = Math.floor(Math.random() * sourceArray.length);
    returnArray.push(sourceArray[randomIndex]);
    sourceArray.splice(randomIndex, 1);
  }
  return returnArray;
}

// At the end of the quiz, show the user their score
function displayScore() {
  quizOverH2.innerHTML = "Quiz Complete!";
  quizOverSection.appendChild(quizOverH2);
  if (startingTime <= 0) {
    quizOverP.innerHTML =
      "Your score is " + startingTime + ". Study up and try again.";
  } else {
    quizOverP.innerHTML = "Your score is " + startingTime + ".";
  }
  quizOverSection.appendChild(quizOverP);
  buildScoreForm();
  mainSection.appendChild(quizOverSection);
}

// Start the timer
function startTimer() {
  let timerSpanEl = document.getElementById("timer-span");
  timerInterval = setInterval(function () {
    startingTime--;
    timerSpanEl.innerHTML = startingTime;
    if (startingTime == 0) {
      stopQuiz();
    }
  }, 1000);
}

// Start the quiz
function startQuiz() {
  // Build a randomized library of questions
  quizQuestionsDynamicLibrary = randomizeArray(quizQuestionsStaticLibrary);

  // Clear the Main Section
  // Relevant in cases where the user restarts the quiz
  while (mainSection.firstChild) {
    mainSection.firstChild.remove();
  }

  // Add the Question Section
  mainSection.appendChild(questionSection);

  // Reset the quiz variables to default
  quizPosition = 0;
  startingTime = 60;
  document.getElementById("timer-span").innerHTML = startingTime;
  startTimer();
  displayQuestion(quizPosition);
}

// Builds a question in HTML
// References the randomized quizQuestionDynamicLibrary
// Pulls in the question text and appends it as an <h2>
// Randomizes the answers of that question
// Builds an unordered list of those answers and appends it
// Appends the entire question wrapped in a div element.

function displayQuestion(index) {
  // Clear the currently displayed question, if applicable
  let currentQuestion = document.getElementById("current-question");
  if (currentQuestion != null) {
    currentQuestion.remove();
  }

  let questionDiv = document.createElement("div");
  questionDiv.setAttribute("class", "question-container");
  questionDiv.setAttribute("id", "current-question");

  let questionText = quizQuestionsDynamicLibrary[index].question;
  let questionH2 = document.createElement("h2");
  questionH2.innerHTML = questionText;

  let answerSection = document.createElement("ul");
  let answerList = randomizeArray(quizQuestionsDynamicLibrary[index].answers);
  for (let i = 0; i < answerList.length; i++) {
    let answerLi = document.createElement("li");
    answerLi.innerHTML = answerList[i].text;
    answerLi.setAttribute("data-correct", answerList[i].correct);
    answerSection.appendChild(answerLi);
  }

  questionDiv.appendChild(questionH2);
  questionDiv.appendChild(answerSection);

  questionSection.appendChild(questionDiv);
}

// Move on to the next question
// If no more questions remain, stop the quiz
function advanceQuestion() {
  quizPosition++;
  if (quizQuestionsDynamicLibrary[quizPosition]) {
    displayQuestion(quizPosition);
  } else {
    stopQuiz();
  }
}

// Stop the timer
function stopQuiz() {
  clearInterval(timerInterval);

  // Clear out the Main Section to make space for the score
  while (mainSection.firstChild) {
    mainSection.firstChild.remove();
  }
  mainSection.appendChild(startButton);
  displayScore();
}

// Let the user click to choose an answer
mainSection.addEventListener("click", function (event) {
  let element = event.target;

  if (element.dataset.correct == "true") {
    // Behavior if the answer is correct
    // Change the color of the element to give instant feedback
    element.setAttribute("style", "background: lightblue");
    answerResponseH2.innerHTML = "Correct!";
    mainSection.appendChild(answerResponse);
    let removal = document.getElementById("answer-response");

    // Delay question advancement so user can see the color
    const timeout1 = setTimeout(advanceQuestion, 200);
  } else if (element.dataset.correct == "false") {
    // Behavior if the answer is wrong
    // Change the color of the element to give instant feedback
    element.setAttribute("class", "wrong");
    answerResponseH2.innerHTML = "Wrong!";
    startingTime -= 15;
    mainSection.appendChild(answerResponse);

    // Delay question advancement so user can see the color
    const timeout1 = setTimeout(advanceQuestion, 200);
  }
});

// When the user clicks the start button, start the quiz.
startButton.addEventListener("click", startQuiz);

// Allow the user to save their score to localStorage
quizOverFormSubmit.addEventListener("click", function (event) {
  event.preventDefault();
  let userScore = [
    {
      initials: quizOverFormInitials.value.trim(),
      score: startingTime,
    },
  ];

  let scoreArchive = localStorage.getItem("userScores");

  if (scoreArchive === null) {
    localStorage.setItem("userScores", JSON.stringify(userScore));
  } else {
    let scoreArray = JSON.parse(scoreArchive);
    scoreArray.push(userScore[0]);

    localStorage.setItem("userScores", JSON.stringify(scoreArray));
  }
  mainSection.lastChild.remove();
});

// Assemble the page elements on init
function buildHeader() {
  header.appendChild(highScoresLink);
  header.appendChild(pageTitle);
  header.appendChild(timerDiv);
}

function buildMainSection() {
  mainSection.appendChild(startButton);
  mainSectionGrid.append(mainSection);
}

function buildFooter() {
  // This used to include a reset score button, but that's been moved
  // to the High Scores page.  This function has been left here for
  // potential use in the future.
}

function buildScoreForm() {
  quizOverForm.appendChild(quizOverFormText);
  quizOverForm.appendChild(quizOverFormLabel);
  quizOverForm.appendChild(quizOverFormInitials);
  quizOverForm.appendChild(quizOverFormSubmit);
  quizOverSection.appendChild(quizOverForm);
}

function init() {
  buildHeader();
  buildMainSection();
  buildFooter();
  body.appendChild(header);
  body.appendChild(mainSectionGrid);
  body.appendChild(footer);
}

init();
