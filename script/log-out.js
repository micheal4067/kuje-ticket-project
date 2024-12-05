import { tricycleFun } from "../data/edit.js";
import { vehiclePrice } from "../data/edit.js";


function logOutApp(){
  const modalk = document.getElementById('loginModal');
const confirmLogout = document.getElementById('confirm-logout');
const cancelLogout = document.getElementById('cancel-logout');
const closeModal = document.getElementById('close-js');


const modal = document.getElementById('logout-modal');

document.querySelectorAll('.log-out-js').forEach(element => {
  element.addEventListener('click', () => {
    modal.classList.remove('hidden');
  modal.classList.add('show');
  });
});

// Handle the confirm log-out action
confirmLogout.addEventListener('click', () => {
  modal.classList.remove('show');
  setTimeout(() => {
    modal.classList.add('hidden');
    // Perform the log-out action
    localStorage.removeItem('time');
    localStorage.removeItem('market');
    localStorage.removeItem('sales');
    localStorage.removeItem('salesLog');
    localStorage.removeItem('salesLogUpload');
    localStorage.removeItem('salesHistory');
    window.location.href = "./index.html";
  }, 300); // Wait for animation to complete
});

// Handle the cancel action
cancelLogout.addEventListener('click', () => {
  modal.classList.remove('show');
  setTimeout(() => modal.classList.add('hidden'), 100); // Wait for animation to complete
});



document.querySelectorAll('.about-js').forEach(element => {
  element.addEventListener('click', () => {
    window.location.href = './about-ticket.html';
  });
});


document.querySelectorAll('.js-all-vehicles-ticket-button').forEach(element => {
  element.addEventListener('click', () => {
    window.location.href = './sales-review.html';
  });
});

document.querySelectorAll('.sales-record').forEach(element => {
  element.addEventListener('click', () => {
    modalk.classList.remove('hide');
    void modalk.offsetWidth;
    modalk.classList.add('show');
    modalk.style.display = 'flex';
  
    historyView();
   
  });
});

closeModal.addEventListener('click', () => {
  removeodal();
  document.querySelector('.invalid').innerHTML = '';
  username.value = '';
  password.value = '';
});


window.addEventListener('click', (e) => {
  if (e.target === modal){
    modal.classList.remove('show');
  modal.classList.add('hidden')
  }
});

window.addEventListener('click', (e) => {
  if (e.target === modalOverlayer){
    hideModal();
  }
});

function removeodal(){
  modalk.classList.remove('show'); // Remove the "show" class to hide the modal
  modalk.classList.add('hide');
    setTimeout(() => {
      modalk.style.display = 'none'; // Fully hide the modal after animation ends
      modalk.classList.remove('hide'); // Remove the "hide" class for the next time
    }, 300);
}


const modalOverlayer = document.querySelector('.modal-overlayer');
const closeFee = document.querySelector('.close-js');


document.querySelectorAll('.set-fee').forEach(element => {
  element.addEventListener('click', () => {
    confirmDialog.style.display = 'block';
  });
});

// Function to show modal
function showModal() {
    modalOverlayer.classList.add('actives');
}
const checkMarkContainer = document.querySelector(".check-mark-container");
const confirmDialog = document.querySelector('.confirm-dialog');
const yesBtn = document.querySelector('.yes-btn');
const noBtn = document.querySelector('.no-btn');

yesBtn.addEventListener('click', () => {
  localStorage.setItem('showModal', 'true'); // Set flag
  localStorage.removeItem('vehiclePrice');
  location.reload(); // Refresh the page
});

// On page load, check for the flag
window.onload = () => {
  if (localStorage.getItem('showModal') === 'true') {
    modalOverlayer.classList.add('actives');
    localStorage.removeItem('showModal'); // Remove flag to prevent re-showing
  }
};

noBtn.addEventListener('click', () => {
  confirmDialog.style.display = 'none';
});

 const submitButton = document.querySelector('.btn');

 submitButton.addEventListener('click', () => {
  // Call the tricycleFun function
  tricycleFun();

  // Save vehicle price to localStorage
  localStorage.setItem('vehiclePrice', JSON.stringify(vehiclePrice));

  // Show the check mark
  checkMarkContainer.style.display = "block";

  // Hide the check mark after 1.5 seconds and remove modal
  setTimeout(() => {
      checkMarkContainer.style.display = "none";
      modalOverlayer.classList.remove('actives');
      
      // Reload the page after the check mark has been hidden
      setTimeout(() => {
          location.reload();
      }, 500); // Slight delay after hiding the check mark
  }, 1500);
});




window.addEventListener('resize', ()=>{
  modal.classList.remove('show');
  modal.classList.add('hidden')
  modalk.style.display = 'none';
  hideModal();
  removeodal();
});



// Function to hide modal
function hideModal() {
    modalOverlayer.classList.remove('actives');
}
closeFee.addEventListener('click',()=>{
hideModal();
})
window.addEventListener('load', () => {
  const spinnerOverlay = document.getElementById('spinner-overlay');

  // Add a delay before hiding the spinner
  setTimeout(() => {
    spinnerOverlay.style.display = 'none';
  }, 1000); // Adjust delay time (2000ms = 2 seconds)
});



const hamburgerMenu = document.querySelector('.hamburger-menu');
const linksModal = document.getElementById('linksModal');
const closeModalLinks = document.getElementById('closeModalLinks');

// Toggle modal visibility
hamburgerMenu.addEventListener('click', () => {
  linksModal.classList.toggle('show');
});

// Close modal on close button click
closeModalLinks.addEventListener('click', () => {
  linksModal.classList.remove('show');
});

// Optional: Close modal on clicking outside of content
linksModal.addEventListener('click', (e) => {
  if (e.target === linksModal) {
    linksModal.classList.remove('show');
  }
});

const modalLinks = document.querySelectorAll('.modal-content-links .links p');
const modalClose = document.querySelector('.modal-links');

// Add click event listener to each link
modalLinks.forEach(link => {
  link.addEventListener('click', () => {
    modalClose.classList.remove('show'); // Hide the modal
  });
});




}


function historyView(){
const openModalBtn = document.getElementById('openModalBtn');
let username = document.getElementById('username');
let password = document.getElementById('password');
const loginForm = document.getElementById('loginForm');

  // Form submission
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    if (username.value && password.value ) {
      username.value = '';
      password.value = '';
      window.location.href = './sale-record.html';
    } else {
      document.querySelector('.invalid').innerHTML = 'Enter any Username or Password';
    }
  });


}


export {logOutApp};