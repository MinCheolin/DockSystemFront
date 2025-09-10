import { Button, Table, Modal, Form, Input} from 'antd';
import "./role.css";


const RolePresenter = ({roles,HandleChangeInput , HandleCreateRole,HandleCreateModalOpen,HandleModalClose,isModalOpen,HandleUpdateModalClose,
                          HandleUpdateRole,rowSelection, HandleRowClick, hasSelected,HandleDeleteRole, HandleDoubleClick,isUpdateModalOpen,updateRoleInfo,HandleUpdateChangeInput }) =>{
 const columns = [
   {
      title: '번호',
      key: 'index',
      render: (text, record, index) => index + 1, 
    },

  {
    title: '직급명',
    dataIndex: 'roleName',
    key: 'name',
  }
  ];

  return(
    <>
        <div className="role-content">
            <div className="grid-func">
                <div className="role-list">직급 목록</div>
                <div className="func-button">
                   <Button onClick={HandleCreateModalOpen}>추가</Button>
                   <Button type="primary" danger  disabled={!hasSelected} onClick={HandleDeleteRole}>삭제</Button>                
                </div>
            </div>
            <div className="grid-box">
                  <Table size="small"
                   pagination={false}
                   rowClassName="clickable-row"
                   rowSelection={rowSelection}
                   columns={columns} dataSource={roles} 
                   rowKey="roleNo" 
                   onRow={(record) => ({
                       onClick: () => HandleRowClick(record),
                       onDoubleClick: () => { HandleDoubleClick(record);
                       } 
                    })}
                   />     
        </div>
    
     <Modal
        title="직급 추가"
        open={isModalOpen}
        footer={null}   
        onCancel={HandleModalClose} 
      >

     <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} onFinish={HandleCreateRole}>
      <Form.Item label="직급명">   <Input placeholder="직급명을 입력하세요." name="roleName" onChange={HandleChangeInput} /> </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }}> 
        <div className="modal-form-button">      <Button type="primary" htmlType="submit">
        추가
      </Button>
      <Button onClick={HandleModalClose}>
        닫기
      </Button>
      </div>
    </Form.Item>
     </Form>
      </Modal>

    <Modal
        title="직급 수정"
        open={isUpdateModalOpen}
        footer={null}   
        onCancel={HandleUpdateModalClose} 
      >

     <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} onFinish={HandleUpdateRole}>
      <Form.Item label="직급명">   <Input placeholder="직급명을 입력하세요." name="roleName"
       value={updateRoleInfo.roleName}  // 상태 반영
      onChange={HandleUpdateChangeInput}
      //onChange={HandleChangeInput}
       /> </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }}> 
        <div className="modal-form-button">      <Button type="primary" htmlType="submit">
        수정
      </Button>
      <Button onClick={HandleUpdateModalClose}>
        닫기
      </Button>
      </div>
    </Form.Item>
     </Form>
      </Modal>
    




     </div>
        </>
    );
}
 

export default RolePresenter;


