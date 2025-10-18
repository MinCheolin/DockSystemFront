import { Button, Table, Segmented, Tag } from "antd";
import dayjs from "dayjs";
import "./productPlanMes.css";

const subColumns = [
  {
    title: "번호",
    width: 50,
    align: "center",
    key: "index",
    render: (text, record, index) => index + 1,
  },
  {
    title: "작업 지시명",
    width: "15%",
    align: "center",
    dataIndex: "woName",
    key: "woName",
  },

  {
    title: "작업 지시 내용",
    dataIndex: "woDetail",
    align: "center",
    key: "woDetail",
  },
  {
    title: "작업 상태",
    width: "10%",
    align: "center",
    dataIndex: "type",
    key: "type",
    render: (type) => {
      let color;
      switch (type) {
        case "대기":
          color = "geekblue";
          break;
        case "진행":
          color = "blue";
          break;
        case "품질":
          color = "gold";
          break;
        case "완료":
          color = "green";
          break;
        default:
          color = "default";
      }
      return <Tag color={color}> {type}</Tag>;
    },
  },
];

const ProductPlanMesPresenter = ({
  productplans,
  workOrders,
  expandedRowKeys,
  HandleAddWorkOrder,
  setExpandedRowKeys,
  HandleExpand,
  selectedValue,
  setSelectedValue,
  HandleChangePpStatus,
}) => {
  const columns = [
    {
      title: "상태",
      align: "center",
      dataIndex: "ppStatus",
      key: "ppStatus",
      render: (ppStatus) => {
        let color;
        switch (ppStatus) {
          case "미완료":
            color = "red";
            break;
          case "완료":
            color = "green";
            break;
          default:
            color = "default";
        }
        return <Tag color={color}> {ppStatus}</Tag>;
      },
    },
    {
      title: "프로젝트명",
      align: "center",
      dataIndex: ["project", "projectName"],
      key: "projectName",
      onCell: (record, rowIndex) => {
        const projectName = record.project.projectName;
        const sameGroup = productplans.filter(
          (d) => d.project.projectName === projectName
        );
        const firstIndex = productplans.findIndex(
          (d) => d.project.projectName === projectName
        );
        const isFirst = rowIndex === firstIndex;
        return {
          rowSpan: isFirst ? sameGroup.length : 0, // 첫 행만 병합
        };
      },
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
      key: "addWorkOrder",
      render: (_, record) => (
        <Button onClick={() => HandleAddWorkOrder(record)}>
          작업 지시 등록
        </Button>
      ),
    },
    {
      title: "상태",
      align: "center",
      width: 50,
      key: "actionStatus",
      render: (_, record) => {
        const text = selectedValue === "미완료" ? "완료" : "재진행";
        return (
          <Button type="primary" onClick={() => HandleChangePpStatus(record)}>
            {text}
          </Button>
        );
      },
    },
  ];

  const filteredColumns =
    selectedValue === "미완료"
      ? columns
      : columns.filter((col) => col.key !== "addWorkOrder");

  const filteredProductplans =
    selectedValue === "미완료"
      ? productplans.filter((pp) => pp.ppStatus !== "완료")
      : productplans.filter((pp) => pp.ppStatus === "완료");

  return (
    <div className="productPlan-content">
      <div className="grid-func">
        <div className="header-phrase">
          <div className="productPlan-list">생산 계획 목록</div>
          <Segmented
            options={[
              { value: "미완료", label: "미완료" },
              { value: "완료", label: "완료" },
            ]}
            value={selectedValue}
            onChange={setSelectedValue}
          />
        </div>
        <div className="func-button"></div>
      </div>
      <div className="grid-box">
        <Table
          className="main-table"
          rowKey="ppNo"
          size="small"
          pagination={false}
          dataSource={filteredProductplans}
          columns={filteredColumns}
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
