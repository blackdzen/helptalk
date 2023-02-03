import { useState, useRef } from "react";
import Button from "./Components/Button";
import Checkbox from "./Components/Checkbox";
import CommentField from "./Components/CommentField";
import DropDownList from "./Components/DropDownList";
import InfoMessage from "./Components/InfoMessage";
import options from "./Utils/options";
import commentator from "./Utils/commentator";
import { useClipboard } from "use-clipboard-copy";
import { CSSTransition } from "react-transition-group";
import { RiNumber1, RiNumber2, RiNumber3 } from "react-icons/ri";
import Login from "./Components/Login";
import Server from "./Utils/Server";

function App() {
  //Node references for CSSTransition components
  const commentRef = useRef(null);
  const closeRef = useRef(null);
  const departureRef = useRef(null);
  const hotsRef = useRef(null);
  const copyMessageRef = useRef(null);
  const formRef = useRef(null);

  // These are states that defined visibility of components:
  const [isDepartureOpen, setIsDepartureOpen] = useState<boolean>(false);
  const [isCloseOpen, setIsCloseOpen] = useState<boolean>(false);
  const [isOKButtonOpen, setIsOKButtonOpen] = useState<boolean>(false);
  const [isCloseButtonOpen, setIsCloseButtonOpen] = useState<boolean>(true);
  const [isDepartureButtonOpen, setIsDepartureButtonOpen] =
    useState<boolean>(true);
  const [isCopyMessageOpen, setIsCopyMessageOpen] = useState<boolean>(false);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(true);

  //These are states for checboxes define was checbox checked or not
  const [isSels, setIsSels] = useState<boolean>(false);
  const [isCall, setIsCall] = useState<boolean>(false);
  const [isOrganize, setIsOrganize] = useState<boolean>(false);
  const [isSms, setIsSms] = useState<boolean>(true);

  //These are states for that defined focus on html elements
  const [isSubjectFocused, setIsSubjectFocused] = useState<boolean>(false);
  const [isOperatorFocused, setIsOperatorFocused] = useState<boolean>(false);
  const [isOptionsFocused, setIsOptionsFocused] = useState<boolean>(false);

  // These are the states that store data for the future comment for Argus:
  const [operatorComment, setOperatorComment] = useState<string>("");

  // const [fault, setFault] = useState<string>('')
  const [sels, setSels] = useState<string>("");
  const [call, setCall] = useState<string>("");
  const [organize, setOrganize] = useState<string>("");

  const [requestSubject, setRequestSubject] = useState<string>("");
  const [mainDevice, setMainDevice] = useState<string>("");
  // const [optionalDevice, setOptionalDevice] = useState<string>('')
  const [stb, setStb] = useState<string>("");
  const [optionalService, setOptionalService] = useState<string>("");
  const [sms, setSms] = useState<string>("Да");

  // Hook for copy to clipboard
  const clipboard = useClipboard();

  // On click functions for buttons:
  const departureButtonClick = () => {
    setIsDepartureOpen(true);
    setIsCloseOpen(false);
    setIsOKButtonOpen(true);
    setIsCloseButtonOpen(true);
    setIsDepartureButtonOpen(false);
  };
  const closeButtonClick = () => {
    setIsDepartureOpen(false);
    setIsCloseOpen(true);
    setIsOKButtonOpen(true);
    setIsCloseButtonOpen(false);
    setIsDepartureButtonOpen(true);
  };
  const okButtonClick = () => {
    let comment = "";
    if (isDepartureOpen) {
      commentator.setParts("departure", [
        ["requestSubject", requestSubject],
        ["operatorComment", operatorComment],
        // ['fault', fault],
        ["sels", sels],
        ["call", call],
        ["organize", organize],
      ]);
      comment = commentator.getComment("departure");
    } else {
      commentator.setParts("close", [
        ["operatorComment", operatorComment],
        ["requestSubject", requestSubject],
        ["mainDevice", mainDevice],
        // ['optionalDevice', optionalDevice],
        ["stb", stb],
        ["optionalService", optionalService],
        ["sms", sms],
      ]);
      comment = commentator.getComment("close");
    }
    clipboard.copy(comment);
    toDefault();
    setIsCopyMessageOpen(true);
    setTimeout(() => setIsCopyMessageOpen(false), 3000);
  };

  const clearButtonClick = () => toDefault();

  // Func resets values form to default state
  function toDefault() {
    setIsDepartureOpen(false);
    setIsCloseOpen(false);
    setIsOKButtonOpen(false);
    setIsCloseButtonOpen(true);
    setIsDepartureButtonOpen(true);
    setOperatorComment("");
    // setFault('')
    setSels("");
    setIsSels(false);
    setIsCall(false);
    setIsOrganize(false);
    setIsSms(true);
    setCall("");
    setOrganize("");
    setRequestSubject("");
    setMainDevice("");
    // setOptionalDevice('')
    setStb("");
    setOptionalService("");
    setSms("Да");
  }

  const server = new Server("http://83.222.8.84:3005");
  server.login("1", "2");

  return (
    <div className="App">
      {/* <Login setIsFormOpen={setIsFormOpen} /> */}
      <CSSTransition
        nodeRef={formRef}
        in={isFormOpen}
        timeout={300}
        unmountOnExit
        classNames="component-transition"
      >
        <div ref={formRef} className="Form flex gap-6 ml-6 relative">
          <CSSTransition
            nodeRef={copyMessageRef}
            in={isCopyMessageOpen}
            timeout={300}
            unmountOnExit
            classNames="component-transition"
          >
            <div ref={copyMessageRef} className="absolute top-0 right-1/2">
              <InfoMessage text="Сообщение скопировано в буффер..." />
            </div>
          </CSSTransition>
          <div
            ref={commentRef}
            className="flex flex-col gap-6 w-[500px] mt-6 relative pl-8"
          >
            <RiNumber1
              className={`${isSubjectFocused ? "bg-blue text-white" : ""
                } rounded-full border-2 border-blue p-2 box-content absolute -top-1 left-0 duration-200`}
            />
            <CommentField
              rows={2}
              cols={70}
              id="subject"
              placeholder="Введите тему обращения..."
              title="Тема обращения:"
              value={requestSubject}
              setValue={setRequestSubject}
              isFocus={setIsSubjectFocused}
            />
            <RiNumber2
              className={`${isOperatorFocused ? "bg-blue text-white" : ""
                } rounded-full border-2 border-blue p-2 box-content absolute top-[255px] left-0`}
            />
            <CommentField
              rows={10}
              cols={50}
              id="operator"
              placeholder="Введите комментарий..."
              title="Комментарий специалиста:"
              value={operatorComment}
              setValue={setOperatorComment}
              isFocus={setIsOperatorFocused}
            />
            <div className="flex gap-6 justify-center">
              {isOKButtonOpen && (
                <Button id="ok" label="Готово" onClick={okButtonClick} />
              )}
              {isDepartureButtonOpen && (
                <Button
                  id="departureButton"
                  label="Выезд"
                  onClick={departureButtonClick}
                />
              )}
              {isCloseButtonOpen && (
                <Button
                  id="closeButton"
                  label="Закрыть"
                  onClick={closeButtonClick}
                />
              )}
              <Button id="clear" label="Очистить" onClick={clearButtonClick} />
            </div>
          </div>
          <CSSTransition
            nodeRef={closeRef}
            in={isCloseOpen}
            timeout={300}
            unmountOnExit
            classNames="component-transition"
          >
            <div
              ref={closeRef}
              className="flex flex-col gap-6 justify-start relative pl-12 mt-6  "
            >
              <RiNumber3
                className={`${isOptionsFocused ? "bg-blue text-white" : ""
                  } rounded-full border-2 border-blue p-2 box-content absolute -top-1 left-0`}
              />
              <div>Опции для закрытия:</div>
              <Checkbox
                id="sms"
                label="Клиент проинформирован об смс"
                setStateValue={setSms}
                setStateIsChecked={setIsSms}
                isChecked={isSms}
                positiveValue="Да"
                negativeValue="Нет"
              />
              <DropDownList
                options={options.mainDevices}
                setState={setMainDevice}
                label="Основное устройство"
                defaultValue={mainDevice}
                isFocus={setIsOptionsFocused}
              />
              {/* <DropDownList */}
              {/*   options={options.optionalDevices} */}
              {/*   setState={setOptionalDevice} */}
              {/*   label='Дополнительное устройcтво' */}
              {/*   defaultValue={optionalDevice} */}
              {/*   isFocus={setIsOptionsFocused} */}
              {/* /> */}
              <DropDownList
                options={options.stb}
                setState={setStb}
                label="STB"
                defaultValue={stb}
                isFocus={setIsOptionsFocused}
              />
              <DropDownList
                options={options.optionalServices}
                setState={setOptionalService}
                label="Смежная услуга"
                defaultValue={optionalService}
                isFocus={setIsOptionsFocused}
              />
            </div>
          </CSSTransition>
          <CSSTransition
            nodeRef={departureRef}
            in={isDepartureOpen}
            timeout={300}
            unmountOnExit
            classNames="component-transition"
          >
            <div
              ref={departureRef}
              className="flex flex-col gap-6 justify-start relative pl-12 mt-6  "
            >
              <RiNumber3
                className={`${isOptionsFocused ? "bg-blue text-white" : ""
                  } rounded-full border-2 border-blue p-2 box-content absolute -top-1 left-0`}
              />
              <div>Опции для выезда:</div>
              <Checkbox
                id="sels"
                label="СЭЛС был"
                setStateValue={setSels}
                setStateIsChecked={setIsSels}
                isChecked={isSels}
                positiveValue="СЭЛС был, сигнал ТУ."
                negativeValue=""
              />
              <Checkbox
                id="call"
                label="Набрать заранее"
                setStateValue={setCall}
                setStateIsChecked={setIsCall}
                isChecked={isCall}
                positiveValue="Клиент просит набрать перед выездом."
                negativeValue=""
              />
              <Checkbox
                id="organize"
                label="Без согласования"
                setStateValue={setOrganize}
                setStateIsChecked={setIsOrganize}
                isChecked={isOrganize}
                positiveValue="Без согласования."
                negativeValue=""
              />
              {/* <DropDownList */}
              {/*   options={options.faults} */}
              {/*   setState={setFault} */}
              {/*   label='Причина выезда' */}
              {/*   defaultValue={fault} */}
              {/*   isFocus={setIsOptionsFocused} */}
              {/* /> */}
            </div>
          </CSSTransition>
          <CSSTransition
            nodeRef={hotsRef}
            in={true}
            timeout={300}
            unmountOnExit
            classNames="component-transition"
          >
            <div ref={hotsRef} className="justify-self-end"></div>
          </CSSTransition>
        </div>
      </CSSTransition>
    </div>
  );
}

export default App;
