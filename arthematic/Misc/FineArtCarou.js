var FineArtnoOfDots = null
var FineArtnoOfItems = 8
var FineArtcurrentSlide = 0
var FineArtcurrentTimeout = null
function FineArtlimitNumberWithinRange(num, min, max){
    const MIN = min ?? 0;
    const MAX = max ?? FineArtnoOfDots;
    const parsed = parseInt(num)
    return Math.min(Math.max(parsed, MIN), MAX)
}
function FineArtchangeSlide(slide) {
    FineArttimeout()
    document.getElementById("FineArtCarou" + FineArtlimitNumberWithinRange(FineArtcurrentSlide)).classList.remove("selectedCarousel")
    document.getElementById("FineArtCarou" + FineArtlimitNumberWithinRange(FineArtcurrentSlide)).classList.add("unselectedCarousel")
    FineArtcurrentSlide = FineArtlimitNumberWithinRange(slide)
    document.getElementById("FineArtCarousel").style.left = "-" + (FineArtcurrentSlide * 346) + "px"
    document.getElementById("FineArtCarou" + FineArtcurrentSlide).classList.remove("unselectedCarousel")
    document.getElementById("FineArtCarou" + FineArtcurrentSlide).classList.add("selectedCarousel")
    console.log((FineArtcurrentSlide * 346))
}
function FineArtnext(slide) {
    if (slide == "back") {
        if (FineArtcurrentSlide - 1 <= -1) {
            FineArtchangeSlide(FineArtnoOfDots)
        } else {
            FineArtchangeSlide(FineArtcurrentSlide - 1)
        }
    } else if (slide == "front") {
        if (FineArtcurrentSlide + 1 > FineArtnoOfDots) {
            FineArtchangeSlide(0)
        } else {
            FineArtchangeSlide(FineArtcurrentSlide + 1)
        }
        } else {
            FineArtchangeSlide(slide)
    }
}
function FineArttimeout() {
        clearTimeout(FineArtcurrentTimeout)
        FineArtcurrentTimeout = setTimeout(function() {
                FineArtnext("front")
                FineArttimeout();
        }, 5000);
    }
    FineArttimeout()
function FineArtdetectDots() {
    //detect size of screen and choose how many dots to display
    var FineArtcurrentOnScreen = (Math.floor((window.innerWidth * (8/10))/ 346));
    if (FineArtnoOfDots != FineArtnoOfItems - FineArtcurrentOnScreen) {
        document.getElementById("FineArtContainer").innerHTML = ""
        FineArtnoOfDots = FineArtnoOfItems - FineArtcurrentOnScreen
        if ((window.innerWidth * (8/10))/ 346 * 346 < 346 && window.innerWidth < 1730) {
            FineArtnoOfDots = FineArtnoOfDots - 1
        } else if (window.innerWidth >= 1520) {
            FineArtnoOfDots = FineArtnoOfItems - 3
        }
        for (let i = 0; i < FineArtnoOfDots+1; i++) { 
            document.getElementById("FineArtContainer").innerHTML = document.getElementById("FineArtContainer").innerHTML + '<button class="unselectedCarousel" style="width:10px; height:10px; border-radius:80px; margin:1px; cursor:pointer;" onclick="FineArtnext('+ i +')"" id="FineArtCarou'+ i +'"></button>'
        }
        FineArtchangeSlide(FineArtcurrentSlide)
    }
}
FineArtdetectDots();

$(window).resize(FineArtdetectDots);

var FineArttouchUpdate;
let FineArtxPos;
let FineArtcurTouch;

var FineArttouchStarted = false
const FineArttouchStart = (event) => {
clearTimeout(FineArtcurrentTimeout)
console.log("FineArt")
FineArttouchStarted = true
FineArtxPos = event.touches[0].pageX;
FineArtcurTouch = (FineArtcurrentSlide * 346)
}

function FineArttouchMove(event) {
    if (FineArttouchStarted == true) {
        event.preventDefault();

        if (event.touches[0].clientX < FineArtxPos) {
            console.log(event.touches[0].clientX - FineArtxPos)
            FineArtcurTouch = event.touches[0].clientX * 0.5
            document.getElementById("FineArtCarousel").style.left = - ((FineArtcurrentSlide * 346)  + (FineArtxPos - event.touches[0].clientX * 0.5)) + "px"
        } else {
        // you swiped right
            console.log(event.touches[0].clientX - FineArtxPos)
            FineArtcurTouch = event.touches[0].clientX 
            document.getElementById("FineArtCarousel").style.left = - ((FineArtcurrentSlide * 346) + (FineArtxPos - event.touches[0].clientX)) + "px"
        }
    }
}
const FineArttouchEnd = (event) => {
    if (FineArttouchStarted == true) {
        FineArttouchStarted = false
        console.log(Math.round((FineArtcurrentSlide * 346) + (FineArtxPos - FineArtcurTouch))/ 346)
        FineArtchangeSlide(Math.round(((FineArtcurrentSlide * 346) + (FineArtxPos - FineArtcurTouch))/ 346));
    }
};
