import useGlobals from "./Hooks/useGlobals";
import useAuth from "./Hooks/useAuth";

function User() {

    const app = useGlobals();
    const auth = useAuth();

    return (
        <div>
            User
        </div>
    )
}

export default User