import RolePresenter from "./RolePresenter";
import { useState } from "react";
import axios from 'axios';

const RoleContainer = () =>{
     const [isModalOpen, setIsModalOpen] = useState(false);
    const [roleInfo, setRoleInfo] = useState({
        roleName:""
    });

     const onChangeInputHandler= (e) => {
        const { name, value } = e.target;
        setRoleInfo(prev => ({
        ...prev,
        [name]: value,
        }));
    };

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };


    const CreateRoleHandler = async () => {
       try {
             console.log("폼 데이터 :",roleInfo);
            const response = await axios.post('http://localhost:8080/api/erp/v1/roles', roleInfo);
            console.log('등록 성공:', response.data);
        } catch (error) {
        console.error('등록 실패:', error);
        }
    setIsModalOpen(false);
  }

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
    return (
        <RolePresenter onChangeInputHandler={onChangeInputHandler} onChange={onChange} CreateRoleHandler={CreateRoleHandler}
                handleAddClick={handleAddClick} handleModalClose={handleModalClose} isModalOpen={isModalOpen}/>
    );
}

export default RoleContainer;