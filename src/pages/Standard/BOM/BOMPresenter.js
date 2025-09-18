import "./bom.css";
import { Button, Table, Modal, Form, Select, Space, InputNumber } from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const BOMPresenter = ({
  HandleCreateModalOpen,
  hasSelected,
  HandleDoubleClickBOM,
  HandleDoubleClickBOMDetail,
  rowSelection,
  boms,
  bomdetails,
  vessels,
  materials,
  standardProcesses,
  HandleRowClick,
  isModalOpen,
  HandleModalClose,
  HandleCreateBom,
  HandleUpdateBom,
  HandleDeleteBom,
  HandleChangeInputBomDetail,
  HandleChangeSelectBom,
  HandleChangeSelectBomDetail,
  HandleDeleteBomDetail,
  HandleUpdateBomDetail,
  isUpdateBomModalOpen,
  isUpdateBomDetailModalOpen,
  HandleUpdateBomModalClose,
  HandleUpdateBomDetailModalClose,
  HandleUpdateChangeSelectBom,
  HandleUpdateChangeSelectBomDetail,
  HandleUpdateChangeInputBomDetail,
  updateBomInfo,
  updateBomDetailInfo,
}) => {
  const [form] = Form.useForm();

  const BomColumns = [
    { title: "번호", key: "index", render: (text, record, index) => index + 1 },
    { title: "선박명", dataIndex: ["vessel", "vesselName"], key: "vessel" },
    {
      title: "표준 공정명",
      dataIndex: ["standardProcess", "spName"],
      key: "spName",
    },
    {
      title: "장비명",
      dataIndex: ["standardProcess", "spEquipment"],
      key: "spEquipment",
    },
  ];

  const BomDetailsColumns = [
    { title: "번호", key: "index", render: (text, record, index) => index + 1 },
    {
      title: "자재 코드",
      dataIndex: ["material", "materialCode"],
      key: "materialCode",
    },
    {
      title: "자재명",
      dataIndex: ["material", "materialName"],
      key: "materialName",
    },
    { title: "자재 수량", dataIndex: "bomDetailCount", key: "bomDetailCount" },
    {
      title: "",
      key: "bomDetailDelete",
      render: (text, record) => (
        <CloseOutlined
          onClick={() => HandleDeleteBomDetail(record.bomDetailNo)}
        />
      ),
    },
  ];

  const bomDetailRowRender = (record) => {
    const details = bomdetails.filter(
      (detail) => detail.bom.bomNo === record.bomNo
    );

    return (
      <Table
        columns={BomDetailsColumns}
        dataSource={details}
        pagination={false}
        rowKey="bomDetailNo"
        onRow={(record) => ({
          onClick: () => HandleRowClick(record),
          onDoubleClick: () => {
            HandleDoubleClickBOMDetail(record);
          },
        })}
      />
    );
  };

  return (
    <div className="bom-content">
      <div className="grid-func">
        <div className="user-list">BOM 목록</div>
        <div className="func-button">
          <Button onClick={HandleCreateModalOpen}>추가</Button>
          <Button
            type="primary"
            danger
            disabled={!hasSelected}
            onClick={HandleDeleteBom}
          >
            삭제
          </Button>
        </div>
      </div>

      <div className="grid-box">
        <Table
          size="small"
          pagination={false}
          rowSelection={rowSelection}
          columns={BomColumns}
          dataSource={boms}
          rowKey="bomNo"
          expandable={{
            expandedRowRender: bomDetailRowRender,
            defaultExpandedRowKeys: [],
          }}
          onRow={(record) => ({
            onClick: () => HandleRowClick(record),
            onDoubleClick: () => {
              HandleDoubleClickBOM(record);
            },
          })}
        />
      </div>
      <Modal
        title="BOM 추가"
        open={isModalOpen}
        footer={null}
        onCancel={HandleModalClose}
        afterClose={() => form.resetFields()}
      >
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          onFinish={HandleCreateBom}
        >
          <Form.Item label="선박명" name="vesselName">
            <Select
              placeholder="선박을 선택하세요."
              options={vessels.map((vessel) => ({
                value: vessel.vesselNo,
                label: vessel.vesselName,
              }))}
              onChange={(value) => HandleChangeSelectBom("vesselNo", value)}
            />
          </Form.Item>
          <Form.Item label="표준 공정명" name="spName">
            <Select
              placeholder="표준 공정을 선택하세요."
              options={standardProcesses.map((sp) => ({
                value: sp.spNo,
                label: sp.spName,
              }))}
              onChange={(value) => HandleChangeSelectBom("spNo", value)}
            />
          </Form.Item>
          <p>
            <b>BOM 상세 항목</b>
          </p>
          <Form.List name="bomDetailDtoList" initialValue={[{}]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <Space key={field.key} align="baseline">
                    <Form.Item
                      label="자재명"
                      name={[field.name, "materialName"]}
                      labelCol={{ span: 10 }}
                      wrapperCol={{ span: 14 }}
                    >
                      <Select
                        placeholder="자재를 선택하세요."
                        options={materials.map((material) => ({
                          value: material.materialNo,
                          label: material.materialName,
                        }))}
                        onChange={(value) =>
                          HandleChangeSelectBomDetail(
                            index,
                            "materialNo",
                            value
                          )
                        }
                      />
                    </Form.Item>
                    <Form.Item
                      label="자재 수량"
                      name={[field.name, "bomDetailCount"]}
                      labelCol={{ span: 10 }}
                      wrapperCol={{ span: 14 }}
                    >
                      <InputNumber
                        placeholder="자재 수량을 입력하세요"
                        onChange={(value) =>
                          HandleChangeInputBomDetail(
                            index,
                            "bomDetailCount",
                            value
                          )
                        }
                        min={1}
                      />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  자재 추가
                </Button>
              </>
            )}
          </Form.List>

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
        title="BOM 수정"
        open={isUpdateBomModalOpen}
        footer={null}
        onCancel={HandleUpdateBomModalClose}
      >
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          onFinish={HandleUpdateBom}
        >
          <Form.Item label="선박명">
            <Select
              placeholder="선박을 선택하세요."
              value={updateBomInfo.vesselNo}
              options={vessels.map((vessel) => ({
                value: vessel.vesselNo,
                label: vessel.vesselName,
              }))}
              onChange={(value) =>
                HandleUpdateChangeSelectBom("vesselNo", value)
              }
            />
          </Form.Item>

          <Form.Item label="표준 공정명">
            <Select
              placeholder="표준 공정을 선택하세요."
              value={updateBomInfo.spNo}
              options={standardProcesses.map((sp) => ({
                value: sp.spNo,
                label: sp.spName,
              }))}
              onChange={(value) => HandleUpdateChangeSelectBom("spNo", value)}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <div className="modal-form-button">
              <Button type="primary" htmlType="submit">
                수정
              </Button>
              <Button onClick={HandleUpdateBomModalClose}>닫기</Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="BOM Detail 수정"
        open={isUpdateBomDetailModalOpen}
        footer={null}
        onCancel={HandleUpdateBomDetailModalClose}
      >
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          onFinish={HandleUpdateBomDetail}
        >
          <Form.Item label="자재명">
            <Select
              placeholder="자재를 선택하세요."
              value={updateBomDetailInfo.materialNo}
              options={materials.map((material) => ({
                value: material.materialNo,
                label: material.materialName,
              }))}
              onChange={(value) =>
                HandleUpdateChangeSelectBomDetail("materialNo", value)
              }
            />
          </Form.Item>

          <Form.Item label="자재 수량">
            <InputNumber
              placeholder="자재 수량을 입력하세요."
              value={updateBomDetailInfo.bomDetailCount}
              onChange={(value) =>
                HandleUpdateChangeInputBomDetail("bomDetailCount", value)
              }
              min={1}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <div className="modal-form-button">
              <Button type="primary" htmlType="submit">
                수정
              </Button>
              <Button onClick={HandleUpdateBomDetailModalClose}>닫기</Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BOMPresenter;
