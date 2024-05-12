import { useEffect, useState } from 'react';
import { Button, Image, Input, Link, ScrollShadow } from '@nextui-org/react';
import { useDispatch } from 'react-redux';
import { searchVehicles } from '../Redux/vehicleSlice';

const BuySearch = () => {
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
        setVehicles([]); // Clear vehicles when search term is empty
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
        src="https://s3-alpha-sig.figma.com/img/9069/7cb8/f402d1e9bd1077179c11d5502a3180a1?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GxxhHJrK~fSBF41as6U1q9vB34LqjHOdYVCFIJxAumpYh1T8-pzO~GKUp5l1thmgob1-4LxMQYa7-qMbwz-eOjJiUW-xi2DZHDOSCJl6ol0jug2JRh5ukd0aGMsO7lZ8oXjUrgyYVNK3aD6qU6P8U5EZxT~4sueH4ZEXdpzzlPm1L16lpaN47loafIGvYvabX7F5hj-tPhYUx-7wV5c7BB2nUjBiTqotKdMG8mnFxluqwY96UZduOBjdcYAB5t3PK39MJucazYtyqortZtZxhAZlv2~BTBb4~NVRIMBSqrApjmdgb08wYaWZP79XNEHSbo3q3ZvZF2yqSmkeUMgwPg__"
        alt="Big Image"
        radius="none"
        className="object-cover"
        style={{ height: '600px' }} // Set the height inline
      />
      <div className="absolute bottom-16 left-10 right-10 z-10">
        <div className="flex flex-col">
          <Input
            value={searchTerm}
            onChange={handleSearchChange}
            isClearable
            className="mb-4 w-1/4 h-12"
            radius="lg"
            classNames={{
              label: 'text-black/50 dark:text-white/90 ',
              input: [
                'bg-transparent',
                'text-black/90 dark:text-white/90',
                'placeholder:text-default-700/50 dark:placeholder:text-white/60',
              ],
              innerWrapper: 'bg-transparent',
              inputWrapper: [
                'shadow-xl',
                'bg-default-200/50',
                'dark:bg-default/60',
                'backdrop-blur-xl',
                'backdrop-saturate-200',
                'hover:bg-default-200/70',
                'dark:hover:bg-default/70',
                'group-data-[focused=true]:bg-default-200/50',
                'dark:group-data-[focused=true]:bg-default/60',
                '!cursor-text',
              ],
            }}
            placeholder="Type to search..."
          />
        {vehicles.length > 0 && (
  <ScrollShadow className="w-[400px] h-[200px]">
    <div className="">
      {vehicles.map((vehicle) => (
        <Link key={vehicle.id} href={`/vehicle/${vehicle.id}`}>
          <div
            className="bg-white w-20 h-20  rounded-md flex items-center justify-center"
          >
            <Image
              width={200}
              height={100}
              alt={`Vehicle Image ${vehicle.id}`}
              src={vehicle.vehiclePhotos[0]}
              className="w-full h-48 object-contain"
            />
            <div className="text-center mt-2">{vehicle.model}</div>
            <div className="text-center mt-1">{vehicle.brand}</div>
          </div>
        </Link>
      ))}
    </div>
  </ScrollShadow>
)}

          
          {/* <Button className="ml-4">Search</Button> */}
        </div>
        <div className="mb-4 text-white font-semibold">Search By Brand</div>
        <div className="flex gap-4">
          {[...Array(9)].map((_, index) => (
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
                src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default BuySearch;
