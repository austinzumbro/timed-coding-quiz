// Page elements
const body = document.body;
const header = document.createElement('header');
const pageTitle = document.createElement('h1');
const highScoresLink = document.createElement('a');
const timer = document.createElement('div');

const mainSection = document.createElement('section');
const startButton = document.createElement('button');
const questionSection = document.createElement('section');
const answerResponse = document.createElement('div');
answerResponse.appendChild(document.createElement('hr'));
const answerResponseH2 = document.createElement('h2');
answerResponse.appendChild(answerResponseH2);

const footer = document.createElement('footer');
footer.innerHTML = '<h2>This is here to check spacing and layout.</h2>';

// Set multiple attributes at once
function setAttributes(element, attributes) {
	for (let i = 0; i < attrs.length; i++) {
		element.setAttribute(attributes[i]);
	}
}

// Assign attributes to Page Elements
header.setAttribute('class', 'header');
pageTitle.setAttribute('class', 'title');
pageTitle.innerHTML = 'Coding Quiz';
timer.setAttribute('class', 'timer');
timer.innerHTML = '<h2 class="timer-heading">Time</h2><br><span>_:__</span>';
highScoresLink.setAttribute('href', 'highscores.html');
highScoresLink.innerHTML = 'High Scores';

mainSection.setAttribute('id', 'main-section');
startButton.setAttribute('id', 'start-button');
startButton.textContent = 'Press to Start';
questionSection.setAttribute('id', 'question-section');

// Quiz variables
const quizQuestionsStaticLibrary = [
	{
		question: 'The answer to this question is A.',
		answers: [
			{ text: 'A', correct: true },
			{ text: 'B', correct: false },
			{ text: 'C', correct: false },
			{ text: 'D', correct: false },
		],
	},
	{
		question: 'The answer to this question is B.',
		answers: [
			{ text: 'A', correct: false },
			{ text: 'B', correct: true },
			{ text: 'C', correct: false },
			{ text: 'D', correct: false },
		],
	},
	{
		question: 'The answer to this question is C.',
		answers: [
			{ text: 'A', correct: false },
			{ text: 'B', correct: false },
			{ text: 'C', correct: true },
			{ text: 'D', correct: false },
		],
	},
	{
		question: 'The answer to this question is D.',
		answers: [
			{ text: 'A', correct: false },
			{ text: 'B', correct: false },
			{ text: 'C', correct: false },
			{ text: 'D', correct: true },
		],
	},
];

let quizQuestionsDynamicLibrary = [];
let quizPosition = 0;

function randomizeArray(questionArr) {
	let sourceArray = questionArr;
	let returnArray = [];

	while (sourceArray.length > 0) {
		let randomIndex = Math.floor(Math.random() * sourceArray.length);
		returnArray.push(sourceArray[randomIndex]);
		sourceArray.splice(randomIndex, 1);
	}
	return returnArray;
}

quizQuestionsDynamicLibrary = randomizeArray(quizQuestionsStaticLibrary);
console.log(quizQuestionsDynamicLibrary);

// Assemble the page elements

function buildTheHeader() {
	header.appendChild(highScoresLink);
	header.appendChild(pageTitle);
	header.appendChild(timer);
}

function buildMainSection() {
	mainSection.appendChild(startButton);
	mainSection.appendChild(questionSection);
}

function init() {
	buildTheHeader();
	buildMainSection();
	body.appendChild(header);
	body.appendChild(mainSection);
	body.appendChild(footer);
}

startButton.addEventListener('click', startQuiz);

function startQuiz() {
	quizPosition = 0;
	startButton.setAttribute('class', 'hidden');
	displayQuestion(quizPosition);
}

// Builds a question in HTML
// References the randomized quizQuestionDynamicLibrary
// Pull in the question text and appends it as an <h2>
// Randomizes the answers of that question
// Builds an unordered list of those answers and appends it
// Returns the entire question as a div element for display on the page.

function displayQuestion(index) {
	// Clear the currently displayed question, if applicable
	let currentQuestion = document.getElementById('current-question');
	if (currentQuestion !== null) {
		currentQuestion.remove();
	}

	let questionDiv = document.createElement('div');
	questionDiv.setAttribute('class', 'question-container');
	questionDiv.setAttribute('id', 'current-question');

	let questionText = quizQuestionsDynamicLibrary[index].question;
	let questionH2 = document.createElement('h2');
	questionH2.innerHTML = questionText;

	let answerSection = document.createElement('ul');
	let answerList = randomizeArray(quizQuestionsDynamicLibrary[index].answers);
	for (let i = 0; i < answerList.length; i++) {
		let answerLi = document.createElement('li');
		answerLi.innerHTML = answerList[i].text;
		answerLi.setAttribute('data-correct', answerList[i].correct);
		answerSection.appendChild(answerLi);
	}

	questionDiv.appendChild(questionH2);
	questionDiv.appendChild(answerSection);

	questionSection.appendChild(questionDiv);
}

function advanceQuestion() {
	quizPosition++;
	if (quizQuestionsDynamicLibrary[quizPosition]) {
		displayQuestion(quizPosition);
	} else {
		stopQuiz();
	}
}

function stopQuiz() {
	console.log('The quiz has stopped.');
	quizPosition = 0;
}

mainSection.addEventListener('click', function (event) {
	let element = event.target;
	console.log(element);
	if (element.dataset.correct == 'true') {
		console.log('This is the right answer.');
		answerResponseH2.innerHTML = 'Correct!';
		questionSection.firstChild.appendChild(answerResponse);
		const timeout = setTimeout(advanceQuestion, 200);
	} else if (element.dataset.correct == 'false') {
		console.log('This is the wrong answer.');
		answerResponseH2.innerHTML = 'Wrong!';
		questionSection.firstChild.appendChild(answerResponse);
		const timeout = setTimeout(advanceQuestion, 200);
	}
});

init();
