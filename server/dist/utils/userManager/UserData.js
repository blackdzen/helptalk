var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import readline from "readline";
import inputChecker from "./inputChecker.js";
class UserData {
    constructor() {
        this.username = null;
        this.name = null;
        this.password = null;
    }
    setUsername() {
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                const response = yield this.getData("Enter a username: ");
                if (inputChecker.isExist(response) &&
                    inputChecker.isInOneWord(response)) {
                    this.username = response.trim();
                    break;
                }
                else {
                    console.log("Invalid username. Username can't be empty or consist of several words. Try again.");
                }
            }
        });
    }
    setName() {
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                const response = yield this.getData("Enter a name: ");
                if (inputChecker.isExist(response) &&
                    inputChecker.isInOneWord(response)) {
                    this.name = response.trim();
                    break;
                }
                else {
                    console.log("Invalid name. Name can't be empty or consist of several words. Try again.");
                }
            }
        });
    }
    setPassword() {
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                const response = yield this.getData("Enter a password: ");
                if (inputChecker.isExist(response) &&
                    inputChecker.isInOneWord(response)) {
                    this.password = response.trim();
                    break;
                }
                else {
                    console.log("Invalid password. Password can't be empty or consist of several words. Try again.");
                }
            }
        });
    }
    //Return object with user data
    getUserData() {
        return {
            username: this.username,
            name: this.name,
            password: this.password,
        };
    }
    // Get user input from console
    getData(question) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        return new Promise((resolve) => {
            rl.question(question, (answer) => {
                rl.close();
                resolve(answer);
            });
        });
    }
}
export default UserData;
