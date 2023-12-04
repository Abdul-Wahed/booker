import { differenceInCalendarDays, format } from "date-fns";
import { FaRegCalendarAlt } from "react-icons/fa";

export default function BookingDates({ booking }) {
    return (
        <div className="py-3 pr-3">
            <div className="flex gap-2 items-center mt-2 py-2">
                <div className="flex gap-1 items-center text-gray-500">
                    <FaRegCalendarAlt />
                    {format(new Date(booking.checkin), 'yyyy-MM-dd')}
                </div>
                &rarr;
                <div className="flex gap-1 items-center text-gray-500">
                    <FaRegCalendarAlt />
                    {format(new Date(booking.checkout), 'yyyy-MM-dd')}
                </div>
            </div>
        </div>
    );
}