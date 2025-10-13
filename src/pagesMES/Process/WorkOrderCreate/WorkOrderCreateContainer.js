import { useLocation, useNavigate } from "react-router-dom";
import WorkOrderCreatePresenter from "./WorkOrderCreatePresenter";
import { useEffect, useState } from "react";
import { ERP_API, MES_API } from "../../../config";
import { ERPapi, MESapi } from "../../../components/api/api";

const WorkOrderCreateContainer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ppNo } = location.state || {};
  const [equipments, setEquipments] = useState([]);
  const [productPlans, setProductPlans] = useState([]);
  const [workOrder, setWorkOrder] = useState({
    woName: "",
    woStartDate: "",
    woEndDate: "",
    woDetail: "",
    woDescription: "",
    type: null,
    ppNo: String(ppNo),
    equipNo: "",
  });

  const HandleChangeInput = (e) => {
    const { name, value } = e.target;
    setWorkOrder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const HandleChangeSelect = (name, value) => {
    setWorkOrder((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const HandleChangeSelectType = (name, value) => {
    setWorkOrder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const HandleChangeDate = (dates) => {
    if (dates) {
      setWorkOrder((prev) => ({
        ...prev,
        woStartDate: dates[0]?.format("YYYY-MM-DD"),
        woEndDate: dates[1]?.format("YYYY-MM-DD"),
      }));
    } else {
      setWorkOrder((prev) => ({
        ...prev,
        woStartDate: null,
        woEndDate: null,
      }));
    }
  };

  const fetchData = async () => {
    try {
      const resEquipments = await MESapi.get(`${MES_API}/equipments`);
      setEquipments(resEquipments.data);
      const resPp = await ERPapi.get(`${ERP_API}/product_plans/mes/${ppNo}`);
      setProductPlans(resPp.data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  const HandleCreateWorkOrder = async () => {
    try {
      await MESapi.post(`${MES_API}/work_orders`, workOrder);
      navigate("/mes/workOrder");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <WorkOrderCreatePresenter
      workOrder={workOrder}
      equipments={equipments}
      ppNo={ppNo}
      productPlans={productPlans}
      HandleChangeInput={HandleChangeInput}
      HandleChangeSelect={HandleChangeSelect}
      HandleChangeSelectType={HandleChangeSelectType}
      HandleChangeDate={HandleChangeDate}
      HandleCreateWorkOrder={HandleCreateWorkOrder}
    />
  );
};
export default WorkOrderCreateContainer;
