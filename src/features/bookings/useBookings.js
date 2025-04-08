import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constans";

function useBookings() {
    const queryClient = useQueryClient();

    const [searchParams] = useSearchParams();

    // Filter
    const filterValue = searchParams.get("status");
    const filter =
        !filterValue || filterValue === "all"
            ? null
            : { field: "status", value: filterValue };

    // Sort
    const sortByRaw = searchParams.get("sort-by") || "";

    const sortParts = sortByRaw.split("-");
    const direction = sortParts.pop();
    const field = sortParts
        .map((part, index) =>
            index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
        )
        .join(""); // Ghép lại thành camelCase

    const sortBy = { field, direction };

    // Pagination
    const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

    const {
        isLoading,
        data: { data: bookings, count } = {},
        error,
    } = useQuery({
        queryKey: ["bookings", filter, sortBy, page],
        queryFn: () => getBookings({ filter, sortBy, page }),
        // staleTime: 30 * 1000, // 30 giây, riêng cho users
    });

    // const bookings = data?.data || []; // Fallback nếu data là undefined
    // const count = data?.count || 0; // Fallback nếu count là undefined

    const totalPages = Math.ceil(count / PAGE_SIZE);

    if (page < totalPages)
        // *** Prefetching
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, page + 1],
            queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
        });

    if (page > 1)
        // *** Prefetching
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, page - 1],
            queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
        });

    return { isLoading, error, bookings, count };
}

export default useBookings;
