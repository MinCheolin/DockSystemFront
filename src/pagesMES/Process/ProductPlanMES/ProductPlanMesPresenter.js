import { Button, Table } from "antd";
import dayjs from "dayjs";
import "./productPlanMes.css";

const columns = [
  {
    title: "번호",
    key: "index",
    render: (text, record, index) => index + 1,
  },
  {
    title: "생산 계획명",
    dataIndex: "ppName",
    key: "name",
  },
  {
    title: "기간",
    render: (_, record) => {
      const start = dayjs(record.startDate).format("YYYY-MM-DD");
      const end = dayjs(record.endDate).format("YYYY-MM-DD");
      return `${start} ~ ${end}`;
    },
    key: "period",
  },
  {
    title: "공정명",
    dataIndex: ["bom", "standardProcess", "spName"],
    key: "spName",
  },
  {
    title: "선박명",
    dataIndex: ["bom", "vessel", "vesselName"],
    key: "bom",
  },
  {
    title: "임시버튼",
    key: "action",
    render: (_, record) => (
      <Button
        type="primary"
        onClick={() => {
          console.log("수정할 데이터:", record);
        }}
      >
        공정 추가{" "}
      </Button>
    ),
  },
];

const ProductPlanMesPresenter = ({ productplans }) => {
  return (
    <div className="productPlan-content">
      <div className="grid-func">
        <div className="productPlan-list">생산 계획 목록</div>
        <div className="func-button"></div>
      </div>
      <div className="grid-box">
        <Table
          size="small"
          pagination={false}
          dataSource={productplans}
          columns={columns}
          rowClassName="clickable-row"
        />
      </div>
    </div>
  );
};
export default ProductPlanMesPresenter;
