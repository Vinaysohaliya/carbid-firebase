import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, Link, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, CircularProgress } from '@nextui-org/react';
import { useDispatch } from 'react-redux';
import { fetchByCity } from '../Redux/vehicleSlice';
import { useLocation } from 'react-router-dom';
import { FaHandPointRight } from "react-icons/fa";


const SearchByCity = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filterCriteria, setFilterCriteria] = useState({ city: '' });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(fetchByCity(filterCriteria));
        setResults(res.payload);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      if (filterCriteria.city && isOpen) {
        fetchData();
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filterCriteria, isOpen, dispatch]);

  const handleInputChange = (e) => {
    setFilterCriteria({ ...filterCriteria, city: e.target.value });
  };
  return (
    <>
      <Button onPress={onOpen} className='w-full md:w-auto'>Search Vehicle</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 font-bold text-blue-600">Search By City</ModalHeader>
          <ModalBody>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-blue-700 ">City:</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={filterCriteria.city}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </form>
            <div className="mt-4 flex justify-center">
              {loading ? (
                <CircularProgress aria-label="Loading..." />
              ) : results.length ? (
                <ul className='flex flex-col bg-gray-100 p-4 rounded-lg shadow-lg'>
                
                  {results.map((result, index) => (
                    <Link
                      className='m-1 p-2 bg-white rounded hover:bg-blue-100 transition-colors duration-200'
                      href={location.pathname.includes('vehicle/') ? `${result.id}` : `vehicle/${result.id}`}
                      key={index}
                    >
                    <p className='mr-5'><FaHandPointRight /></p>  {result.model}
                    </Link>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No results found</p>
              )}
            </div>

          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchByCity;
