var dinoCampnoOfDots = null
var dinoCampnoOfItems = 6
var dinoCampcurrentSlide = 0
var dinoCampcurrentTimeout = null
function dinoCamplimitNumberWithinRange(num, min, max){
    const MIN = min ?? 0;
    const MAX = max ?? dinoCampnoOfDots;
    const parsed = parseInt(num)
    return Math.min(Math.max(parsed, MIN), MAX)
}
function dinoCampchangeSlide(slide) {
    dinoCamptimeout()
    document.getElementById("dinoCampCarou" + dinoCamplimitNumberWithinRange(dinoCampcurrentSlide)).classList.remove("selectedCarousel")
    document.getElementById("dinoCampCarou" + dinoCamplimitNumberWithinRange(dinoCampcurrentSlide)).classList.add("unselectedCarousel")
    dinoCampcurrentSlide = dinoCamplimitNumberWithinRange(slide)
    document.getElementById("dinoCampCarousel").style.left = "-" + (dinoCampcurrentSlide * 346) + "px"
    document.getElementById("dinoCampCarou" + dinoCampcurrentSlide).classList.remove("unselectedCarousel")
    document.getElementById("dinoCampCarou" + dinoCampcurrentSlide).classList.add("selectedCarousel")
    console.log((dinoCampcurrentSlide * 346))
}
function dinoCampnext(slide) {
    if (slide == "back") {
        if (dinoCampcurrentSlide - 1 <= -1) {
            dinoCampchangeSlide(dinoCampnoOfDots)
        } else {
            dinoCampchangeSlide(dinoCampcurrentSlide - 1)
        }
    } else if (slide == "front") {
        if (dinoCampcurrentSlide + 1 > dinoCampnoOfDots) {
            dinoCampchangeSlide(0)
        } else {
            dinoCampchangeSlide(dinoCampcurrentSlide + 1)
        }
        } else {
            dinoCampchangeSlide(slide)
    }
}
function dinoCamptimeout() {
        clearTimeout(dinoCampcurrentTimeout)
        dinoCampcurrentTimeout = setTimeout(function() {
                dinoCampnext("front")
                dinoCamptimeout();
        }, 5000);
    }
    dinoCamptimeout()
function dinoCampdetectDots() {
    //detect size of screen and choose how many dots to display
    var dinoCampcurrentOnScreen = (Math.floor((window.innerWidth * (8/10))/ 346));
    if (dinoCampnoOfDots != dinoCampnoOfItems - dinoCampcurrentOnScreen) {
        document.getElementById("dinoCampContainer").innerHTML = ""
        dinoCampnoOfDots = dinoCampnoOfItems - dinoCampcurrentOnScreen
        if ((window.innerWidth * (8/10))/ 346 * 346 < 346 && window.innerWidth < 1730) {
            dinoCampnoOfDots = dinoCampnoOfDots - 1
        } else if (window.innerWidth >= 1520) {
            dinoCampnoOfDots = dinoCampnoOfItems - 3
        }
        for (let i = 0; i < dinoCampnoOfDots+1; i++) { 
            document.getElementById("dinoCampContainer").innerHTML = document.getElementById("dinoCampContainer").innerHTML + '<button class="unselectedCarousel" style="width:10px; height:10px; border-radius:80px; margin:1px; cursor:pointer;" onclick="dinoCampnext('+ i +')"" id="dinoCampCarou'+ i +'"></button>'
        }
        dinoCampchangeSlide(dinoCampcurrentSlide)
    }
}
dinoCampdetectDots();

$(window).resize(dinoCampdetectDots);

var dinoCamptouchUpdate;
let dinoCampxPos;
let dinoCampcurTouch;

var dinoCamptouchStarted = false
const dinoCamptouchStart = (event) => {
clearTimeout(dinoCampcurrentTimeout)
console.log("dinoCamp")
dinoCamptouchStarted = true
dinoCampxPos = event.touches[0].pageX;
dinoCampcurTouch = (dinoCampcurrentSlide * 346)
}

function dinoCamptouchMove(event) {
    if (dinoCamptouchStarted == true) {
        event.preventDefault();

        if (event.touches[0].clientX < dinoCampxPos) {
            console.log(event.touches[0].clientX - dinoCampxPos)
            dinoCampcurTouch = event.touches[0].clientX * 0.5
            document.getElementById("dinoCampCarousel").style.left = - ((dinoCampcurrentSlide * 346)  + (dinoCampxPos - event.touches[0].clientX * 0.5)) + "px"
        } else {
        // you swiped right
            console.log(event.touches[0].clientX - dinoCampxPos)
            dinoCampcurTouch = event.touches[0].clientX 
            document.getElementById("dinoCampCarousel").style.left = - ((dinoCampcurrentSlide * 346) + (dinoCampxPos - event.touches[0].clientX)) + "px"
        }
    }
}
const dinoCamptouchEnd = (event) => {
    if (dinoCamptouchStarted == true) {
        dinoCamptouchStarted = false
        console.log(Math.round((dinoCampcurrentSlide * 346) + (dinoCampxPos - dinoCampcurTouch))/ 346)
        dinoCampchangeSlide(Math.round(((dinoCampcurrentSlide * 346) + (dinoCampxPos - dinoCampcurTouch))/ 346));
    }
};
