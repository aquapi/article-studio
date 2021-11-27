import Head from "../components/headers/sign";

export default () =>
(
    <>
        <Head page="Login"/>
        {/*Go back to homepage*/}
        <button id="back">Back</button>
        {/*Script*/}
        <script src="/javascripts/sign.js"></script>
        {/*Login form*/}
        <form action="/loginprocess" method="POST">
            <div style={{ width: "100%", textAlign: "center" }}>
                <h3>Login</h3>
            </div>
            <hr style={{ width: "70%" }} />
            <input type="text" name="name" required placeholder="Name" />
            <input type="password" name="pass" required placeholder="Password" />
            {/*Submit form to server to check login data*/}
            <input type="submit" value="Login" />
        </form>
    </>
)

// Empty
export const getServerSideProps = () => ({});