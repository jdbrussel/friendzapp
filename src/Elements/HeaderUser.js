import useAuth from "../Hooks/useAuth";
import { NavLink } from "react-router-dom";
import { IconOutline, IconSolid } from "../Elements/Icon";

function HeaderUser() {

    const auth = useAuth();

    // console.log(auth);

    const classNameIcon = "w-3 h-3 lg:h-4 lg:w-4 text-white ";
    const className = "text-sm md:text-md lg:text-md lg:font-semibold";

    return (
        <div className="flex gap-[7px] items-center justify-end h-[30px]">
            <IconOutline icon="UserIcon" classname={classNameIcon} />
            {!auth.login ? <NavLink to="/user/signin" className={className}>Inloggen</NavLink> : <NavLink to="/user" className={className}>Jasper Brussel</NavLink>}
        </div>
    )
}

export default HeaderUser
