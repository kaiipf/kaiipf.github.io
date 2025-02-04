var comicnoOfDots = null
var comicnoOfItems = 6
var comiccurrentSlide = 0
var comiccurrentTimeout = null
function comiclimitNumberWithinRange(num, min, max){
    const MIN = min ?? 0;
    const MAX = max ?? comicnoOfDots;
    const parsed = parseInt(num)
    return Math.min(Math.max(parsed, MIN), MAX)
}
function comicchangeSlide(slide) {
    comictimeout()
    document.getElementById("comicCarou" + comiclimitNumberWithinRange(comiccurrentSlide)).classList.remove("selectedCarousel")
    document.getElementById("comicCarou" + comiclimitNumberWithinRange(comiccurrentSlide)).classList.add("unselectedCarousel")
    comiccurrentSlide = comiclimitNumberWithinRange(slide)
    document.getElementById("comicCarousel").style.left = "-" + (comiccurrentSlide * 346) + "px"
    document.getElementById("comicCarou" + comiccurrentSlide).classList.remove("unselectedCarousel")
    document.getElementById("comicCarou" + comiccurrentSlide).classList.add("selectedCarousel")
    console.log((comiccurrentSlide * 346))
}
function comicnext(slide) {
    if (slide == "back") {
        if (comiccurrentSlide - 1 <= -1) {
            comicchangeSlide(comicnoOfDots)
        } else {
            comicchangeSlide(comiccurrentSlide - 1)
        }
    } else if (slide == "front") {
        if (comiccurrentSlide + 1 > comicnoOfDots) {
            comicchangeSlide(0)
        } else {
            comicchangeSlide(comiccurrentSlide + 1)
        }
        } else {
            comicchangeSlide(slide)
    }
}
function comictimeout() {
        clearTimeout(comiccurrentTimeout)
        comiccurrentTimeout = setTimeout(function() {
                comicnext("front")
                comictimeout();
        }, 5000);
    }
    comictimeout()
function comicdetectDots() {
    //detect size of screen and choose how many dots to display
    var comiccurrentOnScreen = (Math.floor((window.innerWidth * (8/10))/ 346));
    if (comicnoOfDots != comicnoOfItems - comiccurrentOnScreen) {
        document.getElementById("comicContainer").innerHTML = ""
        comicnoOfDots = comicnoOfItems - comiccurrentOnScreen
        if ((window.innerWidth * (8/10))/ 346 * 346 < 346 && window.innerWidth < 1730) {
            comicnoOfDots = comicnoOfDots - 1
        } else if (window.innerWidth >= 1520) {
            comicnoOfDots = comicnoOfItems - 3
        }
        for (let i = 0; i < comicnoOfDots+1; i++) { 
            document.getElementById("comicContainer").innerHTML = document.getElementById("comicContainer").innerHTML + '<button class="unselectedCarousel" style="width:10px; height:10px; border-radius:80px; margin:1px; cursor:pointer;" onclick="comicnext('+ i +')"" id="comicCarou'+ i +'"></button>'
        }
        comicchangeSlide(comiccurrentSlide)
    }
}
comicdetectDots();

$(window).resize(comicdetectDots);

var comictouchUpdate;
let comicxPos;
let comiccurTouch;

var comictouchStarted = false
const comictouchStart = (event) => {
clearTimeout(comiccurrentTimeout)
console.log("comic")
comictouchStarted = true
comicxPos = event.touches[0].pageX;
comiccurTouch = (comiccurrentSlide * 346)
}

function comictouchMove(event) {
    if (comictouchStarted == true) {
        event.preventDefault();

        if (event.touches[0].clientX < comicxPos) {
            console.log(event.touches[0].clientX - comicxPos)
            comiccurTouch = event.touches[0].clientX * 0.5
            document.getElementById("comicCarousel").style.left = - ((comiccurrentSlide * 346)  + (comicxPos - event.touches[0].clientX * 0.5)) + "px"
        } else {
        // you swiped right
            console.log(event.touches[0].clientX - comicxPos)
            comiccurTouch = event.touches[0].clientX 
            document.getElementById("comicCarousel").style.left = - ((comiccurrentSlide * 346) + (comicxPos - event.touches[0].clientX)) + "px"
        }
    }
}
const comictouchEnd = (event) => {
    if (comictouchStarted == true) {
        comictouchStarted = false
        console.log(Math.round((comiccurrentSlide * 346) + (comicxPos - comiccurTouch))/ 346)
        comicchangeSlide(Math.round(((comiccurrentSlide * 346) + (comicxPos - comiccurTouch))/ 346));
    }
};
