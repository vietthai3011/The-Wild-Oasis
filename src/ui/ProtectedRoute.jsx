import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Spinner from "./Spinner";

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;

function ProtectedRoute({ children }) {
    const navigation = useNavigate();

    // 1. Load the authenticated user
    const { isLoading, authenticated } = useUser();

    // 2. If there is NO authenticated user, redirect to the /login
    useEffect(() => {
        if (!authenticated && !isLoading) navigation("/login");
    }, [authenticated, isLoading, navigation]);

    // 3. while loading, show spinner
    if (isLoading)
        return (
            <FullPage>
                <Spinner />
            </FullPage>
        );

    // 4. If there IS a user, render the app
    if (authenticated) return children;
}

export default ProtectedRoute;
