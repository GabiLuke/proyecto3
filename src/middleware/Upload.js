const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { Readable } = require("stream");

cloudinary.config({ cloudinary_url: process.env.CLOUDINARY_URL });

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadToCloudinary = (req, res, next) => {
  if (!req.file) return next();

  const stream = cloudinary.uploader.upload_stream(
    { folder: "users" },
    (error, result) => {
      if (error) {
        console.error("Error subiendo a Cloudinary:", error);
        return res.status(500).json({ error: "Error subiendo imagen" });
      }
      req.file.path = result.secure_url;
      next();
    }
  );

  Readable.from(req.file.buffer).pipe(stream);
};

module.exports = { upload, uploadToCloudinary };
