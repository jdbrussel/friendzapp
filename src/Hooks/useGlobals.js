import { useContext } from "react";
import GlobalsContext from "../Providers/GlobalsProvider";

const useGlobals = () => {
    const Globals = useContext(GlobalsContext);
    return useContext(GlobalsContext);
}

export default useGlobals;