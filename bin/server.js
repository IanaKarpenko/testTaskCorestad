//TODO express MongoDB connect

const app = require('../app');
const mongoose = require("mongoose");
const path = require("path");

const envPath = path.join(__dirname, "../.env");
require("dotenv").config({ path: envPath });

const { DB_HOST, PORT = 3000 } = process.env;
console.log()

mongoose.connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    });
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });