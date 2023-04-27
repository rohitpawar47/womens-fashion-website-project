import { useContext } from "react";
import { Navigate, Outlet } from "react-router";

import { UserContext } from "../../contexts/UserContext";


export default function ForbiddenRoutes() {
    const { currentUser } = useContext(UserContext);
    if (currentUser === null) {
        return <Navigate to='/' />
    }
    return <Outlet />;
};