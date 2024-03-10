var express = require("express");
var router = express.Router();

var stopRegistraion = require("../services/registration.service");

router.post("/result/download", stopRegistraion.Download);
router.post("/get/feedbacks", stopRegistraion.getFeedBack);
module.exports = router;
