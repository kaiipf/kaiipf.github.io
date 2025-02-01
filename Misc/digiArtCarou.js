var digiArtnoOfDots = null
var digiArtnoOfItems = 6
var digiArtcurrentSlide = 0
var digiArtcurrentTimeout = null
function digiArtlimitNumberWithinRange(num, min, max){
    const MIN = min ?? 0;
    const MAX = max ?? digiArtnoOfDots;
    const parsed = parseInt(num)
    return Math.min(Math.max(parsed, MIN), MAX)
}
function digiArtchangeSlide(slide) {
    digiArttimeout()
    document.getElementById("digiArtCarou" + digiArtlimitNumberWithinRange(digiArtcurrentSlide)).classList.remove("selectedCarousel")
    document.getElementById("digiArtCarou" + digiArtlimitNumberWithinRange(digiArtcurrentSlide)).classList.add("unselectedCarousel")
    digiArtcurrentSlide = digiArtlimitNumberWithinRange(slide)
    document.getElementById("digiArtCarousel").style.left = "-" + (digiArtcurrentSlide * 346) + "px"
    document.getElementById("digiArtCarou" + digiArtcurrentSlide).classList.remove("unselectedCarousel")
    document.getElementById("digiArtCarou" + digiArtcurrentSlide).classList.add("selectedCarousel")
    console.log((digiArtcurrentSlide * 346))
}
function digiArtnext(slide) {
    if (slide == "back") {
        if (digiArtcurrentSlide - 1 <= -1) {
            digiArtchangeSlide(digiArtnoOfDots)
        } else {
            digiArtchangeSlide(digiArtcurrentSlide - 1)
        }
    } else if (slide == "front") {
        if (digiArtcurrentSlide + 1 > digiArtnoOfDots) {
            digiArtchangeSlide(0)
        } else {
            digiArtchangeSlide(digiArtcurrentSlide + 1)
        }
        } else {
            digiArtchangeSlide(slide)
    }
}
function digiArttimeout() {
        clearTimeout(digiArtcurrentTimeout)
        digiArtcurrentTimeout = setTimeout(function() {
                digiArtnext("front")
                digiArttimeout();
        }, 5000);
    }
    digiArttimeout()
function digiArtdetectDots() {
    //detect size of screen and choose how many dots to display
    var digiArtcurrentOnScreen = (Math.floor((window.innerWidth * (8/10))/ 346));
    if (digiArtnoOfDots != digiArtnoOfItems - digiArtcurrentOnScreen) {
        document.getElementById("digiArtContainer").innerHTML = ""
        digiArtnoOfDots = digiArtnoOfItems - digiArtcurrentOnScreen
        if ((window.innerWidth * (8/10))/ 346 * 346 < 346 && window.innerWidth < 1730) {
            digiArtnoOfDots = digiArtnoOfDots - 1
        } else if (window.innerWidth >= 1520) {
            digiArtnoOfDots = digiArtnoOfItems - 4
        }
        for (let i = 0; i < digiArtnoOfDots+1; i++) { 
            document.getElementById("digiArtContainer").innerHTML = document.getElementById("digiArtContainer").innerHTML + '<button class="unselectedCarousel" style="width:10px; height:10px; border-radius:80px; margin:1px; cursor:pointer;" onclick="digiArtnext('+ i +')"" id="digiArtCarou'+ i +'"></button>'
        }
        digiArtchangeSlide(digiArtcurrentSlide)
    }
}
digiArtdetectDots();

$(window).resize(digiArtdetectDots);

var digiArttouchUpdate;
let digiArtxPos;
let digiArtcurTouch;

var digiArttouchStarted = false
const digiArttouchStart = (event) => {
clearTimeout(digiArtcurrentTimeout)
console.log("digiArt")
digiArttouchStarted = true
digiArtxPos = event.touches[0].pageX;
digiArtcurTouch = (digiArtcurrentSlide * 346)
}

function digiArttouchMove(event) {
    if (digiArttouchStarted == true) {
        event.preventDefault();

        if (event.touches[0].clientX < digiArtxPos) {
            console.log(event.touches[0].clientX - digiArtxPos)
            digiArtcurTouch = event.touches[0].clientX * 0.5
            document.getElementById("digiArtCarousel").style.left = - ((digiArtcurrentSlide * 346)  + (digiArtxPos - event.touches[0].clientX * 0.5)) + "px"
        } else {
        // you swiped right
            console.log(event.touches[0].clientX - digiArtxPos)
            digiArtcurTouch = event.touches[0].clientX 
            document.getElementById("digiArtCarousel").style.left = - ((digiArtcurrentSlide * 346) + (digiArtxPos - event.touches[0].clientX)) + "px"
        }
    }
}
const digiArttouchEnd = (event) => {
    if (digiArttouchStarted == true) {
        digiArttouchStarted = false
        console.log(Math.round((digiArtcurrentSlide * 346) + (digiArtxPos - digiArtcurTouch))/ 346)
        digiArtchangeSlide(Math.round(((digiArtcurrentSlide * 346) + (digiArtxPos - digiArtcurTouch))/ 346));
    }
};
