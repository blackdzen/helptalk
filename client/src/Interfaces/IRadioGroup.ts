import React from "react";

interface IRadioGroup {
  options: React.ReactElement[];
  onChange?: (selectedOption: React.ReactElement) => void;
  value?: number;
  labelText?: string;
}

export default IRadioGroup;
