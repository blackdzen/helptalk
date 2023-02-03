import React from "react";
import ILogin from "../Interfaces/ILogin";
import axios from "axios";
import { IoIosKey, IoIosContact } from "react-icons/io";
import Button from "./Button";

function Login({ setIsFormOpen }: ILogin) {

  const onClickLoginButton = () => {

  }
  return (
    <div className="wraper h-screen w-full flex justify-center items-center  bg-cover font-JetBrains">
      <div className=" py-8 px-4 shadow-2xl bg-rich-black/20 w-[350px] rounded-md border border-grey flex flex-col gap-8">
        <div>
          <div className="text-3xl  text-rich-black flex justify-center">Login</div>
        </div>
        <div className="relative shadow-2xl">
          <input
            placeholder="Имя пользователя..."
            className=" w-full pl-11 bg-corn text-rich-black text-lg h-12 border-2 border-corn hover:border-dark-orchid rounded-md duration-300 cursor-pointer outline-none"
            required={true}
          />
          <IoIosContact
            className="absolute top-[11px] left-2"
            size={25}
          />
        </div>
        <div className="relative shadow-2xl ">
          <input
            type='password'
            placeholder="Пароль..."
            required={true}
            className=" w-full pl-11 bg-corn text-rich-black text-lg h-12 border-2 border-corn hover:border-dark-orchid rounded-md duration-300 cursor-pointer outline-none"
          />
          <IoIosKey
            className="absolute top-[11px] left-2"
            size={25}
          />
        </div>
        <div className="flex justify-center">
          <Button
            id={'login-btn'}
            label={'Sign in'}
            onClick={onClickLoginButton}
            bgColor='bg-rich-black'
            borderColor="border-rich-black"
            textColor="text-white"
            hoverBorderColor="hover:border-dark-orchid"
            hoverTextColor="hover:text-dark-orchid"
            hoverBgColor="hover:bg-rich-black/90"
          />
        </div>
      </div>
    </div>
  )
}
export default Login
