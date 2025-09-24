import RolePresenter from "./RolePresenter";
import { useState, useEffect } from "react";
import axios from "axios";
import { ERP_API } from "../../../config";

const RoleContainer = () => {
  const [roles, setRoles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [roleInfo, setRoleInfo] = useState({});
  const [updateRoleInfo, setUpdateRoleInfo] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get(`${ERP_API}/roles`);
      setRoles(response.data);
    } catch (err) {
      alert(`조회 실패 ${err}`);
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
    setRoleInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const HandleUpdateChangeInput = (e) => {
    const { name, value } = e.target;
    setUpdateRoleInfo((prev) => ({
      ...prev,
      [name]: value,
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
      await axios.post(`${ERP_API}/roles`, roleInfo);
    } catch (err) {
      alert(`등록 실패 ${err}`);
    }
    setIsModalOpen(false);
    fetchData();
  };

  const HandleUpdateRole = async () => {
    const finalData = {
      ...updateRoleInfo,
      roleNo: Number(updateRoleInfo.roleNo),
    };
    try {
      await axios.put(`${ERP_API}/roles/${finalData.roleNo}`, finalData);
    } catch (err) {
      alert(`수정 실패 ${err}`);
    }
    setIsUpdateModalOpen(false);
    fetchData();
  };

  const HandleDeleteRole = async () => {
    if (selectedRowKeys.length === 0) return;
    console.log(selectedRowKeys[0]);
    try {
      await axios.delete(`${ERP_API}/roles/${selectedRowKeys[0]}`);
      setSelectedRowKeys([]);
    } catch (err) {
      alert(`삭제 실패 ${err}`);
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
    <RolePresenter
      rowSelection={rowSelection}
      hasSelected={hasSelected}
      roles={roles}
      updateRoleInfo={updateRoleInfo}
      isModalOpen={isModalOpen}
      isUpdateModalOpen={isUpdateModalOpen}
      HandleRowClick={HandleRowClick}
      HandleDoubleClick={HandleDoubleClick}
      HandleCreateRole={HandleCreateRole}
      HandleUpdateRole={HandleUpdateRole}
      HandleDeleteRole={HandleDeleteRole}
      HandleChangeInput={HandleChangeInput}
      HandleUpdateChangeInput={HandleUpdateChangeInput}
      HandleCreateModalOpen={HandleCreateModalOpen}
      HandleModalClose={HandleModalClose}
      HandleUpdateModalClose={HandleUpdateModalClose}
    />
  );
};

export default RoleContainer;
