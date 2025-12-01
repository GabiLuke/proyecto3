require("dotenv").config();
const mongoose = require("mongoose");
const Item = require("./models/Item");

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    await Item.insertMany([
      { title: "Item 1", description: "Descripción 1" },
      { title: "Item 2", description: "Descripción 2" },
    ]);
    console.log("✅ Semilla completada");
    process.exit();
  })
  .catch((err) => console.error(err));
