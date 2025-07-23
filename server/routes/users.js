const router = require("express").Router();
const auth = require("../middlewares/auth");
const { validateUserUpdate } = require("../middlewares/validation");

const { getCurrentUser, changeUser } = require("../controllers/users");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, validateUserUpdate, changeUser);

module.exports = router;
