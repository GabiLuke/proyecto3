const express = require("express");
const router = express.Router();
const {
  createItem,
  getItems,
  removeItem,
  updateItem,
} = require("../controllers/ItemController");

router.post("/", createItem);
router.get("/", getItems);
router.delete("/:id", removeItem);
router.put("/:id", updateItem);

module.exports = router;
