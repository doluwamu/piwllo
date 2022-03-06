import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 6000;

const app = express();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
