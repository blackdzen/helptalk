import React, { SetStateAction } from "react";

interface ICommentPanel {
  isSubjectFocused: boolean;
  setIsSubjectFocused: React.Dispatch<SetStateAction<boolean>>;
  isOperatorFocused: boolean;
  setIsOperatorFocused: React.Dispatch<SetStateAction<boolean>>;
  requestSubject: string;
  setRequestSubject: React.Dispatch<SetStateAction<string>>;
  operatorComment: string;
  setOperatorComment: React.Dispatch<SetStateAction<string>>;
  isOKButtonOpen: boolean;
  isDepartureButtonOpen: boolean;
  isCloseButtonOpen: boolean;
  okButtonClick: () => void;
  departureButtonClick: () => void;
  closeButtonClick: () => void;
  clearButtonClick: () => void;
}

export default ICommentPanel;
