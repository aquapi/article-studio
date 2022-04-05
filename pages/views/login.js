// @ts-check
import Head from "../components/headers/sign";

export default () => {
    /**
     * @type {React.FormEventHandler<HTMLFormElement>}
     */
    const submit = async e => {
        // Inputs
        const inputs = e.currentTarget.querySelectorAll("input");

        // Prevent the event
        e.preventDefault();

        // Form data
        const data = new FormData();
        data.append("username", inputs[0].value);
        data.append("password", inputs[1].value);

        // Request
        await fetch("/loginprocess", {
            method: "POST",
            // @ts-ignore
            body: new URLSearchParams(data)
        }).then(res => res.status) === 401
            ? alert("Wrong username or password")
            : location.href = sessionStorage.getItem("prevLocation") ?? "article";
    };

    return <>
        <Head page="Login" />

        {/*Go back to homepage*/}
        <button id="back" onClick={
            () =>
                location.href = sessionStorage.getItem("prevLocation") ?? "/article"
        }>Back</button>

        {/*Login form*/}
        <form onSubmit={submit}>
            <div style={{ width: "100%", textAlign: "center" }}>
                <h3>Login</h3>
            </div>
            <hr style={{ width: "70%" }} />
            <input type="text" name="username" required placeholder="Name" />
            <input type="password" name="password" required placeholder="Password" />
            {/*Submit form to server to check login data*/}
            <input type="submit" value="Login" />
        </form>
    </>;
};