import { useState, useEffect } from "react";
import axios from "axios";
import entryService from "./services/entries";

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
		<div>
			{props.filteredEntries.map((entry) => (
				<Entry key={entry.name} entry={entry} deleteEntry={props.deleteEntry} />
			))}
		</div>
	);
};

const Entry = (props) => {
	return (
		<p key={props.entry.name}>
			{props.entry.name} {props.entry.number} {props.entry.id}{" "}
			<button type="button" onClick={() => props.deleteEntry(props.entry.id)}>
				Delete{" "}
			</button>
		</p>
	);
};
const App = () => {
	const [entries, setEntries] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");

	/**Fetch initial entries from server */
	useEffect(() => {
		console.log("effect");
		entryService.getAll().then((response) => {
			setEntries(response);
		});
	}, []);

	const handleNameChange = (e) => {
		setNewName(e.target.value);
	};

	const handleNumberChange = (e) => {
		setNewNumber(e.target.value);
	};

	const handleFilter = (e) => {
		setFilter(e.target.value);
	};

	const filteredEntries = filter
		? entries.filter((entry) =>
				entry.name.toLowerCase().startsWith(filter.toLowerCase()),
			)
		: entries;

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
			entryService.create(newEntry).then((response) => {
				/**get entry from server and add to entries array */
				setEntries(entries.concat(response));
			});
			/**reset newName and newNumber */
			setNewName("");
			setNewNumber("");
		}
	};

	const deleteEntry = (id) => {
		if (window.confirm("Delete?")) {
			entryService.remove(id).then((response) => {
				setEntries(entries.filter((entry) => entry.id !== id));
			});
		}
	};

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
				filteredEntries={filteredEntries}
				filter={filter}
				setEntries={setEntries}
				deleteEntry={deleteEntry}
			/>
		</div>
	);
};

export default App;
