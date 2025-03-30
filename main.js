import { launchModal } from "./modules/modal.js";
import {editNav} from "./modules/nav.js";


// DOM Elements
const navIcon = document.querySelector(".icon");
const modalBtn = document.querySelectorAll(".modal-btn");


// display mobile nav
navIcon.addEventListener('click', (event) => {
    event.preventDefault();
    editNav();
})

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

