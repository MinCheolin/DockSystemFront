import LoginPresenter from "./LoginPresenter";
import { useState, useEffect } from "react";
import axios from "axios";
import { LOGIN_API } from "../config";
import { useNavigate } from "react-router-dom";

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

  const HandleLogin = async () => {
    try {
      const response = await axios.post(`${LOGIN_API}`, loginInfo);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.userName);
      navigate(`/${selectedTab}`);
    } catch (err) {
      alert("로그인 실패");
    }
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

  return (
    <LoginPresenter
      username={username}
      selectedTab={selectedTab}
      HandleChangeInput={HandleChangeInput}
      HandleLogin={HandleLogin}
      HandleLogout={HandleLogout}
      HandleTabSelect={HandleTabSelect}
    />
  );
};

export default LoginContainer;
