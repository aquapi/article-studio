import Head from "next/head";

/**
 * @param {{name: string}}
 */

export default ({ name }) => (
    <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="icon" href="/icon/Article.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{name}</title>
        {/*Stylesheet*/}
        <link rel="stylesheet" href="/stylesheets/edit/main.css" />
        {/*Showdown.js*/}
        <script src="/lib/showdown.min.js"></script>
        {/*Axios*/}
        <script src="/lib/axios.min.js"></script>
        {/*Highlight*/}
        <link rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/styles/vs2015.min.css" />
        <script src="/lib/highlight.min.js"></script>
    </Head>
);