const questions =[
    {
         question: "Which of the following does NOT cause a JavaScript array to mutate?",
         answer: [
            { text: "push()", correct: false},
            { text: "pop()", correct: true},
            { text: "slice()", correct: false},
            { text: "splice()", correct: false},
        ]
    },
    {
         question: "What does display: flex; mainly help you achieve?",
         answer: [
            { text: "Create Animations", correct: true},
            { text: "Create responsive layouts", correct: false},
            { text: "Select elements", correct: false},
            { text: "Import Google fonts", correct: false},
        ]
    },
    {
         question: "Which is the correct way to write an arrow function in JavaScript?",
         answer: [
            { text:"function => myfunc()", correct: true},
            { text: "() => {}", correct: false},
            { text: "() -> {}", correct: false},
            { text: "arrow () {}", correct: false},
        ]
    },
    {
         question: "What does == check in JavaScript?",
         answer: [
            { text: "Value only", correct: false},
            { text: "Type only", correct: true},
            { text: "Value and Type", correct: false},
            { text: "Nothing", correct: false},
        ]
    },
    {
         question: "Which CSS unit is responsive to the user's screen size?",
         answer: [
            { text: "px", correct: false},
            { text: "em", correct: true},
            { text: "vh", correct: false},
            { text: "pt", correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML  = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct =  answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
} 


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const SelectedBtn = e.target;
    const isCorrect = SelectedBtn.dataset.correct === "true";
    if(isCorrect){
        SelectedBtn.classList.add("correct");
        score++;
    }else{
        SelectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = ' You scored ' + score + ' out of ' + questions.length + '!';
    nextButton.innerHTML = "Start Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();
