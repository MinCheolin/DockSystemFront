import { Button, Table } from "antd";
import dayjs from "dayjs";
import "./productPlanMes.css";

const subColumns = [
  {
    title: "작업 지시명",
    width: "15%",
    dataIndex: "woName",
    key: "woName",
  },
  {
    title: "작업 상태",
    width: "10%",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "작업 지시 내용",
    dataIndex: "woDetail",
    key: "woDetail",
  },
];

const ProductPlanMesPresenter = ({
  productplans,
  workOrders,
  expandedRowKeys,
  HandleAddWorkOrder,
  setExpandedRowKeys,
  HandleExpand,
}) => {
  const columns = [
    {
      title: "번호",
      align: "center",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "생산 계획명",
      align: "center",
      dataIndex: "ppName",
      key: "name",
    },
    {
      title: "기간",
      align: "center",
      render: (_, record) => {
        const start = dayjs(record.startDate).format("YYYY-MM-DD");
        const end = dayjs(record.endDate).format("YYYY-MM-DD");
        return `${start} ~ ${end}`;
      },
      key: "period",
    },
    {
      title: "공정명",
      align: "center",
      dataIndex: ["bom", "standardProcess", "spName"],
      key: "spName",
    },
    {
      title: "선박명",
      align: "center",
      dataIndex: ["bom", "vessel", "vesselName"],
      key: "bom",
    },
    {
      title: "작업 지시",
      align: "center",
      width: 150,
      key: "action",
      render: (_, record) => (
        <Button type="primary" onClick={() => HandleAddWorkOrder(record.ppNo)}>
          작업 지시 등록
        </Button>
      ),
    },
  ];
  return (
    <div className="productPlan-content">
      <div className="grid-func">
        <div className="productPlan-list">생산 계획 목록</div>
        <div className="func-button"></div>
      </div>
      <div className="grid-box">
        <Table
          className="main-table"
          rowKey="ppNo"
          size="small"
          pagination={false}
          dataSource={productplans}
          columns={columns}
          rowClassName="clickable-row"
          expandable={{
            expandedRowRender: (record) => {
              const filteredWorkorders = workOrders.filter(
                (w) => Number(w.ppNo) === Number(record.ppNo)
              );
              return (
                <Table
                  rowKey="woNo"
                  dataSource={filteredWorkorders}
                  columns={subColumns}
                  pagination={false}
                  size="small"
                />
              );
            },
            expandedRowKeys: expandedRowKeys,
            onExpand: HandleExpand,
          }}
        />
      </div>
    </div>
  );
};
export default ProductPlanMesPresenter;
