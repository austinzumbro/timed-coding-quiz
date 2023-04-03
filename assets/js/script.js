// Page elements
const body = document.body;
const header = document.createElement('header');
header.setAttribute('class', 'header');

const pageTitle = document.createElement('h1');
pageTitle.setAttribute('class', 'title');
pageTitle.innerHTML = 'Coding Quiz';

const highScoresLink = document.createElement('a');
highScoresLink.setAttribute('href', 'highscores.html');
highScoresLink.innerHTML = 'High Scores';

const timerDiv = document.createElement('div');
timerDiv.setAttribute('class', 'timer');
const timerH2 = document.createElement('h2');
timerH2.setAttribute('class', 'timer-heading');
timerH2.innerHTML = 'Score';
const timerBr = document.createElement('br');
const timerSpan = document.createElement('span');
timerSpan.innerHTML = '__';
timerSpan.setAttribute('id', 'timer-span');
timerDiv.appendChild(timerH2);
timerDiv.appendChild(timerBr);
timerDiv.appendChild(timerSpan);

const mainSectionGrid = document.createElement('section');
mainSectionGrid.setAttribute('id', 'main-section-grid');
const mainSection = document.createElement('section');
mainSection.setAttribute('id', 'main-section');

const startButton = document.createElement('button');
startButton.setAttribute('id', 'start-button');
startButton.textContent = 'Press to Start';

const questionSection = document.createElement('section');
questionSection.setAttribute('id', 'question-section');

const answerResponse = document.createElement('div');
answerResponse.setAttribute('id', 'answer-response');
answerResponse.appendChild(document.createElement('hr'));
const answerResponseH2 = document.createElement('h2');
answerResponse.appendChild(answerResponseH2);

const quizOverSection = document.createElement('section');
quizOverSection.setAttribute('id', 'quiz-over');
const quizOverH2 = document.createElement('h2');
const quizOverP = document.createElement('p');

const quizOverForm = document.createElement('form');
quizOverForm.setAttribute('id', 'quiz-over-form');
const quizOverFormText = document.createElement('p');
quizOverFormText.innerHTML = 'Submit your initials to save your score.';
const quizOverFormLabel = document.createElement('label');
quizOverFormLabel.setAttribute('for', 'initials');
quizOverFormLabel.innerHTML = 'Initials';
const quizOverFormInitials = document.createElement('input');
quizOverFormInitials.setAttribute('type', 'text');
quizOverFormInitials.setAttribute('id', 'initials');
quizOverFormInitials.setAttribute('name', 'initials');
const quizOverFormSubmit = document.createElement('input');
quizOverFormSubmit.setAttribute('type', 'submit');

const footer = document.createElement('footer');
const resetButton = document.createElement('button');
resetButton.setAttribute('id', 'reset-button');

let quizQuestionsDynamicLibrary = [];
let quizPosition = 0;
let startingTime = 60;
let timerInterval;

// Assign attributes to Page Elements

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

// Build a randomized library of questions
quizQuestionsDynamicLibrary = randomizeArray(quizQuestionsStaticLibrary);

function displayScore() {
	quizOverH2.innerHTML = 'Quiz Complete!';
	quizOverSection.appendChild(quizOverH2);
	if (startingTime <= 0) {
		quizOverP.innerHTML =
			'Your score is ' + startingTime + '. Study up and try again.';
	} else {
		quizOverP.innerHTML = 'Your score is ' + startingTime + '.';
	}
	quizOverSection.appendChild(quizOverP);
	buildScoreForm();
	mainSection.appendChild(quizOverSection);
}

function startTimer() {
	let timerSpanEl = document.getElementById('timer-span');
	timerInterval = setInterval(function () {
		startingTime--;
		timerSpanEl.innerHTML = startingTime;
		if (startingTime == 0) {
			stopQuiz();
		}
	}, 1000);
}

function startQuiz() {
	document.getElementById('start-button').remove();
	quizPosition = 0;
	startingTime = 60;
	document.getElementById('timer-span').innerHTML = startingTime;
	startTimer();
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
	clearInterval(timerInterval);
	quizPosition = 0;
	console.log(mainSection);
	while (mainSection.firstChild) {
		mainSection.firstChild.remove();
	}
	mainSection.appendChild(startButton);
	displayScore();
}

mainSection.addEventListener('click', function (event) {
	let element = event.target;
	if (element.dataset.correct == 'true') {
		element.setAttribute('style', 'background: lightblue');
		answerResponseH2.innerHTML = 'Correct!';
		mainSection.appendChild(answerResponse);
		let removal = document.getElementById('answer-response');
		const timeout1 = setTimeout(advanceQuestion, 200);
	} else if (element.dataset.correct == 'false') {
		element.setAttribute('class', 'wrong');
		answerResponseH2.innerHTML = 'Wrong!';
		startingTime -= 15;
		mainSection.appendChild(answerResponse);
		const timeout1 = setTimeout(advanceQuestion, 200);
	}
});

startButton.addEventListener('click', startQuiz);

quizOverFormSubmit.addEventListener('click', function (event) {
	event.preventDefault();
	let userScore = [
		{
			initials: quizOverFormInitials.value.trim(),
			score: startingTime,
		},
	];

	let scoreArchive = localStorage.getItem('userScores');

	if (scoreArchive === null) {
		console.log('If condition fires.');
		localStorage.setItem('userScores', JSON.stringify(userScore));
	} else {
		console.log('Else condition fires.');
		let scoreArray = JSON.parse(scoreArchive);
		scoreArray.push(userScore[0]);

		localStorage.setItem('userScores', JSON.stringify(scoreArray));
	}
	mainSection.lastChild.remove();
});

// Assemble the page elements
function buildHeader() {
	header.appendChild(highScoresLink);
	header.appendChild(pageTitle);
	header.appendChild(timerDiv);
}

function buildFooter() {
	footer.appendChild(resetButton);
}

function buildMainSection() {
	mainSection.appendChild(startButton);
	mainSection.appendChild(questionSection);
	mainSectionGrid.append(mainSection);
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

resetButton.addEventListener('click', function () {
	localStorage.clear();
});

init();
