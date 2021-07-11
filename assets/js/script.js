var pageContentEl = document.querySelector("#page-content");
var timerEl = document.getElementById('countdown');
var mainEl = document.getElementById('main');
var startBtn = document.getElementById('start');
var starterEl = document.getElementById('starter');
var quizEl = document.getElementById('quiz');
var endEl = document.getElementById('end');
var scoresEl = document.getElementById('scores');
var questionEl = document.getElementById('question');
var checkerEl = document.getElementById('checker');
var checkedEl = document.getElementById('checked');
var scoreEl = document.getElementById('score');
var ansEl = [];
var questionNumber = 0;
var score = 0;
var scores = [];
var timeLeft = 0;
var timeInterval = "";

var questions = [
  "Commonly used data types DO NOT include:",
  "The condition in an if / else statement is enclosed with ______.",
  "Arrays in JavaScript can be used to store ______.",
  "String values must be enclosed within ______ when being assigned to variables.",
  "A very useful tool used during development and debugging for printing content to the debugger is:"
];

var answers = [
  ["strings","booleans","alerts","numbers"],
  ["quotes","curly brackets","parenthesis","square brackets"],
  ["numbers and strings","other arrays","booleans","all of the above"],
  ["commas","curly brackets","quotes","parenthesis"],
  ["JavaScript","terminal/bash","for loops","console.log"]
];

var correct = ["2","2","3","2","3"];

var clickHandler = function(event) {
  var targetEl = event.target;
  if (targetEl.matches(".highscore")) {
    highscores();
  } else if (targetEl.matches("#start")) {
    countdown();
    firstQuestion();
  } else if (targetEl.matches(".answers")) {
    checkAnswer(targetEl);
  } else if (targetEl.matches("#save-score")) {
    save();
  } else if (targetEl.matches("#home")) {
    home();
  }
};

function countdown() {
  timeLeft = 75;

  timeInterval = setInterval(function() {
    if (timeLeft > 0) {
      timerEl.textContent = "Time: " + timeLeft;
      timeLeft--;
    } else {
      timerEl.textContent = '0';
      clearInterval(timeInterval);
      scoreInput();
    }
  }, 1000);
}

function firstQuestion() {
  score = 0;
  questionNumber = 0;
  starterEl.style.display = "none";
  endEl.style.display = "none";
  scoresEl.style.display = "none";
  quizEl.style.display = "block";
  checkerEl.style.display = "block";
  qna();
}

function qna() {
  questionEl.textContent = questions[questionNumber];
  for (var i = 0 ; i < 4 ; i++) {
    ansEl[i] = document.getElementById(i.toString());
    ansEl[i].textContent = answers[questionNumber][i];
  }
}

function checkAnswer(targetEl) {
  var ansId = targetEl.getAttribute("id");
  if (ansId == correct[questionNumber]) {
    score += 10;
    checkedEl.textContent = "Correct!"
  } else {
    score -= 5;
    checkedEl.textContent = "Wrong!"
  }
  if (questionNumber >= 4) {
    scoreInput();
  } else {
    questionNumber++;
    qna();
  }
}

function scoreInput() {
  quizEl.style.display = "none";
  checkerEl.style.display = "none";
  endEl.style.display = "block";
  clearInterval(timeInterval);
  score += timeLeft + 1;
  scoreEl.textContent = "You finished with a score of " + score + "."
}

function highscores() {
  clearInterval(timeInterval);
  timerEl.textContent = "Time: "
  starterEl.style.display = "none";
  quizEl.style.display = "none";
  checkerEl.style.display = "none";
  endEl.style.display = "none";
  scoresEl.style.display = "block";
  for (var i = 0 ; i < scores.length ; i++) {
    var scorecard = [];
    scorecard[i] = document.createElement("p");
    scorecard[i].textContent = scores[i].name + "  ||  " + scores[i].score;
    scoresEl.appendChild(scorecard[i]);
  }
}

function home() {
  scoresEl.style.display = "none";
  starterEl.style.display = "block";
}

function save() {
  endEl.style.display = "none";
  starterEl.style.display = "block";
  var scoreNameInput = document.querySelector("input[name='end-input']").value;
  var newScore = {name:scoreNameInput,score:score};
  scores.push(newScore);
  localStorage.setItem("scores", JSON.stringify(scores));
}

function load() {
  var savedScores = localStorage.getItem("scores");

  if (!savedScores) {
    return false;
  }

  scores = JSON.parse(savedScores);
}

pageContentEl.addEventListener("click", clickHandler);

load();
