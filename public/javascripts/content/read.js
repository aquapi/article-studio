// Socket
const socket = io("/read");

// HTML Decoder
const htmlDecode = input =>
    new DOMParser().parseFromString(input, "text/html").documentElement.textContent;

// Initialize content
document.getElementById("content").innerHTML =
    "<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/"
    + document.querySelector("select").options.item(
        Number(
            localStorage.getItem("favTheme") ? localStorage.getItem("favTheme") : "0"
        )
    ).id
    + ".min.css'>"
    + "<script>hljs.highlightAll()</script>"
    + new showdown.Converter({
        tables: true,
        strikethrough: true,
        parseImgDimensions: true,
        ghCompatibleHeaderId: true
    }).makeHtml(htmlDecode(data.item(1).innerHTML));

// Change highlighter
document.querySelector("select").addEventListener("change", () => {
    document.getElementById("content").innerHTML =
        "<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/"
        + document.querySelector("select").options.item(
            document.querySelector("select").options.selectedIndex >= 0
                ? document.querySelector("select").options.selectedIndex
                : 0
        ).id
        + ".min.css'>"
        + "<script>hljs.highlightAll()</script>"
        + new showdown.Converter({
            tables: true,
            strikethrough: true,
            parseImgDimensions: true,
            ghCompatibleHeaderId: true
        }).makeHtml(htmlDecode(data.item(1).innerHTML));

    // Save to localStorage
    localStorage.setItem("favTheme",
        document.querySelector("select").options.selectedIndex >= 0
            ? document.querySelector("select").options.selectedIndex
            : 0
    )

    // Highlight all code 
    hljs.highlightAll();
})

// Highlight all code 
hljs.highlightAll();

// Event listeners
document.getElementById("back").addEventListener("click", () =>
    location.replace(sessionStorage.getItem("prevLocation") ? sessionStorage.getItem("prevLocation") : "/article")
);

// Discuss
document.getElementById("discuss_redirect").addEventListener("click", () => 
    location.replace(`/discuss/${encodeURIComponent(data.item(0).innerHTML)}`)
);

// Edit articles
document.getElementById("edit").addEventListener("click", () => 
    location.replace(`/article/edit/${encodeURIComponent(data.item(0).innerHTML)}`)
);

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
        data.item(2).innerHTML,
        document.getElementById("authorDetail").innerHTML
            .replaceAll("Author: ", "")
            .replaceAll("<\!-- -->", ""),
        data.item(0).innerHTML
    )
);

document.getElementById("vote").addEventListener("click", vote);

// If failed
socket.on("failed", console.log);

