import React from 'react';

import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import SignIn from './components/Signin';
import VehicleList from './pages/VehicleList';
import VehicleSellingForm from './components/VehicleForm';
import VehicleDetail from './pages/VehicleDetail';

function App() {

  return (
    <>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/list" element={<VehicleList />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/vehicle/:id" element={<VehicleDetail />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/sellform" element={<VehicleSellingForm />} />
      </Routes>
    </>
  );
}

export default App;