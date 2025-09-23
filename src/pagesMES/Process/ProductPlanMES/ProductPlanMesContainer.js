import ProductPlanMesPresenter from "./ProductPlanMesPresenter";
import { useEffect, useState } from "react";
import axios from "axios";
const ProductPlanMesContainer = () => {
  const ERP_API = "http://localhost:8080/api/erp/v1";
  const [productplans, setProductPlans] = useState([]);
  const fetchDate = async () => {
    try {
      const response = await axios.get(`${ERP_API}/product_plans`);
      setProductPlans(response.data);
    } catch (err) {
      alert("조회 실패");
    }
  };

  useEffect(() => {
    fetchDate();
  }, []);
  console.log(productplans);
  return <ProductPlanMesPresenter productplans={productplans} />;
};

export default ProductPlanMesContainer;
