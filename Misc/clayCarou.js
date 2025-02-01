var claynoOfDots = null
var claynoOfItems = 6
var claycurrentSlide = 0
var claycurrentTimeout = null
function claylimitNumberWithinRange(num, min, max){
    const MIN = min ?? 0;
    const MAX = max ?? claynoOfDots;
    const parsed = parseInt(num)
    return Math.min(Math.max(parsed, MIN), MAX)
}
function claychangeSlide(slide) {
    claytimeout()
    document.getElementById("clayCarou" + claylimitNumberWithinRange(claycurrentSlide)).classList.remove("selectedCarousel")
    document.getElementById("clayCarou" + claylimitNumberWithinRange(claycurrentSlide)).classList.add("unselectedCarousel")
    claycurrentSlide = claylimitNumberWithinRange(slide)
    document.getElementById("clayCarousel").style.left = "-" + (claycurrentSlide * 346) + "px"
    document.getElementById("clayCarou" + claycurrentSlide).classList.remove("unselectedCarousel")
    document.getElementById("clayCarou" + claycurrentSlide).classList.add("selectedCarousel")
    console.log((claycurrentSlide * 346))
}
function claynext(slide) {
    if (slide == "back") {
        if (claycurrentSlide - 1 <= -1) {
            claychangeSlide(claynoOfDots)
        } else {
            claychangeSlide(claycurrentSlide - 1)
        }
    } else if (slide == "front") {
        if (claycurrentSlide + 1 > claynoOfDots) {
            claychangeSlide(0)
        } else {
            claychangeSlide(claycurrentSlide + 1)
        }
        } else {
            claychangeSlide(slide)
    }
}
function claytimeout() {
        clearTimeout(claycurrentTimeout)
        claycurrentTimeout = setTimeout(function() {
                claynext("front")
                claytimeout();
        }, 5000);
    }
    claytimeout()
function claydetectDots() {
    //detect size of screen and choose how many dots to display
    var claycurrentOnScreen = (Math.floor((window.innerWidth * (8/10))/ 346));
    if (claynoOfDots != claynoOfItems - claycurrentOnScreen) {
        document.getElementById("clayContainer").innerHTML = ""
        claynoOfDots = claynoOfItems - claycurrentOnScreen
        if ((window.innerWidth * (8/10))/ 346 * 346 < 346 && window.innerWidth < 1730) {
            claynoOfDots = claynoOfDots - 1
        } else if (window.innerWidth >= 1520) {
            claynoOfDots = claynoOfItems - 4
        }
        for (let i = 0; i < claynoOfDots+1; i++) { 
            document.getElementById("clayContainer").innerHTML = document.getElementById("clayContainer").innerHTML + '<button class="unselectedCarousel" style="width:10px; height:10px; border-radius:80px; margin:1px; cursor:pointer;" onclick="claynext('+ i +')"" id="clayCarou'+ i +'"></button>'
        }
        claychangeSlide(claycurrentSlide)
    }
}
claydetectDots();

$(window).resize(claydetectDots);

var claytouchUpdate;
let clayxPos;
let claycurTouch;

var claytouchStarted = false
const claytouchStart = (event) => {
clearTimeout(claycurrentTimeout)
console.log("clay")
claytouchStarted = true
clayxPos = event.touches[0].pageX;
claycurTouch = (claycurrentSlide * 346)
}

function claytouchMove(event) {
    if (claytouchStarted == true) {
        event.preventDefault();

        if (event.touches[0].clientX < clayxPos) {
            console.log(event.touches[0].clientX - clayxPos)
            claycurTouch = event.touches[0].clientX * 0.5
            document.getElementById("clayCarousel").style.left = - ((claycurrentSlide * 346)  + (clayxPos - event.touches[0].clientX * 0.5)) + "px"
        } else {
        // you swiped right
            console.log(event.touches[0].clientX - clayxPos)
            claycurTouch = event.touches[0].clientX 
            document.getElementById("clayCarousel").style.left = - ((claycurrentSlide * 346) + (clayxPos - event.touches[0].clientX)) + "px"
        }
    }
}
const claytouchEnd = (event) => {
    if (claytouchStarted == true) {
        claytouchStarted = false
        console.log(Math.round((claycurrentSlide * 346) + (clayxPos - claycurTouch))/ 346)
        claychangeSlide(Math.round(((claycurrentSlide * 346) + (clayxPos - claycurTouch))/ 346));
    }
};
