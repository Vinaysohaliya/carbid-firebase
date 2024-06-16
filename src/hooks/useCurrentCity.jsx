import { useEffect, useState } from 'react';

const useCurrentCity = () => {
  const [city, setCity] = useState('');

  useEffect(() => {
    
   fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyDUg8BNNbzNfllCLg1h60ugBH6e151Ft0o').then((res)=>(res.json())).then(((r=>(console.log(r)))))            

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return city;
};

export default useCurrentCity;
