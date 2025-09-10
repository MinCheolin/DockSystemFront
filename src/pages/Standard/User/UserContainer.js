import UserPresenter from "./UserPresenter";
import { useState } from "react";
import axios from 'axios';

const UserContainer = () =>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userInfo, setUserInfo] = useState({
    userId: "",
    userPw: "",
    userName: "",
    userPhone: "",
    userWork: "",
    userSalary: "",
    department: "",
    role: "",
  });

  
   const onChangeInputHandler= (e) => {
        const { name, value } = e.target;
        setUserInfo(prev => ({
        ...prev,
        [name]: value,
        }));
    };

  const onChangeSelectHandler = (name, value) => {
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


    const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};


  const CreateUserHandler = async () => {
        const finalData = {
            ...userInfo,
            department: Number(userInfo.department),
            role: Number(userInfo.role),          
        };


       try {
             console.log("폼 데이터 :",finalData);
            const response = await axios.post('http://localhost:8080/api/erp/v1/users', userInfo);
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
        <UserPresenter handleAddClick={handleAddClick} isModalOpen={isModalOpen} handleModalClose={handleModalClose}
                       CreateUserHandler={CreateUserHandler}  onChange={onChange}  onChangeInputHandler={onChangeInputHandler}
                        onChangeSelectHandler={onChangeSelectHandler}
                       />
    );
}

export default UserContainer;


