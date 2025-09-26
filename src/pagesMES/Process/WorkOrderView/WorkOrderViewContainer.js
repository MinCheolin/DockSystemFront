import { useNavigate } from "react-router-dom";
import WorkOrderViewPresenter from "./WorkOrderViewPresenter";
import { useEffect, useState } from "react";
import axios from "axios";
import { MES_API } from "../../../config";

const WorkOrderViewContainer = () => {
  const navigate = useNavigate();
  const [workOrder, setWorkOrder] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${MES_API}/work_orders`);
      setWorkOrder(response.data);
    } catch (err) {
      alert("조회 실패");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const HandleMoveDetail = (key) => {
    navigate(`/mes/workOrderDetail/${key}`);
  };
  return (
    <WorkOrderViewPresenter
      workOrder={workOrder}
      HandleMoveDetail={HandleMoveDetail}
    />
  );
};

export default WorkOrderViewContainer;
