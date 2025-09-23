import React, { useState, useEffect } from "react";
import BOMPresenter from "./BOMPresenter";
import axios from "axios";

const BOMContainer = () => {
  const API_URL = "http://localhost:8080/api/erp/v1";
  // bom 상태값
  const [boms, setBoms] = useState([]);
  const [vessels, setVessels] = useState([]);
  const [standardProcesses, setStandardProcesses] = useState([]);

  // bom detail 상태값
  const [bomdetails, setBomdetails] = useState([]);
  const [materials, setMaterials] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateBomModalOpen, setIsUpdateBomModalOpen] = useState(false);
  const [isUpdateBomDetailModalOpen, setIsUpdateBomDetailModalOpen] =
    useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [bomInfo, setBomInfo] = useState({});
  const [bomDetailInfo, setBomDetailInfo] = useState([]);

  const [updateBomInfo, setUpdateBomInfo] = useState({});
  const [updateBomDetailInfo, setUpdateBomDetailInfo] = useState({});

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBoms, setFilteredBoms] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const fetchData = async () => {
    try {
      const responseBom = await axios.get(`${API_URL}/boms`);
      const responseBomDetail = await axios.get(`${API_URL}/bomdetails`);
      setBoms(responseBom.data);
      setBomdetails(responseBomDetail.data);
    } catch (error) {
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

  const hasSelected = selectedRowKeys.length > 0;

  //등록
  const HandleChangeSelectBomDetail = (index, key, value) => {
    setBomDetailInfo((prev) => {
      const newList = [...prev];
      newList[index] = {
        ...newList[index],
        [key]: value,
      };
      return newList;
    });
  };

  const HandleChangeSelectBom = (name, value) => {
    setBomInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const HandleChangeInputBomDetail = (index, key, value) => {
    setBomDetailInfo((prev) => {
      const newList = [...prev];
      newList[index] = {
        ...newList[index],
        [key]: value,
      };
      return newList;
    });
  };

  //업데이트
  const HandleUpdateChangeInputBomDetail = (key, value) => {
    setUpdateBomDetailInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const HandleUpdateChangeSelectBom = (name, value) => {
    setUpdateBomInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const HandleUpdateChangeSelectBomDetail = (name, value) => {
    setUpdateBomDetailInfo((prev) => ({
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

  const HandleDoubleClickBOM = async (record) => {
    const resVes = await axios.get(`${API_URL}/vessels`);
    const resSp = await axios.get(`${API_URL}/standardprocesses`);
    setVessels(resVes.data);
    setStandardProcesses(resSp.data);
    setSelectedRowKeys([record.bomNo]);
    const matchData = {
      bomNo: record.bomNo,
      vesselNo: Number(record.vessel.vesselNo),
      spNo: Number(record.standardProcess.spNo),
    };
    setUpdateBomInfo({ ...matchData });
    setIsUpdateBomModalOpen(true);
  };

  const HandleDoubleClickBOMDetail = async (record) => {
    const resMat = await axios.get(`${API_URL}/materials`);
    setMaterials(resMat.data);

    const matchData = {
      bomDetailNo: record.bomDetailNo,
      bomNo: record.bom.bomNo,
      materialNo: record.material.materialNo,
      bomDetailCount: record.bomDetailCount,
    };
    setUpdateBomDetailInfo({ ...matchData });
    setIsUpdateBomDetailModalOpen(true);
  };

  const HandleCreateBom = async () => {
    const finalData = {
      ...bomInfo,
      vesselNo: Number(bomInfo.vesselNo),
      spNo: Number(bomInfo.spNo),
      bomDetailDtoList: bomDetailInfo,
    };

    try {
      await axios.post(`${API_URL}/boms`, finalData);
    } catch (error) {
      alert("등록 실패:");
    }
    setIsModalOpen(false);
    fetchData();
  };

  const HandleDeleteBom = async () => {
    if (selectedRowKeys.length === 0) return;
    console.log(selectedRowKeys[0]);
    try {
      await axios.delete(`${API_URL}/boms/${selectedRowKeys[0]}`);
      setBoms((prev) =>
        prev.filter((item) => item.bomNo !== selectedRowKeys[0])
      );
      setSelectedRowKeys([]);
    } catch (err) {
      alert("삭제 실패");
    }
    fetchData();
  };

  const HandleDeleteBomDetail = async (bomDetailNo) => {
    if (!bomDetailNo) return;
    try {
      await axios.delete(`${API_URL}/bomdetails/${bomDetailNo}`);
      setBomdetails((prev) =>
        prev.filter((item) => item.bomDetailNo !== bomDetailNo)
      );
    } catch (err) {
      alert("삭제 실패");
    }
    fetchData();
  };

  const HandleUpdateBom = async () => {
    const finalData = {
      ...updateBomInfo,
      vesselNo: Number(updateBomInfo.vesselNo),
      spNo: Number(updateBomInfo.spNo),
    };
    try {
      await axios.put(`${API_URL}/boms/${finalData.bomNo}`, finalData);
    } catch (err) {
      alert("수정 실패");
    }
    setIsUpdateBomModalOpen(false);
    fetchData();
  };

  const HandleUpdateBomDetail = async () => {
    const finalData = {
      ...updateBomDetailInfo,
      materialNo: Number(updateBomDetailInfo.materialNo),
    };
    try {
      await axios.put(
        `${API_URL}/bomdetails/${finalData.bomDetailNo}`,
        finalData
      );
    } catch (err) {
      alert("수정 실패");
    }
    setIsUpdateBomDetailModalOpen(false);
    fetchData();
  };

  const handleSearchBom = () => {
    const result = boms.filter((bom) =>
      bom.vessel.vesselName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBoms(result);
    setIsSearching(true);
  };

  const handleShowAll = () => {
    setSearchTerm("");
    setFilteredBoms([]);
    setIsSearching(false);
  };

  const HandleCreateModalOpen = async () => {
    const resVes = await axios.get(`${API_URL}/vessels`);
    const resSp = await axios.get(`${API_URL}/standardprocesses`);
    const resMat = await axios.get(`${API_URL}/materials`);
    setVessels(resVes.data);
    setStandardProcesses(resSp.data);
    setMaterials(resMat.data);
    setIsModalOpen(true);
  };

  const HandleModalClose = () => {
    setIsModalOpen(false);
  };

  const HandleUpdateBomModalClose = () => {
    setIsUpdateBomModalOpen(false);
  };

  const HandleUpdateBomDetailModalClose = () => {
    setIsUpdateBomDetailModalOpen(false);
  };

  return (
    <BOMPresenter
      rowSelection={rowSelection}
      hasSelected={hasSelected}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      filteredBoms={filteredBoms}
      isSearching={isSearching}
      handleSearchBom={handleSearchBom}
      handleShowAll={handleShowAll}
      boms={boms}
      vessels={vessels}
      standardProcesses={standardProcesses}
      bomdetails={bomdetails}
      materials={materials}
      isModalOpen={isModalOpen}
      isUpdateBomModalOpen={isUpdateBomModalOpen}
      isUpdateBomDetailModalOpen={isUpdateBomDetailModalOpen}
      bomInfo={bomInfo}
      updateBomInfo={updateBomInfo}
      bomDetailInfo={bomDetailInfo}
      updateBomDetailInfo={updateBomDetailInfo}
      HandleRowClick={HandleRowClick}
      HandleDoubleClickBOM={HandleDoubleClickBOM}
      HandleDoubleClickBOMDetail={HandleDoubleClickBOMDetail}
      HandleChangeSelectBomDetail={HandleChangeSelectBomDetail}
      HandleChangeSelectBom={HandleChangeSelectBom}
      HandleChangeInputBomDetail={HandleChangeInputBomDetail}
      HandleUpdateChangeInputBomDetail={HandleUpdateChangeInputBomDetail}
      HandleUpdateChangeSelectBom={HandleUpdateChangeSelectBom}
      HandleUpdateChangeSelectBomDetail={HandleUpdateChangeSelectBomDetail}
      HandleCreateBom={HandleCreateBom}
      HandleUpdateBom={HandleUpdateBom}
      HandleDeleteBom={HandleDeleteBom}
      HandleUpdateBomDetail={HandleUpdateBomDetail}
      HandleDeleteBomDetail={HandleDeleteBomDetail}
      HandleCreateModalOpen={HandleCreateModalOpen}
      HandleModalClose={HandleModalClose}
      HandleUpdateBomModalClose={HandleUpdateBomModalClose}
      HandleUpdateBomDetailModalClose={HandleUpdateBomDetailModalClose}
    />
  );
};

export default BOMContainer;
