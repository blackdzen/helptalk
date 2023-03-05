import React, { useEffect, useState } from "react";
import Option from "./Option";
import IRadioGroup from "../Interfaces/IRadioGroup";

function RadioGroup({ options, onChange, value, labelText }: IRadioGroup) {
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(value);
  function onSelect(index: number) {
    setSelectedIndex(index);
    onChange && onChange(options[index]);
  }

  useEffect(() => setSelectedIndex(undefined), [labelText]);

  return (
    <div>
      {labelText && (
        <label className="font-JetBrains block mb-3 pl-2">{labelText}</label>
      )}
      <div className="flex justify-evenly">
        {options.map((el, index) => (
          <Option
            key={index}
            index={index}
            selectedIndex={selectedIndex}
            onSelect={(index) => onSelect(index)}
          >
            {el}
          </Option>
        ))}
      </div>
    </div>
  );
}

export default RadioGroup;
