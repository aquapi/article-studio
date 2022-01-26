const names = data.item(2).innerHTML;
JSON.parse(names).forEach(e =>
    document.getElementById(e).addEventListener("click", () => {
        location.replace(`/reader/${encodeURIComponent(e)}`);
    })
);