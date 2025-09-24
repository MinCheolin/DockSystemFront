import { Button, DatePicker, Form, Input, Select } from "antd";
import "./workOrderCreate.css";

const { RangePicker } = DatePicker;
const WorkOrderPresenter = ({
  ppNo,
  HandleChangeInput,
  HandleChangeDate,
  HandleCreateWorkOrder,
  HandleChangeSelect,
}) => {
  const [form] = Form.useForm();
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
            <Form.Item label="생산 계획 번호">
              <Input className="underline-input" readOnly value={ppNo} />
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
                onChange={(value) => HandleChangeSelect("equip", value)}
              />
            </Form.Item>

            <Form.Item label="사용 자재">
              <Select
                onChange={(value) => HandleChangeSelect("matrial", value)}
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
