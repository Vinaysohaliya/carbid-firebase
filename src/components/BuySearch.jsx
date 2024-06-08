import { useEffect, useState } from 'react';
import { Button, Divider, Image, Input, Link, ScrollShadow } from '@nextui-org/react';
import { useDispatch } from 'react-redux';
import carimg from '../assets/f402d1e9bd1077179c11d5502a3180a1.jpg'
import { searchVehicles } from '../Redux/vehicleSlice';
import b1 from '../assets/374c24fdbbb811e3fe494f27ae695992.png'
import b2 from '../assets/6a2c6d1d7a63e9b0b4c51c016d3d96a8.png'
import b3 from '../assets/6b887207aa943cdf23bdff721988238b.png'
import b4 from '../assets/71a56f0bf6e78b7ca53ba588013427c5.png'
import b5 from '../assets/a9fe987ee1edd3fa351dee20689382da.png'
import b6 from '../assets/aac85f63ec516ad9f9038d1e9864160b.png'
import b7 from '../assets/bc3d6ddc5983ce11ad42ba78b28716ca.png'
import b8 from '../assets/c3e37bcf2700ab5e993594e2e31f0852.png'
import b9 from '../assets/d0202be409abd6ce3bc3cb03884c56e7.jpg'
import b10 from '../assets/dd574ce9ae4551ed764f80ff3e7addc1.png'

const BuySearch = () => {

  const brands =[b1,b2,b3,b4,b5,b6,b7,b8,b9,b10]
  const [searchTerm, setSearchTerm] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const dispatch = useDispatch();
  const debounceDelay = 500;

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  useEffect(() => {
    const debounce = setTimeout(async () => {
      if (searchTerm !== '') {
        try {
          const searchResults = await searchVehicles(searchTerm);
          setVehicles(searchResults);
        } catch (error) {
          throw error;
        }
      } else {
        setVehicles([]);
      }
    }, debounceDelay);

    return () => {
      clearTimeout(debounce);
    };
  }, [searchTerm]);

  return (
    <div className="relative">
      <Image
        width={1600}
        src={carimg}
        alt="Big Image"
        className="object-cover"
        style={{ height: '600px' }}
      />
      <div className="absolute bottom-16 left-10 right-10 z-10">
        <div className="flex flex-col w-1/3">
          <Input
            onChange={handleSearchChange}
            label="Search"
            value={searchTerm}
            isClearable
            radius="lg"
            classNames={{
              label: "text-black/50 dark:text-white/90",
              input: [
                "bg-transparent",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow-xl",
                "bg-default-200/50",
                "dark:bg-default/60",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-default-200/70",
                "dark:hover:bg-default/70",
                "group-data-[focus=true]:bg-default-200/50",
                "dark:group-data-[focus=true]:bg-default/60",
                "!cursor-text",
              ],
            }}
            placeholder="Type to search..."

          />

          {vehicles.length > 0 && (
            <ScrollShadow className="w-full max-w-[470px] h-[200px]">
              <div className="flex flex-col w-full">
                {vehicles.map((vehicle) => (
                  <Link className="flex flex-col" key={vehicle.id} href={`/vehicle/${vehicle.id}`}>
                    <div className="bg-white w-full h-auto gap-2  py-1 px-2 rounded-md flex flex-col sm:flex-row items-center justify-start">
                      <Image
                        width={50}
                        height={50}
                        alt={`Vehicle Image ${vehicle.id}`}
                        src={vehicle.vehiclePhotos[0]}
                        className="w-12 h-12 object-contain sm:w-16 sm:h-16"
                      />
                      <div className="text-center flex items-center justify-center gap-2 mt-2 sm:mt-0 sm:ml-4">
                        <div className='text-black'>{vehicle.model}</div>
                        <div className=" text-black">{vehicle.brand}</div>
                      </div>
                    </div>
                    <Divider className="" />
                  </Link>
                ))}
              </div>
            </ScrollShadow>
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
    </div>
  );
};

export default BuySearch;
