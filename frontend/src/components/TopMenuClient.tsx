'use client'
import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import Link from 'next/link';
import { useState } from 'react';

export default function TopMenuClient({ session }: { session: any }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return(
        <>
            {/* Desktop */}
            <div className='hidden sm:flex h-[50px] w-full bg-white fixed top-0 left-0 right-0 z-30 pr-3 border-t border-b border-gray-300 flex-row justify-end'>
                {
                    session? <Link href="/api/auth/signout">
                        <div className='flex items-center absolute left-0 h-full px-3 text-amber-700 text-md'>
                            Sign-Out of {session.user?.name} </div></Link>
                    : <Link href="/api/auth/signin">
                        <div className='flex items-center absolute left-0 h-full px-3 text-amber-700 text-md'>
                            Sign-In</div></Link>
                }
                <TopMenuItem title="Home" pageRef="/"/>
                <TopMenuItem title="MyBooking" pageRef="/mybooking"/>
                <TopMenuItem title="Booking" pageRef="/booking"/>
                <TopMenuItem title="Register" pageRef="/register"/>
                <Image src={"/img/logo.png"} className='h-full w-auto' alt="Logo" width={0} height={0} sizes='100vh'/>
            </div>

            {/* Mobile */}
            <div className='sm:hidden h-[50px] w-full bg-white fixed top-0 left-0 right-0 z-30 border-t border-b border-gray-300 flex flex-row justify-between items-center px-3'>
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="flex flex-col gap-1.5"
                    aria-label="Toggle menu"
                >
                    <span className={`w-6 h-0.5 bg-gray-700 transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`w-6 h-0.5 bg-gray-700 transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`w-6 h-0.5 bg-gray-700 transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>

                <Image src={"/img/logo.png"} className='h-full w-auto' alt="Logo" width={0} height={0} sizes='100vh'/>

                {
                    session? <Link href="/api/auth/signout">
                        <div className='flex items-center h-full px-1 text-amber-700 text-xs'>
                            Sign-Out </div></Link>
                    : <Link href="/api/auth/signin">
                        <div className='flex items-center h-full px-1 text-amber-700 text-xs'>
                            Sign-In</div></Link>
                }
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <div className='sm:hidden absolute top-[50px] left-0 right-0 bg-white border-b border-gray-300 shadow-lg z-20'>
                    <div className='flex flex-col gap-2 p-4'>
                        <TopMenuItem title="Home" pageRef="/"/>
                        <TopMenuItem title="MyBooking" pageRef="/mybooking"/>
                        <TopMenuItem title="Booking" pageRef="/booking"/>
                        <TopMenuItem title="Register" pageRef="/register"/>
                    </div>
                </div>
            )}
        </>
    );
}