import React from "react";
import IButton from "../Interfaces/IButton";

function Button({
  id,
  label,
  onClick,
  bgColor,
  textColor,
  borderColor,
  hoverBorderColor,
  hoverBgColor,
  hoverTextColor,
  focusBorderColor,
  focusBgColor,
  focusTextColor,
}: IButton) {
  return (
    <div>
      <button
        id={id}
        onClick={onClick}
        className={`
        w-[150px]
        hover:shadow-xl
        active:shadow-md
        border-2
        ${borderColor ? borderColor : "border-grey"}
        ${bgColor ? bgColor : "bg-white"}
        ${textColor ? textColor : "text-rich-black"}
        ${hoverBorderColor ? hoverBorderColor : "hover:border-grey"}
        ${hoverTextColor ? hoverTextColor : "hover:rich-black"}
        ${hoverBgColor ? hoverBgColor : "hover:bg-white"}
        ${focusBorderColor ? focusBorderColor : "focus:border-grey"}
        ${focusTextColor ? focusTextColor : "focus:rich-black"}
        ${focusBgColor ? focusBgColor : "focus:bg-white"}
        rounded-md
        py-4
        font-JetBrains
        duration-300
        text-center
        outline-none
        `}
      >
        {label}
      </button>
    </div>
  );
}
export default Button;
