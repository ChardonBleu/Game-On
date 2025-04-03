export function editNav() {
  const nav = document.getElementById("myTopnav");
  nav.classList.toggle("responsive");
}

export function navLinkActive(event) {
  const currentActiveLink = document.querySelector(".main-navbar > .active");
  currentActiveLink.classList.remove("active");
  const newActiveLink = event.target;
  newActiveLink.classList.add("active");
}
