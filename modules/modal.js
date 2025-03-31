// DOM Elements
const modalbg = document.querySelector(".bground");
const modalContent = document.querySelector(".content")
// const formData = document.querySelectorAll(".formData");

// launch modal form
export function launchModal() {
  modalbg.classList.toggle("open-modal")
  modalContent.classList.add("open-anim")
}

export function closeModal() {
  modalContent.classList.add("close-anim");
}

modalContent.addEventListener("animationend", () =>{
  const contentClassList = modalContent.classList.value.split(' ');

  if (contentClassList.includes('open-anim')) {
    modalContent.classList.remove("open-anim")
  }
  else if (contentClassList.includes('close-anim')) {
    modalContent.classList.remove("close-anim");
    modalbg.classList.toggle("open-modal")
  }
})
