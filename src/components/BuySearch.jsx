import React, { useEffect, useState } from 'react';
import { Button, Divider, Image, Input, Link, ScrollShadow, CircularProgress, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
import { useDispatch } from 'react-redux';
import useCurrentCity from '../hooks/useCurrentCity';
import carimg from '../assets/f402d1e9bd1077179c11d5502a3180a1.jpg';
import { fetchVehiclesByFilter, searchVehicles } from '../Redux/vehicleSlice';
import b1 from '../assets/374c24fdbbb811e3fe494f27ae695992.png';
import b2 from '../assets/6a2c6d1d7a63e9b0b4c51c016d3d96a8.png';
import b3 from '../assets/6b887207aa943cdf23bdff721988238b.png';
import b4 from '../assets/71a56f0bf6e78b7ca53ba588013427c5.png';
import b5 from '../assets/a9fe987ee1edd3fa351dee20689382da.png';
import b6 from '../assets/aac85f63ec516ad9f9038d1e9864160b.png';
import b7 from '../assets/bc3d6ddc5983ce11ad42ba78b28716ca.png';
import b8 from '../assets/c3e37bcf2700ab5e993594e2e31f0852.png';
import b9 from '../assets/d0202be409abd6ce3bc3cb03884c56e7.jpg';
import b10 from '../assets/dd574ce9ae4551ed764f80ff3e7addc1.png';

import city1 from '../assets/city/0690c6b725612a73907f20fe585f8daa.png';
import city2 from '../assets/city/255ceaad882dd3fb9f1bc294bb98ec75.png';
import city3 from '../assets/city/752bf30c8f4dcbee386afbedc29b048e.png';
import city4 from '../assets/city/76dfc7078a0ddc725959cba5c6ba3c32.png';
import city5 from '../assets/city/837a809d553ecdad415030dce1b7579a.png';
import city6 from '../assets/city/83a1a93845a04dc690cf035ad8215645.png';
import city7 from '../assets/city/9e07661e3d190ff5fe83cf4204565bfd.png';
import city8 from '../assets/city/a5947aa3a5b31469fa323e9e30f94bbb.png';
import city9 from '../assets/city/ce285c9b051aba7b94220676b2045821.png';

const BuySearch = () => {



  const brands = [b1, b2, b3, b4, b5, b6, b7, b8, b9, b10];
  const citys = [
    { name: 'Mumbai', image: city1 },
    { name: 'Ahmedabad', image: city2 },
    { name: 'Jaipur', image: city3 },
    { name: 'Delhi', image: city4 },
    { name: 'Gurugram', image: city5 },
    { name: 'Chennai', image: city6 },
    { name: 'Bengaluru', image: city7 },
    { name: 'Chhattisgarh', image: city8 },
    { name: 'Kolkata', image: city9 }
  ];
  const [searchTerm, setSearchTerm] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('');
  const dispatch = useDispatch();
  const debounceDelay = 500;

  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setVehicles([]);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleCitySubmit = () => {
    dispatch(fetchVehiclesByFilter({ city }));
    handleCloseModal();
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const searchResults = await searchVehicles(searchTerm);
        setVehicles(searchResults);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(() => {
      if (searchTerm !== '') {
        fetchData();
      } else {
        setVehicles([]);
      }
    }, debounceDelay);

    return () => {
      clearTimeout(debounce);
    };
  }, [searchTerm]);

  const handleCityClick = (cityName) => {
    setCity(cityName); 
  };



   

  return (
    <div className="relative">
      <Image
        width={1600}
        src={carimg}
        radius='none'
        alt="Big Image"
        className="object-cover"
        style={{ height: '600px' }}
      />
      <div className="absolute bottom-16 left-10 right-10 z-10">
        <div className="flex flex-col w-1/3">
          <div className="relative flex">
            <Input
              onChange={handleSearchChange}
              value={searchTerm}
              radius="lg"
              
              placeholder="Type to search..."
            />
            
            {searchTerm && (
              <Button
                auto
                light
                onClick={handleClearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent"
              >
                ✕
              </Button>
            )}
          </div>
          {loading ? (
            <div className="flex justify-center mt-4">
              <CircularProgress />
            </div>
          ) : vehicles.length > 0 ? (
            <ScrollShadow className="w-full max-w-[470px] h-[200px]">
              <div className="flex flex-col w-full">
                {vehicles.map((vehicle) => (
                  <Link className="flex flex-col m-2" key={vehicle.id} href={`/vehicle/${vehicle.id}`}>
                    <div className="bg-white w-full h-auto gap-2 py-1 px-2 rounded-md flex flex-col sm:flex-row items-center justify-start">
                      <Image
                        width={50}
                        height={50}
                        alt={`Vehicle Image ${vehicle.id}`}
                        src={vehicle.vehiclePhotos[0]}
                        className="w-12 h-12 object-contain sm:w-16 sm:h-16"
                      />
                      <div className="text-center flex items-center justify-center gap-2 mt-2 sm:mt-0 sm:ml-4">
                        <div className="text-black">{vehicle.model}</div>
                        <div className="text-black">{vehicle.brand}</div>
                      </div>
                    </div>
                    <Divider />
                  </Link>
                ))}
              </div>
            </ScrollShadow>
          ) : (
            <p className="text-center mt-4 text-red-500">No results found</p>
          )}
        </div>
        <div className="mb-4 text-white font-semibold">Search By Brand</div>
        <div className="flex gap-4">
          {brands.map((b, index) => (
            <div
              key={index}
              className="bg-white rounded-md w-24 h-16 sm:w-20 sm:h-12 flex items-center justify-center"
              style={{
                width: '100px',
                height: '62px',
              }}
            >
              <Image
                alt={`Small Image ${index + 1}`}
                height={50}
                width={50}
                radius="none"
                src={b}
              />
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Welcome to the Car Auction</ModalHeader>
          <ModalBody>
            <p>Please enter your city to see available vehicles:</p>
            <Input
              value={city}
              onChange={handleCityChange}
              placeholder="Enter city"
              fullWidth
            />
            
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
              {citys.map((c, index) => (
                <div key={index} onClick={() => handleCityClick(c.name)} className='cursor-pointer'>
                  <Image width={100} height={150} src={c.image} className="object-cover w-32 h-32" />
                </div>
              ))}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={handleCloseModal}>
              Close
            </Button>
            <Button color="primary" onPress={handleCitySubmit}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default BuySearch;
