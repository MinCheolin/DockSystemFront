import { Button, Table, Input } from "antd";
import { SearchOutlined, UnorderedListOutlined } from "@ant-design/icons";
import "./EquipmentMes.css";

const EquipmentMesPresenter = ({
  equipments,
  searchTerm,
  setSearchTerm,
  filteredEquipments,
  isSearching,
  handleSearchEquipment,
  handleShowAll,
  HandleCheckbox,
  selectedCategories,
}) => {
  const nameFilter = [
    ...new Set(equipments.map((equipment) => equipment.equipName)),
  ].map((name) => ({
    text: name,
    value: name,
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
    { title: "장비 상태", dataIndex: "type", key: "type" },
  ];

  const categories = {
    "절단 장비": ["절단기"],
    "성형/가공": ["벤딩", "프레스", "그라인더"],
    "용접 장비": ["용접"],
    "크레인/운반": ["크레인", "트랜스포터", "지게차"],
    "도장/표면 처리": ["블라스팅", "스프레이", "도장"],
    "설비/인프라": ["환기", "모니터링", "케이블"],
    "엔진/발전": ["엔진", "발전기"],
    "펌프/유압": ["펌프", "압축기"],
    "항해/제어": ["항해", "GPS"],
  };

  const getCategoryByEquip = (equipName) => {
    return Object.keys(categories).find((cat) =>
      categories[cat].some((keyword) => equipName.includes(keyword))
    );
  };

  return (
    <>
      <div className="equipment-content">
        <div className="grid-func">
          <div className="equipment-list">장비 목록</div>
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
            scroll={{ y: 200 }}
            pagination={false}
            rowClassName="clickable-row"
            columns={columns}
            dataSource={isSearching ? filteredEquipments : equipments}
          />
        </div>
        <div className="category">
          <div>
            <h1>장비 카테고리</h1>
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
            <h1>선택된 장비 목록</h1>
            {selectedCategories.length > 0 ? (
              (() => {
                // 모든 선택된 카테고리에서 장비를 모음
                const renderedCategories = selectedCategories.map((cat) => {
                  const equipmentInCategory = equipments.filter(
                    (eq) => getCategoryByEquip(eq.equipName) === cat
                  );

                  if (equipmentInCategory.length === 0) return null;

                  return (
                    <div key={cat} className="selected-category">
                      <h4>{cat}</h4>
                      <ul>
                        {equipmentInCategory.map((eq) => (
                          <li key={eq.equip_No}>{eq.equipName}</li>
                        ))}
                      </ul>
                    </div>
                  );
                });

                if (renderedCategories.every((el) => el === null)) {
                  return <p>선택된 장비가 없습니다</p>;
                }

                return renderedCategories;
              })()
            ) : (
              <p>선택된 장비가 없습니다</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default EquipmentMesPresenter;
