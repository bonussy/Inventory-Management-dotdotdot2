'use client';
import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import Rating from '@mui/material/Rating';
import { useState } from 'react';

export default function Card({ venueName, imgSrc, onRating } : { venueName: string, imgSrc: string, onRating?:Function }) {
    
    const [rating, setRating] = useState<number | null>(0);
    
    return (
        <InteractiveCard>
            <div className='w-full h-[70%] relative rounded-t-lg'>
                <Image src={imgSrc}
                alt='Venue Picture'
                fill={true}
                className='object-cover rounded-t-lg'/>
            </div>
            <div className='w-full h-[30%] p-[10px]'>
                <h1 className='text-lg font-medium underline cursor-pointer'>{venueName}</h1>
                {
                    onRating ?
                    <Rating
                    id={venueName}
                    name={venueName}
                    data-testid={venueName + " Rating"}
                    value={rating}
                    onClick={(e) => e.stopPropagation()} 
                    onChange={(e, newRating) => {setRating(newRating); onRating(venueName, newRating)}}
                    /> : ""
                }
                
            </div>
        </InteractiveCard>
    );
}