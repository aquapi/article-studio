import Head from "next/head";

export default ({ name }) => (
    <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="icon" href="https://iconarchive.com/download/i97950/thehoth/seo/seo-article.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{name}</title>
        {/*Stylesheet*/}
        <link rel="stylesheet" href="/stylesheets/edit/main.css" />
        {/*Showdown.js*/}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/showdown/1.9.1/showdown.min.js"
            integrity="sha512-L03kznCrNOfVxOUovR6ESfCz9Gfny7gihUX/huVbQB9zjODtYpxaVtIaAkpetoiyV2eqWbvxMH9fiSv5enX7bw=="
            crossOrigin="anonymous" referrerPolicy="no-referrer"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/showdown/1.9.1/showdown.js"
            integrity="sha512-bvV1V1YSjP1fbfKJjTlNmdnUO2XpsLYUdKwmz5UXBi5U+x40rx9JpA0ooQUMZfpz1MaaBC0ydNLoC6r0sitPUQ=="
            crossOrigin="anonymous" referrerPolicy="no-referrer"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/showdown/1.9.1/showdown.js.map"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/showdown/1.9.1/showdown.min.js.map"></script>
        {/*Axios*/}
        <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
        {/*Socket.io*/}
        <script src="https://cdn.socket.io/4.3.2/socket.io.min.js" integrity="sha384-KAZ4DtjNhLChOB/hxXuKqhMLYvx3b5MlT55xPEiNmREKRzeEm+RVPlTnAn0ajQNs" crossOrigin="anonymous"></script>
    </Head>
)

export const getServerSideProps = () => ({});