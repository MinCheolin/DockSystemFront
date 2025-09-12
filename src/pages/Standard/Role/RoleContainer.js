import RolePresenter from "./RolePresenter";
import { useState,useEffect } from "react";
import axios from 'axios';

const RoleContainer = () =>{
  const [roles, setRoles] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [roleInfo, setRoleInfo] = useState({
        roleName:""
    });
  const [updateRoleInfo,setUpdateRoleInfo] = useState({
    roleNo:"",    
    roleName:""
  });
  
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/erp/v1/roles');
        setRoles(response.data);    
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
        setRoleInfo(prev => ({
        ...prev,
        [name]: value,
        }));
    };
  
  const HandleUpdateChangeInput = (e) => {
      const { name, value } = e.target;
      setUpdateRoleInfo(prev => ({
       ...prev,
      [name]: value
    }));
};

  const HandleRowClick = (record) => {
    if (selectedRowKeys.includes(record.roleNo)) {
      setSelectedRowKeys([]);      
    } else {
      setSelectedRowKeys([record.roleNo]); 
    }
  };

 const HandleDoubleClick = (record) => {
    setSelectedRowKeys([record.roleNo]);
    setUpdateRoleInfo({ ...record });             
    setIsUpdateModalOpen(true);    
  };

  const HandleCreateRole = async () => {
       try {
          const response = await axios.post('http://localhost:8080/api/erp/v1/roles', roleInfo);
          console.log('등록 성공:', response.data);
        } catch (error) {
        console.error('등록 실패:', error);
        }
    setIsModalOpen(false);
    fetchData();
  }

  const HandleUpdateRole = async () =>{
        const finalData = {
            ...updateRoleInfo,
            roleNo: Number(updateRoleInfo.roleNo),        
        };
       try {
          await axios.put(`http://localhost:8080/api/erp/v1/roles/${finalData.roleNo}`,finalData);
        } catch (err) {
           console.error(err);
           alert('수정 실패');
        }
        setIsUpdateModalOpen(false);
         fetchData();
  }

  const HandleDeleteRole = async () =>{
    if (selectedRowKeys.length === 0) return;  
    console.log(selectedRowKeys[0]);
   try {
    await axios.delete(`http://localhost:8080/api/erp/v1/roles/${selectedRowKeys[0]}`);
    setRoles(prev => prev.filter(item => item.roleNo !== selectedRowKeys[0]));
    setSelectedRowKeys([]);
  } catch (err) {
    console.error(err);
    alert('삭제 실패');
  }
       fetchData();
  }

  const HandleCreateModalOpen = () => {
    setIsModalOpen(true);
  };

  const HandleModalClose = () => {
    setIsModalOpen(false);
  };

    const HandleUpdateModalClose = () => {
    setIsUpdateModalOpen(false);
  };

  return (
        <RolePresenter rowSelection={rowSelection} hasSelected={hasSelected}  roles={roles} updateRoleInfo={updateRoleInfo}  
                       isModalOpen={isModalOpen} isUpdateModalOpen={isUpdateModalOpen}
                       HandleRowClick={HandleRowClick} HandleDoubleClick={HandleDoubleClick}
                       HandleCreateRole={HandleCreateRole} HandleUpdateRole={HandleUpdateRole}  HandleDeleteRole={HandleDeleteRole}
                       HandleChangeInput={HandleChangeInput}  HandleUpdateChangeInput ={HandleUpdateChangeInput}
                       HandleCreateModalOpen={HandleCreateModalOpen}  HandleModalClose={HandleModalClose}    HandleUpdateModalClose={HandleUpdateModalClose}
               />
              );  
}

export default RoleContainer;