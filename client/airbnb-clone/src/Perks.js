import { MdPets } from "react-icons/md";
import { GiKidSlide } from "react-icons/gi";
import { FaCar, FaWifi, FaDoorOpen } from "react-icons/fa6";
import { PiTelevisionSimpleLight } from "react-icons/pi";

export default function Perks({ selected, onChange }) {
    function handleCbClick(ev) {
        const { checked, name } = ev.target;
        if (checked) {
            onChange([...selected, name]);
        }
        else {
            onChange([...selected.filter(selectedName => selectedName !== name)]);
        }
    }
    return (
        <>
            <label className="border p-4 flex rounded-xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('wifi')} name="wifi" onChange={handleCbClick} />
                <FaWifi />
                <span>WiFi</span>
            </label>
            <label className="border p-4 flex rounded-xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('parking')} name="parking" onChange={handleCbClick} />
                <FaCar />
                <span>Parking</span>
            </label>
            <label className="border p-4 flex rounded-xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('tv')} name="tv" onChange={handleCbClick} />
                <PiTelevisionSimpleLight />
                <span>Television</span>
            </label>
            <label className="border p-4 flex rounded-xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('pets')} name="pets" onChange={handleCbClick} />
                <MdPets />
                <span>Pets</span>
            </label>
            <label className="border p-4 flex rounded-xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('kids')} name="kids" onChange={handleCbClick} />
                <GiKidSlide />
                <span>Kids Area</span>
            </label>
            <label className="border p-4 flex rounded-xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('entrance')} name="entrance" onChange={handleCbClick} />
                <FaDoorOpen />
                <span>Private Entrance</span>
            </label>
        </>
    );
}