import Head from "next/head";

export default () => (
    <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="icon" href="/icon/Article.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href={`https://fonts.googleapis.com/css2?family=Arvo&family=Merriweather:wght@300&display=swap`}
            rel="stylesheet" />
        <link href={`https://fonts.googleapis.com/css2?family=Lora&family=Oxygen:wght@300&display=swap`} rel="stylesheet" />
        <link href={`https://fonts.googleapis.com/css2?family=Arvo&display=swap`} rel="stylesheet" />
        <link href={`https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap`} rel="stylesheet" />
        <link href={`https://fonts.googleapis.com/css2?family=Lora&display=swap`} rel="stylesheet" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://code.jquery.com/ui/1.13.0/jquery-ui.min.js"
            integrity="sha256-hlKLmzaRlE8SCJC1Kw8zoUbU8BxA+8kR3gseuKfMjxA=" crossOrigin="anonymous"></script>
        {/*Stylesheets*/}
        <link rel="stylesheet" href="/stylesheets/article/main.css" />
        <title>Articles</title>
    </Head>
);

// Empty
export const getServerSideProps = () => ({});