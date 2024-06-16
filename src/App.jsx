import React from 'react';

import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import SignIn from './components/Signin';
import VehicleDetail from './pages/VehicleDetail';
import MyVehicle from './pages/MyVehicle';
import Layout from './Layouts/Layout';
import BuyDashBoard from './pages/BuyDashboard';
import SellDashboard from './pages/SellDashboard';
import Allvehicles from './pages/Allvehicles';
import EvaluterDashboard from './pages/EvaluterDashboard';
import AdminDashboard from './pages/AdminDashboard';
import EditProfile from './pages/EditProfile';
import RoleLayout from './Layouts/RoleLayout';
import Denied from './pages/Denied';


function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Layout><Home /></Layout>} /> */}
        <Route path="/vehiclelist" element={<Layout><Allvehicles /></Layout>} />
        <Route path="/signup" element={<Layout><Signup /></Layout>} />
        <Route path="/vehicle/:id" element={<Layout><VehicleDetail /></Layout>} />
        <Route path="/signin" element={<Layout><SignIn /></Layout>} />
        <Route path="/denied" element={<Layout><Denied /></Layout>} />


        <Route element={<RoleLayout allowedRoles={["buyer","ADMIN"]} />}>
          <Route
            path="/sellvehicle"
            element={<Layout><SellDashboard /></Layout>}
          />
          <Route
            path="/"
            element={<Layout><BuyDashBoard /></Layout>}
          />
          <Route
            path="/myvehicle"
            element={<Layout><MyVehicle /></Layout>}
          />

          <Route
            path="/editprofile"
            element={<Layout><EditProfile /></Layout>}
          />
        </Route>


        <Route element={<RoleLayout allowedRoles={["ADMIN"]} />}>

          <Route
            path="/admindashboard"
            element={<Layout><AdminDashboard /></Layout>}
          />
          <Route path="/evaluterdashboard" element={<Layout><EvaluterDashboard /></Layout>} />
        </Route>

      </Routes>
    </>
  );
}

export default App;
