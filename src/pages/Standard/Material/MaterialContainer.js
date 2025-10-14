import MaterialPresenter from "./MaterialPresenter";
import { useState, useEffect } from "react";
import { ERP_API } from "../../../config";
import { ERPapi } from "../../../components/api/api";

const MaterialContainer = () => {
  const [materials, setMaterials] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateMaterialInfo, setUpdateMaterialInfo] = useState({});
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [materialInfo, setMaterialInfo] = useState({});

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState([]);

  const fetchData = async () => {
    try {
      const response = await ERPapi.get(`${ERP_API}/materials`);
      setMaterials(response.data);
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
    if (selectedRowKeys.includes(record.materialNo)) {
      setSelectedRowKeys([]);
    } else {
      setSelectedRowKeys([record.materialNo]);
    }
  };

  const hasSelected = selectedRowKeys.length > 0;

  const HandleChangeInput = (name, value) => {
    setMaterialInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const HandleUpdateChangeInput = (name, value) => {
    setUpdateMaterialInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const HandleDoubleClick = (record) => {
    setSelectedRowKeys([record.materialNo]);
    setUpdateMaterialInfo({ ...record });
    setIsUpdateModalOpen(true);
  };

  const HandleCreateMaterial = async () => {
    try {
      await ERPapi.post(`${ERP_API}/materials`, materialInfo);
    } catch (error) {
      alert("등록 실패");
    }
    fetchData();
    setIsModalOpen(false);
  };
  const HandleDeleteMaterial = async () => {
    if (selectedRowKeys.length === 0) return;

    try {
      await ERPapi.delete(`${ERP_API}/materials/${selectedRowKeys[0]}`);
      setMaterials((prev) =>
        prev.filter((item) => item.materialNo !== selectedRowKeys[0])
      );
      setSelectedRowKeys([]);
    } catch (err) {
      console.error(err);
      alert("삭제 실패");
    }
    fetchData();
  };

  const HandleUpdateMaterial = async () => {
    const finalData = {
      ...updateMaterialInfo,
      materialNo: Number(updateMaterialInfo.materialNo),
    };
    try {
      await ERPapi.put(
        `${ERP_API}/materials/${finalData.materialNo}`,
        finalData
      );
    } catch (err) {
      console.error(err);
      alert("수정 실패");
    }
    setIsUpdateModalOpen(false);
    fetchData();
  };

  const handleSearchMaterial = () => {
    const result = materials.filter((material) =>
      material.materialName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMaterials(result);
    setIsSearching(true);
  };

  const handleShowAll = () => {
    setSearchTerm("");
    setFilteredMaterials([]);
    setIsSearching(false);
  };

  const HandleChangeModalStatus = () => {
    setIsModalOpen(!isModalOpen);

  };

  const HandleUpdateModalClose = () => {
    setIsUpdateModalOpen(false);
  };

  return (
    <MaterialPresenter
      HandleChangeInput={HandleChangeInput}
      HandleCreateMaterial={HandleCreateMaterial}
      HandleDeleteMaterial={HandleDeleteMaterial}
      setIsUpdateModalOpen={setIsUpdateModalOpen}
      updateMaterialInfo={updateMaterialInfo}
      selectedCategories={selectedCategories}
      HandleCheckbox={HandleCheckbox}
      HandleUpdateChangeInput={HandleUpdateChangeInput}
      HandleUpdateMaterial={HandleUpdateMaterial}
      handleShowAll={handleShowAll}
      HandleChangeModalStatus={HandleChangeModalStatus}
      isModalOpen={isModalOpen}
      isUpdateModalOpen={isUpdateModalOpen}
      materials={materials}
      materialInfo={materialInfo}
      rowSelection={rowSelection}
      HandleRowClick={HandleRowClick}
      hasSelected={hasSelected}
      HandleDoubleClick={HandleDoubleClick}
      HandleUpdateModalClose={HandleUpdateModalClose}
      filteredMaterials={filteredMaterials}
      isSearching={isSearching}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      handleSearchMaterial={handleSearchMaterial}
    />
  );
};

export default MaterialContainer;
