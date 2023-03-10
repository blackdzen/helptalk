import axios, { AxiosError } from "axios";
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

  async postPattern(
    token: string,
    patternType: string,
    patternContent: string
  ): Promise<any> {
    const apiPatterns = `${this.link}/api/patterns`;
    try {
      const response = await axios.post(
        apiPatterns,
        {
          patternType: patternType,
          patternContent: patternContent,
        },
        {
          headers: { Authorization: token },
        }
      );
      return { status: response.status, data: response.data };
    } catch (error) {
      const serverError = error as AxiosError;
      console.log(serverError.response?.data);
      return {
        status: serverError.response?.status,
        data: serverError.response?.data,
      };
    }
  }

  async getPatterns(token: string): Promise<any> {
    const apiPatterns = `${this.link}/api/patterns`;
    try {
      const response = await axios.get(apiPatterns, {
        headers: { Authorization: token },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async deletePattern(token: string, id: string): Promise<any> {
    const apiPatterns = `${this.link}/api/patterns`;
    try {
      const response = await axios.delete(apiPatterns, {
        headers: { Authorization: token },
        data: { id: id },
      });
      return { status: response.status, data: response.data };
    } catch (error) {
      const serverError = error as AxiosError;
      console.log(serverError.response?.data);
      return {
        status: serverError.response?.status,
        data: serverError.response?.data,
      };
    }
  }
}

export default Server;
