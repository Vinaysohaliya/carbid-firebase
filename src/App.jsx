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
import AuthLayout from './Layouts/AuthLayout';


function App() {

  return (
    <>
    <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/vehiclelist" element={<Layout><Allvehicles /></Layout>} />
        <Route path="/signup" element={<Layout><Signup /></Layout>} />
        <Route path="/vehicle/:id" element={<Layout><VehicleDetail /></Layout>} />
        <Route path="/signin" element={<Layout><SignIn /></Layout>} />
        <Route
          path="/sellvehicle"
          element={<AuthLayout><Layout><SellDashboard /></Layout></AuthLayout>}
        />
        <Route
          path="/buyvehicle"
          element={<AuthLayout><Layout><BuyDashBoard /></Layout></AuthLayout>}
        />
        <Route
          path="/myvehicle"
          element={<AuthLayout><Layout><MyVehicle /></Layout></AuthLayout>}
        />
        
      </Routes>
    </>
  );
}

export default App;
