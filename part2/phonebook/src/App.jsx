import { useState } from "react";

const App = () => {
	const [entries, setEntries] = useState([
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");

	const handleNameChange = (e) => {
		setNewName(e.target.value);
	};

	const handleNumberChange = (e) => {
		setNewNumber(e.target.value);
	};

	const addEntry = (e) => {
		e.preventDefault();
		const newEntry = { name: newName, number: newNumber };
		const existingEntry = entries.find((entry) => entry.name === newEntry.name);
		if (existingEntry) {
			alert(`${newName} is already in the phonebook`);
			setNewName("");
		} else {
			setEntries(entries.concat(newEntry));
			setNewName("");
			setNewNumber("");
			console.log(entries);
		}
	};

	return (
		<div>
			<h2>Phone book</h2>
			<form onSubmit={addEntry}>
				<table>
					<tbody>
						<tr>
							<td>name:</td>
							<td>
								<input value={newName} onChange={handleNameChange} />
							</td>
						</tr>
						<tr>
							<td>number:</td>
							<td>
								<input value={newNumber} onChange={handleNumberChange} />
							</td>
						</tr>
					</tbody>
				</table>

				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<table>
				<tbody>
					{entries.map((entry) => (
						<tr key={entry.name}>
							<td> {entry.name}</td>
							<td>{entry.number}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default App;
