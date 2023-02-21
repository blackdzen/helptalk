import IToken from "./IToken";

interface IServer {
  link: string;
  login(password: string, username: string): Promise<IToken | null>;
}

export default IServer;
