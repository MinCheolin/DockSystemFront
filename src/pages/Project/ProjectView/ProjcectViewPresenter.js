import { Button, Collapse } from "antd";
import "./projectview.css";

const ProjectViewPresenter = ({ projects }) => {
  return (
    <>
      <div className="project-content">
        <div className="grid-func">
          <div className="project-list">프로젝트 목록</div>
          <div className="func-button">
            <Button>새 프로젝트 등록</Button>
          </div>
        </div>
        <div className="projects">
          <Collapse
            items={projects.map((project) => ({
              key: project.projectNo,
              label: project.projectName,
              children: (
                <div className="details">
                  <div className="pjt-info">
                    <div></div>
                    <div>고객사 : {project.customer.customerName}</div>
                    <div>선박 종류 :{project.vessel.vesselName}</div>
                    <div>
                      프로젝트 기간 : {project.projectStartDate.split("T")[0]} ~
                      {project.projectEndDate.split("T")[0]}
                    </div>
                    <div></div>
                    <div>프로젝트 금액 : {project.projectPrice}원</div>
                    <div>프로젝트 설명 : {project.projectDescription}</div>
                    <div>진행 상태 : {project.type}</div>
                  </div>
                  <div className="pps">
                    <div className="prduction-plan">
                      생산 계획명 | 시작일 ~ 마감일 | BOM번호
                    </div>
                    <div className="prduction-plan">
                      생산 계획명 | 시작일 ~ 마감일 | BOM번호
                    </div>
                    <div className="prduction-plan">
                      생산 계획명 | 시작일 ~ 마감일 | BOM번호
                    </div>
                  </div>
                </div>
              ),
            }))}
          />
        </div>
      </div>
    </>
  );
};
export default ProjectViewPresenter;
