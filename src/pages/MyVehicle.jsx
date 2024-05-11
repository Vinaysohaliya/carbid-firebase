import React from 'react'
import Mywishlist from '../components/MyVehicel/Mywishlist'
import ListtedVehicle from '../components/MyVehicel/ListtedVehicle'
import MyBids from '../components/MyVehicel/MyBids'

const MyVehicle = () => {
  return (
    <div>
      <Mywishlist/>
      <br></br>
      <ListtedVehicle/>
      <br></br>
      <MyBids/>
    </div>
  )
}

export default MyVehicle
