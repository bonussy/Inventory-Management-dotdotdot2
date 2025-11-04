'use client';
import Image from 'next/image';
import InteractiveCard from './InteractiveCard';

export default function Card({ productName, imgSrc, userRole, onEdit, onDelete } : { 
    productName: string, 
    imgSrc: string, 
    userRole?: string,
    onEdit?: () => void,
    onDelete?: () => void
}) {
    
    const handleButtonClick = (e: React.MouseEvent, callback?: () => void) => {
        e.preventDefault(); // Prevent the link click
        if (callback) {
            callback();
        }
    };

    return (
        <InteractiveCard>
            <div className='w-full h-[70%] relative rounded-t-lg'>
                <Image src={imgSrc}
                alt='Product Picture'
                fill={true}
                className='object-cover rounded-t-lg'/>
            </div>
            <div className='w-full h-[30%] p-[10px]'>
                <h1 className='text-lg font-medium underline cursor-pointer'>{productName}</h1>
                {userRole === 'admin' && (
                    <div className='mt-2'>
                        <button 
                            onClick={(e) => handleButtonClick(e, onEdit)}
                            className='bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-md transition-colors'
                        >
                            Edit
                        </button>
                        <button 
                            onClick={(e) => handleButtonClick(e, onDelete)}
                            className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition-colors ml-2'
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </InteractiveCard>
    );
}