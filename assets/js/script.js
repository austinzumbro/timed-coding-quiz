// Page elements
const body = document.body;
const header = document.createElement('header');
const pageTitle = document.createElement('h1');
const highScoresLink = document.createElement('a');
const timer = document.createElement('div');

const mainSection = document.createElement('section');
const startButton = document.createElement('button');

const footer = document.createElement('footer');

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

mainSection.setAttribute('id', 'main-section');

startButton.setAttribute('id', 'start-button');
startButton.textContent = 'Press to Start';

highScoresLink.setAttribute('href', 'highscores.html');
highScoresLink.innerHTML = 'High Scores';

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
}

function init() {
	buildTheHeader();
	buildMainSection();
	body.appendChild(header);
	body.appendChild(mainSection);
}

startButton.addEventListener('click', startQuiz);

function startQuiz() {
	startButton.setAttribute('class', 'hidden');
	let questionDiv = displayQuestion(quizPosition);
	mainSection.appendChild(questionDiv);
}

function displayQuestion(index) {
	let questionDiv = document.createElement('div');
	questionDiv.setAttribute('class', 'question-container');

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

	return questionDiv;
}

init();
