import "./App.css";

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./components/Admin/AdminLogin";
import CounterExecLogin from "./components/CounterExecLogin";
import CustomerPanel from "./components/CustomerPanel";
import CounterExecPanel from "./components/CounterExecPanel";
import AllCountersPanel from "./components/AllCountersPanel";
import Counter from "./components/Counter";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddCounter from "./components/Admin/AdminPanel/AddCounter";
import AdminDashboard from "./components/Admin/AdminDashBoard";
import AddServices from "./components/Admin/AdminPanel/AddService";
import AddCounterExecutive from "./components/Admin/AdminPanel/AddCounterExecutive";
import AddCatchAllCounter from "./components/Admin/AdminPanel/AddCatchAll";

function App() {
  return (
    <Fragment>
      <ToastContainer />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login/admin" element={<AdminLogin />} />
          <Route
            path="/login/counter-executive"
            element={<CounterExecLogin />}
          />
          <Route path="/counter-executive" element={<CounterExecPanel />} />
          <Route path="/customer-panel" element={<CustomerPanel />} />
          <Route path="/all-counter-panel" element={<AllCountersPanel />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/add/counter" element={<AddCounter />} />
          <Route path="/add/service" element={<AddServices />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route
            path="/admin/catchallcounter"
            element={<AddCatchAllCounter />}
          />
          <Route
            path="/admin/addcounterexecutive"
            element={<AddCounterExecutive />}
          />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
