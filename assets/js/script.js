const body = document.body;
const header = document.createElement("header");
const pageTitle = document.createElement("h1");
const highScoresLink = document.createElement("a");
const timer = document.createElement("span");

pageTitle.innerHTML = "Coding Quiz";

highScoresLink.setAttribute("href", "highscores.html");
highScoresLink.innerHTML = "High Scores";

function buildTheHeader() {
  header.appendChild(highScoresLink);
  header.appendChild(pageTitle);
}

function initializeQuizPage() {
  console.log(body);
  buildTheHeader();
  body.appendChild(header);
}

initializeQuizPage();
