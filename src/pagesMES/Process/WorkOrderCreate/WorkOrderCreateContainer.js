import { useLocation, useNavigate } from "react-router-dom";
import WorkOrderCreatePresenter from "./WorkOrderCreatePresenter";
import { useEffect, useState } from "react";
import { MES_API } from "../../../config";
import { MESapi } from "../../../components/api/api";

const WorkOrderCreateContainer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ppNo } = location.state || {};
  const [equipments, setEquipments] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [workOrder, setWorkOrder] = useState({
    woName: "",
    woStartDate: "",
    woEndDate: "",
    woDetail: "",
    woDescription: "",
    type: null,
    ppNo: String(ppNo),
    equipNo: "",
    materialNo: "",
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
      const resMaterials = await MESapi.get(`${MES_API}/materials`);
      setMaterials(resMaterials.data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  const HandleCreateWorkOrder = async () => {
    try {
      console.log(workOrder);
      await MESapi.post(`${MES_API}/work_orders`, workOrder);
      navigate("/mes/workOrder");
    } catch (err) {
      alert("등록 실패");
    }
  };

  return (
    <WorkOrderCreatePresenter
      workOrder={workOrder}
      materials={materials}
      equipments={equipments}
      ppNo={ppNo}
      HandleChangeInput={HandleChangeInput}
      HandleChangeSelect={HandleChangeSelect}
      HandleChangeSelectType={HandleChangeSelectType}
      HandleChangeDate={HandleChangeDate}
      HandleCreateWorkOrder={HandleCreateWorkOrder}
    />
  );
};
export default WorkOrderCreateContainer;
