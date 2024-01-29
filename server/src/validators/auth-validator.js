const { z } = require("zod");

// creating an object schema

const signupSchema = z.object({
	username: z
		.string({
			required_error: "Name is Required",
		})
		.trim()
		.min(3, { message: "Name must be atleast 3 characters long" })
		.max(255, { message: "Name must not be more than 255 characters" }),
	email: z
		.string({
			required_error: "Email is Required",
		})
		.trim()
		.email({ message: "Invalid Email Address" })
		.min(7, { message: "Email must be atleast 7 characters long" })
		.max(255, { message: "Email must not be more than 255 characters" }),
	phone: z
		.string({
			required_error: "Phone number is Required",
		})
		.trim()
		.min(10, { message: "Phone must be 10 characters long" })
		.max(10, { message: "Phone must be of 10 characters" }),
	password: z
		.string({
			required_error: "password number is Required",
		})
		.trim()
		.min(7, { message: "Password must be atleast 7  characters long" })
		.max(1024, { message: "Password can't be greater than 1024 characters" }),
});

const loginSchema = z.object({
	email: z
		.string({
			required_error: "Email is Required",
		})
		.trim()
		.email({ message: "Invalid Email Address" })
		.min(7, { message: "Email must be atleast 7 characters long" })
		.max(255, { message: "Email must not be more than 255 characters" }),
	password: z
		.string({
			required_error: "password number is Required",
		})
		.trim()
		.min(7, { message: "Password must be atleast 7  characters long" })
		.max(1024, { message: "Password can't be greater than 1024 characters" }),
});

module.exports = { signupSchema, loginSchema };
