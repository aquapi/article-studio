// Create article button listener
document.querySelector("#new").addEventListener("click", () =>
    location.href = "/article/new"
);

// Set hover status
document.getElementById(location.pathname).style.backgroundColor = "whitesmoke";
document.getElementById(location.pathname).style.boxShadow = "none";

// Set previous search
if (sessionStorage.getItem("isSearching")) {
    document.querySelector(".search-bar").style.display = "flex";
    document.querySelector("input[type=text]").value = sessionStorage.getItem("search");
}

// Check whether user is signed in
$("#sign").click(() => {
    // Check whether user is signed in
    data.item(0).innerHTML === "undefined"
        || !data.item(0).innerHTML
        // Go to /signup if click SIGNUP
        ? location.replace('/signup')
        // Go to /profile if click PROFILE
        : location.replace('/article/profile');
});

// Search 
$("input[type=text]").keyup(() => {
    document.querySelector("#header-name").innerHTML = $("input[type=text]").val() ? "Search Result" : data.item(1).innerHTML;
    // Count found articles
    let count = 0;
    // Search the articles
    for (let e of $("#created-article").children("div").toArray()) {
        // Inner div
        let el = e.querySelector("div");
        // Input text
        let check = $("input[type=text]").val().toLowerCase();
        // Search method
        if (
            !$("input[type=text]").val()
            || contain(el.id.toLowerCase(), check)
            || containAll(
                el.className.split(" ").map(s => s.toLowerCase()),
                check
            )
        ) {
            // Display the article if matches
            e.style.display = "block";
            count++;
        } else
            // Hide the article if not matches
            e.style.display = "none";
    }
    // If articles match is more than 4
    document.querySelector("#created-article").style["justify-content"] = (count > 4 ? "flex-start" : "center");
    // Save search to sessionStorage
    sessionStorage.setItem("search", $("input[type=text]").val());
    sessionStorage.setItem("isSearching", $("input[type=text]").val() && document.querySelector(".search-bar").style.display !== "none")
});

// If articles count larger than 4
if (document.getElementsByClassName("created").length > 4)
    document.querySelector("#created-article").style["justify-content"] = "flex-start";

// If images cannot load
document.querySelectorAll("div > div > img").forEach(e =>
    e.addEventListener("error", () => e.src = 'images/image-icon.jpg')
)

// Load page banner
$(".wait").css("display", "block");

// Load created article part
$("#created-article").css("display", 'flex');

// Load body
$("body").css("display", 'block');

// Scroll to top
document.documentElement.scrollTop = Number(sessionStorage.getItem("scroll"));