import ProjectCreatePresenter from "./ProjectCreatePresenter";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";

const ProjectCreateContainer = () => {
  const API_URL = "http://localhost:8080/api/erp/v1";
  const [customers, setCustomers] = useState([]);
  const [vessels, setVessels] = useState([]);
  const [boms, setBoms] = useState([]);
  const [projectInfo, setProjectInfo] = useState([]);
  const [productPlans, setProductPlans] = useState([
    { ppName: "", ppStartDate: null, ppEndDate: null, bom: "" },
  ]);

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

  const HandleChangeDateProductPlan = (index, dates) => {
    setProductPlans((prev) =>
      prev.map((plan, i) =>
        i === index
          ? {
              ...plan,
              ppStartDate: dates ? dates[0]?.format("YYYY-MM-DD") : null,
              ppEndDate: dates ? dates[1]?.format("YYYY-MM-DD") : null,
            }
          : plan
      )
    );
  };

  const HandleChangePPinfo = (index, name, value) => {
    const newPlans = [...productPlans];
    if (name === "dateRange") {
      newPlans[index].ppStartDate = dayjs(value[0]);
      newPlans[index].ppEndDate = dayjs(value[1]);
    } else {
      newPlans[index][name] = value;
    }
    setProductPlans(newPlans);
  };

  const addRow = () => {
    setProductPlans([...productPlans, {}]);
  };

  const removeRow = (index) => {
    setProductPlans(productPlans.filter((_, i) => i !== index));
  };

  const fetchData = async () => {
    try {
      const resCustomers = await axios.get(`${API_URL}/customers`);
      setCustomers(resCustomers.data);
      const resVessels = await axios.get(`${API_URL}/vessels`);
      setVessels(resVessels.data);
      const resBoms = await axios.get(`${API_URL}/boms`);
      setBoms(resBoms.data);
    } catch (err) {}
  };
  useEffect(() => {
    fetchData();
  }, []);

  const HandleCreateProject = async () => {
    const finalData = {
      ...projectInfo,
      productPlans: productPlans,
    };
    console.log(finalData);
    try {
      await axios.post(`${API_URL}/projects`, finalData);
    } catch (err) {
      alert("등록 실패");
    }
  };

  return (
    <ProjectCreatePresenter
      customers={customers}
      vessels={vessels}
      boms={boms}
      HandleChangeInput={HandleChangeInput}
      HandleChangeSelect={HandleChangeSelect}
      HandleChangeDate={HandleChangeDate}
      HandleChangeDateProductPlan={HandleChangeDateProductPlan}
      HandleCreateProject={HandleCreateProject}
      HandleChangePPinfo={HandleChangePPinfo}
      addRow={addRow}
      removeRow={removeRow}
      productPlans={productPlans}
    />
  );
};

export default ProjectCreateContainer;
