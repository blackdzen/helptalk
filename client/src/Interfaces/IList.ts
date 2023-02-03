import React, { SetStateAction } from "react"

interface IList {
  id: string,
  title: string,
  options: Array<Array<string> | string>,
  defaultValue: string,
  setState: React.Dispatch<SetStateAction<string>>
}

export default IList
