import React from "react";
import ICheckbox from "../Interfaces/ICheckbox";

function Checkbox({ id, label, setStateValue, setStateIsChecked, isChecked, positiveValue, negativeValue }: ICheckbox) {

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setStateValue(positiveValue)
      setStateIsChecked(true)
    } else {
      setStateValue(negativeValue)
      setStateIsChecked(false)
    }
  }

  return (
    <div>
      <span className="inline-block relative">
        <p className="absolute bottom-[5px] left-[80px] w-[300px]">{label}</p>
        <input
          type='checkbox'
          id={id}
          onChange={onChange}
          checked={isChecked}
          className='hidden peer'
        />
        <label
          htmlFor={id}
          className='
          font-JetBrains
          block
          w-16
          h-8
          p-1
          border-2
          border-grey
          rounded-2xl
          bg-[#clcld4]
          cursor-pointer
          duration-300
          after:block
          after:w-6
          after:h-5
          after:rounded-xl
          after:bg-[#ffffff]
          after:duration-300
          after:border-2
          after:border-grey
          peer-checked:bg-blue
          peer-checked:after:translate-x-[28px]
          '
        > </label>
      </span>
    </div>
  )
}

export default Checkbox
