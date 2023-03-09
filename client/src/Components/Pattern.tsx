import React from "react";
import IPattern from "../Interfaces/IPattern";
import { AiTwotoneDelete } from "react-icons/ai";

function Pattern({
  patternContent,
  patternID,
  onClickDeleteIcon,
  onClickPattern,
}: IPattern) {
  return (
    <div
      className={`hover:shadow-xl font-JetBrains flex items-center gap-2 shadow cursor-pointer
      transition duration-300 mx-1 rounded-md px-2 py-3 flex-1 text-xs active:shadow relative`}
      onClick={onClickPattern}
    >
      {patternContent}
      <AiTwotoneDelete
        className="deleteIcon w-6 h-6 absolute top-0 -right-2 text-dark-forest hover:text-dark-orchid transition duration-300"
        onClick={onClickDeleteIcon}
        id={patternID}
      />
    </div>
  );
}

export default Pattern;
