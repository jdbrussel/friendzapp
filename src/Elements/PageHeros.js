import { motion } from "framer-motion";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { IconOutline, IconSolid } from "./Icon";

import useGlobals from "../Hooks/useGlobals";
import useAuth from "../Hooks/useAuth";

function Hero() {
    return (
        <section className="hero">
            <motion.div
                className="hero-100-hb-sm standalone:hero-100-hb-sa md:hero-66-hb-md lg:hero-50-hb-lg
                bg-cover bg-center bg-[url('https://i0.wp.com/picjumbo.com/wp-content/themes/picjumbofree/data-premium/bg_hq_circles.jpg')]
                flex flex-col items-center justify-center">
                <h1 className="text-3xl md:text-5xl text-white">Start Collecting Today!</h1>
                <h1 className="text-sm md:text-xl text-white">That's where Friendz are&nbsp;for!</h1>
            </motion.div>
        </section>
    )
}

export { Hero }
