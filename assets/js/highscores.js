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

const mainSectionGrid = document.createElement("section");
mainSectionGrid.setAttribute("id", "main-section-grid");
const mainSection = document.createElement("section");
mainSection.setAttribute("id", "main-section");

const scoreTable = document.createElement("table");
const scoreHeadRow = document.createElement("tr");
const scoreHeadInitials = document.createElement("th");
scoreHeadInitials.innerHTML = "Name";
const scoreHeadScore = document.createElement("th");
scoreHeadScore.innerHTML = "Score";

const clearScore = document.createElement("button");
clearScore.setAttribute("id", "clear-score");
clearScore.textContent = "Clear Scores";

let scoreArchive = JSON.parse(localStorage.getItem("userScores"));

// Clear localStorage
function clearScores() {
  localStorage.clear();
}

// Build the table to display Scores
function buildTable() {
  scoreHeadRow.appendChild(scoreHeadInitials);
  scoreHeadRow.appendChild(scoreHeadScore);
  scoreTable.appendChild(scoreHeadRow);

  if (scoreArchive) {
    // If scores are stored in localStorage, do this:
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
  } else {
    // If localStorage is empty, do this:
    let noScoresRow = document.createElement("tr");
    let noScoresTd = document.createElement("td");
    noScoresTd.innerHTML = "No Scores Saved";
    noScoresTd.setAttribute("colspan", "2");
    noScoresRow.appendChild(noScoresTd);
    scoreTable.appendChild(noScoresRow);
  }
}

// Allow the user to clear the scores with the click of a button
clearScore.addEventListener("click", function () {
  // Empty localStorage
  clearScores();
  scoreArchive = JSON.parse(localStorage.getItem("userScores"));

  // Clear out the Main Section
  while (mainSection.firstChild) {
    mainSection.firstChild.remove();
  }
  // Clear out the Table
  while (scoreTable.firstChild) {
    scoreTable.firstChild.remove();
  }
  // Rebuild the Table
  buildTable();
  // Rebuild the Main Section
  buildMainSection();
});

function buildHeader() {
  header.appendChild(goBackLink);
  header.appendChild(pageTitle);
}

function buildMainSection() {
  mainSection.appendChild(scoreTable);

  // Only show the Clear Scores button if there are scores to clear
  if (scoreArchive) {
    mainSection.appendChild(clearScore);
  }

  mainSectionGrid.appendChild(mainSection);
}

function init() {
  buildHeader();
  buildTable();
  buildMainSection();
  body.appendChild(header);
  body.appendChild(mainSectionGrid);
}

init();
