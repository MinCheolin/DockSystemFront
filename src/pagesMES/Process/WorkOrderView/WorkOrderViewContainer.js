import WorkOrderViewPresenter from "./WorkOrderViewPresenter";
import { useEffect, useState } from "react";
import axios from "axios";
import { ERP_API } from "../../../config";
import { MES_API } from "../../../config";

const WorkOrderViewContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workOrder, setWorkOrder] = useState([]);
  const [productPlans, setProductPlans] = useState([]);
  const [bomDetails, setBomDetails] = useState([]);

  const fetchData = async () => {
    try {
      const resWork = await axios.get(`${MES_API}/work_orders`);
      setWorkOrder(resWork.data);
      const resPP = await axios.get(`${ERP_API}/product_plans`);
      setProductPlans(resPP.data);
      const resBd = await axios.get(`${ERP_API}/bomdetails`);
      setBomDetails(resBd.data);
    } catch (err) {
      alert("조회 실패");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const HandleModalStatusChange = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <WorkOrderViewPresenter
      workOrder={workOrder}
      productPlans={productPlans}
      bomDetails={bomDetails}
      HandleModalStatusChange={HandleModalStatusChange}
      isModalOpen={isModalOpen}
    />
  );
};

export default WorkOrderViewContainer;
