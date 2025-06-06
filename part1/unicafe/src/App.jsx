import { useState } from "react";

const Statistics = (props) => {
	const symbol = "%";
	if (props.all > 0) {
		return (
			<>
				<StatisticLine text="good" value={props.good} />
				<StatisticLine text="neutral" value={props.neutral} />
				<StatisticLine text="bad" value={props.bad} />
				<StatisticLine text="all" value={props.all} />
				<StatisticLine text="average" value={props.average} />
				<StatisticLine text="positive" value={props.positive} symbol={symbol} />
			</>
		);
	}
};

const StatisticLine = (props) => {
	return (
		<p>
			{props.text} {props.value} {props.symbol}
		</p>
	);
};

const Button = (props) => {
	return (
		<button type="button" onClick={props.onClick}>
			{props.buttonText}
		</button>
	);
};

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const all = good + neutral + bad;
	const positive = (good / all) * 100;
	const average = (good - bad) / all;
	const increaseGood = () => {
		setGood(good + 1);
	};
	const increaseNeutral = () => {
		setNeutral(neutral + 1);
	};
	const increaseBad = () => {
		setBad(bad + 1);
	};

	return (
		<div>
			<h1>give feedback</h1>
			<Button onClick={increaseGood} buttonText="good" />
			<Button onClick={increaseNeutral} buttonText="neutral" />
			<Button onClick={increaseBad} buttonText="bad" />
			<h1>statistics</h1>
			<Statistics
				good={good}
				neutral={neutral}
				bad={bad}
				all={all}
				average={average}
				positive={positive}
			/>
		</div>
	);
};

export default App;
