import { modalbg, modalContent, form, confirmation } from "./dom.js";

// ****************************  functions **************************************

/** Launch modal from
 */
export function launchModal() {
  confirmation.classList.add("mask-node");
  modalbg.classList.toggle("display-node");
  modalContent.classList.add("open-anim");
}

/** Close modal from
 */
export function closeModal() {
  maskAllErrorMessages();
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

function maskAllErrorMessages() {
  const allErrors = document.querySelectorAll(".error");
  for (const error of allErrors) {
    error.setAttribute("data-error-visible", false);
  }
  const errorRadio = document.querySelector(".error-radio");
  errorRadio.setAttribute("data-error-visible", false);

  const errorCheckbox = document.querySelector(".error-checkbox");
  errorCheckbox.setAttribute("data-error-visible", false);
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

/** Send message using fetch.
 * Default submit is deactivated, so modal keep open.
 * Sending confirmatiom message is displayed in modal while form is masked
 */
async function sendMessage() {
  const formData = new FormData(form);
  const searchParams = new URLSearchParams(formData);

  fetch("https://chardonbleu.github.io/Game-On/index.html?" + searchParams.toString(), {
    method: "GET",
  })
    .then((response) => response.text())
    .then(() => {
      form.reset();
      form.classList.add("mask-node");
      confirmation.classList.remove("mask-node");
    })
    .catch((error) => {
      console.error("Erreur :", error);
    });
}

/** Check if form is valid before sending message
 * @param event {object} - use to prevent sending form if it's not validate
 */
export function validationForm(event) {
  event.preventDefault();
  if (
    validateCommunInput() &&
    validateRadioInput() &&
    validateCheckboxInput()
  ) {
    sendMessage(event);
  }
}
