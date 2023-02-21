import React from "react";
import { RiNumber1, RiNumber2 } from "react-icons/ri";
import CommentField from "../Components/CommentField";
import Button from "../Components/Button";
import ICommentPanel from "../Interfaces/ICommentPanel";

function CommentPanel({
  isSubjectFocused,
  setIsSubjectFocused,
  isOperatorFocused,
  setIsOperatorFocused,
  requestSubject,
  setRequestSubject,
  operatorComment,
  setOperatorComment,
  isOKButtonOpen,
  isCloseButtonOpen,
  isDepartureButtonOpen,
  okButtonClick,
  departureButtonClick,
  closeButtonClick,
  clearButtonClick,
}: ICommentPanel) {
  return (
    <div className="flex flex-col gap-6 w-[500px] mt-6 relative pl-8">
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
          <Button id="closeButton" label="Закрыть" onClick={closeButtonClick} />
        )}
        <Button id="clear" label="Очистить" onClick={clearButtonClick} />
      </div>
    </div>
  );
}

export default CommentPanel;
