import IToken from "./IToken";

interface IServer {
  link: string;
  login(password: string, username: string): Promise<IToken | null>;
  postPattern(token: string, patternType: string, patternContent: string): void;
}

export default IServer;
