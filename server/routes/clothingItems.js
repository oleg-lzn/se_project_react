const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.get("/", getItems);
router.delete("/:itemId", auth, deleteItem);
router.put("/:itemId/likes", auth, likeItem);
router.delete("/:itemId/likes", auth, dislikeItem);
router.post("/", auth, createItem);

module.exports = router;
