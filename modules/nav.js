export function editNav() {
  const nav = document.getElementById("myTopnav");
  if (nav.className === "topnav") {
    nav.className += " responsive";
  } else {
    nav.className = "topnav";
  }
}

export function navLinkActive(event) {
  const currentActiveLink = document.querySelector(".main-navbar > .active");
  currentActiveLink.classList.remove("active");
  const newActiveLink = event.target;
  newActiveLink.classList.add("active");
}
