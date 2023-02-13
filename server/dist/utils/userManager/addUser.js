var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from "bcrypt";
import User from "../../models/user.js";
import UserData from "./UserData.js";
//Function adds a new user to the database and returns a resulting message as output to the console.
function addUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const userData = new UserData();
        yield userData
            .setUsername()
            .then(() => userData.setName())
            .then(() => userData.setPassword())
            .then(() => __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, name, password } = userData.getUserData();
                const passwordHash = yield bcrypt.hash(password, 10);
                const user = new User({
                    username,
                    name,
                    passwordHash,
                });
                if (yield User.findOne({ username })) {
                    console.log(`Username: ${username} exist in data base. Username must be unique.`);
                }
                else {
                    yield user.save().then(() => {
                        console.log(`User: ${username} saved successfull.`);
                    });
                }
            }
            catch (error) {
                console.log(error);
            }
        }));
    });
}
export default addUser;
