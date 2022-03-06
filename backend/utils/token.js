import jwt from "jsonwebtoken";

export const generateAccessToken = (_id) => {
  return jwt.sign(
    {
      _id,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES }
  );
};

export const generateRefreshToken = (_id) => {
  return jwt.sign(
    {
      _id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES }
  );
};
