import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import IInfoMessage from "../Interfaces/IInfoMessage";

function InfoMessage({ text, isMessageOpen }: IInfoMessage) {
  const copyMessageRef = useRef(null);
  return (
    <CSSTransition
      nodeRef={copyMessageRef}
      in={isMessageOpen}
      timeout={300}
      unmountOnExit
      classNames="absolute top-0 right-1/2 component-transition"
    >
      <div
        ref={copyMessageRef}
        className="rounded-md border-2 border-grey duration-300 flex justify-center items-center w-fit h-8 px-4 bg-blue text-white font-JetBrains"
      >
        {text}
      </div>
    </CSSTransition>
  );
}

export default InfoMessage;
