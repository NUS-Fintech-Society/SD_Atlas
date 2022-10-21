import { Avatar } from '@chakra-ui/react'
import React from 'react';


export default function dashboard() {
    return(
        <div className="flex flex-col bg-black text-white h-screen">
            <div className = "h-48 grid grid-cols-7 grid-rows-1 gap-4">
                <div className = " col-span-2 flex justify-center items-center">
                    <p className = "text-3xl">Co-Directors</p></div>
                <div className = "flex flex-col justify-center items-center">
                <Avatar name='Dan Abrahmov' size='xl' src='https://bit.ly/dan-abramov' />
                <p className= 'text-xl'>name</p>
                <p>batch</p>
                </div>
            </div>
        </div>
    )
}