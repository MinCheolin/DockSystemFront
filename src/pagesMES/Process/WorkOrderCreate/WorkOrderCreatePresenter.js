import { Button, DatePicker, Form, Input, Select } from "antd";
import "./workOrderCreate.css";

const { RangePicker } = DatePicker;
const WorkOrderPresenter = ({
  ppName,
  spName,
  vesselName,
  equipments,
  workOrder,
  productPlans,
  HandleChangeInput,
  HandleChangeDate,
  HandleCreateWorkOrder,
  HandleChangeSelect,
  HandleChangeSelectType,
}) => {
  const [form] = Form.useForm();

  const typeOptions = [
    { value: "대기", label: "대기" },
    { value: "진행", label: "진행" },
    { value: "품질", label: "품질" },
    { value: "완료", label: "완료" },
  ];

  return (
    <>
      <Form
        className="custom-form-item"
        form={form}
        onFinish={HandleCreateWorkOrder}
      >
        <div className="processCreate-content">
          <div className="grid-func">
            <div className="project-list"> 작업 지시 등록</div>
            <div className="func-button">
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  작업 지시 등록
                </Button>
              </Form.Item>
            </div>
          </div>
          <div className="processInfo-Input">
            <Form.Item label="생산 계획명">
              <Input className="underline-input" readOnly value={ppName} />
            </Form.Item>
            <Form.Item label="공정명">
              <Input className="underline-input" readOnly value={spName} />
            </Form.Item>
            <Form.Item label="선박명">
              <Input className="underline-input" readOnly value={vesselName} />
            </Form.Item>
            <Form.Item label="작업 지시명">
              <Input name="woName" onChange={HandleChangeInput} />
            </Form.Item>
            <Form.Item label="기간">
              <RangePicker
                onChange={HandleChangeDate}
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item label="작업 지시 내용">
              <Input.TextArea name="woDetail" onChange={HandleChangeInput} />
            </Form.Item>
            <Form.Item label="특이사항">
              <Input.TextArea
                name="woDescription"
                onChange={HandleChangeInput}
              />
            </Form.Item>
            <Form.Item label="사용 장비">
              <Select
                onChange={(value) => HandleChangeSelect("equipNo", value)}
                options={equipments.map((equipment) => ({
                  value: equipment.equipNo,
                  label: equipment.equipName,
                }))}
              />
            </Form.Item>
            <Form.Item label="작업 상태">
              <Input className="underline-input" readOnly value="대기" />
            </Form.Item>
          </div>
        </div>
      </Form>
    </>
  );
};
export default WorkOrderPresenter;
