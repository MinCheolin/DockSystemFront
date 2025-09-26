import { Button, Descriptions, Modal } from "antd";
import dayjs from "dayjs";
import "./workOrderDetail.css";

const WorkOrderDetailPresenter = ({
  woNo,
  isModalOpen,
  HandleModalStatusChange,
  selectedWorkOrder,
  selectedMaterial,
  selectedEquipment,
  HandleMoveUpdate,
}) => {
  const items = [
    {
      label: "작업지시번호",
      children: woNo,
    },
    {
      label: "작업상태",
      children: selectedWorkOrder?.type,
    },
    {
      label: "시작일",
      children: selectedWorkOrder?.woStartDate
        ? dayjs(selectedWorkOrder.woStartDate).format("YYYY-MM-DD")
        : "",
    },
    {
      label: "종료일",
      children: selectedWorkOrder?.woEndDate
        ? dayjs(selectedWorkOrder.woEndDate).format("YYYY-MM-DD")
        : "",
    },
    {
      label: "작업지시명",
      span: { xl: 2, xxl: 2 },
      children: selectedWorkOrder?.woName,
    },
    {
      label: "기간",
      span: { xl: 2, xxl: 2 },
      children: selectedWorkOrder
        ? `${dayjs(selectedWorkOrder.woStartDate).format(
            "YYYY-MM-DD"
          )} ~ ${dayjs(selectedWorkOrder.woEndDate).format("YYYY-MM-DD")}`
        : "",
    },
    {
      label: "자재",
      span: { xl: 2, xxl: 2 },
      children: selectedMaterial()?.materialName,
    },
    {
      label: "장비",
      span: { xl: 2, xxl: 2 },
      children: `${selectedEquipment()?.equipName} (${
        selectedEquipment()?.equipCode
      })`,
    },
    {
      label: "작업 지시 내용",
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
      children: selectedWorkOrder?.woDetail,
    },
    {
      label: "특이사항",
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
      children: selectedWorkOrder?.woDescription,
    },
  ];
  return (
    <div className="work-order-detail-content">
      <Descriptions
        title="작업 지시 정보"
        bordered
        column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
        items={items}
      />
      <div className="btn-area">
        <Button onClick={HandleModalStatusChange}>작업 결과</Button>
        <Button onClick={() => HandleMoveUpdate(woNo)}>수정</Button>
        <Button>뒤로 가기</Button>
      </div>
      <Modal
        okText="품질 등록"
        cancelText="취소"
        open={isModalOpen}
        onCancel={HandleModalStatusChange}
      >
        <>작업 결과</>
      </Modal>
    </div>
  );
};

export default WorkOrderDetailPresenter;
