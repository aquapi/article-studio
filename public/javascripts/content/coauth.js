document.querySelector("form").addEventListener("submit", async e => {
    e.preventDefault();
    const newElement = document.createElement("li");
    newElement.innerHTML = document.querySelector("input").value;
    document.querySelector("ul").appendChild(newElement);
    await axios.post("/coauths/save/" + encodeURIComponent(
        document.querySelector("h2").innerHTML
            .slice(14)
            .replace('<!-- -->', '')
    ), {
        coAuthor: Array.from(document.querySelectorAll("li")).map(v => v.innerHTML)
    }).then(v => v.status).catch(() => 403) === 403
        ? alert("Saved failed")
        : alert("Save sucessful");
});