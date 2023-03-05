import React, { useRef, useState } from "react";
import ILogin from "../Interfaces/ILogin";
import { IoIosKey, IoIosContact } from "react-icons/io";
import Button from "../Components/Button";
import { CSSTransition } from "react-transition-group";

function Login({ isLoginOpen, server, setIsLoginOpen, setIsFormOpen }: ILogin) {
  //These are states keep the user input in the login input fields username and password.
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //This is a state to controls the visibility of error message if authorization failed.
  const [isAuthErrOpen, setIsAuthErrOpen] = useState<boolean>(false);

  //Node references for CSSTransition components
  const loginRef = useRef(null);
  const authErrRef = useRef(null);

  const usernameOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(event.target.value);
  const passwordOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  //The function sends username and password after user pressed the login button and gets json web token or null.
  const onClickLoginButton = async () => {
    const response = await server.login(username.trim(), password.trim());
    if (response) {
      localStorage.setItem("helpTalkAuthData", JSON.stringify(response));
      setUsername("");
      setPassword("");
      setIsAuthErrOpen(false);
      setIsLoginOpen(false);
      setIsFormOpen(true);
    } else {
      if (isAuthErrOpen) {
        setIsAuthErrOpen(false);
        setTimeout(() => {
          setIsAuthErrOpen(true);
        }, 300);
      } else {
        setIsAuthErrOpen(true);
      }
    }
  };

  // The function checks  keyup events in login inputs.
  const enterKeyHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") return onClickLoginButton();
  };

  return (
    <CSSTransition
      nodeRef={loginRef}
      in={isLoginOpen}
      timeout={300}
      unmountOnExit
      classNames="component-transition"
    >
      <div
        ref={loginRef}
        className="wraper h-screen w-full flex justify-center items-center  bg-cover font-JetBrains"
      >
        <div className=" py-8 px-4 shadow-2xl bg-rich-black/20 w-[350px] rounded-md border border-grey flex flex-col gap-8">
          <div>
            <div className="text-3xl  text-rich-black flex flex-col gap-3 justify-center relative">
              <div className="text-center mb-5">Login</div>
              <CSSTransition
                nodeRef={authErrRef}
                in={isAuthErrOpen}
                timeout={300}
                unmountOnExit
                classNames="component-transition"
              >
                <div
                  ref={authErrRef}
                  className="text-dark-orchid text-sm text-center absolute top-12 left-8"
                >
                  Invalid username or password
                </div>
              </CSSTransition>
            </div>
          </div>
          <div className="relative shadow-2xl">
            <input
              placeholder="Имя пользователя..."
              className=" w-full pl-11 bg-white text-rich-black text-lg h-12 border-2 border-white focus:border-dark-orchid hover:border-dark-orchid rounded-md duration-300 cursor-pointer outline-none"
              required={true}
              value={username}
              onChange={usernameOnChange}
              autoFocus={true}
              onKeyUp={enterKeyHandler}
            />
            <IoIosContact className="absolute top-[11px] left-2" size={25} />
          </div>
          <div className="relative shadow-2xl ">
            <input
              type="password"
              placeholder="Пароль..."
              className=" w-full pl-11 bg-white text-rich-black text-lg h-12 border-2 border-white focus:border-dark-orchid hover:border-dark-orchid rounded-md duration-300 cursor-pointer outline-none"
              required={true}
              value={password}
              onChange={passwordOnChange}
              onKeyUp={enterKeyHandler}
            />
            <IoIosKey className="absolute top-[11px] left-2" size={25} />
          </div>
          <div className="flex justify-center">
            <Button
              id={"login-btn"}
              label={"Sign in"}
              onClick={onClickLoginButton}
              bgColor="bg-rich-black"
              borderColor="border-rich-black"
              textColor="text-white"
              hoverBorderColor="hover:border-dark-orchid"
              hoverTextColor="hover:text-dark-orchid"
              hoverBgColor="hover:bg-rich-black/90"
              focusBorderColor="focus:border-dark-orchid"
              focusTextColor="focus:text-dark-orchid"
              focusBgColor="focus:bg-rich-black/90"
            />
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}
export default Login;
