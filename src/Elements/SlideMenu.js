
import { SlideMenuModal } from "../Modals/Modals";
import { IconOutline, IconSolid } from "../Elements/Icon";

function SlideMenu({ app, direction }) {

    return (
        <SlideMenuModal direction={direction} app={app}>
            <div className="h-full p-[var(--slidemenu-padding)] scrollable">
                {direction}
            </div>
        </SlideMenuModal>
    )
}

export default SlideMenu
