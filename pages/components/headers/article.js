import Head from "next/head";

export default () => (
    <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="\lib\fontawesome\css\all.min.css" />
        <link rel="icon" href="/icon/Article.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href={`https://fonts.googleapis.com/css2?family=Arvo&family=Lora&family=Open+Sans:wght@300&family=Oxygen:wght@300&family=Source+Sans+Pro:wght@300&display=swap`} rel="stylesheet" />
        <script src="/lib/jquery.min.js"></script>
        <script src="/lib/jquery-ui.min.js"></script>
        {/*Stylesheets*/}
        <link rel="stylesheet" href="/stylesheets/article/main.css" />
        <title>Articles</title>
    </Head>
);

// Empty
export const getServerSideProps = () => ({});