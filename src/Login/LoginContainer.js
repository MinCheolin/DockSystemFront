import LoginPresenter from "./LoginPresenter";
import { useState } from "react";

const LoginContainer = () => {
  const [tab1Status, setTab1Status] = useState(true);
  const [tab2Status, setTab2Status] = useState(false);
  const [loginInfo, setLoginInfo] = useState({});

  const SelectTab1 = () => {
    if (tab1Status === false) {
      setTab1Status(true);
      setTab2Status(false);
    }
  };

  const SelectTab2 = () => {
    if (tab2Status === false) {
      setTab2Status(true);
      setTab1Status(false);
    }
  };

  const HandleChangeInput = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const HandleLogin = () => {
    console.log(loginInfo);
  };

  return (
    <LoginPresenter
      tab1Status={tab1Status}
      tab2Status={tab2Status}
      SelectTab1={SelectTab1}
      SelectTab2={SelectTab2}
      HandleChangeInput={HandleChangeInput}
      HandleLogin={HandleLogin}
    />
  );
};

export default LoginContainer;
