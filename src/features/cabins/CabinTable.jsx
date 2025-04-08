import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabin from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function filterCabins(cabins, searchParams) {
    const filterValue = searchParams.get("discount") || "all";

    switch (filterValue) {
        case "no-discount":
            return cabins.filter((cabin) => cabin.discount === 0);
        case "with-discount":
            return cabins.filter((cabin) => cabin.discount > 0);
        default:
            return cabins;
    }
}

function CabinTable() {
    const { isLoading, error, cabins } = useCabin();
    const [searchParams] = useSearchParams();

    if (isLoading) return <Spinner />;

    if (!cabins.length) return <Empty resourceName="cabins" />;

    // *** Filter
    const filteredCabins = filterCabins(cabins, searchParams);

    // *** Sort
    const sortBy = searchParams.get("sort-by")?.toLowerCase() || "start-date-asc";

    const sortParts = sortBy.split("-");
    const direction = sortParts.pop(); // Lấy phần cuối (asc/desc)
    const field = sortParts
        .map((part, index) =>
            index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
        )
        .join(""); // Ghép lại thành camelCase

    const modifier = direction === "asc" ? 1 : -1;

    const sortedCabins = [...filteredCabins].sort((a, b) => {
        if (typeof a[field] === "string") {
            return a[field].localeCompare(b[field]) * modifier;
        }

        return (a[field] - b[field]) * modifier;
    });

    return (
        <Menus>
            <Table>
                <Table.Header>
                    <div></div>
                    <div>Cabins</div>
                    <div>Capacity</div>
                    <div>Price</div>
                    <div>Discount</div>
                    <div></div>
                </Table.Header>

                <Table.Body
                    data={sortedCabins}
                    render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
                />
            </Table>
        </Menus>
    );
}

export default CabinTable;
