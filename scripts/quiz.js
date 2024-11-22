// const firebaseConfig = {

//   apiKey: "AIzaSyCm_6Qb5i7fr7zi-gCVa2v-TCu9IH4NfZA",

//   authDomain: "quiz-app-9d5d5.firebaseapp.com",

//   projectId: "quiz-app-9d5d5",

//   storageBucket: "quiz-app-9d5d5.appspot.com",

//   messagingSenderId: "273017985352",

//   appId: "1:273017985352:web:c8033aa862d6384b093b7d"

// };
// firebase.initializeApp(firebaseConfig);
// const user = firebase.auth().currentUser;

// firebase.auth().onAuthStateChanged((user) => {
//   // const newScore = score;
//   if (user) {
//     let userId = user.uid;
//     loadUserScore(userId);
//     loadUserQuizNumber(userId);
//     let displayName = user.displayName;
//     document.querySelector('.username').innerText =  displayName;
//     // updateUserScore(userId, newScore);
//   }
// });
// References 
const startBtn = document.querySelector('.js-start-btn');
let countOfQuestion = document.querySelector('.js-rounds-nums');
let questionElement = document.querySelector('.js-question-text');
const ansTime = document.querySelector('.js-ans-time');
const countDiv = document.querySelector('.js-count-down');
let quizContainer = document.querySelector('.js-quiz-container');
const AnswerDiv = document.querySelector('.js-answerDiv');
const submitBtn = document.querySelector('.js-submit-btn');
const nextButton = document.querySelector('.js-next-btn');
const button = document.querySelector('.answer-div');
const roundAnswer = document.querySelectorAll('#round-div');
const yourAnsDiv = document.querySelector('.your-ans-div');
const userSelectedOption = document.querySelector('.your-ans-selected');
const timeOutDiv = document.querySelector('.js-time-out');
const IncorrectDiv = document.querySelector('.js-incorrect-div');
const correctDiv = document.querySelector('.js-correct-div');
const congratsMsgDiv = document.querySelector('.js-congrats-msg-div');
const tryAgainBtn = document.querySelector('.try-again-btn');
const Question = document.querySelector('.js-question')


// find why the question are not showing 
function displayQuiz() {
  const quizQuestion = document.querySelector('.js-quiz-question');
  quizQuestion.classList.add('show-ques');
  const roundAnswer = document.querySelectorAll('.js-rounds-Answer');
  roundAnswer.forEach((roundAns) => {
    roundAns.classList.add('show-ques');
  });
  startBtn.classList.add('hide');
  console.log('clicked')
  // quizCreator();
  displayQuestion()
}

startBtn.addEventListener('click', displayQuiz);

const quizQuestions = [
  {
    id: "0",
    question: "Which is the most widely spoken language in the world?",
    options: ["Spanish", "Mandarin", "English", "German"],
    answer: "Mandarin",
    // answer: 1,
  }, 
  {
    id: "1",
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris"
    // answer: 0
  }, 
  {
    id: "2",
    question: "Who painted the Mona Lisa?",
    options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
    answer: "Leonardo da Vinci"
    // answer: 1
  }, 
  {
    id: "3",
    question: "What is the only continent in the world without a desert?",
    options: ["North America", "Asia", "Africa", "Europe"],
    answer: "Europe",
    // answer: 3,
  }, 
  {
    id: "4",
    question: "Who invented Computer?",
    options: ["Charles Babbage", "Henry Luce", "Henry Babbage", "Charles Luce"],
    answer: "Charles Babbage",
    // answer: 0,
  },
  {
    id: "5",
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Jupiter"
  }
]
let currentQuestionIndex = 0; 
let questionTimeOut;

function displayQuestion() {
  quizQuestions.sort(() => Math.random() - 0.5);
  quizQuestions.forEach(question => {
    question.options.sort(() => Math.random() - 0.5)
  })
  let timeLeft = 20;
  questionTimeOut = setInterval(() => {
    countDiv.textContent = timeLeft;
    timeLeft--;
    if(timeLeft < 0){
      clearInterval(questionTimeOut);
      ShowTimeOut();
    }else if(timeLeft < 5){
      ansTime.style.color = "rgba(210, 0, 0, 1)";
      countDiv.style.color = "rgba(210, 0, 0, 1)";
    }
  }, 1000);
  // countDiv.textContent = questionTimeOut;
  let currentQuestion = quizQuestions[currentQuestionIndex];
  // countOfQuestion.innerHTML = `${currentQuestionIndex + 1}/${quizQuestions.length}`;
  questionElement.textContent = currentQuestion.question;

  const optionsHtml = currentQuestion.options.map((option, index) => {
    return `
      <button class="answer-div">
        <span class="checkbox-div">
          <input type="radio" name="quizOption" value="${option}" id="option${index + 1}" hidden/>
          <input type="checkbox" id="myCheckbox${index + 1}" class="checkbox">
          <label for="option${index + 1}"></label>
        </span>
        <div class="Answers-div js-Answer-div js-checked-click">
          <div class="answer-option">
            ${String.fromCharCode(65 + index)}. <span class="answer">${option}</span>
          </div>
        </div>
      </button>
    `;
  }).join('');
  submitBtn.style.background = "";
  submitBtn.style.color = "";
  ansTime.style.color = "";
  countDiv.style.color = "";

  AnswerDiv.innerHTML = optionsHtml;
  checkedBtn();
}
function quizCreator(){
  quizQuestions.sort(() => Math.random() - 0.5);
  for(let i of quizQuestions){
    // randomly sort options
    i.options.sort(() => Math.random() - 0.5);

    //question number
    countOfQuestion.innerHTML = 1 + '/' + quizQuestions.length;

    //questions
    questionElement.textContent = i.question;

    //options
    const html = `
      <button class="answer-div">
        <span class="checkbox-div">
          <input type="radio" name="quizOption" value="${i.options[0]}" id="option1" hidden/>
          <input type="checkbox" id="myCheckbox1" class="checkbox">
          <label for="option1"></label>
        </span>

        <div class="Answers-div js-Answer-div js-checked-click">
          <div class="answer-option">
            A. <span class="answer">${i.options[0]}</span>
          </div>
        </div>
      </button>

      <button class="answer-div">
        <span class="checkbox-div">
          <input type="radio" name="quizOption" value="${i.options[1]}" id="option2" hidden/>
          <input type="checkbox" id="myCheckbox2" class="checkbox">
          <label for="option2"></label>
        </span>

        <div class="Answers-div js-Answer-div js-checked-click">
          <div class="answer-option">
            B. <span class="answer">${i.options[1]}</span>
          </div>
        </div>
      </button>

      <button class="answer-div">
        <span class="checkbox-div">
          <input type="radio" name="quizOption" value="${i.options[2]}" id="option3" hidden/>
          <input type="checkbox" id="myCheckbox3" class="checkbox">
          <label for="option3"></label>
        </span>

        <div class="Answers-div js-Answer-div js-checked-click">
          <div class="answer-option">
            C. <span class="answer">${i.options[2]}</span>
          </div>
        </div>
      </button>

      <button class="answer-div">
        <span class="checkbox-div">
          <input type="radio" name="quizOption" value="${i.options[3]}" id="option4" hidden/>
          <input type="checkbox" id="myCheckbox4" class="checkbox">
          <label for="option4"></label>
        </span>

        <div class="Answers-div js-Answer-div js-checked-click">
          <div class="answer-option">
            D. <span class="answer">${i.options[3]}</span>
          </div>
        </div>
      </button>
    `
    AnswerDiv.innerHTML = html;
  }
  checkedBtn();
}

function checkedBtn(){
  const optionBtn = document.querySelectorAll('.js-checked-click');
  const checkboxes = document.querySelectorAll('.checkbox');
  const radioButtons = document.querySelectorAll('input[type="radio"]');
  optionBtn.forEach((option, btnIndex) => {
    option.addEventListener('click', () =>{
      checkboxes[btnIndex].checked = true;
      radioButtons[btnIndex].checked = true;
      checkboxes.forEach((checkbox, checkboxInedex) => {
        checkbox.checked = true;
        submitBtn.style.background = "rgba(2, 5, 211, 1)";
        submitBtn.style.color = "rgba(240,240,255,1)";
        if(btnIndex !==  checkboxInedex){
          checkbox.checked = false;
        }
      })
    })
  })
  radioButtons.forEach((radio, index) => {
    radio.addEventListener('change', () => {
      checkboxes.forEach((checkbox, checkboxIndex) => {
        if (index === checkboxIndex) {
          checkbox.checked = true;
          submitBtn.style.background = "rgba(2, 5, 211, 1)";
          submitBtn.style.color = "rgba(240,240,255,1)";
        } else {
          checkbox.checked = false;
        }
      });
    });
  });
} 


let score = 50;
function updateUserScore(userId, newScore){
  const userDocRef = firebase.firestore().collection('users').doc(userId);
  userDocRef.update({
    score: newScore
  }) 
  .then(() => {
    console.log('User score updated successfully');
  })
  .catch((error) => {
    console.error('Error updating user score:', error);
  });
}


// work on the NEXT button to display the updates 
function updateScoreWithNewValue() {
  const user = firebase.auth().currentUser;
  if (user) {
    const userId = user.uid;
    const userDocRef = firebase.firestore().collection('users').doc(userId);
    userDocRef.get()
    .then((doc) => {
      if(doc.exists){
        const userData = doc.data();
        const userScore = userData.score;
        const newScore = userScore + 5;
        updateUserScore(userId, newScore);
        document.querySelector('.score').innerHTML = newScore;
      }
    })
    loadUserScore(userId);
  } else {
    console.log('User is not signed in.');
  }
}
function loadUserScore(userId){
  const userDocRef = firebase.firestore().collection('users').doc(userId);

  userDocRef.onSnapshot((doc) => {
    if (doc.exists){
      const userData = doc.data();
      if(userData.score !== undefined){
        const userScore = userData.score;
        document.querySelector('.score').innerHTML = userScore;
      }else{
        console.log('user score is undefined')
      }
    }else{
      console.log('user does not exist')
    }
  })
}
function updateUserQuizNumberWithNewValue() {
  const user = firebase.auth().currentUser;
  if (user) {
    const userId = user.uid;
    const userDocRef = firebase.firestore().collection('users').doc(userId);
    userDocRef.get()
    .then((doc) => {
      if(doc.exists){
        const userData = doc.data();
        const userQuizNumber = userData.quizNumber;
        const userQuizProgress = userData.quizProgress;
        const newQuizNumber = userQuizNumber + 1;
        updateUserQuizNumber(userId, newQuizNumber)
        updateUserQuizProgress(userId, userQuizProgress)
        // document.querySelector('.score').innerHTML = newScore;
      }
    })
    loadUserQuizNumber(userId)  
  } else {
    console.log('User is not signed in.');
  }
}
function updateUserQuizNumber(userId, quizNumber){
  const userDocRef = firebase.firestore().collection('users').doc(userId);
  userDocRef.update({
    quizNumber: quizNumber
  })
  // userDocRef.update({
  //   ['quiz' + quizNumber]: 'rgba(23, 219, 78, 1)'
  // })
  .then(() => {
    console.log('User quiz number updated:', quizNumber);

    for(let i = 1; i <= 5; i++ ){
      const quizDiv = document.getElementById(`quiz${i}`);
      if(i <= quizNumber){
        quizDiv.style.backgroundColor = 'rgba(23, 219, 78, 1)';
      }else{
        quizDiv.style.backgroundColor = '';
      }
    }
  })
  .catch((error) => {
    console.error('Error updating user quiz number:', error);
  });
}
function loadUserQuizNumber(userId){
  const userDocRef = firebase.firestore().collection('users').doc(userId);

  userDocRef.onSnapshot((doc) => {
    if (doc.exists){
      const userData = doc.data();
      if(userData.quizNumber!== undefined){
        const userQuizNumber = userData.quizNumber;
        countOfQuestion.innerHTML = `${userQuizNumber}/5`;
        // console.log('User quiz number:', userQuizNumber);
      }else{
        console.log('user score is undefined')
      }
      // console.log(userData)
    }else{
      console.log('user does not exist')
    }
  })
  loadUserQuizProgress(userId);
}

function updateUserQuizProgress(userId, quizProgress){
  const userDocRef = firebase.firestore().collection('users').doc(userId);
  userDocRef.update({
    quizProgress: quizProgress
  }) 
  .then(() => {
    console.log('User quiz progress updated:', quizProgress);
  })
  .catch((error) => {
    console.error('Error updating user quiz progress:', error);
  });
}
function updateUserQuizProgressWithNewValue() {
  const user = firebase.auth().currentUser;
  if (user) {
    const userId = user.uid;
    const quizProgressDiv  = document.querySelectorAll('.js-rounds-Answer');

    quizProgressDiv.forEach((eachDiv) => {
      eachDiv.addEventListener('click', () => {
        const quizNumber = eachDiv.id.substring(quizNumber);
        const currentColor = eachDiv.style.backgroundColor;

        let newColor;
        if(currentColor === 'rgba(255,255,255,1)'){
          newColor = 'rgb(23, 219, 78)';
        }else{
          newColor = 'rgba(255,255,255,1)';

        } 
        eachDiv.style.backgroundColor = newColor;
        updateUserQuizProgress(userId, newColor)
      })
    })
    const userQuizProgress = {
      quiz1: {
        number: 1,
        backgroundColor: 'rgba(23, 219, 78, 1)'
      },
      quiz2: {
        number: 2,
        backgroundColor: 'rgba(23, 219, 78, 1)'
      },
      quiz3: {
        number: 3,
        backgroundColor: 'rgba(23, 219, 78, 1)'
      },
      quiz4: {
        number: 4,
        backgroundColor: 'rgba(23, 219, 78, 1)'
      },
      quiz5: {
        number: 5,
        backgroundColor: 'rgba(23, 219, 78, 1)'
      },
    };
    updateUserQuizProgress(userId, userQuizProgress);
    loadUserScore(userId);
  } else {
    console.log('User is not signed in.');
  }
}
function loadUserQuizProgress(userId) {
  const userDocRef = firebase.firestore().collection('users').doc(userId);

  userDocRef.onSnapshot((doc) => {
    if (doc.exists) {
      const userData = doc.data();
      const userQuizProgress = userData.quizProgress;
      // console.log('User quiz progress:', userQuizProgress);
      for (let quizId in userQuizProgress) {
        const quizDiv = document.getElementById([quizId]);
        const backgroundColor = userQuizProgress[quizId].backgroundColor;
        quizDiv.style.backgroundColor = backgroundColor;
      }
    } else {
      console.log('User document does not exist');
    }
  });
}


submitBtn.addEventListener('click', () => {
  const selectedOption = document.querySelector('input[name="quizOption"]:checked');
  if (selectedOption) {
    const selectedValue = selectedOption.value;
     checkAnswer(quizQuestions[currentQuestionIndex].question, selectedValue);
  } else {
    console.log("Please select an option!");
  }
});
nextButton.addEventListener('click', () => {
  const selectedOption = document.querySelector('input[name="quizOption"]:checked');
  if (selectedOption) {
    const selectedValue = selectedOption.value;
     const isCorrect = checkAnswer(quizQuestions[currentQuestionIndex].question, selectedValue);
    if(isCorrect){
      score += 5;
      document.querySelector('.score').innerHTML = score;
      // updateScoreWithNewValue();
      // updateUserQuizNumberWithNewValue();
      // updateUserQuizProgressWithNewValue()
      countOfQuestion.innerHTML = `${currentQuestionIndex+ 1}/5`;
      roundAnswer[currentQuestionIndex].style.backgroundColor = 'rgba(23, 219, 78, 1)';
    }
  }
  currentQuestionIndex++; 
    if (currentQuestionIndex < 5){      
      displayQuestion(); 
      nextButton.style.display = "none";
      yourAnsDiv.style.display = 'none';
      AnswerDiv.style.display = 'block';
      submitBtn.style.display = 'block';
    } else {
      tryAgainBtn.style.display = "none";
      questionElement.style.display = "none";
      Question.style.display = "none";
      yourAnsDiv.style.display = "none";
      IncorrectDiv.style.display = "none";
      nextButton.style.display = "none";
      correctDiv.style.display = "block"
      congratsMsgDiv.style.display = "block"
      correctDiv.style.display = 'none';
      // alert("Quiz completed!");
    }
})
tryAgainBtn.addEventListener('click', () => {
 if(currentQuestionIndex < 5 - 1){
  quizQuestions.sort(() => Math.random() - 0.5);
  nextButton.style.display = "none";
  yourAnsDiv.style.display = 'none';
  AnswerDiv.style.display = 'block';
  submitBtn.style.display = 'block';
  tryAgainBtn.style.display = "none";
  roundAnswer.forEach((ansDiv) => {
    ansDiv.style.background = '';
  })
  currentQuestionIndex = 0;
  countOfQuestion.innerHTML = `${currentQuestionIndex = 0}/5`;
  displayQuestion(); 
 }else{
  currentQuestionIndex = 0;
  displayQuestion(); 
 }

})

function checkAnswer(question, userOption) {
  userSelectedOption.textContent = userOption;
  const findQuestion = quizQuestions.find(item => item.question === question);
  clearInterval(questionTimeOut);
  if (findQuestion) {
    const correctAnswer = findQuestion.answer;
    if (userOption == correctAnswer) {
      AnswerDiv.style.display = 'none';
      yourAnsDiv.style.display = 'block';
      IncorrectDiv.style.display = 'none';
      timeOutDiv.style.display = 'none';
      congratsMsgDiv.style.display = 'none';
      correctDiv.style.display = 'block';
      submitBtn.style.display = 'none';
      nextButton.style.display = "flex";
      return true;
    } else {
      AnswerDiv.style.display = 'none';
      yourAnsDiv.style.display = 'block';
      timeOutDiv.style.display = 'none';
      congratsMsgDiv.style.display = 'none';
      IncorrectDiv.style.display = 'block';
      correctDiv.style.display = 'none';
      submitBtn.style.display = 'none';
      tryAgainBtn.style.display = "block";
      return false;
    }
  }
  return false;
}
function ShowTimeOut(){
  userSelectedOption.textContent = 'Unanswered'
  AnswerDiv.style.display = 'none';
  yourAnsDiv.style.display = 'block';
  IncorrectDiv.style.display = 'none';
  timeOutDiv.style.display = 'flex';
  correctDiv.style.display = 'none';
  congratsMsgDiv.style.display = 'none';
  submitBtn.style.display = 'none';
  nextButton.style.display = "none";
  tryAgainBtn.style.display = "block";
}