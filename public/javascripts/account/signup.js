document.getElementById("back").addEventListener("click", () => 
    location.replace(sessionStorage.getItem("prevLocation"))
);