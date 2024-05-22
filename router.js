const express = require("express");
const router = express.Router();
const memberController = require("./controller/memberController");

/*******************************
 *      REST API
 *******************************/

router.post("/signup", memberController.signup);
router.post("/login", memberController.login);
router.get("/logout", memberController.logout);
router.get("/check-me", memberController.checkMyAuthantication);


router.get("/member/:id",
memberController.retrieveAuthMember,
memberController.getChosenMember);


module.exports = router;