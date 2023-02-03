import React, { useEffect, useRef, useState } from "react";
import { CSSTransition } from 'react-transition-group'
import { CgChevronDown, CgSearch, CgClose } from "react-icons/cg";
import IDropDownList from "../Interfaces/IDropDownList";

function DropDownList({ options, label, setState, defaultValue, isFocus }: IDropDownList) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isCloseIconOpen, setIsCloseIconOpen] = useState<boolean>(false)
  const [isAutofocus, setIsAutofocus] = useState<boolean>(false)
  const [rotate, setRotate] = useState<string>('')
  const [searchValue, setSearchValue] = useState<string>('')
  const [filteredOptions, setFilteredOptions] = useState(options)
  const [listName, setListName] = useState<string>(label)

  const optionsRef = useRef(null)
  const closeIconRef = useRef(null)

  const openOptions = (event: React.MouseEvent<HTMLElement>) => {
    setIsAutofocus(true)
    const el = event.target as HTMLDivElement
    if (el.parentElement && el.parentElement.classList.contains('close-icon')) {
      setListName(label)
      setState('')
      setIsOpen(false)
      setIsCloseIconOpen(false)
    } else {
      setIsOpen(!isOpen)
    }
  }

  const onFocus = () => {
    if (isFocus) {
      isFocus(true)
    }
  }

  const onBlur = () => {
    if (isFocus) {
      isFocus(false)
    }
  }

  const searchOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value
    setSearchValue(value)
    filter(value)
  }

  const optionsListClick = (event: React.MouseEvent<HTMLElement>) => {
    const option = event.target as HTMLLIElement
    if (option.classList.contains('active-option') && option.textContent) {
      setState(option.textContent)
      setListName(option.textContent)
      setIsOpen(false)
      setIsCloseIconOpen(true)
    }
  }

  function filter(value: string) {
    if (value) {
      setFilteredOptions(options.filter(option => Array.isArray(option) ? false : option.toLowerCase().search(value.toLowerCase()) !== -1 ? true : false))
    } else {
      setFilteredOptions(options)
    }
  }

  useEffect(() => {
    setRotate(isOpen ? 'rotate-180' : '')
    setSearchValue('')
  }, [isOpen])

  useEffect(() => {
    if (defaultValue) {
      setListName(defaultValue)
      setIsCloseIconOpen(true)
    }
  }, [])

  return (
    <div
      className="wrapper w-[600px] font-JetBrains cursor-pointer  "
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <div
        className="select-btn hover:border-blue flex justify-between h-16 py-0 px-5 border-2 rounded-md border-grey shadow-xl"
        onClick={openOptions}
      >
        <div className="self-center">{listName}</div>
        <div className="self-center flex gap-3">
          <CSSTransition nodeRef={closeIconRef} in={isCloseIconOpen} timeout={300} unmountOnExit classNames='component-transition'>
            <div ref={closeIconRef} className={` ${rotate} duration-300 close-icon`}><CgClose /></div>
          </CSSTransition>
          <div className={` ${rotate} duration-300`}><CgChevronDown /></div>
        </div>

      </div>
      <CSSTransition nodeRef={optionsRef} in={isOpen} timeout={300} unmountOnExit classNames='component-transition'>
        <div ref={optionsRef} className="content mt-4 border-2 border-grey rounded-md p-5 relative shadow-xl">
          <div className="search flex items-baseline relative">
            <div className="absolute top-5 left-1 text-[#999]"><CgSearch /></div>
            <input
              className="hover:border-blue duration-300 h-14 w-full border-[1px] border-grey rounded-md pl-6"
              placeholder="Поиск..."
              value={searchValue}
              onChange={searchOnChange}
              autoFocus={isAutofocus}
            />
          </div>
          <ul
            onClick={optionsListClick}
            className="options mt-3 max-h-80 overflow-y-auto overflow-x-hidden">
            {filteredOptions.map((option, index) => {
              const optionStatus = Array.isArray(option) ? 'disabled-option' : 'active-option'
              const value = Array.isArray(option) ? option[0] : option
              return (<li
                key={index}
                value={value}
                className={`
                ${optionStatus === 'active-option' ? 'active-option hover:bg-blue hover:text-white' : 'disabled-option text-[#999]'}
                hover:rounded-md
                                cursor-pointer
 h-16
                duration-200p 
                relative
                `}
              >
                <div
                  className={`${optionStatus} pl-3 absolute top-1/2 -translate-y-1/4`}
                >
                  {value}
                </div>
              </li>)
            })}
          </ul>
        </div>
      </CSSTransition>
    </div>
  )
}
export default DropDownList
