import ProjectCreatePresenter from "./ProjectCreatePresenter";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { ERP_API } from "../../../config";
import { ERPapi } from "../../../components/api/api";

const ProjectCreateContainer = () => {
  const navigate = useNavigate();
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
      const resCustomers = await ERPapi.get(`${ERP_API}/customers`);
      setCustomers(resCustomers.data);
      const resVessels = await ERPapi.get(`${ERP_API}/vessels`);
      setVessels(resVessels.data);
      const resBoms = await ERPapi.get(`${ERP_API}/boms`);
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
    try {
      await ERPapi.post(`${ERP_API}/projects`, finalData);
      navigate("/erp/project/projectView");
    } catch (err) {
      alert("등록 실패");
    }
  };

  return (
    <ProjectCreatePresenter
      customers={customers}
      vessels={vessels}
      boms={boms}
      projectInfo={projectInfo}
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
