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
        title="작업 지시 정보"
        bordered
        column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
        items={[
          { label: "작업지시번호", children: wo.woNo },
          { label: "작업상태", children: wo.type },
          { label: "생산 계획 번호", children: wo.ppNo },
          { label: "작업지시명", children: wo.woName },
          {
            label: "기간",
            children: `${dayjs(wo.woStartDate).format("YYYY-MM-DD")} ~ ${dayjs(
              wo.woEndDate
            ).format("YYYY-MM-DD")}`,
          },
          { label: "작업 지시 내용", children: wo.woDetail },
          { label: "특이사항", children: wo.woDescription },
          { label: "장비", children: wo.equipment?.equipName || "-" },
          {
            label: "bom Detail",
            children: (() => {
              const pp = productPlans.find((pp) => pp.ppNo === Number(wo.ppNo));
              const bomdetails = bomDetails.filter(
                (bd) => bd.bom?.bomNo === pp.bomNo
              );
              return (
                bomdetails
                  ?.map(
                    (bd) =>
                      `${bd?.material?.materialName} (${bd.bomDetailCount})`
                  )
                  .join(", ") || "-"
              );
            })(),
          },
        ]}
      />
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
