import "./user.css";
import { Button, Table, Modal, Form, Input,Select} from 'antd';

const UserPresenter = ({onChange,handleAddClick,isModalOpen,handleModalClose,CreateUserHandler,onChangeInputHandler,onChangeSelectHandler}) =>{
  const departmentOptions = [
  { value: 1, label: "개발팀" },
  { value: 2, label: "마케팅팀" },
];

const roleOptions = [
  { value: 1, label: "과장" },
  { value: 2, label: "사원"},
];


    return (
        <div className="user-content">
            <div className="grid-func">
                <div></div>
                <div className="func-button">
                   <Button onClick={handleAddClick}>추가</Button>
                   <Button type="primary" danger >삭제</Button>                
                </div>
            </div>
            <div className="grid-box">
                  <Table size="small"
                   onChange={onChange}
                   pagination={false}
                   rowClassName="clickable-row"/>
        </div>

     <Modal
        title="사용자 추가"
        open={isModalOpen}
        footer={null}   
      >

     <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} onFinish={CreateUserHandler}>
      <Form.Item label="아이디">   <Input placeholder="아이디를 입력하세요." name="userId" onChange={onChangeInputHandler} />      </Form.Item>
      <Form.Item label="비밀번호">  <Input type="password"placeholder="비밀번호를 입력하세요." name="userPw" onChange={onChangeInputHandler} />      </Form.Item>
      <Form.Item label="이름">     <Input placeholder="이름을 입력하세요." name="userName" onChange={onChangeInputHandler}/>  </Form.Item>
      <Form.Item label="전화번호">  <Input placeholder="전화번호를 입력하세요."name="userPhone" onChange={onChangeInputHandler}/>      </Form.Item>
      <Form.Item label="업무">     <Input placeholder="업무를 입력하세요." name="userWork" onChange={onChangeInputHandler}/>      </Form.Item>
      <Form.Item label="급여">     <Input placeholder="급여를 입력하세요."  name="userSalary"onChange={onChangeInputHandler}/>      </Form.Item> 
      <Form.Item label="부서">     <Select placeholder="부서를 선택하세요."  options={departmentOptions} onChange={ (value) => onChangeSelectHandler('department', value)}/> </Form.Item>
      <Form.Item label="직급">     <Select placeholder="직급을 선택하세요."  options={roleOptions} onChange={(value) => onChangeSelectHandler('role', value)}/> </Form.Item>     
     
      <Form.Item> 
      <Button type="primary" htmlType="submit">
        추가
      </Button>
      <Button style={{ marginLeft: 8 }} onClick={handleModalClose}>
        닫기
      </Button>
    </Form.Item>
     
     </Form>
      
      </Modal>
        </div>
    );

}

export default UserPresenter;
