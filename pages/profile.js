import Head from "../app/components/headers/profile";

/**
 * @param {{name: string, pass: string}}
 */
export default ({ name, pass }) => {
    return (
        <>
            <Head name={name} />
            <div style={{ overflow: "hidden" }}>
                {/*Go back to homepage*/}
                <button id="back">Back</button>
                {/*Form*/}
                <form>
                    <h3>Profile</h3>
                    <hr />
                    <input type="text" name="name" value={name} readOnly /><br />
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <input type="password" name="pass" value={pass} readOnly />
                        {/*Display or hide password*/}
                        <div id="display">
                            <i className="fas fa-eye" style={{ cursor: "pointer" }}></i>
                        </div>
                    </div>
                </form>
                {/*Buttons*/}
                <div style={{ textAlign: "center" }}>
                    <button id="logout">Logout</button>
                    <button id="delete">Delete account</button>
                    {/*Blank form to go to /delete using post method*/}
                    <form id="blank" action="/delete" method="post"></form>
                </div>
            </div>
            <script type="text/javascript" src="/javascripts/getData.js"></script>
            <script src="/javascripts/account/profile.js"></script>
        </>
    )
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
