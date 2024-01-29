const express = require("express");
const {
	getAllUsers,
	getAllContacts,
	deleteUser,
	getUserById,
	updateUserById,
	deleteContact,
	deleteService,
	getServiceById,
	updateServiceById,
	addNewService,
	getServices,
} = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();

router.route("/users").get(authMiddleware, getAllUsers);
router.route("/contacts").get(authMiddleware, getAllContacts);
router.route("/contact/delete/:id").delete(authMiddleware, deleteContact);
router.route("/users/delete/:id").delete(authMiddleware, deleteUser);
router.route("/users/:id").get(authMiddleware, getUserById);
router.route("/services/:id").get(authMiddleware, getServiceById);
router.route("/users/update/:id").patch(authMiddleware, updateUserById);
router.route("/services/update/:id").patch(authMiddleware, updateServiceById);
router.route("/services/delete/:id").delete(authMiddleware, deleteService);
router.route("/services/add").post(authMiddleware, addNewService);
router.route("/services").get(authMiddleware, getServices);

module.exports = router;
