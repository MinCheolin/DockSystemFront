import { Button, Input } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import "./login.css";
const LoginPresenter = ({
  username,
  selectedTab,
  HandleChangeInput,
  HandleLogin,
  HandleLogout,
  HandleTabSelect,
}) => {
  if (username) {
    return (
      <div>
        <div className="login-container">
          <div className="userinfo-area">
            <div className="main-area">
              <div className="username-area">
                👋 안녕하세요, {username}님 👋
              </div>
              <div className="move-button">
                <Button
                  className="move-erp"
                  size="large"
                  icon={<ExportOutlined />}
                >
                  ERP로 이동
                </Button>
                <Button
                  className="move-mes"
                  size="large"
                  icon={<ExportOutlined />}
                >
                  MES로 이동
                </Button>
              </div>
            </div>
            <div className="logout-area">
              <Button className="btn-logout" onClick={HandleLogout}>
                로그아웃
              </Button>
            </div>

            <div> </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-tabs">
          <div
            className={`select-tab ${selectedTab === "erp" ? "erp" : ""}`}
            onClick={() => HandleTabSelect("erp")}
          >
            ERP
          </div>
          <div
            className={`select-tab  ${selectedTab === "mes" ? "mes" : ""}`}
            onClick={() => HandleTabSelect("mes")}
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
