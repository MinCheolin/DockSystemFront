import { useNavigate, useParams } from "react-router-dom";
import ProjectUpdatePresenter from "./ProjectUpdatePresenter";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";

const ProjectUpdateContainer = () => {
  const API_URL = "http://localhost:8080/api/erp/v1";
  const { id } = useParams();
  const [updateProject, setUpdateProject] = useState({});
  const [customers, setCustomers] = useState([]);
  const [vessels, setVessels] = useState([]);
  const [boms, setBoms] = useState([]);
  const [productPlans, setProductPlans] = useState([
    { ppName: "", ppStartDate: null, ppEndDate: null, bomNo: "" },
  ]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const resData = await axios.get(`${API_URL}/projects/${id}`);
      const resBom = await axios.get(`${API_URL}/boms`);
      const resCustomer = await axios.get(`${API_URL}/customers`);
      const resVessel = await axios.get(`${API_URL}/vessels`);
      const resPP = await axios.get(`${API_URL}/product_plans/${id}`);
      setUpdateProject({
        projectNo: resData.data.projectNo,
        projectName: resData.data.projectName,
        projectStartDate: resData.data.projectStartDate,
        projectEndDate: resData.data.projectEndDate,
        customerNo: resData.data.customer.customerNo,
        vesselNo: resData.data.vessel.vesselNo,
        projectPrice: resData.data.projectPrice,
        type: resData.data.type,
        projectDescription: resData.data.projectDescription,
      });
      setProductPlans(
        resPP.data.map(({ bom, ...rest }) => ({
          ...rest,
          bomNo: bom.bomNo,
        }))
      );
      setCustomers(resCustomer.data);
      setVessels(resVessel.data);
      setBoms(resBom.data);
    } catch (err) {
      console.log(err);
      alert("조회 실패");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const HandleChangeInput = (e) => {
    const { name, value } = e.target;
    setUpdateProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const HandleChangeSelect = (name, value) => {
    setUpdateProject((prev) => ({
      ...prev,
      [name]: value,
    }));
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
  const HandleChangeDate = (dates) => {
    if (dates) {
      setUpdateProject((prev) => ({
        ...prev,
        projectStartDate: dates[0]?.format("YYYY-MM-DD"),
        projectEndDate: dates[1]?.format("YYYY-MM-DD"),
      }));
    } else {
      setUpdateProject((prev) => ({
        ...prev,
        projectStartDate: null,
        projectEndDate: null,
      }));
    }
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

  const HandleMoveList = () => {
    navigate("/erp/project/projectView");
  };

  const addRow = () => {
    setProductPlans([
      ...productPlans,
      {
        ppStartDate: "",
        ppEndDate: "",
      },
    ]);
  };

  const removeRow = (index) => {
    setProductPlans(productPlans.filter((_, i) => i !== index));
  };

  const HandleUpdateProjectInfo = async () => {
    const finalData = {
      ...updateProject,
      productPlans: productPlans,
    };
    console.log(finalData);
    try {
      await axios.put(`${API_URL}/projects/${id}`, finalData);
      navigate("/erp/project/projectView");
    } catch (err) {
      alert("수정 실패");
    }
  };

  return (
    <ProjectUpdatePresenter
      project={updateProject}
      vessels={vessels}
      customers={customers}
      productPlans={productPlans}
      boms={boms}
      HandleChangeInput={HandleChangeInput}
      HandleChangeSelect={HandleChangeSelect}
      HandleUpdateProjectInfo={HandleUpdateProjectInfo}
      HandleMoveList={HandleMoveList}
      addRow={addRow}
      removeRow={removeRow}
      HandleChangeDateProductPlan={HandleChangeDateProductPlan}
      HandleChangePPinfo={HandleChangePPinfo}
      HandleChangeDate={HandleChangeDate}
    />
  );
};

export default ProjectUpdateContainer;
