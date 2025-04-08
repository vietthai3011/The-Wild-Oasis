import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckIn() {
    const queryClient = useQueryClient();

    const { mutate: checkIn, isLoading: isCheckingIn } = useMutation({
        mutationFn: async ({ bookingId, breakfast }) => {
            return await updateBooking(bookingId, {
                status: "checked-in",
                isPaid: true,
                ...breakfast,
            });
        },

        onSuccess: (data) => {
            if (!data) {
                toast.error("No data returned from updateBooking!");
                return;
            }

            toast.success(`Booking #${data.id} successfully checked in.`);
            queryClient.invalidateQueries({ active: true });
        },

        onError: (error) => {
            console.error("Check-in error:", error);
            toast.error("There was an error while checking in");
        },
    });

    return { checkIn, isCheckingIn };
}
