import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
        mutationFn: deleteCabinApi,

        onSuccess: () => {
            toast.success("Cabin successfully deleted");

            queryClient.invalidateQueries({
                // 1. Chuyển query đó sang trạng thái stale ngay lập tức (bỏ qua staleTime).
                // 2. Tự động trigger một fetch mới để cập nhật dữ liệu (nếu component nào đó đang dùng query đó).
                queryKey: ["cabins"],
            });
        },

        onError: (err) => toast.error(err.message),
    });

    return { isDeleting, deleteCabin };
}
