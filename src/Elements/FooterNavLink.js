import { NavLink } from "react-router-dom";
import { IconOutline } from "./Icon";

function FooterNavLink({ item, app }) {

    const activeClassName = 'relative h-full w-full flex flex-col items-center justify-center text-blue-500';
    const inactiveClassName = 'relative h-full w-full flex flex-col items-center justify-center';
    const iconsClassName = 'w-7 h-7 text-current';
    const labelsClassName = 'text-xs truncate hidden standalone:block md:block';

    return (
        <NavLink
            key={item.name}
            to={item.pathname}
            onClick={() => { item.modal && app.ModalOpen(item.modal) }}
            className={({ isActive }) => item.pathname && isActive ? activeClassName : inactiveClassName}
        >
            <IconOutline icon={item.icon} classname={iconsClassName} />
            <p className={labelsClassName}>{item.title}</p>
        </NavLink >
    )
}

export default FooterNavLink
