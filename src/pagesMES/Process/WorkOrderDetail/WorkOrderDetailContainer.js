import WorkOrderDetailPresenter from "./WorkOrderDetailPresenter";
import { useState } from "react";

const WorkOrderDetailContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const HandleModalStatusChange = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <WorkOrderDetailPresenter
      HandleModalStatusChange={HandleModalStatusChange}
      isModalOpen={isModalOpen}
    />
  );
};

export default WorkOrderDetailContainer;
