import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import LayoutPresent from "./Layout/LayoutPresent";
import LayoutMES from "./LayoutMES";
import SafetyBoard from "./pages/SafetyBoard";
import Home from "./pages/Home";
import Tab from "./pages/Standard/Tab";
import Client from "./pages/Standard/Client";
import Customer from "./pages/Standard/Customer";
import Equipment from "./pages/Standard/Equipment";
import StandardProcess from "./pages/Standard/StandardProcess";
import ProjectView from "./pages/Project/ProjectView";
import ProjectCreate from "./pages/Project/ProjectCreate";
import ProjectUpdate from "./pages/Project/ProjectUpdate";
import BOM from "./pages/Standard/BOM";
import Warehouse from "./pages/Standard/Warehouse";
import Vessel from "./pages/Standard/Vessel";
import Material from "./pages/Standard/Material";
import MesHome from "./pagesMES/MesHome";
import ProductPlanMES from "./pagesMES/Process/ProductPlanMES";
import WorkOrderCreate from "./pagesMES/Process/WorkOrderCreate";
import WorkOrderView from "./pagesMES/Process/WorkOrderView";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path="/erp" element={<LayoutPresent />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="standard/user" element={<Tab />} />
            <Route path="standard/vessel" element={<Vessel />} />
            <Route path="standard/material" element={<Material />} />
            <Route
              path="standard/standardprocess"
              element={<StandardProcess />}
            />
            <Route path="standard/client" element={<Client />}></Route>
            <Route path="standard/customer" element={<Customer />}></Route>
            <Route path="standard/equipment" element={<Equipment />}></Route>
            <Route path="safety" element={<SafetyBoard />} />
            <Route path="project/projectView" element={<ProjectView />} />
            <Route
              path="project/projectUpdate/:id"
              element={<ProjectUpdate />}
            />
            <Route path="project/projectCreate" element={<ProjectCreate />} />
            <Route path="standard/bom" element={<BOM />} />
            <Route path="standard/warehouse" element={<Warehouse />}></Route>
          </Route>
          <Route path="/mes" element={<LayoutMES />}>
            <Route index element={<MesHome />} />
            <Route path="productPlan" element={<ProductPlanMES />} />
            <Route path="workOrder" element={<WorkOrderView />} />
            <Route path="workorderCreate" element={<WorkOrderCreate />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
