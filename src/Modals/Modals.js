import { motion } from "framer-motion";
import { IconOutline, IconSolid } from "../Elements/Icon";
import { Link, NavLink } from "react-router-dom";

import SliderHeaderUser from "../Elements/SliderHeaderUser";
const SlideMenuModal = ({ modalName, direction, app, children }) => {

    let animationVariants = app?.animations?.slidemenu_left?.variants;
    let className = "app-modal slidemenu slidemenu-sm standalone:slidemenu-sa md:slidemenu-md lg:slidemenu-lg fixed left-0 top-0 bottom-0 max-w-[320px] bg-[var(--slidemenu-background)] text-[var(--slidemenu-textcolor)] shadow-xl safe-left safe-bottom";

    if (direction === 'right') {
        animationVariants = app?.animations?.slidemenu_right?.variants;
        className = "app-modal slidemenu slidemenu-sm standalone:slidemenu-sa md:slidemenu-md lg:slidemenu-lg fixed right-0 top-0 bottom-0 max-w-[320px] bg-[var(--slidemenu-background)] text-[var(--slidemenu-textcolor)] shadow-xl safe-right safe-bottom";
    }

    let onAnimationStart = (variant) => {
        if (variant === 'active') {
            app.setBlackOut(true);
        }
        if (variant === 'inactive') {
            app.setBlackOut(false);
        }
    };
    let onAnimationComplete;

    // let onAnimationStart;
    // let onAnimationComplete;

    return (
        <>
            <motion.div
                key="1"
                variants={animationVariants}
                initial="inactive"
                animate="active"
                exit="inactive"
                onAnimationStart={onAnimationStart}
                onAnimationComplete={onAnimationComplete}
                className={className}>
                <div className="slidemenu-header slidemenu-header-sm sa:slidemenu-header-sa md:slidemenu-header-md lg:slidemenu-header-lg
                               bg-gray-200 flex w-full items-end justify-end">
                    <div className="flex w-full h-full items-end">
                        <div className="flex-1 h-full">
                            <SliderHeaderUser />
                        </div>
                        <div className="flex-shrink-0 ">
                            <Link onClick={() => { app.setSlideMenu(!app.slideMenu) }}>
                                <IconSolid icon="XMarkIcon" classname="w-7 h-7" />
                            </Link>
                        </div>
                    </div>

                </div>
                {children}
            </motion.div>
        </>
    );
}

const PopupModal = ({ modalName, modalType, app, children }) => {

    const animationVariants = app?.animations?.modals?.popup?.variants;

    let className;
    let onAnimationStart;
    let onAnimationComplete;



    if (modalType === 'full') {
        className = "app-modal popup-full popup-full-sm standalone:popup-full-sa md:popup-full-md lg:popup-full-lg bg-white safe-top";
    }

    else if (modalType === 'over') {
        className = "app-modal popup-over popup-over-sm standalone:popup-over-sa md:popup-over-md lg:popup-over-lg bg-white rounded-t-lg shadow-lg";
        onAnimationStart = (variant) => {
            app.shrinkBody(variant);
        }
        onAnimationComplete = (variant) => {
            app.shrinkBody(variant);
        }
    }

    return (
        <>
            <motion.div
                key="1"
                variants={animationVariants}
                initial="inactive"
                animate="active"
                exit="inactive"
                onAnimationStart={onAnimationStart}
                onAnimationComplete={onAnimationComplete}
                className={className}>
                {children}
            </motion.div>
        </>
    );
}

export {
    SlideMenuModal,
    PopupModal
}