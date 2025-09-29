import { Button, Table, Input } from "antd";
import { SearchOutlined, UnorderedListOutlined } from "@ant-design/icons";
import "./EquipmentMes.css";

const EquipmentMesPresenter = ({
  equipments,
  searchTerm,
  setSearchTerm,
  filteredEquipments,
  isSearching,
  handleSearchEquipment,
  handleShowAll,
}) => {
  const nameFilter = [
    ...new Set(equipments.map((equipment) => equipment.equipName)),
  ].map((name) => ({
    text: name,
    value: name,
  }));

  const columns = [
    { title: "번호", key: "index", render: (text, record, index) => index + 1 },
    { title: "장비 코드", dataIndex: "equipCode", key: "equipCode" },
    {
      title: "장비명",
      dataIndex: "equipName",
      key: "equipName",
      filters: nameFilter,
      onFilter: (value, record) => record.equipName === value,
    },
    { title: "장비 상태", dataIndex: "type", key: "type" },
  ];

  return (
    <>
      <div className="equipment-content">
        <div className="grid-func">
          <div className="equipment-list">장비 목록</div>
        </div>

        <div className="equipment-search">
          <Input
            placeholder="장비명 입력"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearchEquipment}
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
            dataSource={isSearching ? filteredEquipments : equipments}
          />
        </div>
      </div>
    </>
  );
};
export default EquipmentMesPresenter;
