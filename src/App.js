import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutPresent from "./Layout/LayoutPresent";
import SafetyBoard from "./pages/SafetyBoard";
import Home from "./pages/Home";
import Tab from "./pages/Standard/Tab";
import Client from "./pages/Standard/Client";
import Customer from "./pages/Standard/Customer";
import Equipment from "./pages/Standard/Equipment";
import StandardProcess from "./pages/Standard/StandardProcess";
import Login from "./pages/Login";
import ProjectView from "./pages/Project/ProjectView";
import ProjectCreate from "./pages/Project/ProjectCreate";
import BOM from "./pages/Standard/BOM";
import Warehouse from "./pages/Standard/Warehouse";
import Vessel from "./pages/Standard/Vessel";
import Material from "./pages/Standard/Material";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
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
            <Route path="project/projectCreate" element={<ProjectCreate />} />
            <Route path="standard/bom" element={<BOM />} />
            <Route path="standard/warehouse" element={<Warehouse />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
