import ProjectViewPresenter from "./ProjcectViewPresenter";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ERP_API } from "../../../config";
import { ERPapi } from "../../../components/api/api";

const ProjectViewContainer = () => {
  const [projects, setProjects] = useState([]);
  const [productPlans, setProductPlans] = useState([]);
  const [value, setValue] = useState("대기");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectStatus, setSelectStatus] = useState(null);
  const navigate = useNavigate();

  const HandleProjectUpdate = (key) => {
    navigate(`/erp/project/projectUpdate/${key}`);
  };

  const getStatusClass = (value) => {
    switch (value) {
      case "미완료":
        return "incomplete";
      case "완료":
        return "complete";
    }
  };

  const fetchData = async () => {
    try {
      const resProjects = await ERPapi.get(`${ERP_API}/projects`);
      const resProductPlans = await ERPapi.get(`${ERP_API}/product_plans`);
      setProjects(resProjects.data);
      setProductPlans(resProductPlans.data);
    } catch (err) {
      console.log("조회 실패" + err);
    }
  };

  const HandleDeleteProject = async (id) => {
    try {
      await ERPapi.delete(`${ERP_API}/projects/${id}`);
      fetchData();
    } catch (err) {
      alert("삭제 실패");
    }
  };

  const HandleModalStatusChange = () => {
    setIsModalOpen(!isModalOpen);
  };

  const HandleStatusChangeBtnClick = (status) => {
    setSelectStatus(status);
    setIsModalOpen(!isModalOpen);
  };
  const HandleChangeType = async (pjtNo) => {
    try {
      await ERPapi.patch(`${ERP_API}/projects/${pjtNo}/type`, {
        type: selectStatus,
      });
      setIsModalOpen(!isModalOpen);
      fetchData();
    } catch (err) {
      alert("상태 변경 실패");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ProjectViewPresenter
      isModalOpen={isModalOpen}
      projects={projects}
      value={value}
      productPlans={productPlans}
      selectStatus={selectStatus}
      setValue={setValue}
      HandleProjectUpdate={HandleProjectUpdate}
      HandleDeleteProject={HandleDeleteProject}
      HandleModalStatusChange={HandleModalStatusChange}
      HandleStatusChangeBtnClick={HandleStatusChangeBtnClick}
      HandleChangeType={HandleChangeType}
      getStatusClass={getStatusClass}
    />
  );
};
export default ProjectViewContainer;
