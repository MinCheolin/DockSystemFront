import { Dropdown, Button, Card, Segmented, Modal } from "antd";
import "./projectview.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProjectViewPresenter = ({
  isModalOpen,
  projects,
  productPlans,
  selectStatus,
  HandleProjectUpdate,
  HandleDeleteProject,
  value,
  setValue,
  HandleModalStatusChange,
  HandleStatusChangeBtnClick,
  HandleChangeType,
  getStatusClass,
}) => {
  const items = [
    {
      key: "1",
      label: "대기",
      onClick: () => HandleStatusChangeBtnClick("대기"),
    },
    {
      key: "2",
      label: "진행",
      onClick: () => HandleStatusChangeBtnClick("진행"),
    },
    {
      key: "3",
      label: "완료",
      onClick: () => HandleStatusChangeBtnClick("완료"),
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="project-content">
      <div className="grid-func">
        <div className="project-list">
          <div>프로젝트 목록</div>
          <Segmented
            options={["대기", "진행", "완료"]}
            value={value}
            onChange={setValue}
          />
        </div>
        <div className="func-button">
          <Button>새 프로젝트 등록</Button>
        </div>
      </div>
      <div className="projects">
        <Slider {...settings}>
          {projects
            .filter((project) => project.type === value)
            .map((project) => (
              <div key={project.projectNo}>
                <Card
                  className="project-card"
                  title={
                    <div className="card-title-flex">
                      <span>{project.projectName}</span>
                      <span></span>
                      <span>{project.type}</span>
                    </div>
                  }
                >
                  <div className="card-inner-div">
                    <div className="grid-item-container">
                      <div className="grid-item">기간 :</div>
                      <div className="grid-item">
                        {project.projectStartDate.split("T")[0]} ~{" "}
                        {project.projectEndDate.split("T")[0]}
                      </div>
                      <div className="grid-item">선박 :</div>
                      <div className="grid-item">
                        {project.vessel.vesselName}
                      </div>
                      <div className="grid-item">금액 :</div>
                      <div className="grid-item">
                        {project.projectPrice.toLocaleString()} 원
                      </div>
                      <div className="grid-item">고객사 :</div>
                      <div className="grid-item">
                        {project.customer.customerName}
                      </div>
                      <div className="grid-item">비고 :</div>
                      <div className="grid-item">
                        {project.projectDescription}
                      </div>
                    </div>

                    <div className="product-plans">
                      <div className="pp-items">
                        <div className="pp-title">생산 계획</div>
                        {productPlans.map((productPlan) => {
                          if (
                            productPlan.project.projectNo === project.projectNo
                          ) {
                            return (
                              <div
                                className={`pp-item ${getStatusClass(
                                  productPlan.ppStatus
                                )}`}
                                key={productPlan.ppNo}
                              >
                                <div>
                                  [{productPlan.ppStatus}] &nbsp;&nbsp;
                                  {productPlan.ppName}
                                </div>
                                <div>
                                  {productPlan.bom
                                    ? productPlan.bom.vessel.vesselName
                                    : "-"}
                                </div>
                                <div>
                                  {productPlan.bom
                                    ? productPlan.bom.standardProcess.spName
                                    : "-"}
                                </div>

                                <div>
                                  {productPlan.ppStartDate.split("T")[0]} ~{" "}
                                  {productPlan.ppEndDate.split("T")[0]}
                                </div>
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="button-area">
                    <Button
                      onClick={() => HandleProjectUpdate(project.projectNo)}
                    >
                      프로젝트 수정
                    </Button>
                    <Dropdown.Button
                      menu={{
                        items: items.map((item) => ({
                          ...item,
                          disabled: item.label === project.type,
                        })),
                      }}
                    >
                      상태변경
                    </Dropdown.Button>
                    <Button
                      onClick={() => HandleDeleteProject(project.projectNo)}
                      type="primary"
                      danger
                    >
                      삭제
                    </Button>
                  </div>
                </Card>
                <Modal
                  open={isModalOpen}
                  onCancel={HandleModalStatusChange}
                  footer={null}
                >
                  <div className="modal-status-change">
                    <div className="modal-status-change-header">
                      상태값 변경
                    </div>
                    <div className="modal-status-change-body">
                      <div>
                        <span className="current-status">{project.type}</span>
                        {"  →   "}
                        <span className="target-status">{selectStatus}</span>
                      </div>
                      <div>변경하시겠습니까?</div>
                    </div>
                    <div className="modal-status-change-footer">
                      <Button
                        onClick={() => HandleChangeType(project.projectNo)}
                        type="primary"
                      >
                        변경
                      </Button>
                      <Button onClick={HandleModalStatusChange}>취소</Button>
                    </div>
                  </div>
                </Modal>
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
};
export default ProjectViewPresenter;
