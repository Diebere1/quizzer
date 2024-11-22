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

document.querySelector('.sign-in-btn').addEventListener('click', () => {
  document.querySelector('.sign-in-btn').innerHTML = 'Please wait...';
  signInUser();
})
function signInUser() {
  const email = document.querySelector('.sign-in-email-input').value;
  const password = document.querySelector('.sign-in-password').value;
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    // database.ref('users/' + user.uid).once('value')
    // .then((snapshot) => {
    //   const userData = snapshot.val();
    // });
    window.location.href = '/quiz.html';
  }).catch((error) => {
    let errorCode = error.code;
    if (errorCode === 'auth/internal-error') {
      alert('invalid Credential');
    } else if (errorCode === 'auth/wrong-password') {
      alert('wrong password');
    }
  });
}