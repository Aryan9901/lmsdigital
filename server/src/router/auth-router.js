//* ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
//* Express.Router
//* ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

//? In Express.js, express.Router() is a mini Express application without all the server configuration but with the ability to define routes, middleware, and even have its own set of route handlers. It allow you to modularize your routes and middlewares to keep your code organized and maintainable.

// * https://express.js.com/en/guide/routing.html

//? use the express.Router class to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reason, it is often reffered to as a "mini app".

const express = require("express");
const { home, register, login, getUser } = require("../controllers/auth-controller");
const { signupSchema, loginSchema } = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");
const authMiddleware = require("../middlewares/auth-middleware");

const router = express.Router();

// ! not preferred as we do not concatenate like this router.get(...).post(...) !!
// router.get("/",(req,res) => {
//      res.status(200).send("Home page of router using router.get(...)")
// })

//? router.route(...).get(...).post(...).delete(...) can work fine in router.route() !!
router.route("/").get(home);
router.route("/register").post(validate(signupSchema), register);
router.route("/login").post(validate(loginSchema), login);
router.route("/user").get(authMiddleware, getUser);

module.exports = router;
