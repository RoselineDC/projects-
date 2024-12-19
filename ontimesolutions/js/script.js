// slider function for welcome section
let slideIndex = 0;
showSlides();
 function showSlides() {
    let i;
    let slides = document.getElementsByClassName("slidee");
    let dots = document.getElementsByClassName("dot");
    for (i  = 0; i < slides.length; i++) {
        slides[i].style.display = "";
    }
    slideIndex++;

    if (slideIndex > slides.length) {slideIndex = 1}
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "flex";
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 2000);
 }
//  infinit slider
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".toggle-btn");
  
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const targetId = button.getAttribute("data-target");
        const content = document.getElementById(targetId);
  
        if (content.style.display === "none" || content.style.display === "") {
          content.style.display = "block"; // Show content
        } else {
          content.style.display = "none"; // Hide content
        }
      });
    });
  });
  