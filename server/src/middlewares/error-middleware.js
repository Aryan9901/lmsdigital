const errorMiddleware = (err, req, res, next) => {
	const status = err.status || 500;
	const message = err.message || "internal server error";
	const errDetails = err.details || "Error from Backend";

	return res.status(status).json({
		message,
		errDetails,
	});
};

module.exports = errorMiddleware;
