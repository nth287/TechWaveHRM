import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./Components/Home/Home";
import AddLeave from "./Components/Add Leave/AddLeave";
import Details from "./Components/Details/Details";
import UpdateUser from "./Components/Update User/UpdateUser";
import ManagerDashboard from "./Components/ManagerDashboard/ManagerDashboard";
import EmployeeDashboard from "./Components/EmployeeDashboard/EmployeeDashboard";
import ModernNav from "./Components/Nav/ModernNav";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <ModernNav />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mainhome" element={<Home />} />
          <Route path="/manager" element={<ManagerDashboard />} />
          <Route path="/details" element={<Details />} />
          <Route path="/details/:id" element={<UpdateUser />} />
          <Route path="/employee" element={<EmployeeDashboard />} />
          <Route path="/addleave" element={<AddLeave />} />
          <Route path="/dashboard" element={<EmployeeDashboard />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;


