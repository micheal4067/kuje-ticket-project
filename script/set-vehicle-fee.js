import "../data/edit.js";

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

export {maxDigit};





