var btn_diva = document.getElementById('btn_diva');
var btn_divb = document.getElementById('btn_divb');
var diva = document.getElementById('diva');
var divb = document.getElementById('divb');
btn_diva.addEventListener('click', ()=>{
    diva.style.display = 'block';
    divb.style.display = 'none';
});

btn_divb.addEventListener('click', ()=>{
    diva.style.display = 'none';
    divb.style.display = 'block';
});

function myFun(){
    document.getElementById('nonne').style.display = 'block';
}
//form submision to spreadsheet
function SubForm (){
    $.ajax({
        url:"https://api.apispreadsheets.com/data/iuLTcJ8KvEDapatk/",
        type:"post",
        data:$("#myForm").serializeArray(),
        success: function(){
            alert("Form Data Submitted :)")
        },
        error: function(){
            alert("There was an error :(")
        }
        });
    }
  

myFunction = () => {
    document.getElementById('block').style.display = 'block';
}
// slider fuction

// slider function for welcome section
let slideIndex = 0;
showSlides();
 function showSlides() {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    for (i  = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;

    // for dot
    if (slideIndex > slides.length) {slideIndex = 1}
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "flex";
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 2000); // Change image every 5 seconds

 }



