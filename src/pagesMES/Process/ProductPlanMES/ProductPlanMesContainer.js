import ProductPlanMesPresenter from "./ProductPlanMesPresenter";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ERP_API, MES_API } from "../../../config";
import { ERPapi, MESapi } from "../../../components/api/api";

const ProductPlanMesContainer = () => {
  const [selectedValue, setSelectedValue] = useState("미완료");
  const [productplans, setProductPlans] = useState([]);
  const [workOrders, setWorkOrders] = useState([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await ERPapi.get(`${ERP_API}/product_plans`);
      const resWO = await MESapi.get(`${MES_API}/work_orders`);
      setProductPlans(
        response.data.filter((data) => data.project.type !== "대기")
      );
      setWorkOrders(resWO.data);
    } catch (err) {
      alert("조회 실패");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const HandleAddWorkOrder = (pp) => {
    navigate("/mes/workorderCreate", {
      state: {
        ppNo: pp.ppNo,
        ppName: pp.ppName,
        spName: pp?.bom?.standardProcess?.spName ?? "-",
        vesselName: pp?.bom?.vessel?.vesselName ?? "-",
      },
    });
  };

  const HandleChangePpStatus = async (record) => {
    try {
      if (record.ppStatus === "미완료") {
        await ERPapi.patch(`${ERP_API}/product_plans/${record.ppNo}/status`, {
          ppStatus: "완료",
        });
      } else {
        await ERPapi.patch(`${ERP_API}/product_plans/${record.ppNo}/status`, {
          ppStatus: "미완료",
        });
      }
      fetchData();
    } catch (err) {
      alert("상태값 변경 실패");
    }
  };

  const HandleExpand = (expanded, record) => {
    if (expanded) {
      setExpandedRowKeys(record.projectNo);
    } else {
      setExpandedRowKeys(null);
    }
  };

  return (
    <ProductPlanMesPresenter
      productplans={productplans}
      workOrders={workOrders}
      expandedRowKeys={expandedRowKeys}
      selectedValue={selectedValue}
      setSelectedValue={setSelectedValue}
      HandleAddWorkOrder={HandleAddWorkOrder}
      setExpandedRowKeys={setExpandedRowKeys}
      HandleExpand={HandleExpand}
      HandleChangePpStatus={HandleChangePpStatus}
    />
  );
};

export default ProductPlanMesContainer;
