const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(express.json());

morgan.token("id", function getId(req) {
	return req.id;
});
morgan.token("body", function getId(req) {
	return JSON.stringify(req.body);
});

app.use(
	morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

let entries = [
	{
		id: "1",
		name: "Arto Hellas",
		number: "040-123456",
	},
	{
		id: "2",
		name: "Ada Lovelace",
		number: "39-44-5323523",
	},
	{
		id: "3",
		name: "Dan Abramov",
		number: "12-43-234345",
	},
	{
		id: "4",
		name: "Mary Poppendieck",
		number: "39-23-6423122",
	},
];

app.get("/", (request, response) => {
	response.send("<h1>Hello World!</h1>");
});

app.get("/api/entries", (request, response) => {
	response.json(entries);
});

app.get("/api/entries/:id", (request, response) => {
	const id = request.params.id;
	const entry = entries.find((entry) => entry.id === id);
	if (entry) {
		response.json(entry);
	} else {
		response.status(404).end();
	}
});

app.delete("/api/entries/:id", (request, response) => {
	const id = request.params.id;
	entries = entries.filter((entry) => entry.id !== id);

	response.status(204).end();
});

const generateId = () => {
	return String(Math.floor(Math.random() * 100));
};

app.get("/info", (request, response) => {
	const date = new Date();
	response.send(
		`<p>Phone book has information for ${entries.length} people</p><p>${date}</p>`,
	);
});

app.post("/api/entries", (request, response) => {
	const body = request.body;

	if (!body.name) {
		return response.status(400).json({
			error: "name missing",
		});
	}

	if (!body.number) {
		return response.status(400).json({
			error: "number missing",
		});
	}

	if (entries.find((entry) => entry.name === body.name)) {
		return response.status(400).json({
			error: "name must be unique",
		});
	}

	const entry = {
		name: body.name,
		number: body.number,
		id: generateId(),
	};

	entries = entries.concat(entry);

	response.json(entry);
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
