import { useState } from "react";
import LayoutMESPresent from "./LayoutMESPresenter";
import { useNavigate } from "react-router-dom";

const LayoutMESContainer = () => {
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
      <LayoutMESPresent
        collapsed={collapsed}
        loginUser={loginUser}
        setCollapsed={setCollapsed}
        navigate={navigate}
        HandleLogout={HandleLogout}
      />
    </div>
  );
};

export default LayoutMESContainer;
