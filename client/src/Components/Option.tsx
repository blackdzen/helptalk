import React from "react";
import IOption from "../Interfaces/IOption";

function Option({ index, selectedIndex, onSelect, children }: IOption) {
  const isSelected = index === selectedIndex;
  return (
    <div
      className={`hover:shadow-md font-bold font-JetBrains flex items-center gap-2 shadow cursor-pointer transition duration-300 mx-1 rounded-md px-2 py-3 flex-1 text-xs ${isSelected && "bg-corn"
        }`}
      onClick={() => onSelect(index)}
    >
      {children}
    </div>
  );
}

export default Option;
