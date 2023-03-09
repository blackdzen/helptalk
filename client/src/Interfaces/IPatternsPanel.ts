import React, { SetStateAction } from "react";
import IServer from "./IServer";

interface IPatternsPanel {
  isPatternsOpen: boolean;
  server: IServer;
  operatorComment: string;
  setOperatorComment: React.Dispatch<SetStateAction<string>>;
  requestSubject: string;
  setRequestSubject: React.Dispatch<SetStateAction<string>>;
  setIsFormOpen: React.Dispatch<SetStateAction<boolean>>;
  setIsLoginOpen: React.Dispatch<SetStateAction<boolean>>;
}

export default IPatternsPanel;
