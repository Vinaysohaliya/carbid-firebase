import { Card, CardBody, CardHeader, Image } from '@nextui-org/react';
import React from 'react';
import img3 from '../assets/1a9c42d01cf72371704af07c46e34140.png'
import img4 from '../assets/495528890e54b73580a5a2806034cba0.png'
import img1 from '../assets/7fcbee5c95df2b932dfef97100b5b60d.png'
import img2 from '../assets/2edaeed9d6ab36cf9fda13375d439b8c.png'

const WhyPeopleChooseUs = () => {
    return (
        <div className='flex gap-4'>
            <Card className="py-4 w-full md:w-auto max-w-sm flex items-center justify-center">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <Image
                        alt="Card background"
                        className="object-cover rounded-xl"
                        src={img1}
                        width={330}
                    />
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <p className="text-tiny uppercase font-bold">Test drive available</p>
                    <small className="text-default-500">Schedule a test drive and our team would come to your doorstep to give you the complete experience of the car.</small>
                </CardBody>
            </Card>
            <Card className="py-4 w-full md:w-auto max-w-sm flex items-center justify-center">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <Image
                        alt="Card background"
                        className="object-cover rounded-xl"
                        src={img2}
                        width={330}
                    />
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <p className="text-tiny uppercase font-bold">Test drive available</p>
                    <small className="text-default-500">Schedule a test drive and our team would come to your doorstep to give you the complete experience of the car.</small>
                </CardBody>
            </Card>
            <Card className="py-4 w-full md:w-auto max-w-sm flex items-center justify-center">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <Image
                        alt="Card background"
                        className="object-cover rounded-xl"
                        src={img3}
                        width={330}
                    />
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <p className="text-tiny uppercase font-bold">Test drive available</p>
                    <small className="text-default-500">Schedule a test drive and our team would come to your doorstep to give you the complete experience of the car.</small>
                </CardBody>
            </Card>
            <Card className="py-4 w-full md:w-auto max-w-sm flex items-center justify-center">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <Image
                        alt="Card background"
                        className="object-cover rounded-xl"
                        src={img4}
                        width={330}
                    />
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <p className="text-tiny uppercase font-bold">Test drive available</p>
                    <small className="text-default-500">Schedule a test drive and our team would come to your doorstep to give you the complete experience of the car.</small>
                </CardBody>
            </Card>
        </div>
    );
}

export default WhyPeopleChooseUs;
