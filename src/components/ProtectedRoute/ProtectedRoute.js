import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Result } from "antd";
import { jwtDecode } from "jwt-decode"; //npm install jwt-decode
import "./protectedRoute.css";

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      return true;
    }
    return false;
  } catch (e) {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    return true;
  }
};

const ProtectedRoute = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [render, setRender] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || isTokenExpired(token)) {
      setShowModal(true);
      setRender(false);
    } else {
      setRender(true);
    }
  }, []);

  const HandleModalClose = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <>
      {render && children}
      <Modal open={showModal} closable={false} footer={null}>
        <Result
          status="warning"
          title="로그인이 필요합니다!"
          extra={
            <Button type="primary" onClick={HandleModalClose}>
              로그인 페이지로 이동
            </Button>
          }
        />
      </Modal>
    </>
  );
};

export default ProtectedRoute;
