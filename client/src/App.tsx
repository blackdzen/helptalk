import { useState, useRef } from "react";
import InfoMessage from "./Components/InfoMessage";
import commentator from "./Utils/commentator";
import { useClipboard } from "use-clipboard-copy";
import { CSSTransition } from "react-transition-group";
import Login from "./Modules/Login";
import Server from "./Utils/Server";
import PatternsPanel from "./Modules/PatternsPanel";
import CommentPanel from "./Modules/CommentPanel";
import OptinonsPanel from "./Modules/OptionsPanel";

function App() {
  //The object to communicate with the backend part of application.
  const server = new Server("http://83.222.8.84:3005");

  //Node references for CSSTransition components
  const formRef = useRef(null);

  // These are states that defined visibility of components:
  const [isDepartureOpen, setIsDepartureOpen] = useState<boolean>(false);
  const [isCloseOpen, setIsCloseOpen] = useState<boolean>(false);
  const [isOKButtonOpen, setIsOKButtonOpen] = useState<boolean>(false);
  const [isCloseButtonOpen, setIsCloseButtonOpen] = useState<boolean>(true);
  const [isDepartureButtonOpen, setIsDepartureButtonOpen] =
    useState<boolean>(true);
  const [isCopyMessageOpen, setIsCopyMessageOpen] = useState<boolean>(false);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(true);
  const [isPatternsOpen, setIsPatternsOpen] = useState<boolean>(false);

  //These are states for checboxes define was checkbox checked or not
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
  const [requestSubject, setRequestSubject] = useState<string>("");

  const [sels, setSels] = useState<string>("");
  const [call, setCall] = useState<string>("");
  const [organize, setOrganize] = useState<string>("");

  const [mainDevice, setMainDevice] = useState<string>("");
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
    setIsPatternsOpen(true);
  };
  const closeButtonClick = () => {
    setIsDepartureOpen(false);
    setIsCloseOpen(true);
    setIsOKButtonOpen(true);
    setIsCloseButtonOpen(false);
    setIsDepartureButtonOpen(true);
    setIsPatternsOpen(true);
  };
  const okButtonClick = () => {
    let comment = "";
    if (isDepartureOpen) {
      commentator.setParts("departure", [
        ["requestSubject", requestSubject],
        ["operatorComment", operatorComment],
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

  // The function resets states to default values
  function toDefault() {
    setIsDepartureOpen(false);
    setIsCloseOpen(false);
    setIsOKButtonOpen(false);
    setIsCloseButtonOpen(true);
    setIsDepartureButtonOpen(true);
    setOperatorComment("");
    setSels("");
    setIsSels(false);
    setIsCall(false);
    setIsOrganize(false);
    setIsSms(true);
    setCall("");
    setOrganize("");
    setRequestSubject("");
    setMainDevice("");
    setStb("");
    setOptionalService("");
    setSms("Да");
    setIsPatternsOpen(false);
  }

  return (
    <div className="App">
      <Login
        isLoginOpen={isLoginOpen}
        server={server}
        setIsFormOpen={setIsFormOpen}
        setIsLoginOpen={setIsLoginOpen}
      />
      <CSSTransition
        nodeRef={formRef}
        in={isFormOpen}
        timeout={300}
        unmountOnExit
        classNames="component-transition"
      >
        <div ref={formRef} className="Form flex gap-6 ml-6 relative">
          <InfoMessage
            isMessageOpen={isCopyMessageOpen}
            text="Сообщение скопировано в буффер..."
          />
          <CommentPanel
            isSubjectFocused={isSubjectFocused}
            setIsSubjectFocused={setIsSubjectFocused}
            isOperatorFocused={isOperatorFocused}
            setIsOperatorFocused={setIsOperatorFocused}
            requestSubject={requestSubject}
            setRequestSubject={setRequestSubject}
            operatorComment={operatorComment}
            setOperatorComment={setOperatorComment}
            isOKButtonOpen={isOKButtonOpen}
            isCloseButtonOpen={isCloseButtonOpen}
            isDepartureButtonOpen={isDepartureButtonOpen}
            okButtonClick={okButtonClick}
            departureButtonClick={departureButtonClick}
            closeButtonClick={closeButtonClick}
            clearButtonClick={clearButtonClick}
          />
          <OptinonsPanel
            isCloseOpen={isCloseOpen}
            isDepartureOpen={isDepartureOpen}
            isOptionsFocused={isOptionsFocused}
            setIsOptionsFocused={setIsOptionsFocused}
            setSms={setSms}
            isSms={isSms}
            setIsSms={setIsSms}
            mainDevice={mainDevice}
            setMainDevice={setMainDevice}
            stb={stb}
            setStb={setStb}
            optionalService={optionalService}
            setOptionalService={setOptionalService}
            setSels={setSels}
            isSels={isSels}
            setIsSels={setIsSels}
            setCall={setCall}
            isCall={isCall}
            setIsCall={setIsCall}
            setOrganize={setOrganize}
            isOrganize={isOrganize}
            setIsOrganize={setIsOrganize}
          />
          <PatternsPanel
            isPatternsOpen={isPatternsOpen}
            server={server}
            operatorComment={operatorComment}
            setOperatorComment={setOperatorComment}
            requestSubject={requestSubject}
            setRequestSubject={setRequestSubject}
            setIsFormOpen={setIsFormOpen}
            setIsLoginOpen={setIsLoginOpen}
          />
        </div>
      </CSSTransition>
    </div>
  );
}

export default App;
