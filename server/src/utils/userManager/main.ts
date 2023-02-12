import config from "../config.js";
import mongoose from "mongoose";
import addUser from "./addUser.js";
import removeUser from "./removeuser.js";

mongoose
  .connect(config.MONGODB_URI)
  .then(() => addUser())
  .then(() => mongoose.connection.close());
