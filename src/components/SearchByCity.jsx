import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import { useDispatch } from 'react-redux';
import { fetchVehiclesByFilter } from '../Redux/vehicleSlice';

const SearchByCity = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [filterCriteria, setFilterCriteria] = useState({ city: '' });
  const [results, setResults] = useState([]);
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dispatch(fetchVehiclesByFilter(filterCriteria));
        console.log(res);
        setResults(res.payload); // Adjust if necessary based on your action's return structure
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    const timer = setTimeout(() => {
      if (filterCriteria.city) {
        fetchData();
      }
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [filterCriteria, dispatch]);

  const handleInputChange = (e) => {
    setFilterCriteria({ ...filterCriteria, city: e.target.value });
  };

  return (
    <>
      <Button onPress={onOpen}>Open Search By City</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Search By City</ModalHeader>
              <ModalBody>
                <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">City:</label>
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
                <div className="mt-4">
                  {results.length > 0 ? (
                    <ul>
                      {results.map((result, index) => (
                        <li key={index}>{result.model}</li> // Adjust based on your data structure
                      ))}
                    </ul>
                  ) : (
                    <p>No results found</p>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchByCity;
