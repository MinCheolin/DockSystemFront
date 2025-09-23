import axios from "axios";
import ProjectViewPresenter from "./ProjcectViewPresenter";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProjectViewContainer = () => {
  const API_URL = "http://localhost:8080/api/erp/v1";
  const [projects, setProjects] = useState([]);
  const [productPlans, setProductPlans] = useState([]);
  const navigate = useNavigate();

  const HandleProjectUpdate = (key) => {
    navigate(`/erp/project/projectUpdate/${key}`);
  };

  const fetchData = async () => {
    try {
      const resProjects = await axios.get(`${API_URL}/projects`);
      const resProductPlans = await axios.get(`${API_URL}/product_plans`);
      setProjects(resProjects.data);
      setProductPlans(resProductPlans.data);
    } catch (err) {
      console.log("조회 실패" + err);
    }
  };

  const HandleDeleteProject = async (id) => {
    try {
      await axios.delete(`${API_URL}/projects/${id}`);
      fetchData();
    } catch (err) {
      alert("삭제 실패");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ProjectViewPresenter
      projects={projects}
      productPlans={productPlans}
      HandleProjectUpdate={HandleProjectUpdate}
      HandleDeleteProject={HandleDeleteProject}
    />
  );
};
export default ProjectViewContainer;
