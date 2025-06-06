import { useState, useEffect } from "react";
import axios from "axios";

const Filter = (props) => {
	return (
		<div>
			filter shown with{" "}
			<input value={props.filter} onChange={props.handleFilter} />
		</div>
	);
};

const EntryForm = (props) => {
	return (
		<form onSubmit={props.addEntry}>
			<table>
				<tbody>
					<tr>
						<td>name:</td>
						<td>
							<input value={props.newName} onChange={props.handleNameChange} />
						</td>
					</tr>
					<tr>
						<td>number:</td>
						<td>
							<input
								value={props.newNumber}
								onChange={props.handleNumberChange}
							/>
						</td>
					</tr>
				</tbody>
			</table>

			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
};

const Entries = (props) => {
	return (
		<table>
			<tbody>
				{(props.filter ? props.filteredEntries : props.entries).map((entry) => (
					<Entry key={entry.name} entry={entry} />
				))}
			</tbody>
		</table>
	);
};

const Entry = ({ entry }) => {
	return (
		<tr key={entry.name}>
			<td> {entry.name}</td>
			<td>{entry.number}</td>
		</tr>
	);
};
const App = () => {
	const [entries, setEntries] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");

	const handleNameChange = (e) => {
		setNewName(e.target.value);
	};

	const handleNumberChange = (e) => {
		setNewNumber(e.target.value);
	};

	const handleFilter = (e) => {
		setFilter(e.target.value);
	};

	const filteredEntries = entries.filter((entry) =>
		entry.name.toLowerCase().startsWith(filter.toLowerCase()),
	);

	const addEntry = (e) => {
		/**Prevent default action (submitting the form) */
		e.preventDefault();
		/**Create variables for new and existing entry*/
		const newEntry = { name: newName, number: newNumber };
		const existingEntry = entries.find((entry) => entry.name === newEntry.name);
		/**alert when someone's name is already in the phone book */
		if (existingEntry) {
			alert(`${newName} is already in the phone book`);
			/**reset newName and newNumber */
			setNewName("");
			setNewNumber("");
		} else {
			/**send entry to server */
			axios
				.post("http://localhost:3001/entries", newEntry)
				/**get entry from server and add to entries array */
				.then((retrievedEntries) => {
					setEntries(entries.concat(retrievedEntries.data));
					/**reset newName and newNumber */
					setNewName("");
					setNewNumber("");
				});
		}
	};
	/**Fetch initial entries from server */
	useEffect(() => {
		console.log("effect");
		axios.get("http://localhost:3001/entries").then((entriesFromServer) => {
			setEntries(entriesFromServer.data);
		});
	}, []);

	return (
		<div>
			<h2>Phone book</h2>
			<h3>Add a new entry</h3>
			<Filter filter={filter} handleFilter={handleFilter} />
			<EntryForm
				addEntry={addEntry}
				newNumber={newNumber}
				newName={newName}
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
			/>
			<h2>Numbers</h2>
			<Entries
				entries={entries}
				filteredEntries={filteredEntries}
				filter={filter}
			/>
		</div>
	);
};

export default App;
