import { List } from "antd";
import "./workOrderView.css";

const WorkOrderViewPresenter = ({ HandleMoveDetail, workOrder }) => {
  return (
    <div className="productPlan-content">
      <div className="grid-func">
        <div className="productPlan-list">작업 목록</div>
        <div className="func-button"></div>
      </div>
      <div className="process-content">
        <List
          bordered
          dataSource={workOrder}
          renderItem={(item, key) => (
            <List.Item
              key={item.woNo}
              onClick={() => HandleMoveDetail(item.woNo)}
              className="wo-item"
            >
              {item.woName}
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default WorkOrderViewPresenter;
