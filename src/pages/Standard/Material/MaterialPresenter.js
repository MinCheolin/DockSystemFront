import { Button, Table, Modal, Form, Input } from "antd";
import { SearchOutlined, UnorderedListOutlined } from "@ant-design/icons";
import "./material.css";

const MaterialPresenter = ({
  materials,
  HandleChangeInput,
  HandleCreateMaterial,
  HandleCreateModalOpen,
  HandleModalClose,
  isModalOpen,
  selectedCategories,
  HandleCheckbox,
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

  const categories = {
    철강: ["형강", "합금판", "강판"],
    화학: ["페인트", "코팅제", "접착제", "윤활유"],
    "전기/전자": ["전선", "케이블", "센서"],
    "기계/엔진 부품": ["터반", "펌프", "밸브", "볼트"],
    "기타 자재": ["단열재", "고무", "유리", "감지기"],
  };

  const getCategoryByMaterial = (materialName) => {
    return Object.keys(categories).find((cat) =>
      categories[cat].some((keyword) => materialName.includes(keyword))
    );
  };

  const fileteredCategory = materials.filter((mat) =>
    selectedCategories.some((cat) =>
      categories[cat].some((keyword) => mat.materialName.includes(keyword))
    )
  );

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
            <Button onClick={HandleCreateModalOpen}>추가</Button>
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
            scroll={{ y: 200 }}
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

        <div className="category">
          <div>
            <h1>자재 카테고리</h1>
            {Object.keys(categories).map((cat) => (
              <div key={cat}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => HandleCheckbox(cat)}
                  />
                  {cat}
                </label>
              </div>
            ))}
          </div>
          <div className="category-list">
            <h1>선택된 자재 목록</h1>
            {selectedCategories.length > 0 ? (
              (() => {
                const renderedCategories = selectedCategories.map((cat) => {
                  const materialsInCategory = fileteredCategory.filter(
                    (mat) => getCategoryByMaterial(mat.materialName) === cat
                  );

                  if (materialsInCategory.length === 0) return null;

                  return (
                    <div key={cat} className="selected-category">
                      <h4>{cat}</h4>
                      <ul>
                        {materialsInCategory.map((mat) => (
                          <li key={mat.material_name}>{mat.materialName}</li>
                        ))}
                      </ul>
                    </div>
                  );
                });

                if (renderedCategories.every((el) => el === null)) {
                  return <p>선택된 자재가 없습니다</p>;
                }

                return renderedCategories;
              })()
            ) : (
              <p>선택된 자재가 없습니다</p>
            )}
          </div>
        </div>

        <Modal
          title="자재 추가"
          open={isModalOpen}
          footer={null}
          onCancel={HandleModalClose}
        >
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            onFinish={HandleCreateMaterial}
          >
            <Form.Item label="자재코드">
              {" "}
              <Input
                placeholder="자재 코드를 입력하세요."
                name="materialCode"
                value={materialInfo.materialCode}
                onChange={HandleChangeInput}
              />{" "}
            </Form.Item>
            <Form.Item label="자재명">
              {" "}
              <Input
                placeholder="자재 명을 입력하세요."
                name="materialName"
                value={materialInfo.materialName}
                onChange={HandleChangeInput}
              />{" "}
            </Form.Item>
            <Form.Item label="자재유형">
              {" "}
              <Input
                placeholder="자재 유형를 입력하세요."
                name="materialType"
                value={materialInfo.materialType}
                onChange={HandleChangeInput}
              />{" "}
            </Form.Item>
            <Form.Item label="자재규격">
              {" "}
              <Input
                placeholder="자재 규격을 입력하세요."
                name="materialSize"
                value={materialInfo.materialSize}
                onChange={HandleChangeInput}
              />{" "}
            </Form.Item>
            <Form.Item label="자재단가">
              {" "}
              <Input
                placeholder="자재 단가를 입력하세요."
                name="materialPrice"
                value={materialInfo.materialPrice}
                onChange={HandleChangeInput}
              />{" "}
            </Form.Item>
            <Form.Item label="자재단위">
              {" "}
              <Input
                placeholder="자재 단위를 입력하세요."
                name="materialUnit"
                value={materialInfo.materialUnit}
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
              {" "}
              <Input
                placeholder="자재 코드를 입력하세요."
                name="materialCode"
                value={updateMaterialInfo.materialCode}
                onChange={HandleUpdateChangeInput}
              />{" "}
            </Form.Item>
            <Form.Item label="자재명">
              {" "}
              <Input
                placeholder="자재 명을 입력하세요."
                name="materialName"
                value={updateMaterialInfo.materialName}
                onChange={HandleUpdateChangeInput}
              />{" "}
            </Form.Item>
            <Form.Item label="자재유형">
              {" "}
              <Input
                placeholder="자재 유형를 입력하세요."
                name="materialType"
                value={updateMaterialInfo.materialType}
                onChange={HandleUpdateChangeInput}
              />{" "}
            </Form.Item>
            <Form.Item label="자재규격">
              {" "}
              <Input
                placeholder="자재 규격을 입력하세요."
                name="materialSize"
                value={updateMaterialInfo.materialSize}
                onChange={HandleUpdateChangeInput}
              />{" "}
            </Form.Item>
            <Form.Item label="자재단가">
              {" "}
              <Input
                placeholder="자재 단가를 입력하세요."
                name="materialPrice"
                value={updateMaterialInfo.materialPrice}
                onChange={HandleUpdateChangeInput}
              />{" "}
            </Form.Item>
            <Form.Item label="자재단위">
              {" "}
              <Input
                placeholder="자재 단위를 입력하세요."
                name="materialUnit"
                value={updateMaterialInfo.materialUnit}
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

export default MaterialPresenter;
