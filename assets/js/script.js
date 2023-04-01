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
const quizQuestions = {
	q1: {
		question: 'The answer to this question is A.',
		answers: {
			correct: 'A',
			wrong1: 'B',
			wrong2: 'C',
			wrong3: 'D',
		},
	},
	q2: {
		question: 'The answer to this question is B.',
		answers: {
			correct: 'B',
			wrong1: 'C',
			wrong2: 'D',
			wrong3: 'A',
		},
	},
	q3: {
		question: 'The answer to this question is C.',
		answers: {
			correct: 'C',
			wrong1: 'D',
			wrong2: 'A',
			wrong3: 'B',
		},
	},
	q4: {
		question: 'The answer to this question is D.',
		answers: {
			correct: 'D',
			wrong1: 'A',
			wrong2: 'B',
			wrong3: 'C',
		},
	},
};

function buildTheHeader() {
	header.appendChild(highScoresLink);
	header.appendChild(pageTitle);
	header.appendChild(timer);
}

function buildMainSection() {
	mainSection.appendChild(startButton);
}

function init() {
	console.log(body);
	buildTheHeader();
	body.appendChild(header);
	buildMainSection();
	body.appendChild(mainSection);
}

startButton.addEventListener('click', startQuiz);

function startQuiz() {
	startButton.setAttribute('class', 'hidden');
}

init();
