import Head from "next/head";

/**
 * @param {{page: string}}
 */

export default ({ page }) => (
    <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="/icon/Article.ico" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href={`https://fonts.googleapis.com/css2?family=Lora&family=Oxygen:wght@300&display=swap`} rel="stylesheet" />
        <link href={`https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap`} rel="stylesheet" />
        <title>{page}</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.25.0/axios.min.js" integrity="sha512-/Q6t3CASm04EliI1QyIDAA/nDo9R8FQ/BULoUFyN4n/BDdyIxeH7u++Z+eobdmr11gG5D/6nPFyDlnisDwhpYA==" crossOrigin="anonymous" referrerPolicy="no-referrer"></script>
        {/* Stylesheet */}
        <link rel="stylesheet" href="/stylesheets/sign/main.css" />
    </Head>
);

// Empty
export const getServerSideProps = () => ({});