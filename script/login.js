import { marketNameDisplay } from "../data/login-name.js";

function logInCheck(){
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const wrongInput = document.querySelector('.wrong-input');

  if(usernameInput.value && passwordInput.value){
    window.location.href = './ticket-dashboard.html';
  } else{
    wrongInput.innerHTML = 'Enter username or Password';
    usernameInput.value = '';
    passwordInput.value = '';
  }
}

document.querySelector('.btn').addEventListener('click',()=>{
  logInCheck();
  marketFun();
})

document.body.addEventListener('keydown', (event)=>{
 if(event.key === 'Enter'){
  logInCheck();
 }
});

function headingEdit(){
  const inputElement = document.querySelector('.market-name');
  const heading = document.querySelector('.heading-name');

  if (localStorage.getItem('market')) {
    heading.innerHTML = marketNameDisplay;;
  } else if (!localStorage.getItem('market')) {
    heading.innerHTML = marketNameDisplay;
    inputElement.addEventListener('input', () => {
      const marketNameHead = inputElement.value;
      heading.innerHTML = marketNameHead
    });
  }
}

headingEdit();

function marketFun () {
  const inputElement = document.querySelector('.market-name');

    const marketName = inputElement.value;
    if (!localStorage.getItem('market')) {
      marketNameDisplay.push(marketName);
      localStorage.setItem('market', marketName);

    }
} 

marketFun();









