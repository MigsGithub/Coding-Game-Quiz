//Time and Scores 

let timeEl = document.querySelector("p.time");
let secondsLeft = 100;
let scoreEl = document.querySelector("#score");


//Front page and questions 

const frontpageEL = document.querySelector("#frontpage");

const questionsEl = document.querySelector("#questions");

let questionEl = document.querySelector("#question");

let questionCount = 0;

const correctIncorrectEl = document.querySelector("#correctIncorrect");

//Final and scores

const finishedEl = document.querySelector("#finished");

let initialsInput = document.querySelector("#initials");

const highscoresEl = document.querySelector("#highscores");

let scoresEl = document.querySelector("#scores");

let scores = [];

//Btns

const goBtn = document.querySelector("#go");

const ansBtn = document.querySelectorAll("button.ansBtn")

const ans1Btn = document.querySelector("#answer1");

const ans2Btn = document.querySelector("#answer2");

const ans3Btn = document.querySelector("#answer3");

const ans4Btn = document.querySelector("#answer4");

const submitBtn = document.querySelector("#submit");

const goAgainBtn = document.querySelector("#goAgain");

const clearScrBtn = document.querySelector("#clearscores");


goBtn.addEventListener("click", startQuiz);


//    Questions

const questions = [ 
    {
        question: "HTML stands for:",
        answers: ["1. Hyper Text Makeup Language", "2. Happy Text More Laughs", "3. Help To Make Live", "4. Hypertext Markup Language"],
        correctAnswer: "3"
    },

    {
        question: "CSS stands for:",
        answers: ["1. Cascading Style Sheets", "2. Cool Source Sheets", "3. Cat Stuffs", "4. Color Sheets Style"],
        correctAnswer: "0"
    },

    {
        question: "How much does it cost to add JavaScript to your webpage?:",
        answers: ["1. Zero $, JavaScript is Free to use", "2. 10$ a month", "3. 100$ but it's a one time fee", "4. JavaSript comes with the purchase of your computer"],
        correctAnswer: "0"
    },

    {
        question: "Python is a ___:",
        answers: ["1. Programming Language", "2. Car", "3. Type of Cellular Device", "4. City"],
        correctAnswer: "0"
    },

    {
        question: "With HTML you can create your own:",
        answers: ["1. Cellular Device", "2. Game", "3. House", "4. Webpage"],
        correctAnswer: "3"
    }
];


// Functions

// timer
function setTime() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = `Score/Time:${secondsLeft}s`;

        if (secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            finishedEl.style.display = "block";
            scoreEl.textContent = secondsLeft;
        }
    }, 1000);
}

// Quiz Timer 

function startQuiz() {
    frontpageEL.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;

    setTime();
    setQuestion(questionCount);
}

function setQuestion(id) {
    if (id < questions.length) {
        questionEl.textContent = questions[id].question;
        ans1Btn.textContent = questions[id].answers[0];
        ans2Btn.textContent = questions[id].answers[1];
        ans3Btn.textContent = questions[id].answers[2];
        ans4Btn.textContent = questions[id].answers[3];
    }
}


ansBtn.forEach(item => {
    item.addEventListener('click', checkAnswer);
});


function checkAnswer(event) {
    event.preventDefault();

    correctIncorrectEl.style.display = "block";
    let p = document.createElement("p");
    correctIncorrectEl.appendChild(p);

    setTimeout(function () {
        p.style.display = 'none';
    }, 1000);


    if (questions[questionCount].correctAnswer === event.target.value) {
        p.textContent = "Correct!";
    } else if (questions[questionCount].correctAnswer !== event.target.value) {
        secondsLeft = secondsLeft - 25;
        p.textContent = "Wrong!";
    }

    if (questionCount < questions.length) {
        questionCount++;
    }

    setQuestion(questionCount);
}

function addScore(event) {
    event.preventDefault();

    finishedEl.style.display = "none";
    highscoresEl.style.display = "block";
    let inits = initialsInput.value.toUpperCase();
    scores.push({ initials: inits, score: secondsLeft });

    
    scores = scores.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        } else {
          return -1;
        }
      });
    
    scoresEl.innerHTML="";
    for (let i = 0; i < scores.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scores[i].initials}: ${scores[i].score}`;
        scoresEl.append(li);
    }

    
}


function storeScores() {
    localStorage.setItem("scores");
}



function clearScores() {
    localStorage.clear();
    scoresEl.innerHTML="";
}

clearScrBtn.addEventListener("click", clearScores);






submitBtn.addEventListener("click", addScore);

goAgainBtn.addEventListener("click", function () {
    frontpageEL.style.display = "block";
    secondsLeft = 100;
    timeEl.textContent = `Score/Time:${secondsLeft}s`;
});

