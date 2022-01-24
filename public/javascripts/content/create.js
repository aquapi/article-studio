document.getElementById("back").addEventListener("click", () => location.replace('/article'));

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
        ? alert("Some articles have the same name as yours, please choose another name")
        // Else go to edit
        : location.replace("/article/edit/" + encodeURIComponent(
            document.querySelector("input[name='name']").value
        ));
})