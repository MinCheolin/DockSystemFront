import { useNavigate } from "react-router-dom";
import WorkOrderViewPresenter from "./WorkOrderViewPresenter";

const WorkOrderViewContainer = () => {
  const navigate = useNavigate();
  const HandleMoveDetail = (key) => {
    navigate(`/mes/workOrderDetail/${key}`);
  };
  return <WorkOrderViewPresenter HandleMoveDetail={HandleMoveDetail} />;
};

export default WorkOrderViewContainer;
