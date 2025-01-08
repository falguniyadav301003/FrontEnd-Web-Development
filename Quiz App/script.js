const questions = [
    {
        question : "Which is the largest animal in the world ?",
        answer: [
            { text: "Shark",correct: false},
            { text: "Whale",correct: true},
            { text: "Elephant",correct: false},
            { text: "Giraffe",correct: false},
        ]
    },
    {
        question : "Which is the smallest country in the world ?",
        answer: [
            { text: "Vatican City",correct: true},
            { text: "Bhutan",correct: false},
            { text: "Nepal",correct: false},
            { text: "Sri Lanka",correct: false},
        ]   
    },
    {
        question : "Which is the largest desert in the world ?",
        answer: [
            { text: "Kalahari",correct: false},
            { text: "Gobi",correct: false},
            { text: "Sahara",correct: false},
            { text: "Antarctica",correct: true},
        ]
    },
    {
    question : "Which is the Smallest continent in the world ?",
    answer: [
        { text: "Asia",correct: false},
        { text: "Australia",correct: true},
        { text: "Arctic",correct: false},
        { text: "Africa",correct: false},
    ]
}
];

const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer-button");
const nextElement = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextElement.innerHTML = "Next"; 
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerElement.appendChild(button); 
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextElement.style.display = "none";
    while (answerElement.firstChild) {
        answerElement.removeChild(answerElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++; 
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true; 
    });
    nextElement.style.display = "block"; 
}


function showScrore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextElement.innerHTML= "Play Again";
    nextElement.style.display= "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else{
        showScrore();
    }
};

nextElement.addEventListener("click",() =>{
    if(currentQuestionIndex < questions.length){
         handleNextButton();
    }else {
        startQuiz();
    }
});

startQuiz();
