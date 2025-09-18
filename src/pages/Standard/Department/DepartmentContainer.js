import DepartmentPresenter from "./DepartmentPresenter";
import { useState, useEffect } from "react";
import axios from "axios";
const DepartmentContainer = () => {
  const API_URL = "http://localhost:8080/api/erp/v1";
  const [departments, setDepartments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [departmentInfo, setDepartmentInfo] = useState({});
  const [updateDepartmentInfo, setUpdateDepartmentInfo] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/departments`);
      setDepartments(response.data);
    } catch (err) {
      alert(`조회 실패 ${err}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const HandleRowClick = (record) => {
    if (selectedRowKeys.includes(record.departmentNo)) {
      setSelectedRowKeys([]);
    } else {
      setSelectedRowKeys([record.departmentNo]);
    }
  };

  const HandleDoubleClick = (record) => {
    setSelectedRowKeys([record.departMentNo]);
    setUpdateDepartmentInfo({ ...record });
    setIsUpdateModalOpen(true);
  };

  const rowSelection = {
    selectedRowKeys,
    hideSelectAll: true,
    onChange: (selectedRowKeys) => {
      const lastKey = selectedRowKeys.pop();
      setSelectedRowKeys(lastKey ? [lastKey] : []);
    },
  };
  const hasSelected = selectedRowKeys.length > 0;

  const HandleChangeInput = (e) => {
    const { name, value } = e.target;
    setDepartmentInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const HandleUpdateChangeInput = (e) => {
    const { name, value } = e.target;
    setUpdateDepartmentInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const HandleCreateDepartment = async () => {
    console.log(departmentInfo.departmentName);
    try {
      await axios.post(`${API_URL}/departments`, departmentInfo);
    } catch (err) {
      alert(`등록 실패 ${err}`);
    }
    setIsModalOpen(false);
    fetchData();
  };

  const HandleUpdateDepartment = async () => {
    const finalData = {
      ...updateDepartmentInfo,
      roleNo: Number(updateDepartmentInfo.departmentNo),
    };
    try {
      await axios.put(
        `${API_URL}/departments/${finalData.departmentNo}`,
        finalData
      );
    } catch (err) {
      alert(`수정 실패 ${err}`);
    }
    setIsUpdateModalOpen(false);
    fetchData();
  };

  const HandleDeleteDepartment = async () => {
    if (selectedRowKeys.length === 0) return;
    console.log(selectedRowKeys[0]);
    try {
      await axios.delete(`${API_URL}/departments/${selectedRowKeys[0]}`);
      setDepartments((prev) =>
        prev.filter((item) => item.departmentNo !== selectedRowKeys[0])
      );
      setSelectedRowKeys([]);
    } catch (err) {
      console.error(err);
      alert("삭제 실패");
    }
    fetchData();
  };
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
    <div>
      <DepartmentPresenter
        rowSelection={rowSelection}
        hasSelected={hasSelected}
        departments={departments}
        updateDepartmentInfo={updateDepartmentInfo}
        isModalOpen={isModalOpen}
        isUpdateModalOpen={isUpdateModalOpen}
        HandleRowClick={HandleRowClick}
        HandleDoubleClick={HandleDoubleClick}
        HandleCreateDepartment={HandleCreateDepartment}
        HandleUpdateDepartment={HandleUpdateDepartment}
        HandleDeleteDepartment={HandleDeleteDepartment}
        HandleChangeInput={HandleChangeInput}
        HandleUpdateChangeInput={HandleUpdateChangeInput}
        HandleCreateModalOpen={HandleCreateModalOpen}
        HandleModalClose={HandleModalClose}
        HandleUpdateModalClose={HandleUpdateModalClose}
      />
    </div>
  );
};

export default DepartmentContainer;
