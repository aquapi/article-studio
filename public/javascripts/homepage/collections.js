// Buttons listeners
document.querySelectorAll(".list").forEach(e => 
    e.addEventListener("click", () => (e.id !== location.pathname) 
        ? location.replace(`${e.id}?scroll=${window.scrollY}`) 
        : null
    )    
);