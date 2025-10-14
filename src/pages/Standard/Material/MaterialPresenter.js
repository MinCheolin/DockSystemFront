import { Button, Table, Modal, Form, Input, Select, InputNumber } from "antd";
import { SearchOutlined, UnorderedListOutlined } from "@ant-design/icons";
import "./material.css";

const MaterialPresenter = ({
  materials,
  HandleChangeInput,
  HandleCreateMaterial,
  HandleChangeModalStatus,
  isModalOpen,
  HandleUpdateModalClose,
  handleSearchMaterial,
  HandleUpdateMaterial,
  rowSelection,
  HandleRowClick,
  hasSelected,
  HandleDeleteMaterial,
  HandleDoubleClick,
  isUpdateModalOpen,
  setSearchTerm,
  handleShowAll,
  updateMaterialInfo,
  HandleUpdateChangeInput,
  filteredMaterials,
  searchTerm,
  isSearching,
  materialInfo,
}) => {
  const [form] = Form.useForm();
  const typeOpt = [
    { value: "철강", label: "철강" },
    { value: "화학", label: "화학" },
    { value: "전기/전자", label: "전기/전자" },
    { value: "기계/엔진 부품", label: "기계/엔진 부품" },
    { value: "기타 자재", label: "기타 자재" },
  ];
  const codeFilter = [
    ...new Set(materials.map((material) => material.materialCode)),
  ].map((code) => ({
    text: code,
    value: code,
  }));
  const nameFilter = [
    ...new Set(materials.map((material) => material.materialName)),
  ].map((name) => ({
    text: name,
    value: name,
  }));
  const typeFilter = [
    ...new Set(materials.map((material) => material.materialType)),
  ].map((type) => ({
    text: type,
    value: type,
  }));
  const sizeFilter = [
    ...new Set(materials.map((material) => material.materialSize)),
  ].map((size) => ({
    text: size,
    value: size,
  }));
  const priceFilter = [
    ...new Set(materials.map((material) => material.materialPrice)),
  ].map((price) => ({
    text: price,
    value: price,
  }));
  const unitFilter = [
    ...new Set(materials.map((material) => material.materialUnit)),
  ].map((unit) => ({
    text: unit,
    value: unit,
  }));

  const columns = [
    {
      title: "번호",
      key: "index",
      render: (text, record, index) => index + 1,
    },

    {
      title: "자재코드",
      dataIndex: "materialCode",
      key: "Code",
      filters: codeFilter,
      onFilter: (value, record) => record.materialCode === value,
    },
    {
      title: "자재명",
      dataIndex: "materialName",
      key: "Name",
      filters: nameFilter,
      onFilter: (value, record) => record.materialName === value,
    },
    {
      title: "자재유형",
      dataIndex: "materialType",
      key: "Type",
      filters: typeFilter,
      onFilter: (value, record) => record.materialType === value,
    },
    {
      title: "자재규격",
      dataIndex: "materialSize",
      key: "Size",
      filters: sizeFilter,
      onFilter: (value, record) => record.materialSize === value,
    },
    {
      title: "자재단가",
      dataIndex: "materialPrice",
      key: "Price",
      filters: priceFilter,
      onFilter: (value, record) => record.materialPrice === value,
    },
    {
      title: "자재단위",
      dataIndex: "materialUnit",
      key: "Unit",
      filters: unitFilter,
      onFilter: (value, record) => record.materialUnit === value,
    },
  ];

  return (
    <>
      <div className="material-content">
        <div className="grid-func">
          <div className="material-list">자재 목록</div>
          <div className="func-button">
            <Button onClick={HandleChangeModalStatus}>추가</Button>
            <Button
              type="primary"
              danger
              disabled={!hasSelected}
              onClick={HandleDeleteMaterial}
            >
              삭제
            </Button>
          </div>
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
            rowSelection={rowSelection}
            columns={columns}
            dataSource={isSearching ? filteredMaterials : materials}
            rowKey="materialNo"
            onRow={(record) => ({
              onClick: () => HandleRowClick(record),
              onDoubleClick: () => {
                HandleDoubleClick(record);
              },
            })}
          />
        </div>

        <Modal
          title="자재 추가"
          open={isModalOpen}
          footer={null}
          onCancel={HandleChangeModalStatus}
          afterClose={() => form.resetFields()}
        >
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            onFinish={HandleCreateMaterial}
          >
            <Form.Item label="자재코드">
              <Input
                placeholder="자재 코드를 입력하세요."
                value={materialInfo.materialCode}
                onChange={(e) =>
                  HandleChangeInput("materialCode", e.target.value)
                }
              />
            </Form.Item>
            <Form.Item label="자재명">
              <Input
                placeholder="자재 명을 입력하세요."
                value={materialInfo.materialName}
                onChange={(e) =>
                  HandleChangeInput("materialName", e.target.value)
                }
              />
            </Form.Item>
            <Form.Item label="자재유형">
              <Select
                placeholder="자재 유형를 입력하세요."
                options={typeOpt}
                onChange={(value) => HandleChangeInput("materialType", value)}
              />
            </Form.Item>
            <Form.Item label="자재규격">
              <Input
                placeholder="자재 규격을 입력하세요."
                value={materialInfo.materialSize}
                onChange={(e) =>
                  HandleChangeInput("materialSize", e.target.value)
                }
              />
            </Form.Item>
            <Form.Item label="자재단가">
              <InputNumber
                style={{ width: 393 }}
                placeholder="자재 단가를 입력하세요."
                value={materialInfo.materialPrice}
                min={1}
                onChange={(value) => HandleChangeInput("materialPrice", value)}
              />
            </Form.Item>
            <Form.Item label="자재단위">
              <Input
                placeholder="자재 단위를 입력하세요."
                value={materialInfo.materialUnit}
                onChange={(e) =>
                  HandleChangeInput("materialUnit", e.target.value)
                }
              />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }}>
              <div className="modal-form-button">
                <Button type="primary" htmlType="submit">
                  추가
                </Button>
                <Button onClick={HandleChangeModalStatus}>닫기</Button>
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
            onFinish={HandleUpdateMaterial}
          >
            <Form.Item label="자재코드">
              <Input
                placeholder="자재 코드를 입력하세요."
                value={updateMaterialInfo.materialCode}
                onChange={(e) =>
                  HandleUpdateChangeInput("materialCode", e.target.value)
                }
              />
            </Form.Item>
            <Form.Item label="자재명">
              <Input
                placeholder="자재 명을 입력하세요."
                value={updateMaterialInfo.materialName}
                onChange={(e) =>
                  HandleUpdateChangeInput("materialName", e.target.value)
                }
              />
            </Form.Item>
            <Form.Item label="자재유형">
              <Select
                placeholder="자재 유형를 입력하세요."
                options={typeOpt}
                value={updateMaterialInfo.materialType}
                onChange={(value) =>
                  HandleUpdateChangeInput("materialType", value)
                }
              />
            </Form.Item>
            <Form.Item label="자재규격">
              <Input
                placeholder="자재 규격을 입력하세요."
                value={updateMaterialInfo.materialSize}
                onChange={(e) =>
                  HandleUpdateChangeInput("materialSize", e.target.value)
                }
              />
            </Form.Item>
            <Form.Item label="자재단가">
              <InputNumber
                style={{ width: 393 }}
                placeholder="자재 단가를 입력하세요."
                value={updateMaterialInfo.materialPrice}
                onChange={(value) =>
                  HandleUpdateChangeInput("materialPrice", value)
                }
              />
            </Form.Item>
            <Form.Item label="자재단위">
              <Input
                placeholder="자재 단위를 입력하세요."
                value={updateMaterialInfo.materialUnit}
                onChange={(e) =>
                  HandleUpdateChangeInput("materialUnit", e.target.value)
                }
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

export default MaterialPresenter;
