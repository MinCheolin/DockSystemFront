import axios from "axios";
import WorkOrderUpdatePresenter from "./WorkOrderUpdatePresenter";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MES_API } from "../../../config";
import { useParams } from "react-router-dom";

const WorkOrderUpdateContainer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { woNo } = useParams();
  const { ppNo } = location.state || {};
  const [selectedWorkOrder, setSelectedWorkOrder] = useState(null);
  const [equipments, setEquipments] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [workOrder, setWorkOrder] = useState({
    woNo: woNo,
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
      const response = await axios.get(`${MES_API}/work_orders/${woNo}`);
      setSelectedWorkOrder(response.data);
      const resEquipments = await axios.get(`${MES_API}/equipments`);
      setEquipments(resEquipments.data);
      const resMaterials = await axios.get(`${MES_API}/materials`);
      setMaterials(resMaterials.data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  const HandleUpdateWorkOrder = async () => {
    try {
      await axios.put(`${MES_API}/work_orders/${woNo}`, workOrder);
      navigate(`/mes/workOrderDetail/${woNo}`);
    } catch (err) {
      alert("수정 실패");
    }
  };

  const selectedMaterial = () => selectedWorkOrder?.material;
  const selectedEquipment = () => selectedWorkOrder?.equipment;

  return (
    <WorkOrderUpdatePresenter
      workOrder={workOrder}
      selectedWorkOrder={selectedWorkOrder}
      materials={materials}
      selectedMaterial={selectedMaterial}
      equipments={equipments}
      selectedEquipment={selectedEquipment}
      woNo={woNo}
      HandleChangeInput={HandleChangeInput}
      HandleChangeSelect={HandleChangeSelect}
      HandleChangeSelectType={HandleChangeSelectType}
      HandleChangeDate={HandleChangeDate}
      HandleUpdateWorkOrder={HandleUpdateWorkOrder}
    />
  );
};

export default WorkOrderUpdateContainer;
