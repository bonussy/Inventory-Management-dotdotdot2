"use Client"
import { removeBooking } from "@/redux/features/bookSlice"
import { AppDispatch, useAppSelector } from "@/redux/store"
import { useDispatch } from "react-redux"

export default function ReservationCart() {
    const bookItems = useAppSelector((state)=> state.bookSlice.bookItems);
    const dispatch = useDispatch<AppDispatch>();
    return (
        <>
            {bookItems.length === 0 ? (
                <div className="px-5 py-4 text-center text-gray-600">No Venue Booking</div>
            ) : (
                bookItems.map((bookingItem) => (
                    <div
                        className="bg-slate-200 rounded px-5 mx-5 py-2 my-2"
                        key={bookingItem.nameLastname}
                    >
                        <div className="text-md">Name-Lastname: {bookingItem.nameLastname}</div>
                        <div className="text-md">Contact-Number: {bookingItem.tel} </div>
                        <div className="text-md">Venue: {bookingItem.venue} </div>
                        <div className="text-md">Reserved Date: {bookingItem.bookDate}</div>
                        <button
                            className="block rounded-md bg-pink-600 hover:bg-red-600 px-3 py-1 text-white shadow-sm"
                            onClick={() => dispatch(removeBooking(bookingItem))}
                        >
                            Remove from Cart
                        </button>
                    </div>
                ))
            )}
        </>
    )
}