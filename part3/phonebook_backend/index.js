require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const Entry = require("./models/entry");

const app = express();

morgan.token("id", function getId(req) {
	return req.id;
});
morgan.token("body", function getId(req) {
	return JSON.stringify(req.body);
});

app.use(express.json());
app.use(express.static("dist"));
app.use(
	morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

app.get("/", (request, response) => {
	response.send("<h1>Hello World!</h1>");
});

app.get("/api/entries", (request, response) => {
	Entry.find({}).then((entries) => {
		response.json(entries);
	});
});

app.get("/api/entries/:id", (request, response, next) => {
	Entry.findById(request.params.id)
		.then((entry) => {
			if (entry) {
				response.json(entry);
			} else {
				response.status(404).end();
			}
		})
		.catch((error) => next(error));
});

app.delete("/api/entries/:id", (request, response, next) => {
	Entry.findByIdAndDelete(request.params.id)
		.then((entry) => {
			if (entry) {
				response.status(204).end();
			} else {
				response.status(404).end();
			}
		})
		.catch((error) => next(error));
});

app.get("/info", (request, response) => {
	const date = new Date();
	response.send(
		`<p>Phone book has information for ${entries.length} people</p><p>${date}</p>`,
	);
});

app.put("/api/entries/:id", (request, response, next) => {
	const body = request.body;
	const entry = {
		name: body.name,
		number: body.number,
	};
	Entry.findByIdAndUpdate(request.params.id, entry, {
		new: true,
		runValidators: true,
	})
		.then((updatedNumber) => {
			if (updatedNumber) {
				response.json(updatedNumber);
			} else {
				response.status(404).end();
			}
		})
		.catch((error) => next(error));
});

app.post("/api/entries", (request, response, next) => {
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

	const entry = new Entry({
		name: body.name,
		number: body.number,
	});

	entry
		.save()
		.then((savedEntry) => {
			response.json(savedEntry);
		})
		.catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
	console.error(error.message);
	if (error.name === "CastError") {
		return response.status(400).send({ error: "malformatted id" });
	}
	if (error.name === "ValidationError") {
		return response.status(400).json({ error: error.message });
	}
	next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
