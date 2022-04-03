document.getElementById("back").addEventListener("click", () =>
    location.href = sessionStorage.getItem("prevLocation") ? sessionStorage.getItem("prevLocation") : "/article"
);

document.querySelector("form").addEventListener("submit", async e => {
    e.preventDefault();
    // Save new article if valid
    await axios.post("/process", {
        "name": document.querySelector("input[name='name']").value,
        "description": document.querySelector("textarea[name='description']").value,
        "tag": document.querySelector("input[name='tag']").value
    })
        // Return the status
        .then(v => v.status)
        // If error occured
        .catch(() => 403) !== 200
        // Alert duplicate error
        ? alert("Another article has the same name as yours, please choose another name")
        // Else go to edit
        : location.href = "/article/edit/" + encodeURIComponent(
            document.querySelector("input[name='name']").value
        );
})