const names = document.querySelectorAll("span").item(2).innerHTML;
names.split("§").forEach(e =>
    document.getElementById(e).addEventListener("click", () =>
        location.replace(`/reader/${encodeURIComponent(e)}`)
    )
);