if (sessionStorage.getItem("prevLocation") && location.pathname !== sessionStorage.getItem("prevLocation"))
    location.replace(sessionStorage.getItem("prevLocation"));

// Hide the search bar
$(".search-bar").fadeOut(0);

// Search
/**
 * @param {string} str 
 * @param {string} str1 
 */
function contain(str, str1) {
    let pos = 0;
    for (let c of str1) {
        if (!str.includes(c, pos)) return false;
        pos++;
    }
    return true;
}

function containAll(strs, str1) {
    for (const str of strs) 
        if (contain(str, str1))
            return true;
    return false;
}

// Horizontal scroll events
const updateScrollPos = (e) => {
    $('#created-article').css('cursor', 'grabbing');
    $('#created-article').scrollLeft($('#created-article').scrollLeft() + (clickX - e.pageX) / 10);
}

const initWidthHeight = () => {
    document.getElementById("banner-text").style.left = (innerWidth - 203.34) / 2 + "px";
    document.getElementById("banner-text").style.top = (innerHeight - 133.34) * 93 / 200 + "px";
}

// Mouseover and mouseleave
let clicked = false, clickX;
$(() => {
    $(".create").each((_, e) => {
        e.addEventListener("mouseover", () => {
            // Stop all effects
            $("#hover-action").stop(true, true);
            // Set width to 0
            $("#hover-action").css("width", "0px");
            // Hide 
            $("#hover-action").css("display", "none");
            // Set top equals 50px
            $("#hover-action").css("top", "50px");
            // Show
            $("#hover-action").css("display", "block");
            // element prosition plus element padding
            $("#hover-action").css("left", $(e).position().left + 20);
            // Animate 
            $("#hover-action").animate({
                "width": $(e).width()
            }, 600);
        });
        e.addEventListener("mouseleave", () => {
            // Stop all effects
            $("#hover-action").stop(true, true);
            // Set width to 0
            $("#hover-action").css("width", $(e).width() + "px");
            // Hide 
            $("#hover-action").css("display", "none");
            // Show
            $("#hover-action").css("display", "block");
            // Animate width to 0px
            $("#hover-action").animate({
                "width": 0
            }, 600, () => 
                $("#hover-action").stop(true, true)
            );
        })
    });

    // Drag to scroll

    $("#created-article").on({
        'mousemove': (e) => clicked ? updateScrollPos(e) : void (0),
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
    sessionStorage.setItem("prevLocation", location.pathname);
});

// Search bar fade in/out
$(".input > button").click(() => {
    $(".search-bar").fadeIn(600);
});

$("#inner").click(() => {
    $(".search-bar").fadeOut(600);
});

// Resize window
initWidthHeight();
onresize = initWidthHeight;


