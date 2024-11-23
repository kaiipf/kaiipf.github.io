var thumbnoOfDots = null
var thumbnoOfItems = 5
var thumbcurrentSlide = 0
var thumbcurrentTimeout = null
function thumblimitNumberWithinRange(num, min, max){
    const MIN = min ?? 0;
    const MAX = max ?? thumbnoOfDots;
    const parsed = parseInt(num)
    return Math.min(Math.max(parsed, MIN), MAX)
}
function thumbchangeSlide(slide) {
    thumbtimeout()
    document.getElementById("thumbCarou" + thumblimitNumberWithinRange(thumbcurrentSlide)).classList.remove("selectedCarousel")
    document.getElementById("thumbCarou" + thumblimitNumberWithinRange(thumbcurrentSlide)).classList.add("unselectedCarousel")
    thumbcurrentSlide = thumblimitNumberWithinRange(slide)
    document.getElementById("thumbCarousel").style.left = "-" + (thumbcurrentSlide * 346) + "px"
    document.getElementById("thumbCarou" + thumbcurrentSlide).classList.remove("unselectedCarousel")
    document.getElementById("thumbCarou" + thumbcurrentSlide).classList.add("selectedCarousel")
    console.log((thumbcurrentSlide * 346))
}
function thumbnext(slide) {
    if (slide == "back") {
        if (thumbcurrentSlide - 1 <= -1) {
            thumbchangeSlide(thumbnoOfDots)
        } else {
            thumbchangeSlide(thumbcurrentSlide - 1)
        }
    } else if (slide == "front") {
        if (thumbcurrentSlide + 1 > thumbnoOfDots) {
            thumbchangeSlide(0)
        } else {
            thumbchangeSlide(thumbcurrentSlide + 1)
        }
        } else {
            thumbchangeSlide(slide)
    }
}
function thumbtimeout() {
        clearTimeout(thumbcurrentTimeout)
        thumbcurrentTimeout = setTimeout(function() {
                thumbnext("front")
                thumbtimeout();
        }, 5000);
    }
    thumbtimeout()
function thumbdetectDots() {
    //detect size of screen and choose how many dots to display
    var thumbcurrentOnScreen = (Math.floor((window.innerWidth * (8/10))/ 346));
    if (thumbnoOfDots != thumbnoOfItems - thumbcurrentOnScreen) {
        document.getElementById("thumbContainer").innerHTML = ""
        thumbnoOfDots = thumbnoOfItems - thumbcurrentOnScreen
        if ((window.innerWidth * (8/10))/ 346 * 346 < 346) {
            thumbnoOfDots = thumbnoOfDots - 1
        }
        for (let i = 0; i < thumbnoOfDots+1; i++) { 
            document.getElementById("thumbContainer").innerHTML = document.getElementById("thumbContainer").innerHTML + '<button class="unselectedCarousel" style="width:10px; height:10px; border-radius:80px; margin:1px; cursor:pointer;" onclick="thumbnext('+ i +')"" id="thumbCarou'+ i +'"></button>'
        }
        thumbchangeSlide(thumbcurrentSlide)
    }
}
thumbdetectDots();

$(window).resize(thumbdetectDots);

var thumbtouchUpdate;
let thumbxPos;
let thumbcurTouch;

var thumbtouchStarted = false
const thumbtouchStart = (event) => {
clearTimeout(thumbcurrentTimeout)
console.log("thumb")
thumbtouchStarted = true
thumbxPos = event.touches[0].pageX;
thumbcurTouch = (thumbcurrentSlide * 346)
}

function thumbtouchMove(event) {
    if (thumbtouchStarted == true) {
        event.preventDefault();

        if (event.touches[0].clientX < xPos) {
            console.log(event.touches[0].clientX - xPos)
            thumbcurTouch = event.touches[0].clientX * 0.5
            document.getElementById("thumbCarousel").style.left = - ((thumbcurrentSlide * 346)  + (thumbxPos - event.touches[0].clientX * 0.5)) + "px"
        } else {
        // you swiped right
            console.log(event.touches[0].clientX - xPos)
            thumbcurTouch = event.touches[0].clientX 
            document.getElementById("thumbCarousel").style.left = - ((thumbcurrentSlide * 346) + (thumbxPos - event.touches[0].clientX)) + "px"
        }
    }
}
const thumbtouchEnd = (event) => {
    if (thumbtouchStarted == true) {
        thumbtouchStarted = false
        console.log(Math.round((thumbcurrentSlide * 346) + (thumbxPos - thumbcurTouch))/ 346)
        thumbchangeSlide(Math.round(((thumbcurrentSlide * 346) + (thumbxPos - thumbcurTouch))/ 346));
    }
};
