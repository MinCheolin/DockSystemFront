
import './login.css'; 
import { Button,Input } from 'antd';

const LoginPresenter = ({tab1Status,tab2Status, SelectTab1, SelectTab2}) => {

  return (
       <div className='login-container'>
         <div className='login-box'>
        
          <div className="login-tabs">
            <div className={`tab1 ${tab1Status? "selected" : ""}`} onClick={SelectTab1}>ERP</div>
            <div className={`tab2 ${tab2Status? "selected" : ""}`} onClick={SelectTab2}>MES</div>
          </div>
          <div className="login-input">
     

          <Input className ="input" placeholder="아이디" />
          <Input.Password  className ="input"placeholder="패스워드" />
          <Button type="primary">로그인</Button>
          </div>
           
        </div>
         © BUVA 2025 SmartFactory. Crafted with passion and care.
       </div>
 )

}

export default LoginPresenter;

