import WorkOrderViewPresenter from "./WorkOrderViewPresenter";
import { useEffect, useState } from "react";
import axios from "axios";
import { ERP_API } from "../../../config";
import { MES_API } from "../../../config";
import { MESapi } from "../../../components/api/api";

const WorkOrderViewContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nowStatus, setNowStatus] = useState("대기");
  const [workOrder, setWorkOrder] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [productPlans, setProductPlans] = useState([]);
  const [bomDetails, setBomDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [woStatus, setWoStatus] = useState("");
  const [qcInfo, setQcInfo] = useState({ type: "대기" });

  const fetchData = async () => {
    setLoading(true);
    try {
      const resWork = await axios.get(`${MES_API}/work_orders`);
      setWorkOrder(resWork.data);
      const resPP = await axios.get(`${ERP_API}/product_plans`);
      setProductPlans(resPP.data);
      const response = await MESapi.get(`${MES_API}/stocks`);
      setStocks(response.data);
    } catch (err) {
      alert("조회 실패");
    } finally {
      setLoading(false);
    }
  };
  console.log(workOrder);

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
      if (pp.bom != null) {
        if (pp && !bomDetails[pp.bom.bomNo]) {
          fetchBomDetails(pp.bom.bomNo);
        }
      }
    });
  }, [workOrder, productPlans]);

  const HandleModalStatusChange = () => {
    setIsModalOpen(!isModalOpen);
  };

  const HandleWoStatusChange = (value) => {
    setWoStatus(value);
  };

  const HandleStockChange = (name, value) => {
    setQcInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const HandleNumberChange = (woNo, value) => {
    setQcInfo((prev) => ({ ...prev, woNo: woNo, totalQuantity: value }));
  };
  const HandleStatusUpdate = async (woNo) => {
    if (woStatus === "품질") {
      await MESapi.post(`${MES_API}/quality_controls`, qcInfo);
    }
    await MESapi.patch(`${MES_API}/work_orders/${woNo}/type`, {
      type: woStatus,
    });
    setIsModalOpen(false);
    fetchData();
  };

  return (
    <WorkOrderViewPresenter
      workOrder={workOrder}
      productPlans={productPlans}
      stocks={stocks}
      bomDetails={bomDetails}
      isModalOpen={isModalOpen}
      woStatus={woStatus}
      nowStatus={nowStatus}
      setNowStatus={setNowStatus}
      HandleModalStatusChange={HandleModalStatusChange}
      HandleWoStatusChange={HandleWoStatusChange}
      HandleNumberChange={HandleNumberChange}
      HandleStatusUpdate={HandleStatusUpdate}
      HandleStockChange={HandleStockChange}
    />
  );
};

export default WorkOrderViewContainer;
