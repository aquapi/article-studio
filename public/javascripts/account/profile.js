document.getElementById("back").addEventListener("click", () => 
    location.href = sessionStorage.getItem("prevLocation") ? sessionStorage.getItem("prevLocation") : "/article"
);

// Delete profile
document.getElementById("delete").addEventListener("click", () => {
    if (confirm("Confirm delete?\nThis will delete all your article"))
        document.getElementById("blank").submit();
});

// Script to display and hide password
let clicked = false;
document.getElementById("display").addEventListener("click", () => {
    if (clicked) {
        document.querySelector("div > input").type = "password";
        document.querySelector("i").className = "fas fa-eye";
    }
    else {
        document.querySelector("div > input").type = "text";
        document.querySelector("i").className = "fas fa-eye-slash";
    }
    clicked = !clicked;
});

// Logout
document.getElementById("logout").addEventListener("click", () => location.replace("/logout"));