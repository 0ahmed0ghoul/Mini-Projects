const silder = document.querySelector(".silder-inner");

const prgbar = document.querySelector(".prog-bar-inner");

let sliderGrabbed = false;
function getScrollPercentage() {
    return (silder.parentElement.scrollLeft / (silder.scrollWidth - silder.clientWidth)) * 100;
}
