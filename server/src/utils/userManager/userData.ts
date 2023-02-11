import readline, { Interface } from "readline";
import inputChecker from "./inputChecker.js";

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

  async setUsername() {
    while (true) {
      const response = await this.getData("Enter a username: ");
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

  //Return object with user data
  getUserData() {
    return {
      username: this.username,
      name: this.name,
      password: this.password,
    };
  }

  // Get user input from console
  private getData(question: string): Promise<string> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    return new Promise((resolve) => {
      rl.question(question, (answer) => {
        resolve(answer);
        rl.close();
      });
    });
  }
}

export default UserData;
