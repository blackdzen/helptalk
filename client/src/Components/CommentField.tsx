import React from "react";
import ICommentField from "../Interfaces/ICommentField";

function CommentField({
  id,
  placeholder,
  title,
  value,
  setValue,
  isFocus,
  height,
}: ICommentField) {
  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setValue(event.target.value);

  const onFocus = () => {
    if (isFocus) {
      isFocus(true);
    }
  };

  const onBlur = () => {
    if (isFocus) {
      isFocus(false);
    }
  };

  return (
    <div className="relative cursor-pointer">
      <p className="pb-3 pl-3 font-JetBrains">{title}</p>
      <textarea
        className={`
        duration-300
        focus:placeholder:opacity-30
        shadow-xl
        rounded-md
        outline-none
        w-full
        p-4
        border-2
        border-grey
        focus:border-blue
        font-JetBrains
        ${height ? height : "h-[100px]"}
        resize-none
        `}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      ></textarea>
    </div>
  );
}

export default CommentField;
