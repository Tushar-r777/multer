const mongoose = require("mongoose");

function dbConnection() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => {
      console.log("Database connection failed:", error.message);
    });
}

module.exports = dbConnection;
