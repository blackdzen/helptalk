import IToken from "./IToken";

interface IServer {
  link: string;
  login(password: string, username: string): Promise<IToken | null>;
  postPattern(token: string): void;
}

export default IServer;
