import Head from "next/head";

/**
 * @param {{page: string}}
 */

export default ({ page }) => (
    <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="https://iconarchive.com/download/i97950/thehoth/seo/seo-article.ico" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href={`https://fonts.googleapis.com/css2?family=Lora&family=Oxygen:wght@300&display=swap`} rel="stylesheet" />
        <link href={`https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap`} rel="stylesheet" />
        <title>{page}</title>
        {/* Stylesheet */}
        <link rel="stylesheet" href="/stylesheets/sign/main.css" />
    </Head>
);

// Empty
export const getServerSideProps = () => ({});