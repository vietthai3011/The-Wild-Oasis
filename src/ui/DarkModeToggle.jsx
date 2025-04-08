import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../context/DarkModeContext";
import { useEffect } from "react";

function DarkModeToggle() {
    const { isDarkMode, togglesDarkMode } = useDarkMode();

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
            document.documentElement.classList.remove("light");
        } else {
            document.documentElement.classList.add("light");
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    return (
        <ButtonIcon onClick={togglesDarkMode}>
            {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
        </ButtonIcon>
    );
}

export default DarkModeToggle;
