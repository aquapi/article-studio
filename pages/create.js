import Head from "../app/components/headers/create";

export default () => (
    <>
        <Head />
        {/*Go back to homepage*/}
        <button id='back'>Back</button>
        {/*Form*/}
        <form action="/process" method="GET">
            <h3>Article</h3>
            <hr style={{ width: '70%' }} />
            <input type='text' name="name" width="300px" placeholder="Article name..." />
            <textarea type='text' name="description" style={{ outline: 'none' }}
                placeholder="Article description..."></textarea><br />
            <input type='text' name="tag" width="300px" placeholder="Tag..." />
            {/*Submit to /process*/}
            <input type="submit" defaultValue="Create" />
        </form>
        <script src="/javascripts/content/create.js"></script>
    </>
)

// Empty
export const getServerSideProps = () => ({});