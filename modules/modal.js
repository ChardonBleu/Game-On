// ****************************  DOM nodes **************************************

const modalbg = document.querySelector(".bground");
const modalContent = document.querySelector(".content");

// ****************************  functions **************************************

/** Launch modal from
 */
export function launchModal() {
  modalbg.classList.toggle("open-modal");
  modalContent.classList.add("open-anim");
}

/** Close modal from
 */
export function closeModal() {
  modalContent.classList.add("close-anim");
}

/** display error message in div error
 * This div can have class error, or error-radio or error-checkbox
 * @param errorValidation {boolean} - true if imputs are valid.
 * @param errorDiv {DOM node} - the div with the error message to display
 */
function displayErrorMessage(errorValidation, errorDiv) {
  if (!errorValidation) {
    errorDiv.setAttribute("data-error-visible", true);
  } else {
    errorDiv.setAttribute("data-error-visible", false);
  }
}

/** Validate modal form for imputs of type text, email, date or number
 * @return {boolean} true if all those imputs are valid
 */
function validateCommunInput() {
  let validation = false;
  const allErrors = document.querySelectorAll(".error");

  for (const error of allErrors) {
    const input = error.querySelector("input");
    let inputValidation = input.checkValidity() && input.value;
    displayErrorMessage(inputValidation, error);
    validation |= inputValidation;
  }
  return validation;
}

/** Validate modal form for imput of type radio for game location
 * @return {boolean} true if one radio input is checked.
 */
function validateRadioInput() {
  const errorRadio = document.querySelector(".error-radio");
  const allRadioInputs = Array.from(document.querySelectorAll(".radio-input"));

  let validation = allRadioInputs.filter((input) => input.checked).length === 1;
  displayErrorMessage(validation, errorRadio);

  return validation;
}

/** Validate modal form for imput of type checkbox for uses conditions acceptation
 * @return {boolean} true if radio-checkbox input is checked
 */
function validateCheckboxInput() {
  const errorCheckbox = document.querySelector(".error-checkbox");
  const conditionsCheckbox = document.getElementById("checkbox1");
  let validation = conditionsCheckbox.checked;

  displayErrorMessage(validation, errorCheckbox);

  return validation;
}

/** Check if form is valid
 * @param event {object} - use to prevent sending form if it's not validate
 */
export function validationForm(event) {
  if (
    !validateCommunInput() |
    !validateRadioInput() |
    !validateCheckboxInput()
  ) {
    event.preventDefault();
  } else {
    console.log("formulaire envoyé");
    // fermer modale (ça se fait tout seul)
    // et lancer  l'affichage de la modale de confirmation
  }
}

// ****************************  Event Listeners **************************************

modalContent.addEventListener("animationend", () => {
  const contentClassList = modalContent.classList.value.split(" ");

  if (contentClassList.includes("open-anim")) {
    modalContent.classList.remove("open-anim");
  } else if (contentClassList.includes("close-anim")) {
    modalContent.classList.remove("close-anim");
    modalbg.classList.toggle("open-modal");
  }
});
