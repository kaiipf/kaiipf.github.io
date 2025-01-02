var noOfDots = 5
var noOfItems = 6
var currentSlide = 0
var currentTimeout = null
var consideredClick = false
var slideFiles = [
    'Images/visualArtPoster.jpeg',
    'Images/storyBrdPoster.jpeg',
    'Images/clayPoster.jpeg',
    'Images/steamPoster.jpeg',
    'Images/digArtPoster.jpeg',
    'Images/fineArtPoster.jpeg',
]
function limitNumberWithinRange(num, min, max){
    const MIN = min ?? 0;
    const MAX = max ?? noOfDots;
    const parsed = parseInt(num)
    return Math.min(Math.max(parsed, MIN), MAX)
}
function changeSlide(slide) {
    timeout()
    document.getElementById("carou" + limitNumberWithinRange(currentSlide)).classList.remove("selectedCarousel")
    document.getElementById("carou" + limitNumberWithinRange(currentSlide)).classList.add("unselectedCarousel")
    currentSlide = limitNumberWithinRange(slide)
    document.getElementById("partnerCarousel").style.left = "-" + (currentSlide * 302) + "px"
    document.getElementById("carou" + currentSlide).classList.remove("unselectedCarousel")
    document.getElementById("carou" + currentSlide).classList.add("selectedCarousel")
    console.log((currentSlide * 302))
}
function next(slide) {
    if (slide == "back") {
        if (currentSlide - 1 <= -1) {
            changeSlide(noOfDots)
        } else {
            changeSlide(currentSlide - 1)
        }
    } else if (slide == "front") {
        if (currentSlide + 1 > noOfDots) {
            changeSlide(0)
        } else {
            changeSlide(currentSlide + 1)
        }
        } else {
        changeSlide(slide)
    }
}
function timeout() {
        clearTimeout(currentTimeout)
        currentTimeout = setTimeout(function() {
                next("front")
            timeout();
        }, 5000);
    }
    timeout()

for (let i = 0; i < noOfDots+1; i++) { 
    document.getElementById("dotContainer").innerHTML = document.getElementById("dotContainer").innerHTML + '<button class="unselectedCarousel" style="width:10px; height:10px; border-radius:80px; margin:1px; cursor:pointer;" onclick="next('+ i +')"" id="carou'+ i +'"></button>'
}
changeSlide(currentSlide)

var touchUpdate;
let xPos;
let curTouch;
var touchStarted = false
function touchStart(event) {
clearTimeout(currentTimeout)
consideredClick = true
console.log(event.touches[0].pageX)
touchStarted = true
xPos = event.touches[0].pageX;
curTouch = (currentSlide * 302)
setTimeout(function() {
    consideredClick = false
}, 50);
}
function touchMove(event) {
    if (touchStarted == true) {
        event.preventDefault();

        if (event.touches[0].clientX < xPos) {
            console.log(event.touches[0].clientX - xPos)
            curTouch = event.touches[0].clientX * 0.5
            document.getElementById("partnerCarousel").style.left = - ((currentSlide * 302)  + (xPos - event.touches[0].clientX * 0.5)) + "px"
        } else {
        // you swiped right
            console.log(event.touches[0].clientX - xPos)
            curTouch = event.touches[0].clientX 
            document.getElementById("partnerCarousel").style.left = - ((currentSlide * 302) + (xPos - event.touches[0].clientX)) + "px"
        }
    }
    
}
function touchEnd(event) {
    if (touchStarted == true && consideredClick == false) {
        touchStarted = false
        console.log(Math.round((currentSlide * 302) + (xPos - curTouch))/ 302)
        changeSlide(Math.round(((currentSlide * 302) + (xPos - curTouch))/ 302));
    } else if (consideredClick == true) {
        openPoster(slideFiles[currentSlide])
    }
    consideredClick = false
};
