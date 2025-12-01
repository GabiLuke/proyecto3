const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const image = req.file?.path || null;

    const user = await User.create({
      username,
      email,
      password: hashed,
      image,
    });

    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(`Intento de login para email: ${email}`);

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return res.status(401).json({ message: "Credenciales inválidas" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  );

  res.json({ token });
};

exports.changeRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  const user = await User.findByIdAndUpdate(id, { role }, { new: true });

  res.json(user);
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

  if (req.user.role !== "admin" && req.user.id !== id) {
    return res.status(403).json({ message: "No autorizado" });
  }

  if (user.image) {
    const segments = user.image.split("/");
    const filename = segments.pop();
    const publicId = `users/${filename.split(".")[0]}`;

    await cloudinary.uploader.destroy(publicId);
  }

  await user.deleteOne();
  res.json({ message: "Usuario eliminado" });
};

exports.addRelated = async (req, res) => {
  const { id } = req.params;
  const { itemId } = req.body;

  const user = await User.findById(id);

  if (!user.relatedData.includes(itemId)) {
    user.relatedData.push(itemId);
  }

  await user.save();
  res.json(user);
};

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};
