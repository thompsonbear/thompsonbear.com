import smoothScroll from "./scroll.js";

const homeShortcut = document.querySelectorAll(".home-sc");
const resumeShortcut = document.querySelectorAll(".resume-sc");
const contactShortcut = document.querySelectorAll(".contact-sc");

const homeButton = document.querySelector("#home-btn");
const resumeButton = document.querySelector("#resume-btn");
const contactButton = document.querySelector("#contact-btn");

const homeSection = document.querySelector("#home");
const resumeSection = document.querySelector("#resume");
const contactSection = document.querySelector("#contact");

const burgerNav = document.querySelector("nav ul");
const burgerButton = document.querySelector("#burger");
const burgerCloseButton = document.querySelector("#x-btn");

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
      rect.top <= (window.innerHeight/2)
  );
}

function clearButtonOpacity(){
  contactButton.style.opacity = "0.5";
  resumeButton.style.opacity = "0.5";
  homeButton.style.opacity = "0.5";
}

function updateActiveSection(){
  if (isInViewport(contactSection)){
    clearButtonOpacity();
    contactButton.style.opacity = "1";
  }
  else if (isInViewport(resumeSection)){
    clearButtonOpacity();
    resumeButton.style.opacity = "1";
  }
  else if (isInViewport(homeSection)){
    clearButtonOpacity();
    homeButton.style.opacity = "1";
  } 
}

function closeNav(){
  burgerNav.classList.add("nav-closing");
  setTimeout(() => { 
    burgerNav.classList.remove("nav-open"); 
    burgerNav.classList.remove("nav-opening");
    burgerNav.classList.remove("nav-closing");
  }, 1000);
}

function openNav(){
  burgerNav.classList.add("nav-opening");
  setTimeout(() => { burgerNav.classList.add("nav-open");}, 1);
}

burgerButton.addEventListener('click', e => openNav());
burgerCloseButton.addEventListener('click', e => closeNav());

homeShortcut.forEach(function(btn){
    btn.addEventListener('click', e => {smoothScroll("#home", 1000), closeNav()});
});

resumeShortcut.forEach(function(btn){
    btn.addEventListener('click', e => {smoothScroll("#resume", 1000), closeNav()});
});

contactShortcut.forEach(function(btn){
    btn.addEventListener('click', e => {smoothScroll("#contact", 1000), closeNav()});
});


window.addEventListener('scroll', updateActiveSection);
updateActiveSection();
