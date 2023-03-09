import React, { useRef, useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { BiMessageAltAdd } from "react-icons/bi";
import Button from "../Components/Button";
import CommentField from "../Components/CommentField";
import RadioGroup from "../Components/RadioGroup";
import Pattern from "../Components/Pattern";
import IAuthData from "../Interfaces/IAuthData";
import IPatternsPanel from "../Interfaces/IPatternsPanel";
import userPattern from "../Types/userPattern";
import serverResponse from "../Types/serverResponse";

function PatternsPanel({
  isPatternsOpen,
  server,
  operatorComment,
  setOperatorComment,
  setRequestSubject,
  setIsLoginOpen,
  setIsFormOpen,
}: IPatternsPanel) {
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

  // These are states for keeping general and filtered pattern lists.
  const [patternsList, setPatternsList] = useState<userPattern[] | null>(null);
  const [filteredPatterns, setFilteredPatterns] = useState<
    userPattern[] | null
  >(null);

  //The function gets from the localStorage a helpTalkAuthData item and returns it. If the item not found, the function throws error
  const getAuthData = (): IAuthData => {
    const item = localStorage.getItem("helpTalkAuthData");
    if (item) {
      const authData: IAuthData = JSON.parse(item);
      return authData;
    } else {
      throw new Error(
        "The helpTalkAuthData item not found in the localStorage"
      );
    }
  };

  // The function collects and sends data for a new pattern, also adds new pattern to the patternList.
  const addPatern = async () => {
    try {
      const authData = getAuthData();
      if (authData) {
        const response: serverResponse = await server.postPattern(
          authData.token,
          patternType,
          patternContent
        );
        if (response.data.savedPattern) {
          const pattern = response.data.savedPattern as userPattern;
          setPatternsList(
            patternsList ? patternsList.concat(pattern) : new Array(pattern)
          );
          closeNewPattern();
        } else if (response.status === 401) {
          setIsFormOpen(false);
          setIsLoginOpen(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  //The function deletes a selected pattern by id.
  const deletePattern = async (event: React.MouseEvent) => {
    const element = event.target as HTMLElement;
    const deleteIcon = element.closest(".deleteIcon") as HTMLElement;
    try {
      const authData = getAuthData();
      if (authData.token) {
        const response: serverResponse = await server.deletePattern(
          authData.token,
          deleteIcon.id
        );
        if (response.status === 204 && patternsList && filteredPatterns) {
          setPatternsList(
            patternsList.filter((pattern) => pattern.id !== deleteIcon.id)
          );
          setFilteredPatterns(
            filteredPatterns.filter((pattern) => pattern.id !== deleteIcon.id)
          );
        } else if (response.status === 401) {
          setIsFormOpen(false);
          setIsLoginOpen(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  //The function gets user patterns from the server and sets them to the patternsList state.
  const getPatterns = async () => {
    try {
      const authData = getAuthData();
      if (authData) {
        const response = await server.getPatterns(authData.token);
        if (response) {
          setPatternsList(response);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  //The function describes behavior of the button Закрыть.
  const closeNewPattern = () => {
    setIsNewPatternOpen(false);
    setPatternContent("");
    setPatternType("");
    setFilteredPatterns(null);
    setTimeout(() => {
      setIsPatternListOpen(true);
    }, 600);
  };

  //The function describes behavior of the icon '+'
  const openNewPattern = () => {
    setIsNewPatternOpen(true);
    setIsPatternListOpen(false);
    setPatternType("");
  };

  //The fuction takes an argument and sets a filteredPatterns state.
  const pickPatterns = (type: string, patterns: userPattern[]): void => {
    const newPatternList: userPattern[] | null = type
      ? patterns.filter((pattern) => pattern.patternType === type)
      : null;
    setFilteredPatterns(newPatternList);
  };

  const onChangePatternsRadioGroup = (type: string) => {
    setPatternType(type);
    if (patternsList) pickPatterns(type, patternsList);
  };

  //The function adds a pattern to the CommentField.
  const addToComment = (event: React.MouseEvent) => {
    const el = event.target as HTMLDivElement;
    const patternContent = " " + el.textContent;
    if (patternType === "common") {
      setRequestSubject(patternContent);
    } else {
      setOperatorComment(operatorComment + patternContent);
    }
  };

  useEffect(() => {
    setPatternType("");
    closeNewPattern();
  }, [isPatternsOpen]);

  useEffect(() => {
    getPatterns();
  }, []);

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
        className="p-4 justify-self-end border-l border-l-dark-grey h-screen overflow-y-scroll flex flex-1 flex-col relative gap-4"
      >
        <RadioGroup
          onChange={(selectedOption) =>
            onChangePatternsRadioGroup(selectedOption.props.id)
          }
          labelText={`${isPatternListOpen
              ? "Выберите шаблоны из списка:"
              : "Выберите тип будущего шаблона:"
            }`}
          options={[
            <div id="common" className="flex flex-1 justify-around">
              <span>Тема</span>
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

        <CSSTransition
          in={isPatternListOpen}
          timeout={300}
          unmountOnExit
          classNames="component-transition"
        >
          <div ref={patternListRef}>
            <div className="flex flex-col gap-4">
              {filteredPatterns?.map((pattern) => (
                <Pattern
                  key={pattern.id}
                  patternID={pattern.id}
                  patternContent={pattern.patternContent}
                  onClickPattern={addToComment}
                  onClickDeleteIcon={deletePattern}
                />
              ))}
            </div>
            <BiMessageAltAdd
              className="fixed bottom-4 right-4 w-12 h-12 text-blue hover:text-corn transition duration-300
              active:text-blue"
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
          <div ref={newPatternRef}>
            <div className="px-2 flex flex-col gap-2">
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
          </div>
        </CSSTransition>
      </div>
    </CSSTransition>
  );
}

export default PatternsPanel;
