// Save changes
async function save() {
    await axios.post("/coauths/save/" + encodeURIComponent(
        document.querySelector("title").innerHTML
            .slice(14)
            .replace('<!-- -->', '')
    ), {
        coAuthor: Array.from(document.querySelectorAll("li"))
            .map(v => v.querySelector("span").innerHTML)
    }).then(v => v.status).catch(() => 403) === 403
        ? alert("Saved failed")
        : void 0;
}

// Form event
document.querySelector("form").addEventListener("submit", async e => {
    e.preventDefault();
    // Create new
    const
        newElement = document.createElement("li"),
        newSpan = document.createElement("span"),
        rmButton = document.createElement("button");
    // Remove button
    rmButton.className = "remove";
    rmButton.innerHTML = "-";
    // New span content
    newSpan.innerHTML = document.querySelector("input").value;
    // Add new span and button to li
    newElement.appendChild(newSpan);
    newElement.appendChild(rmButton);
    // Append to list
    document.querySelector("ul").appendChild(newElement);
    // Save 
    await save();
    // Add listener
    Array.from(document.getElementsByClassName("remove"))
        .forEach(v => v.addEventListener("click", async () => {
            document.querySelector("ul").removeChild(v.parentElement);
            await save();
        }))
});

// Remove button
Array.from(document.getElementsByClassName("remove"))
    .forEach(v => v.addEventListener("click", async () => {
        document.querySelector("ul").removeChild(v.parentElement);
        await save();
    }))