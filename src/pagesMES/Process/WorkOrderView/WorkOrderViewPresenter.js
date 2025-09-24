import { Table } from "antd";
import "./workOrderView.css";
const columns = [
  {
    title: "col1",
    key: "col1",
  },
  {
    title: "col2",
    key: "col2",
  },
  {
    title: "col3",
    key: "col3",
  },
  {
    title: "col4",
    key: "col4",
  },
  {
    title: "col5",
    key: "col5",
  },
  {
    title: "col6",
    key: "col6",
  },
];
const WorkOrderViewPresenter = () => {
  return (
    <div className="productPlan-content">
      <div className="grid-func">
        <div className="productPlan-list">공정 목록</div>
        <div className="func-button"></div>
      </div>
      <div className="process-content">
        <Table
          size="small"
          pagination={false}
          columns={columns}
          rowClassName="clickable-row"
        />
      </div>
    </div>
  );
};

export default WorkOrderViewPresenter;
