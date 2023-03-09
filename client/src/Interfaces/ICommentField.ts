import React, { SetStateAction } from "react";

export default interface ICommentField {
  id: string;
  placeholder: string;
  title: string;
  value: string;
  setValue: React.Dispatch<SetStateAction<string>>;
  isFocus?: React.Dispatch<SetStateAction<boolean>>;
  height?: string;
}
