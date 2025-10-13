import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import "./projectCreate.css";

const { RangePicker } = DatePicker;

const ProjectCreatePresenter = ({
  customers,
  vessels,
  boms,
  HandleChangeInput,
  HandleChangeSelect,
  HandleChangeDate,
  HandleChangeDateProductPlan,
  HandleCreateProject,
  HandleChangePPinfo,
  addRow,
  removeRow,
  productPlans,
}) => {
  const [form] = Form.useForm();

  return (
    <>
      <Form
        className="custom-form-item"
        form={form}
        onFinish={HandleCreateProject}
      >
        <div className="project-content">
          <div className="grid-func">
            <div className="project-list">프로젝트 등록</div>
            <div className="func-button">
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  새 프로젝트 등록
                </Button>
              </Form.Item>
            </div>
          </div>

          <div className="project-form">
            <div className="project-info">
              <div className="info-header">프로젝트 정보</div>

              <Form.Item
                label="프로젝트명"
                name="Input"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Input
                  name="projectName"
                  onChange={HandleChangeInput}
                  placeholder="프로젝트명을 입력하세요."
                />
              </Form.Item>

              <Form.Item
                label="프로젝트 기간"
                name="RangePicker"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <RangePicker onChange={HandleChangeDate} />
              </Form.Item>

              <Form.Item
                label="고객사"
                name="Customer"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Select
                  placeholder="고객사를 선택하세요."
                  onChange={(value) => HandleChangeSelect("customerNo", value)}
                  options={customers.map((customer) => ({
                    value: customer.customerNo,
                    label: customer.customerName,
                  }))}
                />
              </Form.Item>

              <Form.Item
                label="선박종류"
                name="Vessel"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Select
                  placeholder="선박을 선택하세요."
                  onChange={(value) => HandleChangeSelect("vesselNo", value)}
                  options={vessels.map((vessel) => ({
                    value: vessel.vesselNo,
                    label: vessel.vesselName,
                  }))}
                />
              </Form.Item>

              <Form.Item
                label="금액"
                name="InputNumber"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <InputNumber
                  onChange={(value) =>
                    HandleChangeSelect("projectPrice", value)
                  }
                  placeholder="금액을 입력하세요."
                  style={{ width: "100%" }}
                  min={1000000}
                  step={1000000}
                />
              </Form.Item>

              <Form.Item
                label="비고"
                name="TextArea"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Input.TextArea
                  onChange={HandleChangeInput}
                  name="projectDescription"
                />
              </Form.Item>
            </div>
            <div className="production-plan">
              <div className="pp-header">생산 계획</div>
              {productPlans.map((plan, index) => (
                <div className="pp-input" key={index}>
                  <Select
                    style={{ flex: "0 0 35%" }}
                    placeholder="BOM"
                    options={boms.map((bom) => ({
                      value: bom.bomNo,
                      label: `${bom.vessel.vesselName} - ${bom.standardProcess.spName}`,
                    }))}
                    onChange={(value) =>
                      HandleChangePPinfo(index, "bomNo", value)
                    }
                  />
                  <RangePicker
                    onChange={(dates) =>
                      HandleChangeDateProductPlan(index, dates)
                    }
                  />
                  <Input
                    style={{ flex: "0 0 30%" }}
                    placeholder="생산 계획명"
                    value={plan.ppName || ""}
                    onChange={(e) =>
                      HandleChangePPinfo(index, "ppName", e.target.value)
                    }
                  />
                  {productPlans.length > 1 && (
                    <CloseOutlined onClick={() => removeRow(index)} />
                  )}
                </div>
              ))}

              <Button
                type="dashed"
                onClick={addRow}
                block
                icon={<PlusOutlined />}
              >
                생산 계획 추가
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};

export default ProjectCreatePresenter;
