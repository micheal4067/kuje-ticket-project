import { tricycleFun } from "../data/edit.js";
import { vehiclePrice } from "../data/edit.js";

function logOutApp() {
  /** ======= DOM Elements ======= */
  const modal = document.getElementById('logout-modal');
  const modalk = document.getElementById('loginModal');
  const modalOverlayer = document.querySelector('.modal-overlayer');
  const confirmDialog = document.querySelector('.confirm-dialog');
  const checkMarkContainer = document.querySelector(".check-mark-container");
  const spinnerOverlay = document.getElementById('spinner-overlay');
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const linksModal = document.getElementById('linksModal');
  const closeModalLinks = document.getElementById('closeModalLinks');
  const modalLinks = document.querySelectorAll('.modal-content-links .links p');
  const modalClose = document.querySelector('.modal-links');

  // Buttons
  const confirmLogout = document.getElementById('confirm-logout');
  const cancelLogout = document.getElementById('cancel-logout');
  const closeModal = document.getElementById('close-js');
  const closeFee = document.querySelector('.close-js');
  const yesBtn = document.querySelector('.yes-btn');
  const noBtn = document.querySelector('.no-btn');
  const submitButton = document.querySelector('.btn');

  /** ======= Log-Out Modal ======= */
  document.querySelectorAll('.log-out-js').forEach(element => {
    element.addEventListener('click', () => {
      modal.classList.remove('hidden');
      modal.classList.add('show');
    });
  });

  confirmLogout.addEventListener('click', () => {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.classList.add('hidden');
      localStorage.removeItem('time');
      localStorage.removeItem('market');
      localStorage.removeItem('salesLog');
      localStorage.removeItem('salesLogUpload');
      window.location.href = "./index.html";
    }, 300);
  });

  cancelLogout.addEventListener('click', () => {
    modal.classList.remove('show');
    setTimeout(() => modal.classList.add('hidden'), 100);
  });

  /** ======= About and Ticket Redirection ======= */
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

  /** ======= Sales Record Modal ======= */
  document.querySelectorAll('.sales-record').forEach(element => {
    element.addEventListener('click', () => {
      modalk.classList.remove('hide');
      modalk.classList.add('show');
      modalk.style.display = 'flex';
      historyView(); // Handle login form submission
    });
  });

  closeModal.addEventListener('click', () => {
    removeodal();
    document.querySelector('.invalid').innerHTML = '';
    username.value = '';
    password.value = '';
  });

  /** ======= Fee Modal ======= */
  document.querySelectorAll('.set-fee').forEach(element => {
    element.addEventListener('click', () => {
      confirmDialog.style.display = 'block';
    });
  });

  yesBtn.addEventListener('click', () => {
    localStorage.removeItem('vehiclePrice');
    localStorage.setItem('showModal', 'true');
    location.reload();
  });

  window.onload = () => {
    if (localStorage.getItem('showModal') === 'true') {
      modalOverlayer.classList.add('actives');
      localStorage.removeItem('showModal'); // Remove flag to prevent re-showing
    }
  };

  noBtn.addEventListener('click', () => {
    confirmDialog.style.display = 'none';
  });

  /** ======= Submit Action ======= */
  submitButton.addEventListener('click', () => {
    tricycleFun();
    localStorage.setItem('vehiclePrice', JSON.stringify(vehiclePrice));

    checkMarkContainer.style.display = "block";

    setTimeout(() => {
      checkMarkContainer.style.display = "none";
      modalOverlayer.classList.remove('actives');
      setTimeout(() => location.reload(), 500);
    }, 1500);
  });

  /** ======= Modal Visibility ======= */
  function removeodal() {
    modalk.classList.remove('show');
    modalk.classList.add('hide');
    setTimeout(() => {
      modalk.style.display = 'none';
      modalk.classList.remove('hide');
    }, 300);
  }

  function hideModal() {
    modalOverlayer.classList.remove('actives');
  }

  closeFee.addEventListener('click', () => {
    hideModal();
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
      modal.classList.add('hidden');
    }
    if (e.target === modalOverlayer) {
      hideModal();
    }
  });

  /** ======= Page Loader ======= */
  window.addEventListener('load', () => {
    setTimeout(() => {
      spinnerOverlay.style.display = 'none';
    }, 1000);
  });

  /** ======= Hamburger Menu ======= */
  hamburgerMenu.addEventListener('click', () => {
    linksModal.classList.toggle('show');
  });

  closeModalLinks.addEventListener('click', () => {
    linksModal.classList.remove('show');
  });

  linksModal.addEventListener('click', (e) => {
    if (e.target === linksModal) {
      linksModal.classList.remove('show');
    }
  });

  modalLinks.forEach(link => {
    link.addEventListener('click', () => {
      modalClose.classList.remove('show');
    });
  });
  
  document.querySelectorAll('.settings-js').forEach(element => {
    element.addEventListener('click', () => {
      window.location.href = './settings.html';
    });
  });
}

/** ======= History View Function ======= */
function historyView() {
  let username = document.getElementById('username');
  let password = document.getElementById('password');
  const loginForm = document.getElementById('loginForm');
  const invalidMessage = document.querySelector('.invalid');

  // Form submission handling
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validation: Check if inputs are not empty
    if (username.value.trim() && password.value.trim()) {
      // Success: Redirect to sales record
      username.value = ''; // Clear input
      password.value = '';

      window.location.href = './sale-record.html';
      invalidMessage.textContent = ''; // Clear error message
    } else {
      // Error: Display invalid message
      invalidMessage.textContent = 'Please enter a valid Username and Password';
    }
  });

}

export { logOutApp };
