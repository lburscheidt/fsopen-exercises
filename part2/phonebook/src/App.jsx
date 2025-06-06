import { useState } from "react";

const App = () => {
	const [entries, setEntries] = useState([{ name: "Arto Hellas" }]);
	const [newName, setNewName] = useState("");

	const handleNameChange = (e) => {
		setNewName(e.target.value);
	};

	const addEntry = (e) => {
		e.preventDefault();
		const newEntry = { name: newName };
		setEntries(entries.concat(newEntry));
		console.log(entries);
	};
	return (
		<div>
			<h2>Phone book</h2>
			<form onSubmit={addEntry}>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>

			{entries.map((entry) => (
				<p key={entry.name}>{entry.name}</p>
			))}
		</div>
	);
};

export default App;
