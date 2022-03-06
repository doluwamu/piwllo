import jwt from "jsonwebtoken";
import { configSettings } from "../config.js";

const { JWT_SECRET, JWT_EXPIRES } = configSettings;

export const generateToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  );
};
