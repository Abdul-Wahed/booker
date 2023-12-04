import { useState } from "react";
import { IoMdPhotos } from "react-icons/io";
import { IoClose } from "react-icons/io5";

export default function PlaceGallery({place}) {

    const [showAllPhotos, setShowAllPhotos] = useState(false);

    if(showAllPhotos) {
        return(
            <div className="absolute inset-0 bg-black text-white min-h-full">
                <div className="bg-black p-8 grid gap-4">
                    <div className="">
                        <h2 className="text-3xl mr-48">Photos of {place.title}</h2>
                        <button onClick={() => setShowAllPhotos(false)} className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black">
                            <IoClose className="mt-1" />Close
                        </button>
                    </div>
                    {place?.photos?.length > 0 && place.photos.map(photo => (
                        <div>
                            <img src={'http://localhost:4000/uploads/'+photo} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return(
        <div className="relative">
            <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
                <div>
                    {place.photos?.[0] && (
                        <div className="">
                            <img onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover" src={'http://localhost:4000/uploads/'+place.photos[0]} />
                        </div>
                    )}
                </div>
                <div className="grid">
                    {place.photos?.[1] && (
                        <img onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover" src={'http://localhost:4000/uploads/'+place.photos[1]} />
                    )}
                    <div className="overflow-hidden">
                    {place.photos?.[2] && (
                        <img onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover relative top-2" src={'http://localhost:4000/uploads/'+place.photos[2]} />
                    )}
                    </div>
                </div>
            </div>
            <button onClick={() => setShowAllPhotos(true)} className="flex gap-1 absolute bottom-1 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-gray-500">
                <IoMdPhotos className="mt-1"/>Show More Photos
            </button>
        </div>
    );
}