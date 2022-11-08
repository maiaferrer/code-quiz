// Variables under here
var startBtn = document.getElementById('start-btn')
var nextBtn = document.getElementById('next-btn')
var questionContainerElement = document.getElementById('question-container')
var questions = [
  {
    question:"this would be a question?",
    answers: [
      {text: "this is correct", correct: true},
      {text: "this is wrong", correct: false}
    ]
  }
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
  startBtn.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5) 
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

// create function for next question
function setNextQuestion() {
  resetState ()
  showQuestion(shuffledQuestions[currentQuestionIndex])
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
  nextBtn.classList.add('hide')
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
  }
  nextBtn.classList.remove('hide')
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if(correct) {
  element.classList.add('correct') 
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

// Add Timer


// Add the ability to save a score


// Scoreboard 