const mongoose = require("mongoose");

const DbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE);
    console.log("Database connection successful ✅");
  } catch (error) {
    console.error("Error connecting to database ❌  :", error);
    process.exit(1);
  }
};

module.exports = DbConnection;
