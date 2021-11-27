import Head from "next/head";

export default ({ name, user }) => {
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href={`https://fonts.googleapis.com/css2?family=Lora&family=Oxygen:wght@300&family=Qwigley&display=swap`} rel="stylesheet" />
                {/*Stylesheet*/}
                <link rel="stylesheet" href="/stylesheets/discuss/main.css" />
                {/*Title*/}
                <title>{name} Discuss</title>
                {/*Icon*/}
                <link rel="icon" href="https://iconarchive.com/download/i97950/thehoth/seo/seo-article.ico" />
            </Head>
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
            <script src="/javascripts/discuss.js"></script>
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