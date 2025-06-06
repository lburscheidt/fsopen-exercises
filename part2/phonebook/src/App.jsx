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
			{props.entry.name} {props.entry.number}
			<button
				type="button"
				onClick={() => props.deleteEntry(props.entry.id, props.entry.name)}
			>
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
	const [message, setMessage] = useState("");
	const [msgType, setMsgType] = useState("");

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
			if (
				window.confirm(
					`${newName} is already in the phone book, replace number?`,
				)
			) {
				const updatedEntry = {
					...existingEntry,
					number: newNumber,
				};
				entryService
					.update(existingEntry.id, updatedEntry)
					.then((response) => {
						setEntries(
							entries.map((entry) =>
								entry.id !== updatedEntry.id ? entry : response,
							),
						);
						setNewName("");
						setNewNumber("");
					})
					.catch((error) => {
						setEntries(entries.filter((entry) => entry.id !== updatedEntry.id));
						setMessage(
							`Information for ${existingEntry.name} already removed from server`,
						);
						setMsgType("error");
						setTimeout(() => {
							setMessage("");
							setMsgType("");
						}, 5000);
						setNewName("");
						setNewNumber("");
					});
			}
			/**reset newName and newNumber */
			setMessage(`Successfully updated information for ${existingEntry.name}`);
			setMsgType("success");
			setTimeout(() => {
				setMessage("");
				setMsgType("");
			}, 5000);
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
			setMessage(`Successfully added ${newEntry.name}`);
			setMsgType("success");
			setTimeout(() => {
				setMessage("");
				setMsgType("");
			}, 5000);
		}
	};

	const deleteEntry = (id, name) => {
		if (window.confirm("Delete?")) {
			entryService.remove(id).then((response) => {
				setEntries(entries.filter((entry) => entry.id !== id));
			});
			setMessage(`Successfully deleted ${name}`);
			setMsgType("success");
			setTimeout(() => {
				setMessage("");
				setMsgType("");
			}, 5000);
		}
	};

	const Notification = ({ message, msgType }) => {
		return <div className={msgType}>{message}</div>;
	};

	return (
		<div>
			<h2>Phone book</h2>
			<Notification message={message} msgType={msgType} />
			<Filter filter={filter} handleFilter={handleFilter} />
			<h3>Add a new entry</h3>
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
