const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("connecting to", url);
mongoose
	.connect(url)

	.then((result) => {
		console.log("connected to MongoDB");
	})
	.catch((error) => {
		console.log("error connecting to MongoDB:", error.message);
	});

const entrySchema = new mongoose.Schema({
	name: { type: String, minLength: 3, required: true },
	number: {
		type: String,
		required: true,
		validate: {
			validator: (v) => /^(?:\d{2,3})(?:-{1})(?:\d{5,})/.test(v),
		},
	},
});

entrySchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		returnedObject._id = undefined;
		returnedObject.__v = undefined;
	},
});

module.exports = mongoose.model("Entry", entrySchema);
