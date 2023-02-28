import { useNavigate } from "react-router-dom";
import useAuth from '../../auth/hooks/useAuth';

function Signout() {

    const auth = useAuth();
    const navigate = useNavigate();

    auth?.setUser({});
    auth?.setLogin(false);
    navigate("/", { replace: true });

    return (
        <>Logged out</>
    );
}

export default Signout