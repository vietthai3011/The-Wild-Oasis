import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
    const queryClient = useQueryClient();
    const { mutate: updateUser, isLoading: isUpdating } = useMutation({
        mutationFn: updateCurrentUser,

        onSuccess: (data) => {
            toast.success("User account successfully updated.");

            // Cho UI update liền tay với data đã biết
            queryClient.setQueryData(["user"], data.user);

            // Đảm bảo data không "xài tạm" hoài, mà sẽ được re-fetch để chính xác tuyệt đối
            // queryClient.invalidateQueries({ queryKey: ["user"] });
        },

        onError: (err) => toast.error(err.message),
    });

    return { updateUser, isUpdating };
}
