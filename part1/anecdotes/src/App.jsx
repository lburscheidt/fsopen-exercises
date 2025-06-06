import { useState } from "react";

const App = () => {
	const anecdotes = [
		"If it hurts, do it more often.",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
		"The only way to go fast, is to go well.",
	];

	const [selected, setSelected] = useState(0);
	const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

	const getRandomInt = (min, max) => {
		const minCeiled = Math.ceil(min);
		const maxFloored = Math.floor(max);
		return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
	};
	const selectAnecdote = () => {
		setSelected(getRandomInt(0, anecdotes.length - 1));
		console.log(selected);
	};

	const voteForAnecdote = () => {
		const votesCopy = [...votes];
		votesCopy[selected] += 1;
		setVotes(votesCopy);
	};

	const indexOfMax = (arr) => {
		return arr.reduce(
			(maxIndex, elem, i, arr) => (elem > arr[maxIndex] ? i : maxIndex),
			0,
		);
	};

	return (
		<div>
			<h1>Anecdote of the day</h1>
			<p>{anecdotes[selected]}</p>
			<p>
				has {votes[selected]} {votes[selected] === 1 ? "vote" : "votes"}
			</p>
			<button type="button" onClick={voteForAnecdote}>
				vote
			</button>
			<button type="button" onClick={selectAnecdote}>
				next anecdote
			</button>
			<h1>Anecdote with most votes</h1>
			<p>{anecdotes[indexOfMax(votes)]}</p>
			<p>
				has {votes[indexOfMax(votes)]}{" "}
				{votes[indexOfMax(votes)] === 1 ? "vote" : "votes"}
			</p>
		</div>
	);
};

export default App;
