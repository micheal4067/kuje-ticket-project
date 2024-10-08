import  "../data/edit.js";
import { tricycleFun } from "../data/edit.js";
import { marketNameDisplay } from "../data/login-name.js";
import { vehiclePrice } from "../data/edit.js";


document.querySelector('.heading-name').innerHTML = marketNameDisplay;

const submitButton = document.querySelector('.btn');
const updateButton = document.querySelector('.but');
const formImage = document.querySelector('.form-img');

 submitButton.addEventListener('click', ()=>{
    tricycleFun();
    localStorage.setItem('vehiclePrice', JSON.stringify(vehiclePrice));
    updateButton.innerHTML =  `<button class="updated"style="background-color:green;" > <img class="back-button-images" src="./icons/back-button.png"> Fee Updated</button>`;
    formImage.innerHTML = ` <img src="./icons/pngtree-green-check-mark-icon-flat-style-png-image_1986021-removebg-preview.png" alt="">`
    document.querySelector('.updated').addEventListener('click', ()=>{
      window.location.href = './ticket-dashboard.html';
    })
    
});

document.querySelector('.heading-name').innerHTML = marketNameDisplay;

document.querySelector('.back-button-image').addEventListener('click', ()=>{
  window.location.href = './ticket-dashboard.html'
})

carInput.addEventListener('input', () => {
  carInput.value = 'NGN ' + carInput.value.replace(/[^0-9.]/g, '');
});

tricycleInput.addEventListener('input', () => {
  tricycleInput.value = 'NGN ' + tricycleInput.value.replace(/[^0-9.]/g, '');
});

smallTruck.addEventListener('input', () => {
  smllTruckInput.value = 'NGN ' + smallTruck.value.replace(/[^0-9.]/g, '');
});

bigTruckInput.addEventListener('input', () => {
  bigTruckInput.value = 'NGN ' + bigTruckInput.value.replace(/[^0-9.]/g, '');
});

ticketLossInput.addEventListener('input', () => {
  ticketLossInput.value = 'NGN ' + ticketLoss.value.replace(/[^0-9.]/g, '');
});






