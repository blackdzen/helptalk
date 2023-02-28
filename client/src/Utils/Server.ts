import axios from "axios";
import IServer from "../Interfaces/IServer";

class Server implements IServer {
  link: string;

  constructor(link: string) {
    this.link = link;
  }

  async login(username: string, password: string) {
    const apiLogin = `${this.link}/api/login`;
    let token = null;
    try {
      const response = await axios.post(apiLogin, {
        username: username,
        password: password,
      });
      token = response.data;
    } catch (error) {
      console.log(error);
    } finally {
      return token;
    }
  }

  async postPattern(token: string) {
    const apiPatterns = `${this.link}/api/patterns`;
    try {
      const response = await axios.post(apiPatterns, {
        token: token,
        // patternType: "voip",
        // patternContent: "Third pattern test",
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
}

export default Server;
