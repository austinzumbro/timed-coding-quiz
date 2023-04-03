// Page elements
const body = document.body;
const header = document.createElement("header");
header.setAttribute("class", "header");

const pageTitle = document.createElement("h1");

pageTitle.setAttribute("class", "title");
pageTitle.innerHTML = "Coding Quiz<br>High Scores";

const goBackLink = document.createElement("a");
goBackLink.setAttribute("href", "index.html");
goBackLink.innerHTML = "Go Back";

const scoreTable = document.createElement("table");
const scoreHeadRow = document.createElement("tr");
const scoreHeadInitials = document.createElement("th");
scoreHeadInitials.innerHTML = "Name";
const scoreHeadScore = document.createElement("th");
scoreHeadScore.innerHTML = "Score";

let scoreArchive = JSON.parse(localStorage.getItem("userScores"));

function buildTable() {
  scoreHeadRow.appendChild(scoreHeadInitials);
  scoreHeadRow.appendChild(scoreHeadScore);
  scoreTable.appendChild(scoreHeadRow);
  for (let i = 0; i < scoreArchive.length; i++) {
    let newRow = document.createElement("tr");
    let initialTd = document.createElement("td");
    let scoreTd = document.createElement("td");
    initialTd.innerHTML = scoreArchive[i].initials;
    scoreTd.innerHTML = scoreArchive[i].score;
    newRow.appendChild(initialTd);
    newRow.appendChild(scoreTd);
    scoreTable.appendChild(newRow);
  }
}

function buildHeader() {
  header.appendChild(goBackLink);
  header.appendChild(pageTitle);
}

function init() {
  buildHeader();
  if (scoreArchive) {
    buildTable();
  }

  // buildMainSection();
  body.appendChild(header);
  body.appendChild(scoreTable);
  // body.appendChild(mainSectionGrid);
  // body.appendChild(footer);
}

init();
