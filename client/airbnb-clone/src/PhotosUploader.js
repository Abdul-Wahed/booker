import axios from "axios";
import { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaRegTrashAlt, FaRegStar, FaStar  } from "react-icons/fa";


export default function PhotosUploader({addedPhotos, onChange}) {

    const [photoLink, setPhotoLink] = useState('');

    async function addPhotoByLink(ev){
        ev.preventDefault();
        const {data:filename} = await axios.post('/upload-by-link', {link:photoLink});
        onChange(prev => {
            return [...prev, filename];
        });
        setPhotoLink('');
    }

    function uploadPhoto(ev) {
        const files = ev.target.files;
        const data = new FormData();
        for(let i = 0; i < files.length; i++){
            data.append('photos', files[i]);
        }
        axios.post('/upload', data, {
            headers: {'Content-type':'multipart/form-data'}
        }).then(response => {
            const {data:filenames} = response;
            onChange(prev => {
                return [...prev, ...filenames];
            });
        })
    }

    function removePhoto(ev, filename){
        ev.preventDefault();
        onChange([...addedPhotos.filter(photo => photo !== filename)]);
    }

    function selectAsMainPhoto(ev, filename) {
        ev.preventDefault();

        onChange([filename, ...addedPhotos.filter(photo => photo !== filename)]);
    }

    return (
        <>
            <div className="flex gap-2">
                <input type="text"
                    value={photoLink}
                    onChange={ev => setPhotoLink(ev.target.value)}
                    placeholder={'Add a link ....jpg'} />
                <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-3xl">Add&nbsp;Photo</button>
            </div>
            <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {addedPhotos.length > 0 && addedPhotos.map(link => (
                    <div className="h-32 flex relative" key={link}>
                        <img className="rounded-2xl w-full object-cover" src={'http://localhost:4000/uploads/' + link} alt="" />
                        <button onClick={ev => removePhoto(ev, link)} className="absolute bottom-1 right-1 text-white bg-black bg-opacity-50 rounded-2xl py-2 px-3">
                            <FaRegTrashAlt />
                        </button>
                        <button onClick={ev => selectAsMainPhoto(ev, link)} className="absolute bottom-1 left-1 text-white bg-black bg-opacity-50 rounded-2xl py-2 px-3">
                            {link === addedPhotos[0] && (
                                <FaStar />
                            )}
                            {link !== addedPhotos[0] && (
                                <FaRegStar />
                            )}
                        </button>
                    </div>
                ))}
                <label className="h-32 cursor-pointer flex items-center justify-center gap-2 border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
                    <input type="file" multiple className="hidden" onChange={uploadPhoto} />
                    <AiOutlineCloudUpload className="mt-2" />
                    Upload
                </label>
            </div>
        </>
    );
}