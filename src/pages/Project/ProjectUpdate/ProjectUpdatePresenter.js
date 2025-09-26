import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import "./projectUpdate.css";

const { RangePicker } = DatePicker;
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

const ProjectUpdatePresenter = ({
  productPlans,
  project,
  vessels,
  customers,
  boms,
  HandleMoveList,
  addRow,
  removeRow,
  HandleUpdateProjectInfo,
  HandleChangeInput,
  HandleChangeSelect,
  HandleChangeDateProductPlan,
  HandleChangePPinfo,
  HandleChangeDate,
}) => {
  const [form] = Form.useForm();
  const [range, setRange] = useState([null, null]);

  useEffect(() => {
    if (project?.projectStartDate && project?.projectEndDate) {
      setRange([
        dayjs(project.projectStartDate),
        dayjs(project.projectEndDate),
      ]);
    }
  }, [project]);

  return (
    <div>
      <Form
        className="custom-form-item"
        form={form}
        onFinish={HandleUpdateProjectInfo}
      >
        <div className="project-content">
          <div className="grid-func">
            <div className="project-list">프로젝트 정보 수정</div>
            <div className="func-button">
              <Button onClick={HandleMoveList}> 목록으로 이동</Button>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  프로젝트 수정
                </Button>
              </Form.Item>
            </div>
          </div>
          <div className="project-form">
            <div className="project-info">
              <div className="info-header">프로젝트 정보</div>

              <Form.Item
                label="프로젝트명"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Input
                  name="projectName"
                  onChange={HandleChangeInput}
                  value={project.projectName}
                  placeholder="프로젝트명을 입력하세요."
                />
              </Form.Item>

              <Form.Item
                label="프로젝트 기간"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <RangePicker onChange={HandleChangeDate} value={range} />
              </Form.Item>

              <Form.Item
                label="고객사"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Select
                  value={project?.customerNo}
                  options={customers.map((customer) => ({
                    value: customer.customerNo,
                    label: customer.customerName,
                  }))}
                  onChange={(value) => HandleChangeSelect("customerNo", value)}
                  placeholder="고객사를 선택하세요."
                />
              </Form.Item>

              <Form.Item
                label="선박종류"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Select
                  value={project?.vesselNo}
                  options={vessels.map((vessel) => ({
                    value: vessel.vesselNo,
                    label: vessel.vesselName,
                  }))}
                  onChange={(value) => HandleChangeSelect("vesselNo", value)}
                  placeholder="선박을 선택하세요."
                />
              </Form.Item>

              <Form.Item
                label="금액"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <InputNumber
                  placeholder="금액을 입력하세요."
                  value={project.projectPrice}
                  style={{ width: "100%" }}
                  min={1000000}
                  step={1000000}
                />
              </Form.Item>

              <Form.Item
                label="비고"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Input.TextArea
                  value={project.projectDescription}
                  name="projectDescription"
                />
              </Form.Item>
            </div>
            <div className="production-plan">
              <div className="pp-header">생산 계획</div>
              {productPlans?.map((plan, index) => (
                <div className="pp-input" key={index}>
                  <Input
                    style={{ flex: "0 0 30%" }}
                    placeholder="생산 계획명"
                    value={plan.ppName || ""}
                    onChange={(e) =>
                      HandleChangePPinfo(index, "ppName", e.target.value)
                    }
                  />

                  <RangePicker
                    value={
                      plan.ppStartDate && plan.ppEndDate
                        ? [dayjs(plan.ppStartDate), dayjs(plan.ppEndDate)]
                        : undefined
                    }
                    onChange={(dates) =>
                      HandleChangeDateProductPlan(index, dates)
                    }
                  />
                  <Select
                    style={{ flex: "0 0 35%" }}
                    placeholder="BOM"
                    value={plan?.bomNo}
                    options={boms?.map((bom) => ({
                      value: bom.bomNo,
                      label: `${bom.vessel.vesselName} - ${bom.standardProcess.spName}`,
                    }))}
                    onChange={(value) =>
                      HandleChangePPinfo(index, "bomNo", value)
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
    </div>
  );
};

export default ProjectUpdatePresenter;
