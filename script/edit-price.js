import "../data/edit.js"
import { tricycleFun } from "../data/edit.js";
import { marketNameDisplay } from "../data/login-name.js";
import { vehiclePrice } from "../data/edit.js";
import { themeTogle } from "./theme.js";

themeTogle();


document.querySelector('.heading-name').innerHTML = marketNameDisplay;

const submitButton = document.querySelector('.btn');
const updateButton = document.querySelector('.but');

 submitButton.addEventListener('click', ()=>{
    tricycleFun();
    localStorage.setItem('vehiclePrice', JSON.stringify(vehiclePrice));
    updateButton.innerHTML =  `<button class="updated"style="background-color: var(--input-border); color: var(--secondary-text-color);" >  Fee Updated</button>`;
    document.querySelector('.updated').addEventListener('click', ()=>{
      window.location.href = './sale-record.html';
    })
    
});

document.querySelector('.heading-name').innerHTML = marketNameDisplay;

document.querySelector('.back-button-image').addEventListener('click', ()=>{
  window.location.href = './ticket-dashboard.html';
});

maxDigit();

function maxDigit() {
  const inputMax = document.querySelectorAll('input');

  inputMax.forEach((input) => {
    input.addEventListener("input", function(e) {
      const maxLength = 8; 
      if (this.value.length > maxLength) {
        this.value = this.value.slice(0, maxLength);
      }
    });
    
  });
}

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






