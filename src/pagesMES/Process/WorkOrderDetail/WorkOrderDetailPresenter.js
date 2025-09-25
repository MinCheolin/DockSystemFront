import { Button, Descriptions, Modal, Dropdown } from "antd";
import "./workOrderDetail.css";

const statusItems = [
  {
    key: "1",
    label: "대기",
  },
  {
    key: "2",
    label: "품질",
  },
  {
    key: "3",
    label: "완료",
  },
];

const items = [
  {
    label: "작업지시번호",
    children: "000000000001",
  },
  {
    label: "작업상태",
    children: "진행",
  },
  {
    label: "시작일",
    children: "2025-01-01",
  },
  {
    label: "종료일",
    children: "2025-12-31",
  },
  {
    label: "작업지시명",
    span: { xl: 2, xxl: 2 },
    children: "선박조립",
  },
  {
    label: "기간",
    span: { xl: 2, xxl: 2 },
    children: "2025-01-01 ~ 2025-12-31",
  },
  {
    label: "자재",
    span: { xl: 2, xxl: 2 },
    children: "미스릴",
  },
  {
    label: "장비",
    span: { xl: 2, xxl: 2 },
    children: "절단기1번",
  },
  {
    label: "작업 지시 내용",
    span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
    children: (
      <>
        자른거
        <br />
        전부
        <br />
        붙여
      </>
    ),
  },
  {
    label: "특이사항",
    span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
    children: (
      <>
        밖에 더움
        <br />
        파도 많이침
        <br />
        태풍 조심
        <br />
        수고~
      </>
    ),
  },
];

const WorkOrderDetailPresenter = ({ isModalOpen, HandleModalStatusChange }) => {
  return (
    <div className="work-order-detail-content">
      <Descriptions
        title="작업 지시 정보"
        bordered
        column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
        items={items}
      />
      <div className="btn-area">
        <Dropdown.Button menu={{ items: statusItems }}>
          상태변경
        </Dropdown.Button>
        <Button onClick={HandleModalStatusChange}>버튼 1</Button>
        <Button>버튼 2</Button>
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
