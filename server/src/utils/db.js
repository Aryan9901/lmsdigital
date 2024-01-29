require("dotenv").config();
const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;

const connectDB = async () => {
	try {
		await mongoose.connect(URI);
		console.log("Connected to database...");
	} catch (error) {
		console.log("error while connecting to database!!", error);
		process.exit(0);
	}
};

module.exports = connectDB;
