import ProductPlanMesPresenter from "./ProductPlanMesPresenter";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ERP_API } from "../../../config";
import { ERPapi } from "../../../components/api/api";

const ProductPlanMesContainer = () => {
  const [productplans, setProductPlans] = useState([]);
  const navigate = useNavigate();
  const fetchDate = async () => {
    try {
      const response = await ERPapi.get(`${ERP_API}/product_plans`);
      setProductPlans(response.data);
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

  return (
    <ProductPlanMesPresenter
      productplans={productplans}
      HandleAddWorkOrder={HandleAddWorkOrder}
    />
  );
};

export default ProductPlanMesContainer;
