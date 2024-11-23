var quotenoOfDots = null
var quotenoOfItems = 5
var quotecurrentSlide = 0
var quotecurrentTimeout = null
function quotelimitNumberWithinRange(num, min, max){
    const MIN = min ?? 0;
    const MAX = max ?? quotenoOfDots;
    const parsed = parseInt(num)
    return Math.min(Math.max(parsed, MIN), MAX)
}
function quotechangeSlide(slide) {
    quotetimeout()
    document.getElementById("quoteCarou" + quotelimitNumberWithinRange(quotecurrentSlide)).classList.remove("selectedCarousel")
    document.getElementById("quoteCarou" + quotelimitNumberWithinRange(quotecurrentSlide)).classList.add("unselectedCarousel")
    quotecurrentSlide = quotelimitNumberWithinRange(slide)
    document.getElementById("quoteCarousel").style.left = "-" + (quotecurrentSlide * 346) + "px"
    document.getElementById("quoteCarou" + quotecurrentSlide).classList.remove("unselectedCarousel")
    document.getElementById("quoteCarou" + quotecurrentSlide).classList.add("selectedCarousel")
    console.log((quotecurrentSlide * 346))
}
function quotenext(slide) {
    if (slide == "back") {
        if (quotecurrentSlide - 1 <= -1) {
            quotechangeSlide(quotenoOfDots)
        } else {
            quotechangeSlide(quotecurrentSlide - 1)
        }
    } else if (slide == "front") {
        if (quotecurrentSlide + 1 > quotenoOfDots) {
            quotechangeSlide(0)
        } else {
            quotechangeSlide(quotecurrentSlide + 1)
        }
        } else {
            quotechangeSlide(slide)
    }
}
function quotetimeout() {
        clearTimeout(quotecurrentTimeout)
        quotecurrentTimeout = setTimeout(function() {
                quotenext("front")
                quotetimeout();
        }, 5000);
    }
    quotetimeout()
function quotedetectDots() {
    //detect size of screen and choose how many dots to display
    var quotecurrentOnScreen = (Math.floor((window.innerWidth * (8/10))/ 346));
    if (quotenoOfDots != quotenoOfItems - quotecurrentOnScreen) {
        document.getElementById("quoteContainer").innerHTML = ""
        quotenoOfDots = quotenoOfItems - quotecurrentOnScreen
        if ((window.innerWidth * (8/10))/ 346 * 346 < 346) {
            quotenoOfDots = quotenoOfDots - 1
        }
        for (let i = 0; i < quotenoOfDots+1; i++) { 
            document.getElementById("quoteContainer").innerHTML = document.getElementById("quoteContainer").innerHTML + '<button class="unselectedCarousel" style="width:10px; height:10px; border-radius:80px; margin:1px; cursor:pointer;" onclick="quotenext('+ i +')"" id="quoteCarou'+ i +'"></button>'
        }
        quotechangeSlide(quotecurrentSlide)
    }
}
quotedetectDots();

$(window).resize(quotedetectDots);

var quotetouchUpdate;
let quotexPos;
let quotecurTouch;

var quotetouchStarted = false
const quotetouchStart = (event) => {
clearTimeout(quotecurrentTimeout)
console.log("quote")
quotetouchStarted = true
quotexPos = event.touches[0].pageX;
quotecurTouch = (quotecurrentSlide * 346)
}

function quotetouchMove(event) {
    if (quotetouchStarted == true) {
        event.preventDefault();

        if (event.touches[0].clientX < quotexPos) {
            console.log(event.touches[0].clientX - quotexPos)
            quotecurTouch = event.touches[0].clientX * 0.5
            document.getElementById("quoteCarousel").style.left = - ((quotecurrentSlide * 346)  + (quotexPos - event.touches[0].clientX * 0.5)) + "px"
        } else {
        // you swiped right
            console.log(event.touches[0].clientX - quotexPos)
            quotecurTouch = event.touches[0].clientX 
            document.getElementById("quoteCarousel").style.left = - ((quotecurrentSlide * 346) + (quotexPos - event.touches[0].clientX)) + "px"
        }
    }
}
const quotetouchEnd = (event) => {
    if (quotetouchStarted == true) {
        quotetouchStarted = false
        console.log(Math.round((quotecurrentSlide * 346) + (quotexPos - quotecurTouch))/ 346)
        quotechangeSlide(Math.round(((quotecurrentSlide * 346) + (quotexPos - quotecurTouch))/ 346));
    }
};
