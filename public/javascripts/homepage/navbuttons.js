if (document.querySelectorAll("span").item(0).innerHTML === "" || document.querySelectorAll("span").item(0).innerHTML === "undefined") {
    // if user is not signed in 
    document.querySelector("#new").style.display = "none"
} else {
    // If user is signed in swap sign in to profile and change the listener in endscript.js
    document.querySelector("#sign").innerHTML = "PROFILE";
    document.querySelector("#login").style.display = "none";
}
