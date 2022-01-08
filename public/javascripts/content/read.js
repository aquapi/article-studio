// Socket
const socket = io();

// HTML Decoder
const htmlDecode = input =>
    new DOMParser().parseFromString(input, "text/html").documentElement.textContent;

// Initialize buttons
document.getElementById("buttons").innerHTML += htmlDecode(data.item(1).innerHTML);

// Initialize content
document.getElementById("content").innerHTML = htmlDecode(data.item(2).innerHTML);

// Highlight all code 
hljs.highlightAll();

// Event listeners
document.getElementById("back").addEventListener("click", () => location.replace('/article'));

// Discuss
document.getElementById("discuss_redirect").addEventListener("click", () => location.replace(`/discuss/${encodeURIComponent(data.item(0).innerHTML)}`));

// Delete article
document.getElementById("del").addEventListener("click", async () => {
    let delName = data.item(0).innerHTML;
    if (confirm("Confirm delete?"))
        await axios.post("/article/delete", {
            name: delName
        }).then(
            () =>
                location.replace(`/article`)
        );
});

// Vote action
const vote = () => (
    document.getElementById("votesDetail").innerHTML = "Votes: " + (
        Number(
            document.getElementById("votesDetail").innerHTML
                .replaceAll("Votes: ", "") 
                .replaceAll("<\!-- -->", "") // Remove all non-numerical character and parse to number
        ) + 1
    ), socket.emit("vote", 
        data.item(3).innerHTML, 
        document.getElementById("authorDetail").innerHTML
            .replaceAll("Author: ", "") 
            .replaceAll("<\!-- -->", "")
    )
);

socket.on("failed", () => console.log("failed"))

