import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

function useCabin() {
    const {
        data: cabins,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["cabins"],
        queryFn: getCabins,

        // staleTime: 30 * 1000, // 30 giây, riêng cho users
    });

    return { isLoading, error, cabins };
}

export default useCabin;
