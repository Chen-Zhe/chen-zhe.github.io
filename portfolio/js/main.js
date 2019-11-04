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

// swipe detedction
// credit: http://www.javascriptkit.com/javatutors/touchevents2.shtml
function swipedetect(el, callback){

    var touchsurface = el,
    swipedir,
    startX,
    startY,
    distX,
    distY,
    threshold = 80, //required min distance traveled to be considered swipe
    restraint = 60, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 300, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,
    handleswipe = callback || function(swipedir){}

    touchsurface.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        e.preventDefault()
    }, false)

    touchsurface.addEventListener('touchmove', function(e){
        e.preventDefault() // prevent scrolling when inside DIV
    }, false)

    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime){ // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir)
        e.preventDefault()
    }, false)
}

swipedetect(document.getElementById('swipezone'), function(swipedir){
  switch(swipedir){
    case "left":
    plusSlides(1);
    break;
    case "right":
    plusSlides(-1);
    break;
    default: return;
  }
});
