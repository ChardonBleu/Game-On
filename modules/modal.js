import { modalbg, modalContent, form, confirmation } from "./dom.js";

/** Launch modal from
 */
export function launchModal() {
  confirmation.classList.add("mask-node");
  modalbg.classList.toggle("display-node");
  modalContent.classList.add("open-anim");
}

/** mask all error message in div error
 */
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

/** Validate input vlue in modal form for imputs of type text, email, date or number
 * And check for the date form that date is lower than today.
 * @return {boolean} true if all those imputs are valid
 */
function checkCommunInput(input) {
  let validity = true;
  if (input.name === "birthdate") {
    const today = new Date();
    const inputDate = new Date(input.value);
    validity = inputDate <= today ? true : false;
  }
  return Boolean(input.value && input.checkValidity() && validity);
}

/** Validate modal form for imputs of type text, email, date or number
 * @return {boolean} true if all those imputs are valid
 */
function validateCommonInput() {
  let validation = true;
  const allErrors = document.querySelectorAll(".error");

  for (const error of allErrors) {
    const input = error.querySelector("input");
    let inputValidation = checkCommunInput(input);
    displayErrorMessage(inputValidation, error);
    validation = validation && inputValidation;
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
  const isProduction = window.location.hostname === "chardonbleu.github.io";
  const apiUrl = isProduction
    ? "https://chardonbleu.github.io/Game-On"
    : "http://127.0.0.1:5500";

  try {
    await fetch(apiUrl + "/index.html?" + searchParams.toString(), {
      method: "GET",
    });
    form.reset();
    form.classList.add("mask-node");
    confirmation.classList.remove("mask-node");
  } catch (error) {
    throw new Error("Erreur à l'envoi du message :", error);
  }
}

/** Check if form is valid before sending message
 * @param event {object} - use to prevent sending form if it's not validate
 */
export function validationForm(event) {
  event.preventDefault();
  const validCommon = validateCommonInput();
  const validRadio = validateRadioInput();
  const validCheckbox = validateCheckboxInput();
  if (validCommon && validRadio && validCheckbox) {
    sendMessage();
  }
}
