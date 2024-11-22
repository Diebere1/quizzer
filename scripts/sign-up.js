const firebaseConfig = {

  apiKey: "AIzaSyCm_6Qb5i7fr7zi-gCVa2v-TCu9IH4NfZA",

  authDomain: "quiz-app-9d5d5.firebaseapp.com",

  projectId: "quiz-app-9d5d5",

  storageBucket: "quiz-app-9d5d5.appspot.com",

  messagingSenderId: "273017985352",

  appId: "1:273017985352:web:c8033aa862d6384b093b7d"

};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const db = firebase.firestore(); 

function isUsernameAvailbale(username){
  const usernameErrorMsg = document.querySelector('.js-username-msg');
  const usernameBorder = document.querySelector('.username-input');

  return db.collection('users').where('username', '==', username).get()
  .then((querySnapshot) => {
    if (querySnapshot.empty) {
      return true;
    } else {
      usernameErrorMsg.innerHTML = 'Username is already taken';
      usernameBorder.style.border = '1px solid red';
    }
    return true;
  })
  .catch((error) =>{
    console.error('Error checking username availability:', error);
    return false;
  })
}
document.querySelector('.sign-up-btn').addEventListener('click', signUpUser)
function signUpUser() {
  const confrim = document.querySelector('.re-enter-pwd');
  const usernameInput = document.querySelector('.username-input').value;
  const passwordInput = document.querySelector('.password-input').value;
  const confrimPwd = document.querySelector('.re-enter-pwd').value;
  const passwordErrorMsg = document.querySelector('.js-password-msg');
  const emailErrorMsg = document.querySelector('.js-email-msg');
  const emailInput = document.querySelector('.email-input').value;
  const email = document.querySelector('.email-input');
  if(!emailInput || !usernameInput || !confrimPwd){
    alert('Please fill in all fields')
  }else if(passwordInput !== confrimPwd){
    passwordErrorMsg.innerHTML = 'password does not match';
    confrim.style.border = '1px solid red';
    return;
  }else{
    passwordErrorMsg.innerHTML = '';
    confrim.style.border = 'none';
    isUsernameAvailbale(usernameInput).then((available) => {
      if(available){
        firebase.auth().createUserWithEmailAndPassword(emailInput, passwordInput).then((userCredantial) => {
          const user = userCredantial.user
          user.updateProfile({
            displayName: usernameInput
          })
          db.collection('users').doc(user.uid).set({
            email: emailInput,
            username: usernameInput,
            confirmPassword: confrimPwd,
            score: 50,
            quizNumber: 0,
            quizProgress: userQuizProgress = {
              quiz1: {
                number: 1,
                backgroundColor: 'rgba(23, 219, 78, 1)',
                background: 'rgba(255,255,255,1)'
              },
              quiz2: {
                number: 2,
                backgroundColor: 'rgba(23, 219, 78, 1)',
                background: 'rgba(255,255,255,1)'
              },
              quiz3: {
                number: 3,
                backgroundColor: 'rgba(23, 219, 78, 1)',
                background: 'rgba(255,255,255,1)'
              },
              quiz4: {
                number: 4,
                backgroundColor: 'rgba(23, 219, 78, 1)',
                background: 'rgba(255,255,255,1)'
              },
              quiz5: {
                number: 5,
                backgroundColor: 'rgba(23, 219, 78, 1)',
                background: 'rgba(255,255,255,1)'
              },
            }
          })
          // database.ref('users/' + user.uid).set({  
          //   email: emailInput,
          //   username: usernameInput,
          //   confirmPassword: confrimPwd
          // })
          .then(() => {
            window.location.href = '/quiz.html';
          })
        }).catch((error) => {
          let errorCode = error.code;
          if (errorCode === 'auth/email-already-in-use') {
            emailErrorMsg.innerHTML = 'Email is already registered';
            email.style.border = '1px solid red';
          } else if (errorCode === 'auth/invalid-email') {
            emailErrorMsg.innerHTML = 'Invalid email address';
            email.style.border = '1px solid red';
          } else {
            email.style.border = 'none';
            alert(errorMessage);
          }
        });
      }
    })
  }
}