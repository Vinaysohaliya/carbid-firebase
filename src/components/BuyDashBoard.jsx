import { Button, Image, Input } from '@nextui-org/react'
import React from 'react'

const BuyDashBoard = () => {
    return (
        <div className="relative">
            <Image
                width={1600}
                src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
                alt="Big Image"
                radius='none'
                className="object-cover"
                style={{ height: '600px' }} // Set the height inline
            />
            <div className="absolute bottom-16  left-10 right-10 z-10">
                <div className='flex '>
                    <Input
                        isClearable
                        className='mb-4 w-1/4 h-12'
                        radius="lg"
                        classNames={{
                            label: "text-black/50 dark:text-white/90 ",
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
                                "group-data-[focused=true]:bg-default-200/50",
                                "dark:group-data-[focused=true]:bg-default/60",
                                "!cursor-text",
                            ],
                        }}
                        placeholder="Type to search..."
                    />
                    <Button className='ml-4'>Search</Button>
                </div>
                <div className=" mb-4  text-white font-semibold">
                    Search By Brand
                </div>
                <div className=" ">
                    <div className="flex gap-4">
                        {[...Array(9)].map((_, index) => (
                            <div
                                key={index}
                                className='bg-white rounded-md w-24 h-16 sm:w-20 sm:h-12 flex items-center justify-center'
                                style={{
                                    width: '100px',
                                    height: '62px',
                                }}
                            >
                                <Image
                                    alt={`Small Image ${index + 1}`}
                                    height={50}
                                    width={50}
                                    radius='none'
                                    src={`https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>


        </div>
    )
}

export default BuyDashBoard
