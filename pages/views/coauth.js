import Head from "../components/headers/coauth";

/**
 * @param {{coAuthors: string[]}}
 */
export default ({ coAuthors, name }) => (
    <>
        <Head name={name} />
        <h2>Co-authors of {name}</h2>
        <form>
            <input placeholder="Invite a co-author" />
            <input type="submit" />
        </form>
        <ul>{coAuthors.map(author => author ? <li>{author}</li> : <></>)}</ul>
        <script src="/javascripts/content/coauth.js"></script>
    </>
);

export const getServerSideProps = async (context) => {
    return {
        props: {
            name: context.query.name,
            coAuthors: context.query.coAuthors
        }
    }
}