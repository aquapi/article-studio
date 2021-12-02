import Head from "../components/headers/discuss";

export default ({ name, user }) => {
    return (
        <>
            <Head name={name} />
            {/*User name*/}
            <span>{user}</span>
            <span>{name}</span>
            {/*Navbar*/}
            <div id="buttons">
                <button id="back">Back</button><br />
                <button id="refress">Refress</button>
            </div>
            {/*Messages will be here*/}
            <ul id="messages"></ul>
            {/*Send message form*/}
            <form id="form" action="">
                <input id="input" autoComplete="off" />
                <button>Send</button>
            </form>
            <script src="/socket.io/socket.io.js"></script>
            <script src="/javascripts/content/discuss.js"></script>
        </>
    )
}

// Server property
export const getServerSideProps = async (context) => {
    return {
        props: {
            name: context.query.name,
            user: context.query.user
        }
    }
}