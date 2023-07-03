'use strict';
// writing a function


let id = (id)=>document.getElementById(id);
let classes =(classes)=>document.getElementsByClassName(classes);
//outputing the variables
let popCard=id("pop-up");
let closeBtn = id("close-btn");
let cardName=id("card-name");
let cardNum=id("card-num");
let cardMonthly=id("card-monthly");
let cardDaily=id("card-daily");
let cardDigits=id("card-digits");
let cardBack = id("card-back");
let button=id("btn");
let errorMsg=classes("error");
let sectionTwo = document.getElementById("second-section");
let displayCardFront = document.getElementById("card-front");
let cardText = document.getElementById("card-front-texts");
let cardDesc = document.getElementById("card-front-descs");
// Function to reset error state
// Function to reset error state
let resetErrorState = () => {
  Array.from(errorMsg).forEach((error, index) => {
    error.textContent = "";
    const inputField = classes("input-field")[index];
    if (inputField) {
      inputField.style.border = "";
      if (index >= 2 && index <= 4) {
        error.style.flexDirection = "";
      }
    }
  });
};
const displayPopup = () => {
  popCard.style.display = "block";
  sectionTwo.style.display = "none"
};

// Function to hide the pop-up
const hidePopup = () => {
  popCard.style.display = "none";
  sectionTwo.style.display = "block";
  //  cardBack.textContent = ""
  //  displayCardFront.textContent = ""
  //  cardText.textContent = ""
  //  cardDesc.textContent = ""
};


button.addEventListener("click", (e) => {
  e.preventDefault();

  // Function to check if the input contains any alphabet characters
  let containsAlphabet = (input) => {
    let regex = /[A-Za-z]/;
    return regex.test(input);
  };

  // Function to format the card number with dashes
  let formatCardNumber = (input) => {
    let formattedNumber = input.replace(/\s/g, ""); // Remove existing spaces
    formattedNumber = formattedNumber.replace(/(\d{4})(?=\d)/g, "$1 "); // Add space after every 4 digits
    return formattedNumber;
  };

  let engine = (id, serial, message) => {
    if (id.value.trim() === "") {
      errorMsg[serial].textContent = message;

      const inputField = classes("input-field")[serial];
      console.log(inputField);
      if (inputField) {
        inputField.style.border = "2px solid red";
        if (serial >= 2 && serial <= 4) {
          errorMsg[serial].style.flexDirection = "column";
        }
      }
    } else {
      if (id === cardNum) {
        resetErrorState(); // Reset error state before validating inputs
        if (containsAlphabet(id.value)) {
          errorMsg[serial].textContent = "Invalid format, numbers only";
          const inputField = classes("input-field")[serial];
          if (inputField) {
            inputField.style.border = "2px solid red";
            if (serial >= 2 && serial <= 4) {
              errorMsg[serial].style.flexDirection = "column";
            }
          }
        } else {
          errorMsg[serial].innerHTML = "";
          id.style.outline = "none";
          cardBack.textContent = cardDigits.value;
          displayCardFront.textContent = formatCardNumber(cardNum.value); // Format card number with dashes
          cardText.textContent = cardName.value;
          cardDesc.textContent = `${cardDaily.value}/${cardDigits.value}`;
          displayPopup();
        }
      }
    }
  };
  // if (!errorMsg) {
  //   popCard.style.display = "block";
  // }
closeBtn.addEventListener("click", () => {
  hidePopup();
});

  engine(cardName, 0, "Wrong format, names only");
  engine(cardNum, 1, "Wrong format, numbers only");
  engine(cardMonthly, 2, "Can't be blank");
  engine(cardDigits, 3, "Can't be blank");
  engine(cardDaily, 4, "Can't be blank");

   closeBtn.addEventListener("click", () => {
  cardDigits.value="";
  cardNum.value="";
  cardName.value="";
  cardDaily.value="";
  cardMonthly.value="";
  });
});
