import React from "react";
import { Button, Table, Input } from "antd";
import { SearchOutlined, UnorderedListOutlined } from "@ant-design/icons";
import "./warehouse.css";

const WarehousePresenter = ({
  warehouses,
  searchTerm,
  setSearchTerm,
  handleSearchWarehouse,
  handleShowAll,
}) => {
  const codeFilter = [...new Set(warehouses.map((item) => item.whCode))].map(
    (code) => ({
      text: code,
      value: code,
    })
  );
  const nameFilter = [...new Set(warehouses.map((item) => item.whName))].map(
    (name) => ({
      text: name,
      value: name,
    })
  );

  const typeFilter = [...new Set(warehouses.map((item) => item.whType))].map(
    (type) => ({
      text: type,
      value: type,
    })
  );

  const columns = [
    {
      title: "창고 번호",
      dataIndex: "whNo",
      key: "whNo",
      render: (text, record, index) => index + 1,
    },
    {
      title: "창고 이름",
      dataIndex: "whName",
      key: "whName",
      filters: nameFilter,
      onFilter: (value, record) => record.whName.includes(value),
    },
    {
      title: "창고 코드",
      dataIndex: "whCode",
      key: "whCode",
      filters: codeFilter,
      onFilter: (value, record) => record.whCode.includes(value),
    },
    {
      title: "창고 위치",
      dataIndex: "whLocation",
      key: "whLocation",
    },
    {
      title: "창고 유형",
      dataIndex: "whType",
      key: "whType",
      filters: typeFilter,
      onFilter: (value, record) => record.whType.includes(value),
    },
  ];

  return (
    <>
      <div className="warehouse-content">
        <div className="grid-func">
          <div className="warehouse-list">창고 목록</div>
          <div className="func-button">
            <Button>추가</Button>
            <Button type="primary" danger>
              삭제
            </Button>
          </div>
        </div>
        <div className="warehouse-search">
          <Input
            placeholder="창고명 입력"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearchWarehouse}
          />
          <Button icon={<UnorderedListOutlined />} onClick={handleShowAll} />
        </div>

        <div className="grid-box">
          <Table
            columns={columns}
            pagination={{
              pageSize: 13,
              position: ["bottomCenter"],
            }}
            dataSource={warehouses}
            rowKey="whNo"
          />
        </div>
      </div>
    </>
  );
};

export default WarehousePresenter;
