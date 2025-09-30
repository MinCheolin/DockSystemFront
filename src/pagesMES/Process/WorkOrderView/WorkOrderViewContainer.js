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
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const resWork = await axios.get(`${MES_API}/work_orders`);
      setWorkOrder(resWork.data);
      const resPP = await axios.get(`${ERP_API}/product_plans`);
      setProductPlans(resPP.data);
    } catch (err) {
      alert("조회 실패");
    } finally {
      setLoading(false);
    }
  };

  const fetchBomDetails = async (ppBomNo) => {
    try {
      const res = await axios.get(`${ERP_API}/bomdetails/${ppBomNo}`);
      setBomDetails((prev) => ({
        ...prev,
        [ppBomNo]: res.data,
      }));
    } catch (err) {
      alert("조회 실패");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (workOrder.length === 0 || productPlans.length === 0) return;

    workOrder.forEach((wo) => {
      const pp = productPlans.find((pp) => pp.ppNo === Number(wo.ppNo));
      if (pp && !bomDetails[pp.bom.bomNo]) {
        fetchBomDetails(pp.bom.bomNo);
      }
    });
  }, [workOrder, productPlans]);

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
