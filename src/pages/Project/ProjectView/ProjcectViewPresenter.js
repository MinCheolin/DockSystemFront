import {
  Row,
  Col,
  Divider,
  Dropdown,
  Button,
  Card,
  Segmented,
  Modal,
  Tag,
  Table,
  Drawer,
} from "antd";
import "./projectview.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProjectViewPresenter = ({
  isModalOpen,
  isDrawerOpen,
  projects,
  productPlans,
  selectStatus,
  HandleProjectUpdate,
  HandleDeleteProject,
  HandleDrawerOpen,
  HandleDrawerClose,
  value,
  setValue,
  drawerInfo,
  HandleModalStatusChange,
  HandleStatusChangeBtnClick,
  HandleChangeType,
  getStatusClass,
}) => {
  const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
  );

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
  const colums = [
    {
      title: "프로젝트명",
      align: "center",
      dataIndex: "projectName",
      key: "projectName",
    },
    { title: "선박", align: "center", dataIndex: ["vessel", "vesselName"] },
    {
      title: "고객사",
      align: "center",
      dataIndex: ["customer", "customerName"],
    },
    {
      title: "상세 정보",
      align: "center",
      key: "action",
      render: (_, record) => (
        <Button type="primary" onClick={() => HandleDrawerOpen(record)}>
          상세보기
        </Button>
      ),
      width: 120,
    },
  ];

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };
  const completedPjt = projects.filter((project) => project.type === "완료");
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
        {value !== "완료" ? (
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
                        <span>
                          <Tag
                            color={
                              value === "대기"
                                ? "lime"
                                : value === "진행"
                                ? "orange"
                                : value === "완료"
                                ? "green"
                                : ""
                            }
                            style={{
                              fontSize: 16,
                              padding: "6px 12px",
                              height: "auto",
                            }}
                          >
                            {project.type}
                          </Tag>
                        </span>
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
                          {project.vessel?.vesselName}
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
                              productPlan.project.projectNo ===
                              project.projectNo
                            ) {
                              return (
                                <div
                                  className={`pp-item ${getStatusClass(
                                    productPlan.ppStatus
                                  )}`}
                                  key={productPlan.ppNo}
                                >
                                  <div>
                                    <Tag
                                      color={
                                        productPlan.ppStatus === "미완료"
                                          ? "red"
                                          : "green"
                                      }
                                    >
                                      {productPlan.ppStatus}
                                    </Tag>
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
        ) : (
          <>
            <Table columns={colums} dataSource={completedPjt} />
            <Drawer
              title="프로젝트 상세정보"
              open={isDrawerOpen}
              onClose={HandleDrawerClose}
              width={700}
            >
              <Row>
                <Col span={12}>
                  <DescriptionItem
                    title="프로젝트명"
                    content={drawerInfo?.projectName}
                  />
                </Col>
                <Col span={12}>
                  <DescriptionItem
                    title="선박명"
                    content={drawerInfo?.vessel.vesselName}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <DescriptionItem
                    title="금액"
                    content={drawerInfo?.projectPrice.toLocaleString()}
                  />
                </Col>
                <Col span={12}>
                  <DescriptionItem
                    title="고객사명"
                    content={drawerInfo?.customer.customerName}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <DescriptionItem
                    title="비고"
                    content={drawerInfo?.projectDescription}
                  />
                </Col>
              </Row>
              <Divider />
              <>
                <></>생산계획
                {productPlans
                  .filter(
                    (pp) => pp.project.projectNo === drawerInfo?.projectNo
                  )
                  .map((productPlan) => {
                    return (
                      <div
                        className="drawer-product-plan"
                        key={productPlan.ppNo}
                      >
                        <div>
                          <Tag>{productPlan.ppStatus}</Tag>
                          {""}
                          {productPlan.ppName}
                        </div>
                        <div>{productPlan.bom.vessel.vesselName}</div>
                        <div>{productPlan.bom.standardProcess.spName}</div>
                        <div>
                          {" "}
                          {productPlan.ppStartDate.split("T")[0]} ~{" "}
                          {productPlan.ppEndDate.split("T")[0]}
                        </div>
                      </div>
                    );
                  })}
              </>
            </Drawer>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectViewPresenter;
