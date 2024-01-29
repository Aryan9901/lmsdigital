require("dotenv").config();
const connectDB = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const cors = require("cors");

const express = require("express");
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");

const app = express();

// ? Express.json() is a middleware used to parse json or dend json as response

const corsOption = {
	origin: process.env.FRONTEND_URL,
	method: "GET, POST,PUT,DELETE,PATCH,HEAD",
	credentials: true,
};

app.use(cors(corsOption));
app.use(express.json());

//? using router in express app; it mount the Router at a specific url
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/form", contactRoute);
app.use("/api/v1/data", serviceRoute);

// let's define admin route
app.use("/api/v1/admin", adminRoute);

app.use(errorMiddleware);

//* app.get(): sets up a route handler for HTTP GET requests.
//* "/" defines the route path, responding to the root URL.

//* (req,res) => {...} : an arrow function handling the request (req) and constructing the response (res).

//* res.send("Hello World"); : sends the "Hello World" message as the response when the route is accessed

// app.get("/", (req, res) => {
// 	res.status(200).send("hello world");
// });
// app.get("/register", (req, res) => {
// 	res.status(200).send("register page");
// });

const PORT = 3000;

connectDB().then(() => {
	app.listen(PORT, () => {
		console.log(`server is running at ${process.env.HOSTNAME}`);
	});
});
