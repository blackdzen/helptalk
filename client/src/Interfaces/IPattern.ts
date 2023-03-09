import React, { SetStateAction } from "react";
interface IPattern {
  patternContent: string;
  patternID: string;
  onClickDeleteIcon: (event: React.MouseEvent) => void;
  onClickPattern: (event: React.MouseEvent) => void;
}

export default IPattern;
