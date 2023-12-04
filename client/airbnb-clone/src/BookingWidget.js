import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function BookingWidget({place}) {

    const [checkin, setCheckin] = useState('');
    const [checkout, setCheckout] = useState('');
    const [numberOfGuests, setNumberOfGuests] =  useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState('');
    
    const {user} = useContext(UserContext);

    useEffect(() => {
        if(user){
            setName(user.name);
        }
    }, [user]);

    let numberOfNights = 0;

    if(checkin && checkout){
        numberOfNights = differenceInCalendarDays(new Date(checkout), new Date(checkin));
    }

    async function bookThisPlace() {
        const response = await axios.post('/bookings', {
            checkin, checkout, numberOfGuests, phone, name, place:place._id,
            price:numberOfNights * place.price, 
        });
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
    }

    if(redirect){
        return <Navigate to={redirect} />
    }

    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-2xl text-center">
                Price: ${place.price} per night.
            </div>
            <div className="mt-4 border rounded-2xl">
                <div className="flex">
                    <div className="py-3 px-4">
                        <label>Check In:</label>
                        <input type="date" value={checkin} onChange={ev => setCheckin(ev.target.value)} />
                    </div>
                    <div className="py-3 px-4 border-l">
                        <label>Check Out:</label>
                        <input type="date" value={checkout} onChange={ev => setCheckout(ev.target.value)} />
                    </div>
                </div>
                <div className="py-3 px-4 border-t">
                    <label>Number of Guests:</label>
                    <input type="number" value={numberOfGuests} onChange={ev => setNumberOfGuests(ev.target.value)} />
                </div>
                {numberOfNights > 0 && (
                    <div className="py-3 px-4 border-t">
                        <label>Name:</label>
                        <input type="text" placeholder="John Doe"
                        value={name}
                        onChange={ev => setName(ev.target.value)} />

                        <label>Contact Number:</label>
                        <input type="tel" placeholder="XXXXX XXXXX"
                        value={phone}
                        onChange={ev => setPhone(ev.target.value)} />
                    </div>
                )}
            </div>
            <button onClick={bookThisPlace} className="mt-4 primary">
                Book this place!
                {numberOfNights > 0 && (
                    <span> ${numberOfNights * place.price}</span>
                )}
            </button>
        </div>
    );
}