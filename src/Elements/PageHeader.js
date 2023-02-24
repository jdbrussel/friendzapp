import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { IconOutline, IconSolid } from "./Icon";

import useGlobals from "../Hooks/useGlobals";
import useAuth from "../Hooks/useAuth";

function PageHeader() {

    const app = useGlobals();
    const auth = useAuth();

    return (
        <>
            <header className="page-header white page-header-sm standalone:page-header-sa md:page-header-md lg:page-header-lg sticky">
                <div className="flex-1 flex items-center justify-between w-full h-full max-width">
                    <div className="flex-shrink-0 w-[12%]  pl-[var(--app-body-padding)] flex items-center justify-start">
                        {/* <IconSolid icon="ChevronLeftIcon" classname="w-7 h-7" /> */}
                        <Link onClick={() => { app.setSlideMenu(!app.slideMenu) }}>
                            <IconSolid icon="Bars3Icon" classname="w-7 h-7" />
                        </Link>
                    </div>
                    <div className="flex-1 min-w-0 text-center px-[var(--app-body-padding)]">
                        <h1 className="text-lg">Homepage</h1>
                    </div>
                    <div className="flex-shrink-0 w-[12%] pr-[var(--app-body-padding)] flex items-center justify-end">
                        <Link onClick={() => { app.ModalOpen('scanner') }}>
                            <IconSolid icon="QrCodeIcon" classname="w-7 h-7" />
                        </Link>
                    </div>
                </div>
            </header>
        </>
    )
}

export default PageHeader
