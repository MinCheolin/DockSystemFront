import { List } from "antd";
import "./workOrderView.css";

const data = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];

const WorkOrderViewPresenter = ({ HandleMoveDetail }) => {
  return (
    <div className="productPlan-content">
      <div className="grid-func">
        <div className="productPlan-list">작업 목록</div>
        <div className="func-button"></div>
      </div>
      <div className="process-content">
        <List
          bordered
          dataSource={data}
          renderItem={(item, key) => (
            <List.Item
              key={key}
              onClick={() => HandleMoveDetail(key)}
              className="wo-item"
            >
              [칼럼명_1] 칼럼명_2
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default WorkOrderViewPresenter;
