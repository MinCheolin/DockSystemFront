import { useLocation } from "react-router-dom";
import WorkOrderCreatePresenter from "./WorkOrderCreatePresenter";
import { useState } from "react";

const WorkOrderCreateContainer = () => {
  const location = useLocation();
  const { ppNo } = location.state || {};
  const [workOrder, setWorkOrder] = useState({
    ppNo: { ppNo },
    type: "대기",
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

  const HandleCreateWorkOrder = () => {
    console.log(workOrder);
  };

  return (
    <WorkOrderCreatePresenter
      ppNo={ppNo}
      HandleChangeInput={HandleChangeInput}
      HandleChangeSelect={HandleChangeSelect}
      HandleChangeDate={HandleChangeDate}
      HandleCreateWorkOrder={HandleCreateWorkOrder}
    />
  );
};
export default WorkOrderCreateContainer;
