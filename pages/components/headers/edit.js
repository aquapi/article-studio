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
        <script src="https://cdnjs.cloudflare.com/ajax/libs/showdown/1.9.1/showdown.min.js"
            integrity="sha512-L03kznCrNOfVxOUovR6ESfCz9Gfny7gihUX/huVbQB9zjODtYpxaVtIaAkpetoiyV2eqWbvxMH9fiSv5enX7bw=="
            crossOrigin="anonymous" referrerPolicy="no-referrer"></script>
        {/*Axios*/}
        <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
        {/*Highlight*/}
        <script src="/external/highlight/highlight.min.js"></script>
        <link rel="stylesheet" href="/external/highlight/styles/vs2015.min.css" />
    </Head>
)

// Empty
export const getServerSideProps = () => ({});