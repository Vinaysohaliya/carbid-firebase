import { Button, Input, ModalBody, ModalContent, ModalFooter, ModalHeader, Image, CircularProgress, Modal } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import { searchVehicles } from '../Redux/vehicleSlice';

const CityModal = ({ cities }) => {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true);

  const debounceDelay = 500;

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCityClick = (cityName) => {
    setCity(cityName);
  };

  const handleCitySubmit = async () => {
    setLoading(true);
    try {
      const searchResults = await searchVehicles({ city, searchTerm });
      setVehicles(searchResults);
      handleCloseModal();
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onClose();
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const searchResults = await searchVehicles({ city, searchTerm });
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
  }, [searchTerm, city, setVehicles]);

  return (
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
          <Input
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Type to search..."
            fullWidth
            className="mt-4"
          />
          {loading ? (
            <div className="flex justify-center mt-4">
              <CircularProgress />
            </div>
          ) : null}
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4'>
            {cities.map((c, index) => (
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
  );
};

export default CityModal;
