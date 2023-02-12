var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../../models/user.js";
import UserData from "./UserData.js";
function removeUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const userData = new UserData();
        yield userData.setUsername().then(() => __awaiter(this, void 0, void 0, function* () {
            const { username } = userData.getUserData();
            console.log(`Username: ${username}`);
            const response = yield User.deleteOne({ username });
            console.log(`Response: ${response}`);
            const { acknowledged, deletedCount } = response;
            console.log(`acknowledged -> ${acknowledged} deletedCount -> ${deletedCount}`);
            return response;
        }));
    });
}
export default removeUser;
