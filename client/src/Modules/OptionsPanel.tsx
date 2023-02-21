import React, { useRef } from "react";
import IOptionalPanel from "../Interfaces/IOptionsPanel";
import { CSSTransition } from "react-transition-group";
import { RiNumber3 } from "react-icons/ri";
import Checkbox from "../Components/Checkbox";
import DropDownList from "../Components/DropDownList";
import options from "../Utils/options";

function OptinonsPanel({
  isCloseOpen,
  isDepartureOpen,
  isOptionsFocused,
  setIsOptionsFocused,
  setSms,
  isSms,
  setIsSms,
  mainDevice,
  setMainDevice,
  stb,
  setStb,
  optionalService,
  setOptionalService,
  setSels,
  isSels,
  setIsSels,
  setCall,
  isCall,
  setIsCall,
  setOrganize,
  isOrganize,
  setIsOrganize,
}: IOptionalPanel) {
  const closeRef = useRef(null);
  const departureRef = useRef(null);

  return (
    <div>
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
          <div className="font-JetBrains">Опции для закрытия:</div>
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
          <div className="font-JetBrains">Опции для выезда:</div>
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
        </div>
      </CSSTransition>
    </div>
  );
}

export default OptinonsPanel;
