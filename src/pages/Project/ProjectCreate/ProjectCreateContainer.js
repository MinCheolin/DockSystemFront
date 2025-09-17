import ProjectCreatePresenter from "./ProjectCreatePresenter";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";

const ProjectCreateContainer = () => {
  const [customers, setCustomers] = useState([]);
  const [vessels, setVessels] = useState([]);
  const [projectInfo, setProjectInfo] = useState([]);
  const [productionPlans, setProductionPlans] = useState([]);

  const HandleChangeInput = (e) => {
    const { name, value } = e.target;
    setProjectInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const HandleChangeSelect = (name, value) => {
    setProjectInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const HandleChangeDate = (dates) => {
    if (dates) {
      setProjectInfo((prev) => ({
        ...prev,
        projectStartDate: dates[0]?.format("YYYY-MM-DD"),
        projectEndDate: dates[1]?.format("YYYY-MM-DD"),
      }));
    } else {
      setProjectInfo((prev) => ({
        ...prev,
        projectStartDate: null,
        projectEndDate: null,
      }));
    }
  };

  const HandleChangePPinfo = (index, name, value) => {
    const newPlans = [...productionPlans];
    if (name === "dateRange") {
      newPlans[index].ppStartDate = dayjs(value[0]);
      newPlans[index].ppEndDate = dayjs(value[1]);
    } else {
      newPlans[index][name] = value;
    }
    setProductionPlans(newPlans);
  };

  const tmpDataTest = () => {
    const finalData = {
      ...projectInfo,
      productionPlan: productionPlans,
    };
    console.log(finalData);
  };

  const addRow = () => {
    setProductionPlans([...productionPlans, {}]);
  };

  const removeRow = (index) => {
    setProductionPlans(productionPlans.filter((_, i) => i !== index));
  };

  const fetchData = async () => {
    try {
      const resCustomers = await axios.get(
        "http://localhost:8080/api/erp/v1/customers"
      );
      setCustomers(resCustomers.data);
      const resVessels = await axios.get(
        "http://localhost:8080/api/erp/v1/vessels"
      );
      setVessels(resVessels.data);
    } catch (err) {}
  };
  useEffect(() => {
    fetchData();
  }, []);

  const HandleCreateProject = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/erp/v1/projects",
        projectInfo
      );
    } catch (error) {
      console.error("등록 실패:", error);
    }
  };

  return (
    <ProjectCreatePresenter
      customers={customers}
      vessels={vessels}
      HandleChangeInput={HandleChangeInput}
      HandleChangeSelect={HandleChangeSelect}
      HandleChangeDate={HandleChangeDate}
      HandleCreateProject={HandleCreateProject}
      HandleChangePPinfo={HandleChangePPinfo}
      addRow={addRow}
      removeRow={removeRow}
      productionPlans={productionPlans}
      tmpDataTest={tmpDataTest}
    />
  );
};

export default ProjectCreateContainer;
