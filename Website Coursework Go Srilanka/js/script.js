const questionNumber = document.querySelector(".Question-number-Box");
const questionBox = document.querySelector(".questionBox");
const optionBox = document.querySelector(".optionBox");
const container = document.querySelector(".container")
const homeBox= document.querySelector(".home-box")
const quizBox = document.querySelector(".quiz-box")
const resultBox = document.querySelector(".result-box")
const errorMessage = document.querySelector(".error-not-select")

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

const timerBox = document.querySelector(".timerBox span");
let totalTime = 60;
let sec = 0;
let counter = 0;
let timer = null;

let isAnswerQuestion = false;

function startTimer() {
    clearInterval(timer); // clear any existing timer
    counter = 0;
    timer = setInterval(function() {
      counter++;
      sec = totalTime - counter;
      timerBox.textContent = sec + "s";
      if (counter === totalTime) {
        clearInterval(timer);
        quizOver();
      }
    }, 1000);
    
  }
   

// push the questions into availableQuestions Array
function setAvailableQuestions(){
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        availableQuestions.push(quiz[i])
    }
}
//set question number and question and options
function getNewQuestion(){
    // set question number
    questionNumber.innerHTML= "Question " + (questionCounter + 1) + " of " + quiz.length;
    
    //set question text
    //get random question
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    currentQuestion = questionIndex;
    questionBox.innerHTML= currentQuestion.question;
    //get the position of 'questionIndex' from the availableQuestion Array;
    const index1= availableQuestions.indexOf(questionIndex);
    //remove the 'questionIndex' from the avalibleQuestion Array, so that the question does not repeat
    availableQuestions.splice(index1,1);
    //console.log(questionIndex)
    //console.log(availableQuestions)
    const optionLen = currentQuestion.options.length
    //push option into availableOptions Array
    for(let i=0; i<optionLen; i++){
        availableOptions.push(i)
    }

    optionBox.innerHTML = '';
    let animationDelay = 0.15;
    //create option in html
    for(let i=0; i<optionLen; i++){
        //random option
        const optonIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        //get the position of 'optonIndex' from the avalibleOptions
        const index2 = availableOptions.indexOf(optonIndex);
        // removw the 'optonIndex' from the avalibleOptions, so that the option does not repeat
        availableOptions.splice(index2,1);
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optonIndex];
        option.id = optonIndex;
        option.style.animationDelay =animationDelay + 's';
        animationDelay = animationDelay + 0.15;
        option.className = "option";
        optionBox.appendChild(option)
        option.setAttribute("onclick","getResult(this)");
    }
    
    questionCounter++
    
}

//get the result of current attempt question
function getResult(element){
    isAnswerQuestion = true;
    errorMessage.classList.add("hide");
    console.log('getResutl');
    const id = parseInt(element.id);
    // get the answer by comparing the id of clickedoption
    if(id === currentQuestion.answer){
        // set the green color to the correct option
        element.classList.add("correct");
        correctAnswers++;
        console.log("correct:"+correctAnswers)
    }
    else{
        // set the red color to the incorrect option
        element.classList.add("wrong");
        
        // if the answer is incorrect the show the correct option by adding green color the correct option 
        const optionLen = optionBox.children.length;
        for(let i=0; i<optionLen; i++){
            if(parseInt(optionBox.children[i].id) === currentQuestion.answer){
                optionBox.children[i].classList.add("correct")
            }
        }
    }
   attempt++;
   unclickableOpctions(); 

}

// make all the options unclickable oncce the user select a option (RESTRICT THE USER TO CHANGR THE OPTION AGAIN)
function unclickableOpctions(){
    const optionLen = optionBox.children.length;
    for(let i=0 ; i<optionLen; i++){
        optionBox.children[i].classList.add("already-answered");


    }

}

function showNext(){
    if(isAnswerQuestion) {
        isAnswerQuestion = false;
        errorMessage.classList.add("hide");
        if (questionCounter === quiz.length) {
            console.log("quiz over");
            quizOver();

        } else {
            getNewQuestion();
        }
    }else{
        errorMessage.classList.remove("hide");
    }
}
  

function quizOver(){
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");
    quizResult();
    clearInterval(timer);

}
//get the quiz result
function quizResult(){
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-Correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-Wrong").innerHTML = attempt - correctAnswers;
    resultBox.querySelector(".totale-score").innerHTML = correctAnswers * 10;
    resultBox.querySelector(".time").innerHTML = totalTime - parseInt(timerBox.innerHTML) + "s";
    const grade = (correctAnswers/quiz.length)*100;
    resultBox.querySelector(".grade").innerHTML = grade.toFixed() + "%";
    const messageBox = document.querySelector('.message');
    if (grade >50) {
        messageBox.innerHTML = 'Excellent mark! keep it up the good work.';
        messageBox.classList.add('pass');
        messageBox.classList.remove('fail');
    }else {
        messageBox.innerHTML = 'Good effort! but try again.';
        messageBox.classList.add('fail');
        messageBox.classList.remove('pass');
    }
    
    

}


function resetQuiz(){
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;

}


function tryAgainQuiz(){
    //hide the resultBox
    resultBox.classList.add("hide");
    //show the quiz
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
    startTimer();



}

// #### STARTING POINT ####

function startQuiz(){

    //hide home box
    homeBox.classList.add("hide");
    //show quiz Box
    quizBox.classList.remove("hide");
    //start timer countdow
    startTimer();
    //first we will set all questions in availableQuestions Array
    setAvailableQuestions();
    //second we will call getNewQuestion(); function
    getNewQuestion();



}
