import EquipmentPresenter from "./EquipmentPresenter";
import { useState, useEffect } from "react";
import { ERP_API } from "../../../config";
import { ERPapi } from "../../../components/api/api";

const EquipmentContainer = () => {
  const [equipments, setEquipments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateEquipmentInfo, setUpdateEquipmentInfo] = useState({
    equipNo: "",
    equipCode: "",
    equipName: "",
    type: null,
    equipPrice: "",
    equipDepreciation: "",
    equipPurchaseDate: "",
    equipLastInspected: "",
  });
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [equipmentInfo, setEquipmentInfo] = useState({
    equipCode: "",
    equipName: "",
    type: null,
    equipPrice: "",
    equipDepreciation: "",
    equipPurchaseDate: "",
    equipLastInspected: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEquipments, setFilteredEquipments] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const fetchData = async () => {
    try {
      const response = await ERPapi.get(`${ERP_API}/equipments`);
      setEquipments(response.data);
    } catch (err) {
    } finally {
    }
  };
  useEffect(() => {
    fetchData();
  }, [equipments]);

  const rowSelection = {
    selectedRowKeys,
    hideSelectAll: true,
    onChange: (selectedRowKeys) => {
      const lastKey = selectedRowKeys.pop();
      setSelectedRowKeys(lastKey ? [lastKey] : []);
    },
  };

  const HandleRowClick = (record) => {
    if (selectedRowKeys.includes(record.equipNo)) {
      setSelectedRowKeys([]);
    } else {
      setSelectedRowKeys([record.equipNo]);
    }
  };

  const HandleChangeSelect = (name, value) => {
    setEquipmentInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const hasSelected = selectedRowKeys.length > 0;

  const HandleChangeInput = (e) => {
    const { name, value } = e.target;
    setEquipmentInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const HandleDoubleClick = (record) => {
    setSelectedRowKeys([record.equipNo]);
    setUpdateEquipmentInfo({
      ...record,
      type: record.type,
    });
    setIsUpdateModalOpen(true);
  };

  const HandleUpdateChangeInput = (e) => {
    const { name, value } = e.target;
    setUpdateEquipmentInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const HandleUpdateChangeSelect = (name, value) => {
    setUpdateEquipmentInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const HandleCreateEquipment = async () => {
    try {
      await ERPapi.post(`${ERP_API}/equipments`, equipmentInfo);
    } catch (error) {
      console.error("등록 실패:", error);
    }
    fetchData();
    setIsModalOpen(false);
  };

  const HandleDeleteEquipment = async () => {
    if (selectedRowKeys.length === 0) return;
    console.log(selectedRowKeys[0]);
    try {
      await ERPapi.delete(`${ERP_API}/equipments/${selectedRowKeys[0]}`);
      setEquipments((prev) =>
        prev.filter((item) => item.equipNo !== selectedRowKeys[0])
      );
      setSelectedRowKeys([]);
    } catch (err) {
      console.error(err);
      alert("삭제 실패");
    }
    fetchData();
  };

  const HandleUpdateEquipment = async () => {
    const finalData = {
      ...updateEquipmentInfo,
      equipNo: Number(updateEquipmentInfo.equipNo),
    };
    try {
      await ERPapi.put(`${ERP_API}/equipments/${finalData.equipNo}`, finalData);
    } catch (err) {
      console.error(err);
      alert("수정 실패");
    }
    setIsUpdateModalOpen(false);
    fetchData();
  };

  const handleSearchEquipment = () => {
    const result = equipments.filter((equipment) =>
      equipment.equipName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEquipments(result);
    setIsSearching(true);
  };

  const handleShowAll = () => {
    setSearchTerm("");
    setFilteredEquipments([]);
    setIsSearching(false);
  };
  const HandleCreateModalOpen = () => {
    setEquipmentInfo({
      equipCode: "",
      equipName: "",
      type: null,
      equipPrice: "",
      equipDepreciation: "",
      equipPurchaseDate: "",
      equipLastInspected: "",
    });
    setIsModalOpen(true);
  };

  const HandleModalClose = () => {
    setIsModalOpen(false);
  };

  const HandleUpdateModalClose = () => {
    setIsUpdateModalOpen(false);
  };

  return (
    <EquipmentPresenter
      HandleChangeInput={HandleChangeInput}
      HandleCreateEquipment={HandleCreateEquipment}
      HandleUpdateEquipment={HandleUpdateEquipment}
      filteredEquipments={filteredEquipments}
      updateEquipmentInfo={updateEquipmentInfo}
      HandleUpdateChangeInput={HandleUpdateChangeInput}
      HandleDeleteEquipment={HandleDeleteEquipment}
      setSearchTerm={setSearchTerm}
      HandleChangeSelect={HandleChangeSelect}
      HandleUpdateChangeSelect={HandleUpdateChangeSelect}
      setIsUpdateModalOpen={setIsUpdateModalOpen}
      equipmentInfo={equipmentInfo}
      HandleCreateModalOpen={HandleCreateModalOpen}
      HandleModalClose={HandleModalClose}
      isModalOpen={isModalOpen}
      searchTerm={searchTerm}
      isSearching={isSearching}
      setUpdateEquipmentInfo={setUpdateEquipmentInfo}
      equipments={equipments}
      HandleUpdateModalClose={HandleUpdateModalClose}
      isUpdateModalOpen={isUpdateModalOpen}
      handleShowAll={handleShowAll}
      setEquipmentInfo={setEquipmentInfo}
      rowSelection={rowSelection}
      HandleRowClick={HandleRowClick}
      hasSelected={hasSelected}
      HandleDoubleClick={HandleDoubleClick}
      handleSearchEquipment={handleSearchEquipment}
    />
  );
};

export default EquipmentContainer;
