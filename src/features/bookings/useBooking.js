import { useQuery } from "@tanstack/react-query";

import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

function useBooking() {
    // TODO	Khi cần lấy path params (các giá trị trong URL path)
    const { bookingId } = useParams();

    const {
        data: booking,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["Booking", bookingId],
        queryFn: () => getBooking(bookingId),

        // Default react query sẽ call api 3 lần nếu fail
        retry: false,
    });

    return { isLoading, error, booking };
}

export default useBooking;
