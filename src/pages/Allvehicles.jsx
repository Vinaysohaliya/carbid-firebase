import React, { useState } from 'react';
import VehicleList from '../components/VehicleList';
import Filters from '../components/Filter/Filters';
import { BreadcrumbItem, Breadcrumbs, Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Select, SelectItem } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import Exploreby from '../components/Exploreby';

const Allvehicles = () => {
  const [openDropdowns, setOpenDropdowns] = useState({
    car: false,
    bike: false,
    scooty: false,
  });

  const navigate=useNavigate()

  function handelRoute() {
    navigate('/')
  }


  const handleDropdownClick = (dropdownName) => {
    setOpenDropdowns({
      [dropdownName]: !openDropdowns[dropdownName],
    });
  };
  return (
    <div className="flex flex-col  w-full">
   <Exploreby/>

      <div className='flex flex-col md:flex-row px-4 mt-8 mx-6'>
        <div className="md:w-1/5 pr-4">
          <Breadcrumbs className='mb-4'>
            <BreadcrumbItem onClick={handelRoute}  className='font-semibold'>Home</BreadcrumbItem>
            <BreadcrumbItem className='font-semibold' color='primary'>Hot auctions in noida </BreadcrumbItem>
          </Breadcrumbs>
          <Filters />
        </div>
        <div className="md:w-5/6">
          <VehicleList />
        </div>
      </div>
    </div>
  );
};

export default Allvehicles;
