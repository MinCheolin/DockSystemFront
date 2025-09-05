import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutPresent from "./Layout/LayoutPresent";
import SafetyBoard from "./pages/SafetyBoard";
import Home from "./pages/Home";
import Client from "./pages/Standard/Client";

const App = () => {
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LayoutPresent/>}>
            <Route index element={<Home />} /> 
            <Route path="home" element ={<Home />}/>
            <Route path="standard/client" element = {<Client />}></Route>
            <Route path="safety" element={<SafetyBoard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
};
export default App;