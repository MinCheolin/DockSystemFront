import { Collapse, Descriptions } from "antd";
import dayjs from "dayjs";
import "./workOrderView.css";

const WorkOrderViewPresenter = ({
  workOrder,
  productPlans,
  bomDetails,
  HandleModalStatusChange,
  isModalOpen,
}) => {
  const collapseItems = workOrder.map((wo) => ({
    key: wo.woNo,
    label: `작업지시 ${wo.woNo}`,
    children: (
      <Descriptions
        title="작업 지시 상세"
        bordered
        column={2} // 한 줄에 두 개씩
      >
        <Descriptions.Item label="작업지시번호" span={1}>
          {wo.woNo}
        </Descriptions.Item>
        <Descriptions.Item label="생산 계획 번호" span={1}>
          {wo.ppNo}
        </Descriptions.Item>
        <Descriptions.Item label="작업지시명" span={1}>
          {wo.woName}
        </Descriptions.Item>
        <Descriptions.Item label="작업상태" span={1}>
          {wo.type}
        </Descriptions.Item>
        <Descriptions.Item label="기간" span={2}>
          {`${dayjs(wo.woStartDate).format("YYYY-MM-DD")} ~ ${dayjs(
            wo.woEndDate
          ).format("YYYY-MM-DD")}`}
        </Descriptions.Item>
        <Descriptions.Item label="작업 지시 내용" span={2}>
          {wo.woDetail}
        </Descriptions.Item>
        <Descriptions.Item label="특이사항" span={2}>
          {wo.woDescription}
        </Descriptions.Item>
        <Descriptions.Item label="장비" span={1}>
          {wo.equipment?.equipName || "-"}
        </Descriptions.Item>
        <Descriptions.Item label="BOM Detail" span={2}>
          {(() => {
            const bomNo = productPlans.find((pp) => pp.ppNo === Number(wo.ppNo))
              ?.bom?.bomNo;
            const bomDetailsForWO = bomNo ? bomDetails[bomNo] : null;
            if (!bomDetailsForWO || bomDetailsForWO.length === 0) {
              return "-";
            }
            return bomDetailsForWO.map((bd) => (
              <div key={bd.bomDetailNo}>
                {bd?.material?.materialName} ({bd?.bomDetailCount})
              </div>
            ));
          })()}
        </Descriptions.Item>
      </Descriptions>
    ),
  }));

  return (
    <div className="productPlan-content">
      <div className="grid-func">
        <div className="productPlan-list">작업 목록</div>
        <div className="func-button"></div>
      </div>
      <div className="process-content"></div>
      <Collapse items={collapseItems} />
    </div>
  );
};

export default WorkOrderViewPresenter;
