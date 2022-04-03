import Head from "../components/headers/coauth";

/**
 * @param {{coAuthors: string[]}}
 */
export default ({ coAuthors, name }) => (
    <>
        <Head name={name} />
        <h2>Co-authors</h2>
        <form>
            <input placeholder="Invite a co-author" required={true} />
            <button type="submit">+</button>
        </form>
        <ul>{coAuthors.map(author => author ? <li><span>{author}</span><button class="remove">-</button></li> : <></>)}</ul>
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