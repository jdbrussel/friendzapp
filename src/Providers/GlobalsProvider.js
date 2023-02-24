import { createContext, useEffect, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import Pages from "../Globals/Pages";

const GlobalsContext = createContext({});

export const GlobalsProvider = ({ children }) => {

    const isStandalone = (window.navigator.standalone === true);
    // alert(window.screen.height);

    const name = 'Friendz';
    const version = '1.0.1';
    const publisher = 'Studio Brussel';

    // Modals

    const pages = Pages;

    const [slideMenu, setSlideMenu] = useState(false);
    const [blackOut, setBlackOut] = useState(false);
    const [modals, setModals] = useState([]);

    if (blackOut) {
        document.body.classList.add("no-scroll");
    } else {
        document.body.classList.remove("no-scroll");
    }


    const { scrollY } = useScroll();
    const [scrollPosY, setScrollPosY] = useState(0);

    // let scrollPos = 0;
    // useMotionValueEvent(scrollY, "change", (latest) => {
    //     setScrollPosY(latest);
    // });


    const ModalOpen = (modalName) => {

        if (!modals[modalName]) {
            modals.push(modalName);
            modals[modalName] = { isOpen: null, name: modalName }
        }
        modals[modalName].isOpen = true;
        setScrollPosY(scrollY.current);
        setBlackOut(true);
        setModals(modals);



    }


    const ModalClose = (modalName) => {
        if (!modals[modalName]) {
            modals.push(modalName);
            modals[modalName] = { isOpen: null, name: modalName }
        }
        modals[modalName].isOpen = false;
        setBlackOut(false);
        setModals(modals);

    }

    const ModalsClose = () => {
        let openModals = modals.filter((modal, index) => {
            return modal.isOpen !== false;
        });
        openModals.map((modalName) => {
            ModalClose(modalName);
        })
    }



    let cacheMap = new Map()
    const [cache, setCache] = useState(cacheMap);

    function shrinkBody(variant) {

        if (!isStandalone) {
            return;
        }

        if (variant === 'active') {

            // const margintop = (scrollPosY * -1);
            // document.querySelector(".app-body").style.marginTop = `${margintop}px`;

            setStyle(document.documentElement, {
                background: "black",
                height: "100vh",
            });

            setStyle(document.body, {
                position: "fixed",
                inset: "0"
            });

            setStyle(document.querySelector(".friendz-header"), {
                position: "absolute"
            });
            setStyle(document.querySelector(".friendz-footer"), {
                position: "absolute"
            });

            setStyle(document.querySelector(".app-container"), {
                borderRadius: "12px",
                overflow: "hidden",
                height: "calc(100vh - calc(env(safe-area-inset-top))",
                transform: "scale(.93) translateY( calc( env(safe-area-inset-top) + var(--friendz-header-height-sm) - 15px )  )",
                transformOrigin: "top",
                transitionProperty: "transform",
                transitionDuration: `${transitions?.in?.duration}s`,
                transitionTimingFunction: `cubic-bezier(${transitions?.in?.ease.join(",")})`
            });


        }
        else if (variant === 'inactive') {

            setStyle(document.querySelector(".app-container"), {
                height: "100vh",
                transform: "scale(1) translateY(0)"
            });

            setTimeout(function () {
                resetStyle(document.body);
                resetStyle(document.documentElement);
                resetStyle(document.querySelector(".app-container"));
                resetStyle(document.querySelector(".friendz-header"));
                resetStyle(document.querySelector(".friendz-footer"));
            }, 300);



        }
    }

    function setStyle(el, styles) {

        let originalStyles = {};

        Object.entries(styles).forEach(([key, value]) => {
            originalStyles[key] = el.style[key];
            el.style[key] = value;
        });
        if (!cache.has(el)) {
            cache.set(el, originalStyles);
        }
    }

    function resetStyle(el, prop) {

        if (cache.has(el)) {
            let originalStyles = cache.get(el);

            if (prop) {
                el.style[prop] = originalStyles[prop];
            } else {
                Object.entries(originalStyles).forEach(([key, value]) => {
                    el.style[key] = value;
                });
            }

            cache.delete(el);
        }
    }


    const transitions = {
        in: {
            delay: 0,
            duration: .4,
            ease: [0.32, 0.72, 0, 1]
        },
        out: {
            delay: 0,
            duration: .4,
            ease: [0.32, 0.72, 0, 1]
        },
        slidemenu: {
            in: {
                delay: 0,
                duration: .2,
                ease: [.56, .34, .27, .85]
            },
            out: {
                delay: 0,
                duration: .2,
                ease: [.56, .34, .27, .85]
            }
        },
        popup: {
            out: {
                delay: 0,
                duration: .3,
                ease: [.56, .34, .27, .85]
            }
        }
    }

    // https://cubic-bezier.com/

    const animations = {
        'blackout': {
            'variants': {
                'active': {
                    opacity: 1,
                    transition: transitions?.in
                },
                'inactive': {
                    opacity: 0,
                    transition: transitions?.out
                }
            }
        },
        'slidemenu_left': {
            'variants': {
                'active': {
                    x: '0',
                    transition: transitions?.slidemenu?.in
                },
                'inactive': {
                    x: '-100%',
                    transition: transitions?.slidemenu?.out
                }
            }
        },
        'slidemenu_right': {
            'variants': {
                'active': {
                    x: '0',
                    transition: transitions?.slidemenu?.in
                },
                'inactive': {
                    x: '100%',
                    transition: transitions?.slidemenu?.out
                }
            }
        },
        'modals': {
            'popup': {
                'variants': {
                    'active': {
                        top: '0',
                        transition: transitions?.popup.out
                    },
                    'inactive': {
                        top: '100%',
                        transition: transitions?.popup.out
                    }
                }
            }
        }

    }

    return (
        <GlobalsContext.Provider value={{
            name,
            version,
            publisher,
            pages,
            modals,
            blackOut,
            setBlackOut,
            slideMenu,
            setSlideMenu,
            ModalOpen,
            ModalClose,
            ModalsClose,
            animations,
            isStandalone,
            cache,
            setCache,
            shrinkBody
        }}>
            {children}
        </GlobalsContext.Provider>
    )
}




export default GlobalsContext;