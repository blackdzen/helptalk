import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import IPatternsPanel from "../Interfaces/IPatternsPanel";

function PatternsPanel({ isPatternsOpen }: IPatternsPanel) {
  const patternsRef = useRef(null);
  return (
    <CSSTransition
      nodeRef={patternsRef}
      in={isPatternsOpen}
      timeout={300}
      unmountOnExit
      classNames="component-transition"
    >
      <div
        ref={patternsRef}
        className="justify-self-end border-l border-l-dark-grey h-screen overflow-y-scroll flex flex-col"
      >
        <div className="flex gap-3 text-lg text font-JetBrains">
          <div>Общее</div>
          <div>ШПД</div>
          <div>IPTV</div>
          <div>VoIP</div>
        </div>
      </div>
    </CSSTransition>
  );
}

export default PatternsPanel;
