import Head from "../components/headers/coauth";
import axios from "axios";
import { useRef, useState } from "react";

/**
 * @param {{coAuthors: string[]}}
 */
export default ({ coAuthors, name }) => {
	const [coauths, setCoauths] = useState(coAuthors);
	const currentInput = useRef("");

	// Save the co-authors list
	async function save(coAuths) {
		try {
			// Save the co-authors list
			await axios.post(`/coauths/save/${encodeURIComponent(name)}`, { coAuthor: coAuths });

			// Return success
			return true;
		} catch (e) {
			alert("Save failed");
			return false;
		}
	}

	// Remove the co-author
	async function remove(coAuthor) {
		const newCoAuthsList = coauths.filter(v => v !== coAuthor);

		// Save the co-authors list
		if (await save(newCoAuthsList))
			// Filter the co-authors list
			setCoauths(newCoAuthsList);
	}

	// When adding a new co-author
	async function add(coAuthor) {
		const newCoAuthsList = coauths.concat(coAuthor);

		if (await save(newCoAuthsList))
			// Filter the co-authors list
			setCoauths(newCoAuthsList);
	}

	return <>
		<Head name={name} />
		<h2>Co-authors</h2>
		<form onSubmit={e => {
			e.preventDefault();

			// Add the co-author
			if (currentInput.current)
				add(currentInput.current);
		}}>
			<input placeholder="Invite a co-author" required={true} onChange={
				e =>
					currentInput.current = e.currentTarget.value
			} />
			<button type="submit">+</button>
		</form>
		<ul>{coauths.map(author => author
			? <li className={author}>
				<span>{author}</span>
				<button className="remove" onClick={() => remove(author)}>-</button>
			</li>
			: <></>
		)}</ul>
	</>;
};

export const getServerSideProps = async (context) => {
	return {
		props: {
			name: context.query.name,
			coAuthors: context.query.coAuthors
		}
	}
}