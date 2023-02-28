import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./utils/config.js";
import logger from "./utils/logger.js";
import loginRouter from "./controllers/login.js";
import patternsRouter from "./controllers/patterns.js";

const app = express();
mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info("Conntection to the database was successfull"))
  .catch((error) => logger.error(error));

app.use(cors());
app.use(express.json());
app.use("/api/login", loginRouter);
app.use("/api/patterns", patternsRouter);

export default app;
