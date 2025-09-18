import StandardProcessPresenter from "./StandardProcessPresenter";
import { useState, useEffect } from "react";
import axios from "axios";

const StandardProcessContainer = () => {
  const API_URL = "http://localhost:8080/api/erp/v1";
  const [standardprocesses, setStandardProcesses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateStandardProcessInfo, setUpdateStandardProcessInfo] = useState(
    {}
  );

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [standardprocessInfo, setStandardProcessInfo] = useState({});

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStandardProcesses, setFilteredStandardProcesses] = useState(
    []
  );
  const [isSearching, setIsSearching] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/standardprocesses`);
      setStandardProcesses(response.data);
    } catch (err) {
    } finally {
    }
  };
  console.log(standardprocesses);
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

  const HandleRowClick = (record) => {
    if (selectedRowKeys.includes(record.spNo)) {
      setSelectedRowKeys([]);
    } else {
      setSelectedRowKeys([record.spNo]);
    }
  };

  const hasSelected = selectedRowKeys.length > 0;

  const HandleChangeInput = (e) => {
    const { name, value } = e.target;
    setStandardProcessInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const HandleDoubleClick = async (record) => {
    setSelectedRowKeys([record.spNo]);
    const matchData = {
      spNo: record.spNo,
      spCode: record.spCode,
      spName: record.spName,
      spTime: record.spTime,
      spDescription: record.spDescription,
      spEquipment: record.spEquipment,
    };
    setUpdateStandardProcessInfo({ ...matchData });
    setIsUpdateModalOpen(true);
  };

  const HandleUpdateChangeInput = (e) => {
    const { name, value } = e.target;
    setUpdateStandardProcessInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleCreateStandardProcess = async () => {
    const finalData = {
      ...standardprocessInfo,
    };
    try {
      await axios.post(`${API_URL}/standardprocesses`, finalData);
    } catch (err) {
      alert(`등록 실패 ${err}`);
    }
    fetchData();
    setIsModalOpen(false);
  };

  const HandleDeleteStandardProcess = async () => {
    if (selectedRowKeys.length === 0) return;
    console.log(selectedRowKeys[0]);

    try {
      await axios.delete(`${API_URL}/standardprocesses/${selectedRowKeys[0]}`);
      setSelectedRowKeys([]);
    } catch (err) {
      console.error(err);
      alert("삭제 실패");
    }
    fetchData();
  };

  const HandleUpdateStandardProcess = async (values) => {
    const finalData = {
      ...updateStandardProcessInfo,
      ...values,
      spNo: Number(updateStandardProcessInfo.spNo),
    };
    try {
      await axios.put(
        `${API_URL}/standardprocesses/${finalData.spNo}`,
        finalData
      );
    } catch (err) {
      alert(`수정 실패 ${err}`);
    }

    setIsUpdateModalOpen(false);
    fetchData();
  };

  const handleSearchStandardProcess = () => {
    const result = standardprocesses.filter((standardprocess) =>
      standardprocess.spName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStandardProcesses(result);
    setIsSearching(true);
  };

  const handleShowAll = () => {
    setSearchTerm("");
    setFilteredStandardProcesses([]);
    setIsSearching(false);
  };

  const HandleCreateModalOpen = async () => {
    setStandardProcessInfo("");
    setIsModalOpen(true);
  };

  const HandleModalClose = () => {
    setIsModalOpen(false);
  };

  const HandleUpdateModalClose = () => {
    setIsUpdateModalOpen(false);
  };

  return (
    <StandardProcessPresenter
      HandleChangeInput={HandleChangeInput}
      HandleCreateStandardProcess={handleCreateStandardProcess}
      HandleDeleteStandardProcess={HandleDeleteStandardProcess}
      setIsUpdateModalOpen={setIsUpdateModalOpen}
      updateStandardProcessInfo={updateStandardProcessInfo}
      HandleUpdateChangeInput={HandleUpdateChangeInput}
      HandleUpdateStandardProcess={HandleUpdateStandardProcess}
      HandleCreateModalOpen={HandleCreateModalOpen}
      HandleModalClose={HandleModalClose}
      isModalOpen={isModalOpen}
      isUpdateModalOpen={isUpdateModalOpen}
      standardprocesses={standardprocesses}
      rowSelection={rowSelection}
      HandleRowClick={HandleRowClick}
      hasSelected={hasSelected}
      HandleDoubleClick={HandleDoubleClick}
      HandleUpdateModalClose={HandleUpdateModalClose}
      setSearchTerm={setSearchTerm}
      filteredStandardProcesses={filteredStandardProcesses}
      isSearching={isSearching}
      handleShowAll={handleShowAll}
      handleSearchStandardProcess={handleSearchStandardProcess}
      standardprocessInfo={standardprocessInfo}
    />
  );
};

export default StandardProcessContainer;
