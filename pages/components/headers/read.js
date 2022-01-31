import Head from "next/head";

/**
 * @param {{name: string}}
 */

export default ({ name }) => (
    <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href={`https://fonts.googleapis.com/css2?family=Lora&family=Oxygen:wght@300&display=swap`} rel="stylesheet" />
        <link href={`https://fonts.googleapis.com/css2?family=Lora&display=swap`} rel="stylesheet" />
        <title>{name}</title>
        <link rel="icon" href="/icon/Article.ico" />
        {/*Stylesheet*/}
        <link rel="stylesheet" href="/stylesheets/read/main.css" />
        {/*Axios*/}
        <script src="/lib/axios.min.js"></script>
        {/*Highlight*/}
        <script src="/lib/highlight.min.js"></script>
        {/*Socket*/}
        <script src="/socket.io/socket.io.js"></script>
        {/*Showdown.js*/}
        <script src="/lib/showdown.min.js"></script>
    </Head>
);

// Empty
export const getServerSideProps = () => ({});