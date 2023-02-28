import { useState, useEffect, useContext } from "react";
import { Routes, Route, Outlet, Link, NavLink, useLocation, useParams } from "react-router-dom";
import { motion, useMotionValue, useMotionValueEvent, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { IconOutline, IconSolid } from "./Elements/Icon";

import useGlobals from "./Hooks/useGlobals";
import RequireAuth from "./requireAuth";

import HeaderUser from "./Elements/HeaderUser";
import FooterNavLink from "./Elements/FooterNavLink";

import BlackOut from "./Modals/BlackOut";
import Scanner from "./Elements/Scanner";

import SlideMenu from "./Elements/SlideMenu";

import Homepage from "./Components/Homepage";

import Signin from "./Components/User/Signin";
const ROLES = {
    'User': 2001,
    'Editor': 1984,
    'Admin': 5150
}

function App() {

    const app = useGlobals();
    const location = useLocation();

    // console.log(app.pages);
    // console.log(app.modals);

    useEffect(() => {

    });

    const { scrollY } = useScroll();

    let scrollPos = 0;
    useMotionValueEvent(scrollY, "change", (latest) => {
        scrollPos = latest;
    });

    const footerNavLinks = app.pages.filter((page, index) => {
        return page.footer !== false;
    }).map((item, index) => {
        return (<FooterNavLink item={item} app={app} key={index} />)
    });

    useEffect(() => {
        // var body = document.body,
        //     html = document.documentElement;
        // console.log(`Body scrollHeight: ${body.scrollHeight}`);
        // console.log(`Body offsetHeight: ${body.offsetHeight}`);
        // console.log(`html clientHeight: ${html.clientHeight}`);
        // console.log(`html scrollHeight: ${html.scrollHeight}`);
        // console.log(`html offsetHeight: ${html.offsetHeight}`);
    });

    return (
        <>
            <div className="app-container w-screen h-full bg-white">

                <div className="app-body safe-left safe-right">
                    <div className="friendz-body friendz-body-sm standalone:friendz-body-sa md:friendz-body-md lg:friendz-body-lg">

                        <AnimatePresence initial={false}>
                            <Routes>
                                <Route path="/" element={<Homepage />} />
                                <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
                                    <Route path="/user" element={
                                        <h1 className="text-lg font-bold flex-1 max-width text-center">My Account</h1>
                                    } />
                                </Route>
                                <Route path="/user/signin" element={
                                    <Signin />
                                } />
                                <Route path="/cards" element={
                                    <h1 className="text-lg font-bold flex-1 max-width text-center">My Cards</h1>
                                } />
                            </Routes>
                        </AnimatePresence>

                    </div>
                </div>

                <div className="app-nav">
                    {/* Friendz Header  */}
                    <div className="friendz-header friendz-header-sm standalone:friendz-header-sa md:friendz-header-md lg:friendz-header-lg safe-left safe-right">
                        <div className="flex items-center justify-center gap-[var(--app-body-padding)] w-full h-full max-width">
                            <div className="flex-shrink-0 pl-[var(--app-body-padding)] text-md font-bold">
                                <NavLink to="/">{app.name}</NavLink></div>
                            <div className="flex-1 pr-[var(--app-body-padding)]">
                                <HeaderUser />
                            </div>
                        </div>
                    </div>
                    {/* Friendz Footer  */}
                    <div className="friendz-footer friendz-footer-sm standalone:friendz-footer-sa md:friendz-footer-md lg:friendz-footer-lg safe-left safe-right">
                        <div className="flex items-center justify-evenly mt-[10px]">
                            {footerNavLinks}
                        </div>
                    </div>

                    <AnimatePresence initial={false}>
                        {app.slideMenu && <SlideMenu app={app} direction="left" />}
                    </AnimatePresence>
                </div>
            </div >

            <AnimatePresence>
                {app.blackOut && <BlackOut app={app} />}
            </AnimatePresence>

            <AnimatePresence>
                {app?.modals?.scanner?.isOpen && <Scanner />}
            </AnimatePresence>

        </>


    )
}

export default App