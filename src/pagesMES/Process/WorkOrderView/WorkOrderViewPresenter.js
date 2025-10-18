import {
  Collapse,
  Descriptions,
  Button,
  Modal,
  Tag,
  Select,
  InputNumber,
  Segmented,
} from "antd";
import dayjs from "dayjs";
import "./workOrderView.css";

const options = [
  { value: "대기", label: "대기" },
  { value: "진행", label: "진행" },
  { value: "품질", label: "품질" },
  { value: "완료", label: "완료" },
];

const WorkOrderViewPresenter = ({
  workOrder,
  productPlans,
  stocks,
  bomDetails,
  woStatus,
  isModalOpen,
  nowStatus,
  setNowStatus,
  HandleModalStatusChange,
  HandleWoStatusChange,
  HandleNumberChange,
  HandleStatusUpdate,
  HandleStockChange,
}) => {
  const filteredStatus = options.filter((option) => option.value !== nowStatus);
  const getTagByType = (type) => {
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
    return <Tag color={color}>{type}</Tag>;
  };
  const collapseItems = workOrder
    .filter((wo) => nowStatus === wo.type)
    .map((wo) => ({
      key: wo.woNo,

      label: (
        <span>
          {getTagByType(wo.type)}&nbsp;&nbsp;&nbsp;{wo.woName}
        </span>
      ),
      children: (
        <div className="work-order-detail-content">
          <div className="work-order-detail-header">
            <div>작업 지시 내용</div>
            <Button onClick={HandleModalStatusChange}>상태 변경</Button>
          </div>
          <Descriptions
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
            <Descriptions.Item label="필요 자재" span={2}>
              {(() => {
                const bomNo = productPlans.find(
                  (pp) => pp.ppNo === Number(wo.ppNo)
                )?.bom?.bomNo;
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
          <Modal
            destroyOnClose
            afterClose={() => {
              HandleWoStatusChange(null);
            }}
            style={{ minWidth: "50px" }}
            open={isModalOpen}
            onCancel={HandleModalStatusChange}
            footer={null}
          >
            <div>
              <div className="wo-status">
                <div className="modal-header">상태값 변경</div>
                <div className="wo-status-input">
                  <div className="wo-status-input-row">
                    <div style={{ width: "15%", textAlign: "right" }}>
                      상태 :
                    </div>
                    <Select
                      defaultValue={wo.type}
                      style={{ width: "70%" }}
                      onChange={(value) => HandleWoStatusChange(value)}
                      options={filteredStatus}
                    ></Select>
                  </div>
                  {woStatus === "품질" && (
                    <div className="additional-input">
                      <div className="wo-status-input-row">
                        <div style={{ width: "15%", textAlign: "right" }}>
                          결과물 :
                        </div>
                        <Select
                          onChange={(value) =>
                            HandleStockChange("stockNo", value)
                          }
                          options={stocks.map((stock) => ({
                            value: stock.stockNo,
                            label: stock.stockName,
                          }))}
                          placeholder="결과물을 선택해주세요."
                          style={{ width: "70%" }}
                        ></Select>
                      </div>
                      <div className="wo-status-input-row">
                        <div style={{ width: "15%", textAlign: "right" }}>
                          갯수 :
                        </div>
                        <InputNumber
                          placeholder="숫자만 입력가능합니다."
                          min={1}
                          onChange={(value) =>
                            HandleNumberChange(wo.woNo, value)
                          }
                          style={{ width: "70%" }}
                        ></InputNumber>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="footer-btn">
                <Button
                  type="primary"
                  onClick={() => HandleStatusUpdate(wo.woNo)}
                >
                  변경
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      ),
    }));

  return (
    <div className="workOrder-content">
      <div className="grid-func">
        <div className="header-phrase">
          <div className="workOrder-list">작업 목록</div>
          <Segmented
            options={[
              { value: "대기", label: "대기" },
              { value: "진행", label: "진행" },
              { value: "품질", label: "품질" },
              { value: "완료", label: "완료" },
            ]}
            value={nowStatus}
            onChange={setNowStatus}
          />
        </div>
        <div className="func-button"></div>
      </div>
      <div className="process-content"></div>
      <Collapse items={collapseItems} />
    </div>
  );
};

export default WorkOrderViewPresenter;
