import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const userRole = localStorage.getItem("userRole");
    const token = localStorage.getItem("token");
    const { auth } = useAuth();
    const location = useLocation();

    return (
        allowedRoles?.includes(userRole)
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : token ?
                    <Navigate to="/" state={{ from: location }} replace />
                :
                    <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;