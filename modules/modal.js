// DOM Elements
const modalbg = document.querySelector(".bground");
// const formData = document.querySelectorAll(".formData");

// launch modal form
export function launchModal() {
  modalbg.style.display = "block";
}

export function closeModal() {
  modalbg.style.display = "none";
}
