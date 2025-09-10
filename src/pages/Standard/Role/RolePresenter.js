import {useState} from "react";
import { Button, Table, Modal, Form, Input} from 'antd';
import "./role.css";


const RolePresenter = ({onChangeInputHandler ,onChange, CreateRoleHandler,handleAddClick,handleModalClose,isModalOpen}) =>{
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
  
  const onSelectChange = newSelectedRowKeys => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  
  return(
    <>
        <div className="role-content">
            <div className="grid-func">
                <div></div>
                <div className="func-button">
                   <Button onClick={handleAddClick}>추가</Button>
                   <Button type="primary" danger >삭제</Button>                
                </div>
            </div>
            <div className="grid-box">
                  <Table size="small"
                   rowSelection={rowSelection}
                   onChange={onChange}
                   pagination={false}
                   rowClassName="clickable-row"/>
        </div>
     <Modal
        title="부서 추가"
        open={isModalOpen}
        footer={null}   
      >

     <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} onFinish={CreateRoleHandler}>
      <Form.Item label="직급명">   <Input placeholder="직급명을 입력하세요." name="roleId" onChange={onChangeInputHandler} /> </Form.Item>
      
     
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
        </>
    );
}
 

export default RolePresenter;


