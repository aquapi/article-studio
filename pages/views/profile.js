import Head from "../components/headers/profile";
import { useState } from "react";

/**
 * @param {{name: string, pass: string}}
 */
export default ({ name, pass }) => {
    // Is showing password
    const [isShowing, setIsShowing] = useState(false);

    // Delete account
    const deleteAccount = async () => {
        await fetch("/delete", {
            method: "POST",
            body: JSON.stringify({})
        });
        location.replace("/logout");
    };

    // Show password
    const showPassword = () => {
        setIsShowing(!isShowing);
    };  

    // Log out
    const logout = () => location.replace("/logout");

    return <>
        <Head name={name} />
        <div style={{ overflow: "hidden" }}>
            {/*Go back to homepage*/}
            <button id="back" onClick={
                () =>
                    location.href = sessionStorage.getItem("prevLocation") ?? "/article"
            }>Back</button>

            {/*Form*/}
            <form>
                <h3>Profile</h3>
                <hr />
                <input type="text" name="name" value={name} readOnly /><br />
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <input type={isShowing ? "text" : "password"} name="pass" value={pass} readOnly />

                    {/*Display or hide password*/}
                    <div id="display" onClick={showPassword}>
                        <i className={isShowing ? "fas fa-eye-slash" : "fas fa-eye"} style={{ cursor: "pointer" }}></i>
                    </div>
                </div>
            </form>
            {/*Buttons*/}
            <div style={{ textAlign: "center" }}>
                <button id="logout" onClick={logout}>Logout</button>
                <button id="delete" onClick={deleteAccount}>Delete account</button>
            </div>
        </div>
    </>;
};

// Get props
export const getServerSideProps = async (context) => {
    return {
        props: {
            name: context.query.name,
            pass: context.query.pass
        }
    };
}
