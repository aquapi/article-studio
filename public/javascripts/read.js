// Data
const data = document.querySelectorAll("span");

// HTML Decoder
function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
}

// Initialize buttons
document.getElementById("buttons").innerHTML += htmlDecode(data.item(1).innerHTML);

// Initialize content
document.getElementById("content").innerHTML = htmlDecode(data.item(2).innerHTML);

// Event listeners
document.getElementById("back").addEventListener("click", () => location.replace('/article'));
document.getElementById("discuss_redirect").addEventListener("click", () => location.replace(`/discuss/${encodeURIComponent(data.item(0).innerHTML)}`));
document.getElementById("del").addEventListener("click", () => {
    let delName = `{{name}}`;
    if (confirm("Confirm delete?")) {
        (async () => {
            await axios.post("/article/delete", {
                name: delName
            });
            location.replace(`/article`);
        })();
    }
});
