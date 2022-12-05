// Variables under here
var startBtn = document.getElementById('start-btn');
var nextBtn = document.getElementById('next-btn');
var questionContainerElement = document.getElementById('question-container');
var score = 0;
var secondsLeft = 90;
var timerInterval;
var highscores = document.getElementById('highscore');
var questions = [
  {
    question:"All are example of how users can interact with a webpage EXCEPT?",
    answers: [
      {text: "A webpage looking colorful", correct: true},
      {text: "Submitting a form on a browser", correct: false},
      {text: "Playing media on a browser", correct: false},
      {text: "Accessing weather data in different cities that is displayed on a browser", correct: false}
    ]
  },
  {
    question:"Which is a concatenation operator?",
    answers: [
      {text: "+", correct: true},
      {text: "-", correct: false},
      {text: "=", correct: false},
      {text: "%", correct: false},
    ]
  },
  {
    question:"What are primative types?",
    answers: [
      {text: "Used to store values and variables in javascript", correct: true},
      {text: "Combine numbers to form an expression", correct: false},
      {text: "Used to create variables", correct: false},
      {text: "Allows a developer to test conditions", correct: false},
    ]
  },
  {
    question:"Which operator returns the remainder between two numbers?",
    answers: [
      {text: "Modulus Operators", correct: true},
      {text: "Comparison Operators", correct: false},
      {text: "Arithmetic Operators", correct: false},
      {text: "Expression Operators", correct: false},
    ]
  },
   {
    question:"Which method can be used to remove a final element of an array?",
    answers: [
      {text: ".pop", correct: true},
      {text: ".unshift", correct: false},
      {text: ".concat", correct: false},
      {text: ".splice", correct: false},
    ]
  },
]
let shuffledQuestions, currentQuestionIndex

var questionElement = document.getElementById('question')
var answerBtnsElement = document.getElementById('answer-buttons')


startBtn.addEventListener('click',startGame)
nextBtn.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

// create start game function
function startGame() {
  score = 0;
  secondsLeft = 90;
  startBtn.classList.add('hide');
  setTime();
  shuffledQuestions = questions.sort(() => Math.random() - .5) 
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

// create function for next question
function setNextQuestion() {
  answerBtnsElement.innerHTML=" "
  resetState ()
  if (currentQuestionIndex >= questions.length) {
    gameOver()
    console.log("hello")
  }
  else{
   showQuestion(shuffledQuestions[currentQuestionIndex]) 
  }
  
 
}

function showQuestion(question){
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    var button = document.createElement('button')
    button.innerText = answer.text 
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerBtnsElement.appendChild(button)
  });
}
function resetState() {
  clearStatusClass(document.body)
  nextBtn.classList.add('hide');
  document.getElementById("gameover-box").classList.add('hide');
  while (answerBtnsElement.firstchild) {
    answerBtnsElement.removeChild
    (answerBtnsElement.firstChild)
  }
}

// Function for what happens after anser is selected
function selectAnswer(e) {
  var selectedBtn = e.target
  var correct = selectedBtn.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerBtnsElement.children). forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if(shuffledQuestions.length > currentQuestionIndex + 1) {
    nextBtn.classList.remove('hide')
  } else {
    startBtn.innerText = 'restart'
    startBtn.classList.remove('hide')
  }
  nextBtn.classList.remove('hide')
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if(correct) {
  element.classList.add('correct');
  score = score + 10; 
  } else {
    element.classList.add('wrong');
    console.log("inside wrong");
  secondsLeft = secondsLeft - 5; 
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}
// game over
function gameOver(){
  clearInterval(timerInterval);
  document.getElementById("time").textContent = "00";
  var gameOverContainer = document.getElementById("gameover-box");
  document.getElementById("question-container").classList.add("hide");
  gameOverContainer.classList.remove('hide')
}

// Add Timer
function setTime() {

  timerInterval = setInterval(function() {
    secondsLeft--;
    document.getElementById("time").textContent = secondsLeft;

    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      gameOver();
    }

  }, 1000);
}

// Add the ability to save a score
document.getElementById("initial-submit").addEventListener("click", function(e){
  e.preventDefault();
  var ini = document.getElementById("initial").value;
  document.getElementById("initial").value = "";

  var temp = JSON.parse(localStorage.getItem("details"))|| [];
  temp.push({
    "initial": ini,
    "score": score
  });

  localStorage.setItem("details", JSON.stringify(temp));

  document.getElementById("a").classList.add("hide");
  document.getElementById("initial-list").textContent = "";


  for(var i=0; i<temp.length;i++)
  {
    console.log("inside FOR loop");
    var li = document.createElement("li");
    li.textContent = temp[i].initial +": "+temp[i].score;
    console.log(li);
    document.getElementById("initial-list").appendChild(li);
  }

})

// Scoreboard 
function viewHighscores (){

}