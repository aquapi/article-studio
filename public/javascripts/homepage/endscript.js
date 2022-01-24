// Create article button listener
document.querySelector("#new").addEventListener("click", () =>
    location.replace("/article/new")
);

// Set hover status
document.getElementById(location.pathname).style.backgroundColor = "whitesmoke";
document.getElementById(location.pathname).style.boxShadow = "none";

// Check whether user is signed up
$("#sign").click(() => data.item(0).innerHTML === "undefined" || !data.item(0).innerHTML ? location.replace('/signup') : location.replace('/article/profile'));

// Search 
$("input[type=text]").keyup(() => {
    document.querySelector("#header-name").innerHTML = $("input[type=text]").val() ? "Search Result" : data.item(1).innerHTML;
    let count = 0;
    for (let e of $("#created-article").children("div").toArray()) {
        let el = e.querySelector("div");
        let check = $("input[type=text]").val().toLowerCase();
        // Search method
        if (!$("input[type=text]").val() || contain(el.id.toLowerCase(), check) || contain(el.className.toLowerCase(), check)) {
            e.style.display = "block";
            count++;
        } else
            e.style.display = "none";
    }
    // If articles match is more than 4
    document.querySelector("#created-article").style["justify-content"] = (count > 4 ? "flex-start" : "center");
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
document.documentElement.scrollTop = Number(
    new URLSearchParams(window.location.search)
        .get("scroll")
);
