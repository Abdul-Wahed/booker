import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";

export default function PlacesPage() {

    const[places, setPlaces] = useState([]);

    useEffect(() => {
        axios.get('/user-places').then(({data}) => {
            setPlaces(data);
        });
    }, []);

    return (
        <div>
            <AccountNav />
                <div className="text-center">
                    <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
                        <FaPlus className="mt-1"/>
                        Add New Place
                    </Link>
                </div>
                <div className="mt-4">
                    {places.length > 0 && places.map(place => (
                        <Link to={'/account/places/'+place._id} className="flex cursor-pointer gap-4 p-4 bg-gray-100" rounded-2xl>
                            <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                                <PlaceImg place={place} />
                            </div>
                            <div className="grow-0 shrink">
                                <h2 className="text-xl">{place.title}</h2>
                                <p className="text-sm mt-2">{place.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
        </div>
    );
}