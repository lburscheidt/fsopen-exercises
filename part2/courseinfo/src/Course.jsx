const Course = ({ course }) => {
	return (
		<>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</>
	);
};

const Header = ({ course }) => {
	return <h1>{course}</h1>;
};

const Content = ({ parts }) => {
	return (
		<>
			{parts.map((part) => (
				<Part key={part.id} name={part.name} exercises={part.exercises} />
			))}
		</>
	);
};
const Part = ({ name, exercises }) => {
	return (
		<p>
			{name} {exercises}
		</p>
	);
};

const Total = ({ parts }) => {
	const total = parts.reduce((accumulator, part) => {
		return accumulator + part.exercises;
	}, 0);
	return (
		<p>
			<strong>Total of {total} exercises</strong>
		</p>
	);
};
export default Course;
