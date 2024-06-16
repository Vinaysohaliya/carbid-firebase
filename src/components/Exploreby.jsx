import { Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import React from 'react'

const Exploreby = () => {
  return (
    <>
<Divider />
      <div className="w-full items-center justify-start flex  rounded   pl-4 ml-6">
        <h2 className='mr-4'>Explore by</h2>
        <div className='mr-4'>
        <div className="mr-4">
          <Dropdown>
            <DropdownTrigger>
              <Button variant="">Types of vehicle </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Types of vehicle">
              <DropdownItem onClick={() => handleDropdownClick('car')}>
                Car
              </DropdownItem>
             
              <DropdownItem onClick={() => handleDropdownClick('bike')}>
                Bike
              </DropdownItem>
              
              <DropdownItem onClick={() => handleDropdownClick('scooty')}>
                Scooty
              </DropdownItem>
              
            </DropdownMenu>
          </Dropdown>
        </div>

    </div>

        <div className='mr-4'>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="">Brands</Button>
            </DropdownTrigger>
            <DropdownMenu  aria-label="Brands">
              <DropdownItem >Tata</DropdownItem>
              <DropdownItem>Hyundai</DropdownItem>
              <DropdownItem>Mahindra</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className='mr-4'>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="">Kms Travelled</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Kms Travelled">
              <DropdownItem>0 - 10,000 Kms</DropdownItem>
              <DropdownItem>10,000 - 20,000</DropdownItem>
              <DropdownItem>20,000 - 30,000</DropdownItem>
              <DropdownItem>30,000 - 40,000</DropdownItem>
              <DropdownItem>40,000 - 50,000</DropdownItem>
              <DropdownItem>More than 50,000</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className='mr-4'>

          <Dropdown>
            <DropdownTrigger>
              <Button variant="">Fuel Type</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Fuel Type">
              <DropdownItem>Petrol</DropdownItem>
              <DropdownItem>Diesel</DropdownItem>
              <DropdownItem>CNG</DropdownItem>
            </DropdownMenu>
          </Dropdown>

        </div>
        <div className='mr-4'>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="">Transmission</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Transmission">
              <DropdownItem>Auto</DropdownItem>
              <DropdownItem>Manual</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>





      </div>
      <Divider/> 
    </>
          
  )
}

export default Exploreby
