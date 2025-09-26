import UserPresenter from "./UserPresenter";
import { useState, useEffect } from "react";
import { ERP_API } from "../../../config";
import { ERPapi } from "../../../components/api/api";

const UserContainer = () => {
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [updateUserInfo, setUpdateUserInfo] = useState({});

  const fetchData = async () => {
    try {
      const response = await ERPapi.get(`${ERP_API}/users`);
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

  const HandleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
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
  };

  const HandleUpdateChangeInput = (e) => {
    const { name, value } = e.target;
    setUpdateUserInfo((prev) => ({
      ...prev,
      [name]: value,
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
    const resDep = await ERPapi.get(`${ERP_API}/departments`);
    const resRol = await ERPapi.get(`${ERP_API}/roles`);
    setDepartments(resDep.data);
    setRoles(resRol.data);
    setSelectedRowKeys([record.userNo]);
    const matchData = {
      userNo: record.userNo,
      userId: record.userId,
      userPw: record.userPw,
      userName: record.userName,
      userPhone: record.userPhone,
      userWork: record.userWork,
      userSalary: record.userSalary,
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
      await ERPapi.post(`${ERP_API}/users`, finalData);
    } catch (err) {
      alert("등록 실패");
    }

    setIsModalOpen(false);
    fetchData();
  };

  const HandleUpdateUser = async () => {
    const finalData = {
      ...updateUserInfo,
      departmentNo: Number(updateUserInfo.departmentNo),
      roleNo: Number(updateUserInfo.roleNo),
    };
    try {
      await ERPapi.put(`${ERP_API}/${finalData.userNo}`, finalData);
    } catch (err) {
      console.error("등록 실패 : ", err);
    }
    setIsUpdateModalOpen(false);
    fetchData();
  };

  const HandleCreateModalOpen = async () => {
    try {
      const resDep = await ERPapi.get(`${ERP_API}/departments`);
      const resRol = await ERPapi.get(`${ERP_API}/roles`);
      setDepartments(resDep.data);
      setRoles(resRol.data);
      setIsModalOpen(true);
    } catch (err) {
      console.error("조회 실패 : ", err);
    }
  };

  const HandleDeleteUser = async () => {
    if (selectedRowKeys.length === 0) return;
    try {
      await ERPapi.delete(`${ERP_API}/users/${selectedRowKeys[0]}`);
      setSelectedRowKeys([]);
    } catch (err) {
      console.error("삭제 실패 : ", err);
    }
    fetchData();
  };

  const HandleModalClose = () => {
    setIsModalOpen(false);
  };

  const HandleUpdateModalClose = () => {
    setIsUpdateModalOpen(false);
  };

  return (
    <UserPresenter
      rowSelection={rowSelection}
      hasSelected={hasSelected}
      users={users}
      departments={departments}
      roles={roles}
      updateUserInfo={updateUserInfo}
      isModalOpen={isModalOpen}
      isUpdateModalOpen={isUpdateModalOpen}
      HandleRowClick={HandleRowClick}
      HandleDoubleClick={HandleDoubleClick}
      HandleCreateUser={HandleCreateUser}
      HandleUpdateUser={HandleUpdateUser}
      HandleDeleteUser={HandleDeleteUser}
      HandleChangeInput={HandleChangeInput}
      HandleUpdateChangeInput={HandleUpdateChangeInput}
      HandleChangeSelect={HandleChangeSelect}
      HandleUpdateChangeSelect={HandleUpdateChangeSelect}
      HandleCreateModalOpen={HandleCreateModalOpen}
      HandleModalClose={HandleModalClose}
      HandleUpdateModalClose={HandleUpdateModalClose}
    />
  );
};

export default UserContainer;
