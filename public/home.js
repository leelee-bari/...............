var slideIndex,slides,dots,captionText;
function initGallery(){
    //TO GET THE IMAGE AND DISPLAY THE FIRST ONE
    slideIndex = 0;
    slides = document.getElementsByClassName("imageHolder");
    
    captionText = document.querySelector(".captionHolder .captionText");
    captionText.innerHTML = slides[slideIndex].querySelector(".caption1").innerHTML
    slides[slideIndex].style.opacity = 1;
    //GET THE DOTTED CLASS
    dots=[];
    var dotsContainer = document.getElementById("dotsContainer");

    //LOOPING THROUGH THE DOTS  LOCATED BELOW THE IMAGES
    for(var i = 0; i < slides.length; i++ ){
            var dot = document.createElement("span");
            dot.classList.add("dots");
            dot.setAttribute("onclick","moveSlide("+ i +")")
            //APPENDING THE CREATED CLASSES TO THE dots ARRAYS
            dotsContainer.appendChild(dot);
            dots.push(dot);
    }
    dots[slideIndex].classList.add("active")
}
initGallery()


function moveSlide(n){
    var i,current,next;
    var moveSlideAnimClass = {
        forCurrent : " ",
        forNext:" "
    }
    var slideTextAnimClass;
    
    if(n > slideIndex){
        if(n >= slides.length){n=0}
        moveSlideAnimClass.forCurrent = "moveLeftCurrentSlide"
        moveSlideAnimClass.forNext = "moveLeftNextSlide"
        slideTextAnimClass ="slideTextFromright"
    }else if(n < slideIndex){
        if(n < 0){ n = slides.length - 1}
        moveSlideAnimClass.forCurrent= "moveRightCurrentSlide"
        moveSlideAnimClass.forNext = "moveRightNextSlide"
        slideTextAnimClass = "slideTextFromleft"
    }
    if(n != slideIndex){
        next= slides[n]
        current = slides[slideIndex]
        for(var i = 0; i < slides.length; i++){
            slides[i].className = "imageHolder"
            slides[i].style.opacity = 0
            dots[i].classList.remove("active")
        }
        current.classList.add( moveSlideAnimClass.forCurrent)
        next.classList.add(moveSlideAnimClass.forNext)
         dots[n].classList.add("active")
        slideIndex = n
    }
    
    captionText.style.display ="none"
    captionText.className = "captionText "+ slideTextAnimClass
    captionText.innerText = slides[n].querySelector(".caption1").innerText
    captionText.style.display = "block"

}
var timer = null

function setTimer(){
    timer=setInterval(function(){
        plusSlides(1)
    },5000)
}
setTimer()
function plusSlides(n){
    moveSlide(slideIndex + n)
}

var show = document.querySelector(".showOrders")
var hide = document.querySelector(".hideOrders")
var orders = document.querySelector(".orders")

show.addEventListener('click', function(){
    orders.style.display= 'block'
    console.log('show')
})

hide.addEventListener("click", function(){
    orders.style.display = 'none'
    console.log('hide')
})