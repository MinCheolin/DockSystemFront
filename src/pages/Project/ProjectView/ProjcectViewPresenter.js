import { Button, Card, Dropdown } from "antd";
import "./projectview.css";

const ProjectViewPresenter = ({
  projects,
  productPlans,
  HandleProjectUpdate,
  HandleDeleteProject,
}) => {
  const items = [
    {
      key: "1",
      label: "대기",
    },
    {
      key: "2",
      label: "진행중",
    },
    {
      key: "3",
      label: "완료",
    },
  ];

  return (
    <div className="project-content">
      <div className="grid-func">
        <div className="project-list">프로젝트 목록</div>
        <div className="func-button">
          <Button>새 프로젝트 등록</Button>
        </div>
      </div>
      <div className="projects">
        {projects.map((project) => (
          <Card
            key={project.projectNo}
            className="project-card"
            title={
              <div className="card-title-flex">
                <span>{project.projectName}</span>
                <span>{project.type}</span>
              </div>
            }
          >
            <div className="card-inner-div">
              <div className="item-row-container">
                <div className="item-row">
                  <div className="item-title">기간 :</div>
                  <div className="item-data">
                    {project.projectStartDate.split("T")[0]} ~{" "}
                    {project.projectEndDate.split("T")[0]}
                  </div>
                </div>
                <div className="item-row">
                  <div className="item-title">고객사 :</div>
                  <div className="item-data">
                    {project.customer.customerName}
                  </div>
                </div>
                <div className="item-row">
                  <div className="item-title">선박 :</div>
                  <div className="item-data">{project.vessel.vesselName}</div>
                </div>
                <div className="item-row">
                  <div className="item-title">금액 :</div>
                  <div className="item-data">{project.projectPrice}</div>
                </div>
                <div className="item-row">
                  <div className="item-title">비고 :</div>
                  <div className="item-data">{project.projectDescription}</div>
                </div>
              </div>
              <div className="product-plans">
                <div className="all-pp-title"> 프로젝트 생산 계획</div>
                <div className="pp-items">
                  {productPlans.map((productPlan) => {
                    if (productPlan.project.projectNo === project.projectNo) {
                      return (
                        <div className="pp-item" key={productPlan.ppNo}>
                          <span>{productPlan.ppName}</span>
                          <span>{productPlan.bom.vessel.vesselName}</span>
                          <span>{productPlan.bom.standardProcess.spName}</span>
                          <span>
                            {productPlan.ppStartDate.split("T")[0]} ~{" "}
                            {productPlan.ppEndDate.split("T")[0]}
                          </span>
                        </div>
                      );
                    }
                    return null; // 조건 안 맞으면 렌더링 X
                  })}
                </div>
              </div>
            </div>
            <div className="button-area">
              <Button
                key={project.projectNo}
                onClick={() => HandleProjectUpdate(project.projectNo)}
              >
                프로젝트 수정
              </Button>
              <Dropdown.Button menu={{ items }}>상태변경</Dropdown.Button>
              <Button
                key={project.projectNo}
                onClick={() => HandleDeleteProject(project.projectNo)}
                type="primary"
                danger
              >
                삭제
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default ProjectViewPresenter;
