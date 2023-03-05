import IToken from "./IToken";
import userPattern from "../Types/userPattern";

interface IServer {
  link: string;
  login(password: string, username: string): Promise<IToken | null>;
  postPattern(
    token: string,
    patternType: string,
    patternContent: string
  ): Promise<any>;
  getPatterns(token: string): Promise<any>;
  deletePattern(token: string, id: string): Promise<any>;
}

export default IServer;
