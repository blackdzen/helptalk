import React, { SetStateAction } from "react"

interface ICheckbox {
  id: string,
  label: string,
  setStateValue: React.Dispatch<SetStateAction<string>>,
  setStateIsChecked: React.Dispatch<SetStateAction<boolean>>,
  isChecked?: boolean,
  positiveValue: string,
  negativeValue: string
}

export default ICheckbox
