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
import Pattern from "../models/pattern.js";
import express from "express";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";
const patternsRouter = express.Router();
//The function gets a token from the request and returns user data, as a username and a user id, if the verification passed, or null if not.
function tokenVerification(authorizationHeader) {
    let decodedToken = null;
    try {
        decodedToken = jwt.verify(authorizationHeader, process.env.PASS);
    }
    catch (error) {
        console.log(error);
    }
    finally {
        return decodedToken;
    }
}
patternsRouter.delete("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    logger.info("Request. patternsRouter. Delete", request.body.id);
    try {
        const userID = tokenVerification(request.headers.authorization)
            ? tokenVerification(request.headers.authorization).id
            : null;
        if (!userID)
            return response.status(401).json({ message: "Invalid token" });
        const deleteResult = yield Pattern.findByIdAndDelete(request.body.id);
        return deleteResult
            ? response.status(204).end()
            : response.status(404).json({
                message: `The pattern have not found by id: ${request.body.id}`,
            });
    }
    catch (error) {
        console.log(error);
    }
}));
patternsRouter.get("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = tokenVerification(request.headers.authorization)
            ? tokenVerification(request.headers.authorization).id
            : null;
        if (!userID)
            return response.status(401).json({ message: "Invalid token" });
        const patternsResponse = yield Pattern.find({ user: userID });
        if (patternsResponse.length === 0)
            return response.status(404).json({ message: "No patterns found" });
        const userPatterns = patternsResponse.map((pattern) => pattern.toJSON());
        return response.status(200).json(userPatterns);
    }
    catch (error) {
        console.log(error);
    }
}));
patternsRouter.post("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger.info("From: patternsRouter.post", request.body);
        const userID = tokenVerification(request.headers.authorization)
            ? tokenVerification(request.headers.authorization).id
            : null;
        if (!userID)
            return response.status(401).json({ message: "Invalid token" });
        const user = yield User.findById(userID);
        if (!user)
            return response
                .status(404)
                .json({ message: `User id: ${userID} not found.` });
        const { patternType, patternContent } = request.body;
        if (!patternType || !patternContent) {
            return response.status(400).json({ message: "Invalid data format" });
        }
        else {
            const newPattern = new Pattern({
                patternType: patternType,
                patternContent: patternContent,
                user: user.id,
            });
            const savedPattern = yield newPattern.save();
            user.patterns = user.patterns.concat(savedPattern.id);
            yield user.save();
            return response.status(201).json({
                message: "Pattern has been successfully added.",
                savedPattern: savedPattern,
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}));
export default patternsRouter;
