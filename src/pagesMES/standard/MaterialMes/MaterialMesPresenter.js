import { Button, Table, Input } from "antd";
import { SearchOutlined, UnorderedListOutlined } from "@ant-design/icons";
import "./MaterialMes.css";

const EquipmentMesPresenter = ({
  materials,
  searchTerm,
  setSearchTerm,
  filteredMaterials,
  isSearching,
  handleSearchMaterial,
  selectedCategories,
  HandleCheckbox,
  handleShowAll,
}) => {
  const nameFilter = [
    ...new Set(materials.map((material) => material.materialName)),
  ].map((name) => ({
    text: name,
    value: name,
  }));

  const columns = [
    { title: "번호", key: "index", render: (text, record, index) => index + 1 },
    { title: "자재 코드", dataIndex: "materialCode", key: "materialCode" },
    {
      title: "자재명",
      dataIndex: "materialName",
      key: "materialName",
      filters: nameFilter,
      onFilter: (value, record) => record.materialName === value,
    },
  ];

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

  return (
    <>
      <div className="material-content">
        <div className="grid-func">
          <div className="material-list">자재 목록</div>
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
            columns={columns}
            dataSource={isSearching ? filteredMaterials : materials}
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
      </div>
    </>
  );
};
export default EquipmentMesPresenter;
