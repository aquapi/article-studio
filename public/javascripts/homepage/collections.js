// Buttons listeners
document.querySelectorAll(".list").forEach(e => 
    e.addEventListener("click", () => (e.id !== location.pathname) 
        ? (
            sessionStorage.setItem("scroll", window.scrollY),
            location.href = `${e.id}`
        ) : null)    
);