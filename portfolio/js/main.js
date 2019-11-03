// slider
var slides = document.getElementsByClassName("mySlides");
var dots = document.getElementsByClassName("dot");

var slideIndex = 0;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  if (n >= slides.length) {slideIndex = 0}
  else if (n < 0) {slideIndex = slides.length - 1}
  lazyLoadImg(slides[slideIndex])
  if (slideIndex + 1 < slides.length) {lazyLoadImg(slides[slideIndex + 1])}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].classList.remove("active");
  }
  slides[slideIndex].style.display = "block";
  dots[slideIndex].classList.add("active");
}

function lazyLoadImg(slideDiv) {
  var imgList = slideDiv.getElementsByTagName("img")
  for (var i = 0; i < imgList.length; i++) {
    if (!imgList[i].src) {
      imgList[i].src = imgList[i].dataset.src
    }
  }
}

document.onkeyup = function(e) {
    switch(e.which) {
        case 37: // left
        plusSlides(-1);
        break;
        case 39: // right
        plusSlides(1);
        break;
        default: return; // exit this handler for other keys
    }
    e.preventDefault();
};

// popup
function showPopup(el) {
  el.getElementsByClassName("popuptext")[0].classList.toggle("show");
}