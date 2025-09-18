import axios from "axios";
import ProjectViewPresenter from "./ProjcectViewPresenter";
import { useEffect, useState } from "react";

const ProjectViewContainer = () => {
  const API_URL = "http://localhost:8080/api/erp/v1";
  const [projects, setProjects] = useState([]);
  const [productPlans, setProductPlans] = useState([]);
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
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ProjectViewPresenter projects={projects} productPlans={productPlans} />
  );
};
export default ProjectViewContainer;
