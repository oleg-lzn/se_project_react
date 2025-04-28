const router = require("express").Router();
const auth = require("../middlewares/auth");

const { getCurrentUser, changeUser } = require("../controllers/users");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, changeUser);

module.exports = router;
