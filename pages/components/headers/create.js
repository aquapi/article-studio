import Head from "next/head";

export default () => (
    <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/icon/Article.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href={`https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap`} rel="stylesheet" />
        <link href={`https://fonts.googleapis.com/css2?family=Lora&family=Oxygen:wght@300&display=swap`} rel="stylesheet" />
        <title>Create new article</title>
        {/*Stylesheet*/}
        <link rel="stylesheet" href="/stylesheets/create/main.css" />
        <script src="/lib/axios.min.js"></script>
    </Head>
);

// Empty
export const getServerSideProps = () => ({});