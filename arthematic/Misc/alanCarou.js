var alannoOfDots = null
var alannoOfItems = 5
var alancurrentSlide = 0
var alancurrentTimeout = null
function alanlimitNumberWithinRange(num, min, max){
    const MIN = min ?? 0;
    const MAX = max ?? alannoOfDots;
    const parsed = parseInt(num)
    return Math.min(Math.max(parsed, MIN), MAX)
}
function alanchangeSlide(slide) {
    alantimeout()
    document.getElementById("alanCarou" + alanlimitNumberWithinRange(alancurrentSlide)).classList.remove("selectedCarousel")
    document.getElementById("alanCarou" + alanlimitNumberWithinRange(alancurrentSlide)).classList.add("unselectedCarousel")
    alancurrentSlide = alanlimitNumberWithinRange(slide)
    document.getElementById("alanCarousel").style.left = "-" + (alancurrentSlide * 266) + "px"
    document.getElementById("alanCarou" + alancurrentSlide).classList.remove("unselectedCarousel")
    document.getElementById("alanCarou" + alancurrentSlide).classList.add("selectedCarousel")
    console.log((alancurrentSlide * 266))
}
function alannext(slide) {
    if (slide == "back") {
        if (alancurrentSlide - 1 <= -1) {
            alanchangeSlide(alannoOfDots)
        } else {
            alanchangeSlide(alancurrentSlide - 1)
        }
    } else if (slide == "front") {
        if (alancurrentSlide + 1 > alannoOfDots) {
            alanchangeSlide(0)
        } else {
            alanchangeSlide(alancurrentSlide + 1)
        }
        } else {
            alanchangeSlide(slide)
    }
}
function alantimeout() {
        clearTimeout(alancurrentTimeout)
        alancurrentTimeout = setTimeout(function() {
                alannext("front")
                alantimeout();
        }, 5000);
    }
    alantimeout()
function alandetectDots() {
    //detect size of screen and choose how many dots to display
    var alancurrentOnScreen = (Math.floor((window.innerWidth * (8/10))/ 266));
    if (alannoOfDots != alannoOfItems - alancurrentOnScreen) {
        document.getElementById("alanContainer").innerHTML = ""
        alannoOfDots = alannoOfItems - alancurrentOnScreen
        if ((window.innerWidth * (8/10))/ 266 * 266 < 266 && window.innerWidth < 1520) {
            alannoOfDots = alannoOfDots - 1
        } else if (window.innerWidth >= 1520) {
            alannoOfDots = 1
        }
        for (let i = 0; i < alannoOfDots+1; i++) { 
            document.getElementById("alanContainer").innerHTML = document.getElementById("alanContainer").innerHTML + '<button class="unselectedCarousel" style="width:10px; height:10px; border-radius:80px; margin:1px; cursor:pointer;" onclick="alannext('+ i +')"" id="alanCarou'+ i +'"></button>'
        }
        alanchangeSlide(alancurrentSlide)
    }
}
alandetectDots();

$(window).resize(alandetectDots);

var alantouchUpdate;
let alanxPos;
let alancurTouch;

var alantouchStarted = false
const alantouchStart = (event) => {
clearTimeout(alancurrentTimeout)
console.log("alan")
alantouchStarted = true
alanxPos = event.touches[0].pageX;
alancurTouch = (alancurrentSlide * 266)
}

function alantouchMove(event) {
    if (alantouchStarted == true) {
        event.preventDefault();

        if (event.touches[0].clientX < alanxPos) {
            console.log(event.touches[0].clientX - alanxPos)
            alancurTouch = event.touches[0].clientX * 0.5
            document.getElementById("alanCarousel").style.left = - ((alancurrentSlide * 266)  + (alanxPos - event.touches[0].clientX * 0.5)) + "px"
        } else {
        // you swiped right
            console.log(event.touches[0].clientX - alanxPos)
            alancurTouch = event.touches[0].clientX 
            document.getElementById("alanCarousel").style.left = - ((alancurrentSlide * 266) + (alanxPos - event.touches[0].clientX)) + "px"
        }
    }
}
const alantouchEnd = (event) => {
    if (alantouchStarted == true) {
        alantouchStarted = false
        console.log(Math.round((alancurrentSlide * 266) + (alanxPos - alancurTouch))/ 266)
        alanchangeSlide(Math.round(((alancurrentSlide * 266) + (alanxPos - alancurTouch))/ 266));
    }
};
