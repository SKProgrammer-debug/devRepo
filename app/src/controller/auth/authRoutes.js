const express = require("express");
const router = express.Router();
const { validate } = require("express-validation");
const controller = require("./authValidator");
const {
    authValidator
} = require("./authValidator");


router.route("/signup").post(validate(authValidator, { keyByField: true }, {}), controller.signUp);

module.exports = router;