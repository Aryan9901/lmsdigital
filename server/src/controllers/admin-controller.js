const User = require("../models/user-model");
const Contact = require("../models/contact-model");
const Service = require("../models/service-model");

//* ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
//** */                           Get All Users
//* ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

exports.getAllUsers = async (req, res, next) => {
	try {
		const users = await User.find({}, { password: 0 });
		if (!users || users.length === 0) {
			next({
				status: 404,
				message: "No Users Found",
				details: "No Users Registered",
			});
		}
		return res.status(200).json({ users });
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
//** */                        Get All Contacts
//* ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

exports.getAllContacts = async (req, res, next) => {
	try {
		const contacts = await Contact.find({});
		if (!contacts || contacts.length == 0) {
			res.status(404).json({ message: "No contacts Found" });
		}
		return res.status(200).json({ contacts });
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
//** */                        delete user by id
//* ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

exports.deleteUser = async (req, res, next) => {
	try {
		const user = await User.deleteOne({ _id: req.params.id });
		if (!user) {
			res.status(404).json({ message: "User not exist" });
		}
		const users = await User.find();
		return res.status(200).json({ message: "User Removed", users });
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
//** */                        Get user by id
//* ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

exports.getUserById = async (req, res, next) => {
	try {
		const user = await User.findOne({ _id: req.params.id }, { password: 0 });
		if (!user) {
			res.status(404).json({ message: "User not exist" });
		}
		return res.status(200).json({ message: "success", user });
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
//** */                        update user data by id
//* ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

exports.updateUserById = async (req, res, next) => {
	try {
		const id = req.params.id;
		const updatedUserData = req.body;

		const updatedData = await User.updateOne(
			{ _id: id },
			{
				$set: updatedUserData,
			}
		);

		if (!updatedData) {
			res.status(404).json({ message: "error in updating user data" });
		}
		return res.status(200).json({ message: "user updated", updatedData });
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
//** */                        delete contact by id
//* ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

exports.deleteContact = async (req, res, next) => {
	try {
		const contact = await Contact.deleteOne({ _id: req.params.id });
		if (!contact) {
			res.status(404).json({ message: "Contact not exist" });
		}
		return res.status(200).json({ message: "Contact Removed" });
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
//** */                           Delete Services
//* ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

exports.deleteService = async (req, res, next) => {
	try {
		const service = await Service.deleteOne({ _id: req.params.id });
		if (!service) {
			res.status(404).json({ message: "Service not exist" });
		}
		return res.status(200).json({ message: "Service Removed" });
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
//** */                        Get service by id
//* ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

exports.getServiceById = async (req, res, next) => {
	try {
		const service = await Service.findOne({ _id: req.params.id });
		if (!service) {
			res.status(404).json({ message: "Service not exist" });
		}
		return res.status(200).json({ message: "success", service });
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
//** */                        Get all services
//* ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

exports.getServices = async (req, res, next) => {
	try {
		const services = await Service.find();
		if (!services) {
			res.status(404).json({ message: "Services not exist" });
		}
		return res.status(200).json({ message: "success", services });
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
//** */                        update service data by id
//* ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

exports.updateServiceById = async (req, res, next) => {
	try {
		const id = req.params.id;
		const updatedServiceData = req.body;

		const updatedData = await Service.updateOne(
			{ _id: id },
			{
				$set: updatedServiceData,
			}
		);

		if (!updatedData) {
			res.status(404).json({ message: "error in updating service data" });
		}
		return res.status(200).json({ message: "service updated", updatedData });
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
//** */                        Add new Service
//* ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

exports.addNewService = async (req, res, next) => {
	try {
		const { service, price, provider, description } = req.body;

		const serviceExists = await Service.findOne({ service });
		if (serviceExists) {
			return res.status(404).json({ message: "service already exists" });
		}
		const newService = await Service.create({ service, description, price, provider });
		if (!newService) {
			res.status(401).json({ message: "some error occured" });
		}
		res.status(200).json({ message: "Service Added Successfully" });
	} catch (error) {
		console.error(error);
		next({
			status: 501,
			message: "Internal Server Error.",
			details: error,
		});
	}
};
