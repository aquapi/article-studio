// Hide the search bar
$(".search-bar").fadeOut(0);

// Search
function contain(str, str1) {
    for (let c of str1) {
        if (!str.includes(c)) return false;
    }
    return true;
}

// Horizontal scroll events
const updateScrollPos = (e) => {
    $('#created-article').css('cursor', 'grabbing');
    let scrollTo = $('#created-article').scrollLeft() + (clickX - e.pageX) / 10;
    $('#created-article').scrollLeft(scrollTo);
}

const initWidthHeight = () => {
    document.getElementById("banner-text").style.left = (innerWidth - 203.34) / 2 + "px";
    document.getElementById("banner-text").style.top = (innerHeight - 133.34) * 93 / 200 + "px";
}

// Mouseover and mouseleave
let clicked = false, clickX;
$(() => {
    $(".create").each((i, e) => {
        e.addEventListener("mouseover", () => {
            $("#hover-action").css("top", "50px");
            $("#hover-action").css("display", "block");
            $("#hover-action").css("left", $(e).position().left + 20);
            $("#hover-action").animate({
                "width": $(e).width()
            }, 650);
        });
        e.addEventListener("mouseleave", () => {
            $("#hover-action").css("display", "none");
            $("#hover-action").css("width", "0px");
            $("#hover-action").stop();
        })
    });

    // Drag to scroll

    $("#created-article").on({
        'mousemove': (e) => {
            clicked ? updateScrollPos(e) : void (0);
        },
        'mousedown': (e) => {
            clicked = true;
            clickX = e.pageX;
        },
        'mouseup': () => {
            clicked = false;
            $('#created-article').css('cursor', 'grab');
        },
    });
});

// Login button
document.querySelector("#login").addEventListener("click", () => {
    location.replace("/login");
});

// Search bar fade in/out
$(".input > button").click(e => {
    $(".search-bar").fadeIn(600);
});

$("#inner").click(e => {
    $(".search-bar").fadeOut(600);
});

// Resize window
initWidthHeight();
onresize = initWidthHeight;

// If articles count larger than 4
if (document.getElementsByClassName("created").length > 4) 
    document.querySelector("#created-article").style["justify-content"] = "flex-start";
