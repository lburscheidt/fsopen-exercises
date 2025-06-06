const mongoose = require("mongoose");

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://burscheidt:${password}@cluster0.pmxvhmu.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const entrySchema = new mongoose.Schema({
	name: String,
	number: String,
});

const Entry = mongoose.model("Entry", entrySchema);

if (process.argv.length < 3) {
	console.log("give password as argument");
	process.exit(1);
} else if (process.argv.length === 3) {
	console.log("phone book:")
	Entry.find({}).then((result) => {
		result.map((entry) => {
			console.log(entry.name, entry.number);
		});
		mongoose.connection.close();
	});
} else if (process.argv.length === 5) {
	const entry = new Entry({
		name: name,
		number: number,
	});

	entry.save().then((result) => {
		console.log(`added ${name} ${number} to phone book`);
		mongoose.connection.close();
	});
}
