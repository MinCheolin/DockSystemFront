import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Segmented,
  Select,
  TreeSelect,
} from "antd";
import "./processCreate.css";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};
const ProcessCreatePresenter = () => {
  const [form] = Form.useForm();
  return (
    <>
      <Form {...formItemLayout} form={form}>
        <div className="processCreate-content">
          <div className="grid-func">
            <div className="project-list">공정 등록</div>
            <div className="func-button">
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  공정 등록
                </Button>
              </Form.Item>
            </div>
          </div>
          <div className="processInfo-Input">
            <Form.Item label="생산 계획 번호">
              <Input className="underline-input" readOnly value="1" />
            </Form.Item>
            <Form.Item label="기간">
              <Input
                className="underline-input"
                readOnly
                value="2025-01-01 ~ 2025-12-31"
              />
            </Form.Item>
            <Form.Item label="공정명">
              <Input />
            </Form.Item>

            <Form.Item
              label="특이사항"
              name="TextArea"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item label="공정상태">
              <Input className="underline-input" readOnly value="대기" />
            </Form.Item>
          </div>
        </div>
      </Form>
    </>
  );
};
export default ProcessCreatePresenter;
