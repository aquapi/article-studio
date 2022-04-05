import { useRef } from "react";
import Head from "../components/headers/create";
import axios from "axios";

export default () => {
    const name = useRef(""),
        description = useRef(""),
        tag = useRef("");

    /**
     * @type {React.FormEventHandler<HTMLFormElement>}
     */
    const saveArticle = async e => {
        e.preventDefault();

        // Save new article if valid
        await axios.post("/process", { 
            name: name.current, 
            description: description.current, 
            tag: tag.current 
        })
            // Return the status
            .then(v => v.status)
            // If error occured
            .catch(() => 403) !== 200
            // Alert duplicate error
            ? alert("Another article has the same name as yours, please choose another name")
            // Else go to edit
            : location.href = "/article/edit/" + encodeURIComponent(name.current);
    }

    return <>
        <Head />

        {/*Go back to homepage*/}
        <button id='back' onClick={
            () => location.href =
                sessionStorage.getItem("prevLocation") ?? "/article"
        }>Back</button>

        {/*Form*/}
        <form onSubmit={saveArticle}>
            <h3>Article</h3>
            <hr style={{ width: '70%' }} />
            {/*Name*/}
            <input type='text' name="name" width="300px" placeholder="Article name..." onChange={
                e =>
                    name.current = e.target.value
            } />
            {/*Description*/}
            <textarea type='text' name="description" style={{ outline: 'none' }}
                placeholder="Article description..." onChange={
                    e =>
                        description.current = e.currentTarget.value
                }></textarea><br />
            {/*Tag*/}
            <input type='text' name="tag" width="300px" placeholder="Tag..." onChange={
                e =>
                    tag.current = e.currentTarget.value
            } />
            {/*Submit to /process*/}
            <input type="submit" defaultValue="Create" />
        </form>
    </>;
};