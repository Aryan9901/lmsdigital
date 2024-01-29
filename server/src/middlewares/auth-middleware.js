const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
	const token = req.header("Authorization");
	if (!token) {
		res.status(401).json({ message: "Invalid token" });
	}
	const jwtToken = token.replace("Bearer", "").trim();

	try {
		const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

		const userData = await User.findOne({ email: isVerified.email }).select({ password: 0 });
		console.log(userData);

		req.user = userData;
		req.token = token;
		req.userId = userData._id;

		next();
	} catch (error) {
		console.error("hii", error);
		next({
			status: 501,
			message: "Internal Server Error.",
			details: error,
		});
	}
};

module.exports = authMiddleware;
