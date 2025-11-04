'use client';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Banner() {

  const router = useRouter();
  const { data: session } = useSession();

  return (
      <div className="relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between py-12 gap-8">
            {/* Image Side */}
            <div className="md:w-1/2">
              <Image
                src="/img/banner.png" 
                alt="Inventory Management"
                width={600}
                height={600}
                className="rounded-lg"
                priority
              />
            </div>

            {/* Text Content Side */}
            <div className="md:w-1/2 space-y-4">
              <h1 className="text-4xl font-bold text-gray-900">
                Inventory Management System
              </h1>
              <p className="text-lg text-gray-600">
                Efficiently manage your inventory with our comprehensive tracking and management solution.
              </p>
              {/* {
                session ? <div className='z-30 absolute top-5 right-10 font-semibold text-amber-200 text-xl'>
                  Welcome {session.user?.name}</div> : null
              } */}
              <button className="bg-amber-800 text-white px-6 py-2 rounded-md hover:bg-amber-700 transition-colors"
              onClick={(e)=>{e.stopPropagation(); router.push('/product')}}>
                View Inventory
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}