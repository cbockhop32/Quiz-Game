const quizQuestion = document.querySelector('.quiz-question'),
    quizAnswers = document.querySelector('.quiz-answers'),
    scoreEl = document.getElementById('score'),
    nextBtn = document.getElementById('btn-next'),
    quizModal = document.querySelector('.quiz-modal'),
    questionNumberEl = document.getElementById('q-number'),
    gameOverModal = document.querySelector('.game-end-modal');



    let questionList = [];
    let score = 0;
    let selectedAnswer;
    let questionTracker = 1;
    let usedQuestions = [];
    let currentQuestion;


class Card {
    constructor(question, choice1, choice2, choice3, choice4, answer) {
        this.question = question,
        this.choice1 = choice1,
        this.choice2 = choice2,
        this.choice3 = choice3,
        this.choice4 = choice4,
        this.answer = answer

    };
}



class UI {
    static displayQuestion(Card) {
        quizQuestion.innerHTML = `${Card.question}`;

        quizAnswers.innerHTML = `
            <button id='btn-answer' class="btn-answer">${Card.choice1}</button>
            <button id='btn-answer' class="btn-answer">${Card.choice2}</button>
            <button id='btn-answer' class="btn-answer">${Card.choice3}</button>
            <button id='btn-answer' class="btn-answer">${Card.choice4}</button>
        `;
    }

    static displayModal(currentAnswer, result) {
        quizModal.innerHTML = `Your answer of ${currentAnswer} is <strong>${result}</strong>`;
        quizModal.classList.add('active');
    }

    static displayGameOverModal(score) {
        gameOverModal.innerHTML = `Game is over bruh. Your score was <strong>${score}</strong>`;
        gameOverModal.classList.add('active');
    }


    static clearModal() {
        quizModal.classList.remove('active');
    }
}


class Game {
    static generateQuestion() {
        const randQ = Math.floor(Math.random() * questionList.length);


        if(questionList == '') {
            UI.displayGameOverModal(score);
            return false;

        } else {
            currentQuestion = questionList[randQ];

            let CurrentAnswer = currentQuestion.answer;
    
            localStorage.setItem('currentAnswer', JSON.stringify(CurrentAnswer));
            
            // console.log(currentQuestion);
            usedQuestions.push(currentQuestion);
            return currentQuestion;



        }
       
    }
    
  
    static loadCards() {
        let newQ1 = new Card('What year was the US formed?', '1954', '1635', '1776', '1818', '1776');
        let newQ2 = new Card('Who is the president of the United States?', 'George Bush', 'Borat Sagdiyev', 'Barak Obama', 'Donald Trump', 'Donald Trump');
        let newQ3 = new Card('What country does Porsche originate from?', 'Germany', 'US', 'Japan', 'Italy', 'Germany');
        let newQ4 = new Card('What is the population of Tokyo?', '1 million', '10 million', '35 million', '5 million', '10 million');
        let newQ5 = new Card('Which company is the largest by market cap?', 'Amazon', 'Tesla', 'Apple', 'Coca Cola', 'Apple');
        let newQ6 = new Card('What is the current year?', '1990', '2001', '1412', '2020', '2020');
        let newQ7 = new Card('What is Troys Breed?', 'Golden Retriever', 'Maltese', 'Doberman', 'Jack Russell', 'Maltese');
        let newQ8 = new Card('How many states are there in the US?', '48', '1', '52', '50', '50');
        let newQ9 = new Card('What is the currency of Canada?', 'Canadian Rupia', 'Canadian Peso', 'Canadian Dollar', 'Canadian Gold', 'Canadian Dollar');
        let newQ10 = new Card('What year did WW2 end?', '1945', '1939', '1970', '1920', '1945');

        let qArr = [newQ1, newQ2, newQ3, newQ4, newQ5, newQ6, newQ7, newQ8, newQ9, newQ10];


        qArr.forEach(item => {
            questionList.push(item);
        });

       
        
    }


    static checkAnswer(answer) {
        const currentAnswer = JSON.parse(localStorage.getItem('currentAnswer'));
        selectedAnswer = answer;
        
        
        if(answer == currentAnswer) {
            score++;
            scoreEl.innerHTML = score;

            // run display modal function

            UI.displayModal(answer, 'Correct')
            


        } else {
            // run display modal function

            UI.displayModal(answer, 'Incorrect')
        }


        Game.deleteUsedQuestion(currentQuestion);
        

    }

    static init() {
        selectedAnswer = '';
        UI.clearModal();
        UI.displayQuestion(Game.generateQuestion());
    }

    static deleteUsedQuestion(currentQuestion) {
        questionList.forEach((item,index) => {
            
            if(item.question == currentQuestion.question) {
                
                questionList.splice(index, 1);
            }
        })
    }

}





// Event Listeners


quizAnswers.addEventListener('click', e => {

if(e.target.classList.contains('btn-answer')) {
    Game.checkAnswer(e.target.innerHTML);
}
});



nextBtn.addEventListener('click', e => {
    if(selectedAnswer != '') {
        Game.init();
        } else {
            alert('Please select an answer');
        }
        questionTracker++;
        questionNumberEl.innerHTML = questionTracker;

    });



Game.loadCards();
Game.init()




