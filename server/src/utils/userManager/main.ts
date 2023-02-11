import config from "../config.js";
import mongoose from "mongoose";
import addUser from "./addUser.js";

mongoose
  .connect(config.MONGODB_URI)
  .then(() => addUser())
  .then((msg) => {
    console.log(msg);
    mongoose.connection.close();
  });
