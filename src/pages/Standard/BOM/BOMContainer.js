import React, { useState, useEffect } from "react";
import { Form, message, Button } from "antd";
import BOMPresenter from "./BOMPresenter";
import axios from "axios";

const BOMContainer = () => {
  const baseURL = "http://localhost:8080/api/erp/v1";

  const [form] = Form.useForm();
  const [boms, setBoms] = useState([]);
  const [vessels, setVessels] = useState([]);
  const [standardProcesses, setStandardProcesses] = useState([]);
  const [materials, setMaterials] = useState([]);

  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedBOM, setSelectedBOM] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const fetchBOMs = async () => {
    try {
      const res = await axios.get(`${baseURL}/boms`);
      setBoms(res.data);
    } catch (error) {
      console.error(error);
      message.error("BOM 목록 조회 실패");
    }
  };

  // 초기 데이터 로딩
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const [vesselRes, spRes, materialRes] = await Promise.all([
          axios.get(`${baseURL}/vessels`),
          axios.get(`${baseURL}/standardprocesses`),
          axios.get(`${baseURL}/materials`),
        ]);

        setVessels(
          vesselRes.data.map((v) => ({
            value: v.vesselNo,
            label: v.vesselName,
          }))
        );
        setStandardProcesses(
          spRes.data.map((sp) => ({ value: sp.spNo, label: sp.spName }))
        );
        setMaterials(
          materialRes.data.map((m) => ({
            value: m.materialNo,
            label: `${m.materialName} (${m.materialCode})`,
          }))
        );
        await fetchBOMs();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  // 신규 등록 모달
  const handleOpenCreateModal = () => setIsModalOpen(true);

  const handleModalClose = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleDetailModalClose = () => {
    setIsDetailModalOpen(false);
    setSelectedBOM(null);
    setIsEditing(false);
    form.resetFields();
  };
  //Create
  const handleCreate = async (values) => {
    try {
      await axios.post(`${baseURL}/boms`, values);
      message.success("BOM 등록 완료");
      handleModalClose();
      fetchBOMs();
    } catch (error) {
      console.error(error);
      message.error("BOM 등록 실패");
    }
  };

  // BOM 수정
  const handleUpdate = async (values) => {
    if (!selectedBOM) return;
    try {
      const payload = { bomDetails: values.bomDetails || [] };
      await axios.put(`${baseURL}/boms/${selectedBOM.bomNo}`, payload);
      message.success("BOM 수정 완료");
      setIsDetailModalOpen(false);
      fetchBOMs();
    } catch (error) {
      console.error(error);
      message.error("BOM 수정 실패");
    }
  };

  //bom delete
  const handleDelete = async () => {
    if (selectedRowKeys.length === 0) return;
    const bomNoToDelete = selectedRowKeys[0];

    if (window.confirm(`${bomNoToDelete}번 BOM을 정말 삭제하시겠습니까?`)) {
      try {
        await axios.delete(`${baseURL}/boms/${bomNoToDelete}`);
        message.success("BOM이 삭제되었습니다.");
        setSelectedRowKeys([]); // 선택 초기화
        fetchBOMs(); // 목록 새로고침
      } catch (error) {
        console.error("BOM 삭제 실패:", error);
        message.error("삭제에 실패했습니다.");
      }
    }
  };

  const rowSelection = {
    selectedRowKeys,
    type: "radio",
    onChange: (keys) => setSelectedRowKeys(keys),
  };
  const hasSelected = selectedRowKeys.length > 0;

  const vesselNameFilter = [...new Set(boms.map((bom) => bom.vesselName))].map(
    (name) => ({
      text: name,
      value: name,
    })
  );

  // 2. '표준 공정'으로 중복 없는 필터 목록 생성
  const spNameFilter = [...new Set(boms.map((bom) => bom.spName))].map(
    (name) => ({
      text: name,
      value: name,
    })
  );

  const columns = [
    { title: "번호", key: "index", render: (text, record, index) => index + 1 },
    {
      title: "선박 이름",
      dataIndex: "vessel.vesselName",
      key: "vesselName",
      filters: vesselNameFilter,
      onFilter: (value, record) => record.vesselName.includes(value),
    },
    {
      title: "표준 공정",
      dataIndex: "sp.spName",
      key: "spName",
      filters: spNameFilter,
      onFilter: (value, record) => record.spName.includes(value),
    },
    {
      title: "상세",
      key: "action",
      render: (_, record) => (
        <Button
          size="small"
          onClick={() => {
            setSelectedBOM(record);
            setIsEditing(false);
            setIsDetailModalOpen(true);
          }}
        >
          상세보기
        </Button>
      ),
    },

    {
      title: "관리",
      key: "action",
      render: (_, record) => (
        <Button
          size="small"
          onClick={() => {
            setSelectedBOM(record);
            setIsEditing(true); // 수정 모드
            setIsDetailModalOpen(true);
          }}
        >
          수정
        </Button>
      ),
    },
  ];

  return (
    <BOMPresenter
      loading={loading}
      boms={boms}
      columns={columns}
      rowSelection={rowSelection}
      hasSelected={hasSelected}
      isModalOpen={isModalOpen}
      isDetailModalOpen={isDetailModalOpen}
      isEditing={isEditing}
      form={form}
      selectedBOM={selectedBOM}
      vessels={vessels}
      standardProcesses={standardProcesses}
      materials={materials}
      handleOpenCreateModal={handleOpenCreateModal}
      handleModalClose={handleModalClose}
      handleDetailModalClose={handleDetailModalClose}
      handleCreate={handleCreate}
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
      spNameFilter={spNameFilter}
      vesselNameFilter={vesselNameFilter}
    />
  );
};

export default BOMContainer;
