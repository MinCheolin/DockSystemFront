import { Button, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import "./WorkOrderUpdate.css";

const { RangePicker } = DatePicker;
const WorkOrderUpdatePresenter = ({
  woNo,
  equipments,
  selectedEquipment,
  materials,
  selectedMaterial,
  selectedWorkOrder,
  HandleChangeInput,
  HandleChangeDate,
  HandleUpdateWorkOrder,
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
    <Form
      className="custom-form-item"
      form={form}
      onFinish={HandleUpdateWorkOrder}
    >
      <div className="processUpdate-content">
        <div className="grid-func">
          <div className="project-list"> 작업 지시 수정</div>
          <div className="func-button">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                작업 지시 수정
              </Button>
            </Form.Item>
          </div>
        </div>
        <div className="processInfo-Input">
          <Form.Item label="작업 지시 번호">
            <Input className="underline-input" readOnly value={woNo} />
          </Form.Item>

          <Form.Item label="작업 지시명">
            <Input
              name="woName"
              onChange={HandleChangeInput}
              value={selectedWorkOrder.woName}
            />
          </Form.Item>
          <Form.Item label="기간">
            <RangePicker
              onChange={HandleChangeDate}
              style={{ width: "100%" }}
              value={
                selectedWorkOrder.woStartDate && selectedWorkOrder.woEndDate
                  ? [
                      dayjs(selectedWorkOrder.woStartDate),
                      dayjs(selectedWorkOrder.woEndDate),
                    ]
                  : []
              }
            />
          </Form.Item>

          <Form.Item label="작업 지시 내용">
            <Input.TextArea
              name="woDetail"
              onChange={HandleChangeInput}
              value={selectedWorkOrder?.woDetail}
            />
          </Form.Item>

          <Form.Item label="특이사항">
            <Input.TextArea
              name="woDescription"
              onChange={HandleChangeInput}
              value={selectedWorkOrder.woDescription}
            />
          </Form.Item>
          <Form.Item label="사용 장비 코드">
            <Input
              className="underline-input"
              readOnly
              value={selectedEquipment().equipCode}
            />
          </Form.Item>

          <Form.Item label="사용 장비명">
            <Select
              onChange={(value) => HandleChangeSelect("equipNo", value)}
              options={equipments.map((equipment) => ({
                value: equipment.equipNo,
                label: equipment.equipName,
              }))}
              value={selectedEquipment().equipName}
            />
          </Form.Item>

          <Form.Item label="사용 자재">
            <Select
              onChange={(value) => HandleChangeSelect("materialNo", value)}
              options={materials.map((material) => ({
                value: material.materialNo,
                label: material.materialName,
              }))}
              value={selectedMaterial().materialName}
            />
          </Form.Item>

          <Form.Item label="작업 상태">
            <Select
              onChange={(value) => HandleChangeSelectType("type", value)}
              options={typeOptions}
              value={selectedWorkOrder.type}
            />
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};
export default WorkOrderUpdatePresenter;
