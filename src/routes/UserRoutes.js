const express = require("express");
const router = express.Router();
const { upload, uploadToCloudinary } = require("../middleware/Upload");
const { auth, isAdmin } = require("../middleware/Auth");
const {
  register,
  login,
  changeRole,
  deleteUser,
  addRelated,
  getUsers,
} = require("../controllers/UserController");

router.post("/register", upload.single("image"), uploadToCloudinary, register);
router.post("/login", login);
router.patch("/:id/role", auth, isAdmin, changeRole);
router.delete("/:id", auth, deleteUser);
router.patch("/:id/add-related", auth, addRelated);
router.get("/", getUsers);

module.exports = router;
