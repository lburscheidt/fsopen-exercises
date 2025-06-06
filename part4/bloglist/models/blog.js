const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number,
});

blogSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		returnedObject._id = undefined;
		returnedObject.__v = undefined;
	},
});

module.exports = mongoose.model("Blog", blogSchema);
