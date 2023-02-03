import React from "react";
import IInfoMessage from "../Interfaces/IInfoMessage";

function InfoMessage({ text }: IInfoMessage) {
  return (
    <div
      className="rounded-md border-2 border-grey duration-300 flex justify-center items-center w-fit h-8 px-4 bg-blue text-white font-JetBrains"
    >
      {text}
    </div>
  )
}

export default InfoMessage
