import { Button, Table, Input } from "antd";
import { SearchOutlined, UnorderedListOutlined } from "@ant-design/icons";
import "./MaterialMes.css";

const EquipmentMesPresenter = ({
  materials,
  searchTerm,
  setSearchTerm,
  filteredMaterials,
  isSearching,
  handleSearchMaterial,
  handleShowAll,
}) => {
  const nameFilter = [
    ...new Set(materials.map((material) => material.materialName)),
  ].map((name) => ({
    text: name,
    value: name,
  }));

  const columns = [
    { title: "번호", key: "index", render: (text, record, index) => index + 1 },
    { title: "자재 코드", dataIndex: "materialCode", key: "materialCode" },
    {
      title: "자재명",
      dataIndex: "materialName",
      key: "materialName",
      filters: nameFilter,
      onFilter: (value, record) => record.materialName === value,
    },
  ];

  return (
    <>
      <div className="material-content">
        <div className="grid-func">
          <div className="material-list">자재 목록</div>
        </div>

        <div className="material-search">
          <Input
            placeholder="자재명 입력"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearchMaterial}
          ></Button>
          <Button
            icon={<UnorderedListOutlined />}
            onClick={handleShowAll}
          ></Button>
        </div>
        <div className="grid-box">
          <Table
            size="small"
            pagination={false}
            rowClassName="clickable-row"
            columns={columns}
            dataSource={isSearching ? filteredMaterials : materials}
          />
        </div>
      </div>
    </>
  );
};
export default EquipmentMesPresenter;
