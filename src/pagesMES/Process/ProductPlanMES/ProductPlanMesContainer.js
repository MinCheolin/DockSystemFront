import ProductPlanMesPresenter from "./ProductPlanMesPresenter";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ERP_API, MES_API } from "../../../config";
import { ERPapi, MESapi } from "../../../components/api/api";

const ProductPlanMesContainer = () => {
  const [productplans, setProductPlans] = useState([]);
  const [workOrders, setWorkOrders] = useState([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState(null);
  const navigate = useNavigate();

  const fetchDate = async () => {
    try {
      const response = await ERPapi.get(`${ERP_API}/product_plans`);
      const resWO = await MESapi.get(`${MES_API}/work_orders`);
      setProductPlans(response.data);
      setWorkOrders(resWO.data);
    } catch (err) {
      alert("조회 실패");
    }
  };

  useEffect(() => {
    fetchDate();
  }, []);

  const HandleAddWorkOrder = (ppNo) => {
    navigate("/mes/workorderCreate", { state: { ppNo } });
  };

  const HandleExpand = (expanded, record) => {
    if (expanded) {
      // 새로운 행 열기: 기존 열린 행은 자동으로 닫힘
      setExpandedRowKeys(record.projectNo);
    } else {
      // 행 닫기
      setExpandedRowKeys(null);
    }
  };

  return (
    <ProductPlanMesPresenter
      productplans={productplans}
      workOrders={workOrders}
      expandedRowKeys={expandedRowKeys}
      HandleAddWorkOrder={HandleAddWorkOrder}
      setExpandedRowKeys={setExpandedRowKeys}
      HandleExpand={HandleExpand}
    />
  );
};

export default ProductPlanMesContainer;
