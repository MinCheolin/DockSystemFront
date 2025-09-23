import { Button, Table, Modal, Form, Input, Select, DatePicker } from "antd";
import { SearchOutlined, UnorderedListOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import "./Equipment.css";

const EquipmentPresenter = ({
  equipments,
  HandleChangeInput,
  HandleCreateEquipment,
  HandleCreateModalOpen,
  HandleModalClose,
  isModalOpen,
  HandleUpdateModalClose,
  handleSearchEquipment,
  HandleUpdateEquipment,
  rowSelection,
  HandleRowClick,
  hasSelected,
  HandleDeleteEquipment,
  HandleDoubleClick,
  isUpdateModalOpen,
  setSearchTerm,
  handleShowAll,
  setUpdateEquipmentInfo,
  updateEquipmentInfo,
  HandleUpdateChangeInput,
  HandleChangeSelect,
  HandleUpdateChangeSelect,
  filteredEquipments,
  searchTerm,
  isSearching,
  equipmentInfo,
  setEquipmentInfo,
}) => {
  const typeOptions = [
    { value: "가동", label: "가동" },
    { value: "비가동", label: "비가동" },
    { value: "수리", label: "수리" },
    { value: "폐기", label: "폐기" },
  ];

  const nameFilter = [
    ...new Set(equipments.map((equipment) => equipment.equipName)),
  ].map((name) => ({
    text: name,
    value: name,
  }));

  const typeFilter = [
    ...new Set(equipments.map((equipment) => equipment.type)),
  ].map((type) => ({
    text: type,
    value: type,
  }));

  const purchaseFilter = [
    ...new Set(equipments.map((equipment) => equipment.equipPurchaseDate)),
  ].map((purchase) => ({
    text: purchase,
    value: purchase,
  }));

  const inspectedFilter = [
    ...new Set(equipments.map((equipment) => equipment.equipLastInspected)),
  ].map((inspected) => ({
    text: inspected,
    value: inspected,
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
    {
      title: "장비 상태",
      dataIndex: "type",
      key: "type",
      filters: typeFilter,
      onFilter: (value, record) => record.type === value,
    },
    { title: "장비 구매가", dataIndex: "equipPrice", key: "equipPrice" },
    {
      title: "장비 감가 상각",
      dataIndex: "equipDepreciation",
      key: "equipDepreciation",
    },
    {
      title: "장비 구매일",
      dataIndex: "equipPurchaseDate",
      key: "equipPurchaseDate",
      filters: purchaseFilter,
      onFilter: (value, record) => record.equipPurchaseDate === value,
    },
    {
      title: "최근 점검일",
      dataIndex: "equipLastInspected",
      key: "equipLastInspected",
      filters: inspectedFilter,
      onFilter: (value, record) => record.equipLastInspected === value,
    },
  ];

  return (
    <>
      <div className="equipment-content">
        <div className="grid-func">
          <div className="equipment-list">장비 목록</div>
          <div className="func-button">
            <Button onClick={HandleCreateModalOpen}>추가</Button>
            <Button
              type="primary"
              danger
              disabled={!hasSelected}
              onClick={HandleDeleteEquipment}
            >
              삭제
            </Button>
          </div>
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
            rowSelection={rowSelection}
            columns={columns}
            dataSource={isSearching ? filteredEquipments : equipments} // 검색하려면 수정해야함
            rowKey="equipNo"
            onRow={(record) => ({
              onClick: () => HandleRowClick(record),
              onDoubleClick: () => {
                HandleDoubleClick(record);
              },
            })}
          />
        </div>

        <Modal
          title="장비 추가"
          open={isModalOpen}
          footer={null}
          onCancel={HandleModalClose}
        >
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onFinish={HandleCreateEquipment}
          >
            <Form.Item label="장비 코드">
              <Input
                placeholder="장비 코드를 입력하세요."
                name="equipCode"
                value={equipmentInfo.equipCode}
                onChange={HandleChangeInput}
              />
            </Form.Item>
            <Form.Item label="장비명">
              <Input
                placeholder="장비명을 입력하세요."
                name="equipName"
                value={equipmentInfo.equipName}
                onChange={HandleChangeInput}
              />
            </Form.Item>
            <Form.Item label="장비 상태">
              <Select
                placeholder="장비 상태를 선택하세요."
                name="type"
                options={typeOptions}
                value={equipmentInfo.type}
                onChange={(value) => HandleChangeSelect("type", value)}
              />
            </Form.Item>
            <Form.Item label="장비 구매가">
              <Input
                placeholder="장비 구매가를 입력하세요."
                name="equipPrice"
                value={equipmentInfo.equipPrice}
                onChange={HandleChangeInput}
              />
            </Form.Item>
            <Form.Item label="장비 감가 상각">
              <Input
                placeholder="장비 감가 상각을 입력하세요."
                name="equipDepreciation"
                value={equipmentInfo.equipDepreciation}
                onChange={HandleChangeInput}
              />
            </Form.Item>
            <Form.Item label="장비 구매일">
              <DatePicker
                style={{ width: "100%" }}
                value={
                  equipmentInfo.equipPurchaseDate
                    ? dayjs(equipmentInfo.equipPurchaseDate)
                    : null
                }
                onChange={(date, dateString) =>
                  setEquipmentInfo((prev) => ({
                    ...prev,
                    equipPurchaseDate: dateString,
                  }))
                }
                format="YYYY-MM-DD"
              />
            </Form.Item>
            <Form.Item label="최근 점검일">
              <DatePicker
                style={{ width: "100%" }}
                value={
                  equipmentInfo.equipLastInspected
                    ? dayjs(equipmentInfo.equipLastInspected)
                    : null
                }
                onChange={(date, dateString) =>
                  setEquipmentInfo((prev) => ({
                    ...prev,
                    equipLastInspected: dateString,
                  }))
                }
                format="YYYY-MM-DD"
              />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }}>
              <div className="modal-form-button">
                {" "}
                <Button type="primary" htmlType="submit">
                  추가
                </Button>
                <Button onClick={HandleModalClose}>닫기</Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="장비 수정"
          open={isUpdateModalOpen}
          footer={null}
          onCancel={HandleUpdateModalClose}
        >
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onFinish={HandleUpdateEquipment}
          >
            <Form.Item label="장비 코드">
              {" "}
              <Input
                placeholder="장비 코드를 입력하세요."
                name="equipCode"
                value={updateEquipmentInfo.equipCode} // 상태 반영
                onChange={HandleUpdateChangeInput}
                readOnly
                //onChange={HandleChangeInput}
              />{" "}
            </Form.Item>
            <Form.Item label="장비명">
              {" "}
              <Input
                placeholder="장비명을 입력하세요."
                name="equipName"
                value={updateEquipmentInfo.equipName} // 상태 반영
                onChange={HandleUpdateChangeInput}
                //onChange={HandleChangeInput}
              />{" "}
            </Form.Item>
            <Form.Item label="장비 상태">
              <Select
                placeholder="장비 상태를 선택하세요."
                name="type"
                value={updateEquipmentInfo.type}
                options={typeOptions}
                onChange={(value) => HandleUpdateChangeSelect("type", value)}
              />
            </Form.Item>

            <Form.Item label="장비 구매가">
              <Input
                placeholder="장비 구매가를 입력하세요."
                name="equipPrice"
                value={updateEquipmentInfo.equipPrice}
                onChange={HandleUpdateChangeInput}
              />
            </Form.Item>

            <Form.Item label="장비 감가 상각">
              <Input
                placeholder="장비 감가 상각을 입력하세요."
                name="equipDepreciation"
                value={updateEquipmentInfo.equipDepreciation}
                onChange={HandleUpdateChangeInput}
              />
            </Form.Item>

            <Form.Item label="장비 구매일">
              <DatePicker
                style={{ width: "100%" }}
                value={
                  updateEquipmentInfo.equipPurchaseDate
                    ? dayjs(updateEquipmentInfo.equipPurchaseDate)
                    : null
                }
                onChange={(date, dateString) =>
                  setUpdateEquipmentInfo((prev) => ({
                    ...prev,
                    equipPurchaseDate: dateString,
                  }))
                }
                format="YYYY-MM-DD"
              />
            </Form.Item>

            <Form.Item label="최근 점검일">
              <DatePicker
                style={{ width: "100%" }}
                value={
                  updateEquipmentInfo.equipLastInspected
                    ? dayjs(updateEquipmentInfo.equipLastInspected)
                    : null
                }
                onChange={(date, dateString) =>
                  setUpdateEquipmentInfo((prev) => ({
                    ...prev,
                    equipLastInspected: dateString,
                  }))
                }
                format="YYYY-MM-DD"
              />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }}>
              <div className="modal-form-button">
                {" "}
                <Button type="primary" htmlType="submit">
                  수정
                </Button>
                <Button onClick={HandleUpdateModalClose}>닫기</Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default EquipmentPresenter;
