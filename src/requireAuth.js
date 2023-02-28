import { useLocation } from "react-router";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./Hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {

    const auth = useAuth();
    const location = useLocation();

    const hasRole = auth?.user?.roles?.find(role => allowedRoles?.includes(role));

    return (
        !auth?.login
            ? <Navigate to="/user/signin" state={{ from: location }} replace />
            : hasRole
                ? <Outlet />
                : <Navigate to="/unauthorized" state={{ from: location }} replace />
    );
}

export default RequireAuth;