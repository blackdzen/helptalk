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
}

export default Server;
