import VesselPresenter from "./VesselPresenter";
import { useState, useEffect } from "react";
import { Form } from "antd";
import { ERP_API } from "../../../config";
import { ERPapi } from "../../../components/api/api";

const VesselContainer = () => {
  const [form] = Form.useForm();
  const [vessels, setVessels] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateVesselInfo, setUpdateVesselInfo] = useState({
    vesselNo: "",
    vesselName: "",
    vesselType: "",
    vesselSize: "",
  });
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVessels, setFilteredVessels] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const fetchData = async () => {
    try {
      const response = await ERPapi.get(`${ERP_API}/vessels`);
      setVessels(response.data);
    } catch (err) {
      alert("조회 실패");
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

  const HandleRowClick = (record) => {
    if (selectedRowKeys.includes(record.vesselNo)) {
      setSelectedRowKeys([]);
    } else {
      setSelectedRowKeys([record.vesselNo]);
    }
  };

  const hasSelected = selectedRowKeys.length > 0;

  const HandleDoubleClick = (record) => {
    setSelectedRowKeys([record.vesselNo]);
    setUpdateVesselInfo({ ...record });
    setIsUpdateModalOpen(true);
  };

  const HandleUpdateChangeInput = (e) => {
    const { name, value } = e.target;
    setUpdateVesselInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const HandleCreateVessel = async (values) => {
    try {
      await ERPapi.post(`${ERP_API}/vessels`, values);
      setIsModalOpen(false);
      form.resetFields();
      fetchData();
    } catch (err) {
      alert("등록 실패");
    }
  };
  const HandleDeleteVessel = async () => {
    if (selectedRowKeys.length === 0) return;
    try {
      await ERPapi.delete(`${ERP_API}/vessels/${selectedRowKeys[0]}`);
      setSelectedRowKeys([]);
    } catch (err) {
      alert("삭제 실패");
    }
    fetchData();
  };

  const HandleUpdateVessel = async () => {
    const finalData = {
      ...updateVesselInfo,
      vesselNo: Number(updateVesselInfo.vesselNo),
    };
    try {
      await ERPapi.put(`${ERP_API}/vessels/${finalData.vesselNo}`, finalData);
    } catch (err) {
      alert("수정 실패");
    }
    setIsUpdateModalOpen(false);
    fetchData();
  };

  const handleSearchVessel = () => {
    const result = vessels.filter((vessel) =>
      vessel.vesselName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVessels(result);
    setIsSearching(true);
  };

  const handleShowAll = () => {
    setSearchTerm("");
    setFilteredVessels([]);
    setIsSearching(false);
  };

  const HandleCreateModalOpen = () => {
    form.resetFields();
    setIsModalOpen(true);
  };

  const HandleModalClose = () => {
    setIsModalOpen(false);
  };

  const HandleUpdateModalClose = () => {
    setIsUpdateModalOpen(false);
  };

  return (
    <VesselPresenter
      form={form}
      HandleCreateVessel={HandleCreateVessel}
      HandleDeleteVessel={HandleDeleteVessel}
      setIsUpdateModalOpen={setIsUpdateModalOpen}
      updateVesselInfo={updateVesselInfo}
      HandleUpdateChangeInput={HandleUpdateChangeInput}
      HandleUpdateVessel={HandleUpdateVessel}
      HandleCreateModalOpen={HandleCreateModalOpen}
      HandleModalClose={HandleModalClose}
      isModalOpen={isModalOpen}
      isUpdateModalOpen={isUpdateModalOpen}
      vessels={vessels}
      rowSelection={rowSelection}
      HandleRowClick={HandleRowClick}
      hasSelected={hasSelected}
      HandleDoubleClick={HandleDoubleClick}
      HandleUpdateModalClose={HandleUpdateModalClose}
      filteredVessels={filteredVessels}
      isSearching={isSearching}
      handleSearchVessel={handleSearchVessel}
      handleShowAll={handleShowAll}
      setSearchTerm={setSearchTerm}
      searchTerm={searchTerm}
    />
  );
};

export default VesselContainer;
