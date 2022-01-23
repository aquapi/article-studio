document.getElementById("back").addEventListener("click", () => location.replace("/article"));

document.querySelector("form").addEventListener("submit", async e => {
    e.preventDefault();
    const data = new FormData();
    data.append("username", document.querySelector("input[name='username']").value);
    data.append("password", document.querySelector("input[name='password']").value);
    await fetch("/loginprocess", {
        method: "POST", 
        body: new URLSearchParams(data)
    }).then(res => res.status) === 401
        ? alert("Wrong username or password")
        : location.replace("/article");
});