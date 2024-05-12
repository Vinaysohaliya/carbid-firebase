import { Card, CardBody, CardHeader, Image } from '@nextui-org/react';
import React from 'react';

const WhyPeopleChooseUs = () => {
    return (
        <div className='flex gap-4'>
            <Card className="py-4 w-full md:w-auto max-w-sm flex items-center justify-center">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <Image
                        alt="Card background"
                        className="object-cover rounded-xl"
                        src="https://nextui.org/images/hero-card-complete.jpeg"
                        width={270}
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
                        src="https://nextui.org/images/hero-card-complete.jpeg"
                        width={270}
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
                        src="https://nextui.org/images/hero-card-complete.jpeg"
                        width={270}
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
                        src="https://nextui.org/images/hero-card-complete.jpeg"
                        width={270}
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
