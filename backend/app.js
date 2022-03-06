import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import errorHandler from "./error/errorHandler.js";
import AppError from "./error/appError.js";
import morgan from "morgan";

//getting all routes
// const userRoutes = require('./routes/user');

const app = express();

dotenv.config();

//setting up app middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.status(200).json({
    message:
      "Hello there, This is your SECOND assignment in the GDSC NodeJs intermediate study group",
  });
});

//setting up all routers
// app.use('/auth', authRoutes);

//for invalid route
app.use((req, res, next) => {
  return next(
    new AppError("Specified route does no exist on this server", 404)
  );
});

//error handler
app.use(errorHandler);

export default app;
