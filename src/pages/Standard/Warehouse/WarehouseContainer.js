import { useState } from "react";
import WarehousePresenter from "./WarehousePresenter";

const WarehouseContainer = () => {
  const warehouses = [
    {
      whNo: 1,
      whCode: "W001",
      whName: "본사 창고",
      whLocation: "부산광역시 중앙대로",
      whType: "부자재 창고",
    },
    {
      whNo: 2,
      whCode: "W002",
      whName: "제 1공장 창고",
      whLocation: "경상남도 양산시",
      whType: "완제품 창고",
    },
    {
      whNo: 3,
      whCode: "W003",
      whName: "제 2공장 창고",
      whLocation: "울산광역시 남구",
      whType: "반제품 창고",
    },
    {
      whNo: 4,
      whCode: "W004",
      whName: "제 3공장 창고",
      whLocation: "경상남도 창원시",
      whType: "원자재 창고",
    },
    {
      whNo: 5,
      whCode: "W005",
      whName: "부산 물류센터",
      whLocation: "부산 신항",
      whType: "통합 물류 창고",
    },
    {
      whNo: 6,
      whCode: "W006",
      whName: "수도권 물류센터",
      whLocation: "경기도 이천시",
      whType: "냉장/냉동 창고",
    },
    {
      whNo: 7,
      whCode: "W007",
      whName: "해외 자재 창고",
      whLocation: "베트남 호치민",
      whType: "부자재 창고",
    },
    {
      whNo: 8,
      whCode: "W008",
      whName: "폐기물 보관소",
      whLocation: "경상남도 김해시",
      whType: "특수 창고",
    },
    {
      whNo: 9,
      whCode: "W009",
      whName: "장비 보관 창고",
      whLocation: "부산광역시 강서구",
      whType: "설비 창고",
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const rowSelection = {
    selectedRowKeys,
    hideSelectAll: true,
    onChange: (keys) =>
      setSelectedRowKeys(keys.length > 0 ? [keys[keys.length - 1]] : []),
  };
  const handleRowClick = (record) => {
    setSelectedRowKeys((prevKeys) =>
      prevKeys.includes(record.whNo) ? [] : [record.whNo]
    );
  };
  const hasSelected = selectedRowKeys.length > 0;

  const displayedWarehouses = searchTerm
    ? warehouses.filter((wh) =>
        wh.whName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : warehouses;

  const handleShowAll = () => setSearchTerm("");

  return (
    <WarehousePresenter
      warehouses={displayedWarehouses}
      rowSelection={rowSelection}
      handleRowClick={handleRowClick}
      hasSelected={hasSelected}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      handleShowAll={handleShowAll}
    />
  );
};

export default WarehouseContainer;
