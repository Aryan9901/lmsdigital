const Contact = require("../models/contact-model");

const contactForm = async (req, res, next) => {
	try {
		const response = req.body;
		await Contact.create(response);
		next({
			status: 200,
			message: "Message sent",
			details: "Message is received by the Admin",
		});
	} catch (error) {
		console.error(error);
		next({
			status: 501,
			message: "Internal Server Error.",
			details: error,
		});
	}
};

module.exports = contactForm;
