const Service = require("../models/service-model");

const services = async (req, res, next) => {
	try {
		const response = await Service.find();
		if (!res) {
			return res.status(404).json({ message: "We do not offer any services yet!!" });
		}
		res.status(200).json({ data: response });
	} catch (error) {
		console.error(error);
		next({
			status: 501,
			message: "Internal Server Error.",
			details: error,
		});
	}
};

module.exports = services;
