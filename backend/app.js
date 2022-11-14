const express = require("express");
const morgan = require("morgan");
const postRouter = require("./routes/postRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const globalErrorhandle = require("./controllers/errorController.js");
const AppError = require("./utils/AppError.js");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/posts", postRouter);
app.use("/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`${req.originalUrl} route does not exits`, 404));
});

app.use(globalErrorhandle);

module.exports = app;
