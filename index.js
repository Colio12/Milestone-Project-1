const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "What is the Capital City of France?",
        choice1: "London",
        choice2: "Berlin",
        choice3: "Paris",
        choice4: "New Delhi",
        answer: 3
    },
    {
        question: "What year did Christopher Colombus discover America?",
        choice1: "1492",
        choice2: "1536",
        choice3: "1457",
        choice4: "1672",
        answer: 1
    },
    {
        question: "What is the largest species of Shark?",
        choice1: "Great White Shark",
        choice2: "Whale Shark",
        choice3: "Basking Shark",
        choice4: "Hammerhead Shark",
        answer: 2
    },
    {
        question: "What American president appears on the $1 bill?",
        choice1: "Abe Lincoln",
        choice2: "Andrew Jackson",
        choice3: "Thomas Jefferson",
        choice4: "George Washington",
        answer: 4
    },
    {
        question: "What is the Capital of Alaska?",
        choice1: "Juneau",
        choice2: "Anchorage",
        choice3: "Fairbanks",
        choice4: "Ketchikan",
        answer: 1
    },
    {
        question: "What is the world's largest ocean?",
        choice1: "Atlantic",
        choice2: "Indian",
        choice3: "Pacific",
        choice4: "Artic",
        answer: 3
    },
    {
        question: "How many bones are in the human body?",
        choice1: "103",
        choice2: "365",
        choice3: "206",
        choice4: "112",
        answer: 3
    },
    {
        question: "What is the body's largest organ?",
        choice1: "Skin",
        choice2: "Heart",
        choice3: "Lungs",
        choice4: "Liver",
        answer: 1
    },
    {
        question: "What year did World War II end in?",
        choice1: "1963",
        choice2: "1939",
        choice3: "1945",
        choice4: "1951",
        answer: 3
    },
    {
        question: "Which country gifted the United States the Statue of Liberty Monument?",
        choice1: "Germany",
        choice2: "Italy",
        choice3: "France",
        choice4: "Canada",
        answer: 3
    },
    {
        question: "How many weeks are in a year?",
        choice1: "36",
        choice2: "52",
        choice3: "65",
        choice4: "24",
        answer: 2
    },
    {
        question: "What is the chemical symbol for Iron?",
        choice1: "K",
        choice2: "Na",
        choice3: "Ir",
        choice4: "Fe",
        answer: 4
    },
    {
        question: "What is the 4th planet from the sun?",
        choice1: "Mars",
        choice2: "Earth",
        choice3: "Jupiter",
        choice4: "Venus",
        answer: 1
    },
    {
        question: "What is the shortcut for copy on most computers?",
        choice1: "Ctrl + V",
        choice2: "Ctrl + P",
        choice3: "Alt + C",
        choice4: "Ctrl + C",
        answer: 4
    },
    {
        question: "Which Chess piece can only move diagonally?",
        choice1: "Knight",
        choice2: "Bishop",
        choice3: "Queen",
        choice4: "Pawn",
        answer: 2
    },
    {
        question: "What part of the atom has no electric charge?",
        choice1: "Proton",
        choice2: "Electron",
        choice3: "Neutron",
        choice4: "Neucleus",
        answer: 3
    },
    {
        question: "In which US city is Broadway located?",
        choice1: "New York City",
        choice2: "Los Angeles",
        choice3: "Miami",
        choice4: "Baltimore",
        answer: 1
    },
    {
        question: "What US city is known as The Windy City?",
        choice1: "New Orleans",
        choice2: "San Diego",
        choice3: "Chicago",
        choice4: "Kansas City",
        answer: 3
    },
    {
        question: "How many players should each team have on the field of a soccer game?",
        choice1: "22",
        choice2: "15",
        choice3: "8",
        choice4: "11",
        answer: 4
    },
    {
        question: "What name does deer meat go by?",
        choice1: "Beef",
        choice2: "Venison",
        choice3: "Pork",
        choice4: "Poultry",
        answer: 2
    },
]

const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {

        if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
            localStorage.setItem('mostRecentScore', score);
            return window.location.assign("/end.html");
        }
    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
        currentQuestion = availableQuestions[questionIndex];
        question.innerText = currentQuestion.question;

        choices.forEach( choice => {
            const number = choice.dataset['number'];
            choice.innerText = currentQuestion['choice' + number];
        });

        availableQuestions.splice(questionIndex, 1);
        acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        
        const classToApply = 
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        
            if(classToApply === 'correct') {
                incrementScore(CORRECT_BONUS);
            }

            selectedChoice.parentElement.classList.add(classToApply);
            setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
            }, 1000);
        
        
    });
});

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
}

startGame();