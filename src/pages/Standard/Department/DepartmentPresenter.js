import { Button, Table, Modal, Form, Input,Select} from 'antd';
import "./department.css";


const DepartmentPresenter = ({onChangeInputHandler ,onChange, CreateDepartmentHandler,handleAddClick,handleModalClose,isModalOpen}) =>{
    return(
        <>
        <div className="department-content">
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
        title="부서 추가"
        open={isModalOpen}
        footer={null}   
      >

     <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} onFinish={CreateDepartmentHandler}>
      <Form.Item label="부서명">   <Input placeholder="부서명을 입력하세요." name="departmentId" onChange={onChangeInputHandler} />    </Form.Item>
      
     
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
export default DepartmentPresenter;



