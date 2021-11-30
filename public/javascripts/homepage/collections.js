// Buttons listeners
document.querySelectorAll(".list").forEach((e, i) => {
    if (i === 0)
        e.addEventListener('click', () => {
            location.replace("/article");
        });
    else if (i === 1)
        e.addEventListener('click', () => {
            location.replace("/mostvote");
        });
    else if (i === 2)
        e.addEventListener('click', () => {
            location.replace("/myarticle");
        });
    else if (i === 3)
        e.addEventListener('click', () => {
            location.replace("/otherarticle");
        });
});