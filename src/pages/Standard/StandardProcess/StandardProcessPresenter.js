import { Button, Table, Modal, Form, Input, Select } from "antd";
import "./standardprocess.css";
import { SearchOutlined, UnorderedListOutlined } from "@ant-design/icons";

const StandardProcessPresenter = ({
  standardprocesses,
  equipments,
  HandleChangeInput,
  HandleChangeSelect,
  HandleCreateStandardProcess,
  HandleCreateModalOpen,
  HandleModalClose,
  isModalOpen,
  HandleUpdateModalClose,
  HandleUpdateStandardProcess,
  rowSelection,
  HandleRowClick,
  hasSelected,
  HandleDeleteStandardProcess,
  HandleDoubleClick,
  isUpdateModalOpen,
  updateStandardProcessInfo,
  HandleUpdateChangeInput,
  HandleUpdateChangeSelect,
  setSearchTerm,
  filteredStandardProcesses,
  isSearching,
  handleShowAll,
  searchTerm,
  standardprocessInfo,
  handleSearchStandardProcess,
}) => {
  const codeFilter = [
    ...new Set(
      standardprocesses.map((StandardProcess) => StandardProcess.spCode)
    ),
  ].map((code) => ({
    text: code,
    value: code,
  }));

  const nameFilter = [
    ...new Set(
      standardprocesses.map((StandardProcess) => StandardProcess.spName)
    ),
  ].map((name) => ({
    text: name,
    value: name,
  }));

  const timeFilter = [
    ...new Set(
      standardprocesses.map((StandardProcess) => StandardProcess.spTime)
    ),
  ].map((time) => ({
    text: time,
    value: time,
  }));

  const equipFiler = [
    ...new Set(
      standardprocesses.map(
        (StandardProcess) => StandardProcess.equipment.equipName
      )
    ),
  ].map((equipment) => ({
    text: equipment,
    value: equipment,
  }));

  const [form] = Form.useForm();

  const columns = [
    {
      title: "번호",
      key: "index",
      render: (text, record, index) => index + 1,
    },

    {
      title: "표준공정코드",
      dataIndex: "spCode",
      key: "spCode",
      filters: codeFilter,
      onFilter: (value, record) => record.StandardProcess === value,
    },
    {
      title: "표준공정명",
      dataIndex: "spName",
      key: "spName",
      filters: nameFilter,
      onFilter: (value, record) => record.StandardProcess === value,
    },
    {
      title: "표준공정시간",
      dataIndex: "spTime",
      key: "spTime",
      filters: timeFilter,
      onfilter: (value, record) => record.StandardProcess === value,
    },
    {
      title: "표준공정내용",
      dataIndex: "spDescription",
      key: "spDescription",
      ellipsis: true,
    },
    {
      title: "장비",
      dataIndex: ["equipment", "equipName"],
      key: "equipment",
      filters: equipFiler,
      onFilter: (value, record) => record.StandardProcess === value,
    },
  ];

  return (
    <>
      <div className="standardprocess-content">
        <div className="grid-func">
          <div className="standardprocess-list">표준공정 목록</div>
          <div className="func-button">
            <Button onClick={HandleCreateModalOpen}>추가</Button>
            <Button
              type="primary"
              danger
              disabled={!hasSelected}
              onClick={HandleDeleteStandardProcess}
            >
              삭제
            </Button>
          </div>
        </div>

        <div className="standardprocess-search">
          <Input
            placeholder="표준공정명 입력"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearchStandardProcess}
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
            }}
            rowClassName="clickable-row"
            rowSelection={rowSelection}
            columns={columns}
            dataSource={
              isSearching ? filteredStandardProcesses : standardprocesses
            }
            rowKey="spNo"
            onRow={(record) => ({
              onClick: () => HandleRowClick(record),
              onDoubleClick: () => {
                HandleDoubleClick(record);
              },
            })}
          />
        </div>

        <Modal
          title="표준공정 추가"
          open={isModalOpen}
          footer={null}
          onCancel={HandleModalClose}
        >
          <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onFinish={HandleCreateStandardProcess}
          >
            <Form.Item label="표준공정코드">
              <Input
                placeholder="표준공정코드를 입력하세요."
                name="spCode"
                value={standardprocessInfo.spCode}
                onChange={HandleChangeInput}
              />
            </Form.Item>

            <Form.Item label="표준공정명">
              <Input
                placeholder="표준공정명을 입력하세요."
                name="spName"
                value={standardprocessInfo.spName}
                onChange={HandleChangeInput}
              />
            </Form.Item>

            <Form.Item label="표준공정시간">
              <Input
                placeholder="표준공정시간을 입력하세요."
                name="spTime"
                value={standardprocessInfo.spTime}
                onChange={HandleChangeInput}
              />
            </Form.Item>

            <Form.Item label="표준공정내용">
              <Input
                placeholder="표준공정내용을 입력하세요."
                name="spDescription"
                value={standardprocessInfo.spDescription}
                onChange={HandleChangeInput}
              />
            </Form.Item>

            <Form.Item label="장비">
              <Select
                placeholder="장비를 선택해주세요"
                options={equipments.map((equipment) => ({
                  value: equipment.equipNo,
                  label: equipment.equipName,
                }))}
                onChange={(value) => HandleChangeSelect("equipNo", value)}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 24 }}>
              <div className="modal-form-button">
                <Button type="primary" htmlType="submit">
                  추가
                </Button>

                <Button onClick={HandleModalClose}>닫기</Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="표준공정 수정"
          open={isUpdateModalOpen}
          footer={null}
          onCancel={HandleUpdateModalClose}
        >
          <Form
            key={updateStandardProcessInfo.spNo}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onFinish={HandleUpdateStandardProcess}
            initialValues={updateStandardProcessInfo}
          >
            <Form.Item
              label="표준공정코드"
              name="spCode"
              value={updateStandardProcessInfo.spCode}
              onChange={HandleUpdateChangeInput}
            >
              <Input readOnly />
            </Form.Item>

            <Form.Item label="표준공정명" name="spName">
              <Input
                placeholder="표준공정명을 입력하세요."
                value={updateStandardProcessInfo.spName}
                onChange={HandleUpdateChangeInput}
              />
            </Form.Item>

            <Form.Item label="표준공정시간" name="spTime">
              <Input
                placeholder="표준공정시간을 입력하세요."
                value={updateStandardProcessInfo.spTime}
                onChange={HandleUpdateChangeInput}
              />
            </Form.Item>

            <Form.Item label="표준공정내용" name="spDescription">
              <Input
                placeholder="표준공정내용을 입력하세요."
                value={updateStandardProcessInfo.spDescription}
                onChange={HandleUpdateChangeInput}
              />
            </Form.Item>

            <Form.Item label="장비" name="spEquipment">
              <Select
                placeholder="장비를 선택해주세요"
                value={updateStandardProcessInfo.euqipNo}
                options={equipments.map((equipment) => ({
                  value: equipment.equipNo,
                  label: equipment.equipName,
                }))}
                onChange={(value) => HandleUpdateChangeSelect("equipNo", value)}
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

export default StandardProcessPresenter;
