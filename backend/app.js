import express from "express";
import cors from "cors";
import errorHandler from "./error/errorHandler.js";
import AppError from "./error/appError.js";
import morgan from "morgan";
import { configSettings } from "./config.js";
// import Task from "./models/taskModel.js";

//getting all routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";

const app = express();
const { NODE_ENV } = configSettings;

//setting up app middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello there",
  });
});

//setting up all routers
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/teams", teamRoutes);

//for invalid route
app.use((req, res, next) => {
  return next(
    new AppError("Specified route does not exist on this server", 404)
  );
});

//error handler
app.use(errorHandler);

export default app;
