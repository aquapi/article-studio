// @ts-check
import React from "react";
import Head from "../components/headers/sign";
import axios from "axios";

export default () => {
    /**
     * @type {React.FormEventHandler<HTMLFormElement>}
     */
    const submit = async e => {
        e.preventDefault();
        const inputs = e.currentTarget.querySelectorAll("input");
        // Send sign up request to /signupprocess
        await axios.post("/signupprocess", {
            name: inputs[0].value,
            pass: inputs[1].value
        })
            // Check whether status equals 401
            .then(res => res.status)
            .catch(() => 401) === 401
            // Failed
            ? alert("Cannot sign up or log in")
            // Go to previous location
            : location.href = sessionStorage.getItem("prevLocation") ?? "/article";
    };

    // Go back to previous location
    const goBack = () =>
        location.href = sessionStorage.getItem("prevLocation") ?? "/article"

    return <>
        <Head page="Signup" />

        {/*Go back to homepage*/}
        <button id="back" onClick={goBack}>Back</button>

        {/*Login form*/}
        <form onSubmit={submit}>
            {/*Header*/}
            <div style={{ width: "100%", textAlign: "center" }}>
                <h3>Sign up</h3>
            </div>
            <hr style={{ width: "70%" }} />

            {/*Form input data*/}
            <input type="text" name="name" required placeholder="Name" />
            <input type="password" name="pass" required placeholder="Password" />
            <input type="submit" value="Sign up" />
        </form>
    </>;
}