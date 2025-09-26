import axios from "axios";
import WorkOrderDetailPresenter from "./WorkOrderDetailPresenter";
import { useEffect, useState } from "react";
import { MES_API } from "../../../config";
import { useParams, useNavigate } from "react-router-dom";

const WorkOrderDetailContainer = () => {
  const { woNo } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedWorkOrder, setSelectedWorkOrder] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${MES_API}/work_orders/${woNo}`);
      setSelectedWorkOrder(response.data);
    } catch (err) {
      alert("조회 실패");
    }
  };

  useEffect(() => {
    fetchData();
  }, [woNo]);

  const HandleModalStatusChange = () => {
    setIsModalOpen(!isModalOpen);
  };
  const selectedMaterial = () => selectedWorkOrder?.material;
  const selectedEquipment = () => selectedWorkOrder?.equipment;

  const HandleMoveUpdate = (woNo) => {
    navigate(`/mes/workOrderUpdate/${woNo}`);
  };

  return (
    <WorkOrderDetailPresenter
      woNo={woNo}
      selectedMaterial={selectedMaterial}
      selectedEquipment={selectedEquipment}
      selectedWorkOrder={selectedWorkOrder}
      HandleMoveUpdate={HandleMoveUpdate}
      HandleModalStatusChange={HandleModalStatusChange}
      isModalOpen={isModalOpen}
    />
  );
};

export default WorkOrderDetailContainer;
