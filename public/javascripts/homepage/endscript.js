const data = document.querySelectorAll("span");

// Create article button listener
document.querySelector("#new").addEventListener("click", () => {
    location.replace("/article/new");
});

// Load page banner
$(".wait").css("display", "block");

// Load created article part
$("#created-article").css("display", 'flex');

// Load body
$("body").css("display", 'block');

// Check whether user is signed up
$("#sign").click(() => data.item(0).innerHTML === "undefined" || !data.item(0).innerHTML ? location.replace('/signup') : location.replace('/article/profile'));

// Scroll to top
$("body").scrollTop();  

// Search 
$("input[type=text]").keyup(() => {
    document.querySelector("#header-name").innerHTML = $("input[type=text]").val() ? "Search Result" : data.item(1).innerHTML;
    let count = 0;
    for (let e of $("#created-article").children("div").toArray()) {
        let el = e.querySelector("div");
        // Search method
        if (!$("input[type=text]").val() || contain(el.id.toLowerCase(), $("input[type=text]").val().toLowerCase()) || contain(el.className.toLowerCase(), $("input[type=text]").val().toLowerCase())) {
            e.style.display = "block";
            count++;
        } else 
            e.style.display = "none";
    }
    // If articles match is more than 4
    if (count > 4) 
        document.querySelector("#created-article").style["justify-content"] = "flex-start";
    else 
        document.querySelector("#created-article").style["justify-content"] = "center";
});

// If articles count larger than 4
if (document.getElementsByClassName("created").length > 4) 
    document.querySelector("#created-article").style["justify-content"] = "flex-start";