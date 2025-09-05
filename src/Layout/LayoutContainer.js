import { useState } from 'react';
import LayoutPresent from "./LayoutPresent";


const LayoutContainer = () =>{
  const [collapsed, setCollapsed] = useState(false);

return (
    <div>
       <LayoutPresent collapsed={collapsed}  setCollapsed={setCollapsed} /> 
    </div>
);

}

export default LayoutContainer;





