const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

process.on("uncaughtException", (err) => {
  console.log("Error: ", err.name, err.message);
  console.log("Unhandled Exception. Shutting down...");
  process.exit(1);
});

const app = require("./app.js");
const mongoose = require("mongoose");

const connectionString = process.env.MOGODB_CONNECT.replace(
  "<USER>",
  process.env.MOGODB_USER
).replace("<PASSWORD>", process.env.MOGODB_PASS);

mongoose
  .connect(connectionString, () => {
    console.log("Connection successfull");
  })
  .catch((err) => console.log("Error: ", err.name, err.message));

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled Rejection. Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
