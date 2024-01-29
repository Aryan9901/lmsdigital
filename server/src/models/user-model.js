//* ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
//*                                        Schema
//* ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

//? Schema: Defines the structure of the document within a collection. It specifies the fields, their types, and any additional constraints or validations;

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		require: true,
		unique: true,
	},
	phone: {
		type: String,
		require: true,
	},
	password: {
		type: String,
		require: true,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
});

// ** Pre methods

// ? securing the password with bcrypt
userSchema.pre("save", async function (next) {
	// this ke paas user ka pura data hai jo abhi save nhi hua hai
	const user = this;
	if (!user.isModified("password")) {
		next();
	}
	try {
		const saltRound = await bcrypt.genSalt(10);
		const hash_password = await bcrypt.hash(user.password, saltRound);
		this.password = hash_password;
	} catch (error) {
		next(error);
	}
});

//? ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
//?                             What is JWT ?
//? ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

// - JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON Object.
// - JWTs are often used for authentication and authorization in web Application.
// 1. **Authentication** Verifying the identity of user or client.
// 2. **Authorization** Determining what action a user or client is allowed to perform..

//? ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
//?                            Components of JWT ?
//? ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

// - Header: Contains metadata about the token, such as the type of token and the signing algorithm being used.
// - Payload: Contains claim or statement about an entity (typically, the user) and additional data. common claims include user ID, username and expiration time.
// - Signature: To verify that the sender of th JWT is who it says it is and to ensures that the message wasn't changed along the way, a signature is included.

// !! Tokens such as JWTs, are typically not stored in the database along with other user details. Instead they are issued by the server during the authentication process and then stored on the client side (e.g., in cookies or local storage) for later use.

//** jwt syntax */
// ** jwt.sign(payload,signature,[header]);

userSchema.methods.generateToken = async function () {
	try {
		const token = await jwt.sign(
			{
				userId: this._id.toString(),
				email: this.email,
				isAdmin: this.isAdmin,
			},
			process.env.JWT_SECRET_KEY,
			{
				expiresIn: "30d",
			}
		);
		return token;
	} catch (error) {
		console.error(error);
	}
};

userSchema.methods.comparePassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

//* ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
//*                                    Model
//* ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

//? Model: Acts as a higher level abstraction that interacts with the database based on the defined schema. It represents a collection and provides an interface for querying, creating, updating, and deleting documents in that collection.

//? Models are created from schemas and enable you to work with MongoDB data in a more structured manner in your application.

const User = new mongoose.model("User", userSchema);

module.exports = User;
