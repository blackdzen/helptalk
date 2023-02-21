import React, { SetStateAction } from "react";
import IServer from "./IServer";
import IToken from "./IToken";

interface ILogin {
  server: IServer;
  setIsFormOpen: React.Dispatch<SetStateAction<boolean>>;
  setIsLoginOpen: React.Dispatch<SetStateAction<boolean>>;
}

export default ILogin;
