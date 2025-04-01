import { launchModal, closeModal, validationForm } from "./modules/modal.js";
import { editNav, navLinkActive } from "./modules/nav.js";
import {
  navIcon,
  navLinks,
  modalbg,
  modalContent,
  modalBtn,
  closeBtn,
  form,
  confirmationCloseBtn,
} from "./modules/dom.js";

// display mobile nav
navIcon.addEventListener("click", (event) => {
  event.preventDefault();
  editNav();
});

// navigation into navbar
navLinks.forEach((link) =>
  link.addEventListener("click", (event) => {
    navLinkActive(event);
  }),
);

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
closeBtn.addEventListener("click", closeModal);

// submit form
form.addEventListener("submit", (event) => {
  validationForm(event);
});

// close modal after sending form
confirmationCloseBtn.addEventListener("click", closeModal);

// modal opening and closing animation: reset classes
modalContent.addEventListener("animationend", () => {
  const contentClassList = modalContent.classList.value.split(" ");

  if (contentClassList.includes("open-anim")) {
    modalContent.classList.remove("open-anim");
  } else if (contentClassList.includes("close-anim")) {
    modalContent.classList.remove("close-anim");
    modalbg.classList.toggle("display-node");
    form.classList.remove("mask-node");
  }
});
