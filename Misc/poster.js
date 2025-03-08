function openPoster(file) {
    document.getElementById("posterEnlarged").style.display = "block"
    document.getElementById("posterImg").src = file
}

function closePoster() {
    document.getElementById("posterEnlarged").style.display = "none"
    document.getElementById("posterImg").src = ""
}