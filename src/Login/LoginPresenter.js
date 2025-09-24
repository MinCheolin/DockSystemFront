import "./login.css";
import { Button, Input } from "antd";

const LoginPresenter = ({
  tab1Status,
  tab2Status,
  SelectTab1,
  SelectTab2,
  HandleChangeInput,
  HandleLogin,
}) => {
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-tabs">
          <div
            className={`tab1 ${tab1Status ? "selected" : ""}`}
            onClick={SelectTab1}
          >
            ERP
          </div>
          <div
            className={`tab2 ${tab2Status ? "selected" : ""}`}
            onClick={SelectTab2}
          >
            MES
          </div>
        </div>
        <div className="login-input">
          <Input
            className="input"
            name="userId"
            placeholder="아이디"
            onChange={HandleChangeInput}
          />
          <Input.Password
            className="input"
            name="password"
            placeholder="패스워드"
            onChange={HandleChangeInput}
          />
          <Button type="primary" onClick={HandleLogin}>
            로그인
          </Button>
        </div>
      </div>
      © BUVA 2025 SmartFactory. Crafted with passion and care.
    </div>
  );
};

export default LoginPresenter;
