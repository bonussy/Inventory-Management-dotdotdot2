import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import Link from 'next/link';

export default async function TopMenu() {

    const session = await getServerSession(authOptions);

    return(
        <div className='h-[50px] w-full bg-white fixed top-0 left-0 right-0 z-30 pr-3 border-t border-b border-gray-300 flex flex-row justify-end' >
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
    );
}