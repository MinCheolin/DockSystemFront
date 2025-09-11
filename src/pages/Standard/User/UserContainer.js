import UserPresenter from "./UserPresenter";
import { useState,useEffect } from "react";
import axios from 'axios';

const UserContainer = () =>{
  const [users, setUsers] = useState([]); 
  const [departments,setDepartments] =useState([]);
  const [roles,setRoles] =useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [userInfo, setUserInfo] = useState({
    userId: "",
    userPw: "",
    userName: "",
    userPhone: "",
    userWork: "",
    userSalary: "",
    departmentNo: "",
    roleNo: "",
  });

  const [updateUserInfo, setUpdateUserInfo] = useState({
    userNo:"",
    userId: "",
    userPw: "",
    userName: "",
    userPhone: "",
    userWork: "",
    userSalary: "",
    departmentNo: "",
    roleNo: "",
  });

  const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/erp/v1/users');
        setUsers(response.data);    
      } catch (err) {
        
      } finally {
  
      }
    };

    useEffect(() => {
      fetchData();
    }, []); 

    const rowSelection = {
    selectedRowKeys,
    hideSelectAll: true,
    onChange: (selectedRowKeys) => {
      const lastKey = selectedRowKeys.pop();
      setSelectedRowKeys(lastKey ? [lastKey] : []);
    },
    
  };
  const hasSelected = selectedRowKeys.length > 0;

    const HandleChangeInput= (e) => {
        const { name, value } = e.target;
        setUserInfo(prev => ({
        ...prev,
        [name]: value,
        }));
    };

    const HandleChangeSelect = (name, value) => {
      setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));     
    };


    const HandleUpdateChangeSelect = (name, value) => {
      setUpdateUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
           console.log("HandleUpdateChangeSelect");
           console.log(updateUserInfo);
           
    };

    const HandleUpdateChangeInput = (e) => {
       const { name, value } = e.target;
       setUpdateUserInfo(prev => ({
      ...prev,
       [name]: value
       }));

    };


  const HandleRowClick = (record) => {
    if (selectedRowKeys.includes(record.userNo)) {
      setSelectedRowKeys([]);      
    } else {
      setSelectedRowKeys([record.userNo]); 
    }
  };
 
   const HandleDoubleClick = async (record) => {
    const resDep =   await axios.get('http://localhost:8080/api/erp/v1/departments');
    const resRol =  await axios.get('http://localhost:8080/api/erp/v1/roles');
    setDepartments(resDep.data);
    setRoles(resRol.data);
    setSelectedRowKeys([record.userNo]);
    const matchData = {
            userNo:record.userNo,
            userId:record.userId ,
            userPw: record.userPw,
            userName: record.userName,
            userPhone: record.userPhone,
            userWork: record.userWork,
            userSalary:record.userSalary, 
            departmentNo: Number(record.department.departmentNo),
            roleNo: Number(record.role.roleNo),          
        };
    setUpdateUserInfo({ ...matchData });         
    setIsUpdateModalOpen(true);    
  };


  const HandleCreateUser = async () => {
        const finalData = {
            ...userInfo,
            departmentNo: Number(userInfo.departmentNo),
            roleNo: Number(userInfo.roleNo),          
        };
        
        try {
            const response = await axios.post('http://localhost:8080/api/erp/v1/users', finalData);
            console.log('등록 성공:', response.data);
        } catch (error) {
        console.error('등록 실패:', error);
        }
        setIsModalOpen(false);
        fetchData();      
        }


   const HandleUpdateUser = async () =>{
  
        const finalData = {
            ...updateUserInfo,
            departmentNo: Number(updateUserInfo.departmentNo),
            roleNo: Number(updateUserInfo.roleNo),          
        };
          try {
          await axios.put(`http://localhost:8080/api/erp/v1/users/${finalData.userNo}`,finalData);
        } catch (err) {
           console.error(err);
           alert('수정 실패');
        }
         setIsUpdateModalOpen(false);
         fetchData();       
    
         }
    


   const HandleCreateModalOpen = async() => {
    const resDep =   await axios.get('http://localhost:8080/api/erp/v1/departments');
    const resRol =  await axios.get('http://localhost:8080/api/erp/v1/roles');
    setDepartments(resDep.data);
    setRoles(resRol.data);
    setIsModalOpen(true);
  };

    const HandleModalClose = () => {
    setIsModalOpen(false);
  };

    const HandleUpdateModalClose = () => {
    setIsUpdateModalOpen(false);
  };

  


  return (
        <UserPresenter rowSelection={rowSelection} hasSelected={hasSelected}  users={users} departments={departments} roles={roles} updateUserInfo={updateUserInfo}  
                       isModalOpen={isModalOpen} isUpdateModalOpen={isUpdateModalOpen}
                       HandleRowClick={HandleRowClick} HandleDoubleClick={HandleDoubleClick}
                       HandleCreateUser={HandleCreateUser} HandleUpdateUser={HandleUpdateUser}  //HandleDeleteUser={HandleDeleteUser}
                       HandleChangeInput={HandleChangeInput}  HandleUpdateChangeInput ={HandleUpdateChangeInput} HandleChangeSelect={HandleChangeSelect} HandleUpdateChangeSelect={HandleUpdateChangeSelect}
                       HandleCreateModalOpen={HandleCreateModalOpen}  HandleModalClose={HandleModalClose}    HandleUpdateModalClose={HandleUpdateModalClose}/>
  );
}

export default UserContainer;


