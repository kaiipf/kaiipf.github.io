var programnoOfDots = 5
var programnoOfItems = 6
var programcurrentSlide = 0
var programcurrentTimeout = null
var consideredClick = false

var slideFiles = [
    'Images/visualArtPoster.jpeg',
    'Images/storyBrdPoster.jpeg',
    'Images/clayPoster.jpeg',
    'Images/steamPoster.jpeg',
    'Images/digArtPoster.jpeg',
    'Images/fineArtPoster.jpeg',
]

function programlimitNumberWithinRange(num, min, max){
    const MIN = min ?? 0;
    const MAX = max ?? programnoOfDots;
    const parsed = parseInt(num)
    return Math.min(Math.max(parsed, MIN), MAX)
}
function programchangeSlide(slide) {
    programtimeout()
    document.getElementById("programCarou" + programlimitNumberWithinRange(programcurrentSlide)).classList.remove("selectedCarousel")
    document.getElementById("programCarou" + programlimitNumberWithinRange(programcurrentSlide)).classList.add("unselectedCarousel")
    programcurrentSlide = programlimitNumberWithinRange(slide)
    document.getElementById("programCarousel").style.left = "-" + (programcurrentSlide * 302) + "px"
    document.getElementById("programCarou" + programcurrentSlide).classList.remove("unselectedCarousel")
    document.getElementById("programCarou" + programcurrentSlide).classList.add("selectedCarousel")
    console.log((programcurrentSlide * 302))
}
function programnext(slide) {
    if (slide == "back") {
        if (programcurrentSlide - 1 <= -1) {
            programchangeSlide(programnoOfDots)
        } else {
            programchangeSlide(programcurrentSlide - 1)
        }
    } else if (slide == "front") {
        if (programcurrentSlide + 1 > programnoOfDots) {
            programchangeSlide(0)
        } else {
            programchangeSlide(programcurrentSlide + 1)
        }
        } else {
            programchangeSlide(slide)
    }
}
function programtimeout() {
        clearTimeout(programcurrentTimeout)
        programcurrentTimeout = setTimeout(function() {
                programnext("front")
                programtimeout();
        }, 5000);
    }
    programtimeout()

for (let i = 0; i < programnoOfDots+1; i++) { 
    document.getElementById("programContainer").innerHTML = document.getElementById("programContainer").innerHTML + '<button class="unselectedCarousel" style="width:10px; height:10px; border-radius:80px; margin:1px; cursor:pointer;" onclick="programnext('+ i +')"" id="programCarou'+ i +'"></button>'
}
programchangeSlide(0)

var programtouchUpdate;
let programxPos;
let programcurTouch;

var programtouchStarted = false
const programtouchStart = (event) => {
clearTimeout(programcurrentTimeout)
console.log("program")
programtouchStarted = true
programxPos = event.touches[0].pageX;
programcurTouch = (programcurrentSlide * 302)
setTimeout(function() {
    consideredClick = false
}, 50);
}

function programtouchMove(event) {
    if (programtouchStarted == true) {
        event.preventDefault();

        if (event.touches[0].clientX < programxPos) {
            console.log(event.touches[0].clientX - programxPos)
            programcurTouch = event.touches[0].clientX * 0.5
            document.getElementById("programCarousel").style.left = - ((programcurrentSlide * 302)  + (programxPos - event.touches[0].clientX * 0.5)) + "px"
        } else {
        // you swiped right
            console.log(event.touches[0].clientX - programxPos)
            programcurTouch = event.touches[0].clientX 
            document.getElementById("programCarousel").style.left = - ((programcurrentSlide * 302) + (programxPos - event.touches[0].clientX)) + "px"
        }
    }
}
const programtouchEnd = (event) => {
    if (consideredClick == true) {
        openPoster(slideFiles[currentSlide])
    } 
    if (programtouchStarted == true) {
        programtouchStarted = false
        console.log(Math.round((programcurrentSlide * 302) + (programxPos - programcurTouch))/ 302)
        programchangeSlide(Math.round(((programcurrentSlide * 302) + (programxPos - programcurTouch))/ 302));
    } 
    consideredClick = false
};
