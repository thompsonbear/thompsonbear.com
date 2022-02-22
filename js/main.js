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

//Determine if an element is in the viewport - Return True/False
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
      rect.top <= (window.innerHeight/2)
  );
}

//Sets all nav buttons to the default 50% opacity
function clearButtonOpacity(){
  contactButton.style.opacity = "0.5";
  resumeButton.style.opacity = "0.5";
  homeButton.style.opacity = "0.5";
}

//Sets nav button of the currently active section to have 100% opacity
//Order is important here where the top most section needs to be the last due to how isInViewport() is calculated
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

//Closes the mobile navigation menu
//Adds the nav-closing class before removing all css classes 1 second later
//Staging css classes (nav-opening/nav-closing) are needed here due to the fading function of the menu when exited 
//otherwise the menu will either disappear instantly or fade but still be clickable
function closeNav(){
  burgerNav.classList.add("nav-closing");
  setTimeout(() => { 
    burgerNav.classList.remove("nav-open"); 
    burgerNav.classList.remove("nav-opening");
    burgerNav.classList.remove("nav-closing");
  }, 1000);
}

//Opens the mobile navigation menu, staging css class (nav-opening) added to allow for 1s fade-in effect
function openNav(){
  burgerNav.classList.add("nav-opening");
  setTimeout(() => { burgerNav.classList.add("nav-open");}, 1);
}

//bind burger button to openNav function
burgerButton.addEventListener('click', e => openNav());
//bind mobile navigation x button to the closeNav function
burgerCloseButton.addEventListener('click', e => closeNav());

//Iterate through all Shortcut buttons and add a click event to scroll to their respective section using the smoothScroll function
homeShortcut.forEach(function(btn){
    btn.addEventListener('click', e => {smoothScroll("#home", 1000), closeNav()});
});

resumeShortcut.forEach(function(btn){
    btn.addEventListener('click', e => {smoothScroll("#resume", 1000), closeNav()});
});

contactShortcut.forEach(function(btn){
    btn.addEventListener('click', e => {smoothScroll("#contact", 1000), closeNav()});
});

//Update current web page section using the updateActiveSection function on load and on user scroll
window.addEventListener('scroll', updateActiveSection);
updateActiveSection();
