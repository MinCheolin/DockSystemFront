import axios from "axios";
import ProjectViewPresenter from "./ProjcectViewPresenter";
import { useEffect, useState } from "react";

const ProjectViewContainer = () => {
  const [projects, setProjects] = useState([]);
  const fetchData = async () => {
    try {
      const resProjects = await axios.get(
        "http://localhost:8080/api/erp/v1/projects"
      );
      setProjects(resProjects.data);
    } catch (err) {
      console.log("조회 실패" + err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return <ProjectViewPresenter projects={projects} />;
};
export default ProjectViewContainer;
