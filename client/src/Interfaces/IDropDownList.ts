import React, { SetStateAction } from "react"

interface IDropDownList {
  options: Array<string | Array<string>>,
  setState: React.Dispatch<SetStateAction<string>>,
  defaultValue: string,
  label: string,
  isFocus?: React.Dispatch<SetStateAction<boolean>>

}

export default IDropDownList
