"use client"
import DateReserve from "@/components/DateReserve";
import { TextField, Select, MenuItem } from "@mui/material";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import getUserProfile from "@/libs/getUserProfile";
import { use, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addBooking } from "@/redux/features/bookSlice";
import { BookingItem } from "../../../interface";

export default function Booking() {

    // const session = await getServerSession(authOptions);
    // if(!session || !session.user.token)  return null;

    // const profile = await getUserProfile(session.user.token);
    // var createdAt = new Date(profile.data.createdAt);

    const dispatch = useDispatch<AppDispatch>();

    const makeBooking = () => {
        if (nameLastname && tel && venue && reserveDate) {
            const bookingItem:BookingItem = {
                nameLastname: nameLastname,
                tel: tel,
                venue: venue,
                bookDate: dayjs(reserveDate).format("YYYY/MM/DD"),
            };
            dispatch( addBooking(bookingItem) );
            alert("Booking made successfully!");
        }
    }

    const [nameLastname, setNameLastname] = useState<string>("");
    const [tel, setTel] = useState<string>("");
    const [venue, setVenue] = useState<string>("");
    const [reserveDate, setReserveDate] = useState<Dayjs | null>(null);

    return(
        <main className="w-[100%] flex flex-col items-center gap-y-4">

            <div className="text-2xl font-bold pt-20">User Profile</div>
                {/* <table className='table-auto border-separate border-spacing-2'>
                    <tbody>
                        <tr><td>Name</td><td>{profile.data.name}</td></tr>
                        <tr><td>Email</td><td>{profile.data.email}</td></tr>
                        <tr><td>Tel.</td><td>{profile.data.tel}</td></tr>
                        <tr><td>Member Since</td><td>{createdAt.toDateString()}</td></tr>
                    </tbody>
                </table> */}

            <div className="text-2xl font-bold py-4">Venue Booking</div>
            
            <div className="w-fit gap-y-2 flex flex-col">

                <TextField name="Name-Lastname" label="Name-Lastname" variant="standard" 
                value={nameLastname} onChange={(e)=>setNameLastname(e.target.value)}/>
                
                <TextField name="Contact-Number" label="Contact-Number" variant="standard" 
                value={tel} onChange={(e)=>setTel(e.target.value)}/>
                
                <Select variant="standard" name="venue" id="venue" className="h-[2em] my-2 py-5" 
                value={venue} onChange={(e)=>setVenue(e.target.value)}>
                    <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
                    <MenuItem value="Spark">Spark Space</MenuItem>
                    <MenuItem value="GrandTable">The Grand Table</MenuItem>
                </Select>

                <DateReserve onDateChange={(value:Dayjs)=>{setReserveDate(value)}}/>
            
            </div>
            

            <button name="Book Venue" className="block rounded-md bg-pink-600 hover:bg-pink-800 px-3 py-2 shadow-sm text-white"
            onClick={makeBooking}>
                Book Venue
            </button>
            
        </main>
    );
}