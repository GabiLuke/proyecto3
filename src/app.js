require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/UserRoutes");
const itemRoutes = require("./routes/ItemRoutes");

const app = express();

app.use(express.json());
app.use(cors());

async function conectarYArrancar() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB conectado correctamente");

    app.use("/users", userRoutes);
    app.use("/items", itemRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(
        `🚀 Servidor escuchando en el puerto ${PORT}. Accede con http://localhost:${PORT}`
      );
    });
  } catch (err) {
    console.error("❌ Error grave al iniciar la aplicación:", err.message);
    process.exit(1);
  }
}

conectarYArrancar();
