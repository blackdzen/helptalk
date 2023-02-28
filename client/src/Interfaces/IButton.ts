import React from "react";

interface IButton {
  id: string;
  label: string;
  onClick: (event: React.MouseEvent) => void;
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
  hoverTextColor?: string;
  hoverBorderColor?: string;
  hoverBgColor?: string;
  focusTextColor?: string;
  focusBorderColor?: string;
  focusBgColor?: string;
}

export default IButton;
