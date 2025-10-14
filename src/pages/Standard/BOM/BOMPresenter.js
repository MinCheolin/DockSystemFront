import "./bom.css";
import { Button, Table, Modal, Form, Select, Input, InputNumber } from "antd";

import {
  MinusCircleOutlined,
  PlusOutlined,
  CloseOutlined,
  SearchOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

const BOMPresenter = ({
  typeValue,
  setTypeValue,
  HandleCreateModalOpen,
  hasSelected,
  HandleDoubleClickBOM,
  HandleDoubleClickBOMDetail,
  searchTerm,
  setSearchTerm,
  filteredBoms,
  isSearching,
  handleSearchBom,
  handleShowAll,
  rowSelection,
  boms,
  bomdetails,
  vessels,
  materials,
  standardProcesses,
  filteredVessels,
  filteredStandardProcesses,
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
  HandleVesselSearch,
  HandleSpSearch,
}) => {
  const [form] = Form.useForm();
  const typeOpt = [
    { value: "철강", label: "철강" },
    { value: "화학", label: "화학" },
    { value: "전기/전자", label: "전기/전자" },
    { value: "기계/엔진 부품", label: "기계/엔진 부품" },
    { value: "기타 자재", label: "기타 자재" },
  ];
  const vesselFilter = [
    ...new Set(boms.map((bom) => bom.vessel.vesselName)),
  ].map((name) => ({
    text: name,
    value: name,
  }));

  const BomColumns = [
    { title: "번호", key: "index", render: (text, record, index) => index + 1 },
    {
      title: "선박명",
      dataIndex: ["vessel", "vesselName"],
      key: "vessel",
      filters: vesselFilter,
      onFilter: (value, record) => record.vessel.vesselName === value,
    },
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

      <div className="bom-search">
        <Input
          placeholder="선박 입력"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          type="primary"
          icon={<SearchOutlined />}
          onClick={handleSearchBom}
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
          rowSelection={rowSelection}
          columns={BomColumns}
          dataSource={isSearching ? filteredBoms : boms}
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
        width={650}
        title="BOM 추가"
        open={isModalOpen}
        footer={null}
        onCancel={HandleModalClose}
        afterClose={() => form.resetFields()}
      >
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 20 }}
          onFinish={HandleCreateBom}
        >
          <Form.Item label="선박명" name="vesselName">
            <Select
              showSearch
              placeholder="선박을 선택하세요."
              options={filteredVessels.map((v) => ({
                value: v.vesselNo,
                label: v.vesselName,
              }))}
              onChange={(value) => HandleChangeSelectBom("vesselNo", value)}
              onSearch={HandleVesselSearch}
              optionFilterProp="label"
              filterOption={false}
              notFoundContent="일치하는 항목이 없습니다"
              onInputKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
            />
          </Form.Item>
          <Form.Item label="표준 공정명" name="spName">
            <Select
              showSearch
              placeholder="표준 공정을 선택하세요."
              options={filteredStandardProcesses.map((sp) => ({
                value: sp.spNo,
                label: sp.spName,
              }))}
              onChange={(value) => HandleChangeSelectBom("spNo", value)}
              onSearch={HandleSpSearch}
              optionFilterProp="label"
              filterOption={false}
              notFoundContent="일치하는 항목이 없습니다"
              onInputKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
            />
          </Form.Item>
          <p>
            <b>BOM 상세 항목</b>
          </p>
          <Form.List name="bomDetailDtoList" initialValue={[{}]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <div className="bomDetailInput" key={field.key}>
                    <label>자재 유형 : </label>
                    <Select
                      options={typeOpt}
                      onChange={(value) => setTypeValue(value)}
                      placeholder="유형을 선택하세요."
                      style={{ width: 120 }}
                    />
                    <label>자재명:</label>
                    <Form.Item name={[field.name, "materialName"]}>
                      <Select
                        disabled={!typeValue}
                        style={{ width: 170 }}
                        placeholder="자재를 선택하세요."
                        options={materials
                          .filter(
                            (material) => material.materialType === typeValue
                          )
                          .map((material) => ({
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
                    <label>자재 수량:</label>
                    <Form.Item name={[field.name, "bomDetailCount"]}>
                      <InputNumber
                        disabled={!typeValue}
                        style={{ width: 60 }}
                        placeholder="수량"
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

                    {fields.length > 1 ? (
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    ) : (
                      ""
                    )}
                  </div>
                ))}
                <div className="addButtonWrapper">
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    자재 추가
                  </Button>
                </div>
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
