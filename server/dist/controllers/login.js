var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../models/user.js";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const loginRouter = express.Router();
loginRouter.post("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = request.body;
    const user = yield User.findOne({ username });
    const validPassword = user.passwordHash
        ? yield bcrypt.compare(password, user.passwordHash)
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
}));
loginRouter.get("/", (request, response) => {
    return response.status(200).send({ answer: "hui" });
});
export default loginRouter;
