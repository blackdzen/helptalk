import User from "../models/user.js";
import express, { request, response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginRouter = express.Router();

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;
  const user = await User.findOne({ username });
  const validPassword: boolean = user.passwordHash
    ? await bcrypt.compare(password, user.passwordHash)
    : false;
  if (!validPassword)
    return response.status(401).json({ error: "invalid password or username" });
  const tokenData = {
    username: user.username,
    id: user.id,
  };
  const token = jwt.sign(tokenData, process.env.PASS, { expiresIn: 60 * 60 });
  response.status(200).send({
    token,
    name: user.name,
    username: user.username,
  });
});

loginRouter.get("/", (request, response) => {
  return response.status(200).send({ answer: "hui" });
});

export default loginRouter;
