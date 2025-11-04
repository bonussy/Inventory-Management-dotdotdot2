'use client'
import { useReducer } from "react";
import Card from "@/components/Card";
import Link from "next/link";

export default function CardPannel() {
    
    const ratingReducer = (ratingMap: Map<string, number>, action:{type:string, venueName: string, rating: number} ) => {
        switch(action.type) {
            case 'add':
                return new Map(ratingMap.set(action.venueName, action.rating));
            case 'remove':
                ratingMap.delete(action.venueName);
                return new Map(ratingMap);
            default:
                return ratingMap;
        }
    }

    const initialRatings = new Map<string, number>([
        ["The Bloom Pavilion", 0],
        ["Spark Space", 0],
        ["The Grand Table", 0],
    ]);

    const [ratingMap, dispatchRating]= useReducer(ratingReducer, initialRatings);

    const mockVenueRepo = [
        {vid:'001', venueName: "The Bloom Pavilion", image: "/img/bloom.jpg"},
        {vid:'002', venueName: "Spark Space", image: "/img/sparkspace.jpg"},
        {vid:'003', venueName: "The Grand Table", image: "/img/grandtable.jpg"},
    ];

    return (
        <div>
            <div style={{margin:"20px", display:"flex", flexDirection:"row", alignContent: "space-around", justifyContent: "space-around", flexWrap: "wrap"}}>
            {
                mockVenueRepo.map((venueItem)=>(
                    <Link href={`/venue/${venueItem.vid}`} className="w-1/5" key={venueItem.venueName}>
                    <Card key={venueItem.vid} venueName={venueItem.venueName} imgSrc={venueItem.image} 
                    onRating={(venue:string, rating:number)=>dispatchRating({type:'add', venueName:venue, rating:rating})}/>
                    </Link>
                ))
            }
            </div>
            <div className="w-full text-xl font-medium">Venue List with Rating:{ratingMap.size}</div>
            {Array.from(ratingMap).map(([venue, rating])=>(<div key={venue} data-testid={venue} onClick={()=>dispatchRating({type:'remove', venueName:venue, rating:rating})}>{venue} : {rating}</div>)) }
        </div>
    );
}