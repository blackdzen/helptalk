import React, { useRef, useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import IPatternsPanel from "../Interfaces/IPatternsPanel";
import Button from "../Components/Button";
import { BiMessageAltAdd } from "react-icons/bi";
import IAuthData from "../Interfaces/IAuthData";

function PatternsPanel({ isPatternsOpen, server }: IPatternsPanel) {
  const [activePattern, setActivePattern] = useState<string>("");
  const patternsRef = useRef(null);

  const onClick = (event: React.MouseEvent) => {
    const btn = event.target as HTMLButtonElement;
    setActivePattern(btn.id);
  };

  const addPatern = async () => {
    const data = localStorage.getItem("helpTalkAuthData");
    if (data) {
      const authData: IAuthData = JSON.parse(data);
      const response = await server.postPattern(authData.token);
    }
  };
  useEffect(() => {
    setActivePattern("");
  }, [isPatternsOpen]);

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
        className="justify-self-end border-l border-l-dark-grey h-screen overflow-y-scroll flex flex-col relative"
      >
        <div className="flex gap-3 p-6">
          <Button id="commonBtn" label="Общее" onClick={onClick} />
          <Button id="internetBtn" label="ШПД" onClick={onClick} />
          <Button id="iptvBtn" label="IPTV" onClick={onClick} />
          <Button id="voipBtn" label="VoIP" onClick={onClick} />
        </div>
        <div>{activePattern}</div>
        <BiMessageAltAdd
          className="absolute bottom-4 right-4 w-12 h-12 text-blue hover:text-dark-orchid transition duration-300 active:text-blue"
          onClick={addPatern}
        />
      </div>
    </CSSTransition>
  );
}

export default PatternsPanel;
