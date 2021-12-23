let menuToggle = document.querySelector('#toggle-light')
let mobileToggle = document.querySelector('#toggle-mobile-light')
let mobileIndicator = document.querySelector('.indicator-dark')
let mobileLightIndicator = document.querySelector('.indicator-light')
let popToggle = document.querySelector('header .toggle span')
let element = document.body;


function toggleMode() {
    element.classList.toggle("light");
    popToggle.classList.toggle("light-mode");
    menuToggle.classList.toggle("light-mode");
    mobileToggle.classList.toggle("light-mode");
    mobileIndicator.classList.toggle("d-none");
    mobileLightIndicator.classList.toggle("d-none");
} 