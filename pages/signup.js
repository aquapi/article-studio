import Head from "../app/components/headers/sign";

export default () =>
(
    <>
        <Head page="Signup"/>
        {/*Go back to homepage*/}
        <button id="back">Back</button>
        {/*Login form*/}
        <form>
            {/*Header*/}
            <div style={{ width: "100%", textAlign: "center" }}>
                <h3>Sign up</h3>
            </div>
            <hr style={{ width: "70%" }} />
            {/*Form input data*/}
            <input type="text" name="email" required placeholder="Email" />
            <input type="text" name="name" required placeholder="Name" />
            <input type="password" name="pass" required placeholder="Password" />
            <input type="submit" value="Sign up" />
        </form>
        {/*Script*/}
        <script type="text/javascript" src="/javascripts/getData.js"></script>
        <script src="/javascripts/account/signup.js"></script>
    </>
)

// Empty
export const getServerSideProps = () => ({});