import React from 'react';
import { Card, Link } from '@nextui-org/react'; // Make sure this is the correct path for Link

const Footer = () => {
  return (
    <Card radius='none' className="flex flex-col p-4 sm:p-2">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div className="text-lg flex flex-wrap sm:flex-nowrap justify-center sm:justify-start mb-4">
          <div className="m-2">IAA</div>
          <div className="m-2">IAA</div>
        </div>
        <div className="mb-4 sm:mb-0 w-full sm:w-2/3">
          Prestige Misty Waters, Nada Prabhu, Service Road, Kempe Gowda Main Rd, Vayunandana Layout,
          Hebbal, Bengaluru, Karnataka 560024
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div className="mb-2 sm:mb-0">+91 81217 51709</div>
        <div className="flex gap-4">
          <Link className="text-blue-500" href="/terms">Terms & Conditions</Link>
          <Link className="text-blue-500" href="/about">About Us</Link>
          <Link className="text-blue-500" href="/privacy">Privacy Policy</Link>
        </div>
      </div>
    </Card>
  );
};

export default Footer;
