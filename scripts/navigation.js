const navMenu = document.querySelector('.nav-menu');
navMenu.addEventListener('click', toggleNavMenu)

function toggleNavMenu(){
  const navigation = document.querySelector('.navigation');
  navigation.classList.toggle('show');
  // console.log('hello javascrpt');
}


