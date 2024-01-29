const User = require("../models/user-model");
const bcrypt = require("bcrypt");

//* ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
//*                                   Controllers
//* ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

//? In an Express.js application, a "controller" refer to a part of your code that is responsible for handling the application's logic. Controllers are typically used to process incoming requests, interact with models (data sources), and send responses back to clients. They help organize your application by seperating concerns and following the MVC (Model-View-Controller) design pattern.

//* ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
//** */      Home Logic
//* ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

exports.home = async (req, res, next) => {
	try {
		res.status(200).json({ msg: "success", page: "home page" });
	} catch (error) {
		console.error(error);
		next({
			status: 501,
			message: "Internal Server Error.",
			details: error,
		});
	}
};

//* ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
//** */                        Register Logic
//* ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

exports.register = async (req, res, next) => {
	try {
		const { username, email, phone, password } = req.body;

		const userExists = await User.findOne({ email });
		if (userExists) {
			next({
				status: 400,
				message: "user already exists.",
				details: "Email already registered!! you need to register with another email id.",
			});
		}
		const newUser = await User.create({ username, email, phone, password });
		const token = await newUser.generateToken();
		res.status(200).json({ msg: "registration Successfull", token, userId: newUser._id.toString() });
	} catch (error) {
		console.error(error);
		next({
			status: 501,
			message: "Internal Server Error.",
			details: error,
		});
	}
};

//* ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
//** */                            Login Logic
//* ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

exports.login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const userExists = await User.findOne({ email });
		if (!userExists) {
			next({
				status: 400,
				message: "Invalid Credentials.",
				details: "Email not registered! You need to register first",
			});
		}

		const isMatched = await userExists.comparePassword(password);

		if (!isMatched) {
			next({
				status: 400,
				message: "username or password maybe incorrect",
				details: "you are needed to enter the correct credentials",
			});
		}
		const token = await userExists.generateToken();
		res.status(200).json({ msg: "login successfull", token, userId: userExists._id.toString() });
	} catch (error) {
		console.error(error);
		next({
			status: 501,
			message: "Internal Server Error.",
			details: error,
		});
	}
};

//* ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
//** */                        Get  User data Logic
//* ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

exports.getUser = async (req, res, next) => {
	try {
		const userData = req.user;
		res.status(200).json({ userData });
	} catch (error) {
		console.error(error);
		next({
			status: 501,
			message: "Internal Server Error.",
			details: error,
		});
	}
};
