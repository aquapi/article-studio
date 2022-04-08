// @ts-check
import axios from "axios";
import SelectTheme from "./SelectTheme";

export default ({ selectListener, isAuthor, name, vote }) =>
    <div id="buttons">
        {/*Go back*/}
        <button onClick={
            // Change location
            () => location.href =
                sessionStorage.getItem("prevLocation") ?? "/article"
        }>Back</button><br />

        {/*Theme changer*/}
        <label htmlFor="theme-changer">Theme</label>
        <SelectTheme onChange={selectListener} />

        {/*Edit*/}
        <button style={{ display: isAuthor ? 'block' : 'none' }} onClick={
            () => location.href =
                `/article/edit/${encodeURIComponent(name)}`
        }>Edit</button>

        {/*Delete*/}
        <button style={{ display: isAuthor ? 'block' : 'none' }} onClick={
            async () => {
                // Delete the current article
                if (confirm("Confirm delete?")) {
                    await axios.post("/article/delete", { name });
                    location.href = `/article`;
                }
            }
        }>Delete</button>

        {/*Vote*/}
        <button style={{ display: isAuthor ? 'none' : 'block' }} onClick={vote}>Vote</button>
    </div>