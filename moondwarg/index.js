var btn_diva = document.getElementById('btn_diva');
var btn_divb = document.getElementById('btn_divb');
var diva = document.getElementById('diva');
var divb = document.getElementById('divb');
btn_diva.addEventListener('click', () => {
    diva.style.display = 'block';
    divb.style.display = 'none';
});

btn_divb.addEventListener('click', () => {
    diva.style.display = 'none';
    divb.style.display = 'block';
});

function myFun() {
    document.getElementById('nonne').style.display = 'block';
}
//form submision to spreadsheet
function SubForm() {
    $.ajax({
        url: "https://api.apispreadsheets.com/data/iuLTcJ8KvEDapatk/",
        type: "post",
        data: $("#myForm").serializeArray(),
        success: function () {
            alert("Form Data Submitted :)")
        },
        error: function () {
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
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;

    // for dot
    if (slideIndex > slides.length) { slideIndex = 1 }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "flex";
    dots[slideIndex - 1].className += " active";
    setTimeout(showSlides, 2000); // Change image every 5 seconds

}
//  testimonials

const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

const testimonials = [
    {
        name: "Mr Mamabolo Masilo",
        text: "It is with great enthusiasm that I wholeheartedly recommend and endorse the services of MoonDawg Media as the Public Relations and Media Production Company of choice I have been working with MoonDawg Media for the past three years and have consistently been impressed with their outstanding performance..........."
        //  They are not only punctual and professional, but also offer the most competitive rates in town. Throughout our partnership, they have always delivered exactly what we asked for, providing top-notch services at very reasonable prices. I am more than happy to recommend MoonDawg Media's services to anyone in need of quality PR and media production. Should you have any questions, feel free to reach out to me directly."
    },
  
    {
        name: "Vhonane Netshilema",
        text: "It is with great honor and pleasure that I wholeheartedly recommend MoonDawg Media for their exceptional videography, photography, and communications services.Our company has been working with MoonDawg Media for over a year, and I can confidently speak to the high quality of service they provide, all at an affordable price........."
        //  We believe that any business would benefit from partnering with them, and we have always been impressed by their professionalism and dedication. When it comes to recommending reliable service providers, we would never direct you to a mediocre company, as your success is just as important to us. I’d be happy to arrange a meeting to get started. Please let me know the most convenient time for you to schedule this discussion."
    },

    {
        name: "Ms Venia Tshidumo ",
        text:
            "We are pleased to confirm that Mr. Simon Nyarugwe of MoonDawg Media (Pvt) Ltd was instrumental in delivering all the necessary technical solutions for Tshwane TV. Thanks to his expertise, Tshwane TV now has a fully integrated end-to-end broadcast solution .... ......."
        //  This includes the capability to broadcast live from outside locations, distribute TV segments of varying lengths, and stream content across national and global platforms. Mr. Nyarugwe’s contributions have been pivotal in helping us establish a strong presence on satellite, radio frequency, and streaming services, making our programming accessible to audiences worldwide We highly recommend his services based on his technical knowledge, professionalism, and dedication to delivering outstanding results."

    },
   
    // {
    //     name: "Vhonane Netshilema",
    //     text: "It is with great honor and pleasure that I wholeheartedly recommend MoonDawg Media for their exceptional videography, photography, and communications services.Our company has been working with MoonDawg Media for over a year, and I can confidently speak to the high quality of service they provide, all at an affordable price........."
    //     //  We believe that any business would benefit from partnering with them, and we have always been impressed by their professionalism and dedication. When it comes to recommending reliable service providers, we would never direct you to a mediocre company, as your success is just as important to us. I’d be happy to arrange a meeting to get started. Please let me know the most convenient time for you to schedule this discussion."
    // },
    // {
    //     name: "Alice Brown",
    //     text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    // },
    // {
    //     name: "Charlie Davis",
    //     text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
    // }
];

let currentIndex = 0;

function createTestimonialElement(testimonial, index) {
    const div = document.createElement('div');
    div.className = 'testimonial';
    div.innerHTML = `      
      <img src="./imgs/${index}.png" alt="${testimonial.name}">
   <h3>${testimonial.name}</h3>
    <p style="font-size: 12px;">${testimonial.text}</p>
    `;
    return div;
}

function updateCarousel() {
    carousel.innerHTML = '';
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
        carousel.appendChild(createTestimonialElement(testimonials[currentIndex], currentIndex));
    } else {
        const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        const nextIndex = (currentIndex + 1) % testimonials.length;

        carousel.appendChild(createTestimonialElement(testimonials[prevIndex], prevIndex));
        const activeTestimonial = createTestimonialElement(testimonials[currentIndex], currentIndex);
        activeTestimonial.classList.add('active');
        carousel.appendChild(activeTestimonial);
        carousel.appendChild(createTestimonialElement(testimonials[nextIndex], nextIndex));
    }
}

function showNext() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    updateCarousel();
}

function showPrev() {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    updateCarousel();
}

nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);

// Responsive behavior
function handleResize() {
    updateCarousel();
}

window.addEventListener('resize', handleResize);

// Initial setup
updateCarousel();

// Auto-scroll (optional)
// setInterval(showNext, 5000);



