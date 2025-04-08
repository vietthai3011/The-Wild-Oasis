import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckOut() {
    const queryClient = useQueryClient();

    const { mutate: checkOut, isLoading: isCheckingOut } = useMutation({
        mutationFn: async (bookingId) => {
            return await updateBooking(bookingId, {
                status: "checked-out",
            });
        },

        onSuccess: (data) => {
            if (!data) {
                toast.error("No data returned from updateBooking!");
                return;
            }

            toast.success(`Booking #${data.id} successfully checked out.`);
            queryClient.invalidateQueries({ active: true });
        },

        onError: (error) => {
            console.error("Check-in error:", error);
            toast.error("There was an error while checking in");
        },
    });

    return { checkOut, isCheckingOut };
}
