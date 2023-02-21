import React, { SetStateAction } from "react";

interface IOptionalPanel {
  isCloseOpen: boolean;
  isDepartureOpen: boolean;
  isOptionsFocused: boolean;
  setIsOptionsFocused: React.Dispatch<SetStateAction<boolean>>;
  setSms: React.Dispatch<SetStateAction<string>>;
  isSms: boolean;
  setIsSms: React.Dispatch<SetStateAction<boolean>>;
  mainDevice: string;
  setMainDevice: React.Dispatch<SetStateAction<string>>;
  stb: string;
  setStb: React.Dispatch<SetStateAction<string>>;
  optionalService: string;
  setOptionalService: React.Dispatch<SetStateAction<string>>;
  setSels: React.Dispatch<SetStateAction<string>>;
  isSels: boolean;
  setIsSels: React.Dispatch<SetStateAction<boolean>>;
  setCall: React.Dispatch<SetStateAction<string>>;
  isCall: boolean;
  setIsCall: React.Dispatch<SetStateAction<boolean>>;
  setOrganize: React.Dispatch<SetStateAction<string>>;
  isOrganize: boolean;
  setIsOrganize: React.Dispatch<SetStateAction<boolean>>;
}

export default IOptionalPanel;
