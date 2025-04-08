import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import Spinner from "../../ui/Spinner";

function Logout() {
    const { logout, isLoading } = useLogout();

    return (
        <ButtonIcon onClick={logout} disabled={isLoading}>
            {!isLoading ? <HiArrowRightOnRectangle /> : <Spinner />}
        </ButtonIcon>
    );
}

export default Logout;
