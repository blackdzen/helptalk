import readline, { Interface } from "readline";
import inputChecker from "./inputChecker.js";

// The class accepts user input from the console, checks the input, saves the input for a future user creation in the database.
class UserData {
  private username: string | null;
  private name: string | null;
  private password: string | null;
  private rl: Interface;

  constructor() {
    this.username = null;
    this.name = null;
    this.password = null;
  }

  // The function accepts user input from the console, checks it and sets it as a username.
  async setUsername() {
    while (true) {
      const response = await this.getData(
        "Enter a username. The username must be unique: "
      );
      if (
        inputChecker.isExist(response) &&
        inputChecker.isInOneWord(response)
      ) {
        this.username = response.trim();
        break;
      } else {
        console.log(
          "Invalid username. Username can't be empty or consist of several words. Try again."
        );
      }
    }
  }

  // The function accepts user input from the console, checks it and sets it as a name.
  async setName() {
    while (true) {
      const response = await this.getData("Enter a name: ");
      if (
        inputChecker.isExist(response) &&
        inputChecker.isInOneWord(response)
      ) {
        this.name = response.trim();
        break;
      } else {
        console.log(
          "Invalid name. Name can't be empty or consist of several words. Try again."
        );
      }
    }
  }

  // The function accepts user input from the console, checks it and sets it as a password.
  async setPassword() {
    while (true) {
      const response = await this.getData("Enter a password: ");
      if (
        inputChecker.isExist(response) &&
        inputChecker.isInOneWord(response)
      ) {
        this.password = response.trim();
        break;
      } else {
        console.log(
          "Invalid password. Password can't be empty or consist of several words. Try again."
        );
      }
    }
  }

  //The function returns the object with a user data for a future user creation in the database.
  getUserData() {
    return {
      username: this.username,
      name: this.name,
      password: this.password,
    };
  }

  // The function accepts user input from the console and returns a string with user input.
  private getData(question: string): Promise<string> {
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
