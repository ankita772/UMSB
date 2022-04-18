const express = require("express");
const router = new express.Router();
const controller = require("../Controller/UserController");

//create user
router.post("/create-user", controller.createUser);

//get all user
router.get("/get-all-user", controller.getAllUser);
//get one user Info
router.post("/get-user", controller.getUser);
// //login user
// router.post("login-user", controller.loginUser);

// //update user
router.post("/update-user", controller.updateUser);

// // //delete user
router.post("/delete-user", controller.deleteUser);

module.exports = router;
