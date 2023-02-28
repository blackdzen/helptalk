import User from "../models/user.js";
import Pattern from "../models/pattern.js";
import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

const patternsRouter = express.Router();
interface IUserData {
  username: string;
  id: string;
}

//The function gets a token from the request and returns user data, as a username and a user id, if the verification passed, or null if not.
function tokenVerification(request: Request): IUserData | null {
  let decodedToken: IUserData | null = null;
  try {
    const { token } = request.body;
    decodedToken = jwt.verify(token, process.env.PASS) as IUserData;
  } catch (error) {
    console.log(error);
  } finally {
    return decodedToken;
  }
}

patternsRouter.post("/", async (request, response) => {
  try {
    logger.info("From: patternsRouter.post", request.body);
    const userID = tokenVerification(request)
      ? tokenVerification(request).id
      : null;
    if (!userID) return response.status(401).json({ message: "Invalid token" });
    const user = await User.findById(userID);
    if (!user)
      return response
        .status(404)
        .json({ message: `User id: ${userID} not found.` });
    const { patternType, patternContent } = request.body;
    if (!patternType || !patternContent) {
      return response.status(400).json({ message: "Invalid data format" });
    } else {
      const newPattern = new Pattern({
        patternType: patternType,
        patternContent: patternContent,
        user: user.id,
      });
      const savedPattern = await newPattern.save();
      user.patterns = user.patterns.concat(savedPattern.id);
      await user.save();
      return response
        .status(201)
        .json({
          message: "Pattern has been successfully added.",
          savedPattern: savedPattern,
        });
    }
  } catch (error) {
    console.log(error);
  }
});

export default patternsRouter;
