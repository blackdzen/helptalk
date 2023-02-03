var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from '../models/user.js';
import express from 'express';
import bcrypt from 'bcrypt';
const usersRouter = express.Router();
usersRouter.post('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, name, password } = request.body;
    const saltRounds = 10;
    try {
        if (yield User.findOne({ username }))
            return response.status(400).json({ error: 'user should be unique' });
        const passwordHash = yield bcrypt.hash(password, saltRounds);
        const user = new User({
            username,
            name,
            passwordHash
        });
        const savedUser = yield user.save();
        return response.status(201).json(savedUser);
    }
    catch (error) {
        console.log(error);
    }
}));
export default usersRouter;
