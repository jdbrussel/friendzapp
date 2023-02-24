import useGlobals from "./Hooks/useGlobals";
import useAuth from "./Hooks/useAuth";

function Discover() {

    const app = useGlobals();
    const auth = useAuth();

    return (
        <div>
            Discover
        </div>
    )
}

export default Discover
