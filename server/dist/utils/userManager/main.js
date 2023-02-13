import config from "../config.js";
import mongoose from "mongoose";
import addUser from "./addUser.js";
import removeUser from "./removeUser.js";
import readline from "readline";
// The main script accepts user input and interprets it by adding or removing the user from the database.
const { log, error } = console;
mongoose.set("strictQuery", false);
try {
    mongoose
        .connect(config.MONGODB_URI)
        .then(() => {
        log("Hi. Select option: ");
        log("Press 1 to add new user to database,");
        log("Press 2 to remove user from database.");
        log("Press 3 to exit from user manager.");
        return new Promise((resolve) => {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });
            rl.question("Enter an option number: ", (answer) => {
                rl.close();
                resolve(answer.trim());
            });
        });
    })
        .then((answer) => {
        if (answer === "1") {
            addUser().then(() => mongoose.connection.close());
        }
        else if (answer === "2") {
            removeUser().then(() => mongoose.connection.close());
        }
        else if (answer === "3") {
            log("Bye.");
            mongoose.connection.close();
        }
        else {
            log("Invalid option number.");
            mongoose.connection.close();
        }
    });
}
catch (err) {
    error(err);
}
