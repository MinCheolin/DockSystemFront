import { Button, Table, Modal, Form, Input, Select } from "antd";
import { SearchOutlined, UnorderedListOutlined } from "@ant-design/icons";
import "./vessel.css";

const VesselPresenter = ({
  form,
  vessels,
  isModalOpen,
  isUpdateModalOpen,
  updateVesselInfo,
  hasSelected,
  rowSelection,
  searchTerm,
  isSearching,
  filteredVessels,
  HandleCreateVessel,
  HandleCreateModalOpen,
  HandleModalClose,
  HandleUpdateVessel,
  HandleUpdateModalClose,
  HandleUpdateChangeInput,
  HandleDeleteVessel,
  HandleRowClick,
  HandleDoubleClick,
  setSearchTerm,
  handleSearchVessel,
  handleShowAll,
}) => {
  const nameFilter = [
    ...new Set(vessels.map((vessel) => vessel.vesselName)),
  ].map((name) => ({
    text: name,
    value: name,
  }));
  const typeFilter = [
    ...new Set(vessels.map((vessel) => vessel.vesselType)),
  ].map((type) => ({
    text: type,
    value: type,
  }));
  const sizeFilter = [
    ...new Set(vessels.map((vessel) => vessel.vesselSize)),
  ].map((size) => ({
    text: size,
    value: size,
  }));

  const columns = [
    {
      title: "번호",
      key: "index",
      render: (text, record, index) => index + 1,
    },

    {
      title: "선박명",
      dataIndex: "vesselName",
      key: "name",
      filters: nameFilter,
      onFilter: (value, record) => record.vesselName === value,
    },
    {
      title: "선박종류",
      dataIndex: "vesselType",
      key: "Type",
      filters: typeFilter,
      onFilter: (value, record) => record.vesselType === value,
    },
    {
      title: "선박크기",
      dataIndex: "vesselSize",
      key: "Size",
      filters: sizeFilter,
      onFilter: (value, record) => record.vesselSize === value,
    },
  ];

  return (
    <>
      <div className="vessel-content">
        <div className="grid-func">
          <div className="vessel-list">선박 목록</div>
          <div className="func-button">
            <Button onClick={HandleCreateModalOpen}>추가</Button>
            <Button
              type="primary"
              danger
              disabled={!hasSelected}
              onClick={HandleDeleteVessel}
            >
              삭제
            </Button>
          </div>
        </div>
        <div className="vessel-search">
          <Input
            placeholder="선박명 입력"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearchVessel}
          ></Button>
          <Button
            icon={<UnorderedListOutlined />}
            onClick={handleShowAll}
          ></Button>
        </div>
        <div className="grid-box">
          <Table
            size="small"
            pagination={{
              pageSize: 13,
              position: ["bottomCenter"],
            }}
            rowClassName="clickable-row"
            rowSelection={rowSelection}
            columns={columns}
            dataSource={isSearching ? filteredVessels : vessels}
            rowKey="vesselNo"
            onRow={(record) => ({
              onClick: () => HandleRowClick(record),
              onDoubleClick: () => {
                HandleDoubleClick(record);
              },
            })}
          />
        </div>

        <Modal
          title="선박 추가"
          open={isModalOpen}
          footer={null}
          onCancel={HandleModalClose}
        >
          <Form
            form={form}
            onFinish={HandleCreateVessel}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            validateTrigger="onBlur"
          >
            {/* <Form.Item label="선박명">   <Input placeholder="선박명을 입력하세요." name="vesselName" onChange={HandleChangeInput} /> </Form.Item>
      <Form.Item label="선박종류">   <Input placeholder="선박 종류를 입력하세요." name="vesselType" onChange={HandleChangeInput} /> </Form.Item>
      <Form.Item label="선박크기">   <Input placeholder="선박 크기를 입력하세요." name="vesselSize" onChange={HandleChangeInput} /> </Form.Item> */}
            <Form.Item
              label="선박명"
              name="vesselName"
              rules={[{ required: true, message: "선박명을 입력하세요!" }]}
            >
              <Input placeholder="선박명을 입력하세요." />
            </Form.Item>
            <Form.Item
              label="선박종류"
              name="vesselType"
              rules={[{ required: true, message: "선박 종류를 입력하세요!" }]}
            >
              <Input placeholder="선박 종류를 입력하세요." />
            </Form.Item>
            <Form.Item
              label="선박크기"
              name="vesselSize"
              rules={[{ required: true, message: "선박 크기를 입력하세요!" }]}
            >
              <Input placeholder="선박 크기를 입력하세요." />
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
          title="선박 수정"
          open={isUpdateModalOpen}
          footer={null}
          onCancel={HandleUpdateModalClose}
        >
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            onFinish={HandleUpdateVessel}
          >
            <Form.Item label="선박명">
              {" "}
              <Input
                placeholder="선박명을 입력하세요."
                name="vesselName"
                value={updateVesselInfo.vesselName}
                onChange={HandleUpdateChangeInput}
              />{" "}
            </Form.Item>
            <Form.Item label="선박종류">
              {" "}
              <Input
                placeholder="선박 종류를 입력하세요."
                name="vesselType"
                value={updateVesselInfo.vesselType}
                onChange={HandleUpdateChangeInput}
              />{" "}
            </Form.Item>
            <Form.Item label="선박크기">
              {" "}
              <Input
                placeholder="선박 크기를 입력하세요."
                name="vesselSize"
                value={updateVesselInfo.vesselSize}
                onChange={HandleUpdateChangeInput}
              />{" "}
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

export default VesselPresenter;
