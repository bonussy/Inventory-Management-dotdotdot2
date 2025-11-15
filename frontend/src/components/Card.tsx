'use client';
import React from 'react';
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
        e.preventDefault();   // prevent Link navigation
        e.stopPropagation();  // stop parent handlers
        if (callback) callback();
    };

    return (
        <InteractiveCard>
            {/* Image area */}
            <div className="relative w-full h-[260px] bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
                <div className="relative w-48 h-40 md:w-56 md:h-44">
                    <Image
                        src={imgSrc}
                        alt={productName ?? 'Product'}
                        fill
                        className="object-contain rounded-xl"
                        sizes="(max-width: 768px) 40vw, 200px"
                    />
                </div>
            </div>

            {/* Info / actions */}
            <div className="px-4 py-3 flex flex-col justify-between h-[160px]">
                <div className="flex items-center justify-center">
                    <h3 className="text-lg font-semibold text-gray-800 text-center underline line-clamp-2">{productName}</h3>
                </div>

                <div className="flex items-center justify-center mt-3 space-x-2">
                    {userRole === 'admin' ? (
                        <>
                            <button
                                onClick={(e) => handleButtonClick(e, onEdit)}
                                className="inline-flex items-center gap-2 px-3 py-1 
                                border-2 border-amber-900 text-amber-900 rounded-xl text-sm shadow-sm hover:bg-amber-50 transition"
                                aria-label="Edit product"
                            >
                                Edit
                            </button>
                            <button
                                onClick={(e) => handleButtonClick(e, onDelete)}
                                className="inline-flex items-center gap-2 px-3 py-1 
                                border-2 border-red-500 text-red-500 rounded-xl text-sm shadow-sm hover:bg-red-50 transition"
                                aria-label="Delete product"
                            >
                                Delete
                            </button>
                        </>
                    ) : null}
                </div>
            </div>
        </InteractiveCard>
    );
}