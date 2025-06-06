const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const blogsRouter = require("./controllers/blogs");

const morgan = require("morgan");
const app = express();

morgan.token("id", function getId(req) {
	return req.id;
});
morgan.token("body", function getId(req) {
	return JSON.stringify(req.body);
});

logger.info("connecting to", config.MONGODB_URI);

mongoose
	.connect(config.MONGODB_URI)
	.then(() => {
		logger.info("connected to MongoDB");
	})
	.catch((error) => {
		logger.error("error connection to MongoDB:", error.message);
	});

app.use(express.static("dist"));
app.use(express.json());

app.use("/api/blogs", blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.use(
	morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);
module.exports = app;
