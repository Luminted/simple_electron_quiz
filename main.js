const fs = require('fs');

const quizMapping = JSON.parse(fs.readFileSync('./quiz.json', 'utf8'));
const quizPicture = document.querySelector('.quiz-picture');
const quizForm = document.querySelector('.quiz-form');
const submitButton = document.querySelector('.submit-button');
var correctAnswer;

let init = function () {
    submitButton.addEventListener('click', (ev) => submitAnswer(ev));
    let currentQuizEntry = generateQuiz();
    renderQuiz(currentQuizEntry);
    
}

let generateQuiz = function(){
    let quizKeys = Object.keys(quizMapping);
    let rnd = Math.floor(Math.random() * quizKeys.length);
    let randomEntry = quizKeys[rnd];
    correctAnswer = randomEntry;
    return randomEntry;
}

let renderQuiz = function(quizEntry){
    quizPicture.src = './pictures/' + quizMapping[quizEntry];
    var maxAnswers = Object.keys(quizMapping).length < 4 ? Object.keys(quizMapping).length : 4;
    let rnd = Math.floor(Math.random() * maxAnswers);
    for(let i = 0; i < maxAnswers; i++){
        let answerInput = document.createElement('input');
        let answerlabel = document.createElement('label');
        answerInput.type='radio';
        answerInput.name='answer';
        answerInput.id='a' + i + 1;

        if(i === rnd){
            answerInput.value = quizEntry;
            answerlabel.innerText = quizEntry;
            answerlabel.htmlFor = 'a' + i + 1;
        }
        else{
            let randomAnswer = Object.keys(quizMapping)[Math.floor(Math.random() * Object.keys(quizMapping).length)];
            answerInput.value = randomAnswer;
            answerlabel.innerText = randomAnswer;
            answerlabel.htmlFor = 'a' + i + 1;
        }
        quizForm.appendChild(answerInput);
        quizForm.appendChild(answerlabel);
    }

}

correct = function(){
    renderQuiz(generateQuiz());
}

incorrect = function(){
    window.alert('rossz válasz! Jó válasz: ' + correctAnswer );
    renderQuiz(generateQuiz());
}

let submitAnswer = function (ev) {
    if(document.querySelector('input[name=answer]:checked') !== null && document.querySelector('input[name=answer]:checked').value === correctAnswer){
        correct();
    }else{
        incorrect();
    }
}

//init();