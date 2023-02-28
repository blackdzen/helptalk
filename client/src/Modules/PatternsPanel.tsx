import React, { useRef, useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { BiMessageAltAdd } from "react-icons/bi";
import Button from "../Components/Button";
import CommentField from "../Components/CommentField";
import RadioGroup from "../Components/RadioGroup";
import IAuthData from "../Interfaces/IAuthData";
import IPatternsPanel from "../Interfaces/IPatternsPanel";

function PatternsPanel({ isPatternsOpen, server }: IPatternsPanel) {
  //Node references for CSSTransition components
  const patternsRef = useRef(null);
  const newPatternRef = useRef(null);
  const patternListRef = useRef(null);

  // These are states that defined visibility of components:
  const [isNewPatternOpen, setIsNewPatternOpen] = useState<boolean>(false);
  const [isPatternListOpen, setIsPatternListOpen] = useState<boolean>(true);

  //These are states for defining focus on html elements:
  const [isPatternContentFocus, setIsPatternContentFocus] =
    useState<boolean>(false);

  // These are the states that store data for the future pattern:
  const [patternContent, setPatternContent] = useState<string>("");
  const [patternType, setPatternType] = useState<string>("");

  const addPatern = async () => {
    const data = localStorage.getItem("helpTalkAuthData");
    if (data) {
      const authData: IAuthData = JSON.parse(data);
      const response = await server.postPattern(
        authData.token,
        patternType,
        patternContent
      );
    }
    closeNewPattern();
  };

  const closeNewPattern = () => {
    setIsNewPatternOpen(false);
    setPatternContent("");
    setPatternType("");
    setTimeout(() => {
      setIsPatternListOpen(true);
    }, 600);
  };

  const openNewPattern = () => {
    setIsNewPatternOpen(true);
    setIsPatternListOpen(false);
    setPatternType("");
  };

  useEffect(() => {
    setPatternType("");
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
        className="p-4 justify-self-end border-l border-l-dark-grey h-screen overflow-y-scroll flex flex-1 flex-col relative"
      >
        <CSSTransition
          in={isPatternListOpen}
          timeout={300}
          unmountOnExit
          classNames="component-transition"
        >
          <div ref={patternListRef}>
            <RadioGroup
              onChange={(selectedOption) =>
                setPatternType(selectedOption.props.id)
              }
              options={[
                <div id="common" className="flex flex-1 justify-around">
                  <span>Общее</span>
                </div>,
                <div id="internet" className="flex flex-1 justify-around">
                  <span>Internet</span>
                </div>,
                <div id="iptv" className="flex flex-1 justify-around">
                  <span>IPTV</span>
                </div>,
                <div id="voip" className="flex flex-1 justify-around">
                  <span>VoIp</span>
                </div>,
              ]}
            />

            <BiMessageAltAdd
              className="absolute bottom-4 right-4 w-12 h-12 text-blue hover:text-dark-orchid transition duration-300 active:text-blue"
              onClick={openNewPattern}
            />
          </div>
        </CSSTransition>
        <CSSTransition
          in={isNewPatternOpen}
          timeout={300}
          unmountOnExit
          classNames="component-transition "
        >
          <div className="px-2 flex flex-col gap-2" ref={newPatternRef}>
            <RadioGroup
              onChange={(selectedOption) =>
                setPatternType(selectedOption.props.id)
              }
              labelText="Установите тип шаблона:"
              options={[
                <div id="common" className="flex flex-1 justify-around">
                  <span>Общее</span>
                </div>,
                <div id="internet" className="flex flex-1 justify-around">
                  <span>Internet</span>
                </div>,
                <div id="iptv" className="flex flex-1 justify-around">
                  <span>IPTV</span>
                </div>,
                <div id="voip" className="flex flex-1 justify-around">
                  <span>VoIp</span>
                </div>,
              ]}
            />
            <CommentField
              id="patternContent"
              placeholder="Текст шаблона..."
              title="Введите текст шаблона:"
              value={patternContent}
              setValue={setPatternContent}
              isFocus={setIsPatternContentFocus}
            />
            <div className="flex justify-center gap-4">
              <Button id="addPatern" label="Добавить" onClick={addPatern} />
              <Button
                id="closeNewPattern"
                label="Закрыть"
                onClick={closeNewPattern}
              />
            </div>
          </div>
        </CSSTransition>
      </div>
    </CSSTransition>
  );
}

export default PatternsPanel;
