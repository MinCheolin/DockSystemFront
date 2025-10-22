import LoginPresenter from "./LoginPresenter";
import { useState, useEffect } from "react";
import axios from "axios";
import { LOGIN_API } from "../config";
import { useNavigate } from "react-router-dom";
import { LOGINapi } from "../components/api/api";

const LoginContainer = () => {
  const [selectedTab, setSelectedTab] = useState("erp");
  const [loginInfo, setLoginInfo] = useState({});
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const HandleChangeInput = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const HandleLogin = async () => {
  //   try {
  //     const response = await LOGINapi.post(`${LOGIN_API}`, loginInfo);
  //     localStorage.setItem("token", response.data.token);
  //     localStorage.setItem("username", response.data.userName);
  //     navigate(`/${selectedTab}`);
  //   } catch (err) {
  //     alert("로그인 실패");
  //   }
  // };

  const HandleLogin = () => {
    navigate(`/${selectedTab}`);
  };

  const HandleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    window.location.reload();
  };

  const HandleTabSelect = (value) => {
    if (value === selectedTab) {
    } else setSelectedTab(value);
  };

  const HandleMoveSystemHome = (value) => {
    navigate(`/${value}`);
  };

  return (
    <LoginPresenter
      username={username}
      selectedTab={selectedTab}
      HandleChangeInput={HandleChangeInput}
      HandleLogin={HandleLogin}
      HandleLogout={HandleLogout}
      HandleTabSelect={HandleTabSelect}
      HandleMoveSystemHome={HandleMoveSystemHome}
    />
  );
};

export default LoginContainer;
