document.getElementById("back").addEventListener("click", () =>
    location.replace(sessionStorage.getItem("prevLocation") ? sessionStorage.getItem("prevLocation") : "/article")
);

document.querySelector("form").addEventListener("submit", async e => {
    e.preventDefault();
    // Send sign up request to /signupprocess
    await axios.post("/signupprocess", {
        name: document.querySelector("input[name='name']").value,
        pass: document.querySelector("input[name='pass']").value,
        email: document.querySelector("input[name='email']").value
    })
        // Check whether status equals 401
        .then(res => res.status)
        .catch(() => 401) === 401
        // Failed
        ? alert("Cannot sign up or log in")
        // Go to previous location
        : location.replace(sessionStorage.getItem("prevLocation"));
});