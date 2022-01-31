import Head from "next/head";

export default ({ name }) => (
    <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Co-authors of {name}</title>
        {/*Stylesheet*/}
        <link rel="stylesheet" href="/stylesheets/coauth/main.css" />
        {/*Axios*/}
        <script src="/lib/axios.min.js"></script>
    </Head>
)