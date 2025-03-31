import { launchModal, closeModal, validationForm } from "./modules/modal.js";
import { editNav, navLinkActive } from "./modules/nav.js";

// DOM Elements
const navIcon = document.querySelector(".icon");
const navLinks = document.querySelectorAll(".main-navbar a");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelector(".close");
const form = document.querySelector("form");

// display mobile nav
navIcon.addEventListener("click", (event) => {
  event.preventDefault();
  editNav();
});

navLinks.forEach((link) =>
  link.addEventListener("click", (event) => {
    navLinkActive(event);
  }),
);

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

closeBtn.addEventListener("click", closeModal);

form.addEventListener("submit", (event) => {
  validationForm(event);
});
