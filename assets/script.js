
// Call on HTML elements
  var quizContainer = document.getElementById("quiz");
  var resultsContainer = document.getElementById("results");
  var submitButton = document.getElementById("submit");
  var myQuestions = [
    {
      question: "What is 10/2?",
      answers: {
        a: "3",
        b: "5",
        c: "115",
      },
      correctAnswer: "b",
    },
    {
      question: "What is 30/3?",
      answers: {
        a: "3",
        b: "5",
        c: "10",
      },
      correctAnswer: "c",
    },
  ];

// create a function that 1. creates questions and 2. shows the results
function generateQuiz(
  myQuestions,
  quizContainer,
  resultsContainer,
  submitButton
) {
  function showQuestions(myQuestions, quizContainer) {
    var output = [];
    var answers;

    for (var i = 0; i < myQuestions.length; i++) {
      answers = [];

      for (letter in myQuestions[i].answers) {
        answers.push(
          "<label>" +
            '<input type="radio" name="question' +
            i +
            '" value="' +
            letter +
            '">' +
            letter +
            ": " +
            myQuestions[i].answers[letter] +
            "</label>"
        );
      }

      output.push(
        '<div class="question">' +
          myQuestions[i].question +
          "</div>" +
          '<div class="answers">' +
          answers.join("") +
          "</div>"
      );
    }

    quizContainer.innerHTML = output.join("");
  }

  showQuestions(myQuestions, quizContainer);
}

  function showResults(myQuestions, quizContainer, resultsContainer) {
    var answerContainers = quizContainer.querySelectorAll(".answers");

    var userAnswer = "";
    var numCorrect = 0;

    for (var i = 0; i < myQuestions.length; i++) {
      userAnswer = (
        answerContainers[i].querySelector(
          "input[name=question" + i + "]:checked"
        ) || {}
      ).value;
      if (userAnswer === myQuestions[i].correctAnswer) {
        numCorrect++;
        answerContainers[i].style.color = "lightgreen";
      } else {
        answerContainers[i].style.color = "red";
      }
    }
    resultsContainer.innerHTML = numCorrect + " out of " + myQuestions.length;
  }


generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

// when user clicks submit, show results
  submitButton.onclick = function () {
    showResults(myQuestions, quizContainer, resultsContainer);
  };

// create a begin Quiz function
function beginQuiz() {
  
}