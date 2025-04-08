import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteDelete() {
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
        mutationFn: deleteBookingApi,

        onSuccess: () => {
            toast.success("Booking successfully deleted");

            queryClient.invalidateQueries({
                // 1. Chuyển query đó sang trạng thái stale ngay lập tức (bỏ qua staleTime).
                // 2. Tự động trigger một fetch mới để cập nhật dữ liệu (nếu component nào đó đang dùng query đó).
                queryKey: ["bookings"],
            });
        },

        onError: (err) => toast.error(err.message),
    });

    return { isDeleting, deleteBooking };
}
