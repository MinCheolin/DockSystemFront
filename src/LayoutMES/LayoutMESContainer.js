import { useState } from "react";
import LayoutMESPresent from "./LayoutMESPresenter";

const LayoutMESContainer = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      <LayoutMESPresent collapsed={collapsed} setCollapsed={setCollapsed} />
    </div>
  );
};

export default LayoutMESContainer;
