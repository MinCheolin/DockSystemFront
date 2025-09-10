import DepartmentPresenter from "./DepartmentPresenter";
import { useState } from "react";
import axios from 'axios';
const DepartmentContainer  = () =>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [departmentInfo, setdepartmentInfo] = useState({
        departmentName:""
    });

     const onChangeInputHandler= (e) => {
        const { name, value } = e.target;
        setdepartmentInfo(prev => ({
        ...prev,
        [name]: value,
        }));
    };

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };


    const CreateDepartmentHandler = async () => {
       try {
             console.log("폼 데이터 :",departmentInfo);
            const response = await axios.post('http://localhost:8080/api/erp/v1/departments', departmentInfo);
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
        <div>
            <DepartmentPresenter onChangeInputHandler={onChangeInputHandler} onChange={onChange} CreateDepartmentHandler={CreateDepartmentHandler}
                handleAddClick={handleAddClick} handleModalClose={handleModalClose} isModalOpen={isModalOpen}
            />
        </div>
    );
}

export default DepartmentContainer;