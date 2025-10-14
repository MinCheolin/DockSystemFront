import { Button, Table, Modal, Form, Input } from "antd";
import { SearchOutlined, UnorderedListOutlined } from "@ant-design/icons";
import "./Customer.css";

const CustomerPresenter = ({
  customers,
  HandleChangeInput,
  HandleCreateCustomer,
  HandleCreateModalOpen,
  HandleModalClose,
  isModalOpen,
  HandleUpdateModalClose,
  handleSearchCustomer,
  HandleUpdateCustomer,
  rowSelection,
  HandleRowClick,
  hasSelected,
  HandleDeleteCustomer,
  HandleDoubleClick,
  isUpdateModalOpen,
  setSearchTerm,
  handleShowAll,
  updateCustomerInfo,
  HandleUpdateChangeInput,
  filteredCustomers,
  searchTerm,
  isSearching,
  customerInfo,
}) => {
  const nameFilter = [
    ...new Set(customers.map((customer) => customer.customerName)),
  ].map((name) => ({
    text: name,
    value: name,
  }));

  const ceoFilter = [
    ...new Set(customers.map((customer) => customer.customerCeo)),
  ].map((ceo) => ({
    text: ceo,
    value: ceo,
  }));

  const managerFilter = [
    ...new Set(customers.map((customer) => customer.customerManager)),
  ].map((manager) => ({
    text: manager,
    value: manager,
  }));

  const columns = [
    { title: "번호", key: "index", render: (text, record, index) => index + 1 },
    {
      title: "고객사명",
      dataIndex: "customerName",
      key: "customerName",
      filters: nameFilter,
      onFilter: (value, record) => record.customerName === value,
    },
    { title: "사업자 등록 번호", dataIndex: "customerBrn", key: "customerBrn" },
    {
      title: "대표명",
      dataIndex: "customerCeo",
      key: "customerCeo",
      filters: ceoFilter,
      onFilter: (value, record) => record.customerCeo === value,
    },
    {
      title: "담당자명",
      dataIndex: "customerManager",
      key: "customerManager",
      filters: managerFilter,
      onFilter: (value, record) => record.customerManager === value,
    },
    { title: "연락처", dataIndex: "customerPhone", key: "customerPhone" },
  ];

  return (
    <>
      <div className="customer-content">
        <div className="grid-func">
          <div className="customer-list">고객사 목록</div>
          <div className="func-button">
            <Button onClick={HandleCreateModalOpen}>추가</Button>
            <Button
              type="primary"
              danger
              disabled={!hasSelected}
              onClick={HandleDeleteCustomer}
            >
              삭제
            </Button>
          </div>
        </div>

        <div className="customer-search">
          <Input
            placeholder="고객사명 입력"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearchCustomer}
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
            dataSource={isSearching ? filteredCustomers : customers}
            rowKey="customerNo"
            onRow={(record) => ({
              onClick: () => HandleRowClick(record),
              onDoubleClick: () => {
                HandleDoubleClick(record);
              },
            })}
          />
        </div>

        <Modal
          title="고객사 추가"
          open={isModalOpen}
          footer={null}
          onCancel={HandleModalClose}
        >
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onFinish={HandleCreateCustomer}
          >
            <Form.Item label="고객사명">
              <Input
                placeholder="고객사명을 입력하세요."
                name="customerName"
                value={customerInfo.customerName}
                onChange={HandleChangeInput}
              />
            </Form.Item>
            <Form.Item label="사업자 등록 번호">
              <Input
                placeholder="사업자 등록 번호를 입력하세요."
                name="customerBrn"
                value={customerInfo.customerBrn}
                onChange={HandleChangeInput}
              />
            </Form.Item>
            <Form.Item label="대표명">
              <Input
                placeholder="대표명을 입력하세요."
                name="customerCeo"
                value={customerInfo.customerCeo}
                onChange={HandleChangeInput}
              />
            </Form.Item>
            <Form.Item label="담당자명">
              <Input
                placeholder="담당자명을 입력하세요."
                name="customerManager"
                value={customerInfo.customerManager}
                onChange={HandleChangeInput}
              />
            </Form.Item>
            <Form.Item label="연락처">
              <Input
                placeholder="연락처를 입력하세요."
                name="customerPhone"
                value={customerInfo.customerPhone}
                onChange={HandleChangeInput}
              />{" "}
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
          title="고객사 수정"
          open={isUpdateModalOpen}
          footer={null}
          onCancel={HandleUpdateModalClose}
        >
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onFinish={HandleUpdateCustomer}
          >
            <Form.Item label="고객사명">
              <Input
                placeholder="고객사명을 입력하세요."
                name="customerName"
                value={updateCustomerInfo.customerName}
                onChange={HandleUpdateChangeInput}
              />
            </Form.Item>
            <Form.Item label="사업자 등록 번호">
              <Input
                placeholder="사업자 등록 번호를 입력하세요."
                name="customerBrn"
                value={updateCustomerInfo.customerBrn}
                onChange={HandleUpdateChangeInput}
                readOnly
              />
            </Form.Item>

            <Form.Item label="대표명">
              <Input
                placeholder="대표명을 입력하세요."
                name="customerCeo"
                value={updateCustomerInfo.customerCeo}
                onChange={HandleUpdateChangeInput}
              />
            </Form.Item>

            <Form.Item label="담당자명">
              <Input
                placeholder="담당자명을 입력하세요."
                name="customerManager"
                value={updateCustomerInfo.customerManager}
                onChange={HandleUpdateChangeInput}
              />
            </Form.Item>

            <Form.Item label="연락처">
              <Input
                placeholder="연락처를 입력하세요."
                name="customerPhone"
                value={updateCustomerInfo.customerPhone}
                onChange={HandleUpdateChangeInput}
              />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }}>
              <div className="modal-form-button">
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

export default CustomerPresenter;
