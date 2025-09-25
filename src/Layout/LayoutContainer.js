import { useState } from "react";
import LayoutPresent from "./LayoutPresent";
import { useNavigate } from "react-router-dom";

const LayoutContainer = () => {
  const [collapsed, setCollapsed] = useState(false);
  const loginUser = localStorage.getItem("username");
  const navigate = useNavigate();
  const HandleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <LayoutPresent
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        navigate={navigate}
        loginUser={loginUser}
        HandleLogout={HandleLogout}
      />
    </div>
  );
};

export default LayoutContainer;
