import { Button, Table, Modal, Form, Input  } from 'antd';
import "./department.css";


const DepartmentPresenter = ({rowSelection,hasSelected, departments, updateDepartmentInfo, isModalOpen, isUpdateModalOpen,
                       HandleRowClick, HandleDoubleClick,
                       HandleCreateDepartment, HandleUpdateDepartment, HandleDeleteDepartment,
                       HandleChangeInput,HandleUpdateChangeInput, HandleCreateModalOpen,HandleModalClose,HandleUpdateModalClose
   }) =>{
     const [form] = Form.useForm();
     const columns = [
   {
      title: '번호',
      key: 'index',
      render: (text, record, index) => index + 1, 
    },

  {
    title: '부서명',
    dataIndex: 'departmentName',
    key: 'name',
  }
  ];

    return(
        <>
        <div className="department-content">
            <div className="grid-func">
                <div className="department-list">부서 목록</div>
                <div className="func-button">
                   <Button onClick={HandleCreateModalOpen}>추가</Button>
                   <Button type="primary" danger disabled={!hasSelected} onClick={HandleDeleteDepartment}>삭제</Button>                
                </div>
            </div>
            <div className="grid-box">
                  <Table size="small"

                   pagination={false}              
                   rowSelection={rowSelection}
                   columns={columns} dataSource={departments} 
                   rowKey="departmentNo" 
                   onRow={(record) => ({
                       onClick: () => HandleRowClick(record),
                       onDoubleClick: () => { HandleDoubleClick(record);
                       } 
                    })}
                   />
     
        </div>

     <Modal
        title="부서 추가"
        open={isModalOpen}
        footer={null}
        onCancel={HandleModalClose}    
        afterClose={() => form.resetFields()}
      >

      <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} onFinish={HandleCreateDepartment}>
      <Form.Item label="부서명" name="departmentName">   <Input placeholder="부서명을 입력하세요." name="departmentName" onChange={HandleChangeInput} />    </Form.Item>
     
      <Form.Item wrapperCol={{ span: 24 }}> 
          <div className="modal-form-button"> 
      <Button type="primary" htmlType="submit">추가 </Button>
      <Button onClick={HandleModalClose}>      닫기 </Button>    </div>
      </Form.Item>  </Form>    </Modal>
      
      <Modal
        title="부서 수정"
        open={isUpdateModalOpen}
        footer={null}   
        onCancel={HandleUpdateModalClose}  
        afterClose={() => form.resetFields()}
      >

     <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} onFinish={HandleUpdateDepartment}>
      <Form.Item label="부서명">   <Input placeholder="부서명을 입력하세요." name="departmentName"    value={updateDepartmentInfo.departmentName}  
       onChange={HandleUpdateChangeInput}/>  </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }}> 
        <div className="modal-form-button"> 
          <Button type="primary" htmlType="submit"> 수정 </Button>
          <Button onClick={HandleUpdateModalClose}> 닫기 </Button>
      </div>
     </Form.Item></Form></Modal></div>
    
    </>
    );

}
export default DepartmentPresenter;



