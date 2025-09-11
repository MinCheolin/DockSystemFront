import "./user.css";
import { Button, Table, Modal, Form, Input,Select} from 'antd';

const UserPresenter = ({rowSelection, hasSelected, users,departments, roles,updateUserInfo,  
                       isModalOpen, isUpdateModalOpen,
                       HandleRowClick, HandleDoubleClick,
                       HandleCreateUser, HandleUpdateUser,//HandleDeleteUser,
                       HandleChangeInput,HandleUpdateChangeInput, HandleChangeSelect,HandleUpdateChangeSelect,
                       HandleCreateModalOpen,HandleModalClose,HandleUpdateModalClose
    }) =>{
  const [form] = Form.useForm();
  const columns = [
   {
      title: '번호',
      key: 'index',
      render: (text, record, index) => index + 1, 
    },
    {
      title: '아이디',
      dataIndex: 'userId',
      key: 'id',
    },
  {
    title: '이름',
    dataIndex: 'userName',
    key: 'name',
  },
  {
    title: '전화번호',
    dataIndex: 'userPhone',
    key: 'phone',
  },
  {
    title: '업무',
    dataIndex: 'userWork',
    key: 'work',
  },
  {
    title: '부서',
    dataIndex: ['department',"departmentName"],
    key: 'department',
  },
  {
    title: '직급',
    dataIndex: ['role','roleName'],
    key: 'role',
  }
  ];
    return (
        <div className="user-content">
            <div className="grid-func">
                <div className="user-list">유저 목록</div>
                <div className="func-button">
                   <Button onClick={HandleCreateModalOpen}>추가</Button>
                   <Button type="primary" danger disabled={!hasSelected} >삭제</Button>                
                </div>
            </div>
            <div className="grid-box">
                  <Table size="small"
                   pagination={false}
                   rowSelection={rowSelection}
                   columns={columns} dataSource={users} 
                   rowKey="userNo" 
                   onRow={(record) => ({
                       onClick: () => HandleRowClick(record),
                       onDoubleClick: () => { HandleDoubleClick(record);
                       } 
                    })}
                   />
        </div>

     <Modal
        title="사용자 추가"
        open={isModalOpen}
        footer={null}   
        onCancel={HandleModalClose}
        afterClose={() => form.resetFields()}
      >
      <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} onFinish={HandleCreateUser}>
      <Form.Item label="아이디"   name="userId">    <Input placeholder="아이디를 입력하세요." name="userId" onChange={HandleChangeInput} />      </Form.Item>
      <Form.Item label="비밀번호" name="userPw">     <Input type="password"placeholder="비밀번호를 입력하세요." name="userPw" onChange={HandleChangeInput} />      </Form.Item>
      <Form.Item label="이름 " name="userName">     <Input placeholder="이름을 입력하세요." name="userName" onChange={HandleChangeInput}/>  </Form.Item>
      <Form.Item label="전화번호" name="userPhone">  <Input placeholder="전화번호를 입력하세요."name="userPhone" onChange={HandleChangeInput}/>      </Form.Item>
      <Form.Item label="업무" name="userWork">      <Input placeholder="업무를 입력하세요." name="userWork" onChange={HandleChangeInput}/>      </Form.Item>
      <Form.Item label="급여" name="userSalary">    <Input placeholder="급여를 입력하세요."  name="userSalary"onChange={HandleChangeInput}/>      </Form.Item> 
      <Form.Item label="부서" name="department">    
         <Select placeholder="부서를 선택하세요." 
         options={departments.map((dept) => ({ value : dept.departmentNo, label : dept.departmentName}))} 
          onChange={(value) => HandleChangeSelect('departmentNo', value)}/>
           </Form.Item>
      <Form.Item label="직급" name="role">     
        <Select placeholder="직급을 선택하세요."  options={roles.map((role) => ({ value : role.roleNo, label : role.roleName}))}  onChange={(value) => HandleChangeSelect('roleNo', value)}/> </Form.Item>     
     
      <Form.Item wrapperCol={{ span: 24 }}> 
          <div className="modal-form-button"> 
      <Button type="primary" htmlType="submit">
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
        title="사용자 정보 수정"
        open={isUpdateModalOpen}
        footer={null}   
        onCancel={HandleUpdateModalClose}
      >
      <Form 
     
      form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} onFinish={HandleUpdateUser}>
      <Form.Item label="아이디"   >    <Input placeholder="아이디를 입력하세요." name="userId" onChange={HandleUpdateChangeInput}  value={updateUserInfo.userId} disabled={true}  />      </Form.Item>
      <Form.Item label="비밀번호" n>     <Input type="password" placeholder="---" name="userPw" onChange={HandleUpdateChangeInput} disabled={true}  />      </Form.Item>
      <Form.Item label="이름 ">     <Input placeholder="이름을 입력하세요." name="userName" onChange={HandleUpdateChangeInput} value={updateUserInfo.userName}/>  </Form.Item>
      <Form.Item label="전화번호" >  <Input placeholder="전화번호를 입력하세요."name="userPhone" onChange={HandleUpdateChangeInput} value={updateUserInfo.userPhone}/>      </Form.Item>
      <Form.Item label="업무" >      <Input placeholder="업무를 입력하세요." name="userWork" onChange={HandleUpdateChangeInput}value={updateUserInfo.userWork}/>      </Form.Item>
      <Form.Item label="급여" >    <Input placeholder="급여를 입력하세요."  name="userSalary"onChange={HandleUpdateChangeInput}value={updateUserInfo.userSalary}/>      </Form.Item> 
 
      <Form.Item label="부서" >    
         <Select placeholder="부서를 선택하세요." 
          value={updateUserInfo.departmentNo }
          options={departments.map((dept) => ({ value : dept.departmentNo, label : dept.departmentName}))} 
          onChange={(value) => HandleUpdateChangeSelect('departmentNo', value)          } />
           </Form.Item>

      <Form.Item label="직급" >     
        <Select placeholder="직급을 선택하세요."  
        value={updateUserInfo.roleNo}
        options={roles.map((role) => ({ value : role.roleNo, label : role.roleName}))}  
        onChange={(value) => HandleUpdateChangeSelect('roleNo', value)}  
        /> </Form.Item>     
      

      <Form.Item wrapperCol={{ span: 24 }}> 
          <div className="modal-form-button"> 
           
      <Button type="primary" htmlType="submit">
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
    );

}

export default UserPresenter;


// <Select placeholder="부서를 선택하세요."           options={departments.departmentName}          onChange={ (value) => HandleChangeSelect('department', value)}/> 
       